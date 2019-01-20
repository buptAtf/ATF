var address = "http://10.101.167.184:8080/ATFCloud/";
var address2 = ' http://10.101.167.184:8080/atfcloud2.0a/';
var address3 = ' http://10.101.167.184:8080/atfcloud2.0a/';

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

var maincodeBegin = 
```
import control.core.ScriptExecuteTools\nimport control.impl.web.selenium.dialog.Dialog_SeleniumImpl;\nimport control.impl.web.selenium.common.ScriptExecuteToolsInit;\nimport control.impl.web.selenium.single.WebButton_SeleniumImpl;\nimport control.impl.web.selenium.single.WebImage_SeleniumImpl;\nimport control.impl.web.selenium.single.WebLink_SeleniumImpl;\nimport control.impl.web.selenium.single.WebImage_SeleniumImpl;\nimport control.impl.web.selenium.single.WebCheckBox_SeleniumImpl;\nimport control.impl.web.selenium.edit.WebEdit_SeleniumImpl;\nimport control.impl.web.selenium.edit.WebArea_SeleniumImpl;\nimport control.impl.web.selenium.list.WebList_SeleniumImpl;\nimport control.impl.web.selenium.single.WebFile_SeleniumImpl;\nimport control.impl.web.selenium.radiogroup.WebRadioGroup_SeleniumImpl;\nimport org.openqa.selenium.WebDriver\nimport java.util.Date\nimport static constants.enumdefs.CaseRunFailCause.*\nimport static constants.enumdefs.CaseRunStatus.*\nimport run.batch.robot.*;\n\ndef helloWithoutParam(WebDriver driver, Map<String, String> reporterMap,File elementLibFile,File objectLibFile){\n    ScriptExecuteToolsInit.init(driver, reporterMap);\n    ScriptExecuteTools.objectRepository.LoadFromFile(elementLibFile, objectLibFile);\n    Date startTime = new Date();\n    ScriptExecuteTools.Reporter.setStartTime(startTime);
```;
var maincodeEnd = 
```
Date endTime = new Date();\n    long processTime = (endTime.getTime()-startTime.getTime())/1000;\n    ScriptExecuteTools.Reporter.setEndTime(endTime);\n    ScriptExecuteTools.Reporter.setProcessTime(processTime);\n    ScriptExecuteTools.Reporter.setExeStatus(Passed);\n}
```