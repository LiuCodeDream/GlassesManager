import request from '@/utils/request';

export async function pageUserScores() {
  const res = await request.get(
    'https://cdn.eleadmin.com/20200610/example-table-merge.json'
  );
  if (res.data.code === 200 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(res.data.message);
}
