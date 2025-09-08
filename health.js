// Basic form handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      form.reset();
    });
  }

  // Sidebar logic
  const sidebar = document.getElementById("sidebar");
  const sidebarFloatBtn = document.getElementById("sidebarFloatBtn");
  const sidebarClose = document.getElementById("sidebarClose");
  const userPhotoBtns = [
    document.getElementById("userPhoto"),
    sidebarFloatBtn ? sidebarFloatBtn.querySelector(".user-photo") : null
  ];

  function openSidebar() {
    if (sidebar) sidebar.classList.add("open");
    if (sidebarFloatBtn) sidebarFloatBtn.style.display = "none";
  }
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");
    if (sidebarFloatBtn) sidebarFloatBtn.style.display = "flex";
  }

  // Open sidebar when user photo (floating or inside sidebar) is clicked
  userPhotoBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", openSidebar);
    }
  });
  // Close sidebar when close icon is clicked
  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  // Close sidebar when clicking outside (optional UX)
  document.addEventListener("click", (e) => {
    if (
      sidebar &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !sidebarFloatBtn.contains(e.target)
    ) {
      closeSidebar();
    }
  });
});
