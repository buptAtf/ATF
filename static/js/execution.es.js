function generateConst(from, to, ...values) {
    let o = {}, index = 0;
    for (let i = +from; i <= +to; i++) {
        o[i] = values[index++];
    }
    return o;
}

var app = new Vue({
    el: '#scene',
    data: {
        sceneList: [],
        recordList: [],
        tt: 0, //总条数
        pageSize: 20, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 20, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        querySceneId: '',
        //当前选中行
        selectedId: '',
        selectedSceneCode: '',
        selectedSceneName: '',
        selectedAbstractarchitecture_name: '',
        selectedScene_desc: '',
        addshow: false, //添加场景
        isShow: false, //筛选
        iconflag: true,
        customFilterList: [
            { title: '选择1' },
            { title: '选择2' }
        ],
        caseNodeNum: 0,
        caseNode: '</h3><div class="form-group"><label class="col-lg-2 control-label hidden">案例组成类型</label><div class="col-lg-4 hidden"><input type="text" class="form-control" name="caseCompositeType" value="3"></div><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid" id=""></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><input class="form-control" name="subversioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option>手工</option><option>自动化</option><option>配合</option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option>模板</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option v-for="user in users" value="{{user.id}}">{{user.reallyname}}</option></select></div><label class="col-lg-2 control-label">测试顺序</label><div class="col-lg-4"><input class="form-control" name="steporder"></div></div><div class="form-group"><label class="col-lg-2 control-label">案例使用状态</label><div class="col-lg-4"><select class="form-control" size="1" name="subusestatus"><option value="1">新增</option><option value="2">评审通过</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        caseList: [], //案例
        ids: '', //当前选中的场景id，
        executeProduct: generateConst(1, 4, '批量执行', '批量调试', '单个执行', '单个调试'),
        caseSourceChannel: generateConst(1, 4, '测试计划', '场景', '数据编写', '模版调试'),
        runScopeFlag: generateConst(1, 2, '所有用例', '选择执行的用例'),
        recordSaveType: generateConst(1, 2, '仅保存一份', '保存多份'),
        recordSaveHouse: generateConst(1, 2, '正式库', '调试库'),
        recordVerboseType: generateConst(1, 2, '不保存', '标准', '简约'),
        runStatus: generateConst(0, 4, '未执行', '执行中', '执行完成-正常完成', '执行完成-错误终止', '执行完成-人工终止'),
        runResult: generateConst(1, 3, '全部成功', '部分成功', '全部失败'),
        creatTimeStart: '',
        creatTimeEnd:'',
        caseSourceChannel:'',
        runStatus:'',
        testPlans:[],
        testPlanId:'',
        projectName: sessionStorage.getItem('projectNameStorage'),
        page: {
            totalCount: 1,
            currentPage: 1,
            totalPage: 1,
            pageSize:20
        },
        period_flag:'',  //创建日期使用的标志来确定是0-默认，1-今日，2-一周前，还是3-一月前
        
    },
    ready: function() {
        var _this = this;
        //queryExecutionRecord(this.currentPage, this.pageSize, this.order, this.sort);
        _this.changeListNum();
        _this.queryTestPlan();
        // _this.queryExecutionRecord(this.currentPage, this.pageSize, this.order, this.sort);
        _this.getExecutionRecord();
        _this.creatTimeInit();

        $('.3').addClass('open')
        $('.3 .arrow').addClass('open')
        $('.3-ul').css({display: 'block'})
        $('.3-8').css({color: '#ff6c60'})
    },
    methods: {        //时间格式化
        formatDate(date){
            if(date){
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '/';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y+M+D+h+m+s;  
            }else{
                return '';
            }     
        },
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
                _this.sceneList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },
        //turnToPage为跳转到某页
        //传入参数pageNum为要跳转的页数
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
            ts.queryExecutionRecord(ts.currentPage, ts.pageSize, 'id', 'asc');
        },


        //添加场景
        insert: function() {
            var self=this;
            var scenename = $('#insertForm input[name="scenename"]').val();
            var description = $('#insertForm textarea[name="description"]').val();
            var caselibid=sessionStorage.getItem('caselibid');
            if(scenename==""){
                alert("场景名称不能为空");
            }else if(description==""){
                alert("场景描述不能为空");
            }else{
                $.ajax({
                    url: address + 'sceneController/insertSelective',
                    type: 'post',
                    data: {
                        'scenename': scenename,
                        'description': description,
                        'caselibid': caselibid,
                        'exeStrategyTestcase': '',
                        'exeStrategyTestcaseaction': '',
                        'errStrategy': ''
                    },
                    success: function(data) {
                        console.log(data);
                        if (data.success) {
                            $('#successModal').modal();
                            self.queryExecutionRecord(self.currentPage, self.pageSize, self.order, self.sort);
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
        getRecord: function (id,testPlanId) {
            sessionStorage.setItem("batchId", id);
            sessionStorage.setItem("batchShow", true);
            sessionStorage.setItem("testPlanId", testPlanId);
            sessionStorage.setItem("isFromRecordSheet",true);     //判断是不是从批量执行页面跳转过去
            location.href = "testRecord.html";
        },
        //传递当前页选中的场景id到场景管理页面
        toSceneManagement: function(e) {
            var sceneid = $(e.target).parent().prev().prev().prev().children().attr('id'),
                scenename = $(e.target).parent().prev().prev().html();
            location.href = "scene-setting.html?sceneid=" + sceneid + "&" + "scenename=" + scenename;
        },
        //查询执行记录
        queryExecutionRecord: function(page, listnum, order, sort){ //一般查询记录的函数，与组件的区分开
            var _this=this;
            var today = new Date();
            var endTime = ''+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
            var startTime = '1990-1-1';
            let tempDate = _this.creatTimeChange(startTime,endTime);
            startTime = tempDate[0];
            endTime = tempDate[1];
            $.ajax({
                url: address3 + 'batchRunCtrlController/pagedBatchQueryBatchRunCtrl',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'testPlanId': '',
                    'caseSourceChannel': '',
                    'runStatus': '', 
                    'pageSize': listnum,
                    'currentPage': page,
                    'queryStartTime': startTime,
                    'queryEndTime': endTime,
                }),
                success: function(data) {
                    if (data.respCode === '0000') {
                        _this.sceneList = data.batchRunCtrlList;
                        _this.tt = data.totalCount;
                        _this.totalPage = data.totalPage;
                        _this.page.totalCount=data.totalCount;
                        _this.page.totalPage=data.totalPage;
                    } else {
                        _this.sceneList = [];
                        _this.tt = 0;
                        _this.totalPage = 0;
                        _this.pageSize = 5;
                    }
                }
            });
        },
        getExecutionRecord(page) {  //使用翻页组件时，调用的函数
            var _this=this;
            var pageSize = page?page.pageSize:this.page.pageSize,
                currentPage = page?page.currentPage:this.page.currentPage;
            if(page){   //此处使page中的currentPage值发生改变，从而触发翻页控件中的事件发生,使当前页改变
                _this.page.currentPage = page.currentPage;
                _this.page.pageSize = page.pageSize;
            } else{
                _this.page.currentPage = 1;
                _this.page.pageSize = _this.page.pageSize;
            }
            let originalData = _this.creatTimeInit();   //得到时间段
            var startTime = originalData[0];
            var endTime = originalData[1];
            let tempDate = _this.creatTimeChange(startTime,endTime);
            startTime = tempDate[0];
            endTime = tempDate[1];
            $.ajax({
                url: address3 + 'batchRunCtrlController/pagedBatchQueryBatchRunCtrl',
                type: 'post',
                contentType: 'application/json',
				data: JSON.stringify({
                    'testPlanId': + _this.testPlanId,
                    'caseSourceChannel': '',
                    'runStatus': + _this.runStatus,     //执行状态
                    "pageSize":pageSize,
                    "currentPage":currentPage,
                    'queryStartTime': startTime,
                    'queryEndTime': endTime,              
                }),
				success: (data) => {
					if ('0000' === data.respCode) {
                        _this.sceneList = data.batchRunCtrlList;
                        _this.page.totalCount=data.totalCount;
                        _this.page.totalPage=data.totalPage;
                        // _this.page.currentPage = 1;
					} else {
						Vac.alert('出错啦~');
					}
				},
				error: () => {
					Vac.alert('出错啦~');
				}
			});
        },
        //改变页面大小
        changeListNum: function(){
            var _this=this;
            $('#mySelect').change(function() {           
                _this.listnum = $(this).children('option:selected').val();
                $("#mySelect").find("option[text='" + _this.listnum + "']").attr("selected", true);
                app.currentPage=1;
                _this.queryExecutionRecord(1, _this.listnum, 'id', 'asc');    
            });
        },

        goTestExec: function(testPlan){
            sessionStorage.setItem('testPlanId',testPlan);
            location.href="./testplan-execute.html";
        },
        queryTestPlan: function(){
            var _this = this;
            $.ajax({
                url: address3 + 'testPlanController/selectAllTestPlan',
                type: 'post',
                contentType: 'application/json',
                data:JSON.stringify({
                   
                }),
                success: function(data){
                    if (data.respCode === '0000') {
						if (data.testPlanEntityList && (data.testPlanEntityList.length>0)) {
                            _this.testPlans = data.testPlanEntityList;
                            // _this.testPlanId = data.testPlanEntityList[0].id;
                        }
                    }
                }
            });
        },
        creatTimeChange: function(startTime,endTime){
            startTime = startTime + ' 00:00:00';
            endTime = endTime + ' 23:59:59';
            var startTimeObj = new Date(startTime.replace(/-/g,'/'));
            var endTimeObj = new Date(endTime.replace(/-/g,'/'));
            var timeList = [startTimeObj.getTime(),endTimeObj.getTime()];
            if(timeList[0]>timeList[1]){
                Vac.alert('日期格式错误，请重新输入');
            }
            return timeList;
        },
        creatTimeInit: function(){      //初始化查询所需要的如期段
            var _this = this;
            var today = new Date();                             //得到今天的日期值
            var yestday = new Date(today - 24*3600*1000);       //得到昨天的日期值
            var lastweek = new Date(today - 7*24*3600*1000);    //得到上周的日期值
            var lastmonth = new Date();
            var retDate=[];                                 //存储返回的日期值，0-开始日期，1-结束日期
            lastmonth.setMonth(lastmonth.getMonth()-1);     //得到上一个月的日期值
            
            if(_this.period_flag==="0"){         //默认值
                retDate[0] = '1990-1-1';
                retDate[1] = ''+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
            } else if(_this.period_flag==="1"){ //一天内
                retDate[0] = ''+ yestday.getFullYear()+'-'+(yestday.getMonth()+1)+'-'+yestday.getDate();
                retDate[1] = ''+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
                _this.creatTimeStart = retDate[0];
                _this.creatTimeEnd =retDate[1];
            } else if(_this.period_flag==="2"){ //一周内
                retDate[0] = ''+ lastweek.getFullYear()+'-'+(lastweek.getMonth()+1)+'-'+(lastweek.getDate());
                retDate[1] = ''+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
                _this.creatTimeStart = retDate[0];
                _this.creatTimeEnd =retDate[1];
            } else if(_this.period_flag==="3"){ //一个月内
                retDate[0] = ''+ lastmonth.getFullYear()+'-'+(lastmonth.getMonth()+1)+'-'+(lastmonth.getDate());
                retDate[1] = ''+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
                _this.creatTimeStart = retDate[0];
                _this.creatTimeEnd =retDate[1];
            } 
            if(_this.creatTimeStart==="" || _this.creatTimeEnd===""){     //如果初试的时间框没有选择的话，就还是查询全部记录
                retDate[0] = '1990-1-1';
                retDate[1] = ''+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
            } else{                                                       //如果初始的时间框选择的话，那就查询时间段内的记录          
                retDate[0] = _this.creatTimeStart;
                retDate[1] = _this.creatTimeEnd;
            }
            return retDate;
        },
        queryBatchByClick: function(){
            var _this = this;
            // _this.page.currentPage = 1;
            _this.getExecutionRecord();
        }

    },
});




// 获取场景
function queryExecutionRecord(page, listnum, order, sort) {
    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: address2 + 'batchRunCtrlController/pagedBatchQueryBatchRunCtrl',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'currentpage': page,
            'pagesize': listnum
        }),
        success: function(data) {
            if (data.respCode === '0000') {
                app.sceneList = data.batchRunCtrlEntities;
                app.tt = data.batchRunCtrlEntities[0] ?  data.batchRunCtrlEntities[0].page.totalCount : 0;
                app.totalPage = data.batchRunCtrlEntities[0] ?  data.batchRunCtrlEntities[0].page.totalPage : 0;
                app.pageSize = data.batchRunCtrlEntities[0] ?  data.batchRunCtrlEntities[0].page.pageSize : 0;
            } else {
                app.sceneList = [];
                app.tt = 0;
                app.totalPage = 0;
                app.pageSize = 5;
            }
        }
    });
}

//获取案例
function getCase(currentPage, listnum, order, sort) {
    $.ajax({
        url: address + 'TestcaseController/selectAllByPage',
        type: 'GET',
        data: {
            'page': currentPage,
            'rows': listnum,
            'order': order,
            'sort': sort
        },
        success: function(data) {
            // console.info(data);
            // console.info(data.o.rows);
            app.caseList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / listnum);
            app.pageSize = listnum;
        }
    });
}

// //改变页面大小
// function changeListNum() {
//     var _this=this;
//     $('#mySelect').change(function() {
//         console.log('Am I here 1?');
//         listnum = $(this).children('option:selected').val();
//         $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
//         app.currentPage=1;
//         _this.queryExecutionRecord(1, listnum, 'id', 'asc');
//         console.log('Am I here 2?');
//     });
// }

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});

//重新排序
function resort(target) {
    var spans = target.parentNode.getElementsByTagName("span");
    for (var span in spans) {
        if (spans[span].nodeName === "SPAN") {
            spans[span].setAttribute("class", "");
        }
    }
    if (target.getAttribute("data-sort") === "desc") {
        app.sort = "asc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up")
        target.setAttribute("data-sort", "asc");
    } else {
        app.sort = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down")
        target.setAttribute("data-sort", "desc");
    }
    app.order = target.getAttribute("data-order");
    queryExecutionRecord(1, 20, app.order, app.sort);
}
//重新排序 结束

//搜索场景
function queryScene() {
    $.ajax({
        url: address + 'sceneController/selectByPrimaryKey',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'id': app.querySceneId
        },
        success: function(data) {
            app.sceneList = data.rows;
            console.log(app.sceneList);
            app.tt = data.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        }
    });
}
//创建时间的开始
$('.form_date_start').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});
//创建时间的结束
$('.form_date_end').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});



