
var app = new Vue({
    el: "#v-body",
    data: {
        flowcaselists: ['流程1','流程2','流程3'],
        caseLibId: sessionStorage.getItem("caselibId"),
        executorId: sessionStorage.getItem("userId"),
        currentCase: {},
        selectedCaseId: "",
    },
    ready: function(){

        this.getAllFlowcaseList();

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
                        console.log(data);
                    }
                }
            });
        }

    }

})