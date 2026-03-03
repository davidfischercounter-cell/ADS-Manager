import { useState } from "react";

export default function PersonCard({ person, persons, setPersons }) {
  const [amount, setAmount] = useState("");

  function addTransaction() {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount === 0) return;

    const updatedPersons = persons.map((p) => {
      if (p.id === person.id) {
        const transaction = {
          id: Date.now(),
          amount: numericAmount,
          date: new Date().toLocaleString(),
        };

        return {
          ...p,
          balance: p.balance + numericAmount,
          history: [transaction, ...p.history],
        };
      }
      return p;
    });

    setPersons(updatedPersons);
    setAmount("");
  }

  return (
    <div
      style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}
    >
      <h3>{person.name}</h3>
      <p>
        Guthaben:{" "}
        <strong style={{ color: person.balance >= 0 ? "green" : "red" }}>
          {person.balance.toFixed(2)} €
        </strong>
      </p>

      <input
        type="number"
        placeholder="Betrag eingeben (+ oder -)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addTransaction}>Buchen</button>

      <div style={{ marginTop: "10px" }}>
        <strong>History:</strong>
        {person.history.map((h) => (
          <div key={h.id} style={{ color: h.amount >= 0 ? "green" : "red" }}>
            {h.date} | {h.amount} €
          </div>
        ))}
      </div>
    </div>
  );
}
