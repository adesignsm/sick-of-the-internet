import React, { useState } from "react";

import firebaseClient from "../firebaseClient";
import {initializeApp} from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";

import { v4 as uuidv4 } from "uuid";
import Filter from "bad-words";
import { useForm } from "react-hook-form";

import Scene from "../Scene";

const app = initializeApp(firebaseClient);

const Entry = () => {
    const [profanityFound, setProfanityFound] = useState();
    const [submitted, setSubmitted] = useState();
    const filter = new Filter();

    const writeToFirebase = (_formData) => {
        const db = getDatabase();
        let key = uuidv4();

        if (filter.isProfane(_formData.deepDarkSecret)) {
            setProfanityFound(true);
        } else {
            setProfanityFound(false);
            set(ref(db, `${key}/`), {_formData});
            setSubmitted(true);
        }

        reset();
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    return (
        <>
            <div id="entry-prompt">
                <form onSubmit={handleSubmit((data) => {writeToFirebase(data)})}>
                    <input {...register('deepDarkSecret', { required: true })} required/>
                    {profanityFound && <p> Profanity detected. Please enter a different answer.</p>}
                    {submitted && <p> Thank you for your answer </p>}
                    <input type="submit" />
                </form>
            </div>
            {submitted ? <Scene /> : null}
        </>
    )
}

export default Entry;