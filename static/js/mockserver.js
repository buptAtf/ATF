var app = new Vue({
    el: "#v-mockserver",
    data: {
        
        creater: "刘福林",
        updateTime: "2019-4-18 20:49:00",
        allExpecation: [],
        curExpecation: {},
        curExpecationRet: {},
    },
    ready: function(){

        this.getAllExpectation();
        $('.2').addClass('open');
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({display: 'block'});
        $('.2-2').css({color: '#ff6c60'});
    },
    methods:{
        getAllExpectation: function(){
            var _this = this;
            $.ajax({
                url: address3 + "mockServer/getExpectation",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({

                }),
                success:function(data){
                    _this.curExpecation = data[0];
                    data.forEach(element => {
                        let tempItem = {};    
                        tempItem.id = element.httpRequest.id;
                        // tempitem.body = element.httpRequest.body;
                        _this.allExpecation.push(tempItem);
                        
                    });
                    
                    _this.curExpecationRet = _this.curExpecation.httpResponse;                    
                    _this.curExpecationRet = JSON.stringify(_this.curExpecationRet, null, 2);
                    console.log(_this.curExpecationRet);
                    // _this.curExpecationRet = syntaxHighlight(_this.curExpecationRet);
                    // console.log(_this.curExpecationRet);
                }

            })
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