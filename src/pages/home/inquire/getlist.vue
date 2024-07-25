<template>
  <div class="getlist">
    <el-row>
      <el-col :span="8" class="cols">
        <span>标题: </span>
        <el-input
          v-model="inQuire.title"
          placeholder="请输入标题"
          clearable
          size="large"
        />
      </el-col>
      <el-col :span="13" class="cols">
        <span>时间: </span>
        <el-date-picker
          v-model="inQuire.data"
          type="daterange"
          range-separator="TO"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-col>
      <el-col :span="3" class="cols btncol">
        <el-button type="primary" @click="inquire()">查询</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="arylist"
      style="width: 100%; margin-top: 10px; border-top: 1px solid #dfe6ec"
      :row-class-name="tableRowClassName"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      v-loading="loading"
    >
      <el-table-column type="expand" width="50">
        <template #default="props">
          <div class="tableslot"><span>详情:</span> {{ props.row.text }}</div>
        </template>
      </el-table-column>

      <el-table-column type="index" width="70" label="序号" />

      <el-table-column prop="title" label="标题" />
      <el-table-column prop="state" label="状态">
        <template #default="props">
          <template v-if="props.row.state == '1'">
            <span class="next">已完成</span>
          </template>
          <template v-else>
            <span class="clos">未完成</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="data" label="录入时间" sortable />

      <el-table-column fixed="right" label="操作" width="120">
        <template #default="props">
          <el-button
            link
            type="primary"
            size="small"
            @click="getcompile(props.row.id)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="getdelete(props.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="修改" draggable>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
        v-loading="loading"
      >
        <el-form-item label="备忘录标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>

        <el-form-item label="是否已完成" prop="state">
          <el-switch
            v-model="ruleForm.state"
            :active-icon="Check"
            :inactive-icon="Close"
            inline-prompt
          />
        </el-form-item>
        <el-form-item label="日期" prop="data">
          <el-date-picker
            v-model="ruleForm.data"
            type="date"
            placeholder="请选择日期"
            clearable
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input
            v-model="ruleForm.text"
            type="textarea"
            clearable
            maxlength="1000"
            show-word-limit
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submits()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-pagination
      class="pagesize"
      background
      layout="prev, pager, next"
      :total="total"
      :pager-count="5"
      @current-change="handleSizeChange"
      :hide-on-single-page="true"
    />
  </div>
</template>
<script setup>
import { Check, Close } from "@element-plus/icons-vue";
import "dayjs/locale/zh-cn";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api/getlist";
import { useRouter } from "vue-router";
const router = useRouter();

let arylist = ref([]); // 列表数组
let total = ref(0); // 历史单总条数
let formSize = ref("default");
const loading = ref(false);

let params = ref({
  page: 1, // 列表分页第几页
  userid: JSON.parse(localStorage.getItem("userinfo")).userid,
});
// 弹窗
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
let ruleForm = ref({
  id: "",
  title: "", // 备忘录标题
  state: false, // 状态
  text: "", // 内容
  data: "", // 日期
  userid: JSON.parse(localStorage.getItem("userinfo")).userid,
});
let inQuire = ref({
  type: "inquire", // 作为查询的标识
  title: "", // 备忘录标题
  data: "", // 日期
  userid: JSON.parse(localStorage.getItem("userinfo")).userid,
});
// 使用onMounted
onMounted(() => {
  getlist(params.value);
});
// 查询
const inquire = () => {
  if (inQuire.value.title != "" || inQuire.value.data != "") {
    getlist(inQuire.value);
  } else {
    reset();
  }
};
// 编辑
const getcompile = (id) => {
  dialogFormVisible.value = true;
  for (let i = 0; i < arylist.value.length; i++) {
    if (arylist.value[i].id === id) {
      ruleForm.value = { ...arylist.value[i] };
      if (arylist.value[i].state == "1") {
        ruleForm.value.state = true;
      } else {
        ruleForm.value.state = false;
      }
    }
  }
};
// 提交
const submits = () => {
  loading.value = true;
  dialogFormVisible.value = false;
  api.getcompile(ruleForm.value).then((res) => {
    if (res.data.code == 1) {
      ElMessage.success(res.data.msg);
      loading.value = false;
      getlist(params.value);
    } else {
      ElMessage.error(res.data.msg);
      loading.value = false;
    }
  });
};
// 删除
const getdelete = (id) => {
  loading.value = true;
  api.getdelete({ id: id,userid:JSON.parse(localStorage.getItem("userinfo")).userid }).then((res) => {
    if (res.data.code == 1) {
      ElMessage.success(res.data.msg);
      deleteById(arylist.value, id);
      loading.value = false;
    } else {
      ElMessage.error(res.data.msg);
      loading.value = false;
    }
  });
};
// 重置
const reset = () => {
  inQuire.value.title = "";
  inQuire.value.data = "";
  params.value.page = 1;
  getlist(params.value);
};
// 获取数据
const getlist = (parms) => {
  api.getlist(parms).then((res) => {
    if (res.data.code == 1) {
      arylist.value = res.data.list;
      if (res.data.total) {
        total.value = res.data.total;
      } else {
        total.value = res.data.totalshai;
      }
    } else {
      router.push("/login");
      ElMessage.error(res.data.message);
    }
  });
};
const handleSizeChange = (val) => {
  params.value.page = val;
  getlist(params.value);
};
const tableRowClassName = ({ row, rowIndex }) => {
  // console.log(row.state);
  // 如果等于1就是完成的
  if (row.state == 1) {
    return "warning-row";
  } else {
    return "success-row";
  }
};
// 删除后进行切割
const deleteById = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      break;
    }
  }
};
</script>
<style scoped lang="scss">
.getlist {
  .pagesize {
    position: absolute;
    bottom: 20px;
    right: 5%;
  }
  .tableslot {
    padding: 20px;
    span {
      color: rgb(51, 140, 228);
      padding-right: 20px;
    }
  }
  .cols {
    display: flex;
    align-items: center;
    span {
      min-width: 45px;
      text-align: center;
      font-size: 14px;
    }
    .el-input {
      width: 50% !important;
    }
  }
  .btncol {
    justify-content: end;
  }
}
.next {
  color: rgb(107, 170, 109);
}
.clos {
  color: rgb(196, 84, 84);
}
</style>
