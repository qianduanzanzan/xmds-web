// import { Route } from "vue-router";
import router from "./index";

router.beforeEach((to: any, _: any, next: any) => {
  if (localStorage.getItem("token") !== null && to.path !== "/login") {
    next();
  } else if(to.path == "/login"){
    next();
  }else{
    next({path: '/login'});
  }
});
