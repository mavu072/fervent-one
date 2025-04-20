export const standardScreenWidth = '280px';
export const largeScreenWidth = '300px';
export const collapsedWidth = '72px';

export function openSidebar() {
    if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
}

export function closeSidebar() {
    if (typeof window !== 'undefined') {
        document.documentElement.style.removeProperty('--SideNavigation-slideIn');
        document.body.style.removeProperty('overflow');
    }
}

export function toggleSidebar() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const slideIn = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--SideNavigation-slideIn');
        if (slideIn) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
}

export function toggleSidebarWidth() {
    if (typeof window !== 'undefined') {
        const rootElement = document.querySelector(':root');
        const sidebarWidth = window.getComputedStyle(rootElement)
                              .getPropertyValue('--Sidebar-width');
        if (sidebarWidth === collapsedWidth) {
            rootElement.style.setProperty('--Sidebar-width', largeScreenWidth);
        } else {
            rootElement.style.setProperty('--Sidebar-width', collapsedWidth);
        }
    }
}

/**
 * Retrieves sidebar collapse preference from the local storage, returns false if not found.
 * @returns Collapse Preference
 */
export function getSidebarCollapsePreference() {
    const collapsed = localStorage.getItem('sidebarCollapsed');
    return collapsed && collapsed === 'true' ? true : false;
}

/**
 * Saves sidebar collapse preference in the local storage.
 * @param {boolean} collapsed Collapse Preference
 */
export function saveSidebarCollapsePreference(collapsed) {
    localStorage.setItem('sidebarCollapsed', ''+ collapsed);
}