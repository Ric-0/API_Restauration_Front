import React from "react";
import './App.css';
import axios from 'axios';

const baseURL = "http://localhost:3001";

export default function App() {
    const [plats, setPlats] = React.useState(null);
    const [aliments, setAliments] = React.useState(null);

    React.useEffect(() => {
        async function fetchPlats(){
            let accessToken = "hjfk"
            return axios('plats/type',{ 
                method: 'get', 
                baseURL: 'http://localhost:3001/', 
                headers: { 
                    'TEST': 'Bearer ' + accessToken 
                } 
            })
        }
        async function fetchAliments(){
            return await axios.get(`http://localhost:3001/aliments/`);
        }
        (async () => {
            const plats = await fetchPlats();
            console.log(plats);
            setPlats(plats.data);
            const aliments = await fetchAliments();
            setAliments(aliments.data);
        })();
    }, []);
  
    if (!plats) return null;
    if (!aliments) return null;

    async function commanderPlat(id){
        await axios('plats/commande/'+id, {
            method: 'get',
            baseURL: 'http://localhost:3001/'
        })
    }

    let dispo = true
  
    return (
      <div class='global'>
        {plats.map((plat) => (
            <div class='plat'>
                <h1>{plat.nom}</h1>
                <h2>{plat.type}</h2>
                <p>{plat.prix}</p>
                {plat.aliments.length !== 0 ? 
                <h3>Composition</h3>
                : ''}
                {plat.aliments.map((aliment) => (
                    <div class='aliment'>
                        {aliments.map((a) => {
                            {a.nom === aliment.nom ? a.quantite < aliment.quantite ? dispo = false : <p></p> : <p></p>}
                        })}
                        <ul>
                            {aliment.nom}
                        </ul>
                    </div>
                ))}
                {dispo === true ? 
                <button onClick={() => {commanderPlat(plat._id)}}>Commander</button>
                : ''}
            </div>
        ))}
      </div>
    );
}