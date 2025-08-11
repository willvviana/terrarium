# TerraNova - Premium Terrariums

## Overview

TerraNova is a modern, single-page web application for a premium terrarium retailer. The application serves as an online storefront showcasing beautiful glass gardens and miniature ecosystems including forest terrariums, desert oasis arrangements, tropical paradise orbs, and zen garden designs. Built with vanilla HTML, CSS, and JavaScript, it features a nature-inspired green, brown, and yellow color scheme with responsive design and full shopping cart functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Uses vanilla JavaScript to dynamically show/hide content sections without page reloads
- **Section-based Navigation**: Content is organized into sections (home, products, about, contact) managed through JavaScript routing
- **Component-based Structure**: Modular approach with separate concerns for navigation, product display, and cart management
- **Responsive Design**: Mobile-first approach with CSS flexbox/grid and media queries for cross-device compatibility

### Data Management
- **In-memory Product Catalog**: Terrarium product data is stored as JavaScript objects with properties for id, title, description, price, and image URLs from Unsplash
- **Local Storage Integration**: Shopping cart data persists across browser sessions using localStorage API with 'terranova_cart' key
- **State Management**: Global JavaScript variables manage application state including current section and cart contents

### User Interface Design
- **Nature-Inspired Color Scheme**: Green, brown, and yellow palette using CSS custom properties for consistent theming
  - Primary Green (#4a7c59), Secondary Green (#6b8e5a), Light Green (#a2c579)
  - Accent Brown (#8b5a3c), Dark Brown (#654321)
  - Accent Yellow (#f4d03f), Light Yellow (#fff8dc)
  - Background Cream (#faf8f3) for warm, natural feel
- **Modern CSS Techniques**: Implements flexbox, grid, and modern selectors for responsive layouts
- **Interactive Elements**: Hover effects, transitions, and dynamic class toggling for enhanced user experience
- **Accessibility Considerations**: Semantic HTML structure and proper navigation patterns

### Shopping Cart System
- **Client-side Cart Logic**: Add/remove items, quantity management, and price calculations handled in JavaScript
- **Real-time Updates**: Cart count and totals update immediately when items are added or removed
- **Persistent Storage**: Cart contents saved to localStorage for session persistence

## External Dependencies

### Image Assets
- **Unsplash CDN**: High-quality terrarium and plant images served from Unsplash's content delivery network
- **External Image Hosting**: Relies on third-party image URLs optimized for terrarium and botanical photography

### Web Standards
- **Modern Browser APIs**: Uses localStorage, DOM manipulation APIs, and ES6+ JavaScript features
- **CSS3 Features**: Depends on modern CSS properties including flexbox, grid, and CSS custom properties
- **Responsive Images**: Leverages browser-native responsive image loading

### Development Dependencies
- **No Build System**: Pure vanilla implementation without webpack, bundlers, or preprocessing
- **No External Libraries**: Self-contained with no jQuery, React, or other framework dependencies
- **Static Hosting Ready**: Designed for deployment on static hosting platforms