import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
    display: 'flex',
    justifyContent: 'center', // Centrer horizontalement
};

const linkStyle = {
    display: 'inline',      // Afficher les liens en ligne
    marginRight: '20px',    // Espacement entre les liens
    textDecoration: 'none'!, // Supprimer la décoration par défaut (soulignement)
    color: 'blue',          // Couleur du texte
};

function Navigation() {
    return (
        <div>
            <nav style={navStyle}>
                <ul>
                    <li style={linkStyle}>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li style={linkStyle}>
                        <Link to="/sevenImc">7 derniers IMC</Link>
                    </li>
                    <li style={linkStyle}>
                        <Link to="/allImc">Liste IMC</Link>
                    </li>
                    <li style={linkStyle}>
                        <Link to="/charts">Graphique IMC</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}


export default Navigation;