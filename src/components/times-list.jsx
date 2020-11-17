import React, { useState, useEffect } from "react";
import firebase from "../firebase";

function useTimes() {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("times")
      .onSnapshot((snapshot) => {
        const newTimes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTemp(newTimes);
      });
  }, []);

  return temp;
}

const TimesList = () => {
  const times = useTimes();

  return (
    <div>
      <h2>temperature</h2>
      <ol>
        {times.map((time) => (
          <li key={time.id}>
            <div className="time-entry">
              {time.title}
              <code className="time">{time.temp} degree</code>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default TimesList;
