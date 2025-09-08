// Search & Filter
const searchBar = document.getElementById("searchBar");
const filterSelect = document.getElementById("filterSelect");
const cards = document.querySelectorAll(".scheme-section");

function filterSchemes() {
  const searchText = searchBar.value.toLowerCase();
  const filter = filterSelect.value;

  cards.forEach(card => {
    const title = card.querySelector("h2").innerText.toLowerCase();
    const category = card.getAttribute("data-category");

    if (
      (title.includes(searchText) || searchText === "") &&
      (filter === "all" || filter === category)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchBar.addEventListener("input", filterSchemes);
filterSelect.addEventListener("change", filterSchemes);

// Eligibility Checker
const form = document.getElementById("eligibilityForm");
const resultDiv = document.getElementById("eligibilityResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const age = parseInt(document.getElementById("age").value);
  const occupation = document.getElementById("occupation").value;
  const income = parseInt(document.getElementById("income").value);

  let eligibleSchemes = [];

  if (income < 200000) {
    eligibleSchemes.push("Ayushman Bharat (Health Insurance)");
  }
  if (occupation === "worker" || occupation === "farmer") {
    eligibleSchemes.push("e-Sanjeevani (Telemedicine)");
    eligibleSchemes.push("Wellness Centres");
  }
  if (age < 25 && occupation === "student") {
    eligibleSchemes.push("Health Education & Awareness Programs");
  }
  eligibleSchemes.push("National Digital Health Mission (Health ID)");

  if (eligibleSchemes.length > 0) {
    resultDiv.innerHTML = `<i class='fas fa-check-circle'></i> <span style='font-weight:600;'>You may be eligible for:</span><ul style='margin:8px 0 0 0; padding-left:18px;'>${eligibleSchemes.map(s => `<li>${s}</li>`).join("")}</ul>`;
  } else {
    resultDiv.innerHTML = `<i class='fas fa-times-circle'></i> <span style='font-weight:600;'>No schemes match your details.</span>`;
  }
});
// Existing filtering code...

document.getElementById("downloadPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  // Colors (match website theme)
  const primaryColor = [0, 150, 136]; // Teal
  const darkColor = [0, 77, 64];      // Dark Teal

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...darkColor);
  doc.text("Government Health Schemes Report", 14, y);
  y += 10;

  // Loop through schemes
  document.querySelectorAll(".scheme-section").forEach(section => {
    if (section.style.display !== "none") {
      const title = section.querySelector("h2").innerText;
      const desc = section.querySelector("p") ? section.querySelector("p").innerText : "";
      const points = Array.from(section.querySelectorAll("ul li")).map(li => "• " + li.innerText);

      // Section Title Box
      doc.setFillColor(...primaryColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.rect(14, y, 180, 8, "F");
      doc.text(title, 16, y + 6);
      y += 12;

      // Description
      if (desc) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        let splitDesc = doc.splitTextToSize(desc, 180);
        doc.text(splitDesc, 14, y);
        y += splitDesc.length * 6;
      }

      // Points
      points.forEach(pt => {
        let splitText = doc.splitTextToSize(pt, 170);
        doc.text(splitText, 18, y);
        y += splitText.length * 6;
        if (y > 260) { 
          addFooter(doc);
          doc.addPage();
          y = 20;
        }
      });

      y += 8;
      if (y > 260) { 
        addFooter(doc);
        doc.addPage();
        y = 20;
      }
    }
  });

  // Footer on last page
  addFooter(doc);

  doc.save("Government_Schemes.pdf");

  // Footer Function
  function addFooter(doc) {
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Digital Health Record System | SIH 2025", 14, 290);
  }
});
