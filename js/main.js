// Task database — add new tasks here
const tasks = [
  {
    id: "01-ip-plan-nettverkskart",
    title: "IP-plan og nettverkskart for Nordic Cloud Solutions",
    description: "Design en komplett IP-plan med VLAN-struktur og tegn nettverkskart for en voksende IT-bedrift.",
    tag: "Driftsstøtte",
    fag: "Nettverk",
    tid: "4–6 timer",
    km: ["KM-02", "KM-05"]
  },
  {
    id: "placeholder-02",
    title: "Nye oppgaver kommer snart...",
    description: "Her blir det lagt til flere oppgaver innen brukerstøtte, sikkerhet, skripting, virtualisering og utvikling.",
    tag: "Kommer",
    fag: "",
    tid: "",
    km: []
  }
];

// Render task grid
const grid = document.getElementById('task-grid');
if (grid) {
  grid.innerHTML = tasks.map(t => {
    const url = t.id.startsWith('placeholder') ? '#' : `/oppgaver/${t.id}.html`;
    const classes = t.id.startsWith('placeholder') ? 'task-card disabled' : 'task-card';
    const kmTags = t.km.map(k => `<span>${k}</span>`).join('');
    return `
      <a href="${url}" class="${classes}">
        <div class="tag">${t.tag}</div>
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="meta">
          ${t.fag ? `<span>${t.fag}</span>` : ''}
          ${t.tid ? `<span>${t.tid}</span>` : ''}
          ${kmTags}
        </div>
      </a>
    `;
  }).join('');
}
