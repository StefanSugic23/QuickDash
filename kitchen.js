const kitchenList = document.querySelector("#kitchenList")

const errorMsg = document.querySelector("#error")

let kitchenOrders = [];

    try{
        const savedOrders = localStorage.getItem("kitchenOrders")
        kitchenOrders = JSON.parse(savedOrders) || [];
    }
    catch(err){
        console.log("couldnt read orders")
        console.log(err)
    }

    function save(){
        const text = JSON.stringify(kitchenOrders)
        localStorage.setItem("kitchenOrders", text)
    }

    function render(){
        kitchenList.textContent=""
        for (let i=0;i<kitchenOrders.length;i++){
            const li = document.createElement("li")
            const codeElement = document.createElement("p")
            const nameElement = document.createElement("p")
            const priceElement = document.createElement("p")
            const qtyElement = document.createElement("p")
            const formElement = document.createElement("form")
            const textAreaElement = document.createElement("textarea")
            const klarButton = document.createElement("button")

            codeElement.textContent = kitchenOrders.items[i].code 
            nameElement.textContent = kitchenOrders[i].name 
            priceElement.textContent = kitchenOrders[i].price 
            qtyElement = kitchenOrders[i].quantity

            
        }
    }

    console.log(kitchenOrders[2].items[0].name)