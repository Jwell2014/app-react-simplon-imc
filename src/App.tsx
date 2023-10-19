import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './composants/Navigate';
import SevenImc from './composants/SevenImc';
import AllImc from './composants/AllImc';
import Home from './composants/Home';
import Charts from './composants/Charts';



function App() {
  const [inputTaille, setInputTaille] = useState<string>("")
  const [inputPoids, setInputPoids] = useState<string>("")

  const [imc, setIMC] = useState<number | null>(null);

  const [mesureData, setMesureData] = useState<Array<{ Id: number; taille: number; poids: number; imc: number }>>([]);
  const [loading, setLoading] = useState(true);

  const [lastMeasure, setLastMeasure] = useState<{ Id: number; taille: number; poids: number; imc: number }>();

  const [showChart, setShowChart] = useState(false);



  useEffect(() => {
    // Effectuer la requête GET une fois que le composant est monté
    axios.get('https://localhost:7200/api/MesureControleur')
      .then(response => {
        // Ici, 'response.data' contient les données récupérées depuis le backend.
        setMesureData(response.data);
        setLoading(false); // Mettre fin au chargement une fois les données récupérées.
        createIMCChart(response.data);

      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données : ', error);
        setLoading(false); // Assurez-vous de gérer les erreurs.
      });
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois (après le montage).

  // useEffect(() => {
  //   // Utilisez vos données de mesure pour créer le graphique
  //   createIMCChart(mesureData);
  //   // Afficher le canevas après avoir créé le graphique
  //   setShowChart(true)
  // }, []);


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
        console.log(response.data);

        // Met à jour le tableau mesureData avec la nouvelle mesure
        const updatedMesureData = [...mesureData, response.data];
        setLastMeasure(response.data);

        // Réinitialisation des champs ici
        setInputTaille('');
        setInputPoids('');
        setIMC(response.data.imc);
        const newMeasure = response.data; // La nouvelle mesure ajoutée

        // Ajouter la nouvelle mesure au tableau de données
        setMesureData([...mesureData, newMeasure]);
        // Après avoir ajouté la nouvelle mesure et mis à jour mesureData, appelez createIMCChart pour mettre à jour le graphique.
        createIMCChart(updatedMesureData);

      })
      .catch(error => {
        // Gestion des erreurs
        console.error(error);
      });
  };


  let imcChart: Chart | null = null;

  function createIMCChart(mesureData: Array<{ Id: number; taille: number; poids: number; imc: number }>) {
    const canvasElement = document.getElementById('imcChartContainer') as HTMLCanvasElement | null;

    if (canvasElement) {
      if (imcChart) {
        // Si le graphique existe, mettez à jour ses données
        imcChart.data.labels = mesureData.slice(0, 7).map((item, index) => `JOUR ${index + 1}`);
        imcChart.data.datasets[0].data = mesureData.slice(0, 7).map(item => item.imc);
        imcChart.update();
      } else {
        // Si le graphique n'existe pas, créez-le
        imcChart = new Chart(canvasElement, {
          type: 'bar',
          data: {
            labels: mesureData.slice(0, 7).map((item, index) => `JOUR ${index + 1}`),
            datasets: [
              {
                label: 'IMC',
                data: mesureData.slice(-7).map(item => item.imc),
                backgroundColor: 'rgba(75, 75, 192, 0.2)',
                borderColor: 'rgba(75, 75, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          },
        });
      }
    } else {
      console.error("Élément HTML avec l'ID 'imcChartContainer' non trouvé ou n'est pas un élément canvas.");
    }
  }



  return (
    <>
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home inputTaille={inputTaille} inputPoids={inputPoids} imc={imc} setInputTaille={setInputTaille} setInputPoids={setInputPoids} handleCalculer={handleCalculer} />} />
              <Route path="/sevenImc" element={<SevenImc mesureData={mesureData} />} />
              <Route path="/allImc" element={<AllImc mesureData={mesureData} />} />
              <Route path="/charts" element={<Charts showChart={showChart} mesureData={mesureData} />} />
              allImc
            </Routes>
          </div>
        </Router>

        {/* <div style={{ display: 'none' }}>
          {showChart && (
            <canvas id="imcChartContainer"></canvas>
          )}

        </div> */}

      </div>
    </>
  );
}

export default App;