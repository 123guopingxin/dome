/**
 *参数：
 * parentNode：设置父节点元素,select自动生成
 * Level：设置几级级联
 * defaultValue：设置默认地址选项，其值是数组,数组里面是默认地址的id;
 * json：设置json数据,数组，树型结构，属性结构包含：id,name,child
 */
var Class=(function(){
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
    var Class=function(){};
    Class.extend=_extend;
    return Class;

})();

//辅组函数，获取数组里某个元素的索引 index
var _indexOf = function(array,key){
    if (array === null) return -1
    var i = 0, length = array.length
    for (; i < length; i++) if (array[i] === item) return i
    return -1
}

var Event = Class.extend({
    //添加监听
    on:function(key,listener){
        //this.__events存储所有的处理函数
        if (!this.__events) {
            this.__events = {}
        }
        if (!this.__events[key]) {
            this.__events[key] = []
        }
        if (_indexOf(this.__events,listener) === -1 && typeof listener === 'function') {
            this.__events[key].push(listener)
        }

        return this
    },
    //触发一个事件，也就是通知
    fire:function(key){

        if (!this.__events || !this.__events[key]) return

        var args = Array.prototype.slice.call(arguments, 1) || []

        var listeners = this.__events[key]
        var i = 0
        var l = listeners.length

        for (i; i < l; i++) {
            listeners[i].apply(this,args)
        }

        return this
    },
    //取消监听
    off:function(key,listener){

        if (!key && !listener) {
            this.__events = {}
        }
        //不传监听函数，就去掉当前key下面的所有的监听函数
        if (key && !listener) {
            delete this.__events[key]
        }

        if (key && listener) {
            var listeners = this.__events[key]
            var index = _indexOf(listeners, listener)

                (index > -1) && listeners.splice(index, 1)
        }

        return this;
    }
})

var RichBase=Class.extend(Event,{
    EVENTS:{},
    template:'',
    init:function(config){
        this.__config=config;
        this.setUp();
        this._delegateEvent();
        this._setDefault();
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
        var parentNode=this.get('parentNode')||$(document.body);
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


var LevelDistrict=RichBase.extend({
    template:'<select class="levelDistrict">'+
    '<option value="0"><%=placeholder%></option>'+
    '<%for(var i=0;i<option.length;i++){%>'+
    '<option value=<%=option[i].id%> data-title=<%=option[i].title%>><%=option[i].name%></option>'+
    '<%}%>'+
    '</select>',//html模板
    anotherTemplate:
    '<option value="0"><%=placeholder%></option>'+
    '<%for(var i=0;i<option.length;i++){%>'+
    '<option value=<%=option[i].id%> data-title=<%=option[i].title%>><%=option[i].name%></option>'+
    '<%}%>',
    jsonArray:[],//记录每层json的数组
    EVENTS:{
        'select':{//注册事件
            change:function(self,e){
                var thisObj=$(e.target);
                var sid=thisObj.find('option:selected').val();//获取当前层id
                var parentNode=self.get('parentNode');
                var select_list=parentNode.find('select');
                var cur_index=select_list.index(thisObj);
                if(cur_index>0){
                    self._subjson=self.jsonArray[cur_index-1];//把该层的json赋给subjson
                }
                else{
                    self._subjson=false;
                }
                for(var s=cur_index;s<self._level-1;s++){
                    self.set('__currentNode',(!self._another_template)?select_list.eq(s+1):select_list.eq(s+1).find('option'));
                    self.set('__parentSelect',select_list.eq(s+1));
                    var data=self._getData(sid);
                    if(data){
                        self.set('__renderData',{option:data,placeholder:self._placeholder[s+1]})
                        self.setChunkData('option',data);//更新数据
                        self.jsonArray[s]=data;//记录每一层的json数据
                    }
                    else{//如果下一级没有数据，删除下一个select除第一个option外的选项
                        select_list.eq(s+1).find('option').eq(0).siblings().remove();
                    }
                    sid=self.get('__currentNode').find('option').eq(0).val();//获取下一层id

                }

                self.fire('assign',parentNode.find('select'));//监听赋值


            }
        }
    },
    _getData:function(sid){//根据id获取子层数据
        var self=this;
        var currData,isLoop=true;
        var jsonData=self._subjson||self._json;
        var len=jsonData.length;
        for(var item=0;item<len;item++){
            if(jsonData[item].id==sid&&jsonData[item].hasOwnProperty('child')){
                self._subjson=jsonData[item].child;
                return jsonData[item].child;
            }
        }
        return false;
    },
    _setDefault:function(){//设置默认选项
        var self=this;
        var parentNode=self.get('parentNode')||$(document.body);
        var defaultValue=self.get('defaultValue')||false;
        if(defaultValue){
            for(var i=0;i<defaultValue.length;i++){
                self.set('__select',parentNode.find('select'));
                self.get('__select').eq(i).val(defaultValue[i]);
                self.get('__select').eq(i).trigger('change');
            }
        }
    },
    setChunkData:function(key,value){
        var self=this;
        var data=self.get('__renderData');
        data[key]=value;
        this.template='<select class="levelDistrict">'+
            '<option value="0"><%=placeholder%></option>'+
            '<%for(var i=0;i<option.length;i++){%>'+
            '<option value=<%=option[i].id%> data-title=<%=option[i].title%>><%=option[i].name%></option>'+
            '<%}%>'+
            '</select>';
        if(!this.template)return;
        var newHtmlNode=$(self._parseTemplate(this.template,data));
        var currentNode=self.get('__currentNode');
        if(!currentNode)return;
        if(!self._another_template){
            currentNode.replaceWith(newHtmlNode);
        }
        else{
            var select=self.get('__parentSelect');
            select.empty().append(newHtmlNode);
        }
        self.set('__currentNode',newHtmlNode);
    },
    setUp:function(){//初始化json数据
        var self=this;
        var level=self.get('level')||3;
        var placeholder=self.get('placeholder')||["省份","城市","镇"];//默认不选择时第一个option文本
        self._level=level;
        self._placeholder=placeholder;
        self.template=self.get('Template1')||self.template;
        self._another_template=self.get('onlyOption')||false;//是否启用另一套模板
        self._json=self.get('json')||[
                {"id":1,"name":"广东","child":[{"id":11,"name":"\u5317\u4eac","child":[{"id":111,"name":"山旮旯"}]},{"id":12,"name":"asdfasdf"}]},
                {"id":2,"name":"湖北","child":[{"id":21,"name":"43523","child":[{"id":211,"name":"山旮旯11"}]},{"id":22,"name":"zxcvzxc"}]}
            ];
        for(var i=0;i<level;i++){
            if(i<1){
                self.render({option:self._json,placeholder:self._placeholder[i]},i);
            }
            else{
                self.render({option:'',placeholder:self._placeholder[i]},i);
            }
        }



    },

    render:function(data,index){//初次渲染
        var self=this;
        self.set('__renderData',data);
        if (!this.template) return;
        if(!self._another_template){
            var currentNode=$(self._parseTemplate(this.template,data));
            var parentNode=self.get('parentNode')||$(document.body);
        }
        else{//如果_another_template为真启用另一套模板
            this.template=self.anotherTemplate;
            var currentNode=$(self._parseTemplate(this.template,data));
            var parentNode=self.get('parentNode').find('select').eq(index);
            var parentSelect=parentNode;
            self.set('__parentSelect',parentSelect);
        }
        self.set('__currentNode',currentNode);
        parentNode.append(currentNode);

    }
})
/**
 var json=[
 {"id":1,"name":"广东","child":[{"id":11,"name":"深圳","child":[{"id":111,"name":"福田"}]},{"id":12,"name":"广州"}]},
 {"id":2,"name":"湖北","child":[{"id":21,"name":"黄冈","child":[{"id":211,"name":"山旮旯11"}]},{"id":22,"name":"黄石"}]}
 ];
 new LevelDistrict({parentNode:$('#parentNode'),level:3,defaultValue:[2,21],json:json});
 **/