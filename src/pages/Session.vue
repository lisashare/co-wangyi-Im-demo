<template>
  <div class="g-inherit m-main p-session page-top">
    <!-- <x-header class="m-tab">
      <h1 class="m-tab-top">消息</h1>
    </x-header> -->
    <header class="header bc line-bottom">
        <i class="left fa-icon fa fa-angle-left" v-on:click = "$router.back(-1)"></i>
        <!-- <h1 class="m-tab-top" @click="enterNameCard">{{sessionName}}</h1> -->
        <h1>消息</h1>
        <!-- <i class="txt"><img src="/static/images/opportunity/icon/icon_tel.png"></i> -->
    </header>
    <group class="u-list">
      <cell class="u-list-item" title="通知" @click.native="enterSysMsgs">
        <img class="icon" slot="icon" :src="noticeIcon">
        <span v-show="sysMsgUnread > 0" class="u-unread">{{sysMsgUnread}}</span>
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
  </div>
</template>

<script>
import util from '../utils'
import config from '../configs'

export default {
  data () {
    return {
      delSessionId: null,
      stopBubble: false,
      noticeIcon: config.noticeIcon,
      myGroupIcon: config.defaultGroupIcon,
      myAdvancedIcon: config.defaultAdvancedIcon
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
      return sessionlist
    }
  },
  methods: {
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
  .p-session {
    .vux-cell-primary {
      width: 470/@rem;
    }
  }
</style>
