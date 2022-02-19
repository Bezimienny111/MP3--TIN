function resetErrors(inputs, errorTexts, errorInfo){
	for (let i=0;i<inputs.length;i++){
		inputs[i].classList.remove("error-input");
	}
	for (let i=0;i<errorTexts.length;i++){
		errorTexts[i].innerText = "";
	}
	errorInfo.innerText=""
}

function checkRequired(value){
	if(!value){
		return false;
	}
	value = value.toString().trim();
	if (value === ""){
		return false;
	}
	return true;
}

function checkTextLenghtRange(value, min, max){
	if(!value){
		return false;
	}
	value = value.toString().trim();
	const lenght = value.lenght;
	if(max && lenght > max){
		return false;
	}
	if(min && lenght < min){
		return false;
	}
	return true;
}

function checkTextLenghtMax(value, max){
	if(value){
	value = value.toString().trim();
	const lenght = value.lenght;
	if(max && lenght > max){
		return false;
	}
	return true;
}}


function checkEmail(value){
	if(!value){
		return false;
	}
	value = value.toString().trim();
	//const re = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
	const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return re.test(value);
}
function checkNumber(value){
	if(!value){
		return false;
	}
	if(isNaN(value)){
		return false;
	}
	return true;
}

function checkNumberRange(value,min,max){
	if(!value){
		return false;
	}
	if(isNaN(value)){
		return false;
	}
	value = parseFloat(value);
	if(value < min){
		return false;
	}
	if(value > max){
		return false;
	}
	return true;
}

function checkDate(value){
	if(!value){
		return false;
	}
	const pattern = /^\d{4}-\d{2}-\d{2}$/;
	return pattern.test(value);
}
function checkDateIfAfter(value, compareTo){
	if(!value){
		return false;
	}
	if(!compareTo){
		return false;
	}
	const pattern = /^\d{4}-\d{2}-\d{2}$/;
	if(!pattern.test(value)){
		return false;
	}
	const valueDate = new Date(value);
	const today = new Date(compareTo);
	//console.log(today);
	//console.log(valueDate);
	if(valueDate.getTime() < today.getTime()){
		return false;
	}
	return true;
}
