import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Smooth scrolling pour tous les liens internes
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe scroll-reveal
    const elementsToObserve = document.querySelectorAll('.scroll-reveal');
    elementsToObserve.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default SmoothScroll;
