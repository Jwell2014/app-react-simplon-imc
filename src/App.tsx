import React, { useState } from 'react';
import './App.css';
import Inputimc from './composants/Inputimc';
import CalculerIMCButton from './composants/CalculerIMCButton';
import ResultIMC from './composants/ResultIMC';

function App() {
  const [inputTaille, setInputTaille] = useState<string>("")
  const [inputPoids, setInputPoids] = useState<string>("")

  const [imc, setIMC] = useState<string | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src='' alt='' />
        <h1>CALCULATEUR IMC</h1>
      </header>
      <Inputimc type='cm' genre='taille' inputData={setInputTaille} />
      <Inputimc type='kg' genre='poids' inputData={setInputPoids} />
      <div style={{ margin: '20px' }}>
        <CalculerIMCButton
          inputTaille={inputTaille}
          inputPoids={inputPoids}
          onCalculer={setIMC}
          setInputTaille={setInputTaille}
          setInputPoids={setInputPoids}
        />
      </div>
      <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        {/* <h2>RÉSULTAT</h2>
        {imc !== null && (
          <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
            <p>Indice de masse corporelle (IMC)</p>
            <p>{imc}</p>
            <p>Interprétation (d'après l'OMS)</p>
            {imc < "18.5" && (
              <p>Insuffisance pondérale (maigreur)</p>
            )}
          </div>
        )} */}
        <ResultIMC imc={imc} />
      </div>
      <div>
        <h2>Graphique sur 7 jours</h2>

      </div>
    </div>
  );
}

export default App;
