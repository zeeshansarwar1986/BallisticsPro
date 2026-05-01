/**
 * Main Application Logic for BallisticsPro
 */

// I18n Dictionary
const translations = {
    en: {
        env_conditions: "Environmental Conditions",
        wind_speed: "Wind Speed (km/h)",
        wind_dir: "Wind Direction (degrees)",
        humidity: "Humidity (%)",
        temp: "Temperature (°C)",
        pressure: "Barometric Pressure (mbar)",
        altitude: "Altitude (m)",
        rain: "Rain Intensity Level (0-10)",
        rifle_profile: "Rifle & Ammo Profile",
        default_profile: "Default Profile",
        save_profile: "Save Profile",
        caliber: "Caliber (e.g., .308)",
        bullet_weight: "Bullet Weight (grains)",
        g7_bc: "Ballistic Coefficient (G7)",
        muzzle_vel: "Muzzle Velocity (m/s)",
        scope_zero: "Scope Zero Distance (km)",
        target_dist: "Target Distance (km)",
        calculate: "Calculate Solution",
        firing_solution: "Firing Solution",
        elevation: "Elevation Correction",
        windage: "Windage Correction",
        total_drop: "Total Bullet Drop (cm)",
        tof: "Time of Flight (s)",
        terminal_energy: "Terminal Energy (J)",
        export_pdf: "Export Range Card (PDF)",
        confidence: "Confidence",
        advisory_shoot: "SHOOT",
        advisory_wait: "WAIT",
        advisory_noshoot: "NO-SHOOT",
        open_scope: "🔭 Open Sniper Scope (AR Camera)",
        scope_no_solution: "Calculate a firing solution first!",
        scope_no_camera: "Camera not supported on this device.",
        scope_label_elev: "ELEV",
        scope_label_wind: "WIND",
        scope_label_tof: "TOF",
        scope_label_energy: "ENERGY",
        scope_label_confidence: "CONFIDENCE",
        target_speed: "Target Speed (km/h)",
        target_angle: "Target Angle (0-180°)",
        target_lead: "Target Lead Correction",
        scope_label_lead: "LEAD"
    },
    ur: {
        env_conditions: "ماحولیاتی حالات",
        wind_speed: "ہوا کی رفتار (km/h)",
        wind_dir: "ہوا کی سمت (degrees)",
        humidity: "نمی (%)",
        temp: "درجہ حرارت (°C)",
        pressure: "ہوا کا دباؤ (mbar)",
        altitude: "بلندی (m)",
        rain: "بارش کی شدت (0-10)",
        rifle_profile: "رائفل اور ایمو پروفائل",
        default_profile: "ڈیفالٹ پروفائل",
        save_profile: "پروفائل محفوظ کریں",
        caliber: "کیلیبر (مثلاً .308)",
        bullet_weight: "گولی کا وزن (grains)",
        g7_bc: "بیلسٹک کوایفیشینٹ (G7)",
        muzzle_vel: "تھوتھنی کی رفتار (m/s)",
        scope_zero: "اسکوپ زیرو فاصلہ (km)",
        target_dist: "ہدف کا فاصلہ (km)",
        calculate: "حل کا حساب لگائیں",
        firing_solution: "فائرنگ کا حل",
        elevation: "ایلیویشن کی اصلاح",
        windage: "ونڈیج کی اصلاح",
        total_drop: "گولی کی کل گراوٹ (cm)",
        tof: "پرواز کا وقت (s)",
        terminal_energy: "ٹرمینل توانائی (J)",
        export_pdf: "رینج کارڈ پی ڈی ایف ایکسپورٹ کریں",
        confidence: "اعتماد",
        advisory_shoot: "فائر",
        advisory_wait: "انتظار",
        advisory_noshoot: "فائر نہ کریں",
        open_scope: "🔭 سنائپر اسکوپ کھولیں (AR کیمرہ)",
        scope_no_solution: "پہلے فائرنگ سلوشن حساب کریں!",
        scope_no_camera: "اس ڈیوائس پر کیمرہ دستیاب نہیں۔",
        scope_label_elev: "بلندی",
        scope_label_wind: "ہوا",
        scope_label_tof: "وقت",
        scope_label_energy: "توانائی",
        scope_label_confidence: "اعتماد",
        target_speed: "ہدف کی رفتار (km/h)",
        target_angle: "ہدف کا زاویہ (0-180°)",
        target_lead: "ہدف کا لیڈ",
        scope_label_lead: "لیڈ"
    }
};

/**
 * Built-in Sniper Rifle Profiles
 * Grouped: Top 10 World Rifles | Pakistan Army/SSG Rifles
 * Each profile contains: caliber, bulletWeight(gr), g7Bc, muzzleVelocity(m/s), scopeZero(m)
 */
const builtinProfiles = {
    // ── World Top 10 ──────────────────────────────────────────────
    "Barrett M82A1 (.50 BMG)":          { caliber: ".50 BMG",          bulletWeight: 750, g7Bc: 0.350, muzzleVelocity: 853, scopeZero: 100, group: "world" },
    "CheyTac M200 (.408 CheyTac)":      { caliber: ".408 CheyTac",     bulletWeight: 419, g7Bc: 0.435, muzzleVelocity: 884, scopeZero: 100, group: "world" },
    "AI AWM (.338 Lapua Mag)":          { caliber: ".338 Lapua Mag",   bulletWeight: 250, g7Bc: 0.322, muzzleVelocity: 900, scopeZero: 100, group: "world" },
    "Sako TRG 42 (.338 Lapua Mag)":     { caliber: ".338 Lapua Mag",   bulletWeight: 300, g7Bc: 0.340, muzzleVelocity: 826, scopeZero: 100, group: "world" },
    "Remington M24 (7.62x51mm)": { caliber: "7.62x51mm NATO",   bulletWeight: 175, g7Bc: 0.243, muzzleVelocity: 790, scopeZero: 100, group: "world" },
    "M2010 ESR (.300 Win Mag)":         { caliber: ".300 Win Mag",     bulletWeight: 220, g7Bc: 0.320, muzzleVelocity: 868, scopeZero: 100, group: "world" },
    "Dragunov SVD (7.62x54mmR)":        { caliber: "7.62x54mmR",       bulletWeight: 152, g7Bc: 0.220, muzzleVelocity: 830, scopeZero: 100, group: "world" },
    "Steyr SSG 69 (7.62x51mm)":         { caliber: "7.62x51mm NATO",   bulletWeight: 168, g7Bc: 0.225, muzzleVelocity: 800, scopeZero: 100, group: "world" },
    "McMillan TAC-50 (.50 BMG)":        { caliber: ".50 BMG",          bulletWeight: 750, g7Bc: 0.350, muzzleVelocity: 823, scopeZero: 100, group: "world" },
    "AS50 (.50 BMG)":                   { caliber: ".50 BMG",          bulletWeight: 750, g7Bc: 0.350, muzzleVelocity: 823, scopeZero: 100, group: "world" },

    // ── Pakistan Army / SSG Rifles ────────────────────────────────
    // POF Azb: Indigenous Pakistani 7.62 NATO bolt-action sniper rifle
    "POF Azb (7.62x51mm)": { caliber: "7.62x51mm NATO", bulletWeight: 175, g7Bc: 0.243, muzzleVelocity: 800, scopeZero: 100, group: "pak" },

    // POF PSR-90: POF-manufactured precision semi-auto sniper rifle
    "POF PSR-90 (7.62x51mm)": { caliber: "7.62x51mm NATO", bulletWeight: 175, g7Bc: 0.240, muzzleVelocity: 790, scopeZero: 100, group: "pak" },

    // SSG 69: Austrian Steyr SSG 69 widely used by Pakistani SSG commandos
    "Steyr SSG 69 – PAK SSG (7.62x51mm)": { caliber: "7.62x51mm NATO", bulletWeight: 168, g7Bc: 0.225, muzzleVelocity: 800, scopeZero: 100, group: "pak" },

    // AI AWM used by PAF and Army special units for long-range elimination
    "AI AWM – PAK Army (.338 Lapua)": { caliber: ".338 Lapua Mag", bulletWeight: 250, g7Bc: 0.322, muzzleVelocity: 895, scopeZero: 100, group: "pak" },

    // RPA Quadlite: used by some Pak special forces units
    "RPA Quadlite (.338 Lapua Mag)": { caliber: ".338 Lapua Mag", bulletWeight: 250, g7Bc: 0.318, muzzleVelocity: 900, scopeZero: 100, group: "pak" },

    // Dragunov SVD used along the LoC and Afghan border
    "Dragunov SVD – PAK FC (7.62x54mmR)": { caliber: "7.62x54mmR", bulletWeight: 152, g7Bc: 0.220, muzzleVelocity: 830, scopeZero: 100, group: "pak" },

    // Barrett M82A1 in PAK Army use for anti-materiel roles
    "Barrett M82A1 – PAK Army (.50 BMG)": { caliber: ".50 BMG", bulletWeight: 750, g7Bc: 0.350, muzzleVelocity: 853, scopeZero: 100, group: "pak" },

    // POF G3 SG/1: German-origin sniper rifle made under POF licence
    "POF G3 SG/1 (7.62x51mm)": { caliber: "7.62x51mm NATO", bulletWeight: 147, g7Bc: 0.195, muzzleVelocity: 800, scopeZero: 100, group: "pak" }
};

let currentLang = 'en';
let isNightMode = false;
let lastSolution = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadProfiles();
    applyTranslations();
    bindEvents();
});

function bindEvents() {
    document.getElementById('toggle-lang').addEventListener('click', toggleLanguage);
    document.getElementById('toggle-night').addEventListener('click', toggleNightMode);
    document.getElementById('calculate_btn').addEventListener('click', calculateSolution);
    document.getElementById('save_profile').addEventListener('click', saveProfile);
    document.getElementById('profile_select').addEventListener('change', loadProfileIntoForm);
    document.getElementById('unit_elevation').addEventListener('change', updateDisplays);
    document.getElementById('unit_windage').addEventListener('change', updateDisplays);
    document.getElementById('unit_lead').addEventListener('change', updateDisplays);
    document.getElementById('export_pdf').addEventListener('click', exportPDF);
    // AR Scope buttons
    document.getElementById('open_scope_btn').addEventListener('click', openScope);
    document.getElementById('close_scope_btn').addEventListener('click', closeScope);
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    document.getElementById('toggle-lang').innerText = currentLang === 'en' ? 'اردو' : 'English';
    document.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
    applyTranslations();
    loadProfiles(); // Refresh the dynamic dropdown labels
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[currentLang][key]) {
            if(el.tagName === 'INPUT' && el.type === 'button') {
                el.value = translations[currentLang][key];
            } else {
                el.innerText = translations[currentLang][key];
            }
        }
    });
}

function toggleNightMode() {
    isNightMode = !isNightMode;
    if(isNightMode) {
        document.body.setAttribute('data-theme', 'night');
    } else {
        document.body.removeAttribute('data-theme');
    }
}

// Data Handling
function getFormValues() {
    return {
        env: {
            windSpeed: parseFloat(document.getElementById('wind_speed').value),
            windDir: parseFloat(document.getElementById('wind_dir').value),
            humidity: parseFloat(document.getElementById('humidity').value),
            temp: parseFloat(document.getElementById('temp').value),
            pressure: parseFloat(document.getElementById('pressure').value),
            altitude: parseFloat(document.getElementById('altitude').value),
            rain: parseFloat(document.getElementById('rain').value)
        },
        rifle: {
            caliber: document.getElementById('caliber').value,
            bulletWeight: parseFloat(document.getElementById('bullet_weight').value),
            g7Bc: parseFloat(document.getElementById('g7_bc').value),
            muzzleVelocity: parseFloat(document.getElementById('muzzle_vel').value),
            scopeZero: parseFloat(document.getElementById('scope_zero').value) * 1000, // km to m
            targetDist: parseFloat(document.getElementById('target_dist').value) * 1000, // km to m
            targetSpeed: parseFloat(document.getElementById('target_speed').value),
            targetAngle: parseFloat(document.getElementById('target_angle').value)
        }
    };
}

function saveProfile() {
    const data = getFormValues();
    const profileName = data.rifle.caliber + " (" + data.rifle.bulletWeight + "gr)";
    let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    profiles[profileName] = data.rifle;
    localStorage.setItem('profiles', JSON.stringify(profiles));
    alert('Profile saved!');
    loadProfiles();
}

function loadProfiles() {
    const select = document.getElementById('profile_select');
    select.innerHTML = '<option value="default">' + translations[currentLang]['default_profile'] + '</option>';

    // Group 1: World Top 10
    let grpWorld = document.createElement('optgroup');
    grpWorld.label = currentLang === 'ur' ? "دنیا کی بہترین 10 سنائپر" : "🌍 World Top 10 Sniper Rifles";
    // Group 2: Pakistan
    let grpPak = document.createElement('optgroup');
    grpPak.label = currentLang === 'ur' ? "🇵🇰 پاکستان آرمی / ایس ایس جی رائفلز" : "🇵🇰 Pakistan Army / SSG Rifles";

    for(let name in builtinProfiles) {
        let opt = document.createElement('option');
        opt.value = "builtin_" + name;
        opt.innerText = name;
        if(builtinProfiles[name].group === 'pak') {
            grpPak.appendChild(opt);
        } else {
            grpWorld.appendChild(opt);
        }
    }
    select.appendChild(grpWorld);
    select.appendChild(grpPak);

    // Group 3: Custom saved
    let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    if (Object.keys(profiles).length > 0) {
        let grpCustom = document.createElement('optgroup');
        grpCustom.label = currentLang === 'ur' ? "کسٹم پروفائلز" : "⚙️ Custom Profiles";
        for(let name in profiles) {
            let opt = document.createElement('option');
            opt.value = "custom_" + name;
            opt.innerText = name;
            grpCustom.appendChild(opt);
        }
        select.appendChild(grpCustom);
    }
}

function loadProfileIntoForm() {
    const val = document.getElementById('profile_select').value;
    if(val === 'default') return;
    
    let r = null;
    if(val.startsWith('builtin_')) {
        let name = val.substring(8);
        r = builtinProfiles[name];
    } else if(val.startsWith('custom_')) {
        let name = val.substring(7);
        let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        r = profiles[name];
    }
    
    if(r) {
        document.getElementById('caliber').value = r.caliber;
        document.getElementById('bullet_weight').value = r.bulletWeight;
        document.getElementById('g7_bc').value = r.g7Bc;
        document.getElementById('muzzle_vel').value = r.muzzleVelocity;
        document.getElementById('scope_zero').value = r.scopeZero / 1000;
    }
}

// Calculations
function calculateSolution() {
    const {env, rifle} = getFormValues();
    
    const engine = new BallisticsEngine(env, rifle);
    const da = engine.calculateDensityAltitude();
    
    // Trajectory
    const trajTarget = engine.calculateTrajectory(rifle.targetDist);
    const trajZero = engine.calculateTrajectory(rifle.scopeZero);
    
    // Net Drop (Drop at target minus drop at zero scaled)
    // Simplified elevation correction (meters)
    let netDrop = trajTarget.dropMeters - (trajZero.dropMeters * (rifle.targetDist / rifle.scopeZero));
    
    // Windage
    let windDeflection = engine.calculateWindage(rifle.targetDist, trajTarget.timeOfFlight);
    let spinDrift = engine.calculateSpinDrift(trajTarget.timeOfFlight);
    let coriolis = engine.calculateCoriolis(rifle.targetDist, trajTarget.timeOfFlight);
    
    let netWindage = windDeflection + spinDrift + coriolis;
    
    // Moving Target Lead
    let targetLead = engine.calculateLead(rifle.targetSpeed, rifle.targetAngle, trajTarget.timeOfFlight);

    // Advisory Confidence Logic
    let confidence = 100;
    // Penalty for high wind
    if(env.windSpeed > 15) confidence -= (env.windSpeed - 15) * 2;
    // Penalty for distance
    if(rifle.targetDist > 800) confidence -= ((rifle.targetDist - 800) / 100) * 5;
    // Penalty for rain
    if(env.rain > 3) confidence -= env.rain * 3;
    
    confidence = Math.max(0, Math.min(100, Math.round(confidence)));
    
    let advisory = 'SHOOT';
    let advColor = 'var(--advisory-shoot)';
    if(confidence < 50) {
        advisory = 'NO-SHOOT';
        advColor = 'var(--advisory-noshoot)';
    } else if (confidence < 80) {
        advisory = 'WAIT';
        advColor = 'var(--advisory-wait)';
    }

    lastSolution = {
        elevationMeters: netDrop,
        windageMeters: netWindage,
        leadMeters: targetLead,
        targetDist: rifle.targetDist,
        dropCm: trajTarget.dropMeters * 100,
        tof: trajTarget.timeOfFlight,
        energy: trajTarget.terminalEnergy,
        confidence: confidence,
        advisory: advisory,
        advColor: advColor
    };

    updateDisplays();
}

function updateDisplays() {
    if(!lastSolution) return;

    const uElev = document.getElementById('unit_elevation').value;
    const uWind = document.getElementById('unit_windage').value;
    const uLead = document.getElementById('unit_lead').value;

    document.getElementById('res_elevation').innerText = BallisticsEngine.convertCorrection(lastSolution.elevationMeters, lastSolution.targetDist, uElev);
    document.getElementById('res_windage').innerText = BallisticsEngine.convertCorrection(lastSolution.windageMeters, lastSolution.targetDist, uWind);
    document.getElementById('res_lead').innerText = BallisticsEngine.convertCorrection(lastSolution.leadMeters, lastSolution.targetDist, uLead);
    
    document.getElementById('res_drop').innerText = lastSolution.dropCm.toFixed(1);
    document.getElementById('res_tof').innerText = lastSolution.tof.toFixed(2);
    document.getElementById('res_energy').innerText = lastSolution.energy.toFixed(0);

    const advCard = document.getElementById('advisory_card');
    const advText = document.getElementById('advisory_text');
    const confText = document.getElementById('confidence_text');

    advCard.style.backgroundColor = lastSolution.advColor;
    advText.innerText = translations[currentLang]['advisory_' + lastSolution.advisory.toLowerCase().replace('-','')] || lastSolution.advisory;
    confText.innerText = translations[currentLang]['confidence'] + ": " + lastSolution.confidence + "%";
}

function exportPDF() {
    window.print();
}

// ─────────────────────────────────────────────────────────────────
// AR SNIPER SCOPE LOGIC
// ─────────────────────────────────────────────────────────────────

let cameraStream = null; // Holds the active MediaStream from the camera

/**
 * openScope:
 * 1. Validates that a firing solution has been calculated.
 * 2. Requests the rear camera.
 * 3. Shows the scope overlay.
 * 4. Positions the red Holdover Dot based on MRAD correction values.
 */
async function openScope() {
    // Guard: must calculate solution first
    if (!lastSolution) {
        alert(translations[currentLang]['scope_no_solution']);
        return;
    }

    // Check if the browser supports camera access
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert(translations[currentLang]['scope_no_camera']);
        return;
    }

    try {
        // Request the rear (environment-facing) camera
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
            audio: false
        });

        // Pipe the camera stream into the <video> element
        const videoEl = document.getElementById('camera_feed');
        videoEl.srcObject = cameraStream;

        // Show the full-screen overlay
        document.getElementById('scope_overlay').classList.remove('hidden');

        // Update the holdover dot position and HUD after rendering
        requestAnimationFrame(() => {
            updateHoldoverDot();
            updateScopeHUD();
        });

    } catch(err) {
        console.error('Camera error:', err);
        alert('Camera access was denied or failed. Please allow camera permission and try again.');
    }
}

/**
 * closeScope:
 * Stops the camera stream and hides the overlay.
 */
function closeScope() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    const videoEl = document.getElementById('camera_feed');
    videoEl.srcObject = null;
    document.getElementById('scope_overlay').classList.add('hidden');
}

/**
 * updateHoldoverDot:
 * Calculates the pixel offset of the red holdover dot from the
 * center of the screen based on the MRAD values from lastSolution.
 *
 * The SVG viewBox is 100×100 units, where center = (50, 50).
 * Each unit in the SVG = 1 MRAD of correction (scaled visually).
 * Each tick mark on the reticle is spaced 10 units apart = 1 MRAD each.
 *
 * Elevation (up/down): positive drop → dot goes DOWN from center.
 * Windage (left/right): positive windage → dot goes RIGHT from center.
 */
function updateHoldoverDot() {
    const container = document.querySelector('.reticle-container');
    const dot = document.getElementById('holdover_dot');
    const containerSize = container.offsetWidth; // in pixels (square)

    // Convert meters of correction to MRAD
    const dist = lastSolution.targetDist;
    const elevMrad = (lastSolution.elevationMeters / dist) * 1000;
    const windMrad = (lastSolution.windageMeters / dist) * 1000;

    // Scale: SVG is 100 units wide/tall, maps to containerSize pixels.
    // 1 SVG unit = containerSize/100 pixels.
    // 10 SVG units = 1 MRAD spacing on the reticle.
    const pixelsPerMrad = (containerSize / 100) * 10;

    // Center of the container
    const cx = containerSize / 2;
    const cy = containerSize / 2;

    // Elevation: bullet drops DOWN, so we add pixels downward
    const dotX = cx + (windMrad * pixelsPerMrad);
    const dotY = cy + (elevMrad * pixelsPerMrad);

    // Apply position using transform origin at its own center
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
}

/**
 * updateScopeHUD:
 * Injects a transparent heads-up display inside the scope overlay
 * showing key ballistic data: elevation, windage, TOF, energy, and confidence.
 */
function updateScopeHUD() {
    // Remove any old HUD
    const oldHud = document.getElementById('scope_hud');
    if (oldHud) oldHud.remove();

    const t = translations[currentLang];
    const s = lastSolution;

    // Format MRAD values
    const elevMrad = ((s.elevationMeters / s.targetDist) * 1000).toFixed(2);
    const windMrad = ((s.windageMeters / s.targetDist) * 1000).toFixed(2);
    const leadMrad = ((s.leadMeters / s.targetDist) * 1000).toFixed(2);

    // Determine advisory color
    const advColorMap = {
        'SHOOT':    '#10b981',
        'WAIT':     '#f59e0b',
        'NO-SHOOT': '#ef4444'
    };
    const advColor = advColorMap[s.advisory] || '#f59e0b';
    const advText = translations[currentLang]['advisory_' + s.advisory.toLowerCase().replace('-','')] || s.advisory;

    const hud = document.createElement('div');
    hud.id = 'scope_hud';
    hud.style.cssText = `
        position: absolute;
        bottom: 0; left: 0; right: 0;
        z-index: 4;
        background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
        padding: 16px 20px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: #fff;
        font-family: 'Inter', monospace;
        font-size: 13px;
        pointer-events: none;
    `;
    hud.innerHTML = `
        <div style="display:flex;gap:20px;flex-wrap:wrap;">
            <div><div style="opacity:.7;font-size:10px;text-transform:uppercase;">${t['scope_label_elev']}</div>
                 <div style="font-size:18px;font-weight:700;">${elevMrad} MRAD</div></div>
            <div><div style="opacity:.7;font-size:10px;text-transform:uppercase;">${t['scope_label_wind']}</div>
                 <div style="font-size:18px;font-weight:700;">${windMrad} MRAD</div></div>
            <div><div style="opacity:.7;font-size:10px;text-transform:uppercase;">${t['scope_label_lead']}</div>
                 <div style="font-size:18px;font-weight:700;">${leadMrad} MRAD</div></div>
            <div><div style="opacity:.7;font-size:10px;text-transform:uppercase;">${t['scope_label_tof']}</div>
                 <div style="font-size:18px;font-weight:700;">${s.tof.toFixed(2)}s</div></div>
            <div><div style="opacity:.7;font-size:10px;text-transform:uppercase;">${t['scope_label_energy']}</div>
                 <div style="font-size:18px;font-weight:700;">${s.energy.toFixed(0)}J</div></div>
        </div>
        <div style="text-align:right;">
            <div style="opacity:.7;font-size:10px;text-transform:uppercase;">${t['scope_label_confidence']}</div>
            <div style="font-size:22px;font-weight:900;color:${advColor};">${advText}</div>
            <div style="font-size:16px;font-weight:700;">${s.confidence}%</div>
        </div>
    `;
    document.getElementById('scope_overlay').appendChild(hud);
}
