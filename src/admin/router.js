import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Admin from "./components/admin.vue";
import About from "./components/about.vue";
import Blog from "./components/blog.vue";
import Works from "./components/works.vue";

const routes = [
  {
    path: "/admin",
    component: Admin
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/blog",
    component: Blog
  },
  {
    path: "/works",
    component: Works
  }
];

export default new VueRouter({
  routes,
  mode: "history"
});
