<template>
  <div>
    <div>
      {{ checkList }}
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="a" />
        <el-checkbox label="title" />
        <el-checkbox label="id" />
      </el-checkbox-group>
    </div>
    <el-table :data="tableData">
      <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="item of columns.filter((item) => checkList.includes(item.prop))"
          :key="item.prop"
      />
    </el-table>
    <draggable v-model="cs" @start="drag = true" @end="drag = false" item-key="name">
      <template #item="{ element, index }">
        <div class="it">
          <div>第{{ index + 1 }} 节课</div>
          <div>
            <el-input placeholder="课程名称" v-model="element.name" />
          </div>
          <div>
            <el-time-picker placeholder="上课时间" v-model="element.time" />
          </div>
          <el-button type="plain" @click="cs.splice(index, 1)"> 删除 </el-button>
        </div>
      </template>
    </draggable>

    <el-button @click="cs.push({ name: '', time: '' })">添加数组</el-button>

    <el-button @click="tj">提交</el-button>
    <hr />
    {{ cs }}

    <hr />
    <div>年龄 <el-input placeholder="用户年龄" v-model.number="age" /></div>
    <div>出生年月<el-input placeholder="出生年月" v-model="birth" /></div>
    <hr />
    birth:{{ birth }} <br />
    age: {{ age }}

    <hr />

    <div>可选时段 当前的小时： {{ nowhour }}</div>
    <div class="t" :class="{ dis: nowhour >= item }" v-for="item of times" :key="item">
      {{ item }}:00
    </div>

    <hr />
  </div>
</template>
<script>
// import printJS from 'print-js'; // npm i print-js
// import { utils, writeFileXLSX, read } from 'xlsx'; // npm i xlsx
import draggable from 'vuedraggable'; // npm i vuedraggable
// import { dayjs } from 'element-plus'; // npm i element-plus

export default {
  data() {
    return {
      checkList: [],
      cs: [],
      drag: false,
      age: '',
      birth: '',
      ct: 1,
      nowhour: new Date().getHours(),
      times: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      columns: [
        { prop: 'id', label: 'id' },
        { prop: 'title', label: '标题' },
        { prop: 'a', label: 'a' },
      ],
      tableData: [
        { id: 1, title: '我是标题1', a: 1 },
        { id: 2, title: '我是标题2', a: 1 },
        { id: 3, title: '我是标题3', a: 1 },
        { id: 4, title: '我是标题4', a: 1 },
      ],
    };
  },
  watch: {
    age(nv) {
      console.log(nv);
      const now = new Date();
      now.setFullYear(now.getFullYear() - nv);
      this.birth = dayjs(now).format('YYYY-MM-DD');
    },
  },
  components: {
    draggable,
  },
  methods: {
    preparePrint(row) {
      this.showprint = true;
      this.info = row;
    },
    ok(res, fileFlist) {
      console.log('res', res);
      console.log(fileFlist);
      this.good.cover = res.msg;
    },
    tj() {
      console.log(JSON.stringify(this.cs)); //  JSON.parse
    },
    input(file) {
      // 用FileReader来完成数据流的转换
      const reader = new FileReader();
      // const list = [];
      reader.onload = (e) => {
        console.log('读取一个文件', e);
        const data = e.target.result;
        console.log('file', data);
        // 通过XLSX来解析出workbook（工作簿）也就导入的excel文件
        const wb = read(data, { type: 'binary' });
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
    },
    ouput() {
      // 把数据添加到 sheet对象当中
      const sheet1data = this.list.map((item) => ({
        id: item.id,
        标题: item.title,
      }));

      // 把数据写入到sheet当中
      const sheet1 = utils.json_to_sheet(sheet1data);

      // 新建一个 工作簿
      const wb = utils.book_new();
      // 在wordkbook当中追加sheet
      utils.book_append_sheet(wb, sheet1, 'sheet1');

      // 以上的流程只是完成了 excel文件的对象的构造。我们还需要想办法把它下载下来
      writeFileXLSX(wb, `${Date.now()}.xlsx`);
    },
    print() {
      printJS({
        printable: 'printzone',
        type: 'html',
        targetStyles: ['*'],
      });
    },
  },
};
</script>

<style>
.it {
  display: flex;
}
.t {
  width: 200px;
  height: 50px;
  border: 1px solid red;
  line-height: 50px;
  text-align: center;
}
.dis {
  background: #ccc;
}
</style>
