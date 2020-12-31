// import { Route } from "vue-router";
import router from "./index";
import store from "@/store/index";

router.beforeEach((to: any, _: any, next: any) => {
  const token = (store.state as any).user.token;
  if (token != "" && to.path != "/login") {
    next();
  } else if (to.path == "/login") {
    next();
  } else {
    next({ path: "/login" });
  }
});
