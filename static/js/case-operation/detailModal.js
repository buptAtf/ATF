var detailModelTemplet=`
<!-- modal-body start -->
<br>
<!--单用例-->
<div class="tab-pane active" id="single-case" ><!--  v-if="caseCompositeType==1"  -->
<form class="form-horizontal" role="form" id="insertSingleForm">
    <div class="form-group">
        <div class="col-lg-4 nopadding">
            <label class="col-lg-3 control-label"><i>案例编号<font color="#FF0000">*</font></i></label>
            <div class="col-lg-9">
                <input type="text" class="form-control" name="casecode" v-bind="casecode" readonly>
            </div>
        </div>
        <a class="btn btn-white" v-on:click="caseshow=!caseshow, caseflag=!caseflag">
                <span v-if="caseflag">显示详情</span>
                <span v-else>收起详情</span>
                <i :class="{'icon-angle-down':caseflag, 'icon-angle-up':!caseflag}"></i>
        </a>
    </div>
  <div class="row" v-show="caseshow">
        <div class="form-group">
            <label class="col-lg-2 control-label hidden">案例组成类型</label>
            <div class="col-lg-4 hidden">
                <input type="text" class="form-control" name="casecompositetype" value="1" readonly>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>测试点<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <input type="text" class="form-control" name="testpoint" v-bind="testPoint" readonly>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>测试任务<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <!-- <input type="text" class="form-control" name="submissionId"> -->
                    <input type="text" class="form-control" name="submissionId" v-bind="missionName"  readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">版本号</label>
                <div class="col-lg-9">
                    <input type="text" class="form-control" name="versioncode" v-bind="version" readonly>
                </div>
            </div>
        </div>
        <div class="form-group" name = "boundGroup">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>被测系统<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <input type="text" class="form-control autid" name="autid" v-bind="autName" readonly></input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>功能点<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <input class="form-control transid" id="" name="transid" v-bind="transName" readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label scriptmodeflag">基础脚本</label>
                <div class="col-lg-9">
                    <input class="form-control" size="1" name="scriptmodeflag" v-bind="scriptTemplateName" id="" readonly>
                    </input>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">案例性质</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="caseProperty" v-bind="caseProperty"  disabled="disabled">
                        <option value="1">正常值</option>
                        <option value="2">错误值</option>
                        <option value="3">边界值</option>
                        <option value="4">要素级</option>
                        <option value="5">流程级</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">测试案例类型</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="caseType" v-bind="caseType" disabled="disabled">
                        <option value="1">联机</option>
                        <option value="2">批量</option>
                        <option value="3">接口</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">优先级</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="priority" v-bind="priority"  disabled="disabled">
                        <option value="1">1级</option>
                        <option value="2">2级</option>
                        <option value="3">3级</option>
                        <option value="4">4级</option>
                        <option value="5">5级</option>
                        <option value="6">6级</option>
                        <option value="7">7级</option>
                        <option value="8">8级</option>
                        <option value="9">9级</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">作者</label>
                <div class="col-lg-9">
                    <input class="form-control" size="1" name="author"  v-bind="authorName" readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">评审者</label>
                <div class="col-lg-9">
                    <input class="form-control" name="reviewer"   v-bind="reviewerName" readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">执行者</label>
                <div class="col-lg-9">
                    <input class="form-control" name="executor"  v-bind="executorName"  readonly>
                    
                    </input>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>案例使用状态<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="usestatus"  v-bind="usestatus"  disabled="disabled">
                        <option value="1">新增</option>
                        <option value="2">评审通过</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">执行方式</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="executemethod" v-bind="executemethod" disabled="disabled">
                        <option value="1">手工</option>
                        <option value="2">自动化</option>
                        <option value="3">配合</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">脚本管理方式</label>
                <div class="col-lg-9">
                    <select class="form-control" name="scriptmode" v-bind="scriptmode" disabled="disabled">
                        <option value="1">脚本</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-6">
                <label class="col-lg-2 control-label"><i>测试意图<font color="#FF0000">*</font></i></label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="testDesign" v-bind="testDesign"  readonly></textarea>
                </div>
            </div>
            <div class="col-lg-6">
                    <label class="col-lg-2 control-label">前置条件</label>
                    <div class="col-lg-10">
                        <textarea class="form-control" rows="2" name="preRequisites" v-bind="preRequisites"  readonly></textarea>
                    </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-6">
                <label class="col-lg-2 control-label"><i>测试步骤<font color="#FF0000">*</font></i></label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="testStep" v-bind="testStep"  readonly></textarea>
                </div>
            </div>
            <div class="col-lg-6">
                <label class="col-lg-2 control-label">数据需求</label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="dataRequest" v-bind="dataRequest"  readonly></textarea>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-6">
                <label class="col-lg-2 control-label"><i>预期结果<font color="#FF0000">*</font></i></label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="expectResult" v-bind="expectResult" readonly></textarea>
                </div>
            </div>
            <div class="col-lg-6">
                    <label class="col-lg-2 control-label">附加检查点</label>
                    <div class="col-lg-10">
                        <textarea class="form-control" rows="2" name="checkPoint" v-bind="checkPoint"  readonly></textarea>
                    </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-1 control-label">备注</label>
            <div class="col-lg-11">
                <textarea class="form-control" rows="3" name="note" v-bind="note"   readonly></textarea>
            </div>
        </div>
    </div>
</form>
</div>
<!-- 流程用例 -->
<div class="tab-pane" id="flow-case"><!--   v-if="caseCompositeType==2"  -->
<form class="form-horizontal" role="form" id="insertFlowForm">
    <div class="form-group">
        <div class="col-lg-4 nopadding">
            <label class="col-lg-3 control-label"><i>案例编号<font color="#FF0000">*</font></i></label>
            <div class="col-lg-9">
                <input type="text" class="form-control" name="casecode"  v-bind="casecode"   readonly>
            </div>
        </div>
        <a class="btn btn-white" v-on:click="flowcaseshow=!flowcaseshow, flowcaseflag=!flowcaseflag">
                <span v-if="flowcaseflag">显示详情</span>
                <span v-else>收起详情</span>
                <i :class="{'icon-angle-down':flowcaseflag, 'icon-angle-up':!flowcaseflag}"></i>
        </a>
    </div>
    <div class="row" v-show="flowcaseshow">
        <div class="form-group">
            <label class="col-lg-2 control-label hidden">案例组成类型</label>
            <div class="col-lg-4 hidden">
                <input type="text" class="form-control" name="casecompositetype" value="2" readonly>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>测试点<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <input type="text" class="form-control" name="testpoint" v-bind="testPoint"  readonly>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>测试任务<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <!-- <input type="text" class="form-control" v-bind="missionName"  name="submissionId"> -->
                    <input type="text" class="form-control" name="submissionId" readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">版本号</label>
                <div class="col-lg-9">
                    <input type="text" class="form-control" name="versioncode" v-bind="versioncode"  readonly>
                </div>
            </div>
        </div>
        <div class="form-group" name = "boundGroup">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>被测系统<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <input type="text" class="form-control" name="autid" v-bind="autName" readonly></input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>功能点<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <input class="form-control" id="" name="transid" v-bind="transName"  readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">基础脚本</label>
                <div class="col-lg-9">
                    <input class="form-control" size="1" name="scriptmodeflag" v-bind="scriptTemplateName"  id="" readonly>
                    </input>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">案例性质</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="caseProperty" v-bind="caseProperty"  disabled="disabled">
                        <option value="1">正常值</option>
                        <option value="2">错误值</option>
                        <option value="3">边界值</option>
                        <option value="4">要素级</option>
                        <option value="5">流程级</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">测试案例类型</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="caseType" v-bind="caseType"  disabled="disabled">
                        <option value="1">联机</option>
                        <option value="2">批量</option>
                        <option value="3">接口</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">优先级</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="priority" v-bind="priority"  disabled="disabled">
                        <option value="1">1级</option>
                        <option value="2">2级</option>
                        <option value="3">3级</option>
                        <option value="4">4级</option>
                        <option value="5">5级</option>
                        <option value="6">6级</option>
                        <option value="7">7级</option>
                        <option value="8">8级</option>
                        <option value="9">9级</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">作者</label>
                <div class="col-lg-9">
                    <input class="form-control" size="1" name="author" v-bind="authorName"  readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">评审者</label>
                <div class="col-lg-9">
                    <input class="form-control" name="reviewer" v-bind="reviewerName"  readonly>
                    </input>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">执行者</label>
                <div class="col-lg-9">
                    <input class="form-control" name="executor" v-bind="executorName"  readonly>
                    </input>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label"><i>案例使用状态<font color="#FF0000">*</font></i></label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="usestatus" v-bind="usestatus"  disabled="disabled">
                        <option value="1">新增</option>
                        <option value="2">评审通过</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">执行方式</label>
                <div class="col-lg-9">
                    <select class="form-control" size="1" name="executemethod" v-bind="executemethod"  disabled="disabled">
                        <option value="1">手工</option>
                        <option value="2">自动化</option>
                        <option value="3">配合</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 nopadding">
                <label class="col-lg-3 control-label">脚本管理方式</label>
                <div class="col-lg-9">
                    <select class="form-control" name="scriptmode" v-bind="scriptmode"  disabled="disabled">
                        <option value="1">模板</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-6">
                <label class="col-lg-2 control-label"><i>测试意图<font color="#FF0000">*</font></i></label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="testDesign" v-bind="testDesign"   readonly></textarea>
                </div>
            </div>
            <div class="col-lg-6">
                    <label class="col-lg-2 control-label">前置条件</label>
                    <div class="col-lg-10">
                        <textarea class="form-control" rows="2" name="preRequisites" v-bind="preRequisites"  readonly></textarea>
                    </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-6">
                <label class="col-lg-2 control-label"><i>测试步骤<font color="#FF0000">*</font></i></label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="testStep" v-bind="testStep" readonly></textarea>
                </div>
            </div>
            <div class="col-lg-6">
                <label class="col-lg-2 control-label">数据需求</label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="dataRequest" v-bind="dataRequest" readonly></textarea>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-6">
                <label class="col-lg-2 control-label"><i>预期结果<font color="#FF0000">*</font></i></label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="2" name="expectResult"  v-bind="expectResult" readonly></textarea>
                </div>
            </div>
            <div class="col-lg-6">
                    <label class="col-lg-2 control-label">附加检查点</label>
                    <div class="col-lg-10">
                        <textarea class="form-control" rows="2" name="checkPoint" v-bind="checkPoint" readonly></textarea>
                    </div>
            </div>
        </div>
        
        <div class="form-group">
            <label class="col-lg-1 control-label">备注</label>
            <div class="col-lg-11">
                <textarea class="form-control" rows="3" name="note" v-bind="note" readonly></textarea>
            </div>
        </div>
    </div>
    <div id="addCaseNode">
        <div v-for="flowcase in  flowcases">
                <h3>流程节点案例</h3>
            <div class="form-group" >
                <label class="col-lg-2 control-label hidden">案例组成类型</label>
                <label class="col-lg-2 control-label">流程节点编号</label>
                <div class="col-lg-4">
                    <input type="text" class="form-control" name="actioncasecode" :value="flowcase.actioncasecode" readonly>
                </div>
                <!--
                <div class="col-lg-2">
                    <a class="btn btn-white" v-on:click="caseNodeNum.show=!caseNodeNum.show">
                        <span v-if="caseNodeNum.show">显示详情</span>
                        <span v-else>收起详情</span>
                        <i :class="{'icon-angle-down':caseNodeNum.show, 'icon-angle-up':!caseNodeNum.show}"></i>
                    </a>
                </div>
                -->
            </div>
            <div >
            <!--  v-show="caseNodeNum.show"  <=上   下=> :name = "caseNodeNum.name"-->
                <div class="form-group" >
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label"><i>被测系统<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-9">
                            <input type="text" class="form-control " name="autid" :value="flowcase.autid" readonly></input>
                        </div>
                    </div>
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label"><i>功能点<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-9">
                            <input class="form-control " id="" name="transid" :value="flowcase.transid" readonly>
                            </input>
                        </div>
                    </div>
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label ">基础脚本</label>
                        <div class="col-lg-9">
                            <input class="form-control" size="1" name="scriptmodeflag" id="" :value="flowcase.scriptmodeflag" readonly>
                            </input>
                        </div>
                    </div>
                </div> 
                <div class="form-group" >
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label"><i>动作标识<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-9">
                            <input type="text" class="form-control " name="actioncode" :value="flowcase.actioncode" readonly>
                        </div>
                    </div>
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label">步骤顺序号</label>
                        <div class="col-lg-9">
                            <input class="form-control" name="steporder" :value="flowcase.steporder" readonly>
                        </div>
                    </div>
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label "><i>测试点<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-9">
                            <input type="text" class="form-control" name="testpoint" :value="flowcase.testpoint" readonly>
                        </div>
                    </div>
                </div> 
                <div class="form-group" >
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label">执行方式</label>
                        <div class="col-lg-9">
                            <select class="form-control" size="1" name="executeMethod" :value="flowcase.executeMethod" disabled="disabled">
                                <option value="1">手工</option>
                                <option value="2">自动化</option>
                                <option value="3">配合</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4 nopadding">
                        <label class="col-lg-3 control-label">脚本管理方式</label>
                        <div class="col-lg-9">
                                <select class="form-control" name="scriptmode" :value="flowcase.scriptmode" disabled="disabled">
                                    <option value="1">模板</option>
                                </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-6">
                        <label class="col-lg-2 control-label"><i>测试意图<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-10">
                            <textarea class="form-control" rows="2" name="testDesign" :value="flowcase.testDesign" readonly></textarea>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <label class="col-lg-2 control-label">前置条件</label>
                        <div class="col-lg-10">
                            <textarea class="form-control" rows="2" name="preRequisites" :value="flowcase.preRequisites" readonly></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-6">
                        <label class="col-lg-2 control-label"><i>测试步骤<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-10">
                            <textarea class="form-control" rows="2" name="testStep" :value="flowcase.testStep" readonly></textarea>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <label class="col-lg-2 control-label">数据需求</label>
                        <div class="col-lg-10">
                            <textarea class="form-control" rows="2" name="dataRequest" :value="flowcase.dataRequest" readonly></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-6">
                        <label class="col-lg-2 control-label"><i>预期结果<font color="#FF0000">*</font></i></label>
                        <div class="col-lg-10">
                            <textarea class="form-control" rows="2" name="expectResult" :value="flowcase.expectResult" readonly></textarea>
                        </div>
                    </div>
                    <div class="col-lg-6">
                            <label class="col-lg-2 control-label">附加检查点</label>
                            <div class="col-lg-10">
                                <textarea class="form-control" rows="2" name="checkPoint" :value="flowcase.checkPoint" readonly></textarea>
                            </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-1 control-label">备注</label>
                    <div class="col-lg-11">
                        <textarea class="form-control" rows="3" name="note" :value="flowcase.note" readonly></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a class="btn" v-on:click="addCaseNode()"><i class="icon-plus-sign"></i>点击添加节点案例</a>

</form>
</div>
<!-- modal-body end -->
`
var detailModel = Vue.extend({
	template: detailModelTemplet,
    props: ['testcaseid'],
    data: function () {
		return {
      queryData:'',
      tableData: [],
      caseshow:true,
      caseflag:true,
      flowcaseshow:true,
      flowcaseflag:true,
      queryData:'',
      tableData: [],
      flowcases:[],
      casecode:'20181469',
      testPoint:2,
      missionName:'测试任务',
      versioncode:2,
      autName:'无',
      //caseCompositeType:null,
      transName:'无',
      scriptTemplateName:'无',
      caseProperty:2,
      caseType:2,
      priority:3,
      authorName:'chai',
      reviewerName:'chai',
      executorName:'chai',
      usestatus:1,
      executemethod:1,
      scriptmode:1,
      testDesign:'无',
      preRequisites:'无',
      testStep:'无',
      dataRequest:'无',
      expectResult:'无',
      checkPoint:'无',
      note:'无',
		}
	},
	ready: function() {
              //this.caseCompositeType=1;

	},
	watch: {
    // testcaseid: function() {
    //   console.log('watch'+this.testcaseid);
    //   this.query();
    // }
	},
	computed: {
    queryData: function() {
      console.log('computedscript')
      return this.testcaseid
    }
	},
	methods: {
    query: function() {
      console.log("logloglolgog0"+this.queryData+"111"+this.testcaseid)
      if(!this.testcaseid) {
        console.log("aaaaaaaaa");
        return;
      }
    }
	}
    
    
    
    /*
	data: function () {
		return {
            caseshow:true,
            caseflag:true,
            flowcaseshow:true,
            flowcaseflag:true,
            //caseNodeNums: [{num:1,status:true,show:true,name:"boundGroup1",display:false}],
            queryData:'',
            tableData: [],
            flowcases:[],
            casecode:20181469,
            testPoint:2,
            missionName:'测试任务',
            versioncode:2,
            autName:'无',
            caseCompositeType:1,
            transName:'无',
            scriptTemplateName:'无',
            caseProperty:2,
            caseType:2,
            priority:3,
            authorName:'chai',
            reviewerName:'chai',
            executorName:'chai',
            usestatus:1,
            executemethod:1,
            scriptmode:1,
            testDesign:'无',
            preRequisites:'无',
            testStep:'无',
            dataRequest:'无',
            expectResult:'无',
            checkPoint:'无',
            note:'无',
		}
    },
    ready: function() {
    },
    watch: {
        testcaseid: function() {
            var _this=this;
            $.ajax({
                    url: address3+'testcase/getSingleTestCaseInfo',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": _this.testcaseid
                    }),
                    success: function(data){
                        _this.casecode=data.testcaseViewRespDTO.casecode;
                        _this.caseCompositeType=data.testcaseViewRespDTO.caseCompositeType;
                        _this.testPoint=data.testcaseViewRespDTO.testPoint;
                        _this.missionName=data.testcaseViewRespDTO.missionName;
                        _this.versioncode=data.testcaseViewRespDTO.versioncode;
                        _this.autName=data.testcaseViewRespDTO.autName;
                        _this.transName=data.testcaseViewRespDTO.transName;
                        _this.scriptTemplateName=data.testcaseViewRespDTO.scriptTemplateName;
                        _this.caseProperty=data.testcaseViewRespDTO.caseProperty;
                        _this.caseType=data.testcaseViewRespDTO.caseType;
                        _this.priority=data.testcaseViewRespDTO.priority;
                        _this.authorName=data.testcaseViewRespDTO.authorName;
                        _this.reviewerName=data.testcaseViewRespDTO.reviewerName;
                        _this.executorName=data.testcaseViewRespDTO.executorName;
                        _this.usestatus=data.testcaseViewRespDTO.usestatus;
                        _this.executemethod=data.testcaseViewRespDTO.executemethod;
                        _this.scriptmode=data.testcaseViewRespDTO.scriptmode;
                        _this.testDesign=data.testcaseViewRespDTO.testDesign;
                        _this.preRequisites=data.testcaseViewRespDTO.preRequisites;
                        _this.testStep=data.testcaseViewRespDTO.testStep;
                        _this.dataRequest=data.testcaseViewRespDTO.dataRequest;
                        _this.expectResult=data.testcaseViewRespDTO.expectResult;
                        _this.checkPoint=data.testcaseViewRespDTO.checkPoint;
                        _this.note=data.testcaseViewRespDTO.note;
                       //_this.testcase=data.testcaseViewRespDTO;
                        console.log(_this.testcase)
                        if(data.testcaseViewRespDTO.caseCompositeType==2){
                        _this.flowcases=data.testcaseActionList;
                        }
                    }
                });
            }
    },
	methods: {
        test :function(){
            console.log("1111");
        },
        // 流程案例添加节点案例
        // addCaseNode: function() {
        //     var _this=this;
        //     _this.caseNodeNum++;
        //     var caseNodeNum={num: _this.caseNodeNum,status:true,show:true,name:"boundGroup"+_this.caseNodeNum,display:false}
        //     _this.caseNodeNums.push(caseNodeNum);
        //     _this.groupBound(_this.caseNodeNums[_this.caseNodeNum-2].name);
        //     _this.caseNodeNums[_this.caseNodeNum-2].display=true;
        // },
        
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
                            url: address3 + "scripttemplateController/queryTemplateByTransId",
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
    }*/
});

Vue.component('detail-model', detailModel);



