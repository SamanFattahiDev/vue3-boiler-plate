// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import { useAuthStore } from "@/stores/auth";
// import { useChatStore } from "@/stores/chat";
//
// const hub = new HubConnectionBuilder()
//   .withUrl("https://chatHub", {
//     accessTokenFactory: function () {
//       // console.log("Getting token for hub");
//     },
//   })
//   .configureLogging(LogLevel.Information)
//   .withAutomaticReconnect()
//   .build();
// hub.on("SendMessage", (res) => {
//   const chatStore = useChatStore();
//   chatStore.sendMessage(res);
// });
// hub.on("ReadMessage", (res) => {
//   const chatStore = useChatStore();
//   chatStore.messageReaded(true);
// });
// hub.on("DeliverMessage", (res) => {
//   const chatStore = useChatStore();
//   chatStore.messageDelivered(true);
// });
//
// async function start() {
//   try {
//     console.log("Attempting reconnect");
//     await hub.start();
//   } catch (err) {
//     console.log(err);
//     setTimeout(() => start(), 5000);
//   }
// }
//
// start();
export default {
  // install: (app) => {
  //   app.provide("hub", hub);
  // },
};
