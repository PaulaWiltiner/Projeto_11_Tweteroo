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
    username: request.headers.user,
    tweet: request.body.tweet,
  };
  if (request.body.tweet === "") {
    response.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push(newTweet);
    response.status(201).send("OK");
  }
});

server.get("/tweets", (request, response) => {
  const newTweets = [...tweets].reverse();
  const page = request.query.page;
  if (page === "1") {
    const tenTweets = newTweets.slice(0, 10);
    response.send(addAvatar(tenTweets));
  }
  if (page !== "" && Number(page) > 1) {
    const listTweet = newTweets.slice(
      10 * (page - 1),
      10 * page > newTweets.length ? newTweets.length : 10 * page
    );
    response.send(addAvatar(listTweet));
  } else {
    response.status(400).send("Informe uma página válida!");
  }
});

server.get("/tweets/:username", (request, response) => {
  const userName = request.params.username;
  const newTweets = [...tweets].reverse();
  const userNameMatch = newTweets.filter((item) => item.username === userName);
  response.send(addAvatar(userNameMatch));
});

server.listen(5000);
