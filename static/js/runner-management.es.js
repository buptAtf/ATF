function getJson (data) {
    let o = {};
    data.split('&').forEach((item) => {
        let a = item.split('=');
        o[a[0]] = a[1];
    });
    return decodeURIComponent(JSON.stringify(o));
}
var app = new Vue({
    el: '#v-testProject',
    data: {
        testProjectList: [],
        apiUrl: '',
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        queryTestProject: '',
        ids: '',
        //当前选中行
        selectedId: '',
        selectedTestProjectCode: '',
        selectedTestProjectName: '',
        selectedTaskDescription: '',
        logShow : false,
        addData: {
            nameMedium: '',
            ip: '',
            portNo: '',
            description: '',
            creatorId: ''
        },
        alterData: {
            id: '',
            nameMedium: '',
            ip: '',
            portNo: '',
            description: '',
            creatorId: ''
        },
        userId: '',
    },
    ready: function() {
        getTestProject(this.currentPage, this.pageSize, this.order, this.sort);
        
        // h获取用户id
        this.userId = sessionStorage.getItem('userId');
        $('.0').addClass('open')
        $('.0 .arrow').addClass('open')
        $('.0-ul').css({display: 'block'})
        $('.0-1').css({color: '#ff6c60'})
    },
    methods: {
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            // $('input[name="id"]').val(id_array.join(','));
        },
        checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) { //反选
                _this.checkboxModel = [];
            } else { //全选
                _this.checkboxModel = [];
                _this.autList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },
        //turnToPage为跳转到某页
        //添加测试项目
        insert: function() {
            let creatorId = this.userId;
            let nameMedium=$('#insertForm input[name="nameMedium"]').val();
            let ip=$('#insertForm input[name="ip"]').val();
            let portNo=$('#insertForm textarea[name="portNo"]').val();
            let description=$('#insertForm input[name="descripition"]').val();
            $('#insertForm input[name="creatorId"]').val(creatorId);
            if(nameMedium=='' || ip=='' || portNo=='' || description==''){
                alert("所有项均为必填项");
            }else{
                console.log($("#insertForm").serialize());
                $.ajax({
                    url: address3 + 'autoTestRunner/addAutoTestRunner',
                    type: 'post',
                    contentType: 'application/json',
                    data: getJson($("#insertForm").serialize()),
                    success: function(data) {console.log(data);
                        if (data.respCode === '0000') {
                            getTestProject();
                            $('#successModal').modal();
                        } else {
                            $('#failModal').modal();
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
        },
        //删除测试项目
        del: function() {
            this.getIds();console.log(app.ids);
            $.ajax({
                url: address3 + 'autoTestRunner/deleteAutoTestRunner',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'id': app.ids
                }),
                success: function(data) {
                    if (data.respCode === '0000') {
                        getTestProject();
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
        //修改测试项目
        update: function() {
            $.ajax({
                url: address3 + 'autoTestRunner/updateAutoTestRunner',
                type: 'post',
                contentType: 'application/json',
                data: getJson($("#updateForm").serialize()),
                success: function(data) {
                    if (data.respCode === '0000') {
                        getTestProject();
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
        //刷新
        refresh: function() {
            console.log('refresh');
            getTestProject();

        },
        //获取当前选中行内容
        getSelected: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            var selectedId = selectedInput.attr('id');
            $('input[name="id"]').val(selectedId);
            $('#updateForm input[name="nameMedium"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="ip"]').val(selectedInput.parent().next().next().html());
            $('#updateForm input[name="portNo"]').val(selectedInput.parent().next().next().next().html());
            $('#updateForm textarea[name="descripition"]').val(selectedInput.parent().next().next().next().next().html());
            $('#updateForm input[name="modifierId"]').val(sessionStorage.getItem('userId'));
        },
        downloadRunner: function(){
            window.location.href = address4 +"/atf-data/atf-runner.zip";
        },
        logshow(identifiableName){
            var _this = this;
            _this.logShow = true
			$.ajax({
				url: address3 + 'executeController/syncQueryLog',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
                    "logType": 1, 
                    "identifiableName":identifiableName,
					"reqSyncNo": null,
					"sessionId":null, 
                    "latestLineNum":50,
				}),
				success: function(data) {
					if(data.respCode=="0000"){
						let textarea = $("#logarea")
						textarea.val(data.logSeg);
						textarea.scrollTop(99999999999);	
						syncQueryIncLog(data)
					}
					else{
						Vac.alert(data.respMsg);
					}
				},
				error: function() {
					Vac.alert('网络错误！请点击重新查询！');
				}
			});
			function syncQueryIncLog (values){
				$.ajax({
					url: address3 + 'executeController/syncQueryLog',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({
                        "logType": 1, 
                        "identifiableName":values.identifiableName,
						"reqSyncNo": values.respSyncNo,
						"sessionId":values.sessionId, 
                        "latestLineNum":50,
					}),
					success: function(data) {
						if(data.respCode=="0000"){
							let textarea = $("#logarea")
							if(data.logSeg!=null)
								textarea.val(textarea.val()+data.logSeg);
							textarea.scrollTop(99999999999);
							syncQueryIncLog(data)
						}
						else{
							Vac.alert(data.respMsg);
						}
					},
					error: function() {
						Vac.alert('网络错误！请点击重新查询！');
					}
				});
			}
        }
    },
});

//获取系统
function getTestProject() {
    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: address3 + 'executeController/queryRunners',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "serviceName":"web.ui"
        }),
        success: function(data) {
            if (data.respCode === '0000') {
                app.testProjectList = data.runners;
            } else {
                app.testProjectList = [];
            }
        }
    });

}


//全选反选
$("#chk_all").click(function() {
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});
