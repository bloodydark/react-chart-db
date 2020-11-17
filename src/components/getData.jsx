import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const getData = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    firebase.firestore().collection("time").orderBy("DateTime").onSnapshot;
  });

  return (
    <div>
      <h2>temperature</h2>
    </div>
  );
};
export default getData;
