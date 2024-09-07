document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;
    const dobError = document.getElementById("dobError");

    if (!validateAge(dob)) {
      dobError.style.display = "inline";
      return;
    } else {
      dobError.style.display = "none";
    }

    const entry = {
      name,
      email,
      password,
      dob,
      termsAccepted,
    };

    saveToLocalStorage(entry);

    loadEntries();
  });

function validateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age >= 18 && age <= 55;
}

function saveToLocalStorage(entry) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const tableBody = document.getElementById("entriesTableBody");
  tableBody.innerHTML = "";

  entries.forEach((entry) => {
    const row = `<tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.termsAccepted ? "true" : "false"}</td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}
