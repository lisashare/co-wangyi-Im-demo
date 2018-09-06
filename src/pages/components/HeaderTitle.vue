<template>
    <div class="header-title">
        <header class="header bc line-bottom">
          <i class="left fa-icon fa fa-angle-left" v-on:click = "$router.back(-1)"></i>
          <h1>{{title}}</h1>
          <span class="header-contact-customer" @click="phoneCall"><img :src="icon1"></span>
          <span class="header-nav" @click="isNavShow=!isNavShow"><img :src="icon2"></span>
        </header>
        <nav-list 
            :close-nav="closeNav" 
            :is-nav-show="isNavShow">
        </nav-list>
    </div>
</template>
<script>
import config from '../../configs'
import NavList from './NavList'
export default {
  name: 'HeaderTitle',
  components: {NavList},
  props: ['title'],
  data () {
    return {
      isNavShow: false,
      icon1: `${config.resourceUrl}im/icon_erji@3x.png`,
      icon2: `${config.resourceUrl}im/icon_classify@3x.png`,
    }
  },
  methods: {
    phoneCall () {
      window.location.href = 'tel:010-53579588'
    },
    closeNav () {
      this.isNavShow = false
    }
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
*{
    box-sizing: border-box;
}
.header-title{
  display: flex;
  z-index:9;
}
 .header-contact-customer,.header-nav{
    img{
      width: 100%;
      height:100%;
    }
  }
  .header-contact-customer{
    width: 67/@rem;
    height: 88/@rem;
    padding-right: 33/@rem;
    display: inline-block;
    position: absolute;
    top: 0;
    right: 82/@rem;
    z-index: 11;
    img{
      width: 34/@rem;
      height: 32/@rem;
      margin-top:29/@rem;
    }
  }
  .header-nav{
    img{
      width: 34/@rem;
      height: 32/@rem;
      margin-top:29/@rem;
    }
    display: inline-block;
    width: 82/@rem;
    height: 88/@rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 11;
  }
</style>
