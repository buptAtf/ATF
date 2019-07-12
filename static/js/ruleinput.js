
  var app = new Vue({
    el: '#app',
    data: function () {
      return {
        ruleName: '',
        ruleDesc: '',
        modal: {type:'',elementId:'', index:''},
        elements: {},
        isRestraint: false, //输入框是否有限制
        inputMust: false,   //输入框是否必输
        inputValue: '',     //输入框的标准值
        inputMinLength: '', //输入的最短长度
        inputMaxLength: '', //输入的最大长度
        inputElement:[],    //输入元素的字段
        setOrder: 0,        //输入顺序
        selectValue: [],    //下拉框的列表选择值
        selectEleVal: '',   //当前下拉框的选择值
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
       
        getAllElements: function() {    //请求后端，当前的所有元素
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
                    
                }
            })
        },
        setRules: function() {      //设置规则
            const _this = this;
            this.setOrder++;    //记录用户的顺序
            if(_this.modal.type=='webedit') {
                let inputEle = {};
                inputEle.inputMust = _this.inputMust;       //设置是否是必输项
                inputEle.isRestraint = _this.isRestraint;       //是否设置规则
                inputEle.inputValue = _this.inputValue;         //标准输入值
                inputEle.inputMinLength = _this.inputMinLength; //输入最小值
                inputEle.inputMaxLength = _this.inputMaxLength; //输入最大值
                inputEle.inputSpecialCh = getCheckBoxValue();   //复选框的值，不能包含的字符
                inputEle.order = _this.setOrder;
                inputEle.elementId = _this.modal.elementId;
                _this.inputElement.push(inputEle);    //将设置好的输入框元素推入数组

            } else if(_this.modal.type=='weblist') {
                let selectEle = {};
                selectEle.value = _this.selectEleVal;   //把当前下拉框的值赋值
                selectEle.order = _this.setOrder;;  //用户点击的顺序
                selectEle.elementId = _this.modal.elementId;
                _this.selectValue.push(selectEle);
            }
        },
        setCurType: function(type , elementId, index) {    //确定当前点击的模态框的类型、elementId 和传参回来的顺序
            this.modal.type = type;
            this.modal.elementId = elementId;
            this.modal.index = index;

            this.inputValue = '';       //将上次的输入值清除
            this.inputMinLength = '';
            this.inputMaxLength = '';
            this.selectEleVal = '';
        },
        saveRules: function() {
            var ret = {};
            ret.inputElement = this.inputElement;
            ret.selectValue = this.selectValue;

            $.ajax({
                url: address3 + "/regulationController/saveRegulation",
                type: "POST",
                contentType: "json/application",
                data: JSON.stringify(ret),
                success: function(data) {
                    console.log(data);
                }
            })
            console.log(JSON.stringify(ret));
        }

    },

  })



function getCheckBoxValue() {
//获取input类型是checkBox并且 name="box"选中的checkBox的元素
    var data = $('input:checkbox[name="inputSpecialCh"]:checked').map(function () {
    return $(this).val();
    }).get().join(",");

    return data;
}
