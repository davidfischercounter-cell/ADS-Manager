import { useState } from "react";

export default function AddPersonForm({ persons, setPersons }) {
  const [name, setName] = useState("");

  function addPerson() {
    if (!name.trim()) return;

    const newPerson = {
      id: Date.now(),
      name,
      balance: 0,
      history: [],
    };

    setPersons([...persons, newPerson]);
    setName("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name eingeben"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addPerson}>Person hinzufügen</button>
    </div>
  );
}
