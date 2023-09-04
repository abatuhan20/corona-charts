import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CovidData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedContinent, setExpandedContinent] = useState(null);


  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  // Group countries by continent
  const groupedData = data.reduce((acc, country) => {
    const continent = country.continent || 'Unknown'; // Use 'Unknown' if continent is missing
    if (!acc[continent]) {
      acc[continent] = [];
    }
    acc[continent].push(country);
    return acc;
  }, {});

  const toggleContinent = (continent) => {
    if (expandedContinent === continent) {
      setExpandedContinent(null);
    } else {
      setExpandedContinent(continent);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-semibold mb-4">Covid-19 Data by Continent</h2>
    {Object.keys(groupedData).map((continent) => (
      <div key={continent} className="mb-4">
        <h3
          className={`text-xl font-semibold mb-2 cursor-pointer text-green-500 hover:underline hover:opacity-100 transition-opacity ${
            expandedContinent === continent ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() => toggleContinent(continent)}
        >
          {continent}
        </h3>
        <ul className={`list-disc ml-6 transition-max-height overflow-scroll ${
          expandedContinent === continent ? 'max-h-96' : 'max-h-0'
        }`}>
          {groupedData[continent].map((country) => (
            <li key={country.country} className="mb-2">
              <div className="bg-gray-200 p-2 rounded-lg shadow-md">
                <strong className="text-lg">{country.country}:</strong> Cases: {country.cases}, Deaths: {country.deaths}
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  );
}

export default CovidData;

/* EXAMPLE RESPONSE
active
: 
11620
activePerOneMillion
: 
285.12
cases
: 
225247
casesPerOneMillion
: 
5527
continent
: 
"Asia"
country
: 
"Afghanistan"
countryInfo
: 
{_id: 4, iso2: 'AF', iso3: 'AFG', lat: 33, long: 65, …}
critical
: 
0
criticalPerOneMillion
: 
0
deaths
: 
7944
deathsPerOneMillion
: 
195
oneCasePerPeople
: 
181
oneDeathPerPeople
: 
5130
oneTestPerPeople
: 
31
population
: 
40754388
recovered
: 
205683
recoveredPerOneMillion
: 
5046.89
tests
: 
1296585
testsPerOneMillion
: 
31815
todayCases
: 
0
todayDeaths
: 
0
todayRecovered
: 
0
updated
: 
1693570872499 
*/