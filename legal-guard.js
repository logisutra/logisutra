// Save this file as "legal-guard.js" in your root directory
(function() {
    // Structural layout for the global blocking modal
    const legalModalHtml = `
        <div id="globalLegalGuard" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); display: flex; align-items: center; justify-content: center; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background: white; padding: 2.5rem; border-radius: 16px; max-width: 650px; width: 90%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #e2e8f0;">
                <h2 style="margin-top: 0; color: #0f172a; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 700;">
                    🛡️ Global Platform Governance & Terms
                </h2>
                <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                    You are accessing a secure data node on this network. To protect all clients, accounts, and transactional ledgers, you must acknowledge our global legal and privacy framework before proceeding.
                </p>
                
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 8px; max-height: 220px; overflow-y: auto; font-size: 0.85rem; color: #64748b; line-height: 1.6; margin-bottom: 2rem;">
                    <strong style="color: #334155;">1. Cryptographic Accountability:</strong> All user credentials, trade logs, and active databases are processed through zero-exposure server environment matrices using decentralized Salt keys and an external global Pepper token. Raw parameters are never exposed.<br><br>
                    <strong style="color: #334155;">2. Core Limitation of Liability:</strong> This platform, including all current modules (Logistics trackers, Compliance screeners) and all future functional updates, provides administrative estimates only. The system, its developers, and operators accept no legal liability for external border delays, customs actions, or data transmission failures.<br><br>
                    <strong style="color: #334155;">3. Security Monitoring:</strong> All client connections are routed through a secure Reverse Proxy layer. Automated brute-force attacks, unauthorized API scraping, or scraping of client records will trigger an immediate firewall ban at the proxy gateway layer.
                </div>

                <button id="confirmLegalAgreementBtn" style="width: 100%; background: #0284c7; hover:background:#0369a1; color: white; border: none; padding: 0.95rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: background 0.2s;">
                    I Accept the Global Terms & Authorize Secure Processing
                </button>
            </div>
        </div>
    `;

    function initializeLegalGuard() {
        // If they already accepted, do nothing and let them use the page
        if (localStorage.getItem('globalTermsAccepted_v1') === 'true') {
            return;
        }

        // Otherwise, inject the blocking modal directly into the page
        const container = document.createElement('div');
        container.innerHTML = legalModalHtml;
        document.body.appendChild(container.firstElementChild);

        // Handle click events securely
        document.getElementById('confirmLegalAgreementBtn').addEventListener('click', function() {
            localStorage.setItem('globalTermsAccepted_v1', 'true');
            document.getElementById('globalLegalGuard').remove();
        });
    }

    // Run the check as soon as the HTML document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLegalGuard);
    } else {
        initializeLegalGuard();
    }
})();
