import { useState } from "react";

export default function Dashboard({
  persons = [],
  setPersons,
  goToBooking,
  openPerson,
  goToSpueldienst,
  handleSeasonReset,
}) {
  const [name, setName] = useState("");

  const safePersons = Array.isArray(persons) ? persons : [];

  function addPerson() {
    if (!name.trim()) return;

    const newPerson = {
      id: Date.now(),
      name,
      balance: 0,
      history: [],
      spueldienstCount: 0,
      seasons: [],
    };

    setPersons([...safePersons, newPerson]);
    setName("");
  }

  function deletePerson(id) {
    if (!window.confirm("Person wirklich löschen?")) return;

    const updated = safePersons.filter((p) => p.id !== id);
    setPersons(updated);
  }

  return (
    <div>
      {/* Aktionsleiste */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={goToBooking}
          style={{
            background: "#B7A37A",
            color: "white",
          }}
        >
          Buchen
        </button>

        <button
          onClick={goToSpueldienst}
          style={{
            background: "#B7A37A",
            color: "white",
          }}
        >
          Spüldienst
        </button>

        <button
          onClick={handleSeasonReset}
          style={{
            background: "#B7A37A",
            color: "white",
          }}
        >
          Neue Saison
        </button>
      </div>

      {/* Neue Person hinzufügen */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="Neue Person"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addPerson}
          style={{
            background: "#B7A37A",
            color: "white",
            marginLeft: "10px",
          }}
        >
          Hinzufügen
        </button>
      </div>

      {/* Keine Personen */}
      {safePersons.length === 0 && <p>Noch keine Personen angelegt.</p>}

      {/* Personenliste */}
      {safePersons.map((person) => (
        <div
          key={person.id}
          onClick={() => openPerson(person.id)}
          style={{
            background: "#fbfaf7",
            padding: "18px",
            Height: "30px",
            marginBottom: "12px",
            borderRadius: "14px",
            border: "2px solid #B7A37A",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontWeight: 500 }}>{person.name}</span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: person.balance >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              {person.balance.toFixed(2)} €
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePerson(person.id);
              }}
              style={{
                background: "#B7A37A",
                color: "white",
                width: "40px",
                height: "30px",
                borderRadius: "14px",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
