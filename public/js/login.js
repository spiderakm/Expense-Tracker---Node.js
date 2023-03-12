function validateForm(myform, event){
    try{
        event.preventDefault();
        if(!checkEmail(myform.userEmail)){
            return false;
        }
        if(!checkPass(myform.userPassword)){
            return false;
        }
        authenticateUser(myform.userEmail, myform.userPassword);
    }
    catch(err){
        console.error(err);
    }
}

// Server Requests //

//Request to authenticate user
async function authenticateUser(email, password){
    try{
        await axios.post('/user/login', {userEmail : email.value, userPassword : password.value})
        .then(result => authenticationSuccess(result.data))
        .catch(err => authenticationSuccess(err.response.data));
    }
    catch(err){
        console.error(err);
    }
}

//authentication Message/Response from Server
function authenticationSuccess(message){
    try{
        document.querySelector('.formMessage').innerHTML = message;
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

function checkPass(input) {
    try{
        if(input.value == undefined || input.value == null || input.value == ''){
            showError(input, 'Password is Empty');
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