<script>
import {
  Menu,
} from '@element-plus/icons-vue'
import MyAside from '@/components/MyAside/MyAside.vue';
import MyTabs from "@/components/MyTabs/MyTabs.vue";

export default {
  data() {
    return {
      title: '新增患者'
    }
  },
  methods: {
    // 获取 MyAside 组件传递的 title
    handleChangeTitle(newTitle) {
      this.title = newTitle
    }
  },
  components: {
    MyTabs,
    Menu,
    MyAside
  }
}
</script>

<template>
  <div class="management">
    <el-container>
      <!--   侧边栏   -->
      <MyAside @handleChangeTitle="handleChangeTitle"></MyAside>
      <!--   主体内容   -->
      <el-container>
        <el-main>
          <!--     tab 标签切换     -->
          <MyTabs :title="title"></MyTabs>
          <!--     对应内容显示     -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
*:deep(.el-container) .el-main {
  padding: 12px;
}

.main {
  transition: all .5s;
  background-color: white;
  background-image: linear-gradient(125deg, #E4FFCD, #6DD5FA, #2980B9, #E4FFCD);
  background-size: 400%;
  border-left: 4px solid #52e6f3;
  padding: 0;

  > div {
    padding: 10px;
    width: 100%;
    height: 100%;
    background-color: #363636;
  }
}
</style>
