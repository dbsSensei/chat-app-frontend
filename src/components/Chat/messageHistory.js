const axios = require("axios");

const urlAPI = "http://localhost:3001";

const user = JSON.parse(localStorage.getItem("user"));

const messageHistory = [];

axios({
  method: "get",
  url: `${urlAPI}/api/v1/chats/jakarta`,
  responseType: "json",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  // .then((res) => res.json())
  .then((chats) => {
    chats.data.data.data.map((chat) => {
      messageHistory.push({
        author: user._id === chat.userId ? "me" : "them",
        type: chat.type,
        data: chat.data,
      });
    });
  })
  .catch((err) => console.log(err));

export default messageHistory;
