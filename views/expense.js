const amount=document.getElementById("amount")
const description=document.getElementById("description")
const category=document.getElementById("category")
const addExpense=document.getElementById("expense")
const allExpenses=document.getElementById("allExpenses")

//Fetching the expense from database
window.addEventListener("DOMContentLoaded",async()=>{
   try{
        const data=await axios.get("http://localhost:4000/expense/get-expense")
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
        await axios.delete(`http://localhost:4000/expense/delete-expense/${key}`)
       
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
        const data=await axios.post("http://localhost:4000/expense/add-expense",expense_obj)
            showOnScreen(data.data.newExpense)   
    }catch(err){
        console.log("addExpense Error->",err)
    }
   
}