import { defineStore } from "pinia";
import { ref } from "vue";
export let loginStore = defineStore(
  "loginStore",
  () => {
    let userinfo = ref("");
    let useradmin = ref(false);
    // 存入登录用户信息
    let setUserinfo = (data) => {
      if (data == "setUserinfo") {
        // console.log("是的");
      } else {
        userinfo.value = data;
      }
    };
    //
    let setUseradmin = (boole) => {
      if (boole == "true") {
        useradmin.value = true;
      } else {
        useradmin.value = false;
      }
    };
    return {
      userinfo,
      useradmin,
      setUserinfo,
      setUseradmin,
    };
  },
  {
    persist: true,
  }
);
