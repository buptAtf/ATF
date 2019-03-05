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
        pageSize: 20, //页面大小
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
        executeRound: '',
        testPlanId:'',
        caseId:'',
        casecode:'',
        testPlans:[],
        sceneId:'',
        projectName: sessionStorage.getItem('projectNameStorage'),
        caseLibId: sessionStorage.getItem('caselibId'),
        executeStatus: '' //用于查询执行状态
        
    },
    ready: function() {
        var ts=this;
        // getRecord(this.currentPage, this.pageSize, this.order, this.sort);
        var p1 = new Promise((resolve, reject) => {
            //  getTestPhase(resolve);
        });
        var p2 = new Promise((resolve, reject) => {
            getTestRound(resolve);
        });
        var p = Promise.all([p1, p2]);
        p.then(() => {
            getRecord(ts.currentPage, ts.pageSize, 'casecode', 'asc');
        });
        // getTestPhase();
        // getTestRound();
        getScene();
        getRecord(ts.currentPage, ts.pageSize, 'casecode', 'asc');
        // setTimeout(getRecord(), 500);
        changeListNum();
        this.queryTestPlan();
        this.queryScene();

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
            var _this = this;
            pageNum = parseInt(pageNum);

            //页数不合法则退出
            if (!pageNum || pageNum > _this.totalPage || pageNum < 1) {
                console.log('页码输入有误！');
                _this.isPageNumberError = true;
                return false;
            } else {
                _this.isPageNumberError = false;
            }
            //更新当前页
            _this.currentPage = pageNum;
            if(_this.querymode==='rounds'){
                _this.queryByRounds();
            } else if(_this.querymode==='batch'){
                _this.queryByBatchs();
            }
            //页数变化时的回调
            // getRecord(_this.currentPage, _this.pageSize, 'id', 'asc');
        },
        viewCase: function (sceneId=15, caseid, sourcechannel, item) {
			var o = {
				sceneId,
                recorderStatus: '2',
                item
            }
            var args = encodeURIComponent(JSON.stringify(o));
            window.open('case-operation.html?testcaseId='+caseid+'&activeName=element-library')
			//window.open('case-operation.html?testcaseId='+caseid+'&activeName=exec-record&viewcaseargs='+args, 'case_record');
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
            sessionStorage.setItem("isFromRecordSheet",false);  //点击查询后，就把从记录单转过来的标志位删掉
            if(mode=='rounds'){
                this.queryByRounds();
            } else if(mode=='batchs'){
                this.queryByBatchs();
            }
        },
        queryByRounds: function(orderType='asc',orderColumns='casecode'){
            var _this = this;
            $.ajax({
                url: address3 + 'testRecordController/pagedBatchQueryTestRecordByTestRound',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'testRound': _this.testround,
                    'recorderStatus':+_this.recorderstate,  //在字符串类型前加+，将类型转换为整形"123"+5
                    'casecode': _this.casecode,
                    'sceneId': _this.sceneId,
                    'pageSize': _this.pageSize,     //整形
                    'currentPage': _this.currentPage,   //整形
                    "executeStatus": _this.executeStatus,
                    'orderType': orderType,
                    'orderColumns': orderColumns
                }),
                success: function(data){
                    if(data.respMsg=='查询成功'){
                        _this.recordList = data.list;
                        _this.totalPage = data.totalPage;
                        _this.tt = data.totalCount;
                    } else if(data.respMsg=='查询结果为空') {
                        _this.recordList = [];
                        Vac.alert('查询结果为空');
                    }
                },
            });            
        },
        queryByBatchs: function(orderType='asc',orderColumns='casecode'){          //通过查询批次的方式进行查询，输入执行轮次和测试计划，进行查询
            var _this = this;
            $.ajax({
                url: address3 +'testRecordController/pagedBatchQueryTestRecordByTestPlan',
                type: 'post',
                contentType: 'application/json',
                data:JSON.stringify({
                    'executeRound': +_this.executeRound,
                    'testPlanId': +_this.testPlanId,
                    'casecode': +_this.casecode,
                    'sceneId': +_this.sceneId,
                    'pageSize': _this.pageSize,     //整形
                    'currentPage': _this.currentPage,   //整形
                    'executeStatus': _this.executeStatus,
                    'orderType': orderType,
                    'orderColumns': orderColumns
                }),
                success: function(data){
                    _this.recordList = data.list;
                    _this.totalPage = data.totalPage;
                    _this.tt = data.totalCount;
                }
            });
            // alert('批量查询');
        },
        queryTestPlan: function(){
            var _this = this;
            $.ajax({
                url: address3 + '/testPlanController/selectAllTestPlan',
                type: 'post',
                contentType: 'application/json',
                data:JSON.stringify({

                }),
                success: function(data){
                    if (data.respCode === '0000') {
						if (data.testPlanEntityList && (data.testPlanEntityList.length>0)) {
                            _this.testPlans = data.testPlanEntityList;
                            _this.testPlanId = data.testPlanEntityList[0].id;
                        }
                    }
                }
            });
        },
        queryScene: function(){
            var _this = this;
            $.ajax({
                // url: address3 + 'sceneController/selectAllScene',
                url: address3 + 'sceneController/pagedBatchQueryScene',
                type: 'post',
                contentType:'application/json',
                data:JSON.stringify({                    
                    "currentPage":1,
                    "pageSize":"20",
                    "orderType":"DESC",
                    "orderColumns":"modified_time",
                    "caseLibId": _this.caseLibId           
                }),
                success: function(data){
                    // _this.sceneList = data.scenequeryDtoList;
                    _this.sceneList = data.sceneEntityList;
                }
            })
        }

    }
});

//获取测试记录
function getRecord(page=1, listnum=10, order='id', sort='asc') {
    var _this=this;
    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        // url: address + 'testrecordController/selectAllByPage',
        url: address3+'testRecordController/pagedBatchQueryTestRecordByRunId',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "runId":sessionStorage.getItem('batchId'),
            "testPlanId":sessionStorage.getItem('testPlanId'),
            "pageSize":listnum,
            "currentPage":page,
            "orderType":sort,
            "orderColumns":order
        }),
        success: function(data) {
            if (data.respCode === '0000') {
                app.recordList = data.list;
                app.tt = data.totalCount;
                app.totalPage = data.totalPage;
                app.pageSize = listnum;
            } else {
                 $('#failModal').modal();
            }
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
        app.listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + app.listnum + "']").attr("selected", true);
         app.currentPage=1;
        getRecord(1, app.listnum, 'id', 'asc');
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

//对执行记录查询中的按列排序
function myResort(target){  
    
    var orderColumns = target.getAttribute("data-order");   //获得需要被排序的列名
    var old_order = target.getAttribute("data-sort");   //获得原先的顺序，是升序还是降序
    var span = target.getElementsByTagName("span")[0];  //得到显示图标的DOM元素
    var downSorter = (firstEl , secondEl) => ( secondEl[orderColumns]- firstEl[orderColumns]);
    var upSorter = (firstEl , secondEl) => ( firstEl[orderColumns] - secondEl[orderColumns]);

    switch(old_order){
        case "desc":
            target.setAttribute("date-sort","asc");
            span.setAttribute("class","icon-sort-down");
            app.recordList.sort(upSorter);
            break;
        case "asc":
            target.setAttribute("date-sort","desc");
            span.setAttribute("class","icon-sort-up");
            app.recordList.sort(downSorter);
            break;
        default:
            break;
    }
    // var orderColumns = target.getAttribute("data-order");   //获得需要被排序的列名
    // var old_order = target.getAttribute("date-sort");   //获得原先的顺序，是升序还是降序
    // var span = target.getElementsByTagName("span")[0];  //得到显示图标的DOM元素
    // var mode = app.querymode;                           //判断当前查询模式是按批次查询还是按轮次查询
    // var isFromRecordSheet = sessionStorage.getItem("isFromRecordSheet");    //是否从记录单跳转来的标志位

    // switch(old_order){  //检测原先的顺序
    //     case "desc":    //如果原先是倒序
    //         target.setAttribute("date-sort","asc");         //改变标签为顺序
    //         span.setAttribute("class","icon-sort-down");    //修改图标
    //         if(isFromRecordSheet=="true"){                          //如果是从记录单跳转而来，不是查询得到的，调用的函数不同
    //             getRecord(app.currentPage,app.pageSize,orderColumns,"asc");
    //             console.log("我执行的是查记录单缓存的排序");
    //         } else{
    //             if(mode==="rounds"){                        //如果查询方式是按轮次查询
    //                 app.queryByRounds("asc",orderColumns);  
    //                 console.log("我执行的是查轮次的排序");
    //             } else if(mode==="batchs"){                 //如果调用方式是按批次查询
    //                 app.queryByBatchs("asc",orderColumns);
    //                 console.log("我执行的是查批次的排序");
    //             }
    //         }
    //         break;
    //     case "asc":     //如果原先是顺序
    //         target.setAttribute("date-sort","desc");        //修改标签为倒序
    //         span.setAttribute("class","icon-sort-up");      //修改图标显示
    //         if(isFromRecordSheet=="true"){
    //             getRecord(app.currentPage,app.pageSize,orderColumns,"desc");
    //         } else{
    //             if(mode==="rounds"){
    //                 app.queryByRounds("desc",orderColumns);
    //             } else if(mode==="batchs"){
    //                 app.queryByBatchs("desc",orderColumns);
    //             }
    //         }
    //         break;
    //     default:
    //         break;
    // }
}
