let item_name = {};
let item_price = {};
let item_pic = {};
let cart = {};
let order_btn = document.getElementById("order-btn");
let order_modal = document.getElementById("order-Modal");

// modal pop window 
let modal = document.getElementById("myModal");
let red_circle = document.getElementById("red-circle");

let add_to_cart_btn = document.getElementById("add-to-cart");
let cart_empty = document.getElementById("cart-empty");
let total_price_elm = document.getElementById("cart-total-price");
let cancel = document.getElementsByClassName("close-1")[0];

let idx = null;
let foodContainers = document.getElementsByClassName("food-container");

const menuBtns = document.querySelectorAll(".menu-btn"); // Select all menu buttons
const sections = document.querySelectorAll(".menu-page-ramen, .menu-page-chashu, .menu-page-fried"); // Select all sections

let modal_cart = document.getElementById("cart-Modal");
let cart_btn = document.getElementById("cart-btn");
let cancel_cart = document.getElementsByClassName("close-cart")[0];



function get_item_name() {
    const item_name_url = '/load_item_name';
    fetch(item_name_url)
    .then(response => response.json())
    .then(json => {
        for (const key in json) {
            item_name[key] = json[key];
            const itemName = json[key];
            const itemElement = document.getElementById(`item-name-${key}`);
            if (itemElement) {
                itemElement.innerHTML = itemName;
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

function get_item_price() {
    const item_price_url = '/load_item_price';
    fetch(item_price_url)
    .then(response => response.json())
    .then(json => {
        for (const key in json) {
            item_price[key] = parseInt(json[key], 10);
            const itemPrice = json[key];
            const itemElement = document.getElementById(`item-price-${key}`);
            if (itemElement) {
                itemElement.innerHTML = '$' + itemPrice;
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

function get_item_pic() {
    const item_pic_url = '/load_item_pic';
    fetch(item_pic_url)
    .then(response => response.json())
    .then(json => {
        for (const key in json) {
            item_pic[key] = "../static/Image/Food/" + json[key];
        }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
    get_item_name();
    get_item_price();
    get_item_pic();
});




function showModal(itemId) {
    // Update the content of the modal
    document.getElementById("modal-item-pic").src = item_pic[itemId];
    document.getElementById("modal-item-name").innerHTML = item_name[itemId];
    document.getElementById("modal-item-price").innerHTML = `$${item_price[itemId]}`;
    // Display the modal
    modal.style.display = "block";
}


cancel.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } 
}


// Add click event listeners to each food-container
for (let i = 0; i < foodContainers.length; i++) {
    foodContainers[i].addEventListener('click', function() {
        modal.style.display = "block";
        idx = i.toString();
        showModal(idx);
    });
}

// add item to cart
add_to_cart_btn.addEventListener('click', function(){
    if(idx!=null){
        if(cart[idx]===undefined){
            cart[idx] = 1;
        }
        else{
            cart[idx] += 1;
        }

        if (Object.keys(cart).length > 0) {
            cart_empty.style.display = 'none';
        }
        // close the model
        modal.style.display = "none"; 
        red_circle.style.display = "block"

        let number_of_items = 0;
        let total_price = 0;


        for (let key in cart) {
            number_of_items += cart[key];
            total_price+=cart[key]*item_price[key];
            console.log(key, cart[key], item_price[key]);
            }
        red_circle.innerHTML = number_of_items;
        total_price_elm.innerHTML = 'Total  $' + total_price;

        // Call the function to update the cart display
        updateCartDisplay();
    }
});



//select the menu
menuBtns.forEach(btn => {
btn.addEventListener("click", function(e) {
    e.preventDefault();
    const targetSectionClass = e.target.getAttribute('data-target'); // Get the target section class from data-target attribute
    const targetSection = document.querySelector('.' + targetSectionClass); // Select the target section

     // Remove active class from all buttons
    menuBtns.forEach(button => button.classList.remove('active'));

    // Add active class to the clicked button
    e.target.classList.add('active');

    sections.forEach(section => {
        if (section === targetSection) {
            section.style.display = "block"; // Show the target section
        } else {
            section.style.display = "none"; // Hide other sections
        }
        });
    });
    });



cart_btn.onclick = function() {
    modal_cart.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
cancel_cart.onclick = function() {
    modal_cart.style.display = "none";
}

function updateCartDisplay() {
    // Assuming item_name, item_pic, and item_price are already defined elsewhere
    let cartContent = document.getElementById('cart-content');
    cartContent.style.display = "block";
    cartContent.innerHTML = ''; // Clear the current cart content

    for (let idx in cart) {
        if (cart.hasOwnProperty(idx)) { // Check if the key is part of the object
            let itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            
            itemDiv.innerHTML = `
                <img src="${item_pic[idx]}" class="cart-item-image" alt="Image of ${item_name[idx]}">
                <div class="cart-item-description">
                    <div class="cart-item-text">
                        <span class="cart-item-name">${item_name[idx]}</span>
                        <span class="cart-item-quantity">X${cart[idx]}</span>
                    </div>
                    <div class="cart-item-edit">
                        <img src="../static/Image/Utility/edit.png" class="cart-edit-icon alt="edit-icon">
                        <img src="../static/Image/Utility/cross.png" class="cart-remove-icon alt="remove-icon">
                    </div>
                </div>
                <div class="cart-item-price">$${cart[idx] * item_price[idx]}</div>
            `;
            
            // Append the new div to the cart content
            cartContent.appendChild(itemDiv);
        }
    }
}    


order_btn.onclick = function(){
    if(Object.keys(cart).length > 0){
        order_modal.style.display = "flex";
        setTimeout(function(){
            window.location.href = '/order_complete'
        }, 3000);
        }
} 
// order_btn.addEventListener("click", function(){
//     order_modal.style.display = "block";
// });