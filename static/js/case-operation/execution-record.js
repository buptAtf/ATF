/*设置recorderStatus的值：recorderStatus＝１，则查询各执行轮次中未激活的记录单；recorderStatus＝２，
则查询各执行轮次中激活的记录单；recorderStatus＝９则查询各执行轮次中的所有记录单（不包括删除的）。
（２）设置executeRound，设置完后则查询指定执行轮次的记录单。recorderStatus与executeRound不能同时设置。
sourchChannel有个特殊用法，若输入“PE4/PE6”则查询sourchChannel=PE4或PE6的所有记录单。
*/
var execRecord = Vue.extend({
	template: '#execution-record',
	props: ['recorddata', "flowNodeId" ],
	data: function () {
		return {
			address: address.slice(0, -10), // address: 10.101.167.184:8080/ATFCloud
			srcDoc: '',
			srcs: [],
			testRecord:null
		}
	},
	ready: function() {
		
	},
	watch: {
		queryData: function(newVal, oldVal) {
			var me = this;
			if (newVal) {
				console.log(newVal)
				console.log(oldVal)
				$.ajax({
					url: address3+'testRecordController/querySingleRecordByCaseId',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({
					caseId: newVal.caseId,
					sceneId:  newVal.sceneId ,
					batchId:  newVal.batchId,
					}),
					success: function(res){
						if(res.respCode == "0000"){
							me.testRecord= res.recordEntity;
							me.changeSrcDoc(address4 + res.recordEntity.resourcePath)
						}
						else{
							Vac.alert(res.respMsg)
						}
					}
				})
			}
		},
	},
	computed: {
		queryData: function() {
			return this.recorddata;
		}
	},
	methods: {
		changeSrcDoc: function(srcDoc) {
			this.srcDoc = srcDoc;
			this.srcs = srcDoc;
		}
	}
})

Vue.component('exec-record', execRecord)