let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById('label');
let footer = document.getElementById('cart-footer');
let shoppingCart = document.getElementById('shopping-cart');



let calculation = () => {
    let cardIcon = document.getElementById("cartAmount");
    cardIcon.innerHTML = basket.map((x)=> x.item)
    .reduce((x, y)=> x + y, 0)
};

calculation();

let generatCartItems = () => {

    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket
        .map((x)=>{
            let {id, item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class="cart-item">
                <img class="cart-img" width="100px" src="${img}" alt="" />
                <div class="cartdetails">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id}) "class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${item * price}</h3>

                </div>
            </div>

            `
        }).join("");

    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Nothing</h2>
        <a href="index.html">
            <button class="HomeBtn">To Store</button>
        </a>`;
        footer.innerHTML = ``;
    }
};

generatCartItems();

let increment = (id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);
    
    if(search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
           });
    } else {
        if (search.item < 10) {
            search.item += 1;
        }
    }

    generatCartItems();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);
    
    if(search === undefined) {
        return;
    } else if(search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }

    update(selectedItem);
    basket = basket.filter((x)=> x.item !== 0);
    generatCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id)=> {
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem);
    generatCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generatCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x)=> {
            let {item, id} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=> x + y, 0);
        footer.innerHTML = `
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
        label.innerHTML = `
        <h2>Total: $ ${amount}</h2>
        <button class="checkout">Checkout</button>`;
    } else {
        return;
    }
};

totalAmount();