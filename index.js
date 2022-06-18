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

function addAvatar(list) {
  const newList = list.map((elem) => {
    const avatar = users.filter((item) => item.username === elem.username)[0]
      .avatar;
    return { ...elem, avatar: avatar };
  });
  return newList;
}

server.post("/sign-up", (request, response) => {
  const verifUser = users.some(
    (item) => item.username === request.body.username
  );
  if (request.body.username === "" || request.body.avatar === "") {
    response.status(400).send("Todos os campos são obrigatórios!");
  } else {
    if (verifUser) {
      response.status(201).send("Já existe esse usuário.");
    } else {
      const newUser = {
        username: request.body.username,
        avatar: request.body.avatar,
      };

      users.push(newUser);
      response.status(201).send("OK");
    }
  }
});

server.post("/tweets", (request, response) => {
  const newTweet = {
    username: request.headers.username,
    tweet: request.body.tweet,
  };
  if (request.body.username === "" || request.body.tweet === "") {
    response.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push(newTweet);
    response.status(201).send("OK");
  }
});

server.get("/tweets", (request, response) => {
  const page = request.query.page;
  if (tweets.length > 10) {
    if (page !== "" && Number(page) > 1) {
      const listTweet = tweets.slice(
        tweets.length - 10 * (page - 1) - 11 < 0
          ? 0
          : tweets.length - 10 * (page - 1) - 11,
        tweets.length - 10 * (page - 1)
      );
      const tenTweets = addAvatar(listTweet);
      response.send(tenTweets);
    } else {
      response.status(400).send("Informe uma página válida!");
    }
  } else {
    const finalTweets = addAvatar(tweets);
    response.send(finalTweets);
  }
});

server.get("/tweets/:username", (request, response) => {
  const userName = request.params.username;
  const userNameMatch = tweets.filter((item) => item.username === userName);
  const userTweets = addAvatar(userNameMatch);
  response.send(userTweets);
});

server.listen(5000);
