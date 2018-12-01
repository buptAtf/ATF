var app = new Vue({
    el: '#testRecord',
    data: {
        recordList: [], //测试记录
        testPhaseList:[],//测试阶段下拉列表
        testRoundList:[],//测试轮次下拉列表
        testPlanList:[],//测试计划下拉表
        sceneList:[],//场景下拉列表
        testphase: '',//测试阶段
        testround: '',//测试轮次
        recorderstate:'2',//记录单状态
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
        queryRecordId: '',
        //当前选中行
        selectedId: '',
        selectedRecordCode: '',
        selectedRecordName: '',
        selectedAbstractarchitecture_name: '',
        selectedRecord_desc: '',
        searchKey:'', //搜索条件
        searchVal: '',
        ids: '',
        querymode: 'rounds',    //用于查询
        testplan: 0 ,           //用于查询
        execround: 0,
        testPlanId:'',
        caseId:'',
        
    },
    ready: function() {
        // getRecord(this.currentPage, this.pageSize, this.order, this.sort);
        var p1 = new Promise((resolve, reject) => {
            //  getTestPhase(resolve);
        });
        var p2 = new Promise((resolve, reject) => {
            getTestRound(resolve);
        });
        var p = Promise.all([p1, p2]);
        p.then(() => {
            getRecord();
        });
        // getTestPhase();
        // getTestRound();
        getScene();
        getRecord();
        // setTimeout(getRecord(), 500);
        changeListNum();

        $('.3').addClass('open')
		$('.3 .arrow').addClass('open')
		$('.3-ul').css({display: 'block'})
		$('.3-7').css({color: '#ff6c60'})
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
                _this.RecordList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },
        // turnToPage为跳转到某页
        // 传入参数pageNum为要跳转的页数
        turnToPage(pageNum) {
            var ts = this;
            pageNum = parseInt(pageNum);

            //页数不合法则退出
            if (!pageNum || pageNum > ts.totalPage || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberError = true;
                return false;
            } else {
                ts.isPageNumberError = false;
            }

            //更新当前页
            ts.currentPage = pageNum;

            //页数变化时的回调
            getRecord(ts.currentPage, ts.pageSize, 'id', 'asc');
        },
        viewCase: function (sceneId=15, caseid, sourcechannel, item) {
			var o = {
				sceneId,
                recorderStatus: '2',
                item
            }
			var args = encodeURIComponent(JSON.stringify(o));
			window.open('case-operation.html?testcaseId='+caseid+'&activeName=exec-record&viewcaseargs='+args, 'case_record');
		},
        //合并
        merge: function(){
            $.ajax({
                url: address3+'testRecordController/merge',
                type:'post',
                data: $('#mergeForm').serializeArray(),
                success:function(data){
                    if (data.success) {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                }
            });
        },
        //删除
        del: function() {
            this.getIds();
            var ids=[app.ids];
            console.log(app.ids);
            $.ajax({
                url: address3+'testRecordController/batchDelete',
                type: 'post',
                contentType: 'application/json',
                data:  JSON.stringify({
                    'ids': ids
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respMsg=='0000') {
                        getRecord(app.currentPage, app.pageSize, 'id', 'asc');
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

        //获取当前选中行内容
        getSelected: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            var selectedId = selectedInput.attr('id');
            $('input[name="id"]').val(selectedId);
            $('#updateForm input[name="autCode"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="autName"]').val(selectedInput.parent().next().next().html());
            $('#updateForm input[name="abstractarchitecture_name"]').val(selectedInput.parent().next().next().next().html());
            $('#updateForm textarea[name="aut_desc"]').val(selectedInput.parent().next().next().next().next().html());
        },
        getRecordByClick: function(mode){      
            if(mode=='rounds'){
                this.queryByRounds();
            } else if(mode=='batchs'){
                this.queryByBatchs();
            }
        },
        queryByRounds: function(){
            var _this = this;
            $.ajax({
                url: address3 + 'testRecordController/pagedBatchQueryTestRecordByTestRound',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'testRound': _this.testround,
                    'recorderStatus':+_this.recorderstate,  //在字符串类型前加+，将类型转换为整形"123"+5                    
                    'caseId': +_this.caseId,
                    'sceneName': '',
                    'pageSize': 10,     //整形
                    'currentPage': 1,   //整形
                    'orderType': '',
                    'orderColumns': ''
                }),
                success: function(data){
                    _this.recordList = data.list;
                },
            });
            alert('轮次查询');
        },
        queryByBatchs: function(){          //通过查询批次的方式进行查询，输入执行轮次和测试计划，进行查询
            var _this = this;
            $.ajax({
                url: address3 +'testRecordController/batchQueryTestRecordByRunId',
                type: 'post',
                contentType: 'application/json',
                data:JSON.stringify({
                    'execround': _this.execround,
                    'testPlanId': _this.testPlanId
                }),
                success: function(data){
                    _this.recordList = data.list;
                }

            });
            alert('批量查询');
        },
    }
});

//获取测试记录
function getRecord(page, listnum, order, sort) {
    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        // url: address + 'testRecordController/selectAllByPage',
        url: address3+'testRecordController/batchQueryTestRecordByRunId',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "runId":sessionStorage.getItem('batchId')
            // testPhaseId: app.testphase,
            // testRoundId: app.testround,
            // sourceChannel: 'PE4'
            // caseLibId: '',
            // sceneId: '',
            // testPlanId: ''
        }),
        success: function(data) {
            if (data.respCode === '0000') {
                app.recordList = data.list;
                
            } else {
                // $('#failModal').modal();
            }
            // app.recordList = data.rows;
            // app.tt = data.total;
            // app.totalPage = Math.ceil(app.tt / listnum);
            // app.pageSize = listnum;
        }
    });

}
//获取测试阶段
// function getTestPhase(resolve){
//     $.ajax({
//         url: address3+'testphaseController/selectAllTestphase',
//         type: 'get',
//         success:function(data){
//             if (data.respCode === '0000'){
//                 var temp;             
//                 app.testPhaseList=data.testphaseEntityList;                       
//                 temp = data.testphaseEntityList[0];                          
//                 app.testphase = temp.name;
//                 // console.log(app.testphase);
//             }           
//             if (resolve) {
//                 resolve();
//             }
//         }
//     });
// }
//获取测试轮次----刘瑞卿修改
function getTestRound(resolve){
    $.ajax({
        url: address3+'testroundController/selectAllTestround',
        type: 'get',
        success: function(data){
            var temp;
            // console.log(data);
            app.testRoundList = data.testroundEntityList;
            // console.log(app.testRoundList);
            temp = data.testroundEntityList[0];
            app.testround = temp.name;
            if(resolve) {
                resolve();
            }
        }
    });
}
//--------初始代码-----//
// //获取测试轮次
// function getTestRound(resolve){
//     $.ajax({
//         url: address3+'testroundController/selectAllTestround',
//         type: 'get',
//         success: function(data){
//             app.testRoundList=data.obj;
//             app.testround = data.obj[0] ? data.obj[0].id : '';
//             if(resolve) {
//                 resolve();
//             }
//         }
//     });
// }
//获取场景
function getScene(){
    $.ajax({
        url: address3+'sceneController/selectAllScene',
        type: 'get',
        success:function(data){
            app.sceneList=data.obj;
        }
    });
}
//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
         app.currentPage=1;
        getRecord(1, listnum, 'id', 'asc');
    });
}

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});


//搜索测试记录
function queryRecord() {
    $.ajax({
        url: address3+'testRecordController/selectByPage',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'testPhase': app.testphase,
            'testRound':app.testround,
            'recorderstate':app.recorderstate
        },
        success: function(data) {
            app.recordList = data.rows;
            app.tt = data.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            // app.pageSize = app.listnum;
        }
    });
}
