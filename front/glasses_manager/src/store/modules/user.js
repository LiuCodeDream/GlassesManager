/**
 * 登录用户 store
 */
import { defineStore } from "pinia";
import { formatMenus,  toTreeData, formatTreeData} from "ele-admin-pro/es";
import { USER_MENUS } from '@/config/setting';
const EXTRA_MENUS = [];

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        // 当前登录用户的信息
        info: null,
        // 当前登录用户的菜单
        mneus: null,
        // 当前登录用户的权限
        authorities: [],
        // 当前登录用户的角色
        roles: []
    }),
    getters: {},
    action: {
        /**
         * 请求用户信息、权限、角色、菜单
         */
        async fetchUserInfo() {
            const result = await 
        }
    }
})