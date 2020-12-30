import { createStore } from "vuex";

const files = require.context('./modules', false, /\.ts$/)
const modules:any = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})
export default createStore({
  modules
});
