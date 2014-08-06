var operatorsByPrecedence = ["+", "-", "/", "*"];
var operatorHash = {
	"*": function(a,b){return a * b;},
	"/": function(a,b){return a / b;},
	"+": function(a,b){return a + b;},
	"-": function(a,b){return a - b;}
};

function calculate(expression) {
	if (!expression) {
		return 0;
	}
	return evaluate(removeSpacesOf(expression));
}

function evaluate(expression) {
	if (!hasOperator(expression)) {
		return parseInt(expression);
	}

	var i = 0;
	var result = 0;
	for (i = 0; i < operatorsByPrecedence.length; i++) {
		var operator = operatorsByPrecedence[i];
		result = operate(expression, operator, operatorHash[operator]);
		console.log(result);
		if (result !== null) {
			break;
		}
	}
	return result;
}

function removeSpacesOf(string) {
	return string.replace(/\s+/g, '');
}

function hasCharacter(string, character) {
	return string.indexOf(character) !== -1;
}

function splitStringOnFirstOccurrence(string, character){
	var index = string.indexOf(character);
	if (index !== -1) {
		return [string.substring(0, index), string.substring(index + 1)];
	}

	return [string];
}

function hasOperator(string) {
	return hasCharacter(string, "+") || hasCharacter(string, "-") || hasCharacter(string, "*") || hasCharacter(string, "/")
}

function operate(expression, operator, operation) {
	if (hasCharacter(expression, operator)) {
		var splitted = splitStringOnFirstOccurrence(expression, operator);
		return operation(evaluate(splitted[0]), evaluate(splitted[1]));
	}

	return null;
}
