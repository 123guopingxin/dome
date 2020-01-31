/**
 * Created by klint on 2016/10/31.
 */
/*站长统计工具*/
var _czc = _czc || []; /*浮动-弹出-效果*/
var bottom_pic = 0;
$(".footer_wrap").css("left", "-100%");
$(function() {
    $(".free_apply .pic2").click(function() {
        bottom_pic = 1;
        $(".footer_wrap").animate({
            "left": "-100%"
        }, 500, function() {
            $(".footer").css("display", "none");
            $(".bottom_pic").css("display", "block");
            $(".bottom_pic_wrap").animate({
                "left": "0"
            }, 500);
        });
    });
    $(".bottom_pic_wrap").click(function() {
        bottom_pic = 0;
        $(".bottom_pic_wrap").animate({
            "left": "-100%"
        }, 500, function() {
            $(".bottom_pic").css("display", "none");
            $(".footer").css("display", "block");
            $(".footer_wrap").animate({
                "left": "0"
            }, 500);
        });
    });
});
$(window).bind("scroll", function() {
    var j = $(document).scrollTop();
    if (j > $(window).height()) {
        if (bottom_pic == 0) {
            $(".footer").css("display", "block");
            $(".footer_wrap").css("left", "0");
            $(".bottom_pic_wrap").css("left", "-100%");
        } else {
            $(".bottom_pic").css("display", "block");
            $(".footer_wrap").css("left", "-100%");
            $(".bottom_pic_wrap").css("left", "0");
        }
    } else {
        $(".footer").css("display", "none");
        $(".bottom_pic").css("display", "none");
        $(".footer_wrap").css("left", "-100%");
        $(".bottom_pic_wrap").css("left", "-100%");
    }
}) /*底部浮动-免费设计*/
$("#design_username").focus(function() {
    $(this).css("color", "#666");
    $(this).css("border-color", "#ff6c00");
});
$("#design_username").blur(function() {
    $(this).css("border-color", "#aaa");
    if ($(this).val().replace(" ", "") == "") {
        $(this).css("color", "#aaa");
    }
});
$("#design_mobile").focus(function() {
    $(this).css("color", "#666");
    $(this).css("border-color", "#ff6c00");
});
$("#design_mobile").blur(function() {
    $(this).css("border-color", "#aaa");
    if ($(this).val().replace(" ", "") == "") {
        $(this).css("color", "#aaa");
    }
});
$("#design_area").focus(function() {
    $(this).css("color", "#666");
    $(this).css("border-color", "#ff6c00");
});
$("#design_area").blur(function() {
    $(this).css("border-color", "#aaa");
    if ($(this).val().replace(" ", "") == "") {
        $(this).css("color", "#aaa");
    }
});
$("#housetype").change(function() {
    if ($(this).val().replace(" ", "") == "") {
        $(this).css("color", "#aaa");
    } else {
        $(this).css("color", "#666");
    }
});

function check_username() {
    if ($('#design_username').val().replace("您的称呼", "") == "") {
        $(".error_info .erro").html('<em></em>您的称呼不能为空！');
        g('design_username').focus();
        return false;
    }
    if (!is_forbid(g('design_username').value)) {
        $(".error_info .erro").html('<em></em>您的称呼包含了非法字符');
        $("#design_username").val("");
        g('design_username').focus();
        return false;
    }
    return true;
}

function check_mobile() {
    if ($('#design_mobile').val().replace("您的电话", "") == "") {
        $(".error_info .erro").html('<em></em>您的电话不能为空！');
        g('design_mobile').focus();
        return false;
    }
    if (g('design_mobile').value != '') {
        var myReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!myReg.test(g('design_mobile').value)) {
            $(".error_info .erro").html('<em></em>您的电话格式不正确');
            g('design_mobile').focus();
            return false;
        }
    }
    return true;
}

function check_design_area() {
    if (isEmpty('design_area')) {
        $(".error_info .erro").html('<em></em>您的面积不能为空！');
        g('design_area').focus();
        return false;
    }
    if (g('design_area').value != '') {
        var myReg1 = /^\d+$/;
        if (!myReg1.test(g('design_area').value)) {
            $(".error_info .erro").html('<em></em>您的面积格式不正确');
            g('design_area').focus();
            return false;
        }
    }
    return true;
}

function submitDesign() {
    $(".error_info .erro").html('');
    if (!check_username()) {
        return;
    }
    if (!check_mobile()) {
        return;
    }
    if (!check_design_area()) {
        return;
    }
    if (isEmpty('housetype')) {
        $(".error_info .erro").html('<em></em>请选择房型');
        g('housetype').focus();
        return;
    }
    g('design_btn').disabled = true;
    setJsonpAjax(designJsUrl+"?myCallback=submitBottomDesignback&action=submitDesign&Design[name]=" + g('design_username').value + "&Design[mobile]=" + g('design_mobile').value + "&Design[dictionary_id]=" + g('housetype').value + "&Design[area]=" + g('design_area').value + "&Design[note]=首页底部悬浮", "")
}

function submitBottomDesignback(data) {
    g('design_btn').disabled = false;
    if (data == 1) {
		if($('#design_mobile').val()){
        	_hmt.push(['_trackEvent', 'PC站_免费设计_底部通栏', 'click', $('#design_mobile').val()]);
		}
        $('#design_username').val("");
        $('#design_mobile').val("") ;
        $('#design_area').val("") ;
        alert("恭喜您申请成功! 为详细了解您的设计需求，舒适100网客服人员会在24小时内与您联系，\r\n如有疑问请致电400-6918-100");
    } else if (data == 2) {
        alert("请勿重复申请设计！\n如需详细的咨询！可到当地体验店详询！\n或致电 全国服务电话：400-6918-100")
    } else {
        alert("提交失败，请重试！您也可以直接致电400-6918-100");
    }
}