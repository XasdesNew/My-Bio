document.addEventListener('DOMContentLoaded', function() {
    const texts = ["Python Developer", "Web Developer", "No Scam", "Software Engineer"];
    const typingElement = document.getElementById('typing');
    
    let textIndex = 0;
    let charIndex = 0;
    let typingDelay = 150;
    let deletingDelay = 100;
    let pauseBetweenTexts = 1000;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
    
        if (!isDeleting) {
            typingElement.textContent += currentText[charIndex];
            charIndex++;
    
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, pauseBetweenTexts);
                return;
            }
        } else {
            typingElement.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;
    
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
    
        const delay = isDeleting ? deletingDelay : typingDelay;
        setTimeout(typeEffect, delay);
    }

    typeEffect();

    function getTabIndex(tabId) {
        const tabOrder = ['info', 'about', 'contacts', 'donate'];
        return tabOrder.indexOf(tabId);
    }

    function switchTab(tabId) {
        const allTabs = document.querySelectorAll('.tab-content');
        const allLinks = document.querySelectorAll('.tab-link');
        const targetTab = document.getElementById(tabId);
        const currentTab = document.querySelector('.tab-content.active');

        if (currentTab === targetTab) return;

        const currentTabId = currentTab ? currentTab.id : 'info';
        const currentIndex = getTabIndex(currentTabId);
        const targetIndex = getTabIndex(tabId);
        const isForward = targetIndex > currentIndex;

        allLinks.forEach(link => link.classList.remove('active'));

        document.querySelectorAll(`.tab-link[data-tab="${tabId}"]`).forEach(link => {
            link.classList.add('active');
        });

        if (currentTab) {
            currentTab.style.transition = 'all 0.3s ease';
            currentTab.style.opacity = '0';
            currentTab.style.transform = isForward ? 
                'translateX(-100%) scale(0.8)' : 
                'translateX(100%) scale(0.8)';
            
            setTimeout(() => {
                currentTab.classList.remove('active');
                currentTab.style.transform = '';
                currentTab.style.transition = '';
            }, 300);
        }

        setTimeout(() => {
            targetTab.classList.add('active');
            targetTab.style.transition = 'none';
            targetTab.style.opacity = '0';
            targetTab.style.transform = isForward ? 
                'translateX(100%) scale(0.8)' : 
                'translateX(-100%) scale(0.8)';
            
            requestAnimationFrame(() => {
                targetTab.style.transition = 'all 0.3s ease';
                targetTab.style.opacity = '1';
                targetTab.style.transform = 'translateX(0) scale(1)';
            });
        }, currentTab ? 300 : 0);
    }

    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    switchTab('info');
});
