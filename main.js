// 🍳 Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');

    const showMenu = () => {
        menu.classList.remove('hidden');

        requestAnimationFrame(() => {
            menu.classList.add('menu-open');
        });

        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    };

    const hideMenu = () => {
        menu.classList.remove('menu-open');

        const handleTransitionEnd = () => {
            menu.classList.add('hidden');
            menu.removeEventListener('transitionend', handleTransitionEnd);
        };

        menu.addEventListener('transitionend', handleTransitionEnd, { once: true });

        setTimeout(() => {
            if (!menu.classList.contains('menu-open')) {
                menu.classList.add('hidden');
            }
        }, 300);

        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    };

    if (menuBtn && menu && openIcon && closeIcon) {
        menuBtn.addEventListener('click', () => {
            if (menu.classList.contains('hidden')) {
                showMenu();
            } else {
                hideMenu();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!menu.classList.contains('hidden')) {
                    hideMenu();
                }
            });
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with enhanced UX
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-500';
            successMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            document.body.appendChild(successMessage);
            
            // Animate in
            setTimeout(() => {
                successMessage.classList.remove('translate-x-full');
            }, 100);
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('translate-x-full');
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 500);
            }, 5000);
        }, 2000);
    });
}

// Add to cart functionality for menu items
document.querySelectorAll('.menu-card button').forEach(button => {
    button.addEventListener('click', function() {
        const menuItem = this.closest('.menu-card');
        const itemName = menuItem.querySelector('.menu-name').textContent;
        const itemPrice = menuItem.querySelector('.menu-price').textContent;
        
        // Show add to cart notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-500 flex items-center space-x-2';
        notification.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Added ${itemName} to cart!</span>
        `;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
        
        // Add button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.menu-card, .testimonial-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});