// layout.js — Single global layout manager for all post-login pages

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";

    // 1. Inject Universal CSS for Header, Right Sidebar, and Footer
    const style = document.createElement("style");
    style.innerHTML = `
        :root {
            --primary: #1e293b;
            --primary-light: #334155;
            --accent: #2563eb;
            --background: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            padding: 0;
            background-color: var(--background);
            color: var(--text-main);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Full Header */
        .global-header {
            background-color: var(--primary);
            color: white;
            padding: 0.75rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 2rem;
            flex-grow: 1;
        }

        .logo {
            font-size: 1.4rem;
            font-weight: 800;
            letter-spacing: -0.05em;
            color: white;
            text-decoration: none;
        }
        .logo span { color: #60a5fa; }

        .search-container {
            position: relative;
            width: 300px;
        }

        .search-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem 0.5rem 2.25rem;
            border-radius: 6px;
            color: white;
            font-size: 0.85rem;
            outline: none;
        }
        .search-input::placeholder { color: #94a3b8; }
        .search-input:focus { background: white; color: var(--text-main); }

        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.85rem;
            color: #94a3b8;
            pointer-events: none;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }

        /* Bell Notification Controls */
        .notif-container { position: relative; }

        .notif-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: white;
            padding: 0.45rem 0.75rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .notif-btn:hover { background: rgba(255, 255, 255, 0.2); }

        .notif-badge {
            background: #ef4444;
            color: white;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 1px 6px;
            border-radius: 10px;
        }

        .notif-dropdown {
            display: none;
            position: absolute;
            right: 0;
            top: 125%;
            width: 280px;
            background: white;
            border: 1px solid var(--border);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            border-radius: 8px;
            z-index: 1000;
            overflow: hidden;
            color: var(--text-main);
        }

        .notif-header {
            padding: 0.75rem 1rem;
            background: #f8fafc;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            font-weight: 700;
        }

        .notif-header button {
            background: none;
            border: none;
            color: var(--accent);
            font-size: 0.75rem;
            cursor: pointer;
            font-weight: 600;
        }

        .notif-list { max-height: 250px; overflow-y: auto; }
        .notif-item { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.8rem; }
        .notif-item:last-child { border-bottom: none; }

        /* Profile Menu */
        .profile-container { position: relative; user-select: none; }

        .profile-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.45rem 0.8rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.85rem;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .profile-dropdown {
            display: none;
            position: absolute;
            right: 0;
            top: 125%;
            width: 200px;
            background: white;
            border: 1px solid var(--border);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            z-index: 1000;
        }

        .profile-dropdown a, .profile-dropdown button {
            display: block;
            width: 100%;
            text-align: left;
            padding: 0.75rem 1rem;
            background: none;
            border: none;
            color: var(--text-main);
            font-size: 0.85rem;
            cursor: pointer;
            text-decoration: none;
            border-bottom: 1px solid var(--border);
        }

        .profile-dropdown a:hover, .profile-dropdown button:hover { background: #f1f5f9; }

        /* Page Layout Wrapper */
        .layout-wrapper {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
            width: 100%;
        }

        .page-content-area {
            flex-grow: 1;
            padding: 2rem;
            min-width: 0;
        }

        /* Right Sidebar */
        .global-sidebar {
            width: 240px;
            background: white;
            border-left: 1px solid var(--border);
            padding: 1.5rem 0.75rem;
            flex-shrink: 0;
        }

        .sidebar-title {
            font-size: 0.7rem;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0 0.85rem 0.5rem 0.85rem;
        }

        .sidebar-menu { display: flex; flex-direction: column; gap: 0.25rem; }

        .sidebar-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.65rem 0.85rem;
            color: var(--text-main);
            text-decoration: none;
            font-size: 0.88rem;
            font-weight: 500;
            border-radius: 6px;
        }

        .sidebar-link:hover, .sidebar-link.active {
            background: #f1f5f9;
            color: var(--accent);
            font-weight: 600;
        }

        /* Complete Footer */
        .global-footer {
            background: var(--primary);
            color: #94a3b8;
            padding: 2.5rem 2rem 1.5rem 2rem;
            font-size: 0.85rem;
            margin-top: auto;
            border-top: 1px solid var(--primary-light);
        }

        .footer-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-col h4 {
            color: white;
            font-size: 0.95rem;
            margin-bottom: 1rem;
        }

        .footer-col ul { list-style: none; padding: 0; margin: 0; }
        .footer-col ul li { margin-bottom: 0.5rem; }

        .footer-col a {
            color: #94a3b8;
            text-decoration: none;
            transition: color 0.2s;
        }

        .footer-col a:hover { color: white; }

        .footer-bottom {
            max-width: 1200px;
            margin: 0 auto;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
    `;
    document.head.appendChild(style);

    // 2. Render Global Header
    const headerHTML = `
        <header class="global-header">
            <div class="header-left">
                <a href="dashboard.html" class="logo">Logi<span>Sutra</span></a>
                <div class="search-container">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="cardSearchInput" class="search-input" placeholder="Search workspace modules...">
                </div>
            </div>

            <div class="header-right">
                <!-- Clean Notification Bell Icon Only -->
                <div class="notif-container">
                    <button class="notif-btn" id="notifToggle" title="Notifications">
                        🔔 <span class="notif-badge" id="notifCount">0</span>
                    </button>
                    
                    <div class="notif-dropdown" id="notifMenu">
                        <div class="notif-header">
                            <span>Notifications</span>
                            <button id="clearNotifsBtn">Clear Notifications</button>
                        </div>
                        <div class="notif-list" id="notifList">
                            <div class="notif-item" style="color: var(--text-muted); text-align: center;">
                                No new notifications.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Complete Account Menu -->
                <div class="profile-container">
                    <div class="profile-btn" id="profileToggle">
                        👤 Account <span style="font-size:0.7rem;">▼</span>
                    </div>
                    
                    <div class="profile-dropdown" id="profileMenu">
                        <a href="profile.html">⚙️ Profile Settings</a>
                        <a href="security.html">🔒 Security</a>
                        <button id="resetAgreementBtn">🧹 Reset Session</button>
                        <button id="logoutBtn" style="color:#dc2626; font-weight:600;">🚪 Exit Console</button>
                    </div>
                </div>
            </div>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // 3. Setup Content Body & Right Sidebar
    let contentContainer = document.getElementById("main-content");
    if (!contentContainer) {
        // Fallback: wrap existing body children if #main-content isn't explicitly defined
        contentContainer = document.createElement("div");
        contentContainer.id = "main-content";
        while (document.body.childNodes.length > 1) { // Skip injected header
            contentContainer.appendChild(document.body.childNodes[1]);
        }
        document.body.appendChild(contentContainer);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "layout-wrapper";

    contentContainer.parentNode.insertBefore(wrapper, contentContainer);
    wrapper.appendChild(contentContainer);
    contentContainer.classList.add("page-content-area");

    // Right-Hand Sidebar
    const sidebarHTML = `
        <aside class="global-sidebar">
            <div class="sidebar-title">Navigation</div>
            <nav class="sidebar-menu">
                <a href="dashboard.html" class="sidebar-link ${currentPage === 'dashboard.html' ? 'active' : ''}">🏠 Overview</a>
                <a href="export.html" class="sidebar-link ${currentPage === 'export.html' ? 'active' : ''}">📤 Export Hub</a>
                <a href="import.html" class="sidebar-link ${currentPage === 'import.html' ? 'active' : ''}">📥 Import Hub</a>
                <a href="transaction.html" class="sidebar-link ${currentPage === 'transaction.html' ? 'active' : ''}">🤝 Transactions</a>
                <a href="logistics.html" class="sidebar-link ${currentPage === 'logistics.html' ? 'active' : ''}">🚢 Freight Desk</a>
                <a href="compliance.html" class="sidebar-link ${currentPage === 'compliance.html' ? 'active' : ''}">🛂 Compliance Audit</a>
            </nav>
        </aside>
    `;
    wrapper.insertAdjacentHTML("beforeend", sidebarHTML);

    // 4. Render Complete Footer (With Terms & Policy Links)
    const footerHTML = `
        <footer class="global-footer">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>LogiSutra</h4>
                    <p style="line-height: 1.5;">Empowering global trade, export logistics, and customs compliance management.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="dashboard.html">Dashboard</a></li>
                        <li><a href="export.html">Export Hub</a></li>
                        <li><a href="import.html">Import Hub</a></li>
                        <li><a href="logistics.html">Freight Desk</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Legal & Policy</h4>
                    <ul>
                        <li><a href="terms.html">Terms & Conditions</a></li>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="compliance.html">Compliance Rules</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="help.html">Help Center</a></li>
                        <li><a href="docs.html">Documentation</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div>© ${new Date().getFullYear()} LogiSutra Platform. All rights reserved.</div>
                <div>System Status: <span style="color:#10b981;">● Operational</span></div>
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    // 5. Interactive JavaScript (Header Dropdowns & Notifications)
    setupHeaderEvents();
});

function setupHeaderEvents() {
    const notifToggle = document.getElementById("notifToggle");
    const notifMenu = document.getElementById("notifMenu");
    const notifList = document.getElementById("notifList");
    const notifCount = document.getElementById("notifCount");
    const clearNotifsBtn = document.getElementById("clearNotifsBtn");

    const profileToggle = document.getElementById("profileToggle");
    const profileMenu = document.getElementById("profileMenu");

    function loadNotifs() {
        const notifications = JSON.parse(localStorage.getItem("user_notifications") || "[]");
        notifCount.textContent = notifications.length;

        if (notifications.length === 0) {
            notifList.innerHTML = `<div class="notif-item" style="color: var(--text-muted); text-align: center;">No new notifications.</div>`;
        } else {
            notifList.innerHTML = notifications.map(item => `<div class="notif-item">${item}</div>`).join("");
        }
    }

    if (notifToggle) {
        notifToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (profileMenu) profileMenu.style.display = "none";
            notifMenu.style.display = notifMenu.style.display === "block" ? "none" : "block";
        });
    }

    if (clearNotifsBtn) {
        clearNotifsBtn.addEventListener("click", function () {
            localStorage.removeItem("user_notifications");
            loadNotifs();
        });
    }

    if (profileToggle) {
        profileToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (notifMenu) notifMenu.style.display = "none";
            profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
        });
    }

    document.addEventListener("click", function () {
        if (profileMenu) profileMenu.style.display = "none";
        if (notifMenu) notifMenu.style.display = "none";
    });

    const resetBtn = document.getElementById("resetAgreementBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            localStorage.removeItem("globalTermsAccepted_v2");
            alert("Session agreement reset.");
            window.location.reload();
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("globalTermsAccepted_v2");
            window.location.href = "index.html";
        });
    }

    loadNotifs();
}
