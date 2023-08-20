import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from 'pages/contact';
import Charts from 'pages/charts';
import MapView from 'pages/map';
import "leaflet/dist/leaflet.css";
import { useQuery } from 'react-query';
import Layout from 'features/UI/Layout';
import covidCasesService from 'services/covidCases.service';

function App() {
  const { data: Countries, isLoading } = useQuery(
    ['country'],
    () => covidCasesService.getCountry(`countries`),
    {
      onError: (error) => {

      },
    }
  );

  return (
    <BrowserRouter>
      <Layout>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/map" element={<MapView countries={Countries} isLoading={isLoading} />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
