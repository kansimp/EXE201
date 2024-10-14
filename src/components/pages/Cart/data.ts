import cart1 from '@images/gaubong.jpg';
import cart2 from '@images/keptoc.jpg';
import cart3 from '@images/mockhoa.jpg';

export type CartItems = {
    id: string;
    title: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    shipping: number;
    imgSource: string; // Giả sử imgSource là đường dẫn string
};

// Mảng cartItems với kiểu CartItem[]
export const cartItems: CartItems[] = [
    {
        id: 'C001',
        title: 'Blue Flower Print Crop Top',
        color: 'Yellow',
        size: 'M',
        price: 29.0,
        quantity: 2,
        shipping: 0.0,
        imgSource: cart1,
    },
    {
        id: 'C002',
        title: 'Blue Flower Print Crop Top',
        color: 'Blue',
        size: 'XL',
        price: 199.0,
        quantity: 5,
        shipping: 0.0,
        imgSource: cart2,
    },
    {
        id: 'C003',
        title: 'Blue Flower Print Crop Top',
        color: 'Yellow',
        size: 'M',
        price: 123.0,
        quantity: 1,
        shipping: 5.0,
        imgSource: cart3,
    },
];
