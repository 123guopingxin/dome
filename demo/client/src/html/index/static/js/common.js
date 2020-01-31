var isIe=(window.ActiveXObject)?true:false;
var pageLinkUrl="";
var ajaxUrl="";
function g(nodeId)
{
    return document.getElementById(nodeId);
}
function setInnerHtml(objName,dcontent)
{
    if(g(objName)!=null)
    {g(objName).innerHTML=dcontent;}
}
function getPos(obj){
    this.Left=0;
    this.Top=0;
    this.Height=obj.offsetHeight;
    this.Width=obj.offsetWidth;
    var tempObj=obj;
    while (tempObj.tagName.toLowerCase()!="body" && tempObj.tagName.toLowerCase()!="html"){
        this.Left+=tempObj.offsetLeft;
        this.Top+=tempObj.offsetTop;
        tempObj=tempObj.offsetParent;
    }
}
function getNullPos()
{
    return {Left:0,Top:0}
}
function getMousePos(ev)
{
    if(ev.pageX || ev.pageY)
    {
        return {Left:ev.pageX, Top:ev.pageY};
    }
    return {
        Left:ev.clientX + document.documentElement.scrollLeft,Top:ev.clientY + document.documentElement.scrollTop
    };
}
function clearWaitInfo()
{
    var newd=g("waitInfo");
    if(newd!=null)
    {
        newd.parentNode.removeChild(newd);
    }
}
function setGrowHidden(obj,intAlphaStep,intTimeStep)
{

    try{
        if(obj==null){return;}
        if(isIe)
        {
            try{
                obj.filters.alpha.opacity-=intAlphaStep;
                if (obj.filters.alpha.opacity>0) {
                    setTimeout(function(){setGrowHidden(obj,intAlphaStep,intTimeStep);},intTimeStep);
                }
                else {closeWindow();}
            }catch(e){closeWindow();}
        }
        else
        {
            var curOpacity=obj.style.opacity;
            curOpacity-=intAlphaStep/100;
            if (curOpacity>0) {
                obj.style.opacity =curOpacity;
                setTimeout(function(){setGrowHidden(obj,intAlphaStep,intTimeStep);},intTimeStep);
            }
            else {closeWindow();}
        }
    }catch(e){}
}
function showMessageBoxBase(content,pos,wWidth,windowId)
{
    closeWindowBase(windowId);
    var bWidth=parseInt(document.documentElement.scrollWidth);
    var bHeight=parseInt(document.documentElement.scrollHeight);
    var mesW=document.createElement("div");
    mesW.id=windowId;
    mesW.innerHTML=content;
    if(bWidth-pos.Left<wWidth)
    {
        styleStr="left:"+(pos.Left-wWidth)+"px;";
    }
    else
    {
        styleStr="left:"+(pos.Left)+"px;";
    }
    styleStr+="top:"+pos.Top+"px;position:absolute;width:"+wWidth+"px;";
    mesW.style.cssText=styleStr;
    document.body.appendChild(mesW);

}
function showMessageBox(content,pos,wWidth)
{
    showMessageBoxBase(content,pos,wWidth,"mesWindow");
}
function closeWindowBase(windowId)
{
    if(g(windowId)!=null)
    {
        g(windowId).parentNode.removeChild(g(windowId));
    }
}
function closeWindow()
{
    closeWindowBase("mesWindow")
}
//页面定位
function setScroll(objId)
{
    if(g(objId))
    {

        var objPos=new getPos(g(objId));
        scroll(0,objPos.Top);
    }
}
//ajax通用方法
function createXmlHttp(){
    var ajaxObj=null;
    if(window.ActiveXObject)
    {
        ajaxObj=new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        if(window.XMLHttpRequest){
            ajaxObj=new XMLHttpRequest();
        }
    }
    return ajaxObj;
}
function setAjax_getRes(requst,resObjId)
{
    setAjax("GET",requst,null,false,null,resObjId,null);
}
function setAjax_runCode(requst,runCode)
{
    setAjax("GET",requst,null,false,null,null,runCode);
}
function setAjax_runCodeAndBtn(requst,curBtn,runCode)
{
    setAjax("GET",requst,null,false,curBtn,null,runCode);
}
function setAjax_getResAndRunCode(requst,resObjId,runCode)
{
    setAjax("GET",requst,null,false,null,resObjId,runCode);
}
function setAjax(postType,requst,postXml,isXml,curBtn,resObjId,runCode)
{
    setAjaxBase(postType,requst,postXml,isXml,curBtn,resObjId,runCode,null);
}
function setAjaxBase(postType,requst,postXml,isXml,curBtn,resObjId,runCode,onOverRunCode)
{

    if(curBtn!=null){curBtn.disabled=true;}
    var xmlHttp=createXmlHttp();
    xmlHttp.onreadystatechange=function(){backAjaxValue(xmlHttp,curBtn,resObjId,runCode,onOverRunCode)};
    if(postType=="GET"){
        xmlHttp.open(postType,pageLinkUrl+ajaxUrl+'?roid='+Math.random()+'&'+requst);
        xmlHttp.send(null);
    }else
    {
        xmlHttp.open(postType,pageLinkUrl+ajaxUrl+'?roid='+Math.random()+'&'+requst,true);
        if(!isXml){xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");}
        xmlHttp.send(postXml);
    }
}
function backAjaxValue(xmlHttp,curBtn,resObjId,runCode,onOverRunCode)
{

    if(xmlHttp.readyState==4)
    {
        clearWaitInfo();
        if(curBtn!=null){curBtn.disabled=false;}

        if(onOverRunCode!=null)eval(onOverRunCode);

        if(xmlHttp.status==200)
        {
            var backValue=xmlHttp.responseText;
            if(!checkErrorFromBackValue(backValue))
            {
                return;
            }
            if(resObjId!=null && g(resObjId)!=null)
            {
                g(resObjId).innerHTML=xmlHttp.responseText;
            }
            if(runCode!=null)
            {
                var backValue=xmlHttp.responseText;
                eval(runCode);}

        }
    }
}
function checkErrorFromBackValue(bakValue)
{
    if(bakValue!=null)
    {
        if(bakValue.indexOf('error_')==0)
        {
            if(bakValue.length>6)
            {bakValue=bakValue.substr(6);}
            else{bakValue='程序发生了未知错误，请再次尝试！';}
            alert(bakValue);
            return false;
        }
        return true;
    }
    return true;
}



function getFormXmlBySign(sign)
{
    var xmlDoc="";
    var eList=document.getElementsByTagName("input");
    for(var i=0;i<eList.length;i++)
    {
        if(isDataControl(eList[i].id,sign))
        {
            var columnName=getDataColumnName(eList[i].id,sign);
            if(eList[i].type=="checkbox" || eList[i].type=="radio")
            {
                if(eList[i].checked)
                {
                    xmlDoc+="<"+columnName+">1</"+columnName+">";
                }else
                {  xmlDoc+="<"+columnName+">0</"+columnName+">";}
            }else
            {

                xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";
                columnName=null;
            }
        }
    }
    eList=document.getElementsByTagName("select");
    for(var i=0;i<eList.length;i++)
    {
        if(isDataControl(eList[i].id,sign))
        {
            var columnName=getDataColumnName(eList[i].id,sign);
            xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";
            columnName=null;
        }
    }
    eList=document.getElementsByTagName("textarea");
    for(var i=0;i<eList.length;i++)
    {
        if(isDataControl(eList[i].id,sign))
        {
            var columnName=getDataColumnName(eList[i].id,sign);
            xmlDoc+="<"+columnName+"><![CDATA["+eList[i].value+"]]></"+columnName+">";
            columnName=null;
        }
    }
    return xmlDoc;
}
function getFormXml()
{
    return getFormXmlBySign('t_');
}
function isDataControl(controlId,sign){if(controlId.substring(0,sign.length)==sign){return true;}else{return false;}}
function getDataColumnName(controlId,sign){return controlId.substr(sign.length);}

//非法字符过滤
function is_forbid(temp_str)
{
    temp_str=trimTxt(temp_str);
    temp_str = temp_str.replace('*',"@");
    temp_str = temp_str.replace('--',"@");
    temp_str = temp_str.replace('/',"@");
    temp_str = temp_str.replace('+',"@");
    temp_str = temp_str.replace('\'',"@");
    temp_str = temp_str.replace('\\',"@");
    temp_str = temp_str.replace('$',"@");
    temp_str = temp_str.replace('^',"@");
    temp_str = temp_str.replace('.',"@");
    //temp_str = temp_str.replace('(',"@");
    //temp_str = temp_str.replace(')',"@");
    temp_str = temp_str.replace(',',"@");
    temp_str = temp_str.replace(';',"@");
    temp_str = temp_str.replace('_',"@");
    temp_str = temp_str.replace('<',"@");
    temp_str = temp_str.replace('>',"@");
    //temp_str = temp_str.replace('?',"@");
    temp_str = temp_str.replace('"',"@");
    temp_str = temp_str.replace('{',"@");
    temp_str = temp_str.replace('}',"@");
    //temp_str = temp_str.replace('[',"@");
    //temp_str = temp_str.replace(']',"@");
    var forbid_str=new String('@,%,~,&');
    var forbid_array=new Array();
    forbid_array=forbid_str.split(',');
    for(i=0;i<forbid_array.length;i++)
    {
        if(temp_str.search(new RegExp(forbid_array[i])) != -1)
            return false;
    }
    return true;
}
function is_forbid2(temp_str)
{
    temp_str=trimTxt(temp_str);
    temp_str = temp_str.replace('*',"@");
    temp_str = temp_str.replace('--',"@");
    temp_str = temp_str.replace('/',"@");
    temp_str = temp_str.replace('+',"@");
    temp_str = temp_str.replace('\'',"@");
    temp_str = temp_str.replace('\\',"@");
    temp_str = temp_str.replace('$',"@");
    temp_str = temp_str.replace('^',"@");
    //temp_str = temp_str.replace('.',"@");
    //temp_str = temp_str.replace('(',"@");
    //temp_str = temp_str.replace(')',"@");
    //temp_str = temp_str.replace(',',"@");
    //temp_str = temp_str.replace(';',"@");
    //temp_str = temp_str.replace('_',"@");
    //temp_str = temp_str.replace(';',"@");
    temp_str = temp_str.replace('<',"@");
    temp_str = temp_str.replace('>',"@");
    //temp_str = temp_str.replace('?',"@");
    temp_str = temp_str.replace('"',"@");
    temp_str = temp_str.replace('{',"@");
    temp_str = temp_str.replace('}',"@");
    //temp_str = temp_str.replace('[',"@");
    //temp_str = temp_str.replace(']',"@");
    var forbid_str=new String('@,%,~,&');
    var forbid_array=new Array();
    forbid_array=forbid_str.split(',');
    for(i=0;i<forbid_array.length;i++)
    {
        if(temp_str.search(new RegExp(forbid_array[i])) != -1)
            return false;
    }
    return true;
}
function checknumber(String)
{
    if(trimTxt(String)=="")
    {
        return false;
    }
    var Letters = "1234567890";
    var i;
    var c;
    for( i = 0; i < String.length; i ++ )
    {
        c = String.charAt( i );
        if (Letters.indexOf( c ) ==-1)
        {
            return false;
        }
    }
    return true;
}
function trimTxt(txt)
{
    return txt.replace(/(^\s*)|(\s*$)/g, "");
}
//检查是否为空
function isEmpty(inputId)
{
    if(trimTxt(g(inputId).value)==''){return true}
    return false;
}
//设置是否可显示
function setDisplay(nodeId,state)
{
    if(g(nodeId)!=null){g(nodeId).style.display=state;}
}
//删除元素
function removeNode(nodeId)
{
    if(g(nodeId)!=null){g(nodeId).parentNode.removeChild(g(nodeId));}
}

//显示提示信息
function showAlert(info,obj,infoSign)
{
    if(g(infoSign)!=null){return;}
    var newd=document.createElement("span");
    newd.id=infoSign;
    newd.className='alertInfo';
    newd.innerHTML=info;
    obj.appendChild(newd);
}
//删除提示信息
function removeAlert(infoSign)
{
    if(g(infoSign)==null){return;}
    g(infoSign).parentNode.removeChild(g(infoSign));
}
//显示等待信息
function showWaitInfo(info,obj)
{
    try{
        if(obj==null)return;
        clearWaitInfo();
        var newd=document.createElement("span");
        newd.className='waitInfo';
        newd.id='waitInfo';
        newd.innerHTML=info;
        obj.parentNode.appendChild(newd);
    }catch(e){}
}
function showWaitInfoOnInner(info,obj)
{
    try{
        if(obj==null)return;
        clearWaitInfo();
        var newd=document.createElement("span");
        newd.className='waitInfo';
        newd.id='waitInfo';
        newd.innerHTML=info;
        obj.innerHTML='';
        obj.appendChild(newd);
    }catch(e){}
}
function clearWaitInfo()
{
    try{
        if(g('waitInfo')!=null){g('waitInfo').parentNode.removeChild(g('waitInfo'));}
    }catch(e){}
}
//检查短日期格式
function checkDateFormat(str)
{
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return false;
    var d= new Date(r[1], r[3]-1, r[4]);
    return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
function checkDoubleFormat(str)
{
    var myReg=/^[\-\+]?([0-9]\d*|0|[1-9]\d{0,2}(,\d{3})*)(\.\d+)?$/;
    return myReg.test(str);
}
function checkChinese(str)
{
    var reg = /^[\u4e00-\u9fa5]+$/i;
    return reg.test(str);
}
//设置radio的默认值
function setRadioDefaultItem(radioName,valueId)
{
    var rList=document.getElementsByName(radioName);
    if(rList.length==0){return;}
    var defaultRadioIndex=-1;

    for(var i=0;i<rList.length;i++)
    {
        if(rList[i].disabled)
        {
            continue;
        }
        if(rList[i].checked || defaultRadioIndex<0)
        {
            defaultRadioIndex=i;
        }
    }
    if(defaultRadioIndex>-1)
    {
        if(!rList[defaultRadioIndex].checked)
        {
            rList[defaultRadioIndex].click();
        }
        if(g(valueId)!=null)g(valueId).value=rList[defaultRadioIndex].value;
    }

}

function TimeSpan(secs)
{
    this.hour=Math.floor(secs/3600);
    this.minute=Math.floor((secs-3600*this.hour)/60);
    this.second=(secs-3600*this.hour-60*this.minute)%60;
}

function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}

/*底部悬浮免费设计入口*/
var bottom_pic = 0;
$(".footer_wrap").css("left", "-100%");

    $(".free_apply .pic2").click(function () {
        bottom_pic = 1;
        $(".footer_wrap").animate({ "left": "-100%" }, 500, function () {
            $(".footer").css("display", "none");
            $(".bottom_pic").css("display", "block");
            $(".bottom_pic_wrap").animate({ "left": "0" }, 500);
        });
    });
    $(".bottom_pic_wrap").click(function () {
        bottom_pic = 0;
        $(".bottom_pic_wrap").animate({ "left": "-100%" }, 500, function () {
            $(".bottom_pic").css("display", "none");
            $(".footer").css("display", "block");
            $(".footer_wrap").animate({ "left": "0" }, 500);
        });
    });

$(window).bind("scroll", function () {
    var j = $(document).scrollTop();
    if (j > $(window).height()) {
        if (bottom_pic == 0) {
            $(".footer").css("display", "block");
            $(".footer_wrap").css("left", "0");
            $(".bottom_pic_wrap").css("left", "-100%");
        }
        else {
            $(".bottom_pic").css("display", "block");
            $(".footer_wrap").css("left", "-100%");
            $(".bottom_pic_wrap").css("left", "0");
        }
    }
    else {
        $(".footer").css("display", "none");
        $(".bottom_pic").css("display", "none");
        $(".footer_wrap").css("left", "-100%");
        $(".bottom_pic_wrap").css("left", "-100%");
    }
})

$("#design_username").focus(function () { if ($(this).val().replace(" ", "") == "您的称呼") { $(this).val(""); } $(this).css("color", "#666"); $(this).css("border-color", "#ff6c00"); });
$("#design_username").blur(function () { $(this).css("border-color", "#aaa"); if ($(this).val().replace(" ", "") == "") { $(this).val("您的称呼"); $(this).css("color", "#aaa"); } });
$("#design_mobile").focus(function () { if ($(this).val().replace(" ", "") == "您的电话") { $(this).val(""); } $(this).css("color", "#666"); $(this).css("border-color", "#ff6c00"); });
$("#design_mobile").blur(function () { $(this).css("border-color", "#aaa"); if ($(this).val().replace(" ", "") == "") { $(this).val("您的电话"); $(this).css("color", "#aaa"); } });
$("#design_area").focus(function () { if ($(this).val().replace(" ", "") == "房屋面积") { $(this).val(""); } $(this).css("color", "#666"); $(this).css("border-color", "#ff6c00"); });
$("#design_area").blur(function () { $(this).css("border-color", "#aaa"); if ($(this).val().replace(" ", "") == "") { $(this).val("房屋面积"); $(this).css("color", "#aaa"); } });
$("#housetype").change(function () { if ($(this).val().replace(" ", "") == "") { $(this).css("color", "#aaa"); } else { $(this).css("color", "#666"); } });

/*公告向上滚动效果*/
$.fn.extend({
    ScrollUp:function(opt,callback){
        if(!opt) var opt={};
        var oo;
        var _this=this.eq(0).find("ul:first");
        var lineH=_this.find("li:first").height(),//23
            line = opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
            speed=opt.speed?parseInt(opt.speed,10):7000, //卷动速度，数值越大，速度越慢（毫秒）
            timer=opt.timer?parseInt(opt.timer,10):7000; //滚动的时间间隔（毫秒）
        if(line==0) line=1;
        var upHeight = 0-line*lineH;//-总高度
        scrollUp=function(){
            _this.animate({
                    marginTop:upHeight // <li>的margin-top
                },speed,function(){
                    for(i=1;i<=line;i++){
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({marginTop:0});
                }
            );
        };
        var timerID = function(){
            oo =setInterval("scrollUp()",timer);
        };
        timerID();
        _this.hover(function(){
            clearInterval(oo);
        },function(){
            timerID();
        }).mouseout(function(){

        });
    }
});



/*面包屑二级分类下拉效果*
 */
if($(".has_classify").length>0){
    $(".has_classify").each(function(){
        var obj=$(this);
        obj.hoverDelay({
            hoverEvent: function(){
                obj.addClass("has_classify_hover");
                obj.find(".animate_arrow").addClass("animate_arrow_rotate");
            },
            outEvent: function(){
                obj.removeClass("has_classify_hover");
                obj.find(".animate_arrow").removeClass("animate_arrow_rotate");
            }
        })
    })
}

var RightFixed = (function(){
    //私有方法，外面将访问不到
    var _bind = function(that){
        that.box.on("scroll",function(){
            that.scroll_top=$(this).scrollTop();
            that.render();
        });
    }

    var _heightMinus=function(that){//判断左右两边高度差
        if((!that.leftElem||!that.rightElem))return false;
        if((that.leftElem.height()<=that.rightElem.height()))return false;
        return that.leftElem.height()-that.rightElem.height();
    }

    var RightFixedFun = function(config){}

    RightFixedFun.prototype.init = function(config) {
        this.box=config.box?config.box:$(window);
        this.leftElem=config.leftElem;
        this.rightElem=config.rightElem;
        this.headerHeight=this.leftElem.offset().top;
        _bind(this);
        return this;
    };

    RightFixedFun.prototype.render = function() {
        if(!_heightMinus(this)||this.scroll_top<=this.headerHeight){
            this.rightElem.removeAttr("style");
            return false;
        }
        if(this.scroll_top-this.headerHeight>_heightMinus(this)){
            this.rightElem.css({"margin-top":_heightMinus(this)+"px"});
            return false;
        }

        this.rightElem.css({"margin-top":this.scroll_top-this.headerHeight+"px"});

    };
    //返回构造函数
    return RightFixedFun;

})();


