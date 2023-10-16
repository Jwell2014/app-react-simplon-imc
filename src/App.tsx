import React, { useState } from 'react';
import './App.css';
import Inputimc from './composants/Inputimc';
import CalculerIMCButton from './composants/CalculerIMCButton';
import ResultIMC from './composants/ResultIMC';

function App() {
  const [inputTaille, setInputTaille] = useState<string>("")
  const [inputPoids, setInputPoids] = useState<string>("")

  const [imc, setIMC] = useState<string | null>(null);

  const calculateIMC = (taille: number, poids: number) => {
    // Formule de l'IMC : poids en kilogrammes / (taille en mètres)^2
    const tailleEnMetres = taille / 100; // Convertir la taille de cm en mètres
    return (poids / (tailleEnMetres * tailleEnMetres)).toFixed(2); // Résultat arrondi à 2 décimales
  };

  const handleCalculer = () => {
    const newIMC = calculateIMC(parseFloat(inputTaille), parseFloat(inputPoids));
    setIMC(newIMC);

    // Réinitialiser les champs ici
    setInputTaille("");
    setInputPoids("");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src='' alt='' />
        <h1>CALCULATEUR IMC</h1>
      </header>
      <Inputimc type='cm' genre='taille' inputValue={inputTaille} onInputChange={setInputTaille} />
      <Inputimc type='kg' genre='poids' inputValue={inputPoids} onInputChange={setInputPoids} />
      <div style={{ margin: '20px' }}>
        <CalculerIMCButton onCalculer={handleCalculer} />
      </div>
      <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <ResultIMC imc={imc} />
      </div>
      <div>
        <h2>Graphique sur 7 jours</h2>

      </div>
    </div>
  );
}

export default App;
