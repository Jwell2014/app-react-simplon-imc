import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './composants/Navigate';
import SevenImc from './composants/SevenImc';
import AllImc from './composants/AllImc';
import Home from './composants/Home';
import Charts from './composants/Charts';

function App() {
  const [inputTaille, setInputTaille] = useState<string>("");
  const [inputPoids, setInputPoids] = useState<string>("");
  const [imc, setIMC] = useState<number | null>(null);
  const [mesureData, setMesureData] = useState<Array<{ Id: number; taille: number; poids: number; imc: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [lastMeasure, setLastMeasure] = useState<{ Id: number; taille: number; poids: number; imc: number }>();
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    axios.get('https://localhost:7200/api/MesureControleur')
      .then(response => {
        setMesureData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données : ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  const calculateIMC = (taille: number, poids: number) => {
    const tailleEnM = parseInt(inputTaille) / 100;
    return (poids / (tailleEnM * tailleEnM)).toFixed(2);
  };

  const handleCalculer = () => {
    const taille = parseInt(inputTaille);
    const poids = parseInt(inputPoids);
    const imc = calculateIMC(taille, poids);
    const imcINT = parseInt(imc);

    const NewMesure = {
      taille: taille,
      poids: poids,
      imc: imcINT,
    };

    axios.post('https://localhost:7200/api/MesureControleur', NewMesure)
      .then(response => {
        console.log(response.data);
        const updatedMesureData = [...mesureData, response.data];
        setLastMeasure(response.data);
        setInputTaille('');
        setInputPoids('');
        setIMC(response.data.imc);
        const newMeasure = response.data;
        setMesureData([...mesureData, newMeasure]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home inputTaille={inputTaille} inputPoids={inputPoids} imc={imc} setInputTaille={setInputTaille} setInputPoids={setInputPoids} handleCalculer={handleCalculer} />} />
          <Route path="/sevenImc" element={<SevenImc mesureData={mesureData} />} />
          <Route path="/allImc" element={<AllImc mesureData={mesureData} />} />
          <Route path="/charts" element={<Charts showChart={showChart} mesureData={mesureData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
