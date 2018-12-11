<template>
  <div id="app">
    <transition name="transitionName"> 
      <router-view></router-view>
    </transition :name="transitionName"> 
  </div>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'app',
  directives: {
    TransferDom
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,body {
  height: 100%;
  background-color: #fbf9fe;
}
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
