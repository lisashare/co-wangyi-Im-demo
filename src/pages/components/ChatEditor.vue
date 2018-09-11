<template>
  <div class="m-chat-editor" @click="hideRobotList">
    <div class="m-chat-editor-main" :class="{robot:isRobot}">
      <!-- 添加语音功能 暂不开发 -->
      <!-- <span v-if="!isRobot" class="u-editor-icon u-editor-voice">
        <i class="u-icon-img"><img :src="icon1"></i>
      </span> -->

      <span v-if="!isRobot" class="u-editor-icon u-editor-emoji" @click.stop="showEmoji">
        <i class="u-icon-img"><img :src="icon4"></i>
      </span>
      <!-- 输入内容的textarea -->
      <span class="u-editor-input" @keyup.enter="sendTextMsg">
        <textarea class="textarea" v-model="msgToSent" @focus='onInputFocus'></textarea>
        <!-- <div class="textarea" v-model="msgToSent" @focus='onInputFocus' contenteditable="true"></div> -->
      </span>
      <!-- <span class="u-editor-icons"> -->
        <!-- <span v-if="!isRobot" class="u-editor-icon u-editor-emoji" @click.stop="showEmoji">
          <i class="u-icon-img"><img :src="icon4"></i>
        </span> -->
        <span v-if="!isRobot" class="u-editor-icon u-editor-plus"  @click.stop="showPlus">
          <i class="u-icon-img"><img :src="icon5"></i>
        </span>
        <span class="u-editor-send02" @click.stop="sendTextMsg">发 送</span>
      <!-- </span> -->
    </div>

    <!-- 工具 -->
    <chat-tool
      v-bind:type="type"
      v-bind:scene="scene"
      v-bind:to="to"
      v-show="isPlusShown"
      v-on:hide-plus="hidePlus">
    </chat-tool>

    <chat-emoji
      v-bind:type="type"
      v-bind:scene="scene"
      v-bind:to="to"
      v-show="isEmojiShown"
      v-on:add-emoji="addEmoji"
      v-on:hide-emoji="hideEmoji"
      v-on:send-msg="sendTextMsg"
    ></chat-emoji>

    <group v-show="isRobotListShown" class="m-chat-emoji m-chat-robot">
      <cell v-for="robot in robotslist" :title="robot.nick" :key="robot.account" @click.native="chooseRobot(robot)">
        <img class="icon u-circle" slot="icon" width="20" height="20" :src="robot.avatar">
      </cell>
    </group>
  </div>
</template>

<script>
import ChatEmoji from './ChatEmoji'
import ChatTool from './ChatTool'
import util from '../../utils'
import config from '../../configs'
import pageUtil from '../../utils/page'

export default {
  components: {
    ChatEmoji,
    ChatTool
  },
  data () {
    return {
      isEmojiShown: false,  // 表情显示
      isPlusShown: false,   // 工具功能显示
      isRobotListShown: false,
      msgToSent: '',
      icon1: `${config.resourceUrl}im/chat-editor-1.png`,
      icon2: `${config.resourceUrl}im/chat-editor-2.png`,
      icon3: `${config.resourceUrl}im/chat-editor-3.png`,
      icon4: `${config.resourceUrl}im/chat_05.png`,
      icon5: `${config.resourceUrl}im/chat_07.png`
    }
  },
  updated () {
    window.document.body.addEventListener('click', () => {
      this.isEmojiShown = false
    })
    window.document.body.addEventListener('click', () => {
      this.isPlusShown = false
    })
  },
  props: {
    type: String,
    scene: String,
    to: String,
    isRobot: {  // 表情
      type: Boolean,
      default () {
        return false
      }
    },
    invalid: {
      type: Boolean,
      default: false
    },
    invalidHint: {
      type: String,
      default: '您无权限发送消息'
    },
    advancedTeam: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    continueRobotAccid (curVal, oldVal) {
      if (curVal && this.robotInfos[curVal]) {
        this.msgToSent = `@${this.robotInfos[curVal].nick} `
      }
      // 重置
      this.$store.dispatch('continueRobotMsg', '')
    },
    msgToSent (curVal, oldVal) {
      if (this.isRobot) {
        return
      }
      let indexAt = this.msgToSent.indexOf('@')
      if (indexAt >= 0 && (indexAt === this.msgToSent.length - 1)) {
        if (this.robotslist && this.robotslist.length > 0) {
          this.isRobotListShown = true
        }
      } else if (this.isRobotListShown === true) {
        this.isRobotListShown = false
      }
    }
  },
  
  computed: {
    continueRobotAccid () {
      return this.$store.state.continueRobotAccid
    },
    robotslist () {
      return this.$store.state.robotslist
    },
    robotInfos () {
      return this.$store.state.robotInfos
    },
    robotInfosByNick () {
      return this.$store.state.robotInfosByNick
    }
  },
  methods: {
    sendTextMsg () {
      if (this.invalid) {
        this.$toast(this.invalidHint)
        return
      }
      if (/^\s*$/.test(this.msgToSent)) {
        this.$vux.alert.show({
          title: '请不要发送空消息'
        })
        return
      } else if (this.msgToSent.length > 800) {
        this.$vux.alert.show({
          title: '请不要超过800个字'
        })
        return
      }
      this.msgToSent = this.msgToSent.trim()
      if (this.type === 'session') {
        // 如果是机器人
        if (this.isRobot) {
          this.$store.dispatch('sendRobotMsg', {
            type: 'text',
            scene: this.scene,
            to: this.to,
            robotAccid: this.to,
            // 机器人后台消息
            content: this.msgToSent,
            // 显示的文本消息
            body: this.msgToSent
          })
        } else {
          let robotAccid = ''
          let robotText = ''

          let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
          if (atUsers) {
            for (let i = 0; i < atUsers.length; i++) {
              let item = atUsers[i].replace('@', '')
              if (this.robotInfosByNick[item]) {
                robotAccid = this.robotInfosByNick[item].account
                robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                break
              }
            }
          }
          if (robotAccid) {
            if (robotText) {
              this.$store.dispatch('sendRobotMsg', {
                type: 'text',
                scene: this.scene,
                to: this.to,
                robotAccid,
                // 机器人后台消息
                content: robotText,
                // 显示的文本消息
                body: this.msgToSent
              })
            } else {
              this.$store.dispatch('sendRobotMsg', {
                type: 'welcome',
                scene: this.scene,
                to: this.to,
                robotAccid,
                // 显示的文本消息
                body: this.msgToSent
              })
            }
          } else {
            this.$store.dispatch('sendMsg', {
              type: 'text',
              scene: this.scene,
              to: this.to,
              text: this.msgToSent
            })
          }
        }
      } else if (this.type === 'chatroom') {
        let robotAccid = ''
        let robotText = ''

        let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
        if (atUsers) {
          for (let i = 0; i < atUsers.length; i++) {
            let item = atUsers[i].replace('@', '')
            if (this.robotInfosByNick[item]) {
              robotAccid = this.robotInfosByNick[item].account
              robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
              break
            }
          }
        }
        if (robotAccid) {
          if (robotText) {
            this.$store.dispatch('sendChatroomRobotMsg', {
              type: 'text',
              robotAccid,
              // 机器人后台消息
              content: robotText,
              // 显示的文本消息
              body: this.msgToSent
            })
          } else {
            this.$store.dispatch('sendChatroomRobotMsg', {
              type: 'welcome',
              robotAccid,
              // 显示的文本消息
              body: this.msgToSent
            })
          }
        } else {
          this.$store.dispatch('sendChatroomMsg', {
            type: 'text',
            text: this.msgToSent
          })
        }
      }
      this.msgToSent = ''
      // 点击发送关闭表情
      this.hideEmoji()
      this.hidePlus()
    },
    sendPlayMsg () {
      if (this.invalid) {
        this.$toast(this.invalidHint)
        return
      }
      // 发送猜拳消息
      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'custom',
          scene: this.scene,
          to: this.to,
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random()*3)
            }
          }
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'custom',
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random()*3)
            }
          }
        })
      }
    },
    sendFileMsg () {
      if (this.invalid) {
        this.$toast(this.invalidHint)
        return
      }
      let ipt = this.$refs.fileToSent
      if (ipt.value) {
        if (this.type === 'session') {
          this.$store.dispatch('sendFileMsg', {
            scene: this.scene,
            to: this.to,
            fileInput: ipt
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomFileMsg', {
            fileInput: ipt
          })
        }
      }
    },
    showEmoji () {  // emoji显示
    // console.log(this.msgToSent)
      this.hidePlus()
      this.isEmojiShown = !this.isEmojiShown
    },
    showPlus () {  // 显示工具选项
      this.hideEmoji ()
      this.isPlusShown = !this.isPlusShown
    },
    hideEmoji () {  // emoji隐藏
      this.isEmojiShown = false
    },
    hidePlus () { // 隐藏工具选项
      this.isPlusShown = false
    },
    addEmoji (emojiName) {  // 添加表情
      this.msgToSent += emojiName
      // this.hideEmoji()   // 添加表情不隐藏
    },
    // addPlus (plusName) {
    //   this.msgToSent += plusNames
    //   this.hidePlus()
    // },
    chooseRobot (robot) {
      if (robot && robot.account) {
        let len = this.msgToSent.length
        if (len === 0 || this.msgToSent[len-1] !== '@') {
          this.msgToSent += '@' + robot.nick + ' '
        } {
          this.msgToSent += robot.nick + ' '
        }
      }
    },
    hideRobotList () {
      this.isRobotListShown = false
    },
    onInputFocus(e) {
      setTimeout(() => {
        // todo fixme 解决iOS输入框被遮挡问题，但会存在空白缝隙
        e.target.scrollIntoView()
        pageUtil.scrollChatListDown()
      }, 200)
    },
    turnToMsgReceipt() {
      if (this.invalid) {
        this.$toast(this.invalidHint)
        return
      }
      location = `#/teamSendMsgReceipt/${this.to}`
    }
  }
}
</script>

<style lang="less" scoped>
@rem: 50rem;
  .m-chat-robot {
    overflow-y: scroll;
    .weui-cells {
      .weui-cell__hd {
        margin-right: 0.5rem;
      }
    }
  }

  .u-editor-send.u-editor-receipt {
    background-color: #fefefe;
    border: #ccc solid 1px;
    color: black;
    padding: 0.1rem;
    margin-left: .1rem;
  }
</style>