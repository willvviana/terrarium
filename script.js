// Global variables
let cart = [];
let currentSection = 'home';

// Product data
const products = [
    {
        id: 1,
        title: 'Forest Ecosystem Terrarium',
        description: 'Complete woodland scene with moss, ferns, and miniature landscape elements. Perfect for bringing nature indoors with this self-sustaining ecosystem that requires minimal care.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center'
    },
    {
        id: 2,
        title: 'Desert Oasis Terrarium',
        description: 'Stunning succulent arrangement in a glass sphere with carefully layered colored sand. Features drought-resistant plants that create a beautiful desert landscape.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&crop=center'
    },
    {
        id: 3,
        title: 'Tropical Paradise Terrarium',
        description: 'Lush tropical plants in a hanging glass orb with integrated mist system. Creates a humid microclimate perfect for exotic plants and creating a tropical atmosphere.',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop&crop=center'
    },
    {
        id: 4,
        title: 'Zen Garden Terrarium',
        description: 'Minimalist design with air plants and white sand patterns. Includes tiny rake for creating meditation patterns in the sand, perfect for desk or office spaces.',
        price: 75.99,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    showSection('home');
    updateCartDisplay();
    loadCartFromStorage();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            showSection(section);
            updateActiveNavLink(this);
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('productModal');
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCart();
        }
    });
}

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Update URL hash
        window.history.pushState(null, null, `#${sectionName}`);
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Scroll to top of section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

// Product modal functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalProductImage');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalDescription = document.getElementById('modalProductDescription');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');

    // Populate modal with product data
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    
    // Update add to cart button
    modalAddToCart.onclick = () => addToCart(productId);

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToStorage();
    showCartNotification();
    closeProductModal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = createCartItemElement(item);
                cartItems.appendChild(cartItem);
            });
        }
    }

    // Update cart total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
        </div>
        <button onclick="removeFromCart(${item.id})" style="color: #ef4444; font-size: 20px;">&times;</button>
    `;
    return cartItem;
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function showCartNotification() {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.className = 'success-message show';
    notification.textContent = 'Product added to cart!';
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '3000';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Local storage functions
function saveCartToStorage() {
    localStorage.setItem('terranova_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('terranova_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        } catch (e) {
            console.error('Error loading cart from storage:', e);
            cart = [];
        }
    }
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message show';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        form.insertBefore(successMessage, form.firstChild);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 1000);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
        
        // Update active nav link
        const targetLink = document.querySelector(`[data-section="${hash}"]`);
        if (targetLink) {
            updateActiveNavLink(targetLink);
        }
    } else {
        showSection('home');
    }
});

// Initialize section based on URL hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
        
        // Update active nav link
        const targetLink = document.querySelector(`[data-section="${hash}"]`);
        if (targetLink) {
            updateActiveNavLink(targetLink);
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (basic implementation)
function searchProducts(query) {
    return products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
}

// Price formatting
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Image lazy loading fallback
function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6b7280;
        font-size: 14px;
    `;
    placeholder.textContent = 'Image not available';
    img.parentNode.insertBefore(placeholder, img);
}

// Add error handling to all product images
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-image img, .modal-image img');
    productImages.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});

// Performance optimization: Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://pixabay.com/get/gcbfca1b6b20ad7069e3b5cd3a8cd58cec630e545301c51d02fada9a132d0f7de275bf11b1696a7c2904a1bbe9c01d30b70e73442da5f92972bbba5a2ec7eb34d_1280.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        addToCart,
        removeFromCart,
        openProductModal,
        closeProductModal,
        products
    };
}
