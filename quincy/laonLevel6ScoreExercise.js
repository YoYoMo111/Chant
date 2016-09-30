// A child class of Exercise
function LaonLevel6ScoreExercise(school, level, scoreFileName, solution, symbolPos, mechanism) {
    Exercise.call(this, mechanism);
	this.type = 11;
	this.school = school;
	this.level = level;
	this.scoreFileName = scoreFileName;
	this.solution = solution;
	this.size = solution.split("-").length;
	this.symbolPos = symbolPos;
	this.score = 0;
	this.maxScore = this.size;
	this.numOfAnswers = 2;

	this.getSolution();

	// Init student answer arrays
	this.studentsAnswerIDs = new Array();
	this.studentsAnswerIDsLefts = new Array();
	this.studentsAnswerNames = new Array();
	this.tickIDs = new Array();
	this.xIDs = new Array();

	this.studentsAnswerIDs2 = new Array();
	this.studentsAnswerIDsLefts2 = new Array();
	this.studentsAnswerNames2 = new Array();
	this.tickIDs2 = new Array();
	this.xIDs2 = new Array();

	for (var i = 0; i < this.size; i++) {
        //this.studentsAnswerIDs.push("");
        this.studentsAnswerNames.push("");
	}
	
	this.neums = [3, 15, 10, 2, 11, 17, 12, 22,
				 21, 16, 51, 53, 151, 0, 97, 89,
				 82, 5, 158, 190, 30, 29, 191, 31,
				 71, 13, 14, 18, 23, 24, 27, 28];
}

LaonLevel6ScoreExercise.prototype = Object.create(Exercise.prototype);
LaonLevel6ScoreExercise.prototype.constructor = LaonLevel6ScoreExercise;

var dropTime = 0;
var insideSymbolID = [];

LaonLevel6ScoreExercise.prototype.show = function(index, numOfQuestions) {
	var str = "Question " + index + " of " + numOfQuestions + ": Drag the neums to the box to match the notes in the score.";


	document.getElementById("question").innerHTML = str;

	if(this.numOfAnswers == 1){
	
		document.getElementById("dynamicArea").innerHTML =
			'<div><img class="score-image-2" style="margin-top: 10px; margin-bottom: 10px;" draggable="false"; src="quincy/scores/' + this.scoreFileName + '"></div>' +
		    '<div id="drag-area">' +
		    '<div id="laonScoreExAnswer">'+
			'</div>' + 
			'<div id="symbolSection" class="symbolSectionL6"></div>' +
			'<div id="buttonDiv" style="clear: both; text-align: center;"></div>' +
			'</div>';//yoyo add style, make it not overlap.
	}
	else if(this.numOfAnswers == 2){
		document.getElementById("dynamicArea").innerHTML =
			'<div><img class="score-image-2" style="margin-top: 10px; margin-bottom: 10px;" draggable="false"; src="quincy/scores/' + this.scoreFileName + '"></div>' +
		    '<div id="drag-area">' +
		    '<div id="laonScoreExAnswer" style="border-bottom-style: dashed;">'+
			'</div>' + 
			'<div id="laonScoreExAnswer2">'+
			'</div>'+
			'<div id="symbolSection" class="symbolSectionL6"></div>' +
			'<div id="buttonDiv" style="clear: both; text-align: center;"></div>' +
			'</div>';//yoyo add style, make it not overlap.
	}
	
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
       document.getElementById("laonScoreExAnswer").ondragover = function(event) {
	        self.allowDrop(event);
	    };		
		document.getElementById("laonScoreExAnswer").ondrop = function(event) {
		    self.drop(event);

	    };
		if(this.numOfAnswers == 2){
		    document.getElementById("laonScoreExAnswer2").ondragover = function(event) {
		        self.allowDrop(event);
		    };		
			document.getElementById("laonScoreExAnswer2").ondrop = function(event) {
			    self.drop(event);

		    };
		}
	}
/*
	document.getElementById("symbol-container-0_copy_0").ondragstart = function(event) {
	        self.dragStart(event);
	    };
	document.getElementById("symbol-container-1_copy_1").ondragstart = function(event) {
	        self.dragStart(event);
	    };
*/

	/*
	document.getElementById("scoreExAnswer2").addEventListener('dragover', self.allowDrop, false);
	document.getElementById("scoreExAnswer2").addEventListener('drop', self.drop, false);
	*/
	// Show all neums of this level
	this.nNeumsInARow = 8;
	this.symbolDB.filterListForLevelSix(this.neums, this.studentsAnswerIDs, this.nNeumsInARow);
	
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
	dropTime=0;
	for (var i = 0; i < this.studentsAnswerIDs.length; i++) {
		if (this.studentsAnswerIDs[i] != "") {
				console.log("id:"+this.studentsAnswerIDs);
				console.log("left:"+this.studentsAnswerIDsLefts);
				console.log("top:"+this.studentsAnswerIDsTops);
			document.getElementById("laonScoreExAnswer").innerHTML += this.showNeumWithID(this.studentsAnswerIDs[i]);
			//document.getElementById("scoreExAnswer2").innerHTML += this.showNeumWithID(symbolID);
			var answer = document.getElementById("laonScoreExAnswer").children;
			document.getElementById(answer[i].id).style.left = this.studentsAnswerIDsLefts[i]+'px';	
			document.getElementById(answer[i].id).style.top = this.studentsAnswerIDsTops[i]+'px';	
		}
		dropTime++;
	}

	for (var i = 0; i < this.studentsAnswerIDs2.length; i++) {
		if (this.studentsAnswerIDs2[i] != "") {
				console.log("id:"+this.studentsAnswerIDs2);
				console.log("left:"+this.studentsAnswerIDsLefts2);
				console.log("top:"+this.studentsAnswerIDsTops2);
			document.getElementById("laonScoreExAnswer2").innerHTML += this.showNeumWithID(this.studentsAnswerIDs2[i]);
			//document.getElementById("scoreExAnswer2").innerHTML += this.showNeumWithID(symbolID);
			var answer2 = document.getElementById("laonScoreExAnswer2").children;
			document.getElementById(answer2[i].id).style.left = this.studentsAnswerIDsLefts2[i]+'px';	
			document.getElementById(answer2[i].id).style.top = this.studentsAnswerIDsTops2[i]+'px';	
		}
		dropTime++;
	}
	
}

var my_index = 100;
function sendOnTop(ev){
	if(document.getElementById("symbol-container-"+ev.target.id.substring(7))==null||"symbol-container-"+ev.target.id.substring(13)==null)return;

	if(ev.target.id.indexOf("button") < 0){
	    document.getElementById("symbol-container-"+ev.target.id.substring(7)).style.zIndex = my_index++;
	    console.log("hide1");
	    var buttons = document.getElementsByClassName("delete-buttons");
	    if(document.getElementById("delete-button"+ev.target.id.substring(7)).style.visibility != "visible"){
		    for (var i = 0; i < buttons.length; i++){
		    	buttons[i].style.visibility = "hidden";
		    }
			document.getElementById("delete-button"+ev.target.id.substring(7)).style.visibility = "visible";
		}
		else{
			document.getElementById("delete-button"+ev.target.id.substring(7)).style.visibility = "hidden";
		}
	}
	else {
		document.getElementById("symbol-container-"+ev.target.id.substring(13)).style.zIndex = my_index++;
	}
}

var offsetX2;
var offsetY2;
function dragStart(ev){
	console.log("run dragstart3");
	var style = window.getComputedStyle(ev.target, null);
	offsetX2 = (ev.pageX-(($(document).width()-1096)/2+235))-parseInt(style.getPropertyValue("left"), 10);
	offsetY2 = ev.pageY - 335 - parseInt(style.getPropertyValue("top"), 10);
	console.log("offsetX2: "+offsetX2);
	ev.dataTransfer.setData("text/html", ev.target.id);
}

LaonLevel6ScoreExercise.prototype.dragStart = function(ev) {   
	console.log("run dragstart2");
	//var style = window.getComputedStyle(ev.target, null);
	//var transfer=ev.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - (ev.clientX-((window.innerWidth-15-1096)/2+226+66.5))) /*+ ',' + (parseInt(style.getPropertyValue("top"), 10) - ev.clientY) + ',' + ev.target.getAttribute('data-item')*/); 
    //console.log("transfer:"+transfer);
    //console.log("run gragstart end");
    var style = window.getComputedStyle(ev.target, null);
	offsetX2 = (ev.clientX-((window.innerWidth-15-1096)/2+235))-parseInt(style.getPropertyValue("left"), 10);
	console.log("offsetX2: "+offsetX2);

    ev.dataTransfer.setData("text/html", ev.target.id);
	this.draggedSymbol = ev.target.id;

}

LaonLevel6ScoreExercise.prototype.allowDrop = function(ev) {
    ev.preventDefault();
}

LaonLevel6ScoreExercise.prototype.drop = function(ev) {

//	console.log(ev.target.innerHTML);
	
	ev.preventDefault();

	//var offset = ev.dataTransfer.getData("text/plain");//get offset from dragStart
	var offset = ev.dataTransfer.getData("text/plain").split(',');
	var offsetX1 = offset[0];
	//console.log("offsetX1 =" + offsetX1);
	//two answer boxes change the position of the pool vertically, recalculate offsetY when 2 there are answers 
	if(this.numOfAnswers == 1){
		var offsetY1 = (offset[1])%76;
		console.log("offsetY1 =" + offsetY1);
	}
	else if(this.numOfAnswers == 2){
		var offsetY1 = (offset[1]-104-50)%76;
		//console.log("offsetY1 =" + offsetY1);
	}

	var imageID = ev.dataTransfer.getData("text/html");
	//console.log("imageID =" + imageID);
	var left1 = (ev.pageX-(($(document).width()-1096)/2+235)) - offsetX1;
	var left2 = (ev.pageX-(($(document).width()-1096)/2+235)) - offsetX2;//for drag and drop in the answerbox

	var top1 = ev.pageY - 335 - offsetY1;
	var top2 = ev.pageY - 335 - offsetY2;

	if(imageID.indexOf("copy")<0){//no copy in image id, means drop from the pool
		var symbolID = parseInt(imageID.substring(imageID.indexOf("symbol")+7));
		//ev.target.innerHTML += this.showNeumWithID(symbolID);

		if(ev.pageY < 642){//identify which answer box they put neums,642 will change according to the box height
			document.getElementById("laonScoreExAnswer").innerHTML += this.showNeumWithID(symbolID);
		}
		else if(ev.pageY > 642){
			document.getElementById("laonScoreExAnswer2").innerHTML += this.showNeumWithID(symbolID);
		}
		//document.getElementById("laonScoreExAnswer2").innerHTML += this.showNeumWithID(symbolID);
		//this.alowDropOnSymbol(symbolID);
		ev.target.setAttribute("data-neumID", symbolID);
		if(left1 > 675){
			left1 = 675;
		}
		else if(left1 < 127){
			left1 = 127;
		}
		document.getElementById("symbol-container-" + symbolID + "_copy_" + dropTime).style.left = left1+'px';
		document.getElementById("symbol-container-" + symbolID + "_copy_" + dropTime).style.top = top1+'px';
		console.log("dropX="+ev.pageX);
		console.log("dropY = " + ev.pageY);
		console.log("left="+((ev.pageX-(($(document).width()-1096)/2+235)) - offsetX1) );
		console.log("top="+top1);
		//console.log("window width:"+window.innerWidth);
		//console.log("offset:"+offset);
		/*var self = this;
		document.getElementById('symbol-container-'+ symbolID + '_copy_'+ dropTime).ondragstart = function(event) {
		    self.dragStart(event);
		};*/
		dropTime++;
	}
	else{
		if(left2 > 675){
			left2 = 675;
		}
		else if(left2 < 127){
			left2 = 127;
		}
		
		//console.log("imageID =" + imageID.substring(imageID.indexOf("symbol")));
		//document.getElementById(imageID).style.left = left2+'px';
		$("#"+imageID.substring(imageID.indexOf("symbol"))).css('left',left2);//in chrome, imageID has meta tag, so we use substring
		$("#"+imageID.substring(imageID.indexOf("symbol"))).css('top',top2);
		console.log("left="+((ev.pageX-(($(document).width()-1096)/2+235)) - offsetX2) );
		console.log("top="+top2);
		//console.log("window width:"+((ev.clientX-((window.innerWidth-15-1096)/2+235)) - offset));	

	}
}
/*
function reAllowDrop(ev) {
    ev.preventDefault();
}

function reDrag(ev) {
	console.log("run re drag");
    ev.dataTransfer.setData("text", ev.target.id);
}

function reDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).style.left = ((ev.clientX-((window.innerWidth-15-1096)/2+235)))+'px';
}*/

/*
LaonLevel6ScoreExercise.prototype.reDrop = function(ev) {
	ev.preventDefault();

	var imageID = ev.dataTransfer.getData("text/html");
	console.log("imageID:"+imageID);
	var symbolID = parseInt(imageID.substring(imageID.indexOf("symbol")+7));
	console.log("symbolID:"+symbolID);
	ev.target.setAttribute("data-neumID", symbolID);
	document.getElementById("symbol-container-" + symbolID + "_copy_" + dropTime).style.left = ((ev.clientX-((window.innerWidth-15-1096)/2+235)))+'px';
	

	console.log(ev.clientX);
	console.log("width:"+window.innerWidth);
}*/
function Remove(EId)
{
    return(EObj=document.getElementById(EId))?EObj.parentNode.removeChild(EObj):false;
}

function deleteNeum(ev){
	console.log("substring" + ev.target.id.substring(13));
	document.getElementById("symbol-container-" + ev.target.id.substring(13)).innerHTML = "";
	document.getElementById("symbol-container-" + ev.target.id.substring(13)).style.display = "none";
	Remove("symbol-container-" + ev.target.id.substring(13));
}

LaonLevel6ScoreExercise.prototype.deleteNeum = function(ev) {
	document.getElementById("neum-dropbox_" + ev.target.id.substring(12)).innerHTML = "";
	document.getElementById("neum-dropbox_" + ev.target.id.substring(12)).setAttribute("data-neumID", "");
	document.getElementById("checkmark_" + ev.target.id.substring(12)).style.display = "none";
	document.getElementById("x-mark_" + ev.target.id.substring(12)).style.display = "none";
}

LaonLevel6ScoreExercise.prototype.getSolution = function() {//get the right answers.
	//this.solutionIDs = this.solution.split("-");
	//this.solutionPos = this.symbolPos.split("-"); 
	this.solutionIDs = ["0","2","3"]; 
	this.solutionPos = [
						[30,60,30,60],
						[30,60,30,60]
					   ];
	this.solutionIDs2 = ["5","10","11"]; 
	this.solutionPos2 = [
						[30,60,30,60],
						[30,60,30,60]
					   ];
}

LaonLevel6ScoreExercise.prototype.saveAnswer = function() {
	// Save student's answers - neum IDs and names
	//for (var i = 0; i < this.size; i++) {
		//this.studentsAnswerIDs[i] = document.getElementById("neum-dropbox_" + i).getAttribute("data-neumID");
	//}
//	console.log(this.studentsAnswerIDs);
//	console.log(this.solutionIDs);
	//this.studentsAnswerIDs = [""];
	//this.studentsAnswerIDsLefts = [""];

	var answer = document.getElementById("laonScoreExAnswer").children;
	//console.log("answer children:"+answer[0].children[0].id);
	this.studentsAnswerIDs = [""];
	this.studentsAnswerIDsLefts = [""];
	this.studentsAnswerIDsTops = [""];
	this.tickIDs = [""];
	this.xIDs = [""];

	for( var i = 0; i < answer.length; i++){
			this.studentsAnswerIDs[i] = document.getElementById(answer[i].id).getAttribute("data-neumID");
			var style = window.getComputedStyle(answer[i], null);
			this.studentsAnswerIDsLefts[i] = parseInt(style.getPropertyValue("left"), 10);
			this.studentsAnswerIDsTops[i] = parseInt(style.getPropertyValue("top"), 10);
			this.tickIDs[i] = 'tick' + answer[i].id.substring(17);
			this.xIDs[i] = 'x' + answer[i].id.substring(17);

			//console.log(answer[i].id.substring(17));
			
			//console.log("answerid"+i+":"+this.studentsAnswerIDs[i]+"/"+"answerlefts"+i+":"+this.studentsAnswerIDsLefts[i]);
		}

	for(i = 0; i<=answer.length-1; i++){
		if(this.studentsAnswerIDsLefts[i] > this.studentsAnswerIDsLefts[i+1]){

			var temp1 = this.studentsAnswerIDsLefts[i+1];
			this.studentsAnswerIDsLefts[i+1] = this.studentsAnswerIDsLefts[i];
			this.studentsAnswerIDsLefts[i] = temp1;

			var temp2 = this.studentsAnswerIDs[i+1];
			this.studentsAnswerIDs[i+1] = this.studentsAnswerIDs[i];
			this.studentsAnswerIDs[i] = temp2;

			var temp3 = this.tickIDs[i+1];
			this.tickIDs[i+1] = this.tickIDs[i];
			this.tickIDs[i] = temp3;

			var temp4 = this.xIDs[i+1];
			this.xIDs[i+1] = this.xIDs[i];
			this.xIDs[i] = temp4;
			i = i - 2;
		}
	}

	if(this.numOfAnswers == 2){	
		var answer2 = document.getElementById("laonScoreExAnswer2").children;
		//console.log("answer children:"+answer[0].children[0].id);
		this.studentsAnswerIDs2 = [""];
		this.studentsAnswerIDsLefts2 = [""];
		this.studentsAnswerIDsTops2 = [""];
		this.tickIDs2 = [""];
		this.xIDs2 = [""];

		for( var i = 0; i < answer2.length; i++){
			this.studentsAnswerIDs2[i] = document.getElementById(answer2[i].id).getAttribute("data-neumID");
			var style2 = window.getComputedStyle(answer2[i], null);
			this.studentsAnswerIDsLefts2[i] = parseInt(style2.getPropertyValue("left"), 10);
			this.studentsAnswerIDsTops2[i] = parseInt(style2.getPropertyValue("top"), 10);
			this.tickIDs2[i] = 'tick' + answer2[i].id.substring(17);
			this.xIDs2[i] = 'x' + answer2[i].id.substring(17);

			//console.log(answer[i].id.substring(17));
			
			//console.log("answerid"+i+":"+this.studentsAnswerIDs[i]+"/"+"answerlefts"+i+":"+this.studentsAnswerIDsLefts[i]);
		}
		
		for(i = 0; i<=answer2.length-1; i++){
			if(this.studentsAnswerIDsLefts2[i] > this.studentsAnswerIDsLefts2[i+1]){

				var temp1 = this.studentsAnswerIDsLefts2[i+1];
				this.studentsAnswerIDsLefts2[i+1] = this.studentsAnswerIDsLefts2[i];
				this.studentsAnswerIDsLefts2[i] = temp1;

				var temp2 = this.studentsAnswerIDs2[i+1];
				this.studentsAnswerIDs2[i+1] = this.studentsAnswerIDs2[i];
				this.studentsAnswerIDs2[i] = temp2;

				var temp3 = this.tickIDs2[i+1];
				this.tickIDs2[i+1] = this.tickIDs2[i];
				this.tickIDs2[i] = temp3;

				var temp4 = this.xIDs2[i+1];
				this.xIDs2[i+1] = this.xIDs2[i];
				this.xIDs2[i] = temp4;
				i = i - 2;
			}
		}
	}

	this.studentsAnswer = "";
	this.score=0;
	for (var i = 0; i < this.studentsAnswerIDs.length; i++) {
		// Check neums
		if (this.studentsAnswerIDs[i] != "") {
			if (this.studentsAnswerIDs[i] == this.solutionIDs[i]) {    // answer is right
			    this.score++;
			}
			this.studentsAnswer += this.studentsAnswerIDs[i] + "-";
		}
	}
	this.studentsAnswer = this.studentsAnswer.substr(0, this.studentsAnswer.length - 1);
	console.log("score:" + this.score);
}

LaonLevel6ScoreExercise.prototype.showRightAnswer = function() {
	/*for (var i = 0; i < this.size; i++) {
		document.getElementById("checkmark_" + i).style.display = "none";    // hide checkmark
		document.getElementById("x-mark_" + i).style.display = "none";    	 // hide x-mark
		document.getElementById("neum-dropbox_" + i).innerHTML = this.showNeumWithID(this.solutionIDs[i]);
		document.getElementById("neum-dropbox_" + i).setAttribute("data-neumID", this.solutionIDs[i]);
	}*/
	document.getElementById("laonScoreExAnswer").innerHTML = "";
	document.getElementById("hint").innerHTML = "";
	//var l = 67;
	dropTime=0;
	for (var i = 0; i < this.solutionIDs.length; i++) {
		if (this.solutionIDs[i] != "") {
				//console.log(this.studentsAnswerIDs);
				//console.log(this.studentsAnswerIDsLefts);
			document.getElementById("laonScoreExAnswer").innerHTML += this.showNeumWithID(this.solutionIDs[i]);
			var answer = document.getElementById("laonScoreExAnswer").children;
			document.getElementById(answer[i].id).style.left = this.solutionPos[i]+'px';
			//document.getElementById(answer[i].id).style.left = l+'px';		
		}
		//l = l+60;
		dropTime++;
	}
}

LaonLevel6ScoreExercise.prototype.showHint = function() {
	//document.getElementById("hint").innerHTML = '<div id="hint-box" class="hint-correct"><table id="hintTable"></table></div>';

	var tMarks = document.getElementsByClassName("tick-marks");
		    for (var i = 0; i < tMarks.length; i++){
		    	tMarks[i].style.visibility = "hidden";
		    }
	var xMarks = document.getElementsByClassName("x-marks");
		    for (var i = 0; i < xMarks.length; i++){
		    	xMarks[i].style.visibility = "hidden";
		    }
		
/*
	for (var i = 0; i < this.studentsAnswerIDs.length; i++) {
		// Check neums
		if (this.studentsAnswerIDs[i] != "") {
			//console.log("answer:"+this.studentsAnswerIDs[i]);
			//console.log("solution:"+this.solutionIDs[i]);
			if (this.studentsAnswerIDs[i] == this.solutionIDs[i]) {    // answer is right
			    document.getElementById(this.tickIDs[i]).style.visibility = "visible";
			}
			else {
				document.getElementById(this.xIDs[i]).style.visibility = "visible";
				//this.showSymbolInfo(this.studentsAnswerIDs[i]);
			}

		}
	}*/
//new check answer start
	var correctNeums1 = 0; var correctNeums2 = 0;
	var correctPos1 = 0; var correctPos2 = 0;
	var correctPos3 = 0; var correctPos4 = 0;
	var score1 = 0; var score2 = 0; var totalScore = 0;
	//one answer box
	if(this.numOfAnswers == 1){//check if it is right neum
		for (var i = 0; i < this.studentsAnswerIDs.length; i++){
			if (this.studentsAnswerIDs[i] != "") {
				if (this.studentsAnswerIDs[i] == this.solutionIDs[i]) {    // answer is right
				   correctNeums1++;
				}
				else {
					break;
				}

			}
		}
		if(correctNeums1>0){
			for (var i = 1; i < correctNeums1; i++){//check if it is right position

				var dx = this.studentsAnswerIDsLefts[i] - this.studentsAnswerIDsLefts[i-1];
				var dy = this.studentsAnswerIDsTops[i] - this.studentsAnswerIDsTops[i-1];

				if (dx > this.solutionPos[i-1][0] && dx < this.solutionPos[i-1][1] &&
					dy > this.solutionPos[i-1][2] && dy < this.solutionPos[i-1][3]){
						correctPos1++;
				}
				else{
					break;
				}
			}
			for(var i = 0; i < correctPos1+1; i++){
				document.getElementById(this.tickIDs[i]).style.visibility = "visible";
			}
			for(var i = correctPos1+1; i < this.studentsAnswerIDs.length; i++){
				document.getElementById(this.xIDs[i]).style.visibility = "visible";
			}
		}
		else{//no correct neums all wrong.
			for(var i = 0; i < this.studentsAnswerIDs.length; i++){
				document.getElementById(this.xIDs[i]).style.visibility = "visible";
			}
		}
	}
	//two answer box
	else if(this.numOfAnswers == 2){
	//forward check------------------------------
		//check box1
		for (var i = 0; i < this.studentsAnswerIDs.length; i++){
			if (this.studentsAnswerIDs[i] != "") {
				if (this.studentsAnswerIDs[i] == this.solutionIDs[i]) {    // answer is right
				   correctNeums1++;
				}
				else {
					break;
				}

			}
		}
		for (var i = 1; i < correctNeums1; i++){//check if it is right position

			var dx = this.studentsAnswerIDsLefts[i] - this.studentsAnswerIDsLefts[i-1];
			var dy = this.studentsAnswerIDsTops[i] - this.studentsAnswerIDsTops[i-1];

			if (dx > this.solutionPos[i-1][0] && dx < this.solutionPos[i-1][1] &&
				dy > this.solutionPos[i-1][2] && dy < this.solutionPos[i-1][3]){
					correctPos1++;
			}
			else{
				break;
			}
		}
		//check box2
		for (var i = 0; i < this.studentsAnswerIDs2.length; i++){
			if (this.studentsAnswerIDs2[i] != "") {
				if (this.studentsAnswerIDs2[i] == this.solutionIDs2[i]) {    // answer is right
				   correctNeums2++;
				}
				else {
					break;
				}

			}
		}
		for (var i = 1; i < correctNeums2; i++){//check if it is right position

			var dx = this.studentsAnswerIDsLefts2[i] - this.studentsAnswerIDsLefts2[i-1];
			var dy = this.studentsAnswerIDsTops2[i] - this.studentsAnswerIDsTops2[i-1];

			if (dx > this.solutionPos2[i-1][0] && dx < this.solutionPos2[i-1][1] &&
				dy > this.solutionPos2[i-1][2] && dy < this.solutionPos2[i-1][3]){
					correctPos2++;
			}
			else{
				break;
			}
		}
		score1 = correctPos2+correctPos1+2;
		console.log("score1="+score1);

		
	//reverse check-------------------------------
		//check box1
		for (var i = 0; i < this.studentsAnswerIDs.length; i++){
			if (this.studentsAnswerIDs[i] != "") {
				if (this.studentsAnswerIDs[i] == this.solutionIDs2[i]) {    // answer is right
				   correctNeums1++;
				}
				else {
					break;
				}

			}
		}
		for (var i = 1; i < correctNeums1; i++){//check if it is right position

			var dx = this.studentsAnswerIDsLefts[i] - this.studentsAnswerIDsLefts[i-1];
			var dy = this.studentsAnswerIDsTops[i] - this.studentsAnswerIDsTops[i-1];

			if (dx > this.solutionPos2[i-1][0] && dx < this.solutionPos2[i-1][1] &&
				dy > this.solutionPos2[i-1][2] && dy < this.solutionPos2[i-1][3]){
					correctPos3++;
			}
			else{
				break;
			}
		}
		//check box2
		for (var i = 0; i < this.studentsAnswerIDs2.length; i++){
			if (this.studentsAnswerIDs2[i] != "") {
				if (this.studentsAnswerIDs2[i] == this.solutionIDs[i]) {    // answer is right
				   correctNeums2++;
				}
				else {
					break;
				}

			}
		}
		for (var i = 1; i < correctNeums2; i++){//check if it is right position

			var dx = this.studentsAnswerIDsLefts2[i] - this.studentsAnswerIDsLefts2[i-1];
			var dy = this.studentsAnswerIDsTops2[i] - this.studentsAnswerIDsTops2[i-1];

			if (dx > this.solutionPos[i-1][0] && dx < this.solutionPos[i-1][1] &&
				dy > this.solutionPos[i-1][2] && dy < this.solutionPos[i-1][3]){
					correctPos4++;
			}
			else{
				break;
			}
		}
		score2 = correctPos3+correctPos4+2;
		console.log("score2="+score2);

		if(score1 >= score2){
			for(var i = 0; i < correctPos1+1; i++){
				document.getElementById(this.tickIDs[i]).style.visibility = "visible";
			}
			for(var i = correctPos1+1; i < this.studentsAnswerIDs.length; i++){
				document.getElementById(this.xIDs[i]).style.visibility = "visible";
			}
			for(var i = 0; i < correctPos2+1; i++){
				document.getElementById(this.tickIDs2[i]).style.visibility = "visible";
			}
			for(var i = correctPos2+1; i < this.studentsAnswerIDs2.length; i++){
				document.getElementById(this.xIDs2[i]).style.visibility = "visible";
			}
			totalScore = score1;
			console.log("total+"+totalScore);
		}
		else if(score1 < score2){
			for(var i = 0; i < correctPos2+1; i++){
				document.getElementById(this.tickIDs[i]).style.visibility = "visible";
			}
			for(var i = correctPos2+1; i < this.studentsAnswerIDs.length; i++){
				document.getElementById(this.xIDs[i]).style.visibility = "visible";
			}
			for(var i = 0; i < correctPos1+1; i++){
				document.getElementById(this.tickIDs2[i]).style.visibility = "visible";
			}
			for(var i = correctPos1+1; i < this.studentsAnswerIDs2.length; i++){
				document.getElementById(this.xIDs2[i]).style.visibility = "visible";
			}
			totalScore = score2;
			console.log("total="+totalScore);
		}

	}

	if(this.studentsAnswerIDs.length < this.solutionIDs.length){
		document.getElementById("hint").innerHTML = '<div id="hint-box" class="hint-wrong"><table id="hintTable"><div class="hint-no-table">More neums are expected.</div></table></div>';
	}
	else {
		document.getElementById("hint").innerHTML = "";
	}
}

LaonLevel6ScoreExercise.prototype.showSymbolInfo = function(symbolID) {
	document.getElementById("hintTable").innerHTML += //yoyo add hint border
	    '<tr class="hint-tr" ><td><img src="quincy/symbols/' +
		this.symbolDB.symbols[symbolID].school + '/Level_' + this.symbolDB.symbols[symbolID].level +
		'/Group_' + this.symbolDB.symbols[symbolID].group + '/' +
	    this.symbolDB.symbols[symbolID].fileName + '" hspace="20" style="width:50px; height:50px;"></td>' +
		'<td class="hint-td" >' +//yoyo add line height
    	this.symbolDB.symbols[symbolID].info +
		'</td></tr>';
}

LaonLevel6ScoreExercise.prototype.checkEnteredName = function(solution, enteredText) {
	var rightAnswers = solution.split("=");
	for (var i = 0; i < rightAnswers.length; i++) {
		if (enteredText.toLowerCase() == rightAnswers[i].toLowerCase()) {
			return true;
		}
	}
	return false;
}

LaonLevel6ScoreExercise.prototype.grade = function() {
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
/*
function show(id) {
	document.getElementById(id).style.visibility = "visible";
	console.log("delete visible");
}
function hide(id) {
	document.getElementById(id).style.visibility = "hidden";
	console.log("delete hidden");
}
*/



LaonLevel6ScoreExercise.prototype.showNeumWithID = function(ID) {
	
		insideSymbolID[dropTime] =  'symbol-container-'+ ID + '_copy_'+dropTime;
		//console.log("insideSymbolID="+insideSymbolID[dropTime]);
	

    return '<div id="symbol-container-'+ ID + '_copy_'+dropTime+'" class="answer-symbol" data-neumID="'+ID+'" onclick="sendOnTop(event)" ondragstart="dragStart(event)" draggable="true" style="width:60px;height:60px; top:142px; position: absolute;" >'+	
    		'<img class="symbol-images" id="symbol_' + ID + '_copy_'+dropTime+'" data-neumID="'+ID+'" src="quincy/symbols/' +
		    this.symbolDB.symbols[ID].school + '/Level_' + this.symbolDB.symbols[ID].level +
		    '/Group_' + this.symbolDB.symbols[ID].group + '/' + this.symbolDB.symbols[ID].fileName +
	        '" draggable="false" style="width:60px;height:60px; position: absolute;">'+
	        '<img id="delete-button'+ ID + '_copy_'+dropTime+'" class="delete-buttons" onclick="deleteNeum(event)" style="width:18px; z-index: 500; position:absolute;" draggable="false" src="quincy/img/delete.png" >'+
	        '<img id="tick'+ ID + '_copy_'+dropTime+'" class="tick-marks" draggable="false" src="quincy/img/tick.png">'+
	        '<img id="x'+ ID + '_copy_'+dropTime+'" class="x-marks" draggable="false" src="quincy/img/x.png">'
	        '</div>';

}
/*
LaonLevel6ScoreExercise.prototype.alowDropOnSymbol = function(ID) {

	document.getElementById("symbol_" + ID + "_copy_" + dropTime).ondragover = function(event) {
	        self.allowDrop(event);
	    };		
	    //console.log("allow drop on symbol");
	document.getElementById("symbol_" + ID + "_copy_" + dropTime).ondrop = function(event) {
		    self.drop(event);
		    console.log("drop on symbol");
	    };
}*/