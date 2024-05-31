// shop.html, wishlist en winkelmandje

let cartItems = {};
let wishlist = {};

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
    });
});

document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
    });
});
function updateCartDisplay() {
    let cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = "";
    for (let key in cartItems) {
        let item = cartItems[key];
        let cartItem = `
            <section class="citem"> 
                <img class="cimage" src="assets/images/${item.image}" alt="${item.name}">
                <h1>${item.name}</h1>
                <p>${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="delete-btn" data-key="${key}">x</button>
            </section>
        `;
        cartContainer.innerHTML += cartItem;
    }
}

function addToCart(key, image, name, price) {
    if (!cartItems[key]) {
        cartItems[key] = { image, name, price, quantity: 1 };
    } else {
        cartItems[key].quantity++;
    }
    updateCartDisplay();
}

document.querySelector(".cart").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        let key = event.target.getAttribute("data-key");
        delete cartItems[key];
        updateCartDisplay();
    }
});

document.querySelector(".wishlist-display").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        let itemClass = event.target.getAttribute("data-key");
        delete wishlist[itemClass];

        let wishlistButton = document.querySelector('.wishlist-btn.' + itemClass);
        if (wishlistButton) {
            wishlistButton.classList.remove("on-wishlist");
        }

        updateWishlistDisplay();
    }
});

function toggleWishlistItem(itemClass, image, name, price) {
    const item = document.querySelector("." + itemClass);

    if (wishlist[itemClass]) {
        delete wishlist[itemClass];
        item.classList.remove("on-wishlist");
    } else {
        wishlist[itemClass] = { image, name, price };
        item.classList.add("on-wishlist");
    }

    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    let wishlistContainer = document.querySelector(".wishlist-items");
    wishlistContainer.innerHTML = "";

    for (let key in wishlist) {
        let item = wishlist[key];
        let wishlistItem = `
            <section class="witem"> 
                <img class="wimage" src="assets/images/${item.image}" alt="${item.name}">
                <h1>${item.name}</h1>
                <p>${item.price}</p>
                <button class="delete-btn" data-key="${key}">x</button>
            </section>
                `;

        wishlistContainer.innerHTML += wishlistItem;
    }
}

document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', () => {
        const itemClass = button.classList[1];
        const image = button.getAttribute("data-image");
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");

        toggleWishlistItem(itemClass, image, name, price);
    });
});
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute("data-key");
        const image = button.getAttribute("data-image");
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");

        addToCart(key, image, name, price);
    });
});

document.querySelector('#wishlist-button').addEventListener('click', function () {
    let wishlistContainer = document.querySelector('.wishlist-items');
    wishlistContainer.classList.toggle('minimized');
});

document.querySelector('#cart-button').addEventListener('click', function () {
    let cartContainer = document.querySelector('.cart-items');
    cartContainer.classList.toggle('minimized');
});

// Klanten.html

fetchCustomers();

function fetchCustomers() {
    fetch('https://randomuser.me/api/?results=9')
        .then(response => response.json())
        .then(data => {
            let reviews = [
                "Ik heb onlangs een nieuw cricketbat en wat uitrusting gekocht in deze winkel, en ik ben diep onder de indruk. De kwaliteit is van topklasse en het bat ligt perfect in de hand. Ik kom zeker terug voor meer!",
                "Vijf sterren voor de klantenservice! Ik had een probleem met mijn bestelling en ze hebben het zo snel opgelost. De vervangende pads waren zelfs beter dan degene die ik oorspronkelijk had besteld.",
                "Ik was sceptisch over het online kopen van cricketschoenen, maar de maattabel klopte. Ze passen als een droom en de grip op het veld is geweldig. Plus, snelle verzending!",
                "Ik ben al jaren klant en ben nog nooit teleurgesteld geweest. Het aanbod cricketballen is het beste online en de prijzen zijn onverslaanbaar.",
                "Ik heb hier mijn volledige crickettenue gekocht voor het nieuwe seizoen en was onder de indruk van de kwaliteit en prijs. De kittas biedt voldoende ruimte en is zeer duurzaam.",
                "De gepersonaliseerde cricketshirts zijn fantastisch! Het materiaal is comfortabel en ademend en de printkwaliteit is uitstekend. Ons team ziet er geweldig uit op het veld!",
                "Ik was nieuw bij cricket en had een complete set uitrusting nodig. Het klantenserviceteam was ongelooflijk behulpzaam en begeleidde me naar het perfecte starterspakket. Een echte aanrader voor beginners!",
                "De optie voor expreslevering was een redder in nood toen ik nieuwe handschoenen nodig had voor een toernooi. Ik arriveerde binnen twee dagen en de handschoenen zijn van superieure kwaliteit en comfort.",
                "De verscheidenheid aan beschikbare cricketbats is indrukwekkend. Ik vond precies wat ik nodig had voor mijn speelstijl en de gedetailleerde beschrijvingen hielpen me een weloverwogen keuze te maken."
            ];
            displayCustomers(data.results, reviews);
        })
}

function displayCustomers(customers, reviews) {
    let customersContainer = document.getElementById('customers');
    customersContainer.innerHTML = '';

    customers.forEach((customer, index) => {

        let reviewText = reviews[index] || "No review available.";

        let customerCard = `
        <article class="customer-card">
          <img class="customer-image" src="${customer.picture.large}" alt="${customer.name.first} ${customer.name.last}">
          <section class="customer-info">
            <h3>${customer.name.title} ${customer.name.first} ${customer.name.last}</h3>
            <p>${customer.location.country}</p>
          </section>
          <section class="customer-review">
            <blockquote><p>"${reviewText}"</p></blockquote>
          </section>
        </article>
      `;
        customersContainer.innerHTML += customerCard;
    });
}
