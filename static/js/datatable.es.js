// 查看脚本
// document.getElementById('viewScript').onclick = function () {
var tooltipwindow;
var vac_conditionList = null;
var autId = null;
function viewScriptHandler (event,caseCompositeType) {//查看脚本按钮的函数
	var testcaseId = event.target.getAttribute('data-id');
	// var data = { testcaseId
	// };
	// window.open('case-operation.html?activeName=view-script&testcaseId='+testcaseId);
	// view.viewScriptTestcaseId  = testcaseId;
	view.getData(testcaseId,caseCompositeType);//查看脚本
	event.stopPropagation();
}
var view = new Vue({//与查看脚本的模态框相绑定
	el: '#script-modal',
	data: {
		viewScriptTestcaseId: '326',
		tableData: []
	},
	methods: {
		getData: function(testcaseId,caseCompositeType) {//查看脚本
			var _this = this;
			//var data = {"testcaseId":testcaseId,"caseCompositeType":1};
			$('#view-script').modal('show');
			$.ajax({
				url: address3 + 'dataCenter/getTestcaseScript',
				data: JSON.stringify({
					"testcaseId":testcaseId,
					"caseCompositeType":caseCompositeType
				}),
				type: 'post',
				contentType:"application/json",
				success: function (data) {
				if (!data) {
					Vac.alert(data.msg || '查询失败');
					return;
				}	
					_this.tableData = data.scriptList;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
				Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
				}
			});
		}
	}
});
// 查看脚本结束

$(document).ready(function () {
	$('.3').addClass('open');
	$('.3 .arrow').addClass('open');
	$('.3-ul').css({display: 'block'});
	$('.3-3').css({color: '#ff6c60'});
	// var submenuHeight = document.querySelector('#submenu').offsetHeight;
	// document.querySelector('#submenu').children[0].style.height = submenuHeight / 2 + 'px';
	// document.querySelector('#submenu').children[1].style.height = submenuHeight / 2 + 'px';

	var transid = '',
		autId = ''
	tooltipwindow = new Vue({
		el: '#tooltipwindow',
		data: {
			flag: true,
			data: [],
			scriptSelected: false,
			testPoint:'',
			executor:79,
			caselibId:14,
			autId:33,
			transId:80,
			scriptId:1193
		},
		methods: {
			toggle: function () {
				this.flag = !this.flag;
			}
		}
	});
	(function () {
		var filterVue=new Vue({
			el: "#filter-container",
			data: {
				isShow: true,
				iconflag: true,

			},
			ready: function(){
				var _this = this;
				// 删除筛选条件
		        $('.filterList').delegate('button.btn-danger','click',function(){
		            $(event.target).closest('li').remove();
		        });
		        // 筛选用例select option
		        // let that=this;
				$('.filterList').delegate('select[name="propertyName"]', 'change', function() {
		            let selectedProp=$(event.target).val();
		            if(selectedProp=='caseCompositeType'){
		                // compare select
		                $(event.target).parent().next().children('select').children().remove();
		                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option>');
		                $(event.target).parent().next().children('select').selectpicker('refresh');
		                // value select
		                let compareSelect=$(event.target).parent().next().children('select');
		                $(compareSelect).on('change',function(){
		                    if($(this).val()=='in'||$(this).val()=='!in'){
		                        $(this).parent().next().next().remove();
		                        $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select" multiple></select>');
		                        $('#cctVal').append('<option value="1">单用例</option><option value="3">流程节点</option>');
		                        $('#cctVal').selectpicker('refresh');
		                    }else{
		                        $(this).parent().next().next().remove();
		                        $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select"></select>')
		                        $('#cctVal').append('<option value="1">单用例</option><option value="3">流程节点</option>');
		                        $('#cctVal').selectpicker('refresh');                    
		                    }
		                });
		            }else if(selectedProp=='casecode'){
		                // compare select
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
		            }else if(selectedProp=='priority'){
		                // compare select
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
		            }else if(selectedProp=='executeMethod'){
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
		            }else if(selectedProp=='missionId'){
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
		                                if(data.respCode=='0000'){
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
		                                if(data.respCode=='0000'){
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
		            }else if(selectedProp=='autId'){
		                // compare select
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
		                // compare select
		                $(event.target).parent().next().children('select').children().remove();
		                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
		                $(event.target).parent().next().children('select').selectpicker('refresh');
		                // value select
		                let compareSelect=$(event.target).parent().next().children('select');
		                $(compareSelect).on('change',function(){
		                    if($(this).val()=='in'||$(this).val()=='!in'){
		                        $(this).parent().next().next().remove();
		                        $(this).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select" multiple></select>')
		                        $(this).parent().next().next().append('<option value="">正常值</option><option value="">错误值</option><option value="">边界值</option><option value="">要素级</option><option value="">流程级</option>');
		                        $(this).parent().next().next().selectpicker('refresh');
		                    }else{
		                        $(this).parent().next().next().remove();
		                        $(this).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select"></select>')
		                        $('#cpVal').append('<option value="1">正常值</option><option value="2">错误值</option><option value="3">边界值</option><option value="4">要素级</option><option value="5">流程级</option>');
		                        $('#cpVal').selectpicker('refresh');                    
		                    }
		                });
		            }else if(selectedProp=='caseType'){
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
		            }else if(selectedProp=='author'){
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
		                    }
		                });  
		            }else if(selectedProp=='reviewer'){
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
		                            data: JSON.stringify({
		                                
		                            }),
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
		                            data: JSON.stringify({		                                
		                            }),
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
		            }else if(selectedProp=='executor'){
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
		                        $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true"></select>')
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
		                    }
		                });  
		            }else if(selectedProp=='scriptMode'){
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
		            }else if(selectedProp=='preRequisites'){
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
		            }else if(selectedProp=='dataRequest'){
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
		            }else if(selectedProp=='testStep'){
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
		            }else if(selectedProp=='expectResult'){
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
		            }else if(selectedProp=='checkPoint'){
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
		            }else if(selectedProp=='sceneId'){
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
				});
				_this.filterCase();

			},
			methods: {
				 // 添加筛选
				addFilter(){
		            // this.filterList.push('c');
		            let liStr=`<li>
							<label>筛选项目</label>
							<select name="propertyName" class="selectpicker prop_select" data-live-search="true">
								<option value="">请选择</option>
								<option value="caseCompositeType">用例组成类型</option>
								<option value="casecode">用例编号</option>
								<option value="missionId">测试任务</option>
								<option value="autId">被测系统</option>
								<option value="testDesign">测试意图</option>
								<option value="preRequisites">前置条件</option>
								<option value="dataRequest">数据需求</option>
								<option value="testStep">测试步骤</option>
								<option value="expectResult">预期结果</option>
								<option value="checkPoint">附加检查点</option>
								<option value="caseProperty">用例性质</option>
								<option value="caseType">测试用例类型</option>
								<option value="priority">优先级</option>
								<option value="author">作者</option>
								<option value="reviewer">评审者</option>
								<option value="scriptModeFlag">所属模板</option>
							</select>                
							<select name="compareType" class="selectpicker compare_select">
								<option value="">请选择</option>
							</select> 
							<label>值</label>
							<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple>
							</select>
							<button class="btn btn-xs btn-danger" @click="removeFilter($index,$event)"><i class="glyphicon glyphicon-remove"></i></button> 
						</li>`;
		            $('.filterList').append(liStr);
		            Vue.nextTick(function(){
		                $('.selectpicker').selectpicker('refresh')
		            });
		        },
		        //筛选用例
			    filterCase(){
			    	let executorId=sessionStorage.getItem('userId');
	                let data=[{propertyName: "executor", compareType: "=", propertyValueList: [executorId]},
	                		  {propertyName: "executeMethod", compareType: "=", propertyValueList: ["2"]},
	                		  {propertyName: "scriptMode", compareType: "=", propertyValueList: ["1"]}];
	                let list=$(".filterList>li");
	                let that=this;
	                // console.log(list)
	                for(let i=0;i<list.length;i++){
	                    let listItem={};
	                    listItem.propertyName=$(list[i]).find('select[name="propertyName"]').val();
	                    if(listItem.propertyName==''){
	                    	break;
	                    }
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
					// console.log(data)
					vac_conditionList = data;
	                $.ajax({
	                    url:address3 + 'dataCenter/queryFilterTree',
	                    contentType: 'application/json',
	                    data: JSON.stringify({
							'conditionList': data,
	                     }),
	                    type:'post',
	                    success: function (data) {
							if ('0000' !== data.respCode) {
								Vac.alert(data.respMsg);
								return;
							}
							var treeData = [];
							if (data.filterTree.length == 0) {
								Vac.alert('返回结果为空！')
								return
							}
							data.filterTree.forEach((value) => {
								var item = {};  //解构第一层
								item.open = true;
								item.children = [];
								value.transactList.forEach((value1) => {
									var subData = {};  //解构第二层
									subData.children = [];
									subData.open = true;
									({
										transId: subData.id,
										transName: subData.name,
									} = value1);
									value1.scriptTemplateList.forEach((value2 => {
										var ssubData = {};		 //解构第二层
										({
											scriptId: ssubData.id,
											scriptName: ssubData.name
										} = value2);
										subData.children.push(ssubData);
							
									}));
									
									item.children.push(subData);
								});
								({
									autId: item.id,
									autName: item.name,
								} = value);
								treeData.push(item);
							});
							zTreeObj = $.fn.zTree.init($("#tree-wrapper"), setting, treeData);
							filterVue.isShow=!filterVue.isShow;
							filterVue.iconflag=!filterVue.iconflag;
						},

	                });
	        	}
			}
		});

		var editDataVue = new Vue({//UI脚本右击编辑数据的模态框
			el: '#editData',
			data: {
				dataType: 4,
				isShow: false,
				insertTitle: null,
				insertType: null,
				isInsertDivShow: true, //
				selection: null,
				autId: null,
				transactId: null,
				beforeOperationRows: [],
				afterOperationRows: [],
				parameterVue: null,
				beforeStr: '',
				afterStr: '',
				// ztree的设置项
				zTreeSettings: {
					uiAndElement: {
						callback: {
						},
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
						}
					}
				},
				zTreeSettings2: {
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
						check: {
							enable: true,
							hkStyle: "checkbox",
							chkboxType: { "Y": "ps", "N": "ps" }
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
						},
						check: {
							enable: true,
							hkStyle: "checkbox",
							chkboxType: { "Y": "ps", "N": "ps" }
						}
					}
				},
				uiOrFunctions: {
					changed: false,  	// 模态框出现后是否点击过，如果点击过，在模态框点击保存时才会进行更改
					type: 'ui',			// 保存最后点击的是UI还是函数集，据此来确定不同的后续执行行为
					ui: '',				// 保存点击的ui
					element: '',		// 保存点击的元素
					classType: '',		// 保存点击的元素类型
					function: '',		// 保存点击的函数集中的项
					target: null,		// 保存点击编辑的target，据此可以获得parent tr
					table: 1			// 保存当前操作的是前置操作还是后置操作
				},				
			},
			created: function () { },
			ready: function () {
				this.autId = sessionStorage.getItem('autId')
				this.transactId = sessionStorage.getItem('transactId')
				var _this = this;
				this.zTreeSettings.uiAndElement.callback.onClick = this.zTreeOnClick;
				this.zTreeSettings.functions.callback.onClick = this.zTreeOnClick;
				// 设置table可以拖拽行
				$(function () {
					$("#sortable").sortable({
						stop: (event, ui) => {
							if (+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')) {
								return
							}
							// 拖拽停止后，改变绑定的数组中元素的顺序
							var target = ui.item[0].rowIndex - 1
							console.log(target)
							var start = ui.item[0].getAttribute('data-index');
							// console.log(`target: ${target} -- start: ${start}--end: ${end}`)
							if (target < 0) {
								_this.beforeOperationRows.unshift(_this.beforeOperationRows.splice(start, 1)[0])
							} else {
								_this.beforeOperationRows.splice(target, 0, _this.beforeOperationRows.splice(start, 1)[0])
							}
						}
					});
					$("#sortable").disableSelection();
					$("#sortable2").sortable({
						stop: (event, ui) => {
							if (+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')) {
								return
							}
							// 拖拽停止后，改变绑定的数组中元素的顺序
							var target = ui.item[0].rowIndex - 1
							var start = ui.item[0].getAttribute('data-index');
							// console.log(`target: ${target} -- start: ${start}--end: ${end}`)
							if (target < 0) {
								_this.afterOperationRows.unshift(_this.afterOperationRows.splice(start, 1)[0])
							} else {
								_this.afterOperationRows.splice(target, 0, _this.afterOperationRows.splice(start, 1)[0])
							}
						}
					});
					$("#sortable2").disableSelection();
				});
			},
			methods: {
				hide: function () { this.isShow = false; insertDivVue.isShow = false; },
				show: function (selection) {
					this.selection = selection;
					this.isShow = true;
					this.beforeOperationRows = []
					this.afterOperationRows = []
					document.getElementById("input1").value = ''
					document.getElementById("input4").value = ''
					var cellData = $.trim(handsontable.getDataAtCell(this.selection.start.row, this.selection.start.col))

					this.beforeOperationRows = [];
					this.afterOperationRows = [];
					if (cellData.includes('@before')) {
						var beforeStr = cellData.slice(cellData.indexOf('@before\n') + 7, cellData.indexOf('@value'));
						console.log("beforeSte:"+beforeStr);
						var beforeArr = beforeStr.split(';\n');
						console.log("beforeArr:"+beforeArr);
						this.parseScript(beforeArr, this.beforeOperationRows, 1)
					}
					if (cellData.includes('@after')) {
						var afterStr = cellData.slice(cellData.indexOf('@after\n') + 6);
						var afterArr = afterStr.split(';\n');
						this.parseScript(afterArr, this.afterOperationRows, 2);
					}
					var valueStr;
					if (cellData.includes('@value')) {
						var endIndex = cellData.includes('@after') ? cellData.indexOf('@after') : cellData.length;
						valueStr = cellData.slice(cellData.indexOf('@value') + 6, endIndex).replace(/^\s$/g, '');
					} else {
						valueStr = cellData;
					}
					if (valueStr.replace(/^\s$/g, '') == '') {
						editDataVue.dataType = 3;
					} else if (valueStr.replace(/^\s$/g, '') == 'nil') {
						editDataVue.dataType = 2;
					} else if (valueStr.includes('{expr=')) {
						editDataVue.dataType = 4;
						let str = valueStr.split('{expr=')[1]
						var value = str.slice(0, str.indexOf('}'));
						$('#input4').val(value);
					} else {
						editDataVue.dataType = 1;
						$('#input1').val(valueStr);
					}
					// if(cellData.startsWith('@before')) {
					// 	// 表达式
					// 	editDataVue.dataType = 4;
					// 	var beforeStr = cellData.slice(cellData.indexOf('@before\n') + 7, cellData.indexOf('@value'));
					// 	var valueStr = cellData.slice(cellData.indexOf('@value') + 5, cellData.indexOf('@after'));
					// 	var afterStr = cellData.slice(cellData.indexOf('@after\n') + 6);
					// 	// 前置操作
					// 	// var beforeArr = beforeStr.includes('UI("') ? beforeStr.slice(beforeStr.indexOf('UI("')).split(';') : [];
					// 	var beforeArr = beforeStr.split(';\n');
					// 	console.log('beforeArr-->'+beforeArr.length)
					// 	this.parseScript(beforeArr, this.beforeOperationRows, 1)

					// 	var afterArr = afterStr.split(';\n');
					// 	console.log('afterArr-->'+afterArr.length)
					// 	this.parseScript(afterArr, this.afterOperationRows, 2);

					// 	let str = valueStr.split('{expr=')[1]
					// 	var value = str.slice(0, str.indexOf('}'));
					// 	$('#input4').val(value);
					// } else if( cellData != '' && cellData != 'nil'){
					// 	editDataVue.dataType = 1;
					// 	$('#input1').val(cellData);
					// } else if( cellData == 'nil') {
					// 	editDataVue.dataType = 2;
					// } else {
					// 	editDataVue.dataType = 3;
					// }
				},
				parseScript: function(strArray, operationRows, type) {
					var length = type === 1 ? strArray.length - 1 : strArray.length;
					if(strArray.length) {
						for (let i = 0; i < length; i++) {
							if(!strArray[i].length) return;
							// @before\nUI('aa').WebElement('bb').click('a','b','c');UI('a2').WebElement('b2').click('a','b','c');\n@value\n{expr= }\n@after\nUI('aa').WebElement('bb').click('a','b','c');UI('a2').WebElement('b2').click('a','b','c');
							if (strArray[i].includes('UI(')) {
								var script = strArray[i].split(').');
								var operation = {};
								var arr = script[1].split('(');
								// UI('aa'  --> aa
								operation.ui = script[0].slice(script[0].indexOf('UI(') + 4, -1);
								// WebElement('bb' --> WebElement  &  bb
								operation.classType = arr[0];
								operation.element = arr[1].slice(1, -1);
								// click('a','b','c') --> click
								var functions = [];
								functions.push({name: script[2].slice(0, script[2].indexOf('(')), parameterlist: ''});
								// click('a','b','c') --> 'a','b','c' --> ['a', 'b', 'c'] --> parameters: [{ Name: 'para1', Value: 'a' }]
								var paraArr = script[2].slice(script[2].indexOf('(')+1, -1).split(',');
								var parameters = [];
								for (let j = 0; j < paraArr.length; j++) {
									var o = {}
									o.Name = 'para' + (j + 1)
									o.Value = paraArr[j].slice(1, -1)
									parameters.push(o)
								}
							} else {
								var operation = {};
								operation.ui = '';
								operation.classType = '';
								operation.element = '';
								var index = strArray[i].indexOf('(');
								var functions = [{name: strArray[i].slice(0, index), parameterlist: ''}];
								var paraStr = strArray[i].slice(index + 1, -1);
								var parameters = [];
								var paraArr = paraStr.split(',');
								for (let j = 0; j < paraArr.length; j++) {
									var o = {}
									o.Name = 'para' + (j + 1)
									o.Value = paraArr[j].slice(1, -1)
									parameters.push(o)
								}
							}

							operationRows.push({
								id: Symbol(),
								operation,
								functions,
								parameters
							})
						}
					}
				},
				insert: function (type, title) {
					insertDivVue.show(type, title);
				},
				saveEditData: function () {
					var inputValue = ['', '', ''];
					var inputStr = document.getElementById("input" + this.dataType).value;
					var beforeStr = this.saveOperation(null, 1);
					var afterStr = this.saveOperation(null, 2);
					if (beforeStr.length) {
						inputValue[0] =  `@before\n${beforeStr}\n`;
						inputValue[1] = `@value\n`;
					}
					if (afterStr.length) {
						inputValue[2] = `@after\n${afterStr}`;
						inputValue[1] = `@value\n`;
					}
					if(this.dataType == 1) {
						inputValue[1] += `${inputStr}\n`;
					} else if (this.dataType == 2) {
						inputValue[1] += `nil\n`;
					} else if (this.dataType == 3) {
						inputValue[1] += `\n`;
					} else {
						inputValue[1] += `{expr=${inputStr}}\n`;
					}
					inputValue = inputValue.join('');
					handsontable.setDataAtCell(this.selection.start.row, this.selection.start.col, inputValue);
					handsontable.render();
				},
				addRow: function (type) {
					let s = { id: Symbol(), operation: { element: '', ui: '', classType: '' }, functions: [], parameters: [] }
					type === 1 ?
						(this.beforeOperationRows.push(s)) :
						(this.afterOperationRows.push(s))
				},
				insertRow: function (index, type) {
					let s = { id: Symbol(), operation: { element: '', ui: '', classType: '' }, functions: [], parameters: [] }
					type === 1 ?
						(this.beforeOperationRows.splice(+index + 1, 0, s)) :
						(this.afterOperationRows.splice(+index + 1, 0, s))
				},
				deleteRow: function (index, type) {
					var operationRows = (type === 1 ? this.beforeOperationRows : this.afterOperationRows)
					var pro = Vac.confirm('', '', '', '确认要删除吗？');
					pro.then(() => {
						operationRows.splice(index, 1)
					}, () => {});
				},
				// 显示UI和元素 、函数集
				showUiAndElement: function (event, type) {
					var _this = this;
					this.uiOrFunctions.target = event.target;
					this.uiOrFunctions.changed = false;
					this.uiOrFunctions.table = type;
					// 请求Ui和Elment
					this.getUIAndFunctions(1)

					$('#ui-ele-modal').modal('show')
				},
				showUiAndElement2: function (event, type) {
					this.uiOrFunctions.table = type;
					this.getUIAndFunctions(2)
					$('#ui-ele-modal2').modal('show')
				},
				getUIAndFunctions: function (type) {
					var str = +type === 1 ? '' : 2
					var setting = +type === 1 ? this.zTreeSettings : this.zTreeSettings2
					Vac.ajax({
						url: address3 + 'elementRepository/queryAllElementsForATransact',
						data: { transactId: transid },
						success: (data) => {
							if ('0000' === data.respCode) {
								let treeDate = data.uis.map((ui) => {
									let parent = {
										isParent: true,
										name: ui.uiName,
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
								var ztreeUI = $.fn.zTree.init($('#ui-element-ul'+str), setting.uiAndElement, treeDate);
								ztreeUI.expandAll(true);
							}
						}
					})
					// 请求函数集
					// var autId = $("#autSelect").val();
					Vac.ajax({
						url: address3 + 'aut/selectFunctionSet',
						data: { 'id': autId },
						success: (data) => {
							if (data.respCode === '0000') {
								var ztreeFunc = $.fn.zTree.init($('#functions-ul' + str), setting.functions, data.omMethodRespDTOList);
								ztreeFunc.expandAll(true);
							} else {
								// Vac.alert('');
							}
						}
					})
				},
				// 确定ztree的点击事件
				zTreeOnClick: function (event, treeId, treeNode) {
					if (treeNode.isParent) {
						return					// 如果点击了父节点，则返回
					}
					// 判断树结构是ui还是函数集
					if (treeId === 'ui-element-ul') {
						var parent = treeNode.getParentNode()
						if (!parent) {
							return			// 没有父元素，则返回
						}
						this.uiOrFunctions.type = 'ui'
						this.uiOrFunctions.element = treeNode.name
						this.uiOrFunctions.ui = parent.name;
						this.uiOrFunctions.classType = treeNode.classType
					} else {
						this.uiOrFunctions.type = 'function'
						// 获取节点的全部内容
						this.uiOrFunctions.function = { name: treeNode.name, parameterlist: treeNode.arguments }
					}
					this.uiOrFunctions.changed = true;			// 已经在模态框中点击了树节点
				},
				// 编辑参数方法，出现模态框，进行函数的编辑
				editParameter: function (event, type) {
					// var _this = this
					// // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
					// var parentRow = $(event.target).parents('tr')
					// var index = parentRow.attr('data-index');
					// var operationRows = type === 1 ? _this.beforeOperationRows : _this.afterOperationRows;
					var _this = this
					// 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
					var target = event.target
					target.style.visibility = 'hidden'
					var parent = $(target).parent()[0]
					$('.param-table', parent).css({ 'display': 'table' })
					$('.param-show', parent).css({ 'display': 'none' })
					var paramV = $('.param-value', parent)[0]
					if (!paramV) { return }
					paramV.focus()
					var range = document.createRange()
					var sel = window.getSelection()
					range.setStart(paramV.childNodes[0], paramV.innerHTML.length)
					range.collapse(true)
					sel.removeAllRanges()
					sel.addRange(range)
				},
				cancelEditParam: function (event, type) {
					var operationRows = type === 1 ? this.beforeOperationRows : this.afterOperationRows
					var table = $(event.target).parents('.param-table')
					// var index = table.parents('tr').attr('data-index')
					$('.edit-param', table.parents('tr')).css({ 'visibility': 'visible' })
					$('.param-show', table.parents('tr')).css({ 'display': 'block' })
					table.css({ display: 'none' })
					// this.updateRow(operationRows, index)
				},
				saveParam: function (event, type) {
					// var tbody = $(event.target).parent().parent().parent()
					var operationRows = type === 1 ? this.beforeOperationRows : this.afterOperationRows
					var target = $(event.target)
					var tbody = target.parents('.param-table')
					var trs = [...$('.param-row', tbody)]
					var parentRow = target.parents('table').parents('tr')
					var valueShows = $('.param-value-show', parentRow)
					operationRows[parentRow.attr('data-index')].parameters.length = 0
					trs.forEach((row, index) => {
						// parameters:[{Name:'', Value: ''}]
						// console.log(row.querySelector('.param-value').innerHTML)
						var data = {}
						data.Name = row.querySelector('.param-name').innerHTML
						data.Value = row.querySelector('.param-value').innerHTML
						valueShows[index].innerHTML = data.Value
						operationRows[parentRow.attr('data-index')].parameters.push(data)
					})
					this.cancelEditParam(event, type)
				},
				// remove the row who is checked when 
				removeRow: function (event, type) {
					var parent = $(event.target).closest('.operation-wrapper')
					var trs = parent.find("tbody input[type='checkbox']:checked").closest('tr');
					if (!trs.length) return;
					Vac.confirm('', '', '', '确认要删除选中项吗？').then(() => {
						var arr = [];
						for (var tr of trs) {
							arr.push(+tr.getAttribute('data-index'));
						}
						if (type === 1) {
							this.beforeOperationRows = this.beforeOperationRows.filter((item, index) => {
								return !arr.includes(index);
							});
						} else {
							this.afterOperationRows =  this.afterOperationRows.filter((item, index) => {
								return !arr.includes(index);
							});
						}
						
					})
				},
				moveUp: function (event, type) {
					var _this = this;
					var operationRows = (type === 1 ? this.beforeOperationRows : this.afterOperationRows)
					var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr')
					$.each(trs, (index, row) => {
						var originIndex = row.getAttribute('data-index')
						originIndex >= 1 &&
							operationRows.splice(originIndex - 1, 0, operationRows.splice(originIndex, 1)[0])
					})
				},
				moveDown: function (event, type) {
					var _this = this;
					var operationRows = (type === 1 ? this.beforeOperationRows : this.afterOperationRows)
					var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr')
					for (var i = trs.length - 1; i >= 0; i--) {
						var originIndex = trs[i].getAttribute('data-index')
						operationRows.splice(+originIndex + 1, 0, operationRows.splice(+originIndex, 1)[0])
					}
				},
				// 更改方法时改变参数
				changeFunction: function(target, index, type) {
					var operationRows = (type === 1 ? this.beforeOperationRows : this.afterOperationRows);
					var me = this;
					var selectedIndex = target.selectedIndex;
					var option = target.options[selectedIndex];
					var selectedFunction = option.value;
					var parameters = option.getAttribute('data-parameters');
					parameters = JSON.parse(parameters);
					var newRow = this.operationRows[index];
					newRow.selectedFunc = selectedFunction;
					newRow.parameters = [];
					for(let param of parameters) {
						newRow.parameters.push({Name: param.name, Value: '' })
					}
				},
				saveOperation: function (event, type) {
					var str = type === 1 ? 'before' : 'after'
					var str2 = type === 1 ? '' : '2'
					var sendDataArray = [];
					var trs = Array.from(document.querySelectorAll('#sortable' + str2 + ' tr.' + str + '-operation-row'))
					for (var tr of trs) {
						// 
						var UI = tr.querySelector('.operation-ui').innerHTML.replace(/^\"+|\"+$/g, "\"");
						var element = tr.querySelector('.operation-element').innerHTML.replace(/^\"+|\"+$/g, "\"");
						var classType = tr.querySelector('.operation-element').getAttribute('data-classtype')
						var method = tr.querySelector('.functions-select').value
						if (!UI && !method) {
							continue
						}
						// 获取参数列表
						var paramTrs = Array.from(tr.querySelectorAll('.parameters .param-value'))
						var paramValues = []
						for (var paramTr of paramTrs) {
								if(paramTr.innerHTML.startsWith('Data.TableColumn')) {
										paramValues.push(`${paramTr.innerHTML}`); 
								} else {
										paramValues.push(`"${paramTr.innerHTML}"`);
								}
						}
						if(paramValues.length === 0) {
								paramValues = ["\"\""];
						}
						var parameterString = paramValues.toString();
						var string = '';
						if(UI == '' && classType == '' && element == '') {
							string = `${method}(${paramValues})`
						} else {
							string = `UI("${UI}").${classType}("${element}").${method}(${paramValues})`;
						}
						sendDataArray.push(string)
					}
					var sendData = sendDataArray.join(';\n')
					sendData = sendData.length === 0 ? '': sendData + ';';
					return sendData;
				},
				updateRow: function (rows, index) {
					// 使用splice方法，通过改变数组项的id更新绑定的数组，
					var cache = rows[index]
					cache.id = Symbol()
					rows.splice(index, 1, cache)
				}
			},
		});
		var detailModal = new Vue({//操作项前编辑符号，修改当前元素
			el: '#detailModal',
			data: {},
			methods: {
				update(){
					$.ajax({
						url: address3+ 'testcase/modifySingleTestCaseInfo',
						type: 'post',
						contentType: 'application/json',
						data: JSON.stringify({
								id: $('#detailForm input[name="id"]').val(),
								testpoint:$('#detailForm input[name="testpoint"]').val(),
								testdesign:$('#detailForm textarea[name="testDesign"]').val(),
								teststep:$('#detailForm textarea[name="testStep"]').val(),
								expectresult:$('#detailForm textarea[name="expectResult"]').val(),
								checkpoint:$('#detailForm textarea[name="checkPoint"]').val()
						}),
						success: function(data){
							if(data.respCode=="0000"){
								$('#successModal').modal();
							}
							else{
								$('#failModal2').modal();
							}
						},
						error: function(){
							$('#failModal').modal();
						}
					})
				},
			}
		})
		var modalVue = new Vue({//操作项前编辑符号，修改当前元素
			el: '#ui-ele-modal',
			data: {},
			methods: {
				// 在模态框中点击了保存按钮
				editRow: function () {
					var _this = this;
					if (!editDataVue.uiOrFunctions.changed) {
						return;		// 没有点击树结构，则返回
					}
					// 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
					var parentRow = $(editDataVue.uiOrFunctions.target).parents('tr')
					var index = parentRow.attr('data-index');
					var operationRows = editDataVue.uiOrFunctions.table === 1 ? editDataVue.beforeOperationRows : editDataVue.afterOperationRows;

					if (editDataVue.uiOrFunctions.type === 'ui') {
						// 点击了ui 与 元素后, 更新operation
						operationRows[index].operation = {
							ui: editDataVue.uiOrFunctions.ui,
							element: editDataVue.uiOrFunctions.element,
							classType: editDataVue.uiOrFunctions.classType
						};

						// 使用splice方法，通过改变数组项的id更新绑定的数组，
						_this.updateRow(operationRows, index);

						// 发送ajax请求函数的数据
						var data = {
							id: autId,		// autid
							classname: editDataVue.uiOrFunctions.classType,		// classname
						}

						var getFunctions = new Promise((resolve, reject) => {
							Vac.ajax({
								url: address3 + 'aut/selectMethod',
								data: data,
								success: function (data) {
									if (data.respCode === '0000' && data.omMethodRespDTOList) {
										var { functions, parameterlist } = modalVue.setFunctionAndParameter(data.omMethodRespDTOList);
										operationRows[index].parameters = parameterlist;
										operationRows[index].functions = functions;
										operationRows[index].selectedFunc = functions.length ? functions[0].name : '';
										_this.updateRow(operationRows, index);
										resolve();
									} else {
										reject(data.respMsg);
										Vac.alert(data.respMsg);
									}
								}
							})
						});
					} else {
						operationRows[index].functions = [editDataVue.uiOrFunctions.function]
						operationRows[index].operation = { ui: '', element: '', classType: '' };
						var parametersArray = JSON.parse(operationRows[index].functions[0].parameterlist)
						operationRows[index].parameters = []
						for (let param of parametersArray) {
							operationRows[index].parameters.push({
								Name: param.name,
								Value: ''
							})
						}
					}
					$('#ui-ele-modal').modal('hide')
				},
				updateRow: function (rows, index) {
					// 使用splice方法，通过改变数组项的id更新绑定的数组，
					var cache = rows[index]
					cache.id = Symbol()
					rows.splice(index, 1, cache)
				},
				setFunctionAndParameter: function (data) {
					// set functino for ui and element 
					var _this = this;
					var functions = [];
					var  parameterlist = [];
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
					}
				}
			}
		})
		var modalVue2 = new Vue({//添加多项，跳出的模态框
			el: '#ui-ele-modal2',
			data: {},
			methods: {
				// 在模态框中点击了保存按钮
				editRowMultiple: function () {

					var uiTree = $.fn.zTree.getZTreeObj("ui-element-ul2");
					var functionTree = $.fn.zTree.getZTreeObj("functions-ul2");
					var uiNodes = uiTree.getCheckedNodes(true);
					var operationRows = editDataVue.uiOrFunctions.table === 1 ? editDataVue.beforeOperationRows : editDataVue.afterOperationRows;
					var functionNodes = functionTree && functionTree.getCheckedNodes(true)
					for (var node of uiNodes) {
						if (node.isParent) {
							continue;
						}
						let newRow = {}; // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[{Name: '', Value: ''}]}}
						newRow.id = Symbol()
						newRow.operation = {
							element: node.getParentNode().name,
							ui: node.name,
							classType: node.classType
						}
						newRow.functions = []
						Vac.ajax({
							url: address3 + 'aut/selectMethod',
							data: { id: autId, classname: newRow.operation.classType },
							success: function (data, statusText) {
								if (data.respCode === '0000' && data.omMethodRespDTOList) {
									var { functions, parameterlist } = modalVue.setFunctionAndParameter(data.omMethodRespDTOList);
									console.log(functions)
									newRow.functions = functions;
									newRow.selectedFunc = functions.length ? functions[0].name : '';
									newRow.parameters = parameterlist;
									console.log()
									operationRows.push(newRow);
								} else {
									Vac.alert(data.respMsg);
								}
							}
						})
					}
					if (functionNodes) {
						for (var node of functionNodes) {
							console.log(node)
							let newRow = {}
							newRow.id = Symbol()
							newRow.operation = {
								element: '',
								ui: '',
								classType: ''
							}
							newRow.functions = []
							newRow.functions.push({  name: node.name, parameterlist: node.arguments })

							newRow.parameters = []
							try {
								var parameters = JSON.parse(node.arguments)
								for (let param of parameters) {
									newRow.parameters.push({ ...param, Name: param.name, Value: '' })
								}
							} catch (e) {
								newRow.parameters = []
							}
							operationRows.push(newRow)
						}
					}
					$('#ui-ele-modal2').modal('hide')
				},
				updateRow: function (rows, index) {
				}
			}
		})
		var insertDivVue = new Vue({//编辑数据项 表达式 插入数据 模态框
			el: '#insertDiv',
			data: {
				isShow: false,
				type: null,
				insertTitle: null,
				trData: ['参数1', '参数2', '参数3', '参数4'],
				dataPoolType: null,
				dataWritable: "",
				functionName: "",
				paramList: [],
				functionList:[]
			},
			watch:{
				functionName: function(value,oldvalue){		//监听functionName的变化，select框一变化就改变参数列表
					var _this = this;
					// console.log("我在监听这个functionName"+value+oldvalue);
					_this.functionList.forEach(function(currFun){
						if(currFun.name===value){
							_this.paramList = currFun.paramList;	//遍历函数列表，找到函数名称相同的，将参数列表赋值
						}
					});
					if(_this.paramList.length===0){
						var nothing = {};
						nothing.paramName = "无";
						nothing.paramType = "";
						nothing.required = false;
						_this.paramList.push(nothing);
					}
					// console.log(_this.paramList);
				}			
			},
			ready: function(){
				//在这里请求函数名称、参数等...
				var _this = this;
				_this.insertFunction();
			},
			created: function () {	
				
			},
			methods: {
				show: function (type, title) {
					this.isShow = true;
					this.insertTitle = title;
					this.type = type;
					
				},
				hide: function () {
					this.isShow = false;
					// this.trData = [];
				},
				saveData: function () {
					var finalString = '';
					if (this.type === 1) {
						var dataName = document.getElementById("dataName").value;
						switch (this.dataPoolType) {
							case 1: finalString = "var(\"" + dataName + "\")"; break;
							case 2: finalString = "Data.Flow(\"" + dataName + "\")"; break;
							case 3: finalString = "Data.Com(\"" + dataName + "\")"; break;
							case 4: finalString = this.dataWritable === "readable" ? "Data.Scene(\"" + dataName + "\")": "Data.SceneShare(\"" + dataName + "\")"; break;
							case 5: finalString = this.dataWritable === "readable" ? "Data.Scene(\"" + dataName + "\")": "Data.SceneShare(\"" + dataName + "\")"; break;
							case 6: finalString = "Data.Env(\"" + dataName + "\")"; break;
						}
					} else {
						var paramValuesTd = document.getElementsByClassName("td-param-value");
						var paramValues = [];
						finalString = this.functionName + "(";
						for (var td of paramValuesTd) {
							finalString += td.innerHTML.trim() + ",";
						}
						finalString = finalString.substring(0, finalString.length - 1) + ")";
					}
					var input = document.getElementById("input4");
					var pos = this.getCursortPosition(input);
					var s = input.value;
					input.value = s.substring(0, pos) + finalString + s.substring(pos);
				},
				getCursortPosition: function (ctrl) {
					var CaretPos = 0;	// IE Support
					if (document.selection) {
						ctrl.focus();
						var Sel = document.selection.createRange();
						Sel.moveStart('character', -ctrl.value.length);
						CaretPos = Sel.text.length;
					}
					// Firefox support
					else if (ctrl.selectionStart || ctrl.selectionStart == '0')
						CaretPos = ctrl.selectionStart;
					return (CaretPos);
				},
				insertFunction: function(){
					var _this = this;
					var autId = sessionStorage.getItem("autId");

					$.ajax({
						url: address3 + '/dataCenter/getUtilFuncList',
						type: 'post',
						contentType: 'application/json',
						data: JSON.stringify({
							autId: autId,
						}),
						success: function(data){
							console.log(data);
							data.functionList.forEach(function(funList){
								var currFun = {};
								currFun.name = funList.name;
								currFun.desc = funList.desc;
								currFun.paramList = funList.paramList;
								_this.functionList.push(currFun);
							});		
						}
						
					});
					// console.log(_this.functionList[0]);
					// _this.functionName = _this.functionList[0].name;
					console.log("我！可以！出来！");
				},
			}
		});
		var importModal = new Vue({ //模板导入
			el: '#importModal',
			data: {
				failMSG:"",
			},
			created: function () {
				$(".myFileUpload").change(function() {
					var arrs = $(this).val().split('\\');
					var filename = arrs[arrs.length - 1];
					$(".show").val(filename);
				});
			},
			methods: {
				//上传
				upload:function() {
					var _this=this;
					$.ajax({
						url: address3+'dataCenter/importDataFromFile',
						type: 'POST',
						cache: false,
						data: new FormData($('#importForm')[0]),
						processData: false,
						contentType: false, 
						success: function(data) {
							$('#importModal').modal('hide');
							if (data.respCode=='0000') {
								$('#successModal').modal('show');
								Vac.ajax({
									url: address3 + "dataCenter/queryTestcaseInfo",
									data: infoOfTreeOnOpen,
									success: function (data) {
										if ('0000' === data.respCode) {
											var dataKey = [];
											dataKey = getDataKey(data.tableHead);
											console.log("getColumnsOptions中dataKey:" + dataKey);
											var destrutData = [];
											if (data.tableData) {
												if (data.tableData.length == 0) {
													Vac.alert('该脚本下未查询到相关数据！')
													$('#no-data-tip').css({display: 'block'});
												}
												data.tableData.forEach((value) => {
													var data = {};
													({
														id: data.testcaseId,
														expectResult: data.expectresult,
														caseCompositeType: data.caseCompositeType,
														testPoint: data.testpoint,
														testStep: data.teststep,
														checkPoint: data.checkpoint,
														testDesign: data.testdesign,
														caseCode: data.casecode
													} = value);
													// console.log(value);
													dataKey.forEach((key) => {
														// console.log("12Key:" + key+"data_"+key+"qweqwe"+value["data_"+key]);
														data[key] = value["data_"+key];
													});
													destrutData.push(data);
												});
											}
											console.log("destrutData:\n"+destrutData);
											dataSource = destrutData;
											// console.log(dataSource)
											rowSelectFlags.length = dataSource.length;
											getTotalColHeaders(data.tableHead);
											// console.log(totalColumnsHeaders);
											var totalColumnsOptions = getColumnsOptions(data.tableHead);
											// handsontable 配置与生成
											if (handsontable === null) {
												handsontable = new Handsontable(tableContainer, {
													data: dataSource,
													hiddenColumns: {
														columns: [2, 3],
														indicators: true
													},
													// 配置列表头
													columns: totalColumnsOptions,
													colHeaders: colHeadersRenderer,
													// colWidths: [50, 90, 90, 90, 90, 90, 90],
													// stretchH: 'all',
													rowHeaders: true,
													cells: function (row, col, prop) {
														var cellProperties = {};
														return cellProperties;
													},
													// 配置可以改变行的大小
													manualRowResize: true,
													multiSelect: true,
													outsideClickDeselects: true,
													// 配置contextMenu
													contextMenu: contextMenuObj,
													undo: true,
													copyPaste: true,
													allowInsertRow: false,
													allowInsertColumn: false,
													fillHandle: false,
													search: {
														searchResultClass: ''
													},
													afterRender: function () {
														if (searchResults && searchResults.length) {
															var trs = document.querySelectorAll('#handsontable tbody tr');
															searchResults.forEach((value, index) => {
																var tds = trs[value.row].getElementsByTagName('td');
																if (index === currentResult) {
																	tds[value.col].style.backgroundColor = "#f00";
																} else {
																	tds[value.col].style.backgroundColor = "#0f0";
																}
				
															})
														}
														document.querySelectorAll(".handsontable table th")[0].style.display = "none";
													},
													afterChange: function (changes, source) {
														if (changes) {
															// console.log(changes)
															changes.forEach((value) => {
																var data = {};
																// data.testcaseId = handsontable.getDataAtRowProp(value[0], 'casecode');
																data.testcaseId = dataSource[value[0]].testcaseId.split(',')[0];
																data.caseCompositeType = dataSource[value[0]].caseCompositeType;
																data.tbHead = value[1];
																data.value = value[3];
																var changedIndex;
																changedData.forEach((value, index) => {
																	if (value.testcaseId == data.testcaseId && value.tbHead == data.tbHead) {
																		changedIndex = index;
																	}
																});
																if (changedIndex !== undefined) {
																	changedData.splice(changedIndex, 1, data);
																} else {
																	changedData.push(data);
																}
															});
														}
													},
												});
												$('#no-data-tip').css({display: 'none'});
											}
											else {
												handsontable.updateSettings({
													data: dataSource,
													columns: totalColumnsOptions,
													colHeaders: colHeadersRenderer
												});
												handsontable.render();
												$('#no-data-tip').css({display: 'none'});
											}
										} else {
											Vac.alert(data.respMsg);
										}
									},
									error: function () {
										Vac.alert('获取数据失败，请确认该脚本中含有数据！')
										$('#no-data-tip').css({display: 'block'});
									}
								});

							} else {
								importModal.failMSG=data.respMsg;
								$('#failModal2').modal('show');
							}
						}, error: function(data) { 
							$('#importModal').modal('hide');
							$('#failModal').modal('show');
						}
					}) ;  
				},
			}
		});
		var searchtModal = new Vue({ //模板导入
			el: '#searchtModal',
			data: {
				failMSG:"",
				searchlogic:"all",
				searchtext:"",
			},
			methods: {
				//上传
				dataSearch:function() {
					var _this=this;
					var patt1=new RegExp(_this.searchtext);
					var searchDataSource=[];
					switch(_this.searchlogic)
					{
					case "==":
						for(let i =0;i<dataSource.length;i++){
							if(dataSource[i].testpoint == _this.searchtext){
								searchDataSource.push(dataSource[i])
							}
						}
						break;
					case "!=":
						for(let i =0;i<dataSource.length;i++){
							if(dataSource[i].testpoint != _this.searchtext){
								searchDataSource.push(dataSource[i])
							}
						}
						break;
					case "C":
						for(let i =0;i<dataSource.length;i++){
							if(patt1.test(dataSource[i].testpoint)){
								searchDataSource.push(dataSource[i])
							}
						}
						break;
					case "!C":
						for(let i =0;i<dataSource.length;i++){
							if(!patt1.test(dataSource[i].testpoint)){
								searchDataSource.push(dataSource[i])
							}
						}
						break;
					default:searchDataSource = dataSource;
					}
					handsontable.updateSettings({
						data: searchDataSource,
					});
					handsontable.render(); 
				}
			}
		});
		// var APIFieldModal = new Vue({
		// 	el: 'APIFieldModal',
		// 	data: {
		// 		APIFieldModalVerificationData:[{
		// 			"expectValue": "2",
		// 			"compareChar": "==",
		// 			"pathExpression": "\\$..totalCount"
		// 		},
		// 		{
		// 			"expectValue": "3",
		// 			"compareChar": "!=",
		// 			"pathExpression": "\\$..totalCount"
		// 		}
		// 		],

		// 	},
		// 	created: function () {
	
		// 	},
		// 	ready: function () {

		// 	},
		// 	method: {
		// 		APIFieldModalInit:function(){
		// 			$('input[name="APIFieldVerificationParaExp"]').last().change(APIFieldVerificationParaAdd);
		// 			$('input[name="APIFieldExtractionParaExp"]').last().change(APIFieldExtractionParaAdd);
		// 			$(".APIFieldExtractionParaRow").hide();
		// 			$('#APIFieldModal').modal('show');
		// 			APIFieldModalLoadVerificationData();
		// 			APIFieldModalLoadExtractionData();
		// 		},
		// 		APIFieldModalLoadVerificationData:function(){
		// 			$.ajax({
		// 				url: address3 + 'scripttemplateController/getInterfaceCheckValues',
		// 				data: JSON.stringify({
		// 					"testCaseId":sessionStorage.getItem('testCaseId'),
		// 					"caseCompositeType":sessionStorage.getItem('caseCompositeType')
		// 				}),
		// 				type: 'post',
		// 				contentType:"application/json",
		// 				success: function (data) {
		// 				  if (!data) {
		// 					Vac.alert(data.msg || '查询失败');
		// 					return;
		// 				  }	
		// 					// _this.tableData = data.scriptList;
		// 					  console.log("Verification Data:");
		// 					console.log(data);
		// 				},
		// 				error: function(XMLHttpRequest, textStatus, errorThrown) {
		// 				  Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
		// 				}
		// 			});
		// 		},
				
		// 		APIFieldModalLoadExtractionData:function(){
		// 			$.ajax({
		// 				url: address3 + 'scripttemplateController/getInterfaceExtractValues',
		// 				data: JSON.stringify({
		// 					"testCaseId":sessionStorage.getItem('testCaseId'),
		// 					"caseCompositeType":sessionStorage.getItem('caseCompositeType')
		// 				}),
		// 				type: 'post',
		// 				contentType:"application/json",
		// 				success: function (data) {
		// 				  if (!data) {
		// 					Vac.alert(data.msg || '查询失败');
		// 					return;
		// 				  }	
		// 					// _this.tableData = data.scriptList;
		// 					  console.log("Extraction Data:");
		// 					console.log(data);
		// 				},
		// 				error: function(XMLHttpRequest, textStatus, errorThrown) {
		// 				  Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
		// 				}
		// 			});
		// 		},
				
		// 		APIFieldVerificationParaAdd:function() {
		// 			$('input[name="APIFieldVerificationParaExp"]').last().unbind('change',APIFieldVerificationParaAdd);    
					
		// 			var deleteButtonTr = `
		// 							<div class="col-lg-0">
		// 								<button class="btn" type="button" onclick="APIFieldParaRowDelete(event)" style="color:red;background:transparent">
		// 									<i class="icon-remove"></i>
		// 								</button>
		// 							</div>`;
		// 			$('.APIFieldVerificationParaRow').last().append(deleteButtonTr);
				
		// 			var APIFieldVerificationParaTr = `
		// 							<div class="form-group APIFieldVerificationParaRow">
		// 								<div class="col-lg-5">
		// 									<input class="form-control" type="text" name="APIFieldVerificationParaExp" placeholder="表达式">
		// 								</div>
		// 								<div class="col-lg-3">
		// 									<select class="form-control" name="APIFieldVerificationParaSel">
		// 										<option value="==">等于</option>
		// 										<option value="!=">不等于</option>
		// 										<option value="C">包含</option>
		// 										<option value="!C">不包含</option>
		// 									</select>
		// 								</div>
		// 								<div class="col-lg-3">
		// 									<input class="form-control" type="text" name="APIFieldVerificationParaVal" placeholder="预期值">
		// 								</div>
		// 							</div>`;
		// 			$('#APIFieldParaListBody').append(APIFieldVerificationParaTr);
				
		// 			$('input[name="APIFieldVerificationParaExp"]').last().change(APIFieldVerificationParaAdd);    
		// 		},
				
		// 		APIFieldExtractionParaAdd:function() {
		// 			$('input[name="APIFieldExtractionParaExp"]').last().unbind('change',APIFieldExtractionParaAdd);    
					
		// 			var deleteButtonTr = `
		// 							<div class="col-lg-0">
		// 								<button class="btn" type="button" onclick="APIFieldParaRowDelete(event)" style="color:red;background:transparent">
		// 									<i class="icon-remove"></i>
		// 								</button>
		// 							</div>`;
		// 			$('.APIFieldExtractionParaRow').last().append(deleteButtonTr);
				
		// 			var APIFieldExtractionParaTr = `
		// 						<div class="form-group APIFieldExtractionParaRow" >
		// 							<div class="col-lg-6">
		// 								<input class="form-control" type="text" name="APIFieldExtractionParaExp" placeholder="表达式">
		// 							</div>
		// 							<div class="col-lg-5">
		// 								<input class="form-control" type="text" name="APIFieldExtractionParaName" placeholder="字段保存名称">
		// 							</div>
		// 						</div>`;
		// 			$('#APIFieldParaListBody').append(APIFieldExtractionParaTr);
				
		// 			$('input[name="APIFieldExtractionParaExp"]').last().change(APIFieldExtractionParaAdd);    
		// 		},
				
		// 		APIFieldParaRowDelete:function(e) {
		// 			var tmp = $(e.target).parent().parent().find('button').parent().parent();
		// 			tmp.remove();
		// 		},
				
		// 		APIUpload:function() {
				
		// 			if($("input[name=inlineRadioOptions]")[0].checked){
		// 				console.log("验证");
		// 				var APIFieldVerificationData=[];
		// 				$('#APIFieldParaListBody').find('.APIFieldVerificationParaRow').each(function() {
		// 					var APIFieldVerificationParaExp=$(this).find("input[name=APIFieldVerificationParaExp]").val(),
		// 						APIFieldVerificationParaSel=$(this).find("select").val(),
		// 						APIFieldVerificationParaVal=$(this).find("input[name=APIFieldVerificationParaVal]").val();
		// 					if(APIFieldVerificationParaExp!=""){
		// 						let singleData={};
		// 						singleData.val=APIFieldVerificationParaExp;
		// 						singleData.sel=APIFieldVerificationParaSel;
		// 						singleData.desc=APIFieldVerificationParaVal;
		// 						APIFieldVerificationData.push(singleData);
		// 					}
		// 				});
		// 				console.log(APIFieldVerificationData);
		// 			}
		// 			else if($("input[name=inlineRadioOptions]")[1].checked){
		// 				console.log("提取");
		// 				var APIFieldExtractionData=[];
		// 				$('#APIFieldParaListBody').find('.APIFieldExtractionParaRow').each(function() {
		// 					var APIFieldExtractionParaExp=$(this).find("input[name=APIFieldExtractionParaExp]").val(),
		// 						APIFieldExtractionParaName=$(this).find("input[name=APIFieldExtractionParaName]").val();
		// 					if(APIFieldExtractionParaExp!=""){
		// 						let singleData={};
		// 						singleData.val=APIFieldExtractionParaExp;
		// 						singleData.desc=APIFieldExtractionParaName;
		// 						APIFieldExtractionData.push(singleData);
		// 					}
		// 				});
		// 				console.log(APIFieldExtractionData);
		// 			}
		// 		},
				
		// 		APIFieldOptionsClick:function(type) {
				
		// 			if(type==1){
		// 				$(".APIFieldVerificationParaRow").show();
		// 				$(".APIFieldExtractionParaRow").hide();
		// 			}
		// 			else if(type==2){
		// 				$(".APIFieldVerificationParaRow").hide();
		// 				$(".APIFieldExtractionParaRow").show();
		// 			}
				
		// 		}
		// 	}

		// });


		var setting = {
			callback: {
				onDblClick: zTreeOnDblClick
			},
		};
		var zTreeObj;
		var infoOfTreeOnOpen = {
		};
		var sub = new Vue({
			el: '#submenu',
			data: {
				flag: true,
				selectItems: [],
				selectType: '1',
				// checkedItems: [{value: 1,name: '登陆'},{value: 2,name: '注册'}],
				checkedItems: [],
				// 保存点击后的复选框
				checkedArray: [],
				systemInfo: {
					executorId: 63,
					caseLibId: sessionStorage.getItem('caselibId'),
					valueList: '[]',
					propertyName: 'testPoint'
				},
				testpointsMap: new Map(),
				testpointLength: 0,
				projeceName: sessionStorage.getItem("projectNameStorage")
			},
			created: function () {

			},
			ready: function () {
				// var _this = this;
				// var data = [
				// 	{
				// 		"name": "测试点",
				// 		"value": 1
				// 	},
				// 	{
				// 		"name": "执行状态",
				// 		"value": 2
				// 	}
				// ];
				// _this.selectItems = data;
				// _this.getInfo();
				// _this.changeSelect({target: {value: 1 }});
			},
			methods: {
				getInfo: function () {
					var userId = sessionStorage.getItem('userId')
					var caseLib_id = sessionStorage.getItem('caselibId')
					if (caseLib_id == null || caseLib_id == '') {
						Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', '请先选择测试项目！').then(function () {
							window.location.href = 'testProject.html'
						}, function () {
							return;
						})
					}
					this.systemInfo.executor = userId
					this.systemInfo.caseLib_id = caseLib_id
				},
				toggle: function () {
					this.flag = !this.flag;
					document.querySelector('.wtHolder') && (document.querySelector('.wtHolder').style.width = 'auto');
				},
				// 使用了mock
				changeSelect: function (event) {
					var _this = this;
					// console.log('hello');
					if (event.target.value == 1) {
						var data = {
							executorId: _this.systemInfo.executor,
							caseLibId: _this.systemInfo.caseLib_id,
							"property": "testPoint"
						}
						// 假数据，为了能取到数据配置的
						var mockdata = {
							executorId: 1,
							caseLibId: 1,
							"property": "testPoint"
						}
						Vac.ajax({
							url: address3 + "dataCenter/queryDistinctTestcaseInfo",
							data: data,
							type: 'post',
							dataType: "json",
							success: function (data) {
								if ('0000' !== data.respCode) {
									Vac.alert(data.respMsg);
									return;
								}
								_this.checkedItems = []
								if (!data.propertList || data.propertList.length == 0) {
									Vac.alert('未查询到相关测试点！')
									return
								}
								_this.checkedItems = data.propertList
							},
							error: function () {
								Vac.alert('查询测试点失败')
							}
						});
					} else {
						_this.checkedItems = [];
						_this.checkedArray = []
					}
				},
				// 使用了mock
				changeChecked: function (event) {
					var _this = this;
					_this.systemInfo.testpoints = JSON.stringify(_this.checkedArray)
					// 假数据
					var dataMock = {
						executor: 63,
						caseLib_id: 1,
						testpoints: JSON.stringify(["登录"]),
					}
					Vac.ajax({
						url: address3 + "dataCenter/queryFilterTree",
						data: _this.systemInfo,
						success: function (data) {
							if (data.respCode === '0000') {
								var treeData = [];
								if (data.filterTree.length == 0) {
									Vac.alert(data.respMsg);
									return
								}
								data.filterTree.forEach((value) => {
									var item = {};  //解构第一层
									item.open = true;
									item.children = [];
									value.transactList.forEach((value) => {
										var subData = {};  //解构第二层
										subData.children = [];
										subData.open = true;
										({
											transId: subData.id,
											transName: subData.name,
										} = value);
										value.scriptTemplateList.forEach((value => {
											var ssubData = {};
											({
												scriptId: ssubData.id,
												scriptName: ssubData.name
											} = value);
											subData.children.push(ssubData);
										}));
										item.children.push(subData);
									});
									({
										autId: item.id,
										autName: item.name,
									} = value);
									treeData.push(item);
								});
								zTreeObj = $.fn.zTree.init($("#tree-wrapper"), setting, treeData);
							} else {
								Vac.alert(data.msg);
							}
							
						}
					});
				}
			}
		});

		// handsontable init 创建handsontable
		var tableContainer = document.getElementById("handsontable");
		var handsontable = null;
		var dataSource = null;
		var changedData = [];
		var selectAllFlag = false;
		var rowSelectFlags = [];
		var string = "";
		var editableColStartIndex = 3;
		var editableColEndIndex = 5;
		var clipBoard = [];
		var clipBoardSize = {
			cols: 0,
			rows: 0
		};
		var searchResults = null;
		var currentResult = 0;
		// var undoTimes = 0;
		var contextMenuObj = {
			callback: function (key, options) { },
			items: {
				"row_above": {
					name: '复制',
					callback: copyCallback,
					disabled: function () { return false; },
					hidden: function () { return false; }
				},
				"row_below": {
					name: '剪切',
					callback: cutCallback,
					disabled: function () { return false; },
					hidden: function () {
						// [startRow, startCol, endRow, endCol]
						var selection = handsontable.getSelected()[0];
						if (selection && selection[1] >= 7 && selection[0] == selection[2] && selection[1] == selection[3]) {
							return false;
						}
						return true;
					}
				},
				"col_left": {
					name: '粘贴',
					callback: pasteCallback,
					disabled: function () {
						return clipBoard.length === 0 ? true : false;
					},
					hidden: function () {
						// [startRow, startCol, endRow, endCol]
						var selection = handsontable.getSelected()[0];//Returns indexes of the selected cells as an array of arrays [[startRow, startCol, endRow, endCol],...].
						if (selection && selection[1] >= 7 && selection[0] == selection[2] && selection[1] == selection[3]) {
							return false;
						}
						return true;
					}
				},
				"col_right": {
					name: '清除',
					callback: clearCallback,
					disabled: function () { return false; },
					hidden: function () {
						// [startRow, startCol, endRow, endCol]
						var selection = handsontable.getSelected()[0];
						
						if (selection && selection[1] >= 7 && selection[0] == selection[2] && selection[1] == selection[3]) {
							console.log(false)
							return false;
						}
						return true;
					}
				},
				"remove_row": {
					name: '查找与替换',
					callback: searchCallback,
					disabled: function () { return false },
					hidden: function () { return false }
				},
				// "remove_col":{
				// 	name: '替换',
				// 	callback: replaceCallback,
				// 	disabled: function(){return false;},
				// 	hidden: function(){return false;}
				// },				
				"modify": {
					name: '修改',
					callback: modifyCallback,
					disabled: function () { return false },
					hidden: function () {
						// [startRow, startCol, endRow, endCol]
						var selection = handsontable.getSelected()[0];
						if (selection && selection[1] < 7 && selection[0] == selection[2] && selection[1] == selection[3]) {
							return false;
						}
						return true;
					}
				},
				"make_read_only": {
					name: '编辑数据',
					callback: editCellData,
					disabled: function () { },
					hidden: function () {
						// [startRow, startCol, endRow, endCol]
						var selection = handsontable.getSelected()[0];
						if (selection && selection[1] >= 7 && selection[0] == selection[2] && selection[1] == selection[3]) {
							return false;
						}
						return true;
					}
				},
				"data_backup": {
					name: "数据备份",
					callback: null,
					disabled: function () { },
					hidden: function(){
						var selection = handsontable.getSelected()[0];
						console.log("selection:"+selection);
						if(selection && selection[1]==0 && selection[3]>0){    //如果是全选
							return false;
						}
						return true;
					}
				},
				"数据恢复": {
					name: "数据恢复",
					callback: null,
					disabled: function () { },
					hidden: function() {
						var selection = handsontable.getSelected()[0];
						if(selection && selection[1]==0 && selection[3]>0){    //如果是全选
							return false;
						}
						return true;
					}
				}
				
			}
		};
		$("#hiddenItem").change(function(e)
		{
			var nodeNo =$('#hiddenItem').val();; // 获取选中下拉框的值-数组的形式 ["1", "2", "3", "4", "5"]
			if(!nodeNo){nodeNo=[]}
			else{
				for(let i =0;i<nodeNo.length;i++){
					nodeNo[i] = nodeNo[i]-0;
				}
			}
			handsontable.updateSettings({
				hiddenColumns: {
					columns: nodeNo,
					indicators: true
				},
			});
			//var hiddenColumnsPlugin =  handsontable.getPlugin('hiddenColumns');
			//console.log(handsontable.getSettings())
			//hiddenColumnsPlugin.hideColumn([3,4]);
			handsontable.render(); 
			//console.log(handsontable.getSettings())
		});
		/// 2017-08-25 删除行号这一列
		const columnsHeaders = [
			"查看脚本","用例编号", "测试点", "测试意图", "测试步骤", "预期结果", "检查点"
		];
		const columnsOptions = [
			{
				data: "testcaseId",
				renderer: function (instance, td, row, col, prop, value, cellProperties) {
					td.style.textAlign = 'center';
					td.innerHTML = '<button onclick="viewScriptHandler(event,'+ value.split(",",)[1] +')" style="padding: 3px 5px;" class="btn btn-xs btn-primary" data-id="'+ value.split(",",)[0] +'">查看脚本</button>';
					return td;
				},
				readOnly: true
			},
			{ data: "casecode", readOnly: true ,},
			{ data: "testpoint", readOnly: true },
			{ data: "testdesign", readOnly: true },
			{ data: 'teststep', readOnly: true },
			{ data: 'expectresult', readOnly: true },
			{ data: 'checkpoint', readOnly: true },
		];
		var totalColumnsHeaders = [];
		var getColumnsOptions = function (tableHead) {
			//tableHead = [ ["[待删除]","商品"], ["[待删除]","t1"] ]
			var totalColumnsOptions = [];
			var dataKey = getDataKey(tableHead);
			//console.log("getColumnsOptions中dataKey:" + dataKey);
			// dataKey = ["商品","t1"]
			dataKey.forEach((key) => {
				if (key) {
					var option = {
						data: key,
						readOnly: false
					};
					totalColumnsOptions.push(option);
				}
			});
			totalColumnsOptions = columnsOptions.concat(totalColumnsOptions);
			return totalColumnsOptions;
		};
		var getTotalColHeaders = function (data) {
			// console.log("const"+columnsHeaders);
			totalColumnsHeaders = [];
			// console.log("before"+totalColumnsHeaders);
			if (data && data.length) {
				data.forEach((value) => {
					if (value.length > 0) {
						var header = value.join('<br>');
						totalColumnsHeaders.push(header);
						// console.log("every"+ totalColumnsHeaders);
					}
				});
			}
			totalColumnsHeaders = columnsHeaders.concat(totalColumnsHeaders);
		};
		// 得到数据的表头
		var getDataKey = function (data) {
			//data = [ ["[待删除]","商品"], ["[待删除]","t1"] ]
			var dataKey = [];
			if (data) {
				data.forEach((value) => {
					dataKey.push(value[1]);
				});
			}
			return dataKey;
		};
		var scriptId = "";
		//双击显示脚本
		function zTreeOnDblClick(event, treeId, treeNode) {
			if (treeNode && !treeNode.isParent) {
				autId = treeNode.getParentNode().getParentNode().id;
				transid = treeNode.getParentNode().id;
				scriptId = treeNode.id;
				sessionStorage.setItem("autId",autId);	//将autId放到session里面，下面插入函数的时候调用接口需要参数autId
				
				console.log(scriptId);
				var data = {
					conditionList: vac_conditionList,
					executorId: sessionStorage.getItem('userId'),
					caseLibId: sessionStorage.getItem('caselibId'),
					autId: autId,
					transId: transid,
					scriptId: scriptId
				};
				infoOfTreeOnOpen=data;
				$(".export-show").css("display","inline")
				Vac.ajax({
					url: address3 + "dataCenter/queryTestcaseInfo",
					data: data,
					success: function (data) {
						if ('0000' === data.respCode) {
							var dataKey = [];
							dataKey = getDataKey(data.tableHead);
							// console.log("getColumnsOptions中dataKey:" + dataKey);
							var destrutData = [];
							if (data.tableData) {
								if (data.tableData.length == 0) {
									Vac.alert('该脚本下未查询到相关数据！')
									$('#no-data-tip').css({display: 'block'});
								}
								data.tableData.forEach((value) => {
									var data = {};
									({
										id: data.id,
										expectResult: data.expectresult,
										caseCompositeType: data.caseCompositeType,
										testPoint: data.testpoint,
										testStep: data.teststep,
										checkPoint: data.checkpoint,
										testDesign: data.testdesign,
										caseCode: data.casecode
									} = value);
									sessionStorage.setItem('caseCompositeType',data.caseCompositeType);
									sessionStorage.setItem('testCaseId',data.id);
									data.testcaseId=value.id+","+value.caseCompositeType;
									// console.log(value);
									dataKey.forEach((key) => {
										// console.log("12Key:" + key+"data_"+key+"qweqwe"+value["data_"+key]);
										data[key] = value["data_"+key];
									});
									destrutData.push(data);
								});
							}
							// console.log("destrutData:\n"+destrutData);
							dataSource = destrutData;
							// console.log("data:dataSource")
							// console.log(dataSource)
							rowSelectFlags.length = dataSource.length;
							getTotalColHeaders(data.tableHead);
							// console.log("colHeaders:totalColumnsHeaders");
							// console.log(totalColumnsHeaders);
							var totalColumnsOptions = getColumnsOptions(data.tableHead);
							// console.log("columns:totalColumnsOptions");
							// console.log(totalColumnsOptions);
							// handsontable 配置与生成
							if (handsontable === null) {
								handsontable = new Handsontable(tableContainer, {
									data: dataSource,
									hiddenColumns: {
										columns: [],
										indicators: true
									},
									// 配置列表头
									columns: totalColumnsOptions,
									colHeaders: colHeadersRenderer,
									//colWidths: [50, 90, 0, 90, 90, 90, 90],
									// stretchH: 'all',
									rowHeaders: true,	//显示行头
									cells: function (row, col, prop) {
										var cellProperties = {};
										return cellProperties;
									},
									// 配置可以改变行的大小
									manualRowResize: true,
									multiSelect: true,
									outsideClickDeselects: true,
									// 配置contextMenu
									contextMenu: contextMenuObj,
									undo: true,
									copyPaste: true,
									allowInsertRow: false,
									allowInsertColumn: false,
									fillHandle: false,
									search: {
										searchResultClass: ''
									},
									afterRender: function () {
										if (searchResults && searchResults.length) {
											var trs = document.querySelectorAll('#handsontable tbody tr');
											searchResults.forEach((value, index) => {
												var tds = trs[value.row].getElementsByTagName('td');
												if (index === currentResult) {
													tds[value.col].style.backgroundColor = "#f00";
												} else {
													tds[value.col].style.backgroundColor = "#0f0";
												}
											})
										}
										document.querySelectorAll(".handsontable table th")[0].style.display = "none";
										/*---------2018.3.7完成表头颜色改变的需求----------*/
										var table = document.getElementById('handsontable');	//找到表格
										var heads = table.childNodes[2].children[0].children[0].children[0].children[0].children[1].children[0];		//找到表头的节点
										for(var i=1;heads.children[i]!=undefined;i++){	//一共有11个选项，第一个不能用，从1到12
											var tableHead = heads.children[i];		//html的结构，在<th>下面还有一层<class>
											var tableDiv = tableHead.children[0];	//读取到那个class
											tableDiv.style.background = '#F0F000'	//给背景填色
										}
					
										/*---------2018.3.8-----------*/
									},
									afterOnCellMouseDown: function (event,coords, TD){
										if (event.target.nodeName == 'INPUT' && event.target.className == 'header-checker') {
											selectAllFlag = !event.target.checked;
											for (var i = 0; i < rowSelectFlags.length; i++) {
												rowSelectFlags[i] = selectAllFlag;
											}
											var inputs = document.querySelectorAll('#handsontable tbody tr td:first-child input');
											var trs = document.querySelectorAll('#handsontable tbody tr');
											if (selectAllFlag) {
												for (var tr of trs) {
													tr.className = 'selected';
												}
												for (var input of inputs) {
													input.checked = true;
												}
											} else {
												for (var tr of trs) {
													tr.className = '';
												}
												for (var input of inputs) {
													input.checked = false;
												}
											}
											// handsontable.render();
											event.stopPropagation();
										} else if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
											var row = event.target.getAttribute('data-index');
											rowSelectFlags[row] = !event.target.checked;
											var inputs = document.querySelectorAll('#handsontable tbody tr td:first-child input');
											var trs = document.querySelectorAll('#handsontable tbody tr');
											if (rowSelectFlags[row]) {
												trs[row].className = 'selected';
											} else {
												trs[row].className = '';
											}
							
										} else {
							
										}
									},
									afterChange: function (changes, source) {
										if (changes) {
											// console.log(changes)
											changes.forEach((value) => {
												var data = {};
												// data.testcaseId = handsontable.getDataAtRowProp(value[0], 'casecode');
												data.testcaseId = dataSource[value[0]].testcaseId.split(',')[0];
												data.caseCompositeType = dataSource[value[0]].caseCompositeType;
												data.tbHead = value[1];
												data.value = value[3];
												var changedIndex;
												changedData.forEach((value, index) => {
													if (value.testcaseId == data.testcaseId && value.tbHead == data.tbHead) {
														changedIndex = index;
													}
												});
												if (changedIndex !== undefined) {
													changedData.splice(changedIndex, 1, data);
												} else {
													changedData.push(data);
												}
											});
										}
									},
								});
								// console.log(handsontable)
								var hiddenColumnsPlugin = handsontable.getPlugin('hiddenColumns');
								console.log(handsontable.getSettings())
								hiddenColumnsPlugin.hideColumn(2, 3);
								handsontable.render();
								handsontable.updateSettings(contextMenuObj);
								$('#no-data-tip').css({display: 'none'});
								console.log(handsontable.getSettings())
							}
							else {
								handsontable.updateSettings({
									data: dataSource,
									columns: totalColumnsOptions,
									colHeaders: colHeadersRenderer
								});
								handsontable.render();
								$('#no-data-tip').css({display: 'none'});
							}
						} else {
							Vac.alert(data.respMsg);
						}
					},
					error: function () {
						Vac.alert('获取数据失败，请确认该脚本中含有数据！')
						$('#no-data-tip').css({display: 'block'});
					}
				}); //aj
			}
		}/*
		Handsontable.Dom.addEventListener(tableContainer, 'mousedown', function (event) {
			if (event.target.nodeName == 'INPUT' && event.target.className == 'header-checker') {
				selectAllFlag = !event.target.checked;
				for (var i = 0; i < rowSelectFlags.length; i++) {
					rowSelectFlags[i] = selectAllFlag;
				}
				var inputs = document.querySelectorAll('#handsontable tbody tr td:first-child input');
				var trs = document.querySelectorAll('#handsontable tbody tr');
				if (selectAllFlag) {
					for (var tr of trs) {
						tr.className = 'selected';
					}
					for (var input of inputs) {
						input.checked = true;
					}
				} else {
					for (var tr of trs) {
						tr.className = '';
					}
					for (var input of inputs) {
						input.checked = false;
					}
				}
				// handsontable.render();
				event.stopPropagation();
			} else if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
				var row = event.target.getAttribute('data-index');
				rowSelectFlags[row] = !event.target.checked;
				var inputs = document.querySelectorAll('#handsontable tbody tr td:first-child input');
				var trs = document.querySelectorAll('#handsontable tbody tr');
				if (rowSelectFlags[row]) {
					trs[row].className = 'selected';
				} else {
					trs[row].className = '';
				}

			} else {

			}
		});*/
		var searchBoxVue = new Vue({
			el: '#searchBox',
			data: {
				isShow: false,
				searOrRep: false,
				keyword: "",
				newword: '',
				searchResults: null,
				currentReult: 0,
			},
			methods: {
				show: function (searOrRep) {
					this.isShow = true;
					this.searOrRep = searOrRep;
				},
				hide: function () {
					this.isShow = false;
					searchResults = null;
					currentResult = 0;
					this.keyword = "";
					handsontable.search.query(this.keyword);
					handsontable.render();
				},
				showSearch: function () { this.searOrRep = false; },
				showReplace: function () { this.searOrRep = true; },
				search: function () {
					searchResults = handsontable.search.query(this.keyword);
					currentResult = 0;
					// this.renderResults();
					handsontable.render();
				},
				findNext: function () {
					currentResult += 1;
					if (currentResult >= searchResults.length) {
						currentResult = 0;
					}
					this.renderResults();
					this.scrollViewportTo(searchResults);
				},
				replace: function () {
					handsontable.setDataAtCell(searchResults[currentResult].row, searchResults[currentResult].col, this.newword);
					searchResults = handsontable.search.query(this.keyword);
					handsontable.render();
					if (currentResult >= searchResults.length) {
						currentResult = 0;
					}
					this.renderResults();
				},
				replaceAll: function () {
					this.search();
					if (searchResults && searchResults.length) {
						var newData = [];
						searchResults.forEach((value) => {
							var data = [value.row, value.col, this.newword];
							newData.push(data);
						});
						handsontable.setDataAtCell(newData);
						handsontable.render();
					}
				},
				scrollViewportTo: function (result) {
					if (result && result.length) {
						handsontable.scrollViewportTo(result[currentResult]['row'], result[currentResult]['col']);
					}
				},
				renderResults: function () {
					if (searchResults && searchResults.length) {
						var trs = document.querySelectorAll('#handsontable tbody tr');
						searchResults.forEach((value, index) => {
							var tds = trs[value.row].getElementsByTagName('td');
							if (index === currentResult) {
								tds[value.col].style.backgroundColor = "#f00";
							} else {
								tds[value.col].style.backgroundColor = "#0f0";
							}
						})
					}
				}
			},
			computed: {

			}
		});
		//window resize
		window.onresize = function () {
			if (handsontable !== null) {
				handsontable.render();
			}
		};
		//保存按钮
		document.getElementById('saveAll').onclick = function () {
			var data = { data: changedData };
			Vac.ajax({
				url: address3 + 'scripttemplateController/scripttemplateInf',
				data: { jsonStr: JSON.stringify(data) },
				success: function (data, textStatus) {
					if (data.respCode === '0000') {
						Vac.alert('保存成功')
					}
				}
			});
		};
		//导出模板按钮
		document.getElementById('excel-export').onclick = function () {
			$.ajax({
				url: address3 + 'dataCenter/downloadDataFile',
				data: {
					"autId": infoOfTreeOnOpen.autId,
					"caseLibId" :infoOfTreeOnOpen.caseLibId,
					'conditionList': infoOfTreeOnOpen.conditionList,
					'executorId': infoOfTreeOnOpen.executorId,
					'scriptId': infoOfTreeOnOpen.scriptId,
					'transId': infoOfTreeOnOpen.transId
				},
				success: function (data) {
					if (data.respCode === '0000') {
						Vac.alert('保存成功')
					}
				}
			});
				var inputs = '';
				inputs+='<input type="hidden" name="autId" value="'+ infoOfTreeOnOpen.autId +'" />'; 
				inputs+='<input type="hidden" name="caseLibId" value="'+ infoOfTreeOnOpen.caseLibId +'" />'; 
				inputs+='<input type="hidden" name="executorId" value="'+ infoOfTreeOnOpen.executorId +'" />'; 
				inputs+='<input type="hidden" name="scriptId" value="'+ infoOfTreeOnOpen.scriptId +'" />'; 
				inputs+='<input type="hidden" name="transId" value="'+ infoOfTreeOnOpen.transId +'" />'; 
				var conditions="["
				for(let i=0;i<infoOfTreeOnOpen.conditionList.length;i++){
					var condition=infoOfTreeOnOpen.conditionList[i];
					conditions+='{"propertyName":"'+condition.propertyName+'","compareType":"'+condition.compareType+'","propertyValueList":["'+(condition.propertyValueList+"")+'"]},';
				}
				conditions=conditions.slice(0,conditions.length-1);
				conditions+="]";
				console.log(conditions)
				inputs+=`<input type="hidden" name="conditionList" value='`+ conditions +`' />`; 
				inputs+='</table>';
				// request发送请求
				jQuery('<form action="'+ address3 + 'dataCenter/downloadDataFile" method="post">'+inputs+'</form>')
				.appendTo('body').submit().remove();
		};
		//导入模板按钮
		document.getElementById('excel-import').onclick = function () {
			$('#importModal').modal('show');
		};
		//用力筛选按钮
		document.getElementById('data-search').onclick = function () {
			$('#searchtModal').modal('show');
		};		
		// 查看脚本
		//双击单元格，跳出编辑数据框
		document.querySelectorAll('.dbclick').onDblClick = function () {
			// console.log('niah');
		};
		//渲染第0列的内容
		function colHeadersRenderer(col) {
			if (parseInt(col) === 0) {
				// return "<input type='checkbox' class='header-checker' " + (selectAllFlag ? "checked='checked'" : "") + ">";
				return '查看脚本'
			} else {
				return totalColumnsHeaders[col];
			}
		};
		//渲染第一列的内容 end
		//渲染平常列
		function renderNormalCol(instance, td, row, col, prop, value, cellProperties) {
			// if (row % 2) {
			// 	// td.style.backgroundColor = "#eeee11";
			// } else {
			// 	// td.style.backgroundColor = "#ffff00";
			// }
			// if (rowSelectFlags[row] === true) {
			// 	// td.style.backgroundColor = "#1ABDE6";
			// } else {
			// 	// td.style.backgroundColor = "#fff";
			// }
			// if (td.isSearchResult) {
			// 	// td.style.backgroundColor = "#fff";
			// 	// console.log("result");
			// }
			td.innerHTML = value;
			return td;
		};
		//渲染平常列 end

		//复制功能函数
		function copyCallback(key, selection) {
			var trueIndexArray = [];
			rowSelectFlags.forEach((flag, index) => {
				if (flag) {
					trueIndexArray.push(index);
				}
			});
			// 先清空剪切板
			while (clipBoard.length > 0) {
				clipBoard.pop();
			}
			//选择所有被选中的单元格
			var i = 0;
			for (i = selection.start.row; i <= selection.end.row; i++) {
				let j = 0;
				for (j = selection.start.col; j <= selection.end.col; j++) {
					let data = [i - selection.start.row, j - selection.start.col, handsontable.getDataAtCell(i, j)];
					clipBoard.push(data);
				}
			}
			clipBoardSize.cols = selection.end.col - selection.start.col + 1;
			clipBoardSize.rows = selection.end.row - selection.start.row + 1;
		}
		//复制功能函数 end
		//粘贴功能函数
		// the data of the clipboard : [[row,col,value],[row,col,value]]
		// the data of selection: { start: { col: 1, row: 3 }, end: { col: 2, row: 4 }}
		function pasteCallback(key, selection) {
			if (clipBoard.length > 0) {
				var cols = selection.end.col - selection.start.col + 1;
				var rows = selection.end.row - selection.start.row + 1;
				if (cols <= clipBoardSize.cols && rows <= clipBoardSize.rows) {
					var clipBoardData = clipBoard.map((array) => {
						let arrayData = [];
						arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row);
						arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col);
						arrayData[2] = array[2];
						return arrayData;
					});
					setCellsData(clipBoardData);
				} else if (cols > clipBoardSize.cols && rows <= clipBoardSize.rows) {
					var int = Math.floor(cols / clipBoardSize.cols);
					var i = 0;
					for (i = 0; i < int; i++) {
						var clipBoardData = clipBoard.map((array) => {
							let arrayData = [];
							arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row);
							arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col) + i * clipBoardSize.cols;
							arrayData[2] = array[2];
							return arrayData;
						});
						setCellsData(clipBoardData);
					}
				} else if (cols <= clipBoardSize.cols && rows > clipBoardSize.rows) {
					var int = Math.floor(rows / clipBoardSize.rows);
					var i = 0;
					for (i = 0; i < int; i++) {
						var clipBoardData = clipBoard.map((array) => {
							let arrayData = [];
							arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row) + i * clipBoardSize.rows;
							arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col);
							arrayData[2] = array[2];
							return arrayData;
						});
						setCellsData(clipBoardData);
					}
				} else {
					var rowInt = Math.floor(rows / clipBoardSize.rows);
					var colInt = Math.floor(cols / clipBoardSize.cols);
					var i = 0, j = 0;
					for (i = 0; i < rowInt; i++) {
						for (j = 0; j < colInt; j++) {
							var clipBoardData = clipBoard.map((array) => {
								let arrayData = [];
								arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row) + i * clipBoardSize.rows;
								arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col) + j * clipBoardSize.cols;
								arrayData[2] = array[2];
								return arrayData;
							});
							setCellsData(clipBoardData);
						}
					}
				}
			}
		}
		//粘贴功能函数 end
		//剪切功能函数
		function cutCallback(key, selection) {
			var trueIndexArray = [];
			rowSelectFlags.forEach((flag, index) => {
				if (flag) {
					trueIndexArray.push(index);
				}
			});
			// 先清空剪切板
			while (clipBoard.length > 0) {
				clipBoard.pop();
			}
			//选择所有被选中的单元格
			//将所有选中单元格复制到剪切板,同时清空选中单元格的内容
			var clipBoardData = [];
			var i = 0;
			for (i = selection.start.row; i <= selection.end.row; i++) {
				let j = 0;
				for (j = selection.start.col; j <= selection.end.col; j++) {
					let data = [i - selection.start.row, j - selection.start.col, handsontable.getDataAtCell(i, j)];
					let nullData = [i, j, ""];
					clipBoard.push(data);
					clipBoardData.push(nullData)
				}
			}
			handsontable.setDataAtCell(clipBoardData);
		}
		//剪切功能函数 end
		// 清除功能函数
		function clearCallback(key, selection) {
			var trueIndexArray = [];
			rowSelectFlags.forEach((flag, index) => {
				if (flag) {
					trueIndexArray.push(index);
				}
			});
			//选择所有被选中的单元格
			//将所有选中单元格复制到剪切板,同时清空选中单元格的内容
			var clipBoardData = [];
			var i = 0;
			for (i = selection.start.row; i <= selection.end.row; i++) {
				let j = 0;
				for (j = selection.start.col; j <= selection.end.col; j++) {
					let nullData = [i, j, ""];
					// clipBoard.push(data);
					clipBoardData.push(nullData)
				}
			}
			handsontable.setDataAtCell(clipBoardData);
		}
		//清除功能函数 end
		// //搜索功能函数
		function searchCallback(key, selection) {
			searchBoxVue.show(false);
		}
		// //搜索功能函数 end
		// //搜索功能函数
		function replaceCallback(key, selection) {
			searchBoxVue.show(true);
		}
		// //跳转修改函数
		function modifyCallback(key, selection) {//key是 modify selection是选中的格子 {start: {row: 0, col: 5}, end: {row: 0, col: 5}}
			$('#detailModal').modal('show')
			var id = handsontable.getCell(selection[0].start.row, 0, false).firstChild.getAttribute('data-id');
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
					$('#detailForm input[name="missionId"]').val(caseData.missionName);
					$('#detailForm input[name="autid"]').val(caseData.autName);
					$('#casetransid').val(caseData.transName);
					$('#detailForm input[name="versioncode"]').val(caseData.version);
					$('#detailForm input[name="scriptmodeflag"]').val(caseData.scriptTemplateName);
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
					$('#detailForm input[name="author"]').val(caseData.authorName);
					$('#detailForm input[name="reviewer"]').val(caseData.reviewerName);
					$('#detailForm input[name="executor"]').val(caseData.executorName);
					$('#detailForm select[name="executemethod"]').val(caseData.executeMethod);
					$('#detailForm select[name="scriptmode"]').val(caseData.scriptMode);
					$('#detailForm select[name="usestatus"]').val(caseData.useStatus);
					$('#detailForm textarea[name="note"]').val(caseData.note);
				}
			});
		}
		// //搜索功能函数 end
		//编辑单元格数据
		function editCellData(key, selection) {
			console.log(selection)
			var header = handsontable.getColHeader(selection[0].start.col);
			var testcaseId = dataSource[selection[0].start.row].testcaseId;
			if (scriptId!=-1){
				editDataVue.show(selection[0]);
			}
			else{
				APIFieldModalInit();
			}
		}
		// 编辑单元格数据
		// 设置单元格数据，保证设置的数据不超过最大行，最大列

		// parameter: [[row,col,value],[row,col,value]]
		function setCellsData(arrayData) {
			var maxCol = handsontable.countCols() - 1;
			var maxRow = handsontable.countRows() - 1;
			arrayData = arrayData.filter((value) => {
				if (value[0] <= maxRow && value[1] <= maxCol) {
					return true;
				} else {
					return false;
				}
			});
			handsontable.setDataAtCell(arrayData);
		}
	})();

	var editDiv = document.querySelector('#editData')
	var header = document.querySelector('#editData>header')
	Vac.startDrag(header, editDiv)
	Vac.startDrag(document.querySelector('#searchBox>header'), document.querySelector('#searchBox'))
	Vac.startDrag(document.querySelector('#insertDiv>header'), document.querySelector('#insertDiv'))
});

// APIFieldModal Function Start

function APIFieldModalInit(){
	$('.APIFieldVerificationParaRow').remove();
	$('.APIFieldExtractionParaRow').remove();
	APIFieldVerificationParaAdd();
	APIFieldExtractionParaAdd();
	$('input[name="APIFieldVerificationParaExp"]').last().change(APIFieldVerificationParaAdd);
	$('input[name="APIFieldExtractionParaExp"]').last().change(APIFieldExtractionParaAdd);
	APIFieldModalLoadVerificationData();
	APIFieldModalLoadExtractionData();
	$("#inlineRadio1").prop('checked','checked');
	$(".APIFieldExtractionParaRow").hide();
	$('#APIFieldModal').modal('show');
}

function APIFieldModalLoadVerificationData(){
	$.ajax({
        url: address3 + 'scripttemplateController/getInterfaceCheckValues',
        data: JSON.stringify({
			"testCaseId":sessionStorage.getItem('testCaseId'),
			"caseCompositeType":sessionStorage.getItem('caseCompositeType')
		}),
        type: 'post',
		contentType:"application/json",
        success: function (data) {
          if (!data) {
            Vac.alert(data.msg || '查询失败');
            return;
          }	
			// _this.tableData = data.scriptList;
			// data = [
			// 	{
			// 		"compareChar": "==",
			// 		"expectValue": "2",
			// 		"pathExpression": "\\$..totalCount"
			// 	},
			// 	{
			// 		"compareChar": "!=",
			// 		"expectValue": "3",
			// 		"pathExpression": "\\$..totalCount"
			// 	},
			// 	{
			// 		"compareChar": "==",
			// 		"expectValue": "2",
			// 		"pathExpression": "\\$..totalCount"
			// 	}
			// ];
		  	console.log("Verification Data:");
			console.log(data);

			for(let i=0; i<data.length; i++){
				APIFieldVerificationParaAdd();
				$('.APIFieldVerificationParaRow [name=APIFieldVerificationParaExp]')[i].value = data[i].pathExpression;
				$('.APIFieldVerificationParaRow [name=APIFieldVerificationParaSel]')[i].value = data[i].compareChar;
				$('.APIFieldVerificationParaRow [name=APIFieldVerificationParaVal]')[i].value = data[i].expectValue;
			}


        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
		}
	});
}

function APIFieldModalLoadExtractionData(){
	$.ajax({
        url: address3 + 'scripttemplateController/getInterfaceExtractValues',
        data: JSON.stringify({
			"testCaseId":sessionStorage.getItem('testCaseId'),
			"caseCompositeType":sessionStorage.getItem('caseCompositeType')
		}),
        type: 'post',
		contentType:"application/json",
        success: function (data) {
          if (!data) {
            Vac.alert(data.msg || '查询失败');
            return;
          }	
			// _this.tableData = data.scriptList;

			// data = [
			// 	{
			// 		"pathExpression": "\\$..totalCount",
			// 		"name":"总个数"
			// 	},
			// 	{
			// 		"pathExpression": "\\$..totalCount",
			// 		"name":"总个数"
			// 	},
			// 	{
			// 		"pathExpression": "\\$..totalCount",
			// 		"name":"总个数"
			// 	}
			// ];
		  	console.log("Extraction Data:");
			console.log(data);

			for(let i=0; i<data.length; i++){
				APIFieldExtractionParaAdd();
				$('.APIFieldExtractionParaRow [name=APIFieldExtractionParaExp]')[i].value = data[i].pathExpression;
				$('.APIFieldExtractionParaRow [name=APIFieldExtractionParaName]')[i].value = data[i].name;
			}
			$(".APIFieldExtractionParaRow").hide();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
		}
	});
}

function APIFieldVerificationParaAdd() {
	$('input[name="APIFieldVerificationParaExp"]').last().unbind('change',APIFieldVerificationParaAdd);    
	
	var deleteButtonTr = `
					<div class="col-lg-0">
						<button class="btn" type="button" onclick="APIFieldParaRowDelete(event)" style="color:red;background:transparent">
							<i class="icon-remove"></i>
						</button>
					</div>`;
	$('.APIFieldVerificationParaRow').last().append(deleteButtonTr);

	var APIFieldVerificationParaTr = `
					<div class="form-group APIFieldVerificationParaRow">
						<div class="col-lg-5">
							<input class="form-control" type="text" name="APIFieldVerificationParaExp" placeholder="表达式">
						</div>
						<div class="col-lg-3">
							<select class="form-control" name="APIFieldVerificationParaSel">
								<option value="==">等于</option>
								<option value="!=">不等于</option>
								<option value="C">包含</option>
								<option value="!C">不包含</option>
							</select>
						</div>
						<div class="col-lg-3">
							<input class="form-control" type="text" name="APIFieldVerificationParaVal" placeholder="预期值">
						</div>
					</div>`;
	$('#APIFieldParaListBody').append(APIFieldVerificationParaTr);

	$('input[name="APIFieldVerificationParaExp"]').last().change(APIFieldVerificationParaAdd);    
}

function APIFieldExtractionParaAdd() {
	$('input[name="APIFieldExtractionParaExp"]').last().unbind('change',APIFieldExtractionParaAdd);    
	
	var deleteButtonTr = `
					<div class="col-lg-0">
						<button class="btn" type="button" onclick="APIFieldParaRowDelete(event)" style="color:red;background:transparent">
							<i class="icon-remove"></i>
						</button>
					</div>`;
	$('.APIFieldExtractionParaRow').last().append(deleteButtonTr);

	var APIFieldExtractionParaTr = `
				<div class="form-group APIFieldExtractionParaRow" >
					<div class="col-lg-6">
						<input class="form-control" type="text" name="APIFieldExtractionParaExp" placeholder="表达式">
					</div>
					<div class="col-lg-5">
						<input class="form-control" type="text" name="APIFieldExtractionParaName" placeholder="字段保存名称">
					</div>
				</div>`;
	$('#APIFieldParaListBody').append(APIFieldExtractionParaTr);

	$('input[name="APIFieldExtractionParaExp"]').last().change(APIFieldExtractionParaAdd);    
}

function APIFieldParaRowDelete(e) {
	var tmp = $(e.target).parent().parent().find('button').parent().parent();
	tmp.remove();
}

function APIUpload() {

	if($("input[name=inlineRadioOptions]")[0].checked){
		console.log("验证");
		var APIFieldVerificationData=[];
		$('#APIFieldParaListBody').find('.APIFieldVerificationParaRow').each(function() {
			var APIFieldVerificationParaExp=$(this).find("input[name=APIFieldVerificationParaExp]").val(),
				APIFieldVerificationParaSel=$(this).find("select").val(),
				APIFieldVerificationParaVal=$(this).find("input[name=APIFieldVerificationParaVal]").val();
			if(APIFieldVerificationParaExp!=""){
				let singleData={};
				singleData.pathExpression=APIFieldVerificationParaExp;
				singleData.compareChar=APIFieldVerificationParaSel;
				singleData.expectValue=APIFieldVerificationParaVal;
				APIFieldVerificationData.push(singleData);
			}
		});
		console.log(APIFieldVerificationData);
		$.ajax({
			url: address3 + 'scripttemplateController/interfaceCheckSave',
			data: JSON.stringify({
				"testCaseId":sessionStorage.getItem('testCaseId'),
				"caseCompositeType":sessionStorage.getItem('caseCompositeType'),
				"interfaceCheckEntities":APIFieldVerificationData
			}),
			type: 'post',
			contentType:"application/json",
			success: function (data) {
			  if (!data) {
				Vac.alert(data.msg || '查询失败');
				return;
			  }
			  if (data.respCode=='0000'){
				  $('#APIFieldModal').modal('hide');
				  Vac.alert(data.respMsg);
			  }	
			  
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			  Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
			}
		});
	}
	else if($("input[name=inlineRadioOptions]")[1].checked){
		console.log("提取");
		var APIFieldExtractionData=[];
		$('#APIFieldParaListBody').find('.APIFieldExtractionParaRow').each(function() {
			var APIFieldExtractionParaExp=$(this).find("input[name=APIFieldExtractionParaExp]").val(),
				APIFieldExtractionParaName=$(this).find("input[name=APIFieldExtractionParaName]").val();
			if(APIFieldExtractionParaExp!=""){
				let singleData={};
				singleData.pathExpression=APIFieldExtractionParaExp;
				singleData.name=APIFieldExtractionParaName;
				APIFieldExtractionData.push(singleData);
			}
		});
		console.log(APIFieldExtractionData);
		$.ajax({
			url: address3 + 'scripttemplateController/interfaceExtractSave',
			data: JSON.stringify({
				"testCaseId":sessionStorage.getItem('testCaseId'),
				"caseCompositeType":sessionStorage.getItem('caseCompositeType'),
				"interfaceExtractEntities":APIFieldExtractionData
			}),
			type: 'post',
			contentType:"application/json",
			success: function (data) {
			  if (!data) {
				Vac.alert(data.msg || '查询失败');
				return;
			  }	
			  if (data.respCode=='0000'){
				$('#APIFieldModal').modal('hide');
				Vac.alert(data.respMsg);
			}	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
			  Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
			}
		});
	}
}

function APIFieldOptionsClick(type) {

	if(type==1){
		$(".APIFieldVerificationParaRow").show();
		$(".APIFieldExtractionParaRow").hide();
	}
	else if(type==2){
		$(".APIFieldVerificationParaRow").hide();
		$(".APIFieldExtractionParaRow").show();
	}

}
// APIFieldModal Function End