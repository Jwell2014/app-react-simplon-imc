import React from 'react';

interface InterpretationIMCProps {
    score: string
}
function InterpretationIMC({ score }: InterpretationIMCProps) {
    console.log(score)
    let message = "";
    let category = "";

    if (score < "18,5") {
        message = "Insuffisance pondérale (maigreur)"
        category = 'insuffisance-ponderale';
    } else if (score > "18,5" && score < "25") {
        message = "Corpulence normale"
        category = 'corpulence-normale';
    } else if (score > "25" && score < "30") {
        message = "Surpoids"
        category = 'surpoids';
    } else if (score > "30" && score < "35") {
        message = "Obésité modérée"
        category = 'obesite-modere';
    } else if (score > "35" && score < "40") {
        message = "obesite-severe"
        category = 'insuffisance-ponderale';
    } else if (score > "40") {
        message = "Obésité morbide ou massive"
        category = 'obesite-morbide';
    }
    return (
        <div>
            <h4>Interprétation (d'après l'OMS)</h4>
            <p className={category}>{message}</p>
        </div>
    );
};

export default InterpretationIMC;