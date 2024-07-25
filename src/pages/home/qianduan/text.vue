<template>
  <div v-loading="loading">
    <header>
      <el-input
        v-model="params.keyword"
        size="large"
        placeholder="走进 IT  拥抱生活 ~ "
        :suffix-icon="Search"
        @keyup.enter="gotoIndex"
      />
    </header>
    <nav>
      <span
        :class="isactive == index ? 'addclass' : ''"
        v-for="(item, index) in optionList"
        :key="index"
        @click="clioption(item, index)"
      >
        {{ item }}
      </span>
    </nav>

    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li
        v-for="item in textList"
        :key="item.textid"
        class="infinite-list-item"
        @click="gotoDetail(item)"
      >
        <h4>{{ item.title }}</h4>
        <p class="textp1">
          <span v-html="item.text"></span>
        </p>
        <p class="textp2">
          <span class="spn1">作者: {{ item.name }}</span>
          <span> | 浏览量: {{ item.size }}</span>
          <span style="margin-left: 50px">发布于: {{ item.time }}</span>
        </p>
        <el-button
          type="primary"
          class="btn1"
          @click.stop="setdetail(item)"
          v-if="item.userid == userid"
          >编辑</el-button
        >
        <el-popconfirm
          confirm-button-text="好"
          cancel-button-text="NO"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="是否确定删除? 此操作不可撤回!"
          @confirm="confirmEvent(item)"
        >
          <template #reference>
            <el-button
              type="danger"
              class="btn2"
              v-if="item.userid == userid"
              @click.stop=""
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </li>
    </ul>
    <el-drawer v-model="dialog" :title="dialogtitle" direction="rtl" size="65%">
      <div
        v-for="item in detailList"
        :key="item.textid"
        style="margin-bottom: 55px"
      >
        <h5>作者: {{ item.name }}</h5>
        <h5>发布时间: {{ item.time }}</h5>
        <h5 style="color: red">
          著作权归作者所有,商业转载请联系作者获得授权，非商业转载请注明出处。
        </h5>
      </div>
      <div
        class="editor-content-view"
        v-for="item in detailList"
        :key="item.textid"
        v-html="item.text"
      ></div>
    </el-drawer>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import api from "@/api/text";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import Prism from "prismjs"; //导入代码高亮插件的core（里面提供了其他官方插件及代码高亮样式主题，你只需要引入即可）
import "prismjs/themes/prism-tomorrow.min.css";
import "@wangeditor/editor/dist/css/style.css";
import { Base64 } from "js-base64";
import { useRouter } from "vue-router";
let router = useRouter();

let textList = ref([]); // 文章列表
let loading = ref(true);
let detailList = ref([]);
let dialogtitle = ref("");
let optionList = ref([
  "全部",
  "BUG",
  "Vue",
  "React",
  "Nodejs",
  "JS",
  "HTML",
  "Three",
  "3D",
]); // 文章分类
let isactive = ref(0);
let gettextnum = ref(0);
let gettextnumtw = ref(0);

const dialog = ref(false);
let userid = ref(JSON.parse(localStorage.getItem("userinfo")).userid);
let params = ref({
  // userid: JSON.parse(localStorage.getItem("userinfo")).userid, // 用户id
  keyword: "", // 搜索关键字
  page: 1, // 页码
  type: "", // 这里为空则是请求全部数据,
});
const gotoDetail = (item) => {
  detailList.value = [];
  detailList.value.push(item);
  dialogtitle.value = item.title;
  dialog.value = true;
  setTimeout(() => {
    Prism.highlightAll(); // 全局代码高亮
  }, 100);
  api.browse(item).then((res) => {
    // console.log(res);
  });
};
const load = () => {
  params.value.page += 1;
  if (gettextnum.value == 0) {
    // 触底递增page请求列表数据, 新数据push到textList即可
    api.gettext(params.value).then((res) => {
      if (res.data.list != [] && res.data.list.length != 0) {
        res.data.list.forEach((item) => {
          item.text = Base64.decode(item.text);
          textList.value.push(item);
        });
      } else {
        gettextnum.value = 1;
      }
    });
  }
};
onMounted(() => {
  gettext();
});
const gettext = () => {
  if (gettextnumtw.value == 0) {
    loading.value = true;
    api.gettext(params.value).then((res) => {
      if (res.data.list.length > 0) {
        res.data.list.forEach((item) => {
          item.text = Base64.decode(item.text);
        });
        textList.value = res.data.list;
        setTimeout(() => {
          Prism.highlightAll(); // 全局代码高亮
        }, 100);
      } else {
        textList.value = res.data.list;
        gettextnumtw.value == 1;
      }
      loading.value = false;
    });
  }
};
const clioption = (item, index) => {
  gettextnum.value = 0;
  gettextnumtw.value == 0;
  isactive.value = index;
  if (item != "全部") {
    params.value.type = item;
    params.value.page = 1;
    gettext();
  } else {
    params.value.type = "";
    params.value.page = 1;
    gettext();
  }
};
const gotoIndex = () => {
  params.value.page = 1;
  gettext();
};
const setdetail = (item) => {
  router.push({ path: "/publish", query: item });
};

const confirmEvent = (item) => {
  romove(item);
};
const romove = (item) => {
  let obj = {
    userid: item.userid,
    textid: item.textid,
  };
  // 确认删除
  api.removeText(obj).then((res) => {
    if (res.data.code == 1) {
      ElMessage.success("删除成功!");
      params.value.page = 1;
      gettext();
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
</script>
<style scoped lang="scss">
header {
  text-align: center;
}
nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  span {
    padding: 6px 20px;
    background-color: rgb(236, 245, 255);
    border-radius: 40%;
    font-weight: 600;
    color: rgb(92, 137, 188);
    &:hover {
      cursor: pointer;
      color: rgb(225, 110, 9);
    }
  }
}
.infinite-list {
  height: 620px;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: 15px;
  .infinite-list-item {
    height: 80px;
    border-bottom: 1px solid var(--el-border-color-light);
    // border-radius: 6px;
    // margin-top: 10px;
    padding: 10px;
    position: relative;
    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
      // transform: calc(1.2);
      .textp1 {
        color: rgb(103, 171, 249);
      }
    }
    .textp1 {
      // border: 1px solid #f5f5f5;
      height: 33px;
      width: 70%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //设置行数
      overflow: hidden;
      font-size: 12px;
      color: #bdbdbd;
      margin-top: 2px;
    }
    .textp2 {
      margin-top: 13px;
      font-size: 12px;
      color: #bdbdbd;
      // margin-top: 10px;
      display: flex;
      align-items: flex-end;
    }
    .btn1 {
      position: absolute;
      right: 100px;
      bottom: 10px;
    }
    .btn2 {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.editor-content-view {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 15px 10px 15px;
  overflow-x: auto;
  ::v-deep P {
    white-space: pre-wrap; /* 保留空格 */
    margin-top: 5px;
  }
  ::v-deep li {
    white-space: pre-wrap; /* 保留空格 */
  }
  ::v-deep blockquote {
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
  }
  //  ::v-deep code {
  //     font-family: monospace;
  //     background-color: #e78181;
  //     padding: 3px;
  //     border-radius: 3px;
  //   }
  ::v-deep table {
    border-collapse: collapse;
  }
  ::v-deep td {
    border: 1px solid #ccc !important;
    min-width: 50px;
    height: 20px;
    text-align: center;
  }
  ::v-deep th {
    border: 1px solid #ccc !important;
    min-width: 50px;
    height: 20px;
    background-color: #f1f1f1;
  }
  ::v-deep input[type="checkbox"] {
    margin-right: 5px;
  }
  ::v-deep ul {
    padding-left: 20px;
  }
  ::v-deep ol {
    padding-left: 20px;
  }
  ::v-deep .editor-content-view {
    ::v-deep pre {
      ::v-deep code {
        display: block;
        padding: 10px;
      }
    }
  }
}
.addclass {
  color: rgb(225, 110, 9);
}
</style>
