/**
 * 标准化字符串行尾格式;
 * @param {*} str 
 * @param {*} normal 
 */
const normalizeLineEnd = (str, normal = '\r\n') => str.replace(/\r?\n/g, normal)
