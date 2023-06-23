import React, { useLayoutEffect, useState } from "react";
import $, { data } from "jquery";
import "./index.css";

import firebaseClient from "../firebaseClient";
import {initializeApp} from "firebase/app";
import { get, getDatabase, child, ref } from "firebase/database";

const app = initializeApp(firebaseClient);

const Scene = () => {
    const [userComments, setUserComments] = useState([]);
    useLayoutEffect(() => {
        $("#entry-prompt").delay(1000).fadeOut(300);
        $("#canvas").delay(1700).fadeIn(500);

        setTimeout(() => {
            getDarkSecrets();
        }, 500);
    }, []);

    const getDarkSecrets = () => {
        const dbRef = ref(getDatabase());
        
        get(dbRef).then((snapshot) => {
            if (!snapshot.exists()) {
                console.log("no data");
            } else {
                const dataSnapshot = snapshot.val();
                const userData = Object.keys(dataSnapshot).map((data) => {
                    return dataSnapshot[data]._formData.deepDarkSecret;
                });

                setUserComments(userData);
            }
        })
    }

    return (
        <>
            <div id="canvas">
                {userComments.map((comment, index) => {
                    return (
                        <h3 className="user-comment" key={index}> {comment} </h3>
                    )
                })}
            </div>
        </>
    )
}

export default Scene;