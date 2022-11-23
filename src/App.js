import React from "react";
import './App.css';
import axios from 'axios';
import ModalAdd from "./components/ModalAdd";
import ModalUpdate from "./components/ModalUpdate";
import ModalAddAliment from "./components/ModalAddAliment";

const baseURL = "http://localhost:3001/";
const accessToken = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu"

export default function App() {
    const [plats, setPlats] = React.useState(null);
    const [aliments, setAliments] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(null);
    const [isOpenAliment, setIsOpenAliment] = React.useState(null);

    const returnValue = async ()=>{
        const plats = await fetchPlats();
        setPlats(plats.data);
        const aliments = await fetchAliments();
        setAliments(aliments.data);
    }
    async function fetchPlats(){
        return axios('plats/type',{ 
            method: 'get', 
            baseURL: baseURL, 
            headers: { 
                'token': accessToken 
            }
        })
    }
    async function fetchAliments(){
        // return await axios.get(baseURL+`aliments/`);
        return axios('aliments',{
            method: 'get',
            baseURL: baseURL,
            headers: {
                'token': accessToken
            }
        })
    }

    React.useEffect(() => {
        returnValue()
    }, []);
  
    if (!plats) return null;
    if (!aliments) return null;

    async function commanderPlat(id){
        await axios('plats/commande/'+id, {
            method: 'get',
            baseURL: baseURL,
            headers: {
                'token': accessToken
            }
        })
        await returnValue()
    }

    async function deletePlat(id){ 
        await axios('plats/'+id, {
            method: 'delete',
            baseURL: baseURL,
            headers: {
                'token': accessToken
            }
        })
        await returnValue()
    }

    async function deleteAliment(id){ 
        await axios('aliments/'+id, {
            method: 'delete',
            baseURL: baseURL,
            headers: {
                'token': accessToken
            }
        })
        await returnValue()
    }

    async function updateAliment(id,nom, type, quantite){
        let data = {nom: nom, type: type, quantite:quantite}
        await axios('aliments/'+id, {
            method: 'put',
            baseURL: baseURL,
            data: data,
            headers: {
                'token': accessToken
            }
        })
        await returnValue()
    }

    let dispo = true
    
  
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                Ajout Plat
            </button>
            {isOpen && <ModalAdd setIsOpen={setIsOpen} aliments={aliments} baseURL={baseURL} accessToken={accessToken} returnValue={returnValue} />}
            <button onClick={() => setIsOpenAliment(true)}>
                Ajout Aliment
            </button>
            {isOpenAliment && <ModalAddAliment setIsOpenAliment={setIsOpenAliment} baseURL={baseURL} accessToken={accessToken} returnValue={returnValue} />}
            {isOpenUpdate && <ModalUpdate setIsOpenUpdate={setIsOpenUpdate} isOpenUpdate={isOpenUpdate} plats={plats} aliments={aliments} baseURL={baseURL} accessToken={accessToken} returnValue={returnValue} />}
            <br/>
            <a href="#plats">
                Plats
            </a>
            <br/>
            <a href="#aliments">
                Aliments
            </a>
            <h1>
                Plats
            </h1>
            <div class='global' id="plats">
                {plats.map((plat) => (
                    <div class='case'>
                        <button onClick={() => deletePlat(plat._id)}>
                            Supprimer
                        </button>
                        <button onClick={() => setIsOpenUpdate(plat._id)}>
                            Modifier
                        </button>
                        <h1>{plat.nom}</h1>
                        <h2>{plat.type}</h2>
                        <p>{plat.prix} €</p>
                        {plat.aliments.length !== 0 ? 
                        <h3>Composition</h3>
                        : ''}
                        {plat.aliments.map((aliment) => (
                            <div class='aliment'>
                                {aliments.map((a) => {
                                    // C'est cadeau
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
                        {dispo = true}
                    </div>
                ))}
            </div>
            <h1>
                Aliments
            </h1>
            <div class="global" id="aliments">
                {aliments.map((aliment) => {
                    return <div class="case">
                            <button onClick={() => deleteAliment(aliment._id)}>
                                Supprimer
                            </button>
                            <h1>{aliment.nom}</h1>
                            <h2>{aliment.type}</h2>
                            <p><button onClick={() => updateAliment(aliment._id,aliment.nom,aliment.type,aliment.quantite -1)}>-</button> {aliment.quantite} <button onClick={() => updateAliment(aliment._id,aliment.nom,aliment.type,aliment.quantite +1)}>+</button></p>
                        </div>
                })}
            </div>
        </div>
    );
}