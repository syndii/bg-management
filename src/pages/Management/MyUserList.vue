<script>
import {ElMessage} from 'element-plus';
import {addDataList, getDataList} from '../../api/patients';
import MyPageFour from '../../components/MyPage.vue'
import {Search} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import printJS from 'print-js';
import draggable from 'vuedraggable'; // npm i vuedraggable
import Sortable from 'sortablejs'
// import { utils, writeFileXLSX, read } from 'xlsx';

export default {
  data() {
    return {
      searchData: '', // 搜索的值
      searchList: [], // 搜素的结果
      state1: '',
      restaurants: [],
      tableData: [], // 列表显示数据
      tableFilters: [], // 列表过滤
      tableFiltersList: [
        {
          prop: 'uname',
          label: '姓名',
        },
        {
          prop: 'sex',
          label: '性别',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'tel',
          label: '电话',
        },
        {
          prop: 'address',
          label: '地址',
        },
      ],
      dropCol: [
        {
          prop: 'uname',
          label: '姓名',
        },
        {
          prop: 'sex',
          label: '性别',
        },
        {
          prop: 'age',
          label: '年龄',
        },
        {
          prop: 'tel',
          label: '电话',
        },
        {
          prop: 'address',
          label: '地址',
        },
      ],
      checkList: [], // 选中的内容
      // 添加流程
      drawer: false, // 患者弹窗状态
      addForm: null,
      form: { // 患者添加信息
        uname: '',
        sex: '',
        age: '',
        tel: '',
        address: '',
      },
      rules: { // 设置添加信息的规则
        name: [
          {
            required: true,
            message: '请输入姓名',
          },
        ],
        tel: [
          {
            required: true,
            message: '请输入电话',
          },
          {
            min: 11,
            max: 12,
            message: '请输入正确的电话号码',
          }
        ]
      },
      // 分頁配置
      total: 50, // 总页数
      currentPage: 1, // 默认页数
      pageSize: 5, // 默认显示数量
      oneData: false, // 是否第一次获取数据
      /* 更改流程 */
      upDrawer: false, // 更改内容的抽屉状态
      upForm: null, // 获取更改表单实例
      upData: { // 更改添加信息
        name: '',
        tel: '',
        sex: '',
        userId: '',
        address: '',
        age: '',
        a: '',
        c: '',
        id: '',
      },
      // 自定义列内容
      columns: [
        {
          index: 'sex',
          prop: 'sex',
          render(val) {
            if (val === 0) return '男';
            if (val === 2) return '未知';
            return '女';
          },
        },
        {
          index: 'createdAt',
          prop: 'createdAt',
          render(val) {
            return dayjs(val).format('YYYY-DD-MM');
          },
        },
        {
          index: 'updatedAt',
          prop: 'updatedAt',
          render(val) {
            return dayjs(val).format('YYYY-DD-MM');
          },
        },
      ],
      // 打印弹窗的状态
      showPrint: false,
      printData: [], // 打印数据列表
      // 拖拽状态
      drag: false,
      draggingIndex: -1, // 正在拖拽的列的索引
    }
  },
  methods: {
    // 添加内容
    async submitForm() {
      const res = await addDataList(this.form);
      const {success} = res;
      if (!success) ElMessage.error('添加患者失败');
      ElMessage.success(`添加${this.form.uname}患者成功`);
      this.drawer = false; // 将弹窗关闭
      this.addForm.resetField(); // 清空表单数据
      await this.getListData(); // 获取最新数据
      return '';
    },
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
      }
      this.tableData = data;
      ElMessage.success('获取数据成功');
      console.log(this.tableFilters)
      this.tableFilters = this.tableFilters.filter(item => item.label !== undefined)
    },
    createFilter: (queryString) => {
      return (restaurant) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    querySearch: (queryString, cb) => {
      // const results = queryString
      //     ? this.restaurants.filter(this.createFilter(queryString))
      //     : this.restaurants
      // // call callback function to return suggestions
      // cb(results)
    },
    handleSelect: (item) => {

    },
    // 点击编辑按钮弹出表单
    upBtn: async (row) => {
      // this.upDrawer.value = true;
      // this.upData.value = {...row};
      return; // ?
    },
    // 打印数据
    print(data) {
      printJS({
        printable: 'card',
        type: 'html',
        targetStyles: ['*'],
      });
    },
    // 打印模态框控制
    showPrints(data) {
      this.printData.push(data);
      this.showPrint = true;
    },
    // 删除患者信息
    // 点击删除返回该列
    getSelectionRows: (id) => {


      // ElMessageBox.confirm(
      //     '真的要删除吗',
      //     '不删除可不可以',
      //     {
      //       confirmButtonText: '确认',
      //       cancelButtonText: '取消',
      //       type: 'warning',
      //     },
      // ).then(async () => {
      //   const res: any = await delDataList(id);
      //   const {success} = res;
      //   console.log('删除的res：', res);
      //   if (!success) return ElMessage.warning('删除数据失败');
      //   ElMessage.success('删除数据成功');
      //   getListData();
      // });
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        draggable: `th:not(:is(:nth-child(1), :nth-child(${this.tableFiltersList.length + 2})))`,
        onEnd: evt => {
          console.log(evt);
          console.log("oldIndex", evt.oldIndex);
          console.log("newIndex", evt.newIndex);
          const listOldIndex = evt.oldIndex - 1;
          const listNewIndex = evt.newIndex - 1;

          const { prop, label } = this.tableFiltersList[listOldIndex];
          // console.log(listNewIndex)

          console.log(prop, label)
          console.log(`${label}跟${this.tableFiltersList[listNewIndex].label}互换`)
          this.tableFiltersList[listOldIndex].prop = this.tableFiltersList[listNewIndex].prop;
          this.tableFiltersList[listOldIndex].label = this.tableFiltersList[listNewIndex].label;
          console.log(prop, label)
          this.tableFiltersList[listNewIndex].prop = prop;
          this.tableFiltersList[listNewIndex].label = label;
          console.log(prop, label)

        }
      })
    },
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
  },
  mounted() {
    // 挂载成功获取最数据
    this.getListData();
    // 阻止默认行为
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.columnDrop()
  },
  // 监听是否有选择筛选
  watch: {
    checkList() {
      for (const item of this.tableFilters) {
        item.show = item.label !== undefined ? item.show = this.checkList.includes(item.label) : false
      }
      this.getListData();
    },
    // 监听搜索彼变化
    searchData(old) {
      const regex = new RegExp(`${old}`, 'i');
      old ? this.searchList = (this.tableData.filter(item => Object.values(item).some(value => regex.test(value)))) : this.searchList = []
    },
  },
  components: {
    Search,
    MyPageFour,
    draggable,
  },
}
</script>

<template>
  <div>
    <MyPageFour title="管理中心">
      <!-- 操作管理 -->
      <template #header>
        <div class="card" id="card">
          <div class="addButton" style="width: 100%;">
            <el-row :gutter="20" width="100%">
              <el-col :span="4">
                <el-button type="primary" @click="drawer = true">新增患者</el-button>
                <!--                <el-button type="primary">新增患者</el-button>-->
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchData" class="w-50 m-2" placeholder="搜索姓名/电话">
                  <template #prefix>
                    <el-icon class="el-input__icon">
                      <search/>
                    </el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
                                 placeholder="Please Input" @select="handleSelect"/>
              </el-col>
            </el-row>
            <div class="demo-input-suffix">

            </div>
          </div>
          <div class="check-box">
            <!-- 展示内容 -->
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in tableFiltersList" :key="item['label']" :label="item['label']" size="large"/>
            </el-checkbox-group>
          </div>
        </div>
      </template>
      <!-- 患者列表 -->
      <div class="card card-table">
        <el-table :data="searchList.length ? searchList : tableData" row-key="getRowKey" stripe style="width: 100%;" scrollbar-always-on>

          <el-table-column fixed width="75px" type="index" label="序号"/>
          <!--     获取的内容     -->
          <template v-for="(item, index) in tableFiltersList" :key="item['label']">
            <el-table-column width="150px" :prop="item.prop" :label="item.label">
              <template #default="{ row }">
                <template v-if="item.render">
                  {{ item.render(row[item.value]) }}
                </template>
              </template>
            </el-table-column>
          </template>

          <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="upBtn(row)">编辑</el-button>
              <el-button link type="primary" size="small" @click="getSelectionRows(row.id)">删除</el-button>
              <el-button link type="success" size="small" @click="showPrints(row)">打印</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--        <el-table :data="searchList.length ? searchList : tableData" stripe style="width: 100%;" scrollbar-always-on>-->
        <!--          <el-table-column fixed width="75px" type="index" label="序号"/>-->
        <!--          <template v-for="item of tableFilters" :key="item">-->
        <!--            <el-table-column v-if="item['show']" width="150px" :prop="item['value']" :label="item['label']">-->
        <!--              <template #default="{ row }">-->
        <!--                <template v-if="item['render']">{{ item.render(row[item['value']]) }}</template>-->
        <!--              </template>-->
        <!--            </el-table-column>-->
        <!--          </template>-->
        <!--          <el-table-column fixed="right" label="操作" width="120">-->
        <!--            <template #default="{ row }">-->
        <!--              <el-button link type="primary" size="small" @click="upBtn(row)">编辑</el-button>-->
        <!--              <el-button link type="primary" size="small" @click="getSelectionRows(row.id)">删除</el-button>-->
        <!--              <el-button link type="success" size="small" @click="showPrints(row)">打印</el-button>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--        </el-table>-->
      </div>
      <!-- 分页显示 -->
      <template #footer>
        <div class="example-pagination-block">
          <el-pagination handleCurrentChange @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                         layout="total, sizes, prev, pager, next, jumper" :total="total"/>
        </div>
      </template>

      <!-- 添加患者弹窗 -->
      <el-drawer close="add-drawer" v-model="drawer" size="50%" title="I am the title">
        <template #header>
          <h3>新增患者</h3>
        </template>
        <el-form :model="form" :rules="rules" ref="addForm">
          <el-form-item label="姓名: " required>
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="电话: " required>
            <el-input v-model="form.tel"/>
          </el-form-item>
          <el-form-item label="性别: " required>
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="0"/>
              <el-option label="女" value="1"/>
              <el-option label="未知" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄: " required>
            <el-input v-model="form.age"/>
          </el-form-item>
          <el-form-item label="居住地址: ">
            <el-input v-model="form.address"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">
              确认
            </el-button>
            <el-button @click="drawer = false">取消</el-button>
            <el-button @click="drawer = false">清空</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>

      <!--   打印弹窗   -->
      <el-dialog v-model="showPrint"
                 title="打印数据"
                 width="40%"
                 align-center>
        <el-table :data="printData" border style="width: 100%">
          <el-table-column prop="uname" label="姓名" width="180"/>
          <el-table-column prop="age" label="年龄" width="180"/>
          <el-table-column prop="tel" label="电话" width="180"/>
          <el-table-column prop="address" label="Address"/>
        </el-table>
        <el-button type="primary" @click="print">立即打印</el-button>
      </el-dialog>
    </MyPageFour>
  </div>
</template>

<style lang="scss" scoped>
.card {
  //background-color: #363636;
  border-radius: 4px;
  margin: 6px 0;
  padding: 20px;
  box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: .3);
}

.card-table {
  flex: 1;
  display: flex;
  width: 50px;
}

// 列表样式
table {
  th {
    background-color: #363636 !important;

    div {
      color: white;
    }
  }

  td {
    background-color: #363636 !important;

    div {
      color: white;
    }
  }
}

// 展示内容
.check-box {
  span {
    color: white !important;

  }
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fd7579 !important;
  border-color: #fd7579 !important;
}
</style>
