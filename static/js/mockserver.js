var app = new Vue({
    el: "#v-mockserver",
    data: {
        allExpecation: [],
        curExpecation: {},
        curExpecationRet: {},
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
                url: address3 + "mockServer/getExpectation",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({

                }),
                success:function(data){
                    _this.curExpecation = data[0];      //当前期望设置为第一条
                    _this.allExpecation = data;
                    data.forEach(element => {           //遍历所有数据，将所有对象放进期望列表数组中
                        // let tempItem = {};
                        // tempItem.id = element.httpRequest.id;
                        // tempitem.body = element.httpRequest.body;
                        // _this.allExpecationRequest.push(tempItem);
                        
                    });

                    _this.curExpecationRet = _this.curExpecation.httpResponse;//当前期望的期望返回的数据
                    _this.curExpecationRet = JSON.stringify(_this.curExpecationRet, null, 2);   //将返回的数据解析为JSON数据
                    console.log(_this.curExpecationRet);
                }

            })
        },
        queryExpecation: function(currentId){   //根据id查询当前期望
            var _this = this;
            $.ajax({
                url: address3 + "mockServer/getExpectation",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    "id": currentId
                }),
                success:function(data){
                    console.log(data);
                    _this.curExpecation = data;
                }
            }) 
            console.log(currentId);
        },


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