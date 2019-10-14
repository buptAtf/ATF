
 var templet=`<div class="tab-content">
  <table class="table table-bordered" v-if="tableData.length">
      <thead>
        <tr>
          <th>#</th>
          <th>操作项</th>
          <th>方法</th>
          <th>参数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, row) in tableData">
          <td class="index">{{ +index + 1 }}</td>
          <td class="operations">
              <template v-if="row.ui != '' && row.element != ''">
                  <label >UI:</label>
                  <span class="operation-ui">{{row.ui}}</span>
                  <label>元素:</label>
                  <span class="operation-element" :data-classtype="row.classType">{{row.element}}</span>
              </template>
              <template v-else>
                  <label >公共函数:</label>
                  <span class="operation-ui" style="display: none;">{{row.ui}}</span>
                  <span class="operation-element"  style="display: none;" :data-classtype="row.classType">{{row.element}}</span>
              </template>
          </td>
          <td class="functions">{{ row.method }}</td>
          <td class="parameters">
              <div class="param-show">
                <span v-for="(index,parameter) in row.parameters" class="param-name-show">参数{{index+1}}: <b class="param-value-show">{{parameter}}</b>;&nbsp;&nbsp;</span>
              </div>
          </td>
        </tr>
      </tbody>
  </table>
  <div v-else style="text-align: center;margin: 20px auto;">暂无数据</div>
</div>`
var viewScript = Vue.extend({
	template: templet,
	props: [
    'testcaseid',
    'casecompositetype'
  ],
	data: function () {
		return {
      queryData:'',
      tableData: []
		}
	},
	ready: function() {
    this.query();
    console.log('view script ready123')
	},
	watch: {
    testcaseid: function() {
      console.log('watch'+this.testcaseid);
      this.query();
    }
	},
	computed: {
    queryData: function() {
      console.log('computedscript')
      return this.testcaseid
    }
	},
	methods: {
    query: function() {
      console.log("logloglolgog0"+this.queryData+"111"+this.testcaseid)
      if(!this.testcaseid) {
        console.log("aaaaaaaaa");
        return;
      }
      var _this = this;
      $.ajax({
        type: 'post',
        contentType:"application/json",
        url: address3 + 'dataCenter/getTestcaseScript',
        data: JSON.stringify({
          "testcaseId":this.testcaseid,
          "caseCompositeType":this.casecompositetype
        }),
        success: function (data) {
          if ('0000'!=data.respCode) {
            Vac.alert(data.respMsg || '查询失败');
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