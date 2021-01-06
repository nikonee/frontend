const fs = require('fs')
const crypto = require('crypto')

/**
 * 通过添加特殊字符在控制台中彩色打印;
 * @param  {...any} args
 */
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`,
})
/**
 * 创建文件目录;
 * @param {*} dir
 */
const createDir = (dir) => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined)
/**
 * Node环境下生成随机UUID;
 */
const createUUID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  )
/**
 * 解码BASE64格式字符串;
 * @param {*} str
 */
const decodeBase64 = (str) => Buffer.from(str, 'base64').toString('binary')
/**
 * 字符串转换为BASE64格式;
 * @param {*} str
 */
const encodeBase64 = (str) => Buffer.from(str, 'binary').toString('base64')
/**
 * 判断当前进程是否包含指定参数;
 * @param  {...any} flags
 */
const hasFlags = (...flags) => flags.every((flag) => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag))
/**
 * 通过SHA-256算法加密返回哈希值;
 * @param {*} val
 */
const hashNode = (val) =>
  new Promise((resolve) => setTimeout(() => resolve(crypto.createHash('sha256').update(val).digest('hex')), 0))
/**
 * 判断给定参数是否可读写;
 * @param {*} val
 */
const isDuplexStream = (val) =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object'
/**
 * 判断给定参数是否可读;
 * @param {*} val
 */
const isReadableStream = (val) =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._read === 'function' &&
  typeof val._readableState === 'object'
/**
 * 判断给定参数是否为流;
 * @param {*} val
 */
const isStream = (val) => val !== null && typeof val === 'object' && typeof val.pipe === 'function'
/**
 * 判断当前环境是否为Travis CI;
 */
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env
/**
 * 判断给定参数是否可写;
 * @param {*} val
 */
const isWritableStream = (val) =>
  val !== null &&
  typeof val === 'object' &&
  typeof val.pipe === 'function' &&
  typeof val._write === 'function' &&
  typeof val._writableState === 'object'
/**
 * 将JSON对象写入文件;
 * @param {*} obj
 * @param {*} file
 */
const JSONToFile = (obj, file) => fs.writeFile(`${file}.json`, JSON.stringify(obj, null, 2))
/**
 * 获取文件内容多行数组;
 * @param {*} file
 */
const readFileLines = (file) => fs.readFileSync(file).toString('UTF8').split('\n')
/**
 * 将波浪号路径转换为绝对路径;
 * @param {*} path
 */
const untildify = (path) => path.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`)

export {
  colorize,
  createDir,
  createUUID,
  decodeBase64,
  encodeBase64,
  hasFlags,
  hashNode,
  isDuplexStream,
  isReadableStream,
  isStream,
  isTravisCI,
  isWritableStream,
  JSONToFile,
  readFileLines,
  untildify,
}
