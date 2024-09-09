import React, { useState } from 'react';
import './App.css';
import { addWeeks, format } from 'date-fns';

function App() {
  const [data, setData] = useState([
    { piece: 'ROSE', dateCommande: '2024-09-01', deadLine: '2024-11-10', client: 'Client A', bespoke: 'STANDARD', dimensions: '20x20', materiaux: 'Bois', couleur: 'Rouge', quantite: 2, pays: 'France', transport: 'NOUS', paiement: '50%', statut: 'IN PRODUCTION', plans: null, facture: null, order: null }
  ]);

  // État pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    piece: '',
    dateCommande: '',
    client: '',
    bespoke: 'STANDARD',
    dimensions: '',
    materiaux: '', // Matériaux avant couleur
    couleur: '',
    quantite: 1,
    pays: '',
    transport: 'NOUS',
    paiement: '0%',
    statut: 'IN PRODUCTION',
    plans: null,
    facture: null,
    order: null
  });

  // Fonction pour gérer la saisie des champs de formulaire
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0] // Stocker le fichier uploadé
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value // Pour les champs texte et autres
      });
    }
  };

  // Fonction pour ajouter une nouvelle ligne au tableau et calculer la deadline
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcul automatique de la deadline (ajouter 10 semaines à la date de commande)
    const calculatedDeadline = format(addWeeks(new Date(formData.dateCommande), 10), 'yyyy-MM-dd');
    
    // Ajouter la deadline calculée aux données du formulaire
    const newFormData = { 
      ...formData,
      deadLine: calculatedDeadline,
      plans: formData.plans ? formData.plans.name : null,  // Stocker le nom du fichier uploadé
      facture: formData.facture ? formData.facture.name : null,
      order: formData.order ? formData.order.name : null
    };

    // Ajouter la nouvelle ligne de données dans le tableau
    setData([...data, newFormData]);

    // Réinitialiser le formulaire après soumission
    setFormData({
      piece: '',
      dateCommande: '',
      client: '',
      bespoke: 'STANDARD',
      dimensions: '',
      materiaux: '', // Réinitialiser le matériau
      couleur: '',
      quantite: 1,
      pays: '',
      transport: 'NOUS',
      paiement: '0%',
      statut: 'IN PRODUCTION',
      plans: null,
      facture: null,
      order: null
    });
  };

  // Fonction pour supprimer une ligne du tableau
  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index); // Filtrer toutes les lignes sauf celle sélectionnée
    setData(newData);
  };

  return (
    <div className="App">
      <h1>Suivi de Production</h1>
      <table>
        <thead>
          <tr>
            <th>PIECE</th>
            <th>DATE DE COMMANDE</th>
            <th>DEADLINE</th>
            <th>CLIENT</th>
            <th>BESPOKE/STANDARD</th>
            <th>DIMENSIONS</th>
            <th>MATERIAUX</th> {/* Matériaux avant Couleur */}
            <th>COULEUR</th>
            <th>QUANTITÉ</th>
            <th>PAYS DE LIVRAISON</th>
            <th>TRANSPORT</th>
            <th>PAIEMENT STATUS</th>
            <th>STATUT</th>
            <th>PLANS</th>
            <th>FACTURE</th>
            <th>ORDER</th>
            <th>ACTION</th> {/* Colonne pour le bouton Supprimer */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={index} 
              style={{ backgroundColor: item.statut === 'FINISHED' ? 'rgb(167, 199, 150)' : 'transparent' }} // Si "Finished", mettre en vert
            >
              <td>{item.piece}</td>
              <td>{item.dateCommande}</td>
              <td>{item.deadLine}</td>
              <td>{item.client}</td>
              <td>{item.bespoke}</td>
              <td>{item.dimensions}</td>
              <td>{item.materiaux}</td> {/* Matériaux avant Couleur */}
              <td>{item.couleur}</td>
              <td>{item.quantite}</td>
              <td>{item.pays}</td>
              <td>{item.transport}</td>
              <td>{item.paiement}</td>
              <td>{item.statut}</td>
              <td>{item.plans ? <a href={item.plans} role="button">{item.plans}</a> : 'N/A'}</td>
<td>{item.facture ? <a href={item.facture} role="button">{item.facture}</a> : 'N/A'}</td>
<td>{item.order ? <a href={item.order} role="button">{item.order}</a> : 'N/A'}</td>

              <td>
                <button onClick={() => deleteRow(index)} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                  Supprimer
                </button>
              </td> {/* Bouton Supprimer */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulaire d'ajout */}
      <h2>Ajouter une nouvelle pièce</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom de la pièce :</label>
        <input type="text" name="piece" value={formData.piece} onChange={handleChange} required />

        <label>Date de commande :</label>
        <input type="date" name="dateCommande" value={formData.dateCommande} onChange={handleChange} required />

        <label>Client :</label>
        <input type="text" name="client" value={formData.client} onChange={handleChange} required />

        <label>Bespoke ou Standard :</label>
        <select name="bespoke" value={formData.bespoke} onChange={handleChange}>
          <option value="STANDARD">Standard</option>
          <option value="BESPOKE">Bespoke</option>
        </select>

        <label>Dimensions :</label>
        <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} required />

        <label>Matériaux :</label> {/* Matériaux avant Couleur */}
        <input type="text" name="materiaux" value={formData.materiaux} onChange={handleChange} required />

        <label>Couleur :</label>
        <input type="text" name="couleur" value={formData.couleur} onChange={handleChange} required />

        <label>Quantité :</label>
        <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} required />

        <label>Pays de livraison :</label>
        <input type="text" name="pays" value={formData.pays} onChange={handleChange} required />

        <label>Transport :</label>
        <select name="transport" value={formData.transport} onChange={handleChange}>
          <option value="NOUS">Nous</option>
          <option value="EUX">Eux</option>
        </select>

        <label>Statut :</label>
        <select name="statut" value={formData.statut} onChange={handleChange}>
          <option value="IN PRODUCTION">In Production</option>
          <option value="FINISHED">Finished</option>
          <option value="WAITING FOR SHIPMENT">Waiting for Shipment</option>
          <option value="DELIVERED">Delivered</option>
        </select>

        {/* Champs pour uploader des fichiers PDF */}
        <label>Plans (PDF) :</label>
        <input type="file" name="plans" accept=".pdf" onChange={handleChange} />

        <label>Facture (PDF) :</label>
        <input type="file" name="facture" accept=".pdf" onChange={handleChange} />

        <label>Order (PDF) :</label>
        <input type="file" name="order" accept=".pdf" onChange={handleChange} />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default App;