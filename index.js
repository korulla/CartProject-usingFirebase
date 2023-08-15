import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-b4160-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const shoppingList = ref(dataBase, "Shopping-List")

const item = document.getElementById("input")
const cart_item = document.getElementById("cart")
const shopping_list_item = document.getElementById("shopping-list-li")




function value_null(a){
    var a 
    a.value = ""
}

function add_list (a, b) {
    // a => to whcih list is to be added 
    // b => what is to be added 
    var a
    a.innerHTML += `<li>${b}</li>`
}

function addItemToShoppingList(item){ 
    let itemID = item[0]
    let itemValue = item[1]
    // shopping_list_item.innerHTML += `<li>${a}</li>`
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function(){
       let exactlocationofitemindb = ref(dataBase, `Shopping-List/${itemID}`)
       remove(exactlocationofitemindb)
    })
    shopping_list_item.append(newEl)

}

// function removeItemFromShoppingList(item){

//     // shopping_list_item.innerHTML += `<li>${a}</li>`
//     let newEl = document.createElement("li")
//     newEl.textContent = item
    
//     newEl.addEventListener("click", function(){
//         console.log(item)
//     })
// }

cart_item.addEventListener("click", function(){
    let temp_item = item.value
    push(shoppingList, temp_item)
    item.value=""   
    // shopping_list_item.innerHTML += `<li>${temp_item}</li>`

})


let cart_itemsId = []
onValue(shoppingList, function(snapshot){

    if(snapshot.exists()){

        let cart_items_full = Object.entries(snapshot.val())

    shopping_list_item.innerHTML = ""  
      for ( let i=0; i<cart_items_full.length; i++){
         let currentitem = cart_items_full[i]
         let cart_items_Id = currentitem[0]
         let cart_items_value = currentitem[1]

        // shopping_list_item.innerHTML += `<li>${cart_items[i]}</li>`
        addItemToShoppingList(currentitem)
        // removeItemFromShoppingList(cart_items_Id)
    }

    }

    else
    shopping_list_item.innerHTML = "No items here yet...." 
    

})




// function ben () {
//     let temp_item = item.value
//     push(shoppingList, temp_item)
// }
    


// function show()
// {
//     let a=document.getElementById("input-text").value
//     console.log(a)
// }