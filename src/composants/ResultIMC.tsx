import React from 'react';
import InterpretationIMC from './InterpretationIMC';
import result from '../assets/result.jpeg'

interface ResultIMCProps {
    imc: string | null
}
function ResultIMC({ imc }: ResultIMCProps) {
    return (
        <div>
            {imc !== null && (
                <div className='resultat'>
                    <h2>RÉSULTAT</h2>
                    <h4>Indice de masse corporelle (IMC)</h4>
                    <p>{imc}</p>
                    <InterpretationIMC score={imc} />
                </div>
            )
            }
        </div >
    );
};

export default ResultIMC;