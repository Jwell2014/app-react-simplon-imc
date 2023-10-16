import React from 'react';

interface CalculerIMCButtonProps {
    inputTaille: string;
    inputPoids: string;
    onCalculer: (imc: string | null) => void;
    setInputTaille: React.Dispatch<React.SetStateAction<string>>;
    setInputPoids: React.Dispatch<React.SetStateAction<string>>;
}

function CalculerIMCButton({ inputTaille, inputPoids, onCalculer, setInputTaille, setInputPoids }: CalculerIMCButtonProps) {

    const calculateIMC = (taille: number, poids: number) => {
        // Formule de l'IMC : poids en kilogrammes / (taille en mètres)^2
        const tailleEnMetres = taille / 100; // Convertir la taille de cm en mètres
        return (poids / (tailleEnMetres * tailleEnMetres)).toFixed(2); // Résultat arrondi à 2 décimales
    };

    const handleCalculer = () => {
        const newIMC = calculateIMC(parseFloat(inputTaille), parseFloat(inputPoids));
        onCalculer(newIMC);
        setInputTaille("");
        setInputPoids("")
    };

    return (
        <button onClick={handleCalculer}>Calculer</button>
    );
};

export default CalculerIMCButton;
