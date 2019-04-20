
var app = new Vue({
    el: "#v-body",
    data: {
        flowcaselists: ['流程1','流程2','流程3'],
        caseLibId: sessionStorage.getItem("caselibId"),
        executorId: sessionStorage.getItem("userId"),

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
                    console.log(data);
                }

            })
            
        }

    }

})