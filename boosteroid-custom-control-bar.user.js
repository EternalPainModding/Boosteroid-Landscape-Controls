// ==UserScript==
// @name         Boosteroid Custom Control Bar
// @namespace    https://github.com/yourusername/boosteroid-custom-control-bar
// @version      3.0.0
// @description  Custom floating control bar for Boosteroid web on tablets/mobile. Provides Fullscreen, native Menu access and easy hide — works in landscape mode.
// @author       Community
// @match        https://cloud.boosteroid.com/*
// @match        https://*.boosteroid.com/*
// @icon         https://www.boosteroid.com/favicon.ico
// @grant        none
// @run-at       document-idle
// @license      Unlicense
// @attribution  Made with AI (Grok by xAI) – free to use, modify, sell, whatever you want
// ==/UserScript==

(function () {
    'use strict';

    let hideTimeout = null;
    let barVisible = true;

    function isInGame() {
        return !!(
            document.querySelector('video') ||
            document.querySelector('[class*="stream"]') ||
            document.querySelector('[class*="player"]') ||
            document.querySelector('[class*="remote"]')
        );
    }

    function toggleFullscreen() {
        const video = document.querySelector('video') || document.documentElement;

        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen().catch(() => {});
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    function openNativeMenu() {
        const selectors = [
            'button[aria-label*="menu" i]',
            'button[aria-label*="more" i]',
            'button[aria-label*="options" i]',
            'button[aria-label*="settings" i]',
            '[class*="menu-btn"]',
            '[class*="more-btn"]',
            '[class*="options"]'
        ];

        for (const sel of selectors) {
            document.querySelectorAll(sel).forEach(btn => {
                const rect = btn.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    btn.click();
                }
            });
        }

        document.querySelectorAll('[class*="overlay"], [class*="menu"], [class*="panel"], [class*="drawer"]').forEach(el => {
            el.style.setProperty('display', 'flex', 'important');
            el.style.setProperty('visibility', 'visible', 'important');
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('pointer-events', 'auto', 'important');
            el.style.setProperty('z-index', '999999', 'important');
        });
    }

    function createCustomBar() {
        if (document.getElementById('boost-custom-bar') || !isInGame()) return;

        const bar = document.createElement('div');
        bar.id = 'boost-custom-bar';

        Object.assign(bar.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '2147483647',
            display: 'flex',
            gap: '12px',
            padding: '10px 16px',
            background: 'rgba(15, 15, 25, 0.92)',
            borderRadius: '16px',
            border: '1px solid #4a90e2',
            boxShadow: '0 8px 24px rgba(0,0,0,0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            alignItems: 'center',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            opacity: '1'
        });

        function makeBtn(label, title, onClick) {
            const b = document.createElement('button');
            b.textContent = label;
            b.title = title;
            Object.assign(b.style, {
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: 'rgba(74, 144, 226, 0.25)',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                touchAction: 'manipulation',
                userSelect: 'none'
            });
            b.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
                b.style.transform = 'scale(0.93)';
                setTimeout(() => b.style.transform = 'scale(1)', 150);
            });
            return b;
        }

        const fullscreenBtn = makeBtn('⛶ Fullscreen', 'Toggle real fullscreen', toggleFullscreen);
        const menuBtn       = makeBtn('☰ Menu', 'Open Boosteroid options (Quality / Keyboard etc.)', openNativeMenu);
        const hideBtn       = makeBtn('✕ Hide', 'Hide this bar', () => {
            bar.style.opacity = '0';
            bar.style.pointerEvents = 'none';
            barVisible = false;
        });

        bar.appendChild(fullscreenBtn);
        bar.appendChild(menuBtn);
        bar.appendChild(hideBtn);

        document.body.appendChild(bar);

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            if (barVisible) {
                bar.style.opacity = '0';
                bar.style.pointerEvents = 'none';
            }
        }, 25000);
    }

    function createShowButton() {
        if (document.getElementById('boost-show-btn') || !isInGame()) return;

        const btn = document.createElement('button');
        btn.id = 'boost-show-btn';
        btn.innerHTML = '⚙';
        btn.title = 'Show control bar';

        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '2147483646',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid #4a90e2',
            background: 'rgba(15, 15, 25, 0.9)',
            color: 'white',
            fontSize: '22px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'manipulation'
        });

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const old = document.getElementById('boost-custom-bar');
            if (old) old.remove();

            barVisible = true;
            createCustomBar();
        });

        document.body.appendChild(btn);
    }

    function tick() {
        if (!isInGame()) {
            const bar = document.getElementById('boost-custom-bar');
            const show = document.getElementById('boost-show-btn');
            if (bar) bar.remove();
            if (show) show.remove();
            return;
        }

        if (!document.getElementById('boost-show-btn')) {
            createShowButton();
        }
    }

    const observer = new MutationObserver(tick);

    function start() {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            tick();
        } else {
            setTimeout(start, 200);
        }
    }
    start();

    window.addEventListener('orientationchange', () => setTimeout(tick, 800));
    setInterval(tick, 3000);

    console.log('[Boosteroid Custom Control Bar] v3.0.0 ready');
})();
