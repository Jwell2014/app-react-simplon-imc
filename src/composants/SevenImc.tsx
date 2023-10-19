import React from 'react';


interface SevenImncProps {
    mesureData: {
        Id: number;
        taille: number;
        poids: number;
        imc: number;
    }[]
}
function SevenImc({ mesureData }: SevenImncProps) {
    return (
        <div>
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
                        {mesureData.slice(-7).map(item => (
                            <tr key={item.Id}>
                                <td>{item.taille}</td>
                                <td>{item.poids}</td>
                                <td>{item.imc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default SevenImc;