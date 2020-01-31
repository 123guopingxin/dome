/*nav*/
//$(function(){if($.browser.msie&&$.browser.version==6){$('#allsort-nav > li').hover(function(){var $slideDiv=$(this).find('div.item-box');if($slideDiv.length===0){return}$(this).children("a").addClass("hover");$slideDiv.show();$(this).append('<iframe id="selectMask" style="position:absolute;left:0;z-index:-1;" frameborder="0"></iframe>');$('#selectMask').height($slideDiv.height()+3).width($slideDiv.width()+6)},function(){var $that=$(this);var $slideDiv=$(this).find('div.item-box');if($slideDiv.length===0){return}$slideDiv.hide(0);$(this).find('iframe').remove().children("a").removeClass('hover')});try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}}$("#allsort-nav > li").hover(function(){var $slideDiv=$(this).find('div.item-box');if($slideDiv.length===0){return}$(this).children("a").addClass("hover");$slideDiv.show()},function(){var $that=$(this);var $slideDiv=$(this).find('div.item-box');if($slideDiv.length===0){return}$slideDiv.hide();$(this).children("a").removeClass('hover')});$("#hd2 li.myPage").hover(function(){$(this).children("ul").show();$(this).addClass("hover");$(this).css({paddingLeft:"10px",paddingRight:"11px",marginTop:"-1px"})},function(){$(this).children("ul").hide();$(this).removeClass("hover");$(this).css({paddingLeft:"11px",paddingRight:"11px",marginTop:"0px"})});$(window).bind("scroll",function(){if($(document).scrollTop()==0){$("#rttop .desgin a").css("border-bottom","solid 1px #eee");$("#rttop .top").hide();}else{$("#rttop .desgin a").css("border-bottom","none");$("#rttop .top").show();}});$(".shouqi").click(function(){$('.rttop1').hide();$('.rttop2').show()});$(".rttop2").click(function(){$('.rttop2').hide();$('.rttop1').show()});if ($.cookie("city") && $.cookie("city").split('|')[0] != 'www') { var ybfcityename = $.cookie("city").split('|')[0];if ($("#top_ybf").length > 0) {$("#top_ybf").attr("href", $("#top_ybf").attr("href").replace("wuhan", ybfcityename))}}});

/*shortcutSub*/
(function($){$.fn.hoverForIE6=function(option){var s=$.extend({current:"hover",delay:10},option||{});$.each(this,function(){var timer1=null,timer2=null,flag=false;$(this).bind("mouseover",function(){if(flag){clearTimeout(timer2)}else{var _this=$(this);timer1=setTimeout(function(){_this.addClass(s.current);flag=true},s.delay)}}).bind("mouseout",function(){if(flag){var _this=$(this);timer2=setTimeout(function(){_this.removeClass(s.current);flag=false},s.delay)}else{clearTimeout(timer1)}})})}})(jQuery);
/*myTab*/
(function($){$.fn.myTab=function(option,callback){if(!this.length){return}if(typeof option=="function"){callback=option;option={}};var s=$.extend({type:"static",auto:false,source:"data",event:"mouseover",currClass:"curr",tab:".tab",content:".tabcon",itemTag:"li",stay:5000,delay:100,mainTimer:null,index:0},option||{});var tabItem=$(this).find(s.tab).eq(0).find(s.itemTag),contentItem=$(this).find(s.content);if(tabItem.length!=contentItem.length)return false;var reg=s.source.toLowerCase().match(/http:\/\/|\d|\.aspx|\.ascx|\.asp|\.php|\.html\.htm|.shtml|.js|\W/g);var init=function(n,tag){tabItem.removeClass(s.currClass);contentItem.hide();if(tag){s.index++;if(s.index==tabItem.length)s.index=0}else{s.index=n};show()};var autoSwitch=function(){s.mainTimer=setInterval(function(){init(s.index,true)},s.stay)};var show=function(){tabItem.eq(s.index).addClass(s.currClass);contentItem.eq(s.index).show();switch(s.type){default:case"static":var source="";break;case"dynamic":var source=(reg==null)?tabItem.eq(s.index).attr(s.source):s.source;tabItem.eq(s.index).removeAttr(s.source);break};if(callback){callback()}};tabItem.each(function(n){$(this).bind(s.event,function(){clearInterval(s.mainTimer);init(n,false)}).bind("mouseleave",function(){if(s.auto){autoSwitch()}else{return}})});if(s.type=="dynamic"){init(s.index,false)};if(s.auto){autoSwitch()}}})(jQuery);
/*floatNav*/
(function($){$.fn.floatNav=function(c){if(!this.length){return}var d=$.extend({start:null,end:null,fixedClass:"nav-fixed",anchor:null,targetEle:null,range:0},c);var g=$(this),h=g.height(),f=g.width(),b=$('<div class="float-nav-wrap"/>');g.css({height:h,width:f});if(!g.parent().hasClass("float-nav-wrap")){g.wrap(b.css("height",h))}$(window).bind("scroll",function(){var j=$(document).scrollTop(),l=g.find("a").eq(0).attr("href"),n=d.start||g.parent(".float-nav-wrap").offset().top,m=d.targetEle?$(d.targetEle).offset().top:10000;if(j>n&&j<(d.end||m)-d.range){g.addClass(d.fixedClass);if(d.anchor&&l!==d.anchor){g.find("a").attr("href",d.anchor)}}else{g.removeClass(d.fixedClass);if(d.anchor){g.find("a").attr("href","javascript:;")}}});return this}})(jQuery);
/*imgScroll*/
(function(e){e.fn.imgScroll=function(t,i){var s={evtType:"click",visible:1,direction:"x",next:"#next",prev:"#prev",disableClass:"disabled",disableClassPerfix:!1,speed:300,step:1,loop:!1,showControl:!1,width:null,height:null,navItems:!1,navItmesWrapClass:"scroll-nav-wrap",navItemActivedClass:"current",status:!1,statusWrapSelector:".scroll-status-wrap"},a=e.extend(s,t);return this.each(function(){function t(e){h>=k+$&&!w?(g.addClass(I),v.removeClass(N)):w||v.addClass(N),"left"!==m.eq(0).css("float")&&m.css("float","left"),u=a.width||m.eq(0).outerWidth(),f=a.height||m.eq(0).outerHeight(),d.css({position:"static"==d.css("position")?"relative":d.css("position"),width:"x"==e?u*$:u,height:"x"==e?f:f*$,overflow:"hidden"}),p.css({position:"absolute",width:"x"==e?u*h:u,height:"x"==e?f:f*h,top:0,left:0}),"function"==typeof i&&i.apply(d,[C,b,m.slice(C*k,C*k+$),m.slice(C*k+$-k,C*k+$)])}function s(e,t){function s(){w?(R=$>=h-e*k?!0:!1,D=0>=e?!0:!1):($>=h-e*k?(v.addClass(N),R=!0):(v.removeClass(N),R=!1),0>=e?(g.addClass(I),D=!0):(g.removeClass(I),D=!1)),(T||P)&&l(e),"function"==typeof i&&i.apply(d,[e,b,m.slice(e*k,e*k+$),m.slice(e*k+$-k,e*k+$)])}if(p.is(":animated"))return!1;if(w)D&&t&&(C=b),R&&!t&&(C=-1),e=t?--C:++C;else{if(D&&t||R&&!t)return!1;e=t?--C:++C}c="x"==y?{left:e>=b-1?-(h-$)*u:-e*k*u}:{top:e>=b-1?-(h-$)*f:-e*k*f},a.speed?p.animate(c,a.speed,s):(p.css(c),s())}function o(t,i){for(var s=S?e("."+t).eq(0):e('<div class="'+t+'"></div>'),a=0;b>a;a++)s.append("<em "+(0===a?" class="+i:"")+' title="'+(a+1)+'">'+(a+1)+"</em>");S||d.after(s)}function n(){var t=E?e(L).eq(0):e('<div class="'+L.replace(".","")+'"></div>');t.html("<b>1</b>/"+b),E||d.after(t)}function l(t){T&&e("."+j).find("em").removeClass(W).eq(t).addClass(W),P&&e(L).html("<b>"+(t+1)+"</b>/"+b)}function r(){g.unbind(x).bind(x,function(){s(C,!0)}),v.unbind(x).bind(x,function(){s(C,!1)})}var c,d=e(this),p=d.find("ul").eq(0),m=p.children("li"),h=m.length,u=null,f=null,v="string"==typeof a.next?e(a.next):a.next,g="string"==typeof a.prev?e(a.prev):a.prev,C=0,k=a.step,$=a.visible,b=Math.ceil((h-$)/k)+1,w=a.loop,y=a.direction,x=a.evtType,_=a.disableClass,I=a.disableClassPerfix?"prev-"+_:_,N=a.disableClassPerfix?"next-"+_:_,T=a.navItems,j=a.navItmesWrapClass,S=e("."+j).length>0,W=a.navItemActivedClass,P=a.status,L=a.statusWrapSelector,E=e(L).length>0,R=!1,D=!0;h>$&&$>=k?(t(y),r(),T&&o(j,W),P&&n(L)):(a.showControl?v.add(g).show():v.add(g).hide(),g.addClass(I),v.addClass(N))})}})(jQuery);
/*mySlide*/
(function(a){a.fn.mySlide=function(k){var p=a.extend({width:null,height:null,pics:[],index:0,type:"num",current:"curr",delay1:100,delay2:5000},k||{});var i=this;var g,f,d,h=0,e=true,b=true;var n=p.pics.length;var o=function(){var q="<ul style='position:absolute;top:0;left:0;'><li><a href='"+p.pics[0].href+"' target='_blank'><img src='"+p.pics[0].src+"' width='"+p.width+"' height='"+p.height+"' /></a></li></ul>";i.css({position:"relative"}).html(q);a(function(){c()})};o();var j=function(){var s=[];s.push("<div>");var r;var q;for(var t=0;t<n;t++){r=(t==p.index)?p.current:"";switch(p.type){case"num":q=t+1;break;case"string":q=p.pics[t].alt;break;case"image":q="<img src='"+p.pics[t].breviary+"' />";default:break}s.push("<span class='");s.push(r);s.push("'><a href='");s.push(p.pics[t].href);s.push("' target='_blank'>");s.push(q);s.push("</a></span>")}s.push("</div>");i.append(s.join(""));i.find("span").bind("mouseover",function(){b=false;clearTimeout(g);clearTimeout(d);var u=i.find("span").index(this);if(p.index==u){return}else{d=setInterval(function(){if(e){l(u)}},p.delay1)}}).bind("mouseleave",function(){b=true;clearTimeout(g);clearTimeout(d);g=setTimeout(function(){l(p.index+1,true)},p.delay2)})};var l=function(r,q){if(r==n){r=0}f=setTimeout(function(){i.find("span").eq(p.index).removeClass(p.current);i.find("span").eq(r).addClass(p.current);m(r,q)},20)};var m=function(u,q){var s=parseInt(h);var v=Math.abs(s+p.index*p.height);var t=Math.abs(u-p.index)*p.height;var r=Math.ceil((t-v)/4);if(v==t){clearTimeout(f);if(q){p.index++;if(p.index==n){p.index=0}}else{p.index=u}e=true;if(e&&b){clearTimeout(g);g=setTimeout(function(){l(p.index+1,true)},p.delay2)}}else{if(p.index<u){h=s-r;i.find("ul").css({top:h+"px"})}else{h=s+r;i.find("ul").css({top:h+"px"})}e=false;f=setTimeout(function(){m(u,q)},20)}};var c=function(){var q=[];for(var r=1;r<n;r++){q.push("<li><a href='");q.push(p.pics[r].href);q.push("' target='_blank'><img src='");q.push(p.pics[r].src);q.push("' width='");q.push(p.width);q.push("' height='");q.push(p.height);q.push("' /></a></li>")}i.find("ul").append(q.join(""));g=setTimeout(function(){l(p.index+1,true)},p.delay2);if(p.type){j()}}}})(jQuery);
/*Ebuyropdown*/
(function(a){a.fn.Ebuyropdown=function(d,e){if(!this.length){return};if(typeof d=="function"){e=d;d={}};var c=a.extend({event:"mouseover",current:"hover",delay:0},d||{});var b=(c.event=="mouseover")?"mouseout":"mouseleave";a.each(this,function(){var h=null,g=null,f=false;a(this).bind(c.event,function(){if(f){clearTimeout(g)}else{var j=a(this);h=setTimeout(function(){j.addClass(c.current);f=true;if(e){e(j)}},c.delay)}}).bind(b,function(){if(f){var j=a(this);g=setTimeout(function(){j.removeClass(c.current);f=false},c.delay)}else{clearTimeout(h)}})})}})(jQuery);
/*Elazyload*/
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
/*lazyload*/
$("[data-original]").lazyload({effect: "fadeIn",placeholder:"/img/opacity1.png"});
/*Marquee*/
function SsMarqueeDown(t_demo,t_demo1,t_demo2,speed){var t=document.getElementById(t_demo);if(t==null){return false}var t1=document.getElementById(t_demo1);var t2=document.getElementById(t_demo2);t2.innerHTML=t1.innerHTML;function Marquee(){if(t2.offsetTop-t.scrollTop<=0){t.scrollTop-=t1.offsetHeight}else{t.scrollTop++}}var MyMar=setInterval(Marquee,speed);t.onmouseover=function(){clearInterval(MyMar)};t.onmouseout=function(){MyMar=setInterval(Marquee,speed)}}function SsMarquee(t_demo,t_demo1,speed){var t1=document.getElementById(t_demo);if(t1==null){return false}var t=t1.scrollWidth;var t2=document.getElementById(t_demo1);t2.innerHTML+=t2.innerHTML;function doMarquee(){t1.scrollLeft=t1.scrollLeft<t1.scrollWidth-t1.offsetWidth?t1.scrollLeft+1:t-t1.offsetWidth}var MyMar=setInterval(doMarquee,speed);t1.onmouseover=function(){clearInterval(MyMar)};t1.onmouseout=function(){MyMar=setInterval(doMarquee,speed)}}function startmarquee(lh,speed,delay,idname){var t;var p=false;var o=document.getElementById(idname);if(o==null){return false}if(o.scrollHeight<(lh+1)){return false}o.innerHTML+=o.innerHTML;o.onmouseover=function(){p=true};o.onmouseout=function(){p=false};o.scrollTop=0;function start(){t=setInterval(scrolling,speed);if(!p)o.scrollTop+=2}function scrolling(){if(o.scrollTop%lh!=0){o.scrollTop+=2;if(o.scrollTop>=o.scrollHeight/2)o.scrollTop=0}else{clearInterval(t);setTimeout(start,delay)}}setTimeout(start,delay)}
/*openthickBox*/
//(function($){$.extend($.browser,{client:function(){return{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,bodyWidth:document.body.clientWidth,bodyHeight:document.body.clientHeight}},scroll:function(){return{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,bodyWidth:document.body.scrollWidth,bodyHeight:document.body.scrollHeight,left:document.documentElement.scrollLeft+document.body.scrollLeft,top:document.documentElement.scrollTop+document.body.scrollTop}},screen:function(){return{width:window.screen.width,height:window.screen.height}},isIE6:$.browser.msie&&$.browser.version==6,isMinW:function(val){return Math.min($.browser.client().bodyWidth,$.browser.client().width)<=val},isMinH:function(val){return $.browser.client().height<=val}})})(jQuery);(function($){$.fn.hoverForIE6=function(option){var s=$.extend({current:"hover",delay:10},option||{});$.each(this,function(){var timer1=null,timer2=null,flag=false;$(this).bind("mouseover",function(){if(flag){clearTimeout(timer2)}else{var _this=$(this);timer1=setTimeout(function(){_this.addClass(s.current);flag=true},s.delay)}}).bind("mouseout",function(){if(flag){var _this=$(this);timer2=setTimeout(function(){_this.removeClass(s.current);flag=false},s.delay)}else{clearTimeout(timer1)}})})}})
/*stJsonpajax*/
function setJsonpAjax(_url,_errorTi){$.ajax({url:_url,type:"GET",dataType:"jsonp",success:function(data){eval(data);return true;}})}
/*misc*/
function search(id){var selKey=document.getElementById(id).value.replace(/(^\s*)|(\s*$)/g,"");selKey=selKey.replace("<","").replace(">","");if(selKey.length>30){alert("搜索关键字太长，请重新输入!");return};if(selKey.length<1){alert("请搜索到少2个字以上的内容!");return};window.location='http://search.shushi100.com/Search.aspx?keyword='+escape(selKey)}function login(){location.href="http://my.shushi100.com/passport/login.aspx?ReturnUrl="+escape(location.href);return false}function register(){location.href="http://my.shushi100.com/passport/register.aspx?ReturnUrl="+escape(location.href);return false}function getPara(name){var httpUrl=document.URL;var reg=new RegExp("(^|&|\\?)"+name+"=([^&]*)(&|$)"),r;if(r=httpUrl.match(reg))return unescape(r[2]);return""}function AddFavorite(sURL,sTitle){try{window.external.addFavorite(sURL,sTitle)}catch(e){try{window.sidebar.addPanel(sTitle,sURL,"")}catch(e){alert("加入收藏失败，请使用Ctrl+D进行添加")}}}function divisview(divname,ishide){try{objview=document.getElementById(divname);if(ishide==1){objview.style.display="block"}else{objview.style.display="none"}}catch(er){}}function ChangeinnerHTML(_obj,_value){try{obj=document.getElementById(_obj);obj.innerHTML=_value}catch(er){}}function getCurrentKey(allStr,defStr){var tempKey=allStr.split(",");var reStr=defStr;var setValue=Math.round(Math.random()*(tempKey.length-1)+1);if(setValue<tempKey.length){reStr=tempKey[setValue]}return reStr}function writeSerachKey(_data){$.cookie("serachkey",_data,{expires:1,path:"/",domain:"shushi100.com",secure:false})}function getDefaultKey(_key){var _serachkey=$.cookie("serachkey");if(_key!="0"&&_key!="AdDefaultKey"){writeSerachKey(_key)}else{_key=_serachkey}var rekey="中央空调";switch(_key){case"1":rekey=getCurrentKey("中央空调,地源热泵","中央空调");break;case"2":rekey=getCurrentKey("明装采暖,采暖,地暖,水地暖,家庭采暖,暖气片","暖气片");break;case"3":rekey="新风";break;case"4":rekey="净水";break;case"5":rekey="中央热水";break;case"6":rekey="除尘";break;case"7":rekey="太阳能";break;case"8":rekey="智能家居";break;default:rekey=getCurrentKey("中央空调,地源热泵,地暖,家庭采暖,暖气片,明装暖气片,暖气片 价格","暖气片");break};return rekey}
/*cookies*/
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires='; expires='+date.toUTCString()}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};function createCookie(name,value,days,Tdom){var Tdom=(Tdom)?Tdom:"/";if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString()}else{var expires=""}document.cookie=name+"="+value+expires+"; path="+Tdom}function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1,c.length)}if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length)}}return null}function delCookie(name){var exp=new Date();exp.setTime(exp.getTime()-1000);var cval=readCookie(name);if(cval!=null)document.cookie=name+"="+cval+";expires="+exp.toGMTString()}
function setMinuteCookie(name,value,expires){var today=new Date();expires=expires*1000*60;var expires_date=new Date(today.getTime()+(expires));document.cookie=name+'='+escape(value)+';expires='+expires_date.toGMTString()+';path=/;domain=shushi100.com'};function getMinuteCookie(name){var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));if(arr!=null)return unescape(arr[2]);return null};
/*recent*/
function writerecentCook(_name,_data){$.cookie(_name,_data,{expires:30,path:"/",domain:"shushi100.com",secure:false})}$(function(){$("#clearRec").click(function(){writerecentCook("history","");$("#recentlist").html("<ul class='ul-p2'><li class='first'>暂无商品浏览记录!</li></ul>");alert("清除成功！")})});$(function(){$("#clearTcRec").click(function(){writerecentCook("history_taocan","");$("#recentlist").html("<ul class='ul-p2'><li class='first'>暂无浏览记录!</li></ul>");alert("清除成功！")})});
/*city*/
//function writeCityCook(_data){var _expval=7;var _dataArr=_data.split("|");if(_dataArr.length==3){_expval=_dataArr[2]*1}var _cityCook=$.cookie("city");if(_cityCook){var _cityArr=_cityCook.split("|");if(_dataArr[0]==_cityArr[0]&&_dataArr.length==_cityArr.length)return}$.cookie("city",_data,{expires:_expval,path:"/",domain:"shushi100.com",secure:false})}function setCityName(){var s_cityid=document.getElementById('curCity');if(window.location!="http://www.shushi100.com/"&&s_cityid){var _cityCook=$.cookie("city");if(_cityCook){if(_cityCook.length>0){var _dataArr=_cityCook.split("|");var _cityename=_dataArr[0];var _cityname=_dataArr[1];if(_cityename!="www"){s_cityid.innerHTML=_cityname}}}else{setJsonpAjax("http://my.shushi100.com/ashx/changecity.ashx?myCallback=getCityForIPback&r="+Math.random(),"")}}}function getCityForIPback(data){if(data.success!=""){var _ipArr=data.success.split("|");var _cityname=_ipArr[0];var _cityename=_ipArr[1];var _citystatus=_ipArr[2];if(_citystatus=='3'){writeCityCook(_cityename+"|"+_cityname);document.getElementById('curCity').innerHTML=_cityname}}}function disputcity(cityename,cityname){var _cityCook=$.cookie("city");if(_cityCook==null){setTimeout(function(){var fileref=document.createElement('link');fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href","http://misc.shushi100.com/skin/thickbox.css");document.getElementsByTagName("head")[0].appendChild(fileref);myModelCallCenter.disput(cityename)},2000)}else{var _dataArr=_cityCook.split("|");if(_dataArr[0]!=cityename){writeCityCook(cityename+"|"+cityname)}}}
function writeCityCook(_data){var _expval=7;var _dataArr=_data.split("|");if(_dataArr.length==3){_expval=_dataArr[2]*1}var _cityCook=$.cookie("city");if(_cityCook){var _cityArr=_cityCook.split("|");if(_dataArr[0]==_cityArr[0]&&_dataArr.length==_cityArr.length)return}$.cookie("city",_data,{expires:_expval,path:"/",domain:"shushi100.com",secure:false})}
/*cityclick*/
function writeCityClickCook(_data,_cityename){$.cookie("cityclick",_data,{expires:1,path:"/",domain:"shushi100.com",secure:false});setJsonpAjax("http://my.shushi100.com/ashx/changecity.ashx?cityename="+_cityename+"&r="+Math.random(),"")}function setCityClick(){var _cityename;var now=new Date();var strDate=now.toLocaleDateString();var _cityCook=$.cookie("city");if(_cityCook){if(_cityCook.length>0){var _dataArr=_cityCook.split("|");_cityename=_dataArr[0]}}else{_cityename="www"}var _cityClick=$.cookie("cityclick");if(_cityClick){if(_cityClick.length>0){var isbool=false;var _citylist=_cityClick.split(",");for(var i=0;i<_citylist.length;i++){var _cityArr=_citylist[i].split("|");if(_cityename==_cityArr[0]){isbool=true;if(strDate!=_cityArr[1]){_cityClick=_cityClick.replace(_citylist[i],_cityename+"|"+strDate);writeCityClickCook(_cityClick,_cityename);break}}}if(!isbool){_cityClick+=","+_cityename+"|"+strDate;writeCityClickCook(_cityClick,_cityename)}}}else{writeCityClickCook(_cityename+"|"+strDate,_cityename)}}
/*flashPic*/
function flashPic(flash_id,flash_ad,flash_a,flash_w,flash_h,flash_opt){var id="flash_click_"+Math.ceil(Math.random()*1000000);flash_nad='<object  width="'+flash_w+'px" height="'+flash_h+'px" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" id="flash_swf_'+id+'"><param name="wmode" value="opaque"/><param name="movie" value="'+flash_ad+'"><embed  width="'+flash_w+'px" height="'+flash_h+'px" wmode="opaque" src="'+flash_ad+'" type="application/x-shockwave-flash"></embed></object>';$(flash_id).append('<div style="clear: both; margin: 0 auto; width:'+flash_w+'px;height:'+flash_h+'px;" id="flash_outer_2_'+id+'"><div style="width:'+flash_w+'px;height:'+flash_h+'px;position:relative;" id="flash_outer_1_'+id+'">'+flash_nad+'<div style="position:absolute; top:0px; left:0px;z-index:3;"><a href="'+flash_a+'" target="_blank"><img style="width:'+flash_w+'px;height:'+flash_h+'px;border:0px" src="../img/1x1.gif"></a></div></div></div><div class="clear"></div>')}
/*uniquemac*/
(function($){function S4(){return(((1+Math.random())*0x10000)|0).toString(16).substring(1)};var uniquemac=$.cookie("uniquemac");if(!uniquemac){var uniquemac=(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());$.cookie("uniquemac",uniquemac,{expires:365,path:"/",domain:"shushi100.com",secure:false})}})(jQuery);
/*文本超出省略号
* 用法：
* $clamp(node,options);
 node是要操作的节点，options包括：
 clamp——行数，
 useNativeClamp——是否使用-webkit-line-clamp属性，
 trucationChar——省略的符号（不限于省略号），
 truncationHTML——省略的内容（不限于符号），
 animate——是否实现动画折叠。
* */
(function(){window.$clamp=function(c,d){function s(a,b){n.getComputedStyle||(n.getComputedStyle=function(a,b){this.el=a;this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;"float"==b&&(b="styleFloat");c.test(b)&&(b=b.replace(c,function(a,b,c){return c.toUpperCase()}));return a.currentStyle&&a.currentStyle[b]?a.currentStyle[b]:null};return this});return n.getComputedStyle(a,null).getPropertyValue(b)}function t(a){a=a||c.clientHeight;var b=u(c);return Math.max(Math.floor(a/b),0)}function x(a){return u(c)*
    a}function u(a){var b=s(a,"line-height");"normal"==b&&(b=1.2*parseInt(s(a,"font-size")));return parseInt(b)}function l(a){if(a.lastChild.children&&0<a.lastChild.children.length)return l(Array.prototype.slice.call(a.children).pop());if(a.lastChild&&a.lastChild.nodeValue&&""!=a.lastChild.nodeValue&&a.lastChild.nodeValue!=b.truncationChar)return a.lastChild;a.lastChild.parentNode.removeChild(a.lastChild);return l(c)}function p(a,d){if(d){var e=a.nodeValue.replace(b.truncationChar,"");f||(h=0<k.length?
    k.shift():"",f=e.split(h));1<f.length?(q=f.pop(),r(a,f.join(h))):f=null;m&&(a.nodeValue=a.nodeValue.replace(b.truncationChar,""),c.innerHTML=a.nodeValue+" "+m.innerHTML+b.truncationChar);if(f){if(c.clientHeight<=d)if(0<=k.length&&""!=h)r(a,f.join(h)+h+q),f=null;else return c.innerHTML}else""==h&&(r(a,""),a=l(c),k=b.splitOnChars.slice(0),h=k[0],q=f=null);if(b.animate)setTimeout(function(){p(a,d)},!0===b.animate?10:b.animate);else return p(a,d)}}function r(a,c){a.nodeValue=c+b.truncationChar}d=d||{};
    var n=window,b={clamp:d.clamp||2,useNativeClamp:"undefined"!=typeof d.useNativeClamp?d.useNativeClamp:!0,splitOnChars:d.splitOnChars||[".","-","\u2013","\u2014"," "],animate:d.animate||!1,truncationChar:d.truncationChar||"\u2026",truncationHTML:d.truncationHTML},e=c.style,y=c.innerHTML,z="undefined"!=typeof c.style.webkitLineClamp,g=b.clamp,v=g.indexOf&&(-1<g.indexOf("px")||-1<g.indexOf("em")),m;b.truncationHTML&&(m=document.createElement("span"),m.innerHTML=b.truncationHTML);var k=b.splitOnChars.slice(0),
        h=k[0],f,q;"auto"==g?g=t():v&&(g=t(parseInt(g)));var w;z&&b.useNativeClamp?(e.overflow="hidden",e.textOverflow="ellipsis",e.webkitBoxOrient="vertical",e.display="-webkit-box",e.webkitLineClamp=g,v&&(e.height=b.clamp+"px")):(e=x(g),e<=c.clientHeight&&(w=p(l(c),e)));return{original:y,clamped:w}}})();


/*超级类*/
var OwnClass=(function(){
    var _mix=function(r,s){
        for(var p in s){
            if(s.hasOwnProperty(p)){
                r[p]=s[p];
            }
        }
    }
    var _extend=function(){
        this.initPrototype=true;
        var prototype=new this();
        this.initPrototype=false;

        var items=Array.prototype.slice.call(arguments)||[],item;

        while(item=items.shift()){
            _mix(prototype,item.prototype||item);
        }

        var SubClass=function(){
            if(!SubClass.initPrototype&&this.init){
                this.init.apply(this,arguments);
            }
        }

        SubClass.prototype=prototype;
        SubClass.prototype.constructor=SubClass;
        SubClass.extend = _extend;
        return SubClass;
    }
    var OwnClass=function(){};
    OwnClass.extend=_extend;
    return OwnClass;

})()

var Basic=OwnClass.extend({
    EVENTS:{},
    template:'',
    init:function(config){
        this.__config=config;
        this.setUp();
        this._delegateEvent();
    },
    get:function(key){
        return this.__config[key];
    },
    set:function(key,value){
        this.__config[key]=value;
    },
    _delegateEvent:function(){
        var self=this;
        var events=this.EVENTS||{};
        var EventObj,select,type,fn;
        var parentNode=this.get['parentNode']||$(document.body);
        for(select in events){
            EventObj=events[select];
            for(type in EventObj){
                fn=EventObj[type];
                parentNode.delegate(select,type,function(e){
                    fn.call(null,self,e);
                });
            }
        }

    },
    _parseTemplate:function(str,data){
        var fn=new Function('obj',
            'var a=[],print=function(){a.push.apply(a,arguments);};' +
            'with(obj){a.push(\'' + str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("a.push('")
                .split("\r").join("\\'") +
            "');}return a.join('');"
        );
        return data?fn(data):fn;
    },
    setChunkData:function(key,value){
        var self=this;
        var data=self.get('__renderData');
        data[key]=value;
        if(!this.template)return;
        var newHtmlNode=$(self._parseTemplate(this.template,data));
        var currentNode=self.get('__currentNode');
        if(!currentNode)return;
        currentNode.replaceWith(newHtmlNode);
        self.set('__currentNode',newHtmlNode);
    },
    setUp:function(){
        this.render();
    },
    render:function(data){
        var self=this;
        self.set('__renderData',data);
        if(!this.template)return;
        var html=self._parseTemplate(this.template,data);
        var currentNode=$(html);
        self.set('__currentNode',currentNode);
        var parentNode=this.get('parentNode')||$(document.body);
        parentNode.append(currentNode);
    },
    destroy:function(){

        var self = this;

        //删除渲染好的dom节点
        self.get('__currentNode').remove()
        //去掉绑定的代理事件
        var events=self.EVENTS||{};
        var parentNode=self.get('parentNode');
        var select,type,fn,EventObj;
        for(select in events){
            EventObj=events[select];
            for(type in EventObj){
                fn=EventObj[type];
                parentNode.undelegate(select,type,fn);
            }
        }

    }


});

/*客服收起展开*/
$('.lwx_retract_hide').click(function(){$('.lwx_spread').show(); $('.lwx_retract').hide();})
$('.lwx_spread_hide').click(function(){$('.lwx_spread').hide(); $('.lwx_retract').show();});
/*发送验证码按钮倒计时*/
var countdown = 60;
function cotDown(obj){
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.className = 'verification_code';
        obj.value = "获取验证码";
        countdown = 60;
        clearInterval(timeloop);
        return false;
    } else {
        obj.setAttribute("disabled", true);
        obj.className = 'verification_code disclick';
        obj.value = "重新发送" + countdown + "s";
        countdown--;
    }
}

/*************异业联盟（ 尊敬的用户，你将获得由舒适100联盟品牌提供的舒适大礼包）这句话的显示与隐藏值dalibao_hidden的变化 start *****************/
function changeDistrict(obj){
    var id=$(obj).val();
    if(id==1381){
        $("#dalibao_hidden").val(1);
        if(!$("#dalibao").is(":checked"))$("#dalibao").trigger("click");//复选框没有勾选再选择武汉的时候应该要默认选中
        $(".checkbox_txt_box").show();
    }else{
        $("#dalibao_hidden").val(0);
        $("#dalibao").removeAttr("checked");
        $(".checkbox_txt_box").hide();
    }
}

$("#dalibao").click(function(){
    if(!$("#dalibao").is(":checked")){
        $("#dalibao_hidden").val(0);
    }
    else{
        $("#dalibao_hidden").val(1);
    }
});

/*导航栏二维码*/
$(".lwx_code_box").mouseover(function () {
    $(".code_wrap").show();
});
$(".lwx_code_box").mouseout(function () {
    $(".code_wrap").hide();
});
$(".libao_box").mouseover(function () {
    $('.libao_wrap').show();
});
$(".libao_box").mouseout(function () {
    $(".libao_wrap").hide();
});

/*************异业联盟（ 尊敬的用户，你将获得由舒适100联盟品牌提供的舒适大礼包）这句话的显示与隐藏值dalibao_hidden的变化 end *****************/

/*友情链接展开与显示*/
$(".fl_arrow_btn").click(function () {
    if($(this).hasClass("up")) {
        $(this).removeClass("up").parents(".fl_title").next(".fl_content").css("height","56px");
    } else {
        $(this).addClass("up").parents(".fl_title").next(".fl_content").css("height","auto");
    }
}
);
$("#friendly_link .fl_title").find("a:first").addClass("curr");
$("#friendly_link .fl_title").on("click","a",function () {
    $(this).siblings().removeClass("curr");
    $(this).addClass("curr");
    var index=$("#friendly_link .fl_title a").index(this);
    $(".fl_content div").eq(index).show().siblings().hide();
});

/*免费设计剩余名额*/
var scrollNum = function() {
    //定义一个函数用来将数字分解成单个数字；
    function sigleNum(num) {
        var hp = Math.floor(num / 100);
        var dp = Math.floor(num % 100 / 10);
        var up = Math.floor(num % 100 % 10);
        return new Array(hp, dp, up);
    }
    //赋值操作
    function setValue(obj, value) {
        var span = obj.children("span");
        for (var i = 0; i < span.length; i++) {
            span[i].innerHTML = value[i];
        }
    }
    //定义一个动画函数
    function scrollAni(obj, start, end, time) {
        end = end || 0;
        if (start <= end) {
            clearTimeout(ani);
            setValue(obj, sigleNum(end));
        } else {
            var ani = setTimeout(function() {
                start -= 12;
                setValue(obj, sigleNum(start));
                scrollAni(obj, start, end, time);
            }, time);
        }
    };
    return function(obj, start, end, time) {
        //初始化元素的值
        setValue(obj, sigleNum(start));
        //滚动操作
        scrollAni(obj, start, end, time);
    }
}();
/*计算剩余名额*/
var calculateNum = function () {
    return function (obj,numBox,initalNum) {
        if(typeof initalNum == "number") {
            numBox.text(initalNum);
        }
        obj.on("keyup",function () {
            var text = $(this).val();
            var surplus = initalNum - $.trim(text).length;
            if(surplus <=0) {
                numBox.text(0);
                $(this).val(text.slice(0,initalNum));
                return;
            }
            numBox.text(surplus);
        })
    }
}();

/*鼠标经过延迟触发
 * 调用时：
 * $("#test").hoverDelay({
 * hoverEvent: function(){
 *   alert("经过我！");
 * }
 * outEvent: function(){
 *   alert("离开我！");
 * }
 *
 * });
 * */
$.fn.hoverDelay = function(options){
    var defaults = {
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function(){
            $.noop();
        },
        outEvent: function(){
            $.noop();
        }
    };
    var sets = $.extend(defaults,options || {});
    var hoverTimer, outTimer;
    return $(this).each(function(){
        $(this).hover(function(){
            clearTimeout(outTimer);
            hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
        },function(){
            clearTimeout(hoverTimer);
            outTimer = setTimeout(sets.outEvent, sets.outDuring);
        });
    });
}

/*页面事件锚点记录start*/
var EventCount=Basic.extend({
    setUp:function(){
        this.getCnzzElement();
    },
    getCnzzElement:function(){
        self=this;
        var Elements=self.get("Elements");
        if(!Elements)return;
        Elements.map(function(index){
            var _cnzz_event,_cnzz_category,_cnzz_action,_cnzz_label,_cnzz_value,_cnzz_nodeid;
            var obj=this;
            _cnzz_event=this.attributes["cnzz_event"].value;
            _cnzz_category=this.attributes["cnzz_category"].value;
            _cnzz_action=this.attributes["cnzz_action"].value;
            _cnzz_value=parseInt(this.attributes["cnzz_value"].value);
            _cnzz_label=this.attributes["cnzz_label"].value;
            var __template=_cnzz_label;
            _cnzz_label=(__template.replace(/(^s*)|(s*$)/g, "").length ==0)?1:_cnzz_label;
            _cnzz_nodeid=this.attributes["cnzz_nodeid"].value;
            $(obj).on(_cnzz_event,function(){
                try{
                    ga('send', 'event', _cnzz_category, _cnzz_action, _cnzz_label, 0, _cnzz_nodeid);
                }
                catch(err){
                    return true;
                }
            })
        })
    }
})
new EventCount({Elements:$("[cnzz_event]")});//调用锚点记录
/*页面事件锚点记录end*/

