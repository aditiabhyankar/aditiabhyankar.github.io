// Individual Blog Post JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initBlogPost();
});

function initBlogPost() {
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
            title: "Digital Transformation in Legal Compliance: Tools and Strategies",
            date: "January 10, 2025",
            image: "../blog/images/post-1.jpg",
            url: "../blog/posts/post-1.html"
        },
        {
            title: "SEBI's New Guidelines: Impact on Fund Management",
            date: "December 28, 2024",
            image: "../blog/images/post-3.jpg",
            url: "../blog/posts/post-3.html"
        },
        {
            title: "IP Protection Strategies for Fintech Startups",
            date: "December 20, 2024",
            image: "../blog/images/post-4.jpg",
            url: "../blog/posts/post-4.html"
        }
    ];
}

// Create related post element
function createRelatedPostElement(post) {
    const article = document.createElement('article');
    article.className = 'related-post';
    
    article.innerHTML = `
        <div class="related-post-image">
            <img src="${post.image}" alt="${post.title}" onerror="this.style.display='none'">
        </div>
        <div class="related-post-content">
            <h4 class="related-post-title">${post.title}</h4>
            <p class="related-post-date">${post.date}</p>
        </div>
    `;
    
    // Add click handler
    article.addEventListener('click', function() {
        window.location.href = post.url;
    });
    
    article.style.cursor = 'pointer';
    
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
    const postBody = document.querySelector('.post-body');
    if (!postBody) return;
    
    const headings = postBody.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Only show TOC if there are enough headings
    
    const toc = createTableOfContents(headings);
    if (toc) {
        postBody.insertBefore(toc, postBody.firstChild);
    }
}

// Create table of contents
function createTableOfContents(headings) {
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = `
        <h3>Table of Contents</h3>
        <ul class="toc-list"></ul>
    `;
    
    const tocList = toc.querySelector('.toc-list');
    
    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-subitem' : 'toc-item';
        
        li.appendChild(a);
        tocList.appendChild(li);
        
        // Add click handler for smooth scrolling
        a.addEventListener('click', function(e) {
            e.preventDefault();
            heading.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    return toc;
}

// Add reading time estimation
function estimateReadingTime() {
    const postBody = document.querySelector('.post-body');
    if (!postBody) return;
    
    const text = postBody.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    const readTimeElement = document.querySelector('.post-read-time span');
    if (readTimeElement) {
        readTimeElement.textContent = `${readingTime} min read`;
    }
}

// Add progress bar for reading
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBarElement = progressBar.querySelector('.reading-progress-bar');
        progressBarElement.style.width = scrollPercent + '%';
    });
}

// Initialize reading progress
if (typeof window !== 'undefined') {
    window.addEventListener('load', function() {
        estimateReadingTime();
        initReadingProgress();
    });
}

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