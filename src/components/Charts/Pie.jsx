import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
} from '@syncfusion/ej2-react-charts';

function PieChart() {
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
        };
        groupedData.push(existingData);
      }

      existingData.cases += countryData.cases;
    });

    return groupedData;
  };

  const formatData = (data) => {
    const totalCases = data.reduce((acc, curr) => acc + curr.cases, 0);

    return data.map((item) => {
      const percentage = ((item.cases / totalCases) * 100).toFixed(2);
      return {
        x: `${item.x} (${percentage}%)`,
        y: item.cases,
      };
    });
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  const formattedData = formatData(data);

  return (
    <AccumulationChartComponent
      id='pie-chart'
      title='COVID-19 Cases by Continent'
      legendSettings={{ visible: true }}
      enableSmartLabels={true}
      enableAnimation={true}
      width='1000px'
      center={{ x: '50%', y: '50%' }}
      tooltip={{
        enable: true,
        format: '<b>${point.x}</b><br> ${point.y} cases',
        header: '',
      }}
    >
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationTooltip,
          AccumulationDataLabel,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={formattedData}
          name='Data'
          xName='x'
          yName='y'
          explode={true}
          explodeOffset='10%'
          explodeIndex={0}
          dataLabel={{
            visible: true,
            position: 'Outside',
            name: 'x',
            font: { fontWeight: '600' },
            connectorStyle: { length: '20px', type: 'Curve' },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
}

export default PieChart;


// SAMPLE CODE FOR PIE
// import * as React from 'react';
// import { useEffect } from 'react';
// import { Browser } from '@syncfusion/ej2-base';
// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
// export let data1 = Browser.isDevice ?
//     [{ 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
//         { 'x': 'Safari', y: 4.73, text: Browser.isDevice ? 'Safari <br> 4.73%' : 'Safari: 4.73%' },
//         { 'x': 'Opera', y: 6.12, text: 'Opera: 6.12%' },
//         { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
//         { 'x': 'Others', y: 22.39, text: 'Others: 22.39%' }] :
//     [
//         { 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
//         { 'x': 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
//         { 'x': 'Opera', y: 3.12, text: 'Opera: 3.12%' },
//         { 'x': 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
//         { 'x': 'QQ', y: 3.96, text: 'QQ: 3.96%' },
//         { 'x': 'Safari', y: 4.73, text: 'Safari: 4.73%' },
//         { 'x': 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
//         { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
//         { 'x': 'Others', y: 9.57, text: 'Others: 9.57%' }
//     ];
// const SAMPLE_CSS = `
//     .control-fluid {
//         padding: 0px !important;
//     }
//     .pie-chart {
//         align :center
//     }`;
// const Pie = () => {
//     const onChartLoad = (args) => {
//         document.getElementById('pie-chart').setAttribute('title', '');
//     };
//     const load = (args) => {
//         let selectedTheme = location.hash.split('/')[1];
//         selectedTheme = selectedTheme ? selectedTheme : 'Material';
//         args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
//     };
//     return (<div className='control-pane'>
//             <style>{SAMPLE_CSS}</style>
//             <div className='control-section row'>
//                 <AccumulationChartComponent id='pie-chart' title='Browser Market Share' load={load.bind(this)} legendSettings={{ visible: false }} enableSmartLabels={true} enableAnimation={false} center={{ x: '50%', y: '50%' }} enableBorderOnMouseMove={false} tooltip={{ enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" }} loaded={onChartLoad.bind(this)}>
//                     <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]}/>
//                     <AccumulationSeriesCollectionDirective>
//                         <AccumulationSeriesDirective dataSource={data1} name='Browser' xName='x' yName='y' explode={true} explodeOffset='10%' explodeIndex={0} startAngle={Browser.isDevice ? 55 : 35} dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }} radius={Browser.isDevice ? '40%' : '70%'}/>
//                     </AccumulationSeriesCollectionDirective>
//                 </AccumulationChartComponent>
//             </div>
//         </div>);
// };
// export default Pie;