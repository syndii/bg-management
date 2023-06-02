<script>
import {ElMessage} from "element-plus";
import {getDataList} from "@/api/patients.js";

export default {
  data: () => {
    return {
      // 分页配置
      total: 50, // 总页数
      currentPage: 1, // 默认页数
      pageSize: 10, // 默认显示数量
      oneData: false, // 是否第一次获取数据
      pageSizes: [5, 10, 15, 20], // 分页的显示数量
    }
  },
  methods: {

    /*
      路径 显示数量 默认
    *  传入请求的路径然后 获取对应的表数据
    * */
    /* 请求流程 */
    async getListData() {
      const res = await getDataList({
        $limit: this.pageSize, // 查询多少条数据
        $skip: (this.currentPage - 1) * this.pageSize, // 跳过多少条数据
      });
      const {data, success} = res; // 结构数据

      if (!success) ElMessage.error('获取数据列表失败') // 失败提示
      if (!this.oneData) {
        Object.keys(data[0]).forEach((key) => {
          if (key) {
            // 判断是否有 自定义列渲染
            let others = {};
            const isExist = this.columns.find((item) => item.index === key);
            // 筛选掉获取的信息
            const keyTitle = this.tableFiltersList.find(item => item.prop === key ? item.label : '')
            if (isExist) others = {...isExist};
            this.tableFilters.push({
              label: keyTitle?.label,
              value: key,
              show: true,
              ...others,
            },);
            this.checkList.push(keyTitle?.label);
            this.checkList = [...this.checkList];
            this.oneData = true;
          }
        });
      }},
    // 切换页面显示数量
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListData();
    },
    // 切换页码事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListData();
    },
  }
}
</script>

<template>
  <!-- 分页显示 -->
  <template #footer>
    <div class="example-pagination-block">
      <el-pagination handleCurrentChange @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"/>
    </div>
  </template>
</template>

<style></style>
