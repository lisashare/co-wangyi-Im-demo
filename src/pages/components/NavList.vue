<template>
  <div class="nav-list">     
      <transition name="fade">
           <div 
            v-if="isNavShow" 
            @click="closeNav" class="mask"></div>  
      </transition>
          <!-- 导航 -->
        <transition name="fade">
        <nav 
            @click="closeNav"
            v-if="isNavShow" 
            class="nav-group">
            <ul>
                <li v-for="nav in navs" :key="nav.id">
                    <a :href="nav.url">
                        <div class="nav-img"><img :class="nav.icon" :src="nav.img" /></div>
                        <span class="title">{{nav.title}}</span>
                    </a>
                </li>
                <!-- <router-link tag="li" :to="nav.url" v-for="nav in navs" :key="nav.id">
                    <div class="nav-img"><img :class="nav.icon" :src="nav.img" /></div>
                    <span class="title">{{nav.title}}</span>
                </router-link> -->
                <li @click="downLoadApp">
                    <div class="nav-img"><img class="icon8" :src="img8" /></div>
                    <span class="title">APP</span>
                </li>
            </ul>
            <span class="triangle"></span>
        </nav>
    </transition>
  </div>
</template>
<script>
import config from '../../configs'
export default {
  name:'NavList',
  props:['isNavShow',"closeNav"],
  data () {
      return {
          navs:[
              {id:1,title:'首页',url:`${config.indexUrl}#/`,icon:'icon1',img:`${config.resourceUrl}im/icon_me@3x.png`},
              {id:2,title:'商机',url:`${config.indexUrl}#/opportunity`,icon:'icon2',img:`${config.resourceUrl}im/icon_shangji@3x.png`},
              {id:3, title: 'VR看店', url: `${config.indexUrl}#/vr`,icon:'icon3',img:`${config.resourceUrl}im/icon_vr@3x.png`},
              {id:4, title: '商评', url: `${config.indexUrl}#/shangping`,icon:'icon4',img:`${config.resourceUrl}im/icon_shangping@3x.png`},
              {id:5, title: '发现', url: `${config.indexUrl}#/case`,icon:'icon5',img:`${config.resourceUrl}im/icon_find@3x.png`},
              {id:6, title: '消息', url: `${config.homeUrl}`,icon:'icon6',img:`${config.resourceUrl}im/icon_xiaoxi@3x.png`},
              {id:7,title:'我的',url:`${config.indexUrl}#/me`,icon:'icon7',img:`${config.resourceUrl}im/icon_me@3x.png`}
          ],
          img8: `${config.resourceUrl}im/icon_app@3x.png`
      }
  },
  methods:{
      downLoadApp(){
          window.location.href = config.downLoad
        // if( this.judgeType() == 'IOS' ){
        //     window.location.href = config.downLoadIos;
        // }
        // if( this.judgeType() == 'Android' ){
        //     window.location.href = config.downLoadAndroid;
        // }
    },
    // judgeType(){
    //     var ua = navigator.userAgent.toLowerCase();
    //     if (ua.match(/iPhone\sOS/i) == "iphone os") {
    //         return "IOS";
    //     } else if(ua.match(/Android/i) == "android") {
    //         return "Android";
    //     }
    // },
  }
}
</script>

<style lang="less" scoped>
@rem: 50rem;
*{
    box-sizing:border-box;
}
// 调节动画时间
.animated{
    animation-duration: 0.7s;
}
.mask{
    z-index: 10;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .4)
}
.nav-list{
    .triangle{
        width: 0;
        height: 0;
        border-left: 24/@rem solid transparent;
        border-right: 24/@rem solid transparent;
        border-bottom: 24/@rem solid #ffffff;
        position: absolute;
        // right: 68/@rem; // 首页
        right: 22/@rem;
        top: -12/@rem;
    }
    nav{
        position: fixed;
        // top: 130/@rem; // 首页
        top: 88/@rem;
        left: 0;
        right: 0;
        width: auto;
        // height: 384/@rem;
        z-index: 11; 
        background: #ffffff;
        border-radius: 0 0 14/@rem 14/@rem;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 20/@rem 16/@rem 20/@rem;
            li{
                width: 179/@rem;
                margin-top: 32/@rem;
                text-align: center;
                .nav-img{
                    height: 58/@rem;
                    text-align: center;
                    line-height: 58/@rem;
                    img{
                        display: inline-block;
                    }
                    .icon1{
                        width: 56/@rem;
                        height: 58/@rem;
                    }
                    .icon2{
                        width: 58/@rem;
                        height: 58/@rem;
                    }
                    .icon3{
                        width: 56/@rem;
                        height: 56/@rem;
                    }
                    .icon4{
                        width: 52/@rem;
                        height: 58/@rem;
                    }
                    .icon5{
                        width: 44@rem;
                        height: 58/@rem;
                    }
                    .icon7{
                        width: 54/@rem;
                        height: 57/@rem;
                    }
                    .icon8,.icon6{
                        width: 56/@rem;
                        height: 58 /@rem;
                    }
                }
                .title{
                    display: inline-block;
                    font-size: 24/@rem;
                    color: #333333;
                    line-height: 80/@rem;
                    text-align: center;
                }
            }
        }        
    }    
}
</style>
