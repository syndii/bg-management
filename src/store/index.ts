import { createStore } from 'vuex';

export default createStore({
    state: { /* 配置全局共享状态 */
        theme: 'light', // 切换主题颜色
    },
    getters: { /* 配置全局共享的计算属性 */
        upTheme(state: any) {
            return `当前主题为: ${state.theme}`;
        },
    },
    mutations: { /* 配置全局修改状态的方法 */
        changeTheme(state: any) {
            console.log(state.theme);
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    },
    actions: { /* 异步的调用 mutations 里面的方法 */
        asyncChangeTheme(state: any, payload: Function) {
            setTimeout(() => {
                state.commit('changeTheme', payload);
            }, 1000);
        }
    },
    modules: {
    }
})