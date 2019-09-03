//
//<progressBar :progress-list="progressList"></pagination>
//组件封装中遇到最多的问题就是大小写
//该翻页组件的使用见tesplan
var progressBarTemplate=`
<div id ="container">
    <ul class="nav nav-pills nav-justified pstep pstep-arrow">
        <li v-for="(index, progress) in progressList " :class="progress.status===true?'active':''"  track-by="$index">
        <a :href="#" @click = "bsStep(index)"  >{{ progress.name }}{{ progress.status }} </a>
        </li>
    </ul>
</div>
`
var progressBar = Vue.extend({
   template: progressBarTemplate,
   props: {
        progressList:{
            Type : Array,
        }
    },
   data: function () {
       return {
        progressListTimely: [],
       }

   },
   ready: function() {
   },
   watch: {
    progressList: {
        handler(newValue, oldValue) {
            console.log('progressList'+newValue);
            progressBar.progressListTimely = JSON.parse(JSON.stringify(newValue));
            console.log('progressList'+newValue.length);
            for(let i = 0 ;i < newValue.length ;i++){
                console.log(i+"--"+newValue[i].name+newValue[i].status+newValue[i].href);
            }

　　　　},
       immediate: true, 
　　　　deep: true
　　}
   },
   computed: {
    // progressList1: function () {
    //     if(this.progressList == null) return -1
    //     return this.progressList
    //   }
   },
   methods: {
     bsStep:(i)=>{
        console.log(progressBar.progressListTimely);
        progressBar.progressListTimely[i].status= true;
        console.log(this.progressListTimely);
        alert("123")
     },

   }
});

Vue.component('progressBar', progressBar);
