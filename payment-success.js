document.addEventListener('DOMContentLoaded', function() {
    // Check if payment was completed
    const hasCompletedPayment = localStorage.getItem('paymentCompleted');
    
    if (!hasCompletedPayment) {
        // Redirect to home if user navigates directly to success page
        window.location.href = 'index.html';
        return;
    }
    
    // Generate order details
    const orderId = document.getElementById('order-id');
    const orderDate = document.getElementById('order-date');
    const orderAmount = document.getElementById('order-amount');
    const deliveryAddress = document.getElementById('delivery-address');
    const estimatedDelivery = document.getElementById('estimated-delivery');
    
    if (orderId) {
        orderId.textContent = 'CC' + Math.floor(100000 + Math.random() * 900000);
    }
    
    if (orderDate) {
        const today = new Date();
        orderDate.textContent = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    if (orderAmount) {
        // Get last order total from session storage (if available)
        const lastTotal = localStorage.getItem('lastOrderTotal') || '24.99';
        orderAmount.textContent = '₹' + lastTotal;
    }
    
    if (deliveryAddress) {
        // In a real app, this would come from the form or user profile
        deliveryAddress.textContent = '123 Campus Street, College Town';
    }
    
    if (estimatedDelivery) {
        estimatedDelivery.textContent = '5-10 minutes';
    }
    
    // Clear payment completed flag when leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('paymentCompleted');
    });
});