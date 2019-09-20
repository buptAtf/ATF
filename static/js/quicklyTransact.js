var app = new Vue({
    el: '#v-quicklyTransact',
    data: {
        transName:'',
        transType:'',
        transCode:'',
        transDesc:'',
        failMsg:" ",
    },
    ready: function() {
        $('.-1 a').css({color: '#ff6c60'});
    },
    methods: {
        insert (){
            var _this = this;
            if(!_this.transName){
                _this.failMsg ="名称不能为空";
                $('#failModal').modal();
                return ;
            }
            /*
            Vac.ajax({
                url: address3 + '/transactController/addSingleUITransactWithoutAut',
                data: { 
                    'nameMedium': _this.transName,
                    'descShort':  _this.transDesc,
                    'code':  _this.transCode,
                },
                success: (data) => {
                    if (data.respCode === '0000') {
                        var ztreeFunc = $.fn.zTree.init($('#functions-ul2'), setting.functions, data.omMethodRespDTOList);
                        ztreeFunc.expandAll(true);
                    } else {
                        // Vac.alert('');
                    }
                }
            })
            */
            sessionStorage.setItem("autId",302)
            sessionStorage.setItem("transactId",554)
            window.location.assign("quicklyElement.html")
        },
        reset (){
            var _this = this;
            _this.transName= '';
            _this.transCode= '';
            _this.transDesc= '';
        },
    },

});