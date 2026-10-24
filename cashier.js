const category = document.querySelector("#category")
const productsList = document.querySelector("#products")
const cashNum = document.querySelector("#cashNum")
const removeAll = document.querySelector("#removeAll")

const products = [
    { id: 1, name: "Coffee", code: "cf", price: 30, category: "Drinks" },
    { id: 2, name: "Coca-Cola", code: "cc", price: 25, category: "Drinks" },
    { id: 3, name: "Fresh Orange Juice", code: "oj", price: 35, category: "Drinks" },
    { id: 4, name: "Cheeseburger", code: "cb", price: 119, category: "Food" },
    { id: 5, name: "Margherita Pizza", code: "mp", price: 129, category: "Food" },
    { id: 6, name: "Caesar Salad", code: "cs", price: 99, category: "Food" },
    { id: 7, name: "Chicken Wrap", code: "cw", price: 89, category: "Food" },
    { id: 8, name: "Chocolate Cake", code: "ck", price: 49, category: "Dessert" },
    { id: 9, name: "Ice Cream", code: "ic", price: 39, category: "Dessert" },
    { id: 10, name: "Cheesecake", code: "cck", price: 55, category: "Dessert" }
];

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

function render(cat){
    productsList.textContent="";

    for(let i =0; i<products.length;i++){
        if (cat === products[i].category || cat === "all"){
            const li= document.createElement("li")
            const shortNameElement = document.createElement("p")
            const nameElement = document.createElement("p")
            const priceElement = document.createElement("p")
            const addElement = document.createElement("button")
            const removeElement = document.createElement("button")

            shortNameElement.textContent = products[i].code
            nameElement.textContent = products[i].name
            priceElement.textContent = products[i].price + " kr"
            addElement.textContent ="Add"
            removeElement.textContent="Remove"


            addElement.addEventListener("click", function(){
                let found = false;

                for (let item of kitchenCart){
                    if( item.name === products[i].name){
                        item.quantity++;
                        found = true;
                        break;
                    }
                }
                if (found === false){
                    const newObject = {
                        name: products[i].name,
                        price: products[i].price,
                        quantity: 1,
                        category: products[i].category
                    }
                    kitchenCart.push(newObject)
                }
                render(cat)
                save();
                updateCashNum();
            })

            removeElement.addEventListener("click", function () {
                for (let item of kitchenCart) {
                    if(item.name === products[i].name){
                        if(item.quantity>1){
                            item.quantity--;
                        }
                        else if(item.quantity===1 && kitchenCart.length>1){
                            kitchenCart.splice(kitchenCart.indexOf(item),1)
                        }
                        else {
                            kitchenCart.splice(0,kitchenCart.length)
                            kitchenCart = [];
                        }
                        break;
                    }
                }
                render(cat)
                save();
                updateCashNum();
    
});
            li.appendChild(shortNameElement)
            li.appendChild(nameElement)
            li.appendChild(priceElement)
            li.appendChild(addElement)
            li.appendChild(removeElement)
            productsList.appendChild(li)





        }
    }

}
render("all")
updateCashNum()

function updateCashNum(){
    let sum = 0;
    for(let i=0; i<kitchenCart.length;i++){
        sum = sum + kitchenCart[i].quantity

    }
    cashNum.textContent = "(" + sum +")"
}

category.addEventListener("change", function(){
    const choice = category.value
    console.log(choice)
    render(choice)
})

removeAll.addEventListener("click", function(){
    kitchenCart.splice(0, kitchenCart.length)
    kitchenCart = [];
    render("all");
    save();
    updateCashNum();
    
})
    

console.log(kitchenCart.length)