import React from 'react';

interface CalculerIMCButtonProps {

    onCalculer: () => void
}

function CalculerIMCButton({ onCalculer }: CalculerIMCButtonProps) {


    return (
        <button onClick={onCalculer}>Calculer</button>
    );
};

export default CalculerIMCButton;
