// Save this file as "security-header.js"
// This file now automatically runs 3 new background security features across your whole website!
(function() {
    console.log("🔒 Advanced Security Engine Active.");

    // ==========================================
    // FEATURE 1: GLOBAL AUTOMATIC SESSION TIMEOUT
    // ==========================================
    let timeoutTimer;
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 Minutes in milliseconds

    function resetTimeoutTimer() {
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(triggerSecurityLock, INACTIVITY_LIMIT);
    }

    function triggerSecurityLock() {
        // Clear session state
        localStorage.removeItem('globalTermsAccepted_v2');
        alert("🔒 Security Notice: Your session has expired due to inactivity. The platform has locked to protect client data.");
        window.location.reload(); // Instantly re-triggers the legal guard to lock the screen
    }

    // Monitor user activity silently
    window.addEventListener('mousemove', resetTimeoutTimer);
    window.addEventListener('keypress', resetTimeoutTimer);
    window.addEventListener('click', resetTimeoutTimer);
    resetTimeoutTimer(); // Start the clock


    // ==========================================
    // FEATURE 2: NETWORK CONNECTION HEALTH HEALTH
    // ==========================================
    window.addEventListener('offline', function() {
        console.warn("⚠️ Secure Proxy Connection Interrupted.");
        alert("🌐 Connection Alert: Secure link to the backend proxy was lost. Please check your network connection.");
    });

    window.addEventListener('online', function() {
        console.log("🌐 Secure Proxy Connection Restored.");
    });


    // ==========================================
    // FEATURE 3: SILENT GLOBAL ERROR INTERCEPTOR
    // ==========================================
    window.addEventListener('error', function(event) {
        console.error("🛡️ Handled Application Error:", event.message);
        // Prevents minor code crashes from completely breaking the visible page layout
        event.preventDefault(); 
    });

})();
