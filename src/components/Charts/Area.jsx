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
  AreaSeries,
} from '@syncfusion/ej2-react-charts';

function Area() {
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
      existingData.deaths += (countryData.deathsPerOneMillion * (countryData.cases / 1000000)); // Calculate total deaths
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
      title='COVID-19 Amount of Cases and Deaths'
      tooltip={{enable:true}}
    >
      <Inject services={[AreaSeries, Legend, Tooltip, DataLabel, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='cases'
          name='Total Cases'
          fill='#69D2E7'
          opacity={0.6}
          type='Area'
        />
        <SeriesDirective
          dataSource={data}
          xName='x'
          yName='deaths'
          name='Total Deaths'
          fill='#FF6666'
          opacity={0.6}
          type='Area'
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default Area;

// SAMPLE CODE
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import axios from "axios";
// import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, DataLabel, AreaSeries } from '@syncfusion/ej2-react-charts';
// function Area() {
//     const data = [
//         { x: 1900, y: 4 }, { x: 1920, y: 3.0 }, { x: 1940, y: 3.8 },
//         { x: 1960, y: 3.4 }, { x: 1980, y: 3.2 }, { x: 2000, y: 3.9 }
//     ];
//     const primaryxAxis = {
//         title: 'Year', minimum: 1900, maximum: 2000, interval: 10,
//         edgeLabelPlacement: 'Shift'
//     };
//     const primaryyAxis = { minimum: 2, maximum: 5, interval: 0.5, title: 'Sales Amount in Millions' };
//     return <ChartComponent id='charts' primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} title='Average Sales Comparison'>
//       <Inject services={[AreaSeries, Legend, Tooltip, DataLabel, Category]}/>
//       <SeriesCollectionDirective>
//         <SeriesDirective dataSource={data} xName='x' yName='y' name='Product A' fill='#69D2E7' opacity={0.6} type='Area'>
//         </SeriesDirective>
//       </SeriesCollectionDirective>
//     </ChartComponent>;
// }
// ;
// export default Area;
