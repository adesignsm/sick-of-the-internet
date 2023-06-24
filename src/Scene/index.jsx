import React, { useLayoutEffect, useState, useRef } from "react";
import $ from "jquery";
import "./index.css";

import firebaseClient from "../firebaseClient";
import {initializeApp} from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

const app = initializeApp(firebaseClient);

const Scene = ({propState}) => {
    const [userComments, setUserComments] = useState([]);
    const canvasRef = useRef(null);

    useLayoutEffect(() => {
        if (propState) getDarkSecrets();
    }, [userComments]);

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

        $(".user-comment").each(function(index) {
            $(this).delay(200 * index).fadeIn(500);
        });
          
    }

    return (
        <>
            <div id="canvas" className="canvas-container">
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