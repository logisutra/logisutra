// layout.js - Global layout manager for post-login pages

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";

    // 1. Inject Global CSS Styles automatically
    const style = document.createElement("style");
    style.innerHTML = `
        :root {
            --primary: #1e293b;
            --accent: #2563eb;
            --background: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
        }

        /* Top Header */
        .global-header {
            background-color: var(--primary);
            color: white;
            padding: 0.75rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            sticky;
            top: 0;
            z-index: 1000;
        }
        .global-header a.logo {
            font-size: 1.4rem;
            font-weight: 800;
            color: white;
            text-decoration: none;
        }
        .global-header a.logo span { color: #60a5fa; }

        .header-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .header-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 0.45rem 0.85rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .header-btn:hover { background: rgba(255, 255, 255, 0.25); }

        /* Main Page Layout (Moves Sidebar to RIGHT) */
        .page-body-container {
            display: flex;
            flex-direction: row; /* Content on LEFT, Sidebar on RIGHT */
            min-height: calc(100vh - 120px);
        }

        .page-main-content {
            flex-grow: 1;
            padding: 2rem;
            background-color: var(--background);
        }

        /* Right-Hand Sidebar */
        .global-sidebar {
            width: 240px;
            background: #ffffff;
            border-left: 1px solid var(--border); /* Border on left side now */
            padding: 1.5rem 1rem;
            flex-shrink: 0;
        }

        .sidebar-title {
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
            padding-left: 0.5rem;
        }

        .sidebar-menu {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }

        .sidebar-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.65rem 0.85rem;
            color: var(--text-main);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.2s;
        }

        .sidebar-link:hover, .sidebar-link.active {
            background: #f1f5f9;
            color: var(--accent);
            font-weight: 600;
        }

        /* Global Footer */
        .global-footer {
            background: var(--primary);
            color: #94a3b8;
            text-align: center;
            padding: 1.25rem;
            font-size: 0.85rem;
            border-top: 1px solid var(--primary-light);
        }
    `;
    document.head.appendChild(style);

    // 2. Inject Header
    const headerHTML = `
        <header class="global-header">
            <a href="dashboard.html" class="logo">Logi<span>Sutra</span></a>
            <div class="header-controls">
                <button class="header-btn" onclick="clearNotifs()">🔔 Clear Notifications</button>
                <button class="header-btn" onclick="exitConsole()">🚪 Exit Console</button>
            </div>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // 3. Wrap existing content & attach Right-Side Sidebar
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
        const wrapper = document.createElement("div");
        wrapper.className = "page-body-container";

        // Move existing content inside the wrapper
        mainContent.parentNode.insertBefore(wrapper, mainContent);
        wrapper.appendChild(mainContent);
        mainContent.classList.add("page-main-content");

        // Build Right Sidebar
        const sidebarHTML = `
            <aside class="global-sidebar">
                <div class="sidebar-title">Main Menu</div>
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
    }

    // 4. Inject Footer
    const footerHTML = `
        <footer class="global-footer">
            <p>© ${new Date().getFullYear()} LogiSutra Trade Platform. All rights reserved.</p>
        </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);
});

// Helper Functions
function clearNotifs() {
    localStorage.removeItem("user_notifications");
    alert("Notifications cleared.");
}

function exitConsole() {
    localStorage.removeItem("globalTermsAccepted_v2");
    window.location.href = "index.html";
}
