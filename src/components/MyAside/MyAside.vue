<script>
import {Coin, DocumentCopy, Location, Message, OfficeBuilding, School, Setting} from "@element-plus/icons-vue";
import AsideMenu from "../../Menu/AsideMenu.ts";

export default {
  name: 'MyAside',
  components: {DocumentCopy, Coin, Message, School, Setting, Location, OfficeBuilding},
  data: () => {
    return {
      isCollapse: false, // 控制侧边栏是否显示
      defaultActive: '1-1', // 设置默认激活的菜单项为菜单1-1
      defaultOpeneds: ['1'], // 设置默认展开的菜单项为菜单1
      AsideMenu, // 引入 侧边栏数据
      editableTabs: [],
    }
  },
  methods: {
    handleOpen: () => {
    },
    handleClose: () => {
    },
    // 侧边栏切换
    handleChangeTitle(value) {
      let newTitle = ''; // 侧边栏标题
      let path = ''; // 侧边栏对应路径
      value = value.split('-')
      if (value.length === 2) {
        newTitle = AsideMenu[value[0] - 1]['children'][value[1] - 1].label
        path = AsideMenu[value[0] - 1]['children'][value[1] - 1].value
      }
      const paths = `/${this.$route.path.split('/')[1]}/${path}`; // 组合对应菜单页路径
      this.editableTabs = this.$store.state.editableTabs; // tabs 的列表
      const index = this.$store.state.editableTabs.length + 1; // tabs 索引值

      // 过滤是否有一样的 tabs 标签
      const hasTabs = this.editableTabs.some((tab, index, self) => {
        return self.some(obj => obj.content === paths);
      });
      if (!hasTabs) {
        const newTabs = { // 传入 vuex tabs 的数据
          title: newTitle,
          name: index,
          content: paths,
        }

        this.editableTabs.push(newTabs)

        this.$store.dispatch('asyncUpTabs', this.editableTabs)
      }

      // 传递对应的 title
      this.$emit('handleChangeTitle', newTitle);
      this.$router.push(paths)
    },
    getIconComponent(iconName) {
      // 根据图标名称返回对应的组件
      switch (iconName) {
        case 'OfficeBuilding':
          return OfficeBuilding;
        case 'Location':
          return Location;
        case 'Setting':
          return Setting;
        case 'School':
          return School;
        case 'Message':
          return Message;
        case 'Coin':
          return Coin;
        case 'DocumentCopy':
          return DocumentCopy;
        default:
          return null;
      }
    }
  },
}
</script>

<template>
  <!--   侧边栏   -->
  <el-aside width="200px">
    <!--   内容显示     -->
    <el-menu
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        popper-effect="light"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        active-text-color="#999"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        @select="handleChangeTitle"
    >
      <!--   侧边栏头部内容 -->
      <div class="demo-fit">
        <div class="block">
          <el-avatar shape="circle" :size="75" fit="fill"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          <span class="title">你好, {{ '管理员' }}, 欢迎登录</span>
        </div>
      </div>
      <el-sub-menu v-for="item in AsideMenu" :index="item.index" :key="item.index">
        <template #title>
          <el-icon>
            <component :is="getIconComponent(item.icon)"/>
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" :label="child.label" :index="child.index" :key="child.index">
            {{ child.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!--    控制按钮    -->
      <div class="menuHand" @click="isCollapse = !isCollapse">{{ isCollapse ? '>' : '<' }}</div>
    </el-menu>
  </el-aside>
</template>

<style scoped>
aside {
  height: 100%;

  .el-menu {
    height: 100%;
    position: relative;
    background-color: #444655;

    .el-sub-menu {
      color: #fff;
    }

    .el-icon {
      color: #fff;
    }

    .el-sub-menu__title * {
      color: #fff;
    }

    /* 一级样式结束 */

    *:deep(.el-sub-menu) .el-icon {
      color: #fff;
    }

    > li {
      color: #fff !important;

      span {
        color: #fff !important;
      }

      > div {
        background-color: red;
      }
    }

    *:deep(.el-sub-menu__title):hover {
      background-color: transparent;
    }

    *:deep(.el-sub-menu__title) span {
      color: #fff;
    }

    *:deep(.el-sub-menu__title) i {
      color: #fff;
    }

    *:deep(.el-menu) {
      background-color: #3cc4b5;

      *:deep(.el-menu-item-group) {
        color: #fff;


      }

      *:deep (li) {
        color: #fff;
      }
    }

    .el-sub-menu:hover {
      background-color: #343740;
    }

    :deep.el-sub-menu .el-sub-menu__title:hover {
      background-color: transparent !important;
    }

    *:deep(.el-menu-item-group) .el-menu-item-group__title {
      padding: 0;
    }

    *:deep(.el-menu-item-group) li {
      color: #fff;
      background-color: #23232f;
    }

    *:deep(.el-menu-item-group) li:hover {
      background-color: #329d93;
    }
  }
}


.menuHand {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: #23232f;
  color: #fff;
  flex: 1;
  padding: 18px 0;
  margin-top: auto;
  position: absolute;
  bottom: 0;
}

.el-main > div {
  height: 100%
}


.demo-fit {
  padding: 24px 0;

  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    color: #fff;
    font-size: 14px;
    margin-top: 12px;
  }
}

.demo-fit .block span:nth-child(1) {
  border: 1px solid #fff;
  background-color: transparent;
}

.demo-fit .block *:deep (img) {
  padding: 2px;
  border-radius: 50%;
}

</style>
