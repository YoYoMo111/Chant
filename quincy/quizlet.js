function Quizlet(school,level,group){
	this.school = school;
	this.level = level;
	this.group = group;
	this.stGallGroup = [["","","Quizlet"],];
}

Quizlet.prototype.initUI = function(container_div_id) {
	if(this.school == "StGall" && this.level == 1){
		document.getElementById("scatter").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/scatter/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("race").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'race\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/gravity/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("flash-cards").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'flash-cards\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/flashcards/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("spell").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'spell\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/speller/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("test").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'test\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/test/embed" height="550" width="100%" style="border:0"></iframe></p>';
	  }
	  else{
	  	document.getElementById("scatter").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/scatter/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("race").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'race\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/gravity/embed" height="550" width="100%" style="border:0"></iframe></p>';
	  }

	this.container_div = document.getElementById(container_div_id);
	this.container_div.innerHTML = 
		'<div class="quizletintroText">We have placed additional tools to help you review the material in this level on Quizlet. Click any of the links to begin.</div>'+
	    '<div id="quizletOutdiv" style="margin-left: 123.5px;">'+

	    '<div id="scatterLink" class="quizletBox" onclick="document.getElementById(\'scatter\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
	    '<div class="quizletContent">'+
	    '<img id="scatterIcon" src="images/scatter.png" style = "height:70px; margin-bottom: 12px;"><br>'+
	    '<a href="javascript:void(0)" >Match</a>'+
	    '</div></div>' +

		'<div id="raceLink" class="quizletBox" onclick="document.getElementById(\'race\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/gravity.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Gravity</a>'+
		'</div></div>'+

		'<div id="flash-cardsLink" class="quizletBox" onclick="document.getElementById(\'flash-cards\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/gravity.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Flash Cards</a>'+
		'</div></div>'+

		'<div id="spellLink" class="quizletBox" onclick="document.getElementById(\'spell\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/gravity.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Spell</a>'+
		'</div></div>'+

		'<div id="testLink" class="quizletBox" onclick="document.getElementById(\'test\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/gravity.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Test</a>'+
		'</div></div>'

		+'</div>' ;
}