document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Skills Progress Bar Animation (Micro-animation)
    const skillFills = document.querySelectorAll('.skill-bar-fill');
    if (skillFills.length > 0) {
        // Animate immediately if page loaded or when scrolled into view
        const animateSkills = () => {
            skillFills.forEach(fill => {
                const percent = fill.getAttribute('data-percent');
                fill.style.width = `${percent}%`;
            });
        };

        // Use IntersectionObserver to animate skills when in viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            const skillsSection = document.querySelector('.skills-container');
            if (skillsSection) {
                observer.observe(skillsSection);
            } else {
                // Fallback if container is not present but elements are
                setTimeout(animateSkills, 300);
            }
        } else {
            // Fallback for older browsers
            setTimeout(animateSkills, 300);
        }
    }

    // 4. Contact Form Handling (REST API Submission)
    const contactForm = document.getElementById('portfolioContactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const feedbackDiv = contactForm.querySelector('.form-feedback');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous feedback
            feedbackDiv.className = 'form-feedback';
            feedbackDiv.style.display = 'none';
            feedbackDiv.innerText = '';

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side validation
            if (!name || !email || !subject || !message) {
                showFeedback('All fields are required.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Please enter a valid email address.', 'error');
                return;
            }

            // Disable button and show sending state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending Message...';

            try {
                // REST API call
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, subject, message }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    showFeedback(result.message, 'success');
                    contactForm.reset();
                } else {
                    showFeedback(result.message || 'An error occurred. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Submission error:', error);
                showFeedback('Network error. Failed to send message.', 'error');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });

        function showFeedback(text, type) {
            feedbackDiv.innerText = text;
            feedbackDiv.className = `form-feedback ${type}`;
            feedbackDiv.style.display = 'block';
        }
    }
});
