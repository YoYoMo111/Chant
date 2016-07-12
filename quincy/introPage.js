function IntroPage(school, level, group) {
	this.school = school;
	this.level = level;
	this.group = group;
	this.stGallGroup = [["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
	                    ["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
						["Melodic Implications", "Melodic and Rhythmic Implications", "Review Lesson", "Assessment"],
						["Melodic Implications", "Rhythmic Implications", "Modifying Letters", "Combinations", "Infrequently Used", "Combined Letter Separate Meanings", "Others", "Review Lesson", "Assessment"],
						["Quilisma", "Oriscus Basics", "Oriscus Variations", "Liquescence", "Review Lesson", "Assessment"],
						["Neumatic Breaks", "Review Lesson", "Assessment"]];
						
	this.laonGroup =   [["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
	                    ["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
						["Melodic Implications", "Melodic and Rhythmic Implications", "Review Lesson", "Assessment"],
						["Melodic Implications", "Rhythmic Implications", "Modifying Letters", "Combinations", "Infrequently Used", "Combined Letter Separate Meanings", "Others", "Review Lesson", "Assessment"],
						["Quilisma", "Oriscus Basics", "Oriscus Variations", "Liquescence", "Review Lesson", "Assessment"],
						["Neumatic Breaks", "Review Lesson", "Assessment"]];
	
	this.introText = ["review", "test"];
}

IntroPage.prototype.show = function() {
	if (this.school == "StGall") {
		document.getElementById("question").innerHTML = this.stGallGroup[this.level - 1][this.group - 1];
	}
	else if (this.school == "Laon") {
		document.getElementById("question").innerHTML = this.laonGroup[this.level - 1][this.group - 1];
	}
	
	// Show instruction videos for this group
	if (this.school == "StGall" && this.group <= this.stGallGroup[this.level - 1].length - 2 ||
	    this.school == "Laon" && this.group <= this.laonGroup[this.level - 1].length - 2) {
		document.getElementById("dynamicArea").innerHTML =
		'<a href="javascript:void(0)" onclick="document.getElementById(\'video-' + this.school + '-' + this.level + '-' + this.group + '-1\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'"><div class="video_thumbnail"></div></a>' +
		'<div class="box"><div class="video-description">A description of each of the four single-note St. Gall neums: the punctum, the tractulus, the virga, and the gravis.</div></div>' +
		
		'<a href="javascript:void(0)" onclick="document.getElementById(\'video-' + this.school + '-' + this.level + '-' + this.group + '-2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'"><div class="video_thumbnail"></div></a>' +
		'<div class="box"><div class="video-description">A comparison of how each of the four single-note neums appears in modern chant notation with how each appears in early St. Gall manuscripts.</div></div>'  + 
	
		'<a href="javascript:void(0)" onclick="document.getElementById(\'video-' + this.school + '-' + this.level + '-' + this.group + '-3\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'"><div class="video_thumbnail"></div></a>' +
		'<div class="box"><div class="video-description">Communio: Visionem quam vidistis, performed by Marek Klein.</div></div>' /* + 		

		'<div id="continueToExLink"><div id="spacer"><div id="continueToExercises">Exercises</div></div></div>'*/;
		/*document.getElementById("spacer").innerHTML='<div id="continueToExercises">Exercises</div>'*/
		
	}
	// Show instruction text for review or test
	else {
		document.getElementById("dynamicArea").innerHTML = this.introText[this.group + 1 - this.stGallGroup[this.level - 1].length];
	}
	
    
	// Show right arrow only	
	//document.getElementById("prev").style.visibility = "hidden";
	//document.getElementById("progressBarOutline").style.display = "none";//yoyo
}