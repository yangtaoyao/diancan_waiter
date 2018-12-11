<template>
  <view-box>
    <x-header  slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"
    :left-options="{showBack: false,preventGoBack:true}" :right-options="{showMore: true}" @on-click-more="clickMore"
    >
    <span style="height:46px;display:block;line-height:46px;text-align:center" slot="overwrite-title">服务员端</span>
    </x-header>
    <div class="mai-box">
      <h3 style="padding-left:16px;color:#333333;">桌位状态管理</h3>

      <group label-width="5em" :title="'桌位'" class="box">
        <cell primary="content">
          <checker slot="inline-desc" v-model="demo22" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item :disabled="true" @click.prevent.native="itemClick(item)" 
              :value="item" v-for="(item, index) in tables" 
              :key="index">{{item.value}}
            </checker-item>
          </checker>
        </cell>
      </group>
    </div>
   
    <div v-transfer-dom>
      <popup v-model="show" >
        <div class="popup0">
          <group>
            <x-input title="退出登录" class="weui-vcode">
              <x-button @click.native="doLogout()" slot="right" type="default"  style="background-color: none;border:0;color:#666666;font-size:18px;" class="iconfont icon-tuichu   " mini></x-button>
            </x-input>
          </group>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
      title="变更桌位状态"
      @on-cancel="showConfirm=false"
      @on-confirm="onConfirm()">
        <p style="text-align:center;">Are you sure?</p>
      </confirm>
    </div>

  </view-box>
   
    
</template>

<script>
import {
  XInput,
  XButton,
  CellFormPreview, Group, Cell,
  TransferDom,
  Popup,
  XSwitch,
  XHeader,
  Tabbar,
  TabbarItem,
  ViewBox, Flexbox, FlexboxItem, Divider, Checker, CheckerItem, Confirm
} from 'vux'
import { mapGetters } from 'vuex'
import { getUserInfo, removeToken, removeUserInfo } from '../assets/js/auth'
import {baseURL} from '../assets/js/common'

export default {
  name: 'Layout',
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    ViewBox,
    XHeader,
    XSwitch,
    Popup,
    CellFormPreview,
    Group,
    Cell,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    Divider,
    Checker,
    CheckerItem,
    Confirm
  },
  methods: {
    // 确定
    onConfirm () {
      if (this.confirmItem != null) {
        let data = {
          code: 1,
          item: this.confirmItem
        }
        this.websocketsend(JSON.stringify(data))
      }
    },
    itemClick (item) {
      this.showConfirm = true
      this.confirmItem = item
      console.log('itemClick' + JSON.stringify(item))
    },
    clickMore () {
      if (this.show) {
        this.show = false
      } else {
        this.show = true
      }
    },
    doLogout () {
      removeToken()
      removeUserInfo()
      this.$router.push({ path: '/' })
      this.$vux.toast.show({
        text: '退出成功',
        position: 'middle',
        type: 'text'
      })
    },
    /*
    *
    */
    initWebSocket () { // 初始化weosocket
      let userinfo = getUserInfo()
      let username = userinfo.waiter_userid
      // const wsuri = new WebSocket('ws://127.0.0.1:8888/diancan/websocket/' + username)
      this.websock = new WebSocket('ws://' + baseURL + '/websocket/' + username)

      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onopen = this.websocketonopen
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.$vux.toast.show({
        text: 'WebSocket连接成功',
        position: 'middle',
        type: 'success'
      })
      let data = {
        code: 0,
        msg: '这是client：初次连接'
      }
      this.websocketsend(JSON.stringify(data))
    },
    websocketonerror () { // 连接建立失败重连
      // this.initWebSocket()
      this.$vux.toast.show({
        text: 'WebSocket连接失败',
        position: 'middle',
        type: 'cancel'
      })
    },
    websocketonmessage (e) { // 数据接收
      console.log('数据接收' + e.data)
      let res = JSON.parse(e.data)
      //
      if (res.code === 1) {
        console.log('修改成功', res.data)
        this.tablesGeted = res.data
        this.$vux.toast.show({
          text: '修改成功',
          position: 'middle',
          type: 'success'
        })
      } else if (res.code === 0) {
        console.log('修改失败', res.data)
        this.$vux.toast.show({
          text: '修改失败',
          position: 'middle',
          type: 'cancel'
        })
      } else if (res.code === 2) {
        console.log('获取桌表成功', res.data)
        this.tablesGeted = res.data
        console.log(JSON.stringify(this.tables))
        this.$vux.toast.show({
          text: '获取桌表成功',
          position: 'middle',
          type: 'success'
        })
      } else if (res.code === 3) {
        console.log('获取桌表失败', res.data)
        this.$vux.toast.show({
          text: '获取桌表失败',
          position: 'middle',
          type: 'cancel'
        })
      }
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) {  // 关闭
      console.log('已关闭连接', e)
      this.$vux.toast.show({
        text: 'WebSocket已关闭连接',
        position: 'middle',
        type: 'cancel'
      })
    }
  },
  computed: {
    // 展示数据
    tables: function () {
      let arr = []
      if (this.tablesGeted === undefined || this.tablesGeted.length === 0) { return [] }
      for (let i = 0, len = this.tablesGeted.length; i < len; i++) {
        let obj = {}
        obj.value = this.tablesGeted[i].tablenum
        obj.state = this.tablesGeted[i].state
        obj.capacity = this.tablesGeted[i].capacity
        arr.push(obj)
      }
      return arr
    },
    demo22: function () {
      let arr = []
      if (this.tablesGeted === undefined || this.tablesGeted.length === 0) { return [] }
      for (let i = 0, len = this.tablesGeted.length; i < len; i++) {
        if (this.tablesGeted[i].state === true) {
          let obj = {}
          obj.value = this.tablesGeted[i].tablenum
          obj.state = this.tablesGeted[i].state
          obj.capacity = this.tablesGeted[i].capacity
          arr.push(obj)
        }
      }
      return arr
    },
    key () {
      return this.$route.name !== undefined
        ? this.$route.name
        : 'view-' + +new Date()
    },
    ...mapGetters({
      layoutIndex: 'layoutIndex'
    })
  },
  created () {
    console.log('created')
    this.initWebSocket()
  },
  data () {
    return {
      confirmItem: {},
      tablesGeted: [],
      websocket: null,
      showConfirm: false,
      show: false
    }
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.vux-header {
  background-color: #ffffff;
}
.vux-header .vux-header-left span,
.vux-header .vux-header-left {
  color: #333333;
}
.mai-box{
  overflow-y:scroll;
  height: 100%;
  width:100%;
  /* width:calc(100% - 32px); */
  padding-top: 50px;
  /* padding: 50px 16px; */
}

.box /deep/ .vux-checker-box{
  margin: 8px 0;
}
.demo1-item {
  border: 1px solid #cccccc;
  padding:10px 25px;
  margin: 0 4px 4px 0;
  
}
.demo1-item-selected {
  color: #ffffff;
  border: 1px solid green;
  background: #8a2be2;
}
.demo2-item {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
}
.demo2-item-selected {
  border-color: green;
}

</style>