<template>
  <div id="container">
    <div class="main">
      <div id="preview">
        <el-card class="box-card" id="previewboxcard">
          <Luckywheel class="Luckywheel" :aa="setinformation"></Luckywheel>
          <el-tooltip content="点击查看效果"  placement="bottom" effect="light">
          </el-tooltip>
        </el-card>
      </div>
      <div id="activeset">
        <el-card class="box-card" id="activeset_box_card">
          <div slot="header" class="clearfix">
           <div>
             <span>转盘设置</span>
           </div>
          </div>
            <el-form ref="form" :model="form" label-width="80px">           
              <el-form-item label="活动名称:">
                <el-input v-model="form.name" ></el-input>
              </el-form-item>
              <el-form-item label="活动时间:">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="value4"
                type="datetimerange"
                range-separator='-'
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              </el-form-item>
                <el-form-item label="活动规则:">
              <quill-editor 
                    v-model="content" 
                    ref="myQuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>
              </el-form-item>
            </el-form>
        </el-card>
         <el-card class="box-card" id="probability_box_card" >
          <div slot="header" class="clearfix">
            <span>概率设置</span>
            <el-popover
              placement="bottom"
              title=""
              width="200"
              trigger="click"
              content="">
               <div class="popover-content" v-html="html"></div>
              <el-button slot="reference" class="clearfixbtn">概率设置规则</el-button>
            </el-popover>
            
          </div>
            <table >
              <thead>
                <div class="table">
                  <td  class="tabletd">序号</td>
                  <td  class="tabletd">奖品名称</td>
                  <td  class="tabletd">获奖概率</td>
                </div>
              </thead>
              <tbody>
               <div class="tabledata">     
                <tr class="tableinput">1</tr>
                <el-input placeholder="一等奖"  v-model="input1" class="tableinput"></el-input>
                <el-input placeholder="10%"  v-model="input2" class="tableinput"></el-input>
                
               </div>
               <div class="tabledata">     
                <tr class="tableinput">2</tr>
                <el-input placeholder="二等奖"  v-model="input3" class="tableinput"></el-input>
                <el-input placeholder="20%"  v-model="input4" class="tableinput"></el-input>
               
               </div>
               <div class="tabledata">     
                <tr class="tableinput">3</tr>
                <el-input placeholder="未中奖"  v-model="input5" class="tableinput"></el-input>
                <el-input placeholder="70%"  v-model="input6" class="tableinput"></el-input>
               </div>
              </tbody>
            </table>
                 <el-popover
                  placement="top-start"
                  title="操作提示 (2)"
                  width="200"
                  trigger="hover"
                  content="点击此按钮后跳转到成功页面。">
                  <el-button type="primary" slot="reference" v-loading.fullscreen.lock="fullscreenLoading" style="float:right;margin-bottom:10px;" @click="jump()">立即创建</el-button>
                   </el-popover>
                 <el-popover
                  placement="top-start"
                  title="操作提示 (1)"
                  width="200"
                  trigger="hover"
                  content="点击此按钮后请点击刷新按钮。">
                  <el-button slot="reference" type="primary" @click="onSubmit()" >预览效果</el-button>
                 </el-popover>
             </el-card>
                <el-alert
                title="错误提示的文案"
                type="error"
                description="文字说明文字说明文字说明文字说明文字说明文字说明"
                show-icon 
                @close='close'
                v-if="errorcontro=== true">
               </el-alert>
      </div>
    </div>
  </div>
</template>


<script>
import Luckywheel from "./luckywheel.vue";
// import mixin from './js/mixin.js'
import mixin from '../js/mixin.js'
// import store  from '../vuex/store.js'
export default {
  mixins: [mixin],
  data() {
    return {
       form: {
          name: '幸运大转盘',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        value4: [new Date(), new Date()],
        editorOption:{},
        input1:'一等奖',
        input2:'10%',
        input3:'二等奖',
        input4:'20%',
        input5:'未中奖',
        input6:'70%',
        fullscreenLoading: false,
        newtime:[],
        content:'1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。金币抽奖，每10个金豆可兑换一次大转盘机会。2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品。',
        visible: false,
        html:'<p>1.奖品共设三种，一等奖，二等奖，未中奖，名称可以自行调整。</p><p>2.在转盘上显示一等奖一个，二等奖三个，未中奖四个，显示数量和概率无关，概率共100%</p>',
        setinformation:{
          prize:[
            {
              name:'',
              probability:''
            }
          ]
        },
        errorcontro:false,
        test01:11
    };
     
  },
  // store,
  components: {
   Luckywheel
  },
  created(){
        this.handledata();
  },
  methods: {
    onSubmit() {
          
      this.setinformation.prize[0]={name:this.input1,probability:this.input2};
      this.setinformation.prize[1]={name:this.input3,probability:this.input4};
      this.setinformation.prize[2]={name:this.input5,probability:this.input6};
      let probability=[];
      for (let index = 0; index < this.setinformation.prize.length; index++) {
          probability.push(this.toPoint(this.setinformation.prize[index].probability))       
      }     
      if(probability[0]+probability[1]+probability[2]!=1){
        this.errorcontro=true;
        return false;
      }
      else{
        this.handledata();
      }
     
    },
    jump(){
      this.fullscreenLoading = true;
      setTimeout(() => {
          this.fullscreenLoading = false;
           this.$router.push({name:'luckywheel1'});
           document.getElementsByTagName('html')[0].style.fontSize='';
        }, 2000);
    },
    
    close(){
      this.errorcontro=false;
      
    },
    // 处理数据方法
    handledata(){
      let time=this.value4;
      let that=this;
      Object.keys(time).forEach(function(key){
         that.newtime.push (Number(time[key]))
      })
      this.setinformation.activetime=this.newtime;
      this.setinformation.activerule=this.content;
      this.setinformation.formname=this.form.name;    
    },
    //跳转链接方法
    // jump(){
    //   this.$router.push({name:'luckywheel'})
    // },
    //百分数转化成小数函数
    toPoint(percent){
      var str = percent.replace("%", "");
      str = str / 100;
      return str;
    },
    onEditorBlur(quill){
        console.log('editor blur!', this.content)
        },
    onEditorFocus(quill){
        // console.log('editor focus!', quill)
        },
    onEditorChange({ quill, html, text }) 
        {
        console.log('editor change!', this.content)
        this.content = html
        }
  },
}
        </script>

<style scoped>
body html {
  font-size: 15px;
}
#container {
  height: 100%;
}
.Refresh{
  position: relative;
  margin: 10px;
  float: right;
}
.clearfixbtn{
  float: right;
}
#activeset_box_card{
  height: auto;
}
#probability_box_card{
  height: auto;
}

#previewboxcard{
  height: auto;
}
.lucky-wheel{
  font-size: 16px;
}
.table{
   display: flex;
   justify-content: space-around;
   width: 100%;
    padding-bottom: 10px;
}
.tabletd{
  width: 20%;
}
table{
   width: 100%;
    
}
.tabledata{
  display: flex;
  justify-content: space-around;
  width: auto;
  margin-bottom: 10px;
}
.tableinput{
  width: 20%;
}
.main {
  display: flex;
  justify-content: center;
  height: 100%;
}
#preview {
  margin-right: 0.1rem;
}
.box-card {
  height: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 580px;
}
</style>



