function ExerciseGroup(school, level, group, mechanism, mode) {
	this.school = school;
	this.level = level;
	this.group = group;
	this.mechanism = mechanism;
	
	// Load symbol database
	var xmlhttp;
	if (window.XMLHttpRequest) {    // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {    // code for IE6, IE5
  		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","quincy/symbols/index.xml", false);
	xmlhttp.send();
	this.data = xmlhttp.responseXML;
	var numOfSymbols = this.data.getElementsByTagName("symbol").length;
	
	// Get number of neums of the given group, level, school for Gall level 1-5
	if (school == "StGall" && level < 6) {
		var i = 0;
		for(; i < numOfSymbols; i++) {
			if (this.data.getElementsByTagName("symbol")[i].getAttribute("school") == school &&
				this.data.getElementsByTagName("symbol")[i].getAttribute("level") == level &&
				this.data.getElementsByTagName("symbol")[i].getAttribute("group") == group) {
				this.indexOfFirstNeum = i++;
				break;
			}
		}
		while (this.data.getElementsByTagName("symbol")[i].getAttribute("school") == school &&
			   this.data.getElementsByTagName("symbol")[i].getAttribute("level") == level &&
			   this.data.getElementsByTagName("symbol")[i].getAttribute("group") == group) {
			i++;
		}
		this.groupNeumCount = i - this.indexOfFirstNeum;
		
		// Get number of modern equivalents
		for(; i < numOfSymbols; i++) {
			if (this.data.getElementsByTagName("symbol")[i].getAttribute("school") == "Modern" &&
				this.data.getElementsByTagName("symbol")[i].getAttribute("level") == level &&
				this.data.getElementsByTagName("symbol")[i].getAttribute("group") == group) {
				this.indexOfFirstModernEquivalent = i++;
				break;
			}
		}
		while (i < numOfSymbols &&
			   this.data.getElementsByTagName("symbol")[i].getAttribute("school") == "Modern" &&
			   this.data.getElementsByTagName("symbol")[i].getAttribute("level") == level &&
			   this.data.getElementsByTagName("symbol")[i].getAttribute("group") == group) {
			i++;
		}
		this.modernEquivalentsCount = i - this.indexOfFirstModernEquivalent;
	}
	
	this.createExercises(mode);
}

ExerciseGroup.prototype.createExercises = function(mode) {
	this.exercises = new Array();
	
	if (this.level == 1) {
		for (var i = 0; i < this.groupNeumCount; i++) {
			var questionSymbolID = this.indexOfFirstNeum + i;		
			// Exercise type 1 - enter given neum's name
			// One question for each neum
			this.exercises.push(new GivenNeumEnterEnglishNameExercise(questionSymbolID, this.mechanism));
			
			// Exercise type 3 - select modern symbol(s) to match neum
			// One question for each neum, show all modern symbols in this group
			this.exercises.push(new SelectSymbolToMatchExercise(3, this.school, this.level, this.group, questionSymbolID, this.mechanism));
		}
		
		// Exercise type 2 - select neum to match name
		// There are neums that have the same name, and neums that have multiple names
		// Questions are created on a name basis. One question for each name, not neum
		var names = new Array();
		for (var i = 0; i < this.groupNeumCount; i++) {
			var neumNames = this.data.getElementsByTagName("symbol")[this.indexOfFirstNeum+i].getAttribute("name").split("=");
			for (var j = 0; j < neumNames.length; j++) {
				if (!nameExists(names, neumNames[j])) {
					names.push(neumNames[j]);
					this.exercises.push(new SelectSymbolToMatchExercise(2, this.school, this.level, this.group, neumNames[j], this.mechanism));
				}
			}
		}
		
		// Exercise type 4 - select neum(s) to match modern symbol
		// One question for each modern symbol
		for (var i = 0; i < this.modernEquivalentsCount; i++) {
			var questionSymbolID = i + this.indexOfFirstModernEquivalent;    // ID of modern symbol
			this.exercises.push(new SelectSymbolToMatchExercise(4, this.school, this.level, this.group, questionSymbolID, this.mechanism));
		}
	}

	// Exercise type 6 - select neum alternation
	// Only available in level 2
	else if (this.level == 2) {
		for (var i = 0; i < this.groupNeumCount; i++) {
			// One question for each neum
			var questionSymbolID = this.indexOfFirstNeum + i;
			this.exercises.push(new SelectAlterationExercise(questionSymbolID, this.mechanism));
		}
	}
	
	// Exercise type 7 - multiple choice, multiple answers, each neum has its own unique set of modern equivalents
	// Only available in level 3
	else if (this.level == 3) {
		for (var i = 0; i < this.groupNeumCount; i++) {
			// One question for each neum
			var questionSymbolID = this.indexOfFirstNeum + i;
			this.exercises.push(new SelectSymbolToMatch2Exercise(this.school, this.level, this.group, questionSymbolID, this.mechanism));
		}
	}
	
	else if (this.level == 4) {
		// Exercise type 8 - enter the neum's English name or Latin name
		for (var i = 0; i < this.groupNeumCount; i++) {
			// One question for each neum
			var questionSymbolID = this.indexOfFirstNeum + i;			
			this.exercises.push(new GivenNeumEnterEnglishOrLatinNamesExercise(1, questionSymbolID, this.mechanism));
			this.exercises.push(new GivenNeumEnterEnglishOrLatinNamesExercise(2, questionSymbolID, this.mechanism));
		}
		
		// Exercise type 9 - given English/Latin name enter Latin/English name
		// There are neums that have the same name, and neums that have multiple names
		// Questions are created on a name basis. One question for each name, not neum
		var englishToLatinMap = new Array();
		var latinToEnglishMap = new Array();
		
		for (var i = 0; i < this.groupNeumCount; i++) {
			var neumNames = this.data.getElementsByTagName("symbol")[this.indexOfFirstNeum+i].getAttribute("name").split("--");
			var englishNames = neumNames[0].split("=");
			var latinNames = neumNames[1].split("=");
			
			for (var j = 0; j < englishNames.length; j++) {
				if (typeof englishToLatinMap[englishNames[j]] === "undefined") {
					englishToLatinMap[englishNames[j]] = latinNames;
				}
				else {
					englishToLatinMap[englishNames[j]] = englishToLatinMap[englishNames[j]].concat(latinNames);
				}
			}
			for (var j = 0; j < latinNames.length; j++) {
				if (typeof latinToEnglishMap[latinNames[j]] === "undefined") {
					latinToEnglishMap[latinNames[j]] = englishNames;
				}
				else {
					latinToEnglishMap[latinNames[j]] = latinToEnglishMap[latinNames[j]].concat(englishNames);
				}
			}
		}
		for (var key in englishToLatinMap) {
			this.exercises.push(new GivenNameEnterNameExercise(1, key, englishToLatinMap[key], this.mechanism));
		}
		for (var key in latinToEnglishMap) {
			this.exercises.push(new GivenNameEnterNameExercise(2, key, latinToEnglishMap[key], this.mechanism));
		}
		
		// Exercise type 2 - select neum to match name
		for (var key in latinToEnglishMap) {
			this.exercises.push(new SelectSymbolToMatchExercise(21, this.school, this.level, this.group, key, this.mechanism));
		}
		for (var key in englishToLatinMap) {
			this.exercises.push(new SelectSymbolToMatchExercise(22, this.school, this.level, this.group, key, this.mechanism));
		}
	}
	
	else if (this.level == 5) {
		// Exercise type 3 - select modern symbol(s) to match neum
		for (var i = 0; i < this.groupNeumCount; i++) {
			var questionSymbolID = this.indexOfFirstNeum + i;
			this.exercises.push(new SelectSymbolToMatchExercise(3, this.school, this.level, this.group, questionSymbolID, this.mechanism));
		}
		
		// Exercise type 4 - select neum(s) to match modern symbol
		for (var i = 0; i < this.modernEquivalentsCount; i++) {
			var questionSymbolID = i + this.indexOfFirstModernEquivalent;    // ID of modern symbol
			this.exercises.push(new SelectSymbolToMatchExercise(4, this.school, this.level, this.group, questionSymbolID, this.mechanism));
		}
		
		// Group 1/2/4 = level 1, add exercises type 1 & 2
		if (this.group != 3) {
			// Exercise type 1 - enter given neum's name
			for (var i = 0; i < this.groupNeumCount; i++) {
				var questionSymbolID = this.indexOfFirstNeum + i;		
				this.exercises.push(new GivenNeumEnterEnglishNameExercise(questionSymbolID, this.mechanism));
			}
			
			// Exercise type 2 - select neum to match name
			var names = new Array();
			for (var i = 0; i < this.groupNeumCount; i++) {
				var neumNames = this.data.getElementsByTagName("symbol")[this.indexOfFirstNeum+i].getAttribute("name").split("=");
				for (var j = 0; j < neumNames.length; j++) {
					if (!nameExists(names, neumNames[j])) {
						names.push(neumNames[j]);
						this.exercises.push(new SelectSymbolToMatchExercise(2, this.school, this.level, this.group, neumNames[j], this.mechanism));
					}
				}
			}
		}
	}
	
	// Exercise type 10
	else if (this.level == 6) {
		var xmlhttp;
	    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		    xmlhttp = new XMLHttpRequest();
	    }
	    else {// code for IE6, IE5
  		    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.open("GET","quincy/scores/gall_level_6_score_index.xml", false);
	    xmlhttp.send();
	
	    var scoreInfo = xmlhttp.responseXML;
	    var length = scoreInfo.getElementsByTagName("score").length;
		
		for (var i = 0; i < length; i++) {
			if (scoreInfo.getElementsByTagName("score")[i].getAttribute("type") == "lesson") {
				var scoreFileName = scoreInfo.getElementsByTagName("score")[i].getAttribute("fileName");
				var solution = scoreInfo.getElementsByTagName("score")[i].getAttribute("solution");
				var symbolPos = scoreInfo.getElementsByTagName("score")[i].getAttribute("symbolPos");
				this.exercises.push(new ScoreExercise2(this.school, this.level, scoreFileName, solution, symbolPos, this.mechanism));
			}
		}
	}
	
	// mode 0 - review mode, no shuffling, no intro/end page, do nothing here
	// mode 1 - regular mode
	if (mode == 1) {
		// Shuffle exercises
//	    this.exercises = shuffle(this.exercises);

	    // Add intro and end pages
	    this.exercises.splice(0, 0, new IntroPage(this.school, this.level, this.group));
	    this.exercises.push(new EndPage(this.school, this.level, this.group));
	}
	
	// mode 2 - test mode, shuffle, no intro/end page
	else if (mode == 2) {
		// Shuffle exercises
	    this.exercises = shuffle(this.exercises);
	}
}

function nameExists(array, name) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].indexOf(name) > -1)    return true;
	}
	return false;
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}