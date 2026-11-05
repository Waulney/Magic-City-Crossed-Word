const I18N = {
    fr: {
        levelWord: "Niveau",
        scoreWord: "Trouvés",
        instruction: "Consigne : Glisse ton doigt ou ta souris de manière fluide pour relier les mots en ligne droite.",
        wordsTitle: "Mots à chercher :",
        modalSuccessTitle: "Niveau Validé ! 🎉",
        modalSuccessDesc: "Prêt pour le niveau suivant ?",
        modalFinalTitle: "Parcours Terminé ! 🏆",
        modalFinalDesc: "Félicitations, vous avez complété les 20 niveaux de Magic City Fun Park !",
        nextBtn: "Niveau Suivant",
        replayBtn: "Rejouer depuis le début",
        timeLabel: "Temps réalisé :"
    },
    en: {
        levelWord: "Level",
        scoreWord: "Found",
        instruction: "Instruction: Slide your finger or mouse smoothly to connect words in a straight line.",
        wordsTitle: "Words to find:",
        modalSuccessTitle: "Level Validated! 🎉",
        modalSuccessDesc: "Ready for the next level?",
        modalFinalTitle: "Journey Completed! 🏆",
        modalFinalDesc: "Congratulations, you completed all 20 Magic City Fun Park levels!",
        nextBtn: "Next Level",
        replayBtn: "Play Again from Start",
        timeLabel: "Time taken:"
    }
};

const LEVELS = [
    {
        title: { fr: "Niveau 1 : Les Prénoms Fondateurs", en: "Level 1: Founding First Names" },
        words: ["JEAN", "HENRI", "ALEXANDRE", "PIERRE", "LOUIS"]
    },
    {
        title: { fr: "Niveau 2 : Les Noms - Débuts", en: "Level 2: Last Names - Beginnings" },
        words: ["PETION", "BOYER", "HERARD", "PIERROT", "RICHE"]
    },
    {
        title: { fr: "Niveau 3 : Le Vocabulaire du Vote", en: "Level 3: Voting Vocabulary" },
        words: ["VOTE", "URNE", "LOI", "LISTE", "CHOIX"]
    },
    {
        title: { fr: "Niveau 4 : Prénoms République", en: "Level 4: Republic First Names" },
        words: ["SYLVAIN", "NISSAGE", "MICHEL", "LYSIUS", "FLORVIL"]
    },
    {
        title: { fr: "Niveau 5 : Les Noms - 19e Siècle", en: "Level 5: 19th Century Names" },
        words: ["SALNAVE", "SAGET", "DOMINGUE", "SALOMON", "LEGITIME"]
    },
    {
        title: { fr: "Niveau 6 : Campagne & Politique", en: "Level 6: Campaign & Politics" },
        words: ["CAMP", "PARTI", "DEBAT", "CIVIC", "VOIX"]
    },
    {
        title: { fr: "Niveau 7 : Prénoms Époque Classique", en: "Level 7: Classic Era First Names" },
        words: ["TIRESIAS", "ANTOINE", "CINCIN", "TANCREDE", "ORESTE"]
    },
    {
        title: { fr: "Niveau 8 : Les Noms - Début 20e", en: "Level 8: Early 20th Century Names" },
        words: ["BORNO", "ROY", "VINCENT", "LESCOT", "LAVAUD"]
    },
    {
        title: { fr: "Niveau 9 : Démocratie & Pouvoir", en: "Level 9: Democracy & Power" },
        words: ["DROIT", "ETAT", "PAIX", "MAIRE", "JUGER"]
    },
    {
        title: { fr: "Niveau 10 : Prénoms Modernisation", en: "Level 10: Modernization First Names" },
        words: ["DUMARSAIS", "PAUL", "JOSEPH", "DANIEL", "FRANCOIS"]
    },
    {
        title: { fr: "Niveau 11 : Les Noms - Ère Duvalier", en: "Level 11: Duvalier Era Names" },
        words: ["ESTIME", "MAGGLIO", "SYLVAIN", "FIGNOLE", "DUVALIER"]
    },
    {
        title: { fr: "Niveau 12 : Élections & Citoyenneté", en: "Level 12: Elections & Citizenship" },
        words: ["PEUPLE", "SIGNE", "TERME", "APPEL", "CADRE"]
    },
    {
        title: { fr: "Niveau 13 : Prénoms Transition", en: "Level 13: Transition First Names" },
        words: ["LESLIE", "PROSPER", "ERTHA", "EMILE", "RENE"]
    },
    {
        title: { fr: "Niveau 14 : Les Noms Récents", en: "Level 14: Recent Names" },
        words: ["ARISTIDE", "PREVAL", "MARTELLY", "PRIVERT", "MOISE"]
    },
    {
        title: { fr: "Niveau 15 : Le Processus Électoral", en: "Level 15: The Electoral Process" },
        words: ["NOTE", "POSTE", "AGENT", "RESULT", "BLOC"]
    },
    {
        title: { fr: "Niveau 16 : Prénoms Époque Contemporaine", en: "Level 16: Contemporary First Names" },
        words: ["JOCELERME", "JOVENEL", "ARIEL", "CLAUDE", "GARY"]
    },
    {
        title: { fr: "Niveau 17 : Institutions & Lois", en: "Level 17: Institutions & Laws" },
        words: ["CODE", "NORME", "TEXTE", "CHARTE", "BASE"]
    },
    {
        title: { fr: "Niveau 18 : Engagement & Avenir", en: "Level 18: Commitment & Future" },
        words: ["LUTTE", "ESPOIR", "FUTUR", "UNION", "PATRI"]
    },
    {
        title: { fr: "Niveau 19 : Consultation Populaire", en: "Level 19: Public Consultation" },
        words: ["MAIRE", "CONSI", "TABLE", "FORCE", "ACTION"]
    },
    {
        title: { fr: "20. Magic City Ultime", en: "20. Ultimate Magic City" },
        words: ["MAGIC", "CITY", "PARK", "HAITI", "FUTUR"]
    }
];

let currentLang = 'fr';
let currentLevelIndex = 0;
let grid = [];
let placedWords = [];
let foundWords = new Set();
let selectedCells = [];
let isInteracting = false;
let startCell = null;

let timerInterval = null;
let secondsElapsed = 0;
const GRID_SIZE = 10;

document.addEventListener('DOMContentLoaded', () => {
    initLevel(currentLevelIndex);

    document.getElementById('langSelect').addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateUIStaticTexts();
        initLevel(currentLevelIndex);
    });

    document.getElementById('themeToggleBtn').addEventListener('click', () => {
        document.body.classList.toggle('theme-light');
        const btn = document.getElementById('themeToggleBtn');
        btn.innerText = document.body.classList.contains('theme-light') ? '🌙' : '☀️';
    });

    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        document.getElementById('levelModal').classList.add('hidden');
        currentLevelIndex++;
        if (currentLevelIndex >= LEVELS.length) {
            currentLevelIndex = 0;
        }
        initLevel(currentLevelIndex);
    });

    window.addEventListener('mouseup', endSelection);
    window.addEventListener('touchend', endSelection);
});

function updateUIStaticTexts() {
    const t = I18N[currentLang];
    document.getElementById('gameInstruction').innerText = t.instruction;
    document.getElementById('wordsToFindTitle').innerText = t.wordsTitle;
}

function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (secondsElapsed % 60).toString().padStart(2, '0');
    document.getElementById('timerDisplay').innerText = `⏱️ ${mins}:${secs}`;
}

function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (currentLang === 'fr') {
        if (mins > 0) return `${mins} minute(s) et ${secs} seconde(s)`;
        return `${secs} seconde(s)`;
    } else {
        if (mins > 0) return `${mins} minute(s) and ${secs} second(s)`;
        return `${secs} second(s)`;
    }
}

function initLevel(levelIdx) {
    const levelData = LEVELS[levelIdx];
    const t = I18N[currentLang];
    const wordsForLang = levelData.words; // Les noms restent identiques quelle que soit la langue
    
    document.getElementById('levelDisplay').innerText = `${t.levelWord} ${levelIdx + 1} / ${LEVELS.length}`;
    document.getElementById('levelThemeTitle').innerText = levelData.title[currentLang];
    updateUIStaticTexts();
    
    foundWords.clear();
    generateGrid(wordsForLang);
    renderWordList(wordsForLang);
    renderGrid();
    startTimer();
}

function generateGrid(words) {
    grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    placedWords = [];

    words.forEach(word => {
        let placed = false;
        let attempts = 0;
        const cleanWord = word.replace(/[^A-Z]/g, '');

        while (!placed && attempts < 100) {
            attempts++;
            const direction = Math.floor(Math.random() * 3);
            let row = Math.floor(Math.random() * GRID_SIZE);
            let col = Math.floor(Math.random() * GRID_SIZE);

            if (canPlaceWord(cleanWord, row, col, direction)) {
                placeWord(cleanWord, row, col, direction);
                placedWords.push({ word: cleanWord, coords: getWordCoords(cleanWord, row, col, direction) });
                placed = true;
            }
        }
    });

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }
}

function canPlaceWord(word, row, col, dir) {
    const len = word.length;
    if (dir === 0 && col + len > GRID_SIZE) return false;
    if (dir === 1 && row + len > GRID_SIZE) return false;
    if (dir === 2 && (col + len > GRID_SIZE || row + len > GRID_SIZE)) return false;

    for (let i = 0; i < len; i++) {
        let r = row + (dir === 1 || dir === 2 ? i : 0);
        let c = col + (dir === 0 || dir === 2 ? i : 0);
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            return false;
        }
    }
    return true;
}

function placeWord(word, row, col, dir) {
    for (let i = 0; i < word.length; i++) {
        let r = row + (dir === 1 || dir === 2 ? i : 0);
        let c = col + (dir === 0 || dir === 2 ? i : 0);
        grid[r][c] = word[i];
    }
}

function getWordCoords(word, row, col, dir) {
    let coords = [];
    for (let i = 0; i < word.length; i++) {
        let r = row + (dir === 1 || dir === 2 ? i : 0);
        let c = col + (dir === 0 || dir === 2 ? i : 0);
        coords.push(`${r}-${c}`);
    }
    return coords;
}

function renderGrid() {
    const container = document.getElementById('gridContainer');
    container.innerHTML = '';

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.innerText = grid[r][c];

            cell.addEventListener('mousedown', (e) => { e.preventDefault(); startSelection(r, c); });
            cell.addEventListener('mouseenter', () => { if (isInteracting) updateSelection(r, c); });

            cell.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startSelection(r, c);
            }, { passive: false });

            cell.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (!isInteracting) return;
                const touch = e.touches[0];
                const target = document.elementFromPoint(touch.clientX, touch.clientY);
                if (target && target.classList.contains('grid-cell')) {
                    updateSelection(parseInt(target.dataset.row), parseInt(target.dataset.col));
                }
            }, { passive: false });

            container.appendChild(cell);
        }
    }
}

function renderWordList(words) {
    const container = document.getElementById('wordList');
    container.innerHTML = '';
    const t = I18N[currentLang];
    words.forEach(word => {
        const chip = document.createElement('div');
        chip.classList.add('word-chip');
        chip.id = `chip-${word}`;
        chip.innerText = word;
        container.appendChild(chip);
    });
    document.getElementById('scoreDisplay').innerText = `${t.scoreWord} : 0 / ${words.length}`;
}

function startSelection(r, c) {
    isInteracting = true;
    startCell = { r, c };
    selectedCells = [`${r}-${c}`];
    updateCellStyles();
}

function updateSelection(r, c) {
    if (!isInteracting || !startCell) return;

    let dr = r - startCell.r;
    let dc = c - startCell.c;
    
    let steps = Math.max(Math.abs(dr), Math.abs(dc));
    if (steps === 0) {
        selectedCells = [`${startCell.r}-${startCell.c}`];
        updateCellStyles();
        return;
    }

    let stepR = dr === 0 ? 0 : dr / steps;
    let stepC = dc === 0 ? 0 : dc / steps;

    if (Math.abs(stepR) !== Math.abs(stepC) && stepR !== 0 && stepC !== 0) {
        return;
    }

    selectedCells = [];
    for (let i = 0; i <= steps; i++) {
        let currR = Math.round(startCell.r + (i * stepR));
        let currC = Math.round(startCell.c + (i * stepC));
        selectedCells.push(`${currR}-${currC}`);
    }

    updateCellStyles();
}

function endSelection() {
    if (!isInteracting) return;
    isInteracting = false;
    startCell = null;

    let formedWord = selectedCells.map(key => {
        const [r, c] = key.split('-').map(Number);
        return grid[r][c];
    }).join('');

    const currentWords = LEVELS[currentLevelIndex].words;
    let matched = placedWords.find(pw => pw.word === formedWord || pw.word === formedWord.split('').reverse().join(''));
    const t = I18N[currentLang];

    if (matched && currentWords.includes(matched.word) && !foundWords.has(matched.word)) {
        foundWords.add(matched.word);
        
        selectedCells.forEach(key => {
            const cell = document.querySelector(`[data-row='${key.split('-')[0]}'][data-col='${key.split('-')[1]}']`);
            if (cell) cell.classList.add('found');
        });

        const chip = document.getElementById(`chip-${matched.word}`);
        if (chip) chip.classList.add('found');

        document.getElementById('scoreDisplay').innerText = `${t.scoreWord} : ${foundWords.size} / ${currentWords.length}`;

        if (foundWords.size === currentWords.length) {
            stopTimer();
            setTimeout(showLevelModal, 400);
        }
    }

    selectedCells = [];
    updateCellStyles();
}

function updateCellStyles() {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        const key = `${cell.dataset.row}-${cell.dataset.col}`;
        if (selectedCells.includes(key)) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}

function showLevelModal() {
    const modal = document.getElementById('levelModal');
    const t = I18N[currentLang];
    const timeFormatted = formatTime(secondsElapsed);
    
    document.getElementById('modalTimeResult').innerText = `${t.timeLabel} ${timeFormatted}`;
    
    if (currentLevelIndex === LEVELS.length - 1) {
        document.getElementById('modalTitle').innerText = t.modalFinalTitle;
        document.getElementById('modalDesc').innerText = t.modalFinalDesc;
        document.getElementById('nextLevelBtn').innerText = t.replayBtn;
    } else {
        document.getElementById('modalTitle').innerText = t.modalSuccessTitle;
        document.getElementById('modalDesc').innerText = t.modalSuccessDesc;
        document.getElementById('nextLevelBtn').innerText = t.nextBtn;
    }
    modal.classList.remove('hidden');
}