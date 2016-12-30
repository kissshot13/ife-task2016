function $(val){
	return document.querySelectorAll(val);
}
var rt = $('#root')[0],
    nodelist = [],
    prebtn = $('input')[0],
    inbtn = $('input')[1],
    postbtn = $('input')[2],
    timer = null;
window.onload = function(){
 	prebtn.onclick = function () {
 		reset();
 		preO(rt);
 		oredeColor();	
 	}
 	inbtn.onclick = function () {
 		reset();
 		inO(rt);
 		oredeColor();
 	}
 	postbtn.onclick = function () {
 		reset();
 		postO(rt);
 		oredeColor();
 	}
 };

  function preO(node) {
  	if (node!= null) {
  		nodelist.push(node);
  		preO(node.children[0]);
  		preO(node.children[1]);
  	}
  }
  function inO(node) {
  	if (node!= null) {
  		inO(node.children[0]);
  		nodelist.push(node);
  		inO(node.children[1]);
  	}
  }
  function postO(node) {
		if (node!= null) {
			postO(node.children[0]);
			postO(node.children[1]);
			nodelist.push(node);
		}	
	 }

  function oredeColor() {
  		var i = 0;
  		nodelist[0].style.background = '#00f';
  		timer = setInterval(function(){
  			i++;
  			if(i<nodelist.length){
  				nodelist[i-1].style.background = '#fff';
  				nodelist[i].style.background = '#00f';
  			}
  			else {
				clearInterval(timer);  				
  				nodelist[nodelist.length-1].style.background = '#fff';
  			}
  		},1000)
  }

  function reset() {
  	nodelist=[];
  	clearInterval(timer);
  	 var divs = $('div');
  	 console.log(divs);
  	 for(var i=0;i<divs.length;i++)
  	 {
  	 	divs[i].style.background = '#fff';
 
  	 }
  }