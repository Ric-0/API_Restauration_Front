import React from "react";
import styles from "./Modal.module.css";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ModalAddAliment = (props) => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = React.useState(null);

    // if(data !== null){
    //     valider(data)
    // }

    function validerForm(data){
        console.log(data);
        setData(JSON.stringify(data))
        valider()
    }

    async function valider(){
        console.log(data);
        console.log(JSON.parse(data));
        await axios('aliments', {
            method: 'post',
            baseURL: props.baseURL,
            data: JSON.parse(data),
            headers: {
                'token': props.accessToken
            }
        })
        await props.returnValue()
        props.setIsOpenAliment(false)
    }
    return (
        <>
        <div className={styles.darkBG} onClick={() => props.setIsOpenAliment(false)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <h5 className={styles.heading}>Ajout aliment</h5>
            </div>
            <button className={styles.closeBtn} onClick={() => props.setIsOpenAliment(false)}>
                <span class="close">&times;</span>
            </button>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit((data) => validerForm(data))}>
                    <input {...register("nom")} placeholder="Nom" />
                    <input {...register("type")} placeholder="Type" />
                    <input type="number" {...register("quantite")} placeholder="quantite" />
                    <p>{data}</p>
                    <input type="submit" />
                </form>
            </div>
            <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                {/* <button className={styles.deleteBtn} onClick={() => props.setIsOpenAliment(false)}>
                    Ajouter
                </button> */}
                <button
                    className={styles.cancelBtn}
                    onClick={() => props.setIsOpenAliment(false)}
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

export default ModalAddAliment;