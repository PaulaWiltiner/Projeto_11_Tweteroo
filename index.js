import express from "express";

import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

let users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];

let tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
];

server.post("/sign-up", (request, response) => {
  const newUser = {
    username: request.body.username,
    avatar: request.body.avatar,
  };

  users.push(newUser);
  response.send("OK");
});

server.post("/tweets", (request, response) => {
  const newTweet = {
    username: request.body.username,
    tweet: request.body.tweet,
  };

  tweets.push(newTweet);
  response.send("OK");
});

server.get("/tweets", (request, response) => {
  if (tweets.length > 10) {
    const listTweet = tweets.slice(tweets.length - 10, tweets.length);
    const tenTweets = listTweet.map((elem) => {
      const avatar = users.filter((item) => item.name === elem.username).avatar;
      return { ...elem, avatar: avatar };
    });
    response.send(tenTweets);
  } else {
    const finalTweets = tweets.map((elem) => {
      const avatar = users.filter((item) => item.name === elem.username).avatar;
      return { ...elem, avatar: avatar };
    });
    response.send(finalTweets);
  }
});

server.listen(5000);
