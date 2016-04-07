// A child class of Exercise
function ScoreExercise2(school, level, scoreFileName, size, solution, mechanism) {
    Exercise.call(this, mechanism);
	this.school = school;
	this.level = level;
	this.scoreFileName = scoreFileName;
	this.size = size;
	this.solution = solution;
	this.score = 0;
	this.maxScore = this.size;

	this.getSolution();
	
	// Init student answer arrays
	this.studentsAnswerIDs = new Array();
	this.studentAnswerNames = new Array();
	for (var i = 0; i < this.size; i++) {
        this.studentsAnswerIDs.push("");
        this.studentAnswerNames.push("");
	}
}

ScoreExercise2.prototype = Object.create(Exercise.prototype);
ScoreExercise2.prototype.constructor = ScoreExercise2;

var dropTime = 0;

ScoreExercise2.prototype.show = function(index, numOfQuestions) {
	var str = "Question " + index + " of " + numOfQuestions + ": Drag the neums to the box to match the notes in the score.";


	document.getElementById("question").innerHTML = str;
	
	document.getElementById("dynamicArea").innerHTML =
	    '<div><img class="score-image" style="margin-top: 10px; margin-bottom: 10px;" src="quincy/scores/' + this.scoreFileName + '"></div>' +
	    '<div id="drag-area">' +
		'<div id="scoreExAnswer2"></div>' + 
		'<div id="symbolSection"></div>' +
		'<div id="buttonDiv" style="clear: both; text-align: center;"></div>' +
		'</div>';//yoyo add style, make it not overlap.
	
    // Show the table with drop boxes and text boxes
	var tableInnerHTML = "";	   
	
		//tableInnerHTML = '<table id="answer-table" class="score-exercise-answer-table" style="width:340px;"><tr><th>No.</th><th>Neum</th><th>No.</th><th>Neum</th>';
		//tableInnerHTML += '</tr>';
		//document.getElementById("scoreExAnswer2").style.width="340px";
	   
	var self = this;
	/*for (var i = 0; i < this.size; i++) {
		tableInnerHTML +=
		    '<tr>' + 
			  '<td style="width: 25px;">' + (i + 1) + '</td>' + //yoyo add fixed width
			  '<td style="width: 115px;">' +
			  	'<span class="checkmark" id="checkmark_' + i + '"><div class="checkmark-stem"></div><div class="checkmark-kick"></div></span>' +
				'<span class="x-mark" id="x-mark_' + i + '"><div class="x-tick-stroke"></div><div class="x-falling-stroke"></div></span>' +
  			    '<div class="dropbox" id="neum-dropbox_' + i + '" data-neumID=""></div>' +
				'<img class="delete-icon" id="delete-icon_' + i + '" src="quincy/img/delete.png">' +
			  '</td>';*/
        	/*for (var i = 0; i+4 < this.size; i++) {
		tableInnerHTML +=
		    '<tr>' + 
			  '<td style="width: 25px;">' + (i + 1) + '</td>' + //yoyo add fixed width
			  '<td style="width: 115px;">' +
			  	'<span class="checkmark" id="checkmark_' + i + '"><div class="checkmark-stem"></div><div class="checkmark-kick"></div></span>' +
				'<span class="x-mark" id="x-mark_' + i + '"><div class="x-tick-stroke"></div><div class="x-falling-stroke"></div></span>' +
  			    '<div class="dropbox" id="neum-dropbox_' + i + '" data-neumID=""></div>' +
				'<img class="delete-icon" id="delete-icon_' + i + '" src="quincy/img/delete.png">' +
			  '</td>'+
			  '<td style="width: 25px;border-left:1px; border-style: dashed;border-color: rgb(183, 183, 183);">' + (i + 1+4) + '</td>' + //yoyo add fixed width
			  '<td style="width: 115px;">' +
			  	'<span class="checkmark" id="checkmark_' + (i+4) + '"><div class="checkmark-stem"></div><div class="checkmark-kick"></div></span>' +
				'<span class="x-mark" id="x-mark_' + (i+4) + '"><div class="x-tick-stroke"></div><div class="x-falling-stroke"></div></span>' +
  			    '<div class="dropbox" id="neum-dropbox_' + (i+4) + '" data-neumID=""></div>' +
				'<img class="delete-icon" id="delete-icon_' + (i+4) + '" src="quincy/img/delete.png">' +
			  '</td>';
			  
			}
			if (this.size == 7){
			  	tableInnerHTML +=
			  	'<tr>' + 
			  '<td style="width: 25px;">' + (i + 1) + '</td>' + //yoyo add fixed width
			  '<td style="width: 115px;">' +
			  	'<span class="checkmark" id="checkmark_' + i + '"><div class="checkmark-stem"></div><div class="checkmark-kick"></div></span>' +
				'<span class="x-mark" id="x-mark_' + i + '"><div class="x-tick-stroke"></div><div class="x-falling-stroke"></div></span>' +
  			    '<div class="dropbox" id="neum-dropbox_' + i + '" data-neumID=""></div>' +
				'<img class="delete-icon" id="delete-icon_' + i + '" src="quincy/img/delete.png">' +
			  '</td>'+
			  '<td style="width: 25px;border-left:1px; border-style: dashed;border-color: rgb(183, 183, 183);">' + '</td>' + //yoyo add fixed width
			  '<td style="width: 115px;">' +
			  '</td>'
			  }
			tableInnerHTML += '</tr>';	
	tableInnerHTML += '</table>';
	document.getElementById("scoreExAnswer2").innerHTML = tableInnerHTML;
	document.getElementById("answer-table").style.display="none";*/
	
	// Delete icons' callback functions
	/*for (var i = 0; i < this.size; i++) {
		document.getElementById("delete-icon_" + i).onclick = function(event) {
	        self.deleteNeum(event);
	    };
	}*/

    // Allow drag and drop on answer drop boxes
	for (var i = 0; i < this.size; i++) {
		/*document.getElementById("symbol_"+i).ondragstart = function(event) {
	        self.dragStart(event);
	    };*/
        document.getElementById("scoreExAnswer2").ondragover = function(event) {
	        self.allowDrop(event);
	    };		
		document.getElementById("scoreExAnswer2").ondrop = function(event) {
		    self.drop(event);
	    };
	}
	
	
	// Show all neums of this level
	this.nNeumsInARow = 8;
	this.symbolDB.filterList(this.school, 1, this.studentsAnswer, this.nNeumsInARow);
	
	// Show check answer button if it's in exercise mode
	if (this.mechanism == 1) {
	    document.getElementById("buttonDiv").innerHTML =
		    '<button id="checkAnswer" class="check-answer-btn" type="button">Check Answer</button>' +
			'<button id="cheat" class="cheat-btn" type="button">Reveal Answer</button>';
			
		var self = this;
	    document.getElementById("checkAnswer").onclick = function() {
			self.saveAnswer();
	        self.showHint();
	    };
		document.getElementById("cheat").onclick = function() {
			self.showRightAnswer();
	    };
	}
	
	// Show student's answer
	for (var i = 0; i < this.size; i++) {
		if (this.studentsAnswerIDs[i] != "") {
			document.getElementById("neum-dropbox_" + i).innerHTML = this.showNeumWithID(this.studentsAnswerIDs[i]);
			document.getElementById("neum-dropbox_" + i).setAttribute("data-neumID", this.studentsAnswerIDs[i]);		
		}
	}
}

ScoreExercise2.prototype.dragStart = function(ev) {   
console.log("run gragstart");
var style = window.getComputedStyle(ev.target, null);
	var transfer=ev.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - (ev.clientX-((window.innerWidth-15-1096)/2+226+66.5))) /*+ ',' + (parseInt(style.getPropertyValue("top"), 10) - ev.clientY) + ',' + ev.target.getAttribute('data-item')*/); 
    console.log("transfer:"+transfer);
    console.log("run gragstart end");

}

ScoreExercise2.prototype.allowDrop = function(ev) {
    ev.preventDefault();
}

ScoreExercise2.prototype.drop = function(ev) {
	console.log(ev.target.innerHTML);
	console.log("what is target"+ev.target);
	ev.preventDefault();

	//var offset = ev.dataTransfer.getData("text/plain");//get offset from dragStart

	var imageID = ev.dataTransfer.getData("text/html");
	var symbolID = parseInt(imageID.substring(imageID.indexOf("symbol")+7));
	ev.target.innerHTML += this.showNeumWithID(symbolID);
	ev.target.setAttribute("data-neumID", symbolID);
	document.getElementById("symbol_" + symbolID + "_copy_" + dropTime).style.left = ((ev.clientX-((window.innerWidth-15-1096)/2+235))/*+ parseInt(offset, 10)*/)+'px';
	console.log(ev.clientX);
	console.log("width:"+window.innerWidth);
	//console.log("offset:"+offset);
	dropTime++;
}


ScoreExercise2.prototype.deleteNeum = function(ev) {
	document.getElementById("neum-dropbox_" + ev.target.id.substring(12)).innerHTML = "";
	document.getElementById("neum-dropbox_" + ev.target.id.substring(12)).setAttribute("data-neumID", "");
	document.getElementById("checkmark_" + ev.target.id.substring(12)).style.display = "none";
	document.getElementById("x-mark_" + ev.target.id.substring(12)).style.display = "none";
}

ScoreExercise2.prototype.getSolution = function() {
	this.solutionIDs = this.solution.split("-");    // An array of neum IDs	
}

ScoreExercise2.prototype.saveAnswer = function() {
	// Save student's answers - neum IDs and names
	for (var i = 0; i < this.size; i++) {
		this.studentsAnswerIDs[i] = document.getElementById("neum-dropbox_" + i).getAttribute("data-neumID");
	}
//	console.log(this.studentsAnswerIDs);
//	console.log(this.solutionIDs);
}

ScoreExercise2.prototype.showRightAnswer = function() {
	for (var i = 0; i < this.size; i++) {
		document.getElementById("checkmark_" + i).style.display = "none";    // hide checkmark
		document.getElementById("x-mark_" + i).style.display = "none";    	 // hide x-mark
		document.getElementById("neum-dropbox_" + i).innerHTML = this.showNeumWithID(this.solutionIDs[i]);
		document.getElementById("neum-dropbox_" + i).setAttribute("data-neumID", this.solutionIDs[i]);
	}
}

ScoreExercise2.prototype.showHint = function() {
	document.getElementById("hint").innerHTML = '<div id="hint-box" class="hint-correct"><table id="hintTable"></table></div>';
	for (var i = 0; i < this.size; i++) {
		// Check neums
		if (this.studentsAnswerIDs[i] != "") {
			if (this.studentsAnswerIDs[i] == this.solutionIDs[i]) {    // answer is right
			    document.getElementById("checkmark_" + i).style.display = "inline-block";
			}
			else {
				document.getElementById("x-mark_" + i).style.display = "inline-block";
				this.showSymbolInfo(this.studentsAnswerIDs[i]);
			}
			document.getElementById("delete-icon_" + i).style.left = "20px"; //yoyo revise
			document.getElementById("delete-icon_" + i).style.float="left";
			document.getElementById("delete-icon_" + i).style.top = "31px";
		}
	}
}

ScoreExercise2.prototype.showSymbolInfo = function(symbolID) {
	document.getElementById("hintTable").innerHTML += //yoyo add hint border
	    '<tr class="hint-tr" ><td><img src="quincy/symbols/' +
		this.symbolDB.symbols[symbolID].school + '/Level_' + this.symbolDB.symbols[symbolID].level +
		'/Group_' + this.symbolDB.symbols[symbolID].group + '/' +
	    this.symbolDB.symbols[symbolID].fileName + '" hspace="20" style="width:50px; height:50px;"></td>' +
		'<td class="hint-td" >' +//yoyo add line height
    	this.symbolDB.symbols[symbolID].info +
		'</td></tr>';
}

ScoreExercise2.prototype.checkEnteredName = function(solution, enteredText) {
	var rightAnswers = solution.split("=");
	for (var i = 0; i < rightAnswers.length; i++) {
		if (enteredText.toLowerCase() == rightAnswers[i].toLowerCase()) {
			return true;
		}
	}
	return false;
}

ScoreExercise2.prototype.grade = function() {
	this.saveAnswer();
	this.score = 0;
	for (var i = 0; i < this.size; i++) {
		// Check neums
		if (this.studentsAnswerIDs[i] != "") {
			if (this.studentsAnswerIDs[i] == this.solutionIDs[i]) {    // answer is right
			    this.score++;
			}
		}
	}
}

ScoreExercise2.prototype.showNeumWithID = function(ID) {

    return '<img id="symbol_' + ID + '_copy_'+dropTime+'" src="quincy/symbols/' +
		    this.symbolDB.symbols[ID].school + '/Level_' + this.symbolDB.symbols[ID].level +
		    '/Group_' + this.symbolDB.symbols[ID].group + '/' + this.symbolDB.symbols[ID].fileName +
	        '" draggable="false" style="width:60px;height:60px; position: absolute;">';
}