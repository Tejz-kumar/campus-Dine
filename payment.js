
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has items in cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // Redirect to cart page if cart is empty
        window.location.href = 'cart.html';
        return;
    }
    
    // Display order items
    displayOrderItems();
    
    // Format card number input with spaces
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            e.target.value = value;
        });
    }
    
    // Format expiry date with slash
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Handle form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Save the total amount for the success page
            const totalAmountElement = document.getElementById('order-total');
            if (totalAmountElement) {
                localStorage.setItem('lastOrderTotal', totalAmountElement.textContent.substring(1));
            }
            
            // Set payment completed flag
            localStorage.setItem('paymentCompleted', 'true');
            
            // Clear cart after successful payment
            localStorage.removeItem('cart');
            
            // Submit the form (redirects to success page)
            this.submit();
        });
    }
});

// Function to display order items in the order summary
function displayOrderItems() {
    const orderItems = document.getElementById('order-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderTax = document.getElementById('order-tax');
    const orderTotal = document.getElementById('order-total');
    
    if (!orderItems) return;
    
    // Clear existing items
    orderItems.innerHTML = '';
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Skip if cart is empty
    if (cart.length === 0) return;
    
    // Add each item to the summary
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <div class="order-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
                <h4>${item.name}</h4>
                <div class="price">₹${item.price.toFixed(2)} each</div>
                <div class="quantity">Quantity: ${item.quantity}</div>
            </div>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    // Calculate and display totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const deliveryFee = 2.00;
    const total = subtotal + tax + deliveryFee;
    
    if (orderSubtotal) orderSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (orderTax) orderTax.textContent = `₹${tax.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `₹${total.toFixed(2)}`;
}
