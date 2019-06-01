var app = new Vue({
    el: "#v-mockserver",
    data: {
        allExpecation: [],      //所有的期望
        curExpecation: {httpRequest:""},      //当前的期望
        curExpecationRet: {},   //当前期望的返回
        editCurData: {id:"",expectationName:"",creator:"",httpRequest:"",httpResponse:"",httpForwardEntity:"",type:""},
        runData:{method:"", path:"", body:"", type:"", headers:"", cookies:"", keepAlive:"", secure:"", pathType:true, methodType: true},
        selectedExpId: "",      //选中的期望的id
        requestParams: [{key:"",value:""}],       //规则的请求的参数
        responseParams: [{key:"",value:""}],    //规则的返回参数
        runParams: [{key:"",value:""}],     //运行的参数
        reqHeaders: [{key:"",value:""}],    //请求头部的值
        respHeaders: [{key:"",value:""}],   //返回头部的值
        runHeaders: [{key:"",value:""}],    //运行的头部
        reqCookies: [{key:"",value:""}],    //请求cookies
        respCookies: [{key:"",value:""}],   //返回cookise的值
        runCookies: [{key:"",value:""}],    //运行的cookies
        keepalive: "",               //请求报文中的长连接 
        newCreator: "",            //创建人
        newExpectationName: "",    //期望名称
        newAction: "response",             //动作
        editReqFlag: "1",              //请求参数设置显示的标志位
        editRespFlag: "1",
        runFlag: "1",
        respforwardFlag: "response",    //返回的数据是response还是forward
    },
    ready: function(){

        this.getAllExpectation();

        $('.2').addClass('open');       //侧边展开，高亮显示当前页面Mock API
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({display: 'block'});
        $('.2-2').css({color: '#ff6c60'});
    },
    methods:{
        formatDate(date){       //格式化时间戳为标准日期
            if(date){
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '/';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                // console.log("时间是："+ Y+M+D+h+m+s);
                return Y+M+D+h+m+s;  
            }else{
                return '';
            }     
        },
        getAllExpectation: function(){      //得到所有的期望列表
            var _this = this;
            $.ajax({
                url: address3 + "/mockServer/getAllExpectation",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({

                }),
                success:function(data){
                    _this.curExpecation = data[0];                  //当前期望设置为第一条
                    _this.selectedExpId = _this.curExpecation.id;   //默认选中第一条期望
                    _this.allExpecation = data;                     //得到所有的期望
                    _this.queryExpecation(_this.selectedExpId);     //查询第一条期望的详细信息

                }

            })
        },
        queryExpecation: function(currentId){   //根据id查询当前期望
            var _this = this;
            _this.selectedExpId = currentId;
            $.ajax({
                url: address3 + "/mockServer/getExpectationById",
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: {
                    "id": currentId
                },
                success:function(data){
                    _this.curExpecation = data;                  //得到当前的数据，用于展示
                    _this.respforwardFlag = data.type;           //判断当前的一条数据是response还是forward
                    
                    _this.editCurData.id = data.id;
                    _this.editCurData.expectationName = data.expectationName;
                    _this.editCurData.creator = data.creator;
                    _this.editCurData.httpRequest = data.httpRequest;
                    _this.editCurData.httpResponse = data.httpResponse;
                    _this.editCurData.httpForwardEntity = data.httpForwardEntity;
                    _this.editCurData.type = data.type;
                    if(_this.respforwardFlag==='response'){
                        _this.curExpecationRet = data.httpResponse; //当前期望的期望返回的数据
                    } else if(_this.respforwardFlag==='forward'){
                        _this.curExpecationRet = data.httpForwardEntity; //当前期望的期望返回的数据
                    }
                    _this.curExpecationRet = JSON.stringify(_this.curExpecationRet, null, 2);   //将返回的数据解析为JSON数据
                    _this.processDisplayData();    //处理返回的数据，用于显示编辑页面中的headers等类型的数据
                    
                    if(data.runRequestId!==null){
                        _this.queryRunInfo(data.runRequestId);
                    }
                }
            }) 
            
        },
        queryRunInfo: function(id) {      //查询上次用户退出时，运行的信息
            $.ajax({
                url: address3 + "/mockServer/getRunRequest",
                type: "post",
                contentType: "application/json",
                data: {
                    "id": id
                },
                success: function(data) {

                    console.log(data);
                }
            })
        },
        addRequestList: function(){
            this.requestParams.push({key:"",value:""});
        },
        delRequestList: function(index){
            if(this.requestParams.length !== 1){
                this.requestParams.splice(index,1);
            }
        },
        addResponseList: function(){
            this.responseParams.push({key:"",value:""});
        },
        delResponseList: function(index){
            if(this.responseParams.length !== 1){
                this.responseParams.splice(index,1);
            }
        },
        addRunParams: function() {      //增加运行参数
            this.runParams.push({key:"",value:""});
        },
        delRunParams: function(index) { //删除运行参数
            if(this.runParams.length !== 1){
                this.runParams.splice(index,1);
            }
        },
        addRunHeaders: function() {
            this.runHeaders.push({key:"",value:""});
        },
        delRunHeaders: function(index) {
            if(this.runHeaders.length !== 1){
                this.runHeaders.splice(index,1);
            }
        },
        addRunCookies: function() {
            this.runCookies.push({key:"",value:""});
        },
        delRunCookies: function() {
            if(this.runCookies.length !== 1){
                this.runCookies.splice(index,1);
            }
        },
        addReqHeaders: function(){
            this.reqHeaders.push({key:"",value:""});
        },
        delReqHeaders: function(index){
            if(this.reqHeaders.length !== 1){
                this.reqHeaders.splice(index,1);
            }
        },
        addReqCookies: function(){
            this.reqCookies.push({key:"",value:""});
        },
        delReqCookies: function(index){
            if(this.reqCookies.length !== 1){
                this.reqCookies.splice(index,1);
            }
        },
        addRespHeaders: function(){
            this.respHeaders.push({key:"",value:""});
        },
        delRespHeaders: function(index){
            if(this.respHeaders.length !== 1){
                this.respHeaders.splice(index,1);
            }
        },
        addRespCookies: function(){
            this.respCookies.push({key:"",value:""});
        },
        delRespCookies: function(index){
            if(this.respCookies.length !== 1){
                this.respCookies.splice(index,1);
            }
        },
        addBaseInfo: function(){    //添加基础信息
            var _this = this;
            $.ajax({
                url: address3 + "/mockServer/addBaseInfo",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    "creator": _this.newCreator,
                    "expectationName": _this.newExpectationName,
                    "type": _this.newAction
                }),
                success: function(data){
                    if(data.respCode==='0000') {
                        _this.getAllExpectation();      //重新获取一下所有期望
                        $("#successModal").modal();   //显示操作成功的模态框
                        $("#mockedit").trigger("click");
                    } else {
                        $("#failModal").modal();
                    }

                },
            });
        },
        delCurExpectation: function(){  //删除当前期望
            var _this = this;
            $.ajax({
                url: address3 + "/mockServer/deleteExpectation",
                type: "post",
                contentType: "application/x-www-form-urlencoded",
                data: {
                    "id": _this.selectedExpId
                },
                success: function(data){
                    if(data.respCode==='0000') {
                        _this.getAllExpectation();
                        $("#successModal").modal();   //显示操作成功的模态框
                    } else {
                        $("#failModal").modal();
                    }
                    
                    console.log(data);
                },
            })

        },
        updateCurExpectation() {        //更新当前期望信息
            var _this = this;
            
            var processPostData = function(source){     //处理要发送的数据，把页面中用户输入好的数据转变为json字符串形式
                let ret = {};
                for(let i=0; source[i]!=undefined && source[i].key!=""; i++){
                    ret[source[i].key] = source[i].value;
                }
                return JSON.stringify(ret);     //返回的数据是一个字符串
            }

            if(_this.editCurData.httpRequest!==null){
                _this.editCurData.httpRequest.headers = processPostData(_this.reqHeaders);      //处理请求的headers
                _this.editCurData.httpRequest.cookies = processPostData(_this.reqCookies);      //处理请求的cookies
                _this.editCurData.httpRequest.queryParameters = processPostData(_this.requestParams);   //处理请求的参数
            }

            
            if(_this.editCurData.httpResponse!==null){      //如果返回不是null的话，再进行操作
                _this.editCurData.httpResponse.headers = processPostData(_this.respHeaders);
                _this.editCurData.httpResponse.cookies = processPostData(_this.respCookies);
            }

            $.ajax({
                url: address3 + "mockServer/updateExpectation",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(
                    _this.editCurData
                ),
                success: function(data){
                    if(data.respCode==='0000') {
                        _this.getAllExpectation();
                        $("#successModal").modal();   //显示操作成功的模态框
                    } else {
                        $("#failModal").modal();
                    }
                }
            })
        },
        processDisplayData(){   //处理数据后，用于页面的显示
            var _this = this;
            //1.把后端接口返回的字符串值，转化为一个对象
            //2.把用于v-model监听的全局数组变量清空，在这里进行结构，把json对象解码到定义的变量中
            //3.很开心，把一堆shit业务逻辑写成了一个小shit function
            var processStep = function(sourceData,globalData){
                let i = 0;
                if(sourceData!==""){
                    var dataObj = JSON.parse(sourceData);   //把传进来的字符串变量，解析成json对象
                } else {
                    var dataObj = null;
                }
                for(let key in dataObj){        //读取出json对象中的每一个属性，并将每一个属性
                    globalData[i].key = key;
                    globalData[i].value = dataObj[key];
                    globalData.push({key:"",value:""});
                    i++;
                }
            }

            if(_this.editCurData.httpRequest!==null && _this.editCurData.httpRequest.type==='JSON'){    //如果请求的数据body是json格式的话，在前端进行json格式展示
                let body = JSON.parse(_this.editCurData.httpRequest.body);
                _this.editCurData.httpRequest.body = JSON.stringify(body, null, 2);   //将返回的数据解析为JSON数据
            }
            if(_this.editCurData.httpResponse!==null && _this.editCurData.httpResponse.type==='JSON'){    //如果返回的数据body格式是json的话，前台展示为json格式
                let body = JSON.parse(_this.editCurData.httpResponse.body);
                _this.editCurData.httpResponse.body = JSON.stringify(body, null, 2);   //将返回的数据解析为JSON数据
            }
            
            _this.requestParams = [{key:"",value:""}];   //先清除请求数据的参数，再重新赋值，不然会累积之前冗余项
            _this.reqHeaders = [{key:"",value:""}];   //先清除请求数据的headers，再重新赋值，不然会累积之前冗余项
            _this.reqCookies = [{key:"",value:""}];   //先清除请求数据的cookies，再重新赋值，不然会累积之前冗余项
            _this.respHeaders = [{key:"",value:""}];
            _this.respCookies = [{key:"",value:""}];

            if(_this.editCurData.httpRequest!==null){
                processStep(_this.editCurData.httpRequest.queryParameters, _this.requestParams);        //处理用于发送请求的“请求的参数”和显示的请求的参数
                processStep(_this.editCurData.httpRequest.headers, _this.reqHeaders);
                processStep(_this.editCurData.httpRequest.cookies, _this.reqCookies);
            }
            if(_this.editCurData.httpResponse!==null){  //当返回的数据不是null的时候，再进行数据操作
                processStep(_this.editCurData.httpResponse.headers, _this.respHeaders);
                processStep(_this.editCurData.httpResponse.cookies, _this.respCookies);
            }
        },

        runCurExpectation: function() {
            const _this = this;

            var processPostData = function(source){     //处理要发送的数据，把页面中用户输入好的数据转变为json字符串形式
                let ret = {};
                for(let i=0; source[i]!=undefined && source[i].key!=""; i++){
                    ret[source[i].key] = source[i].value;
                }
                return JSON.stringify(ret);     //返回的数据是一个字符串
            }
            _this.runData.headers = processPostData(_this.runHeaders);      //处理请求的headers
            _this.runData.cookies = processPostData(_this.runCookies);      //处理请求的cookies
            _this.runData.queryParameters = processPostData(_this.runParams);   //处理请求的参数
            
            $.ajax({
                url: address3 + "/mockServer/runExpectation",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(_this.runData),
                success: function(data) {

                    console.log(data)
                    if(data.respCode==='0000'){
                        //运行结束，保存当前数据
                        $.ajax({
                            url: address3+ "/mockServer/saveRunRequest",
                            type: "post",
                            contentType: "application/json",
                            data: JSON.stringify(_this.runData),
                            success: function(data) {
                                console.log(data);
                            },

                        })
                    }
                    
                }
            })
        },

        changeReqEditFlag: function(flag){  //改变点击按钮的标志位，用于显示请求数据中不同的项目
            
            this.editReqFlag = flag;
        },
        changeRespEditFlag: function(flag){ //改变点击按钮的标志位，用于显示返回数据中不同的项目
            
            this.editRespFlag = flag;
        },
        changeRunFlag: function(flag) {
            this.runFlag = flag;
        }

    }
})

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}




// //请求数据的body的格式
// $("input[name=reqBodyFormat]").click(function(){
//     var type = $(this).val();
//     console.log(type);
// })


// //返回数据body的格式
// $("input[name=respBodyFormat]").click(function(){
//     var type = $(this).val();
//     console.log(type);
// })