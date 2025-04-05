// Menu page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load all menu items
    loadMenuItems();
    
    // Create category filters
    createCategoryFilters();
    
    // Add event listener for search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterMenuItems);
    }
    
    // Add event listener for clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
});

// Function to load all menu items
function loadMenuItems(filteredItems = null) {
    const menuContainer = document.getElementById('menu-items');
    const noResultsElement = document.getElementById('no-results');
    
    if (!menuContainer) return;
    
    // Clear previous items
    menuContainer.innerHTML = '';
    
    // Use filtered items or all items
    const itemsToShow = filteredItems || menuItems;
    
    // Show "no results" message if no items to display
    if (itemsToShow.length === 0) {
        if (noResultsElement) {
            noResultsElement.style.display = 'block';
        }
        return;
    } else {
        if (noResultsElement) {
            noResultsElement.style.display = 'none';
        }
    }
    
    // Create HTML for each menu item
    itemsToShow.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-details">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="category-badge">${item.category}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">₹${item.price.toFixed(2)}</span>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        menuContainer.appendChild(itemElement);
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

// Function to create category filters
function createCategoryFilters() {
    const categoriesContainer = document.getElementById('category-filters');
    
    if (!categoriesContainer) return;
    
    // Extract unique categories
    const categories = [...new Set(menuItems.map(item => item.category))];
    
    // Create "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn active';
    allBtn.textContent = 'All';
    allBtn.setAttribute('data-category', 'all');
    categoriesContainer.appendChild(allBtn);
    
    // Create button for each category
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'category-btn';
        categoryBtn.textContent = category;
        categoryBtn.setAttribute('data-category', category);
        categoriesContainer.appendChild(categoryBtn);
    });
    
    // Add event listeners for category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter items by category
            filterMenuItems();
        });
    });
}

// Function to filter menu items based on search and category
function filterMenuItems() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    // Get active category
    const activeCategory = document.querySelector('.category-btn.active');
    const category = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
    
    // Filter items based on search term and category
    let filteredItems = menuItems;
    
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Reload menu with filtered items
    loadMenuItems(filteredItems);
}

// Function to clear all filters
function clearFilters() {
    // Clear search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset category to "All"
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Reload all menu items
    loadMenuItems();
}