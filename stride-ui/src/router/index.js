import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import LoginSignUp from "../views/LoginSignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginSignUp",
    component: LoginSignUp,
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/saved-courses",
    name: "Saved",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Saved.vue"),
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
