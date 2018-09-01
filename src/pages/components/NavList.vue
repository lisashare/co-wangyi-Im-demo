<template>
  <div class="nav-list">     
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
           <div 
            v-if="isNavShow" 
            @click="closeNav" class="mask"></div>  
      </transition>
          <!-- 导航 -->
        <transition
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOut"
        >
        <nav 
            @click="closeNav"
            v-if="isNavShow" 
            class="nav-group">
            <ul>
                <router-link tag="li" :to="nav.url" v-for="nav in navs" :key="nav.id">
                    <div class="nav-img"><img :class="nav.icon" :src="nav.img" /></div>
                    <span class="title">{{nav.title}}</span>
                </router-link>
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
              {id:1,title:'首页',url:'/',icon:'icon1',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:2,title:'商机',url:'/',icon:'icon2',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:3, title: 'VR看店', url: '/',icon:'icon3',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:4, title: '商评', url: '/',icon:'icon4',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:5, title: '发现', url: '/',icon:'icon5',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:6, title: '消息', url: '/',icon:'icon6',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:7,title:'我的',url:'/',icon:'icon7',img:`${config.resourceUrl}/im/chat-editor-1.png`},
              {id:8,title:'APP',url:'/',icon:'icon8',img:`${config.resourceUrl}/im/chat-editor-1.png`}
          ]
      }
  },
  methods:{
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
