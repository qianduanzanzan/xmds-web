import router from "./index";
import store from "@/store/index";
import { checkLogin } from "@/api/login";
import { removeToken } from "@/utils/auth";

router.beforeEach(async (to: any, _: any, next: any) => {
  const token = localStorage.getItem("token");
  if (token != "" && to.path != "/login") {
    if((store.state as any).permission.routers.length == 0){
      await store.dispatch("permission/getRoute",{menuName:'测试'})
      const routers = (store.state as any).permission.routers.map((item:any) => {
        return {
          path: `/${item.routeName}`,
          name: item.routeName,
          component: () => import(/* webpackChunkName: item.routeName */ `@/${item.filePath}`),
          meta:{
            nameZh: item.menuName
          }
        }
      })
      const rootRouter:any = {
          path: `/`,
          name: "layout",
          component: () => import(/* webpackChunkName: "about" */ "@/layout/index.vue"),
          meta:{
            nameZh: "主页"
          },
          children:[]
      }
      rootRouter.children=routers
      console.log(rootRouter)
      router.addRoute(rootRouter)
      next({ ...to, replace: true })
    }
    next();
  } else if (to.path == "/login") {
    const res =  await checkLogin(token)
    const userInfo: any = JSON.parse(
      localStorage.getItem("userInfo") as string
    );
    if (
      userInfo.account == res.data.account &&
      userInfo.userName == res.data.userName
    ){
      store.commit("user/SET_USER_INFO", res.data);
      next({path:'/'});
    }else{
      removeToken();
      next();
    }
  } else {
    next({ path: "/login" });
  }
});
