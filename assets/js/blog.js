// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog functionality
    initBlog();
});

function initBlog() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add hover effects for blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for read more links
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the href handle navigation since we have proper links now
            // No need to prevent default or show alerts
        });
    });

    // Add intersection observer for animations
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

    // Observe blog posts for animation
    blogPosts.forEach(post => {
        observer.observe(post);
    });
}

// Render blog content from JSON data
function renderBlogContent(data) {
    // This function can be used to dynamically render blog content
    // For now, we're using static HTML since we only have 2 posts
    console.log('Blog data loaded:', data);
}

// Search functionality (for future implementation)
function initSearch() {
    const searchInput = document.querySelector('.blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const blogPosts = document.querySelectorAll('.blog-post');
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                const category = post.querySelector('.post-category').textContent.toLowerCase();
                
                const matches = title.includes(searchTerm) || 
                               excerpt.includes(searchTerm) || 
                               category.includes(searchTerm);
                
                post.style.display = matches ? 'block' : 'none';
            });
        });
    }
}

// Category filter functionality (for future implementation)
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-filter');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                const blogPosts = document.querySelectorAll('.blog-post');
                
                blogPosts.forEach(post => {
                    const postCategory = post.querySelector('.post-category').textContent;
                    if (category === 'all' || postCategory === category) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Export functions for potential use in other scripts
window.BlogFunctions = {
    initBlog,
    renderBlogContent,
    initSearch,
    initCategoryFilter
}; 