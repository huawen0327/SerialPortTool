<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header style="height: 204px;">
        <!-- <pre style="color: #75beff;font-weight: 600;">


          
  _____           _       _ _____           _ _______          _ 
 / ____|         (_)     | |  __ \         | |__   __|        | |
| (___   ___ _ __ _  __ _| | |__) |__  _ __| |_ | | ___   ___ | |
 \___ \ / _ \ '__| |/ _` | |  ___/ _ \| '__| __|| |/ _ \ / _ \| |
 ____) |  __/ |  | | (_| | | |  | (_) | |  | |_ | | (_) | (_) | |
|_____/ \___|_|  |_|\__,_|_|_|   \___/|_|   \__||_|\___/ \___/|_|
        </pre> -->
        <pre style="color: #409eff;">


 ____                                 ___    ____               __    ______                 ___      
/\  _`\                  __          /\_ \  /\  _`\            /\ \__/\__  _\               /\_ \     
\ \,\_\_\     __   _ __ /\_\     __  \//\ \ \ \ \_\ \___   _ __\ \ ,_\/_/\ \/    ___     ___\//\ \    
 \/_\__ \   /'__`\/\`'__\/\ \  /'__`\  \ \ \ \ \ ,__/ __`\/\`'__\ \ \/  \ \ \   / __`\  / __`\\ \ \   
   /\ \_\ \/\  __/\ \ \/ \ \ \/\ \_\.\_ \_\ \_\ \ \/\ \_\ \ \ \/ \ \ \_  \ \ \ /\ \_\ \/\ \_\ \\_\ \_ 
   \ `\____\ \____\\ \_\  \ \_\ \__/.\_\/\____\\ \_\ \____/\ \_\  \ \__\  \ \_\\ \____/\ \____//\____\
    \/_____/\/____/ \/_/   \/_/\/__/\/_/\/____/ \/_/\/___/  \/_/   \/__/   \/_/ \/___/  \/___/ \/____/
        </pre>
        <span style="position: absolute;top: 170px;right: 30px;font-size: 15px;color: #8c8886;">design by Huawen</span>
      </el-header>
      <el-container>
        <el-aside style="height: 400px;" width="350px">
          <br>
          <br>
          &#8195;端口:
          <el-select v-model="value" placeholder="选择端口" style="width: 180px;">
            <el-option
              v-for="item in ports"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          波特率:
          <el-input v-model="bps" placeholder="波特率" style="width: 180px;margin-top: 20px;"></el-input>
          <br>
          输入位:
          <el-input v-model="inputbits" placeholder="输入位" style="width: 180px;margin-top: 20px;"></el-input>
          <br>
          停止位:
          <el-input v-model="stopbits" placeholder="停止位" style="width: 180px;margin-top: 20px;"></el-input>
          <br>
          校验位:
          <el-select v-model="checkbit" placeholder="校验位" style="width: 180px;margin-top: 20px;">
            <el-option
              v-for="item in checkbits"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <el-button type="primary" style="width: 180px;margin-top: 20px;" @click="serialSure">确定</el-button>
        </el-aside>
        <el-main style="height: 400px;" width="500px">
          <div class='main'>
            <div style="margin-top: 30px;color: #409eff;">
              <b>上传wav音频文件</b>
            </div>
            <br>
            <div class='upload' @click="upload">
              <img v-if="uploaded" id="file" src="~@/assets/music.png" alt="electron-vue">
              <img v-else id="file" src="~@/assets/file.png" alt="electron-vue">
              <div style="color: #000;">
                {{path}}
              </div>
            </div>
            <div style="padding: 25px 50px 0 50px;" v-if="percent != 0">
              <el-progress :text-inside="true" :stroke-width="20" :percentage=percent></el-progress>
            </div>
            <!-- <el-input v-model="inbps" placeholder="初始采样率" style="width: 100px;"></el-input>
            <el-input v-model="outbps" placeholder="结果采样率"></el-input> -->
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="采样率转换" :visible.sync="dialogFormVisible">
      初始采样率:
      <el-input v-model="startbps" :disabled="true" style="width: 180px;margin-top: 20px;"></el-input>
      <br>
      结果采样率:
      <el-select v-model="stopbps" style="width: 180px;margin-top: 20px;">
        <el-option
          v-for="item in stopbpslist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureToTrans">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    <!-- <router-view></router-view> -->

<script>
  // import serialport from 'serialport'
  import getFloatHex from './float2hex.js'
  console.log(getFloatHex)
  console.log(getFloatHex.hex2int)
  export default {
    name: 'my-project',
    data () {
      return {
        ports: [{
          value: 'COM1',
          label: 'COM1'
        }, {
          value: 'COM2',
          label: 'COM2'
        }, {
          value: 'COM3',
          label: 'COM3'
        }, {
          value: 'COM4',
          label: 'COM4'
        }, {
          value: 'COM5',
          label: 'COM5'
        }, {
          value: 'COM6',
          label: 'COM6'
        }, {
          value: 'COM7',
          label: 'COM7'
        }, {
          value: 'COM8',
          label: 'COM8'
        }],
        checkbits: [{
          value: 'none',
          label: 'none'
        }, {
          value: 'odd',
          label: 'odd'
        }, {
          value: 'even',
          label: 'even'
        }, {
          value: 'mark',
          label: 'mark'
        }, {
          value: 'space',
          label: 'space'
        }],
        stopbpslist: [{
          value: '8000',
          label: '8kHz'
        }, {
          value: '16000',
          label: '16kHz'
        }, {
          value: '44100',
          label: '44.1kHz'
        }, {
          value: '48000',
          label: '48kHz'
        }, {
          value: '96000',
          label: '96kHz'
        }],
        value: '',
        bps: '19200',
        inputbits: '8',
        stopbits: '2',
        checkbit: 'odd',
        dialogTableVisible: false,
        dialogFormVisible: false,
        startbps: '',
        stopbps: '',
        ipcRenderer: '',
        path: '',
        // 是否已经上传
        uploaded: false,
        // wav的数据
        data: [],
        // 接收到的数据
        recData: [],
        // 串口对象
        port: '',
        // 进度条
        percent: 0,
        // 保存的标志
        saveFlag: 0,
        sendFlag: 1,
        sendOverSignal: false,
        recFlag: false,
        // 接收的字符串
        // recI: 0
        // 结束的标志
        endFlag: false,
        // 传输的第几个数组
        sendArrI: 0,
        times: 0
      }
    },
    created () {
      // console.log(getFloatHex.getFloatHex)
      console.log(getFloatHex.getFloatHex(1.01))
      var that = this
      const {ipcRenderer} = require('electron')
      var cmd = require('node-cmd')
      // this.ipcRenderer = require('electron').remote.getGlobal('ipcRenderer')
      this.ipcRenderer = ipcRenderer
      console.log(this.ipcRenderer)
      console.log('create')
      this.ipcRenderer.on('selected-file', (event, path) => {
        console.log('on')
        that.path = path
        that.uploaded = true
        console.log(path)
        cmd.get(
          'python ./src/renderer/assets/readWav.py ' + path,
          function (err, data, stderr) {
            console.log(err)
            console.log(stderr)
            console.log(data)
            console.log('ready to readFile')
            var fileData = that.readFile('./src/renderer/assets/music.json')
            console.log('data')
            that.startbps = JSON.parse(fileData).rp
            that.data = JSON.parse(fileData).data.split(';')
            that.times = Number(JSON.parse(fileData).times)
            console.log(that.startbps)
            // console.log(getFloatHex.getFloatHex(Number(that.data[5])))
            // var len = that.data.length
            // var j
            // // console.log(that.data)
            // for (j = 0; j < len; j++) {
            //   that.data[j] = getFloatHex.getFloatHex(Number(that.data[j]))
            // }
            // console.log(that.data)
            // console.log(getFloatHex.getFloatHex(0.0355224609375))
            // var tmp = JSON.parse(data.replace(/'/g, '"'))
            // that.startbps = tmp.rp
            // that.data = tmp.data.split(',')
            // console.log(that.data)
            that.dialogFormVisible = true
          }
        )
        // cmd.run('python ./src/renderer/assets/readWav.py ' + path)
      })
      this.ipcRenderer.on('saved-file', (event, path) => {
        if (!path) path = 'No path'
        var cmd = require('node-cmd')
        cmd.run('python ./src/renderer/assets/writeWav.py ./src/renderer/assets/out.json ' + path)
      })
    },
    watch: {
      port: {
        handler (newValue, oldValue) {
          console.log('port was change', this.port)
          var that = this
          var dataStr
          var readPort
          var recI = 0
          var tmpI = 0
          var endNum = 0
          // var bytes = []
          // var send2000Num = 0
          // var dt = Math.floor(that.startbps / that.stopbps)
          // if (dt < 1) {
          //   dt = 1
          // }
          // var recNum = 0
          // var allNum
          // var halfFlag = 0
          // if (that.data.length % 2000 === 0) {
          //   allNum = Math.floor(that.data.length / 2000) * dt
          // } else {
          //   allNum = (Math.floor(that.data.length / 2000) + 1) * dt
          // }
          // const SerialPort = that.remote.getGlobal('SerialPort')
          that.port.on('readable', function (data) {
            readPort = that.port.read()
            dataStr = readPort
            console.log(dataStr)
            console.log(data)
            for (var i = 0; i < dataStr.length; i++) {
              if (that.recFlag) {
                if (!that.endFlag) {
                  that.recData[recI] = i
                }
                tmpI = tmpI + 1
                if (tmpI === 4) {
                  that.recFlag = false
                }
              }
              if (i === 0x55) {
                that.recFlag = true
                endNum = endNum + 1
              } else {
                endNum = 0
              }
              if (endNum === 3 || recI > (that.stopbps / that.startbps) * 2000 / 2) {
                that.endFlag = true
                if (that.sendArrI < that.times + 2) {
                  that.sendArrI = that.sendArrI + 1
                } else {
                  that.saveFlag = 1
                }
              }
              recI = recI + 1
            }
            // if (floatI === 4) {
            //   var mfloat = ((bytes[0] & 0xFF) << 24) |
            //     ((bytes[1] & 0xFF) << 16) |
            //     ((bytes[2] & 0xFF) << 8) |
            //     (bytes[3] & 0xFF)
            //   var h2f = getFloatHex.hex2float(mfloat)
            // }
            // for (var i = 0; i < dataStr.length; i++) {
            //   recNum = recNum + 1
            //   bytes[floatI] = dataStr[i]
            //   floatI = floatI + 1
            //   if (floatI === 4) {
            //     floatI = 0
            //     var mfloat = ((bytes[0] & 0xFF) << 24) |
            //       ((bytes[1] & 0xFF) << 16) |
            //       ((bytes[2] & 0xFF) << 8) |
            //       (bytes[3] & 0xFF)
            //     var h2f = getFloatHex.hex2float(mfloat)
            //     if (halfFlag < (that.startbps / that.stopbps) * 2000 / 2) {
            //       that.recData.push(h2f)
            //     }
            //   }
            //   console.log(dataStr[i])
            // }
            // if (send2000Num + 1 === 2000 * dt) {
            //   that.sendFlag = 1
            //   send2000Num = 0
            //   halfFlag = 0
            // }
            // if (recNum + 1 >= allNum) {
            //   that.saveFlag = that.saveFlag + 1
            // }
            // console.log(dataStr)
            // console.log('data:', dataStrTmp)
            // tmp = port.read().toString()
            // console.log('DataLen:', dataStr.length)
          })
        }
      },
      // saveFlag: {
      //   handler (newValue, oldValue) {
      //     var that = this
      //     console.log(1)
      //     var data = that.recData
      //     that.ipcRenderer.send('writeWav', data)
      //     // var cmd = require('node-cmd')
      //     // cmd.run('touch example.created.file')
      //     // that.remote.getGlobal('data') = that.recData
      //   }
      // },
      saveFlag: {
        handler (newValue, oldValue) {
          var that = this
          console.log('in the save fun')
          var data = that.recData
          that.ipcRenderer.send('writeWav', data)
        }
      },
      sendArrI: {
        handler (newValue, oldValue) {
          var that = this
          this.sendMsgFun((that.data[that.sendArrI].concat(that.data[that.sendArrI + 1])).split(','), 0)
        }
      }
      // ,
      // startbps: {
      //   handler (newValue, oldValue) {
      //     this.dialogFormVisible = true
      //   }
      // }
    },
    methods: {
      upload () {
        console.log('upload')
        console.log(this.ipcRenderer)
        this.ipcRenderer.send('open-file-dialog')
      },
      serialSure () {
        console.log(this.bps)
        console.log(this.inputbits)
        console.log(this.stopbits)
        console.log(this.checkbit)
        console.log('now is in serialSure ()')
        var that = this
        try {
          console.log('now in try new serP')
          that.port.close(
            function (error) {
              // if (error == null) {
              that.remote = require('electron').remote
              const SerialPort = that.remote.getGlobal('SerialPort')
              that.port = new SerialPort(that.value, {
                baudRate: Number(that.bps),
                dataBits: Number(that.inputbits),
                parity: that.checkbit,
                stopBits: Number(that.stopbits),
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
          that.port = new SerialPort(that.value, {
            baudRate: Number(that.bps),
            dataBits: Number(that.inputbits),
            parity: that.checkbit,
            stopBits: Number(that.stopbits),
            hupcl: true,
            lock: false,
            rtscts: false,
            xany: false,
            xoff: false,
            xon: false
          })
          console.log(that.port)
        }
      },
      readFile (filePath) {
        // 创建一个新的xhr对象
        console.log('readFile')
        let xhr = null
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {
          // eslint-disable-next-line
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
        const okStatus = document.location.protocol === 'file' ? 0 : 200
        xhr.open('GET', filePath, false)
        xhr.overrideMimeType('text/html;charset=utf-8')
        xhr.send(null)
        console.log('okStatus:', okStatus)
        return xhr.status === okStatus ? xhr.responseText : null
      },
      sureToTrans () {
        var that = this
        that.dialogFormVisible = false
        that.sendArrI = that.sendArrI + 1
        // console.log('dialog was closed')
        // var j
        // var len = that.data.length
        // console.log('the data is about ', len)
        // // var point = 0
        // for (j = 0; j < len; j++) {
        //   // console.log(that.data[j])
        //   // var tmp = that.data[5].substring(0, 2)
        //   // console.log(tmp)
        //   // console.log(that.data[j])
        //   if (j % 2000 === 0 && j !== 0) {
        //     that.percent = Math.floor(j / len * 100)
        //     j = j - 1000
        //     that.sendFlag = 0
        //   }
        //   if (j % 100 === 0) {
        //     console.log(j)
        //   }
        //   while (!that.sendFlag) {}
        //   // console.log('sendFlag')
        //   var tmp = ''
        //   for (var i = 0; i < 4; i++) {
        //     tmp = String.fromCharCode(getFloatHex.hex2int(that.data[j].substring(i * 2, i * 2 + 2)))
        //     // console.log(tmp)
        //     that.sendMsgFun(tmp)
        //     // that.port.write((tmp), function (err) {
        //     //   if (err) {
        //     //     return console.log('Error on write: ', err.message)
        //     //   }
        //     //   // that.sendOverSignal = true
        //     //   console.log('send 435')
        //     // })
        //     // while (!that.sendOverSignal) {}
        //     // that.sendOverSignal = false
        //   }
        // console.log(tmp)
        // console.log(String.fromCharCode(getFloatHex.hex2int(that.data[5])))
        // console.log(String.fromCharCode(getFloatHex.hex2int(tmp)))
        // break
        // }
        // if (len % 2000 !== 0) {
        //   for (var tmpI = 0; tmpI < 2000 - (len % 2000); tmpI++) {
        //     that.port.write((String.fromCharCode(0)), function (err) {
        //       if (err) {
        //         return console.log('Error on write: ', err.message)
        //       }
        //     })
        //   }
        // }
      },
      sendMsgFun (msg, i) {
        var that = this
        that.port.write((String.fromCharCode(Number(msg[i]))), function (err) {
          if (err) {
            return console.log('Error on write: ', err.message)
          }
          // that.sendOverSignal = true
          // console.log('send 435')
          if (msg.len > i + 1) {
            that.sendMsgFun(msg, i + 1)
          } else {
            that.port.write('UUUU', function (err) {
              if (err) {
                return console.log('Error on write: ', err.message)
              }
              that.endFlag = false
            })
          }
        })
      }
    }
  }
</script>

<style>
body, h1, p {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  user-select: none;
}
#file {
  height: auto;
  margin-top: 55px;
  width: 80px;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  /* background-color: #B3C0D1; */
  /* color: #333;
  height: 200px; */
  text-align: center;
  /* line-height: 60px;
  min-height: 50%; */
}

.el-aside {
  /* background-color: #D3DCE6; */
  /* color: #333; */
  text-align: center;
  padding: 0%;
  margin: 0%;
  /* line-height: 200px;
  padding: 0%;
  margin: 0%;
  height: 400px;
  width: 350px; */
}

.el-main {
  /* background-color: #E9EEF3; */
  /* color: #333; */
  text-align: center;
  /* line-height: 160px;
  height: 400px;
  width: 500px; */
}

/* body > .el-container {
  margin-bottom: 40px;
} */

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.main {
  text-align: center;
  border-style: solid;
  /* border-width: 1px; */
  height: 98%;
  border-radius: 10px;
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.00);
}
.upload {
  text-align: center;
  border-style: dashed;
  border-radius: 10px;
  border-width: 1px;
  border-color: #409eff;
  /* background-color: #fff; */
  margin: 10px 120px 0 120px;
  /* width: 302px; */
  height: 200px;
  cursor: pointer;
  background-color: rgba(64, 158, 255, 0.05);
}

</style>
