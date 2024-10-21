import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

renderOrderPage();

async function renderOrderPage() {
    try {
        await loadProductsFetch();
    } catch (error) {
        console.log("Unexpected error. Please try again later.");
    }
    generateOrdersHTML();
}

function generateOrdersHTML() {
    let ordersHTML = ``;

    orders.forEach((order) => {
        const deliveryDate = dayjs(order.orderTime).format("MMMM D");

        ordersHTML += `
                <div class="order-container">
                    <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">
                                    Order Placed:
                                </div>
                                <div>${deliveryDate}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>$${formatCurrency(
                                    order.totalCostCents
                                )}</div>
                            </div>
                        </div>

                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${order.id}</div>
                        </div>
                    </div>

                    <div class="order-details-grid">
                        ${generateProductsHTML(order)}
                    </div>
                </div>
        `;
    });
    if (ordersHTML) {
        document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
    } else {
        document.querySelector(".js-orders-grid").innerHTML = "No orders";
    }
}

function generateProductsHTML(order) {
    let productHTML = ``;
    order.products.forEach((product) => {
        const matchingProduct = getProduct(product.productId);

        productHTML += `
                        <div class="product-image-container">
                            <img
                                src="${matchingProduct.image}"
                            />
                        </div>

                        <div class="product-details">
                            <div class="product-name">
                            ${matchingProduct.name}
                            </div>
                            <div class="product-delivery-date">
                                Arriving on: ${order.estimatedDeliveryTime}
                            </div>
                            <div class="product-quantity">Quantity: ${product.quantity}</div>
                            <button class="buy-again-button button-primary">
                                <img
                                    class="buy-again-icon"
                                    src="images/icons/buy-again.png"
                                />
                                <span class="buy-again-message"
                                    >Buy it again</span
                                >
                            </button>
                        </div>

                        <div class="product-actions">
                            <a href="tracking.html?orderId=${order.id}">
                                <button
                                    class="track-package-button button-secondary"
                                >
                                    Track package
                                </button>
                            </a>
                        </div>
        `;
    });
    return productHTML;
}
