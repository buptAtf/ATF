var app = new Vue({
    el: '#v-autdata',
    data: {
        autId: '',
        autName: '',
        autdataList: [],
        autdataListLength: 0,
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        ids: []
    },
    ready: function() {
        this.getAutId();
        this.getautdata();
        changeListNum();
    },
    methods: {
        //获取autid autname
        getAutId() {
            // var thisURL = document.URL,
            //     getval = thisURL.split('?')[1],
            //     keyval = getval.split('&');
            // this.autId = keyval[0].split('=')[1];
            // this.autName = decodeURI(keyval[1].split('=')[1]);
            this.autId=sessionStorage.getItem("autId");
            this.autName=sessionStorage.getItem("autName");
        },
        getautdata() {
            $.ajax({
                url: address3 + 'dataPool/pagedBatchQueryDataPool',
                type: 'post',contentType: 'application/json',
                data: JSON.stringify({
                    'poolName': '被测系统数据池',
                    'poolObjId': this.autId,
                    'dataName': '',
                    'pageSize': 10,
                    'currentPage': 1,
                    'orderType': '',
                    'orderColumns':'',
                }),
                success: function(data) {
                    if (data.respCode == 0000) {
                        console.log(data.list);
                        app.autdataList = data.list;
                        app.autdataListLength = data.list.length;
                    }
                }
            });
        },
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            // $('input[name="ids"]').val(id_array.join(','));
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
            getautdata(ts.currentPage, ts.pageSize, 'id', 'asc');
        },
        //添加
        insert: function() {
            $('#insertForm input[name="autid"]').val($('#autSelect').val()),
                $.ajax({
                    url: address3 + 'dataPool/addSingleDataPool',
                    type: 'post',contentType: 'application/json',
                    data: JSON.stringify({
                        'poolName': '被测系统数据池',
                        'poolObjId': this.autId,
                        'dataName': $("#dataname").val(),
                        'dataValue':$("#datavalue").val(),
                        'dataDesc':$("#datadesc").val(),
                    }),
                    success: function(data) {
                        if (data.respCode == 0000) {
                            $('#successModal').modal();
                            getautdata();
                        } else {
                            $('#failModal').modal();
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
        },
        //删除
        checkDel: () => {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#deleteModal').modal();
            }
        },
        del: function() {
            $.ajax({
                url: address3 + 'dataPool/deleteSingleDataPool',
                type: 'post',contentType: 'application/json',
                data: JSON.stringify({
                    'id': app.ids
                }),
                success: function(data) {
                    console.info(data);
                    if (!data.success) {
                        $('#successModal').modal();
                        getautdata();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //修改功能点
        checkUpdate: () => {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                app.getSelected();
                $('#updateModal').modal();
            }
        },
        update: function() {
                $.ajax({
                    url: address3 + 'dataPool/modifySingleDataPool',
                    type: 'post',contentType: 'application/json',
                    data: JSON.stringify({
                        'id':app.ids,
                        'poolName': '被测系统数据池',
                        'dataName': $("#dataupname").val(),
                        'dataValue':$("#dataupvalue").val(),
                        'dataDesc':$("#dataupdesc").val(),
                    }),
                    success: function(data) {
                        console.info(data);
                        if (!data.success) {
                            $('#successModal').modal();
                            getautdata();
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
            $('#updateForm input[name="id"]').val(selectedId);
            $('#updateForm input[name="dataname"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="datavalue"]').val(selectedInput.parent().next().next().html());
            $('#updateForm textarea[name="datadesc"]').val(selectedInput.parent().next().next().next().html());
        },

    },

});

//获取autid autname
function getAutId() {
    // var thisURL = document.URL,
    //     getval = thisURL.split('?')[1],
    //     keyval = getval.split('&');
    // app.autId = keyval[0].split('=')[1];
    // app.autName = keyval[1].split('=')[1];
    // console.log(app.autId)
    app.autId=sessionStorage.getItem("autId");
    app.autName=sessionStorage.getItem("autName");
}

function getautdata() {
    $.ajax({
        url: address3 + 'dataPool/pagedBatchQueryDataPool',
        type: 'post',contentType: 'application/json',
        data: JSON.stringify({
            'poolName': '被测系统数据池',
            'poolObjId': app.autId,
            'pageSize': 10,
            'currentPage': 1,
            'orderType': '',
            'orderColumns':'',
            'dataName': $("#dataname").val(),
            'dataValue':$("#datavalue").val(),
            'dataDesc':$("#datadesc").val(),
        }),
        success: function(data) {
            console.log(data.list);
            app.autdataList = data.list;
            app.totalCount=data.totalCount;
        }
    });
}

//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        app.listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + app.listnum + "']").attr("selected", true);
        app.currentPage=1;
        queryautdata();
    });
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
    getautdata(1, 10, app.order, app.sort);
}
//重新排序 结束
