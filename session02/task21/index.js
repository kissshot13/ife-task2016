function $(val) {
	return document.querySelectorAll(val);
}
function addEvent(target,event,fun)
{
	if(target.addEventListener)
	{
		target.addEventListener(event,fun);
	}
	else if(target.attachEvent)
	{
		target.attachEvent('on'+event,fun);
	}
	else{
		target['on'+event] = fun;
	}
}

window.onload = function () {
	//tags数组
	var tags = [];
	//数组最长
	var maxLength = 10;
	//tag输入框
	var tag = $('input[type="text"]')[0];
	var area = $('textarea')[0];
	//兴趣爱好数组
	var interests = [];
	//兴趣爱好提交按钮
	var submit = $('input[type="submit"]')[0];
	//获取tags数据
	function getTags(){
		isOverLenght(tags);
		var val = tag.value.trim().split(/[，,]$/).join('');
		if( val && hasTheSameEle(val,tags)) {
			tags.push(val);
		}
	    console.log(tags);
	} 
	//获取interests数据
	function getInterests() {
		var  val = area.value.trim();
		var items = val.split(/[^0-9a-zA-Z-\u4e00-\u9fa5]+/).filter(function (e) {
			if(e && e.length>0)
			{
				return true;
			}
			else{
				return false;
			}
		});

		var len = items.length;
		let i = 0;
		while(i<len){
			if(hasTheSameEle(items[i],interests))
			{
				interests.push(items[i]);
			}
			i++;
		}
		console.log('first:'+interests);
		isOverLenght(interests);
	}

	//判断数组是否越界
	function isOverLenght(data) {
		var isfull = data.length >= 10?true:false;
		while(isfull){
			data.shift();
			isfull = data.length >= 10?true:false;
		}
	}
	//判断数组里面是否有一样的元素
	function hasTheSameEle(element,data) {
		for(let i = 0,len=data.length;i<len;i++)
		{
			if (element == data[i]) {
				// alert('你输入了同样的tag！');
				return false;
			}
		}
		return true;		
	}
	//绘图
	function render(contanier,data) {
		
		var li ='';
		for(let i = 0,len = data.length;i<len;i++)
		{
			li += '<li>'+data[i]+'</li>';
		}
		contanier.innerHTML = li;
		var tagitems = contanier.children;
		for(let i = 0,len = tagitems.length;i<len;i++)
		{
			addEvent(tagitems[i],'mouseenter',function (e) {
				 this.style.background = 'red';
				 this.innerText = '删除'+ this.innerText;
				 this.style.cursor = 'pointer';
				 addEvent(this,'click',function (e) {
				 	 data.splice(i,1);
				 	 render(contanier,data);
				 });
			});
			addEvent(tagitems[i],'mouseleave',function (e) {

				 this.style.background = 'blue';
				 this.innerText = this.innerText.split('删除').join('');
			});
		}
	}

    function tagHandle (){
    	getTags();
    	//tags标签的容器
		var tagContainer = $('.tag')[0];
    	render(tagContainer,tags);
    	tag.value = '';
    }
    function interestHandle() {
    	getInterests();
    	//insterests标签容器
		var instContainer = $('.interest')[0];
		render(instContainer,interests);
		console.log(interests);
		area.value = '';
    }
    //输入空格，.触发事件
	addEvent(tag,'keyup',function (e) {
		if(e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 188)
		{
			tagHandle();
		}
	});
	//确认兴趣爱好点击
	addEvent(submit,'click',function (e) {
		interestHandle();
	});		
};