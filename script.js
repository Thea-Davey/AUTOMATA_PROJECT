// ============================================================
//  AUTOMATA SIMULATOR — NindtenDON'T Edition
//  Script.js — UI Interactions + DFA Logic
// ============================================================

// ============================================================
// 1. VIS.JS GRAPH SETUP — DFA DATABASES
// ============================================================

// --- REGEX 1 DFA (a, b) ---
const DFA_NODES_1 = [
    { id: '-', label: '-', x: -600, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', vadjust: 1, size: 32 } },
    { id: 's1', label: 's1', x: -380, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's2', label: 's2', x: -160, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },

    { id: 's3', label: 's3', x: 60, y: -150, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's4', label: 's4', x: 60, y: 150, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's5', label: 's5', x: 280, y: -150, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's6', label: 's6', x: 280, y: 150, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },

    { id: 's7', label: 's7', x: 500, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: '+', label: '+', x: 720, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', vadjust: 3, size: 24 } }
];

const DFA_EDGES_1 = [
    { from: '-', to: 's1', label: 'a', arrows: 'to', smooth: false },
    { from: '-', to: 's2', label: 'b', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.4 } },
    { from: 's1', to: 's2', label: 'a', arrows: 'to', smooth: false },
    { from: 's1', to: 's2', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.6 } },
    { from: 's2', to: 's3', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 's2', to: 's4', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's3', to: 's5', label: 'a', arrows: 'to', smooth: false },
    { from: 's3', to: 's4', label: 'b', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 's4', to: 's3', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 's4', to: 's6', label: 'b', arrows: 'to', smooth: false },

    // Curved these two lines to separate the crossing labels
    { from: 's5', to: 's4', label: 'b', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.1 } },
    { from: 's6', to: 's3', label: 'a', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.1 } },

    { from: 's5', to: 's7', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 's6', to: 's7', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's7', to: '+', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.4 } },
    { from: 's7', to: '+', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.4 } },
    { from: '+', to: '+', label: 'a, b', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.6 } }
];

// --- REGEX 2 DFA (0, 1) ---
const DFA_NODES_2 = [
    { id: '-', label: '-', x: -400, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', vadjust: 1, size: 32 } },
    { id: 's1', label: 's1', x: -200, y: -120, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's2', label: 's2', x: -200, y: 120, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's3', label: 's3', x: 0, y: -120, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's4', label: 's4', x: 0, y: 120, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's5', label: 's5', x: 200, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's6', label: 's6', x: 350, y: -90, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's7', label: 's7', x: 350, y: 90, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: 's8', label: 's8', x: 500, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', size: 16 } },
    { id: '+', label: '+', x: 700, y: 0, shape: 'circle', color: { background: '#424f5a', border: '#424f5a' }, font: { color: 'white', vadjust: 3, size: 24 } }
];

const DFA_EDGES_2 = [
    { from: '-', to: 's1', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: '-', to: 's2', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's1', to: 's3', label: '0', arrows: 'to' },
    { from: 's1', to: 's5', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.5 } },
    { from: 's2', to: 's4', label: '1', arrows: 'to' },
    { from: 's2', to: 's5', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.5 } },
    { from: 's3', to: 's5', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 's3', to: 's2', label: '0', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 's4', to: 's1', label: '1', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's4', to: 's5', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's5', to: 's6', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 's5', to: 's7', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's6', to: 's7', label: '0', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 's7', to: 's6', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 's6', to: 's8', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 's7', to: 's8', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 's8', to: '+', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.4 } },
    { from: 's8', to: '+', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.4 } },
    { from: '+', to: '+', label: '1,0', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.8 } }
];

// ============================================================
// PDA REGEX 1 FLOWCHART DATA
// ============================================================
const PDA_NODES_1 = [
    // Column 1
    { id: 'start', label: 'START', x: -600, y: 0, group: 'pdaTerminator' },

    // Column 2 (First split)
    { id: 'r1', label: 'READ1', x: -400, y: 0, group: 'pdaDiamond' },
    { id: 'r2', label: 'READ2', x: -400, y: 200, group: 'pdaDiamond' },

    // Column 3 (Central Hub & 2x2 Grid)
    { id: 'r3', label: 'READ3', x: -200, y: 0, group: 'pdaDiamond' },

    { id: 'r4', label: 'READ4', x: 0, y: -160, group: 'pdaDiamond' },
    { id: 'r5', label: 'READ5', x: 0, y: 160, group: 'pdaDiamond' },

    { id: 'r6', label: 'READ6', x: 200, y: -160, group: 'pdaDiamond' },
    { id: 'r7', label: 'READ7', x: 200, y: 160, group: 'pdaDiamond' },

    // Column 4 & 5
    { id: 'r8', label: 'READ8', x: 400, y: 0, group: 'pdaDiamond' },
    { id: 'r9', label: 'READ9', x: 600, y: 0, group: 'pdaDiamond' },

    // Column 6
    { id: 'accept', label: 'ACCEPT', x: 800, y: 0, group: 'pdaTerminator' }
];

const PDA_EDGES_1 = [
    { from: 'start', to: 'r1', label: '', arrows: 'to', smooth: false },

    // Initial splits
    { from: 'r1', to: 'r3', label: 'b', arrows: 'to', smooth: false },
    { from: 'r1', to: 'r2', label: 'a', arrows: 'to', smooth: false },

    // READ2 loops back to READ3 hub
    { from: 'r2', to: 'r3', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.3 } },
    { from: 'r2', to: 'r3', label: 'a', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.6 } },

    // Hub to top-left (a) and bottom-left (b)
    { from: 'r3', to: 'r4', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.15 } },
    { from: 'r3', to: 'r5', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.15 } },

    // Top row: READ4 → READ6 (a)
    { from: 'r4', to: 'r6', label: 'a', arrows: 'to', smooth: false },

    // Bottom row: READ5 → READ7 (b)
    { from: 'r5', to: 'r7', label: 'b', arrows: 'to', smooth: false },

    // Cross connections in the 2x2 grid
    { from: 'r4', to: 'r5', label: 'b', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 'r6', to: 'r5', label: 'b', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.25 } },
    { from: 'r5', to: 'r4', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 'r7', to: 'r4', label: 'a', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.25 } },

    // Right-side exit bus to READ8
    { from: 'r6', to: 'r8', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 'r7', to: 'r8', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },

    // READ8 to READ9
    { from: 'r8', to: 'r9', label: 'a', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.4 } },
    { from: 'r8', to: 'r9', label: 'b', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.4 } },

    // READ9 self-loops & Accept
    { from: 'r9', to: 'r9', label: 'a', arrows: 'to', selfReferenceSize: 40, smooth: { type: 'curvedCW', roundness: 0.5 } },
    { from: 'r9', to: 'r9', label: 'b', arrows: 'to', selfReferenceSize: 40, smooth: { type: 'curvedCCW', roundness: 0.5 } },
    { from: 'r9', to: 'accept', label: 'Δ', arrows: 'to', smooth: false }
];

// ============================================================
// PDA REGEX 2 FLOWCHART DATA 
// ============================================================
const PDA_NODES_2 = [
    // Column 1
    { id: 'start', label: 'START', x: -400, y: 0, group: 'pdaTerminator' },

    // Column 2 (Hub & branches)
    { id: 'r1', label: 'READ1', x: -200, y: -180, group: 'pdaDiamond' },
    { id: 'r2', label: 'READ2', x: -200, y: 0, group: 'pdaDiamond' },
    { id: 'r3', label: 'READ3', x: -200, y: 180, group: 'pdaDiamond' },

    // Column 2b (Outer branches)
    { id: 'r4', label: 'READ4', x: 0, y: -180, group: 'pdaDiamond' },
    { id: 'r5', label: 'READ5', x: 0, y: 180, group: 'pdaDiamond' },

    // Column 3 (Center trio)
    { id: 'r6', label: 'READ6', x: 200, y: 0, group: 'pdaDiamond' },
    { id: 'r7', label: 'READ7', x: 400, y: -180, group: 'pdaDiamond' },
    { id: 'r8', label: 'READ8', x: 400, y: 180, group: 'pdaDiamond' },

    // Column 4 & 5
    { id: 'r9', label: 'READ9', x: 600, y: 0, group: 'pdaDiamond' },
    { id: 'r10', label: 'READ10', x: 800, y: 0, group: 'pdaDiamond' },

    // Column 6
    { id: 'accept', label: 'ACCEPT', x: 1000, y: 0, group: 'pdaTerminator' }
];

const PDA_EDGES_2 = [
    { from: 'start', to: 'r2', label: '', arrows: 'to', smooth: false },

    // Col 2 internal (from hub READ2)
    { from: 'r2', to: 'r1', label: '1', arrows: 'to', smooth: false },
    { from: 'r2', to: 'r3', label: '0', arrows: 'to', smooth: false },
    { from: 'r1', to: 'r4', label: '0', arrows: 'to', smooth: false },
    { from: 'r3', to: 'r5', label: '1', arrows: 'to', smooth: false },

    // Col 2 to Col 3 (converging on READ6)
    { from: 'r1', to: 'r6', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.7 } },
    { from: 'r4', to: 'r6', label: '1', arrows: 'to', smooth: false },
    { from: 'r3', to: 'r6', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.7 } },
    { from: 'r5', to: 'r6', label: '0', arrows: 'to', smooth: false },

    { from: 'r4', to: 'r3', label: '0', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },
    { from: 'r5', to: 'r1', label: '1', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },

    // Col 3 internal (READ6 hub splits to READ7 top and READ8 bottom)
    { from: 'r6', to: 'r8', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 'r6', to: 'r7', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },

    { from: 'r7', to: 'r8', label: '0', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },
    { from: 'r8', to: 'r7', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.3 } },

    // Col 3 to Col 4 (exits to READ9)
    { from: 'r8', to: 'r9', label: '0', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.2 } },
    { from: 'r7', to: 'r9', label: '1', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } },

    // Col 4 & 5 (Final validation characters)
    { from: 'r9', to: 'r10', label: '1', arrows: 'to', smooth: { type: 'curvedCCW', roundness: 0.4 } },
    { from: 'r9', to: 'r10', label: '0', arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.4 } },
    { from: 'r10', to: 'r10', label: '1,0', arrows: 'to', selfReferenceSize: 40, smooth: { type: 'curvedCCW', roundness: 0.5 } },
    { from: 'r10', to: 'accept', label: 'Δ', arrows: 'to', smooth: false }
];

// ============================================================
// 2. LIVE DATASET CONTAINERS (Linked to vis.Network)
// ============================================================

// We pass our DFA array directly into the initial DataSet instances
const nodes = new vis.DataSet();
const edges = new vis.DataSet();

const container = document.getElementById('automata-network');
const data = { nodes, edges };

const options = {
    physics: false,
    interaction: {
        dragNodes: false,
        zoomView: true,
        dragView: true,
        selectConnectedEdges: false
    },
    groups: {
        pdaDiamond: {
            shape: 'diamond',
            size: 45,
            color: { background: '#2D3748', border: '#2D3748' },
            font: { color: 'white', size: 14, bold: true, vadjust: -70 }
        },
        pdaTerminator: {
            shape: 'ellipse',
            widthConstraint: { minimum: 70 },
            heightConstraint: { minimum: 40 },
            color: { background: '#2D3748', border: '#2D3748' },
            font: { color: 'white', size: 14, bold: true }
        }
    },
    nodes: {
        widthConstraint: { minimum: 35, maximum: 55 },
        heightConstraint: { minimum: 35, valign: 'middle' },
        font: { align: 'center', vadjust: 1 },
        color: { highlight: { background: '#73B5A8', border: '#5a9b8f' } }
    },
    edges: {
        width: 1,
        font: { size: 16, align: 'horizontal', bold: true, strokeWidth: 16, strokeColor: '#FFFFFF' },
        color: { color: '#000', highlight: undefined }
    }
};

const network = new vis.Network(container, data, options);

// Centre graph after layout
setTimeout(() => {
    network.fit({
        animation: { duration: 500, easingFunction: 'easeOutQuart' }
    });
}, 50);

// ============================================================
// 2.  DFA LOGIC DICTIONARIES
// ============================================================

const dfaLogic1 = {
    initial: '-',
    accepting: ['+'],
    transitions: {
        '-': { 'a': 's1', 'b': 's2' },
        's1': { 'a': 's2', 'b': 's2' },
        's2': { 'a': 's3', 'b': 's4' },
        's3': { 'a': 's5', 'b': 's4' },
        's4': { 'a': 's3', 'b': 's6' },
        's5': { 'a': 's7', 'b': 's4' },
        's6': { 'a': 's3', 'b': 's7' },
        's7': { 'a': '+', 'b': '+' },
        '+': { 'a': '+', 'b': '+' }
    }
};

const dfaLogic2 = {
    initial: '-',
    accepting: ['+'],
    transitions: {
        '-': { '1': 's1', '0': 's2' },
        's1': { '0': 's3', '1': 's5' },
        's2': { '1': 's4', '0': 's5' },
        's3': { '1': 's5', '0': 's2' },
        's4': { '1': 's1', '0': 's5' },
        's5': { '1': 's6', '0': 's7' },
        's6': { '0': 's7', '1': 's8' },
        's7': { '1': 's6', '0': 's8' },
        's8': { '1': '+', '0': '+' },
        '+': { '1': '+', '0': '+' }
    }
};

let isSimulating = false;
let cancelSimulationFlag = false;
let currentModel = null; // Tracks active screen view: 'dfa', 'cfg', or 'pda'

// ============================================================
// AUDIO CONTROLLER
// ============================================================
const bgm = document.getElementById('bgm-audio');
const sfxInsert = document.getElementById('sfx-insert');
const sfxEject = document.getElementById('sfx-eject');
const sfxBtn = document.getElementById('sfx-btn');

function playSFX(audioEl) {
    if (!audioEl) return;
    audioEl.currentTime = 0; // Reset to start for rapid clicking
    audioEl.volume = 0.6;    // Adjust volume (0.0 to 1.0)
    audioEl.play().catch(e => console.log("SFX blocked by browser", e));
}


// ============================================================
// 3.  CARTRIDGE INTERACTION
// ============================================================

let activeCartridgeId = null;

// Helper to reset validate buttons back to default state
function resetValidateButtons() {
    document.querySelectorAll('.validate-btn').forEach(btn => {
        btn.classList.remove('accepted', 'rejected', 'done-state', 'simulating-state');
        btn.textContent = 'VALIDATE';
    });
}

function selectCartridge(cartridgeEl) {
    const regexId = cartridgeEl.dataset.regex;
    const otherRegexId = regexId === '1' ? '2' : '1';
    const otherEl = document.getElementById(`cartridge-${otherRegexId}`);

    // If a simulation is running, cancel it
    if (isSimulating) {
        cancelSimulationFlag = true;
    }

    if (cartridgeEl.classList.contains('inserted')) {
        // Eject cartridge on second click
        playSFX(sfxEject);
        cartridgeEl.classList.remove('inserted');
        activeCartridgeId = null;
        document.getElementById('regex-display-text').textContent = 'Select a regex';
        turnOffTV();
        return;
    }

    // Eject the other cartridge
    if (otherEl.classList.contains('inserted')) {
        playSFX(sfxEject);
        otherEl.classList.remove('inserted');
        turnOffTV();
    }

    // Insert this one
    playSFX(sfxInsert); // <--- ADDED SOUND
    cartridgeEl.classList.add('inserted');
    activeCartridgeId = regexId;

    // Clear/hide the current state container on regex switch
    const stateContainer = document.getElementById('current-state-container');
    if (stateContainer) stateContainer.classList.add('hidden');
    const simNotifBox = document.getElementById('sim-notif-box');
    if (simNotifBox) simNotifBox.classList.add('hidden');

    // Reset validate buttons to default
    resetValidateButtons();

    updateRegexDisplayBar(regexId);
    playTVPowerOn(regexId);
}

function turnOffTV() {
    const tvScreen = document.getElementById('tv-screen');
    const networkEl = document.getElementById('automata-network');
    const canvas = document.getElementById('tv-static-canvas');
    const titleScreen = document.getElementById('tv-title-screen');
    const cfgDisplay = document.getElementById('cfg-display');
    const pdaDisplay = document.getElementById('pda-display');

    // Hide static canvas & retro custom text layers
    canvas.style.display = 'none';
    if (titleScreen) titleScreen.classList.add('hidden');
    if (cfgDisplay) cfgDisplay.classList.add('hidden');
    if (pdaDisplay) pdaDisplay.classList.add('hidden');

    // Hide recenter button & tracking toggle
    const recenterBtn = document.getElementById('btn-recenter');
    const toggleBtn = document.getElementById('btn-toggle-tracking');
    if (recenterBtn) recenterBtn.classList.add('hidden');
    if (toggleBtn) toggleBtn.classList.add('hidden');

    // Turn off TV light/color
    tvScreen.classList.remove('tv-on');

    // Hide automata graph view
    networkEl.style.opacity = '0';

    // Hide state container overlays
    const stateContainer = document.getElementById('current-state-container');
    const finalContainer = document.getElementById('final-state-container');
    if (stateContainer) stateContainer.classList.add('hidden');
    if (finalContainer) finalContainer.classList.add('hidden');
    const simNotifBox = document.getElementById('sim-notif-box');
    if (simNotifBox) simNotifBox.classList.add('hidden');

    // Deactivate model buttons & reset tracking mode
    const all = document.querySelectorAll('.model-btn');
    all.forEach(b => b.classList.remove('active'));
    currentModel = null;

    // Disable simulation controls
    document.querySelectorAll('.validate-btn, .add-more-btn, .string-input').forEach(btn => btn.disabled = true);

    // --- NEW: Reset string simulation inputs ---
    const simulationList = document.getElementById('simulation-list');
    if (simulationList) {
        const rows = simulationList.querySelectorAll('.input-row');
        // Remove all extra rows except the first one
        for (let i = 1; i < rows.length; i++) {
            rows[i].remove();
        }
        // Clear the text and status of the first row
        if (rows.length > 0) {
            const firstInput = rows[0].querySelector('.string-input');
            const firstStatus = rows[0].querySelector('.status-text');
            if (firstInput) firstInput.value = '';
            if (firstStatus) {
                firstStatus.textContent = '';
                firstStatus.className = 'status-text';
            }
        }
    }

    // Reset validate buttons to default
    resetValidateButtons();

    // Make sure the "+ ADD MORE" button resets its visibility
    checkAddMoreLimit();

    // Reset any nodes styling inside live dataset
    nodes.forEach(node => {
        nodes.update({ id: node.id, color: { background: '#424f5a', border: '#424f5a' } });
    });
}


function updateRegexDisplayBar(regexId) {
    const el = document.getElementById('regex-display-text');
    if (regexId === '2') {
        el.textContent = '(1 + 0)* (11 + 00 + 101 + 010) (1 + 0 + 11 + 00 + 101)* (11+ 00) (11 + 00+ 101)* (1 + 0) (1 + 0 + 11)*';
    } else {
        el.textContent = '(b + aa + ab ) (a + b)* (bb + aba +ab)* (aaa + bbb) (a + b) (a + b +ab)*';
    }
}

// ============================================================
// 4.  CRT POWER-ON  (canvas-based static)
// ============================================================

function playTVPowerOn(regexId) {
    const canvas = document.getElementById('tv-static-canvas');
    const ctx = canvas.getContext('2d');
    const tvScreen = document.getElementById('tv-screen');
    const networkEl = document.getElementById('automata-network');

    // Reset state
    tvScreen.classList.remove('tv-on');
    networkEl.style.opacity = '0';

    // Use a small resolution for authentic pixelated static
    canvas.width = 160;
    canvas.height = 120;

    // Wait for cartridge drop before starting CRT sequence
    setTimeout(() => {
        canvas.style.display = 'block';

        let startTime = null;
        const crtPhase = 350;   // ms: scanline expansion
        const noiseFade = 600;   // ms: full static noise
        const total = crtPhase + noiseFade;

        function animate(ts) {
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;

            if (elapsed < crtPhase) {
                // --- Phase 1: CRT scanline expanding from centre ---
                const progress = elapsed / crtPhase;
                const lineHeight = Math.max(2, Math.floor(progress * canvas.height));
                const y = Math.floor((canvas.height - lineHeight) / 2);

                // Dark background
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Expanding white bar
                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + progress * 0.5})`;
                ctx.fillRect(0, y, canvas.width, lineHeight);

                // Add noise inside the expanding bar once it's big enough
                if (progress > 0.25) {
                    const noiseH = Math.floor(lineHeight);
                    const noiseImg = ctx.createImageData(canvas.width, noiseH);
                    for (let i = 0; i < noiseImg.data.length; i += 4) {
                        const v = Math.random() * 255;
                        noiseImg.data[i] = v;
                        noiseImg.data[i + 1] = v;
                        noiseImg.data[i + 2] = v;
                        noiseImg.data[i + 3] = Math.floor(40 + Math.random() * 120);
                    }
                    ctx.putImageData(noiseImg, 0, y);
                }

                requestAnimationFrame(animate);

            } else if (elapsed < total) {
                // --- Phase 2: full-screen static noise ---
                const noiseImg = ctx.createImageData(canvas.width, canvas.height);
                for (let i = 0; i < noiseImg.data.length; i += 4) {
                    const v = Math.random() * 255;
                    noiseImg.data[i] = v;
                    noiseImg.data[i + 1] = v;
                    noiseImg.data[i + 2] = v;
                    noiseImg.data[i + 3] = 180 + Math.floor(Math.random() * 75);
                }
                ctx.putImageData(noiseImg, 0, 0);

                // Occasional horizontal glitch lines
                if (Math.random() > 0.6) {
                    const gy = Math.floor(Math.random() * canvas.height);
                    ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.5})`;
                    ctx.fillRect(0, gy, canvas.width, 1 + Math.floor(Math.random() * 3));
                }

                requestAnimationFrame(animate);

            } else {
                // --- Done: turn TV on ---
                canvas.style.display = 'none';
                tvScreen.classList.add('tv-on');

                // Deactivate model buttons on cartridge insert/switch
                const all = document.querySelectorAll('.model-btn');
                all.forEach(b => b.classList.remove('active'));

                // Set Title Screen details dynamically
                const titleRegex = document.getElementById('title-card-regex');
                const titleAlpha = document.getElementById('title-card-alphabet');
                if (regexId === '2') {
                    titleRegex.textContent = 'REGEX 2';
                    titleAlpha.textContent = 'Σ = {0, 1}';
                } else {
                    titleRegex.textContent = 'REGEX 1';
                    titleAlpha.textContent = 'Σ = {a, b}';
                }

                // Show Title Screen and hide automata graph
                const titleScreen = document.getElementById('tv-title-screen');
                if (titleScreen) titleScreen.classList.remove('hidden');
                networkEl.style.opacity = '0';

                // Ensure HUD panels are hidden on boot sequence
                const cfgDisplay = document.getElementById('cfg-display');
                const pdaDisplay = document.getElementById('pda-display');
                if (cfgDisplay) cfgDisplay.classList.add('hidden');
                if (pdaDisplay) pdaDisplay.classList.add('hidden');
                currentModel = null;
            }
        }

        requestAnimationFrame(animate);
    }, 380);
}

// ============================================================
// 5.  MODEL BUTTON PUSH-DOWN TOGGLE
// ============================================================

function selectModel(btn) {
    if (!activeCartridgeId) return; // ignore clicks if no cartridge is inserted

    const wasActive = btn.classList.contains('active');

    // Deactivate all buttons
    const all = document.querySelectorAll('.model-btn');
    all.forEach(b => b.classList.remove('active'));

    const titleScreen = document.getElementById('tv-title-screen');
    const networkEl = document.getElementById('automata-network');
    const recenterBtn = document.getElementById('btn-recenter');
    const cfgDisplay = document.getElementById('cfg-display');
    const pdaDisplay = document.getElementById('pda-display');

    if (wasActive) {
        if (titleScreen) titleScreen.classList.remove('hidden');
        if (networkEl) networkEl.style.opacity = '0';
        if (cfgDisplay) cfgDisplay.classList.add('hidden');
        if (pdaDisplay) pdaDisplay.classList.add('hidden');

        if (recenterBtn) recenterBtn.classList.add('hidden');
        const toggleBtn = document.getElementById('btn-toggle-tracking');
        if (toggleBtn) toggleBtn.classList.add('hidden');
        const stateContainer = document.getElementById('current-state-container');
        const finalContainer = document.getElementById('final-state-container');
        if (stateContainer) stateContainer.classList.add('hidden');
        if (finalContainer) finalContainer.classList.add('hidden');
        const simNotifBox = document.getElementById('sim-notif-box');
        if (simNotifBox) simNotifBox.classList.add('hidden');

        document.querySelectorAll('.validate-btn, .add-more-btn, .string-input').forEach(el => el.disabled = true);
        currentModel = null;
    } else {
        // Clicked/Selected!
        btn.classList.add('active');

        if (titleScreen) titleScreen.classList.add('hidden');
        if (recenterBtn) recenterBtn.classList.add('hidden');
        document.querySelectorAll('.validate-btn, .add-more-btn, .string-input').forEach(el => el.disabled = false);

        const toggleBtn = document.getElementById('btn-toggle-tracking');
        if (btn.id === 'btn-dfa' || btn.id === 'btn-pda') {
            if (toggleBtn) toggleBtn.classList.remove('hidden');
        } else {
            if (toggleBtn) toggleBtn.classList.add('hidden');
        }

        if (btn.id === 'btn-dfa') {
            currentModel = 'dfa';
            if (networkEl) networkEl.style.opacity = '1';
            if (cfgDisplay) cfgDisplay.classList.add('hidden');
            if (pdaDisplay) pdaDisplay.classList.add('hidden');

            nodes.clear();
            edges.clear();

            if (activeCartridgeId === '1') {
                nodes.add(DFA_NODES_1);
                edges.add(DFA_EDGES_1);
            } else {
                nodes.add(DFA_NODES_2);
                edges.add(DFA_EDGES_2);
            }

            setTimeout(() => {
                network.fit({ animation: { duration: 300 } });
            }, 50);

        } else if (btn.id === 'btn-cfg') {
            currentModel = 'cfg';
            if (networkEl) networkEl.style.opacity = '0'; // Hide graph layout
            if (cfgDisplay) cfgDisplay.classList.remove('hidden'); // Show retro text layout
            if (pdaDisplay) pdaDisplay.classList.add('hidden');

            // Render specific CFG HTML based on active cartridge
            if (activeCartridgeId === '1') {
                // REGEX 1 CFG
                cfgDisplay.innerHTML = `
                    <div class="cfg-container">
                        <div class="cfg-header">CONTEXT-FREE GRAMMAR (CFG) - REGEX 1</div>
                        <div class="cfg-body">
                            <div class="cfg-tuple">G = (V, &lambda;, R, S)</div>
                            <div class="cfg-row"><span class="cfg-var">Variables (V):</span> {S, A, B, C, D, E, F}</div>
                            <div class="cfg-row"><span class="cfg-var">Terminals (&Sigma;):</span> {a, b}</div>
                            <div class="cfg-row"><span class="cfg-var">Start Symbol:</span> S</div>
                            <div class="cfg-divider">────────────────────────</div>
                            <div class="cfg-rules-title">PRODUCTION RULES (R):</div>
                            <div class="cfg-rules-grid">
                                <div class="cfg-rule"><span>S</span> <span>&rarr;</span> <span>A B C D E F</span></div>
                                <div class="cfg-rule"><span>A</span> <span>&rarr;</span> <span>b | aa | ab</span></div>
                                <div class="cfg-rule"><span>B</span> <span>&rarr;</span> <span>aB | bB | &lambda;</span></div>
                                <div class="cfg-rule"><span>C</span> <span>&rarr;</span> <span>bbC | abaC | abC | &lambda;</span></div>
                                <div class="cfg-rule"><span>D</span> <span>&rarr;</span> <span>aaa | bbb</span></div>
                                <div class="cfg-rule"><span>E</span> <span>&rarr;</span> <span>a | b</span></div>
                                <div class="cfg-rule"><span>F</span> <span>&rarr;</span> <span>aF | bF | abF | &lambda;</span></div>
                            </div>
                            <div class="cfg-status-wrapper">
                                <span class="cfg-status-label">STRING EVALUATION:</span>
                                <span class="cfg-status-text" id="cfg-status-text"></span>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // REGEX 2 CFG 
                cfgDisplay.innerHTML = `
                    <div class="cfg-container">
                        <div class="cfg-header">CONTEXT-FREE GRAMMAR (CFG) - REGEX 2</div>
                        <div class="cfg-body">
                            <div class="cfg-tuple">G = (V, &lambda;, R, S)</div>
                            <div class="cfg-row"><span class="cfg-var">Variables (V):</span> {S, A, B, C, D, E, F, G}</div>
                            <div class="cfg-row"><span class="cfg-var">Terminals (&Sigma;):</span> {0, 1}</div>
                            <div class="cfg-row"><span class="cfg-var">Start Symbol:</span> S</div>
                            <div class="cfg-divider">────────────────────────</div>
                            <div class="cfg-rules-title">PRODUCTION RULES (R):</div>
                            <div class="cfg-rules-grid">
                                <div class="cfg-rule"><span>S</span> <span>&rarr;</span> <span>A B C D E F G</span></div>
                                <div class="cfg-rule"><span>A</span> <span>&rarr;</span> <span>0A | 1A | &lambda;</span></div>
                                <div class="cfg-rule"><span>B</span> <span>&rarr;</span> <span>11 | 00 | 101 | 010</span></div>
                                <div class="cfg-rule"><span>C</span> <span>&rarr;</span> <span>0C | 1C | 11C | 00C | 101C | &lambda;</span></div>
                                <div class="cfg-rule"><span>D</span> <span>&rarr;</span> <span>11 | 00</span></div>
                                <div class="cfg-rule"><span>E</span> <span>&rarr;</span> <span>11E | 00E | 101E | &lambda;</span></div>
                                <div class="cfg-rule"><span>F</span> <span>&rarr;</span> <span>0 | 1</span></div>
                                <div class="cfg-rule"><span>G</span> <span>&rarr;</span> <span>0G | 1G | 11G | &lambda;</span></div>
                            </div>
                            <div class="cfg-status-wrapper">
                                <span class="cfg-status-label">STRING EVALUATION:</span>
                                <span class="cfg-status-text" id="cfg-status-text"></span>
                            </div>
                        </div>
                    </div>
                `;
            }

        } else if (btn.id === 'btn-pda') {
            currentModel = 'pda';
            if (networkEl) networkEl.style.opacity = '1';
            if (cfgDisplay) cfgDisplay.classList.add('hidden');
            if (pdaDisplay) pdaDisplay.classList.remove('hidden');

            nodes.clear();
            edges.clear();

            const pdaInfoBox = document.querySelector('.pda-info-box');

            if (activeCartridgeId === '1') {


                nodes.add(PDA_NODES_1);
                edges.add(PDA_EDGES_1);

                setTimeout(() => {
                    network.fit({ animation: { duration: 300 } });
                }, 50);

            } else {

                nodes.add(PDA_NODES_2);
                edges.add(PDA_EDGES_2);

                setTimeout(() => {
                    network.fit({ animation: { duration: 300 } });
                }, 50);
            }
        }
    }
}

// ============================================================
// 6.  SIMULATION INPUT ROWS
// ============================================================

function addInputRow() {
    const list = document.getElementById('simulation-list');
    const currentCount = list.querySelectorAll('.input-row').length;
    if (currentCount >= 5) return; // safeguard limit of 5

    const newRow = document.createElement('div');
    newRow.className = 'input-row';
    const isModelActive = document.querySelector('.model-btn.active') !== null;
    const disabledAttr = isModelActive ? '' : 'disabled';
    newRow.innerHTML = `
        <div class="input-wrapper">
            <button class="delete-btn" onclick="deleteRow(this)" title="Remove text field">✕</button>
            <input type="text" placeholder="Enter a string" class="string-input" ${disabledAttr}>
            <span class="status-text"></span>
        </div>
        <button class="btn validate-btn" onclick="validateRow(this)" ${disabledAttr}>VALIDATE</button>
    `;
    list.appendChild(newRow);
    checkAddMoreLimit();
}

function deleteRow(buttonElement) {
    const list = document.getElementById('simulation-list');
    if (list.children.length > 1) {
        buttonElement.closest('.input-row').remove();
    } else {
        const row = buttonElement.closest('.input-row');
        const input = row.querySelector('.string-input');
        const statusText = input.nextElementSibling;
        const validateBtn = row.querySelector('.validate-btn');
        input.value = '';
        statusText.textContent = '';
        statusText.className = 'status-text';
        if (validateBtn) {
            validateBtn.classList.remove('accepted', 'rejected', 'done-state');
            validateBtn.textContent = 'VALIDATE';
        }
    }

    // Hide current state container when row is cleared or deleted
    const stateContainer = document.getElementById('current-state-container');
    if (stateContainer) stateContainer.classList.add('hidden');
    const simNotifBox = document.getElementById('sim-notif-box');
    if (simNotifBox) simNotifBox.classList.add('hidden');

    // Clear CFG status typewriter text
    const cfgStatusTextEl = document.getElementById('cfg-status-text');
    if (cfgStatusTextEl) {
        cfgStatusTextEl.textContent = '';
        cfgStatusTextEl.className = 'cfg-status-text';
    }
    const cfgStringDisplayEl = document.getElementById('cfg-string-display');
    if (cfgStringDisplayEl) cfgStringDisplayEl.innerHTML = '';

    resetNodeStyles();
    resetAllEdges();
    recenterGraph();

    checkAddMoreLimit();
}

function checkAddMoreLimit() {
    const list = document.getElementById('simulation-list');
    const count = list.querySelectorAll('.input-row').length;
    const addMoreBtn = document.querySelector('.add-more-btn');

    if (addMoreBtn) {
        if (count >= 5) {
            addMoreBtn.classList.add('hidden');
        } else {
            addMoreBtn.classList.remove('hidden');
        }
    }
}

// ============================================================
// 7.  STRING VALIDATION
// ============================================================

function formatStateLabel(state) {
    if (state === '-') return 'initial state';
    if (state === '+') return 'final state';
    return state;
}

const sleep = (ms) => new Promise((resolve, reject) => {
    let elapsed = 0;
    const interval = setInterval(() => {
        if (cancelSimulationFlag) {
            clearInterval(interval);
            reject(new Error('CANCEL_SIMULATION'));
        }
        elapsed += 50;
        if (elapsed >= ms) {
            clearInterval(interval);
            resolve();
        }
    }, 50);
});

async function validateRow(buttonElement) {
    if (isSimulating) {
        if (buttonElement.classList.contains('simulating-state')) {
            cancelSimulationFlag = true;
        }
        return;
    }

    const row = buttonElement.closest('.input-row');
    const inputField = row.querySelector('.string-input');
    const statusText = row.querySelector('.status-text');
    const stateContainer = document.getElementById('current-state-container');
    const currentStateLabel = document.getElementById('current-state-label');
    const simNotifBox = document.getElementById('sim-notif-box');
    const simNotifLabel = document.getElementById('sim-notif-label');
    const stringData = inputField.value.trim();

    if (stringData === '') {
        statusText.textContent = '';
        statusText.className = 'status-text';
        return;
    }

    stateContainer.classList.remove('hidden');
    if (simNotifBox) simNotifBox.classList.add('hidden');
    buttonElement.classList.remove('accepted', 'rejected', 'done-state');

    cancelSimulationFlag = false;
    isSimulating = true;
    buttonElement.classList.add('simulating-state');
    buttonElement.textContent = 'CANCEL';

    statusText.textContent = '';
    statusText.className = 'status-text';

    try {

        // Clear previous node and edge styles
        resetNodeStyles();
        resetAllEdges();
        const cfgRules = document.querySelectorAll('.cfg-rule');
        cfgRules.forEach(r => r.classList.remove('cfg-highlight'));
        const cfgStatusTextEl = document.getElementById('cfg-status-text');
        if (cfgStatusTextEl) {
            cfgStatusTextEl.textContent = '';
            cfgStatusTextEl.className = 'cfg-status-text';
        }
        const cfgStringDisplayReset = document.getElementById('cfg-string-display');
        if (cfgStringDisplayReset) cfgStringDisplayReset.innerHTML = '';

        // 1. Pick the exact logic map based on the active cartridge
        let currentDfaLogic = activeCartridgeId === '1' ? dfaLogic1 : dfaLogic2;

        // 2. Run string lookup calculation behind the scenes
        let lookupState = currentDfaLogic.initial;
        let stringIsValid = true;
        for (let i = 0; i < stringData.length; i++) {
            const char = stringData[i];
            if (!currentDfaLogic.transitions[lookupState] || !currentDfaLogic.transitions[lookupState][char]) {
                stringIsValid = false;
                break;
            }
            lookupState = currentDfaLogic.transitions[lookupState][char];
        }
        if (!currentDfaLogic.accepting.includes(lookupState)) stringIsValid = false;

        // ==========================================
        // BRAND EXECUTION STREAM BY MODEL MODE
        // ==========================================
        if (currentModel === 'dfa') {
            let currentState = currentDfaLogic.initial;

            for (let i = 0; i < stringData.length; i++) {
                const char = stringData[i];
                currentStateLabel.textContent = formatStateLabel(currentState);

                // 1. Highlight current node
                nodes.update({ id: currentState, color: { background: '#73B5A8', border: '#5a9b8f' } });
                if (network && followTrackingEnabled) network.focus(currentState, { scale: 1.2, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
                await sleep(400);

                if (!currentDfaLogic.transitions[currentState] || !currentDfaLogic.transitions[currentState][char]) {
                    currentState = null;
                    break;
                }

                let nextState = currentDfaLogic.transitions[currentState][char];

                // 2. Find and highlight the specific edge connecting them
                let activeEdge = edges.get({
                    filter: function (item) {
                        // Added safety check (item.label &&) to prevent crashes
                        return item.from === currentState && item.to === nextState && item.label && item.label.includes(char);
                    }
                });

                let edgeId = activeEdge.length > 0 ? activeEdge[0].id : null;

                if (edgeId) {
                    edges.update({ id: edgeId, color: { color: '#73B5A8' }, width: 3 });
                    await sleep(300); // Hold the highlighted line
                    edges.update({ id: edgeId, color: { color: '#f97316' }, width: 2 }); // Keep the trail
                } else {
                    await sleep(300);
                }

                // 3. Turn off current node and move forward
                nodes.update({ id: currentState, color: { background: '#424f5a', border: '#424f5a' } });
                currentState = nextState;
            }

            if (currentState) {
                currentStateLabel.textContent = formatStateLabel(currentState);
                nodes.update({ id: currentState, color: { background: '#73B5A8', border: '#5a9b8f' } });
                if (network && followTrackingEnabled) network.focus(currentState, { scale: 1.2, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
                await sleep(400); // Give the user time to see it actually land on the final state
            }

            // Final Validation Check
            currentStateLabel.textContent = currentState ? formatStateLabel(currentState) : 'Rejected';

            if (currentState && currentDfaLogic.accepting.includes(currentState)) {
                statusText.textContent = '✔';
                statusText.classList.add('accepted');
                buttonElement.classList.remove('rejected');
                buttonElement.classList.add('accepted');
                nodes.update({ id: currentState, color: { background: '#34d399', border: '#059669' } });

                if (simNotifBox && simNotifLabel) {
                    simNotifLabel.textContent = 'ACCEPTED';
                    simNotifBox.className = 'sim-notif-box accepted';
                    simNotifBox.classList.remove('hidden');
                }
            } else {
                statusText.textContent = '✖';
                statusText.classList.add('rejected');
                buttonElement.classList.remove('accepted');
                buttonElement.classList.add('rejected');
                if (currentState) {
                    nodes.update({ id: currentState, color: { background: '#ef4444', border: '#b91c1c' } });
                }

                if (simNotifBox && simNotifLabel) {
                    simNotifLabel.textContent = 'REJECTED';
                    simNotifBox.className = 'sim-notif-box rejected';
                    simNotifBox.classList.remove('hidden');
                }
            }

        } else if (currentModel === 'cfg') {

            // Hide top-left HUD elements for CFG (using rules grid instead)
            if (stateContainer) stateContainer.classList.add('hidden');
            if (simNotifBox) simNotifBox.classList.add('hidden');

            const rules = document.querySelectorAll('.cfg-rule');
            const cfgStatusText = document.getElementById('cfg-status-text');

            // ══════════════════════════════════════════════
            // PRIORITY-BASED CFG PARSER
            // Step 1: Find required (non-*) segments first
            // Step 2: Fill in optional (* / Kleene) segments
            // Returns array of { rule, start, end } or null
            // ══════════════════════════════════════════════

            let traceSegments = null; // array of { rule: index, start: charIdx, end: charIdx }
            let parsedSuccess = false;

            if (activeCartridgeId === '1') {
                // REGEX 1: (b+aa+ab)(a+b)*(bb+aba+ab)*(aaa+bbb)(a+b)(a+b+ab)*
                // Rules: S(0), A(1), B(2), C(3), D(4), E(5), F(6)
                // Required: A(b|aa|ab), D(aaa|bbb), E(a|b)
                // Optional: B([ab]*), C((bb|aba|ab)*), F([ab]*)
                traceSegments = parseCFGRegex1(stringData, stringIsValid);
            } else {
                // REGEX 2: (1+0)*(11+00+101+010)(1+0+11+00+101)*(11+00)(11+00+101)*(1+0)(1+0+11)*
                // Rules: S(0), A(1), B(2), C(3), D(4), E(5), F(6), G(7)
                // Required: B(11|00|101|010), D(11|00), F(0|1)
                // Optional: A([01]*), C([01]*), E((11|00|101)*), G([01]*)
                traceSegments = parseCFGRegex2(stringData, stringIsValid);
            }

            if (traceSegments) parsedSuccess = stringIsValid;

            // ── Fallback for rejected strings: partial greedy parse ──
            if (!traceSegments) {
                traceSegments = activeCartridgeId === '1'
                    ? partialParseCFG1(stringData)
                    : partialParseCFG2(stringData);
            }

            // ── Run sequential visual tracing ──
            for (let s = 0; s < traceSegments.length; s++) {
                const seg = traceSegments[s];
                const matchedStr = stringData.slice(seg.start, seg.end);

                // Highlight the production rule (mint)
                rules.forEach(r => {
                    r.classList.remove('cfg-highlight');
                    const rhs = r.querySelectorAll('span')[2];
                    if (rhs && rhs.dataset.origHtml) {
                        rhs.innerHTML = rhs.dataset.origHtml; // restore original
                    }
                });

                if (rules[seg.rule]) {
                    const r = rules[seg.rule];
                    r.classList.add('cfg-highlight');

                    if (seg.rule > 0) {
                        const rhs = r.querySelectorAll('span')[2];
                        if (rhs) {
                            if (!rhs.dataset.origHtml) rhs.dataset.origHtml = rhs.innerHTML;
                            let html = rhs.dataset.origHtml;

                            if (seg.start === seg.end) {
                                // Empty match! Highlight lambda if present
                                if (html.includes('&lambda;')) {
                                    html = html.replace('&lambda;', '<span class="cfg-char-active">&lambda;</span>');
                                } else {
                                    html = html + ` <span class="cfg-char-active" style="margin-left: 8px;">[&lambda;]</span>`;
                                }
                            } else {
                                // Try to find the exact matched string as a standalone option
                                const parts = html.split(' | ');
                                let exactMatchFound = false;
                                for (let i = 0; i < parts.length; i++) {
                                    if (parts[i] === matchedStr) {
                                        parts[i] = `<span class="cfg-char-active">${parts[i]}</span>`;
                                        exactMatchFound = true;
                                        break;
                                    }
                                }

                                if (exactMatchFound) {
                                    html = parts.join(' | ');
                                } else {
                                    // It's a Kleene closure or compound match. Just show what it matched at the end!
                                    html = html + ` <span class="cfg-char-active" style="margin-left: 8px;">[${matchedStr}]</span>`;
                                }
                            }
                            rhs.innerHTML = html;
                        }
                    }
                }

                await sleep(850);
            }

            // Final flash off rules and clear highlights
            rules.forEach(r => {
                r.classList.remove('cfg-highlight');
                const rhs = r.querySelectorAll('span')[2];
                if (rhs && rhs.dataset.origHtml) {
                    rhs.innerHTML = rhs.dataset.origHtml; // restore original
                }
            });
            await sleep(200);

            // ── Result Typing Sequence ──
            let resultText = stringIsValid ? "STRING ACCEPTED" : "STRING REJECTED";
            let resultClass = stringIsValid ? "accepted" : "rejected";

            if (cfgStatusText) {
                for (let i = 0; i < resultText.length; i++) {
                    cfgStatusText.textContent += resultText.charAt(i);
                    await sleep(50);
                }
                cfgStatusText.classList.add(resultClass, 'typing-done');
            }

            if (stringIsValid) {
                statusText.textContent = '✔';
                statusText.classList.add('accepted');
                buttonElement.classList.remove('rejected');
                buttonElement.classList.add('accepted');
                currentStateLabel.textContent = 'Derivation Match!';
            } else {
                statusText.textContent = '✖';
                statusText.classList.add('rejected');
                buttonElement.classList.remove('accepted');
                buttonElement.classList.add('rejected');
                currentStateLabel.textContent = 'No Derivation Rules Found';
            }

        } else if (currentModel === 'pda') {

            // Dynamically assign logic map and targets based on cartridge
            let currentState = activeCartridgeId === '1' ? 'r1' : 'r2';
            let validEndState = activeCartridgeId === '1' ? 'r9' : 'r10';
            let stringIsValid = true;

            const pdaLogic = activeCartridgeId === '1' ? {
                // Regex 1 Rules
                'r1': { 'a': 'r2', 'b': 'r3' },
                'r2': { 'a': 'r3', 'b': 'r3' },
                'r3': { 'a': 'r4', 'b': 'r5' },
                'r4': { 'a': 'r6', 'b': 'r5' },
                'r5': { 'a': 'r4', 'b': 'r7' },
                'r6': { 'a': 'r8', 'b': 'r5' },
                'r7': { 'a': 'r4', 'b': 'r8' },
                'r8': { 'a': 'r9', 'b': 'r9' },
                'r9': { 'a': 'r9', 'b': 'r9' }
            } : {
                // Regex 2 Rules
                'r1': { '0': 'r4', '1': 'r6' },
                'r2': { '1': 'r1', '0': 'r3' },
                'r3': { '1': 'r5', '0': 'r6' },
                'r4': { '0': 'r3', '1': 'r6' },
                'r5': { '1': 'r1', '0': 'r6' },
                'r6': { '1': 'r7', '0': 'r8' },
                'r7': { '0': 'r8', '1': 'r9' },
                'r8': { '1': 'r7', '0': 'r9' },
                'r9': { '0': 'r10', '1': 'r10' },
                'r10': { '0': 'r10', '1': 'r10' }
            };

            // 1. Pulse START node
            currentStateLabel.textContent = `START`;
            nodes.update({ id: 'start', color: { background: '#73B5A8' } });
            if (network && followTrackingEnabled) network.focus('start', { scale: 1.2, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
            await sleep(600);
            nodes.update({ id: 'start', color: { background: '#2D3748' } });

            // 2. Traverse character by character
            for (let i = 0; i < stringData.length; i++) {
                const char = stringData[i];

                // Abort if no valid path exists
                if (!pdaLogic[currentState] || !pdaLogic[currentState][char]) {
                    stringIsValid = false;
                    break;
                }

                currentStateLabel.textContent = `Read: "${char}" -> Processing...`;

                // Highlight current node
                nodes.update({ id: currentState, color: { background: '#73B5A8' } });
                if (network && followTrackingEnabled) network.focus(currentState, { scale: 1.2, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
                await sleep(400);

                let nextState = pdaLogic[currentState][char];

                // Find and highlight the specific edge
                let activeEdge = edges.get({
                    filter: function (item) {
                        // Added safety check (item.label &&)
                        return item.from === currentState && item.to === nextState && item.label && item.label.includes(char);
                    }
                });

                let edgeId = activeEdge.length > 0 ? activeEdge[0].id : null;

                if (edgeId) {
                    edges.update({ id: edgeId, color: { color: '#73B5A8' }, width: 3 });
                    await sleep(300);
                    edges.update({ id: edgeId, color: { color: '#f97316' }, width: 2 }); // Keep the trail
                } else {
                    await sleep(300);
                }

                // Move to next state
                nodes.update({ id: currentState, color: { background: '#2D3748' } });
                currentState = nextState;
            }

            // --- THE VISUAL FIX: Pulse the final landing READ node before processing the Delta
            if (stringIsValid && currentState) {
                nodes.update({ id: currentState, color: { background: '#73B5A8' } });
                if (network && followTrackingEnabled) network.focus(currentState, { scale: 1.2, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });
                await sleep(400);
            }

            // 3. Final Validation
            if (stringIsValid && currentState === validEndState) {
                currentStateLabel.textContent = `End of String (Δ) -> ACCEPT`;

                // Highlight the final Delta transition edge
                let deltaEdge = edges.get({
                    filter: item => item.from === validEndState && item.to === 'accept'
                });
                if (deltaEdge.length > 0) {
                    edges.update({ id: deltaEdge[0].id, color: { color: '#73B5A8' }, width: 3 });
                    await sleep(300);
                    edges.update({ id: deltaEdge[0].id, color: { color: '#f97316' }, width: 2 }); // Keep the trail
                }

                nodes.update({ id: validEndState, color: { background: '#2D3748' } });

                statusText.textContent = '✔';
                statusText.classList.add('accepted');
                buttonElement.classList.remove('rejected');
                buttonElement.classList.add('accepted');
                nodes.update({ id: 'accept', color: { background: '#34d399', border: '#059669' } });
                if (network && followTrackingEnabled) network.focus('accept', { scale: 1.2, animation: { duration: 400, easingFunction: 'easeInOutQuad' } });

                if (simNotifBox && simNotifLabel) {
                    simNotifLabel.textContent = 'ACCEPTED';
                    simNotifBox.className = 'sim-notif-box accepted';
                    simNotifBox.classList.remove('hidden');
                }
            } else {
                statusText.textContent = '✖';
                statusText.classList.add('rejected');
                buttonElement.classList.remove('accepted');
                buttonElement.classList.add('rejected');
                currentStateLabel.textContent = 'Halt: Invalid Pattern Sequence';

                if (stringIsValid && currentState) {
                    nodes.update({ id: currentState, color: { background: '#ef4444', border: '#b91c1c' } });
                }

                if (simNotifBox && simNotifLabel) {
                    simNotifLabel.textContent = 'REJECTED';
                    simNotifBox.className = 'sim-notif-box rejected';
                    simNotifBox.classList.remove('hidden');
                }
            }
        }

        // Play validation sound
        const sfxAccepted = document.getElementById('sfx-accepted');
        const sfxRejected = document.getElementById('sfx-rejected');
        if (stringIsValid) {
            playSFX(sfxAccepted);
            buttonElement.textContent = 'ACCEPTED';
        } else {
            playSFX(sfxRejected);
            buttonElement.textContent = 'REJECTED';
        }

        buttonElement.classList.remove('simulating-state');
        buttonElement.classList.add('done-state');

        // Automatically recenter after tracing is complete
        if (currentModel === 'dfa' || currentModel === 'pda') {
            recenterGraph();
        }

    } catch (e) {
        if (e.message === 'CANCEL_SIMULATION') {
            buttonElement.classList.remove('simulating-state');
            buttonElement.textContent = 'VALIDATE';
            statusText.textContent = '';
            statusText.className = 'status-text';
            resetNodeStyles();
            resetAllEdges();
            if (stateContainer) stateContainer.classList.add('hidden');
            if (simNotifBox) simNotifBox.classList.add('hidden');
            const cfgStatusTextEl = document.getElementById('cfg-status-text');
            if (cfgStatusTextEl) {
                cfgStatusTextEl.textContent = '';
                cfgStatusTextEl.className = 'cfg-status-text';
            }
            const cfgStringDisplayEl = document.getElementById('cfg-string-display');
            if (cfgStringDisplayEl) cfgStringDisplayEl.innerHTML = '';
        } else {
            console.error(e);
        }
    } finally {
        cancelSimulationFlag = false;
        isSimulating = false;
    }
}

// ============================================================
// 7b. CFG PRIORITY-BASED PARSERS
// ============================================================

/**
 * REGEX 1: (b+aa+ab)(a+b)*(bb+aba+ab)*(aaa+bbb)(a+b)(a+b+ab)*
 * Rules: S(0), A(1), B(2), C(3), D(4), E(5), F(6)
 * Required: A(b|aa|ab at start), D(aaa|bbb), E(a|b after D)
 * Optional: B([ab]*), C((bb|aba|ab)*), F([ab]*)
 *
 * Strategy: Find required segments first (D, A, E), then fill in optionals.
 */
function parseCFGRegex1(str, isValid) {
    if (!isValid) return null;
    if (!/^[ab]+$/.test(str)) return null;

    const len = str.length;

    // Step 1: Try each A match at position 0 (longest first for better matching)
    const aOptions = [];
    if (str.startsWith('ab')) aOptions.push('ab');
    if (str.startsWith('aa')) aOptions.push('aa');
    if (str.startsWith('b')) aOptions.push('b');
    // Deduplicate
    const aUnique = [...new Set(aOptions)];

    for (const aMatch of aUnique) {
        const aEnd = aMatch.length;

        // Step 2: Scan for D (aaa|bbb) — requires E(1) after it
        for (let dStart = aEnd; dStart <= len - 4; dStart++) {
            const dSub = str.slice(dStart, dStart + 3);
            if (dSub !== 'aaa' && dSub !== 'bbb') continue;

            // Step 3: E is single char right after D
            const eStart = dStart + 3;
            const eChar = str[eStart];
            if (eChar !== 'a' && eChar !== 'b') continue;

            // Step 4: F is everything after E — always valid [ab]*
            const fStart = eStart + 1;

            // Step 5: Middle between A and D → split into B then C
            const middle = str.slice(aEnd, dStart);

            // Try all split points for B/C (greedy B: start split from middle.length down to 0)
            for (let split = middle.length; split >= 0; split--) {
                const cStr = middle.slice(split);

                // C must match (bb|aba|ab)*
                if (!/^(?:bb|aba|ab)*$/.test(cStr)) continue;

                // Found a valid decomposition!
                return [
                    { rule: 0, start: 0, end: len },           // S → ABCDEF
                    { rule: 1, start: 0, end: aEnd },           // A
                    { rule: 2, start: aEnd, end: aEnd + split }, // B
                    { rule: 3, start: aEnd + split, end: dStart }, // C
                    { rule: 4, start: dStart, end: dStart + 3 }, // D
                    { rule: 5, start: eStart, end: fStart },     // E
                    { rule: 6, start: fStart, end: len }         // F
                ];
            }
        }
    }
    return null;
}

/**
 * REGEX 2: (1+0)*(11+00+101+010)(1+0+11+00+101)*(11+00)(11+00+101)*(1+0)(1+0+11)*
 * Rules: S(0), A(1), B(2), C(3), D(4), E(5), F(6), G(7)
 * Required: B(11|00|101|010), D(11|00), F(0|1)
 * Optional: A([01]*), C([01]*), E((11|00|101)*), G([01]*)
 *
 * Strategy: Find required segments first (B, D, F), then fill in optionals.
 */
function parseCFGRegex2(str, isValid) {
    if (!isValid) return null;
    if (!/^[01]+$/.test(str)) return null;

    const len = str.length;
    const bOptions = ['101', '010', '11', '00'];
    const dOptions = ['11', '00'];

    // Step 1: Try all possible B positions (required) — backwards to make A greedy
    for (let bStart = len; bStart >= 0; bStart--) {
        for (const bMatch of bOptions) {
            const bEnd = bStart + bMatch.length;
            if (bEnd > len) continue;
            if (str.slice(bStart, bEnd) !== bMatch) continue;

            // A = str[0..bStart) — always valid [01]*

            // Step 2: Try all possible D positions after B (required) — backwards to make C greedy
            for (let dStart = len - 2; dStart >= bEnd; dStart--) {
                for (const dMatch of dOptions) {
                    const dEnd = dStart + dMatch.length;
                    if (dEnd > len) continue;
                    if (str.slice(dStart, dEnd) !== dMatch) continue;

                    // C = str[bEnd..dStart) — always valid [01]*

                    // Step 3: Try all possible F positions after D (required) — backwards to make E greedy
                    for (let fPos = len - 1; fPos >= dEnd; fPos--) {
                        const fChar = str[fPos];
                        if (fChar !== '0' && fChar !== '1') continue;

                        // E = str[dEnd..fPos) — must match (11|00|101)*
                        const eStr = str.slice(dEnd, fPos);
                        if (!/^(?:11|00|101)*$/.test(eStr)) continue;

                        // G = str[fPos+1..end) — always valid [01]*

                        return [
                            { rule: 0, start: 0, end: len },           // S
                            { rule: 1, start: 0, end: bStart },        // A
                            { rule: 2, start: bStart, end: bEnd },     // B
                            { rule: 3, start: bEnd, end: dStart },     // C
                            { rule: 4, start: dStart, end: dEnd },     // D
                            { rule: 5, start: dEnd, end: fPos },       // E
                            { rule: 6, start: fPos, end: fPos + 1 },   // F
                            { rule: 7, start: fPos + 1, end: len }     // G
                        ];
                    }
                }
            }
        }
    }
    return null;
}

/**
 * Partial parser for REGEX 1 (rejected strings) — parse as far as possible.
 */
function partialParseCFG1(str) {
    const segments = [{ rule: 0, start: 0, end: str.length }]; // S always
    let pos = 0;

    // A: (b|aa|ab) at start
    let aMatch = str.match(/^(b|aa|ab)/);
    if (!aMatch) return segments;
    segments.push({ rule: 1, start: 0, end: aMatch[0].length });
    pos = aMatch[0].length;

    if (pos >= str.length) return segments;

    // Try to find D in the remainder to determine B and C boundaries
    let foundD = false;
    for (let dStart = pos; dStart <= str.length - 3; dStart++) {
        const dSub = str.slice(dStart, dStart + 3);
        if (dSub === 'aaa' || dSub === 'bbb') {
            // B = between A and potential C/D split
            const middle = str.slice(pos, dStart);
            // Try to split middle into B then C
            for (let split = 0; split <= middle.length; split++) {
                const cStr = middle.slice(split);
                if (/^(?:bb|aba|ab)*$/.test(cStr)) {
                    if (split > 0) segments.push({ rule: 2, start: pos, end: pos + split });
                    if (cStr.length > 0) segments.push({ rule: 3, start: pos + split, end: dStart });
                    segments.push({ rule: 4, start: dStart, end: dStart + 3 });

                    // E
                    if (dStart + 3 < str.length) {
                        segments.push({ rule: 5, start: dStart + 3, end: dStart + 4 });
                        // F
                        if (dStart + 4 < str.length) {
                            segments.push({ rule: 6, start: dStart + 4, end: str.length });
                        }
                    }
                    foundD = true;
                    break;
                }
            }
            if (foundD) break;
        }
    }

    if (!foundD) {
        // Couldn't find D — just mark B as consuming the rest
        segments.push({ rule: 2, start: pos, end: str.length });
    }

    return segments;
}

/**
 * Partial parser for REGEX 2 (rejected strings) — parse as far as possible.
 */
function partialParseCFG2(str) {
    const segments = [{ rule: 0, start: 0, end: str.length }]; // S always
    let pos = 0;

    // A: [01]* — consume up to where we might find B
    // Try to find B first
    const bOptions = ['101', '010', '11', '00'];
    let foundB = false;

    for (let bStart = 0; bStart < str.length; bStart++) {
        for (const bMatch of bOptions) {
            if (bStart + bMatch.length > str.length) continue;
            if (str.slice(bStart, bStart + bMatch.length) !== bMatch) continue;

            // A = [0..bStart)
            if (bStart > 0) segments.push({ rule: 1, start: 0, end: bStart });
            segments.push({ rule: 2, start: bStart, end: bStart + bMatch.length });
            pos = bStart + bMatch.length;
            foundB = true;

            // Try to find D
            const dOptions = ['11', '00'];
            let foundD = false;
            for (let dStart = pos; dStart <= str.length - 2; dStart++) {
                for (const dMatch of dOptions) {
                    if (dStart + dMatch.length > str.length) continue;
                    if (str.slice(dStart, dStart + dMatch.length) !== dMatch) continue;

                    if (dStart > pos) segments.push({ rule: 3, start: pos, end: dStart });
                    segments.push({ rule: 4, start: dStart, end: dStart + dMatch.length });

                    const afterD = dStart + dMatch.length;

                    // Try to find F
                    for (let fPos = afterD; fPos < str.length; fPos++) {
                        const eStr = str.slice(afterD, fPos);
                        if (/^(?:11|00|101)*$/.test(eStr)) {
                            if (eStr.length > 0) segments.push({ rule: 5, start: afterD, end: fPos });
                            segments.push({ rule: 6, start: fPos, end: fPos + 1 });
                            if (fPos + 1 < str.length) {
                                segments.push({ rule: 7, start: fPos + 1, end: str.length });
                            }
                            foundD = true;
                            break;
                        }
                    }
                    if (foundD) break;
                }
                if (foundD) break;
            }

            if (!foundD && pos < str.length) {
                segments.push({ rule: 3, start: pos, end: str.length });
            }
            break;
        }
        if (foundB) break;
    }

    if (!foundB) {
        segments.push({ rule: 1, start: 0, end: str.length });
    }

    return segments;
}

// ============================================================
// 8.  EDGE HIGHLIGHTING
// ============================================================

function resetAllEdges() {
    const allEdges = edges.get();
    const resetData = allEdges.map(e => ({
        id: e.id,
        color: { color: '#000' },
        width: 1
    }));
    edges.update(resetData);
}

function resetNodeStyles() {
    nodes.forEach(node => {
        let defaultBg = '#424f5a';
        let defaultBorder = '#424f5a';
        if (currentModel === 'pda') {
            defaultBg = '#2D3748';
            defaultBorder = '#2D3748';
        }
        nodes.update({ id: node.id, color: { background: defaultBg, border: defaultBorder } });
    });
}

network.on('selectNode', function (params) {
    if (params.nodes.length > 0) {
        resetAllEdges();
        const selectedNodeId = params.nodes[0];
        const connectedEdgesIds = network.getConnectedEdges(selectedNodeId);
        const edgesToUpdate = [];
        const hlWidth = 2;

        connectedEdgesIds.forEach(edgeId => {
            const edge = edges.get(edgeId);
            if (edge.from === selectedNodeId && edge.to === selectedNodeId) {
                edgesToUpdate.push({ id: edgeId, color: { color: '#8b5cf6' }, width: hlWidth });
            } else if (edge.from === selectedNodeId) {
                edgesToUpdate.push({ id: edgeId, color: { color: '#10b981' }, width: hlWidth });
            } else if (edge.to === selectedNodeId) {
                edgesToUpdate.push({ id: edgeId, color: { color: '#ef4444' }, width: hlWidth });
            }
        });

        edges.update(edgesToUpdate);
    }
});

network.on('deselectNode', function () {
    resetAllEdges();
});

// Show recenter button on drag or zoom
network.on('dragEnd', function () {
    showRecenterButton();
});

network.on('zoom', function () {
    showRecenterButton();
});

function showRecenterButton() {
    // Only show if the network is currently visible (TV is on and a model is active)
    const networkEl = document.getElementById('automata-network');
    const isVisible = networkEl && networkEl.style.opacity === '1';

    if (isVisible) {
        const btn = document.getElementById('btn-recenter');
        if (btn) btn.classList.remove('hidden');
    }
}

function recenterGraph() {
    network.fit({
        animation: { duration: 400, easingFunction: 'easeOutQuart' }
    });

    // Hide recenter button
    const btn = document.getElementById('btn-recenter');
    if (btn) btn.classList.add('hidden');
}

let followTrackingEnabled = true;

function toggleTracking() {
    followTrackingEnabled = !followTrackingEnabled;
    const btn = document.getElementById('btn-toggle-tracking');
    if (btn) {
        if (followTrackingEnabled) {
            btn.textContent = 'TRACKING: ON';
            btn.classList.remove('off');
        } else {
            btn.textContent = 'TRACKING: OFF';
            btn.classList.add('off');
        }
    }
}

// Hide current state container if manual typing clears the input field
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('string-input')) {
        const row = e.target.closest('.input-row');
        const validateBtn = row ? row.querySelector('.validate-btn') : null;
        if (validateBtn) {
            validateBtn.classList.remove('accepted', 'rejected', 'done-state');
            validateBtn.textContent = 'VALIDATE';
        }

        const statusText = e.target.closest('.input-wrapper').querySelector('.status-text');
        if (statusText) {
            statusText.textContent = '';
            statusText.className = 'status-text';
        }

        if (e.target.value.trim() === '') {
            const stateContainer = document.getElementById('current-state-container');
            if (stateContainer) stateContainer.classList.add('hidden');
            const simNotifBox = document.getElementById('sim-notif-box');
            if (simNotifBox) simNotifBox.classList.add('hidden');

            // Clear CFG status typewriter text
            const cfgStatusTextEl = document.getElementById('cfg-status-text');
            if (cfgStatusTextEl) {
                cfgStatusTextEl.textContent = '';
                cfgStatusTextEl.className = 'cfg-status-text';
            }
            const cfgStringDisplayEl = document.getElementById('cfg-string-display');
            if (cfgStringDisplayEl) cfgStringDisplayEl.innerHTML = '';

            resetNodeStyles();
            resetAllEdges();
            recenterGraph();
        }
    }
});

// ============================================================
// 9.  CONSOLE BOOT SCREEN TYPING ANIMATION
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    runConsoleBootSequence();
});

// Hover effect for done-state validate buttons
document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('validate-btn') && e.target.classList.contains('done-state')) {
        e.target.dataset.originalText = e.target.textContent;
        e.target.textContent = 'VALIDATE';
    }
});

document.addEventListener('mouseout', function (e) {
    if (e.target.classList.contains('validate-btn') && e.target.classList.contains('done-state')) {
        if (e.target.dataset.originalText) {
            e.target.textContent = e.target.dataset.originalText;
        }
    }
});

// Grab the new boot sound element
const sfxBoot = document.getElementById('sfx-boot');
const sfxHover = document.getElementById('sfx-hover');
const sfxType = document.getElementById('sfx-type');

function runConsoleBootSequence() {
    const textToType = "automata simulator";
    const subtextEl = document.getElementById('boot-subtext');
    const logoEl = document.querySelector('.boot-logo-img');
    const bootScreen = document.getElementById('console-boot-screen');
    const startBtn = document.getElementById('btn-start-console');

    let index = 0;

    // Typewriter effect function
    function typeWriter() {

        if (index < textToType.length) {
            subtextEl.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 70);
        } else {
            // Typing complete
            if (sfxType) {
                sfxType.pause();
                sfxType.currentTime = 0;
            }
            subtextEl.classList.add('typing-done');

            // Smoothly show logo
            setTimeout(() => {
                if (logoEl) logoEl.classList.add('show');

                // Smoothly slide in the START button
                setTimeout(() => {
                    if (startBtn) startBtn.classList.add('show');
                }, 700); // 700ms delay looks very cinematic

            }, 400);
        }
    }

    // Expose global powerOn function to unlock audio on first click
    window.powerOnConsole = function () {
        const powerScreen = document.getElementById('boot-power-screen');
        const bootContent = document.getElementById('boot-content');
        if (powerScreen) powerScreen.style.display = 'none';
        if (bootContent) bootContent.style.display = 'flex';

        // Unlock all HTML5 Audio elements properly (essential for Safari/Chrome)
        const allAudio = document.querySelectorAll('audio');
        allAudio.forEach(audio => {
            try {
                audio.muted = true;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.muted = false;
                    }).catch(e => {
                        audio.muted = false;
                    });
                }
            } catch (err) { }
        });

        // Delay typing start to 1000ms for a clean, non-delayed sound alignment
        setTimeout(() => {
            playSFX(sfxType);
            typeWriter();
        }, 1000);
    };

    // --- NEW: Wait for the user to press start ---
    if (startBtn) {
        startBtn.addEventListener('mouseenter', function () {
            playSFX(sfxHover);
        });
        startBtn.addEventListener('click', function () {

            // 1. UI FIRST: Fade the button out and dive into the screen
            startBtn.classList.remove('show');
            if (bootScreen) {
                bootScreen.classList.add('fade-out');
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                }, 900);
            }

            // 2. Safely try to play the Gameboy boot sound
            try {
                if (typeof sfxBoot !== 'undefined' && sfxBoot) {
                    sfxBoot.currentTime = 0;
                    sfxBoot.volume = 0.7;
                    sfxBoot.play().catch(e => console.log("SFX blocked", e));
                }
            } catch (error) { console.log("Boot SFX skipped"); }

            // 3. Safely try to start the Background Music
            try {
                const liveBgm = document.getElementById('bgm-audio');
                if (liveBgm) {
                    liveBgm.volume = 0.25;
                    let playPromise = liveBgm.play();

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            console.log("Audio engine unlocked: BGM playing!");
                        }).catch(error => {
                            console.error("Browser blocked BGM:", error);
                        });
                    }
                } else {
                    console.error("ERROR: Could not find the <audio id='bgm-audio'> tag in your HTML.");
                }
            } catch (error) {
                console.error("BGM logic failed:", error);
            }
        });
    }
}



// ============================================================
// GAME MANUAL LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    const manualBtn = document.getElementById('btn-manual');
    if (manualBtn) {
        manualBtn.addEventListener('click', function () {
            playSFX(sfxBtn);
            const modal = document.getElementById('manual-modal');
            if (modal) modal.classList.remove('hidden');
        });
    }
});

function closeManual() {
    playSFX(sfxBtn);
    const modal = document.getElementById('manual-modal');
    if (modal) modal.classList.add('hidden');
}

// ============================================================
// MUSIC TOGGLE LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    const musicBtn = document.getElementById('btn-music');
    const bgmAudio = document.getElementById('bgm-audio');

    if (musicBtn && bgmAudio) {
        musicBtn.addEventListener('click', function () {
            playSFX(sfxBtn);
            if (bgmAudio.paused) {
                bgmAudio.play().then(() => {
                    musicBtn.textContent = '🎵';
                    musicBtn.classList.remove('muted');
                }).catch(e => console.error("Could not play BGM:", e));
            } else {
                bgmAudio.pause();
                musicBtn.textContent = '🔇';
                musicBtn.classList.add('muted');
            }
        });
    }
});

// ============================================================
// GLOBAL BUTTON SFX LISTENER
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    // Attach the sound to every button on the page
    const allButtons = document.querySelectorAll('.btn, .delete-btn');

    allButtons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            // Only play if the button isn't disabled
            if (!btn.disabled) {
                playSFX(sfxBtn);
            }
        });
    });

});

