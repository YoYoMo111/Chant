function Quizlet(school,level,group){
	this.school = school;
	this.level = level;
	this.group = group;
	this.stGallGroup = [["","","Quizlet"],];
}

Quizlet.prototype.initUI = function(container_div_id) {
	document.getElementById("scatter").innerHTML =
	'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
  	'<p><iframe src="https://quizlet.com/97373929/scatter/embed" height="550" width="100%" style="border:0"></iframe></p>';

  	document.getElementById("race").innerHTML =
  	'<a href="javascript:void(0)" onclick="document.getElementById(\'race\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
  	'<p><iframe src="https://quizlet.com/97373929/spacerace/embed" height="550" width="100%" style="border:0"></iframe></p>';

	this.container_div = document.getElementById(container_div_id);
	this.container_div.innerHTML = 
	    '<div id="scatterLink" class="box"><a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">Scatter</a></div>' +
		'<div id="raceLink" class="box"><a href="javascript:void(0)" onclick="document.getElementById(\'race\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">Space Race</a></div>' ;
}