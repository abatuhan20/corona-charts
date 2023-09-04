import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationTooltip,
  PyramidSeries,
  AccumulationSelection,
  AccumulationLegend,
} from '@syncfusion/ej2-react-charts';

const PyramidChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        const covidData = response.data;
        const continentData = groupByContinent(covidData);
        setData(continentData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const groupByContinent = (data) => {
    // Initialize an array to hold data grouped by continent
    const groupedData = [];

    // Group data by continent and calculate total cases
    data.forEach((countryData) => {
      const continent = countryData.continent;
      if (!groupedData[continent]) {
        groupedData[continent] = {
          x: continent,
          y: 0,
        };
      }
      groupedData[continent].y += countryData.cases;
    });

    // Convert the object into an array
    const dataArray = Object.values(groupedData);

    return dataArray;
  };

  const onChartLoad = (args) => {
    document.getElementById('pyramid-chart').setAttribute('title', '');
  };

  const load = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <AccumulationChartComponent
          legendSettings={{ visible: false }}
          id='pyramid-chart'
          title='COVID-19 Total Cases by Continent'
          load={load.bind(this)}
          tooltip={{ enable: true, format: '${point.x} : <b>${point.y} Cases</b>' }}
          loaded={onChartLoad.bind(this)}
        >
          <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection, AccumulationLegend]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data}
              xName='x'
              yName='y'
              type='Pyramid'
              width={'45%'}
              height='80%'
              neckWidth='15%'
              gapRatio={0.03}
              explode={true}
              emptyPointSettings={{ mode: 'Drop', fill: 'red' }}
              dataLabel={{
                visible: true,
                position: 'Outside',
                name: 'x',
                font: { fontWeight: '600' },
                connectorStyle: { length: '20px' },
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default PyramidChart;
// SAMPLE CHART
// import * as React from 'react';
// import { useEffect } from 'react';
// import { Browser } from '@syncfusion/ej2-base';
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection, AccumulationLegend } from '@syncfusion/ej2-react-charts';
// export let data1 = [
//     { x: 'Milk, Youghnut, Cheese', y: 435, text: Browser.isDevice ? 'Milk, Youghnut,<br> Cheese:  435 cal' : 'Milk, Youghnut, Cheese: 435 cal' },
//     { x: 'Vegetables', y: 470, text: 'Vegetables: 470 cal' },
//     { x: 'Meat, Poultry, Fish', y: 475, text: Browser.isDevice ? 'Meat, Poultry,<br> Fish: 475 cal' : 'Meat, Poultry, Fish: 475 cal' },
//     { x: 'Rice, Pasta', y: 930, text: Browser.isDevice ? 'Rice, Pasta:<br> 930 cal' : ' Rice, Pasta: 930 cal' },
//     { x: 'Fruits', y: 520, text: Browser.isDevice ? 'Fruits: <br> 520 cal' : 'Fruits: 520 cal' }
// ];
// const SAMPLE_CSS = `
//     .control-fluid {
//         padding: 0px !important;
//     }
//     .pyramid-chart {
//         align :center
//     }`;
// const Pyramid = () => {
//     const onChartLoad = (args) => {
//         document.getElementById('pyramid-chart').setAttribute('title', '');
//     };
//     const load = (args) => {
//         let selectedTheme = location.hash.split('/')[1];
//         selectedTheme = selectedTheme ? selectedTheme : 'Material';
//         args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
//     };
//     return (<div className='control-pane'>
//             <style>{SAMPLE_CSS}</style>
//             <div className='control-section'>
//                 <AccumulationChartComponent legendSettings={{ visible: false }} id='pyramid-chart' ref={pyramid => pyramid = pyramid} title='Food Comparison Chart' load={load.bind(this)} tooltip={{ enable: true, format: '${point.x} : <b>${point.y} cal</b>' }} loaded={onChartLoad.bind(this)}>
//                     <Inject services={[AccumulationDataLabel, AccumulationTooltip, PyramidSeries, AccumulationSelection, AccumulationLegend]}/>
//                     <AccumulationSeriesCollectionDirective>
//                         <AccumulationSeriesDirective dataSource={data1} xName='x' yName='y' type='Pyramid' width={'45%'} height='80%' neckWidth='15%' gapRatio={0.03} explode={true} emptyPointSettings={{ mode: 'Drop', fill: 'red' }} dataLabel={{ visible: true, name: 'text', position: 'Outside', connectorStyle: { length: '20px' }, font: { fontWeight: '600' } }}/>
//                     </AccumulationSeriesCollectionDirective>
//                 </AccumulationChartComponent>
//             </div>
//         </div>);
// };
// export default Pyramid;