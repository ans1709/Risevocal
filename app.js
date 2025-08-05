// RiseVocal Enhanced Website JavaScript - Fixed Contact Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎙️ RiseVocal website initializing...');
    
    // Initialize all functionality
    initSmoothScrolling();
    initAudioPlayer();
    initNavigation();
    initGlowAnimations();
    initWhatsAppButtons();
    initParticleEffects();
    initAccessibility();
    
    console.log('✅ RiseVocal enhanced website initialized successfully');
});

// Fixed smooth scrolling for navigation
function initSmoothScrolling() {
    console.log('🔧 Initializing smooth scrolling...');
    
    // Get all navigation links and smooth scroll links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll[href^="#"]');
    const allScrollLinks = [...navLinks, ...smoothScrollLinks];
    
    console.log(`Found ${allScrollLinks.length} scroll links`);
    
    allScrollLinks.forEach((link, index) => {
        console.log(`Setting up link ${index + 1}: ${link.getAttribute('href')}`);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            console.log(`Clicked link with href: ${href}`);
            
            if (!href || href === '#') {
                console.log('Invalid href, skipping');
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            console.log(`Looking for element with ID: ${targetId}`);
            console.log('Target element:', targetElement);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                console.log(`Scrolling to position: ${offsetPosition}`);
                
                // Add glow effect during scroll
                targetElement.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.5)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 1500);
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                showNotification(`Navigating to ${targetId.replace('-', ' ')}`, 'info');
            } else {
                console.error(`Target element not found: ${targetId}`);
            }
        });
    });
    
    console.log('✅ Smooth scrolling initialized');
}

// Fixed WhatsApp integration - Simplified to work properly
function initWhatsAppButtons() {
    console.log('🔧 Initializing WhatsApp buttons...');
    
    // Get all WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    console.log(`Found ${whatsappLinks.length} WhatsApp links`);
    
    whatsappLinks.forEach((link, index) => {
        console.log(`Setting up WhatsApp link ${index + 1}: ${link.getAttribute('href')}`);
        
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            const href = this.getAttribute('href');
            console.log(`WhatsApp link clicked: ${href}`);
            
            // Add visual feedback
            this.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
            
            showNotification('Opening WhatsApp! 📱', 'success');
            trackInteraction('whatsapp_click', this.textContent.trim());
        });
    });
    
    // Get all email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    console.log(`Found ${emailLinks.length} email links`);
    
    emailLinks.forEach((link, index) => {
        console.log(`Setting up email link ${index + 1}: ${link.getAttribute('href')}`);
        
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            const href = this.getAttribute('href');
            console.log(`Email link clicked: ${href}`);
            
            // Add visual feedback
            this.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
            
            showNotification('Opening email client! 📧', 'success');
            trackInteraction('email_click', this.textContent.trim());
        });
    });
    
    console.log('✅ WhatsApp and email buttons initialized');
}

// Fixed audio player with proper modal functionality
function initAudioPlayer() {
    console.log('🔧 Initializing audio player...');
    
    const modal = document.getElementById('audio-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalArtistName = document.getElementById('modal-artist-name');
    const modalDescription = document.getElementById('modal-description');
    const playButtons = document.querySelectorAll('.play-sample');
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    
    console.log('Modal elements:', { modal: !!modal, modalOverlay: !!modalOverlay, modalClose: !!modalClose });
    console.log(`Found ${playButtons.length} play sample buttons`);
    
    if (!modal || !modalOverlay || !modalClose) {
        console.error('❌ Required modal elements not found');
        return;
    }
    
    let isPlaying = false;
    let currentArtist = '';
    let progressInterval;
    
    // Artist samples with descriptions
    const artistSamples = {
        'Priya Sharma': 'Professional corporate narration sample showcasing clear Hindi and English pronunciation perfect for e-learning content. Listen to the clarity and professional tone.',
        'Raj Patel': 'Dynamic animation voice sample demonstrating versatility in Gujarati, Hindi, and English for gaming content. Notice the energy and character work.',
        'Anita Kumar': 'Medical training narration sample highlighting precise Tamil and Telugu pronunciation for educational materials. Perfect for technical content.',
        'Mohammed Ali': 'News broadcasting sample showcasing authoritative Urdu, Hindi, and Arabic delivery for media content. Professional news anchor quality.',
        'Sarah D\'Souza': 'Travel documentary sample featuring warm English, Konkani, and Portuguese narration for lifestyle content. Engaging storytelling voice.',
        'Vikram Singh': 'Sports commentary sample demonstrating energetic Punjabi, Hindi, and English delivery for entertainment. High-energy sports broadcasting style.'
    };
    
    // Set up play sample buttons
    playButtons.forEach((button, index) => {
        console.log(`Setting up play button ${index + 1} for: ${button.getAttribute('data-artist')}`);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Play sample button clicked');
            
            // Add visual feedback
            this.style.boxShadow = '0 0 25px rgba(0, 191, 255, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
            
            currentArtist = this.getAttribute('data-artist');
            console.log(`Opening modal for artist: ${currentArtist}`);
            
            if (modalArtistName) {
                modalArtistName.textContent = `${currentArtist} - Voice Sample`;
            }
            if (modalDescription) {
                modalDescription.textContent = artistSamples[currentArtist] || 'Sample recording demonstrating voice quality and style.';
            }
            
            resetPlayer();
            showModal();
            trackInteraction('play_sample', currentArtist);
            showNotification(`🎧 Opening ${currentArtist}'s voice sample`, 'info');
        });
    });
    
    // Modal close functionality
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Modal close button clicked');
        hideModal();
    });
    
    modalOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Modal overlay clicked');
        hideModal();
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            console.log('ESC key pressed, closing modal');
            hideModal();
        }
    });
    
    // Play/Pause functionality
    if (playBtn) {
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Play/pause button clicked, isPlaying:', isPlaying);
            
            // Add glow effect on click
            this.style.boxShadow = '0 0 30px rgba(0, 191, 255, 1)';
            setTimeout(() => {
                this.style.boxShadow = '0 0 15px rgba(30, 144, 255, 0.4), 0 0 30px rgba(30, 144, 255, 0.2)';
            }, 300);
            
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }
    
    function showModal() {
        console.log('Showing modal...');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                    modalContent.style.transition = 'all 0.3s ease';
                }, 50);
            }
            
            // Focus management
            setTimeout(() => {
                if (playBtn) {
                    playBtn.focus();
                    console.log('Focused on play button');
                }
            }, 400);
            
            console.log('✅ Modal shown');
        }
    }
    
    function hideModal() {
        console.log('Hiding modal...');
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(0.9)';
                modalContent.style.opacity = '0';
            }
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                pauseAudio();
                resetPlayer();
                console.log('✅ Modal hidden');
            }, 300);
        }
    }
    
    function playAudio() {
        console.log('Starting audio playback...');
        isPlaying = true;
        
        if (playBtn) {
            playBtn.innerHTML = '⏸️';
            playBtn.setAttribute('aria-label', 'Pause');
        }
        
        // Start waveform animation
        const waveformBars = document.querySelectorAll('.waveform-bar');
        waveformBars.forEach((bar, index) => {
            bar.style.animationPlayState = 'running';
            bar.style.boxShadow = `0 0 10px rgba(0, 191, 255, ${0.8 - index * 0.1})`;
        });
        
        // Simulate audio progress (30 second sample)
        let progress = 0;
        const duration = 30;
        
        progressInterval = setInterval(() => {
            progress += 0.1;
            const percentage = (progress / duration) * 100;
            
            if (percentage >= 100) {
                pauseAudio();
                resetPlayer();
                showNotification('Audio sample completed! 🎵', 'success');
                return;
            }
            
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
                progressBar.style.boxShadow = `0 0 ${10 + percentage * 0.2}px rgba(0, 191, 255, 0.8)`;
            }
            updateTimeDisplay(progress, duration);
        }, 100);
        
        showNotification(`▶️ Playing ${currentArtist}'s voice sample`, 'info');
        console.log('✅ Audio playback started');
    }
    
    function pauseAudio() {
        console.log('Pausing audio...');
        isPlaying = false;
        
        if (playBtn) {
            playBtn.innerHTML = '▶️';
            playBtn.setAttribute('aria-label', 'Play');
        }
        
        // Pause waveform animation
        const waveformBars = document.querySelectorAll('.waveform-bar');
        waveformBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.boxShadow = '0 0 5px rgba(0, 191, 255, 0.4)';
        });
        
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        console.log('✅ Audio paused');
    }
    
    function resetPlayer() {
        console.log('Resetting audio player...');
        isPlaying = false;
        
        if (playBtn) {
            playBtn.innerHTML = '▶️';
            playBtn.setAttribute('aria-label', 'Play');
        }
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.style.boxShadow = '0 0 10px rgba(0, 191, 255, 0.8)';
        }
        updateTimeDisplay(0, 30);
        
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        // Reset waveform
        const waveformBars = document.querySelectorAll('.waveform-bar');
        waveformBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.boxShadow = '0 0 5px rgba(0, 191, 255, 0.4)';
        });
        
        console.log('✅ Audio player reset');
    }
    
    function updateTimeDisplay(current, total) {
        const currentMin = Math.floor(current / 60);
        const currentSec = Math.floor(current % 60);
        const totalMin = Math.floor(total / 60);
        const totalSec = Math.floor(total % 60);
        
        const timeElement = document.querySelector('.audio-time');
        if (timeElement) {
            timeElement.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
        }
    }
    
    // Progress bar click functionality
    const audioProgress = document.querySelector('.audio-progress');
    if (audioProgress) {
        audioProgress.addEventListener('click', function(e) {
            if (!isPlaying) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = (clickX / width) * 100;
            
            if (progressBar) {
                progressBar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
                this.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.8)';
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 500);
            }
        });
    }
    
    console.log('✅ Audio player initialized');
}

// Enhanced navigation with scroll detection
function initNavigation() {
    console.log('🔧 Initializing navigation...');
    
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.error('❌ Navbar not found');
        return;
    }
    
    let lastScrollY = window.scrollY;
    
    // Scroll handler with enhanced effects
    let ticking = false;
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Enhanced background and glow on scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 13, 20, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 191, 255, 0.4)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 191, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 13, 20, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 191, 255, 0.2)';
            navbar.style.boxShadow = '';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
                link.style.boxShadow = '0 0 15px rgba(0, 191, 255, 0.5)';
            } else {
                link.style.boxShadow = '';
            }
        });
    }
    
    let navTicking = false;
    window.addEventListener('scroll', function() {
        if (!navTicking) {
            requestAnimationFrame(updateActiveNavLink);
            navTicking = true;
        }
    });
    
    console.log('✅ Navigation initialized');
}

// Enhanced glow animations
function initGlowAnimations() {
    console.log('🔧 Initializing glow animations...');
    
    // Start sound wave animations immediately
    const soundWaves = document.querySelectorAll('.wave-line');
    console.log(`Found ${soundWaves.length} sound wave elements`);
    
    soundWaves.forEach((wave, index) => {
        wave.style.animationPlayState = 'running';
        console.log(`Started animation for wave ${index + 1}`);
    });
    
    // Intersection observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const glowObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                    
                    // Add entrance glow effect
                    if (entry.target.classList.contains('glow-card')) {
                        entry.target.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.4)';
                        setTimeout(() => {
                            entry.target.style.boxShadow = '';
                        }, 1500);
                    }
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.glow-card, .step, .benefit-card, .artist-card, .pricing-card');
    console.log(`Setting up animations for ${animatedElements.length} elements`);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        glowObserver.observe(element);
    });
    
    // Enhanced button hover effects
    const glowButtons = document.querySelectorAll('.btn--glow');
    console.log(`Setting up glow effects for ${glowButtons.length} buttons`);
    
    glowButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 10px 30px rgba(0, 191, 255, 0.4), 0 0 40px rgba(0, 191, 255, 0.3)';
            } else if (this.classList.contains('btn--outline')) {
                this.style.boxShadow = '0 5px 20px rgba(0, 191, 255, 0.3)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 0 15px rgba(30, 144, 255, 0.4), 0 0 30px rgba(30, 144, 255, 0.2)';
            } else {
                this.style.boxShadow = '';
            }
        });
    });
    
    // Artist avatar glow effects
    const artistAvatars = document.querySelectorAll('.artist-avatar-glow');
    console.log(`Setting up avatar glow for ${artistAvatars.length} artists`);
    
    artistAvatars.forEach(avatar => {
        let glowInterval;
        
        avatar.addEventListener('mouseenter', function() {
            let intensity = 0;
            glowInterval = setInterval(() => {
                intensity = (intensity + 0.1) % 1;
                const glowStrength = 20 + intensity * 20;
                this.style.boxShadow = `0 0 ${glowStrength}px rgba(0, 191, 255, ${0.6 + intensity * 0.4}), 0 0 ${glowStrength * 2}px rgba(30, 144, 255, ${0.3 + intensity * 0.2})`;
            }, 50);
        });
        
        avatar.addEventListener('mouseleave', function() {
            if (glowInterval) {
                clearInterval(glowInterval);
            }
            this.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.5), 0 0 40px rgba(0, 191, 255, 0.3), 0 0 60px rgba(0, 191, 255, 0.1)';
        });
    });
    
    console.log('✅ Glow animations initialized');
}

// Particle effects
function initParticleEffects() {
    console.log('🔧 Initializing particle effects...');
    
    const particles = document.querySelectorAll('.particle');
    console.log(`Found ${particles.length} particles`);
    
    // Enhanced particle movement
    particles.forEach((particle, index) => {
        setInterval(() => {
            const randomX = Math.random() * 30 - 15;
            const randomY = Math.random() * 30 - 15;
            
            particle.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            // Random glow intensity
            const glowIntensity = 5 + Math.random() * 15;
            particle.style.boxShadow = `0 0 ${glowIntensity}px rgba(0, 191, 255, ${0.6 + Math.random() * 0.4})`;
        }, 4000 + index * 600);
    });
    
    console.log('✅ Particle effects initialized');
}

// Accessibility features
function initAccessibility() {
    console.log('🔧 Initializing accessibility features...');
    
    // Enhanced skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    Object.assign(skipLink.style, {
        position: 'absolute',
        left: '-9999px',
        zIndex: '9999',
        padding: '12px 20px',
        background: 'linear-gradient(135deg, #00bfff, #1e90ff)',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        border: '2px solid #00bfff',
        boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)'
    });
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '20px';
        this.style.top = '20px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('audio-modal');
        
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    console.log('✅ Accessibility features initialized');
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Enhanced styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '120px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        zIndex: '3000',
        transform: 'translateX(400px)',
        transition: 'transform 0.4s ease',
        maxWidth: '350px',
        wordWrap: 'break-word',
        border: '2px solid rgba(0, 191, 255, 0.5)',
        backdropFilter: 'blur(10px)'
    });
    
    // Type-specific styling
    const styles = {
        success: {
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
        },
        error: {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
        },
        warning: {
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9))',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
        },
        info: {
            background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.9), rgba(30, 144, 255, 0.9))',
            boxShadow: '0 0 25px rgba(0, 191, 255, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)'
        }
    };
    
    Object.assign(notification.style, styles[type] || styles.info);
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Interaction tracking
function trackInteraction(element, action) {
    console.log(`🎙️ RiseVocal Interaction: ${element} - ${action}`);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', element, {
            'event_category': 'User Interaction',
            'event_label': action
        });
    }
}

// Error handling
function handleError(error, context = '') {
    console.error(`🚨 RiseVocal Error in ${context}:`, error);
    showNotification('Something went wrong. Please refresh and try again.', 'error');
}

// Global error handlers
window.addEventListener('error', function(e) {
    handleError(e.error, 'Global error handler');
});

window.addEventListener('unhandledrejection', function(e) {
    handleError(e.reason, 'Unhandled promise rejection');
});

// Handle external links - don't interfere with wa.me and mailto links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"], a[href^="https://"]');
    if (link && !link.href.includes(window.location.hostname) && !link.href.includes('wa.me') && !link.href.includes('whatsapp')) {
        e.preventDefault();
        
        // Add click effect
        link.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.6)';
        setTimeout(() => {
            link.style.boxShadow = '';
        }, 300);
        
        console.log(`Opening external link: ${link.href}`);
        window.open(link.href, '_blank', 'noopener,noreferrer');
        trackInteraction('external_link', link.href);
    }
});

// Page visibility optimization
document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll('.wave-line, .waveform-bar, .particle');
    
    if (document.hidden) {
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    } else {
        animatedElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

console.log('🎙️ RiseVocal JavaScript loaded successfully!');