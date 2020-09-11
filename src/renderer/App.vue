<template>
  <div id="app">
    <div class="top"></div>
    <div class="left">
      <!-- <div>
        <span style="float: right;margin-top: 11px;margin-right: 15px;">design by Huawen</span>
      </div> -->
      <div class="settings">
        <div>
          <b style="font-size: 15px;">连接串口</b>
        </div>
        <select v-model="p" class="select">
          <option :key="x.p" v-for="x in ports">{{x.p}}</option>
        </select>
        <div style="margin-top: 10px;">
          <b style="font-size: 15px;">波特率</b>
        </div>
        <select v-model="b" class="select">
          <option :key="x.b" v-for="x in bps">{{x.b}}</option>
        </select>
        <div style="margin-top: 10px;">
          <b style="font-size: 15px;">模式</b>
        </div>
        <select v-model="func" class="select">
          <option :key="x.func" v-for="x in funcs">{{x.func}}</option>
        </select>
        <button @click="sure" class="confirm">确定</button>
      </div>
    </div>
    <div class="right">
      <router-view :port='port'></router-view>
    </div>
  </div>
</template>
    <!-- <router-view></router-view> -->

<script>
  // import serialport from 'serialport'
  export default {
    name: 'my-project',
    data () {
      return {
        ports: [
          {p: 'COM1'},
          {p: 'COM2'},
          {p: 'COM3'},
          {p: 'COM4'},
          {p: 'COM5'},
          {p: 'COM6'},
          {p: 'COM7'}
        ],
        bps: [
          {b: 9600},
          {b: 11250},
          {b: 19200},
          {b: 23333}
        ],
        funcs: [
          {func: '发送字符'},
          {func: '采样率转换'}
        ],
        p: '',
        b: '',
        func: '',
        port: ''
      }
    },
    methods: {
      sure () {
        var that = this
        try {
          console.log('try')
          that.port.close(
            function (error) {
              // if (error == null) {
              that.remote = require('electron').remote
              const SerialPort = that.remote.getGlobal('SerialPort')
              that.port = new SerialPort(that.p, {
                baudRate: Number(that.b),
                dataBits: 8,
                parity: 'odd',
                stopBits: 2,
                hupcl: true,
                lock: false,
                rtscts: false,
                xany: false,
                xoff: false,
                xon: false
              })
              console.log(that.port)
              // }
              console.log('err', error)
            }
          )
        } catch (err) {
          console.log('catch')
          that.remote = require('electron').remote
          const SerialPort = that.remote.getGlobal('SerialPort')
          that.port = new SerialPort(that.p, {
            baudRate: Number(that.b),
            dataBits: 8,
            parity: 'odd',
            stopBits: 2,
            hupcl: true,
            lock: false,
            rtscts: false,
            xany: false,
            xoff: false,
            xon: false
          })
          console.log(that.port)
        }
      }
    },
    created () {
      this.b = this.bps[0].b
      this.func = this.funcs[0].func
    }
  }
</script>

<style>
body, h1, p {
  /* width: 100%; */
  height: 100%;
  margin: 0;
  padding: 0;
}
.top {
  width: 100%;
  height: 20%;
  background-color: #008cba;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.left {
  width: 30%;
  height: 100%;
  position: absolute;
  /* border-right: 3px solid #e1e4e8; */
  box-shadow: 2px 0px 5px #e1e4e8;
  background-color: #fafafa;
  line-height: 22px;
}
.right {
  width: 70%;
  position: absolute;
  height: 100%;
  padding-left: 30%;
  z-index: -1;
}
.settings {
  padding-top: 10px;
  padding-left: 8%;
  padding-right: 8%;
}
.select {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  line-height: 22px;
}
.confirm {
  background-color: #008cba; /* Green */
  border: none;
  color: white;
  /* padding: 15px 32px; */
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  width: 84%;
  height: 30px;
  border-radius: 5px;
  position: absolute;
  bottom: 15px;
	cursor: pointer;
}
</style>
