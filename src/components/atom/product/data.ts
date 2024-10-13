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
        tabText: 'Mô tả',
        badgeValue: null,
        badgeColor: '',
    },
    {
        id: 'tab-comments',
        tabHead: 'tabComments',
        tabText: 'Nhận xét',
        badgeValue: 10,
        badgeColor: 'purple',
    },
    {
        id: 'tab-QNA',
        tabHead: 'tabQNA',
        tabText: 'Hỏi đáp',
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
        text: 'Thanh Toán Online',
    },
    {
        id: 'service_2',
        icon: size_icon,
        text: 'Sản Phẩm Đa Dạng',
    },
    {
        id: 'service_3',
        icon: shipping_icon,
        text: 'Miễn Phí Vận Chuyển',
    },
    {
        id: 'service_4',
        icon: return_icon,
        text: 'Miễn Phí Đổi Trả',
    },
];
type ProductFilter = {
    id: string;
    title: string;
};

export const ProductFilterList: ProductFilter[] = [
    {
        id: 'prod_filter_1',
        title: 'Tops',
    },
    {
        id: 'prod_filter_2',
        title: 'Printed T-shirts',
    },
    {
        id: 'prod_filter_3',
        title: 'Plain T-shirts',
    },
    {
        id: 'prod_filter_4',
        title: 'Kurti',
    },
    {
        id: 'prod_filter_5',
        title: 'Boxers',
    },
    {
        id: 'prod_filter_6',
        title: 'Full sleeve T-shirts',
    },
    {
        id: 'prod_filter_7',
        title: 'Joggers',
    },
    {
        id: 'prod_filter_8',
        title: 'Payjamas',
    },
    {
        id: 'prod_filter_9',
        title: 'Jeans',
    },
];
