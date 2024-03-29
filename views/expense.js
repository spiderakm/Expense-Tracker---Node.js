
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
            showLeaderBoard()
            download()
        }
        pagination()
        
 
        
   }catch(err){
    console.log("windowOnload error",err)
   }
})
 
async function pagination(){
    try {
        const token=localStorage.getItem("token")
        const data=await axios.get("/expense/get-expense", { headers: {'Authorization' : token}} )
        const pagination=document.getElementById("pagination")
        const totalPagesize=localStorage.getItem("pageSize")
        const totalpage=Math.ceil((data.data.allExpenses.length)/totalPagesize)
        if(!totalPagesize){
            localStorage.setItem("pageSize",5)
        }
        const response=await axios.get(`/expense/pagination?page=${1}&pagesize=${5}`,{headers:{"Authorization":token}})
            let allExpense=response.data.Data
                        
            for(let i=0;i<allExpense.length;i++){
                
                showOnScreen(response.data.Data[i])    
                }

                for(let i=0;i<totalpage;i++){
                    let page=i+1
                    button=document.createElement("button")
                    button.innerHTML=i+1
                    
                    button.onclick=async()=>{
                    allExpenses.innerHTML=""
                    const response=await axios.get(`/expense/pagination?page=${page}&pagesize=${totalPagesize}`,{headers:{"Authorization":token}})
                    let allExpense=response.data.Data
                    for(let i=0;i<allExpense.length;i++){
                        showOnScreen(response.data.Data[i])    
                        }
                    } 
                pagination.appendChild(button)
                }  


        
    } catch (error) {
        console.log("pagination error");
    }
}





//showing the data on the screen
function showOnScreen(show){
    try{
        const pagesize=document.getElementById("pagesize")
        pagesize.addEventListener("click",()=>{
            localStorage.setItem("pageSize",pagesize.value)
            window.location.reload()
           })
           const newExpense=`<table id=${show.id} class="table text-white ">
           <tr>
           <td><li></li></td>
           <td>${show.amount}</td>
           <td>${show.description}</td>
           <td>${show.category}</td>
           <td><button onclick="deleteExpense(${show.id})" style="float:right" class="btn btn-danger" >delete</button></td>
           </tr>
           </table>`
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
        await axios.delete(`/expense/delete-expense/${key}`,{ headers: {'Authorization' : token}})
       
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
        const data=await axios.post("/expense/add-expense", expense_obj, { headers: {'Authorization' : token}} )
            showOnScreen(data.data.newExpense)   
    }catch(err){
        console.log("addExpense Error->",err)
    }
   
}


document.getElementById("razorpay").onclick=async(e)=>{
    const token=localStorage.getItem("token")
    const resource=await axios.get("/purchase/premium-membership",{headers:{"Authorization":token}})
    
    let option={
    "key":resource.data.key_id,
    "order_id":resource.data.order.id,
    "handler":async function (res){
         const data=await axios.post("/purchase/updatePremium",{
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
    
    const response=await axios.post("/purchase/updatePremium",{
        "order_id":key,
        "payment_id":null
    },{headers:{"Authorization":token} })
    
    alert(response.data.message)
})
}

async function showLeaderBoard(){
    try{
        const buttonLeaderBoard=document.createElement("input")
        buttonLeaderBoard.type="button"
        buttonLeaderBoard.value="Show LeaderBoard"
       document.getElementById("addText").appendChild(buttonLeaderBoard)
        console.log(buttonLeaderBoard)
        buttonLeaderBoard.onclick=async function(e){
            e.preventDefault()
            const token=localStorage.getItem("token")
           const response= await axios.get("/premium/leaderBoard",{headers:{"Authorization":token}})
            console.log(response.data)
            const parent=document.getElementById("leaderboard")
            response.data.forEach(ele => {
                if(ele.totalAmount===null){
                    ele.totalAmount=0
                }
              const child=  `<li>Name---${ele.name}&nbsp;---Total Cost---${ele.totalAmount}</li>`
              parent.innerHTML=parent.innerHTML+child
            });
        }
    }catch(err){
        console.log("err in showLeaderBoard")
    }
}


function download(){
    try {
        const token=localStorage.getItem("token")
        buttonDownload=document.createElement("input")
        buttonDownload.type="button"
        buttonDownload.value="Download"
        buttonDownload.setAttribute("class","btn btn-warning border-3 text-white")
        const reportText= document.createTextNode("Download Report")
        document.getElementById("reportText").appendChild(reportText)
        document.getElementById("buttons").appendChild(buttonDownload)
        buttonDownload.addEventListener("click",async(e) => {
            e.preventDefault()
            const response = await axios.get('/user/download', { headers: {"Authorization" : token} })
    
            const a=document.createElement("a")
            var urls = response.data.alldata

            console.log(urls);

            for(let i=0;i<urls.length;i++){
                showPreviousReport(urls[i])
            }
            a.href=response.data.url

            a.click()
        })

    } catch (error) {
        console.log("erron in download DOM",er);
    }

    

}

function showPreviousReport(data){
    const parentNode = document.getElementById("allreport")
    
    const chilehtml = `<li>
            <a href="${data.url}">Report File Created at ${data.time} </a>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + chilehtml;
    

}