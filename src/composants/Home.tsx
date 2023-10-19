import React from 'react';
import Inputimc from './Inputimc';
import CalculerIMCButton from './CalculerIMCButton';
import ResultIMC from './ResultIMC';
import imgIMC from '../assets/imc.jpeg';
import result from '../assets/result.jpeg'




interface HomeProps {
    inputTaille: string;
    inputPoids: string;
    imc: number | null;
    setInputTaille: (value: string) => void;
    setInputPoids: (value: string) => void;

    handleCalculer: () => void
}
function Home({ inputTaille, inputPoids, imc, setInputTaille, setInputPoids, handleCalculer }: HomeProps) {
    return (
        <div>
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
        </div>
    );
};

export default Home;