const userName=document.getElementById("name")
const email=document.getElementById('email')
const password=document.getElementById("password")
const signup=document.getElementById("signup")
const SignUperror=document.getElementById("error")

signup.addEventListener("click",submitSignup)

async function submitSignup(e){
    e.preventDefault()
    let my_obj={
        name:userName.value,
        email:email.value,
        password:password.value
    }
    const data=await axios.post(" http://43.205.129.209:4000/user/signup",my_obj)
    console.log(data)
        //Errors in front end
        if(data.data.success===false){
        const signUpText=document.createTextNode(data.data.message)
            SignUperror.appendChild(signUpText)
            SignUperror.style.color="red"
            console.log(SignUperror)
        setTimeout(()=>{
            SignUperror.removeChild(signUpText)
        },3000)
    }
    if(data.data.success===true){
        const signUpText=document.createTextNode(data.data.message)
        SignUperror.appendChild(signUpText)
        SignUperror.style.color="green"
        console.log(SignUperror)
    setTimeout(()=>{
        SignUperror.removeChild(signUpText)
    },3000)
    }
}
