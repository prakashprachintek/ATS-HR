import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'ADDONS',
        items: ['applicants', 'jobs'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    applicants: {
        icon: 'columns',
        text: 'Applicants',
        link: '/applicants',
    },
    jobs: {
        icon: 'table',
        text: 'Share Jobs',
        link: '/jobs',
    },
    // logout: {
    //     icon: 'sign-out-alt',
    //     text: 'Logout',
    //     link: '/auth/login',
    // },
};
