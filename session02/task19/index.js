function $(val){
	return document.getElementById(val);
}
//事件绑定
function  addEvent(target,event,fun) {
	if (target.addEventListener) {
		target.addEventListener(event,fun,false);
	}
	else if (target.attachEvent){
		target.attachEvent('on'+event,fun);
	}
	else {
		target['on'+event] =fun;
	}
}
var maxwidth = 600;

window.onload = function () {

var libtn = $("leftin");
var ribtn = $('rightin');
var ltbtn = $('leftout');
var rtbtn = $('rightout');
var sortbtn = $('sort');
var content = $('content');
	
//队列结构
var queuen = {
	data:[],
    isfull:function() {
      var len = this.data.length;
      if (len>60) {
      	alert("已经输入超过60个数字");
      	return true;
      }
      return false;
    },
	leftin:function (val) {
		this.data.unshift(val);
		if (this.isfull()) {
			this.data.shift();
			return;
		}
		this.render();
	},
	rightin: function (val) {
		this.data.push(val);
		if (this.isfull()) {
			this.data.pop();
			return;
		}
		this.render();
	},
	leftout: function() {
		var val = this.data[0]
		this.data.shift();
		this.render();
		alert(val);
	},
	rightout: function() {
		var val = this.data[this.data.length -1];
		this.data.pop();
		this.render();
		alert(val);
	},
	sort: function(){
		var len = this.data.length; 
		for(let i=0;i<len;i++)
		{
			for(let j=len-1;j>i;j--)
			{
				if (this.data[j]<this.data[j-1])
				 {
				 	let val = this.data[j-1];
				 	this.data[j-1] = this.data[j];
				 	this.data[j] = val;
				 }
			}
		}
		this.render();
	},
	render: function() {
		var len = this.data.length;
		var wrap = $("wrap");
		var span ="";
		var width = maxwidth/len;
		width = width>30?30:width;
		for(var key in this.data)
		{
			span += "<span style='display:inline-block;"
			+"width:"+width+"px;height:"+this.data[key]+"px;background:red;margin:0 1px;'></span>";
		}
		wrap.innerHTML = span; 	
	},
	delet: function(index){
		this.data.splice(index,1);
		this.render();
	}
}
    
    function islegal(val){

    	var regex = /^[1-9][0-9]$|100/g;

		if (!val.match(regex))
		{
			alert("请输入10-100之前的整数");
			return false;
		}
		return true;
    }

    function getval(){
    	var val = content.value;
    	if (islegal(val)) {
    		content.value= '';
    		return val;
    	}
    	else
    	{
    		return '' 
    	}
    }

	addEvent(libtn,'click',function(){
		var val = getval();
		if (val){
			queuen.leftin(val);
		}
		
	});
	addEvent(ribtn,'click',function(){
		var val = getval();
		if (val){
			queuen.rightin(val);
		}
	});
	addEvent(ltbtn,'click',function(){
		queuen.leftout();
	});
	addEvent(rtbtn,'click',function(){
		queuen.rightout();
	});
	addEvent(ltbtn,'click',function(){
		queuen.leftout();
	});
	addEvent(sortbtn,'click',function(){
		queuen.sort();
	})

}