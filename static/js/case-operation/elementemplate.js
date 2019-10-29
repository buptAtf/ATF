var template=`<div class="row">
    <div class="col-xs-4">
        <section class="panel tree-panel">
            <header class="panel-heading">
                元素库
            </header>
            <div id="menuContent" class="menuContent treeMenu">
                <div class="form-group panel-pad form-horizontal">
                    <div class="col-xs-10">
                        <input type="text" name="" id="elekeyword" value="" class="form-control" placeHolder="输入搜索关键字">
                    </div>
                    <br>
                </div>
                <div class="form-group form-horizontal">
                    <div class="col-xs-12 " style="padding-top: 10px;">
                        <a class="btn btn-info btn-sm" data-toggle="modal" href="#addUIModal">添加UI</a>
                        <a class="btn btn-info btn-sm" @click="delUI">删除UI</a>
                        <a class="btn btn-info btn-sm" data-toggle="modal" @click="checkAddElement">添加元素</a>
                        <a class="btn btn-info btn-sm" @click="delElement">删除元素</a>
                    </div>
                </div>
                <ul id="elementtree" class="ztree tree"></ul>
            </div>
        </section>
    </div>
    <div class="col-xs-8">
        <section class="panel" id="eleblank">
            <header class="panel-heading">
                    名称
            </header>
            <div class="elementContent">
                <p class="chooseTip">请选择UI或元素</p>
            </div>
        </section>
        <section class="panel" id="UI" style="display: none;">
            <header class="panel-heading">
                    {{UITitle}}
            </header>
            <div class="elementContent">
                <form class="form-horizontal panel-pad" id="UIForm">
                    <div class="form-group">
                        <label class="col-xs-2 control-label">UI名称：</label>
                        <div class="col-xs-3">
                            <input type="text" name="UIName" class="form-control" :value="UIName" id="RUIName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">关联对象库中对象：</label>
                        <div class="col-xs-3">
                            <input type="text" id="UILinkedInput" class="form-control" :value="UILinked" disabled>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" data-toggle="modal" href="#UILinkedModal">关联对象</a>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" @click="removeUILinked()">解除关联</a>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" @click="updateUI">保存</a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel" id="ele" style="display: none;">
            <header class="panel-heading">
                {{eleName}}
            </header>
            <div class="elementContent">
                <form class="form-horizontal panel-pad" id="eleForm">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">元素名称</label>
                        <div class="col-xs-3">
                            <input type="text" name="" class="form-control" :value="eleName" id="rEleName">
                        </div>
                        <label for="" class="col-xs-2 control-label">类型</label>
                        <div class="col-xs-3">
                            <select class="form-control" id="classtypeSelect">
                                <option value="">--选择控件类型--</option>
                                <option v-for="item in classtypeList" :value="item.name">{{item.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">对象库中父对象</label>
                        <div class="col-xs-3">
                            <input type="text" name="" id="eleParentInput" class="form-control" :value="eleParent" disabled>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" data-toggle="modal" href="#eleParentModal">设置父对象</a>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" @click="removeEleParent">解除关联</a>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 control-label">对象库中关联对象</label>
                        <div class="col-xs-3">
                            <input type="text" name="" id="eleLinkedInput" class="form-control" :value="eleLinked" disabled>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" data-toggle="modal" href="#eleLinkedModal">设置关联对象</a>
                        </div>
                        <div class="col-xs-2">
                            <a class="btn btn-info" @click="removeEleLinked">解除关联</a>
                        </div>
                    </div>
                </form>
                <section class="panel small-panel">
                    <header class="panel-heading">属性</header>
                    <div class="property">
                        主属性
                        <a class="btn btn-white btn-sm pull-right" @click="addMainProp"><i class="icon-plus"></i></a>
                        <a class="btn btn-white btn-sm pull-right" @click="delMainProp"><i class="icon-minus"></i></a>
                    </div>
                    <div class="property">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width:5%"></th>
                                    <th>属性名</th>
                                    <th>属性值</th>
                                </tr>
                            </thead>
                            <tbody id="mainTbody">
                                <tr class="text-center">
                                    <td colspan="3">暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="property">
                        附加属性
                        <a class="btn btn-white btn-sm pull-right" @click="addAddiProp"><i class="icon-plus"></i></a>
                        <a class="btn btn-white btn-sm pull-right" @click="delAddiProp"><i class="icon-minus"></i></a>
                    </div>
                    <div class="property">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width:5%"></th>
                                    <th>属性名</th>
                                    <th>属性值</th>
                                </tr>
                            </thead>
                            <tbody id="addiTbody">
                                <tr class="text-center">
                                    <td colspan="3">暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="property">
                        辅助属性
                        <a class="btn btn-white btn-sm pull-right" @click="addAssiProp"><i class="icon-plus"></i></a>
                        <a class="btn btn-white btn-sm pull-right" @click="delAssiProp"><i class="icon-minus"></i></a>
                    </div>
                    <div class="property">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width:5%"></th>
                                    <th>属性名</th>
                                    <th>属性值</th>
                                </tr>
                            </thead>
                            <tbody id="assiTbody">
                                <tr class="text-center">
                                    <td colspan="3">暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="property">
                        关联属性
                        <a class="btn btn-white btn-sm pull-right" @click="addLinkedProp"><i class="icon-plus"></i></a>
                        <a class="btn btn-white btn-sm pull-right" @click="delLinkedProp"><i class="icon-minus"></i></a>
                    </div>
                    <div class="property">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th style="width:5%"></th>
                                    <th>属性名</th>
                                    <th>属性值</th>
                                </tr>
                            </thead>
                            <tbody id="relatePropTbody">
                                <tr class="text-center">
                                    <td colspan="3">暂无数据</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <a class="btn btn-info" @click="updateElement">保存</a>
            </div>
        </section>
        <!-- addUIModal start -->
        <div class="modal fade" id="addUIModal" tabindex="-1" role="dialog" aria-labelledby="insertModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">添加UI</h4>
                    </div>
                    <div class="modal-body">
                        <!-- modal-body start -->
                        <section class="panel">
                            <form id="addUIForm" class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">UI名称</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name="UIName" id="addUIName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label"></label>
                                    <div class="col-xs-5">
                                        若要添加多个，请以英文逗号“,”隔开。
                                    </div>
                                </div>
                                <div class="form-group hidden">
                                    <label class="col-xs-3 control-label">relateIdentifyObjectId</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name="relateIdentifyObjectId" id="addRelateIdentifyObjectId">
                                    </div>
                                </div>
                                <div class="form-group hidden">
                                    <label class="col-xs-3 control-label"> relateParentIdentifyObjectId</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name="relateParentIdentifyObjectId" id="addRelateParentIdentifyObjectId">
                                    </div>
                                </div>
                            </form>
                        </section>
                        <!-- modal-body end -->
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default">取消</button>
                        <button data-dismiss="modal" class="btn btn-success" @click="addUI">添加</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- addUIModal end -->
        <!-- addElementModal start -->
        <div class="modal fade" id="addElementModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">添加元素</h4>
                    </div>
                    <div class="modal-body">
                        <!-- modal-body start -->
                        <section class="panel">
                            <form id="addElementForm" class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">元素名称</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name="ElementName" id="addElementName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label"></label>
                                    <div class="col-xs-5">
                                        若要添加多个，请以英文逗号“,”隔开。
                                    </div>
                                </div>
                                <div class="form-group hidden">
                                    <label class="col-xs-3 control-label">ClassType</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name="ClassType" id="addEleClassType">
                                    </div>
                                </div>
                                <div class="form-group hidden">
                                    <label class="col-xs-3 control-label"> relateIdentifyObjectId</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name=" relateIdentifyObjectId" id="addEleRelateIdentifyObjectId">
                                    </div>
                                </div>
                                <div class="form-group hidden">
                                    <label class="col-xs-3 control-label"> relateParentIdentifyObjectId</label>
                                    <div class="col-xs-5">
                                        <input type="text" class="form-control" name="  relateParentIdentifyObjectId" id="addEleRelateParentIdentifyObjectId">
                                    </div>
                                </div>
                            </form>
                        </section>
                        <!-- modal-body end -->
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button data-dismiss="modal" class="btn btn-success" type="button" @click="addElement">添加</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- addElementModal end -->
        <!-- successModal start -->
        <div class="modal fade" id="successModalEle" tabindex="-1" style="" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">操作成功</h4>
                    </div>
                    <div class="modal-body">
                        <h4>操作成功！</h4>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- successModal end -->
        <!-- failModalEle start -->
        <div class="modal fade" id="failModalEle" tabindex="-1" role="dialog" aria-labelledby="failModalEleLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">操作失败</h4>
                    </div>
                    <div class="modal-body">
                        <h4>{{failMSG}}</h4>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- failModalEle end -->
        <!-- elementAlertModal start -->
        <div class="modal fade" id="elementAlertModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">操作失败</h4>
                    </div>
                    <div class="modal-body">
                        <h4>请先选中UI！</h4>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- elementAlertModal end -->
    </div>
</div>
<!-- <link rel="import" href="./common/copy-right.html?__inline"> -->
<div class="modal fade" id="UILinkedModal" tabindex="-1" role="dialog" aria-labelledby="objectModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">对象库</h4>
            </div>
            <div class="modal-body">
                <div id="menuContent" class="menuContent treeMenu">
                    <ul id="UILinkedTree" class="ztree tree"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default">取消</button>
                <button data-dismiss="modal" class="btn btn-success" @click="setUILinked()">确认</button>
            </div>
        </div>
    </div>
</div>
<!--UILinked objectmodal end -->
<!--eleParent objectmodal start -->
<div class="modal fade" id="eleParentModal" tabindex="-1" role="dialog" aria-labelledby="objectModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">对象库</h4>
            </div>
            <div class="modal-body">
                <div id="menuContent" class="menuContent treeMenu">
                    <ul id="eleParentTree" class="ztree tree"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default">取消</button>
                <button data-dismiss="modal" class="btn btn-success" @click="setEleParent()">确认</button>
            </div>
        </div>
    </div>
</div>
<!--eleParent objectmodal end -->
<!--eleLinked objectmodal start -->
<div class="modal fade" id="eleLinkedModal" tabindex="-1" role="dialog" aria-labelledby="objectModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">对象库</h4>
            </div>
            <div class="modal-body">
                <div id="menuContent" class="menuContent treeMenu">
                    <ul id="eleLinkedTree" class="ztree tree"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default">取消</button>
                <button data-dismiss="modal" class="btn btn-success" @click="setEleLinked()">确认</button>
            </div>
        </div>
    </div>
</div>`

var elementLibrary  = Vue.extend({
    template: template,    
    props: {
        'transid': {
        },
        'autid': {
        }
    },
    data: function() {
        var _this = this;
        return {
            elementRepositoryId: 6,
            UIName: '',
            UITitle: 'UI',
            eleName: '',
            UILinked: '',
            eleParent: '',
            eleLinked: '',
            failMSG:'操作失败啦。糟糕的是没有返回信息，难道是ajax请求失败了',
            mainPropTr: '<tr><td><input type="checkbox" name="mainProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            addiPropTr: '<tr><td><input type="checkbox" name="addiProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            assiPropTr: '<tr><td><input type="checkbox" name="assiProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            linkedPropTr: '<tr><td><input type="checkbox" name="linkProp"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            classtypeList: [], //控件类型下拉列表
            mainList: [], //主属性
            mainListLength: 0,
            addiList: [], //附加属性
            addiListLength: 0,
            assiList: [], //辅助属性
            assiListLength: 0,
            relatePropList: [], //关联属性
            relatePropListLength: 0,
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
                    onClick: function(event, treeId, treeNode, clickFlag) {
                        console.log(treeNode)
                        var transid = _this.transid;
                        if (treeNode.level == 0) { //选择的是UI
                            $(':input', '#UIForm').val('');
                            console.log( treeNode.name);
                            console.log( _this.replacemess(treeNode.name));
                            var namestr= _this.replacemess(treeNode.name);
                            _this.UIName = namestr;
                            _this.UITitle = namestr;
                            var uiId=treeNode.id;
                            $('#UIForm input[name="UIName"]').val(namestr);
                            $('#eleblank').css('display', 'none');
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
                                success: function(data) {
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
                            // _this.getEleParentObjectTree();
                            // _this.getEleLinkedObjectTree();
                            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
                            var nodes = treeObj.getSelectedNodes();
                            _this.eleName = _this.replacemess(treeNode.name);
                            _this.elementId=treeNode.id;
                            var parentNode = nodes[0].getParentNode();
                            _this.UIName = _this.replacemess(parentNode.name);
                            var uiId=parentNode.id;
                            $("#mainTbody").children().remove();
                            $("#addiTbody").children().remove();
                            $("#assiTbody").children().remove();
                            $("#relatePropTbody").children().remove();
                            $('#eleblank').css('display', 'none');
                            $('#UI').css('display', 'none');
                            $('#ele').css('display', 'block');
                            var transid = _this.transid;
                            $.ajax({
                                url: address3 + 'elementRepository/querySingleElement',
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    'repositoryId': _this.elementRepositoryId,
                                    "uiId": uiId,
                                    "elementId": _this.elementId 
                                }),
                                success: function(data) {
                                    console.log(data);
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
                                    if(_this.mainList){
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
                                    if(_this.addiList){
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
                                    if(_this.assiList){
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
                                    if(_this.assiList){
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
                    onClick: function(event, treeId, treeNode, clickFlag) {
                        // console.log(treeNode)
                        _this.UILinked = treeNode.objectName;
                    },

                }
            },

        }
    },
    ready: function() {
    },    
    watch: {
        autid: {
            handler(newValue, oldValue) {
                this.classtypeSelect();
    　　　　},
    　　　　deep: true
    　　},
        transid: {
            handler(newValue, oldValue) {
                this.getObjectTree();
                this.getElementTree();
    　　　　},
    　　　　deep: true
    　　},
    },
    methods: {
        // 页面初始化获取元素库
        getElementTree: function(uiName) {
            var _this = this;
            if(!_this.transid)
                return
            var transid =_this.transid;
            $.ajax({
                url: address3 + 'elementRepository/queryAllElementsForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transid }),
                success: function(data) {
                    if (data.respCode == "0000") {
                        var nodes = [];
                        var uis = data.uis;
                        for (var i = 0; i < uis.length; i++) {
                            var uiNode = {};
                            uiNode.id = uis[i].uiId; 
                            uiNode.name = uis[i].uiName;                          
                            let elements = uis[i].elements;
                            if (elements) {
                                uiNode.children = [];
                                for (var j = 0; j < elements.length; j++) {
                                    var eleNode = {};
                                    eleNode.id=elements[j].elementId;
                                    eleNode.name = elements[j].elementName;
                                    uiNode.children.push(eleNode);
                                }
                            }
                            nodes.push(uiNode);
                        }
                        $.fn.zTree.init($("#elementtree"), _this.setting1, nodes);
                        _this.elementRepositoryId = data.elementRepositoryId;
                            if(uiName!=null){
                            var zTree = $.fn.zTree.getZTreeObj("elementtree");
                            console.log(zTree);
                            var pNode=zTree.getNodeByParam('name', uiName, null);
                            console.log(pNode);
                            zTree.expandNode(pNode,true,true,true,false);
                        }
                        fuzzySearch('elementtree','#elekeyword',null,true); 
                    }
                }
            });
        },
        // 页面初始化获取对象库
        getObjectTree: function() {
            var _this = this;
            if(!_this.transid)
                return
            var transid =  _this.transid;
            $.ajax({
                url: address3 + 'objectRepository/queryAllObjectForATransact',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "transactId": transid }),
                success: function(data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#UILinkedTree"), _this.setting2, data.objects);
                        $.fn.zTree.init($("#eleLinkedTree"), _this.setting2, data.objects);
                        $.fn.zTree.init($("#eleParentTree"), _this.setting2, data.objects);
                    }
                }
            });
        },
        //获取classtype
        classtypeSelect: function() {
            // var val = $('#autSelect').val();
            var _this = this;
            if(!_this.autid)
                return
            $.ajax({
                url: address3 + 'aut/queryAutVisibleOmClasses',
                contentType: 'application/json',
                data: JSON.stringify({ 'id': _this.autid }),
                type: "POST",
                success: function(data) {
                    // console.log(data)
                    _this.classtypeList = data.omClassRespDTOList.concat(data.arcClassRespDTOList);
                }
            });
        },
        addUI: function() {
            var _this = this;
            var transid = !this.componentMode ? this.transactId : this.transid;
            var UIName = $("#addUIName").val(),
                relateIdentifyObjectId = $("#addRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addRelateParentIdentifyObjectId").val();
            if(UIName==''){
                alert('UI名称不能为空');
            }else{
                var uiNames;
                var uis=[];
                if(UIName.indexOf(',')>0){//批量
                    uiNames=UIName.split(",");
                    for(var i=0; i<uiNames.length; i++){
                        let ui={};
                        ui.uiName=uiNames[i];
                        uis.push(ui);
                    }
                }else{//单个
                    let ui={};
                    ui.uiName=UIName;
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
                    success: function(data) {
                        if (data.respCode==0000) {
                            $('#successModalEle').modal('show');
                            _this.getElementTree();
                            $("#addUIName").val('');
                        } else {
                            _this.failMSG=data.respMsg;
                            $('#failModalEle').modal('show');
                            $("#addUIName").val('');
                        }
                    },
                    error: function() {
                        _this.failMSG=data.respMsg;
                        $('#failModalEle').modal('show');
                        $("#addUIName").val('');
                    }
                });
            }
        },
        delUI: function() {
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
                success: function(data) {
                    if (data.respCode==0000) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        _this.failMSG=data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function() {
                    _this.failMSG=data.respMsg;
                    $('#failModalEle').modal('show');
                }
            });
        },
        updateUI: function() {
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
                    "uiName":RUIName,
                    "relateIdentifyObjectId": relateIdentifyObjectId
                }),
                success: function(data) {
                    // console.info(data);
                    if (data.respCode==0000) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                        $('#eleblank').css('display', 'block');
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'none');
                    } else {
                        _this.failMSG=data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function() {
                    _this.failMSG=data.respMsg;
                    $('#failModalEle').modal('show');
                    $('#eleblank').css('display', 'block');
                    $('#UI').css('display', 'none');
                    $('#ele').css('display', 'none');
                }
            });
        },
        checkAddElement(){
            let treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes();
            if(nodes.length==0){
                $('#elementAlertModal').modal();
            }else{
                $('#addElementModal').modal();
            }
        },
        addElement: function() {
            var _this = this;
            var transid = !this.componentMode ? _this.transactId : _this.transid;
            var ElementName = $("#addElementName").val(),
                ClassType = $("#classtypeSelect").val(),
                relateIdentifyObjectId = $("#addEleRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addEleRelateParentIdentifyObjectId").val(),
                treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                selectedUIName = nodes[0].name,
                uiId=nodes[0].id;
            if(ElementName==''){
                alert('元素名称不能为空');
            }else{
                var elementNames;
                var elements=[];
                if(ElementName.indexOf(",")>0){//批量
                    elementNames=ElementName.split(",");
                    for(var i=0; i<elementNames.length; i++){
                        let element={};
                        element.elementName=elementNames[i];
                        elements.push(element);
                    }
                }else{//单个
                    let element={};
                    element.elementName=ElementName;
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
                    success: function(data) {
                        if (data.respCode==0000) {
                            $('#successModalEle').modal();
                            _this.getElementTree(selectedUIName);
                                
                        } else {
                            _this.failMSG=data.respMsg;
                            $('#failModalEle').modal('show');
                        }
                    },
                    error: function() {
                        _this.failMSG=data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                });
            }
        },
        delElement: function() {
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
                success: function(data) {
                    console.info(data);
                    if (data.respCode==0000) {
                        $('#successModalEle').modal();
                        _this.getElementTree(UIName);
                    } else {
                        _this.failMSG=data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function() {
                    _this.failMSG=data.respMsg;
                    $('#failModalEle').modal('show');
                }
            });
        },
        updateElement: function() {
            var _this = this;
            var transid = !this.componentMode ? this.transactId : this.transid;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes();
            var selectedUIName = _this.replacemess(nodes[0].getParentNode().name);
            if(nodes.length==0){
                alert('请先选中元素');
            }else{
                var uiId = nodes[0].getParentNode().id,
                    eleName = _this.replacemess(nodes[0].name),
                    elementId=nodes[0].id;
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
                mainProperties=[],
                mainItem={};
            $('#mainTbody').find('tr').each(function() {
                mainTd = $(this).children();
                mainItem.name=mainTd.eq(1).html();
                mainItem.value=mainTd.eq(2).html();
                mainItem.method='';
                mainItem.isRelative=null;
                mainItem.toolName='';
                mainProperties.push(mainItem);
            });
            //附加属性
            var addiTd,
                additionalProperties=[],
                addiItem={};
            $('#addiTbody').find('tr').each(function() {
                addiTd = $(this).children();
                addiItem.name=addiTd.eq(1).html();
                addiItem.value=addiTd.eq(2).html();
                addiItem.method='';
                addiItem.isRelative=null;
                addiItem.toolName='';
                additionalProperties.push(addiItem);
            });
            //辅助属性
            var assiTd,
                assistantProperties=[],
                assiItem={};
            $('#assiTbody').find('tr').each(function() {
                assiTd = $(this).children();
                assiItem.name=assiTd.eq(1).html();
                assiItem.value=assiTd.eq(2).html();
                assiItem.method='';
                assiItem.isRelative=null;
                assiItem.toolName='';
                assistantProperties.push(assiItem);
            });
            //关联属性 
            var relTd,
                relateProperties=[],
                relItem={};
            $('#relatePropTbody').find('tr').each(function() {
                relTd = $(this).children();
                relItem.name=relTd.eq(1).html();
                relItem.value=relTd.eq(2).html();
                relItem.method='';
                relItem.isRelative=null;
                relItem.toolName='';
                relateProperties.push(relItem);
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
                        "additionalProperties": additionalProperties,
                        "assistantProperties": assistantProperties,
                        "relateProperties": relateProperties
                    }
                }),
                success: function(data) {
                    // console.log(data);
                    if (data.respCode==0000) {
                        $('#successModalEle').modal();
                        _this.getElementTree(selectedUIName);
                        // treeObj.selectNode(nodes[0]);
                        $('#eleblank').css('display', 'block');
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'none');
                    } else {
                        _this.failMSG=data.respMsg;
                        $('#failModalEle').modal('show');
                    }
                },
                error: function() {
                    _this.failMSG=data.respMsg;
                    $('#failModalEle').modal('show');
                    $('#eleblank').css('display', 'block');
                    $('#UI').css('display', 'none');
                    $('#ele').css('display', 'none');
                }
            });
        },
        // 添加主属性
        addMainProp: function() {
            var curTbody = $('#mainTbody');
            curTbody.append(this.mainPropTr);
        },
        // 删除主属性
        delMainProp: function() {
            var selectedTr = $('#mainTbody').find('input[name="mainProp"]:checked').parent().parent();
            selectedTr.remove();
        },
        // 添加附加属性
        addAddiProp: function() {
            var curTbody = $('#addiTbody');
            curTbody.append(this.addiPropTr);
        },
        // 删除附加属性
        delAddiProp: function() {
            var selectedTr = $('#addiTbody').find('input[name="addiProp"]:checked').parent().parent();
            selectedTr.remove();
        },
        // 添加辅助属性
        addAssiProp: function() {
            var curTbody = $('#assiTbody');
            curTbody.append(this.assiPropTr);
        },
        // 删除辅助属性
        delAssiProp: function() {
            var selectedTr = $('#assiTbody').find('input[name="assiProp"]:checked').parent().parent();
            selectedTr.remove();
        },
        //添加关联元素属性
        addLinkedProp: function() {
            var curTbody = $('#relatePropTbody');
            curTbody.append(this.linkedPropTr);
        },
        // 删除关联元素属性
        delLinkedProp: function() {
            var selectedTr = $('#relatePropTbody').find('input[name="linkProp"]:checked').parent().parent();
            selectedTr.remove();
        },

        //禁止拖动
        zTreeBeforeDrag: function(treeId, treeNodes) {
            return false;
        },
        //用按钮查询节点  
        searchNodes: function() {
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var keywords = $("#elekeyword").val();
            var nodes = treeObj.getNodesByParamFuzzy("name", keywords, null);
            fuzzySearch('elementtree','#elekeyword',null,true); 
        },
        /*elementtree end*/
        //UI关联对象库中对象
        setUILinked: function() {
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
        removeUILinked: function() {
            var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
            treeObj.cancelSelectedNode();
            $('#UILinkedInput').val('');
            // $('#successModalEle').modal();
        },
        /*UILinked objecttree end*/
        //设置对象库中父对象
        setEleParent: function() {
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
        removeEleParent: function() {
            var treeObj = $.fn.zTree.getZTreeObj("eleParentTree");
            treeObj.cancelSelectedNode();
            $('#eleParentInput').val('');
            // $('#successModalEle').modal();
        },
        /*eleParent objecttree end*/
        //设置对象库中关联对象
        setEleLinked: function() {
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
        removeEleLinked: function() {
            var treeObj = $.fn.zTree.getZTreeObj("eleLinkedTree");
            treeObj.cancelSelectedNode();
            $('#eleLinkedInput').val('');
            // $('#successModalEle').modal();
        },
        /*eleLinked objecttree end*/

        //勾选关联元素名称
        relateNameClick: function(event) {
            if ($(event.target).attr('checked')) {}
        },
        replacemess(str) {
            var name =str.replace(/<span style="color: whitesmoke;background-color: darkred;">/g,"").replace(/<\/span>/g,"");
            return name;
        },
    }
});

Vue.component('element-library', elementLibrary);