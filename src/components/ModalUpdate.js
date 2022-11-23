import React from "react";
import styles from "./Modal.module.css";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ModalUpdate = (props) => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = React.useState(null);

    function validerForm(data){
        setData(JSON.stringify(data))
        valider()
    }

    async function valider(){
        await axios('plats', {
            method: 'post',
            baseURL: props.baseURL,
            data: JSON.parse(data),
            headers: {
                'token': props.accessToken
            }
        })
        await props.returnValue()
        props.setIsOpenUpdate(null)
    }
    return (
        <>
        <div className={styles.darkBG} onClick={() => props.setIsOpenUpdate(null)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Modifier plat </h5>
            </div>
            <button className={styles.closeBtn} onClick={() => props.setIsOpenUpdate(null)}>
                <span class="close">&times;</span>
            </button>
            <div className={styles.modalContent}>
                {props.plats.map((plat) => {
                    if (plat._id == props.isOpenUpdate) {
                        return <form onSubmit={handleSubmit((data) => validerForm(data))}>
                                <label>Nom: </label>
                                <input {...register("nom")} placeholder="Nom" value={plat.nom} />
                                <br/>
                                <br/>
                                <label>Type: </label>
                                <input {...register("type")} placeholder="Type" value={plat.type}/>
                                <p>Liste aliment : </p>
                                <select multiple {...register("aliments", { required: true })}>
                                {props.aliments.map((a) => {
                                    {plat.aliments.map((aliment) => {
                                        if(a.nom === aliment.nom){
                                            return <option selected value={a.nom}>{a.nom}</option> 
                                        }else{
                                            return <option value={a.nom}>{a.nom}</option> 
                                        }
                                    })}
                                })}
                                </select>
                                    {/* <input {...register("aliments"+count+".quantite")} value={aliment.quantite} type="number" />
                                    <input {...register("aliments.nom")} value={aliment.nom} />
                                    <input {...register("aliments.quantite")} value={aliment.quantite} /> */}
                                <br/>
                                <label>Prix</label>
                                <input type="number" {...register("prix")} placeholder="Prix" value={plat.prix} />
                                <p>{data}</p>
                                <input type="submit" />
                            </form>
                    }
                })}
            </div>
            <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                <button
                    className={styles.cancelBtn}
                    onClick={() => props.setIsOpenUpdate(null)}
                >
                    Annuler
                </button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
export default ModalUpdate