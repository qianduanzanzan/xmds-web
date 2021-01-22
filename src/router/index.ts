import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },
    // component:() => import(/* webpackChunkName: "login" */"../views/Login/index.vue")
  // {
  //   path: "/",
  //   name: "layout",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/layout/index.vue"),
  //   children:[
  //     {
  //       path: "/a",
  //       name: "test",
  //       component: () =>
  //         import(/* webpackChunkName: "about" */ "@/views/Test/test1.vue")
  //     }
  //   ]
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
