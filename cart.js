// Initialize cart from localStorage on page load
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    // If we're on the cart page, render the cart
    if (document.getElementById('cart-container')) {
        renderCart();
    }
});

// Function to load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    // Update cart count in the navbar
    updateCartCount();
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in the navbar
    updateCartCount();
}

// Function to add an item to the cart
function addToCart(item) {
    // Check if item is already in cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        // Increase quantity if item already exists
        existingItem.quantity += 1;
    } else {
        // Add new item with quantity 1
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    saveCart();
}

// Function to update item quantity in cart
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        // Remove item if quantity is zero or negative
        removeFromCart(itemId);
        return;
    }
    
    // Find the item and update its quantity
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart();
        renderCart();
    }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    renderCart();
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Function to calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to render cart on the cart page
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartContainer) return;
    
    // Show empty cart message if cart is empty
    if (cart.length === 0) {
        cartContainer.style.display = 'none';
        if (emptyCart) {
            emptyCart.style.display = 'block';
        }
        return;
    }
    
    // Hide empty cart message and show cart
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }
    cartContainer.style.display = 'block';
    
    // Clear existing cart content
    cartContainer.innerHTML = '';
    
    // Create cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <span class="quantity-count">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Remove
                    </button>
                </div>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    
    // Add cart summary
    const cartSummary = document.createElement('div');
    cartSummary.className = 'cart-summary';
    
    const subtotal = calculateCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (10%)</span>
            <span>₹${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Total</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
        <div class="cart-buttons">
            <button id="clear-cart-btn" class="btn btn-outline">Clear Cart</button>
            <a href="payment.html" class="btn btn-primary">Checkout</a>
        </div>
    `;
    
    cartContainer.appendChild(cartSummary);
    
    // Save total for payment page
    localStorage.setItem('cartTotal', total.toFixed(2));
    
    // Add event listeners for buttons
    addCartButtonEventListeners();
}

// Function to add event listeners for cart buttons
function addCartButtonEventListeners() {
    // Quantity decrease buttons
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            
            if (item) {
                updateQuantity(id, item.quantity - 1);
            }
        });
    });
    
    // Quantity increase buttons
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            
            if (item) {
                updateQuantity(id, item.quantity + 1);
            }
        });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
            showToast('Item removed from cart');
        });
    });
    
    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
                showToast('Cart cleared');
            }
        });
    }
}
