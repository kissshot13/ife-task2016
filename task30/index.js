function $(val){
	return document.querySelectorAll(val);
}

function Verification(target,val,info) {
	//私有属性
	var normalColor  = '#a8a8a8';
	var errorColor   = '#e2000c';
	var successColor = '#60ba49';

	//特权属性
	this.normalinfo  = '必填，长度为4~16个字符';
	this.errorinfo   = '输入格式错误';
	this.successinfo = '格式正确';
	this.emptyinfo   = '不能为空';
	this.target      = target;
	this.val         = val;
	this.info        = info;

	this.isempty =function () {
		if (!this.val) return true;
		else return false;
	},
	
	this.style = function (mcolor,minfo) {
		this.target.style.border = '1px solid '+mcolor;
		this.info.innerText = minfo;
		this.info.style.color = mcolor; 
	},
	this.emptyStyle =function () {
		this.style(errorColor,this.emptyinfo);
	},
	this.errorStyle = function () {
		this.style(errorColor,this.errorinfo);
	},
	this.successStyle =function () {
		this.style(successColor,this.successinfo);
	},
	this.resetStyle =function () {
		this.style(normalColor,this.normalinfo);
	}
}


function NameVerif(target,val,info) {
	
	var regex_zh     = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+?/g;
	var regex_en     = /[0-9a-zA-Z]+?/g;
	var min          = 4;
	var max          = 16;

	this.errorinfo   = '名称输入错误';
	this.target 	 = target;
	this.val         = val;
	this.info        = info;
	this.islegal     = function () {
			if (this.isempty()) return false;
			var len1 = val.match(regex_zh);
			var len2 = val.match(regex_en);
			var len = (len1?len1.length*2:0)+(len2?len2.length:0);
			if (len>=min && len<=max) {
				return true;
			}
			return false;
	}
}

NameVerif.prototype = new Verification;
NameVerif.prototype.constructor = NameVerif;

window.onload =function () {
	var submit = $('input')[0];
	
	submit.onfocus = function () {
		var p = $('p')[0];
		p.className = 'info';
	}
	
	submit.onblur = function () {
		var text = this;
		var content = text.value.trim();
		var p = $('p')[0];
		var ver1 = new  NameVerif(this,content,p);
		console.log(ver1);
		if (!ver1.islegal()) {
			ver1.errorStyle();
			if (ver1.isempty()) {
				ver1.emptyStyle();
			}
		}
		else {
			ver1.successStyle();
		}
	};
}
