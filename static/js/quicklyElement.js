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
                        onCheck: function (event, treeId, treeNode, clickFlag) {
                            var _this = app; 
                            if(!treeNode.parentTId){
                                if(!_this.checkFlag){
                                    _this.checkFlag.push(treeNode.id);
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
                            _this.checkUinodes.push(treeNode)
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
        $(".myFileUpload").change(function () {
            var arrs = $(this).val().split('\\');
            var filename = arrs[arrs.length - 1];
            $(".show").val(filename);
        });
        this.zTreeSettings.uiAndElement.callback.onClick = this.zTreeOnClick;
        this.zTreeSettings.functions.callback.onClick = this.zTreeOnClick;
        $('.2').addClass('open');
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({ display: 'block' });
        $('.2-0').css({ color: '#ff6c60' });
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
        //点击保存按钮后更新属性
        updateProp: function () {
            var _this = this
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
                                    row.functions.push({ name: operationRow.methodName })
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
            var transactId = !this.componentMode ? $("#transactSelect").val() : this.transactId;
            Vac.ajax({
                url: address3 + 'elementRepository/queryAllElementsForATransact',
                data: { transactId: transactId },
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
            var trs = [...$('.param-row', tbody)]
            var parentRow = target.parents('table').parents('tr')
            var valueShows = $('.param-value-show', parentRow)
            this.operationRows[parentRow.attr('data-index')].parameters.length = 0
            trs.forEach((row, index) => {
                var data = {}
                data.Name = row.querySelector('.param-name').innerHTML
                data.Value = row.querySelector('.param-value').innerHTML
                valueShows[index].innerHTML = data.Value
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
                return { functions, parameterlist };
            } catch (e) {
                console.error(e);
                // return { functions: [], parameterlist: [] };;
            }
        },
        editRowMultiple: function () {
            // 已经修改过
            var _this= this;
            _this.scriptIsChanged = true
            var uiTree = $.fn.zTree.getZTreeObj("ui-element-ul2");
            var functionTree = $.fn.zTree.getZTreeObj("functions-ul2");
            var uiNodes ;
            if(_this.checkFlag.length == 0){//如果checkFlag不为空 则奇数次点击UI 则说明不按点击顺序 使用默认顺序
                uiNodes = _this.checkUinodes;
                _this.checkFlag=[];
                _this.checkUinodes=[];
            }
            else{
                uiNodes = uiTree ? uiTree.getCheckedNodes(true) : [];
                _this.checkFlag=[];
            }
            var functionNodes = functionTree ? functionTree.getCheckedNodes(true) : []
            var l=_this.operationRows.length;
            for (var node of uiNodes) {
                if (node.isParent) {
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
                _this.operationRows.push(newRow);
                ajax2({
                    url: address3 + 'aut/selectMethod',
                    data: JSON.stringify({ id: _this.autId, classname: newRow.operation.classType }),
                    contentType: 'application/json',
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        if (data.respCode === '0000' && data.omMethodRespDTOList) {
                            var { functions, parameterlist } = _this.setFunctionAndParameter(data.omMethodRespDTOList);
                            function getNewRow(newR, objIndex, objs){
                                return newR.operation.element == newRow.operation.element&&objIndex>l-1;
                            }
                            _this.operationRows[_this.operationRows.findIndex(getNewRow)].functions = functions;
                            _this.operationRows[_this.operationRows.findIndex(getNewRow)].selectedFunc = functions.length ? functions[0].name : '';
                            _this.operationRows[_this.operationRows.findIndex(getNewRow)].parameters = parameterlist;
                            // newRow.functions = functions;
                            // newRow.selectedFunc = functions.length ? functions[0].name : '';
                            // newRow.parameters = parameterlist;
                            // _this.operationRows.find(function (x) {
                            //     return x.element == newRow.element
                            // })
                            // _this.operationRows.push(newRow);

                        } else {
                            _this.operationRows.splice(_this.operationRows.findIndex(function (x) {
                                return x.element == newRow.element
                            }),1)
                            Vac.alert('查询方法出错！');
                        }
                    }
                })
            }
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