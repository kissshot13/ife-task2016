
var data = {
	'北京':['北京大学','清华大学','北京工业大学','人民大学'],
	'上海':['上海交通大学','复旦大学'],
	'南京':['南京大学','南京邮电大学'],
	'天津':['南开大学','天津大学']
};

function $(val) {
	return document.querySelectorAll(val);
}

var radios = $('input[name="choose"]');

window.onload = function () {

	for(let i=0;i<radios.length;i++)
	{
		radios[i].onchange = function () {
			if(this.checked)
			{
				
			}
		}
	}
	
}



