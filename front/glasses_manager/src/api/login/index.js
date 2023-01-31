import request from '@/utils/request';
import { setToken } from '@/utils/token-util';

/**
 * 登录
 */
export async function login(data) {
  // data.tenantId = 2; // 租户id
  const res = await request.post('/login', data);
  if (res.data.code === 200) {
    setToken(res.data.data, data.remember);
    return res.data.message;
  }
  debugger
  return Promise.reject(res.data.message);
}

/**
 * 获取验证码
 */
export async function getCaptcha() {
  const res = await request.get('/captcha');
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(res.data.message);
}
