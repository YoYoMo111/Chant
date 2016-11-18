function IntroPage(school, level, group) {
	this.school = school;
	this.level = level;
	this.group = group;
	this.stGallGroup = [["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
	                    ["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
						["Melodic Implications", "Melodic and Rhythmic Implications", "Review Lesson", "Assessment"],
						["Melodic Implications", "Rhythmic Implications", "Modifying Letters", "Combinations", "Infrequently Used", "Combined Letters Separate Meanings", "Others", "Review Lesson", "Assessment"],
						["Quilisma", "Oriscus Basics", "Oriscus Variations", "Liquescence", "Review Lesson", "Assessment"],
						["Neumatic Breaks", "Review Lesson", "Assessment"]];
						
	this.laonGroup =   [["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
	                    ["Single-note Neums", "Repercussive Neums", "Two-note Neums", "Three-note Neums", "Four- or Five-note Neums", "Review Lesson", "Assessment"],
						["Melodic Implications", "Melodic and-or Rhythmic Implications", "Review Lesson", "Assessment"],
						["Melodic Implications", "Rhythmic Implications", "Melodic or Rhythmic Implications", "Combinations", "Combined Letters Separate Meanings", "Tironien Signs", "Review Lesson", "Assessment"],
						["Quilisma", "Oriscus Basics", "Oriscus Variations", "Liquescence", "Review Lesson", "Assessment"],
						["Neumatic Breaks", "Review Lesson", "Assessment"]];
}

IntroPage.prototype.show = function() {
	if (this.school == "StGall") {
		document.getElementById("question").innerHTML = this.stGallGroup[this.level - 1][this.group - 1];
	}
	else if (this.school == "Laon") {
		document.getElementById("question").innerHTML = this.laonGroup[this.level - 1][this.group - 1];
	}
	else {
		document.getElementById("question").innerHTML = "Level " + this.level;
	}
	
	// Show instruction videos for this group
	if (this.school == "StGall" || this.school == "Laon") {
		if (this.school == "StGall" && this.group <= this.stGallGroup[this.level - 1].length - 2 ||
			this.school == "Laon" && this.group <= this.laonGroup[this.level - 1].length - 2) {
			document.getElementById("dynamicArea").innerHTML =
			'<a href="javascript:void(0)" onclick="document.getElementById(\'video-' + this.school + '-' + this.level + '-' + this.group + '-1\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'"><div class="video_thumbnail"></div></a>' +
			'<div class="box"><div class="video-description">A description of each of the four single-note St. Gall neums: the punctum, the tractulus, the virga, and the gravis.</div></div>' +
			
			'<a href="javascript:void(0)" onclick="document.getElementById(\'video-' + this.school + '-' + this.level + '-' + this.group + '-2\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'"><div class="video_thumbnail"></div></a>' +
			'<div class="box"><div class="video-description">A comparison of how each of the four single-note neums appears in modern chant notation with how each appears in early St. Gall manuscripts.</div></div>'  + 
		
			'<a href="javascript:void(0)" onclick="document.getElementById(\'video-' + this.school + '-' + this.level + '-' + this.group + '-3\').style.display=\'block\';document.getElementById(\'fade\').style.display=\'block\'"><div class="video_thumbnail"></div></a>' +
			'<div class="box"><div class="video-description">Communio: Visionem quam vidistis, performed by Marek Klein.</div></div>';
		}
		// Show instruction text for review
		if (this.school == "StGall" && this.group == this.stGallGroup[this.level - 1].length - 1 ||
			this.school == "Laon" && this.group == this.laonGroup[this.level - 1].length - 1) {
			// Level 4
			if (this.level == 4) {
				document.getElementById("dynamicArea").innerHTML =
				    '<div class = "introText">All of the previous exercises are assembled together here for your review.<br><br>Below there is a study guide to help you prepare.<br><br>When you are ready to begin, click the link below to go to the review exercises.</div>'+
				    '<a class="nonblock nontext museBGSize grpelem" id = "studyGuide" href="St_Gall_Level_Four_ Study_Guide.pdf" target="_blank"></a>';
			}
			else {
				document.getElementById("dynamicArea").innerHTML =
					'<div class = "introText">All of the previous exercises are assembled together here for your review.<br><br>In addition, there are some surprise questions to help you synthesize the material in this level.<br><br>When you are ready to begin, click the link below to go to the review exercises.</div>';
			}
		}
		// Show instruction text for test
		if (this.school == "StGall" && this.group == this.stGallGroup[this.level - 1].length ||
			this.school == "Laon" && this.group == this.laonGroup[this.level - 1].length) {
			// Level 4
			if (this.level == 4) {
				document.getElementById("dynamicArea").innerHTML =
					'<div class = "introText">This test consists of a small number of questions taken randomly from the various exercises for this level.<br><br>In the assessment you will be able to review your answers and see your score only when the test is complete.<br><br>When you are ready to begin, click the link below to go to the assessment.</div>';
			}
			else {
				document.getElementById("dynamicArea").innerHTML =
					'<div class = "introText">This test consists of a small number of questions taken randomly from the various exercises for this level. In addition, there are some surprise questions to assess your synthesis of the material in this level.<br><br>In the assessment you will be able to review your answers and see your score only when the test is complete.<br><br>When you are ready to begin, click the link below to go to the assessment.</div>';
			}
		}
	}
	else {
		document.getElementById("dynamicArea").innerHTML = "Combined exercises for level " + this.level;
	}
}