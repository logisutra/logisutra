// Save this file as "security-header.js" in your root directory
(function() {
    function injectSecurityBanner() {
        const banner = document.createElement('div');
        banner.style.cssText = 'background: #f0fdf4; border-bottom: 1px solid #bbf7d0; color: #166534; padding: 0.75rem 1.5rem; font-size: 0.85rem; text-align: center; font-family: sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px;';
        banner.innerHTML = `
            🛡️ <strong>Secure Session Active:</strong> Your connection is fully encrypted and monitored for data protection compliance.
        `;
        
        document.body.insertBefore(banner, document.body.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSecurityBanner);
    } else {
        injectSecurityBanner();
    }
})();
