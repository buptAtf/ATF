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
        flowcaseList: [],      //流程用例列表信息
        caseLibId: sessionStorage.getItem("caselibId"),
        executorId: sessionStorage.getItem("userId"),
        currentCase: {},        //当前展示的用例
        selectedCaseId: "",     //被选中的用例的id
        autList: {},            //被测系统列表
        autId: "",
        editFlag: true,         //是否只读的标志，来进行是否编辑
        nodeInfoList: {},       //当前用例的所有节点信息
        scriptList: {},         //查看脚本的脚本列表
        
        

    },
    ready: function(){
        var _this = this;
        
        _this.queryAllAut();
        _this.getAllFlowcaseList();
        
        

        // var p1 = new Promise((resolve,reject) =>{
        //     _this.queryAllAut();
        //     resolve("查询系统OK");
        // }).then((v)=>{
        //     console.log(v);
        // });

        // var p2 = new Promise((resolve, reject) =>{
        //     _this.getAllFlowcaseList();
        //     resolve("查询流程用例完成");
        // }).then((v) =>{
        //     console.log(v);
        // });

        // p = Promise.all([p1, p2]);
        // p.then( () =>{
        //     _this.flagShow = true;
            
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
                    _this.flowcaseList = data.flowTestcaseInfos;
                    _this.selectedCaseId = _this.flowcaseList[0].id;
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

                        Vue.nextTick(function () {
                            $('.selectpicker').selectpicker('refresh');
                          });
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
                async: true,
                success: function(data){
                    _this.autList = data.autRespDTOList;
                    _this.queryTransactsByAutId();
                }
            })
        },
        queryTransactsByAutId: function(){
            var _this = this;
            $.ajax({
                url: address3 + "transactController/queryTransactsByAutId",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({ 'id': _this.autId }),
                success: function(data){
                    
                    console.log(data);
                }
            })
        },
        viewScript: function(id){
            var _this = this;
            console.log(id);
            $.ajax({
                url: address3 + "dataCenter/getTestcaseScript",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    testcaseId: id + "",
                    caseCompositeType: 3,
                }),
                success: function(data){
                    if(data.respCode==="0000"){
                        _this.scriptList = data.scriptList;
                        console.log(data);
                    }

                    

                }
            })
        },
        generateTable: function(){
            var tableContainer = document.getElementById("handsontable");
            var handsontable = null;
            var dataSource = [
                ["", "Ford", "Tesla", "Toyota", "Honda"],
                ["2017", 10, 11, 12, 13],
                ["2018", 20, 11, 14, 13],
                ["2019", 30, 15, 12, 13]
            ];

            if(handsontable===null){
                handsontable = new Handsontable(tableContainer,{
                    data: dataSource,
                    
                    rowHeaders: true,
                    colHeaders: true,
                    filters: true,
                    dropdownMenu: true,
                })

            }
        }

    },
    mounted: function(){

        Vue.nextTick(function(){
            console.log('mounted');  
        })
        // this.generateTable();
        // console.log("表格出来了没有？")
        
    },
 

})

var flowcaseFun = function(){

};



