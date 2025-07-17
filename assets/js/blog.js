// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog functionality
    initBlog();
});

function initBlog() {
    // Load more posts functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }

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
    const readMoreLinks = document.querySelectorAll('.read-more-link, .read-more-btn');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // For now, just show an alert. In a real implementation, this would navigate to the full article
            const postTitle = this.closest('.blog-post, .featured-post-content')?.querySelector('.post-title')?.textContent || 'Blog Post';
            alert(`This would open the full article: "${postTitle}"\n\nIn a real implementation, this would navigate to the complete blog post page.`);
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

    // Observe featured post
    const featuredPost = document.querySelector('.featured-post');
    if (featuredPost) {
        observer.observe(featuredPost);
    }
}

// Load more posts functionality
function loadMorePosts() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const blogGrid = document.querySelector('.blog-grid');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
        // Sample additional blog posts
        const additionalPosts = [
            {
                category: 'Regulatory Updates',
                date: 'December 5, 2024',
                title: 'IFSCA\'s New Framework for Digital Banking',
                excerpt: 'Analysis of the International Financial Services Centres Authority\'s latest guidelines for digital banking operations in GIFT City.',
                image: 'assets/images/blog/post-7.jpg',
                badge: 'Digital'
            },
            {
                category: 'Legal Technology',
                date: 'November 30, 2024',
                title: 'AI-Powered Contract Analysis: A Game Changer',
                excerpt: 'How artificial intelligence is revolutionizing contract review and analysis in legal practice.',
                image: 'assets/images/blog/post-8.jpg',
                badge: 'AI'
            },
            {
                category: 'Corporate Law',
                date: 'November 25, 2024',
                title: 'Merger Control in India: Recent Developments',
                excerpt: 'Overview of recent changes in India\'s merger control regime and their implications for corporate transactions.',
                image: 'assets/images/blog/post-9.jpg',
                badge: 'Mergers'
            }
        ];

        // Add new posts to the grid
        additionalPosts.forEach((post, index) => {
            const postElement = createBlogPost(post);
            postElement.style.opacity = '0';
            postElement.style.transform = 'translateY(30px)';
            blogGrid.appendChild(postElement);

            // Animate in the new post
            setTimeout(() => {
                postElement.style.opacity = '1';
                postElement.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Reset button
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
        loadMoreBtn.disabled = false;

        // Hide button if we've loaded enough posts (optional)
        if (blogGrid.children.length >= 9) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

// Create blog post element
function createBlogPost(postData) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    
    article.innerHTML = `
        <div class="post-image">
            <img src="${postData.image}" alt="${postData.title}" onerror="this.style.display='none'">
            <div class="post-category-badge">${postData.badge}</div>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${postData.category}</span>
                <span class="post-date">${postData.date}</span>
            </div>
            <h3 class="post-title">${postData.title}</h3>
            <p class="post-excerpt">${postData.excerpt}</p>
            <a href="#" class="read-more-link">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
    `;

    // Add event listeners to the new post
    const readMoreLink = article.querySelector('.read-more-link');
    readMoreLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert(`This would open the full article: "${postData.title}"\n\nIn a real implementation, this would navigate to the complete blog post page.`);
    });

    return article;
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
                
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                blogPosts.forEach(post => {
                    const postCategory = post.querySelector('.post-category').textContent;
                    const matches = category === 'all' || postCategory === category;
                    post.style.display = matches ? 'block' : 'none';
                });
            });
        });
    }
}

// Export functions for potential use in other scripts
window.BlogFunctions = {
    initBlog,
    loadMorePosts,
    createBlogPost,
    initSearch,
    initCategoryFilter
}; 