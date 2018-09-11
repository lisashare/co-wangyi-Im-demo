<template>
    <div class="header-title">
        <header class="header line-bottom">
          <i class="icon-left" v-on:click = "$router.back(-1)">
            <img :src="icon3" alt="">
          </i>
          <h2>{{title}}</h2>
          <span class="header-contact-customer" @click="isTelShow=!isTelShow"><img :src="icon1"></span>
          <span class="header-nav" @click="isNavShow=!isNavShow"><img :src="icon2"></span>
        </header>
        <nav-list 
            :close-nav="closeNav" 
            :is-nav-show="isNavShow">
        </nav-list>

        <service-pop
          :closeTel="closeTel"
          :isTelShow="isTelShow">
        </service-pop>
    </div>
</template>
<script>
import ServicePop from './ServicePop'
import config from '../../configs'
import NavList from './NavList'
export default {
  name: 'HeaderTitle',
  components: {NavList,ServicePop},
  props: ['title'],
  data () {
    return {
      isNavShow: false,
      isTelShow: false,
      icon1: `${config.resourceUrl}im/icon_erji@3x.png`,
      icon2: `${config.resourceUrl}im/icon_classify@3x.png`,
      icon3: `${config.resourceUrl}im/icon_back@3x.png`,
    }
  },
  methods: {
    phoneCall () {
      window.location.href = 'tel:010-53579588'
    },
    closeNav () {
      this.isNavShow = false
    },
    closeTel () {
      this.isTelShow = false;
    },
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
*{
    box-sizing: border-box;
}
 .header-contact-customer,.header-nav{
    img{
      width: 100%;
      height:100%;
    }
  }
  .header-contact-customer{
    display: inline-block;
    position: absolute;
    right: 96/@rem;
    top: 0;
    width: 70/@rem;
    height: 88/@rem;
    text-align: center;
    z-index: 3;
    img{
      width: 34/@rem;
      height: 32/@rem;
      margin-top:28/@rem;
    }
  }
  .header-nav{
    display: inline-block;
    width: 84/@rem;
    height: 88/@rem;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    img{
      width: 36/@rem;
      height: 28/@rem;
      margin-top:30/@rem;
    }
  }
</style>
