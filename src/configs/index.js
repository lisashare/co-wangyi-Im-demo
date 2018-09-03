// 环境变量
var prourl = 'http://192.168.13.136/'

var iconurl = 'https://static.kuaidao.cn/wap/images/im/';
let config = {
  sdk: 'NIM_Web_SDK_v5.0.0',
  // 用户自定义的登录注册地址
  // loginUrl: 'http://localhost:8080/#/login',
  // homeUrl: '/webdemo/h5/im.html#/session',
  // // nav导航跳转链接
  // indexUrl: 'http://localhost:8080',


  loginUrl: prourl + '#/login',

  homeUrl: prourl + 'im.html#/session',

  indexUrl: prourl,


  downLoadIos: 'https://gio.ren/reXaPx3',
  downLoadAndroid: 'https://gio.ren/rVYaPnV',

  // 资源路径根目录，为了方便用户部署在二级以上URL路径上
  resourceUrl: iconurl,
  // 用户logo地址
  // logo: 'http://yx-web.nos.netease.com/webdoc/h5/im/logo.png',
  // 默认用户头像
  defaultUserIcon: iconurl + 'im/default-icon.png',
  // 默认普通群头像
  defaultGroupIcon: iconurl + 'im/default-group.png',
  // 默认高级群头像
  defaultAdvancedIcon: iconurl + 'im/default-advanced.png',
  // 我的手机图标
  myPhoneIcon: iconurl + 'im/my-phone.png',  
  // 本地消息显示数量，会影响性能
  localMsglimit: 36
}

const env = 'online'

let appConfig = {
  // 用户的appkey
  // 用于在web demo中注册账号异步请求demo 服务器中使用
  test: {
    appkey: '98e7185f6b504fb09af57d3109687c4e',
    postUrl: 'https://apptest.netease.im'
  },
  online: {
    appkey: '98e7185f6b504fb09af57d3109687c4e',
    postUrl: 'https://app.netease.im'
  }
}

config = Object.assign(config, appConfig[env])

export default config


