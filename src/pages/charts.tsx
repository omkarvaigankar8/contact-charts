import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';
import { useQuery } from 'react-query';
import covidCasesService from 'services/covidCases.service';
import { Spinner } from "@material-tailwind/react";
ChartJS.register(CategoryScale);

const Charts = () => {
    const { data, isLoading } = useQuery(
        ['all-cases', { lastdays: '' }],
        () => covidCasesService.getByDate(`historical/all`, { lastdays: 'all' }),
        {
            onError: (error) => {
                // Handle error if needed
            },
        }
    );
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                beginAtZero: true,
            }
        },
    };
    const [caseData, setCaseData] = useState({
        labels: [] as string[],
        datasets: [{
            label: "Cases",
            data: [] as number[],
        }],
    });
    const [deathsData, setDeathsData] = useState({
        labels: [] as string[],
        datasets: [{
            label: "Deaths",
            data: [] as number[],
            backgroundColor: "red",
        }],
    });
    const [recoverData, setRecoverData] = useState({
        labels: [] as string[],
        datasets: [{
            label: "Recover",
            data: [] as number[],
            backgroundColor: "green",
        }],
    });

    useEffect(() => {
        if (data) {
            const casesEntries = Object.entries(data.cases);
            const labels = casesEntries.map(([date]) => date);
            const caseValues = casesEntries.map(([, value]) => value) as number[];

            setCaseData({
                labels,
                datasets: [{
                    label: "Cases",
                    data: caseValues,
                }],
            });

            const deathsEntries = Object.entries(data.deaths);
            const deathValues = deathsEntries.map(([, value]) => value) as number[];

            setDeathsData({
                labels,
                datasets: [{
                    label: "Deaths",
                    data: deathValues,
                    backgroundColor: "red",
                }],
            });

            const recoverEntries = Object.entries(data.recovered);

            const recoverValues = recoverEntries.map(([, value]) => value) as number[];
            // Filter out -20,00,000 from recoverValues
            const filteredRecoverValues = recoverValues.filter(value => value >= 0);

            setRecoverData({
                labels,
                datasets: [{
                    label: "Recover",
                    data: filteredRecoverValues,
                    backgroundColor: "green",
                }],
            });
        }
    }, [data]);


    return (
        <>

            {isLoading && <div className="container mx-auto flex items-end gap-8 spinner-container">
                <Spinner className="h-12 w-12" />
            </div>}
            {data && <div className='flex flex-col justify-center items-center'><h3 className=' mb-3 text-2xl font-bold'>Total Cases</h3> <Bar data={caseData} options={options} width={'5%'} height={'5%'} /></div>}
            {data && <div className='flex flex-col justify-center items-center mt-8'><h3 className=' mb-3 text-2xl font-bold'>Total Deaths</h3>  <Bar data={deathsData} options={options} width={'5%'} height={'5%'} /></div>}
            {data && <div className='flex flex-col justify-center items-center mt-8'><h3 className=' mb-3 text-2xl font-bold'>Total Recoveries</h3>  <Bar data={recoverData} options={options} width={'5%'} height={'5%'} /></div>}
        </>
    );
};

export default Charts;
