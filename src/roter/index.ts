import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MyIndex from '../view/MyIndex.vue';
import MyLogin from '../view/user/MyLogin.vue';

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
                redirect: '/management/user',
                children: [
                    {
                        path: 'user',
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

export default route
