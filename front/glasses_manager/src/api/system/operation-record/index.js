import request from '@/utils/request';

/**
 * 分页查询操作日志
 */
export async function pageOperationRecords(params) {
  const res = await request.get('/system/operation-record/page', { params });
  if (res.data.code === 200) {
    return res.data.data;
  }
  return Promise.reject(res.data.message);
}

/**
 * 查询操作日志列表
 */
export async function listOperationRecords(params) {
  const res = await request.get('/system/operation-record', { params });
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(res.data.message);
}
