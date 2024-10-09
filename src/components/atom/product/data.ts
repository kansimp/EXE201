import card_icon from '@icons/card_icon.svg';
import size_icon from '@icons/size_icon.svg';
import shipping_icon from '@icons/shipping_icon.svg';
import return_icon from '@icons/return_icon.svg';

interface TabHead {
    id: string;
    tabHead: string;
    tabText: string;
    badgeValue: number | null;
    badgeColor: string;
}

export const productDescriptionTabHeads: TabHead[] = [
    {
        id: 'tab-description',
        tabHead: 'tabDescription',
        tabText: 'Description',
        badgeValue: null,
        badgeColor: '',
    },
    {
        id: 'tab-comments',
        tabHead: 'tabComments',
        tabText: 'User Comments',
        badgeValue: 10,
        badgeColor: 'purple',
    },
    {
        id: 'tab-QNA',
        tabHead: 'tabQNA',
        tabText: 'Question & Answer',
        badgeValue: 4,
        badgeColor: 'outerspace',
    },
];

interface Service {
    id: string; // Change to string as IDs are strings in your data
    icon: string; // Assuming icon paths are strings
    text: string;
}

export const servicesData: Service[] = [
    {
        id: 'service_1',
        icon: card_icon,
        text: 'Secure Payment',
    },
    {
        id: 'service_2',
        icon: size_icon,
        text: 'Size & fit',
    },
    {
        id: 'service_3',
        icon: shipping_icon,
        text: 'Free Shipping',
    },
    {
        id: 'service_4',
        icon: return_icon,
        text: 'Free Shipping & Returns',
    },
];
