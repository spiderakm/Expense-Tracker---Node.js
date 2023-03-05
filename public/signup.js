function validateForm(myform, event){
    try{
        event.preventDefault();
        if(!checkLengthName(myform.userName)){
            return false;
        }
        if(!checkEmail(myform.userEmail)){
            return false;
        }
        if(!checkLengthPass(myform.userPassword)){
            return false;
        }
        if(!checkPasswordMatch(myform.userPassword, myform.userPasswordRepeat)){
            return false;
        }
        if(!createUser(myform)){
            return false;
        }
    }
    catch(err){
        console.error(err);
    }
    
}

// Server Requests //

function userCreationSuccess(message){
    try{
        document.querySelector('.formMessage').innerHTML = message;
    }
    catch(err){
        console.error(err);
    }
}

//save the user data
async function createUser(myform){
    try{
        const UserData = {
            userName : myform.userName.value,
            userEmail : myform.userEmail.value,
            userPassword : myform.userPassword.value,
        }
        axios.post('/user/signup', UserData)
            .then(result => {
                userCreationSuccess(result.data)
            })
            .catch(err => {
                userCreationSuccess(err.response.data);
            });
    }
    catch(err){
        console.error(err);
    }
}

// Data Validations //

function showError(input, message) {
    try{
        input.parentElement.className = 'form-outline flex-fill mb-0 form-control error';
        document.querySelector('.formMessage').innerHTML = message;
    }
    catch(err){
        console.error(err);
    }
}

function showSuccess(input){
    try{
        input.parentElement.className = 'form-outline flex-fill mb-0 form-control success';
        document.querySelector('.formMessage').innerHTML = '';
    }
    catch(err){
        console.error(err);
    }
}

function checkEmail(input) {
    try{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        }else {
            showError(input, 'Email is Invalid');
            return false;
        }
    }
    catch(err){
        console.error(err);
    }
}

function checkLengthName(input) {
    try{
        if(input.value.length < 3) {
            showError(input, `Name must be at least 3 characters`);
            return false;
        }else if(input.value.length > 20) {
            showError(input, `Name must be les than 20 characters`);
            return false;
        }else{
            showSuccess(input);
            return true;
        }
    }
    catch(err){
        console.error(err);
    }
}

function checkLengthPass(input) {
    try{
        if(input.value.length < 6) {
            showError(input, `Password must be at least 6 characters`);
            return false;
        }else if(input.value.length > 15) {
            showError(input, `Password must be les than 15 characters`);
            return false;
        }else{
            showSuccess(input);
            return true;
        }
    }
    catch(err){
        console.error(err);
    }
}

function checkPasswordMatch(input1, input2) {
    try{
        if(input1.value !== input2.value) {
            showError(input2, 'Passwords do not match');
            return false;
        }else{
            showSuccess(input2);
            return true;
        }
    }
    catch(err){
        console.error(err);
    }
}
