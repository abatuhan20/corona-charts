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
  LineSeries,
} from '@syncfusion/ej2-react-charts';

function LineChart() {
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
    // Initialize an object to hold data grouped by continent
    const groupedData = {};

    // Group data by continent and calculate total cases and total deaths
    data.forEach((countryData) => {
      const continent = countryData.continent;
      if (!groupedData[continent]) {
        groupedData[continent] = {
          x: continent,
          cases: 0,
          deaths: 0,
        };
      }
      groupedData[continent].cases += countryData.cases;
      groupedData[continent].deaths += countryData.deaths;
    });

    // Convert the object into an array
    const dataArray = Object.values(groupedData);

    return dataArray;
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
      tooltip={{enable:true}}
      title='COVID-19 Total Cases and Deaths by Continent'
    >
      <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='cases'
          name='Total Cases'
          width={2}
          type='Line'
        />
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='deaths'
          name='Total Deaths'
          width={2}
          type='Line'
          fill='red'
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default LineChart;

//SAMPLE CODE
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, DataLabel, MultiColoredLineSeries, LineSeries } from '@syncfusion/ej2-react-charts';
// function App() {
//     const data = [{ x: 2005, y: 28, color: 'red' }, { x: 2006, y: 25, color: 'green' },
//         { x: 2007, y: 26, color: '#ff0097' }, { x: 2008, y: 27, color: 'crimson' },
//         { x: 2009, y: 32, color: 'blue' }, { x: 2010, y: 35, color: 'darkorange' }];
//     return <ChartComponent id='charts'>
//       <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category, MultiColoredLineSeries]}/>
//       <SeriesCollectionDirective>
//         <SeriesDirective dataSource={data} xName='x' yName='y' width={2} name='India' type='MultiColoredLine' pointColorMapping='color'>
//         </SeriesDirective>
//       </SeriesCollectionDirective>
//     </ChartComponent>;
// }
// ;
// export default App;
