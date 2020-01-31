//开始倒计时

/* var countdown = 60;
function settime(obj) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.className = '';
        obj.value = "发送验证码";
        countdown = 60;
        return false;
    } else {
        obj.setAttribute("disabled", true);
        obj.className = 'disclick';
        obj.value = "重新发送" + countdown + "s";
        countdown--;
    }
    setTimeout(function () {
        settime(obj)
    }, 1000); //每1000毫秒执行一次
} */
//发送验证码
/* function sendCode(obj, check_url, send_url) {
    var mobile = $("#mobile").val();
    //检查手机是否合法
    var result = isPhoneNum(mobile);
    if (result) {//检查手机号码是否存在
        var exists_result = dbCheckMobileExists(check_url, {"mobile": mobile});
        if (exists_result) {
            $.post(send_url, {mobile: mobile, type: 'reg'}, function (data) {
                if (data.ok == 1) {
                    settime(obj);//开始倒计时
                }
            }, "JSON");
        }
    }
} */

//校验手机号是否合法
function isPhoneNum(mobile) {
    var myreg = /^1[3456789]\d{9}$/;
    if (mobile == '') {
        // alert('手机号码不能为空!');
		
        $(".lwx_tips_box_content p").html("手机号码不能为空");
        $(".lwx_tips_box").bPopup({
            speed: 250,
            closeClass: "b-close"
        });
        $("#mobile").focus();
        return false;
    }
    if (!myreg.test(mobile)) {
        // alert('请输入有效的手机号码！');
		
        $(".lwx_tips_box_content p").html("请输入有效的手机号码");
        $(".lwx_tips_box").bPopup({
            speed: 250,
            closeClass: "b-close"
        });
        $("#mobile").focus();
		
        return false;
    } else {
        return true;
    }
}
$(()=>{
//设置密码
  $('#pwd').blur(function(){
	 let val=$.trim($(this).val());
	 if(/^[a-zA-Z0-9]{3,6}$/.text(val))
	 $(".aa").text("");
 } else {
	$(".aa").text("密码不规范！");
 }
 )
})

//检查手机号码是否存在
/* function dbCheckMobileExists(url, queryParam) {
    var res = null;
    $.ajax({
        async: false,
        cache: false,
        type: 'POST',
        url: url,// 请求的action路径
        data: queryParam,
        dataType: 'json',
        error: function () {// 请求失败处理函数
        },
        success: function (result) {
            if (result.ok == 'Success') {
                // alert('手机号码被占用！');
                $(".lwx_tips_box_content p").html("手机号码被占用");
                $(".lwx_tips_box").bPopup({
                    speed: 250,
                    closeClass: "b-close"
                });
                return false;
            } else {
                res = true;
            }
        }
    });
    return res;
}
 */
//同意协议时和按钮样式相对应
$('#protocol').click(function(){

    if(!$(this).is(':checked')){
        $('.btn-regist').css({'background':'#ddd','cursor':'default'});
        $('.btn-regist').attr('disabled','disabled');   //disabled 禁用input
    }
    else{
		
		
        $('.btn-regist').css({'background':'#ff5500','cursor':'pointer'});
         $('.btn-regist').removeAttr('disabled');
    }
})

//看协议时的弹窗
// $("#login").load("static/html/login.html",function(){
	$('.lwx_xieyi_click').click(function () {
	console.log(1);
    $('#lwx_xieyi').bPopup({
        speed: 250,
        closeClass: 'b-close'
    });
});
// })

