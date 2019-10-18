const initialAddRowData = {
    nameMedium: '',
    descMedium: '',
    testPhaseId: '',
    testRoundId: ''
};
var app = new Vue({
    el: '#v-testProject',
    data: {
        testProjectList: [],
        apiUrl: '',
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 5, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        queryContent: '',
        ids: '',
        //当前选中行
        selectedId: '',
        selectedTestProjectCode: '',
        selectedTestProjectName: '',
        selectedTaskDescription: '',
        projectName: sessionStorage.getItem("projectNameStorage"),
        addRowData: { ...initialAddRowData },
        caseLibId:null,
        projectNameStorage: null,
        
        
    },
    ready: function() {
        this.getTestProject(this.currentPage, this.pageSize, this.order, this.sort);
        changeListNum();

        // if(projectName==null){
        //     projectName = '';
        // }

        $('.3').addClass('open')
        $('.3 .arrow').addClass('open')
        $('.3-ul').css({display: 'block'})
        $('.3-1').css({color: '#ff6c60'})
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
        //传入参数pageNum为要跳转的页数
        turnToPage(pageNum) {
            var ts = this;
            pageNum = parseInt(pageNum);
            if(pageNum=="-42"){
                sessionStorage.setItem("caselibId", "-42");
                location.href = "caseManagement.html";
            }
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
            ts.getTestProject(ts.currentPage, ts.pageSize, 'id', 'asc');
        },

        //添加测试项目
        insert: function() {
            let testProjectCode=$('#insertForm input[name="codeLong"]').val();
            let testProjectName=$('#insertForm input[name="nameMedium"]').val();
            let taskDescription=$('#insertForm textarea[name="descMedium"]').val();
            testProjectCode = testProjectCode==""?"测试项目"+new Date().valueOf():testProjectCode;
            taskDescription = taskDescription==""?"空":taskDescription;
            if( testProjectName==''){
                Vac.alert("名称为必填项");
            }else{
                $.ajax({
                    url: address3 + 'testProjectController/addSingleTestProject',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        codeLong: testProjectCode,
                        nameMedium: testProjectName,
                        descMedium:  taskDescription 
                    }),
                    success: function(data) {
                        // console.info(data);
                        if (data.respCode=='0000') {
                            sessionStorage.setItem("caselibId",data.caselibId)
                            app.caselibId = data.caselibId
                            app.projectNameStorage = data.projectNameStorage
                            app.getTestProject(app.currentPage, app.pageSize, 'id', 'asc');
                            initialAddRowData.caseLibId = String(data.caseLibId);
                            initialAddRowData.creatorId = sessionStorage.getItem('userId');
                            initialAddRowData.nameMedium = $('#insertForm input[name="nameMedium"]').val();
                            initialAddRowData.descMedium = $('#insertForm textarea[name="descMedium"]').val();
                            initialAddRowData.testPhaseId = 3;
                            initialAddRowData.testRoundId=11;
                            this.addRowData =  {...initialAddRowData};
                            console.log(this.addRowData);
                            $.ajax({
                                    url: address3 + 'testPlanController/insertTestPlan',
                                    type: 'post',
                                    contentType: 'application/json',
                                    data: JSON.stringify(this.addRowData) ,
                                    success: function(data) {
                                      if ('0000' === data.respCode) {
                                        // Vac.alert(data.respMsg);
                                        this.addRowData = {...initialAddRowData};
                                      } else {
                                         Vac.alert(data.respMsg);
                                      }
                                    },
                                error: function() {
                                Vac.alert('出错啦~7');
                                }
                        }),
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
            var _this = this;
            _this.getIds();
            console.log(app.ids)
            $.ajax({
                url: address3 + '/testProjectController/disableSingleTestProject',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'id': app.ids
                }),
                success: function(data) {
                    // console.info(data);
                    if (data.respCode=='0000') {
                        _this.getTestProject(app.currentPage, app.pageSize, 'id', 'asc');
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
            var _this=this
            var selectedInput = $('input[name="chk_list"]:checked');
            var id = selectedInput.attr('id');
            $.ajax({
                url: address3 + 'testProjectController/modifySingleTestProject',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                        id: id,
                        codeLong: $('#updateForm input[name="codeLong"]').val(),
                        nameMedium: $('#updateForm input[name="nameMedium"]').val(),
                        descMedium: $('#updateForm textarea[name="descMedium"]').val()
                    }),
                success: function(data) {
                    // console.info(data);
                    if (data.respCode=='0000') {
                        _this.getTestProject(app.currentPage, app.pageSize, 'id', 'asc');
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
            $('#updateForm input[name="codeLong"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="nameMedium"]').val(selectedInput.parent().next().next().html());
            $('#updateForm textarea[name="descMedium"]').val(selectedInput.parent().next().next().next().html());
        },
        //点击行选中该行
        tableClick:function(trId){
                var tbId='#'+trId+' input';
                if(!$(tbId).attr('checked')){
                    $(tbId).prop("checked",true);
                }
                else {
                    $(tbId).prop("checked",false);
                }

        },
        //进入
        to: function(id,caseLibId,name) {
            var selectedInput;
            var caseLibId;
            var projectNameStorage;
            if(id){       //id不为空，则是点击项目编号进入(写id!=null,此处应写id，因为id应该是undefined)
                selectedInput = id;
                caseLibId = caseLibId;
                projectNameStorage = name;
            }
            else{   //id为空，则是选中radio后，点击“进入”，进入项目
                selectedInput = $('input[name="chk_list"]:checked');    //找到被选中的哪个元素
            }
            if (selectedInput.length === 0) {   //什么都没选，所以长度为0，直接点进入，弹出信息提示框
                $('#selectAlertModal').modal();
            } else {                //选中radio之后，长度不为0，点击进入之后，进入项目
                if(!caseLibId){     //如果caseLibId为空的话，就查找元素从页面中找到caseLibId的值
                    caseLibId = selectedInput.parent().next().next().next().next().html();
                    projectNameStorage = selectedInput.parent().next().next().html();
                }
                sessionStorage.setItem("caselibId", caseLibId);     //存储测试项目id到sessionstorage
                sessionStorage.setItem("projectNameStorage", "("+projectNameStorage+")" );    //把项目名称存入缓存中
                location.href = "caseManagement.html";
            }
        },
        linkToCase(){
            var _this =this;
            if(_this.caseLibId == null){
                Vac.alert("添加接口缺少caseLibId和项目名称两个字段，请后端同学添加")
                return
            }
            sessionStorage.setItem("caselibId", _this.caseLibId);     //存储测试项目id到sessionstorage
            sessionStorage.setItem("projectNameStorage", "("+_this.projectNameStorage+")" );    //把项目名称存入缓存中
            location.href = "caseManagement.html";
        },
        //时间格式化
        formatDate(date){
            if(date){
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y+M+D+h+m+s;
            }else{
                return '';
            }
        },
        getTestProject(page, listnum, order, sort) {
           var _this = this;
           if(searchFlag){
               queryTestProject();
           } else{
               //获取list通用方法，只需要传入多个所需参数
               $.ajax({
                   url: address3 + 'testProjectController/pagedBatchQueryTestProject',
                   type: 'post',
                   contentType: 'application/json',
                   data: JSON.stringify({
                       'currentPage': page,
                       'pageSize': listnum,
                       'orderColumns': "modified_time",
                       "orderType":"DESC",
                   }),
                   success: function(data) {
                       // console.info(data);
                       _this.testProjectList = data.list;
                       _this.tt = data.totalCount;
                       _this.totalPage = Math.ceil(_this.tt / listnum);
                       _this.pageSize = listnum;
                   }
               });
           }
       }
    },


});

var searchFlag = false;   //是否点击搜索的标志

//获取系统
/*
function getTestProject(page, listnum, order, sort) {
    var _this = app;
    if(searchFlag){
        queryTestProject();
    } else{
        //获取list通用方法，只需要传入多个所需参数
        $.ajax({
            url: address3 + 'testProjectController/pagedBatchQueryTestProject',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                'currentPage': page,
                'pageSize': listnum,
                'orderColumns': "modified_time",
                "orderType":"DESC",
            }),
            success: function(data) {
                // console.info(data);
                _this.testProjectList = data.list;
                _this.tt = data.totalCount;
                _this.totalPage = Math.ceil(_this.tt / listnum);
                _this.pageSize = listnum;
            }
        });
    }


}*/

//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
        app.currentPage = 1;
        app.getTestProject('1', listnum, 'id', 'asc');
    })
}

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
    getAut(1, 10, app.order, app.sort);
}
//重新排序 结束

//根据编号搜索系统
function queryTestProject() {

    searchFlag = true;          //如果是点击了搜索按钮，则下次查询的时候保持搜索的条件进行查询
    if(arguments[0]==='1'){     //在页面中点击搜索按钮，传入参数'1'
        app.currentPage = 1;    //将当前页面设置为1
    }
    $.ajax({
        url: address3 + 'testProjectController/pagedBatchQueryTestProject',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'currentPage': app.currentPage,
            'pageSize': app.pageSize,
            'orderColumns': 'id',
            'orderType': 'asc',
            'codeLongAndName': app.queryContent
        }),
        success: function(data) {
            app.testProjectList = data.list;
            app.tt = data.totalCount;
            app.totalPage = Math.ceil(app.tt / app.listnum);
        }
    });
}