// Save this file as "legal-guard.js"
(function() {
    const legalModalHtml = `
        <div id="globalLegalGuard" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); display: flex; align-items: center; justify-content: center; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="background: white; padding: 2.5rem; border-radius: 16px; max-width: 650px; width: 90%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #e2e8f0;">
                <h2 style="margin-top: 0; color: #0f172a; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 700;">
                    📋 Terms of Service & Privacy Policy
                </h2>
                <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
                    Welcome to the platform. Before using our corporate trade tools and dashboard systems, please review and accept our user data policies and operating terms.
                </p>
                
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 8px; max-height: 220px; overflow-y: auto; font-size: 0.85rem; color: #64748b; line-height: 1.6; margin-bottom: 2rem;">
                    <strong style="color: #334155;">1. User Account Responsibility:</strong> You are entirely responsible for maintaining the confidentiality of your account login details. Any actions taken under your account profile are your legal responsibility.<br><br>
                    <strong style="color: #334155;">2. Privacy & Data Collection:</strong> We collect and process trade inputs, shipping details, and account preferences solely to provide the services offered on this dashboard. Your professional data is securely stored and will never be shared or sold to unauthorized third parties.<br><br>
                    <strong style="color: #334155;">3. Acceptable Use Policy:</strong> Users agree not to misuse this platform by attempting to upload malicious files, scrape automated system data, or launch brute-force actions against our infrastructure. Violations will result in permanent account termination.<br><br>
                    <strong style="color: #334155;">4. Limitation of Service:</strong> The calculations, logistical trackers, and compliance tools provided on this site are for administrative assistance only. While we aim for perfect accuracy, the platform accepts no liability for business decisions, external delays, or customs clearance outcomes based on this data.
                </div>

                <button id="confirmLegalAgreementBtn" style="width: 100%; background: #0284c7; color: white; border: none; padding: 0.95rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: background 0.2s;">
                    I Accept the Terms & Conditions
                </button>
            </div>
        </div>
    `;

    function initializeLegalGuard() {
        if (localStorage.getItem('globalTermsAccepted_v2') === 'true') {
            return;
        }

        const container = document.createElement('div');
        container.innerHTML = legalModalHtml;
        document.body.appendChild(container.firstElementChild);

        document.getElementById('confirmLegalAgreementBtn').addEventListener('click', function() {
            localStorage.setItem('globalTermsAccepted_v2', 'true');
            document.getElementById('globalLegalGuard').remove();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLegalGuard);
    } else {
        initializeLegalGuard();
    }
})();
