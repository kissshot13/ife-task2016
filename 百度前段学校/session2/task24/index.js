function $(val) {
	return 	document.querySelectorAll(val);
}

 var bd = $('body')[0];
 function Node(mesg){
 	var div = document.createElement('div');
 	div.innerText = mesg;
 	return div;
 }
 
 function Tree(mesg){

 	var node = new Node(mesg);
 	this._root = node;
 	bd.appendChild(node);
 }

 function init(){
 var tree = new Tree('super');
 tree._root.appendChild(new Node('machine'));
 tree._root.appendChild(new Node('note'));
 tree._root.appendChild(new Node('fish'));
 tree._root.children[0].appendChild(new Node('apple'));
 tree._root.children[0].appendChild(new Node('phone'));
 tree._root.children[0].appendChild(new Node('shcool'));
 tree._root.children[1].appendChild(new Node('human'));
 tree._root.children[1].appendChild(new Node('pp'));
 tree._root.children[0].children[0].appendChild(new Node('pear'));
 tree._root.children[0].children[0].appendChild(new Node('pig'));
 tree._root.children[0].children[0].appendChild(new Node('cola'));
 tree._root.children[0].children[0].appendChild(new Node('haha'));
 tree._root.children[0].children[2].appendChild(new Node('student'));
 tree._root.children[0].children[2].appendChild(new Node('teacher'));
 tree._root.children[1].children[0].appendChild(new Node('coder'));
 tree._root.children[1].children[0].appendChild(new Node('people'));
 tree._root.children[1].children[1].appendChild(new Node('bill'));
 tree._root.children[1].children[0].appendChild(new Node('gates'));
 tree._root.children[1].children[1].children[0].appendChild(new Node('demo'));
 tree._root.children[1].children[1].children[0].appendChild(new Node('dd'));
 }

 init();
 window.onload = function () {

 	var rt       = $('body>div')[0],
 		nodelist = [],
 		timer    = null,
 	    divs     = $('div'),
 		searchkey= $('input')[0],
 		DFbtn    = $('input')[1],
 		BFbtn    = $('input')[2];

 		DFbtn.onclick = function () {
 			reset();
 			traverseDF(rt);
 			renderColor();
 		}

 		BFbtn.onclick = function () {
 			reset();
 			traverseBF(rt);
 			renderColor();
 		}
 	for(let i=0;i<divs.length;i++)
 	{
 		divs[i].onclick = function (event) {

 			divs[i].className = 'click';
 			event.stopPropagation();
 		}	
 	}


 	//深度优先搜索
 	function traverseDF(node) {
 		if(node == null) return;
 		nodelist.push(node);
 		for (var i=0; i < node.children.length; i++) {
 		traverseDF(node.children[i]);
 		}
 	}
 	//广度优先搜索
 	function traverseBF(node) {
 		if(node == null) return;
 	 	nodelist.push(node);
 	 	var i = 0;
		while(nodelist[i]){
			for (var j =0,len = nodelist[i].children.length;j<len;j++){
				nodelist.push(nodelist[i].children[j]);
			}
			i++;
		}
 	 }
 	 //渲染颜色
 	function renderColor(){
 		clearInterval(timer);
 		var i = 0;
 		nodelist[i].style.background = '#00f';
 		search(nodelist[i]);
 		timer = setInterval(function () {
 			i++;
 			if (nodelist[i]) {
 				nodelist[i-1].style.background = '#fff';
 				nodelist[i].style.background = '#00f';
 				search(nodelist[i]);
 			}else{
 				nodelist[i-1].style.background = '#fff';
 				clearInterval(timer);
 			}	
 		}, 500);
 	}
 	//查找关键字
 	function search(node) {
 		var key = searchkey.value.trim();
 		// console.log(node.innerText.split(/\W/g)[0]);
 		if(!key) return;
 		var val = node.innerText.split(/\W/g)[0];
 		if(key == val){
 			node.className = 'active';
 		}
 	}
 	//重置
 	function reset() {
 		nodelist = [];
 		setInterval(timer);
 		var divs = $('div')
 		for(var i=0;i<divs.length;i++)
 		{
 			divs[i].style.background='#fff ';
 			divs[i].className = '';
 		}
 	}

 }
