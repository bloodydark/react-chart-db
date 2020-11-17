import React from "react";
import "./App.css";
import AddTimeEntryForm from "./components/add-time-entry-form";
import TimesList from "./components/times-list";

function App() {
  return (
    <div className="App">
      <h1>Just Clock It</h1>
      <TimesList />
      <AddTimeEntryForm />
    </div>
  );
}

export default App;
