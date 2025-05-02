function sendCode() {
  const email = document.getElementById("email").value;
  fetch('send_code.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'email=' + encodeURIComponent(email)
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    document.getElementById("email-form").style.display = "none";
    document.getElementById("code-form").style.display = "block";
  });
}

function verifyCode() {
  const code = document.getElementById("verification-code").value;
  fetch('verify_code.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'code=' + encodeURIComponent(code)
  })
  .then(res => res.text())
  .then(data => {
    if (data === 'verified') {
      document.getElementById("code-form").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      loadExpenses();
    } else {
      alert("کۆدی هەڵەیە");
    }
  });
}

const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const total = document.getElementById("total-amount");

let expenses = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("expense-name").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const date = document.getElementById("expense-date").value;
  expenses.push({ name, amount, date });
  saveExpenses();
  updateList();
  form.reset();
});

function updateList() {
  list.innerHTML = "";
  let sum = 0;
  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${exp.name}</strong> - ${exp.amount} دینار<br><small>${exp.date}</small>`;
    list.appendChild(li);
    sum += exp.amount;
  });
  total.textContent = sum.toFixed(2);
}

function saveExpenses() {
  localStorage.setItem("user_expenses", JSON.stringify(expenses));
}

function loadExpenses() {
  const stored = localStorage.getItem("user_expenses");
  if (stored) {
    expenses = JSON.parse(stored);
    updateList();
  }
}