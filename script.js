const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
let students = JSON.parse(localStorage.getItem("students")) || [];

// Save to local storage
function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Render student data in table
function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = tableBody.insertRow();

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
  });
}

function validateInputs(name, studentId, email, contact) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^\d+$/;
  const contactRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !studentId || !email || !contact) {
    alert("Please fill in all fields.");
    return false;
  }

  if (!nameRegex.test(name)) {
    alert("Student name should contain only letters and spaces.");
    return false;
  }

  if (!idRegex.test(studentId)) {
    alert("Student ID should contain only numbers.");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!contactRegex.test(contact)) {
    alert("Contact number should be a 10-digit number.");
    return false;
  }

  return true;
}


// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!validateInputs(name, studentId, email, contact)) {
    alert("Invalid input! Check your fields.");
    return;
  }

  students.push({ name, studentId, email, contact });
  saveToLocalStorage();
  renderTable();
  form.reset();
});

// Delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}

// Edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  deleteStudent(index);
}

// Initial render
renderTable();
