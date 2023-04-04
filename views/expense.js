const amount=document.getElementById("amount")
const description=document.getElementById("description")
const category=document.getElementById("category")
const addExpense=document.getElementById("expense")
const allExpenses=document.getElementById("allExpenses")

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


//Fetching the expense from database
window.addEventListener("DOMContentLoaded",async()=>{
   try{

        const token = localStorage.getItem('token')
        const decodeToken=parseJwt(token)
        console.log(decodeToken);
        if(decodeToken.premium){
            document.getElementById("razorpay").style.visibility="hidden"
            document.getElementById("addText").innerHTML="Premium User"
        }
        const data=await axios.get("http://localhost:4000/expense/get-expense", { headers: {'Authorization' : token}} )
        
        console.log(data)
        const allExpense=data.data.allExpenses
        for(let i=0;i<allExpense.length;i++){
            showOnScreen(allExpense[i])
        }
        
   }catch(err){
    console.log("windowOnload error",err)
   }
})
 
//showing the data on the screen
function showOnScreen(show){
    try{
        const newExpense=`<li id=${show.id}>${show.amount}&nbsp;&nbsp;${show.description}&nbsp;&nbsp;
        ${show.category}&nbsp;&nbsp;
        <button onclick="deleteExpense(${show.id})">deleteExpense</button></li>`
        allExpenses.innerHTML=allExpenses.innerHTML+newExpense
    }catch(err){
        console.log("error in showscreen",err)
    }
  
}

//deleting the expense
async function deleteExpense(key){
    try{
        const oneExpense=document.getElementById(key)
        allExpenses.removeChild(oneExpense)
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:4000/expense/delete-expense/${key}`,{ headers: {'Authorization' : token}})
       
    }catch(err){
        console.log("delete expeses error-->",err)
    }
    
}

//Addin a expense to the database
addExpense.addEventListener("click",postExpense)
async function postExpense(e){
    try{
        e.preventDefault();

        const expense_obj={
            amount:amount.value,
            description:description.value,
            category:category.value
            
        }
        const token = localStorage.getItem('token')
        const data=await axios.post("http://localhost:4000/expense/add-expense", expense_obj, { headers: {'Authorization' : token}} )
            showOnScreen(data.data.newExpense)   
    }catch(err){
        console.log("addExpense Error->",err)
    }
   
}


document.getElementById("razorpay").onclick=async(e)=>{
    const token=localStorage.getItem("token")
    const resource=await axios.get("http://localhost:4000/purchase/premium-membership",{headers:{"Authorization":token}})
    
    let option={
    "key":resource.data.key_id,
    "order_id":resource.data.order.id,
    "handler":async function (res){
         const data=await axios.post("http://localhost:4000/purchase/updatePremium",{
            "order_id":option.order_id,
            "payment_id":res.razorpay_payment_id
        },{headers:{"Authorization":token} })
        alert("payment successfully done")
        document.getElementById("razorpay").style.visibility="hidden"
            document.getElementById("addText").innerHTML="Premium purchased"
            localStorage.setItem("token",data.data.token)
    },
   }
const raz1=new Razorpay(option)
raz1.open()
e.preventDefault()
 raz1.on("payment.failed",async function(){  
    const key=resource.data.order.id
    
    const response=await axios.post("http://localhost:4000/purchase/updatePremium",{
        "order_id":key,
        "payment_id":null
    },{headers:{"Authorization":token} })
    
    alert(response.data.message)
})
}