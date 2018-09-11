<template>
  <div class="g-inherit m-article">
    <header-title :title="title"></header-title>
    <div class="m-article-main p-sysmsgs">
        <div class="notice">
            <div class="u-msg item-time session-chat">
              <span class="u-item-time-tip">{{sendTime}}</span>
            </div>
            <div class="content-msg">
              <div class="title">系统公告</div>
              <div class="title-desc">{{msgDetails}}</div>
            </div>
         </div>
       <div class='empty-hint' v-if='!msgList || msgList.length<1'>暂无其他消息</div>
    </div>   
  </div>
</template>

<script>
import cookie from '../utils/cookie'
import config from '../configs'
import HeaderTitle from './components/HeaderTitle'
export default {
  // 进入该页面，文档被挂载
  components:{HeaderTitle},
  data () {
    return {
      sysType: 0, // 系统消息 0, 自定义消息 1,
      defaultAvatar: config.defaultUserIcon,
      deleteIdServer: '',
      title:'通知',
      msgList:'',
      sendTime: '',
      readStatus:'',
      msgDetails:'',
    }
  },
  created(){
     this.sendTime= cookie.readCookie('sendTime')
     this.readStatus = cookie.readCookie('readStatus')
     this.msgDetails = cookie.readCookie('msgDetails')
     cookie.setCookie('readStatus',0)
  },
  computed: {
    userInfos () {
      return this.$store.state.userInfos || {}
    },
  },
  methods: {
    deleteMsg(idServer){
      // this.$store.commit('deleteSysMsgs', {
      //   type: this.sysType,
      //   idServer: idServer,
      // })
    },
    clearMsgs () {
      var that = this
      this.$vux.confirm.show({
        title: '确认要清空消息吗？',
        onConfirm () {
          // that.$store.dispatch('resetSysMsgs', {
          //   type: that.sysType
          // })

        }
      })
    },
    hideDelBtn () {
      if (this.deleteIdServer !== null && !this.stopBubble) {
        // 用于判断是否前置状态是显示删除按钮
        this.deleteIdServer = null
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
.content-msg{
  background: #ffffff;
  border-radius: 6/@rem;
  min-height: 250/@rem;
  margin: 0  24/@rem;
  padding: 39/@rem 24/@rem;
  .title{
    line-height: 36/@rem;
    font-size: 30/@rem;
    color: #333333;
  }
  .title-desc{
    font-size: 24/@rem;
    color: #666666;
    line-height: 38/@rem;
  }
}
.header-contact-customer,.header-nav{
    img{
      width: 100%;
      height:100%;
    }
  }
  .header-contact-customer{
    width: 34/@rem;
    height: 32/@rem;
    // background-image: url('/static/images/common/icon_erji@3x.png');
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    display: inline-block;
    position: absolute;
    top: 29/@rem;
    right: 115/@rem;
    z-index: 11;
  }
  .header-nav{
    width: 34/@rem;
    height: 32/@rem;
    // background-image: url('/static/images/common/icon_classify@3x.png');
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    display: inline-block;
    position: absolute;
    top: 29/@rem;
    right: 24/@rem;
    z-index: 11;
  }
.back-top-box{
  z-index: 2;
  position: fixed;
  right: 9/@rem;
  bottom: 0.58/@rem;
  .back-top{
    width: 148/@rem;
    height: 148/@rem;
    border-radius: 50%;
  }
  img{
    display: block;
    width: 100%;
    height: 100%;
    // vertical-align: middle;
  } 
}
  .p-sysmsgs {
    background: #eff2f7;
    .u-list {
      height: 100%;
      overflow-y: scroll;
    }
    p {
      word-wrap: normal;
      word-break: break-all;
      color: #333;
    }
    
    .g-teamSys {
      display: flex;
      flex-grow: 100;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      
      .m-info {
        flex-shrink: 1;
        overflow: hidden;

        .u-time {
          color: #aaa;
        }
        .u-desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #aaa;
          font-size: 1rem;
        }
      }

      .m-options{
        display: flex;
        align-items: center;
        
        .weui-btn.weui-btn_mini {
          padding: 0;
          width: 3rem;
          height: 2rem;
        }
        
        .weui-btn + .weui-btn {
          margin-top: 0;
          margin-left: 0.5rem;
        }
      }
    }
    .u-msg-state {
      color: #aaa;
      font-size: .9rem;
    }
    .empty-hint{
      position: relative;
      // left: 0;
      // right: 0;
      // top: 160/@rem;  
      margin: 28/@rem auto;
      text-align: center;
    }
  }
</style>