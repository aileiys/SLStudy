window.onbeforeunload = new Function('if("1"=="2"){console.log("完成")}');
var timeId;
console.log("2222222222");
function saveTime() {
	var url = 'saveTime.action';
	window.clearInterval(timeId);
	var params = Form.serialize('learnTime');
	var myAjax1 = new Ajax.Request(
		url,
		{
			method: 'post',
			parameters: params,
			onComplete: processResponse,
			asynchronous: true
		});
}

function processResponse(request) {
	var action = request.responseText.parseJSON();
	if (action.flags == '1') {
		//alert('你已经学习其它课程，请关闭此窗口。');
		$("media").innerHTML = '<div style="height:450px;padding:100px 0px 0;color:red;">' + action.tip + '</div>';
		//window.close();
	} else if (action.flags == '3') {
		$("media").innerHTML = '<div style="height:450px;padding:100px 0px 0;color:red;">' + action.tip + '</div>';
	} else if (action.flags == '2') {
		$("media").innerHTML = '<div style="height:450px;padding:100px 0px 0;color:red;">' + action.tip + '</div>';
	}
	window.clearInterval(timeId);
	//alert("请点击确定继续学习。");
	setBeginTime(action.shenyuxueshi, '0');
}

function setBeginTime(shengYuShiJian, i) {
	var watchTime = Math.floor(Math.random() * 7 + 1) + 6;  //随机7-13分钟弹出，并按此时间保存
	if (shengYuShiJian < 13)
		watchTime = shengYuShiJian;
	document.getElementById("watchTime").value = watchTime;
	document.getElementById("firstTime").value = i;
	var url = 'setBeginTime.action';
	var params = Form.serialize('learnTime');
	var myAjax1 = new Ajax.Request(
		url,
		{
			method: 'post',
			parameters: params,
			onComplete: processResponse1,
			asynchronous: true
		});
}
function processResponse1(request) {
	var action = request.responseText.parseJSON();
	document.getElementById("setVersion").value = action.setVersion;
	if (action.flags == '1') {
		//alert('你已经学习其它课程，请关闭此窗口。');
		$("media").innerHTML = '<div style="height:450px;padding:100px 0px 0;color:red;">' + action.tip + '</div>';
		//window.close();
	} else if (action.flags == '3') {
		$("media").innerHTML = '<div style="height:450px;padding:100px 0px 0;color:red;">' + action.tip + '</div>';
	} else if (action.flags == '2') {
		$("media").innerHTML = '<div style="height:450px;padding:100px 0px 0;color:red;">' + action.tip + '</div>';
	} else {
		if (action.flags == '0' && action.shenyuxueshi > 0) {
			var watchTime = document.getElementById("watchTime").value;
			if (watchTime > 0)
				timeId = window.setInterval(saveTime, watchTime * 60000);
		}
		$("tip").innerHTML = action.tip;
	}
}
