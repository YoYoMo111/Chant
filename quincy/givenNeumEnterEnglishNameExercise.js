// A child class of Exercise
function GivenNeumEnterEnglishNameExercise(questionSymbolID, mechanism) {
    Exercise.call(this, mechanism);
	this.score = 0;
	this.maxScore = 1;
	this.questionSymbolID = questionSymbolID;
	this.hintOn = false;
	
	this.getSolution();
}

GivenNeumEnterEnglishNameExercise.prototype = Object.create(Exercise.prototype);
GivenNeumEnterEnglishNameExercise.prototype.constructor = GivenNeumEnterEnglishNameExercise;

GivenNeumEnterEnglishNameExercise.prototype.show = function(index, numOfQuestions) {
    var school = this.symbolDB.symbols[this.questionSymbolID].school;
	var level = this.symbolDB.symbols[this.questionSymbolID].level;
	var group = this.symbolDB.symbols[this.questionSymbolID].group;
	var fileName = this.symbolDB.symbols[this.questionSymbolID].fileName;

    document.getElementById("question").innerHTML = 
    	"Question " + index + " of " + numOfQuestions + ": Enter the name of the given neum.";
		
	document.getElementById("dynamicArea").innerHTML =
    	'<div id="type2ExAnswerArea">' +
    	  '<center><div id="questionSymbol">' + 
		    '<img id="symbol_' + this.questionSymbolID + '"src="quincy/symbols/' +	school + '/Level_' + level +
			'/Group_' + group + '/' + fileName + '"style="width:80px;height:80px">' +
		    '</div>' +
	        /*'<br>' +*/
	        '<div id="enterboxArea">'+
	        '<input id="englishNameTextBox" class="enter-name-ex-text-box" type="text" size="30">'+
	        '</div>' +
	        '<div id="buttonDiv"></div>' +
	      '</center></div>';
	
	// Show check answer button if it's in exercise mode
	if (this.mechanism == 1) {
	    document.getElementById("buttonDiv").innerHTML =
		    '<button id="checkAnswer" class="check-answer-btn" type="button">Check Answer</button>' +
			'<button id="cheat" class="cheat-btn" type="button">Reveal Answer</button>';
			
		var self = this;
	    document.getElementById("englishNameTextBox").onkeyup = function(event) {
	        self.handleKeyPress(event);
	    };
		document.getElementById("checkAnswer").onclick = function() {
			self.saveAnswer();
	        self.showHint();
	    };
		document.getElementById("cheat").onclick = function() {
			self.showRightAnswer();
	    };
	}
	
	// Show answer previously entered by student
	document.getElementById("englishNameTextBox").value = this.studentsAnswer;
}

GivenNeumEnterEnglishNameExercise.prototype.handleKeyPress = function(ev) {
	// Hit Enter key to check answer
    if (!this.hintOn && ev.keyCode == 13) {
		this.saveAnswer();
	    this.showHint();		
	}
	// Hit any key to make the hint go away
	else if (this.hintOn) {
		document.getElementById("hint").innerHTML = "";
		this.hintOn = false;
	}
}

GivenNeumEnterEnglishNameExercise.prototype.getSolution = function() {
	// solution is in format of name1=name2	
    this.solution = this.symbolDB.symbols[this.questionSymbolID].name;
}

GivenNeumEnterEnglishNameExercise.prototype.saveAnswer = function() {
    if (document.getElementById("englishNameTextBox")) {
		this.studentsAnswer = document.getElementById("englishNameTextBox").value;
	}
}

GivenNeumEnterEnglishNameExercise.prototype.showRightAnswer = function() {
	document.getElementById("englishNameTextBox").value = this.solution.replace("=", " OR ");
}

GivenNeumEnterEnglishNameExercise.prototype.grade = function() {
	this.score = 0;
    this.saveAnswer();
	var rightAnswers = this.solution.split("=");
	for (var i = 0; i < rightAnswers.length; i++) {
		if (this.studentsAnswer.toLowerCase() == rightAnswers[i].toLowerCase()) {
			this.score = 1;
			break;
		}
	}
}

GivenNeumEnterEnglishNameExercise.prototype.showHint = function() {
	this.grade();
	if (this.score == 1) {	    
		document.getElementById("hint").innerHTML = '<div id="hint-box" class="hint-correct">Your answer is correct.</div>';
	}	
	else {
	    document.getElementById("hint").innerHTML = '<div id="hint-box" class="hint-wrong">Your answer is wrong. Please try again.</div>';
	}
	this.hintOn = true;
}
