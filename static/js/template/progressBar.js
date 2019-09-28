//
//<progressBar :progress-list="progressList"></pagination>
//组件封装中遇到最多的问题就是大小写
//该翻页组件的使用见tesplan
var progressBarTemplate=`
<div id ="container" class ="container" v-if ="flag">
    <div class ="hideprogress " @click="hideprogress" v-show="hideFlag" > 
        <i class ="icon-double-angle-left"></i><span>隐藏导航</span>
    </div>
    <div class ="hideprogress " @click="hideprogress" v-show="!hideFlag"> 
        <i class ="icon-double-angle-right"></i><span>展开导航</span>
    </div>
    <ul class="nav nav-pills nav-justified pstep pstep-arrow" v-show="hideFlag">
        <li v-for="(index, progress) in progressList " :class="progress.status"  track-by="$index">
        <a   @click= "openUrl(progress.href,progress.pre)"   >{{ progress.name }} </a>
        </li>
    </ul>
    <ul  v-show="hideFlag" v-for="(index, progress) in progressList " v-if="progress.status === 'activing' " class="  nav nav-pills nav-justified step step-square">
        <li v-for="(index, progress) in progress.item "   :class="progress.status"  track-by="$index">
        <a  @click= "openUrl(progress.href,progress.pre)"  >{{ progress.name }}</a>
        </li>
    </ul>
</div>
`
var progressBar = Vue.extend({
   template: progressBarTemplate,
   props: {
        progressList:{
            Type : Array,
        },
        flag:{
            Type : Boolean,
        },
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
　　},
    flag:{
        handler(newValue, oldValue) {
            if($(".wrapper").length ==0 ){
                $("#main-content").css("padding-top","68px")
            }
            else{
                $(".wrapper").css("margin-top","62px")
            }
　　　　}
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
    },
    openUrl(href,pre){
        console.log(href+ "___"+pre)
        if(pre == 0){
            window.location.assign(href)
        }
        if(pre == 1){
            let autId = sessionStorage.getItem("autId")
            if(autId == null){
                Vac.alert("请选择或新建被测系统")
            }
            else{
                window.location.assign(href)
            }
        }
        if(pre == 2){
            let autId = sessionStorage.getItem("autId")
            let transactId = sessionStorage.getItem("transactId")
            if(autId == null){
                Vac.alert("请选择或新建被测系统")
            }
            else{
                if(transactId == null){
                    Vac.alert("请选择或新建功能点")
                }
                else{
                    window.location.assign(href)
                }
            }
        }
        if(pre == 3){
            let caselibId = sessionStorage.getItem("caselibId")
            if(caselibId == null){
                Vac.alert("请选择或新建被侧项目")
            }
            else{
                window.location.assign(href)
            }        }
    }
   }
});

Vue.component('progressBar', progressBar);
document.documentElement.scrollTop