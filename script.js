/* ============================================
   MODERN PORTFOLIO WEBSITE - JAVASCRIPT
   ============================================ */

// ============================================
// TYPING EFFECT ANIMATION
// ============================================

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const fullText = typingElement.textContent;
    
    // Clear the element
    typingElement.textContent = '';
    
    let index = 0;
    const speed = 50; // Speed in milliseconds
    
    function type() {
        if (index < fullText.length) {
            typingElement.textContent += fullText.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL ANIMATION - FADE IN ELEMENTS
// ============================================

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill progress bars
                if (entry.target.classList.contains('progress')) {
                    triggerProgressAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
                
                // Animate project cards
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all progress bars and project cards
    document.querySelectorAll('.progress').forEach(el => observer.observe(el));
    document.querySelectorAll('.project-card').forEach(el => observer.observe(el));
}

// Function to animate progress bars when they come into view
function triggerProgressAnimation(progressBar) {
    const width = progressBar.style.width;
    progressBar.style.width = '0%';
    
    // Trigger animation
    setTimeout(() => {
        progressBar.style.transition = 'width 1.5s ease-out';
        progressBar.style.width = width;
    }, 50);
}

// ============================================
// CONTACT FORM HANDLING - ENHANCED
// ============================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Form validation functions
function validateName(name) {
    if (!name.trim()) {
        return { valid: false, message: 'Name is required' };
    }
    if (name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }
    if (name.trim().length > 50) {
        return { valid: false, message: 'Name must be less than 50 characters' };
    }
    return { valid: true, message: '' };
}

function validateEmail(email) {
    if (!email.trim()) {
        return { valid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
}

function validateMessage(message) {
    if (!message.trim()) {
        return { valid: false, message: 'Message is required' };
    }
    if (message.trim().length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters' };
    }
    if (message.trim().length > 1000) {
        return { valid: false, message: 'Message must be less than 1000 characters' };
    }
    return { valid: true, message: '' };
}

// Add visual feedback to inputs
function setupInputValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCountDisplay = document.getElementById('charCount');

    // Real-time validation feedback
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const validation = validateName(this.value);
            updateInputStyle(this, validation.valid);
        });
        nameInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const validation = validateEmail(this.value);
            updateInputStyle(this, validation.valid);
        });
        emailInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            const validation = validateMessage(this.value);
            updateInputStyle(this, validation.valid);
        });
        messageInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
        
        // Character counter
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            if (charCountDisplay) {
                charCountDisplay.textContent = length;
                // Change color if approaching limit
                if (length > 900) {
                    charCountDisplay.style.color = 'var(--primary-color)';
                } else {
                    charCountDisplay.style.color = 'var(--text-light)';
                }
            }
        });
    }
}

// Update input visual feedback
function updateInputStyle(input, isValid) {
    if (input.value.trim() === '') {
        input.style.borderColor = 'var(--border-color)';
        input.style.backgroundColor = '#f8fafc';
        return;
    }
    
    if (isValid) {
        input.style.borderColor = '#10b981';
        input.style.backgroundColor = '#f0fdf4';
    } else {
        input.style.borderColor = '#ef4444';
        input.style.backgroundColor = '#fef2f2';
    }
}

// Show error message
function showFormError(message) {
    // Remove any existing error messages
    const existingError = contactForm.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        color: #dc2626;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = '⚠️ ' + message;
    contactForm.insertBefore(errorDiv, contactForm.firstChild);

    // Auto-remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Show loading state
function setFormLoading(loading) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        submitBtn.style.opacity = '1';
    }
}

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate all fields
        const nameValidation = validateName(name);
        const emailValidation = validateEmail(email);
        const messageValidation = validateMessage(message);

        // If any field is invalid, show error and stop
        if (!nameValidation.valid) {
            showFormError(nameValidation.message);
            document.getElementById('name').focus();
            return;
        }
        if (!emailValidation.valid) {
            showFormError(emailValidation.message);
            document.getElementById('email').focus();
            return;
        }
        if (!messageValidation.valid) {
            showFormError(messageValidation.message);
            document.getElementById('message').focus();
            return;
        }

        // All validations passed - show loading state
        setFormLoading(true);

        // Get form data
        const formData = new FormData(contactForm);

        // Send form data using fetch API
        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            setFormLoading(false);
            
            // Check if the response indicates success
            if (data.includes('success')) {
                // Hide error messages if any
                const errorDiv = contactForm.querySelector('.form-error');
                if (errorDiv) errorDiv.remove();

                // Show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.style.animation = 'slideIn 0.5s ease-out';

                // Scroll to the success message
                setTimeout(() => {
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }, 100);

                // Reset form
                contactForm.reset();
                
                // Clear input styles
                document.getElementById('name').style.borderColor = 'var(--border-color)';
                document.getElementById('email').style.borderColor = 'var(--border-color)';
                document.getElementById('message').style.borderColor = 'var(--border-color)';
                document.getElementById('name').style.backgroundColor = '#f8fafc';
                document.getElementById('email').style.backgroundColor = '#f8fafc';
                document.getElementById('message').style.backgroundColor = '#f8fafc';

                // Hide success message after 6 seconds and show form again
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    contactForm.style.display = 'block';
                    document.getElementById('name').focus();
                }, 6000);
            } else {
                // Handle error response
                const errorMessage = data.includes('error') ? 
                    'Failed to send message. Please try again.' : 
                    'An unexpected error occurred. Please try again.';
                showFormError(errorMessage);
            }
        })
        .catch(error => {
            setFormLoading(false);
            console.error('Error:', error);
            showFormError('Network error. Please check your connection and try again.');
        });
    });

    // Initialize input validation on page load
    setupInputValidation();
}

// ============================================
// NAVBAR STYLING ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// ============================================
// INITIALIZE ALL ANIMATIONS ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    typeText();
    
    // Update active navigation links
    updateActiveNavLink();
    
    // Observe elements for scroll animation
    observeElements();

    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
    });
});

// ============================================
// OPTIONAL: LOADING ANIMATION
// ============================================

// You can add page loading animation here if needed
window.addEventListener('load', function() {
    console.log('Page loaded successfully!');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to add class to elements when they come into view
function fadeInOnScroll() {
    const elements = document.querySelectorAll('[data-fade]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    });

    elements.forEach(el => observer.observe(el));
}

// Check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
