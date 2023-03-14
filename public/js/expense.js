let amount=document.getElementById("amount")
let description=document.getElementById("description")
let category=document.getElementById("category")
let button=document.getElementById("press")
let error=document.getElementById("error")
let parentNode=document.getElementById("allExpenses")

//viewing expense

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const allInfo=await axios.get("http://localhost:4000/expense/get-expense")
        console.log(allInfo)
        const length=allInfo.data.allExpenses.length
        for(let i=0;i<length;i++){
            showOnScreen(allInfo.data.allExpenses[i])
        }
    }catch(err){
        console.log("DOM get error-->",err)
    }

})

//showing the values on the browser stored in the database

async function showOnScreen(data){
    try{
        var childNode=`<li id=${data.id}>${data.amount}&nbsp;&nbsp;&nbsp;&nbsp;${data.description}&nbsp;&nbsp;&nbsp;&nbsp;${data.category}
        <button class="btn bg-danger float-sm-end" onclick="deleteExpense(${data.id})">delete</button>
        <button class="btn bg-primary float-sm-end" onclick="editExpense('${data.id}','${data.amount}','${data.description}','${data.category}')" >edit</button></li>`
        parentNode.innerHTML=parentNode.innerHTML+childNode
    }catch(err){
        console.log("showscreen error!",err)
    }
}

//Delete the expense
async function deleteExpense(key){  
    await axios.delete(`http://localhost:5200/expense/delete-expense/${key}`)  
    const child=document.getElementById(key)
    parentNode.removeChild(child)
}



//Adding expense 
button.addEventListener("click",addExpense)
async function addExpense(e){
    try{
        console.log("button clicked")
        e.preventDefault()
        const obj={
            amount:amount.value,
            description:description.value,
            category:category.value
        }
       const allInfo=await axios.post("http://localhost:5200/expense/add-expense",obj)
       console.log(allInfo)
           showOnScreen(allInfo.data.newExpense)
        // To reset all the input boxes
    amount.value=""
    description.value=""
    category.value=""
    }
    catch(err){
        console.log(err)
    }
   
}