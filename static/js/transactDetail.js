var app = new Vue({
    el: '#transactDetail',
    data: function () {
        var _this = this;
        return {
            autId: '',
            autList: [],
            transactId: '',
            transactList: [],
            transid: '',
            elementRepositoryId: 6,
            UIName: '',
            UITitle: 'UI',
            eleName: '',
            UILinked: '',
            eleParent: '',
            checkElementNodes:[],//基础脚本界面 用于生成选中元素的顺序
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
            functionsList: {}, // 用于存储空间的方法详情，防止切换脚本是多次请求selectmethod接口
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
            nextTickFlag:false, // 是否进行渲染
            // parameterVue: null,
            // ztree的设置项
            zTreeSettings: {
                uiAndElement: {
                    callback: {},
                    data: {
                        key: {
                            children: 'children',
                            isParent: 'isParent',
                            name: 'name',
                            rootPId: 0
                        }
                    },
                    view:{
                        txtSelectedEnable: true
                    }
                },
                functions: {
                    callback: {},
                    data: {
                        key: {
                            name: "name",
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    }
                }
            },
            zTreeSettings2: {
                uiAndElement: {
                    callback: {
                        onClick: function(event,treeId,treeNode) {
                            // console.log(this.getZTreeObj(treeId).setting.callback.onCheck)
                            try {
                                this.getZTreeObj(treeId).checkNode(treeNode, !treeNode.checked, true, true)
                            } catch (error) {
                                console.error(error)
                            }
                        },
                        onCheck: function (event, treeId, treeNode, clickFlag) {
                            var _this = app; 
                            if(!treeNode.parentTId){
                                if(!_this.checkFlag){
                                    _this.checkFlag.push(treeNode.id);
                                    console.log('!check')
                                }
                                else{
                                    let index = _this.checkFlag.indexOf(treeNode.id)
                                    if(index == -1){
                                        _this.checkFlag.push(treeNode.id);
                                    }
                                    else{
                                        _this.checkFlag.splice(index, 1); 
                                    }
                                }
                            }
                            else{//如果该节点有父节点，那么就说明点击的是子节点，进行判断顺序
                                if(!_this.checkElementNodes){
                                    _this.checkElementNodes.push(treeNode.tId);
                                }
                                else{
                                    let index = _this.checkElementNodes.indexOf(treeNode.tId)
                                    if(index == -1){
                                        _this.checkElementNodes.push(treeNode.tId);
                                    }
                                    else{
                                        _this.checkElementNodes.splice(index, 1); 
                                    }
                                }
                            }
                        },
                    },
                    data: {
                        key: {
                            children: 'children',
                            isParent: 'isParent',
                            name: 'name',
                            rootPId: 0
                        }
                    },
                    check: {
                        enable: true,
                        hkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
                    },
                    view:{
                        txtSelectedEnable: true
                    }
                },
                functions: {
                    callback: {
                    },
                    data: {
                        key: {
                            name: "name",
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    },
                    check: {
                        enable: true,
                        hkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
                    }
                }
            },
            uiOrFunctions: {
                changed: false, // 模态框出现后是否点击过，如果点击过，在模态框点击保存时才会进行更改
                type: 'ui', // 保存最后点击的是UI还是函数集，据此来确定不同的后续执行行为
                ui: '', // 保存点击的ui
                classType: '', // 保存元素类型
                element: '', // 保存点击的元素
                function: '', // 保存点击的函数集中的项
                target: null, // 保存点击编辑的target，据此可以获得parent tr
                index: 0 // 保存每一行的index
            },
            selectedScript: 0,

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
                        var transid = !_this.componentMode ? _this.transactId : _this.transid;
                        if (treeNode.level == 0) { //选择的是UI
                            $(':input', '#UIForm').val('');
                            _this.getObjTree();
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
                            _this.getEleParentObjectTree();
                            _this.getEleLinkedObjectTree();
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
                            var transid = !_this.componentMode ? _this.transactId : _this.transid;
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
            /*UILinked objecttree start*/
            setting2: {
                view: {
                    addHoverDom: false,
                    removeHoverDom: false,
                    selectedMulti: false
                },
                check: {
                    enable: false,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "s", "N": "ps" }
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'objectId', //id编号命名
                        pIdKey: 'parentObjectId', //父id编号命名
                        rootPId: 0
                    },
                    key: {
                        name: "objectName"
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
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        _this.UILinked = treeNode.objectName;
                    },

                }
            },
            setting3: {
                view: {
                    addHoverDom: false,
                    removeHoverDom: false,
                    selectedMulti: false
                },
                check: {
                    enable: false,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "s", "N": "ps" }
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'objectId', //id编号命名
                        pIdKey: 'parentObjectId', //父id编号命名
                        rootPId: 0
                    },
                    key: {
                        name: "objectName"
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
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        $('#obj').css('display', 'block');
                        $('#objblank').css('display', 'none');
                        $('objclasstypeSelect').val('');
                        _this.objName = treeNode.objectName;
                        _this.objTitle = treeNode.objectName;
                        $('#objForm input[name="name"]').val(treeNode.objectName);
                        _this.objId = treeNode.objectId;
                        $.ajax({
                            url: address2 + 'objectRepository/querySingleObject',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                'repositoryId': _this.repositoryId,
                                'objectId': _this.objId
                            }),
                            success: function (data) {
                                $('#objclasstypeSelect').val('');
                                var classtype = data.object.classType;
                                $('#objclasstypeSelect').val(classtype);
                                //主属性
                                var mainList = data.object.mainProperties;
                                if (mainList) {
                                    $('#objmainProp').children().remove();
                                    for (var i = 0; i < mainList.length; i++) {
                                        var mainTr = $('<tr></tr>'),
                                            mainCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            mainNameTd = $('<td contenteditable="true"></td>'),
                                            mainValTd = $('<td contenteditable="true"></td>');
                                        mainNameTd.html(mainList[i].name);
                                        mainValTd.html(mainList[i].value);
                                        mainTr.append(mainCheckTd, mainNameTd, mainValTd);
                                        $('#objmainProp').append(mainTr);
                                    }
                                } else {
                                    $('#objmainProp').children().remove();
                                    $('#objmainProp').append(_this.propTr);
                                }

                                //附加属性
                                var addiList = data.object.additionalProperties;
                                if (addiList) {
                                    $('#addiProp').children().remove();
                                    for (var j = 0; j < addiList.length; j++) {
                                        var addiTr = $('<tr></tr>'),
                                            addiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            addiNameTd = $('<td contenteditable="true"></td>'),
                                            addiValTd = $('<td contenteditable="true"></td>');
                                        addiNameTd.html(addiList[j].name);
                                        addiValTd.html(addiList[j].value);
                                        addiTr.append(addiCheckTd, addiNameTd, addiValTd);
                                        $('#addiProp').append(addiTr);
                                    }
                                } else {
                                    $('#addiProp').children().remove();
                                    $('#addiProp').append(_this.propTr);
                                }

                                //辅助属性
                                var assiList = data.object.assistantProperties;
                                if (assiList) {
                                    $('#assisProp').children().remove();
                                    for (var k = 0; k < assiList.length; k++) {
                                        var assiTr = $('<tr></tr>'),
                                            assiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            assiNameTd = $('<td contenteditable="true"></td>'),
                                            assiValTd = $('<td contenteditable="true"></td>');
                                        assiNameTd.html(assiList[k].name);
                                        assiValTd.html(assiList[k].value);
                                        assiTr.append(assiCheckTd, assiNameTd, assiValTd);
                                        $('#assisProp').append(assiTr);
                                    }
                                } else {
                                    $('#assisProp').children().remove();
                                    $('#assisProp').append(_this.propTr);
                                }
                                //关联属性
                                var relList = data.object.relateProperties;
                                if (relList) {
                                    $('#relProp').children().remove();
                                    for (var k = 0; k < relList.length; k++) {
                                        var relTr = $('<tr></tr>'),
                                            relCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            relNameTd = $('<td contenteditable="true"></td>'),
                                            relValTd = $('<td contenteditable="true"></td>');
                                        relNameTd.html(relList[k].name);
                                        relValTd.html(relList[k].value);
                                        relTr.append(relCheckTd, relNameTd, relValTd);
                                        $('#relProp').append(relTr);
                                    }
                                } else {
                                    $('#relProp').children().remove();
                                    $('#relProp').append(_this.propTr);
                                }

                            },
                            error: function () {
                                _this.faliMSG = data.respMsg;
                                $('#failModal').modal();
                            }
                        });
                    },
                    onMouseUp: function (event, treeId, treeNode) {
                        // 取消树节点选中状态
                        var treeObj = $.fn.zTree.getZTreeObj("objectTree");
                        treeObj.cancelSelectedNode(treeNode);
                    }
                }
            },
        }
    },
    ready: function () {
        this.getAutandTrans();
        var _this = this;
        $('#autSelect').change(function () {
            _this.transactSelect();
            _this.autId = $('#autSelect').val();
            _this.transactId = $('#transactSelect').val();

        });
        $('#transactSelect').change(function () {
            _this.transactId = $('#transactSelect').val();
            _this.getElementTree();
            _this.detailTabFresh();
            _this.getObjTree();

            _this.getScriptTemplate();
        });
        $(".myFileUpload").change(function () {
            var arrs = $(this).val().split('\\');
            var filename = arrs[arrs.length - 1];
            $(".show").val(filename);
        });
        $('#addtemplateModal').on('hidden.bs.modal', function (e) {
            _this.newTemplate = {
                name: '',
                description: ''
            }
        })
        this.zTreeSettings.uiAndElement.callback.onClick = this.zTreeOnClick;
        this.zTreeSettings.functions.callback.onClick = this.zTreeOnClick;
        this.setDrag();
        $('.2').addClass('open');
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({ display: 'block' });
        $('.2-0').css({ color: '#ff6c60' });
        _this.detailTabFresh();
    },
    watch: {
        operationRows: {
            handler(n,o) {
                this.setDrag();
                if(this.nextTickFlag){
                    this.para()
                    console.log("operationRows渲222染了")
                    this.nextTickFlag = false
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        //切换tab页
        switchTab(flag){
            if(flag == 1){
                eleFlag =true;
                progressbar.progressList[0].item[3].status = ""
            }
            else{
                eleFlag =false
                progressbar.progressList[0].item[3].status = "active"
            }

        },
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
            $.ajax({
                url: address3 + "aut/queryListAut",
                type: "POST",
                async: false,
                contentType: 'application/json',
                success: function (data) {
                    if (data.respCode !== '0000') {
                        Vac.alert('查询测试系统失败');
                        return;
                    }
                    _this.autList = data.autRespDTOList;
                    console.log(_this.autList);
                    // var str = "";
                    // for (var i = 0; i < autList.length; i++) {

                    //     str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
                    // }

                    // $('#autSelect').html(str);
                    _this.autId = sessionStorage.getItem("autId");
                    $("#autSelect").val(_this.autId);
                    $.ajax({
                        url: address3 + 'transactController/queryTransactsByAutId',
                        type: 'POST',
                        async: false,
                        contentType: 'application/json',
                        data: JSON.stringify({ 'id': _this.autId }),
                        success: function (data) {
                            if (data.respCode !== '0000') {
                                Vac.alert('查询测试系统失败');
                                return;
                            }
                            _this.transactList = data.transactRespDTOs;
                            let transactList = data.transactRespDTOs;
                            console.log(transactList);
                            var str = "";
                            for (var i = 0; i < transactList.length; i++) {
                                if (transactList[i].transType == null || transactList[i].transType == 1)
                                    str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                            }
                            $('#transactSelect').html(str);
                            _this.transactId = sessionStorage.getItem("transactId");
                            $("#transactSelect").val(_this.transactId);

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
                            _this.getObjTree();
                            _this.getEleParentObjectTree();
                            _this.getEleLinkedObjectTree();
                            _this.getScriptTemplate(1); // 开始时传值为1 则不进行scriptTemplate/queryScriptInfo提示错误信息  来自测试的需求1013
                        }

                    });
                }
            });
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
        //详情tab页的刷新
        detailTabFresh: function () {
            var id = $('#transactSelect').val() != null ? $('#transactSelect').val() : sessionStorage.getItem("transactId");
            $.ajax({
                async: false,
                url: address3 + 'transactController/querySingleTransact',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    'id': id,
                }),
                success: function (data) {
                    if (data.respCode == '0000') {
                        $('#code').val(data.code);
                        $('#nameMedium').val(data.nameMedium);
                        $('#descShort').val(data.descShort);
                    }
                    else {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
                    }
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
                        $('#failModal').modal('show');
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
            var transid = !this.componentMode ? this.transactId : this.transid;
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
                            $('#successModalEle').modal('show');
                            _this.getElementTree();
                            $("#addUIName").val('');
                        } else {
                            _this.failMSG = data.respMsg;
                            $('#failModal').modal('show');
                            $("#addUIName").val('');
                        }
                    },
                    error: function () {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
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
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
                    }
                },
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModal').modal('show');
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
                        $('#successModalEle').modal();
                        _this.getElementTree();
                        $('#blank').css('display', 'block');
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'none');
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
                    }
                },
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModal').modal('show');
                    $('#blank').css('display', 'block');
                    $('#UI').css('display', 'none');
                    $('#ele').css('display', 'none');
                }
            });
        },
        tableClick:function(){
            if(!$('#checkHi').attr('checked')){
                $('#checkHi').prop("checked",true);
            }
            else {
                $('#checkHi').prop("checked",false);
            }

        },
        addObj: function () {
            var _this = this;
            var objName = $("#addObjName").val(),
                treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
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
                        _this.getObjTree();
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
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
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
                        _this.getObjTree();
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
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
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
            var transid = !this.componentMode ? _this.transactId : _this.transid;
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
                        $('#successModalEle').modal();
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
        addElementinbatch: function () {
            var _this = this;
            var transid = !this.componentMode ? _this.transactId : _this.transid;
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
                        $('#successModalEle').modal();
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
        //点击保存按钮后更新属性
        updateProp: function () {
            var _this = this
            var transid = !this.componentMode ? this.transactId : this.transid;
            const treeObj = $.fn.zTree.getZTreeObj("objectTree"),
                nodes = treeObj.getSelectedNodes(true),
                id = nodes[0].objectId,
                classtype = $('#objclasstypeSelect').val();
            $.ajax({
                url: address2 + '/objectRepository/querySingleObject',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'repositoryId': _this.repositoryId,
                    'objectId': id
                }),
                success: function (data) {
                    $('#objclasstypeSelect').val(data.object.classType);
                    //主属性
                    var mainList = data.object.mainProperties;
                    if (mainList.length !== 0) {
                        $('#objmainProp').children().remove();
                        for (var i = 0; i < mainList.length; i++) {
                            var mainTr = $('<tr></tr>'),
                                mainCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                mainNameTd = $('<td contenteditable="true"></td>'),
                                mainValTd = $('<td contenteditable="true"></td>');
                            mainNameTd.html(mainList[i].name);
                            mainValTd.html(mainList[i].value);
                            mainTr.append(mainCheckTd, mainNameTd, mainValTd);
                            $('#objmainProp').append(mainTr);
                        }
                    } else {
                        $('#objmainProp').children().remove();
                        $('#objmainProp').append(_this.propTr);
                    }

                    //附加属性
                    var addiList = data.object.additionalProperties;
                    if (addiList.length !== 0) {
                        $('#addiProp').children().remove();
                        for (var j = 0; j < addiList.length; j++) {
                            var addiTr = $('<tr></tr>'),
                                addiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                addiNameTd = $('<td contenteditable="true"></td>'),
                                addiValTd = $('<td contenteditable="true"></td>');
                            addiNameTd.html(addiList[j].name);
                            addiValTd.html(addiList[j].value);
                            addiTr.append(addiCheckTd, addiNameTd, addiValTd);
                            $('#addiProp').append(addiTr);
                        }
                    } else {
                        $('#addiProp').children().remove();
                        $('#addiProp').append(_this.propTr);
                    }

                    //辅助属性
                    var assiList = data.object.assistantProperties;
                    if (assiList.length !== 0) {
                        $('#assisProp').children().remove();
                        for (var k = 0; k < assiList.length; k++) {
                            var assiTr = $('<tr></tr>'),
                                assiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                assiNameTd = $('<td contenteditable="true"></td>'),
                                assiValTd = $('<td contenteditable="true"></td>');
                            assiNameTd.html(assiList[k].name);
                            assiValTd.html(assiList[k].value);
                            assiTr.append(assiCheckTd, assiNameTd, assiValTd);
                            $('#assisProp').append(assiTr);
                        }
                    } else {
                        $('#assisProp').children().remove();
                        $('#assisProp').append(_this.propTr);
                    }

                    //关联属性
                    var relList = data.object.relateProperties;
                    if (relList.length !== 0) {
                        $('#relProp').children().remove();
                        for (var k = 0; k < relList.length; k++) {
                            var relTr = $('<tr></tr>'),
                                relCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                relNameTd = $('<td contenteditable="true"></td>'),
                                relValTd = $('<td contenteditable="true"></td>');
                            relNameTd.html(relList[k].name);
                            relValTd.html(relList[k].value);
                            relTr.append(relCheckTd, relNameTd, relValTd);
                            $('#relsProp').append(relTr);
                        }
                    } else {
                        $('#relProp').children().remove();
                        $('#relProp').append(_this.propTr);
                    }

                },
                error: function () {
                    _this.faliMSG = data.respMsg;
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
            var transid = !this.componentMode ? _this.transactId : _this.transid;
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
                            $('#successModalEle').modal();
                            _this.getElementTree(selectedUIName);

                        } else {
                            _this.failMSG = data.respMsg;
                            $('#failModal').modal('show');
                        }
                    },
                    error: function () {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
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
                        $('#successModalEle').modal();
                        _this.getElementTree(UIName);
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
                    }
                },
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModal').modal('show');
                }
            });
        },
        updateElement: function () {
            var _this = this;
            var transid = !this.componentMode ? this.transactId : this.transid;
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
                        $('#successModalEle').modal();
                        _this.getElementTree(selectedUIName);
                        // treeObj.selectNode(nodes[0]);
                        $('#blank').css('display', 'block');
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'none');
                    } else {
                        _this.failMSG = data.respMsg;
                        $('#failModal').modal('show');
                    }
                }, 
                error: function () {
                    _this.failMSG = data.respMsg;
                    $('#failModal').modal('show');
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
        // 添加附加属性
        addAddiProp: function () {
            var curTbody = $('#addiTbody');
            curTbody.append(this.addiPropTr);
        },
        // 删除附加属性
        delAddiProp: function () {
            var selectedTr = $('#addiTbody').find('input[name="addiProp"]:checked').parent().parent();
            selectedTr.remove();
        },
        // 添加辅助属性
        addAssiProp: function () {
            var curTbody = $('#assiTbody');
            curTbody.append(this.assiPropTr);
        },
        // 删除辅助属性
        delAssiProp: function () {
            var selectedTr = $('#assiTbody').find('input[name="assiProp"]:checked').parent().parent();
            selectedTr.remove();
        },
        //添加关联元素属性
        addLinkedProp: function () {
            var curTbody = $('#relatePropTbody');
            curTbody.append(this.linkedPropTr);
        },
        // 删除关联元素属性
        delLinkedProp: function () {
            var selectedTr = $('#relatePropTbody').find('input[name="linkProp"]:checked').parent().parent();
            selectedTr.remove();
        },

        // 页面初始化获取元素库
        getElementTree: function (uiName) {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address3 + 'elementRepository/queryAllElementsForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transid }),
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
        // 页面初始化获取对象库
        getObjTree: function () {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address3 + 'objectRepository/queryAllObjectForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transid }),
                success: function (data) {
                    if (data !== null) {
                        var objects = data.objects;
                        $.fn.zTree.init($("#objectTree"), _this.setting3, objects);
                        _this.repositoryId = data.repositoryId;
                        $.fn.zTree.init($("#UILinkedTree"), _this.setting2, objects);
                    }

                }
            });
        },
        //UI关联对象库中对象
        setUILinked: function () {
            var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree"),
                nodes = treeObj.getSelectedNodes(),
                obj = nodes[0].objectName;
            if (nodes[0].getParentNode()) {
                var pObj = nodes[0].getParentNode().objectName;
                $('#UILinkedInput').val(pObj + ' / ' + obj);
            } else {
                $('#UILinkedInput').val(obj);
            }
        },
        //解除关联
        removeUILinked: function () {
            var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
            treeObj.cancelSelectedNode();
            $('#UILinkedInput').val('');
            // $('#successModalEle').modal();
        },
        /*UILinked objecttree end*/
        // 页面初始化获取对象库
        getEleParentObjectTree: function () {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address3 + 'objectRepository/queryAllObjectForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transid }),
                success: function (data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#eleParentTree"), _this.setting2, data.objects);
                    }
                }
            });
        },
        //设置对象库中父对象
        setEleParent: function () {
            var treeObj = $.fn.zTree.getZTreeObj("eleParentTree"),
                nodes = treeObj.getSelectedNodes(),
                obj = nodes[0].objectName;
            if (nodes[0].getParentNode()) {
                var pObj = nodes[0].getParentNode().objectName;
                $('#eleParentInput').val(pObj + ' / ' + obj);
            } else {
                $('#eleParentInput').val(obj);
            }
        },
        // 解除关联对象库中父对象
        removeEleParent: function () {
            var treeObj = $.fn.zTree.getZTreeObj("eleParentTree");
            treeObj.cancelSelectedNode();
            $('#eleParentInput').val('');
            // $('#successModalEle').modal();
        },
        /*eleParent objecttree end*/
        // 页面初始化获取对象库
        getEleLinkedObjectTree: function () {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address3 + 'objectRepository/queryAllObjectForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transid }),
                success: function (data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#eleLinkedTree"), _this.setting2, data.objects);
                    }
                }
            });
        },
        //设置对象库中关联对象
        setEleLinked: function () {
            var treeObj = $.fn.zTree.getZTreeObj("eleLinkedTree"),
                nodes = treeObj.getSelectedNodes(),
                obj = nodes[0].objectName;
            if (nodes[0].getParentNode()) {
                var pObj = nodes[0].getParentNode().objectName;
                $('#eleLinkedInput').val(pObj + ' / ' + obj);
            } else {
                $('#eleLinkedInput').val(obj);
            }
        },
        // 解除对象库中关联对象
        removeEleLinked: function () {
            var treeObj = $.fn.zTree.getZTreeObj("eleLinkedTree");
            treeObj.cancelSelectedNode();
            $('#eleLinkedInput').val('');
            // $('#successModalEle').modal();
        },
        /*eleLinked objecttree end*/
        //勾选关联元素名称
        relateNameClick: function (event) {
            if ($(event.target).attr('checked')) { }
        },
        transactSelect: function () {
            var val = $('#autSelect').val();
            var _this = this;
            Vac.ajax({
                async: true,
                url: address3 + 'transactController/queryTransactsByAutId',
                data: JSON.stringify({ 'id': val }),
                type: "POST",
                async: false,
                success: function (data) {
                    if (data.respCode === '0000') {
                        _this.transactList = data.transactRespDTOs;
                        let transactList = data.transactRespDTOs;
                        var str = "";
                        for (var i = 0; i < transactList.length; i++) {
                            if (transactList[i].transType == null || transactList[i].transType == 1) {
                                if (i == 0)
                                    str += " <option value='" + transactList[i].id + "' selected='selected' >" + transactList[i].nameMedium + "</option> ";
                                else
                                    str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                            }
                        }
                        $('#transactSelect').html(str);
                        $('#transactSelect').selectpicker('refresh');
                        if (str == "") {
                            Vac.alert("该测试系统无UI功能点");
                            return;
                        }
                        _this.transactId = $('#transactSelect').val();
                        _this.detailTabFresh();
                        _this.getElementTree();
                        _this.classtypeSelect();
                        _this.getObjTree();
                        _this.getScriptTemplate();

                    } else {
                        Vac.alert(respMsg);
                    }
                }
            });
        },
        getScriptTemplate: function (flag) {
            var _this = this;
            if (_this.scriptIsChanged) {
                var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "编辑后的基础脚本未保存，是否保存？");
                promise.then(() => {
                    _this.tableSave();
                    getTemplate(flag);
                    _this.scriptIsChanged = false
                }, () => {
                    getTemplate(flag);
                    _this.scriptIsChanged = false
                })
            } else {
                getTemplate(flag);
            }
            function getTemplate(flag) {
                Vac.ajax({
                    url: address3 + 'scriptTemplate/queryTemplateByTransId',
                    data: { 'id': _this.transactId },
                    success: function (data) {
                        _this.templateList = data.o;
                        if (data.respCode == '0000') {
                            _this.templateList = data.scriptTemplateList;
                            if (_this.templateList.length) {
                                _this.checkedTemplate = [0];
                                _this.showScripttemplateTable({
                                    "autId": $('#autSelect').val(),
                                    "scriptId": _this.templateList[0].id,
                                    'flag':flag
                                });
                                _this.selectedScript = 1;
                            } else {
                                _this.checkedTemplate = [];
                                _this.selectedScript = 0;
                            }
                        } else {
                            console.log("1________________"+flag)
                            if(flag === 1){ return }
                            Vac.alert(data.respMsg);
                        }
                    }
                });
            }
        },
        change: function (event) {
            var value = +event.target.value;
            var array = this.checkedTemplate.slice(0);
            var _this = this;
            var index = $(event.target).val();
            if (event.target.checked) {
                if (this.scriptIsChanged) {
                    var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "编辑后的基础脚本未保存，是否保存？");
                    promise.then(() => {
                        _this.tableSave();
                        // this.checkedTemplate = this.checkedTemplate.slice(0, -1)
                        // event.preventDefault()
                        // return
                        _this.scriptIsChanged = false
                        _this.checkedTemplate = [+value]
                        process(value)
                        event.preventDefault()
                    }, () => {
                        _this.scriptIsChanged = false
                        _this.checkedTemplate = [+value]
                        process(value)
                        event.preventDefault()
                    })
                } else {
                    this.checkedTemplate = [value]
                    process(value)
                }
            } else {
                // event.preventDefault()
                if (this.scriptIsChanged) {
                    var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "编辑后的基础脚本未保存，是否保存？");
                    promise.then(() => {
                        _this.tableSave();
                        // this.checkedTemplate = this.checkedTemplate.slice(0)
                        // this.checkedTemplate = [+value]
                        // return
                        _this.scriptIsChanged = false
                        _this.checkedTemplate = []
                        _this.selectedScript = 0;
                        event.target.checked = false;
                    }, () => {
                        _this.scriptIsChanged = false
                        _this.checkedTemplate = []
                        _this.selectedScript = 0;
                        event.target.checked = false;
                    })
                } else {
                    _this.checkedTemplate = []
                    _this.selectedScript = 0
                    // $(`input[value='${index}']`).prop('checked', false);
                }
            }
            // 查询模板脚本
            function process(value) {
                var length = _this.checkedTemplate.length;
                // if(length > 1) {
                //     _this.checkedTemplate.shift()
                // }
                _this.selectedScript = 1;
                if (length > 0) {
                    var templateId = +value;
                    _this.script_id = _this.templateList[templateId].id;
                    var data = {
                        autId: _this.autId,
                        scriptId: _this.templateList[templateId].id
                    };
                    _this.showScripttemplateTableArgs = {
                        aut_id: _this.autId,
                        script_id: _this.templateList[templateId].id
                    }
                    _this.operationRows = [];
                    Vac.ajax({
                        url: address3 + 'scriptTemplate/queryScriptInfo',
                        data: data,
                        // data: {"autId":"122","scriptId":1530},
                        success: function (data) {
                            // _this.scriptIsChanged = false
                            _this.operationRows = []
                            if (data.respCode === '0000') {
                                // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[{Name:'', Value: ''}]}}
                                _this.scriptLength = data.data.length
        
                                for (var operationRow of data.data) {
                                    let row = {
                                        id: null,
                                        functions: [],
                                        operation: {
                                            element: '',
                                            ui: '',
                                            classType: ''
                                        },
                                        parameters: []
                                    }
                                    row.id = Symbol()
                                    if(_this.functionsList[operationRow.elementWidget]){
                                        row.functions = _this.functionsList[operationRow.elementWidget];
                                    }
                                    else{
                                        Vac.ajax({
                                            url: address3 + 'aut/selectMethod',
                                            data: {
                                                id: _this.autId, // autid
                                                classname: operationRow.elementWidget, // classname
                                            },
                                            success: function (data) {
                                                if (data.respCode === '0000' && data.omMethodRespDTOList) {
                                                    var { functions, parameterlist } = _this.setFunctionAndParameter(data.omMethodRespDTOList);
                                                    row.functions = functions;
                                                } else {
                                                    Vac.alert('查询数据出错！');
                                                }
                                            }
                                        })
                                    }
                                    row.selectedFunc = operationRow.methodName
                                    row.operation.element = operationRow.elementName
                                    row.operation.ui = operationRow.uiname
                                    row.operation.classType = operationRow.elementWidget
                                    for (let para of operationRow.arguments) {
                                        row.parameters.push({
                                            Name: para.name,
                                            Value: para.value
                                        })
                                    }
                                    // 插入到operationRows中
                                    _this.operationRows.push(row)
                                    // _this.operationRows = [row]
                                }
                            } else {
                                Vac.alert(data.respMsg);
                            }
                        }
                    });
                }
            }
        },
        showScripttemplateTable: function (args) { //展示该脚本的所有信息
            var _this = this;
            if(args.autId==null){
                return
            }
            Vac.ajax({
                url: address3 + 'scriptTemplate/queryScriptInfo',
                data: args,
                success: function (data) {
                    // _this.scriptIsChanged = false
                    _this.operationRows = []
                    if (data.respCode === '0000') {
                        // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[{Name:'', Value: ''}]}}
                        _this.scriptLength = data.data.length

                        for (var operationRow of data.data) {
                            let row = {
                                id: null,
                                functions: [],
                                operation: {
                                    element: '',
                                    ui: '',
                                    classType: ''
                                },
                                parameters: []
                            }
                            row.id = Symbol()
                            if(_this.functionsList[operationRow.elementWidget]){
                                row.functions = _this.functionsList[operationRow.elementWidget];
                            }
                            else{
                                Vac.ajax({
                                    url: address3 + 'aut/selectMethod',
                                    data: {
                                        id: _this.autId, // autid
                                        classname: operationRow.elementWidget, // classname
                                    },
                                    success: function (data) {
                                        if (data.respCode === '0000' && data.omMethodRespDTOList) {
                                            var { functions, parameterlist } = _this.setFunctionAndParameter(data.omMethodRespDTOList);
                                            row.functions = functions;
                                            _this.functionsList[operationRow.elementWidget] = functions
                                        } else {
                                            Vac.alert('查询数据出错！');
                                        }
                                    }
                                })
                            }
                            row.selectedFunc = operationRow.methodName
                            row.operation.element = operationRow.elementName
                            row.operation.ui = operationRow.uiname
                            row.operation.classType = operationRow.elementWidget
                            for (let para of operationRow.arguments) {
                                row.parameters.push({
                                    Name: para.name,
                                    Value: para.value
                                })
                            }
                            // 插入到operationRows中
                            _this.operationRows.push(row)
                            // _this.operationRows = [row]
                        }
                    } else {
                        if(args.flag == 1) return
                        Vac.alert(data.respMsg);
                    }
                }
            });
        },
        saveTemplate: function () {
            var _this = this;
            _this.newTemplate.transId = _this.transactId
            if (_this.newTemplate.name == "")
                Vac.alert('请输入名称');
            else
                Vac.ajax({
                    url: address3 + 'scriptTemplate/insert',
                    data: _this.newTemplate,
                    success: function (data) {
                        if (data.respCode === '0000') {
                            Vac.alert('添加成功！')
                            $('#addtemplateModal').modal('hide')
                            _this.getScriptTemplate();
                        } else {
                            Vac.alert('添加失败！');
                        }
                    },
                    error: function () {
                        Vac.alert('添加失败！');
                    }
                })
        },
        deleteTemplate: function () {
            var _this = this;
            if (!_this.checkedTemplate.length) {
                Vac.alert('请选择要删除脚本！')
                return
            }
            var templateId = this.checkedTemplate[0];
            _this.script_id = _this.templateList[templateId].id;
            Vac.ajax({
                url: address3 + 'scriptTemplate/delete',
                data: { 'id': _this.script_id },
                success: function (data) {
                    if (data.respCode === '0000') {
                        Vac.alert('删除成功！')
                        _this.getScriptTemplate();
                    }
                },
                error: function () {
                    Vac.alert('删除失败！')
                }
            })
        },
        setChanged: function () {
            var _this=this
            _this.scriptIsChanged = true
        },
        addRow: function () {
            let s = { id: Symbol(), operation: { element: '', ui: '', classType: '' }, functions: [], parameters: [] }
            this.operationRows.push(s)
            this.setChanged()
        },
        insertRow: function (index) {
            this.setChanged()
            this.operationRows.splice(+index + 1, 0, { id: Symbol(), operation: { element: '', ui: '', classType: '' }, functions: [], parameters: [] })
        },
        deleteRow: function (index) {
            var pro = Vac.confirm('', '', '', '确认要删除吗？');
            pro.then(() => {
                this.setChanged()
                this.operationRows.splice(index, 1)
            }, () => { });

        },
        // remove the row who is checked when 
        removeRow: function (event) {
            var _this=this
            var parent = $(event.target).closest('.operation-wrapper')
            var trs = parent.find("tbody input[type='checkbox']:checked").closest('tr');
            if (!trs.length) return;
            Vac.confirm('', '', '', '确认要删除选中项吗？').then(() => {
                var arr = [];
                for (var i=0;i< trs.length;i++) {
                    var tr = trs[i];
                    arr.push(+tr.getAttribute('data-index'));
                }
                _this.operationRows = _this.operationRows.filter((item, index) => {
                    return !arr.includes(index);
                });
                _this.scriptIsChanged = true;
            })

        },
        moveUp: function (event) {
            this.setChanged()
            var _this = this;
            var operationRows = this.operationRows;
            var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr');
            $.each(trs, (index, row) => {
                var originIndex = row.getAttribute('data-index')
                originIndex >= 1 &&
                    operationRows.splice(originIndex - 1, 0, operationRows.splice(originIndex, 1)[0])
            })
            _this.scriptIsChanged = true
        },
        moveDown: function (event) {
            var _this = this;
            var operationRows = this.operationRows;
            var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr')
            for (var i = trs.length - 1; i >= 0; i--) {
                var originIndex = trs[i].getAttribute('data-index')
                operationRows.splice(+originIndex + 1, 0, operationRows.splice(+originIndex, 1)[0])
            }
            this.setChanged()
        },
        setDrag() {
            var _this = this;
            setTimeout(function () {
                $("#sortable").sortable({
                    stop: (event, ui) => {
                        console.log(ui)
                        if (+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')) {  // 如果没有改变顺序就return
                            return
                        }
                        // 拖拽停止后，改变绑定的数组中元素的顺序
                        console.log(_this)
                        var target = ui.item[0].rowIndex - 1;
                        var start = ui.item[0].getAttribute('data-index');
                        if (target < 0) {
                            _this.operationRows.unshift(_this.operationRows.splice(start, 1)[0])
                        } else {
                            _this.operationRows.splice(target, 0, _this.operationRows.splice(start, 1)[0])
                        }
                        _this.setChanged()
                    }
                });
                // $("#sortable").disableSelection();
            }, 1000);
        },
        // 更改方法时改变参数
        changeFunction: function (target, index) { // 方法的参数都保存在前端select标签中option的data-parameters属性中
            var me = this;
            var selectedIndex = target.selectedIndex;
            var option = target.options[selectedIndex];
            var selectedFunction = option.value;
            var parameters = option.getAttribute('data-parameters');
            parameters = JSON.parse(parameters);
            var newRow = this.operationRows[index];
            newRow.selectedFunc = selectedFunction;
            newRow.parameters = [];
            for (let param of parameters) {
                newRow.parameters.push({ Name: param.name, Value: '' })
            }
        },
        // 遍历表格，保存脚本内容
        generateScriptString: function (arr) {
            var sendDataArray = [];
            var trs = Array.from(document.querySelectorAll('#sortable tr.before-operation-row '))
            console.log(trs)
            for (var tr of trs) {
                var UI = tr.querySelector('.operation-ui').innerHTML.replace(/^\"+|\"+$/g, "\"");
                var element = tr.querySelector('.operation-element').innerHTML.replace(/^\"+|\"+$/g, "\"");
                var classType = tr.querySelector('.operation-element').getAttribute('data-classtype');
                var method = tr.querySelector('.functions-select').value;
                if (!UI && !method) {
                    continue
                }
                // 获取参数列表
                var paramTrs = Array.from(tr.querySelectorAll('.parameters .param-row'))
                var paramValues = []
                var type = 1; // record the type  --  1: normal  2: canshuhua biaozhu
                for (var paramRow of paramTrs) {
                    var paramName = paramRow.querySelector('.param-name');
                    if (paramName.innerHTML.includes('参数化标注')) {
                        type = 2;
                    }
                    var paramTr = paramRow.querySelector('.param-value');
                    if (paramTr.innerHTML != "") {
                        paramValues.push(`${paramTr.innerHTML}`);
                    }  else {
                        // paramValues.push(`"${paramTr.innerHTML}"`);
                        paramValues.push(`""`);
                    }
                }
                if (paramValues.length === 0) {
                    paramValues = ["\"\""]
                }
                var parameterString = paramValues.toString();
                var string;
                if (type === 1) {
                    if (UI == '' && classType == '' && element == '') {
                        string = `${method}(${parameterString});\n`;
                        // string = `${method}();\n`;
                    } else {
                        string = `UI("${UI}").${classType}("${element}").${method}(${parameterString});\n`;
                        // string = `UI("${UI}").${classType}("${element}").${method}();\n`;
                    }
                } else {
                    if (UI == '' && classType == '' && element == '') {
                        string = `${method}();#${parameterString}\n`;
                    } else {
                        string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                        // string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                    }
                }
                sendDataArray.push(string);
            }
            return sendDataArray.join('');
        },
        //保存 
        tableSave: function () {
            var _this=this;
            //UI("denglu").webedit("username").set(1,"123");
            var sendData = this.generateScriptString();
            // Vac.alert('这是生成的脚本代码:\n' + sendData)
            // UI(""登录页面"").webedit("webedit").set("3");UI(""登录页面"").webedit("webedit").set("444");UI("welcome to the system").webedit("webedit").set("333")
            // return
            Vac.ajax({
                url: address3 + 'scriptTemplate/saveScriptTemplate',
                data: {
                    'scriptId': _this.script_id || _this.templateList[0].id,
                    'content': sendData
                },
                success: function (data) {
                    if (data.respCode === '0000') {
                        $('#success').modal();
                        _this.scriptIsChanged = false
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function () {
                    $('#failModal').modal();
                }
            })
        },
        //参数化
        para: function () {
            var sendData = this.generateScriptString();
            console.log(sendData);
            var _this = this;
            Vac.ajax({
                url: address3 + 'scriptTemplate/scriptParameterized',
                data: {
                    'autId': _this.autId,
                    'scriptId': _this.script_id || _this.templateList[0].id,
                    'content': sendData
                },
                success: function (data) {
                    if (data.respCode == '0000') {
                        Vac.alert(data.respMsg);
                        _this.showScripttemplateTable({
                            "autId": _this.autId,
                            "scriptId": _this.script_id || _this.templateList[0].id
                        });
                        return;
                    }
                },
                error: function () {
                    Vac.alert('参数化失败，请求未成功');
                }
            })
        },
        // 显示UI和元素 、函数集
        showUiAndElement: function (event, type) {
            this.uiOrFunctions.target = event.target;
            this.uiOrFunctions.changed = false;
            // 请求Ui和Elment
            this.getUIAndFunctions(1)
            $('#ui-ele-modal').modal('show')
        },
        showUIModal: function () {
            this.getUIAndFunctions(2)
            $('#ui-ele-modal2').modal('show')
        },
        getUIAndFunctions: function (type) {
            var str = +type === 1 ? '' : 2;
            var _this = this;
            var setting = +type === 1 ? this.zTreeSettings : this.zTreeSettings2;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            Vac.ajax({
                url: address3 + 'elementRepository/queryAllElementsForATransact',
                data: { transactId: transid },
                success: (data) => {
                    if (data.respCode === '0000') {
                        let treeDate = data.uis.map((ui) => {
                            let parent = {
                                isParent: true,
                                name: ui.uiName,
                                regulationId : ui.regulationId,
                                id: ui.uiId
                            };
                            parent.children = ui.elements ? ui.elements.map((element) => {
                                return {
                                    classType: element.classType,
                                    name: element.elementName,
                                    id: element.elementId,
                                    isParent: false,
                                    children: null
                                }
                            }) : null;
                            return parent;
                        });
                        var tree = $.fn.zTree.init($('#ui-element-ul' + str), setting.uiAndElement, treeDate);
                        tree.expandAll(true);
                        // var da = [{"id":1,"parentid":0,"name":"ui-chai"},{"id":2,"parentid":1,"name":"ele-chai", "classType": 'webedit'}]
                        // $.fn.zTree.init($('#ui-element-ul'+str), setting.uiAndElement, da);
                    }
                }
            });
            // 请求函数集
            ajax2({
                url: address3 + 'aut/selectFunctionSet',
                contentType: 'application/json',
                data: JSON.stringify({ 'id': _this.autId }),
                type: 'post',
                dataType: 'json',
                success: (data) => {
                    if (data.respCode === '0000') {
                        $.fn.zTree.init($('#functions-ul' + str), setting.functions, data.omMethodRespDTOList);
                    }
                }
            })
        },
        // 确定ztree的点击事件
        zTreeOnClick: function (event, treeId, treeNode) {
            if (treeNode.isParent) {
                return // 如果点击了父节点，则返回
            }
            // 判断树结构是ui还是函数集
            if (treeId === 'ui-element-ul') {
                var parent = treeNode.getParentNode()
                if (!parent) {
                    return // 没有父元素，则返回
                }
                this.uiOrFunctions.type = 'ui'
                this.uiOrFunctions.element = treeNode.name
                this.uiOrFunctions.ui = parent.name;
                this.uiOrFunctions.classType = treeNode.classType
            } else {
                this.uiOrFunctions.type = 'function'
                // 获取节点的全部内容
                var o = {};
                o.name = treeNode.name;
                o.parameterlist = treeNode.arguments;
                this.uiOrFunctions.function = o;
            }
            this.uiOrFunctions.changed = true; // 已经在模态框中点击了树节点
        },
        // 编辑参数方法，出现模态框，进行函数的编辑
        editParameter: function (event, type) {
            var _this = this
            // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
            var target = event.target
            target.style.visibility = 'hidden'
            var parent = $(target).parent()[0]
            $('.param-table', parent).css({ 'display': 'table' })
            $('.param-show', parent).css({ 'display': 'none' })
            var paramV = $('.param-value', parent)[0]
            paramV && paramV.focus()
            var range = document.createRange()
            var sel = window.getSelection()
            paramV && range.setStart(paramV.childNodes[0], paramV.innerHTML.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
        },
        cancelEditParam: function (event) {
            var table = $(event.target).parents('.param-table')
            $('.edit-param', table.parents('tr')).css({ 'visibility': 'visible' })
            table.css({ display: 'none' })
            $('.param-show', table.parents('tr')).css({ 'display': 'block' })
        },
        saveParam: function (event) {
            var target = $(event.target)
            var tbody = target.parents('.param-table')
            console.log($('.param-row'))
            console.log($('.param-row', tbody))

            var parentRow = target.parents('table').parents('tr')
            var valueShows = $('.param-value-show', parentRow)
            this.operationRows[parentRow.attr('data-index')].parameters.length = 0
            
            $('.param-row', tbody).each(( index,row) => {
                var data = {}
                data.Name = row.querySelector('.param-name').innerHTML
                data.Value = row.querySelector('.param-value').innerHTML
                valueShows[index].innerHTML = data.Value
                console.log(data)
                this.operationRows[parentRow.attr('data-index')].parameters.push(data)
            })
            this.cancelEditParam(event)
            // 已经修改过
            this.scriptIsChanged = true
        },
        updateRow: function (rows, index) {
            // 使用splice方法，通过改变数组项的id更新绑定的数组，
            var cache = rows[index]
            cache.id = Symbol()
            rows.splice(index, 1, cache)
        },
        editRow: function () {
            // 已经修改过
            this.scriptIsChanged = true
            var _this = this;
            if (!this.uiOrFunctions.changed) {
                return; // 没有点击树结构，则返回
            }
            // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
            var parentRow = $(_this.uiOrFunctions.target).parents('tr')
            var index = parentRow.attr('data-index');
            var operationRows = _this.operationRows;

            if (_this.uiOrFunctions.type === 'ui') {
                // 点击了ui 与 元素后, 更新operation
                operationRows[index].operation = {
                    ui: _this.uiOrFunctions.ui,
                    element: _this.uiOrFunctions.element,
                    classType: _this.uiOrFunctions.classType
                };
                operationRows[index].functions = []
                operationRows[index].parameters = []
                operationRows[index].selectedFunc = '';

                // 使用splice方法，通过改变数组项的id更新绑定的数组，
                _this.updateRow(operationRows, index);

                // 发送ajax请求函数的数据
                var data = {
                    id: _this.autId, // autid
                    classname: _this.uiOrFunctions.classType, // classname
                }
                if (!data.classname) {
                    Vac.alert('请在元素库界面设置方法的类型');
                    return;
                }
                var getFunctions = new Promise((resolve, reject) => {
                    Vac.ajax({
                        url: address3 + 'aut/selectMethod',
                        data: data,
                        success: function (data) {
                            if (data.respCode === '0000' && data.omMethodRespDTOList) {
                                var { functions, parameterlist } = _this.setFunctionAndParameter(data.omMethodRespDTOList);
                                operationRows[index].parameters = parameterlist;
                                operationRows[index].functions = functions;
                                operationRows[index].selectedFunc = functions.length ? functions[0].name : '';
                                _this.updateRow(operationRows, index);
                                resolve();
                            } else {
                                Vac.alert('查询数据出错！');
                                reject();
                            }
                        }
                    })
                });

            } else {
                operationRows[index].functions = [_this.uiOrFunctions.function]
                // parameters: [{"name":"11","valueclass":"11","parameterizedcolumn":"","defaultvalue":"","description":""}]
                var parametersArray = JSON.parse(operationRows[index].functions[0].parameterlist)

                operationRows[index].parameters = []
                for (let param of parametersArray) {
                    operationRows[index].parameters.push({
                        Name: param.name,
                        Value: ''
                    })
                }
                _this.updateRow(operationRows, index)
            }
            $('#ui-ele-modal').modal('hide')
            // _this.uiOrFunctions.changed = false;
        },
        updateRow: function (rows, index) {
            // 使用splice方法，通过改变数组项的id更新绑定的数组，
            var cache = rows[index]
            cache.id = Symbol()
            rows.splice(index, 1, cache)
        },
        setFunctionAndParameter: function (data) {
            // set functino for ui and element 
            var _this = this
            var operationRows = _this.operationRows;
            var functions = [];
            var parameterlist = [];
            try {
                for (let m of data) {
                    let o = {};
                    o.name = m.name;
                    o.parameterlist = m.arguments || "[]";
                    functions.push(o);
                }
                if (functions.length) {
                    let paras = JSON.parse(`${functions[0].parameterlist}`);
                    for (let para of paras) {
                        parameterlist.push({ Name: para.name, Value: "" });
                    }
                }
                console.log({ functions, parameterlist })
                return { functions, parameterlist };
            } catch (e) {
                console.error(e);
                // return { functions: [], parameterlist: [] };;
            }
        },
        editRowMultiple: function () {// 已经修改过 向列表中添加元素
            var _this= this;
            _this.scriptIsChanged = true
            var uiTree = $.fn.zTree.getZTreeObj("ui-element-ul2");
            var functionTree = $.fn.zTree.getZTreeObj("functions-ul2");
            var uiNodes ;
            if(_this.checkFlag.length == 0){//如果checkFlag不为空 则奇数次点击UI 则说明不按点击顺序 使用默认顺序
                uiNodes = _this.checkElementNodes;
            }
            else{
                uiNodes = uiTree ? uiTree.getCheckedNodes(true) : [];
                _this.checkFlag=[];
            }
            var functionNodes = functionTree ? functionTree.getCheckedNodes(true) : []
            var l=_this.operationRows.length;
            let uilen = uiNodes.length,finishNum=0;
            for (var node of uiNodes) {
                if(typeof node != 'object'){
                    node = uiTree.getNodeByTId(node);
                }
                if (node.isParent) {
                    ++finishNum
                    continue;
                }
                let newRow = {}; // {id:Symbol(), functions: [], operation: {element:'', ui: ''},parameters:[{Name: '', Value: ''}]}}
                newRow.id = Symbol()
                newRow.operation = {
                    ui: node.getParentNode().name,
                    element: node.name,
                    classType: node.classType
                }
                newRow.functions = []
                ajax2({
                    url: address3 + 'aut/selectMethod',
                    data: JSON.stringify({ id: _this.autId, classname: newRow.operation.classType }),
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data)
                        if (data.respCode === '0000' && data.omMethodRespDTOList) {
                            var { functions, parameterlist } = _this.setFunctionAndParameter(data.omMethodRespDTOList);
                            function getNewRow(newR, objIndex, objs){
                                return newR.operation.element == newRow.operation.element&&objIndex>l-1;
                            }
                            newRow.functions = functions;
                            newRow.selectedFunc = functions.length ? functions[0].name : '';
                            newRow.parameters = parameterlist;
                            if(++finishNum == uilen){
                                console.log(finishNum+"finishNum")
                                console.log(uilen+"uilen")
                                _this.nextTickFlag = true
                                //_this.para()
                            }
                            _this.operationRows.push(newRow);
                            // _this.operationRows[_this.operationRows.findIndex(getNewRow)].functions = functions;
                            // _this.operationRows[_this.operationRows.findIndex(getNewRow)].selectedFunc = functions.length ? functions[0].name : '';
                            // _this.operationRows[_this.operationRows.findIndex(getNewRow)].parameters = parameterlist;

                        } else {
                            _this.operationRows.splice(_this.operationRows.findIndex(function (x) {
                                return x.element == newRow.element
                            }),1)
                            Vac.alert('查询方法出错！');
                        }
                    }
                })
            } 
            _this.checkFlag=[];
            _this.checkElementNodes=[];
            if (functionNodes && functionNodes.length) {
                for (var node of functionNodes) {
                    let newRow = {}
                    newRow.id = Symbol()
                    newRow.operation = {
                        element: '',
                        ui: '',
                        classType: ''
                    }
                    newRow.functions = []
                    newRow.functions.push({ name: node.name, parameterlist: node.arguments })

                    newRow.parameters = []
                    try {
                        var parameters = JSON.parse(node.arguments)
                        for (let param of parameters) {
                            newRow.parameters.push({ Name: param.name, Value: '' })
                        }
                    } catch (e) {
                        newRow.parameters = []
                    }

                    _this.operationRows.push(newRow)
                }
            }

            $('#ui-ele-modal2').modal('hide')
        },
        replacemess(str) {
            var name = str.replace(/<span style="color: whitesmoke;background-color: darkred;">/g, "").replace(/<\/span>/g, "");
            return name;
        },
    }
})