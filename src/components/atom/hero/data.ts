import hero1 from '@images/hero1.jpg';
// Định nghĩa kiểu cho một banner
interface Banner {
    id: string;
    topText: string;
    titleText: string;
    bottomText: string;
    buttonLink: string;
    buttonText: string;
    imgSource: string; // Giả sử imgSource là đường dẫn dạng string
}

// Mảng chứa dữ liệu banner
export const bannerData: Banner[] = [
    {
        id: 'banner-1',
        topText: 'T-shirt / Tops',
        titleText: 'Summer Value Pack',
        bottomText: 'cool / colorful / comfy',
        buttonLink: '/',
        buttonText: 'Shop Now',
        imgSource: hero1,
    },
    {
        id: 'banner-2',
        topText: 'Quality / Branded',
        titleText: 'Season Of Offers',
        bottomText: 'offers / heavy discount / coupons',
        buttonLink: '/',
        buttonText: 'Shop Now',
        imgSource: hero1,
    },
    {
        id: 'banner-3',
        topText: 'Seasonal Attire / Collection',
        titleText: 'New Arrivals & Special',
        bottomText: 'stylish / trendy',
        buttonLink: '/',
        buttonText: 'Shop Now',
        imgSource: hero1,
    },
    {
        id: 'banner-4',
        topText: 'Party & Wedding Dress',
        titleText: 'Fashionable Choice for Occasion',
        bottomText: 'offers / discounts / coupons',
        buttonLink: '/',
        buttonText: 'Shop Now',
        imgSource: hero1,
    },
];
