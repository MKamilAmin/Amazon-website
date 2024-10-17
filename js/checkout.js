import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";

loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
