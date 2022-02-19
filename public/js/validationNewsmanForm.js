function validateForm(){

const reqMessage = document.getElementById('errorMessage-required').innerText;
const lenMessage = document.getElementById('errorMessage-textLengthRange').innerText;
const sumMessage= document.getElementById('errorMessage-summary').innerText;
const isNumber= document.getElementById('errorMessage-isNumber').innerText;    
const email= document.getElementById('errorMessage-email').innerText;      
const admin= document.getElementById('errorMessage-Admin').innerText;    

const nickInput = document.getElementById('Nick');
const emailInput = document.getElementById('Email');
const nameInput = document.getElementById('Name');
const surnameInput = document.getElementById('Surname');
const salaryInput = document.getElementById('Salary_per_news');
const passwordInput = document.getElementById('password');
const adminInput = document.getElementById('Admin');

const errorNick= document.getElementById('errorNick');
const errorEmail = document.getElementById('errorMail');
const errorName = document.getElementById('errorName');
const errorSurname = document.getElementById('errorSurname');
const errorSalary = document.getElementById('errorSalary');
const errorpassword = document.getElementById('errorPassword');
const errorAdmin = document.getElementById('errorAdmin');
const errorsSummary = document.getElementById('errorsSummary');

resetErrors([nickInput,emailInput,nameInput,surnameInput,salaryInput,passwordInput,adminInput],[errorNick,errorEmail,errorName,errorSurname,errorSalary,errorpassword,errorAdmin], errorsSummary);

let valid = true;


//Admin
// salary
if(!checkRequired(adminInput.value)){
	valid = false;
	adminInput.classList.add("error-input");
	errorAdmin.innerText = reqMessage;
} else if(!checkNumber(adminInput.value)){
	valid = false;
	adminInput.classList.add("error-input");
	errorAdmin.innerText = lenMessage;
} else if(!checkNumberRange(adminInput.value,0,1)){
	valid = false;
	adminInput.classList.add("error-input");
	errorAdmin.innerText = admin;
}
//password
if(!checkRequired(password.value)){
	valid = false;
	password.classList.add("error-input");
	errorpassword.innerText = reqMessage;
}


//nick
if(!checkRequired(nickInput.value)){
	valid = false;
	nickInput.classList.add("error-input");
	errorNick.innerText = reqMessage;
} else if(!checkTextLenghtRange(nickInput.value,1,60)){
	valid = false;
	nickInput.classList.add("error-input");
	errorNick.innerText = lenMessage;
}
//email
if(!checkRequired(emailInput.value)){
	valid = false;
	emailInput.classList.add("error-input");
	errorEmail.innerText = reqMessage;
} else if(!checkTextLenghtRange(emailInput.value,1,60)){
	valid = false;
	emailInput.classList.add("error-input");
	errorEmail.innerText = lenMessage;
} else if(!checkEmail(emailInput.value)){
	valid = false;
	emailInput.classList.add("error-input");
	errorEmail.innerText = email;
}

// Imie
if(!checkRequired(nameInput.value)){
	valid = false;
	nameInput.classList.add("error-input");
	errorName.innerText = reqMessage;
} else if(!checkTextLenghtRange(nameInput.value,1,60)){
	valid = false;
	nameInput.classList.add("error-input");
	errorName.innerText = lenMessage;
}
// Nazwisko
if(!checkRequired(surnameInput.value)){
	valid = false;
	surnameInput.classList.add("error-input");
	errorSurname.innerText = reqMessage;
} else if(!checkTextLenghtRange(surnameInput.value,1,60)){
	valid = false;
	surnameInput.classList.add("error-input");
	errorSurname.innerText = lenMessage;
}
// salary
if(!checkRequired(salaryInput.value)){
	valid = false;
	salaryInput.classList.add("error-input");
	errorSalary.innerText = reqMessage;
} else if(!checkNumber(salaryInput.value)){
	valid = false;
	salaryInput.classList.add("error-input");
	errorSalary.innerText = lenMessage;
} else if(!checkNumberRange(salaryInput.value,1,20)){
	valid = false;
	salaryInput.classList.add("error-input");
	errorSalary.innerText = isNumber;
}
if(!valid){
	errorsSummary.innerText =sumMessage;
}
return valid;
}