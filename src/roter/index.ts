import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MyIndex from '../view/MyIndex.vue';
import MyLogin from '../view/user/MyLogin.vue';
import {ElMessage} from 'element-plus';

const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'MyIndex',
        component: MyIndex,
        redirect: '/management',
        children: [
            {
                path: 'management',
                name: 'management',
                component: () => import('../view/MyManagement.vue'),
                redirect: '/management/user1',
                children: [
                    {
                        path: 'user1',
                        name: 'userList',
                        component: () => import('../pages/Management/MyUserList.vue')
                    }
                ]
            },
        ],
    },
    {
        path:'/login',
        name:'MyLogin',
        component: MyLogin
    },
    {
        path:'/demo',
        name:'demo',
        component: import('../view/demo.vue')
    },
    {
        path:'/register',
        name:'MyRegister',
        component: import('../view/user/MyRegister.vue')
    },
]

const route = createRouter({
    history: createWebHashHistory(),
    routes
})

// @ts-ignore
route.beforeEach((to, from, next) => {
    // 判断路由是否存在
    if (to.matched.length === 0) {
        // 路由不存在，执行相应逻辑
        ElMessage.error(`页面不存在`);
    } else {
        // 路由存在，继续正常跳转
        next();
    }
})

export default route
