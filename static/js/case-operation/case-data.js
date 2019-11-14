var caseData = Vue.extend({
  template: '#case-data',
  props: {
    'autid': {
    }
  },
  data: function () {
    var _this = this;
    return {
      conditions: [],
      checkall: false,
      dataList: []
    }
  },
  watch: {
    conditions: function(newVla, oldVal) {
      if(newVla.length === 4) {
        this.checkall = true
        return
      }
      this.checkall = false;
    },
    autid: {
      handler(newValue, oldValue) {
        this.OverallData();
      },
      deep: true
    },
  },
  ready: function() {
    $('#alter-form').validate({
      submitHandler: function(form) {
        console.log(333)
        form.submit();
      }
    });
    
  },
  methods: {
    toggleCheckAll: function() {
      if (this.checkall) {
        this.conditions = ['input-data', 'flow-data', 'scene-data', 'global-data']
      } else {
        this.conditions = []
      }
    },
    OverallData:function(){
      var _this = this;
      if(!_this.autid)
        return
      $.ajax({
        url: address3 + 'dataPool/batchQueryDataPool',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          poolName: "被测系统数据池",
          poolObjId: _this.autid,
        }),
        success: function (res) {
          _this.dataList=res.dataPoolList;
          if(_this.dataList){
            _this.dataList.forEach(function(item){
              $("#flowData").append("<tr> " +
                  "<td >" + item.dataName + "</td>" +
                  "<td >" + item.dataValue + "</td>" +
                  "<td >"+ item.poolName +"</td>" +
                  "<td> 无 </td>" +
                  "<td >无</td>" +
                  "<td >无</td>" +
                  "<td >无</td>" +
                  "</tr>");
            });
          }
        }
      });
    },
    changeCondition: function() {
      if(this.conditions.length === 4) {
        this.checkall = true
        return
      }
      this.checkall = false;
    },
    alterData: function(){
      $('#alterModal').modal('show')
    }
  }
})

Vue.component('case-data', caseData)