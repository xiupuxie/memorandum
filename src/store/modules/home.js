import { defineStore } from "pinia";
import { ref } from "vue";
export let homeStore = defineStore(
  "homeStore",
  () => {
    let dialogpagtype = ref(0); 
    let dialogpaglist = ref({}); 
    
    let setdialogpagtype = (type) => {
      dialogpagtype.value = type;
    };
    let setdialogpaglist = (data) => {
        dialogpaglist.value = data;
      };
    return {
      dialogpagtype,
      dialogpaglist,
      setdialogpagtype,
      setdialogpaglist,
    };
  },
  {
    persist: true,
  }
);
