import React from 'react';


interface AllImcProps {
    mesureData: {
        Id: number;
        taille: number;
        poids: number;
        imc: number;
    }[]
}

function AllImc({ mesureData }: AllImcProps) {
    return (
        <div>
            <h1>Toutes les données :</h1>
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
                        {mesureData.map(item => (
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

export default AllImc;