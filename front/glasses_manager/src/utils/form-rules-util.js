/**
 * 验证字符最小长度
 * @param {*} value 
 * @param {*} length 
 * @param {*} n_message 
 * @param {*} e_message 
 */
export function inputMinLength(value, length, n_message, e_message) {
    if(!value) {
        let message = n_message ? n_message : '请输入字符';
        return Promise.reject(message);
    }
    if(value.toString().length < length) {
        let message = e_message ? e_message : `字符长度必须大于${length}位`;
        return Promise.reject(message);
    }
    return Promise.resolve();
}