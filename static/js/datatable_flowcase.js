
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
        nodeData: {},

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

                        _this.nodeData = data.nodeInfoList[0].nodeData;

                        Vue.nextTick(function () {
                            $('.selectpicker').selectpicker('refresh');
                          });
                        
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
                        
                    }

                }
            })
        },
        saveFlowTestcaseInfo: function(){
            var _this = this;

            delete _this.currentCase["respCode"];
            delete _this.currentCase["respMsg"];
            delete _this.currentCase["caseLibId"];
            delete _this.currentCase["caseCompositeType"];
            delete _this.currentCase["missionName"];
            
            for(let i=0; i<_this.nodeInfoList.length; i++){
                delete _this.nodeInfoList[i]["caseId"];
                delete _this.nodeInfoList[i]["caseCompositeType"];
                delete _this.nodeInfoList[i]["autName"];
                delete _this.nodeInfoList[i]["transName"];
                delete _this.nodeInfoList[i]["scriptTemplateName"];
            }

            $.ajax({
                url: address3 + "/dataCenter/saveFlowTestcaseInfo",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(
                    _this.currentCase
                ),
                success: function(data){

                    console.log(data);
                },
            })
        },


    },

})



