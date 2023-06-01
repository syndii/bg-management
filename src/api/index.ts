import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建实例时配置默认值
const $api = axios.create({
    baseURL: 'http://127.0.0.1:3030', // 请求地址
    timeout: 60000, // 请求访问时间
    headers: {
        // 设置 ToKen
        Authorization: localStorage.getItem('toKen'),
    },
});

// 创建请求拦截器
$api.interceptors.request.use((config: any) => {
    const toKen = localStorage.getItem('toKen');
    if (toKen) config.headers.Authorization = `Bearer ${toKen}`; // 请求之前添加 Token
    return config
})

// 创建响应拦截器
$api.interceptors.response.use(
    (res: any) => {
        const { status, data } = res;
        // 自定义返回响应数据
        if (status === 201 || status === 200) {
            return { success: true, ...data };
        }
        return { success: false, ...data };
    },
    (error: any) => {
        console.log('error:', error);
        const { response } = error;
        const { status } = response;
        if (status === 401) {
            ElMessage({
                message: '登录过期, 请重新登录账号',
                type: error,
                duration: 1000,
            });
            localStorage.removeItem('toKen');
            setTimeout(() => {
                window.location.href = '/#/login';
            }, 2000);
            return;
        }
        ElMessage.error('请与技术人员联系:', error.message);
        Promise.reject(error);
    },
);


export default $api;
