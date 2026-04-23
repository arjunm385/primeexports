// Initialize AOS Animation Library
AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: 'ease-in-out',
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        navbar.style.height = '70px';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navbar.style.height = '80px';
    }
});

// Chatbot Widget Logic
const chatToggle = document.getElementById('chatToggle');
const contactModal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const modalSubmit = document.getElementById('modalSubmit');

// Form inputs
const modalName = document.getElementById('modalName');
const modalEmail = document.getElementById('modalEmail');
const modalSubject = document.getElementById('modalSubject');
const modalMessage = document.getElementById('modalMessage');

// Phone number for WhatsApp
const whatsappNumber = "917710752782";

chatToggle.addEventListener('click', () => {
    contactModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    contactModal.classList.remove('active');
});

// Close when clicking outside modal content
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
    }
});

modalSubmit.addEventListener('click', () => {
    sendMessage();
});

function sendMessage() {
    const name = modalName.value.trim();
    const email = modalEmail.value.trim();
    const subject = modalSubject.value.trim();
    const message = modalMessage.value.trim();
    
    if (name && message) {
        // Format the message
        const formattedMessage = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Email:* ${email || 'Not provided'}\n*Subject:* ${subject || 'Not provided'}\n\n*Message:*\n${message}`;
        
        // Redirect to WhatsApp API
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Clear inputs and close window
        modalName.value = '';
        modalEmail.value = '';
        modalSubject.value = '';
        modalMessage.value = '';
        contactModal.classList.remove('active');
    } else {
        alert("Please provide at least your Name and a Message.");
    }
}

// Product Showcase Dynamic Loading
// Add any new image names to this array to dynamically show them in the gallery
const showcaseImages = [
    "showcase_warehouse_1776981485186.png",
    "showcase_pills_1776981501640.png",
    "showcase_herbal_1776981517010.png",
    "showcase_packaging_1776981532673.png",
    "showcase_shipment_1776981555316.png",
    "showcase_ayurvedic_1776981570832.png",
    "showcase_bottle_1776981587305.png",
    "showcase_global_1776981601535.png"
];

const showcaseContainer = document.getElementById('dynamic-showcase');

if (showcaseContainer) {
    let imagesHTML = '';
    showcaseImages.forEach(img => {
        // Create a display name from filename
        let altText = img.split('_')[1] || "Showcase Product";
        altText = altText.charAt(0).toUpperCase() + altText.slice(1);
        
        imagesHTML += `<div class="showcase-item"><img src="images/showcase/${img}" alt="${altText}"></div>`;
    });
    
    // Duplicate the images once for the seamless scrolling effect
    showcaseContainer.innerHTML = imagesHTML + imagesHTML;

    // Auto-scroll logic
    let scrollSpeed = 1; // Pixels per frame
    let isHovering = false;

    function autoScroll() {
        if (!isHovering) {
            showcaseContainer.scrollLeft += scrollSpeed;
            // Reset if we've reached halfway (the start of the cloned set)
            if (showcaseContainer.scrollLeft >= showcaseContainer.scrollWidth / 2) {
                showcaseContainer.scrollLeft = 0;
            } else if (showcaseContainer.scrollLeft <= 0 && scrollSpeed < 0) {
                showcaseContainer.scrollLeft = showcaseContainer.scrollWidth / 2;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    
    // Start auto-scroll
    autoScroll();

    // Pause on hover
    showcaseContainer.parentElement.addEventListener('mouseenter', () => isHovering = true);
    showcaseContainer.parentElement.addEventListener('mouseleave', () => isHovering = false);

    // Arrow navigation
    const leftBtn = document.getElementById('showcase-left');
    const rightBtn = document.getElementById('showcase-right');

    if (leftBtn && rightBtn) {
        // Item width (350) + Gap (32px or 2rem)
        const scrollAmount = 382; 
        
        leftBtn.addEventListener('click', () => {
            showcaseContainer.style.scrollBehavior = 'smooth';
            showcaseContainer.scrollBy({ left: -scrollAmount });
            setTimeout(() => showcaseContainer.style.scrollBehavior = 'auto', 500);
        });
        
        rightBtn.addEventListener('click', () => {
            showcaseContainer.style.scrollBehavior = 'smooth';
            showcaseContainer.scrollBy({ left: scrollAmount });
            setTimeout(() => showcaseContainer.style.scrollBehavior = 'auto', 500);
        });
    }
}
