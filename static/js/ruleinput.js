
  var app = new Vue({
    el: '#app',
    data: function () {
      return {
        ruleName: '',
        ruleDesc: '',
        elements: {},
      }
    },
    ready: function() {
      var _this=this;
      this.getAllElements();

      var queryArgs = location.search.slice(1);
      var o = {};
      var arr = queryArgs.split('&');
      for (let item of arr) {
        let a = item.split('=');
        o[a[0]] = a[1];
      }
      console.log(o)
      
      _this.recordData = o.viewcaseargs ?  o.viewcaseargs : '';console.log( _this.recordData);
      _this.ruleName = o.ruleName;
      _this.ruleDesc = o.ruleDesc;
      console.log(' _this.autid'+ _this.autid+'_this.transid'+_this.transid)
    },
    methods: {
        rulesave() {
            Vac.alert("功能正在努力开发中.......loading");    
        },
       

        getAllElements: function() {
            const _this = this;
            let transactId = sessionStorage.getItem("transactId");
            
            $.ajax({
                url: address3 + "elementRepository/queryAllElementsForATransact",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    transactId: transactId
                }),
                success: function(data) {
                    _this.elements = data.uis[0].elements;
                    console.log(_this.elements);
                }
            })

        },
        makeRules: function(kind) {
            console.log(kind)

        }
    },

  })
