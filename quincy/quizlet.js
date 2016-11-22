function Quizlet(school,level,group){
	this.school = school;
	this.level = level;
	this.group = group;
	this.stGallGroup = [["","","Quizlet"],];
}

Quizlet.prototype.initUI = function(container_div_id) {
	this.container_div = document.getElementById(container_div_id);
	this.container_div.innerHTML = 
		'<div class="quizletintroText">We have placed additional tools to help you review the material in this level on Quizlet. Click any of the links to begin.</div>'+
		'<div id="quizletOutdiv" style="margin-left: 123.5px;"></div>';
	if(this.school == "StGall" && this.level == 4){
		document.getElementById("quizletOutdiv").innerHTML +=
		'<div id = "quizletSet1">Latin Terms and Letters:</div>';
	}

	document.getElementById("quizletOutdiv").innerHTML += 	
	    '<div id="scatterLink" class="quizletBox" onclick="document.getElementById(\'scatter\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
	    '<div class="quizletContent">'+
	    '<img id="scatterIcon" src="images/match.png" style = "height:70px; margin-bottom: 12px;"><br>'+
	    '<a href="javascript:void(0)" >Match</a>'+
	    '</div></div>' +

		'<div id="raceLink" class="quizletBox" onclick="document.getElementById(\'race\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/gravity.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Gravity</a>'+
		'</div></div>'+

		'<div id="flash-cardsLink" class="quizletBox" onclick="document.getElementById(\'flash-cards\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/cards.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Flash Cards</a>'+
		'</div></div>'+

		'<div id="spellLink" class="quizletBox" onclick="document.getElementById(\'spell\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/spell.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Spell</a>'+
		'</div></div>'+

		'<div id="learnLink" class="quizletBox" onclick="document.getElementById(\'learn\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/learn.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >learn</a>'+
		'</div></div>'+

		'<div id="testLink" class="quizletBox" onclick="document.getElementById(\'test\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		'<div class="quizletContent">'+
		'<img id="gravityIcon" src="images/test.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		'<a href="javascript:void(0)" >Test</a>'+
		'</div></div>';

		
		if(this.school == "StGall" && this.level == 4){
			document.getElementById("quizletOutdiv").innerHTML += 
			'<br><div id = "quizletSet2">Latin Terms and English Translations:</div>'+
			'<div id="scatterLink2" class="quizletBox" onclick="document.getElementById(\'scatter2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
		    '<div class="quizletContent">'+
		    '<img id="scatterIcon" src="images/match.png" style = "height:70px; margin-bottom: 12px;"><br>'+
		    '<a href="javascript:void(0)" >Match</a>'+
		    '</div></div>' +

			'<div id="raceLink2" class="quizletBox" onclick="document.getElementById(\'race2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
			'<div class="quizletContent">'+
			'<img id="gravityIcon" src="images/gravity.png" style = "height:70px; margin-bottom: 12px;"><br>'+
			'<a href="javascript:void(0)" >Gravity</a>'+
			'</div></div>'+

			'<div id="flash-cardsLink2" class="quizletBox" onclick="document.getElementById(\'flash-cards2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
			'<div class="quizletContent">'+
			'<img id="gravityIcon" src="images/cards.png" style = "height:70px; margin-bottom: 12px;"><br>'+
			'<a href="javascript:void(0)" >Flash Cards</a>'+
			'</div></div>'+

			'<div id="learnLink2" class="quizletBox" onclick="document.getElementById(\'learn2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
			'<div class="quizletContent">'+
			'<img id="gravityIcon" src="images/learn.png" style = "height:70px; margin-bottom: 12px;"><br>'+
			'<a href="javascript:void(0)" >learn</a>'+
			'</div></div>'+

			'<div id="testLink2" class="quizletBox" onclick="document.getElementById(\'test2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'">'+
			'<div class="quizletContent">'+
			'<img id="gravityIcon" src="images/test.png" style = "height:70px; margin-bottom: 12px;"><br>'+
			'<a href="javascript:void(0)" >Test</a>'+
			'</div></div>'
		}

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

	  	document.getElementById("learn").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'learn\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/learn/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("test").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'test\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/test/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("spellLink").style.display='none';
	  }
	  else if (this.school == "StGall" && this.level == 2){
	  	document.getElementById("scatter").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156951946/match/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("flash-cards").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'flash-cards\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156951946/flashcards/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("learn").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'learn\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156951946/learn/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("test").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'test\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156951946/test/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("raceLink").style.display='none';
	  	document.getElementById("spellLink").style.display='none';
	  }
	  else if (this.school == "StGall" && this.level == 3){
	  	document.getElementById("scatter").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/166551204/match/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("flash-cards").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'flash-cards\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/166551204/flashcards/embed" height="550" width="100%" style="border:0"></iframe></p>';


	  	document.getElementById("test").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'test\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/166551204/test/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("spellLink").style.display='none';
	  	document.getElementById("raceLink").style.display='none';
	  	document.getElementById("learnLink").style.display='none';
	  }
	  else if (this.school == "StGall" && this.level == 4){
	  	document.getElementById("scatter").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168355966/match/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("race").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'race\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168355966/gravity/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("flash-cards").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'flash-cards\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168355966/flashcards/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("learn").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'learn\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168355966/learn/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("test").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'test\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168355966/test/embed" height="550" width="100%" style="border:0"></iframe></p>';
	  	//set 2
	  	document.getElementById("scatter2").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter2\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168357639/match/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("race2").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'race2\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168357639/gravity/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("flash-cards2").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'flash-cards2\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168357639/flashcards/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("learn2").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'learn2\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168357639/spell/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("test2").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'test2\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/168357639/test/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("spellLink").style.display='none';
	  }
	  else{
	  	document.getElementById("scatter").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'scatter\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/scatter/embed" height="550" width="100%" style="border:0"></iframe></p>';

	  	document.getElementById("race").innerHTML =
	  	'<a href="javascript:void(0)" onclick="document.getElementById(\'race\').style.display=\'none\';document.getElementById(\'fade\').style.display=\'none\'" class="textright">Close</a>'+
	  	'<p><iframe src="https://quizlet.com/156945177/gravity/embed" height="550" width="100%" style="border:0"></iframe></p>';
	  }

}