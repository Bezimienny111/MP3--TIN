function validateForm(){


const reqMessage = document.getElementById('errorMessage-required').innerText;
const sumMessage= document.getElementById('errorMessage-summary').innerText;
const futMessage= document.getElementById('errorMessage-futureDate').innerText;
const dateFormatMessage= document.getElementById('errorMessage-dateFormat').innerText;    
const linksLen= document.getElementById('errorMessage-linksLen').innerText;    


const newsmanInput = document.getElementById('Newsman');
const categoryInput = document.getElementById('Category');
const contentInput = document.getElementById('Content');
const dateInput = document.getElementById('Date');
const linkInput = document.getElementById('Links');

const errorNewsman= document.getElementById('errorNewsman');
const errorCategory = document.getElementById('errorCategory');
const errorContent = document.getElementById('errorContent');
const errorDate = document.getElementById('errorDate');
const errorLink = document.getElementById('errorLinks');

const errorsSummary = document.getElementById('errorsSummary');

resetErrors([newsmanInput,categoryInput,contentInput,dateInput,linkInput],[errorNewsman,errorCategory,errorContent,errorDate,errorLink], errorsSummary);

let valid = true;

//links
if(checkTextLenghtMax(linkInput.value,300)){
	valid = false;
	linkInput.classList.add("error-input");
	errorLink.innerText = linksLen;
}

//newsman
if(!checkRequired(newsmanInput.value)){
	valid = false;
	newsmanInput.classList.add("error-input");
	errorNewsman.innerText = reqMessage;
}
//category
if(!checkRequired(categoryInput.value)){
	valid = false;
	categoryInput.classList.add("error-input");
	errorCategory.innerText = reqMessage;
}
//tresc
if(!checkRequired(contentInput.value)){
	valid = false;
	contentInput.classList.add("error-input");
	errorContent.innerText = reqMessage;
}
//Data

	let nowDate = new Date(),
		month = '' + (nowDate.getMonth() + 1),
		day = '' + nowDate.getDate(),
		year = nowDate.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	const nowString = [year, month, day].join('-');

	if (!checkRequired(dateInput.value)) {
		valid = false;
		dateInput.classList.add("error-input");
		errorDate.innerText = reqMessage
	} else if (!checkDate(dateInput.value)) {
		valid = false;
		dateInput.classList.add("error-input");
		errorDate.innerText = dateFormatMessage;
	} else if (checkDateIfAfter(dateInput.value, nowString) && checkDate(nowString)) {
		valid = false;
		dateInput.classList.add("error-input");
		errorDate.innerText = futMessage;
	}




if(!valid){
	errorsSummary.innerText = sumMessage;
	}

	return valid;
}

