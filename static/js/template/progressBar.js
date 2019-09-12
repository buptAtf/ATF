//
//<progressBar :progress-list="progressList"></pagination>
//组件封装中遇到最多的问题就是大小写
//该翻页组件的使用见tesplan
var progressBarTemplate=`
<div id ="container" class ="container">
    <div class ="hideprogress " @click="hideprogress" v-show="hideFlag" > 
        <i class ="icon-double-angle-left"></i><span>隐藏导航</span>
    </div>
    <div class ="hideprogress " @click="hideprogress" v-show="!hideFlag"> 
        <i class ="icon-double-angle-right"></i><span>展开导航</span>
    </div>
    <ul class="nav nav-pills nav-justified pstep pstep-arrow" v-show="hideFlag">
        <li v-for="(index, progress) in progressList " :class="progress.status"  track-by="$index">
        <a :href="progress.href"  >{{ progress.name }} </a>
        </li>
    </ul>
    <ul  v-show="hideFlag" v-for="(index, progress) in progressList " v-if="progress.status === 'activing' " class="  nav nav-pills nav-justified step step-square">
        <li v-for="(index, progress) in progress.item "   :class="progress.status"   class="active"  track-by="$index">
        <a :href="progress.href"  >{{ progress.name }} </a>
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
        hideFlag:true,
        progressListTimely: [],
       }

   },
   ready: function() {
    var _this = this
    _this.hideFlag = localStorage.getItem("hideprogress") == "true"?true:false;
    if(_this.hideFlag){
        if($(".wrapper").length ==0 ){
            $("#main-content").css("padding-top","151px")
        }
        else{
            $(".wrapper").css("margin-top","145px")
        }
    }
    else{
        if($(".wrapper").length ==0 ){
            $("#main-content").css("padding-top","92px")
        }
        else{
            $(".wrapper").css("margin-top","88px")
        }
    }
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
   created () {
        window.addEventListener('scroll', this.handleScroll, true)
    },
   computed: {
    // progressList1: function () {
    //     if(this.progressList == null) return -1
    //     return this.progressList
    //   }
   },
   methods: {
    //监听滚动条
    handleScroll: function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        var top_div = document.getElementById( "progressbar" );
        if( t >= 150 ) {
            top_div.style.position = "fixed";
        } 
        else {
            top_div.style.position = "absolute";
        }
    },
    hideprogress: function() {
        var _this = this; 
        console.log(_this.hideFlag)
        _this.hideFlag = !_this.hideFlag;
        localStorage.setItem("hideprogress", _this.hideFlag);
        if(_this.hideFlag){
            if($(".wrapper").length ==0 ){
                $("#main-content").css("padding-top","150px")
            }
            else{
                $(".wrapper").css("margin-top","146px")
            }
        }
        else{
            if($(".wrapper").length ==0 ){
                $("#main-content").css("padding-top","92px")
            }
            else{
                $(".wrapper").css("margin-top","88px")
            }
        }
    }
   }
});

Vue.component('progressBar', progressBar);
document.documentElement.scrollTop