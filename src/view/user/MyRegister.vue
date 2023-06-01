<template>
  <div class="login">
    <!--    <div class="bg2"></div>-->
    <!--    <div class="bg3"></div>-->
    <section id="sign-template" class="center">
      <div class="container">
        <div class="sign-form">
          <form>
            <div class="form-header">
              <h3>注册</h3>
            </div>
            <div class="form-box">
              <label for="name">用户名: </label>
              <div class="inputBox">
                <input type="text" id="name" v-model="uname" required>
                <span>用户名：</span>
              </div>
            </div>
            <div class="form-box">
              <label for="password">密码: </label>
              <div class="inputBox">
                <input type="password" id="password" v-model="password" required>
                <span>密码</span>
              </div>
            </div>
            <div class="form-box">
              <label for="password">确认密码: </label>
              <div class="inputBox">
                <input type="password" id="passwords" v-model="passwords" required>
                <span>确认密码</span>
              </div>
            </div>
            <div class="form-box">
              <label for="password">验证码: </label>
              <div class="inputBox">
                <input type="text" id="code" v-model="code" required>
                <span>验证码</span>
              </div>
              <el-button type="success" @click="registerCode">获取验证码</el-button>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <button class="btn btn-color" type="button" id="sign" @click="registerUser()">注册</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {registerUser, registerCode} from '../../api/user';
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'MyLogin',
  data() {
    return {
      uname: 'syndi',
      password: '123456',
      passwords: '123456',
      code: '验证码',
    }
  },
  methods: {
    // 注册请求
    async registerUser() {
      try {
        const res = await registerUser({
          uname: this.uname,
          password: this.password,
        });
        console.log(res);
        const { success } = res;
        ElMessage({
          message: '登录注册成功',
          type: 'success',
        });
        console.log('注册成功的信息', res);
        return this.$router.replace('/');
      } catch (error) {
        ElMessage.error('用户名或者密码错误');
      }
    },
    async registerCode() {
      const res = await registerCode();
      console.log('获取验证码', res)
      // const code = res
    }
  }
})
</script>

<style lang="scss" scoped>
.login {z-index: 1000;}
.container {
  max-width: 980px;
  margin: 0 auto;
}
.w-100 {width: 100%;}
.h-100 {height: 100%;}
.d-flex {display: flex;}
.justify-content-center { justify-content: center;}
.align-items-center { align-items: center;}
.btn {
  padding: 12px 30px;
  text-align: center;
  border-radius: 5px;
  border: 0;
  font-size: 16px;
  color: #fff;
}
.btn-color {
  border: 1px solid #fff;
  background-color: transparent;
}
.btn-color:hover {
  background-color: #cfdef3;
  /* background-image: linear-gradient(#cfdef3, #e0eafc); */
  box-shadow: 0 0 3px 0 #fff;
  transform: scale(1.05);
  color: black;
}
.center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
}

header {
  z-index: 100;
  width: 100%;
  position: relative;
  background-image: linear-gradient(#000000, #434343);
}
header nav ul {
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;

}
header nav ul li {
  height: 96px;
  flex: 1;
  text-align: center;
  position: relative;
}
header nav ul li a {
  color: #fff;
  line-height: 96px;
  margin: 0 12px;
  font-size: 24px;
}
header nav ul li.active::before {
  content: "";
  position: absolute;
  bottom: 16px;
  left: 10%;
  width: 80%;
  border-bottom: 2px solid #fff;
}
header nav ul li:hover::before {
  content: "";
  position: absolute;
  bottom: 16px;
  left: 10%;
  width: 80%;
  border-bottom: 2px solid #fff;
}

form {
  background-color: rgba(0, 0, 0, .5);
  padding: 25px 100px;
  border-radius: 10px;
  color: #fff;
}

#sign-template {
  z-index: -1;
}
.form-header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-header h3 {
  font-size: 48px;
  letter-spacing: 8px;
  font-weight: 500;
  margin-bottom: 15px;
  margin-top: 0;
}

.sign-form {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-box label {
  margin-right: 15px;
  text-align: right;
  width: 70px;
}
.inputBox {
  position: relative;
  width: 250px;
  margin: 15px 0;
  display: flex;
}
.inputBox input {
  width: 100%;
  padding: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.25); */
  background-color: transparent;
  border-radius: 5px;
  outline: none;
  color: #fff;
  font-size: 1em;
  border: 1px solid #f2f2f2;
}
.inputBox span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  pointer-events: none;
  font-size: 1em;
  /* color: rgba(255, 255, 255, 0.25); */
  transition: .5s;
  text-transform: uppercase;
}
.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
  color: #f2f2f2;
  transform: translateX(10px) translateY(-7px);
  font-size: 0.65rem;
  padding: 0 10px;
  /* background-image: linear-gradient(#e29587, #d66d75); */
  background-color: rgba(0, 0, 0, .8);
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
  letter-spacing: 0.2em;
}
.inputBox:nth-child(2) input:valid~span,
.inputBox:nth-child(2) input:focus~span {
  background-color: rgba(0, 0, 0, .8);
  border-radius: 2px;
}

.bg {
  z-index: -10;
}
.bg div div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.bg img {
  width: 500px;
}
.bg2 {
  z-index: -2;
  position: fixed;
  bottom: -35%;
  right: -90%;
  width: 120%;
  height: 60%;
  border-radius: 50%;
  box-shadow: 0 0 200px 0 rgba(57, 99, 95);
  background-image: linear-gradient(#c4e0e5, #e0eafc, #cfdef3);
}
.bg3 {
  z-index: -2;
  position: fixed;
  top: -30%;
  left: -25%;
  width: 150%;
  height: 150vh;
  border-radius: 0 0 50% 50%;
  box-shadow: 0 0 200px 100px rgb(26, 69, 86) inset;
}
</style>
