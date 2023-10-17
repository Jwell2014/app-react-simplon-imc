import React, { useState } from 'react';
import './App.css';
import Inputimc from './composants/Inputimc';
import CalculerIMCButton from './composants/CalculerIMCButton';
import ResultIMC from './composants/ResultIMC';
import imgIMC from './assets/imc.jpeg';
import result from './assets/result.jpeg'


function App() {
  const [inputTaille, setInputTaille] = useState<string>("")
  const [inputPoids, setInputPoids] = useState<string>("")

  const [imc, setIMC] = useState<string | null>(null);
  const [imcCategory, setIMCCategory] = useState<string>("");

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
    if (newIMC < "18.5") {
      setIMCCategory("insuffisance-ponderale");
    } else if (newIMC >= "18.5" && newIMC < "25") {
      setIMCCategory("corpulence-normale");
    } else if (newIMC >= "25" && newIMC < "30") {
      setIMCCategory("surpoids");
    } else if (newIMC > "30" || newIMC < "35") {
      setIMCCategory("obesite-modere")
    } else if (newIMC > "35" || newIMC < "40") {
      setIMCCategory("obesite-severe")
    } else if (newIMC > "40") {
      setIMCCategory("obesite-morbide")
    }
  };


  return (
    <div className="App">
      <div className='oneDiv'>

      </div>
      <header className="App-header">
        <img src={imgIMC} alt='logo' width="100%" />
        <h1>CALCULATEUR IMC</h1>
      </header>
      <img src={result} alt='' width="100%" />

      <div className='app-input'>
        <Inputimc type='cm' genre='taille' inputValue={inputTaille} onInputChange={setInputTaille} />
        <Inputimc type='kg' genre='poids' inputValue={inputPoids} onInputChange={setInputPoids} />
      </div>

      <div style={{ margin: '20px' }}>
        <CalculerIMCButton onCalculer={handleCalculer} />
      </div>
      <div className='divResult'>
        <ResultIMC imc={imc} />
      </div>
      <div>
        <h2>Graphique sur 7 jours</h2>

      </div>
    </div>
  );
}

export default App;
