import { useState, useEffect } from "react";
import { loadPersons, savePersons } from "./utils/storage";
import Dashboard from "./components/Dashboard";
import BookingPage from "./components/BookingPage";
import PersonDetail from "./components/PersonDetail";
import Spueldienst from "./components/Spueldienst";
import "./index.css";
import logo from "./logo.png";
import pkg from "../package.json";

function App() {
  const [persons, setPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  // 🔹 Beim Start laden
  useEffect(() => {
    try {
      const normalData = loadPersons();

      if (Array.isArray(normalData) && normalData.length > 0) {
        setPersons(normalData);
      } else {
        const autoBackup = localStorage.getItem("persons_autobackup");
        if (autoBackup) {
          const parsed = JSON.parse(autoBackup);
          if (Array.isArray(parsed)) {
            setPersons(parsed);
          }
        }
      }
    } catch {
      setPersons([]);
    }
  }, []);

  function handleSeasonReset() {
    if (!window.confirm("Saison wirklich beenden?")) return;

    const currentYear = new Date().getFullYear();

    const updated = persons.map((p) => {
      const archivedSeason = {
        year: currentYear,
        history: p.history || [],
        spueldienstCount: p.spueldienstCount || 0,
      };

      return {
        ...p,
        history: [], // neue Saison: leer
        spueldienstCount: 0, // neue Saison: ALLE starten bei 0
        seasons: [...(p.seasons || []), archivedSeason],
      };
    });

    setPersons(updated);
  }

  // 🔹 Normales Speichern
  useEffect(() => {
    savePersons(persons);

    // 🔹 Auto-Backup speichern
    localStorage.setItem("persons_autobackup", JSON.stringify(persons));
  }, [persons]);

  const selectedPerson = Array.isArray(persons)
    ? persons.find((p) => p.id === selectedPersonId)
    : null;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        background: "#f4f1eb",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        borderTop: "6px solid #B7A37A",
        minHeight: "90vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid #e5e0d6",
          paddingBottom: "15px",
        }}
      >
        <h1 style={{ margin: 0, fontWeight: 500 }}>ADS-Essen</h1>

        <div
          style={{
            fontSize: "12px",
            textAlign: "center",
            opacity: 0.6,
            marginBottom: "0px",
          }}
        >
          v{pkg.version}
        </div>

        <img
          src={logo}
          alt="Logo"
          style={{
            height: "45px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Seitensteuerung */}
      {currentPage === "dashboard" && (
        <Dashboard
          persons={persons}
          setPersons={setPersons}
          goToBooking={() => setCurrentPage("booking")}
          goToSpueldienst={() => setCurrentPage("spueldienst")}
          handleSeasonReset={handleSeasonReset}
          openPerson={(id) => {
            setSelectedPersonId(id);
            setCurrentPage("personDetail");
          }}
        />
      )}

      {currentPage === "booking" && (
        <BookingPage
          persons={persons}
          setPersons={setPersons}
          goBack={() => setCurrentPage("dashboard")}
        />
      )}

      {currentPage === "spueldienst" && (
        <Spueldienst
          persons={persons}
          setPersons={setPersons}
          goBack={() => setCurrentPage("dashboard")}
        />
      )}

      {currentPage === "personDetail" && selectedPerson && (
        <PersonDetail
          person={selectedPerson}
          goBack={() => setCurrentPage("dashboard")}
        />
      )}
    </div>
  );
}

export default App;
