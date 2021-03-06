var address = "http://10.101.167.184:8080/ATFCloud/";
var address2 = ' http://10.101.167.184:8080/atfcloud2.0a/';
var address3 = ' http://10.101.167.184:8080/atfcloud2.0a/';
var address4 = ' http://10.101.167.184:8080/';

if(window.location.host=="atf.yiran-fancier.cn:8081"){
    address3 = ' http://atf.yiran-fancier.cn:8081/atfcloud2.0a/'
    address2 = ' http://atf.yiran-fancier.cn:8081/atfcloud2.0a/';
}
// var address = "/";}
// var address = "/";
// var address2 = "/";
function getJson(data) {
    let o = {};
    data.split('&').forEach((item) => {
        let a = item.split('=');
        o[a[0]] = a[1];
    });
    return JSON.stringify(o);
}
function ajax2 (opt) {
    if (opt.url.startsWith(address2) || opt.url.startsWith(address3)) {
        opt.contentType = 'application/json';
        if (typeof opt.data === 'object') {
            opt.data = JSON.stringify(opt.data);
        }
    }
    $.ajax(opt);
};
// 时间戳转日期
function formatDate(date){
    var date = new Date(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
(function (){
    var modal = document.getElementsByClassName("modal-dialog")
    console.log(modal[1])
    console.log(modal[8])
    let i =0;
    console.log(modal[8])
    let len = modal.length;
    for(let i =0 ; i<len;i++){
    modal[i].style.userSelect = "none"
    modal[i].children[0].children[0].addEventListener("mousedown",function (e) {//鼠标按下的时候，得到鼠标在盒子里面的坐标
        var xy =$(modal[i]).css('transform').split(",");
        console.log(modal[i])
        
        var x=e.pageX - parseFloat(xy[4]);
        var y=e.pageY- parseFloat(xy[5]);;
        document.addEventListener("mousemove",move);  //鼠标移动的时候，得到模态框的坐标
        function move(e){
            console.log(modal[i])
            console.log(e)
        let adjusty =e.pageY-y
        let adjustx =e.pageX-x
        if(adjusty<-10) adjusty =-10
        if(adjusty>650) adjusty =650
        if(adjustx<-450) adjustx =-450
        if(adjustx>550) adjustx =550
        modal[i].style.transform="translate("+adjustx+"px,"+adjusty+"px)";
        }
        document.addEventListener("mouseup",function(){  //鼠标弹起的时候，解除鼠标移动事件
            document.removeEventListener("mousemove",move);
        })
    })
   }
})()
//用于生成与导航栏组件绑定的Vue
var progressbar = new Vue({
    el:"#progressbar",
    data:()=>(
        {
            progressList:[],
            flag : true,
        }
    ),
    ready: function() {
        var _this = this;
        console.log("MF")
        console.log(window.location.pathname);
        let a =
        [
            {
                name:"被测系统管理",
                href:"aut.html",
                status:true,
                pre:0,
                item:[
                    {
                        name:"添加被测系统",
                        href:"aut.html",
                        status:"",
                        pre:0
                    },
                    {
                        name:"添加功能点",
                        href:"transact.html",
                        status:"",
                        pre:1
                    },
                    {
                        name:"添加UI及元素",
                        href:"transactDetail.html",
                        status:"",
                        pre:2
                    },
                    {
                        name:"配置脚本",
                        href:"transactDetail.html",
                        status:"",
                        pre:2
                    }
                ]
            },
            {
                name:"脚本生成",
                href:"testProject.html",
                status:false,
                pre:0,
                item:[
                    {
                        name:"添加测试项目",
                        href:"testProject.html",
                        status:"",
                        pre:0
                    },
                    {
                        name:"添加用例",
                        href:"caseManagement.html",
                        status:"",
                        pre:3
                    },
                    {
                        name:"配置数据",
                        href:"datatable.html",
                        status:"",
                        pre:3
                    },
                    {
                        name:"配置场景",
                        href:"scene.html",
                        status:"",
                        pre:3
                    }
                ]
            },
            {
                name:"测试执行",
                href:"testplan-execute.html",
                status:false,
                pre:3,
                item:[
                    {
                        name:"添加测试计划",
                        href:"testplan-execute.html",
                        status:"",
                        pre:3
                    },
                    {
                        name:"添加待执行场景",
                        href:"testplan-execute.html",
                        status:"",
                        pre:3
                    },
                    {
                        name:"选择执行机",
                        href:"testplan-execute.html",
                        status:"",
                        pre:3
                    },
                    {
                        name:"执行",
                        href:"testplan-execute.html",
                        status:"",
                        pre:3
                    }
                ]
            },
            {
                name:"结果查询",
                href:"execution.html",
                status:false,
                pre:3,
                item:[
                    {
                        name:"按执行批次查询",
                        href:"execution.html",
                        status:"",
                        pre:3,
                    },
                    {
                        name:"按记录单查询",
                        href:"testRecord.html",
                        status:"",
                        pre:3,
                    }
                ]
            }
        ];
        let pathname = window.location.pathname.split("/")[2];
        switch(pathname){
            case 'transactDetail.html':
                a[0].item[0].status= a[0].item[1].status= a[0].item[2].status="active";
            case 'transact.html':
                a[0].item[0].status= a[0].item[1].status= "active";
            case 'aut.html':
                a[0].item[0].status="active";
            case 'architecture.html':
            case 'mockserver.html':
            case 'runner-management.html':
            case 'usermanagement.html':
                a[0].status="activing";
                a[1].status=a[2].status=a[3].status="noactive";
                    break;
            case 'scene-setting.html':
            case 'scene.html':
            case 'insertSceneCase.html':
                a[1].item[0].status= a[1].item[1].status= a[1].item[2].status= a[1].item[3].status="active";
            case 'datatable.html':
            case 'datatable_flowcase.html':
                a[1].item[0].status= a[1].item[1].status= a[1].item[2].status="active";
            case 'caseManagement.html':
            case 'casePostRecord.html':
                a[1].item[0].status= a[1].item[1].status= "active";
            case 'testProject.html':
                a[1].item[0].status= "active";
                a[0].status="actived";
                a[1].status="activing";
                a[2].status=a[3].status="noactive";
                break;
            case 'testplan-execute.html':
                a[2].item[0].status= "active";
                a[2].item[1].status= "active";
                a[2].item[2].status= "active";
                a[2].item[3].status= "active";
                a[0].status=a[1].status="actived";
                a[2].status="activing";
                a[3].status="noactive";
                break;
            case 'testRecord.html':
                a[3].item[0].status= "active";
                a[3].item[1].status= "active";
            case 'execution.html':
                a[3].item[0].status= "active";
                a[0].status=a[1].status=a[2].status="actived";
                a[3].status="activing";
                break;
            default: 
                a[0].status=a[1].status=a[2].status=a[3].status="noactive";
                this.flag=false;
                break;

        }
        this.progressList= a ;
    },
})


var maincodeBegin = 'import control.core.ScriptExecuteTools\nimport control.impl.web.selenium.dialog.Dialog_SeleniumImpl;\nimport control.impl.web.selenium.common.ScriptExecuteToolsInit;\nimport control.impl.web.selenium.browser.Browser_SeleniumImpl;\nimport control.impl.web.selenium.single.WebButton_SeleniumImpl;\nimport control.impl.web.selenium.single.WebImage_SeleniumImpl;\nimport control.impl.web.selenium.single.WebLink_SeleniumImpl;\nimport control.impl.web.selenium.single.WebImage_SeleniumImpl;\nimport control.impl.web.selenium.single.WebCheckBox_SeleniumImpl;\nimport control.impl.web.selenium.edit.WebEdit_SeleniumImpl;\nimport control.impl.web.selenium.edit.WebArea_SeleniumImpl;\nimport control.impl.web.selenium.list.WebList_SeleniumImpl;\nimport control.impl.web.selenium.single.WebFile_SeleniumImpl;\nimport control.impl.web.selenium.radiogroup.WebRadioGroup_SeleniumImpl;\nimport org.openqa.selenium.WebDriver\nimport java.util.Date\nimport static constants.enumdefs.CaseRunFailCause.*\nimport static constants.enumdefs.CaseRunStatus.*\nimport run.batch.robot.*;\n\ndef helloWithoutParam(WebDriver driver, Map<String, String> reporterMap,File elementLibFile,File objectLibFile){\n    ScriptExecuteToolsInit.init(driver, reporterMap);\n    ScriptExecuteTools.objectRepository.LoadFromFile(elementLibFile, objectLibFile);\n    Date startTime = new Date();\n    ScriptExecuteTools.Reporter.setStartTime(startTime);';
var maincodeEnd = 'Date endTime = new Date();\n    long processTime = (endTime.getTime()-startTime.getTime())/1000;\n    ScriptExecuteTools.Reporter.setEndTime(endTime);\n    ScriptExecuteTools.Reporter.setProcessTime(processTime);\n    ScriptExecuteTools.Reporter.setExeStatus(Passed);\n}';