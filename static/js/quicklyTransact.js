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
        var _this =this;
        $('.-1 a').css({color: '#ff6c60'});
        

        // $.ajax({
        //     url: address3 + '/transactController/addSingleUITransactWithoutAut',
        //     contentType: 'application/json',
        //     data: JSON.stringify({ 'nameMedium': "dgghb",
        //     'descShort':  "dgghb",
        //     'code':  "dgghb", }),
        //     type: "POST",
        //     success: function (data) {
        //         if (data.respCode == "0000") {
        //         }
        //         else {
        //         }
        //     }
        // });
    },
    methods: {
        insert (){
            var _this = this;
            if(!_this.transName){
                _this.failMsg ="名称不能为空";
                $('#failModal').modal();
                return ;
            }
            new Promise(function(resolved){
                $.ajax({
                    url: address3 + '/transactController/addSingleUITransactWithoutAut',
                    contentType: 'application/json',
                    data: JSON.stringify({ 'nameMedium': _this.transName,
                    'descShort':  _this.transDesc,
                    'code':  _this.transCode, 
                }),
                    type: "POST",
                    success: function (data) {
                        if (data.respCode == "0000") {
                            sessionStorage.setItem("autId",data.autId)
                            sessionStorage.setItem("transactId",data.transId)
                            sessionStorage.setItem("sceneId",data.sceneId)
                            sessionStorage.setItem("testPlanId",data.testPlanId)
                        }
                        else {
                            Vac.alert("fail")
                        }
                        resolved()
                    }
                });
            }).then(function(){
                window.location.assign("quicklyElement.html")
            })
            /*
            $.ajax({
                url: address3 + '/transactController/addSingleUITransactWithoutAut',
                contentType: 'application/json',
                data: JSON.stringify({ 'nameMedium': "dgghb",
                'descShort':  "dgghb",
                'code':  "dgghb", 
            }),
                type: "POST",
                success: function (data) {
                    if (data.respCode == "0000") {
                        sessionStorage.setItem("autId",data.autId)
                        sessionStorage.setItem("transactId",data.transId)
                        sessionStorage.setItem("sceneId",data.sceneId)
                        sessionStorage.setItem("testPlanId",data.testPlanId)
                        window.location.assign("quicklyElement.html")
                    }
                    else {
                        Vac.alert("fail")
                    }
                    
                }
            });*/
/*
            $.ajax({
                url: address3 + '/transactController/addSingleUITransactWithoutAut',
                contentType: 'application/json',
                data: JSON.stringify({
                    'nameMedium': _this.transName,
                    'descShort':  _this.transDesc,
                    'code':  _this.transCode,
                }),
                type: 'POST',
                success: function(data) {
                    if (data.respCode=='0000') {
                        self.newTransactId = data.transactId;
                        sessionStorage.setItem("transactId",data.transactId)
                        $('#successAndGoModal').modal();
                        queryTransact();
                    } else {
                        Vac.alert(data.respMsg)
                    }
                },
                error: function() {
                    Vac.alert(data.respMsg)
                }
            });*/

            // sessionStorage.setItem("autId",302)
            // sessionStorage.setItem("transactId",554)
            // sessionStorage.setItem("sceneId",291)
        },
        reset (){
            var _this = this;
            _this.transName= '';
            _this.transCode= '';
            _this.transDesc= '';
        },
    },

});