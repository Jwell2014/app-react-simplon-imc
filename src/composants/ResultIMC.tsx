import React from 'react';

interface ResultIMCProps {
    imc: string | null
}
function ResultIMC({ imc }: ResultIMCProps) {
    return (
        <div>
            <h2>RÉSULTAT</h2>
            {imc !== null && (
                <div style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
                    <p>Indice de masse corporelle (IMC)</p>
                    <p>{imc}</p>
                    <p>Interprétation (d'après l'OMS)</p>
                    {imc < "18.5" && (
                        <p>Insuffisance pondérale (maigreur)</p>
                    )}
                </div>
            )}

        </div>
    );
};

export default ResultIMC;