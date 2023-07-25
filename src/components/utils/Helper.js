// https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
export function isNumeric(string) {
	if (typeof string != 'string') return false; 	// we only process strings!  
	return !isNaN(string) && 						// use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(string)); 			 	// ...and ensure strings of whitespace fail
}

export function isInteger(str) {
	return Number.isInteger(Number(str));
}
