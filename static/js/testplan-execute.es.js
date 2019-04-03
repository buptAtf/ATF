__inline('./testexecution/check.js')
const initialAddRowData = {
    nameMedium: '',
    descMedium: '',
    testPhaseId: '',
    testRoundId: ''
};
const initialAddRoundRowData = {
    roundName: '',
    roundDesc: '',
    recordmanagementflag: 1,
    timeexecutesetting: ''
};
var vBody = new Vue({
	el: '#v-body',
	data: {
		// tooltipMessage:'',
		runners:[],
		runner:"",
		caselibIds: [],			
		caselibId: 3,			// caselibId 
		executionround: '1',		// 执行轮次 
		recordflag: 2,			// 记录单
		exeScope: null,			// 执行范围
		selectState: '',		// 选择状态
		userId:sessionStorage.getItem('userId'),

		// save the value obtained from back end and will set to the selects' options
		testPlans: [], 
		testrounds: [],
		// save the values which is selected by users and will be send to the back end
		testPlanId: sessionStorage.getItem('testPlanId'),
		// the cases and scenes obtained from back end
		testCaseList: [],
		testSceneList:[],
		// save the value of input in the scene list
		checkallSceneIds: [],
		sceneIds: [],	// save all sceneids		[2,3,4]
		sceneCaseMap: new Map(),	// save the cases and flownodes in scene { sceneId: [caseid, flownodeid...]}
		sceneCaseIds: [],			// only save the caseids in the form of 'sceneid-caseid' in scene ["29-27"]
		flowNodesMap: new Map(), 	// save the nodes in flowCase { caseId: [flownode, flownode...]}


		// get all the scenes when user click addScene
		allscenes: null,

		/***************** save data in scene list ************************/
		// selected Scene which is checked
		selectedScenes: [],
		selectedSceneCases: [],
		// selectedFlowNodes: [],

		/***************** save data in case list ************************/
		checkall: false,
		// save the selected cases in caselist
		selectedCases: [],
		// save the checked flow nodes in caselist
		checkedFlowNodes: [],
		// save the all case ids in caselist
		caseIds: [],
		// save the all flowNode ids in caselist
		flowNodeIds: new Map(),

		// Scenes in add-scene modal
		selectedScene: [],	// 3, 1, 2, [1,2], [3],[{"sceneId":1,"testcaseList":[1,2]}]
		exeImgs: {
			0: '/assets/images/waiting.png',
			10: '/assets/images/init.png',
			2: '/assets/images/success.png',
			3: '/assets/images/error.png',
			13: '/assets/images/running.gif',
			4: '/assets/images/success.png',
			5: '/assets/images/jump.png',
			11: '/assets/images/warn.png',
			12: '/assets/images/warn.png',
		},
		// 批量执行相关
		batchId:null,
		exeStautShow: '<i class="icon-meh"></i>无计划',
		exeStauts:true, //执行状态,用与判断该测试计划是否在执行中，确定是否调用执行接口
		// save the string : 展开 and 收起
		expandString: '展开',
		unexpandString: '收起',
		//来自测试计划页面的data
		selectTestPlan: '',
        addModalShow: false,
        addRoundModalShow: false,
        addRowData: { ...initialAddRowData },
        addRoundRowData: { ...initialAddRoundRowData },
        addModalTitle: '新增测试计划',
        editType: 1,   // 1: add  2: update
        testPlanArray: [],
        testPhaseArray: [],
        testRoundArray: [],
        orderType:'asc',
        orderColumns:"id",
        page: {
            totalCount: 1,
            currentPage: 1,
            totalPage: 1,
            pageSize: 10
		},
		projectName: sessionStorage.getItem('projectNameStorage')
	},
	created: function(){
		var _this = this;
		var tempTestPlanId = sessionStorage.getItem('testPlanId');
		_this.caselibId = sessionStorage.getItem('caselibId');
		var getPlans = new Promise((resolve, reject) => {
			Vac.ajax({
				url: address3 + 'testPlanController/queryTestPlan',
				data: {
					caseLibId: _this.caselibId,
					"nameMedium": "",
					"descMedium": "",
				},
				success: function(data){
					if (data.respCode === '0000') {
						if (data.testPlanEntityList && (data.testPlanEntityList.length>0)) {
							if(tempTestPlanId==null){		//从执行记录查询跳转过来所需
								_this.testPlanId = data.testPlanEntityList[0].id;
								console.log("我来自查询出来的");
							} else{
								console.log("我来自跳转转过来的出来的");
								_this.testPlanId = tempTestPlanId;
								sessionStorage.removeItem('testPlanId');
							}
							_this.testPlans = data.testPlanEntityList;
							resolve();
						} else {
							reject('请添加测试计划！');
						}
						return;
					}
					reject("出了点问题吧");
				}
			});
		});
		getPlans.then(() => {
			_this.getCases();
		}).catch(err => { Vac.alert(err); });
		// init the modal 
		$('#add-modal').on('hidden.bs.modal', function (e) {
			var scenes = _this.selectedScene;
			for(var i=0,len=scenes.length; i<len; i++){
				scenes.shift();
			}
		})
		// let result = Vac.isAncestor(document.querySelector('html'), document.querySelector('body'))
		// console.log(result)
	},
	ready: function(){
		// console.log("ready")
		this.setSelectListener();
		this.queryRunners();
		Vue.nextTick(() => {
			this.setDraggable()
		})
		initialAddRowData.creatorId = sessionStorage.getItem('userId');
        initialAddRowData.caseLibId = sessionStorage.getItem('caselibId');
        this.addRowData = {...initialAddRowData};
        this.getTestPlans();
        this.getTestPhases();
        this.getTestRound();
		$('.3').addClass('open')
		$('.3 .arrow').addClass('open')
		$('.3-ul').css({display: 'block'})
		$('.3-6').css({color: '#ff6c60'})
	},

	watch: {
		"selectedCases": function(value, oldVal) {
			this.checkall = (value.length === this.caseIds.length)
			this.setBackground()
		},
		"checkedFlowNodes": function(value, oldVal) {
			for(let key of this.flowNodeIds.keys()) {
				if(this.flowNodeIds.get(key).every((value) => {
					return this.checkedFlowNodes.includes(value)
				}))
				{
					Vac.pushNoRepeat(this.selectedCases, +key)
				} else {
					let set = new Set(this.selectedCases)
					set.delete(+key)
					this.selectedCases = [...set]
				}
			}
			this.setBackground()
		},
	},
	methods: {
		queryRunners: function(){
			 var _this=this;
			$.ajax({
				url: address3 + 'executeController/queryRunners ',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"serviceName":"web.ui"
				}),
				success: function(data) {
					if (data.respCode=="0000") {
						_this.runners=data.runners;
						if(data.runners.length==0)
							Vac.alert('查询不到执行机');
						else
							_this.runner=data.runners[0].identifiableName;
					} else {
						Vac.alert(data.respMsg);
						}
				},
				error: function() {
					Vac.alert('网络错误！请点击重新查询！');
				}
			});
		},
		hideAlert: function(){
			this.alertShow = false;
		},
		stopExe: function(){
			var _this=this
			// if(_this.exeStauts) {
			// 	Vac.alert('该测试计划尚未执行或执行完毕。');return;
			// }
			$.ajax({
				url: address3 + 'batchRunCtrlController/terminateBatch ',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"batchId": _this.batchId
				}),
				success: function(data) {
					if (data.respCode=="0000") {
						Vac.alert(data.respMsg);
						_this.startQueryResult();
						_this.exeStautShow = '<i class="icon-ok"></i>已执行';
						// _this.runners=data.runners;
						// if(data.runners.length==0)
						// 	Vac.alert('查询不到执行机');
						// else
						// 	_this.runner=data.runners[0].identifiableName;
					} else {
						Vac.alert(data.respMsg);
						}
				},
				error: function() {
					Vac.alert('网络错误！请点击重新查询！');
				}
			});
		},
		executeAll: function(){
			var _this = this;
			if(!_this.userId ) {
				Vac.alert('请填写用户id');return;
			}
			if(!_this.recordflag) {
				Vac.alert('请填写recordflag');return;
			}
			if (!_this.exeScope) {
				Vac.alert('请填写执行范围');return;
			}
			if (!_this.testPlanId) {
				Vac.alert('请选择测试计划');return;
			}
			if(_this.runner=="")
			{
				Vac.alert('请选择执行机');return;
			}
			if(!_this.exeStauts ) {
				Vac.alert('该测试计划正在执行中，若想再次执行，请终止当前执行');return;
			}
			var selectedExeInstances=[];
			if(_this.exeScope==1){}
			else{
				
				for(var i=0; i<_this.selectedSceneCases.length; i++){
					let temp = {};
					let selectedSceneCase = _this.selectedSceneCases[i].split("-");
					temp.caseId = selectedSceneCase[selectedSceneCase.length-1];
					temp.sceneId = selectedSceneCase[1];
					selectedExeInstances.push(temp);
					console.log(temp);
				}
				console.log(selectedExeInstances);
			}
			_this.exeStautShow = '<i class="icon-spinner"></i>执行中';
			Vac.ajax({
				url: address2 + 'executeController/t1',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"userId": _this.userId,
					"recordflag": _this.recordFlag,
					"exeScope": _this.exeScope, 
					"selectState": _this.selectState,
					"selectedExeInstances": selectedExeInstances,
					"testPlanId": _this.testPlanId,
					"identifiableRunnerName":_this.runner
				}),
				success: function(data) {
					if (data.respCode === '0000') {
						Vac.ajax({
							url: address2 + 'batchRunCtrlController/queryLatestBatchIdForTestPlan',
							type: 'post',
							contentType: 'application/json',
							data: JSON.stringify({
								"testPlanId": _this.testPlanId,
							}),
							success: function(data) {
								_this.batchId = data.batchId;
								_this.startQueryResult();
							},
							error: function(){
								Vac.alert('网络错误，执行失败！');
								_this.setResultIcon();
							}
						})

					} else {
						Vac.alert(respMsg);
						_this.setResultIcon();
					}
				},
				error: function(){
					Vac.alert('网络错误，执行失败！');
					_this.setResultIcon();
				}
			})
		},
		startQueryResult: function() {
			var _this = this;
			$.ajax({
				url: address3 + 'batchRunCtrlController/syncQueryIncInsStatus',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"batchId": _this.batchId,
					"reqSyncNo": null,
					"sessionId":null, 
				}),
				success: function(data) {
					if(data.respCode=="0000"){
						if(data.respSyncNo==-1){
							_this.setResultIcon(data.insStatuses)
							console.log("finish this branch")
						}
						else{
							_this.setResultIcon(data.insStatuses)
							syncQueryIncInsStatus(data)
						}
					}
					else{
						Vac.alert(data.respMsg);
					}
				},
				error: function() {
					Vac.alert('网络错误！请点击重新查询！');
				}
			});
			function syncQueryIncInsStatus (values){
				$.ajax({
					url: address3 + 'batchRunCtrlController/syncQueryIncInsStatus',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({
						"batchId": values.batchId,
						"reqSyncNo": values.respSyncNo,
						"sessionId":values.sessionId, 
					}),
					success: function(data) {
						if(data.respSyncNo==-1){
							_this.setResultIcon(data.insStatuses)
							console.log("finish this branch")
						}
						else if(data.respSyncNo==-2){
							syncQueryIncInsStatus(values)
						}
						else{
							_this.setResultIcon(data.insStatuses)
							syncQueryIncInsStatus(data)
							console.log("continue this branch")
						}
					},
					error: function() {
						Vac.alert('网络错误！请点击重新查询！');
					}
				});
			}
		},
		reQuery: function() {
			var _this=this;
			Vac.ajax({
				url: address2 + 'batchRunCtrlController/queryLatestBatchIdForTestPlan',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"testPlanId": _this.testPlanId,
				}),
				success: function(data) {
					_this.batchId = data.batchId;
					_this.startQueryResult();
				},
				error: function(){
					Vac.alert('网络错误，执行失败！');
					_this.setResultIcon();
				}
			})
			if(_this.batchId)
				_this.startQueryResult();
		},
		setResultIcon: function(data) {
			if(!data) {
				[...document.querySelectorAll('img[id^="img-"]')].forEach((item) => {
					item.src = this.exeImgs['2'];
				});
				return;
			}
			for (let d of data) {
				//  //注释掉直接选中的用例
				// if (d.sourcechannel === 'PE4') {	//直接选中执行的测试用例
				// 	if (d.flownodeid) {
				// 		document.querySelector(`#img-${d.flownodeid}`).src = this.exeImgs[d.status];
				// 	} else {
				// 		document.querySelector(`#img-${d.caseid}`).src = this.exeImgs[d.status];
				// 	}
				// } else {
					if(d.flowNodeId) {
						if(document.querySelector(`#img-${d.sceneId}-${d.testcaseId}-${d.flowNodeId}`)!=null){
							document.querySelector(`#img-${d.sceneId}-${d.testcaseId}-${d.flowNodeId}`).src = this.exeImgs[d.status];
						}
					} else {
						if(document.querySelector(`#img-${d.sceneId}-${d.testcaseId}`)!=null){
							document.querySelector(`#img-${d.sceneId}-${d.testcaseId}`).src = this.exeImgs[d.status];
						}
					}
					
				//}
			}
		},
		testPlanManager: function() {		
			// Vac.ajax({
			// 	url: address3 + 'sceneController/selectAllScene',
			// 	data: { caseLibId: this.caselibId },
			// 	success: function(data){
			// 		if(data.respCode == '0000'){
			// 			_this.allscenes = data.scenequeryDtoList;
			// 			$('testplan_modal').modal('show');
			// 		}
			// 	}
			// });
			 $('#testplan_modal').modal("show");
		},
		addScene: function() {
			var _this = this;
			Vac.ajax({
				url: address3 + 'sceneController/pagedBatchQueryScene',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({
					'currentPage': 1,
					'pageSize':"100",
					'orderColumns': "modified_time",
					'orderType': "desc",
					'caseLibId':_this.caselibId
				}),
				success: function(data){
					if(data.respCode == '0000'){
						_this.allscenes = [];
						if(data.sceneEntityList.length){
							for(let i=0;i<data.sceneEntityList.length;i++){
								if(data.sceneEntityList[i].deleteFlag!=2){
									_this.allscenes.push(data.sceneEntityList[i]);
								}
							}
						}
						$('#add-modal').modal('show');
					}
				}
			});
			$('#add-modal').modal("show");
		},
		removeSceneAndCase: function() {
			var _this = this;
			if (!this.selectedScenes.length) {
				Vac.alert('请选择要删除的场景!');
				return;
			}
			// let sceneList = this.selectedScenes.length === 0 ? '' : JSON.stringify(this.selectedScenes);
			// let testcaseList = this.selectedCases.length === 0 ? '' : JSON.stringify(this.selectedCases);
			// let sceneCaseList = new Array();
			// let o = {};
			// for (let sceneCase of this.selectedSceneCases) {
			// 	let arr = sceneCase.split('-');
			// 	if (arr.length !== 2) {continue;}
			// 	o[arr[0]] ? o[arr[0]].push(+arr[1]) : o[arr[0]] = [+arr[1]];
			// }
			// for (let key of Object.keys(o)) {
			// 	sceneCaseList.push({
			// 		sceneId: +key, 
			// 		testcaseList: o[key].length === 0 ? '' : o[key]
			// 	})
			// }
			// sceneCaseList = sceneCaseList.length === 0 ? '' : JSON.stringify(sceneCaseList);
			// // 
			// if (!sceneCaseList.length && !sceneList.length && !testcaseList.length) {
			// 	Vac.alert('请至少选择一项进行删除');
			// 	return;
			// }
			Vac.confirm('', '', '', '确认要移除场景和用例吗？').then(() => {
				let data = {
					testPlanId: this.testPlanId,
					sceneList: this.selectedScenes,
					testcaseList: this.selectedCases
				}
				Vac.ajax({
					url: address3 + 'caseExecuteInstance/deleteCaseExecuteInstance',
					data: data,
					success: function(data){
						if(data.respCode === '0000'){
							$('#vac-confirm').modal('hide');
							_this.selectedScenes = [];
							Vac.alert('移除成功')
							_this.getCases();
						}else {
							Vac.alert("移除失败")
						}
					}
				});
			}, () => {
				
			});
		},
		sendSceneData: function(){
			var _this = this;
			var data = {
				testPlanId: +this.testPlanId,
				testcaseList: [],				// 暂时为空   [1,2]
				sceneList: this.selectedScene,     // [3]
				creatorId: +sessionStorage.getItem('userId')
			};
			// send data and display the modal 
			Vac.ajax({
				url: address3 + 'caseExecuteInstance/insertCaseExecuteInstance',
				data: data,
				success: function(data){
					$('#add-modal').modal('hide');
					if(data.respCode === '0000'){
						Vac.alert('添加成功')
						_this.getCases()
						// _this.alertShow = true;
						// _this.tooltipMessage = '添加成功';
					}else {
						Vac.alert(data.respMsg)
					}
				},
				error: function() {
					$('#add-modal').modal('hide');
					Vac.alert("添加失败");
				}
			});
		},
		selectAll: function(event){
			if(event.target.checked){
				this.allscenes.forEach((scene) => {
					if(!this.selectedScene.includes(scene.id))
						{this.selectedScene.push(scene.id);}
				});
			}else{
				this.allscenes.forEach((scene) => {
					this.selectedScene.pop();
				});
			}
		},
		setDraggable: function () {
				//$('#id').sortable()函數实现拖动 disableSelection文章不能被选择
				$('.sortable_caselist').sortable({
					handle: '.handle'
				})
				$( ".sortable_caselist" ).disableSelection();

				$('#sortable_sceneslist').sortable({
					handle: '.handle2'
				})
				$("#sortable_sceneslist" ).disableSelection();

				$('.sortable_scene_caselist').sortable({
					handle: '.handle1'
				})
				$( '.sortable_scene_caselist' ).disableSelection();
				$('#testround-main').disableSelection();
		},
		senceAddedStatus(sceneId){//判断是否已经添加
			let _this=this;
			var testSceneList=_this.testSceneList
			for(let i =0;i<testSceneList.length;i++){
				if(+testSceneList[i].sceneId===+sceneId)
				return true
			}
			return false
		},
		getBatchIdForTestPlan(testPlanId){
			var _this = this;
			Vac.ajax({
				url: address3 + 'batchRunCtrlController/queryLatestBatchIdForTestPlan',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"testPlanId": testPlanId,
				}),
				success: function(data){
					if(data.respCode=="0000"){
						_this.batchId=data.batchId
						_this.getSinglebranchStatus();
					}
					else if(data.respCode=="10012000"){
						_this.exeStautShow = '<i class="icon-circle-blank"></i>尚未执行';
						_this.exeStauts = true;
						Vac.alert(data.respMsg);
					}
					else Vac.alert("查询branchId出错啦");
				},
				error: function() {
					Vac.alert('网络错误');
				}
			});

		},
		getSinglebranchStatus(){ //查询单个批次结果 并展示执行状态
			var _this = this;
			$.ajax({
				url: address3 + 'batchRunCtrlController/syncQueryIncInsStatus',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"batchId": _this.batchId,
					"reqSyncNo": null,
					"sessionId":null, 
				}),
				success: function(data) {
					if(data.respCode=="0000"){
						if(data.respSyncNo==-1){
							_this.setResultIcon(data.insStatuses);
							_this.exeStautShow = '<i class="icon-ok"></i>已执行';
							_this.exeStauts = true;
						}
						else{
							_this.setResultIcon(data.insStatuses);
							_this.exeStautShow = '<i class="icon-spinner"></i>执行中';
							_this.exeStauts = false;
						}
					}
					else{
						_this.exeStautShow = '<i class="icon-question"></i>未知';
						_this.exeStauts = false;
						Vac.alert(data.respMsg);
					}
				},
				error: function() {
					Vac.alert('网络错误！请点击重新查询！');
				}
			});
		},
		getCases() {
			var _this =this;
			var data = {
				caselibId: _this.caselibId,
				testPlanId: _this.testPlanId,
				roundFlag: 2,
				scopeFlag: 1
			};
			if(!_this.testPlanId) {
				Vac.alert("请选择测试计划");
				return;
			}
			Vac.ajax({
				url: address3 + 'caseExecuteInstance/queryCaseExecuteInstance',
				data: data,
				success: function(data){
					if("0000"!=data.respCode){
						Vac.alert(data.respMsg);
					}
					else{
						_this.testCaseList = data.executeInstanceResult.testCaseList;
						_this.testSceneList = data.executeInstanceResult.testSceneList;
						Vue.nextTick(() => {
							_this.setDraggable()
						})
						/*if(!(data.testCaseList && data.testCaseList.length)) {
							// Vac.alert('未查询到相关的用例信息！')
							return;
						}*/
						if(!(_this.testSceneList && _this.testSceneList.length)) {
							// Vac.alert('未查询到相关的场景信息！')
							return;
						}
						_this.caseIds.length = 0
						_this.flowNodeIds.clear();
						if(_this.testCaseList != null){
						_this.testCaseList.forEach((value) => {
							Vac.pushNoRepeat(_this.caseIds, value.caseId)
							if(value.caseCompositeType == 2) {
								let arr = []
								for (let flowNode of value.flowNodes) {
									arr.push(+flowNode.flowNodeId)
								}
								_this.flowNodeIds.set(+value.caseId, arr)
							}
						})
					}
				}

					_this.sceneIds.length = []
					_this.sceneCaseMap.clear()
					_this.flowNodesMap.clear()
					_this.testSceneList.sort(_this.compare("orderNum"));	//更新排序后的场景列表
					if (_this.testSceneList) {
						for (var j = 0; j<_this.testSceneList.length;j++) {
							
							var scene = _this.testSceneList[j]
							// sceneIds save the id of scene  [4,5,6]
							_this.sceneIds.push(scene.sceneId)
							var caselist = []
							for(var i = 0;i<scene.testCaseList.length;i++){
								var c = scene.testCaseList[i]
								// caselist save the caseid in the form of  'sceneId-caseId' ['3-45','3-56']
								caselist.push(scene.sceneId + '-' + c.caseId);

								if(c.caseCompositeType == 2) {
									_this.sceneCaseIds.push(scene.sceneId + '-' + c.caseId)
									let flowNodes = []
									for (let flowNode of c.flowNodes) {
										// caselist also save the flowNodeId in flowCase in the form of 
										//  'sceneId-caseId-flowNodeId' ['3-45-34','3-56-55']
										caselist.push(scene.sceneId+'-'+c.caseId+'-'+flowNode.flowNodeId)
										flowNodes.push(scene.sceneId+'-'+c.caseId+'-'+flowNode.flowNodeId)
									}
									// flowNodesMap save the map of caseId between flowNodes in the following form
									// {
									//  	'sceneId-caseId':  [ sceneId-caseId-flowNodeId,  sceneId-caseId-flowNodeId ]
									// }
									_this.flowNodesMap.set(scene.sceneId+'-'+c.caseId, flowNodes)
								}
							}
							// sceneCaseMap save the map of sceneId between flowNodeId and caseId in the following form
							// {
							//  	'sceneId':  [ sceneId-caseId, sceneId-caseId-flowNodeId ]
							// }
							_this.sceneCaseMap.set(scene.sceneId, caselist)
							
						}
					}
				}
			});
			_this.getBatchIdForTestPlan(data.testPlanId); //查询批次的执行状态并且展示
		},
		compare: function(property){		//排序所需要的函数
			return function(obj1,obj2){		//比较两个对象相应的元素，按照升序排序
				var value1 = obj1[property];
				var value2 = obj2[property];
				return value1-value2;
			}
		},
		hideCaseList: function(event){
			var _this = this
			var el = $('.case-list', $(event.currentTarget).parent())[0]
			// var curHeight = el.offsetHeight;
			// el.style.height = curHeight + 'px';
			el.style.display = 'block';
			if($(event.currentTarget).find('span').html() == _this.unexpandString){  // unexpandString 收起
				$(event.currentTarget).find('i').removeClass('icon-caret-down').addClass('icon-caret-right');
				// el.style.height = '0px'
				el.style.display = 'none';
				$(event.currentTarget).find('span').html(_this.expandString)
			} else {
				$(event.currentTarget).find('i').removeClass('icon-caret-right').addClass('icon-caret-down');
				// el.style.height = 'auto';
				// var curHeight = el.offsetHeight; 	// 展开
				// el.style.height = '0px';
				// window.requestAnimationFrame(function() {
				// 	el.style.height = curHeight+ 'px'
				// })
				$(event.currentTarget).find('span').html(_this.unexpandString)
			}
			event.stopPropagation()
		},
		changeCase: function(id, type){
			let arr ;
			switch(type) {
				case 1: arr = this.selectedCases;
					break;
				case 2: arr = this.checkedFlowNodes;
					break;
				case 3: arr = this.selectedSceneCases;
					break;
			}
			console.log(id)
			let index = arr.findIndex((value) => { return value === id })
			index !== -1 ? arr.splice(index, 1) : arr.push(id)
			// 如果选中的是flowNode
			// console.log('sceneCaseIds' + this.sceneCaseIds)
			// console.log('flowNodesMap'+ this.flowNodesMap)
			// console.log('sceneCaseMap'+ this.sceneCaseMap.keys())
			let idArr = (id+'').split('-');
			if(idArr.length === 3){
				let sceneCaseId = idArr.slice(0, 2).join('-')
				let caseList = this.flowNodesMap.get(sceneCaseId)
				if(caseList.every((value) => {
					return this.selectedSceneCases.includes(value)
				}))
				{
					Vac.pushNoRepeat(this.selectedSceneCases, sceneCaseId)
				} else {
					let set = new Set(this.selectedSceneCases)
					set.delete(sceneCaseId)
					this.selectedSceneCases = [...set]
				}
			}
			if(type === 3) {
				let sceneId = idArr[0];
				let caseIds = this.sceneCaseMap.get(+sceneId);
				if (caseIds.every((value) => {
					return this.selectedSceneCases.includes(value)
				}))
				{
					this.checkallSceneIds.push(+sceneId)
				} else {
					let set = new Set(this.checkallSceneIds)
					set.delete(+sceneId)
					this.checkallSceneIds = [...set]
				}
			}
			this.setBackground(this.selectedSceneCases)
		},
		saveSort:function(sceneId){
			var domNodes = $("input[value^=sort-"+sceneId+"]");
			var arrSortId=[];
			for(var i = 0;i<domNodes.length;i++){
				arrSortId.push(+$(domNodes[i]).attr('name'));
			}
			Vac.ajax({
				url:address3 +"sceneController/sceneTestcaseSortSave",
				data:{"sceneId":sceneId,"caseIdList":arrSortId},
				success:function(data){
					if(data.respCode === '0000'){
						Vac.alert('排序保存成功')
					}else
					Vac.alert('排序保存失败')
				}
			})
		},

		saveScenesSort:function(){					//保存场景排序
			var domNodes = $("input.checkscene");	//使用jQuery找到包含场景信息的元素
			var keyIdList=[];
			for(var i = 0;i<domNodes.length;i++){
				keyIdList.push(+$(domNodes[i]).attr('name'));	//将属性值为name的变量中的值取出来，为id值
			}

			Vac.ajax({
				url:address3 +"sceneController/sceneSortSave",
				data:{"keyIdList":keyIdList},
				success:function(data){
					if(data.respCode === '0000'){
						Vac.alert('场景排序保存成功')
					}else
					Vac.alert('场景排序保存失败')
				}
			})
		},

		viewCase: function (sceneId, caseid, sourcechannel, testPhase, testRound, recorderStatus) {
			var o = {
				sceneId, caseid,
				testPhase: testPhase || this.testphaseValue,
				testRound: testRound || this.testroundValue,
				// executeround: this.executionround,
				sourcechannel: sourcechannel,
				recorderStatus: recorderStatus || '2'
			}
			var args = encodeURIComponent(JSON.stringify(o));
            window.open('case-operation.html?testcaseId='+caseid+'&activeName=element-library')
			//window.open('case-operation.html?activeName=exec-record&viewcaseargs='+args, 'case_record');
		},
		
        turnToPage(currentPageParam){
            if(currentPageParam>0 && currentPageParam<=this.page.totalPage){
                this.page.currentPage = currentPageParam;
                this.getTestPlans();
            } 
            else Vac.alert("不在页码范围");
        },
        add() {
			
                const url = 1 === this.editType ? 'testPlanController/insertTestPlan' : 'testPlanController/updateTestPlan';
                const data = 1 === this.editType ? this.addRowData : {
                    id: this.selectTestPlan,
                    nameMedium: this.addRowData.nameMedium,
                    descMedium: this.addRowData.descMedium,
                    modifierId: this.addRowData.creatorId
                };
                Vac.ajax({
                    url: address3 + url,
                    data: data,
                    success: (data) => {
                        $('#addTestPlan').modal('hide');
                        if ('0000' === data.respCode) {
                            Vac.alert(data.respMsg);
                            this.addModalShow = false;
                            this.addRowData = {...initialAddRowData};
                            this.getTestPlans();
                        } else {
							Vac.alert(data.respMsg);
                        }
                    },
                    error: () => {
                        Vac.alert('出错啦~7');
                    }
                });
        },
        delete() {
            Vac.ajax({
				url: address3 + 'testPlanController/deleteTestPlan',
				data: {
                    id: this.selectTestPlan
                },
				success: (data) => {
					if ('0000' === data.respCode) {
                        this.selectTestPlan = '';
                        this.getTestPlans();
                    }
                    Vac.alert(data.respMsg);
				},
				error: () => {
					Vac.alert('出错啦~8');
				}
			});
        },
        showAddModal() {
            this.addRowData = {...initialAddRowData};
            this.editType = 1;
            $('#addTestPlan').on('show.bs.modal',function(event){
                var modal = $(this);
                modal.find('.modal-title').text("新增测试计划");
            })
            $("#addTestPlan").modal("show");
        },
        // showDeleteConfirm() {
        //     if ('' === this.selectTestPlan) {
        //         Vac.alert('请选择测试计划');
        //         return;
        //     }
        //     var pro = Vac.confirm('', '', '', '确认要删除吗？');
        //         pro.then(() => {
        //             this.delete();
        //         }, () => {});
        // },
        showUpdateModal(id) {
			this.selectTestPlan=id;
            if ('' === this.selectTestPlan) {
                Vac.alert('请选择测试计划');
                return;
            }
            this.editType = 2;
            $('#addTestPlan').on('show.bs.modal',function(event){
                var modal = $(this);
                modal.find('.modal-title').text("修改测试计划");
            })
            $('#addTestPlan').modal('show');
            ({
                nameMedium: this.addRowData.nameMedium,
                descMedium: this.addRowData.descMedium,
                testPhaseId: this.addRowData.testPhaseId,
                testRoundId: this.addRowData.testRoundId,
                // caseLibId: this.addRowData.caseLibId,
                // creatorId: this.addRowData.creatorId
            } = this.testPlanArray.find((item) => {
                return +this.selectTestPlan === +item.id;
            }));
        },
        getTestPlans() {
            Vac.ajax({
				url: address3 + 'testPlanController/pagedBatchQueryTestPlan',
				data: {
                    "pageSize":this.page.pageSize,
                    "currentPage":this.page.currentPage,
                    "orderType":this.orderType,
                    "orderColumns":this.orderColumns,
                    "nameMedium": "",
                    "descMedium": "",
                    "caseLibId": +initialAddRowData.caseLibId               
                },
				success: (data) => {
					if ('0000' === data.respCode) {
						this.testPlanArray = data.testPlanEntityList;
						this.testPlans = data.testPlanEntityList;
                                this.page.totalCount=data.totalCount;
                                this.page.totalPage=data.totalPage;
					} else {
						Vac.alert(data.respMsg);
					}
				},
				error: () => {
					Vac.alert('出错啦~2');
				}
			});
        },
        getTestPhases() {
            Vac.ajax({
				url: address3 + 'testphaseController/selectAllTestphase',
				data: {},
				success: (data) => {
					if ('0000' === data.respCode) {
						this.testPhaseArray = data.testphaseEntityList;
					} else {
						Vac.alert(data.respMsg);
					}
				},
				error: () => {
					Vac.alert('出错啦~4');
				}
			});
        },
        getTestRound() {
            Vac.ajax({
                url: address3 + 'testroundController/selectAllTestround',
                data: {},
                success: (data) => {
                    if ('0000' === data.respCode) {
						this.testRoundArray = data.testroundEntityList;
					} else {
						Vac.alert(data.respMsg);
					}
                }
            });
        },
        changeSelect(id) {
            if (+id === +this.selectTestPlan) {
                this.selectTestPlan = '';
            }
        },
        addTestRound() {
                Vac.ajax({
                    url: address3 + 'testroundController/insertTestround',
                    data: this.addRoundRowData,
                    success: (data) => {
                        if ('0000' === data.respCode) {
                            //Vac.alert("操作成功");
                            this.addRoundModalShow = false;
                            this.getTestRound();
                                $('#addTestRoundId').modal('hide');
                        } else {
                            Vac.alert(data.respMsg);
                        }
                    },
                    error: () => {
                        Vac.alert('网络错误，请稍候再试');
                    }
                });
        },
         resort(target) {
             var app=this;
            if (target.getAttribute("data-sort") === "desc") {
                app.orderType = "asc";
                target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up")
                target.setAttribute("data-sort", "asc");
            } else {
                app.orderType = "desc";
                target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down")
                target.setAttribute("data-sort", "desc");
            }
            app.orderColumns = target.getAttribute("data-order");
            app.getTestPlans();
        },
		setBackground: checkFunction.setBackground,
		checkChanged: checkFunction.checkChanged,
		checkallToggle: checkFunction.checkallToggle,
		checkallBox: checkFunction.checkallBox,

		checkAllInScene: checkFunction.checkAllInScene,
		checkAllFlowNodes: checkFunction.checkAllFlowNodes,
		checkFlowNode: checkFunction.checkFlowNode,
		setSelect: checkFunction.setSelect,
		setSelectListener: checkFunction.setSelectListener
	}
});