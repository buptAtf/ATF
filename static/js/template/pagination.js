//
//<pagination :total-count="page.totalCount" :current-page="page.currentPage" :total-page="page.totalPage" :page-size="page.pageSize"  v-on:turn-topage="getTestPlans"></pagination>
//组件封装中遇到最多的问题就是大小写
//该翻页组件的使用见tesplan
var paginationTemplate=`
<div class="row">
<div class="col-lg-12 text-center">
    <div class="pagination-wrap" v-if="page.totalPage!=0">
        <div class="num">
                <select size="1" name="sample_1_length" aria-controls="sample_1" class="form-control" v-model="page.pageSize" @change='turnTopage(1)'>
                    <option value="5" >5条/页</option>
                    <option value="10">10条/页</option>
                    <option value="20" selected>20条/页</option>
                    <option value="50">50条/页</option>
                </select> 
        </div>
        <ul class="pagination">
            <li :class="page.currentPage==1?'disabled':''"><a href="javascript:;" @click="turnTopage(1)">首页</a></li>
            <li :class="page.currentPage==1?'disabled':''"><a @click="turnTopage(page.currentPage-1)" href="javascript:;">上一页</a></li>
            <li>
                <a href="javascript:;" @click="turnTopage(page.currentPage-3)" v-text="page.currentPage-3" v-if="page.currentPage-3>0"></a>
            </li>
            <li>
                <a href="javascript:;" @click="turnTopage(page.currentPage-2)" v-text="page.currentPage-2" v-if="page.currentPage-2>0"></a>
            </li>
            <li>
                <a href="javascript:;" @click="turnTopage(page.currentPage-1)" v-text="page.currentPage-1" v-if="page.currentPage-1>0"></a>
            </li>
            <li class="active"><a href="javascript:;" @click="turnTopage(page.currentPage)" v-text="page.currentPage" ></a></li>
            <li>
                <a href="javascript:;" @click="turnTopage(page.currentPage+1)" v-text="page.currentPage+1" v-if="page.currentPage+1<=page.totalPage"></a>
            </li>
            <li>
                <a href="javascript:;" @click="turnTopage(page.currentPage+2)" v-text="page.currentPage+2" v-if="page.currentPage+2<=page.totalPage"></a>
            </li>
            <li>
                <a href="javascript:;" @click="turnTopage(page.currentPage+3)" v-text="page.currentPage+3" v-if="page.currentPage+3<=page.totalPage"></a>
            </li>
            <li :class="page.currentPage==page.totalPage?'disabled':''"><a href="javascript:;" @click="turnTopage(page.currentPage+1)">下一页</a></li>
            <li :class="page.currentPage==page.totalPage?'disabled':''"><a href="javascript:;" @click="turnTopage(page.totalPage)">尾页</a></li>
        </ul>
        <div class="go">
            <div :class="ispageNumberError?'input-group error':'input-group'">
                <input class="form-control" type="number" v-model="goTopage" min="1"><a href="javascript:;" class="input-group-addon" @click="turnTopage(goTopage)">Go</a>
            </div>
        </div>
        <small class="small nowrap"> 当前第 <span class="text-primary" v-text="page.currentPage" ></span> / <span class="text-primary" v-text="page.totalPage"></span>页，共有 <span class="text-primary" v-text="page.totalCount"></span> 条</small>
    </div>
</div>
</div>
`
var pagination = Vue.extend({
   template: paginationTemplate,
   props: [
        'totalCount',
        'currentPage',
        'totalPage',
        'pageSize' 
   ] ,
   data: function () {
       return {
            page: {
                totalCount: this.totalCount,
                currentPage: this.currentPage,
                totalPage: this.totalPage,
                pageSize: this.pageSize
            }
       }
   },
   ready: function() {
       console.log(""+this.totalCount+this.currentPage+this.totalPage+this.pageSize);
   },
   watch: {
    totalCount: {
        handler(newValue, oldValue) {
            console.log("totalCount"+newValue);
            this.page.totalCount = newValue;
　　　　},
       immediate: true, 
　　　　deep: true
　　},
    currentPage: {
        handler(newValue, oldValue) {
            console.log("currentPage"+newValue);
            this.page.currentPage = newValue;
　　　　},
       immediate: true, 
　　　　deep: true
　　},
    totalPage: {
        handler(newValue, oldValue) {
            console.log('totalPage'+newValue);
            this.page.totalPage = newValue;
　　　　},
       immediate: true,        
　　　　deep: true
　　},
    pageSize: {
        handler(newValue, oldValue) {
            console.log('pageSize'+newValue);
            this.page.pageSize = newValue;
　　　　},
       immediate: true, 
　　　　deep: true
　　},
   },
   computed: {
   },
   methods: {
    turnTopage(currentPageParam){
        var _this=this;
        if(currentPageParam>0 && currentPageParam<=this.page.totalPage){
            _this.page.currentPage = currentPageParam;
            _this.$emit("turn-topage", _this.page);
        }
        else Vac.alert("不在页码范围");
    }
   }
});

Vue.component('pagination', pagination);
