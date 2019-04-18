
var app = new Vue({
    el: "#v-body",
    data: {
        flowcaselist: ['流程1','流程2','流程3'],
    },
    ready: function(){

        this.getFlowcaseList();

        $('.3').addClass('open');
        $('.3 .arrow').addClass('open');
        $('.3-ul').css({display: 'block'});
        $('.3-3').css({color: '#ff6c60'});
    },
    methods:{
        getFlowcaseList: function(){
            
        }

    }

})