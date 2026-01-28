let steps = [];
let index = 0;
let capA = 4;
let capB = 3;

function solve() {
  capA = parseInt(capA = document.getElementById("capA").value);
  capB = parseInt(document.getElementById("capB").value);
  let goal = parseInt(document.getElementById("goal").value);

  fetch("/solve", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({capA, capB, goal})
  })
  .then(res => res.json())
  .then(data => {
    steps = data;
    index = 0;
    renderStateSpace();
    update();
  });
}

function renderStateSpace() {
  let ul = document.getElementById("stateList");
  ul.innerHTML = "";
  steps.forEach(s => {
    let li = document.createElement("li");
    li.innerText = `(${s[0]}, ${s[1]})`;
    ul.appendChild(li);
  });
}

function update() {
  let [a, b] = steps[index];
  document.getElementById("jugA").style.height = (a / capA) * 100 + "%";
  document.getElementById("jugB").style.height = (b / capB) * 100 + "%";
  document.getElementById("stateText").innerText =
    `Step ${index}: (${a}, ${b})`;
}

function nextStep() {
  if (index < steps.length - 1) {
    index++;
    update();
  }
}
