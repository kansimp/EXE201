import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '@redux/hook';

interface ChartTwoState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ChartTwoSeller: React.FC = () => {
    const listOrder = useAppSelector((state) => state.dashboard.listOrderSeller);

    const options: ApexOptions = {
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'bar',
            height: 335,
            stacked: true,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        responsive: [
            {
                breakpoint: 1536,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '25%', // Adjust the column width as needed
                        },
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%', // You can adjust this as needed
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: listOrder.map((order) => order.day),
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            fontFamily: 'Satoshi',
            fontWeight: 500,
            fontSize: '14px',

            markers: {
                shape: 'circle',
            },
        },
        fill: {
            opacity: 1,
        },
    };
    let series = [
        {
            name: 'Hoa Hồng',
            data: listOrder.map((order) => parseFloat((order.total_price * 0.95).toFixed(2))),
        },
    ];

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                    <h4 className="text-xl font-semibold text-black dark:text-white mb-6 p-4">
                        Đồ Thị Biểu Thị Doanh Số Thực
                    </h4>
                </div>
            </div>

            <div>
                <div id="chartTwo" className="-ml-5 -mb-9">
                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                </div>
            </div>
        </div>
    );
};

export default ChartTwoSeller;
