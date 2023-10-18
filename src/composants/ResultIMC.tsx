import React from 'react';
import InterpretationIMC from './InterpretationIMC';
import result from '../assets/result.jpeg'

interface ResultIMCProps {
    imc: number | null
}
function ResultIMC({ imc }: ResultIMCProps) {

    return (
        <div>
            {imc !== null && (
                <>
                    <h2>RÉSULTAT</h2>

                    <div className='resultat'>
                        <h4>Indice de masse corporelle (IMC)</h4>
                        <p>{imc}</p>
                    </div>
                    <div className='resultat' style={{ height: 140 }}>
                        <InterpretationIMC score={imc} />
                    </div>
                </>

            )
            }
        </div >
    );
};

export default ResultIMC;