import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-touch-punch";
import "./index.css";

import firebaseClient from "../firebaseClient";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

const app = initializeApp(firebaseClient);

const Scene = ({ propState }) => {
  const [userComments, setUserComments] = useState([]);
  const commentElementsRef = useRef([]);

  useEffect(() => {
    $("#entry-prompt").delay(500).fadeOut(300);
  }, []);

  useEffect(() => {
    if (propState) {
      getDarkSecrets();
    }
  }, [propState]);

  useEffect(() => {
    positionUserComments();
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    });
  };

  const positionUserComments = () => {
    commentElementsRef.current.forEach((commentElement) => {
      const newPosition = generateRandomPosition();
      Object.assign(commentElement.style, newPosition);
    });

    const floatingDistance = Math.floor(Math.random() * 41) - 20;
    const floatingAnimationStyle = document.createElement('style');
    floatingAnimationStyle.innerHTML = `@keyframes floatingAnimation {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(${floatingDistance}px);
    }
    100% {
        transform: translateY(0);
    }
    }`;
    document.head.appendChild(floatingAnimationStyle);

    $(".user-comment").draggable();
    $(".user-comment").delay(200).animate({
        opacity: "1"
    }, 500);
  };

  const generateRandomPosition = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const position = {
      top: Math.floor(Math.random() * (windowHeight - 100)) + "px",
      left: Math.floor(Math.random() * (windowWidth - 100)) + "px",
    };

    return position;
  };

  const handleResize = () => {
    positionUserComments();
  };

  return (
    <div id="canvas" className="canvas-container">
      {userComments.map((comment, index) => (
        <h3 className="user-comment" key={index} ref={(el) => (commentElementsRef.current[index] = el)}>
          {comment}
        </h3>
      ))}
    </div>
  );
};

export default Scene;
