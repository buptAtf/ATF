var app = new Vue({
    el: '#v-quicklyExecute',
    data: {
        autId:'',
        transactId:'',
        testcaseList:[],
        sceneid:-1,
        runnerselected:[],
        userId:sessionStorage.getItem('userId'),
        testPlanId : sessionStorage.getItem('testPlanId'),

    },
    ready: function() {
        var _this = this;
        _this.getAutandTrans();
        _this.getQuickStartTestCaseByTransId();
        _this.queryRunners();
        _this.getScene();

        $('.-1 a').css({color: '#ff6c60'});
    },
    methods: {
        getScene(){ //获取场景ID待完善
            let that=this;
            that.sceneid = "...";
        },
        setToSence(templateId){
            let that=this;
            $.ajax({
                url: address3 + 'sceneController/insertTestcaseToScene',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id" : that.sceneid,
                    "creatorId" : that.userId,
                    // "caseIds" :'['+that.ids+']'
                    "caseIds" :id_array
                }),
                success: function(data) {
                    if (data.respCode=='0000') {
                        location.href = "scene-setting.html?sceneid=" + that.sceneid + "&" + "scenename=" + that.scenename;
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        getAutandTrans: function () {
            var _this = this;
            _this.autId = sessionStorage.getItem("autId");
            _this.transactId = sessionStorage.getItem("transactId");
        },
        getQuickStartTestCaseByTransId: function () {
            var _this = this;
            Vac.ajax({
                url: address3 + '/testcase/queryQuickStartTestCaseByTransId',
                data: { 'transId': _this.transactId },
                success: function (data) {
                    if (data.respCode == '0000') {
                        _this.testcaseList = data.testcaseList;
                    } else {
                        Vac.alert(data.respMsg);
                    }
                }
            });
        },
        clickToInsertSence(id){
            console.log(id)
            if($("#"+id)[0].checked){
                $.ajax({
                    url: address3 + 'sceneController/insertTestcaseToScene',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id" : sessionStorage.getItem("sceneId"),
                        "creatorId" : sessionStorage.getItem("userId"),
                        "caseIds" :[id]
                    }),
                    success: function(data) {
                        if (data.respCode=='0000') {
                            console.log("good it insertintisence")
                        } else {
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
            else{
                $.ajax({
                    url: address3 + 'sceneController/deleteTestcaseFromScene',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id" : sessionStorage.getItem("sceneId"),
                        "caseIds" :[id]
                    }),
                    success: function(data) {
                        if (data.respCode=='0000') {
                            console.log("good it insertintisence")
                        } else {
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
        },
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
                       for(let item of _this.runners){
                           $('#runnerselected').append(`<option value="${item.identifiableName}">${item.runnerName}</option>`);
                       }
                       $('#runnerselected').selectpicker('refresh');
                       if(data.runners.length==0)
                           Vac.alert('查询不到执行机');
                       // else
                           // _this.runner=data.runners[0].identifiableName;
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
			if( _this.runnerExecuteType=="appointed" && _this.runnerselected=="")
			{
				Vac.alert('请选择执行机');return;
			}
			var selectedExeInstances=[];
			Vac.ajax({
				url: address2 + 'executeController/t1',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"userId": _this.userId,
					"recordflag": 2,
					"exeScope":1, 
					"selectState": '',
					"selectedExeInstances": [],
					"testPlanId": _this.testPlanId,
					"identifiableRunnerName":_this.runnerExecuteType,
					"appointedRunners" : _this.runnerselected
				}),
				success: function(data) {
					if (data.respCode === '0000') {
						_this.startQueryLog();//查询日志
						Vac.ajax({//因为查询执行信息需要最近执行的批量号因此需要查询批次
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
						Vac.alert(data.respMsg);
						_this.setResultIcon();
					}
				},
				error: function(){
					Vac.alert('网络错误，执行失败！');
					_this.setResultIcon();
				}
			})
		},
    },

});