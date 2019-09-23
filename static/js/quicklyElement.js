var app = new Vue({
    el: '#v-quicklyElement',
    data: function () {
        var _this = this;
        return {
            autId: '',
            autList: [],
            transactId: '',
            transactList: [],
            elementRepositoryId: 6,
            UIName: '',
            UITitle: 'UI',
            eleName: '',
            UILinked: '',
            eleParent: '',
            checkUinodes:[],//基础脚本界面 用于生成选中元素的顺序
            checkFlag: [],//基础脚本界面 标志 用与判断是否按照选中顺序排序  
            eleLinked: '',
            failMSG: '操作失败啦。糟糕的是没有返回信息，难道是ajax请求失败了',
            mainPropTr: '<tr><td><input type="checkbox" name="mainProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            addiPropTr: '<tr><td><input type="checkbox" name="addiProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            assiPropTr: '<tr><td><input type="checkbox" name="assiProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            linkedPropTr: '<tr><td><input type="checkbox" name="linkProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            elepropTr: '<tr  ><td>  <input type="checkbox" name="chk_list" /> </td> <td contenteditable="true"> </td><td  style="width:125px;"  ><select class="form-control " style="width:125px;" name="ClassType" id="addEleClassType"> <option value="">--选择类型--</option> ',
            repositoryId: 6,
            objId: '',
            objName: '',
            objTitle: '对象',
            faliMSG: '操作失败啦。糟糕的是没有返回信息，难道是ajax请求失败了',
            propTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',

            classtype:null,
            classtypeList: [], //控件类型下拉列表
            mainList: [], //主属性
            mainListLength: 0,
            addiList: [], //附加属性
            addiListLength: 0,
            assiList: [], //辅助属性
            assiListLength: 0,
            relatePropList: [], //关联属性
            relatePropListLength: 0,
            eleFlag:true,//用于展示tips信息

            ruleName:"",
            ruleDesc:"",
            inputMaxLength: -1, //绑定前段用于展示规则
            inputMinLength: -1,
            inputMust: true,
            inputSpecialCh: "",
            inputValue: "123",
            isRestraint: true,
            order: 0,
            selectValue:"",

            templateList: [],
            checkedTemplate: [],
            lastCheckedTemplate: null,
            showScripttemplateTableArgs: null,
            script_id: '',
            // ids: '',
            // 新增模板绑定数据
            newTemplate: {
                name: '',
                description: ''
            },
            scriptIsChanged: false,
            scriptLength: 0,

            // 保存table中每一行的数据 [{id:Symbol(), functions: {{name: '',  parameterlist: ''}], operation: {element:'', ui: '',parameters:[]}}],
            operationRows: [],//[{id:Symbol(), functions: [], operation: {element:'1', ui: '2', parameters: [{Name: 'name1', Value: ''}]}}],
            // parameterVue: null,
            /*elementtree start*/
            setting1: {
                view: {
                    addHoverDom: false,
                    removeHoverDom: false,
                    selectedMulti: true
                },
                check: {
                    enable: false,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "ps", "N": "ps" }
                },
                data: {
                    simpleData: {
                        enable: false,
                        idKey: 'id', //id编号命名
                        pIdKey: 'parentid', //父id编号命名
                        rootPId: 0
                    }
                },
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                //回调函数
                callback: {
                    // 禁止拖拽
                    beforeDrag: _this.zTreeBeforeDrag,
                    //点击时的回调函数
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        if (treeNode.level == 0) { //选择的是UI
                            $(':input', '#UIForm').val('');
                            var namestr = _this.replacemess(treeNode.name);
                            _this.UIName = namestr;
                            _this.UITitle = namestr;
                            var uiId = treeNode.id;
                            $('#UIForm input[name="UIName"]').val(namestr);
                            $('#blank').css('display', 'none');
                            $('#UI').css('display', 'block');
                            $('#ele').css('display', 'none');
                            $.ajax({
                                url: address3 + 'elementRepository/querySingleUI',
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "repositoryId": _this.elementRepositoryId,
                                    "uiId": uiId
                                }),
                                success: function (data) {
                                    var relateObjectId = data.relateIdentifyObjectId;
                                    var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
                                    if (relateObjectId !== null && relateObjectId !== undefined && relateObjectId !== '') {
                                        treeObj.selectNode(treeObj.getNodeByParam("objectId", relateObjectId, null));
                                        $('#UILinkedInput').val(relateObjectId);
                                    }
                                }
                            });
                        } else { //选择的是元素
                            $('#classtypeSelect').val('');
                            $('#eleParentInput').val('');
                            $('#eleLinkedInput').val('');
                            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
                            var nodes = treeObj.getSelectedNodes();
                            _this.eleName = _this.replacemess(treeNode.name);
                            console.log(treeNode)
                            _this.elementId = treeNode.id;
                            var parentNode = nodes[0].getParentNode();
                            _this.UIName = _this.replacemess(parentNode.name);
                            var uiId = parentNode.id,
                                regulationId = parentNode.regulationId,
                                classType = nodes[0].classType;
                            
                            console.log("regulationId :" + parentNode.regulationId);
                            console.log("元素类型 :" + nodes[0].classType)
                            console.log("元素id :" + _this.elementId)

                            $("#mainTbody").children().remove();
                            $("#addiTbody").children().remove();
                            $("#assiTbody").children().remove();
                            $("#relatePropTbody").children().remove();
                            $('#blank').css('display', 'none');
                            $('#UI').css('display', 'none');
                            $('#ele').css('display', 'block');
                            console.log()
                            $.ajax({
                                url: address3 + 'elementRepository/querySingleElement',
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    'repositoryId': _this.elementRepositoryId,
                                    "uiId": uiId,
                                    "elementId": _this.elementId
                                }),
                                success: function (data) {

                                    _this.classtype =  data.element.classType;
                                    var classtype = data.element.classType;
                                    $('#classtypeSelect').val(classtype);
                                    var relateParentObjectId = data.element.relateParentIdentifyObjectId;
                                    var relateObjectId = data.element.relateIdentifyObjectId;
                                    if (relateParentObjectId !== null && relateParentObjectId !== undefined && relateParentObjectId !== '') {
                                        //父对象
                                        var elePtree = $.fn.zTree.getZTreeObj("eleParentTree");
                                        elePtree.selectNode(elePtree.getNodeByParam("objectId", relateParentObjectId, null));
                                        var pNodes = elePtree.getSelectedNodes(),
                                            pObj = data.element.classType;
                                        $('#eleParentInput').val(pObj);
                                    }
                                    if (relateObjectId !== null && relateObjectId !== undefined && relateObjectId !== '') {
                                        //关联对象
                                        var eleLtree = $.fn.zTree.getZTreeObj("eleLinkedTree");
                                        eleLtree.selectNode(eleLtree.getNodeByParam("objectId", relateObjectId, null));
                                        var lNodes = eleLtree.getSelectedNodes(),
                                            lObj = lNodes[0].objectName;
                                        $('#eleLinkedInput').val(lObj);
                                    }
                                    //主属性
                                    _this.mainList = [];
                                    _this.mainList = data.element.mainProperties;
                                    if (_this.mainList) {
                                        _this.mainListLength = _this.mainList.length;
                                        for (let i = 0; i < _this.mainListLength; i++) {
                                            let paraTr = $('<tr></tr>'),
                                                paraCheckTd = $('<td><input type="checkbox" name="mainProp"/></td>'),
                                                paraNameTd = $('<td contenteditable="true"></td>'),
                                                paraValTd = $('<td contenteditable="true"></td>');
                                            paraNameTd.html(_this.mainList[i].name);
                                            paraValTd.html(_this.mainList[i].value);
                                            paraTr.append(paraCheckTd, paraNameTd, paraValTd);
                                            $('#mainTbody').append(paraTr);
                                        }
                                    }

                                    //附加属性
                                    _this.addiList = data.element.additionalProperties;
                                    if (_this.addiList) {
                                        _this.addiListLength = _this.addiList.length;
                                        for (let i = 0; i < _this.addiListLength; i++) {
                                            let paraTr = $('<tr></tr>'),
                                                paraCheckTd = $('<td><input type="checkbox" name="addiProp"/></td>'),
                                                paraNameTd = $('<td contenteditable="true"></td>'),
                                                paraValTd = $('<td contenteditable="true"></td>');
                                            paraNameTd.html(_this.addiList[i].name);
                                            paraValTd.html(_this.addiList[i].value);
                                            paraTr.append(paraCheckTd, paraNameTd, paraValTd);
                                            $('#addiTbody').append(paraTr);
                                        }
                                    }

                                    //辅助属性
                                    _this.assiList = data.element.assistantProperties;
                                    if (_this.assiList) {
                                        _this.assiListLength = _this.assiList.length;
                                        for (var i = 0; i < _this.assiListLength; i++) {
                                            var paraTr = $('<tr></tr>'),
                                                paraCheckTd = $('<td><input type="checkbox" name="assiProp"/></td>'),
                                                paraNameTd = $('<td contenteditable="true"></td>'),
                                                paraValTd = $('<td contenteditable="true"></td>');
                                            paraNameTd.html(_this.assiList[i].name);
                                            paraValTd.html(_this.assiList[i].value);
                                            paraTr.append(paraCheckTd, paraNameTd, paraValTd);
                                            $('#assiTbody').append(paraTr);
                                        }
                                    }

                                    //关联属性
                                    _this.assiList = data.element.relateProperties;
                                    if (_this.assiList) {
                                        _this.assiListLength = _this.assiList.length;
                                        for (var i = 0; i < _this.assiListLength; i++) {
                                            var paraTr = $('<tr></tr>'),
                                                paraCheckTd = $('<td><input type="checkbox" name="assiProp"/></td>'),
                                                paraNameTd = $('<td contenteditable="true"></td>'),
                                                paraValTd = $('<td contenteditable="true"></td>');
                                            paraNameTd.html(_this.assiList[i].name);
                                            paraValTd.html(_this.assiList[i].value);
                                            paraTr.append(paraCheckTd, paraNameTd, paraValTd);
                                            $('#relatePropTbody').append(paraTr);
                                        }
                                    }
                                }
                            });


                            console.log("regulationId :" + parentNode.regulationId);
                            console.log("元素类型 :" + nodes[0].classType)
                            console.log("元素id :" + _this.elementId)
                            if("webedit" == classType){
                                if(regulationId != null){
                                    $.ajax({
                                        url: address3 + 'regulationController/searchInputRegulation',
                                        type: 'post',
                                        contentType: 'application/json',
                                        data: JSON.stringify({
                                            "elementId": _this.elementId,//元素id
                                            "regulationId":regulationId //规则id                                
                                        }),
                                        success: function (data) {
                                            _this.inputMaxLength = data.inputMaxLength,
                                            _this.inputMinLength= data.inputMinLength,
                                            _this.inputMust= data.inputMust == true?"true":"false",
                                            _this.inputSpecialCh= data.inputSpecialCh,
                                            _this.inputValue= data.inputValue,
                                            _this.isRestraint= data.isRestraint == true?"true":"false",
                                            _this.order= data.order
                                            var arr = data.inputSpecialCh.split(",")
                                            document.getElementById("chinese").checked= false
                                            document.getElementById("special").checked= false
                                            if(arr[0] != ""){
                                                console.log(arr)
                                                arr.forEach(function (item){
                                                    document.getElementById(item).checked= true
                                                })
                                            }
                                        }
                                    });
                                }
                            }
                            else{
                                if("weblist" == classType){
                                    classType = "select_element"
                                }
                                if("webbutton" == classType)
                                    classType = "single_element"
                                if(regulationId != null){
                                    $.ajax({
                                        url: address3 + 'regulationController/searchSingleRegulation',
                                        type: 'post',
                                        contentType: 'application/json',
                                        data: JSON.stringify({
                                            "elementId": _this.elementId,//元素id
                                            "regulationId":regulationId,//规则id    
                                            "type":classType                            
                                        }),
                                        success: function (data) {
                                            _this.selectValue= data.value,
                                            _this.order= data.order

                                        }
                                    });
                                }
                            }
                        }
                    },

                }
            },
        }
    },
    ready: function () {
        this.getAutandTrans();
        var _this = this;
        $(".myFileUpload").change(function () {
            var arrs = $(this).val().split('\\');
            var filename = arrs[arrs.length - 1];
            $(".show").val(filename);
        });
        $('.-1 a').css({color: '#ff6c60'});

    },
    watch: {
    },
    methods: {
        downloadRecorder: function(){
            window.location.href = address4 + "atf-data/atf-recorder.zip";
        },
        addrule(){
            var _this = this;
            if(_this.ruleName!='' && _this.ruleDesc!='') {
                sessionStorage.setItem('ruleName', _this.ruleName);
                sessionStorage.setItem('ruleDesc', _this.ruleDesc);
                window.open('ruleinput.html?ruleName='+_this.ruleName+'&ruleDesc='+_this.ruleDesc,'_blank');
            } else {
                Vac.alert('规则名称和描述不能为空');
            }
            
        },
        linkDownload (url) {
            window.open(url,'_blank') // 新窗口打开外链接
        },
        //初始化获取测试系统和功能点
        getAutandTrans: function () {
            var _this = this;
            _this.autId = sessionStorage.getItem("autId");
            _this.transactId = sessionStorage.getItem("transactId");
            // 获取ui和element
            $.ajax({
                url: address3 + 'elementRepository/queryAllElementsForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": _this.transactId }),
                success: function (data) {
                    if (data !== null) {
                        var nodes = [];
                        var uis = data.uis;
                        for (var i = 0; i < uis.length; i++) {
                            var uiNode = {};
                            uiNode.id = uis[i].uiId;
                            uiNode.name = uis[i].uiName;
                            uiNode.regulationId = uis[i].regulationId;
                            let elements = uis[i].elements;
                            if (elements) {
                                uiNode.children = [];
                                for (var j = 0; j < elements.length; j++) {
                                    var eleNode = {};
                                    eleNode.id = elements[j].elementId;
                                    eleNode.classType = elements[j].classType;
                                    eleNode.name = elements[j].elementName;
                                    uiNode.children.push(eleNode);
                                }
                            }
                            nodes.push(uiNode);
                        }
                        $.fn.zTree.init($("#elementtree"), _this.setting1, nodes);
                        _this.elementRepositoryId = data.elementRepositoryId;
                        fuzzySearch('elementtree', '#keyword', null, true);
                    }
                }
            });
            // 获取classtype
            _this.classtypeSelect();
        },
        //获取测试系统
        autSelect: function () {
            $.ajax({
                async: false,
                url: address3 + "aut/queryListAut",
                type: "POST",
                async: false,
                contentType: 'application/json',
                success: function (data) {
                    this.autList = data.autRespDTOList;
                    // var str = "";
                    // for (var i = 0; i < autList.length; i++) {

                    //     str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
                    // }

                    // $('#autSelect').html(str);

                }
            });
        },
        //获取classtype
        classtypeSelect: function () {
            var _this = this;
            $.ajax({
                url: address3 + 'aut/queryAutVisibleOmClasses',
                contentType: 'application/json',
                data: JSON.stringify({ 'id': _this.autId }),
                type: "POST",
                success: function (data) {
                    if (data.respCode == "0000") {
                        if (data.arcClassRespDTOList == null)
                        _this.classtypeList = data.omClassRespDTOList;
                        else
                        _this.classtypeList = data.omClassRespDTOList.concat(data.arcClassRespDTOList);
                    }
                    else {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                }
            });
        },
        //修改功能点
        update: function () {
            var self = this;
            $.ajax({
                url: address3 + 'transactController/modifySingleTransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: $('#transactSelect').val(),
                    code: $('#updateForm input[name="code"]').val(),
                    nameMedium: $('#updateForm input[name="nameMedium"]').val(),
                    descShort: $('#updateForm textarea[name="descShort"]').val(),
                }),
                success: function (data) {
                    // console.info(data);
                    if (data.respCode == '0000') {
                        $('#successModal').modal();
                    } else {
                        alert(data.respMsg)
                    }
                },
                error: function () {
                    alert(data.respMsg)
                }
            });
        },
        //设置所属测试系统和所属功能点为上级页面选中的值
        setval: function () {
            this.autId = sessionStorage.getItem("autId");
            this.transactId = sessionStorage.getItem("transactId");
            $("#autSelect").val(this.autId);
            $("#transactSelect").val(this.transactId);
        },
        addUI: function () {
            var _this = this;
            var UIName = $("#addUIName").val(),
                relateIdentifyObjectId = $("#addRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addRelateParentIdentifyObjectId").val();
            if (UIName == '') {
                alert('UI名称不能为空');
            } else {
                var uiNames;
                var uis = [];
                if (UIName.indexOf(',') > 0) {//批量
                    uiNames = UIName.split(",");
                    for (var i = 0; i < uiNames.length; i++) {
                        let ui = {};
                        ui.uiName = uiNames[i];
                        uis.push(ui);
                    }
                } else {//单个
                    let ui = {};
                    ui.uiName = UIName;
                    uis.push(ui);
                }
                $.ajax({
                    url: address3 + 'elementRepository/batchAddUI',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        'repositoryId': _this.elementRepositoryId,
                        'uis': uis
                    }),
                    success: function (data) {
                        if (data.respCode == 0000) {
                            $('#successModal').modal('show');
                            _this.getElementTree();
                            $("#addUIName").val('');
                        } else {
                            _this.failMSG = data.respMsg;
                            $('#failModalEle').modal('show');
                            $("#addUIName").val('');
                        }
                    },
                    error: function () {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                        $("#addUIName").val('');
                    }
                });
            }
        },
        delUI: function () {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getSelectedNodes();
            var id = nodes[0].id;
            $.ajax({
                url: address3 + 'elementRepository/deleteSingleUI',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "uiId": id,
                    "repositoryId": _this.elementRepositoryId
                }),
                success: function (data) {
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                        _this.getElementTree();
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModalEle').modal('show');
                }
            });
        },
        updateUI: function () {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                uiId = nodes[0].id,
                RUIName = $('#RUIName').val(),
                LtreeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
            var Lnodes,
                relateIdentifyObjectId,
                relateParentIdentifyObjectId;
            if (LtreeObj) {
                Lnodes = LtreeObj.getSelectedNodes();
                if (Lnodes.length !== 0) {
                    relateIdentifyObjectId = Lnodes[0].objectId;
                    relateParentIdentifyObjectId = Lnodes[0].parentObjectId;
                } else {
                    relateIdentifyObjectId = '';
                    relateParentIdentifyObjectId = '';
                }

            } else {
                relateIdentifyObjectId = '';
                relateParentIdentifyObjectId = '';
            }
            $.ajax({
                url: address3 + 'elementRepository/modifySingleUI',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'repositoryId': _this.elementRepositoryId,
                    "uiId": uiId,
                    "uiName": RUIName,
                    "relateIdentifyObjectId": relateIdentifyObjectId
                }),
                success: function (data) {
                    // console.info(data);
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                        _this.getElementTree();
                        $('#blank').css('display', 'block');
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'none');
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModalEle').modal('show');
                    $('#blank').css('display', 'block');
                    $('#UI').css('display', 'none');
                    $('#ele').css('display', 'none');
                }
            });
        },
        addObj: function () {
            var _this = this;
            var objName = $("#addObjName").val(),
                treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var parentid = 0, nodes;
            if (treeObj) {
                nodes = treeObj.getSelectedNodes(true);
                if (nodes.length === 0) {
                    parentid = "0";
                } else {
                    parentid = nodes[0].objectId;
                }
            }
            var objNames;
            var objects = [];
            if (objName.indexOf(',') > 0) {//批量
                objNames = objName.split(',');
                for (var i = 0; i < objNames.length; i++) {
                    let object = {};
                    object.objectName = objNames[i];
                    object.parentObjectId = parentid;
                    objects.push(object);
                }
            } else {//单个
                let object = {};
                object.objectName = objName;
                object.parentObjectId = parentid;
                objects.push(object);
            }
            $.ajax({
                url: address2 + '/objectRepository/batchAddOrModifyObject',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "repositoryId": _this.repositoryId,
                    "objects": objects
                }),
                success: function (data) {
                    // console.info(data);
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                    } else {
                        _this.faliMSG = data.respMsg;
                        $('#failModal').modal();
                    }
                },
                error: function () {
                    _this.faliMSG = data.respMsg;
                    $('#failModal').modal();
                }
            });
        },
        delObj: function () {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var nodes = treeObj.getSelectedNodes(true);
            var ids;
            for (var i = 0; i < nodes.length; i++) {
                ids = nodes[i].objectId;
            }

            $.ajax({
                url: address2 + '/objectRepository/deleteSingleObject',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "repositoryId": _this.repositoryId,
                    "objectId": ids
                }),
                success: function (data) {
                    // console.info(data);
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                    } else {
                        _this.faliMSG = data.respMsg;
                        $('#failModal').modal();
                    }
                },
                error: function () {
                    _this.faliMSG = data.respMsg;
                    $('#failModal').modal();
                }
            });
        },
        updateObj: function () {
            var _this = this
            var treeObj = $.fn.zTree.getZTreeObj("objectTree"),
                nodes = treeObj.getSelectedNodes(true),
                id = nodes[0].objectId,
                name = $('#objForm input[name="name"]').val(),
                parentObjectId = nodes[0].parentObjectId,
                classtype = $('#objclasstypeSelect').val();
            //主属性
            var mainTd,
                mainProperties = [],
                mainItem = {};
            $('#objmainProp').find('tr').each(function () {
                mainTd = $(this).children();
                mainItem.name = mainTd.eq(1).html();
                mainItem.value = mainTd.eq(2).html();
                mainItem.method = '';
                mainItem.isRelative = null;
                mainItem.toolName = '';
                mainProperties.push(mainItem);
            });
            //附加属性
            var addiTd,
                additionalProperties = [],
                addiItem = {};
            $('#addiProp').find('tr').each(function () {
                addiTd = $(this).children();
                addiItem.name = addiTd.eq(1).html();
                addiItem.value = addiTd.eq(2).html();
                addiItem.method = '';
                addiItem.isRelative = null;
                addiItem.toolName = '';
                additionalProperties.push(addiItem);
            });
            //辅助属性
            var assiTd,
                assistantProperties = [],
                assiItem = {};
            $('#assisProp').find('tr').each(function () {
                assiTd = $(this).children();
                assiItem.name = assiTd.eq(1).html();
                assiItem.value = assiTd.eq(2).html();
                assiItem.method = '';
                assiItem.isRelative = null;
                assiItem.toolName = '';
                assistantProperties.push(assiItem);
            });
            //关联属性 
            var relTd,
                relateProperties = [],
                relItem = {};
            $('#relProp').find('tr').each(function () {
                relTd = $(this).children();
                relItem.name = relTd.eq(1).html();
                relItem.value = relTd.eq(2).html();
                relItem.method = '';
                relItem.isRelative = null;
                relItem.toolName = '';
                relateProperties.push(relItem);
            });
            $.ajax({
                url: address2 + '/objectRepository/modifySingleObject',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "repositoryId": _this.repositoryId,
                    "object": {
                        "objectId": id,
                        'objectName': name,
                        'classType': classtype,
                        'mainProperties': mainProperties,
                        'additionalProperties': additionalProperties,
                        'relateProperties': relateProperties,
                        'assistantProperties': assistantProperties
                    },
                }),
                success: function (data) {
                    // console.info(data);
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                        $('#obj').css('display', 'none');
                        $('#blank').css('display', 'block');
                    } else {
                        _this.faliMSG = data.respMsg;
                        $('#failModal').modal();
                    }
                },
                error: function () {
                    _this.faliMSG = data.respMsg;
                    $('#failModal').modal();
                }
            });
        },
        //下载模版
        downloadTemplate() {
            let autId = sessionStorage.getItem("autId");
            let url = address3 + "elementRepository/getExcelTemporary/" + autId
            window.location.href = url;
        },
        //导入
        upload: function () {
            var _this = this;
            let repositoryId = _this.elementRepositoryId,
                uploadUserId = sessionStorage.getItem('userId'),
                autId = sessionStorage.getItem("autId");

            formData = new FormData($('#importForm')[0]);
            formData.append('repositoryId', repositoryId);
            formData.append('uploadUserId', uploadUserId);
            formData.append('autId', autId);
            $.ajax({
                url: address3 + 'elementRepository/batchImportElementAndUi',
                type: 'POST',
                cache: false,
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    $('#batchImportModal').modal('hide');
                    if (data.respCode == 0000) {
                        $('#successModal').modal('show');
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModal2').modal('show');
                    }
                }, error: function (data) {
                    $('#batchImportModal').modal('hide');
                    $('#failModal').modal('show');
                }
            });
        },
        addProp: function (e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.append(this.propTr);
        },
        delProp: function (e) {
            var selectedTr = $("#ElementTbody").find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        },


        addElementsingle() {
            let treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes();
            if (nodes.length == 0) {
                $('#elementAlertModal').modal();
            } else {
                $('#addElementModal').modal();
            }
        },
        addElementbatch: function () {

            $('#addElementModalbatch').modal();

        },
        addElementinsingle: function () {
            var _this = this;
            var ElementName = $("#addElementName").val(),
                ClassType = $("#addEleClassType").val(), 
                addElemainattributename = $("#addElemainattributename").val(),
                addElemainattributeid = $("#addElemainattributeid").val(),
                relateIdentifyObjectId = $("#addEleRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addEleRelateParentIdentifyObjectId").val(),
                treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                selectedUIName = nodes[0].name,
                uiId = nodes[0].id;
            console.log('ClassType : '+ClassType)
            $.ajax({
                url: address2 + 'elementRepository/addSingleElement',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "repositoryId": _this.elementRepositoryId,
                    "uiId": uiId,
                    "element": {
                        "elementName": ElementName,
                        "classType": ClassType,
                        "relateIdentifyObjectId": relateIdentifyObjectId,
                        "relateParentIdentifyObjectId": relateParentIdentifyObjectId,
                        "mainProperties":
                            [
                                {
                                    "name": addElemainattributename,
                                    "value": addElemainattributeid,
                                    "method": "",
                                    "isRelative": null,
                                    "toolName": "",
                                }
                            ]

                    }
                }),
                success: function (data) {
                    console.info(data);
                    if (data.respCode == "0000") {
                        $('#successModal').modal();
                        _this.getElementTree();
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal();
                    }
                },
                error: function () {
                    $('#failModal').modal();
                }
            });
        },
        addElementinbatch: function () {
            var _this = this;
            var elements = [];
            $('#ElementTbody').find('tr').each(function () {
                let ElementTD = $(this).children(),
                    element = {};
                element.elementName = ElementTD.eq(1).html();
                element.classType = ElementTD.eq(2).find("option:selected").val();
                element.relateIdentifyObjectId = '';
                element.relateParentIdentifyObjectId = '';
                let mainProperties = [
                    {
                        "name": ElementTD.eq(3).html(),
                        "value": ElementTD.eq(4).html(),
                        "method": "",
                        "isRelative": null,
                        "toolName": "",
                    }
                ];
                element.mainProperties = mainProperties;
                elements.push(element);
            });
            var treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                selectedUIName = nodes[0].name,
                uiId = nodes[0].id;
            $.ajax({
                url: address2 + 'elementRepository/batchAddOrModifyElement',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "repositoryId": _this.elementRepositoryId,
                    "uiId": uiId,
                    "elements": elements
                }),
                success: function (data) {
                    console.info(data);
                    if (data.respCode == "0000") {
                        $('#successModal').modal();
                        _this.getElementTree();
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal();
                    }
                },
                error: function () {
                    $('#failModal').modal();
                }
            });
        },
        addeleProp: function (e) {
            var curTbody;
            var _this=this;
            if ($(e.target).context.className == "icon-plus")
                curTbody = $(e.target).parent().parent().next().find('tbody');
            else
                curTbody = $(e.target).parent().next().find('tbody');

            curTbody.children().filter('.text-center').remove();
            var elepropTr = _this.elepropTr,
                classtype = _this.classtypeList;
            for (var i = 0; i < classtype.length; i++) {
                elepropTr = elepropTr + "<option value=\"" + classtype[i].name + "\">" + classtype[i].name + "</option>";
            }
            elepropTr = elepropTr + '</select></td><td contenteditable="true"> </td><td contenteditable="true"> </td></tr>';
            curTbody.append(elepropTr);

        },
        addElement: function () {
            var _this = this;
            var ElementName = $("#addElementName").val(),
                ClassType = $("#classtypeSelect").val(),
                relateIdentifyObjectId = $("#addEleRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addEleRelateParentIdentifyObjectId").val(),
                treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                selectedUIName = nodes[0].name,
                uiId = nodes[0].id;
            if (ElementName == '') {
                alert('元素名称不能为空');
            } else {
                var elementNames;
                var elements = [];
                if (ElementName.indexOf(",") > 0) {//批量
                    elementNames = ElementName.split(",");
                    for (var i = 0; i < elementNames.length; i++) {
                        let element = {};
                        element.elementName = elementNames[i];
                        elements.push(element);
                    }
                } else {//单个
                    let element = {};
                    element.elementName = ElementName;
                    elements.push(element);
                }
                $.ajax({
                    url: address3 + 'elementRepository/batchAddOrModifyElement',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        'repositoryId': _this.elementRepositoryId,
                        "uiId": uiId,
                        "elements": elements
                    }),
                    success: function (data) {
                        if (data.respCode == 0000) {
                            $('#successModal').modal();
                            _this.getElementTree(selectedUIName);

                        } else {
                            _this.failMSG = data.respMsg;
                            $('#failModalEle').modal('show');
                        }
                    },
                    error: function () {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                });
            }
        },
        delElement: function () {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getSelectedNodes();
            var UIName = nodes[0].getParentNode().name;
            var elementId = nodes[0].id;
            var uiId = nodes[0].getParentNode().id;
            $.ajax({
                url: address3 + 'elementRepository/deleteSingleElement',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'repositoryId': _this.elementRepositoryId,
                    "elementId": elementId,
                    "uiId": uiId
                }),
                success: function (data) {
                    console.info(data);
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                        _this.getElementTree(UIName);
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModalEle').modal('show');
                }
            });
        },
        updateElement: function () {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes();
            var selectedUIName = _this.replacemess(nodes[0].getParentNode().name);
            if (nodes.length == 0) {
                alert('请先选中元素');
            } else {
                var uiId = nodes[0].getParentNode().id,
                    eleName = _this.replacemess(nodes[0].name),
                    elementId = nodes[0].id,
                    regulationId = nodes[0].getParentNode().regulationId,
                    classType = nodes[0].classType,
                    databoj = {};
                databoj.regulationId = regulationId;
                console.log(nodes[0])
                console.log(elementId)
                    
            }
            var rEleName = $('#rEleName').val(),
                LtreeObj = $.fn.zTree.getZTreeObj("eleLinkedTree");
            var Lnodes, relateIdentifyObjectId;
            if (LtreeObj) {
                Lnodes = LtreeObj.getSelectedNodes();
                if (Lnodes.length !== 0) {
                    relateIdentifyObjectId = Lnodes[0].objectId;
                } else {
                    relateIdentifyObjectId = '';
                }
            } else {
                relateIdentifyObjectId = '';
            }
            var PtreeObj = $.fn.zTree.getZTreeObj("eleParentTree");
            var Pnodes, relateParentIdentifyObjectId;
            if (PtreeObj) {
                Pnodes = PtreeObj.getSelectedNodes();
                if (Pnodes.length !== 0) {
                    relateParentIdentifyObjectId = Pnodes[0].objectId;
                } else {
                    relateParentIdentifyObjectId = '';
                }

            } else {
                relateParentIdentifyObjectId = '';
            }
            // 2017-10-24 classType改为发送名字
            // 控件类型
            var ClassType = $('#classtypeSelect').val();
            //主属性
            var mainTd,
                mainProperties = [];
            $('#mainTbody').find('tr').each(function (index,item) {
                mainTd = $(item).children();
                let mainItem = {}
                mainItem.name = mainTd.eq(1).html();
                mainItem.value = mainTd.eq(2).html();
                mainItem.method = '';
                mainItem.isRelative = null;
                mainItem.toolName = '';
                if(mainItem.name && mainItem.value){mainProperties.push(mainItem);}
            });
            $.ajax({
                url: address3 + 'elementRepository/modifySingleElement',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'repositoryId': _this.elementRepositoryId,
                    "uiId": uiId,
                    "element": {
                        "elementId": elementId,
                        "elementName": rEleName,
                        "classType": ClassType,
                        "relateIdentifyObjectId": relateIdentifyObjectId,
                        "relateParentIdentifyObjectId": relateParentIdentifyObjectId,
                        "mainProperties": mainProperties,
                        "additionalProperties": [],
                        "assistantProperties": [],
                        "relateProperties": []
                    }
                }),
                success: function (data) {
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                        _this.getElementTree(selectedUIName);
                        // treeObj.selectNode(nodes[0]);
                        $('#blank').css('display', 'block');
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'none');
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                }, 
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModalEle').modal('show');
                    $('#blank').css('display', 'block');
                    $('#UI').css('display', 'none');
                    $('#ele').css('display', 'none');
                }
            });
        },
        // 添加主属性
        addMainProp: function () {
            var curTbody = $('#mainTbody');
            curTbody.append(this.mainPropTr);
        },
        // 删除主属性
        delMainProp: function () {
            var selectedTr = $('#mainTbody').find('input[name="mainProp"]:checked').parent().parent();
            selectedTr.remove();
        },
        // 页面初始化获取元素库
        getElementTree: function (uiName) {
            var _this = this;
            var transactId = this.transactId;
            $.ajax({
                url: address3 + 'elementRepository/queryAllElementsForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transactId }),
                success: function (data) {
                    if (data !== null) {
                        var nodes = [];
                        var uis = data.uis;
                        if (uis != null) {
                            for (var i = 0; i < uis.length; i++) {
                                var uiNode = {};
                                uiNode.id = uis[i].uiId;
                                uiNode.name = uis[i].uiName;
                                uiNode.regulationId = uis[i].regulationId;
                                let elements = uis[i].elements;
                                if (elements) {
                                    uiNode.children = [];
                                    for (var j = 0; j < elements.length; j++) {
                                        var eleNode = {};
                                        eleNode.id = elements[j].elementId;
                                        eleNode.classType = elements[j].classType;
                                        eleNode.name = elements[j].elementName;
                                        uiNode.children.push(eleNode);
                                    }
                                }
                                nodes.push(uiNode);
                            }
                        }
                        $.fn.zTree.init($("#elementtree"), _this.setting1, nodes);
                        _this.elementRepositoryId = data.elementRepositoryId;
                        if (uiName != null) {
                            var zTree = $.fn.zTree.getZTreeObj("elementtree");
                            var pNode = zTree.getNodeByParam('name', uiName, null);
                            zTree.expandNode(pNode, true, true, true, false);
                        }
                    }
                }
            });
            fuzzySearch('elementtree', '#keyword', null, true);
        },
        //禁止拖动
        zTreeBeforeDrag: function (treeId, treeNodes) {
            return false;
        },
        //用按钮查询节点  
        searchNodes: function () {
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var keywords = $("#keyword").val();
            var nodes = treeObj.getNodesByParamFuzzy("name", keywords, null);
            fuzzySearch('elementtree', '#keyword', null, true);
            // if (nodes.length > 0) {
            //     treeObj.selectNode(nodes[0]);
            //     treeObj.selectNode(nodes[1]);
            // }
        },
        /*elementtree end*/
 
      
        replacemess(str) {
            var name = str.replace(/<span style="color: whitesmoke;background-color: darkred;">/g, "").replace(/<\/span>/g, "");
            return name;
        },
        //跳转进入下一步
        next(){
            window.location.assign("quicklyTemplate.html")
        }
    }
})