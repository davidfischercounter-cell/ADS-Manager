export function loadPersons() {
  const data = localStorage.getItem("persons");
  return data ? JSON.parse(data) : [];
}

export function savePersons(persons) {
  localStorage.setItem("persons", JSON.stringify(persons));
}
