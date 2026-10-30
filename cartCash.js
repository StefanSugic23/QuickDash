const prodList = document.querySelector("#products")
const sendToKitchen = document.querySelector("#sendToKitchen")
const cashNum = document.querySelector("#cashNum")
const total = document.querySelector("#total")
const errorMsg = document.querySelector("#error")

let kitchenCart = [];

try {
  const saved = localStorage.getItem("kitchenCart");
  kitchenCart = JSON.parse(saved) || [];
} catch (error) {
  console.log("Could not read saved cart");
}

// Saving the cart
function save() {
  const text = JSON.stringify(kitchenCart);
  localStorage.setItem("kitchenCart", text);
};

function render(){

    prodList.textContent = "";

    for (let item of kitchenCart) {
        const li = document.createElement("li")
        const shortNameElement = document.createElement("p")
        const nameElement = document.createElement("p")
        const priceElement = document.createElement("p")
        const quantityElement = document.createElement("p")

        const addElement = document.createElement("button")
         const removeElement = document.createElement("button")

            shortNameElement.textContent = item.code
            nameElement.textContent = item.name
            priceElement.textContent = item.price + " kr"
            quantityElement.textContent = "quantity: " + item.quantity
            addElement.textContent ="+"
            removeElement.textContent="-"

    addElement.addEventListener("click", function(){
        item.quantity++;
        render();
        save();
        updateCashNum();
        updateTotal();
    })

    removeElement.addEventListener("click", function(){
        if(item.quantity>1){
            item.quantity--;
            
        }
        else {
            kitchenCart.splice(kitchenCart.indexOf(item),1)

        }
        render();
         save();
         updateCashNum();
         updateTotal();
    })
     li.appendChild(shortNameElement)
            li.appendChild(nameElement)
            li.appendChild(priceElement)
            li.appendChild(quantityElement)
            li.appendChild(addElement)
            li.appendChild(removeElement)
            prodList.appendChild(li)

    }
}
render();
updateCashNum();
updateTotal();

function updateTotal(){
    let sum = 0;
    for (let i=0; i<kitchenCart.length;i++){
        sum = sum + (kitchenCart[i].quantity * kitchenCart[i].price)
        
    }
    total.textContent = "Total cost is: " + sum + " kr"
}

function updateCashNum(){
    let sum = 0;
    for(let i=0; i<kitchenCart.length;i++){
        sum = sum + kitchenCart[i].quantity

    }
    cashNum.textContent = "(" + sum +")"
}

sendToKitchen.addEventListener("click", function(){

    if(kitchenCart.length === 0){
        errorMsg.textContent = "No added products yet!"
        return;
    }

    let kitchenOrders = [];

    try{
        const savedOrders = localStorage.getItem("kitchenOrders")
        kitchenOrders = JSON.parse(savedOrders) || [];
    }
    catch(err){
        console.log("couldnt read orders")
        console.log(err)
    }

       
    
    
    
    for (let i = 0; i < kitchenCart.length; i++) {
        let item = kitchenCart[i];

        let newOrder = {
            code: item.code,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }

        /*
        newOrder.items.push({
            code: item.code,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        });
    }
        */
    
    kitchenOrders.push(newOrder)

    

    const text = JSON.stringify(kitchenOrders)
    localStorage.setItem("kitchenOrders", text)

    kitchenCart = [];

    save();
    render();
    updateCashNum();
    updateTotal();

    errorMsg.textContent = "Order sent to kitchen"
    }
})

