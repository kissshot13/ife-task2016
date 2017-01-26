function $(val){
	return document.querySelectorAll(val);
}

function verification(target,val,info) {
	var normalColor  = '#a8a8a8';
	var errorColor   = '#e2000c';
	var successColor = '#60ba49';
	var normalinfo   = '必填，长度为4~16个字符';
	var emptyinfo    = '姓名不能为空';
	var errorinfo    = '输入格式错误';
	var successinfo  = '名称格式正确';
	var regex_zh     = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+?/g;
	var regex_en     = /[0-9a-zA-Z]+?/g;
	var min          = 4;
	var max          = 16;
	this.isempty =function () {
		if (!val) return true;
		else return false;
	},
	this.islegal = function () {
			if (this.isempty()) return false;
			var len1 = val.match(regex_zh);
			var len2 = val.match(regex_en);
			var len = (len1?len1.length*2:0)+(len2?len2.length:0);
			if (len>=min && len<=max) {
				return true;
			}
			return false;
	},
	this.style = function (mcolor,minfo) {
		target.style.border = '1px solid '+mcolor;
		info.innerText = minfo;
		info.style.color = mcolor; 
	},
	this.emptyStyle =function () {
		this.style(errorColor,emptyinfo);
	},
	this.errorStyle = function () {
		this.style(errorColor,errorinfo);
	},
	this.successStyle =function () {
		this.style(successColor,successinfo);
	},
	this.resetStyle =function () {
		this.style(normalColor,normalinfo);
	}
}

window.onload =function () {
	var submit = $('input')[1];
	
	submit.onclick = function () {
		var text = $('input')[0];
		var content = text.value.trim();
		var p = $('p')[0];
		var ver1 = new verification(text,content,p);
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
