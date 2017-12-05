$(function() {
	/*导航栏点击跳转到首页*/
	$("#nav li a").click(function() {
		window.localStorage.idobj = $(this).attr("target-id");
	});
	//自定义复选框样式
	$(".checkbox-img .unchecked").click(function() {
		$(this).toggleClass("checked");
		if($(this).siblings("input").prop("checked") == false) {
			$(this).siblings("input").prop("checked", true);
			$(".next-step").removeClass("disabled").removeAttr("disabled");
		} else {
			$(this).siblings("input").prop("checked", false);
			$(".next-step").addClass("disabled").prop("disabled", true);
		}
	});
});

//判断手机端还是pc端
function isPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	var flag = true;
	for(var v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

//错误信息提示
function errorInfor(obj, content) {
	if(isPC()) {
		$(".index-error").html("");
		obj.val("").focus();
		obj.siblings(".index-error").html(content);
	} else {
		obj.val("").focus();
		$(".index-error").html(content).show();
		setTimeout(function(){
		    $(".index-error").fadeOut(500);
		},1000);
	}
}

/*输入数字，防止输入字符*/
$("input[name=tel]").keyup(function() {
		this.value = this.value.replace(/\D/g, '');
	})

/*电话号码的验证*/
function isTel(obj) {
	var tel = obj.val();
	$(".index-error").html("");
	if(!tel) {
		errorInfor(obj, '请输入手机号码!');
		return false;
	} else {
		var re = /^1[3|4|5|7|8]\d{9}$/;
		if(!re.test(tel)) {
			errorInfor(obj, '请输入有效的手机号码!');
			return false;
		} else {
			return true;
		}
	}
}
/*邮箱的验证*/
function isMail(obj) {
	var tel = obj.val();
	$(".index-error").html("");
	if(!tel) {
		errorInfor(obj, '请输入邮箱地址!');
		return false;
	} else {
		var re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if(!re.test(tel)) {
			errorInfor(obj, '请输入有效的邮箱地址!');
			return false;
		} else {
			return true;
		}
	}
}
/*密码，验证码为空时提示*/
function isNull(obj, content) {
	var count = obj.val();
	$(".index-error").html("");
	if(!count) {
		errorInfor(obj, "请输入" + content + "!");
		return false;
	} else {
		return true;
	}
}
/*注册获取验证码倒计时*/
var countdown = 60;

function countTime(count) {
	var t = $(".web_register").find("input[name=tel]");
	if(isTel(t) == true) {
		if(countdown == 0) {
			count.removeAttribute("disabled");
			$(count).removeClass("hover");
			count.value = "获取验证码";
			countdown = 60;
		} else {
			count.setAttribute("disabled", true);
			$(count).addClass("hover");
			count.value = "已发送(" + countdown + ")";
			countdown--;
			setTimeout(function() {
				countTime(count);
			}, 1000);
		}
	}
}

//获取验证码
function getPIN(val) {
	var t = $(".web_register").find("input[name=tel]");
	if(isTel(t) == true) {
		/*$.ajax({
			type: "post",
			url: "<?php echo Url::to('/common/get-verify-code')?>",
			data: {
				mobileNum: t.val(),
			},
			async: false,
			cache: false,
			dataType: "json",
			success: function(data) {
				if (data.code == 0) {
					clearTimeout(countTiem());
					countTime(val);
				} else {
					$("#logError").html(data.desc);
				}
			},
			error: function() {
				$("#logError").html("该号码已经注册");
			}
		});*/
		countTime(val);
	}
}