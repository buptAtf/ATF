{
	var testPlanName = document.getElementById("myTitle").innerHTML;
	var round = 0;
	var name = getName(testPlanName);
	console.log("log here "+name);
	getExecytionRoundByTestPlanId(name);
	setTimeout(function(){
		console.log(round);
		document.getElementById("currentRound").innerHTML = round.toString();
	},9000);
	
	
}
function getName(rawTitle){
	var startIndex = 0;
	var endIndex = rawTitle.length;
	startIndex = rawTitle.indexOf("项目测试");
	var finalStr = rawTitle.substring(startIndex+6, endIndex-1);
	console.log("截取结果:"+finalStr);
	return finalStr;
};
// 获取场景
function getExecytionRoundByTestPlanId(testPlanName) {
    console.log("1231");
    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: 'http://140.143.16.21:8080/atfcloud2.0a/batchRunCtrlController/pagedBatchQueryBatchRunCtrl',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'testPlanId': '',
            'caseSourceChannel': '',
            'runStatus': '', 
            'pageSize': 2300,
            'currentPage': 1,
            'queryStartTime': 1074265600000,
            'queryEndTime': 1574438399000
        }),
        success: function(data) {
			var sceneList = [];
			var result = 0;
            if (data.respCode === '0000') {
                sceneList = data.batchRunCtrlList;
				console.log('查询成功');
				for(var i = 0 ; i< sceneList.length;i++){
					if(sceneList[i].testPlanName === testPlanName.toString()){
						console.log(sceneList[i]);
						result = sceneList[i].executionRound;
						console.log('测试轮次:' + ++result)
						round = result + 1;
						break;
					}else{
						round = 1;
					}
				}
            } else {
                sceneList = [];
                console.log('查询失败');
            }
        }
    });
}