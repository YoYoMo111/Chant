function TestResult() {
	this.questionText = ["Enter the name of the given neum",
	                     "Select the neum that matches the given name: ",
	                     "Select the example(s) of modern notation that match the given neum",
						 "Select the neum(s) that match the given modern note",
						 "Drag neums to match the notes in the score and enter the neums' names.",
						 "Identify the type and location of alteration of the given neum",
						 "Select the modern equivalent(s) of the given neum",
						 "TBD",
						 "TBD",
						 "Drag the neums to the box to match the notes in the score."];
}

TestResult.prototype.show = function(exercises) {
	document.getElementById("question").innerHTML = "Test Result";
		
	var totalScore = 0;
	var perfectScore = 0;
	var tableHTML = '<table class="test-result-table"><div class=title><tr><th>No.</th><th style="text-align: center;">Question</th><th>Points</th></tr></div>';
	
	for (var i = 1; i < exercises.length - 1; i++) {              //all exercise result padding bottom
	    var text;
	    if (exercises[i].type == 8 || exercises[i].type == 9) {
			text = exercises[i].questionText;
		}
		else if (exercises[i].type == 21 || exercises[i].type == 22) {
			text = "Select the letter(s) that signify the given term: ";
		}
		else {
			text = this.questionText[exercises[i].type-1];
		}
	
		tableHTML += '<tr class=OutsideUnit><td class=Num>' + i + '</td><td style="padding-bottom: 20px;">' + text;//yoyo add num,outside unit

		if (exercises[i].type == 1 || exercises[i].type == 3 || exercises[i].type == 4) {
			tableHTML += this.showQuestionSymbol(exercises[i]);
			
			if (exercises[i].type == 1) {//fill name excerise result:
				//tableHTML += "Your answer: " + exercises[i].studentsAnswer + "<br class=fillExLineHight>Right answer: " + exercises[i].solution.replace("=", " OR ");
				
				var answer = "";
				for (var j = 0; j < exercises[i].studentsAnswer.length; j++) {
					if (exercises[i].studentsAnswer[j] != "") {
						answer += exercises[i].studentsAnswer[j] + ", ";
					}
				}
				answer = answer.substring(0, answer.length - 2);
				
				var solution = "";
				for (var j = 0; j < exercises[i].solution.length; j++) {
					solution += exercises[i].solution[j] + ", ";
				}
				solution = solution.substring(0, solution.length - 2);
				
				tableHTML += "Your answer: " + answer + '<br class="fillExLineHight">Right answer: ' + solution;
			}
			else {
				tableHTML += this.showSymbolAnswers(exercises[i]);
			}
		}
		else if (exercises[i].type == 2 || exercises[i].type == 21 || exercises[i].type == 22) {
			tableHTML += exercises[i].neumName + '<img class=test-result-symbol src="quincy/img/transparent.png"><br>'; // <div style="height=50px;width=1px;"></div>
			tableHTML += this.showSymbolAnswers(exercises[i]);
		}
		else if (exercises[i].type == 5) {
			tableHTML += '<img class=test-result-symbol src="quincy/img/transparent.png"><br>' + this.showScoreAnswers(exercises[i]);
		}
		// working
		else if (exercises[i].type == 6) {
			tableHTML += this.showQuestionSymbol(exercises[i]);
			tableHTML += this.showAlterationAnswers(exercises[i]);
		}
		else if (exercises[i].type == 7) {
			tableHTML += this.showQuestionSymbol(exercises[i]);
			tableHTML += this.showSymbolAnswersForTypeSeven(exercises[i]);
		}
		else if (exercises[i].type == 8) {
			tableHTML += this.showQuestionSymbol(exercises[i]);
			
			var html = "Your answer: ";
			var str = "";
			for (var j = 0; j < exercises[i].studentsAnswer.length; j++) {
				if (exercises[i].studentsAnswer[j] != "") {
					str += exercises[i].studentsAnswer[j] + ", ";
				}
			}
			html += str.substr(0, str.length - 2);
			str = "";
			
			html += '<br class="fillExLineHight">Right answer: ';
			var names = (exercises[i].language == 2) ? exercises[i].correctEnglishName : exercises[i].correctLatinName;
			for (var j = 0; j < names.length; j++) {
				str += names[j] + ", ";
			}
			html += str.substr(0, str.length - 2);
			tableHTML += html;
		}
		else if (exercises[i].type == 9) {
			tableHTML += ": " + exercises[i].neumName + '<img class=test-result-symbol src="quincy/img/transparent.png"><br>';
			
			var html = "Your answer: ";
			var str = "";
			for (var j = 0; j < exercises[i].studentsAnswer.length; j++) {
				if (exercises[i].studentsAnswer[j] != "") {
					str += exercises[i].studentsAnswer[j] + ", ";
				}
			}
			html += str.substr(0, str.length - 2);
			str = "";
			
			html += '<br class="fillExLineHight">Right answer: ';
			for (var j = 0; j < exercises[i].answers.length; j++) {
				str += exercises[i].answers[j] + ", ";
			}
			html += str.substr(0, str.length - 2);
			tableHTML += html;	
		}
		// working
		else if (exercises[i].type == 10) {
			tableHTML += '<img class="result-score-image" src="quincy/scores/' + exercises[i].scoreFileName + '"><br>';
			tableHTML += this.showSymbolAnswers(exercises[i]);
		}
		
		tableHTML += '</td><td class=MyScore>' + exercises[i].score + '</td></tr>';//yoyo add class my score
		
		totalScore += exercises[i].score;
		perfectScore += exercises[i].maxScore;
	}
	tableHTML += '</table>';
	document.getElementById("dynamicArea").innerHTML = 
	    "<div class=YourScore>"+"Your score is " + totalScore + "/" + perfectScore + ".</div><br>" + tableHTML;
	//yoyo add div class yourscore.
    document.getElementById("prev").style.visibility = "hidden";
	document.getElementById("next").style.visibility = "hidden";
}

TestResult.prototype.showQuestionSymbol = function(exercise) {	
	return '<img class="test-result-symbol" src="quincy/symbols/' +
          	exercise.symbolDB.symbols[exercise.questionSymbolID].school + '/Level_' +
		    exercise.symbolDB.symbols[exercise.questionSymbolID].level + '/Group_' +
		    exercise.symbolDB.symbols[exercise.questionSymbolID].group + '/' +
		    exercise.symbolDB.symbols[exercise.questionSymbolID].fileName + '"><br>';
}

TestResult.prototype.showSymbolAnswers = function(exercise) {	
	var html = "<table><tr><td class=YourAnswer>Your Answer<br>";//yoyo add class
	if (exercise.studentsAnswer != "") {
		var studentAnswerSymbolIDs = exercise.studentsAnswer.split("-");
		for (var i = 0; i < studentAnswerSymbolIDs.length; i++) {
		html += '<img class="test-result-symbol" src="quincy/symbols/' +
		        exercise.symbolDB.symbols[studentAnswerSymbolIDs[i]].school + '/Level_' +
		        exercise.symbolDB.symbols[studentAnswerSymbolIDs[i]].level + '/Group_' +
		        exercise.symbolDB.symbols[studentAnswerSymbolIDs[i]].group + '/' +
		        exercise.symbolDB.symbols[studentAnswerSymbolIDs[i]].fileName + '">';
		}
	}
	html += "</td><td class=divider></td><td class=RightAnswer>Right Answer<br>";//yoyo add td,add divider and right answer class
	var solutionSymbolIDs = exercise.solution.split("-");
	for (var i = 0; i < solutionSymbolIDs.length; i++) {
		html += '<img class="test-result-symbol" src="quincy/symbols/' +
		        exercise.symbolDB.symbols[solutionSymbolIDs[i]].school + '/Level_' +
		        exercise.symbolDB.symbols[solutionSymbolIDs[i]].level + '/Group_' +
		        exercise.symbolDB.symbols[solutionSymbolIDs[i]].group + '/' +
		        exercise.symbolDB.symbols[solutionSymbolIDs[i]].fileName + '">';
	}
	html += "</td></tr></table>";
	return html;
}

TestResult.prototype.showSymbolAnswersForTypeSeven = function(exercise) {
	var html = "<table><tr><td class=YourAnswer>Your Answer<br>";//yoyo add class
	if (exercise.studentsAnswer != "") {
		var studentAnswerSymbolIDs = exercise.studentsAnswer.split("-");
		for (var i = 0; i < studentAnswerSymbolIDs.length; i++) {
			html += '<img class="test-result-symbol" src="quincy/symbols/Extra/' +
				exercise.school + '/Level_' + exercise.level + '/Group_' + exercise.group + '/' +
				exercise.getOptionImageFileName(exercise.symbolDB.symbols[exercise.questionSymbolID].fileName, String.fromCharCode(65 + parseInt(studentAnswerSymbolIDs[i]))) + '">';
		}
	}
	html += "</td><td class=divider></td><td class=RightAnswer>Right Answer<br>";//yoyo add td,add divider and right answer class
	var indices = exercise.rawSolution.split("-");
	for (var i = 0; i < indices.length; i++) {
		html += '<img class="test-result-symbol" src="quincy/symbols/Extra/' +
				exercise.school + '/Level_' + exercise.level + '/Group_' + exercise.group + '/' +
				exercise.getOptionImageFileName(exercise.symbolDB.symbols[exercise.questionSymbolID].fileName, indices[i]) + '">';		
	}
	html += "</td></tr></table>";
	return html;
}

TestResult.prototype.showScoreAnswers = function(exercise) {
	var html = '<img class="result-score-image" src="quincy/scores/' + exercise.scoreFileName + '"><br>';
	html += '<table class="inside-table"><tr><td class=insideTabeSymbol>Symbol</td><td class=insideTableYourAnswer>Your Answer</td><td class=insideTableRightAnswer>Right Answer</td></tr>';//yo add class insideTableSymbol
	for (var i = 0; i < exercise.size; i++) {
		html += "<tr><td class=insideNum>" + (i + 1) + '</td><td class=insideYourSymbol>';//yoyo add insideNum,insideYourSymbol
		if (exercise.studentsAnswerIDs[i] != "") {
			html += '<img class="test-result-symbol" src="quincy/symbols/' +
		        exercise.symbolDB.symbols[exercise.studentsAnswerIDs[i]].school +
				'/Level_' + exercise.symbolDB.symbols[exercise.studentsAnswerIDs[i]].level +
		        '/Group_' + exercise.symbolDB.symbols[exercise.studentsAnswerIDs[i]].group + '/' +
				exercise.symbolDB.symbols[exercise.studentsAnswerIDs[i]].fileName + '">';
		}
		html += exercise.studentAnswerNames[i] + "</td>" +				
				'<td><img class="test-result-symbol" src="quincy/symbols/' +
		        exercise.symbolDB.symbols[exercise.solutionIDs[i]].school +
				'/Level_' + exercise.symbolDB.symbols[exercise.solutionIDs[i]].level +
		        '/Group_' + exercise.symbolDB.symbols[exercise.solutionIDs[i]].group + '/' +
				exercise.symbolDB.symbols[exercise.solutionIDs[i]].fileName + '">' +
				exercise.symbolDB.symbols[exercise.solutionIDs[i]].name.replace("=", " OR ") + "</td></tr>";
	}
	html += "</table>";
	return html;
}

TestResult.prototype.showAlterationAnswers = function(exercise) {
	var html = "Your answer: ";
	var type = (exercise.studentAnswerAltType == "") ? "unselected" : exercise.studentAnswerAltType;
	html += "<br class=fillExLineHight> - Type: " + type;
	
	if (exercise.secondPartUnlocked) {
		if (exercise.altType != "both") {
			html += "<br class=fillExLineHight> - Location: " + this.getAltLocText(exercise.studentAnswerAltLoc);
		}
		else {
			var answerSet = exercise.studentAnswerAltLoc.split(",");
			html += "<br class=fillExLineHight> - Location: rhythmic - " + this.getAltLocText(answerSet[0]) + ", repercussive - " + this.getAltLocText(answerSet[1]);
		}
	}
	else {
		html += "<br class=fillExLineHight> - Location: unselected";
	}
	
		
	html += "<br class=fillExLineHight>Right answer:";
	if (exercise.altType != "both") {
		html += "<br class=fillExLineHight> - Type: " + exercise.altType + "<br class=fillExLineHight> - Location: " + this.getAltLocText(exercise.altLoc);
	}
	else {
		var loc = exercise.altLoc.split(",");
		html += "<br class=fillExLineHight> - Type: both<br class=fillExLineHight> - Location: rhythmic - " + this.getAltLocText(loc[0]) + ", repercussive - " + this.getAltLocText(loc[1]);
	}
	return html;
}

TestResult.prototype.getAltLocText = function(loc) {
	if (loc == 0 || loc == "") {
		return "unselected";
	}
	else {
		var locs = loc.split("-");
		var str = "";
		for (var i = 0; i < locs.length; i++) {
			if (locs[i] == 1)     str += "beginning + ";
			else if (locs[i] == 2)    str += "middle + ";
			else if (locs[i] == 3)    str += "end + ";
			else if (locs[i] == 4)    str += "all + ";
		}
		return str.substr(0, str.length - 3);
	}
}