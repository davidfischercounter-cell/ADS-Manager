export default function Spueldienst({ persons = [], setPersons, goBack }) {
  const safePersons = Array.isArray(persons) ? persons : [];

  function updateCount(id, delta) {
    const updated = safePersons.map((p) => {
      if (p.id === id) {
        const current = p.spueldienstCount || 0;
        return {
          ...p,
          spueldienstCount: Math.max(0, current + delta),
        };
      }
      return p;
    });

    setPersons(updated);
  }

  const sortedPersons = [...safePersons].sort(
    (a, b) => (b.spueldienstCount || 0) - (a.spueldienstCount || 0)
  );

  return (
    <div>
      <button
        onClick={goBack}
        style={{
          marginBottom: "10px",
          background: "#B7A37A",
          color: "white",
        }}
      >
        Zurück
      </button>

      <h2>Spüldienst</h2>

      <div style={{ marginTop: "20px" }}>
        {sortedPersons.map((person) => (
          <div
            key={person.id}
            style={{
              background: "#fbfaf7",
              padding: "18px",
              height: "30px",
              marginBottom: "12px",
              borderRadius: "14px",
              border: "2px solid #B7A37A",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 500 }}>{person.name}</div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={() => updateCount(person.id, -1)}
                style={{
                  background: "#B7A37A",
                  color: "white",
                  width: "35px",
                }}
              >
                -
              </button>

              <div
                style={{
                  minWidth: "30px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {person.spueldienstCount || 0}
              </div>

              <button
                onClick={() => updateCount(person.id, 1)}
                style={{
                  background: "#B7A37A",
                  color: "white",
                  width: "35px",
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
