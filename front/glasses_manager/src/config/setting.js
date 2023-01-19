// 接口地址
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// 项目名称
export const PROJECT_NAME = import.meta.env.VITE_APP_NAME;

// 不需要登录的路由
export const WHITE_LIST = ['/login'];

// 外层布局的路由地址
export const LAYOUT_PATH = '/';

// 直接指定菜单数据
export const USER_MENUS = undefined;

// 开启页签栏是否缓存组件
export const TAB_KEEP_ALIVE = true;

// 开启KeepAlive后仍然不需要缓存的路由地址
export const KEEP_ALIVE_EXCLUDES = [];

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS = [];

// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token 存储的名称
export const TOKEN_STORE_NAME = 'access_token';

// 主题配置存储的名称
export const THEME_STORE_NAME = 'theme';

// i18n 缓存的名称
export const I18N_CACHE_NAME = 'i18n-lang';

// 是否开启国际化功能
export const I18N_ENABLE = true;