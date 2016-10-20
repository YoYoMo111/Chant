function ChantApp(container_div_id) {
	this.container_div_id = container_div_id;
	
	this.stGallGroups = [["1", "2", "3", "4", "5"],
	                     ["1", "2", "3", "4", "5"],
		        		 ["1", "2"],
						 ["1", "2", "3", "4", "5", "6", "7"],
						 ["1", "2", "3", "4"],
						 ["1"]];
						 
    this.laonGroups = [["1", "2", "3", "4", "5"],
	                   ["1", "2", "3", "4", "5"], 
				       ["1", "2"],
					   ["1", "2", "3", "4", "5", "6"],
					   ["1", "2", "3", "4"],
					   ["1"]];
				       
	this.school = "";
	this.level = 0;
	this.group = 0;
	
	this.lastClickedItem = 0;
}

//NOTE: For St. Gall school = 1, for Laon school = 2
ChantApp.prototype.initLesson = function(school, level, group) {
	if (school == 1) {
		this.school = "StGall";
		this.schoolTitle = "St. Gall";
	}
	else if (school == 2) {
		this.school = "Laon";
		this.schoolTitle = "Laon";
	}
	else {
		this.school = "Combination";
		this.schoolTitle = "Combination";
	}
	this.level = level;
	this.group = group;
	this.lesson = new Lesson(this.school, level, group);
    this.lesson.initUI(this.container_div_id);

	// Change text color of selected menu item to red
	for (var i = 1; i <= this.getGroupNum(school, level); i++){
		//document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
		document.getElementById("menu-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="transparent";//review
	document.getElementById("u1960").style.background="transparent";//assessment
	document.getElementById("quizlet").style.background="transparent";//quizlet
	//document.getElementById("menu-"+school+"-"+level+"-"+group).style.background="#FF994D";//yoyo
	document.getElementById("menu-"+group).style.background="#FF994D";//yoyo
	
	
//	this.changeTextColor(group);
}

ChantApp.prototype.initReviewLesson = function(school, level) {
	this.level = level;

	if (school == 1) {    // St. Gall
		this.school = "StGall";
		this.schoolTitle = "St. Gall";
		this.reviewLesson = new ReviewLesson(this.school, level, this.stGallGroups[level-1]);
	}
	else if (school == 2) {    // Laon
		this.school = "Laon";
		this.schoolTitle = "Laon";
		this.reviewLesson = new ReviewLesson(this.school, level, this.laonGroups[level-1]);
	}
	this.reviewLesson.initUI(this.container_div_id);

	// Change text color of selected menu item to red
	for (var i = 1; i <= this.getGroupNum(school, level); i++){
		//document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
		document.getElementById("menu-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="#FF994D";//review
	document.getElementById("u1960").style.background="transparent";//assessment
	document.getElementById("quizlet").style.background="transparent";//quizlet
}

ChantApp.prototype.initTest = function(school, level) {
	this.level = level;

	if (school == 1) {    // St. Gall
		this.school = "StGall";
		this.schoolTitle = "St. Gall";
		this.levelTest = new LevelTest(this.school, level, this.stGallGroups[level-1]);
	}
	else if (school == 2) {    // Laon
		this.school = "Laon";
		this.schoolTitle = "Laon";
		this.levelTest = new LevelTest(this.school, level, this.laonGroups[level-1]);
	}	
	this.levelTest.initUI(this.container_div_id);
	
	// Change text color of selected menu item to red
	for (var i = 1; i <= this.getGroupNum(school, level); i++){
		//document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
		document.getElementById("menu-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="transparent";//review
	document.getElementById("u1960").style.background="#FF994D";//assessment
	document.getElementById("quizlet").style.background="transparent";//quizlet
}

/*yoyo add*/
ChantApp.prototype.initQuizlet = function(school, level) {
	this.level = level;

	if (school == 1) {    // St. Gall
		this.school = "StGall";
		this.schoolTitle = "St. Gall";
		this.quizlet = new Quizlet(this.school, level, this.stGallGroups[level-1]);
	}
	else if (school == 2) {    // Laon
		this.school = "Laon";
		this.schoolTitle = "Laon";
		this.quizlet = new Quizlet(this.school, level, this.laonGroups[level-1]);
	}		
	this.quizlet.initUI(this.container_div_id);
	
	// Change text color of selected menu item to red
	for (var i = 1; i <= this.getGroupNum(school, level); i++){
		//document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
		document.getElementById("menu-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="transparent";//review
	document.getElementById("u1960").style.background="transparent";//assessment
	document.getElementById("quizlet").style.background="#FF994D";//quizlet
}

ChantApp.prototype.getGroupNum = function(school, level) {
	if (level == 1 || level == 2) {
		return 5;
	}
    else if (level == 3) {
		return 2;
	}
    else if (level == 4) {
		return (8 - school);
	}
    else if (level == 5) {
		return 4;
	}
    else if (level == 6) {
		return 1;
	}
}

ChantApp.prototype.changeTextColor = function(index) {
	document.getElementById("menuItem" + index).style.color = "#ff6969";
	console.log("menuItem" + index + " clicked!");
	document.getElementById("menuItem" + this.lastClickedItem).style.color = "inherit";
	this.lastClickedItem = index;
}