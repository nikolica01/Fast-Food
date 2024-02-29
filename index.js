import {menuArray} from './export.js';
const menuHtml = document.getElementById("container");
const payment =document.getElementById("payment")
let orderList=[];

payment.addEventListener("submit",function(e){
e.preventDefault()
const LoginformData= new FormData(payment)
const username= LoginformData.get('username')
deleteInputsValues()
document.querySelector('.payment').style.display='none'
document.querySelector(".orders-div").innerHTML=`<h1>Thanks,<strong class="client-select">${username}</strong> your order on way 🛵!</h1>`

})

document.addEventListener("click",(e)=>{
    if(e.target.dataset.add){
        orderBtn(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }
    else if(e.target.id ===  'complete-orderbtn'){
        console.log("caoo")
        document.querySelector(".payment").style.display="flex"
    }
    else if (e.target.id === 'close-btn' ){
        document.querySelector('.payment').style.display='none'
    }
})



function handleRemoveBtn(item){
   console.log(orderList)
    orderList.splice(item,1)
    render()
    if(orderList.length === 0 ){
        document.querySelector(".orders-div").innerHTML=""
    }


}
function orderBtn(order){
    console.log("caooo")
    const orderItem=menuArray.filter(((menu)=>{
        return menu.id == order;
    }))[0]
    orderList.push(orderItem)
    render()
    
}
function renderOrdersHtml(){
    let totalPrice=0;
    let orders=``;

  orderList.forEach(menu =>{
    orders += `
    <div class="order-list">
      <span>${menu.name}</span>
      <span class="order-remove" data-remove="remove-bt">remove</span>
      <span class="price-span">${menu.price}$</span>
      
  </div>`
    totalPrice+= menu.price
    console.log(totalPrice)
  } )
  

    document.getElementById('total').innerHTML=totalPrice
  
  return orders
}
function hideAndShowEl(ordered){
    const orderedFood=document.querySelector(".orders-div")
    if((ordered === 1 ) && orderedFood.classList.contains('hidden')){
        orderedFood.classList.remove("hidden")
    }
    else if(ordered == 0 ){
        orderedFood.classList.add("hidden")
    }
}

function render(){
    if(orderList.length > 0){
        hideAndShowEl(1);
        document.getElementById('card-details').innerHTML=renderOrdersHtml()

    }
    }
    

function renderOrderMenu(){
   return menuArray.forEach((menu)=>{
        menuHtml.innerHTML +=`
        <div class="pizza">
            <strong class="simbole">${menu.emoji}</strong>
        <div class="texts">
            <div><p>${menu.name}</p></div>
            <div><p>${menu.ingredients}</p></div>
            <div><p>${menu.price}$</p></div>
        </div>
           <button class="button-add" data-add="${menu.id}">+</button>
        </div>
        `

    }
    )
}
renderOrderMenu()

function deleteInputsValues(){
document.getElementById("card-cvv").value=""
document.getElementById("card-numbers").value=""
document.getElementById('username').value=''
}