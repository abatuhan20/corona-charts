import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  BarSeries,
} from '@syncfusion/ej2-react-charts';

function BarChart() {
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

    // Group data by continent
    data.forEach((countryData) => {
      const continent = countryData.continent;
      let existingData = groupedData.find((item) => item.x === continent);

      if (!existingData) {
        existingData = {
          x: continent,
          cases: 0,
          deaths: 0,
        };
        groupedData.push(existingData);
      }

      existingData.cases += countryData.cases;
      existingData.deaths += countryData.deaths;
    });

    return groupedData;
  };

  const primaryxAxis = {
    title: 'Continents',
    valueType: 'Category',
  };

  const primaryyAxis = {
    title: 'Count',
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <ChartComponent
      id='charts'
      primaryXAxis={primaryxAxis}
      primaryYAxis={primaryyAxis}
      legendSettings={ {enableHighlight:true}}
      tooltip={{enable:true}}
      title='COVID-19 Cases and Deaths by Continent'
    >
      <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='cases'
          name='Total Cases'
          fill='#69D2E7'
          type='Bar'
          width={2}
        />
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='deaths'
          name='Total Deaths'
          fill='#FF6666'
          type='Bar'
          width={2}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default BarChart;


// /**
//  * Sample for Bar series
//  */
// import * as React from "react";
// import { useEffect } from 'react';
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, DataLabel, BarSeries, Category, Legend, Tooltip, Highlight } from '@syncfusion/ej2-react-charts';
// import { Browser } from '@syncfusion/ej2-base';
// export let data1 = [
//     { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
//     { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
// ];
// export let data2 = [
//     { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
//     { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
// ];
// const SAMPLE_CSS = `
//     .control-fluid {
//         padding: 0px !important;
//     }`;
// /**
//  * Bar sample
//  */
// const Bar = () => {
//     const onChartLoad = (args) => {
//         let chart = document.getElementById('charts');
//         chart.setAttribute('title', '');
//     };
//     const load = (args) => {
//         let selectedTheme = location.hash.split('/')[1];
//         selectedTheme = selectedTheme ? selectedTheme : 'Material';
//         args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
//     };
//     return (<div className='control-pane'>
//             <style>{SAMPLE_CSS}</style>
//             <div className='control-section'>
//                 <div>
//                     <ChartComponent
//                         id='charts'
//                         style={{ textAlign: "center" }}
//                         legendSettings={{ enableHighlight: true }}
//                         primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
//                         primaryYAxis={{
//                             labelFormat: '{value}%',
//                             title: 'GDP (In Percentage)',
//                             edgeLabelPlacement: 'Shift',
//                             majorTickLines: { width: 0 },
//                             lineStyle: { width: 0 }
//                         }}
//                         chartArea={{ border: { width: 0 } }}
//                         load={load.bind(this)}
//                         width='500px' // Set the width to 100%
//                         height='400px' // Set the height to your desired value, e.g., '400px'
//                         title='GDP by Country in 2017'
//                         loaded={onChartLoad.bind(this)}
//                         tooltip={{ enable: true }}
//                         >
//                         <Inject services={[BarSeries, DataLabel, Category, Legend, Tooltip, Highlight]}/>
//                         <SeriesCollectionDirective>
//                             <SeriesDirective dataSource={data1} xName='x' yName='y' type='Bar' columnSpacing={0.1} name='GDP' width={2}/>
//                             <SeriesDirective dataSource={data2} xName='x' yName='y' type='Bar' columnSpacing={0.1} name="Share in World's GDP" width={2}/>
//                         </SeriesCollectionDirective>
//                     </ChartComponent>
//                 </div>
//                 <div style={{ float: 'right', marginRight: '10px' }}>
//                     Source: &nbsp; <a href="https://www.gov.uk/" target='_blank'>www.gov.uk</a>
//                 </div>
//             </div>
//         </div>);
// };
// export default Bar;