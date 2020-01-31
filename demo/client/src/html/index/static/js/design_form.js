var _czc = _czc || [];
var error_info=$(".lwx_tips_box_content p");
var time_btn;//倒计时按钮
var time_bool=false,sub_bool=false,timeloop;
var dtd=$.Deferred();

/*城市级联*/
function ipCity(){
    var url=$(".district_ajax_url").val();
    if(!url)return;
    $.get(url,function(data){
        var levelDst=new LevelDistrict({parentNode:$("#selectDistrict"),level:2,defaultValue:[data.parent_id,data.district_id],json:data.district});
        levelDst.on("assign",function(new_list){//创建监听事件，把值赋到指定文本框
            var valArray=[];
            for(var i=0;i<new_list.length;i++){
                valArray[i]=new_list.eq(i).val();
            }
            $(".hide_district_val").val(valArray.pop());
            if($(".dalibao").text().length<1)return;
            if($(".hide_district_val").val()==1381){
                $(".dalibao input[type=checkbox]").prop("checked",true);
                $("input[name=is_dalibao]").val(1);
                $(".dalibao").show();
            }else{
                $(".dalibao").hide();
                $("input[name=is_dalibao]").val(0);
            }
        });
    })

}

ipCity();

function clearInputData(form){
    form.find("input:not(input[type=hidden],input[type=button])").val("");
    form.find("select").val("0");
    countdown=0;//结束倒计时按钮
}

//倒计时
var countdown=60;
function cotDown(obj){
    if (countdown == 0) {
        time_bool=false;
        obj.removeAttribute("disabled");
        obj.className = "verification_code";
        obj.value = "获取验证码";
        countdown = 60;
        clearInterval(timeloop);
        return false;
    } else {
        obj.setAttribute("disabled", true);
        obj.className = "verification_code disclick";
        obj.value = "重新发送" + countdown + "s";
        countdown--;
    }
}
//验证手机号码
function isPhoneNum(mobile_input,mobile,obj) {
    var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (mobile == "") {
        error_info.text("手机号码不能为空");
        $(".lwx_tips_box").bPopup({
            speed: 250,
            closeClass: "b-close",
            onClose: function () {
                time_bool=false;
                obj.disabled=false;
            }
        });
        mobile_input.focus();
        return false;
    }
    if (!myreg.test(mobile)) {
        error_info.text("请输入有效的手机号码");
        $(".lwx_tips_box").bPopup({
            speed: 250,
            closeClass: "b-close",
            onClose: function () {
                time_bool=false;
                obj.disabled=false;
            }
        });
        mobile_input.focus();
        return false;
    } else {
        return true;
    }
}

/*发送验证码*/
function settime(obj) {
    obj.disabled=true;
    if(!time_bool) {
        time_bool=true;
        time_btn = obj;
        var ajax_url=$(obj).parents("form").find(".sms_ajax_url").val();
        var mobile_input = $(obj).parents("form").find(".js_mobile");
        var mobile = mobile_input.val();
        var product_id = $(obj).parents("form").find("input[name=product_id]").val();//预约商品属性
        var type=$(obj).parents("form").find(".js_type").val();
        var category=$(obj).parents("form").find(".js_category").val();
        var result = isPhoneNum(mobile_input, mobile,obj);
        if (result) {
            $.ajax({
                url: ajax_url,
                type: "POST",
                dataType: "json",
                data: {mobile: mobile,type:type||"",category:category||"",product_id:product_id||""},
                success: function (data) {
                    if (data.ok == 1) {
                        cotDown(obj);
                        timeloop = setInterval(function () {
                            cotDown(obj)
                        }, 1000);
                    } else {
                        error_info.text(data.error);
                        $(".lwx_tips_box").bPopup({
                            speed: 250,
                            closeClass: "b-close",
                            onClose: function () {
                                time_bool=false;
                                obj.disabled=false;
                            }
                        });
                    }
                },
                error: function () {
                    error_info.text("获取验证码失败，请重试");
                    $(".lwx_tips_box").bPopup({
                        speed: 250,
                        closeClass: "b-close",
                        onClose: function () {
                            time_bool=false;
                            obj.disabled=false;
                        }
                    });
                }
            });
            return false;
        }
    }
}
/*提交*/
function jike_sub(obj,jikeCallback,handleData){//handleData提交之前执行函数，jikeCallback提交之后执行函数
    obj.disabled=true;
    if(!sub_bool) {
        sub_bool=true;
        if(handleData&&typeof handleData==="function"){
            handleData()
        }
        var form = $(obj).parents("form");
        var action = $(obj).parents("form").attr("action");
        var trackKey = $(obj).parents("form").find("input[name=track_key]").val();
        var _mobile = $(obj).parents("form").find(".js_mobile").val();
        var desc=$(obj).parents("form").find("input[name=desc]").val()||"click";
        var success_tips=$(obj).parents("form").find(".success_tips").val();
        success_tips=(success_tips&&success_tips.length>0)?success_tips:"提交成功";
        $.ajax({
            url: action,
            type: "POST",
            dataType: "json",
            data: $(obj).parents("form").serialize(),
            success: function (data) {
                if(trackKey){
                    var error = data.error||"";
                    var model = data.model||0;
                    if(action.indexOf("quote") > 0 ){ //一分钟报价
                        $.ajax({
                            url:"/quote/ajax-quote-ga",
                            type:"POST",
                            async:false,
                            dataType:"json",
                            data:$(obj).parents("form").serialize()+"&ok="+data.ok+"&error="+error+"&model="+model+"&popup_type=FastRecordNewForm"
                        });
                    }else if(action.indexOf("design") > 0 ){//免费设计
                        $.ajax({
                            url:"/site/ajax-design-ga",
                            type:"POST",
                            async:false,
                            dataType:"json",
                            data:$(obj).parents("form").serialize()+"&ok="+data.ok+"&error="+error+"&model="+model
                        });
                    }
                    ga('send', 'event', trackKey, desc,_mobile,1,'');
					if(_mobile){
                    	_hmt.push(["_trackEvent", trackKey, desc, _mobile]);
					}
                }
                if (data.ok == 1) {
                    if(data.success_tips) success_tips= data.success_tips;
                    error_info.text(success_tips);
                    $(".lwx_tips_box").bPopup({
                        speed: 250,
                        closeClass: "b-close",
                        onClose: function () {
                            sub_bool=false;
                            obj.disabled=false;
                            if(jikeCallback&&typeof jikeCallback==="function"){
                                jikeCallback(data)
                            }else{
                                if (typeof hidePopup === "function") {
                                    hidePopup();
                                }
                            }
                            if (typeof clearInputData === "function") {
                                clearInputData(form);
                            }
                            dtd.resolve();
                            if($(obj).parents("form").find(".js_category").val()==172){//8周年专题申请人数加1
                                SurNumAdd();
                            }
                        }
                    });
                } else {
                    error_info.text(data.error);
                    $(".lwx_tips_box").bPopup({
                        speed: 250,
                        closeClass: "b-close",
                        onClose: function () {
                            sub_bool=false;
                            obj.disabled=false;
                        }
                    });
                }
            },
            error: function () {
                error_info.text("提交失败，请重试");
                $(".lwx_tips_box").bPopup({
                    speed: 250,
                    closeClass: "b-close",
                    onClose: function () {
                        sub_bool=false;
                        obj.disabled=false;
                        if(jikeCallback&&typeof jikeCallback==="function"){
                            jikeCallback()
                        }else{
                            if (typeof hidePopup === "function") {
                                hidePopup();
                            }
                        }
                        if (typeof clearInputData === "function") {
                            clearInputData(form);
                        }

                    }
                });
            }
        });
        return false;
    }
}

