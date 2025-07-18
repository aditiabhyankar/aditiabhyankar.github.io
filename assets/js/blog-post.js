// Individual Blog Post JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initBlogPost();
});

function initBlogPost() {
    // Initialize reading progress
    initReadingProgress();
    
    // Initialize tags
    initTags();
    
    // Initialize social sharing
    initSocialSharing();
    
    // Initialize related posts
    loadRelatedPosts();
    
    // Add smooth scrolling for navigation
    initSmoothScrolling();
    
    // Add table of contents functionality
    initTableOfContents();
    
    // Estimate reading time
    estimateReadingTime();
}

// Initialize reading progress
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Initialize tags
function initTags() {
    const tagList = document.querySelector('.tag-list');
    if (!tagList) return;
    
    // Get tags from the current post (you can pass this via data attributes or fetch from JSON)
    const tags = getCurrentPostTags();
    
    tags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = `../blog.html?tag=${encodeURIComponent(tag)}`;
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagList.appendChild(tagElement);
    });
}

// Get current post tags (placeholder function)
function getCurrentPostTags() {
    // In a real implementation, this would get tags from the current post
    // For now, return sample tags
    return ['Legal Tech', 'Compliance', 'Digital Transformation'];
}

// Initialize social sharing
function initSocialSharing() {
    // Social sharing functions are already defined in the HTML onclick handlers
    // This function can be used for additional social sharing setup
}

// Social sharing functions
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
}

function shareViaEmail() {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(`I thought you might be interested in this article: ${document.title}\n\n${window.location.href}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
}

// Load related posts
function loadRelatedPosts() {
    const relatedPostsGrid = document.querySelector('.related-posts-grid');
    if (!relatedPostsGrid) return;
    
    // In a real implementation, this would fetch related posts from the JSON data
    // For now, show sample related posts
    const relatedPosts = getRelatedPosts();
    
    relatedPosts.forEach(post => {
        const postElement = createRelatedPostElement(post);
        relatedPostsGrid.appendChild(postElement);
    });
}

// Get related posts (placeholder function)
function getRelatedPosts() {
    return [
        {
            title: "Best Practices in Cross-border Contract Negotiation",
            date: "January 5, 2025",
            icon: "fas fa-handshake",
            url: "post-2.html"
        },
        {
            title: "SEBI's New Guidelines: Impact on Fund Management",
            date: "December 28, 2024",
            icon: "fas fa-chart-line",
            url: "post-3.html"
        }
    ];
}

// Create related post element
function createRelatedPostElement(post) {
    const article = document.createElement('div');
    article.className = 'related-post';
    
    article.innerHTML = `
        <div class="related-post-image">
            <i class="${post.icon}"></i>
        </div>
        <div class="related-post-content">
            <a href="${post.url}" class="related-post-title">${post.title}</a>
            <div class="related-post-date">${post.date}</div>
        </div>
    `;
    
    return article;
}

// Initialize smooth scrolling
function initSmoothScrolling() {
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
}

// Initialize table of contents
function initTableOfContents() {
    const toc = document.querySelector('.toc');
    if (!toc) return;
    
    const tocLinks = toc.querySelectorAll('a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add reading time estimation
function estimateReadingTime() {
    const postBody = document.querySelector('.post-body');
    if (!postBody) return;
    
    const text = postBody.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    const readTimeElement = document.querySelector('.post-info .far.fa-clock + span');
    if (readTimeElement) {
        readTimeElement.textContent = `${readingTime} min read`;
    }
}

// Add intersection observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.post-body, .post-tags, .post-share, .toc, .related-posts');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    initAnimations();
});

// Add mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

// Add CSS for table of contents and reading progress
const additionalStyles = `
    .table-of-contents {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 2rem;
    }
    
    .table-of-contents h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #1f2937;
    }
    
    .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .toc-item {
        display: block;
        padding: 0.5rem 0;
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
    }
    
    .toc-subitem {
        display: block;
        padding: 0.25rem 0 0.25rem 1rem;
        color: #6b7280;
        text-decoration: none;
        font-size: 0.9rem;
    }
    
    .toc-item:hover, .toc-subitem:hover {
        color: #1d4ed8;
    }
    
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 1001;
    }
    
    .reading-progress-bar {
        height: 100%;
        background: #2563eb;
        width: 0;
        transition: width 0.3s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export functions for potential use in other scripts
window.BlogPostFunctions = {
    initBlogPost,
    shareOnTwitter,
    shareOnLinkedIn,
    shareViaEmail,
    estimateReadingTime
}; 