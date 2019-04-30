var flowcaseTemplate =
 `<section>
 <h4 style="margin-left:30px; margin-top:150px"><span class="label label-info" >节点</span></h4>
 <div class="col-lg-6 nopadding">
   <h5><span class="col-lg-3 text-center">被测系统</span></h5>
   <div class="col-lg-8">
     <select type="text" class="form-control">
         <option value="" selected>{{ nodeinfo.autName }}</option>
         <option v-for="item in autList" value="item.id" >{{ item.nameMedium }}</option>
     </select>
   </div>
 </div>

 <div class="col-lg-6 nopadding">
   <h5><span class="col-lg-3 text-center">功能点</span></h5>
   <div class="col-lg-8">
     <select type="text" class="form-control ">
        <option value="" selected>{{ nodeinfo.transName }}</option>
        
     </select>
   </div>
 </div>

 <div class="col-lg-6 nopadding">
   <h5><span class="col-lg-3 text-center">动作标识</span></h5>
   <div class="col-lg-8"> 
       <input type="text" class="form-control" readonly="{{editFlag}}" v-model="nodeinfo.actioncode">
   </div>
 </div>

 <div class="col-lg-6 nopadding">
   <h5><span class="col-lg-3 text-center">步骤序号</span></h5>
   <div class="col-lg-8">
       <input type="text" class="form-control" readonly="{{editFlag}}" v-model="nodeinfo.steporder" >
   </div>
 </div>

 <div class="col-lg-6 nopadding">
   <h5><span class="col-lg-3 text-center">关联脚本</span></h5>
   <h4><span class="label label-primary col-lg-3">查看脚本</span></h4>
 </div>

</section>`;

// Vue.component('flowcase', {
//     data: function() {
//         return {
//             count: 9
//         }
//     },
//     props: ['nodeinfo'],
//     template: flowcaseTemplate,

// })



var app = new Vue({
    el: "#v-body",
    data: {
        flowcaselists: ['流程1','流程2','流程3'],
        caseLibId: sessionStorage.getItem("caselibId"),
        executorId: sessionStorage.getItem("userId"),
        currentCase: {},
        selectedCaseId: "",
        autList: {},
        editFlag: true,
        nodeInfoList: {},

    },
    ready: function(){
        var _this = this;
        
        _this.getAllFlowcaseList();
        _this.queryAllAut();

        // var p1 = new Promise((resolve, reject) => {
        //     _this.getAllFlowcaseList();
        //     console.log("id是:" + _this.selectedCaseId);
        //     resolve();
        // });
        // p1.then(()=>{
            
        //     _this.queryThisCase(_this.selectedCaseId);
        //     console.log("p1完成");
        // })


        // var p2 = new Promise((resolve,reject) => {
        //     _this.queryThisCase(_this.selectedCaseId);
        //     resolve();
        // });
        // var p = Promise.all([p1,p2]);
        // p.then(()=>{
        //     console.log("同步成功");
        // })

        $('.3').addClass('open');
        $('.3 .arrow').addClass('open');
        $('.3-ul').css({display: 'block'});
        $('.3-3').css({color: '#ff6c60'});
    },
    methods:{
        getAllFlowcaseList: function(){
            var _this = this;
            $.ajax({
                url: address3 + "dataCenter/queryFlowTestcase",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    "executorId": _this.executorId,
                    "caseLibId": _this.caseLibId,
                }),
                success: function(data){
                    _this.flowcaselists = data.flowTestcaseInfos;
                    _this.selectedCaseId = _this.flowcaselists[0].id;
                    console.log(data);   
                    _this.queryThisCase(_this.selectedCaseId);
                }
            })
            
        },
        queryThisCase: function(currentId){
            var _this = this;
            _this.selectedCaseId = currentId;
            $.ajax({
                url: address3 + "dataCenter/queryFlowTestcaseInfo",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    "id": currentId,
                }),
                success: function(data){
                    if(data.respCode=="0000"){
                        _this.currentCase = data;
                        _this.nodeInfoList = data.nodeInfoList;
                        console.log(_this.nodeInfoList);
                    }
                }
            });
        },
        queryAllAut: function(){
            var _this = this;
            $.ajax({
                url: address3 + "aut/queryListAut",
                type: "post",
                contentType: "application/json",
                success: function(data){
                    _this.autList = data.autRespDTOList;
                    
                }
            })
        },
        queryTransactsByAutId: function(){
            var _this = this;
            $.ajax({
                url: address3 + "aut/queryListAut",
                type: "post",
                async: false,
                contentType: "application/json",
                success: function(data){
                    _this.autList = data.autRespDTOList;
                    
                }
            })
        },


    },
    components:{
        "flowcase":{
            template: flowcaseTemplate,
            props: ["nodeinfo", "aut", "editFlag"],

        }
    }

})

var flowcaseFun = function(){

};



