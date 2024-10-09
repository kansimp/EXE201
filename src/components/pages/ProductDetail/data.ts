// Define types for the product object
import labubu from '@images/spmoi.jpg';
interface PreviewImage {
    id: string;
    imgSource: string;
}

interface Product {
    id: string;
    title: string;
    previewImages: PreviewImage[];
    rating: number;
    comments_count: number;
    sizes: string[];
    colors: string[];
    price: number;
}

// Static images placeholder, should be defined elsewhere
const staticImages = {
    preview1: labubu,
    preview2: labubu,
    preview3: labubu,
};

// Define the product_one object using the Product interface
export const product_one: Product = {
    id: 'product_01',
    title: 'Raven Hoodie With Black Colored Design',
    previewImages: [
        {
            id: 'preview1',
            imgSource: staticImages.preview1,
        },
        {
            id: 'preview2',
            imgSource: staticImages.preview2,
        },
        {
            id: 'preview3',
            imgSource: staticImages.preview3,
        },
        {
            id: 'preview4',
            imgSource: staticImages.preview1,
        },
        {
            id: 'preview5',
            imgSource: staticImages.preview2,
        },
    ],
    rating: 3.5,
    comments_count: 120,
    sizes: ['xs', 's', 'm', 'l', 'xl'],
    colors: ['#3C4242', '#EDD146', '#EB84B0', '#9C1F35'],
    price: 63.0,
};
