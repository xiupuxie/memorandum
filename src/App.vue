<template>
  <router-view @contextmenu.prevent></router-view>
</template>

<script setup>
import { onMounted } from "vue";
const isProduction = import.meta.env.VITE_API;
if (isProduction) {
  onMounted(() => {
    // 监听全局键盘事件, 阻止ctrl键+Shift+c生效;
    // document.onkeydown = function (e) {
    //   if (e.shiftKey || e.keyCode === 123) {
    //     e.returnValue = false;
    //   }
    // };
    document.onkeydown = function (e) {
      if ((e.ctrlKey && e.shiftKey && e.keyCode === 67) || e.keyCode === 123) {
        e.returnValue = false;
      }
    };

    (() => {
      function block() {
        setInterval(() => {
          (function () {
            return false;
          })
            ["constructor"]("debugger")
            ["call"]();
        }, 50);
      }
      try {
        block();
      } catch (err) {}
    })();
  });
}

//   if (window.location.href.indexOf("#debug") == -1) {
//     setInterval(function () {
//       (function (a) {
//         return (function (a) {
//           return Function('Function(arguments[0]+"' + a + '")()');
//         })(a);
//       })("bugger")("de", 0, 0, (0, 0));
//     }, 1000);
//   }
// const toDevtools = () => {
//   var startTime = new Date().getTime();
//   debugger;
//   var endTime = new Date().getTime();
//   var timeDiff = endTime - startTime;
//   if (timeDiff < 100) {
//     console.log("Developer tools are open");
//     alert("还挺调皮哦 !");
//     // 跳转到百度
//     // window.location.href = "https://www.baidu.com";
//   } else {
//     console.log("Developer tools are closed");
//   }
// };
</script>
<style scoped lang="scss"></style>
