document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Sample data
  const items = [
    {
      id: 1,
      name: "Item 1",
      price: 1000.0,
      imageUrl:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluZSUyMGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      quantity: 1,
    },
    {
      id: 2,
      name: "Item 2",
      price: 1500.0,
      imageUrl:
        "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmluZSUyMGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      quantity: 1,
    },
    {
      id: 3,
      name: "Item 3",
      price: 2000.0,
      imageUrl:
        "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZpbmUlMjBqZXdlbHJ5fGVufDB8fDB8fHww",
      quantity: 1,
    },
  ];

  // Function to calculate total price
  function calculateTotal() {
    let total = 0;
    items.forEach((item) => (total += item.price * item.quantity));
    totalPriceElement.textContent = total.toFixed(2);
  }

  // Function to render cart items
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    items.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");
      cartItemDiv.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="heart-button" onclick="toggleLike(${
                      item.id
                    })">&#9829;</button>
                    <div class="quantity-buttons">
                        <button onclick="changeQuantity(${
                          item.id
                        }, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${
                          item.id
                        }, 1)">+</button>
                    </div>
                    <button class="delete-button" onclick="removeItem(${
                      item.id
                    })">Delete</button>
                </div>
            `;
      cartItemsContainer.appendChild(cartItemDiv);
    });
    calculateTotal();
  }

  // Function to change item quantity
  window.changeQuantity = function (itemId, change) {
    const item = items.find((item) => item.id === itemId);
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1; // Prevent going below 1
    renderCart();
  };

  // Function to remove item from cart
  window.removeItem = function (itemId) {
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      items.splice(index, 1);
    }
    renderCart();
  };

  window.toggleLike = function (itemId) {
    const item = items.find((item) => item.id === itemId);
    const heartButton = document.querySelector(
      `#cart-items .cart-item:nth-child(${
        items.indexOf(item) + 1
      }) .heart-button`
    );
    heartButton.classList.toggle("liked");
  };


  renderCart();
});
