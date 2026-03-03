export default function PersonDetail({ person, goBack }) {
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

      <h2>{person.name}</h2>

      <p>
        Aktuelles Guthaben:{" "}
        <strong
          style={{
            color: person.balance >= 0 ? "#16a34a" : "#dc2626",
          }}
        >
          {person.balance.toFixed(2)} €
        </strong>
      </p>

      <h3>History</h3>

      {person.history.length === 0 && <p>Keine Buchungen vorhanden.</p>}

      {person.history.map((entry) => (
        <div
          key={entry.id}
          style={{
            background: "#f9fafb",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
            color: entry.amount >= 0 ? "#16a34a" : "#dc2626",
          }}
        >
          <span>{entry.date}</span>
          <strong>{entry.amount.toFixed(2)} €</strong>
        </div>
      ))}
    </div>
  );
}
