import { menuArray } from "./data";

class Dish {
  constructor(name, price, image, description) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }
}

let purchisedItems = [];
const checkout = document.querySelector(".checkout");
const total = document.getElementById("total");
const checkoutList = document.querySelector(".checkout__list");
const paymentSection = document.getElementById("payment");
const messageSection = document.querySelector(".message");
const isOrder = false;

function renderMenu() {
  const menu = document.querySelector(".menu");
  let menuHTML = "";
  menuArray.forEach(
    (dish) =>
      (menuHTML += `
            <li class="menu__item">
                <div class="dish__image">
                <img src="./images/dishes/${dish.id}.png" alt=${dish.name} />
                </div>
                <div class="dish">
                <h2 class="dish__title">${dish.name}</h2>
                <p class="dish__description">${dish.ingredients}</p>
                <p class="dish__price">$${dish.price}</p>
                </div>
                <button class="menu__btn" data-id=${dish.id}>+</button>
            </li>
    `)
  );

  menu.innerHTML = menuHTML;
}

renderMenu();

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("menu__btn")) {
    setCheckout(event.target.dataset.id);
  }
  if (event.target.classList.contains("checkout__close")) {
    checkClose();
  }
  if (event.target.classList.contains("checkout__btn")) {
    renderPayment();
  }
  if (event.target.classList.contains("payment__btn")) {
    event.preventDefault();
    renderSuccessMessage();
  }
  if (event.target.classList.contains("checkout__remove")) {
    removeItem(event.target.dataset.item);
  }
});

function setCheckout(id) {
  const itemNames = purchisedItems.map((item) => item.name);
  console.log(itemNames);

  if (!itemNames.includes(menuArray[id].name)) {
    const newItem = {
      name: menuArray[id].name,
      quantity: 1,
      price: menuArray[id].price,
    };
    purchisedItems.push(newItem);
  } else {
    purchisedItems.forEach((item) => {
      if (item.name === menuArray[id].name) {
        item.quantity++;
        item.price = menuArray[id].price * item.quantity;
      }
    });
  }
  renderCheckout();
}

function renderCheckout() {
  messageSection.classList.add("hidden");
  checkout.classList.remove("hidden");
  total.textContent = "$" + countTotal();
  let checkoutHTML = "";
  purchisedItems.forEach((item) => {
    checkoutHTML += `
    <li class="checkout__item">
        <span class="checkout__item-title">${item.name}</span>
        <span class="checkout__remove" data-item=${item.name}>remove</span>
        <span class="checkout__quantity">${item.quantity}</span>
        <span class="checkout__price">$${item.price}</span>
    </li>
  `;
  });
  checkoutList.innerHTML = checkoutHTML;
}

function checkClose() {
  checkout.classList.add("hidden");
}

function countTotal() {
  return purchisedItems.reduce((accum, item) => accum + item.price, 0);
}

function renderPayment() {
  paymentSection.classList.remove("hidden");
  document.body.classList.add("block");
}

function renderSuccessMessage() {
  messageSection.classList.remove("hidden");
  paymentSection.classList.add("hidden");
  checkout.classList.add("hidden");
  document.body.classList.remove("block");
  purchisedItems = [];
  console.log(purchisedItems);
  checkout.classList.add("hidden");
}

function removeItem(product) {
  purchisedItems = purchisedItems.filter((item) => item.name !== product);
  purchisedItems.length === 0 && checkout.classList.add("hidden");
  purchisedItems.length > 0 && renderCheckout();
}
