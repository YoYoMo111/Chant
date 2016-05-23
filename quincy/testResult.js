function TestResult() {
	this.questionText = ["Enter the name of the given neum",
	                     "Select the neum that matches the given name",
	                     "Select the example(s) of modern notation that match the given neum",
						 "Select the neum(s) that match the given modern note",
						 "Drag neums to match the notes in the score and enter the neums' names"];
}

TestResult.prototype.show = function(exercises) {
	document.getElementById("question").innerHTML = "Test Result";
		
	var totalScore = 0;
	var perfectScore = 0;
	var tableHTML = '<table class="test-result-table"><div class=title><tr><th>No.</th><th style="text-align: center;">Question</th><th>Points</th></tr></div>';
	
	for (var i = 1; i < exercises.length - 1; i++) {              //all exercise result padding bottom
		tableHTML += '<tr class=OutsideUnit><td class=Num>' + i + '</td><td style="padding-bottom: 20px;">' + this.questionText[exercises[i].type-1];//yoyo add num,outside unit

	    // Show question symbol of type 1, 3, or 4 exercise 
		if (exercises[i].type == 1 || exercises[i].type == 3 || exercises[i].type == 4) {
			tableHTML += '<img class="test-result-symbol" src="quincy/symbols/' +
            			 exercises[i].symbolDB.symbols[exercises[i].questionSymbolID].school + '/Level_' +
		                 exercises[i].symbolDB.symbols[exercises[i].questionSymbolID].level + '/Group_' +
		                 exercises[i].symbolDB.symbols[exercises[i].questionSymbolID].group + '/' +
		                 exercises[i].symbolDB.symbols[exercises[i].questionSymbolID].fileName + '"><br>';
			
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
				
				tableHTML += "Your answer: " + answer + "<br class=fillExLineHight>Right answer: " + solution;
			}
			else {
				tableHTML += this.showSymbolAnswers(exercises[i]);
			}
		}
		// Show neum name of type 2 exercise
		else if (exercises[i].type == 2) {
			tableHTML += ": " + exercises[i].neumName + '<img class=test-result-symbol src="quincy/img/transparent.png"><br>'; // <div style="height=50px;width=1px;"></div>
			tableHTML += this.showSymbolAnswers(exercises[i]);
		}
		// Show score of score exercise
		else if (exercises[i].type == 5) {
			tableHTML += '<img class=test-result-symbol src="quincy/img/transparent.png"><br>' + this.showScoreAnswers(exercises[i]);
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