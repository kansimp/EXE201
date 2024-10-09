interface SideMenuItem {
    id: string;
    menuLink: string;
    menuText: string;
    iconName: string;
}

export const sideMenuData: SideMenuItem[] = [
    {
        id: 'side-menu-1',
        menuLink: '/',
        menuText: 'Home',
        iconName: 'house',
    },
    {
        id: 'side-menu-2',
        menuLink: '/product',
        menuText: 'Products',
        iconName: 'grid-fill',
    },
    {
        id: 'side-menu-3',
        menuLink: '/wishlist',
        menuText: 'Wishlist',
        iconName: 'heart',
    },
    {
        id: 'side-menu-4',
        menuLink: '/account',
        menuText: 'My Account',
        iconName: 'person-fill',
    },
    {
        id: 'side-menu-5',
        menuLink: '/cart',
        menuText: 'Cart',
        iconName: 'bag-check-fill',
    },
];
