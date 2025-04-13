document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Services tab functionality
    const serviceButtons = document.querySelectorAll('.services-nav .nav-item');
    const serviceCards = document.querySelectorAll('.services-grid .service-card');

    // Show first category by default (assessment)
    showServiceCategory('assessment');

    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Get the category from data attribute
            const category = this.getAttribute('data-service');
            // Show the corresponding service cards
            showServiceCategory(category);
        });
    });

    function showServiceCategory(category) {
        // Hide all cards first
        serviceCards.forEach(card => {
            card.style.display = 'none';
        });

        // Show cards with matching category
        document.querySelectorAll(`.service-card[data-category="${category}"]`).forEach(card => {
            card.style.display = 'block';
        });
    }

    // Success Stories Carousel Functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const successStories = document.querySelectorAll('.success-story');
    let currentIndex = 0;
    let autoScrollInterval;
    
    // Initialize carousel
    if (carouselTrack && successStories.length > 0) {
        // Set up auto-scroll
        startAutoScroll();
        
        // Add click event listeners to dots
        carouselDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                goToSlide(index);
                resetAutoScroll();
            });
        });
        
        // Pause auto-scroll when hovering over carousel
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        // Resume auto-scroll when mouse leaves carousel
        carouselTrack.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }
    
    function goToSlide(index) {
        // Update current index
        currentIndex = index;
        
        // Update carousel position
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % successStories.length;
        goToSlide(currentIndex);
    }
    
    function startAutoScroll() {
        // Auto-scroll every 3 seconds
        autoScrollInterval = setInterval(nextSlide, 3000);
    }
    
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Consultation Form Modal Functionality
    const modal = document.getElementById('consultationModal');
    const consultationButtons = document.querySelectorAll('.btn-primary');
    const closeModal = document.querySelector('.close-modal');
    const consultationForm = document.getElementById('consultationForm');
    
    // Open modal when clicking on consultation buttons
    consultationButtons.forEach(button => {
        if (button.textContent.includes('Book a Free Consultation')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });
    
    // Close modal when clicking on close button
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    // Handle form submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            
            // Show success message
            consultationForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your consultation request has been received. Our team will contact you within 24 hours.</p>
                </div>
            `;
            
            // Close modal after 3 seconds
            setTimeout(() => {
                closeModalFunction();
                // Reset form after modal is closed
                setTimeout(() => {
                    consultationForm.reset();
                    consultationForm.innerHTML = consultationForm.innerHTML;
                }, 300);
            }, 3000);
        });
    }
    
    function openModal() {
        modal.style.display = 'block';
        // Trigger reflow
        modal.offsetWidth;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeModalFunction() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .benefit-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.service-card, .feature-card, .benefit-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
