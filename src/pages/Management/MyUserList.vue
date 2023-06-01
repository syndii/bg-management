<script>
import {ElMessage, ElMessageBox} from 'element-plus';
import {addDataList, getDataList, upDataList, delDataList} from '../../api/patients';
import MyPageFour from '../../components/MyPage.vue'
import MyTabs from '../../components/MyTabs/MyTabs.vue';
import {HomeFilled, Search, UploadFilled} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import printJS from 'print-js';
import draggable from 'vuedraggable'; // npm i vuedraggable
import Sortable from 'sortablejs'
import {utils, writeFileXLSX, read} from 'xlsx';

export default {
  data() {
    return {
      getDataStart: false, // 默认弹窗一次
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
        {
          prop: 'createdAt',
          label: '创建时间',
        },
        {
          prop: 'updatedAt',
          label: '创建后时间',
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
        uname: [
          {
            required: true,
            message: '请输入姓名',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
          },
        ],
        passwords: [
          {
            required: true,
            message: '请确认密码',
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
      // 分页配置
      total: 50, // 总页数
      currentPage: 1, // 默认页数
      pageSize: 10, // 默认显示数量
      oneData: false, // 是否第一次获取数据
      /* 更改流程 */
      upDrawer: false, // 更改内容的抽屉状态
      upForm: null, // 获取更改表单实例
      upData: { // 更改添加信息
        uname: '',
        sex: '',
        age: '',
        tel: '',
        address: '',
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
      // 导入模态框状态
      showImport: false,
      importData: [], // 导入数据
    };
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
      }
      // 获取的数据更新到本地
      this.tableData = data;
      this.getDataStart || ElMessage.success('获取数据成功');
      this.getDataStart = true;
      // console.log(this.tableData)
      // 过滤掉本地显示的内容
      this.tableFilters = this.tableFilters.filter(item => item.label !== undefined)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // 搜索列表
    querySearch(queryString, cb) {
      // const results = queryString
      //     ? this.restaurants.filter(this.createFilter(queryString))
      //     : this.restaurants
      // // call callback function to return suggestions
      // cb(results)
    },
    // 搜索列表选择后
    handleSelect(item) {

    },
    // 点击编辑按钮弹出表单
    async upBtn(row) {
      this.upDrawer = true
      this.upData = {...row};
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
    // 确认编辑的表单信息
    async handleClick() {
      const {id} = this.upData;
      const res = await upDataList(id, this.upData);
      const {success} = res;
      if (!success) return ElMessage.error('数据更改失败');
      ElMessage.success('数据更新成功');
      await this.getListData();
      this.upDrawer = false;
    },
    // 删除患者信息
    // 点击删除返回该列
    async getSelectionRows(id) {
      ElMessageBox.confirm(
          '真的要删除吗',
          '不删除可不可以',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
      ).then(async () => {
        const res = await delDataList(id);
        const {success} = res;
        console.log('删除的res：', res);
        if (!success) return ElMessage.warning('删除数据失败');
        ElMessage.success('删除数据成功');
        await this.getListData();
      });
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        draggable: `th:not(:is(:nth-child(1), :nth-child(${this.tableFiltersList.length + 2})))`,
        onEnd: evt => {
          // 实现不拖拽头尾列内容
          const listOldIndex = evt.oldIndex - 1;
          const listNewIndex = evt.newIndex - 1;
          const {prop, label} = this.tableFiltersList[listOldIndex];
          this.tableFiltersList[listOldIndex].prop = this.tableFiltersList[listNewIndex].prop;
          this.tableFiltersList[listOldIndex].label = this.tableFiltersList[listNewIndex].label;
          this.tableFiltersList[listNewIndex].prop = prop;
          this.tableFiltersList[listNewIndex].label = label;

          // 实现与绑定的数据同步
          this.tableFilters = this.tableFiltersList.map(item => {
            const {label, prop} = item;
            const originalItem = this.tableFilters.find(obj => obj.label === label);
            return {
              label,
              value: prop,
              show: true,
              ...originalItem
            };
          });
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
    // 导入文件
    importFile(file) {
      // 用FileReader来完成数据流的转换
      const reader = new FileReader();
      // const list = [];
      reader.onload = (e) => {
        console.log('读取一个文件', e);
        const data = e.target.result;
        console.log('file', data);
        // 通过XLSX来解析出workbook（工作簿）也就导入的excel文件
        const wb = read(data, {type: 'binary'});
        console.log('wb', wb);

        const datajson = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        console.log('datajson', datajson);

        // // 这个wb包含的是一个excel文件当中的所有信息 精确到每个单元格
        // const th = datajson[0]; // 表头基础数据
        // const tb = datajson.slice(1); // 数据主体内容

        // console.log('th', th);
        // console.log('tb', tb);

        // const newarr = [];
        // // eslint-disable-next-line
        // for (const item of tb) {
        //   const newitem = {};
        //   // eslint-disable-next-line
        //   for (const key in item) {
        //     const colname = th[key];
        //     newitem[colname] = item[key];
        //   }
        //   newarr.push(newitem);
        // }

        // console.log('newarr', newarr);
        // this.iptlist = newarr;
      };
      // readAsBinaryString需要File 或 Blob 对象的参数
      reader.readAsArrayBuffer(file.raw);
    }
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
    UploadFilled,
    HomeFilled,
    Search,
    MyPageFour,
    draggable,
    MyTabs,
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
          <!--   导出 打印    -->
          <div>
            <el-button type="success" @click="this.showImport = true">导入</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        </div>
      </template>
      <!-- 患者列表 -->
      <div class="card card-table">
        <el-table :data="searchList.length ? searchList : tableData" row-key="getRowKey" stripe style="width: 100%;"
                  scrollbar-always-on>
          <!--     自定义列     -->
          <el-table-column fixed width="75px" type="index" label="序号"/>
          <!--     获取的内容     -->
          <template v-for="(item, index) in tableFiltersList" :key="item['label']">
            <el-table-column v-if="tableFilters[index]?.show" width="200px" :prop="item.prop" :label="item.label">
              <template #default="{ row }">
                <template v-if="tableFilters[index]?.render">
                  {{ tableFilters[index]?.render(row[tableFilters[index]?.value]) }}
                </template>
              </template>
            </el-table-column>
          </template>
          <!--     自定义操作栏     -->
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="{ row }">
              <div class="el-table-operate">
                <el-button type="primary" size="small" @click="upBtn(row)">编辑</el-button>
                <el-button type="danger" size="small" @click="getSelectionRows(row.id)">删除</el-button>
                <el-button type="success" size="small" @click="showPrints(row)">打印</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
            <el-input v-model="form.uname"/>
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
            <el-button type="danger" @click="addForm.resetField()">清空</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>

      <!-- 更改患者信息弹窗 -->
      <el-drawer close="add-drawer" v-model="upDrawer" size="50%" title="I am the title">
        <template #header>
          <h3>更改患者信息</h3>
        </template>
        <el-form :model="upData" :rules="rules" role="upForm">
          <el-form-item label="姓名: " required>
            <el-input v-model="upData.uname"/>
          </el-form-item>
          <el-form-item label="电话: " required>
            <el-input v-model="upData.tel"/>
          </el-form-item>
          <el-form-item label="性别: " required>
            <el-select v-model="upData.sex" placeholder="请选择性别">
              <el-option label="男" value="0"/>
              <el-option label="女" value="1"/>
              <el-option label="未知" value="2"/>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄: " required>
            <el-input v-model="upData.age"/>
          </el-form-item>
          <el-form-item label="居住地址: ">
            <el-input v-model="upData.address"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClick">
              确认
            </el-button>
            <el-button @click="upDrawer = false">取消</el-button>
            <el-button type="danger" @click="upForm.resetField()">清空</el-button>
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

      <!--   导入弹窗   -->
      <el-dialog v-model="showImport"
                 title="打印数据"
                 width="40%"
                 align-center>
        <el-upload
            class="upload-demo"
            drag
            action="#"
            multiple
            :on-change="importFile"
            :auto-upload="false"
        >
          <el-icon class="el-icon--upload">
            <upload-filled/>
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip" style="text-align: center">
              仅允许导入xs、xsx格式文件。<a href="#" class="el-text--success">下载模板</a>
            </div>
          </template>
        </el-upload>
        <div style="text-align: center">
          <el-button type="success">确认导入</el-button>
          <el-button @click="this.showImport = false">取消</el-button>
        </div>
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

.el-table-operate {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 6px 6px 0;
  }
}
</style>
