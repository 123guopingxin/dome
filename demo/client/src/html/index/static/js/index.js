var _czc = _czc || [];

function JS_Nav_Img(js_nav,js_img,js_width,scroll){var pro_img=$("#"+js_img),pro_img_li=$("#"+js_img+" li"),pro_img_a=$("#"+js_nav+" a");if(pro_img_a.length==1){pro_img_a.hide();return}var pro_nav_current=0,pro_nav_index=1;pro_img.css("width",js_width*pro_img_li.length+"px");pro_img_a.each(function(index){this._key=index;this.onmouseover=function(){pro_nav_index=this._key;pro_auto ? clearInterval(pro_auto):pro_auto;pro_autoRun()};if(scroll!==false){this.onmouseout=function(){pro_auto=setInterval(function(){pro_autoRun()},5000)}}});var pro_autoRun=function(){pro_img_a.eq(pro_nav_current).removeClass("current");pro_img_a.eq(pro_nav_index).addClass("current");pro_img.animate({marginLeft:(0-pro_nav_index)*js_width+"px"},500);pro_nav_current=pro_nav_index;pro_nav_index=(pro_nav_index>=pro_img_a.length-1)?0:pro_nav_index+1};if(scroll!==false){var pro_auto=setInterval(function(){pro_autoRun()},5000)}};
//宽屏轮换图
var side_stage = $("#JS_side_stage"), side_stage_li = $("#JS_side_stage li"), side_stage_a = $("#JS_side_nav a"), side_width = document.body.clientWidth; var nav_current = 0, nav_index = 1; side_stage_li.css("width", side_width + "px"); $(window).on("resize load",function () { side_width = document.body.clientWidth; side_stage.css("width", side_width * side_stage_li.length + "px"); side_stage_li.css("width", side_width + "px"); nav_index = 0; autoRun() }); side_stage_a.each(function (index) { this._key = index; this.onmouseover = function () { nav_index = this._key; clearInterval(auto); autoRun() }; this.onmouseout = function () { auto = setInterval(function () { autoRun() }, 5000) } }); var autoRun = function () { side_stage_a.eq(nav_current).removeClass("current"); side_stage_a.eq(nav_index).addClass("current"); side_stage.animate({ marginLeft: (0 - nav_index) * side_width + "px" }, 500); nav_current = nav_index; nav_index = (nav_index >= side_stage_a.length - 1) ? 0 : nav_index + 1 }; var auto = setInterval(function () { autoRun() }, 5000);
//更新分站价格
function setPriceData(area){var tc_ids="";$("span.p-price strong").each(function(){tc_ids+=$(this).attr("class").replace("S_","")+","});if(tc_ids.length>0){tc_ids=tc_ids.substring(0,tc_ids.length-1);setJsonpAjax("http://my.shushi100.com/ashx/price_taocan.ashx?myCallback=snp&ids="+tc_ids+"&type=index&area="+area+"&r="+Math.random(),"")}}function snp(add,d){if(d.length==0)return;for(var i=0;i<d.length;i++){$("strong.S_"+d[i].t).html(d[i].p)}}
//高端住宅/个性定制 轮换图
JS_Nav_Img("JS_pro_nav1", "JS_pro_img1", 548);
JS_Nav_Img("JS_pro_nav2", "JS_pro_img2", 548);
JS_Nav_Img("JS_pro_nav3", "lwx_img_slider1", 718);
JS_Nav_Img("JS_pro_nav4", "lwx_img_slider2", 472);
JS_Nav_Img("JS_pro_nav5", "lwx_img_slider3", 472);
JS_Nav_Img("JS_pro_nav6", "lwx_img_slider4", 472);
JS_Nav_Img("JS_pro_nav_product", "lwx_img_slider_product", 400);
JS_Nav_Img("JS_pro_nav7", "lwx_img_slider7", 718);
JS_Nav_Img("JS_pro_nav8", "lwx_img_slider8", 718);
JS_Nav_Img("JS_pro_nav9", "lwx_img_slider9", 718);
JS_Nav_Img("JS_pro_nav10", "lwx_img_slider10", 718);

//工程案例翻页
function project_autoRun() { var c = $(".pro-fl li:lt(4)"); $(".pro-fl .lh").animate({ marginLeft: -234 * 4 + "px" }, 500, function () { $(".pro-fl li:lt(4)").remove(); $(".pro-fl .lh").append(c); $(".pro-fl .lh").css("margin-left", "0px") }) } var project_auto = setInterval(function () { project_autoRun() }, 5000); $(".pro-fl .prev").click(function () { var l = $(".pro-fl .lh li").length - 5; var c = $(".pro-fl li:gt(" + l + ")"); $(".pro-fl li:gt(" + l + ")").remove(); $(".pro-fl .lh").prepend(c).css("margin-left", -234 * 4 + "px"); $(".pro-fl .lh").animate({ marginLeft: "0px" }, 500) }); $(".pro-fl .next").click(function () { project_autoRun() }); $(".pro-fl").mouseover(function () { clearInterval(project_auto) }); $(".pro-fl").mouseout(function () { project_auto = setInterval(function () { project_autoRun() }, 5000) });
//免费设计
var designtype = "";
function check_submit_gcb() {
	designtype = "pingan";
	check_submit();
}
function check_submit() {
	var username = $("#username").val();
	var mobile = $("#mobile").val();
	var city = $("#city").val();
	var _url = $("#url").val();
	var _is_dalibao = $("#dalibao_hidden").val();
	if (username === "") {
		alert("您的称呼不能为空！");
		$("#username").val("");
		$("#username").focus();
		return;
	}
	var myReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if (!myReg.test(mobile)) {
		alert("请填写正确的手机号码！");
		$("#mobile").val("");
		$("#mobile").focus();
		return;
	};
	$("#btn_submit").attr("disabled", true);
	var designmeno = "网站首页";
	if (designtype === "pingan") designmeno = "平安工程保";
	setJsonpAjax(designJsUrl+"?myCallback=submitDesignback&action=submitDesign&Design[name]=" + username + "&Design[mobile]=" + mobile + "&Design[district_id]=" + city + "&Design[note]=" + designmeno + "&Design[is_dalibao]=" + _is_dalibao+ "&Design[url]=" + _url, "");
}

$(function () {
	$("#mobile").focus(function() {
		$(this).css("color", "#666");
		$(this).css("border-color", "#ff6c00");
	});
	$("#mobile").blur(function() {
		$(this).css("border-color", "#ccc");
		if ($(this).val() == "") {
			$(this).css("color", "#ccc");
		}
	});
	$("#username").focus(function() {
		$(this).css("color", "#666");
		$(this).css("border-color", "#ff6c00");
	});
	$("#username").blur(function() {
		$(this).css("border-color", "#ccc");
		if ($(this).val() == "") {
			$(this).css("color", "#ccc");
		}
	});
	//function ProLoad() { setJsonpAjax("http://my.shushi100.com/ashx/area.ashx?myCallback=BindPro&id=0&r=" + Math.random(), "") } ProLoad();
	//$("#province").change(function () { setJsonpAjax("http://my.shushi100.com/ashx/area.ashx?myCallback=BindCity&id=" + $("#province").val() + "&r=" + Math.random(), ""); })
	/*frilink*/
	$("#service .frilink li").click(function(){var frilink_list=$("#service .frilink li");var frilinkdiv_list=$("#service .frilink .frilink_right");frilink_list.removeClass("frilink_check");$(this).addClass("frilink_check");frilinkdiv_list.hide();frilinkdiv_list.eq(frilink_list.index(this)).show()});$(function(){$("#service .frilink .frilink_right").eq(0).show()});


	/*个人信息,选择性别*/
	$('.lwx_select_radio').click(function(){
		$(this).find('input[name=sex]').attr("checked",'checked').end().siblings().find('input[name=sex]').removeAttr("checked");
		$(this).find('.lwx_radio').addClass('lwx_selected_radio').end().siblings().find('.lwx_radio').removeClass('lwx_selected_radio');
	})

	/*修改密码弹出框相关操作*/
	$('#lwx_modify_pw_btn').on('click', function(e) {
		e.preventDefault();
		$('#lwx_modify_password').bPopup({
			speed: 650,
			closeClass: 'b-close'
		});
	});
	$(".lwx_save_btn").on('click', function(){
		var pw=$('.lwx_pw_box input[type=password]');
		var idx=-1;
		var pw1=$('.lwx_new_pw1'),pw2=$('.lwx_new_pw2')
		pw.each(function(index,value){
			if($(this).val()==''){
				idx=index;
				return false;
			}
		})
		if(idx!=-1){
			var error="<p class='lwx_error_tips'>该文本框不能为空</p>"
			pw.eq(idx).after(error);
		}
		else{
			if(pw1.val()!=pw2.val()&&pw2.val()!=''){
				var error="<p class='lwx_error_tips'>两次输入新密码不一致</p>";
				pw2.after(error);
			}
			else{
				var password = $("#password").val();
				$.post('/my/ajax-validate-password', {password: password}, function (data) {
					if(data.ok=='Failed'){
						var error="<p class='lwx_error_tips'>原密码不正确</p>"
						pw.eq(0).after(error);
					}else {
						$(".b-close").trigger("click");
						$('.lwx_modify_success_box').bPopup({
							autoClose: 2000
						},function(){
							$('#safe-setting-form').submit();
						});

					}
				}, "JSON");

			}
		}



	})

	$('.lwx_pw_box input[type=password]').focus(function(){
		$(this).siblings('p').remove();
	})
	/*首页左侧导航固定*/
	/*if($(".index_sale_box").length>0){
		var saleBoxOffset = $(".index_sale_box").offset().top;
		$(window).scroll(function () {
			var scrollTop = $(document).scrollTop();
			if(scrollTop > saleBoxOffset) {
				$(".left_fixed_nav").show();
			} else {
				$(".left_fixed_nav").hide();
			}
		})
	}*/
});

function submitDesignback(data) {
	if (data == 1) {
		if($("#mobile").val()){
			_hmt.push(['_trackEvent', 'PC站_免费设计_网站首页', 'click', $("#mobile").val()]);
		}
		alert("申请成功，请您保持电话畅通。");
		$("#applysucceed").show();
		$("#apply").hide();
	} else if (data == 2) {
		alert("请勿重复申请设计！\n如需详细了解,可到当地体验店咨询！\n或致电 全国服务电话：400-6918-100")
	} else {
		alert("申请失败")
	}
}

// function BindCity(data) {
// 	$("#city")[0].options.length = 1;
// 	$.each(data, function(i, n) {
// 		$("#city")[0].options.add(new Option(n.name, n.id))
// 	});
// 	$("#city").val(citynamedata.cityid);
// }

// function BindPro(data) {
// 	$("#province")[0].options.length = 1;
// 	$.each(data, function(i, n) {
// 		$("#province")[0].options.add(new Option(n.name, n.id))
// 	});
// 	setJsonpAjax("http://my.shushi100.com/ashx/GetCityName.ashx?myCallback=BindProName&r=" + Math.random(), "");
// }
// var citynamedata;

// function BindProName(data) {
// 	citynamedata = data;
// 	$("#province").val(data.parentid);
// 	setJsonpAjax("http://my.shushi100.com/ashx/area.ashx?myCallback=BindCity&id=" + $("#province").val() + "&r=" + Math.random(), "");
// }
//统计点击量
//setCityClick();

/*购买数量增减操作*/
function numUpdate(kind,obj){
	var c_input=$(obj).siblings('.curr-num');
	var count=c_input.val();
	if(kind == "up"){
		count++;
	}else if(kind == "down"){
		if(count > 1) count--;
	}
	c_input.val(count);
}


/*加入购物车+1效果*/
(function ($) {
	$.extend({
		tipsBox: function (options) {
			options = $.extend({
				obj: null,  //jq对象，要在那个html标签上显示
				str: "+1",  //字符串，要显示的内容;也可以传一段html
				startSize: "12px",  //动画开始的文字大小
				endSize: "30px",    //动画结束的文字大小
				interval: 600,  //动画时间间隔
				color: "#ff5500",    //文字颜色
				callback: function () { }    //回调函数
			}, options);
			$("body").append("<span class='num'>" + options.str + "</span>");
			var box = $(".num");
			var left = options.obj.offset().left + options.obj.width() / 2;
			var top = options.obj.offset().top - options.obj.height()+10;
			box.css({
				"position": "absolute",
				"left": left + "px",
				"top": top + "px",
				"z-index": 9999,
				"font-size": options.startSize,
				"line-height": options.endSize,
				"color": options.color
			});
			box.animate({
				"font-size": options.endSize,
				"opacity": "0",
				"top": top - parseInt(options.endSize) + "px"
			}, options.interval, function () {
				box.remove();
				options.callback();
			});
		}
	});
})(jQuery);
/*舒适礼包轮换*/
function ImgLunhuan() {
	var proImgObj = $(".libao_lunhuan ul");
	var proImgItems = proImgObj.find("li");
	var proImgNum = proImgItems.length;
	var prevBtn = $(".libao_lunhuan_wrap .prev_btn");
	var nextBtn = $(".libao_lunhuan_wrap .next_btn");
	var left = 0;
	proImgObj.css("width", proImgNum * 227);
	function clickChangePic(obj, direction) {
		if (obj.hasClass("enable")) {
			left -= 227 * direction;
			proImgObj.animate({
				"left": left + "px"
			})
		}
		if (left == 0 && direction < 0) {
			prevBtn.removeClass("enable");
		} else {
			prevBtn.addClass("enable");
		}
		if (left == 1135 - proImgObj.width() && direction > 0) {
			nextBtn.removeClass("enable");
		} else {
			nextBtn.addClass("enable");
		}
	}
	if (proImgNum > 5) {
		nextBtn.addClass("enable");
		prevBtn.on("click", function () {
			clickChangePic($(this), -1)
		});
		nextBtn.on("click", function () {
			clickChangePic($(this), 1)
		});
	}
}
ImgLunhuan();

/*免费设计&&享工程保切换样式*/
$('.design_title a').click(function(){
	var index=$('.design_title a').index(this);
	$(this).addClass('current');
	$(this).siblings().removeClass('current');
	var tabContent = $(this).parents(".design_title").next(".dsg_content").find("ul");
    tabContent.hide();
    tabContent.eq(index).show();
	$('#applysucceed>div').eq(index).show();
	$('#applysucceed>div').eq(index).siblings('div').hide();
})