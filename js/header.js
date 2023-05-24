"use strict";

const couponModal = document.querySelector("#coupon-modal");
let couponNumber = "";

// Coupon number is created to be applied to discount
couponModal.addEventListener("click", createCouponNumber);
function createCouponNumber(e) {
  if (!couponNumber) {
    let digitQuantity = 8;
    for (let i = 0; i < digitQuantity; i++) {
      couponNumber += Math.round(Math.random() * 10);
    }

    Swal.fire({
      icon: "warning",
      title: "Discount 30% over the order",
      text: "Coupon number: " + couponNumber,
    });
  } else {
    Swal.fire({
      icon: "info",
      title: "Applicable coupon number: " + couponNumber,
    });
  }
}
