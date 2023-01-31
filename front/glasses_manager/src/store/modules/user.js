/**
 * 登录用户 store
 */
import { defineStore } from 'pinia';
import { formatMenus, toTreeData, formatTreeData } from 'ele-admin-pro/es';
import { USER_MENUS } from '@/config/setting';
import { getUserInfo } from '@/api/layout';
const EXTRA_MENUS = [];

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 当前登录用户的信息
    info: null,
    // 所有应用的菜单
    allMenus: [],
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前登录用户的角色
    roles: [],
    // 访问数据域
    dataScopes: [],
    // 可访问的系统应用
    apps: [],
    selectedApp: null
  }),
  getters: {},
  actions: {
    /**
     * 请求用户信息、权限、角色、菜单
     */
    async fetchUserInfo() {
      const result = await getUserInfo().catch(() => {});
      if (!result) {
        return {};
      }
      // 用户信息
      this.info = result.loginEmpInfo;
      // 系统应用
      this.apps = result.apps;
      let activeApp = this.apps.filter(a => a.active == 'Y');
      if(activeApp && activeApp.length > 0) {
        this.selectedApp = activeApp[0];
      }
      // 用户权限
      this.authorities = result.permissions ?? [];
      // 用户角色
      this.roles = result.roles ?? [];
      this.allMenus = result.menus;
      // 用户菜单, 过滤掉按钮类型并转为 children 形式
      const { menus, homePath } = formatMenus(
        USER_MENUS ??
          toTreeData({
            data: result.menus.filter((d) => d.menuType !== 2 && d.application === this.selectedApp.code), // 过滤按钮菜单
            idField: 'id',
            parentIdField: 'pid'
          }).concat(EXTRA_MENUS)
      );
      this.menus = menus;
      return { menus, homePath };
    },
    /**
     * 更新用户信息
     */
    setInfo(value) {
      this.info = value;
    },
    /**
     * 更新菜单的 badge
     */
    setMenuBadge(path, value, color) {
      this.menus = formatTreeData(this.menus, (m) => {
        if (path === m.path) {
          return {
            ...m,
            meta: {
              ...m.meta,
              badge: value,
              badgeColor: color
            }
          };
        }
        return m;
      });
    }
  }
});
