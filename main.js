// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Display cart count from localStorage
    updateCartCount();
});

// Toast notification functionality
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) return;
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    
    // Icon based on type
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('width', '16');
    iconSvg.setAttribute('height', '16');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('stroke', 'currentColor');
    iconSvg.setAttribute('stroke-width', '2');
    iconSvg.setAttribute('stroke-linecap', 'round');
    iconSvg.setAttribute('stroke-linejoin', 'round');
    iconSvg.classList.add('toast-icon');
    
    let iconPath;
    if (type === 'error') {
        iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        iconPath.setAttribute('d', 'M18 6L6 18M6 6l12 12');
    } else {
        iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        iconPath.setAttribute('points', '20 6 9 17 4 12');
    }
    
    iconSvg.appendChild(iconPath);
    toast.appendChild(iconSvg);
    
    // Message text
    const messageText = document.createTextNode(message);
    toast.appendChild(messageText);
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    
    if (!cartCountElement) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total quantity
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update element
    cartCountElement.textContent = totalItems;
    
    // Hide badge if empty
    if (totalItems === 0) {
        cartCountElement.style.display = 'none';
    } else {
        cartCountElement.style.display = 'flex';
    }
}
