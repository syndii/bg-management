<script>
import {Search, Timer} from "@element-plus/icons-vue";
import dayjs from "dayjs";

export default {
  data() {
    return {
      navSearch: '', // 搜索记录
      currentTime: dayjs().format('YYYY年MM月DD日 HH:mm:ss'), // 获取当前时间并格式化
      menu: [ // 之后可以写多个界面
        {
          path: '/',
          name: '首页',
        },
        {
          path: 'http',
          name: '后台管理1',
        },
      ]
    }
  },
  mounted() {
    this.getTimer()
  },
  methods: {
    getTimer() {
      setInterval(() => {this.currentTime = dayjs().format('YYYY年MM月DD日 HH:mm:ss')}, 100)
    }
  },
  components: {
    Timer,
    Search,
  }
}
</script>

<template>
  <div class="index">
    <div class="common-layout">
      <el-container>
        <!--  导航栏内容  -->
        <el-header>
          <img src="../assets/image/logo.png" alt="" class="logo_img">
          <nav class="navigation-nav">
            <ul class="navbar-nav">
              <li class="navbar-link" @click="this.$router.push(`${item.path}`)" v-for="(item, index) in menu"
                  :key="item.index"><a href="" class="navbar-item">{{ item.name }}</a></li>
            </ul>
          </nav>
          <div class="nav-form">
            <!--      搜索框      -->
            <div class="nav-search">
              <el-input v-model="navSearch" class="w-50 m-2" placeholder="Type something">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <search/>
                  </el-icon>
                </template>
              </el-input>
            </div>
            <!--     时间显示       -->
            <div class="current-timer-box">
              <el-icon><Timer /></el-icon>
              <span>{{currentTime}}</span>
            </div>

            <div class="nav-user">
              <el-popover
                  :width="200"
                  popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <template #reference>
                  <el-avatar
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  />
                </template>
                <template #default>
                  <div
                      class="demo-rich-conent"
                      style="display: flex; gap: 16px; flex-direction: column"
                  >

                    <p class="demo-rich-content__desc" style="margin: 0">
                      名字: user
                    </p>
                    <el-button type="success" class="user-button" @click="this.$router.push('/login')">登录</el-button>
                    <el-button type="danger" class="user-button" @clikc="">登出</el-button>
                  </div>
                </template>
              </el-popover>

            </div>
          </div>
        </el-header>
        <!--  主题内容    -->
        <div class="main">
          <router-view></router-view>
        </div>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">

.common-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .el-header {
    --el-header-height: 75px;
    width: 100%;
    padding: 10px;
    background-color: #21262f;
    display: flex;

    .logo_img {
      height: 100%;
      min-height: 50px;
      object-fit: cover;
    }

    /* 导航栏 */
    nav {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: auto;

      .navbar-nav {
        display: flex;

        & li {
          margin: 0 1vw;

          a {
            position: relative;
            font-size: 20px;
            color: #fff;
            text-transform: none !important;
            padding: 0 6px;

          }

          .active::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
          }
        }
      }
    }

    .nav-form {
      display: flex;
      align-items: center;

      div {
        margin: 0 1vw;
      }

      .nav-user {
        display: flex;
        align-items: center;
      }

      // 用户
      .nav-user {

        .user-button {
        }
      }
    }
  }

  .menu {
    background-color: #363636;
  }
}

.el-container {
  main {
    //background-color: aquamarine;
  }
}

.main {
  display: flex;
  flex: 1;

  > div {
    display: flex;
    flex: 1;
  }
}

.current-timer-box i {
  color: #fff;
}
.current-timer-box span {
  color: #fff;
}
</style>
