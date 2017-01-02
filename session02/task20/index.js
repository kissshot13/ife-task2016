function $(val) {
	return document.getElementById(val);
}
function addEvent(target,event,fun) {
	if(target.addEventListener)
	{
		target.addEventListener(event,fun,false);
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
	var content = $('content');
	var btns = document.getElementsByTagName('input');
	var wrap = $('wrap');
	var queue = {
		data:[],
		leftin:function (vals) {
			this.data = vals.concat(this.data);
			this.render();		
		},
		rightin:function (vals) {
			this.data = this.data.concat(vals);
			this.render();
		},
		leftout:function() {
			this.data.shift();
			this.render();
		},
		rightout:function() {
			this.data.pop();
			this.render();	
		},
		render:function (str) {
			wrap.innerHTML = this.data.map(function(d) {
				if (str!=null && str.length >0) {
					d = d.replace(new RegExp(str,'g'),'<span>'+str+'</sapn>');
				} 
				return '<div>'+d+"</div>";
			}).join('');
		}
	};
	function getVal() {
		var arr = [];
		var vals = $('content').value.trim();
		arr = vals.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g).filter(function(e) {
			if (e!=null && e.length>0) {
				return true;
			}
			else{
				return false;
			}
		});
		return arr;
	}

	addEvent(btns[0],'click',function() {
		queue.leftin(getVal());
	});

	addEvent(btns[1],'click',function () {
		queue.rightin(getVal());
	});

	addEvent(btns[2],'click',function () {
		queue.leftout();
	});
	addEvent(btns[3],'click',function () {
		queue.rightout();
	});
	addEvent(btns[4],'click',function () {
		var key = $('content').value.trim();
		queue.render(key);
	});



};