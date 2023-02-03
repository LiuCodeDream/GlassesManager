import request from '@/utils/request';

export async function pageApps(params) {
    const res = await request.get('/sysApp/page', {
        params
    });
    if(res.data.code === 200) {
        return res.data.data;
    }
    return Promise.reject(res.data.message);
}