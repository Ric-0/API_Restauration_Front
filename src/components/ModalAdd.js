import React from "react";
import styles from "./Modal.module.css";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ModalAdd = (props) => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = React.useState(null);

    if(data !== null){
        valider()
    }

    async function validerFormPlat(dataForm){
        setData(JSON.stringify(dataForm))
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
        props.setIsOpen(false)
        setData(null)
    }
    return (
        <>
        <div className={styles.darkBG} onClick={() => props.setIsOpen(false)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Ajout produit</h5>
            </div>
            <button className={styles.closeBtn} onClick={() => props.setIsOpen(false)}>
                <span class="close">&times;</span>
            </button>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit((data) => validerFormPlat(data))}>
                    <input {...register("nom")} placeholder="Nom" />
                    <input {...register("type")} placeholder="Type" />
                    <select multiple {...register("aliments", { required: true })}>
                        {props.aliments.map((a) => {
                            return <option value={a.nom}>{a.nom}</option>  
                        })}
                    </select>
                    <input type="number" {...register("prix")} placeholder="Prix" />
                    <p>{data}</p>
                    <input type="submit" />
                </form>
            </div>
            <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                {/* <button className={styles.deleteBtn} onClick={() => props.setIsOpen(false)}>
                    Ajouter
                </button> */}
                <button
                    className={styles.cancelBtn}
                    onClick={() => props.setIsOpen(false)}
                >
                    Annuler
                </button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default ModalAdd;