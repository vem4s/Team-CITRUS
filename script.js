// script.js
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});
// Gets members from json file and displays them in the team section
fetch('members.json')
  .then(response => response.json())
  .then(members => {
    const grid = document.querySelector('.team-grid');
    if (!grid) return;
    grid.innerHTML = '';
    members.forEach(member => {
      const div = document.createElement('div');
      div.className = 'member';
      div.innerHTML = `<h3><a class="plain-link" href="https://trackmania.io/#/player/${member.accountId}">${member.name}</a></h3><p>${member.role}</p>`;
      grid.appendChild(div);
    });
  })
  .catch(err => {
    // fallback if the JSON file cannot be loaded
    const grid = document.querySelector('.team-grid');
    if (grid) {
      grid.innerHTML = '<div class="member"><p>Couldnt load member data sorry</p></div>';
    }
    console.error('error when loading member data:', err);
  });