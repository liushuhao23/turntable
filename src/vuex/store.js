import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


let mutations={
    handledata(){
        let time=this.value4;
        let that=this;
        Object.keys(time).forEach(function(key){
           that.newtime.push (Number(time[key]))
        })
        this.setinformation.activetime=this.newtime;
        this.setinformation.activerule=this.content;
        this.setinformation.formname=this.form.name;
        let one={};
        let two={};
        let three={};
        one[this.input1]=this.input2;
        two[this.input3]=this.input4;
        three[this.input5]=this.input6; 
        this.setinformation.prize[0]=one;
        this.setinformation.prize[1]=two;
        this.setinformation.prize[2]=three;
      },
    
}

const store = new Vuex.Store({
    mutations
});

export default store;
