<template>
  <div class="servicePop">
    <div class="mask" v-if="isTelShow" @click="closeTel"></div>
    <div class="popWrap" v-if="isTelShow" @click="closeTel">
      <img :src="icon3" />
      <img class="closeBtn" :src="icon4" />
      <div class="btnBottom">
        <a @click="goSession" class="online">
          <span class="icon-tel"><img :src="icon5"></span>
          在线咨询
        </a>
        <a @click="phoneCall" class="call">
          <span class="icon-call"><img :src="icon6"></span>
          拨打电话
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from '../../utils/cookie'
import util from '../../utils'
import config from '../../configs'
export default {
  name: 'ServicePop',
  props: ["isTelShow","closeTel"],
  data(){
    return {
      icon3: `${config.resourceUrl}im/pop_dianhuakefu@3x.png`,
      icon4: `${config.resourceUrl}im/icon_close@3x.png`,
      icon5: `${config.resourceUrl}im/icon_zixun@3x.png`,
      icon6: `${config.resourceUrl}im/icon_phone@3x.png`,
      sendTime: '',
      readStatus:'',
      msgDetails:'',
      sessionId:''
    }
  },
  methods: {
    //拨打电话
    phoneCall () {
      window.location.href = 'tel:010-53579588'
    },
    goSession(){
      // 点击，取cookie 如果没有登录和session id 跳转到登录，如果有跳转到聊天
      let loginInfo = {
        uid: cookie.readCookie('uid'),
        sdktoken: cookie.readCookie('sdktoken'),
      }
      this.sessionId = cookie.readCookie('sessionId')
      if (!loginInfo.uid) {
        window.location.href = config.loginUrl
      } else if(this.sessionId){
        location.href = '#/chat/p2p-' + this.sessionId
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @rem: 50rem;
  .servicePop {
    .mask {
      z-index: 10;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.4);
    }
    .popWrap {
      width: 570/@rem;
      height: 400/@rem;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -285/@rem;
      margin-top: -200/@rem;
      //border: 1px solid red;
      img {
        width: 570/@rem;
        height: 400/@rem;
      }
      z-index: 11;
      .closeBtn {
        width: 52/@rem;
        height: 52/@rem;
        position: absolute;
        right: -8/@rem;
        top: 0/@rem;
      }
      .btnBottom {
        width: 518/@rem;
        height: 73/@rem;
        position: absolute;
        bottom: 60/@rem;
        left: 50%;
        margin-left: -259/@rem;
        display: flex;
        justify-content: space-between;
        //border: 1px solid blue;
        a {
           font-size: 26/@rem;
           color:#fff;
           width: 248/@rem;
           height: 73/@rem;
           text-align: center;
           line-height: 73/@rem;
           display: inline-block;
           border-radius: 6px;
        }
        span {
          margin-right: 18/@rem;
          display: inline-block;
          background-repeat: no-repeat;
        }
        .online {
           background: #f66d61;
          .icon-tel {
              width: 34/@rem;
              height: 32/@rem;
            img{
              width: 100%;
              height: 100%;
            }
            position: relative;
            top: 10/@rem;
          }
        }
        .call {
          background: #2caeb7;
          .icon-call {
            width: 34/@rem;
            height: 34/@rem;
            img{
              width: 100%;
              height: 100%;
            }
            position: relative;
            top: 10/@rem;
          }
        }
      }

    }
  }
</style>
