function validateForm(){


const reqMessage = document.getElementById('errorMessage-required').innerText;
const futMessage= document.getElementById('errorMessage-futureDate').innerText;
const dateFormatMessage= document.getElementById('errorMessage-dateFormat').innerText;    
const sumMessage= document.getElementById('errorMessage-summary').innerText;

	
const opisInput = document.getElementById('Description');
const dateInput = document.getElementById('Date');

const errorOpis = document.getElementById('errorDescription');
const errorDate = document.getElementById('errorDate');
const errorsSummary = document.getElementById('errorsSummary');

resetErrors([opisInput,dateInput],[errorOpis,errorDate], errorsSummary);

let valid = true;

if(!checkRequired(opisInput.value)){
	valid = false;
	opisInput.classList.add("error-input");
	errorOpis.innerText =  reqMessage;
}

let nowDate = new Date(),
	month = '' + (nowDate.getMonth() + 1),
	day = '' + nowDate.getDate(),
	year = nowDate.getFullYear();
	
if (month.length < 2)
	month = '0' + month;
if (day.length < 2)
	day = '0' + day;

const nowString = [year, month, day].join('-');

if(!checkRequired(dateInput.value)){
	valid = false;
	dateInput.classList.add("error-input");
	errorDate.innerText = reqMessage;
} else if (!checkDate(dateInput.value)){
	valid = false;
	dateInput.classList.add("error-input");
	errorDate.innerText = dateFormatMessage;
} else if(checkDateIfAfter(dateInput.value,nowString) && checkDate(nowString)){
	valid = false;
	dateInput.classList.add("error-input");
	errorDate.innerText = futMessage;
}

if(!valid){
	errorsSummary.innerText = sumMessage;
}
return valid;
}