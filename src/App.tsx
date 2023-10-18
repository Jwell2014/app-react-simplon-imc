import React, { useEffect, useState } from 'react';
import './App.css';
import Inputimc from './composants/Inputimc';
import CalculerIMCButton from './composants/CalculerIMCButton';
import ResultIMC from './composants/ResultIMC';
import imgIMC from './assets/imc.jpeg';
import result from './assets/result.jpeg'
import axios from 'axios';


function App() {
  const [inputTaille, setInputTaille] = useState<string>("")
  const [inputPoids, setInputPoids] = useState<string>("")

  const [imc, setIMC] = useState<number | null>(null);
  const [imcCategory, setIMCCategory] = useState<string>("");

  const [data, setData] = useState<Array<{ Id: number; taille: number; poids: number; imc: number }>>([]);
  const [loading, setLoading] = useState(true);

  const [lastMeasure, setLastMeasure] = useState<{ Id: number; taille: number; poids: number; imc: number }>();


  useEffect(() => {
    // Effectuer la requête GET une fois que le composant est monté
    axios.get('https://localhost:7200/api/MesureControleur')
      .then(response => {
        // Ici, 'response.data' contient les données récupérées depuis le backend.
        setData(response.data);
        setLoading(false); // Mettre fin au chargement une fois les données récupérées.
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données : ', error);
        setLoading(false); // Assurez-vous de gérer les erreurs.
      });
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois (après le montage).

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  const calculateIMC = (taille: number, poids: number) => {
    // Formule de l'IMC : poids en kilogrammes / (taille en mètres)^2
    const tailleEnM = parseInt(inputTaille) / 100; // Convertir la taille en mètres
    return (poids / (tailleEnM * tailleEnM)).toFixed(2); // Résultat arrondi à 2 décimales
  };

  const handleCalculer = () => {
    const taille = parseInt(inputTaille);
    const poids = parseInt(inputPoids);
    const imc = calculateIMC(taille, poids)
    const imcINT = parseInt(imc)

    console.log("tailleEnM", taille)
    console.log("poids", poids)
    console.log("imc", imcINT)


    const NewMesure = {
      taille: taille,
      poids: poids,
      imc: imcINT

    };

    axios.post('https://localhost:7200/api/MesureControleur', NewMesure)
      .then(response => {
        // Traitement de la réponse ici
        console.log(response.data); // Les données de la réponse
        // Mise à jour de l'état de la dernière mesure
        setLastMeasure(response.data);

        // Réinitialiser les champs ici
        setInputTaille('');
        setInputPoids('');
        setIMC(response.data.imc);
        const newMeasure = response.data; // La nouvelle mesure ajoutée

        // Ajouter la nouvelle mesure au tableau de données
        setData([...data, newMeasure]);
      })
      .catch(error => {
        // Gestion des erreurs
        console.error(error);
      });

    // if (newIMC < "18.5") {
    //   setIMCCategory("insuffisance-ponderale");
    // } else if (newIMC >= "18.5" && newIMC < "25") {
    //   setIMCCategory("corpulence-normale");
    // } else if (newIMC >= "25" && newIMC < "30") {
    //   setIMCCategory("surpoids");
    // } else if (newIMC > "30" || newIMC < "35") {
    //   setIMCCategory("obesite-modere")
    // } else if (newIMC > "35" || newIMC < "40") {
    //   setIMCCategory("obesite-severe")
    // } else if (newIMC > "40") {
    //   setIMCCategory("obesite-morbide")
    // }
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
        <h1>Dernière mesure entrée :</h1>
        {lastMeasure && (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Taille</th>
                  <th>Poids</th>
                  <th>IMC</th>
                </tr>
              </thead>
              <tbody>

                <tr >
                  <td>{lastMeasure.taille}</td>
                  <td>{lastMeasure.poids}</td>
                  <td>{lastMeasure.imc}</td>
                </tr>

              </tbody>
            </table>
          </div>
        )}
      </div>
      <h1 >Données récupérées sur 7 jours :</h1>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Taille</th>
              <th>Poids</th>
              <th>IMC</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 7).map(item => (
              <tr key={item.Id}>
                <td>{item.taille}</td>
                <td>{item.poids}</td>
                <td>{item.imc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Toutes les données :</h1>
        <ul>
          {data.map(item => (
            <div>
              <li key={item.Id}> Taille : {item.taille} Poids : {item.poids} IMC : {item.imc}</li>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h2>Graphique sur 7 jours</h2>

      </div>
    </div>
  );
}

export default App;
