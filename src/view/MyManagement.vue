<script>
import {
  Document,
  Menu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
export default {
  data() {
    return {
      isCollapse: false, // 控制侧边栏是否显示
    }
  },
  methods: {
    handleOpen: () => {

    },
    handleClose: () => {

    },
  },
  components: {
    Document,
    Menu,
    Location,
    Setting
  }
}
</script>

<template>
  <div class="management">
    <el-container>
      <!--   侧边栏   -->
      <el-aside width="200px">
        <!--   内容显示     -->
        <el-menu
            default-active="1"
            popper-effect="light"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            active-text-color="#999"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            router
        >
          <el-menu-item index="user">
            <el-icon><icon-menu /></el-icon>
            <template #title>新增患者</template>
          </el-menu-item>
          <el-menu-item index="tree">
            <el-icon><icon-menu /></el-icon>
            <template #title>流程管理</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><setting /></el-icon>
            <template #title>患者管理</template>
          </el-menu-item>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><location /></el-icon>
              <span>短信中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <!--    控制按钮    -->
          <div class="menuHand" @click="isCollapse = !isCollapse">{{ isCollapse ? '>' : '<' }}</div>
        </el-menu>

      </el-aside>
      <!--   主体内容   -->
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
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
aside {
  height: 100%;

  .el-menu {
    height: 100%;
    position: relative;
    background-color: #001529;

    > li {
      color: #fff !important;

      span {
        color: #fff !important;
      }

      > div {
         background-color: red;
      }
    }
    > li:hover {
      background-color: rgba(255, 255, 255, .2);
    }
    :deep.el-sub-menu__title:hover {
      background-color: transparent;
    }
    :deep.el-sub-menu__title span {
      color: #fff;
    }
    :deep.el-sub-menu__title i {
      color: #fff;
    }

    :deep.el-menu {
      background-color: rgba(255, 255, 255, .2);

      :deep.el-menu-item-group {
        color: #fff !important;


      }
      :deep li {
        color: #fff !important;
      }
    }

      .el-sub-menu:hover {
      background-color: rgba(255, 255, 255, .2) !important;
    }
  }
}

.menuHand {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: #024276;
  color: #fff;
  flex: 1;
  padding: 18px 0;
  margin-top: auto;
  position: absolute;
  bottom: 0;
}

.el-main>div {height: 100%}
</style>
