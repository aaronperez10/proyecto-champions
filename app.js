// Datos simulados de partidos de la Champions League
const matchesData = [
    {
        id: 1,
        homeTeam: "Real Madrid",
        homeFlag: "🇪🇸",
        awayTeam: "Manchester City",
        awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        homeScore: 2,
        awayScore: 2,
        status: "live", // live, finished, upcoming
        time: "78'",
        stadium: "Santiago Bernabéu"
    },
    {
        id: 2,
        homeTeam: "Bayern München",
        homeFlag: "🇩🇪",
        awayTeam: "Paris Saint-Germain",
        awayFlag: "🇫🇷",
        homeScore: 3,
        awayScore: 1,
        status: "finished",
        time: "Finalizado",
        stadium: "Allianz Arena"
    },
    {
        id: 3,
        homeTeam: "Barcelona",
        homeFlag: "🇪🇸",
        awayTeam: "Liverpool",
        awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        time: "Mañana, 21:00",
        stadium: "Spotify Camp Nou"
    },
    {
        id: 4,
        homeTeam: "Inter Milán",
        homeFlag: "🇮🇹",
        awayTeam: "Arsenal",
        awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        homeScore: 1,
        awayScore: 0,
        status: "live",
        time: "65'",
        stadium: "San Siro"
    },
    {
        id: 5,
        homeTeam: "Borussia Dortmund",
        homeFlag: "🇩🇪",
        awayTeam: "Atlético de Madrid",
        awayFlag: "🇪🇸",
        homeScore: 2,
        awayScore: 1,
        status: "finished",
        time: "Finalizado",
        stadium: "Signal Iduna Park"
    },
    {
        id: 6,
        homeTeam: "AC Milan",
        homeFlag: "🇮🇹",
        awayTeam: "Bayer Leverkusen",
        awayFlag: "🇩🇪",
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        time: "Mañana, 18:45",
        stadium: "San Siro"
    }
];

// Datos simulados de clasificación
const standingsData = [
    { pos: 1, team: "Bayern München", flag: "🇩🇪", pj: 6, g: 5, e: 1, p: 0, gf: 18, gc: 5, pts: 16 },
    { pos: 2, team: "Real Madrid", flag: "🇪🇸", pj: 6, g: 4, e: 2, p: 0, gf: 15, gc: 7, pts: 14 },
    { pos: 3, team: "Manchester City", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", pj: 6, g: 4, e: 1, p: 1, gf: 16, gc: 8, pts: 13 },
    { pos: 4, team: "Inter Milán", flag: "🇮🇹", pj: 6, g: 4, e: 1, p: 1, gf: 11, gc: 4, pts: 13 },
    { pos: 5, team: "Paris Saint-Germain", flag: "🇫🇷", pj: 6, g: 3, e: 2, p: 1, gf: 12, gc: 8, pts: 11 },
    { pos: 6, team: "Borussia Dortmund", flag: "🇩🇪", pj: 6, g: 3, e: 1, p: 2, gf: 10, gc: 9, pts: 10 },
    { pos: 7, team: "Liverpool", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", pj: 5, g: 3, e: 1, p: 1, gf: 9, gc: 6, pts: 10 },
    { pos: 8, team: "Barcelona", flag: "🇪🇸", pj: 5, g: 3, e: 0, p: 2, gf: 13, gc: 9, pts: 9 }
];

// Elementos del DOM
const matchesContainer = document.getElementById('matches-container');
const standingsTbody = document.getElementById('standings-tbody');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let searchQuery = '';

// Renderizar Partidos
function renderMatches() {
    matchesContainer.innerHTML = '';

    const filteredMatches = matchesData.filter(match => {
        const matchesFilter = currentFilter === 'all' || match.status === currentFilter;
        const matchesSearch = match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredMatches.length === 0) {
        matchesContainer.innerHTML = `<div class="no-results">No se encontraron partidos que coincidan con la búsqueda.</div>`;
        return;
    }

    filteredMatches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';

        let statusText = '';
        let statusClass = '';

        if (match.status === 'live') {
            statusText = '🔴 En Vivo';
            statusClass = 'status-live';
        } else if (match.status === 'finished') {
            statusText = '✅ Finalizado';
            statusClass = 'status-finished';
        } else {
            statusText = '⏳ Próximo';
            statusClass = 'status-upcoming';
        }

        card.innerHTML = `
            <div class="match-header">
                <span class="match-status ${statusClass}">${statusText}</span>
                <span class="match-time">${match.time}</span>
            </div>
            <div class="match-teams">
                <div class="team">
                    <div class="team-info">
                        <span class="team-flag">${match.homeFlag}</span>
                        <span>${match.homeTeam}</span>
                    </div>
                    <span class="team-score">${match.status === 'upcoming' ? '-' : match.homeScore}</span>
                </div>
                <div class="team">
                    <div class="team-info">
                        <span class="team-flag">${match.awayFlag}</span>
                        <span>${match.awayTeam}</span>
                    </div>
                    <span class="team-score">${match.status === 'upcoming' ? '-' : match.awayScore}</span>
                </div>
            </div>
            <div class="match-footer">
                🏟️ ${match.stadium}
            </div>
        `;

        matchesContainer.appendChild(card);
    });
}

// Renderizar Tabla de Clasificación
function renderStandings() {
    standingsTbody.innerHTML = '';

    standingsData.forEach(row => {
        const tr = document.createElement('tr');

        let posClass = '';
        if (row.pos <= 8) {
            posClass = 'pos-top8';
        } else {
            posClass = 'pos-playoff';
        }

        const dgPrefix = row.gf - row.gc > 0 ? '+' : '';

        tr.innerHTML = `
            <td><span class="pos-badge ${posClass}">${row.pos}</span></td>
            <td class="team-cell">
                <span class="team-flag">${row.flag}</span>
                <span>${row.team}</span>
            </td>
            <td>${row.pj}</td>
            <td>${row.g}</td>
            <td>${row.e}</td>
            <td>${row.p}</td>
            <td>${row.gf}</td>
            <td>${row.gc}</td>
            <td>${dgPrefix}${row.gf - row.gc}</td>
            <td><strong>${row.pts}</strong></td>
        `;

        standingsTbody.appendChild(tr);
    });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderMatches();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderMatches();
    });
});

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderMatches();
    renderStandings();
});
