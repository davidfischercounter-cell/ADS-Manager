import { useState } from "react";

export default function BookingPage({ persons = [], setPersons, goBack }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [amount, setAmount] = useState("");

  const safePersons = Array.isArray(persons) ? persons : [];
  const sortedPersons = [...safePersons].sort((a, b) =>
    a.name.localeCompare(b.name, "de", { sensitivity: "base" })
  );

  function toggleSelection(id) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  function applyBooking(type) {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const finalAmount = type === "credit" ? numericAmount : -numericAmount;

    const today = new Date().toLocaleDateString("de-DE");

    const updatedPersons = safePersons.map((person) => {
      if (selectedIds.includes(person.id)) {
        const transaction = {
          id: Date.now() + Math.random(),
          amount: finalAmount,
          date: today,
        };

        return {
          ...person,
          balance: person.balance + finalAmount,
          history: [transaction, ...person.history],
        };
      }
      return person;
    });

    setPersons(updatedPersons);
    setAmount("");
    setSelectedIds([]);
  }

  return (
    <div>
      <button
        onClick={goBack}
        style={{
          marginBottom: "20px",
          background: "#B7A37A",
          color: "white",
        }}
      >
        Zurück
      </button>

      <div
        style={{
          marginBottom: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          type="number"
          placeholder="Betrag"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => applyBooking("credit")}
            style={{
              flex: 1,
              background: "#B7A37A",
              color: "white",
              padding: "12px",
            }}
          >
            Gutschreiben
          </button>

          <button
            onClick={() => applyBooking("debit")}
            style={{
              flex: 1,
              background: "#B7A37A",
              color: "white",
              padding: "12px",
            }}
          >
            Abbuchen
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {sortedPersons.map((person) => {
          const isSelected = selectedIds.includes(person.id);

          return (
            <div
              key={person.id}
              onClick={() => toggleSelection(person.id)}
              style={{
                padding: "12px 18px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.2s",
                border: "2px solid #B7A37A",
                background: isSelected ? "#B7A37A" : "#fbfaf7",
                boxShadow: isSelected
                  ? "0 8px 20px rgba(183,163,122,0.4)"
                  : "0 6px 18px rgba(0,0,0,0.06)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                fontSize: "16px",
              }}
            >
              <div style={{ fontWeight: 500 }}>{person.name}</div>

              <div
                style={{
                  marginTop: "8px",
                  fontWeight: 600,
                  color: person.balance >= 0 ? "#16a34a" : "#dc2626",
                }}
              >
                {person.balance.toFixed(2)} €
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
