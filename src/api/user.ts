import $api from "../api/index";

// 定义接口
interface LoginUser {
    uname: string;
    password: string;
}

// 用户登录接口
export const userLogin = async (params: LoginUser) => {
    return await $api.post('/authentication', {
        uname: params.uname,
        password: params.password,
        strategy: 'local',
    });
}

// 用户注册接口
export const registerUser = async (params: LoginUser) => {
    return await $api.post('/authentication', {
        uname: params.uname,
        password: params.password,
        strategy: 'local',
    });
}

// 用户获取验证码接口
export const registerCode = async () => {
    return await $api.post('/sendCode');
}
