/*设置recorderStatus的值：recorderStatus＝１，则查询各执行轮次中未激活的记录单；recorderStatus＝２，
则查询各执行轮次中激活的记录单；recorderStatus＝９则查询各执行轮次中的所有记录单（不包括删除的）。
（２）设置executeRound，设置完后则查询指定执行轮次的记录单。recorderStatus与executeRound不能同时设置。
sourchChannel有个特殊用法，若输入“PE4/PE6”则查询sourchChannel=PE4或PE6的所有记录单。
*/
var execRecord = Vue.extend({
	template: '#execution-record',
	props: ['recorddata', "flownodeid" ],
	data: function () {
		return {
			address: address.slice(0, -10), // address: 140.143.16.21:8080/ATFCloud
			srcDoc: '',
			srcs: [],
			testRecord:null,
			caseId: '',
			sceneId: '',
			batchId: '',
		}
	},
	ready: function() {
		var _this = this
		window.setInterval(_this.reinitIframe(), 2000);
	},
	mounted:function(){
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		iframe.height = height;
	},
	watch: {
		queryData: function(newVal, oldVal) {
			var me = this;
			me.caseId=newVal.caseId;
			me.sceneId= newVal.sceneId;
			me.batchId= newVal.batchId;
			if (newVal.flowNodeId == null) {
				$.ajax({
					url: address3+'testRecordController/querySingleRecordByCaseId',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({
					caseId: me.caseId,
					sceneId:  me.sceneId ,
					batchId:  me.batchId,
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
		flownodeid: function(newVal, oldVal) {
			var me = this;
			console.log("333333333333333333333")
			if (newVal) {
				console.log(newVal)
				console.log(oldVal)
				$.ajax({
					url: address3+'testRecordController/querySingleRecordByCaseId',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({
					caseId: me.caseId,
					sceneId:  me.sceneId ,
					batchId:  me.batchId,
					flownodeId:newVal
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
		}
	},
	computed: {
		queryData: function() {
			return this.recorddata;
		}
	},
	methods: {
		reinitIframe(){
			var iframe = document.getElementById("recordreport");
			try{
				console.log('222222222222222222')
				console.log(iframe)
				var bHeight = iframe.contentWindow.document.body.scrollHeight;
				var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				var height = Math.max(bHeight, dHeight);
				iframe.height = height;
				console.log(height);
			}catch (ex){console.log('ex')}
		},
		changeSrcDoc: function(srcDoc) {
			this.srcDoc = srcDoc;
			this.srcs = srcDoc;
		}
	}
})

Vue.component('exec-record', execRecord)