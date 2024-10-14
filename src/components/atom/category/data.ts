import nen from '@images/nen.jpg';
import gauBong from '@images/gaubong.jpg';
import mocKhoa from '@images/mockhoa.jpg';
import kepToc from '@images/keptoc.jpg';
import tuiSach from '@images/tuisach.jpg';
import coc from '@images/coc.jpg';
interface NewArrival {
    id: string;
    imgSource: string;
    title: string;
}

export const newArrivalData: NewArrival[] = [
    {
        id: 'new-arrival-1',
        imgSource: nen,
        title: 'Nến Thơm',
    },
    {
        id: 'new-arrival-2',
        imgSource: gauBong,
        title: 'Gấu Bông',
    },
    {
        id: 'new-arrival-3',
        imgSource: mocKhoa,
        title: 'Móc Khóa',
    },
    {
        id: 'new-arrival-4',
        imgSource: kepToc,
        title: 'Kẹp Tóc',
    },
    {
        id: 'new-arrival-5',
        imgSource: tuiSach,
        title: 'Túi Sách',
    },
    {
        id: 'new-arrival-6',
        imgSource: coc,
        title: 'Cốc',
    },
];
