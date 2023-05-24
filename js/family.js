"use strict";

const htmlBlock = document.documentElement;

const headerLogoDark = document.querySelector(".header__logo-dark");
const headerLogoLight = document.querySelector(".header__logo-light");

const iconSun = document.querySelector(".family__image-sun");
const iconMoon = document.querySelector(".family__image-moon");

const burgerDark = document.querySelector(".burger__dark");
const burgerLight = document.querySelector(".burger__light");

const pizzaSliceDark = document.querySelector(".pizza-icons__logo-iconDark");
const pizzaSliceLight = document.querySelector(".pizza-icons__logo-iconLight");

const accountIconDark = document.querySelector(".account__img-usersDark");
const accountIconLight = document.querySelector(".account__img-usersLight");

const deliveryIconDark = document.querySelector(".delivery__img-deliveryDark");
const deliveryIconLight = document.querySelector(
  ".delivery__img-deliveryLight"
);

const paymentIconDark = document.querySelector(".payment__img-paymentDark");
const paymentIconLight = document.querySelector(".payment__img-paymentLight");

const minusDarkSign = document.querySelector(".quantity-selector__minusDark");
const minusLightSign = document.querySelector(".quantity-selector__minusLight");

const plusDarkSign = document.querySelector(".quantity-selector__plusDark");
const plusLightSign = document.querySelector(".quantity-selector__plusLight");

if (htmlBlock.classList.length === 0) {
  htmlBlock.classList.add("dark");
  if (iconSun.classList.contains("hidden")) {
    iconSun.classList.remove("hidden");
  }
  if (burgerDark.classList.contains("hidden")) {
    burgerDark.classList.remove("hidden");
  }

  if (headerLogoDark.classList.contains("hidden")) {
    headerLogoDark.classList.remove("hidden");
  }

  if (pizzaSliceDark.classList.contains("hidden")) {
    pizzaSliceDark.classList.remove("hidden");
  }

  if (accountIconDark.classList.contains("hidden")) {
    accountIconDark.classList.remove("hidden");
  }

  if (deliveryIconDark.classList.contains("hidden")) {
    deliveryIconDark.classList.remove("hidden");
  }

  if (paymentIconDark.classList.contains("hidden")) {
    paymentIconDark.classList.remove("hidden");
  }

  if (minusDarkSign.classList.contains("hidden")) {
    minusDarkSign.classList.remove("hidden");
  }

  if (plusDarkSign.classList.contains("hidden")) {
    plusDarkSign.classList.remove("hidden");
  }
}

iconSun.addEventListener("click", backgroundChange);
iconMoon.addEventListener("click", backgroundChange);

function backgroundChange(e) {
  if (htmlBlock.classList.contains("dark")) {
    htmlBlock.classList.remove("dark");
    htmlBlock.classList.add("light");

    headerLogoDark.classList.add("hidden");
    headerLogoLight.classList.remove("hidden");

    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");

    burgerDark.classList.add("hidden");
    burgerLight.classList.remove("hidden");

    pizzaSliceDark.classList.add("hidden");
    pizzaSliceLight.classList.remove("hidden");

    accountIconDark.classList.add("hidden");
    accountIconLight.classList.remove("hidden");

    deliveryIconDark.classList.add("hidden");
    deliveryIconLight.classList.remove("hidden");

    paymentIconDark.classList.add("hidden");
    paymentIconLight.classList.remove("hidden");

    minusDarkSign.classList.add("hidden");
    minusLightSign.classList.remove("hidden");

    plusDarkSign.classList.add("hidden");
    plusLightSign.classList.remove("hidden");

    return;
  }

  if (htmlBlock.classList.contains("light")) {
    htmlBlock.classList.remove("light");
    htmlBlock.classList.add("dark");

    headerLogoDark.classList.remove("hidden");
    headerLogoLight.classList.add("hidden");

    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");

    burgerDark.classList.remove("hidden");
    burgerLight.classList.add("hidden");

    pizzaSliceDark.classList.remove("hidden");
    pizzaSliceLight.classList.add("hidden");

    accountIconDark.classList.remove("hidden");
    accountIconLight.classList.add("hidden");

    deliveryIconDark.classList.remove("hidden");
    deliveryIconLight.classList.add("hidden");

    paymentIconDark.classList.remove("hidden");
    paymentIconLight.classList.add("hidden");

    minusDarkSign.classList.remove("hidden");
    minusLightSign.classList.add("hidden");

    plusDarkSign.classList.remove("hidden");
    plusLightSign.classList.add("hidden");

    return;
  }
}
