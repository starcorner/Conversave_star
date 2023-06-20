import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import chatHome from "@/pages/chatHome";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/chat",
      name: "chat",
      component: chatHome
    }
  ]
});
// const messages = [
//   { role: "system", content: "You are a helpful assistant." },
//   { role: "user", content: "Who won the world series in 2020?" },
//   {
//     role: "assistant",
//     content: "The Los Angeles Dodgers won the World Series in 2020."
//   },
//   { role: "assistant", content: "Tsjfakhsdlkfhakl." },
//   { role: "assistant", content: "Thashjdfkasdhjkfhaks" },
//   { role: "user", content: "Where was it played?" }
// ];
