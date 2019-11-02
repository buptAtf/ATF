var app = new Vue({
    el: '#caseManagement',
    data : {
        exportUrl:address3+'testcase/exportTestCase',
        importUrl:address3+'testcase/batchImportTestcase',
        ids:[],
        subids:[],
        isShow: false,
        caseshow: true,
        flowcaseshow: true,
        iconflag: true,
        caseflag: true,
        flowcaseflag: true,
        caseNodeNum: 1,
        caseNodeNums: [{num:1,status:true,show:true,name:"boundGroup1",display:false}],
        caseList: [], //用例
        users: [], //所有用户
        priority: [], // 优先级
        executeMethod: [], // 执行方式
        caseCompositeType: [], // 用例组成类型
        useStatus: [], // 用例状态
        missionList: [], //测试任务
        testpoint: '', // 测试点
        currentUserId: sessionStorage.getItem('userId'),//当前登录用户id
        author: false, //编写者
        executor: false, //执行者
        testDesign: '', //测试意图
        autid: '', //被测系统
        transid: '', //功能码
        scriptmodeflag: '', //脚本模板
        casecode: '', //搜索时输入的用例编号
        sortparam: '', //排序参数
        tt: 0, //总条数
        pageSize: 5, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
      //  listnum: 5, //页面大小
        queryflag:true,//判断当前页面数据拉取方式，用于turnToPage
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        subCaseList: [], //流程节点
        caselibid: sessionStorage.getItem('caselibId'), //用例库id
        userId:sessionStorage.getItem('userId'),
        failMSG:"操作失败啦",
        projectName: sessionStorage.getItem('projectNameStorage'),
        loadingFlag:true // 用于是否加载完成
    },
    ready: function() {
        console.log(sessionStorage.getItem("userId"));
        this.getCase(this.currentPage, this.pageSize, this.order, this.sort);
        this.getUsers();
        this.getCaseLibId();
        this.getMission(); //获取用例添加表单任务编号下拉列表
        this.groupBound("");
        $(".myFileUpload").change(function() {
            var arrs = $(this).val().split('\\');
            var filename = arrs[arrs.length - 1];
            $(".show").val(filename);
        });
        $('.3').addClass('open');
        $('.3 .arrow').addClass('open');
        $('.3-ul').css({display: 'block'});
        $('.3-2').css({color: '#ff6c60'});
        // 删除筛选条件
        $('.filterList').delegate('button.btn-danger','click',function(){
            $(event.target).closest('li').remove();
        });


        //筛选用例select option
        let that=this;
        $('.filterList').delegate('select[name="propertyName"]', 'change', function() {
            let selectedProp=$(event.target).val();
            let flag=$(event.target).attr("id")=="propertyName1"?true:false;
            if(selectedProp=='caseCompositeType'){
                // compare select
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="cctVal1" class="selectpicker val_select"></select>')
                    $('#cctVal1').append('<option value="1">单用例</option><option value="2">流程用例</option>');
                    $('#cctVal1').selectpicker('refresh');  
                }
                else{
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select" multiple></select>');
                            $('#cctVal').append('<option value="1">单用例</option><option value="2">流程用例</option>');
                            $('#cctVal').selectpicker('refresh');
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select"></select>')
                            $('#cctVal').append('<option value="1">单用例</option><option value="2">流程用例</option>');
                            $('#cctVal').selectpicker('refresh');                    
                        }
                    });
                }
            }else if(selectedProp=='casecode'){
                // compare select
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh'); 
                }
                else{
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<input type="text" class="form-control val_select">');
                            $(this).parent().next().next().selectpicker('refresh');  
                    });
                }
            }else if(selectedProp=='priority'){
                // compare select
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="priorityVal" class="selectpicker val_select"></select>');
                    $('#priorityVal').append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                    $('#priorityVal').selectpicker('refresh');     
                }
                else{
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="priorityVal" class="selectpicker val_select" multiple></select>');
                            $('#priorityVal').append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                            $('#priorityVal').selectpicker('refresh');
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="priorityVal" class="selectpicker val_select"></select>');
                            $('#priorityVal').append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                            $('#priorityVal').selectpicker('refresh');                    
                        }
                    });
                }
            }else if(selectedProp=='executeMethod'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="propertyVal" class="selectpicker val_select"></select>');
                    $('#propertyVal').append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                    $('#propertyVal').selectpicker('refresh');   
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="propertyVal" class="selectpicker val_select" multiple></select>');
                            $('#propertyVal').append('<option value="1">手工</option><option value="2">自动化</option><option value="3">配合</option>');
                            $('#propertyVal').selectpicker('refresh');
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="propertyVal" class="selectpicker val_select"></select>');
                            $('#propertyVal').append('<option value="1">手工</option><option value="2">自动化</option><option value="3">配合</option>');
                            $('#propertyVal').selectpicker('refresh');                    
                        }
                    }); 
                }           
            }else if(selectedProp=='missionId'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true"></select>')
                    $.ajax({
                        url: address3+"missionController/selectMission",
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "caseLibId": sessionStorage.getItem('caselibId')
                        }),
                        success:function(data){
                            if(data.respCode==0000){
                                let submissionList=data.missionEntityList;
                                for(let item of submissionList){
                                    $('#missVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                }
                                $('#missVal').selectpicker('refresh');
                            }
                        }
                    }); 
                }
                else{
                // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true" multiple></select>')
                            $.ajax({
                                url: address3+"missionController/selectMission",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "caseLibId": sessionStorage.getItem('caselibId')
                                }),
                                success:function(data){
                                    if(data.respCode==0000){
                                        let submissionList=data.missionEntityList;
                                        for(let item of submissionList){
                                            $('#missVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                        }
                                        $('#missVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true"></select>')
                            $.ajax({
                                url: address3+"missionController/selectMission",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "caseLibId": sessionStorage.getItem('caselibId')
                                }),
                                success:function(data){
                                    if(data.respCode==0000){
                                        let submissionList=data.missionEntityList;
                                        for(let item of submissionList){
                                            $('#missVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                        }
                                        $('#missVal').selectpicker('refresh');
                                    }
                                }
                            });                  
                        }
                    }); 
                }
            }else if(selectedProp=='autId'){
                // compare select
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="autVal" class="selectpicker val_select" data-live-search="true"></select>')
                    $.ajax({
                        url: address3+"/aut/queryListAut",
                        type: 'get',
                        success:function(data){
                            // console.log(data)
                            if(data.respCode=='0000'){
                                let autList=data.autRespDTOList;
                                for(let item of autList){
                                    $('#autVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                }
                                $('#autVal').selectpicker('refresh');
                            }
                        }
                    });
                }
                else{
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="autVal" class="selectpicker val_select" data-live-search="true" multiple></select>')
                            $.ajax({
                                url: address3+"/aut/queryListAut",
                                type: 'get',
                                success:function(data){
                                    // console.log(data)
                                    if(data.respCode=='0000'){
                                        let autList=data.autRespDTOList;
                                        for(let item of autList){
                                            $('#autVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                        }
                                        $('#autVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="autVal" class="selectpicker val_select" data-live-search="true"></select>')
                            $.ajax({
                                url: address3+"/aut/queryListAut",
                                type: 'get',
                                success:function(data){
                                    // console.log(data)
                                    if(data.respCode=='0000'){
                                        let autList=data.autRespDTOList;
                                        for(let item of autList){
                                            $('#autVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                        }
                                        $('#autVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }
                    });
                }
            }
            // else if(selectedProp=='transId'){
            //     // compare select
            //     $(event.target).parent().next().children('select').children().remove();
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     let target=$(event.target);
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='contain'||$(this).val()=='without'){
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             target.parent().next().next().next().children('select').append(`<option value=""></option>`);
            //                         }
            //                         target.parent().next().next().next().children('select').selectpicker('refresh');

            //                     }
            //                 }
            //             });
            //             $(this).parent().next().next().selectpicker('refresh');
            //         }else{
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             target.parent().next().next().next().children('select').append(`<option value=""></option>`);
            //                         }
            //                         target.parent().next().next().next().children('select').selectpicker('refresh');

            //                     }
            //                 }
            //             });
            //             $(this).parent().next().next().selectpicker('refresh');                    
            //         }
            //     });  
            // }
            else if(selectedProp=='caseProperty'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select"></select>')
                    $('#cpVal').append('<option value="1">正常值</option><option value="2">错误值</option><option value="3">边界值</option><option value="4>要素级</option><option value="5">流程级</option>');
                    $('#cpVal').selectpicker('refresh');
                }
                // compare select
                else{
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select" multiple></select>')
                            $(this).parent().next().next().append('<option value="1">正常值</option><option value="2">错误值</option><option value="3">边界值</option><option value="4">要素级</option><option value="5">流程级</option>');
                            $(this).parent().next().next().selectpicker('refresh');
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select"></select>')
                            $('#cpVal').append('<option value="1">正常值</option><option value="2">错误值</option><option value="3">边界值</option><option value="4>要素级</option><option value="5">流程级</option>');
                            $('#cpVal').selectpicker('refresh');                    
                        }
                    });
                }
            }else if(selectedProp=='caseType'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="ctVal" class="selectpicker val_select"></select>');
                    $('#ctVal').append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                    $('#ctVal').selectpicker('refresh');    
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="ctVal" class="selectpicker val_select" multiple></select>');
                            $('#ctVal').append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                            $('#ctVal').selectpicker('refresh');
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="ctVal" class="selectpicker val_select"></select>');
                            $('#ctVal').append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                            $('#ctVal').selectpicker('refresh');                    
                        }
                    });
                }
            }else if(selectedProp=='author'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="authorVal" class="selectpicker val_select" data-live-search="true"></select>')
                    $.ajax({
                        url: address3+"userController/selectAllUsername",
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success:function(data){
                            if(data.respCode=='0000'){
                                let userList=data.list;
                                for(let item of userList){
                                    $('#authorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                }
                                $('#authorVal').selectpicker('refresh');
                            }
                        }
                    });  
                }
                else{
                // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="authorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                            $.ajax({
                                url: address3+"userController/selectAllUsername",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    
                                }),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let userList=data.list;
                                        for(let item of userList){
                                            $('#authorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                        }
                                        $('#authorVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="authorVal" class="selectpicker val_select" data-live-search="true"></select>')
                            $.ajax({
                                url: address3+"userController/selectAllUsername",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({}),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let userList=data.list;
                                        for(let item of userList){
                                            $('#authorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                        }
                                        $('#authorVal').selectpicker('refresh');
                                    }
                                }
                            });                  
                        }
                    });  
                }
            }else if(selectedProp=='reviewer'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="reviewerVal" class="selectpicker val_select" data-live-search="true"></select>')
                    $.ajax({
                        url: address3+"userController/selectAllUsername",
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success:function(data){
                            if(data.respCode=='0000'){
                                let userList=data.list;
                                for(let item of userList){
                                    $('#reviewerVal').append(`<option value="${item.id}">${item.username}</option>`);
                                }
                                $('#reviewerVal').selectpicker('refresh');
                            }
                        }
                    });
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    let target=$(event.target);
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="reviewerVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                            $.ajax({
                                url: address3+"userController/selectAllUsername",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({}),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let userList=data.list;
                                        for(let item of userList){
                                            $('#reviewerVal').append(`<option value="${item.id}">${item.username}</option>`);
                                        }
                                        $('#reviewerVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="reviewerVal" class="selectpicker val_select" data-live-search="true"></select>')
                            $.ajax({
                                url: address3+"userController/selectAllUsername",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({}),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let userList=data.list;
                                        for(let item of userList){
                                            $('#reviewerVal').append(`<option value="${item.id}">${item.username}</option>`);
                                        }
                                        $('#reviewerVal').selectpicker('refresh');
                                    }
                                }
                            });                  
                        }
                    });   
                }
            }else if(selectedProp=='executor'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true"></select>')
                    $.ajax({
                        url: address3+"userController/selectAllUsername",
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success:function(data){
                            if(data.respCode=='0000'){
                                let userList=data.list;
                                for(let item of userList){
                                    $('#executorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                }
                                $('#executorVal').selectpicker('refresh');
                            }
                        }
                    });
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                            $.ajax({
                                url: address3+"userController/selectAllUsername",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({}),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let userList=data.list;
                                        for(let item of userList){
                                            $('#executorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                        }
                                        $('#executorVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true"></select>')
                            $.ajax({
                                url: address3+"userController/selectAllUsername",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({}),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let userList=data.list;
                                        for(let item of userList){
                                            $('#executorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                        }
                                        $('#executorVal').selectpicker('refresh');
                                    }
                                }
                            });                  
                        }
                    });  
                }
            }else if(selectedProp=='scriptMode'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="scriptModeVal" class="selectpicker val_select"></select>');
                    $('#scriptModeVal').append('<option value="1">模板</option><option value="2">自由编写</option>');
                    $('#scriptModeVal').selectpicker('refresh');    
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="scriptModeVal" class="selectpicker val_select" multiple></select>');
                            $('#scriptModeVal').append('<option value="1">模板</option><option value="2">自由编写</option>');
                            $('#scriptModeVal').selectpicker('refresh');
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="scriptModeVal" class="selectpicker val_select"></select>');
                            $('#scriptModeVal').append('<option value="1">模板</option><option value="2">自由编写</option>');
                            $('#scriptModeVal').selectpicker('refresh');                    
                        }
                    });               
                }
            }
            // else if(selectedProp=='scriptModeFlag'){
            //     // compare select
            //     $(event.target).parent().next().children('select').children().remove();
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='in'||$(this).val()=='!in'){
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="smfVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#smfVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#smfVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });
            //         }else{
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="smfVal" class="selectpicker val_select" data-live-search="true"></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#smfVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#smfVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });                  
            //         }
            //     });  
            // }
            // else if(selectedProp=='testpoint'){
            //     // compare select
            //     $(event.target).parent().next().children('select').children().remove();
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option><option value="C">包含</option><option value="!C">不包含</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='in'||$(this).val()=='!in'){
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#executorVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#executorVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });
            //         }else{
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true"></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#executorVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#executorVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });                  
            //         }
            //     });
            // }
            else if(selectedProp=='testDesign'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh');  
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<input type="text" class="form-control val_select">');
                            $(this).parent().next().next().selectpicker('refresh');  
                    });  
                } 
            }else if(selectedProp=='preRequisites'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh');
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<input type="text" class="form-control val_select">');
                            $(this).parent().next().next().selectpicker('refresh');  
                    });   
                }
            }else if(selectedProp=='dataRequest'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh');
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                    });
                }
            }else if(selectedProp=='testStep'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh');
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                    });
                }
            }else if(selectedProp=='expectResult'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh');  
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                    });
                }
            }else if(selectedProp=='checkPoint'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<input type="text" class="form-control val_select">');
                    $(event.target).parent().next().next().selectpicker('refresh');  
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value input
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<input type="text" class="form-control val_select">');
                            $(this).parent().next().next().selectpicker('refresh');  
                    });
                }
            }else if(selectedProp=='sceneId'){
                if(flag){
                    $(event.target).parent().next().next().remove();
                    $(event.target).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true"></select>')
                    $.ajax({
                        url: address3+"sceneController/selectAllScene",
                        type: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "caseLibId" : sessionStorage.getItem('caselibId')
                        }),
                        success:function(data){
                            if(data.respCode=='0000'){
                                let sceneList=data.scenequeryDtoList;
                                for(let item of sceneList){
                                    $('#sceneVal').append(`<option value="${item.id}">${item.sceneName}</option>`);
                                }
                                $('#sceneVal').selectpicker('refresh');
                            }
                        }
                    });
                }
                else{
                    // compare select
                    $(event.target).parent().next().children('select').children().remove();
                    $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                    $(event.target).parent().next().children('select').selectpicker('refresh');
                    // value select
                    let compareSelect=$(event.target).parent().next().children('select');
                    $(compareSelect).on('change',function(){
                        if($(this).val()=='in'||$(this).val()=='!in'){
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                            $.ajax({
                                url: address3+"sceneController/selectAllScene",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "caseLibId" : sessionStorage.getItem('caselibId')
                                }),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let sceneList=data.scenequeryDtoList;
                                        for(let item of sceneList){
                                            $('#sceneVal').append(`<option value="${item.id}">${item.sceneName}</option>`);
                                        }
                                        $('#sceneVal').selectpicker('refresh');
                                    }
                                }
                            });
                        }else{
                            $(this).parent().next().next().remove();
                            $(this).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true"></select>')
                            $.ajax({
                                url: address3+"sceneController/selectAllScene",
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "caseLibId" : sessionStorage.getItem('caselibId')
                                }),
                                success:function(data){
                                    if(data.respCode=='0000'){
                                        let sceneList=data.scenequeryDtoList;
                                        for(let item of sceneList){
                                            $('#sceneVal').append(`<option value="${item.id}">${item.sceneName}</option>`);
                                        }
                                        $('#sceneVal').selectpicker('refresh');
                                    }
                                }
                            });                 
                        }
                    });
                }
            }
        });
        $(".loadingHidden").css('display','block')
        $(".loading").css('display','none')
    },
    created: function(){
        console.log(sessionStorage.getItem("userId"));
        this.executorSelected = sessionStorage.getItem("userId");
    },

    methods: {
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
        //获取用例
        getCase:function(currentPage, pageSize, order, sort) {
            var _this = this;
            let caseLibId=sessionStorage.getItem('caselibId');
            $.ajax({
                url: address3 + 'testcase/pagedBatchQueryTestCase',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'caseLibId': caseLibId,
                    'currentPage': currentPage,
                    'pageSize': pageSize,
                    'orderColumns': order,
                    'orderType': sort
                }),
                success: function(data) {
                    // console.log(data);
                    _this.caseList = data.testcaseViewRespDTOList;
                    console.log(_this.caseList);
                    _this.tt = data.totalCount;
                    _this.totalPage = Math.ceil(_this.tt / pageSize);
                    _this.pageSize = pageSize;
                    _this.queryflag = true;
                    $(".subShow").remove();;

                }
            });
        },  
        //下载模板
        downloadTemplate(val){
            if(val==0){
                let url = address3+"testcase/batchImport/file/template/simple";
                window.location.href = url;
            }
            else{
                let url =address3+"testcase/getStandardExcelTemporary";
                window.location.href = url;
            } 
        },
        // 执行方式数据处理
        convertExecMe(em){
            switch(em){
                case 1:
                    return '手工';
                    break;
                case 2:
                    return '自动化';
                    break;
                case 3:
                    return '配合';
                    break;
                default:
                    return '';
            }
        },
        // 优先级数据处理
        convertPri(em){
            switch(em){
                case 1:
                    return '1级';
                    break;
                case 2:
                    return '2级';
                    break;
                case 3:
                    return '3级';
                    break;
                case 4:
                    return '4级';
                    break;
                case 5:
                    return '5级';
                    break;
                case 6:
                    return '6级';
                    break;
                case 7:
                    return '7级';
                    break;
                case 8:
                    return '8级';
                    break;
                case 9:
                    return '9级';
                    break;
                default:
                    return '';
            }
        },
        // 用例类型数据处理
        convertCaseType(em){
            switch(em){
                case 1:
                    return '联机';
                    break;
                case 2:
                    return '批量';
                    break;
                case 3:
                    return '接口';
                    break;
                default:
                    return '';
            }
        },
        // 用例性质数据处理
        convertCasePro(em){
            switch(em){
                case 1:
                    return '正常值';
                    break;
                case 2:
                    return '错误值';
                    break;
                case 3:
                    return '边界值';
                    break;
                case 4:
                    return '要素级';
                    break;
                case 5:
                    return '流程级';
                    break;
                default:
                    return '';
            }
        },
        //获取用户
        getUsers:function() {
            var _this = this;
            $.ajax({
                url: address3+"userController/selectAllUsername",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function(data) {
                    _this.users = data.list;
                }
            });
        },
        //上传
        upload:function() {
                var _this=this;
                let caseLibId = sessionStorage.getItem('caselibId')
                    uploadUserId = sessionStorage.getItem('userId') 
                    formData = new FormData($('#importForm')[0]);
                formData.append('caseLibId', caseLibId);
                formData.append('uploadUserId', uploadUserId);
                $.ajax({
                    url: address3+'testcase/batchImportTestcase',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false, 
                    success: function(data) {                        
                        $('#importModal').modal('hide');
                        if (data.respCode==0000) {
                            $('#successModal1').modal('show');
                        } else {
                            _this.failMSG=data.respMsg;
                            $('#failModal2').modal('show');
                        }
                    }, error: function(data) { 
                        $('#importModal').modal('hide');
                        $('#failModal').modal('show');
                    }
                }) ;  
        },
        //添加用例
        insert: function() {
            var self = this;
            var insertForm=$('#insertForm div[class="tab-pane active"]');
            var casecompositetype = $(insertForm).find('input[name="casecompositetype"]').val(),
                caselibId=sessionStorage.getItem('caselibId'),
                casecode = $(insertForm).find('input[name="casecode"]').val(),
                autid = $(insertForm).find('select[name="autid"]').val(),
                versioncode = $(insertForm).find('input[name="versioncode"]').val(),
                transid = $(insertForm).find('select[name="transid"]').val(),
                scriptmodeflag = $(insertForm).find('select[name="scriptmodeflag"]').val(),
                testpoint = $(insertForm).find('input[name="testpoint"]').val(),
                testdesign  = $(insertForm).find('textarea[name="testDesign"]').val(),
                preRequisites = $(insertForm).find('textarea[name="preRequisites"]').val(),
                dataRequest = $(insertForm).find('textarea[name="dataRequest"]').val(),
                testStep = $(insertForm).find('textarea[name="testStep"]').val(),
                submissionId = $(insertForm).find('select[name="submissionId"]').val(),
                expectResult = $(insertForm).find('textarea[name="expectResult"]').val(),
                checkPoint = $(insertForm).find('textarea[name="checkPoint"]').val(),
                caseProperty = $(insertForm).find('select[name="caseProperty"]').val(),
                caseType = $(insertForm).find('select[name="caseType"]').val(),
                priority = $(insertForm).find('select[name="priority"]').val(),
                author = $(insertForm).find('select[name="author"]').val(),
                reviewer = $(insertForm).find('select[name="reviewer"]').val(),
                executor = $(insertForm).find('select[name="executor"]').val(),
                executemethod = $(insertForm).find('select[name="executemethod"]').val(),
                scriptmode = $(insertForm).find('select[name="scriptmode"]').val(),
                useStatus  = $(insertForm).find('select[name="usestatus"]').val(),
                note = $(insertForm).find('textarea[name="note"]').val();
                actionList=[];
                //处理流程节点
                if(casecompositetype=="2"){
                    for(let i=0;i<self.caseNodeNums.length;i++)
                    {
                        if(self.caseNodeNums[i].status&&self.caseNodeNums[i].display){
                            let form=$('#'+self.caseNodeNums[i].name);
                            let AddTestcaseActionDTO={};
                            AddTestcaseActionDTO.actioncasecode=$(form).find('input[name="actioncasecode"]').val();
                            AddTestcaseActionDTO.actioncode=$(form).find('input[name="actioncode"]').val();
                            AddTestcaseActionDTO.steporder=$(form).find('input[name="steporder"]').val();
                            AddTestcaseActionDTO.autId=$(form).find('select[name="autid"]').val();
                            AddTestcaseActionDTO.transId=$(form).find('select[name="transid"]').val();
                            AddTestcaseActionDTO.scriptModeFlag=$(form).find('select[name="scriptmodeflag"]').val();
                            AddTestcaseActionDTO.testpoint=$(form).find('input[name="testpoint"]').val();
                            AddTestcaseActionDTO.prerequisites=$(form).find('textarea[name="preRequisites"]').val();
                            AddTestcaseActionDTO.datarequest=$(form).find('textarea[name="dataRequest"]').val();
                            AddTestcaseActionDTO.testdesign=$(form).find('textarea[name="testDesign"]').val();
                            AddTestcaseActionDTO.teststep=$(form).find('textarea[name="testStep"]').val();
                            AddTestcaseActionDTO.expectresult=$(form).find('textarea[name="expectResult"]').val();
                            AddTestcaseActionDTO.checkpoint=$(form).find('textarea[name="checkPoint"]').val();
                            AddTestcaseActionDTO.executeMethod=$(form).find('select[name="executeMethod"]').val();
                            AddTestcaseActionDTO.scriptMode=$(form).find('select[name="scriptmode"]').val();
                            AddTestcaseActionDTO.note=$(form).find('textarea[name="note"]').val();
                            actionList.push(AddTestcaseActionDTO);
                        }
                    }
                }
            $.ajax({
                url: address3 + 'testcase/addTestcase',
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    'caseCompositeType': casecompositetype,
                    'caseLibId': caselibId,
                    'casecode': casecode,
                    'submissionId': submissionId,
                    'autId': autid,
                    'version': versioncode,
                    'transId': transid,
                    'scriptModeFlag': scriptmodeflag,
                    'testpoint': testpoint,
                    'testdesign': testdesign,
                    'prerequisites': preRequisites,
                    'datarequest': dataRequest,
                    'teststep': testStep,
                    'expectresult': expectResult,
                    'checkpoint': checkPoint,
                    'caseproperty': caseProperty,
                    'casetype': caseType,
                    'priority': priority,
                    'author': author,
                    'reviewer': reviewer,
                    'executor': executor,
                    'automaton':"",
                    'executeMethod': executemethod,
                    'scriptMode': scriptmode,
                    'useStatus': useStatus ,
                    'note': note,
                    'modifyChannel':'',
                    'modifyChannelNo':'',
                    'functionModule':"",
                    'tags':"",
                    'categoryTeam':"",
                    'actionList':actionList
                }),
                success: function(data) {
                    if (data.respCode=="0000") {
                        $('#successModal').modal();
                        self.getCase(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        self.failMSG=data.respMsg;
                        $('#failModal2').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        // //改变页面大小
        // changeListNum:function() {
        //     $('#mySelect').change(function() {
        //         listnum = $(this).children('option:selected').val();
        //         $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
        //         app.currentPage = 1;
        //         app.getCase(1, listnum, 'id', 'asc');
        //     });
        // },
        
        //跳转至测试系统
        linkToTransact: function(selectedId,selectedName) {
            sessionStorage.setItem("autId", selectedId);
            sessionStorage.setItem("autName", selectedName); 
            location.href = "transact.html";
        },
        //获取caseLibid
        getCaseLibId: function() {
            var caselibid = sessionStorage.getItem('caselibId');
             console.log("caselibId的Id:="+caselibid);
            $('#caselibid').val(caselibid);
            this.caselibid = caselibid;
        },
        //导入
        import: function() {
            var self = this;
            var formData = new FormData($('#importForm')[0]);
            $.ajax({
                url: address + 'TestcaseController/importexcel',
                type: 'post',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    if (data.respCode=="0000") {
                        $('#successModal').modal();
                        this.getCase(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        self.failMSG==data.respMsg;
                        $('#failModal2').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //获取流程节点
        getSubCase: function(e) {
            var flowId = $(e.target).parent().parent().attr('id'),
                flowTr = $(e.target).parent().parent();
            // console.log(flowId);
            var that=this;
            if ($(e.target).attr("class") === "icon-angle-right") {
                $.ajax({
                    url: address3 + 'testcase/queryTestcaseActionList',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({ 'id': flowId }),
                    success: function(data) {
                        that.subCaseList = data.testcaseActionViewList;
                        // console.log(that.subCaseList);
                        for (var i = that.subCaseList.length-1; i >-1; i--) {
                            var subTr = $("<tr class='subShow'style='background-color: #f9f9f9' track-by='id' id="+that.subCaseList[i].id+" data-index="+i+" value="+flowId+"></tr>"),
                                iconTd = $("<td class='move'> <a style='color:tomato' class='icon-move'></a></td>"),
                                checkTd = $("<td><input type='checkbox' id="+that.subCaseList[i].id+" name='chksub_list'/></td>"),
                                codeTd = $("<td></td>"),
                                autTd = $("<td></td>"),
                                transTd = $("<td></td>"),
                                compositeTd = $("<td></td>"),
                                useTd = $("<td></td>"),
                                scriptTd=$("<td></td>"),
                                authorTd = $("<td></td>"),
                                executorTd = $("<td></td>"),
                                reviewerTd = $("<td></td>"),
                                executeMethodTd = $("<td></td>"),
                                misssionTd = $("<td></td>"),
                                priorityTd = $("<td></td>"),
                                caseTypeTd = $("<td></td>"),
                                casePropertyTd = $("<td></td>"),
                                testPointTd = $("<td></td>");
                            codeTd.html(that.subCaseList[i].actioncode);
                            autTd.html(that.subCaseList[i].autName);
                            transTd.html(that.subCaseList[i].transName);
                            compositeTd.html('流程节点');
                            useTd.html(that.subCaseList[i].useStatus=='0'?'新增':'评审通过' );
                            scriptTd.html(that.subCaseList[i].scriptTemplateName);
                            authorTd.html(that.subCaseList[i].authorName);
                            executorTd.html(that.subCaseList[i].executorName);
                            reviewerTd.html(that.subCaseList[i].reviewerName);
                            executeMethodTd.html(that.convertExecMe(that.subCaseList[i].executeMethod));
                            misssionTd.html(that.subCaseList[i].missionName);
                            priorityTd.html(that.$options.methods.convertPri(that.subCaseList[i].priority));
                            caseTypeTd.html(that.$options.methods.convertCaseType(that.subCaseList[i].caseType) );
                            casePropertyTd.html(that.$options.methods.convertCasePro(that.subCaseList[i].caseProperty));
                            testPointTd.html(that.subCaseList[i].testpoint);
                            subTr.append(iconTd, checkTd, codeTd, autTd, transTd, compositeTd, useTd, scriptTd, authorTd, executorTd, reviewerTd, executeMethodTd, misssionTd, priorityTd, caseTypeTd, casePropertyTd, testPointTd);
                            flowTr.after(subTr);
                        }
                    }
                });
                $(e.target).removeClass('icon-angle-right').addClass('icon-angle-down');
            } else {
                $(".subShow").remove();
                $(e.target).removeClass('icon-angle-down').addClass('icon-angle-right');
            }
            that.setDrag();
        },
        //移动流程节点
        setDrag:function() {
            var _this = this;
            setTimeout(function () {
                $( "#caseTable" ).sortable({  items: ".subShow",
                    stop:function(event,ui){
                        // if (+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')) {  // 如果没有改变顺序就return
                        //     return
                        // }
                        var target = ui.item[0].rowIndex - 1;
                        var start = ui.item[0].getAttribute('data-index');
                        var id = ui.item[0].getAttribute('id');
                        var testCaseId =ui.item[0].getAttribute('value');
                        var testList=$("#caseTable").find(".subShow");
                        var subCaseList=[];
                        var testCaseIdList=[];
                        $.ajax({
                            url: address3 + 'testcase/queryTestcaseActionList',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({'id': testCaseId}),
                            success: function (data) {
                                subCaseList = data.testcaseActionViewList;
                                var dependentId=subCaseList[start].dependentId;
                                var beDependentId =subCaseList[start].beDependentId;;
                                var initTestListId=[];
                                for(var j=0;j<subCaseList.length;j++){
                                    initTestListId[j]=subCaseList[j].id;
                                }
                                console.log(initTestListId);
                                for(var i=0;i<testList.length;i++){
                                    if(testList[i].getAttribute('value')==testCaseId){
                                             testCaseIdList.push(testList[i].getAttribute('id'));
                                    }
                                }
                                console.log(testCaseIdList);
                                var front=0;
                                var behind=0;
                                if(dependentId){
                                    for(var i=0;i<dependentId.length;i++){
                                        for(var j=0;j<testCaseIdList.length;j++){
                                            if(testCaseIdList[j]==dependentId[i]){
                                                front=j;
                                            }
                                            if(testCaseIdList[j]==id){
                                                behind=j;
                                            }
                                        }
                                        if(front>behind){
                                            testCaseIdList=initTestListId;
                                            $('#failModal3').modal();
                                            _this.getCase( _this.currentPage,  _this.pageSize,  _this.order, _this.sort);
                                            return;
                                        }
                                    }

                                }
                                if(beDependentId){
                                    for(var i=0;i<beDependentId.length;i++){
                                        for(var j=0;j<testCaseIdList.length;j++){
                                            if(testCaseIdList[j]==beDependentId[i]){
                                                behind=j;
                                            }
                                            if(testCaseIdList[j]==id){
                                                front=j;
                                            }
                                        }
                                        if(front>behind){
                                            testCaseIdList=initTestListId;
                                            $('#failModal3').modal();
                                            _this.getCase( _this.currentPage,  _this.pageSize,  _this.order, _this.sort);
                                            return;
                                        }
                                    }

                                }
                                console.log(testCaseIdList);
                                $.ajax({
                                    url: address3+'testcase/changeFlowNodeOrder',
                                    type: 'post',
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        "caseLibId": testCaseId,
                                        "testCaseActionIds":testCaseIdList
                                    }),
                                    success: function(data) {
                                        console.info(data);
                                        if (data.respCode!=0000) {
                                            $('#failModal').modal();
                                        }
                                    },
                                    error: function() {
                                        $('#failModal').modal();
                                    }
                                });
                            }
                        });
                        console.log(testList);



                    }
                });


            }, 1000);
        },
        ///删除流程节点
        deleteNode: function(){
            var testCaseActionIds=[];
            var nodeLength=$("input[name='chksub_list']:checked").length;
            $("input[name='chksub_list']:checked").each(function (index, item) {
                    testCaseActionIds.push($(this).attr('id'));
                    $(this).parent().parent().css("display","none");
            });
            var  that=this;
            that.caselibId=sessionStorage.getItem("caselibId");
            if (nodeLength === 0) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address3+'testcase/deleteFlowNode',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "caseLibId": that.caselibId,
                        "testCaseActionIds":testCaseActionIds
                    }),
                    success: function(data) {
                        console.info(data);
                        if (data.respCode==0000) {
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
        //展示添加流程节点文本框
        addNodeShow: function(){
            var checkedLength=$("input[name='chk_list']:checked").length;
            var _this=this;
            if(checkedLength!=1) {
                $('#failModal0').modal();
             }else if($("input[name='chk_list']:checked").parent().parent().children(".caseType").text()=="单用例"){
                $('#failModal0').modal();
            }else{
                // _this.caseNodeNum++;
                console.log(_this.caseNodeNums);
                _this.groupBound(_this.caseNodeNums[_this.caseNodeNum-1].name);
                _this.caseNodeNums[_this.caseNodeNum-1].display=true;
                $("#addNodeModal").modal();
            }
        },
        //添加流程节点
        addNode: function(){
            var actionList=[];
            var self=this;
            var caselibId=$("input[name='chk_list']:checked").attr("id");
            let AddTestcaseActionDTO={};
            //处理流程节点
            //     for(let i=0;i<self.caseNodeNums.length;i++)
            //     {;
            //         if(self.caseNodeNums[i].status&&self.caseNodeNums[i].display){
                        let form=$('#addCaseNode1');
                        AddTestcaseActionDTO.actioncasecode=$(form).find('input[name="actioncasecode"]').val();
                        AddTestcaseActionDTO.actioncode=$(form).find('input[name="actioncode"]').val();
                        // AddTestcaseActionDTO.steporder=$(form).find('input[name="steporder"]').val();
                        AddTestcaseActionDTO.autId=$(form).find('select[name="autid"]').val();
                        AddTestcaseActionDTO.transId=$(form).find('select[name="transid"]').val();
                        AddTestcaseActionDTO.scriptModeFlag=$(form).find('select[name="scriptmodeflag"]').val();
                        AddTestcaseActionDTO.testpoint=$(form).find('input[name="testpoint"]').val();
                        AddTestcaseActionDTO.prerequisites=$(form).find('textarea[name="preRequisites"]').val();
                        AddTestcaseActionDTO.datarequest=$(form).find('textarea[name="dataRequest"]').val();
                        AddTestcaseActionDTO.testdesign=$(form).find('textarea[name="testDesign"]').val();
                        AddTestcaseActionDTO.teststep=$(form).find('textarea[name="testStep"]').val();
                        AddTestcaseActionDTO.expectresult=$(form).find('textarea[name="expectResult"]').val();
                        AddTestcaseActionDTO.checkpoint=$(form).find('textarea[name="checkPoint"]').val();
                        AddTestcaseActionDTO.executeMethod=$(form).find('select[name="executeMethod"]').val();
                        AddTestcaseActionDTO.scriptMode=$(form).find('select[name="scriptmode"]').val();
                        AddTestcaseActionDTO.note=$(form).find('textarea[name="note"]').val();
                        // actionList.push(AddTestcaseActionDTO);
                    // }
               // }
            $.ajax({
                url: address3 + 'testcase/addFlowNode',
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    'caseLibId':caselibId,
                    'addTestCaseActionDTO':{
                    'actioncasecode':  AddTestcaseActionDTO.actioncasecode,
                    'actioncode': AddTestcaseActionDTO.actioncode,
                    'autId':AddTestcaseActionDTO.autId ,
                    'transId': AddTestcaseActionDTO.transId,
                    'scriptModeFlag': AddTestcaseActionDTO.scriptModeFlag,
                    'testpoint':  AddTestcaseActionDTO.testpoint,
                    'prerequisites':AddTestcaseActionDTO.prerequisites ,
                    'datarequest': AddTestcaseActionDTO.datarequest,
                    'testdesign':AddTestcaseActionDTO.testdesign ,
                    'teststep': AddTestcaseActionDTO.teststep ,
                    'expectresult':AddTestcaseActionDTO.expectresult ,
                    'checkpoint': AddTestcaseActionDTO.checkpoint,
                    'executeMethod':  AddTestcaseActionDTO.executeMethod,
                    'scriptMode': AddTestcaseActionDTO.scriptMode ,
                    'note': AddTestcaseActionDTO.note
            }

                }),
                success: function(data) {
                    if (data.respCode=="0000") {
                        $('#successModal').modal();
                        self.getCase(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        self.failMSG=data.respMsg;
                        $('#failModal2').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            var subid_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push(parseInt($(this).attr('id')));
            });
            $('input[name="chksub_list"]:checked').each(function() {
                subid_array.push(parseInt($(this).attr('id')));
            });
            
            app.ids = id_array;
            app.subids = subid_array;
        },
        checkExport: function()  {
            console.log("motu");
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#exportModal').modal();
            }
        },
        //分配执行者
        checkExe:  function() {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#assignModal').modal();
            }
        },
        //分配执行方式按钮
        checkExeM: function() {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#runModeModal').modal();
            }
        },
        //更改执行方式
        execute_method: function() {
            var self = this;
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var id_array = new Array();
                $('input[name="chk_list"]:checked').each(function() {
                    id_array.push($(this).attr('id'));
                });
                $('#executeMethodForm input[name="ids"]').val(id_array.join(','));
                $.ajax({
                    url: address3 + 'testcase/batchModifyTestCaseProperty',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        'testcaseIds': id_array,
                        'property': 'executeMethod',
                        'value': $("#executeMethodForm select[name='executeMethod']").val()
                    }),
                    success: function(data) {
                        // console.info(data.msg);
                        $('#successModal').modal();
                        app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
        },

        checkTransid: function() {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#transid').modal();
            }
        },        
        modifyMoreModalShow: function() {
            var _this=this;
            app.getIds();
            if (app.ids==null||app.ids.length === 0) {
                if (app.subids==null||app.subids.length === 0) {
                    $('#selectAlertModal').modal();
                }
                else {
                    $('#modifiedModal').modal();
                }
            } else {
                $('#modifiedModal').modal();
            }
        },
        showDetail(event){
                document.getElementsByTagName('fieldset')[0].setAttribute('disabled', true);
                $('#detailModal').modal('show');
                var id=$(event.target).parent().prev().prev().children().attr('id');
                $('#detailForm input[name="id"]').val(id);
                $.ajax({
                    url: address3+'testcase/getSingleTestCaseInfo',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": id
                    }),
                    success: function(res){
                        var caseData=res.testcaseViewRespDTO;
                        console.log("ooppppp"+caseData.transName);
                        $('#detailForm input[name="casecode"]').val(caseData.casecode);
                        $('#detailForm select[name="missionId"]').val(caseData.missionId);
                        $('#detailForm select[name="autid"]').val(caseData.autId);
                        erji();
                        $('#casetransid').val(caseData.transId);
                        $('#casetransid').selectpicker('refresh');
                        sanji();
                        $('#detailForm input[name="versioncode"]').val(caseData.version);
                        $('#detailForm select[name="scriptmodeflag"]').val(caseData.scriptModeFlag);
                        $('#detailForm input[name="testpoint"]').val(caseData.testPoint);
                        $('#detailForm textarea[name="testDesign"]').val(caseData.testDesign);
                        $('#detailForm textarea[name="preRequisites"]').val(caseData.preRequisites);
                        $('#detailForm textarea[name="dataRequest"]').val(caseData.dataRequest);
                        $('#detailForm textarea[name="testStep"]').val(caseData.testStep);
                        $('#detailForm textarea[name="expectResult"]').val(caseData.expectResult);
                        $('#detailForm textarea[name="checkPoint"]').val(caseData.checkPoint);
                        $('#detailForm select[name="caseProperty"]').val(caseData.caseProperty);
                        $('#detailForm select[name="caseType"]').val(caseData.caseType);
                        $('#detailForm select[name="priority"]').val(caseData.priority);
                        $('#detailForm select[name="author"]').val(caseData.authorId);
                        $('#detailForm select[name="reviewer"]').val(caseData.reviewerId);
                        $('#detailForm select[name="executor"]').val(caseData.executorId);
                        $('#detailForm select[name="executemethod"]').val(caseData.executeMethod);
                        $('#detailForm select[name="scriptmode"]').val(caseData.scriptMode);
                        $('#detailForm select[name="usestatus"]').val(caseData.useStatus);
                        $('#detailForm textarea[name="note"]').val(caseData.note);

                    }
                });
        },
        edit(){
            document.getElementsByTagName('fieldset')[0].removeAttribute('disabled');
        },
        // 修改用例
        update(){
            $.ajax({
                url: address3+ 'testcase/modifySingleTestCaseInfo',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                        id: $('#detailForm input[name="id"]').val(),
                        casecode:$('#detailForm input[name="casecode"]').val(),
                        missionId:$('#detailForm select[name="missionId"]').val(),
                        autId: $('#detailForm select[name="autid"]').val(),
                        version: $('#detailForm input[name="versioncode"]').val(),
                        transId: $('#detailForm select[name="transid"]').val(),
                        scriptModeFlag:$('#detailForm select[name="scriptmodeflag"]').val(),
                        testPoint:$('#detailForm input[name="testpoint"]').val(),
                        testDesign:$('#detailForm textarea[name="testDesign"]').val(),
                        preRequisites:$('#detailForm textarea[name="preRequisites"]').val(),
                        dataRequest:$('#detailForm textarea[name="dataRequest"]').val(),
                        testStep:$('#detailForm textarea[name="testStep"]').val(),
                        expectResult:$('#detailForm textarea[name="expectResult"]').val(),
                        checkPoint:$('#detailForm textarea[name="checkPoint"]').val(),
                        caseProperty:$('#detailForm select[name="caseProperty"]').val(),
                        caseType:$('#detailForm select[name="caseType"]').val(),
                        priority:$('#detailForm select[name="priority"]').val(),
                        authorId:$('#detailForm select[name="author"]').val(),
                        reviewerId:$('#detailForm select[name="reviewer"]').val(),
                        executorId:$('#detailForm select[name="executor"]').val(),
                        executeMethod:$('#detailForm select[name="executemethod"]').val(),
                        scriptMode:$('#detailForm select[name="scriptmode"]').val(),
                        useStatus:$('#detailForm select[name="usestatus"]').val(),
                        note:$('#detailForm textarea[name="note"]').val()
                }),
                success: function(data){
                    $('#successModal').modal();
                    app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
                },
                error: function(){
                    $('#failModal').modal();
                }
            })
        },
        // 排序
        sortBy: function(sortparam) {
            this.sortparam = sortparam;
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
            if(ts.queryflag===false)
            this.filterCase(ts.currentPage);
            else
            this.getCase(ts.currentPage, ts.pageSize, 'id', 'asc');
            // ts.queryCase();
        },
        // 流程用例添加节点用例
        addCaseNode: function() {
            var _this=this;
            _this.caseNodeNum++;
            console.log(_this.caseNodeNums);
            var caseNodeNum={num: _this.caseNodeNum,status:true,show:true,name:"boundGroup"+_this.caseNodeNum,display:false}
            _this.caseNodeNums.push(caseNodeNum);
            _this.groupBound(_this.caseNodeNums[_this.caseNodeNum-2].name);
            _this.caseNodeNums[_this.caseNodeNum-2].display=true;
        },
        //搜索用例
        searchCase: function(id) {
            $.ajax({
                url: address3 + 'TestcaseController/viewtestcase',
                type: 'GET',
                data: { 'id': id },
                success: function() {
                    this.$data.caseList = data.o;
                }
            });
        },
        //获取添加用例任务编号下拉列表
        getMission: function(){
            var _this = this;
            $.ajax({
                url: address3 + "missionController/pagedBatchQueryTestMission",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'pageSize': 10000,
                    'currentPage': 1,
                    'orderType': "desc",
                    'orderColumns': 'modified_time',
                    'nameMedium': '',
                    'descMedium': '',
                    'codeLong': ''
                }),
                success:function(data){
                    // console.log(data)
                    _this.missionList=data.list;
                }
            });
        },

        // 添加筛选
        addFilter(index){
            // this.filterList.push('c');
            let liStr="";
            if(index==2)
                liStr=`<li>
                        <label>修改项目</label>
                        <select id="propertyName2" name="propertyName" class="selectpicker prop_select" data-live-search="true">
                            <option value="">请选择</option>
                            <option value="caseCompositeType">用例组成类型</option>
                            <option value="missionId">测试任务</option>
                            <option value="autId">被测系统</option>
                            <option value="casecode">用例编号</option>
                            <option value="testDesign">测试意图</option>
                            <option value="preRequisites">前置条件</option>
                            <option value="dataRequest">数据需求</option>
                            <option value="testStep">测试步骤</option>
                            <option value="expectResult">预期结果</option>
                            <option value="checkPoint">附加检查点</option><option value="caseProperty">用例性质</option>
                            <option value="caseType">测试用例类型</option>
                            <option value="priority">优先级</option>
                            <option value="author">作者</option>
                            <option value="reviewer">评审者</option>
                            <option value="executor">执行者</option>
                            <option value="executeMethod">执行方式</option>
                        </select>
                        <select name="compareType" class="selectpicker compare_select">
                            <option value="">请选择</option>
                        </select><label>值</label>
                        <select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple>
                        </select>
                        <button class="btn btn-xs btn-danger" @click="removeFilter($index,$event)"><i class="glyphicon glyphicon-remove"></i></button> 
                    </li>`;
                else
                    liStr=`<li>
                        <label>修改项目</label>
                        <select  id="propertyName1"  name="propertyName" class="selectpicker prop_select" data-live-search="true">
                            <option value="">请选择</option>
                            <option value="missionId">测试任务</option>
                            <option value="autId">被测系统</option>
                            <option value="caseProperty">用例性质</option>
                            <option value="caseType">测试用例类型</option>
                            <option value="priority">优先级</option>
                            <option value="reviewer">评审者</option>
                            <option value="executor">执行者</option>
                            <option value="executeMethod">执行方式</option>
                            <option value="scriptMode">脚本管理方式</option>
                        </select>
                        <label>值</label>
                        <select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple>
                        </select>
                        <button class="btn btn-xs btn-danger" @click="removeFilter($index,$event)"><i class="glyphicon glyphicon-remove"></i></button> 
                    </li>`;
            $('.filterList').eq(index-1).append(liStr);
            Vue.nextTick(function(){
                $('.selectpicker').selectpicker('refresh')
            });
        },
        //筛选用例
        filterCase(currentPage){
                let data=[];
                let list=$("#filterList2>li");
                let that=this;
                // console.log(list)
                for(let i=0;i<list.length;i++){
                        let listItem={};
                        listItem.propertyName=$(list[i]).find('select[name="propertyName"]').val();
                        listItem.compareType=$(list[i]).find('select[name="compareType"]').val();
                        let valType=$(list[i]).find('.val_select')[0].tagName;
                        if(valType==='INPUT'){
                            listItem.propertyValueList=[];
                            let propertyValueList=$(list[i]).find('input.val_select').val();
                            listItem.propertyValueList.push(propertyValueList);
                        }else{
                            let propertyValueList=$(list[i]).find('select.val_select').val();
                            if(Object.prototype.toString.call(propertyValueList)=='[object Array]'){
                                listItem.propertyValueList=propertyValueList;
                            }else{
                                if(propertyValueList!=null){
                                    listItem.propertyValueList=propertyValueList.toString().split(' ');
                                }else{
                                    listItem.propertyValueList=[];
                                }
                            }
                        }
                        data.push(listItem);
                }
                let listItem={};
				listItem.propertyName="caseLibId";
				listItem.compareType="=";
				listItem.propertyValueList=[];
				listItem.propertyValueList.push(sessionStorage.getItem('caselibId'));
				data.push(listItem);
                var filterType=$('input[name="filterType"]').val();
                $.ajax({
                    url:address3 + 'testcase/pagedQueryTestCaseByCondition',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        'filterType': parseInt(filterType),
                        'conditionList': data,
                        'currentPage': currentPage,
                        'pageSize': this.pageSize,
                        'orderType': 'asc',
                        'orderColumn': 'id',
                        'caseLibId': sessionStorage.getItem('caselibId'),
                     }),
                    type:'post',
                    success:function(res){
                        // console.log(res)
                        app.caseList = res.testcaseViewRespDTOList;
                        app.currentPage=currentPage;
                        app.tt = res.totalCount;
                        app.totalPage = res.totalPage;
                        app.pageSize = that.pageSize;
                        app.queryflag = false;
                    }

                });
        },
        //修改用例 第一次 为更改多种用例信息写的函数，以防后用 但可以删除
        modifyCase(){
            let data={};
            let list=$("#filterList1>li");
            let _this=this;
            for(let i=0;i<list.length;i++){
                    let key=$(list[i]).find('select[name="propertyName"]').val();
                    let value="";
                    let valType=$(list[i]).find('.val_select')[0].tagName;
                    if(valType==='INPUT'){
                        value=$(list[i]).find('input.val_select').val();
                        data[key]=value;
                    }else{
                        value=$(list[i]).find('select.val_select').val();
                        data[key]=value;
                    }
            }
            $.ajax({
                url:address3 + 'testcase/batchModifyMultiProperty',
                contentType: 'application/json',
                data: JSON.stringify({
                    'testcaseIds': that.ids,
                    'testcaseActionIds': that.subids,
                    'propertyValueMap': data,
                    }),
                type:'post',
                success:function(data){
                    if(data.respCode=="0000"){
                        $('#successModal').modal();
                        }
                    else{
                        _this.failMSG=data.failMSG;
                        $('#failModal').modal();
                        }
                    }
                });
            },    //更改多用例信息
        modifyMore :function() {
            let self =this;
            let modifiedModal=$('#modifiedModal');
                // autid = $(modifiedModal).find('select[name="autid"]').val(),
                // transid = $(modifiedModal).find('select[name="transid"]').val(),
                // submissionId = $(modifiedModal).find('select[name="submissionId"]').val(),
                // scriptmodeflag = $(modifiedModal).find('select[name="scriptmodeflag"]').val(),
                // caseProperty = $(modifiedModal).find('select[name="caseProperty"]').val(),
                // caseType = $(modifiedModal).find('select[name="caseType"]').val(),
                // priority = $(modifiedModal).find('select[name="priority"]').val(),
                // reviewer = $(modifiedModal).find('select[name="reviewer"]').val(),
                // executor = $(modifiedModal).find('select[name="executor"]').val(),
                // executemethod = $(modifiedModal).find('select[name="executemethod"]').val(),
                // scriptmode = $(modifiedModal).find('select[name="scriptmode"]').val();
            let data={};
            let modifiedForm=$(modifiedModal).find('select');
            let that=this;
            for(let i=0;i<modifiedForm.length;i++){
                let key=$(modifiedForm[i]).attr('name');
                let value=$(modifiedForm[i]).val();
                if(value!="-1"){
                    data[key]=value;
                }
            }
            $.ajax({
                url:address3 + 'testcase/batchModifyMultiProperty',
                contentType: 'application/json',
                data: JSON.stringify({
                    'testcaseIds': that.ids,
                    'testcaseActionIds': that.subids,
                    'propertyValueMap': data,
                    }),
                type:'post',
                success:function(data){
                    if(data.respCode=="0000"){
                        $('#successModal').modal();
                        self.getCase(self.currentPage, self.pageSize, self.order, self.sort);
                    }
                    else{
                        self.failMSG=data.respMsg;
                        $('#failModal2').modal();
                    }
                }
            });
        },
        Reset:function(){
            let modifiedForm=$('#modifiedModal').find('select');
            for(let i=0;i<modifiedForm.length;i++){
                let value=$(modifiedForm[i]).val('-1');
            }
            $('#modifiedModal').find
            let str2="<option value='-1'>未选择</option>";
            $('#modifiedModal').find('select[name="transid"]').html(str2);
            $('#modifiedModal').find('select[name="scriptmodeflag"]').html(str2);
        },
        groupBound:function(name){
            var boundGroup="";
            if(name=="")
                 boundGroup="boundGroup";
            else
                 boundGroup=name;
            var find="div[name='"+boundGroup+"']"
            console.log(find);
            console.log($(find));

            $(find).each(function(i){
                var _this=this;
                first(); //第一级函数
                second(); //第二级函数
                third(); //第三极函数
                $(_this).children().eq(0).children().eq(1).children().change(function() {
                    if($(_this).children().eq(0).children().eq(1).children().val()=="-1"){
                        let str = '<option value="-1">未选择</option>';
                        $(_this).children().eq(1).children().eq(1).children().html(str);
                        $(_this).children().eq(2).children().eq(1).children().html(str);
                    }else{
                        second();
                        third();
                    }
                })
                $(_this).children().eq(1).children().eq(1).children().change(function() {
                    third();
                })
                //一级 测试系统
                function first() {
                    $.ajax({
                        async: false,
                        url:address3+"aut/queryListAut",
                        type: "POST",
                        contentType: 'application/json',
                        success: function(data) {
                            var autList = data.autRespDTOList;
                            var str = "";
                            for (var i = 0; i < autList.length; i++) {

                                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
                            }
                            $(_this).children().eq(0).children().eq(1).children().append(str);
                        }
                    });
                }

                //二级 功能点
                function second() {
                    var val = $(_this).children().eq(0).children().eq(1).children().val();
                    if(val=='-1'||val==null){
                        let str2="<option value='-1'>未选择</option>";
                        $(_this).children().eq(1).children().eq(1).children().html(str2);
                    }
                    else{
                        $.ajax({
                            async: false,
                            url: address3 + 'transactController/pagedBatchQueryTransact',
                            data: JSON.stringify({ 
                                autId: val,
                                currentPage: 1,
                                orderColumns: 'id',
                                orderType: 'asc',
                                pageSize: 100000
                            }),
                            type: "POST",
                            contentType: 'application/json',
                            success: function(data) {
                                var transactList = data.list;
                                if(transactList.length<1){
                                    let str2='<option value="-1">该系统无功能点</option>'
                                    $(_this).children().eq(1).children().eq(1).children().html(str2);
                                }
                                else{
                                    var str = "";
                                    for (var i = 0; i < transactList.length; i++) {
                                        str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                                    }
                                    $(_this).children().eq(1).children().eq(1).children().html(str);
                                }
                            }
                        });
                    }
                }

                //三级 模板脚本
                function third() {

                    var val = $(_this).children().eq(1).children().eq(1).children().val();
                    if(val=="-1"||val==null){
                        let str2='<option value="-1">未选择</option>'
                        $(_this).children().eq(2).children().eq(1).children().html(str2);
                    }
                    else{
                        $.ajax({
                            url: address3 + "scriptTemplate/queryTemplateByTransId",
                            data: JSON.stringify({ "id": val }),
                            type: "POST",
                            contentType: 'application/json',
                            success: function(data) {
                                var lie = data.scriptTemplateList;
                                var str = "";
                                if(lie.length<1)
                                {
                                    let str2='<option value="0">该功能点无脚本数据</option>'
                                    $(_this).children().eq(2).children().eq(1).children().html(str2);
                                }
                                else{
                                    for (var i = 0; i < lie.length; i++) {
                                        str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
                                    }
                                    $(_this).children().eq(2).children().eq(1).children().html(str);
                                }
                            }
                        });
                    }
                }
             });
        }

    },

});



    //分配执行者
    function executor() {
        var id_array = new Array();
        $('input[name="chk_list"]:checked').each(function() {
            id_array.push($(this).attr('id'));
        });
        $('#executorForm input[name="ids"]').val(id_array.join(','));
        $.ajax({
            url: address3 + 'testcase/batchModifyTestCaseProperty',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                testcaseIds: id_array,
                property: 'executor',
                value: $("#executorForm select[name='executor']").val()
            }),
            success: function(data) {
                // console.info(data.msg);
                $('#successModal').modal();
                app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
            },
            error: function() {
                $('#failModal').modal();
            }
        });
    }
    //设置功能点及模板脚本
    function transid() {
        var id_array = new Array();
        $('input[name="chk_list"]:checked').each(function() {
            id_array.push($(this).attr('id'));
        });
        $('#executorForm input[name="ids"]').val(id_array.join(','));
        $.ajax({//transId
            url: address3 + 'testcase/batchModifyTestCaseProperty',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                testcaseIds: id_array,
                property: 'transId',
                value: $("#transidForm select[name='transid']").val()
            }),
            success: function(data) {
                // console.info(data.msg);
                $('#successModal').modal();
                app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
            },
            error: function() {
                $('#failModal').modal();
            }
        });
        $.ajax({//scriptModeFlag
            url: address3 + 'testcase/batchModifyTestCaseProperty',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                testcaseIds: id_array,
                property: 'scriptModeFlag',
                value: $("#transidForm select[name='scriptmodeflag']").val()
            }),
            success: function(data) {
                app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
            }
        });
    }

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});


//三级联动
$(document).ready(function(e) {

    yiji(); //第一级函数
    erji(); //第二级函数
    sanji(); //第三极函数
    $('#caseautid').change(function() {
        //var target = $(this);
        erji();
        sanji();
    })
    $('#casetransid').change(function() {

        sanji();
    })
});

//一级 测试系统
function yiji() {
    $.ajax({
        async: false,
        url: address3+"aut/queryListAut",
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            // console.log(data)
            var autList = data.autRespDTOList;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
            }

            $('select[id="caseautid"]').html(str);
            $('select[id="caseautid"]').selectpicker('refresh');

        }
    });
}

//二级 功能点
function erji() {
    var val = $('select[id="caseautid"]').val();
    $.ajax({
        async: false,
        url: address3 + 'transactController/pagedBatchQueryTransact',
        data: JSON.stringify({ 
            autId: val,
            currentPage: 1,
            orderColumns: 'id',
            orderType: 'asc',
            pageSize: 100000
        }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var transactList = data.list;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                    str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
            }
            $('#casetransid').html(str);
            $('#casetransid').selectpicker('refresh');

        }

    });
}

//三级 模板脚本
function sanji() {

    var val = $('#casetransid').val();
    $.ajax({
        url: address3 + "scriptTemplate/queryTemplateByTransId",
        data: JSON.stringify({ "id": val }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var lie = data.scriptTemplateList;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $('#scriptmodeflag').html(str);
            $('#scriptmodeflag').selectpicker('refresh');


        }

    });
}

//3级联动 设置功能点及模板脚本
$(document).ready(function(e) {

    first(); //第一级函数
    second(); //第二级函数
    third(); //第三极函数
    $("#1ji").change(function() {
        second();
        third();
    })
    $("#2ji").change(function() {
        third();
    })
});

//一级 测试系统
function first() {
    $.ajax({
        async: false,
        url:address3+"aut/queryListAut",
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var autList = data.autRespDTOList;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
            }

            $("#1ji").html(str);
        }
    });
}

//二级 功能点
function second() {
    var val = $("#1ji").val();
    $.ajax({
        async: false,
        url: address3 + 'transactController/pagedBatchQueryTransact',
        data: JSON.stringify({ 
            autId: val,
            currentPage: 1,
            orderColumns: 'id',
            orderType: 'asc',
            pageSize: 100000
        }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var transactList = data.list;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
            }
            $("#2ji").html(str);

        }

    });
}

//三级 模板脚本
function third() {
    var val = $("#2ji").val();
    $.ajax({
        url: address3 + "scriptTemplate/queryTemplateByTransId",
        data: JSON.stringify({ "id": val }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {

            var lie = data.scriptTemplateList;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $("#3ji").html(str);


        }

    });
}

//子流程节点部分
//3级联动 设置功能点及模板脚本
// $(document).ready(function(e) {
//
//     diyi(); //第一级函数
//     dier(); //第二级函数
//     disan(); //第三极函数
//     $("#subautid").change(function() {
//         dier();
//         disan();
//     })
//     $("#subtransid").change(function() {
//         disan();
//     })
// });
//一级 测试系统
function diyi() {
    console.log("aiya")
    $.ajax({
        async: false,
        url: address3+"aut/queryListAut",
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var autList = data.autRespDTOList;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
            }

            $('select[name="subautid"]').html(str);

        }
    });
}

//二级 功能点
function dier() {
    var val = $('select[name="subautid"]').val();
    $.ajax({
        async: false,
        url: address3 + 'transactController/pagedBatchQueryTransact',
        data: JSON.stringify({ 
            autId: val,
            currentPage: 1,
            orderColumns: 'id',
            orderType: 'asc',
            pageSize: 100000
        }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var transactList = data.list;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
            }
            $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').html(str);

        }

    });
}

//三级 模板脚本
function disan() {
    var val = $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').val();
    $.ajax({
        url: address3 + "scriptTemplate/queryTemplateByTransId",
        data: JSON.stringify({ "id": val }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var lie = data.scriptTemplateList;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            console.log(str);
            $('select[name="subautid"]').parent().parent().next().next().find('select[name="subscriptmodeflag"]').html(str);
            $('select[name="subautid"]').parent().parent().next().next().find('select[name="subscriptmodeflag"]').selectpicker('refresh');

        }

    });
}

//重新排序
function resort(target) {
    var spans = target.parentNode.getElementsByTagName("span");
    for (var span in spans) {               //清空箭头
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
    app.getCase(1, 10, app.order, app.sort);
}
//重新排序 结束
