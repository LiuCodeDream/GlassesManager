/**
 * axios 实例
 */
import axios from 'axios';
import { unref } from 'vue';
import router from '@/router';
import { Modal } from 'ant-design-vue/es';
import { API_BASE_URL, TOKEN_HEADER_NAME, LAYOUT_PATH, TOKEN_RHEADER_NAME, RES_RTOKEN_NAME } from '@/config/setting';
import { getRefreshToken, getToken, setRefreshToken, setToken } from './token-util';
import { logout } from './page-tab-util';
import { message } from 'ant-design-vue';

const service = axios.create({
  baseURL: API_BASE_URL
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 添加 token 到 header
    const token = getToken();
    const rToken = getRefreshToken();
    if (token && config.headers) {
      config.headers.common[TOKEN_HEADER_NAME] = token;
      config.headers.common[TOKEN_RHEADER_NAME] = rToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  (res) => {

    // 登录过期处理
    if (res.data?.code === 401) {
      const currentPath = unref(router.currentRoute).path;
      if (currentPath == LAYOUT_PATH) {
        logout(true);
      } else {
        Modal.destroyAll();
        Modal.info({
          title: '系统提示',
          content: '登录状态已过期, 请退出重新登录!',
          okText: '重新登录',
          onOk: () => {
            logout(false, currentPath);
          }
        });
      }
      return Promise.reject(res.data.message);
    }
    // 服务器异常
    // else if(res.data?.code === 500) {
    //   Modal.destroyAll();
    //   var modal = Modal.error({
    //     title: '系统提示',
    //     content: `服务器异常：${res.data?.message}`,
    //     okText: '确定',
    //     onOk: () =>  {
    //       modal.destroy();
    //     }
    //   });
    //   return Promise.reject(res.data.message);
    // }
    
    // token 自动续期
    const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
    if (token) {
      setToken(token);
    }
    // 刷新token 自动续期
    const refresh_token = res.headers[RES_RTOKEN_NAME.toLocaleLowerCase()];
    if(refresh_token) {
      setRefreshToken(refresh_token);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
