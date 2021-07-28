
import {  CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map'
import TableData from './TableData'
import { sortData } from './util';
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"
import { prettyPrintStat } from './util';

function App() {

  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData]=useState([])

  const [mapCenter, setmapCenter] = useState({lat:27.2046,lng:77.4977});
  const [mapZoom, setmapZoom] = useState(3)
  const [mapCountries, setmapCountries] = useState([])
  const [casesType, setcasesType] = useState("cases")

  useEffect(()=>{

    fetch("https://disease.sh/v3/covid-19/all").then(response=>response.json()).then(data=>{
      setCountryInfo(data);
    })

  },[])

  useEffect(()=>{
    const getCountriesData=async()=>{
     await fetch("https://disease.sh/v3/covid-19/countries")
     .then((response)=>response.json())
     .then((data)=>{
       const countries=data.map(country=>(
         {
           name:country.country,
           value:country.countryInfo.iso2
         }
       ));
       const sortedData=sortData(data)
       setTableData(sortedData);
       setCountries(countries);
       setmapCountries(data);

      


     })

    }
    
   getCountriesData();

  },[])  


  const onCountryChange= async(event)=>{
    const countryCode=event.target.value;

    const url= countryCode ==='Worldwide'?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
      setmapCenter([data.countryInfo.lat, data.countryInfo.long])
      console.log(">>>>>>>>>>>>>>>>>>>>>>.lat long",mapCenter)
      setmapZoom(5)


    })
  }
  
  return (
    <div className="app">
      <div className="app__left">

   
      <div className="app__header">
      <h1 className="app">COVID-19 TRACKER</h1>

    

      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country} >
          <MenuItem value="Worldwide">Worldwide</MenuItem>

          {countries.map(country=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
         
        </Select>
      </FormControl>

      </div>

      <div className="app__stats">
        <InfoBox isRed onClick={e=>setcasesType("cases")}
         title="Coronavirus Cases"
          cases={prettyPrintStat(countryInfo.todayCases)}
         total={prettyPrintStat(countryInfo.cases)}
         active={casesType==="cases"}/>

        <InfoBox  onClick={e=>setcasesType("recovered")} title="Recovered"  cases={prettyPrintStat(countryInfo.todayRecovered)}
         total={prettyPrintStat(countryInfo.recovered)}
         active={casesType==="recovered"}></InfoBox>

        <InfoBox isRed onClick={e=>setcasesType("deaths")} title="Deaths"  cases={prettyPrintStat(countryInfo.todayDeaths)} 
        total={prettyPrintStat(countryInfo.deaths)}
        active={casesType==="deaths"}></InfoBox>

      </div>

     <Map
     casesType={casesType}
     countries={mapCountries}

     center={mapCenter}
     zoom={mapZoom}
     
     />
     </div>

     
        <div >
          <Card className="app__right">
            <CardContent>
              <h3>Live cases by Country</h3>

              <TableData countries={tableData}/>
              <h3 className ="app__graphTitle"> Worldwide new {casesType}</h3>
              <LineGraph className="app_graph" casesType={casesType}/>

            </CardContent>
          </Card>

        </div>
    </div>
  );
}

export default App;
