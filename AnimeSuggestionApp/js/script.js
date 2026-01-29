const modalContainer = document.getElementById("modalContainer");

fetch("components/modal.html")
.then(r => r.text())
.then(html => {
  modalContainer.innerHTML = html;

  document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
  };
});
