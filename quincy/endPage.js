function EndPage(school, level, group) {
	this.school = school;
	this.level = level;
	this.group = group;
	
	this.stGallGroups = ["single-note neums", "repercussive neums", "two-note neums",
	                     "three-note neums", "four- or five-note neums", "review lesson"];
}

EndPage.prototype.show = function() {
	document.getElementById("question").innerHTML = "The end";
	
	document.getElementById("dynamicArea").innerHTML =
    	"You have finished the exercises.";
	
    // Show prev arrow only	
	document.getElementById("next").style.visibility = "hidden";
}

EndPage.prototype.grade = function() {}