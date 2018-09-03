webpackJsonp([2],{

/***/ 302:
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./src/pages/Session.vue ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-3c749fe6","scoped":false,"hasInlineConfig":true}!../../~/vux-loader/src/after-less-loader.js!less-loader!../../~/vux-loader/src/style-loader.js!../../~/vue-loader/lib/selector?type=styles&index=0!./Session.vue */ 367)

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 1)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vux-loader/src/script-loader.js!../../~/vue-loader/lib/selector?type=script&index=0!./Session.vue */ 338),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-3c749fe6"}!../../~/vux-loader/src/before-template-compiler-loader.js!../../~/vux-loader/src/template-loader.js!../../~/vue-loader/lib/selector?type=template&index=0!./Session.vue */ 358),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\IM\\chat\\co-wangyi-Im-demo\\src\\pages\\Session.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Session.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c749fe6", Component.options)
  } else {
    hotAPI.reload("data-v-3c749fe6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 338:
/* no static exports found */
/* all exports used */
/*!*******************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vux-loader/src/script-loader.js!./~/vue-loader/lib/selector.js?type=script&index=0!./src/pages/Session.vue ***!
  \*******************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ 26);

var _utils2 = _interopRequireDefault(_utils);

var _configs = __webpack_require__(/*! ../configs */ 20);

var _configs2 = _interopRequireDefault(_configs);

var _NavList = __webpack_require__(/*! ./components/NavList */ 377);

var _NavList2 = _interopRequireDefault(_NavList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { NavList: _NavList2.default },
  data: function data() {
    return {
      showSessionList: false,

      isNavShow: false,
      delSessionId: null,
      stopBubble: false,
      noticeIcon: _configs2.default.noticeIcon,
      myGroupIcon: _configs2.default.defaultGroupIcon,
      myAdvancedIcon: _configs2.default.defaultAdvancedIcon,
      icon1: _configs2.default.resourceUrl + 'im/icon_erji@3x.png',
      icon2: _configs2.default.resourceUrl + 'im/icon_classify@3x.png',
      icon3: _configs2.default.resourceUrl + 'im/bg_adviser@3x.png',
      icon4: _configs2.default.resourceUrl + 'im/btn_guwen@3x.png',
      icon5: _configs2.default.resourceUrl + 'im/btn_phone@3x.png'
    };
  },

  computed: {
    sysMsgUnread: function sysMsgUnread() {
      var temp = this.$store.state.sysMsgUnread;
      var sysMsgUnread = temp.addFriend || 0;
      sysMsgUnread += temp.team || 0;
      var customSysMsgUnread = this.$store.state.customSysMsgUnread;
      return sysMsgUnread + customSysMsgUnread;
    },
    userInfos: function userInfos() {
      return this.$store.state.userInfos;
    },
    myInfo: function myInfo() {
      return this.$store.state.myInfo;
    },
    myPhoneId: function myPhoneId() {
      return '' + this.$store.state.userUID;
    },
    sessionlist: function sessionlist() {
      var _this = this;

      var sessionlist = this.$store.state.sessionlist.filter(function (item) {
        item.name = '';
        item.avatar = '';
        if (item.scene === 'p2p') {
          var userInfo = null;
          if (item.to !== _this.myPhoneId) {
            userInfo = _this.userInfos[item.to];
          } else {
            return false;
          }
          if (userInfo) {
            item.name = _utils2.default.getFriendAlias(userInfo);
            item.avatar = userInfo.avatar;
          }
        } else if (item.scene === 'team') {
          var teamInfo = null;
          teamInfo = _this.$store.state.teamlist.find(function (team) {
            return team.teamId === item.to;
          });
          if (teamInfo) {
            item.name = teamInfo.name;
            item.avatar = teamInfo.avatar || (teamInfo.type === 'normal' ? _this.myGroupIcon : _this.myAdvancedIcon);
          } else {
            item.name = '\u7FA4' + item.to;
            item.avatar = item.avatar || _this.myGroupIcon;
          }
        }
        var lastMsg = item.lastMsg || {};
        if (lastMsg.type === 'text') {
          item.lastMsgShow = lastMsg.text || '';
        } else if (lastMsg.type === 'custom') {
          item.lastMsgShow = _utils2.default.parseCustomMsg(lastMsg);
        } else if (lastMsg.scene === 'team' && lastMsg.type === 'notification') {
          item.lastMsgShow = _utils2.default.generateTeamSysmMsg(lastMsg);
        } else if (_utils2.default.mapMsgType(lastMsg)) {
          item.lastMsgShow = '[' + _utils2.default.mapMsgType(lastMsg) + ']';
        } else {
          item.lastMsgShow = '';
        }
        if (item.updateTime) {
          item.updateTimeShow = _utils2.default.formatDate(item.updateTime, true);
        }
        return item;
      });
      if (sessionlist.length) {
        this.showSessionList = true;
      }
      this.$store.dispatch('hideLoading');

      return sessionlist;
    }
  },
  methods: {
    goLogin: function goLogin() {
      window.location.href = _configs2.default.loginUrl;
    },
    phoneCall: function phoneCall() {
      window.location.href = 'tel:010-53579588';
    },
    closeNav: function closeNav() {
      this.isNavShow = false;
    },
    enterSysMsgs: function enterSysMsgs() {
      if (this.hideDelBtn()) return;
      location.href = '#/sysmsgs';
    },
    enterChat: function enterChat(session) {
      if (this.hideDelBtn()) return;
      if (session && session.id) location.href = '#/chat/' + session.id;
    },
    enterMyChat: function enterMyChat() {
      location.href = '#/chat/p2p-' + this.myPhoneId;
    },
    deleteSession: function deleteSession() {
      if (this.delSessionId !== null) {
        this.$store.dispatch('deleteSession', this.delSessionId);
      }
    },
    showDelBtn: function showDelBtn(vNode) {
      var _this2 = this;

      if (vNode && vNode.data && vNode.data.attrs) {
        this.delSessionId = vNode.data.attrs.sessionId;
        this.stopBubble = true;
        setTimeout(function () {
          _this2.stopBubble = false;
        }, 20);
      }
    },
    hideDelBtn: function hideDelBtn() {
      if (this.delSessionId !== null && !this.stopBubble) {
        this.delSessionId = null;
        return true;
      }
      return false;
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 344:
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vux-loader/src/script-loader.js!./~/vue-loader/lib/selector.js?type=script&index=0!./src/pages/components/NavList.vue ***!
  \******************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _configs = __webpack_require__(/*! ../../configs */ 20);

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'NavList',
    props: ['isNavShow', "closeNav"],
    data: function data() {
        return {
            navs: [{ id: 1, title: '首页', url: _configs2.default.indexUrl + '#/', icon: 'icon1', img: _configs2.default.resourceUrl + 'im/icon_me@3x.png' }, { id: 2, title: '商机', url: _configs2.default.indexUrl + '#/opportunity', icon: 'icon2', img: _configs2.default.resourceUrl + 'im/icon_shangji@3x.png' }, { id: 3, title: 'VR看店', url: _configs2.default.indexUrl + '#/vr', icon: 'icon3', img: _configs2.default.resourceUrl + 'im/icon_vr@3x.png' }, { id: 4, title: '商评', url: _configs2.default.indexUrl + '#/shangping', icon: 'icon4', img: _configs2.default.resourceUrl + 'im/icon_shangping@3x.png' }, { id: 5, title: '发现', url: _configs2.default.indexUrl + '#/find', icon: 'icon5', img: _configs2.default.resourceUrl + 'im/icon_find@3x.png' }, { id: 6, title: '消息', url: '' + _configs2.default.homeUrl, icon: 'icon6', img: _configs2.default.resourceUrl + 'im/icon_xiaoxi@3x.png' }, { id: 7, title: '我的', url: _configs2.default.indexUrl + '#/me', icon: 'icon7', img: _configs2.default.resourceUrl + 'im/icon_me@3x.png' }],
            img8: _configs2.default.resourceUrl + 'im/icon_app@3x.png'
        };
    },

    methods: {
        downLoadApp: function downLoadApp() {
            if (this.judgeType() == 'IOS') {
                window.location.href = _configs2.default.downLoadIos;
            }
            if (this.judgeType() == 'Android') {
                window.location.href = _configs2.default.downLoadAndroid;
            }
        },
        judgeType: function judgeType() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/iPhone\sOS/i) == "iphone os") {
                return "IOS";
            } else if (ua.match(/Android/i) == "android") {
                return "Android";
            }
        }
    }
};
module.exports = exports['default'];

/***/ }),

/***/ 348:
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-3c749fe6","scoped":false,"hasInlineConfig":true}!./~/vux-loader/src/after-less-loader.js!./~/less-loader/lib/loader.js!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/Session.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ 2)(true);
// imports


// module
exports.push([module.i, "\n* {\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n}\n.empty-list {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 6.8rem;\n}\n.empty-list img {\n  width: 100%;\n  height: 100%;\n}\n.empty-list .wait-user {\n  width: 6.96rem;\n  height: 6.96rem;\n}\n.empty-list .wait-btn {\n  margin-top: 0.6rem;\n  width: 5.58rem;\n  height: 1.44rem;\n}\n.empty-list .call-btn {\n  margin-top: 0.4rem;\n  width: 5.58rem;\n  height: 1.44rem;\n}\n.p-session .vux-cell-primary {\n  width: 9.4rem;\n}\n.header-contact-customer img, .header-nav img {\n  width: 100%;\n  height: 100%;\n}\n.header-contact-customer {\n  width: 0.68rem;\n  height: 0.64rem;\n  display: inline-block;\n  position: absolute;\n  top: 0.58rem;\n  right: 2.3rem;\n  z-index: 11;\n}\n.header-nav {\n  width: 0.68rem;\n  height: 0.64rem;\n  display: inline-block;\n  position: absolute;\n  top: 0.58rem;\n  right: 0.48rem;\n  z-index: 11;\n}\n", "", {"version":3,"sources":["E:/IM/chat/co-wangyi-Im-demo/src/pages/Session.vue"],"names":[],"mappings":";AAAA;EACE,4BAAuB;OAAvB,uBAAuB;CACxB;AACD;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,6BAAuB;EAAvB,8BAAuB;EAAvB,+BAAuB;KAAvB,0BAAuB;KAAvB,2BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;EACvB,yBAAwB;EAAxB,gCAAwB;KAAxB,sBAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,0BAAoB;EAApB,4BAAoB;KAApB,uBAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,aAAa;CACd;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,mBAAmB;EACnB,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EAEE,YAAY;EACZ,aAAa;CACd;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,cAAc;EACd,YAAY;CACb;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,YAAY;CACb","file":"Session.vue","sourcesContent":["* {\n  box-sizing: border-box;\n}\n.empty-list {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin-top: 6.8rem;\n}\n.empty-list img {\n  width: 100%;\n  height: 100%;\n}\n.empty-list .wait-user {\n  width: 6.96rem;\n  height: 6.96rem;\n}\n.empty-list .wait-btn {\n  margin-top: 0.6rem;\n  width: 5.58rem;\n  height: 1.44rem;\n}\n.empty-list .call-btn {\n  margin-top: 0.4rem;\n  width: 5.58rem;\n  height: 1.44rem;\n}\n.p-session .vux-cell-primary {\n  width: 9.4rem;\n}\n.header-contact-customer img,\n.header-nav img {\n  width: 100%;\n  height: 100%;\n}\n.header-contact-customer {\n  width: 0.68rem;\n  height: 0.64rem;\n  display: inline-block;\n  position: absolute;\n  top: 0.58rem;\n  right: 2.3rem;\n  z-index: 11;\n}\n.header-nav {\n  width: 0.68rem;\n  height: 0.64rem;\n  display: inline-block;\n  position: absolute;\n  top: 0.58rem;\n  right: 0.48rem;\n  z-index: 11;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 351:
/* no static exports found */
/* all exports used */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-a397bff0","scoped":true,"hasInlineConfig":true}!./~/vux-loader/src/after-less-loader.js!./~/less-loader/lib/loader.js!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/components/NavList.vue ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 2)(true);
// imports


// module
exports.push([module.i, "\n*[data-v-a397bff0] {\n  -moz-box-sizing: border-box;\n       box-sizing: border-box;\n}\n.animated[data-v-a397bff0] {\n  -webkit-animation-duration: 0.7s;\n     -moz-animation-duration: 0.7s;\n          animation-duration: 0.7s;\n}\n.mask[data-v-a397bff0] {\n  z-index: 10;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, .4);\n}\n.nav-list .triangle[data-v-a397bff0] {\n  width: 0;\n  height: 0;\n  border-left: 0.48rem solid transparent;\n  border-right: 0.48rem solid transparent;\n  border-bottom: 0.48rem solid #ffffff;\n  position: absolute;\n  right: 0.44rem;\n  top: -0.24rem;\n}\n.nav-list nav[data-v-a397bff0] {\n  position: fixed;\n  top: 1.76rem;\n  left: 0;\n  right: 0;\n  width: auto;\n  z-index: 11;\n  background: #ffffff;\n  border-radius: 0 0 0.28rem 0.28rem;\n}\n.nav-list nav ul[data-v-a397bff0] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  padding: 0.4rem 0.32rem 0.4rem;\n}\n.nav-list nav ul li[data-v-a397bff0] {\n  width: 3.58rem;\n  margin-top: 0.64rem;\n  text-align: center;\n}\n.nav-list nav ul li .nav-img[data-v-a397bff0] {\n  height: 1.16rem;\n  text-align: center;\n  line-height: 1.16rem;\n}\n.nav-list nav ul li .nav-img img[data-v-a397bff0] {\n  display: inline-block;\n}\n.nav-list nav ul li .nav-img .icon1[data-v-a397bff0] {\n  width: 1.12rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon2[data-v-a397bff0] {\n  width: 1.16rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon3[data-v-a397bff0] {\n  width: 1.12rem;\n  height: 1.12rem;\n}\n.nav-list nav ul li .nav-img .icon4[data-v-a397bff0] {\n  width: 1.04rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon5[data-v-a397bff0] {\n  width: 44 50rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon7[data-v-a397bff0] {\n  width: 1.08rem;\n  height: 1.14rem;\n}\n.nav-list nav ul li .nav-img .icon8[data-v-a397bff0], .nav-list nav ul li .nav-img .icon6[data-v-a397bff0] {\n  width: 1.12rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .title[data-v-a397bff0] {\n  display: inline-block;\n  font-size: 0.48rem;\n  color: #333333;\n  line-height: 1.6rem;\n  text-align: center;\n}\n", "", {"version":3,"sources":["E:/IM/chat/co-wangyi-Im-demo/src/pages/components/NavList.vue"],"names":[],"mappings":";AAAA;EACE,4BAAuB;OAAvB,uBAAuB;CACxB;AACD;EACE,iCAAyB;KAAzB,8BAAyB;UAAzB,yBAAyB;CAC1B;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,OAAO;EACP,SAAS;EACT,UAAU;EACV,QAAQ;EACR,8BAA+B;CAChC;AACD;EACE,SAAS;EACT,UAAU;EACV,uCAAuC;EACvC,wCAAwC;EACxC,qCAAqC;EACrC,mBAAmB;EACnB,eAAe;EACf,cAAc;CACf;AACD;EACE,gBAAgB;EAChB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,YAAY;EACZ,oBAAoB;EACpB,mCAAmC;CACpC;AACD;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,wBAAgB;MAAhB,oBAAgB;UAAhB,gBAAgB;EAChB,sCAA8B;MAA9B,0BAA8B;UAA9B,8BAA8B;EAC9B,+BAA+B;CAChC;AACD;EACE,eAAe;EACf,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,qBAAqB;CACtB;AACD;EACE,sBAAsB;CACvB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EAEE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,oBAAoB;EACpB,mBAAmB;CACpB","file":"NavList.vue","sourcesContent":["* {\n  box-sizing: border-box;\n}\n.animated {\n  animation-duration: 0.7s;\n}\n.mask {\n  z-index: 10;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.4);\n}\n.nav-list .triangle {\n  width: 0;\n  height: 0;\n  border-left: 0.48rem solid transparent;\n  border-right: 0.48rem solid transparent;\n  border-bottom: 0.48rem solid #ffffff;\n  position: absolute;\n  right: 0.44rem;\n  top: -0.24rem;\n}\n.nav-list nav {\n  position: fixed;\n  top: 1.76rem;\n  left: 0;\n  right: 0;\n  width: auto;\n  z-index: 11;\n  background: #ffffff;\n  border-radius: 0 0 0.28rem 0.28rem;\n}\n.nav-list nav ul {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  padding: 0.4rem 0.32rem 0.4rem;\n}\n.nav-list nav ul li {\n  width: 3.58rem;\n  margin-top: 0.64rem;\n  text-align: center;\n}\n.nav-list nav ul li .nav-img {\n  height: 1.16rem;\n  text-align: center;\n  line-height: 1.16rem;\n}\n.nav-list nav ul li .nav-img img {\n  display: inline-block;\n}\n.nav-list nav ul li .nav-img .icon1 {\n  width: 1.12rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon2 {\n  width: 1.16rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon3 {\n  width: 1.12rem;\n  height: 1.12rem;\n}\n.nav-list nav ul li .nav-img .icon4 {\n  width: 1.04rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon5 {\n  width: 44 50rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .nav-img .icon7 {\n  width: 1.08rem;\n  height: 1.14rem;\n}\n.nav-list nav ul li .nav-img .icon8,\n.nav-list nav ul li .nav-img .icon6 {\n  width: 1.12rem;\n  height: 1.16rem;\n}\n.nav-list nav ul li .title {\n  display: inline-block;\n  font-size: 0.48rem;\n  color: #333333;\n  line-height: 1.6rem;\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 358:
/* no static exports found */
/* all exports used */
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-3c749fe6"}!./~/vux-loader/src/before-template-compiler-loader.js!./~/vux-loader/src/template-loader.js!./~/vue-loader/lib/selector.js?type=template&index=0!./src/pages/Session.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "g-inherit m-main p-session page-top"
  }, [_c('header', {
    staticClass: "header bc line-bottom"
  }, [_c('i', {
    staticClass: "left fa-icon fa fa-angle-left",
    on: {
      "click": function($event) {
        _vm.$router.back(-1)
      }
    }
  }), _vm._v(" "), _c('h1', [_vm._v("消息")]), _vm._v(" "), _c('span', {
    staticClass: "header-contact-customer",
    on: {
      "click": _vm.phoneCall
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.icon1,
      "alt": ""
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "header-nav",
    on: {
      "click": function($event) {
        _vm.isNavShow = !_vm.isNavShow
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.icon2,
      "alt": ""
    }
  })])]), _vm._v(" "), _c('nav-list', {
    attrs: {
      "close-nav": _vm.closeNav,
      "is-nav-show": _vm.isNavShow
    }
  }), _vm._v(" "), (_vm.sessionlist.length !== 0) ? _c('group', {
    staticClass: "u-list"
  }, _vm._l((_vm.sessionlist), function(session, index) {
    return _c('cell', {
      directives: [{
        name: "touch",
        rawName: "v-touch:swipeleft",
        value: (_vm.showDelBtn),
        expression: "showDelBtn",
        arg: "swipeleft"
      }, {
        name: "touch",
        rawName: "v-touch:swiperight",
        value: (_vm.hideDelBtn),
        expression: "hideDelBtn",
        arg: "swiperight"
      }],
      key: session.id,
      staticClass: "u-list-item",
      attrs: {
        "title": session.name,
        "inline-desc": session.lastMsgShow,
        "sessionId": session.id
      },
      nativeOn: {
        "click": function($event) {
          _vm.enterChat(session)
        }
      }
    }, [_c('img', {
      staticClass: "u-circle",
      attrs: {
        "slot": "icon",
        "src": session.avatar
      },
      slot: "icon"
    }), _vm._v(" "), _c('span', {
      staticClass: "u-session-time"
    }, [_vm._v("\n        " + _vm._s(session.updateTimeShow) + "\n      ")]), _vm._v(" "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (session.unread > 0),
        expression: "session.unread > 0"
      }],
      staticClass: "u-unread"
    }), _vm._v(" "), _c('span', {
      staticClass: "u-tag-del",
      class: {
        active: _vm.delSessionId === session.id
      },
      on: {
        "click": _vm.deleteSession
      }
    })])
  })) : _c('div', {
    staticClass: "empty-list"
  }, [_c('div', {
    staticClass: "wait-user"
  }, [_c('img', {
    attrs: {
      "src": _vm.icon3,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "wait-btn",
    on: {
      "click": _vm.goLogin
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.icon4,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "call-btn",
    on: {
      "click": _vm.phoneCall
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.icon5,
      "alt": ""
    }
  })])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c749fe6", module.exports)
  }
}

/***/ }),

/***/ 360:
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-a397bff0"}!./~/vux-loader/src/before-template-compiler-loader.js!./~/vux-loader/src/template-loader.js!./~/vue-loader/lib/selector.js?type=template&index=0!./src/pages/components/NavList.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav-list"
  }, [_c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.isNavShow) ? _c('div', {
    staticClass: "mask",
    on: {
      "click": _vm.closeNav
    }
  }) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.isNavShow) ? _c('nav', {
    staticClass: "nav-group",
    on: {
      "click": _vm.closeNav
    }
  }, [_c('ul', [_vm._l((_vm.navs), function(nav) {
    return _c('li', {
      key: nav.id
    }, [_c('a', {
      attrs: {
        "href": nav.url
      }
    }, [_c('div', {
      staticClass: "nav-img"
    }, [_c('img', {
      class: nav.icon,
      attrs: {
        "src": nav.img
      }
    })]), _vm._v(" "), _c('span', {
      staticClass: "title"
    }, [_vm._v(_vm._s(nav.title))])])])
  }), _vm._v(" "), _c('li', {
    on: {
      "click": _vm.downLoadApp
    }
  }, [_c('div', {
    staticClass: "nav-img"
  }, [_c('img', {
    staticClass: "icon8",
    attrs: {
      "src": _vm.img8
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "title"
  }, [_vm._v("APP")])])], 2), _vm._v(" "), _c('span', {
    staticClass: "triangle"
  })]) : _vm._e()])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a397bff0", module.exports)
  }
}

/***/ }),

/***/ 367:
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-style-loader!./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-3c749fe6","scoped":false,"hasInlineConfig":true}!./~/vux-loader/src/after-less-loader.js!./~/less-loader/lib/loader.js!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/Session.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../~/css-loader?sourceMap!../../~/vue-loader/lib/style-compiler?{"id":"data-v-3c749fe6","scoped":false,"hasInlineConfig":true}!../../~/vux-loader/src/after-less-loader.js!../../~/less-loader/lib/loader.js!../../~/vux-loader/src/style-loader.js!../../~/vue-loader/lib/selector.js?type=styles&index=0!./Session.vue */ 348);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../~/vue-style-loader/lib/addStylesClient.js */ 3)("7476f45a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3c749fe6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vux-loader/src/after-less-loader.js!../../node_modules/less-loader/lib/loader.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Session.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3c749fe6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vux-loader/src/after-less-loader.js!../../node_modules/less-loader/lib/loader.js!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Session.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 370:
/* no static exports found */
/* all exports used */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-style-loader!./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-a397bff0","scoped":true,"hasInlineConfig":true}!./~/vux-loader/src/after-less-loader.js!./~/less-loader/lib/loader.js!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/components/NavList.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../~/css-loader?sourceMap!../../../~/vue-loader/lib/style-compiler?{"id":"data-v-a397bff0","scoped":true,"hasInlineConfig":true}!../../../~/vux-loader/src/after-less-loader.js!../../../~/less-loader/lib/loader.js!../../../~/vux-loader/src/style-loader.js!../../../~/vue-loader/lib/selector.js?type=styles&index=0!./NavList.vue */ 351);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../~/vue-style-loader/lib/addStylesClient.js */ 3)("cfd8f89e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a397bff0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vux-loader/src/after-less-loader.js!../../../node_modules/less-loader/lib/loader.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NavList.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a397bff0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vux-loader/src/after-less-loader.js!../../../node_modules/less-loader/lib/loader.js!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NavList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 377:
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/pages/components/NavList.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-a397bff0","scoped":true,"hasInlineConfig":true}!../../../~/vux-loader/src/after-less-loader.js!less-loader!../../../~/vux-loader/src/style-loader.js!../../../~/vue-loader/lib/selector?type=styles&index=0!./NavList.vue */ 370)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 1)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vux-loader/src/script-loader.js!../../../~/vue-loader/lib/selector?type=script&index=0!./NavList.vue */ 344),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-a397bff0"}!../../../~/vux-loader/src/before-template-compiler-loader.js!../../../~/vux-loader/src/template-loader.js!../../../~/vue-loader/lib/selector?type=template&index=0!./NavList.vue */ 360),
  /* scopeId */
  "data-v-a397bff0",
  /* cssModules */
  null
)
Component.options.__file = "E:\\IM\\chat\\co-wangyi-Im-demo\\src\\pages\\components\\NavList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NavList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a397bff0", Component.options)
  } else {
    hotAPI.reload("data-v-a397bff0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=2.js.map