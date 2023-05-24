"use strict";

// coupon
const coupon = document.querySelector(".coupon-data__coupon-code");
let couponCorrect = false;

// popup window
const divElement = document.querySelector(".popup__details");

// basket
let basket = []; // basket is being created for future order

const minus = document.querySelectorAll(".quantity-selector__minus");
const plus = document.querySelectorAll(".quantity-selector__plus");
const quantity = document.querySelector(".quantity-selector__number");

// pizza name element
const pizzaName = document.querySelectorAll(".item-gourmet__name");

//  empty array of objects of pizza names and prices
const pizzaFG = [{ name: "", cost: 0 }];

// pizza select
const pizzaSelect = document.querySelector(".item-choosen__item-name");

// bill details
const billTotal = document.querySelector(".itemTotal-info__price");
const discountBillTotal = document.querySelector(".discount-info__price");
const taxBillTotal = document.querySelector(".taxes-info__price");
const paymentBillTotal = document.querySelector(".payment-info__price");

// ============================ coupon ==========================

// coupon checking
coupon.addEventListener("change", couponCheck);
function couponCheck(e) {
  if (couponNumber === coupon.value) {
    couponCorrect = couponCorrect === false ? true : couponCorrect;
    // pizzaCostDefine(pizzaSelect.value, pizzaFG);
  } else {
    couponCorrect = couponCorrect === true ? false : couponCorrect;
    // pizzaCostDefine(pizzaSelect.value, pizzaFG);
  }
}

// ========================== pizza finished goods=============

//  array of pizza name and price objects
pizzaName.forEach(function (el) {
  pizzaFG.push({
    name: el.innerHTML,
    cost: el.nextElementSibling.innerHTML,
  });
});

// selected finished goods pizza from selected list
pizzaSelect.addEventListener("change", changePizza);

function changePizza(e) {
  pizzaCostDefine(pizzaSelect.value, pizzaFG);
  if (couponCorrect) {
    orderPriceTotal.style.textDecoration = "line-through";
  } else {
    orderPriceTotal.style.textDecoration = "";
  }

  // add checked ingredients to basket if any
  addIngradientsToBasket();

  totalPriceDisplay();
  if (!pizzaSelect.value) {
    if (!customizePizza.classList.contains("hidden")) {
      customizePizza.classList.add("hidden");
      checkBoxesUncheck();
    }
  }
}

function pizzaCostDefine(pizzaName, array) {
  let percentDiscount = 0;
  let var_discount = 0;
  for (let i = 0; i < array.length; i++) {
    if (pizzaName === array[i].name) {
      let var_price = array[i].cost;
      let var_quantity = Number(quantity.innerHTML);
      var_price = Number(getPrice(var_price));

      let var_totalPrice = Number((var_quantity * var_price).toFixed(2));

      if (couponCorrect) {
        percentDiscount = 0.3;
        var_discount = Number((var_totalPrice * percentDiscount).toFixed(2));
      }

      if (array == pizzaFG) basket = [];
      basket.push({
        name: pizzaName,
        quantity: var_quantity,
        price: var_price,
        totalPrice: var_totalPrice,
        discount: var_discount,
      });
    }
  }
}

function getPrice(price) {
  if (price[0] === "$") {
    price = price.slice(1);
  }
  if (isNaN(parseFloat(price))) return 0;
  return Number(parseFloat(price)).toFixed(2);
}

function totalPriceDisplay() {
  let sumTotal = 0;
  let sumWithDiscount = 0;
  basket.forEach((el) => {
    sumTotal += el.totalPrice;
    sumWithDiscount += el.totalPrice - el.discount;
  });

  orderPriceTotal.innerHTML = "$ " + sumTotal.toFixed(2);
  discountPrice.innerHTML = "$ " + sumWithDiscount.toFixed(2);
}

// ==================== decrement quantity ====================
minus.forEach(function (el) {
  el.addEventListener("click", decrementQuantity);
});

function decrementQuantity(e) {
  let currentQuantity = quantity.innerHTML;
  quantity.innerHTML =
    currentQuantity > 1 ? Number(currentQuantity) - 1 : currentQuantity;
  pizzaCostDefine(pizzaSelect.value, pizzaFG);

  // add checked ingredients to basket if any
  addIngradientsToBasket();

  totalPriceDisplay();
}

// ==================== increment quantity ====================
plus.forEach(function (el) {
  el.addEventListener("click", incrementQuantity);
});

function incrementQuantity(e) {
  let currentQuantity = quantity.innerHTML;
  quantity.innerHTML =
    currentQuantity < 999 ? Number(currentQuantity) + 1 : currentQuantity;
  pizzaCostDefine(pizzaSelect.value, pizzaFG);

  // add checked ingredients to basket if any
  addIngradientsToBasket();

  totalPriceDisplay();
}

// ===================== ingredients===========================
//  empty array of objects of ingredient names and prices
const ingredients = [];

//  ingrediens select element
const ingredientsSelect = document.querySelector(".customize-pizza__select");

// ingredient names
const ingredientsName = document.querySelectorAll(
  ".menu-option__ingredientName"
);

// ingredients to be choiced by user
const customizePizza = document.querySelector(".customize-pizza");
customizePizza.classList.toggle("hidden");

//  array of ingredient name and price objects
ingredientsName.forEach(function (el) {
  ingredients.push({
    name: el.innerHTML,
    cost: el.nextElementSibling.nextElementSibling.innerHTML,
  });

  let checkBoxWrapper = document.createElement("div");
  checkBoxWrapper.style.padding = "3px";
  checkBoxWrapper.style.marginRight = "5px";
  let label = document.createElement("label");
  label.innerHTML =
    ingredients[ingredients.length - 1].name +
    " ==> " +
    ingredients[ingredients.length - 1].cost;
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.style.marginLeft = "5px";
  checkBox.value = el.innerHTML;
  checkBox.classList.add("checkBox__ingredient");
  label.appendChild(checkBox);
  checkBoxWrapper.appendChild(label);
  ingredientsSelect.appendChild(checkBoxWrapper);
});

const checkBox__ingredient = document.querySelectorAll(".checkBox__ingredient");
checkBox__ingredient.forEach(function (el) {
  el.addEventListener("click", getIngredientCost);
});

function getIngredientCost(e) {
  if (e.target.checked) {
    pizzaCostDefine(e.target.value, ingredients);
  } else {
    basket.forEach((value) => {
      if (value.name === e.target.value) {
        let index = basket.indexOf(value);
        basket.splice(index, 1);
        return;
      }
    });
  }
  totalPriceDisplay();
}

function checkBoxesUncheck() {
  checkBox__ingredient.forEach(function (el) {
    el.checked = false;
  });
}

function addIngradientsToBasket() {
  checkBox__ingredient.forEach((el) => {
    if (el.checked) {
      pizzaCostDefine(el.value, ingredients);
    }
  });
}

// ================== order =============================

let itemsOrder = [];
const addItems = document.querySelector(".addItems-btn");
const reviewItems = document.querySelector(".reviewItems-btn");
const clearItems = document.querySelector(".clearItems-btn");

addItems.addEventListener("click", addItemsOrder);
reviewItems.addEventListener("click", reviewItemsOrder);
clearItems.addEventListener("click", clearItemsOrder);

function addItemsOrder(e) {
  if (!pizzaSelect.value) return;

  basket.forEach((el) => {
    itemsOrder.push(el);
  });
  basket = [];
  setBillDetails();
}

function createNewElement(
  newElement,
  className,
  typeName,
  content,
  parentElement
) {
  let element = document.createElement(newElement);
  if (className) {
    if (!element.classList.contains(className)) {
      element.classList.add(className);
    }
  }

  if (typeName) {
    element.type = typeName;
  }

  if (content) {
    element.textContent = content;
  }

  parentElement.appendChild(element);

  return element;
}

function reviewItemsOrder(e) {
  divElement.innerHTML = "";

  const table = createNewElement("table", "null", null, null, divElement);

  const template_th = document.querySelector("#table-th__template");
  const clone_th = template_th.content.cloneNode(true);
  table.appendChild(clone_th);

  const template_td = document.querySelector("#table-tr__template").innerHTML;

  itemsOrder.forEach((item) => {
    let renderedHtml = Mustache.render(template_td, item);
    table.insertAdjacentHTML("beforeend", renderedHtml);
  });

  const btn_delete = document.createElement("button");
  btn_delete.type = "button";
  btn_delete.innerText = "Delete row";
  btn_delete.addEventListener("click", function () {
    const inputChecks = document.querySelectorAll("td input");
    inputChecks.forEach((el) => {
      if (el.checked) {
        const tableRow = el.parentElement.parentElement;
        const indexRow = tableRow.rowIndex;
        tableRow.remove();
        itemsOrder.splice(indexRow, 1);
        setBillDetails();
      }
    });
  });
  divElement.appendChild(btn_delete);
}

function clearItemsOrder(e) {
  itemsOrder = [];
  updateOrderSumma();
  quantity.innerHTML = 1;
  checkBoxesUncheck();
  pizzaCostDefine(pizzaSelect.value, pizzaFG);
  totalPriceDisplay();
}

function updateOrderSumma() {
  let sumTotal = 0;
  let sumDiscount = 0;
  let sumTax = 0;
  let sumPayment = 0;
  itemsOrder.forEach(function (el) {
    sumTotal += Number(el.cost);
    sumDiscount += Number(el.costDiscount);
  });
  billTotal.innerHTML = `$${sumTotal.toFixed(2)}`;
  discountBillTotal.innerHTML =
    sumDiscount === 0 ? "$0.00" : "-$" + `${sumDiscount.toFixed(2)}`;
  sumTax = Number(sumTotal - sumDiscount) * 0.2;
  taxBillTotal.innerHTML = "$" + sumTax.toFixed(2);
  sumPayment = sumTotal - sumDiscount + sumTax;
  paymentBillTotal.innerHTML = "$" + sumPayment.toFixed(2);
}

// ===================== bill details =================================
function setBillDetails() {
  let sumTotal = 0;
  let discountTotal = 0;
  let taxTotal = 0;
  let payTotal = 0;

  itemsOrder.forEach((element) => {
    sumTotal += element.totalPrice;
    discountTotal += element.discount;
  });

  let sum = sumTotal - discountTotal;
  taxTotal = Number((sum * 0.3).toFixed(2));

  payTotal = Number(sum) + Number(taxTotal);

  billTotal.innerHTML = sumTotal.toFixed(2);
  discountBillTotal.innerHTML = discountTotal.toFixed(2);
  taxBillTotal.innerHTML = taxTotal.toFixed(2);
  paymentBillTotal.innerHTML = payTotal.toFixed(2);
}

// ==================================== END

//  empty array of objects of cake names and prices
const cakes = [];

const customize = document.querySelector(".item-choosen__customize-type");

const orderPriceTotal = document.querySelector(".order-choice__price-total");
const discountPrice = document.querySelector(".order-choice__price-discount");

// cake names and costs
const cakeName = document.querySelectorAll(".menu-option__pizzaName");

//  array of cake name and price objects
cakeName.forEach(function (el) {
  cakes.push({
    cakeName: el.innerHTML,
    cakeCost: el.nextElementSibling.nextElementSibling.innerHTML,
  });
});

customize.addEventListener("click", function () {
  if (pizzaSelect.value) {
    customizePizza.classList.toggle("hidden");
  }
});

for (let i = 0; i < pizzaFG.length; i++) {
  let option = document.createElement("option");
  option.innerHTML = pizzaFG[i].name;
  pizzaSelect.appendChild(option);
}

pizzaCostDefine(pizzaSelect.value, pizzaFG);

// }
function correctTotalPrice(price) {
  orderPriceTotal.innerHTML =
    "$ " +
    (Number(getPrice(orderPriceTotal.innerHTML)) + Number(price)).toFixed(2);
}
