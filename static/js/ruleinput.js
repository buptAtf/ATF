
  var app = new Vue({
    el: '#app',
    data: function () {
      return {
        ruleName: sessionStorage.getItem('ruleName'),
        ruleDesc: sessionStorage.getItem('ruleDesc'),
        uiId: sessionStorage.getItem("uiId"),
        modal: {type:'',elementId:'', index:''},
        elements: {},
        isRestraint: false, //输入框是否有限制
        inputMust: false,   //输入框是否必输
        inputValue: '',     //输入框的标准值
        inputMinLength: '', //输入的最短长度
        inputMaxLength: '', //输入的最大长度
        inputElement:[],    //输入元素的字段
        setOrder: -1,        //输入顺序
        selectValue: [],    //下拉框的列表选择值
        clickButton: [],    //按钮的点击
        selectEleVal: '',   //当前下拉框的选择值
        singleButtonValue: [
            {
            "value":"a", 
            "order":"3",
            "elementId": 69
            }
        ],    //按钮的规则
        elementRepositoryId:sessionStorage.getItem('elementRepositoryId'),//元素库id
        clickActive: -1,    //使css改变的标志位
        clickActives:[],     //点击之后，显示已点击的标志
        
      }
    },
    ready: function() {
      var _this=this;
      this.getAllElements();        //获取所有元素
      

    //   var queryArgs = location.search.slice(1);
    //   var o = {};
    //   var arr = queryArgs.split('&');
    //   for (let item of arr) {
    //     let a = item.split('=');
    //     o[a[0]] = a[1];
    //   }
    //   console.log(o)
      
    //   _this.recordData = o.viewcaseargs ?  o.viewcaseargs : '';console.log( _this.recordData);
    //   _this.ruleName = o.ruleName;
    //   _this.ruleDesc = o.ruleDesc;
    //   console.log(' _this.autid'+ _this.autid+'_this.transid'+_this.transid)
    },
    methods: {
        rulesave() {
            Vac.alert("功能正在努力开发中.......loading");    
        },
       
        getAllElements: function() {    //请求后端，当前的所有元素
            const _this = this;
            let transactId = sessionStorage.getItem("transactId");  
            $.ajax({
                url: address3 + "elementRepository/querySingleUI",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "repositoryId": _this.elementRepositoryId,
                    "uiId": _this.uiId
                }),
                success: function(data) {
                    _this.elements = data.elements;      //获取所有元素
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
                inputEle.order = _this.setOrder;                //设置用户点击的顺序
                inputEle.elementId = _this.modal.elementId;
                _this.inputElement.push(inputEle);    //将设置好的输入框元素推入数组

            } else if(_this.modal.type=='weblist') {
                let selectEle = {};
                selectEle.value = _this.selectEleVal;   //把当前下拉框的值赋值
                selectEle.order = _this.setOrder;      //用户点击的顺序
                selectEle.elementId = _this.modal.elementId;
                _this.selectValue.push(selectEle);
            } else if(_this.modal.type=='webbutton') {
                let buttonEle = {};
                buttonEle.order = _this.setOrder;
                buttonEle.elementId = _this.modal.elementId;
                _this.clickButton.push(buttonEle);
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
            this.clickActive = index;   //选中的第几个元素
            
            Vue.set(this.clickActives, index, true);      //监听数组内的元素

        },
        saveRules: function() {
            var ret = {};
            let transId = parseInt(sessionStorage.getItem("transactId"));     //把功能点id传过去

            ret.inputElement = this.inputElement;
            ret.selectValue = this.selectValue;
            ret.clickButton = this.clickButton;
            ret.singleButtonValue = [];
            ret.uiId = this.uiId;
            ret.repositoryId = this.elementRepositoryId;
            ret.nameMedium = this.ruleName;
            ret.descShort = this.ruleDesc;
            ret.transId = transId;
            
            $.ajax({
                url: address3 + "/regulationController/saveRegulation",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(ret),
                success: function(data) {
                    if(data.respCode==='0000') {
                        
                        $("#successModal").modal();   //显示操作成功的模态框
                        $("#mockedit").trigger("click");
                    } else {
                        $("#failModal").modal();
                    }
                    console.log(data);
                }
            })
            
        }

    },

    // watch: {
    //     clickActive: {
    //         handler: function(val, oldval) {
    //             console.log("原来是" + oldval);
    //             console.log("现在是" + val);
                
    //         },
    //         deep: true
    //     }
    // }

  })



function getCheckBoxValue() {
//获取input类型是checkBox并且 name="box"选中的checkBox的元素
    var data = $('input:checkbox[name="inputSpecialCh"]:checked').map(function () {
    return $(this).val();
    }).get().join(",");

    return data;
}
