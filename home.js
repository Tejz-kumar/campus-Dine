// Home page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load featured items on the homepage
    loadFeaturedItems();
});

// Function to load featured items
function loadFeaturedItems() {
    const featuredContainer = document.getElementById('featured-items');
    
    if (!featuredContainer) return;
    
    // Filter menu items to get featured ones
    const featuredItems = menuItems.filter(item => item.featured);
    
    // Limit to 4 items
    const itemsToShow = featuredItems.slice(0, 4);
    
    // Create HTML for each featured item
    itemsToShow.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-card';
        
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-footer">
                    <span class="item-price">₹${item.price.toFixed(2)}</span>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        featuredContainer.appendChild(itemElement);
    });
    
    // Add event listeners for Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const itemToAdd = menuItems.find(item => item.id === id);
            
            if (itemToAdd) {
                addToCart(itemToAdd);
                showToast(`${itemToAdd.name} added to cart!`);
            }
        });
    });
}