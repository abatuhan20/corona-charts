import * as React from "react";
import { useEffect, useState } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, DataLabel, Tooltip, Legend, RangeColorSettingsDirective, RangeColorSettingDirective } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const color1 = ['#F9D422'];
const color2 = ['#F28F3F'];
const color3 = ['#E94F53'];

const ColumnChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the COVID API
    fetch('https://disease.sh/v3/covid-19/continents')
      .then((response) => response.json())
      .then((data) => {
        // Extract and format the "recovered" data
        const chartData = data.map((continentData) => ({
          x: continentData.continent,
          recovered: continentData.recovered,
        }));

        // Sort chartData by "recovered" in descending order
        chartData.sort((a, b) => b.recovered - a.recovered);

        setChartData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onChartLoad = (args) => {
    let chart = document.getElementById('charts');
    chart.setAttribute('title', '');
  };

  const load = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };
  
  const getGradientColor = (recovered) => {
    const maxRecovered = chartData[0].recovered;
    const minRecovered = chartData[chartData.length - 1].recovered;
  
    const percentage = (recovered - minRecovered) / (maxRecovered - minRecovered);
  
    const color = getColorBetweenRange(percentage, color1[0], color3[0]);
    return [color];
  };
  
  const getColorBetweenRange = (percentage, color1, color2) => {
    const hex = (color) => {
      const intColor = parseInt(color.slice(1), 16);
      const r = (intColor >> 16) & 255;
      const g = (intColor >> 8) & 255;
      const b = intColor & 255;
      return [r, g, b];
    };
  
    const rgb1 = hex(color1);
    const rgb2 = hex(color2);
  
    const r = Math.round(rgb1[0] + percentage * (rgb2[0] - rgb1[0]));
    const g = Math.round(rgb1[1] + percentage * (rgb2[1] - rgb1[1]));
    const b = Math.round(rgb1[2] + percentage * (rgb2[2] - rgb1[2]));
  
    return `rgb(${r},${g},${b})`;
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className='control-pane'>
      <style>{SAMPLE_CSS}</style>
      <div className='control-section'>
        <ChartComponent
          id='charts'
          style={{ textAlign: "center" }}
          primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }}
          primaryYAxis={{ lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}' }}
          title="COVID-19 Recovered Cases by Continent (High to Low)"
          loaded={onChartLoad.bind(this)}
          load={load.bind(this)}
          chartArea={{ border: { width: 0 } }}
          width={Browser.isDevice ? '100%' : '75%'}
          legendSettings={{ mode: 'Range', visible: true, toggleVisibility: false }}
        >
          <Inject services={[ColumnSeries, DataLabel, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={chartData}
              name='Recovered Cases'
              xName='x'
              yName='recovered'
              type='Column'
              animation={{ enable: false }}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
              marker={{ dataLabel: { visible: true, position: "Outer" } }}
            />
          </SeriesCollectionDirective>
            <RangeColorSettingsDirective>
            {chartData.map((item, index) => (
                <RangeColorSettingDirective
                key={index}
                label={`Recovered Cases ${item.recovered}`}
                start={item.recovered}
                end={item.recovered + 1}
                colors={getGradientColor(item.recovered)}
                />
            ))}
            </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default ColumnChart;
/**
 * Sample for RangeColumn series
 
import * as React from "react";
import { useEffect } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Highlight, DataLabel, Tooltip, Legend, RangeColorSettingsDirective, RangeColorSettingDirective } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
export let data = [
    { x: "Jan", y: 6 },
    { x: "Feb", y: 8.9 },
    { x: "Mar", y: 12 },
    { x: "Apr", y: 17.5 },
    { x: "May", y: 22.1 },
    { x: "June", y: 25 },
    { x: "July", y: 29.4 },
    { x: "Aug", y: 29.6 },
    { x: "Sep", y: 25.8 },
    { x: "Oct", y: 21.1 },
    { x: "Nov", y: 15.5 },
    { x: "Dec", y: 9.9 }
];
export const color1 = ['#F9D422'];
export const color2 = ['#F28F3F'];
export const color3 = ['#E94F53'];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RangeColorMapping = () => {
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} highlightMode='Point' highlightPattern='DiagonalForward' primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}°C' }} title="USA CLIMATE - WEATHER BY MONTH" loaded={onChartLoad.bind(this)} load={load.bind(this)} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ mode: 'Range', visible: true, toggleVisibility: false }}>
                    <Inject services={[ColumnSeries, Highlight, DataLabel, Tooltip, Category, Legend]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} name='USA' xName='x' yName='y' type='Column' animation={{ enable: false }} cornerRadius={{ topLeft: 10, topRight: 10 }} marker={{ dataLabel: { visible: true, position: "Outer" } }}/>
                    </SeriesCollectionDirective>
                    <RangeColorSettingsDirective>
                        <RangeColorSettingDirective label="1°C to 10°C" start={1} end={10} colors={color1}/>
                        <RangeColorSettingDirective label="11°C to 20°C" start={11} end={20} colors={color2}/>
                        <RangeColorSettingDirective label="21°C to 30°C" start={21} end={30} colors={color3}/>
                    </RangeColorSettingsDirective>
                </ChartComponent>
            </div>
        </div>);
};
export default RangeColorMapping; */