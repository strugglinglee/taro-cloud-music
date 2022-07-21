// https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html
declare const wx: object

export interface UnknownRes {
  [propName: string]: unknown
}

export interface SongDetail extends UnknownRes {}
