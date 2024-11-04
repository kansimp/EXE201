import { useAppDispatch, useAppSelector } from '@redux/hook';
import { getAllOrderSeller } from '@redux/slices/dashboardSlice';
import { userProfile } from '@redux/slices/profileSlice';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { CSVLink, CSVDownload } from 'react-csv';

interface ChartOneState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ChartOneSeller: React.FC = () => {
    const listOrder = useAppSelector((state) => state.dashboard.listOrderSeller);
    const isLoading = useAppSelector((state) => state.dashboard.isLoadingSeller);
    const id = useAppSelector((state) => state.profile.user?.account_id);
    const shopId = useAppSelector((state) => state.profile.user?.shop_id);
    const [dayStart, setDayStart] = useState('');
    const [dayEnd, setDayEnd] = useState('');
    const dispatch = useAppDispatch();
    const options: ApexOptions = {
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            height: 335,
            type: 'area',
            dropShadow: {
                enabled: true,
                color: '#623CEA14',
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },

            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: 'straight',
        },
        // labels: {
        //   show: false,
        //   position: "top",
        // },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: '#fff',
            strokeColors: ['#3056D3', '#80CAEE'],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: 'category',
            categories: listOrder.map((order) => order.day),
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: '0px',
                },
            },
            min: 0,
            max: 500000,
        },
    };
    console.log('id', id);

    useEffect(() => {
        if (!id) {
            dispatch(userProfile());
        }
        const today: Date = new Date();
        const year: number = today.getFullYear();
        const month: string = String(today.getMonth() + 1).padStart(2, '0');
        const day: string = String(today.getDate()).padStart(2, '0');
        const dayend = `${year}-${month}-${day}`;

        const today1: Date = new Date();
        today1.setDate(today1.getDate() - 6);
        const year1: number = today1.getFullYear();
        const month1: string = String(today1.getMonth() + 1).padStart(2, '0');
        const day1: string = String(today1.getDate()).padStart(2, '0');
        const daystart = `${year1}-${month1}-${day1}`;

        if (id) {
            dispatch(
                getAllOrderSeller({ startDay: daystart, endDay: dayend, id: id as string, shopId: shopId as number }),
            );
        }
    }, [id]);
    let series = [
        {
            name: 'Doanh Thu',
            data: listOrder.map((order) => order.total_price),
        },
    ];

    const handleSubmit = () => {
        dispatch(getAllOrderSeller({ startDay: dayStart, endDay: dayEnd, id: id as string, shopId: shopId as number }));
    };
    const dataCSV = listOrder.map((order) => {
        return [order.day, order.total_price, (order.total_price * 0.95).toFixed(2)];
    });
    const totalCSV = listOrder.reduce((acc, order) => acc + order.total_price, 0);
    const totalAdmin = (totalCSV * 0.95).toFixed(2);

    const csvData = [['Ngày', 'Doanh Số Bán Hàng', 'Doanh Số Thực'], ...dataCSV, ['', totalCSV, totalAdmin]];

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-7 3xl:gap-8">
                    <div className="flex min-w-47">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ngày Bắt Đầu
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ngày Bắt Đầu"
                            onChange={(e) => setDayStart(e.target.value)}
                            value={dayStart}
                            required
                        />
                    </div>
                    <div className="flex min-w-47">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ngày Kết Thúc
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ngày Kết Thúc"
                            onChange={(e) => setDayEnd(e.target.value)}
                            value={dayEnd}
                            required
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        {isLoading === true ? 'Loading ...' : 'Xem'}
                    </button>
                </div>
                <div className="flex w-full max-w-45 items-end flex-col">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                            Ngày
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Tuần
                        </button>
                        <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Tháng
                        </button>
                    </div>
                    <CSVLink data={csvData} className="block mt-14">
                        <button className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Xuất File
                        </button>
                    </CSVLink>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart options={options} series={series} type="area" height={350} />
                </div>
            </div>
        </div>
    );
};

export default ChartOneSeller;
