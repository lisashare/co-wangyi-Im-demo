<template>
  <div class="g-inherit m-main p-session page-top">
    <header-title :title="title"></header-title>
    <group class="u-list" v-if="showSessionList">
    <!-- <group class="u-list" v-if="0"> -->
      <cell v-if="msgDetails" class="u-list-item" title="通知" 
      :inline-desc="msgDetails"
      @click.native="enterSysMsgs">
        <img class="icon" slot="icon" :src="noticeIcon">
        <!-- <span v-show="sysMsgUnread > 0" class="u-unread">{{sysMsgUnread}}</span> -->
        <span class='u-session-time' v-if="sendTime">
          {{sendTime}}
        </span>
        <span class='u-session-right'>
          <img :src="icon6" alt="">     
        </span>
        <span v-show="readStatus > 0" class="u-unread"></span>
      </cell>  
      <cell
        v-for="(session, index) in sessionlist"
        class="u-list-item"
        :title="session.name"
        :inline-desc="session.lastMsgShow"
        :key="session.id"
        :sessionId="session.id"
        v-touch:swipeleft="showDelBtn"
        v-touch:swiperight="hideDelBtn"
        @click.native="enterChat(session)" >
        <img class="u-circle" slot="icon" :src="session.avatar">
        <span class='u-session-time'>
          {{session.updateTimeShow}}
        </span>
        <!-- <span v-show="session.unread > 0" class="u-unread">{{session.unread}}</span> -->
        <span v-show="session.unread > 0" class="u-unread"></span>
        <span
          class="u-tag-del"
          :class="{active: delSessionId===session.id}"
          @click="deleteSession"
          ></span>
      </cell>     
    </group>
    <div class="empty-list" v-else>
      <div class="wait-user">
        <img :src="icon3" alt="">
      </div>
      <div class="wait-btn" @click="goLogin">
        <img :src="icon4" alt="">
      </div>
      <div class="call-btn">
        <a href="tel:010-53579588">
          <img :src="icon5" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from '../utils/cookie'
import util from '../utils'
import config from '../configs'
import HeaderTitle from './components/HeaderTitle'
export default {
  components:{HeaderTitle},
  data () {
    return {
      showSessionList: false,
      title: '消息',
      delSessionId: null,
      stopBubble: false,
      noticeIcon: config.noticeIcon,
      myGroupIcon: config.defaultGroupIcon,
      myAdvancedIcon: config.defaultAdvancedIcon,
      icon3: `${config.resourceUrl}im/bg_adviser@3x.png`,
      icon4: `${config.resourceUrl}im/btn_guwen@3x.png`,
      icon5: `${config.resourceUrl}im/btn_phone@3x.png`,
      icon6: `${config.resourceUrl}im/icon_more@3x.png`,
      sendTime: '',
      readStatus:'',
      msgDetails:''
    }
  },
  created(){ 
    window.localStorage.setItem("tempUrl", 'session')
    // 进入页面获取数据，判断显示什么
    let loginInfo = {
      uid: cookie.readCookie('uid'),
      sdktoken: cookie.readCookie('sdktoken'),
    }
    if (!loginInfo.uid) {
      this.showSessionList = false   // 进入是显示按钮
      this.$store.dispatch('hideLoading')
    } else{
      this.showSessionList = true
        // 进入页面获取存储的消息，显示在页面上，
      let accountMsg = cookie.readCookie('accountMsg')
      this.sendTime= cookie.readCookie('sendTime')
      this.readStatus = cookie.readCookie('readStatus')
      this.msgDetails = cookie.readCookie('msgDetails')
      // console.log(this.sendTime,this.readStatus,this.msgDetails)
    }
  },
  computed: {
    sysMsgUnread () {   // 系统未读消息
      let temp = this.$store.state.sysMsgUnread
      let sysMsgUnread = temp.addFriend || 0
      sysMsgUnread += temp.team || 0
      let customSysMsgUnread = this.$store.state.customSysMsgUnread
      return sysMsgUnread + customSysMsgUnread
    },
    userInfos () {
      return this.$store.state.userInfos
    },
    myInfo () {
      return this.$store.state.myInfo
    },
    myPhoneId () {  // 用户id
      return `${this.$store.state.userUID}`
    },
    sessionlist () {  
      let sessionlist = this.$store.state.sessionlist.filter(item => {
        item.name = ''
        item.avatar = ''
        if (item.scene === 'p2p') { // p2p 
          let userInfo = null
          if (item.to !== this.myPhoneId) {
            userInfo = this.userInfos[item.to]
          } else {
            // userInfo = this.myInfo
            // userInfo.alias = '我的手机'
            // userInfo.avatar = `${config.myPhoneIcon}`
            return false
          }
          if (userInfo) {
            item.name = util.getFriendAlias(userInfo)
            item.avatar = userInfo.avatar
          }
        } else if (item.scene === 'team') {
          let teamInfo = null
          teamInfo = this.$store.state.teamlist.find(team => {
            return team.teamId === item.to
          })
          if (teamInfo) {
            item.name = teamInfo.name
            item.avatar = teamInfo.avatar || (teamInfo.type === 'normal' ? this.myGroupIcon : this.myAdvancedIcon)
          } else {
            item.name = `群${item.to}`
            item.avatar = item.avatar || this.myGroupIcon
          }
        }
        let lastMsg = item.lastMsg || {}
        if (lastMsg.type === 'text') {
          item.lastMsgShow = lastMsg.text || ''
        } else if (lastMsg.type === 'custom') {

          item.lastMsgShow = util.parseCustomMsg(lastMsg)
          
        } else if (lastMsg.scene === 'team' && lastMsg.type === 'notification') {
          item.lastMsgShow = util.generateTeamSysmMsg(lastMsg)
        } else if (util.mapMsgType(lastMsg)) {
          item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
        } else {
          item.lastMsgShow = ''
        }
        if (item.updateTime) {
          item.updateTimeShow = util.formatDate(item.updateTime, true)
        }
        return item
      })
      if(sessionlist.length){
        this.showSessionList = true
      }
      this.$store.dispatch('hideLoading')
      // console.log(sessionlist)
      return sessionlist
    }
  },
  methods: {
    goLogin(){  
      window.location.href = config.loginUrl
    },
    phoneCall () {
      window.location.href = 'tel:010-53579588'
    },
    enterSysMsgs () {     // 进入系统信息
      if (this.hideDelBtn())
        return
      location.href = '#/sysmsgs'
    },
    enterChat (session) {  // 进入聊天页面
      if (this.hideDelBtn())
        return
      if (session && session.id)  // 判断进入的是哪个session.id
        location.href = `#/chat/${session.id}`  
    },
    
    enterMyChat () {
      // 我的手机页面
      location.href = `#/chat/p2p-${this.myPhoneId}`
    },
    
    deleteSession () {  // 删除对应session.id的聊天list
      if (this.delSessionId !== null) {
        this.$store.dispatch('deleteSession', this.delSessionId)
      }
    },
    showDelBtn (vNode) {  // 显示删除按钮
      if (vNode && vNode.data && vNode.data.attrs) {
        this.delSessionId = vNode.data.attrs.sessionId
        this.stopBubble = true
        setTimeout(() => {
          this.stopBubble = false
        }, 20)
      }
    },
    hideDelBtn () {  // 隐藏删除按钮
      if (this.delSessionId !== null && !this.stopBubble) {
        // 用于判断是否前置状态是显示删除按钮
        this.delSessionId = null
        return true
      }
      return false
    }
  }
}
</script>
<style lang="less">
@rem: 50rem;
*{
  box-sizing: border-box;
}
.empty-list{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
  // margin-bottom: 30%;
  // margin-top: 340/@rem;
  img{
    width: 100%;
    height: 100%;
  }
  .wait-user{
    width: 312/@rem;
    height: 345/@rem;
  }
  .wait-btn{
    margin-top: 30/@rem;
    width: 279/@rem;
    height: 72/@rem;
  }
  .call-btn{
    margin-top: 20/@rem;
    width: 279/@rem;
    height: 72/@rem;
  }
}
  .p-session {
    .vux-cell-primary {
      width: 470/@rem;
    }
  }
</style>
