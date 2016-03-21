function ChantApp(container_div_id) {
	this.container_div_id = container_div_id;
	
	this.stGallGroups = [["1", "2", "3", "4", "5"],
	                     ["1", "2", "3", "4", "5"],
		        		 ["1", "2"],
						 ["1", "2", "3", "4", "5", "6", "7"],
						 ["1", "2", "3", "4"]];
						 
    this.laonGroups = [["1", "2", "3", "4", "5"],
	                   ["2A", "3A", "4A", "5A"], 
				       ["1C", "1D", "2D", "3D", "3E"],
					   ["1", "2", "3", "4"]];
				       
	this.school = "";
	this.level = 0;
	this.group = 0;
	
	this.lastClickedItem = 0;
}

//NOTE: For St. Gall school = 1, for Laon school = 2
ChantApp.prototype.initLesson = function(school, level, group) {
	this.school = (school == 1) ? "StGall" : "Laon";
	this.schoolTitle = (school == 1) ? "St. Gall" : "Laon";
	this.level = level;
	this.group = group;
	
	this.lesson = new Lesson(this.school, level, group);
    this.lesson.initUI(this.container_div_id);
    
	// Change text color of selected menu item to red
	for (var i = 1; i <= 5; i++){
		document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="transparent";//review
	document.getElementById("u1960").style.background="transparent";//assessment
	document.getElementById("quizlet").style.background="transparent";//quizlet
	document.getElementById("menu-"+school+"-"+level+"-"+group).style.background="#FAA03F";//yoyo
	
	
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
		this.reviewLesson = new ReviewLesson(this.school, this.laonLevels[level-1], this.laonGroups[level-1]);
	}
	
	this.reviewLesson.initUI(this.container_div_id);

	// Change text color of selected menu item to red
	for (var i = 1; i <= 5; i++){
		document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="#FAA03F";//review
	document.getElementById("u1960").style.background="transparent";//assessment
	document.getElementById("quizlet").style.background="transparent";//quizlet


/*	var count = 0;
	if (this.school == "StGall") {
		count = this.stGallGroups[level-1].length;
	}
	else {
		count = this.laonGroups[level-1].length;
	}
	this.changeTextColor(count+1);*/
}

ChantApp.prototype.initTest = function(school, level) {
	this.school = (school == 1) ? "StGall" : "Laon";
	this.schoolTitle = (school == 1) ? "St. Gall" : "Laon";
	this.level = level;
	
	this.levelTest = new LevelTest(this.school, level, this.stGallGroups[level-1]);
	this.levelTest.initUI(this.container_div_id);
	
	// Change text color of selected menu item to red

	for (var i = 1; i <= 5; i++){
		document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="transparent";//review
	document.getElementById("u1960").style.background="#FAA03F";//assessment
	document.getElementById("quizlet").style.background="transparent";//quizlet

/*	var count = 0;
	if (this.school == "StGall") {
		count = this.stGallGroups[level-1].length;
	}
	else {
		count = this.laonGroups[level-1].length;
	}
	this.changeTextColor(count+2);*/
}

/*yoyo add*/
ChantApp.prototype.initQuizlet = function(school, level) {
	this.school = (school == 1) ? "StGall" : "Laon";
	this.schoolTitle = (school == 1) ? "St. Gall" : "Laon";
	this.level = level;
	
	this.quizlet = new Quizlet(this.school, level, this.stGallGroups[level-1]);
	this.quizlet.initUI(this.container_div_id);
	
	// Change text color of selected menu item to red
	for (var i = 1; i <= 5; i++){
		document.getElementById("menu-"+school+"-"+level+"-"+i).style.background="transparent";//yoyo
	}
	document.getElementById("u3339").style.background="transparent";//intro
	document.getElementById("u1981").style.background="transparent";//review
	document.getElementById("u1960").style.background="transparent";//assessment
	document.getElementById("quizlet").style.background="#FAA03F";//quizlet

/*	var count = 0;
	if (this.school == "StGall") {
		count = this.stGallGroups[level-1].length;
	}
	else {
		count = this.laonGroups[level-1].length;
	}
	this.changeTextColor(count+2);*/
}

ChantApp.prototype.changeTextColor = function(index) {
	document.getElementById("menuItem" + index).style.color = "#ff6969";
	console.log("menuItem" + index + " clicked!");
	document.getElementById("menuItem" + this.lastClickedItem).style.color = "inherit";
	this.lastClickedItem = index;
}