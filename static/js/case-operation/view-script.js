var viewScript = Vue.extend({
	template: '#view-script-template',
	props: ['testcaseid'],
	data: function () {
		return {
      tableData: []
		}
	},
	ready: function() {
    this.query();
    console.log('view script ready123')
	},
	watch: {
    queryData: function() {console.log('watch');
      this.query();
    }
	},
	computed: {
    queryData: function() {console.log('computed')
      return this.testcaseid
    }
	},
	methods: {
    query: function() {
      console.log("logloglolgog0"+this.queryData+"111"+this.testcaseid)
      if(!this.queryData) {
        return;
      }
      var _this = this;
      $.ajax({
        type: 'post',
        contentType:"application/json",
        url: address3 + 'dataCenter/getTestcaseScript',
        data: JSON.stringify({
          "testcaseId":this.testcaseid,
          "caseCompositeType":1
        }),
        success: function (data) {
          if (!data.success) {
            Vac.alert(data.msg || '查询失败');
            return;
          }
          _this.tableData = data.scriptList;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
        }
      });
    }
	}
});

Vue.component('view-script', viewScript);