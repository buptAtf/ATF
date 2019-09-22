var detailModalTemplate=`
<br>
<!--单用例-->
<div class="tab-pane active" id="single-case"  v-if="testCase.caseCompositeType==1">
<h3>单用例</h3>
    <!--开始-->
    <div class="form-horizontal">
        <div class="row">
            <div class="form-group">
                <div class="col-lg-3 nopadding"></div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>用例编号</i></label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control" name="casecode" :value="testCase.casecode">
                    </div>
                </div>
            </div>
        </div>
    <div class="row">
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>测试点</i></label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control" name="testpoint" :value="testCase.testPoint">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>测试任务</i></label>
                    <div class="col-lg-9">
                        <!-- <input disabled  type="text" class="form-control" name="submissionId"> -->
                        <input disabled  type="text" class="form-control" name="submissionId" :value="testCase.missionName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">版本号</label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control" name="versioncode" :value="testCase.version">
                    </div>
                </div>
            </div>
            <div class="form-group" name = "boundGroup">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>被测系统</i></label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control autid" name="autid"  :value="testCase.autName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>功能点</i></label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control transid" id="" name="transid" :value="testCase.transName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label scriptmodeflag">基础脚本</label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control" size="1" name="scriptmodeflag" id="" :value="testCase.scriptTemplateName">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">用例性质</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="caseProperty" :value="testCase.caseProperty">
                            <option value="1">正常值</option>
                            <option value="2">错误值</option>
                            <option value="3">边界值</option>
                            <option value="4">要素级</option>
                            <option value="5">流程级</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">测试用例类型</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="caseType" :value="testCase.caseType">
                            <option value="1">联机</option>
                            <option value="2">批量</option>
                            <option value="3">接口</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">优先级</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="priority" :value="testCase.priority">
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
                        <input disabled  class="form-control" size="1" name="author" :value="testCase.authorName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">评审者</label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control" name="reviewer" :value="testCase.reviewerName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">执行者</label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control" name="executor" :value="testCase.executorName">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>用例使用状态</i></label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="usestatus" :value="testCase.useStatus">
                            <option value="1">新增</option>
                            <option value="2">评审通过</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">执行方式</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="executemethod" :value="testCase.executeMethod">
                            <option value="1">手工</option>
                            <option value="2">自动化</option>
                            <option value="3">配合</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">脚本管理方式</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" name="scriptmode" :value="testCase.scriptMode">
                            <option value="1">脚本</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>测试意图</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="testDesign" :value="testCase.testDesign"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                        <label class="col-lg-2 control-label">前置条件</label>
                        <div class="col-lg-10">
                            <textarea disabled class="form-control" rows="2" name="preRequisites" :value="testCase.preRequisites"></textarea>
                        </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>测试步骤</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="testStep" :value="testCase.testStep"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label">数据需求</label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="dataRequest" :value="testCase.dataRequest"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>预期结果</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="expectResult" :value="testCase.expectResult"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                        <label class="col-lg-2 control-label">附加检查点</label>
                        <div class="col-lg-10">
                            <textarea disabled class="form-control" rows="2" name="checkPoint" :value="testCase.checkPoint"></textarea>
                        </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-lg-1 control-label">备注</label>
                <div class="col-lg-11">
                    <textarea disabled class="form-control" rows="3" name="note" :value="testCase.note"></textarea>
                </div>
            </div>
        </div>
    </div>
    <!--结束-->
</div>
<!--流程用例-->
<div class="tab-pane active" id="single-case"  v-if="testCase.caseCompositeType==2">
    <h3>流程用例</h3>
    <!--开始-->
    <div class="form-horizontal">
        <div class="row">
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>用例编号</i></label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control" name="casecode" :value="testCase.casecode" disabled>
                    </div>
                </div>
            </div>
        </div>
    <div class="row">
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>测试点</i></label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control" name="testpoint" :value="testCase.testPoint" disabled>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>测试任务</i></label>
                    <div class="col-lg-9">
                        <!-- <input disabled  type="text" class="form-control" name="submissionId"> -->
                        <input disabled  type="text" class="form-control" name="submissionId" :value="testCase.missionName" disabled> 
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">版本号</label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control" name="versioncode" :value="testCase.version">
                    </div>
                </div>
            </div>
            <div class="form-group" name = "boundGroup">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>被测系统</i></label>
                    <div class="col-lg-9">
                        <input disabled  type="text" class="form-control autid" name="autid"  :value="testCase.autName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>功能点</i></label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control transid" id="" name="transid" :value="testCase.transName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label scriptmodeflag">基础脚本</label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control" size="1" name="scriptmodeflag" id="" :value="testCase.scriptTemplateName">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">用例性质</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="caseProperty" :value="testCase.caseProperty">
                            <option value="1">正常值</option>
                            <option value="2">错误值</option>
                            <option value="3">边界值</option>
                            <option value="4">要素级</option>
                            <option value="5">流程级</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">测试用例类型</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="caseType" :value="testCase.caseType">
                            <option value="1">联机</option>
                            <option value="2">批量</option>
                            <option value="3">接口</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">优先级</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="priority" :value="testCase.priority">
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
                        <input disabled  class="form-control" size="1" name="author" :value="testCase.authorName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">评审者</label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control" name="reviewer" :value="testCase.reviewerName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">执行者</label>
                    <div class="col-lg-9">
                        <input disabled  class="form-control" name="executor" :value="testCase.executorName">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>用例使用状态</i></label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="usestatus" :value="testCase.useStatus">
                            <option value="1">新增</option>
                            <option value="2">评审通过</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">执行方式</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" size="1" name="executemethod" :value="testCase.executeMethod">
                            <option value="1">手工</option>
                            <option value="2">自动化</option>
                            <option value="3">配合</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">脚本管理方式</label>
                    <div class="col-lg-9">
                        <select disabled  class="form-control" name="scriptmode" :value="testCase.scriptMode">
                            <option value="1">脚本</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>测试意图</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="testDesign" :value="testCase.testDesign"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                        <label class="col-lg-2 control-label">前置条件</label>
                        <div class="col-lg-10">
                            <textarea disabled class="form-control" rows="2" name="preRequisites" :value="testCase.preRequisites"></textarea>
                        </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>测试步骤</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="testStep" :value="testCase.testStep"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label">数据需求</label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="dataRequest" :value="testCase.dataRequest"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>预期结果</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="expectResult" :value="testCase.expectResult"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                        <label class="col-lg-2 control-label">附加检查点</label>
                        <div class="col-lg-10">
                            <textarea disabled class="form-control" rows="2" name="checkPoint" :value="testCase.checkPoint"></textarea>
                        </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-lg-1 control-label">备注</label>
                <div class="col-lg-11">
                    <textarea disabled class="form-control" rows="3" name="note" :value="testCase.note"></textarea>
                </div>
            </div>
        </div>
    </div>
    <!--结束-->
    <div v-for="item in flowCases">
    <h3>流程节点</h3>
    <!--开始-->
    <div class="form-horizontal">
        <div class="form-group" >
            <label class="col-lg-2 control-label">流程节点编号</label>
            <div class="col-lg-4">
                <input disabled type="text" class="form-control" name="actioncasecode" :value="item.actioncasecode">
            </div>
            <div class="col-lg-2">
            </div>
            <div class="col-lg-2">
            </div>
        </div>
            <div class="form-group" :name = "caseNodeNum.name">
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>被测系统</i></label>
                    <div class="col-lg-9">
                        <input disabled type="text" class="form-control " name="autid" :value="item.autName"></select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>功能点</i></label>
                    <div class="col-lg-9">
                        <input disabled class="form-control " id="" name="transid" :value="item.transName">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label ">基础脚本</label>
                    <div class="col-lg-9">
                        <input disabled class="form-control" size="1" name="scriptmodeflag" id="" :value="item.scriptTemplateName">
                    </div>
                </div>
            </div> 
            <div class="form-group" >
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label"><i>动作标识</i></label>
                    <div class="col-lg-9">
                        <input disabled type="text" class="form-control " name="actioncode" :value="item.actioncode">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">步骤顺序号</label>
                    <div class="col-lg-9">
                        <input disabled class="form-control" name="steporder" :value="item.steporder">
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label "><i>测试点</i></label>
                    <div class="col-lg-9">
                        <input disabled type="text" class="form-control" name="testpoint" :value="item.testpoint">
                    </div>
                </div>
            </div> 
            <div class="form-group" >
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">执行方式</label>
                    <div class="col-lg-9">
                        <select disabled class="form-control" size="1" name="executeMethod" :value="item.executeMethod">
                            <option value="1">手工</option>
                            <option value="2">自动化</option>
                            <option value="3">配合</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 nopadding">
                    <label class="col-lg-3 control-label">脚本管理方式</label>
                    <div class="col-lg-9">
                            <select disabled class="form-control" name="scriptmode" :value="item.scriptMode">
                                <option value="1">模板</option>
                            </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>测试意图</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="testDesign" :value="item.testdesign"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label">前置条件</label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="preRequisites" :value="item.prerequisites"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>测试步骤</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="testStep" :value="item.teststep"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label">数据需求</label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="dataRequest" :value="item.datarequest"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-6">
                    <label class="col-lg-2 control-label"><i>预期结果</i></label>
                    <div class="col-lg-10">
                        <textarea disabled class="form-control" rows="2" name="expectResult" :value="item.expectresult"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                        <label class="col-lg-2 control-label">附加检查点</label>
                        <div class="col-lg-10">
                            <textarea disabled class="form-control" rows="2" name="checkPoint" :value="item.checkpoint"></textarea>
                        </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-lg-1 control-label">备注</label>
                <div class="col-lg-11">
                    <textarea disabled class="form-control" rows="3" name="note" :value="item.note"></textarea>
                </div>
            </div>
        </div>
    <!--结束-->
    </div>
</div>
`
var detailModal=Vue.extend({

	template: detailModalTemplate,
    props: ['testCase','flowCases'],
    data: function () {
		return {
            casecode:null,
            caseCompositeType:null,
            casecode:null,
        }
    },
    ready: function() {

    },
    watch: {
        testCase: function(){

        },
    },

})
Vue.component('detailModal', detailModal);
