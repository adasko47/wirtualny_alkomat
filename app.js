// =========================================================
// KOMPLETNY PLIK APP.JS - WIRTUALNY ALKOMAT
// =========================================================

// --- 1. DANE I ZMIENNE GLOBALNE ---
const pageTitles = {
    'home': 'Wirtualny Alkomat',
    'calculator': 'Kalkulator Promili',
    'time': 'Czas Trzeźwienia',
    'limits': 'Limity na świecie',
    'history': 'Historia spożycia',
    'database': 'Baza alkoholi',
    'gallery': 'Galeria',
    'game': 'Gra: Test Refleksu',
    'camera': 'Skaner Etykiet',
    'about': 'O autorze',
    'badges': 'Twoje Osiągnięcia'
};

const countryLimits = [
    // --- BRAK TOLERANCJI (0.0 ‰) ---
    { country: 'Czechy', limit: 0.0, flag: '🇨🇿', desc: 'Absolutne zero tolerancji dla kierowców.' },
    { country: 'Słowacja', limit: 0.0, flag: '🇸🇰', desc: 'Absolutne zero tolerancji dla kierowców.' },
    { country: 'Węgry', limit: 0.0, flag: '🇭🇺', desc: 'Absolutne zero tolerancji dla kierowców.' },
    { country: 'Rumunia', limit: 0.0, flag: '🇷🇴', desc: 'Absolutne zero tolerancji dla kierowców.' },

    // --- BARDZO RYGORYSTYCZNIE (0.2 ‰) ---
    { country: 'Polska', limit: 0.2, flag: '🇵🇱', desc: 'Powyżej 0.2‰ wykroczenie, powyżej 0.5‰ przestępstwo.' },
    { country: 'Norwegia', limit: 0.2, flag: '🇳🇴', desc: 'Ogromne mandaty uzależnione od zarobków.' },
    { country: 'Szwecja', limit: 0.2, flag: '🇸🇪', desc: 'Bardzo surowe prawo i częste kontrole.' },
    { country: 'Estonia', limit: 0.2, flag: '🇪🇪', desc: 'Standardowy limit 0.2‰.' },

    // --- POŚREDNIO (0.3 - 0.4 ‰) ---
    { country: 'Japonia', limit: 0.3, flag: '🇯🇵', desc: 'Kary grożą również pasażerom pijanego kierowcy!' },
    { country: 'Litwa', limit: 0.4, flag: '🇱🇹', desc: 'Dla początkujących kierowców (prawo jazdy < 2 lat) limit wynosi 0.0‰.' },

    // --- STANDARD EUROPEJSKI (0.5 ‰) ---
    { country: 'Niemcy', limit: 0.5, flag: '🇩🇪', desc: 'Dla młodych (<21 lat) i początkujących kierowców limit to 0.0‰.' },
    { country: 'Francja', limit: 0.5, flag: '🇫🇷', desc: 'Dla kierowców posiadających prawo jazdy krócej niż 3 lata limit to 0.2‰.' },
    { country: 'Włochy', limit: 0.5, flag: '🇮🇹', desc: 'Dla zawodowych i młodych (<21 lat) kierowców limit to 0.0‰.' },
    { country: 'Hiszpania', limit: 0.5, flag: '🇪🇸', desc: 'Dla kierowców początkujących limit wynosi 0.3‰.' },
    { country: 'Chorwacja', limit: 0.5, flag: '🇭🇷', desc: 'Dla kierowców do 24. roku życia oraz zawodowych limit to 0.0‰.' },
    { country: 'Grecja', limit: 0.5, flag: '🇬🇷', desc: 'Dla kierowców początkujących i motocyklistów limit to 0.2‰.' },
    { country: 'Holandia', limit: 0.5, flag: '🇳🇱', desc: 'Dla początkujących kierowców limit wynosi 0.2‰.' },

    // --- LUŹNIEJSZE PODEJŚCIE (0.8 ‰) ---
    { country: 'Wielka Brytania', limit: 0.8, flag: '🇬🇧', desc: 'W samej Szkocji limit jest niższy i wynosi 0.5‰.' },
    { country: 'USA', limit: 0.8, flag: '🇺🇸', desc: 'Limit zależy od stanu, ale dla osób < 21 lat wszędzie wynosi 0.0‰.' }
];

const alcoholDatabase = [
    // --- PIWA ---
    { name: 'Piwo Jasne (Lager)', category: 'piwo', percent: 5.0, icon: 'beer-outline', desc: 'Standardowe piwo jasne, zazwyczaj 500ml' },
    { name: 'Piwo Ciemne (Stout/Porter)', category: 'piwo', percent: 6.5, icon: 'beer-outline', desc: 'Ciemne, palone słody. Często nieco mocniejsze' },
    { name: 'Piwo Rzemieślnicze (IPA/APA)', category: 'piwo', percent: 6.0, icon: 'beer-outline', desc: 'Mocno chmielone, aromatyczne piwo kraftowe' },
    { name: 'Piwo Bezalkoholowe', category: 'piwo', percent: 0.0, icon: 'beer-outline', desc: 'Idealne dla kierowców (do 0.5%)' },
    
    // --- WINY I POCHODNE ---
    { name: 'Wino Czerwone (Wytrawne)', category: 'wino', percent: 13.0, icon: 'wine-outline', desc: 'Lampka (ok. 150ml) do posiłku' },
    { name: 'Wino Białe (Słodkie/Półsłodkie)', category: 'wino', percent: 11.0, icon: 'wine-outline', desc: 'Lżejsze wino, często serwowane schłodzone' },
    { name: 'Szampan / Prosecco', category: 'wino', percent: 12.0, icon: 'wine-outline', desc: 'Wino musujące, popularne na toastach' },
    { name: 'Cydr', category: 'wino', percent: 4.5, icon: 'nutrition-outline', desc: 'Lekki napój alkoholowy z jabłek' },

    // --- ALKOHOLE MOCNE ---
    { name: 'Wódka czysta', category: 'mocne', percent: 40.0, icon: 'water-outline', desc: 'Standardowy "kieliszek" to najczęściej 40ml' },
    { name: 'Whisky / Bourbon', category: 'mocne', percent: 40.0, icon: 'cafe-outline', desc: 'Starzony w beczkach, pita często na lodzie' },
    { name: 'Rum (Biały/Ciemny)', category: 'mocne', percent: 38.0, icon: 'water-outline', desc: 'Baza do wielu popularnych drinków (np. Mojito)' },
    { name: 'Gin', category: 'mocne', percent: 40.0, icon: 'water-outline', desc: 'Jałowcowy trunek, idealny z tonikiem' },
    { name: 'Tequila', category: 'mocne', percent: 38.0, icon: 'water-outline', desc: 'Pita z solą i cytryną (lub cynamonem i pomarańczą)' },
    { name: 'Spirytus rektyfikowany', category: 'mocne', percent: 95.0, icon: 'flame-outline', desc: 'Służy głównie do wyrobu domowych nalewek' },

    // --- INNE / LIKIERY ---
    { name: 'Nalewka Babuni', category: 'inne', percent: 30.0, icon: 'flask-outline', desc: 'Domowej roboty wyciąg owocowy lub ziołowy' },
    { name: 'Likiery Ziołowe (np. Jägermeister)', category: 'inne', percent: 35.0, icon: 'flask-outline', desc: 'Gęsty, ziołowy likier pita najczęściej w shotach' },
    { name: 'Likier Kremowy (np. Baileys)', category: 'inne', percent: 17.0, icon: 'cafe-outline', desc: 'Słodki, kawowo-śmietankowy dodatek do deserów' }
];

const alcoholFacts = [
    "Alkohol odwadnia organizm. Pij wodę w trakcie imprezy!",
    "Wątroba potrzebuje godziny na spalenie 10g czystego alkoholu.",
    "Piwo to najstarszy i najczęściej spożywany napój alkoholowy."
];

let gameScore = 0;
let gameTime = 10;
let gameInterval;
let targetElement;

window.currentDrinks = []; // Pamięć dodanych trunków

// --- OBSŁUGA TRYBU CIEMNEGO ---
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    
    // Sprawdzamy, czy użytkownik miał już włączony tryb ciemny w pamięci
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('alkoTheme');
    
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    // Ustawiamy początkowy stan
    document.body.classList.toggle('dark', isDark);
    if(toggle) toggle.checked = isDark;

    // Nasłuchujemy kliknięcia w przełącznik
    if(toggle) {
        toggle.addEventListener('ionChange', (ev) => {
            document.body.classList.toggle('dark', ev.detail.checked);
            localStorage.setItem('alkoTheme', ev.detail.checked ? 'dark' : 'light');
        });
    }
});

// --- 2. FUNKCJE POMOCNICZE (TOAST) ---
window.showToast = async function(message, color = 'danger') {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    toast.color = color;
    document.body.appendChild(toast);
    return toast.present();
};

// --- 3. GŁÓWNA NAWIGACJA (Z KULOODPORNYM OPÓŹNIENIEM) ---
window.showPage = async function(pageName) {
    const content = document.getElementById('main-content');
    const appTitle = document.getElementById('app-title');
    
    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('Nie znaleziono strony');
        
        content.innerHTML = await response.text();
        if(appTitle) appTitle.innerText = pageTitles[pageName] || 'Wirtualny Alkomat';

        // Inicjalizacja zakładek po załadowaniu HTML
        if(pageName === 'home') setTimeout(drawHomeCanvas, 50);
        
        if(pageName === 'calculator') {
            setTimeout(() => {
                window.currentDrinks = [];
                if(typeof window.renderDrinksList === 'function') window.renderDrinksList();
            }, 50);
        }

        if(pageName === 'history') {
            let attempts = 0;
            let check = setInterval(() => {
                if (document.getElementById('history-list')) {
                    clearInterval(check);
                    loadHistory(); // Ładujemy listę na start
                    
                    // --- NOWE: Logika Pull-to-Refresh ---
                    const refresher = document.getElementById('history-refresher');
                    if(refresher) {
                        refresher.addEventListener('ionRefresh', (e) => {
                            // Sztuczne opóźnienie 1 sekunda dla efektu "szukania w bazie"
                            setTimeout(() => {
                                loadHistory(); // Odświeżamy funkcję
                                e.target.complete(); // Zatrzymujemy kręcące się kółko
                                if(window.showToast) showToast("Dane zostały odświeżone", "dark");
                            }, 1000); 
                        });
                    }
                    // -------------------------------------
                }
                if (++attempts > 40) clearInterval(check);
            }, 50);
        }

        if(pageName === 'time') {
            let attempts = 0;
            let check = setInterval(() => {
                const timeInput = document.getElementById('time-bac');
                if (timeInput) {
                    const history = JSON.parse(localStorage.getItem('alkoHistory')) || [];
                    if(history.length > 0) timeInput.value = history[history.length - 1].result;
                    clearInterval(check);
                }
                if (++attempts > 40) clearInterval(check);
            }, 50);
        }

        if(pageName === 'limits') setTimeout(() => {
            renderLimits();
            const search = document.getElementById('limit-search');
            if(search) search.addEventListener('ionInput', (e) => renderLimits(e.target.value));
        }, 50);

        if(pageName === 'database') setTimeout(() => {
            renderDatabase('wszystkie');
            const seg = document.getElementById('db-segment');
            if(seg) seg.addEventListener('ionChange', (e) => renderDatabase(e.detail.value));
        }, 50);

        if(pageName === 'gallery') setTimeout(loadGallery, 50);
        
        if(pageName === 'camera') setTimeout(() => {
            const res = document.getElementById('scanner-result');
            const load = document.getElementById('scanner-loading');
            if(res) res.style.display = 'none';
            if(load) load.style.display = 'none';
        }, 50);

        if(pageName === 'badges') setTimeout(loadBadges, 50);

    } catch (error) {
        content.innerHTML = `<div class="ion-padding"><h2>Błąd</h2><p>${error.message}</p></div>`;
    }

    const menu = document.querySelector("ion-menu");
    if(menu) menu.close();
};

window.addDrink = function() {
    const amountInput = document.getElementById('calc-amount');
    const percentInput = document.getElementById('calc-percent');
    const amount = parseFloat(amountInput.value);
    const percent = parseFloat(percentInput.value);

    if (isNaN(amount) || isNaN(percent) || amount <= 0 || percent <= 0) {
        if(window.showToast) showToast("Podaj prawidłową pojemność i moc.");
        return;
    }

    // Dodajemy trunek do naszej podręcznej pamięci
    window.currentDrinks.push({ amount, percent });
    
    // Czyścimy pola, żeby użytkownik mógł wpisać coś nowego
    amountInput.value = '';
    percentInput.value = '';
    
    renderDrinksList();
};

window.removeDrink = function(index) {
    // Usuwamy trunek z listy po kliknięciu "X"
    window.currentDrinks.splice(index, 1);
    renderDrinksList();
};

window.renderDrinksList = function() {
    const container = document.getElementById('drinks-list-container');
    if (!container) return;

    container.innerHTML = '';
    window.currentDrinks.forEach((drink, index) => {
        container.innerHTML += `
            <div class="glass-item" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; margin-bottom: 10px; animation: fadeIn 0.3s ease;">
                <div style="display: flex; align-items: center;">
                    <ion-icon name="beer-outline" style="color: #0bf4f3; font-size: 20px; margin-right: 10px;"></ion-icon>
                    <strong style="color: var(--ion-text-color); font-size: 1.1rem; margin-right: 5px;">${drink.amount} ml</strong> 
                    <span style="color: gray; font-size: 0.9rem;">(${drink.percent}%)</span>
                </div>
                <ion-icon name="close-circle" style="color: #ff453a; font-size: 24px; cursor: pointer;" onclick="removeDrink(${index})"></ion-icon>
            </div>
        `;
    });
};

// --- 4. KALKULATOR (ANIMACJA + ZAPIS) ---

window.toggleFormulaInfo = function() {
    const infoPanel = document.getElementById('formula-info');
    if (infoPanel.style.display === 'none' || infoPanel.style.display === '') {
        infoPanel.style.display = 'block';
    } else {
        infoPanel.style.display = 'none';
    }
};

window.calculatePromile = function() {
    const gender = document.getElementById('calc-gender').value;
    const weight = parseFloat(document.getElementById('calc-weight').value);
    
    // 1. Zbieramy to co jest aktualnie w polach (jeśli ktoś zapomniał kliknąć "Dodaj")
    const amountInput = parseFloat(document.getElementById('calc-amount').value);
    const percentInput = parseFloat(document.getElementById('calc-percent').value);
    
    if (!isNaN(amountInput) && !isNaN(percentInput) && amountInput > 0 && percentInput > 0) {
        window.currentDrinks.push({ amount: amountInput, percent: percentInput });
        document.getElementById('calc-amount').value = '';
        document.getElementById('calc-percent').value = '';
        renderDrinksList();
    }

    // 2. Walidacja błędów
    if (!gender || isNaN(weight) || weight <= 0) {
        if(window.showToast) showToast("Wybierz płeć i wpisz poprawną wagę!");
        return;
    }

    if (window.currentDrinks.length === 0) {
        if(window.showToast) showToast("Dodaj co najmniej jeden trunek!");
        return;
    }

    // 3. Obliczenia masy etanolu dla wszystkich trunków z listy
    let totalPureEthanolMl = 0;
    window.currentDrinks.forEach(drink => {
        totalPureEthanolMl += drink.amount * (drink.percent / 100);
    });

    const alcoholGrams = totalPureEthanolMl * 0.789; 
    const r = (gender === 'm') ? 0.68 : 0.55;
    let promile = alcoholGrams / (weight * r);
    let finalResult = promile.toFixed(2);

    // 4. Aktualizacja interfejsu wyniku
    const resultCard = document.getElementById('result-card');
    const resultValue = document.getElementById('result-value');
    const resultDetails = document.getElementById('result-details');
    
    if (resultDetails) {
        resultDetails.innerHTML = `
            Łącznie we wszystkich trunkach znajduje się:<br>
            <ion-icon name="beaker-outline" style="vertical-align: middle;"></ion-icon> <strong>${totalPureEthanolMl.toFixed(1)} ml</strong> czystego etanolu<br>
            <ion-icon name="scale-outline" style="vertical-align: middle;"></ion-icon> co waży ok. <strong>${alcoholGrams.toFixed(1)} g</strong>
        `;
    }

    resultCard.style.display = 'block';
    resultCard.classList.remove('fade-in');
    void resultCard.offsetWidth; 
    resultCard.classList.add('fade-in');

    if (promile < 0.2) resultValue.style.color = '#43a047';
    else if (promile < 0.5) resultValue.style.color = '#fb8c00';
    else resultValue.style.color = '#e53935';

    // 5. Animacja cyferek
    const target = parseFloat(finalResult);
    const duration = 1000; 
    let startTimestamp = null;
    if (window.promileAnimation) cancelAnimationFrame(window.promileAnimation);

    if (target === 0) {
        resultValue.innerText = '0.00 ‰';
        unlockBadge('czyste_konto');
    } else {
        const animate = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            resultValue.innerText = (target * easeOutProgress).toFixed(2) + ' ‰';
            if (progress < 1) window.promileAnimation = requestAnimationFrame(animate);
        };
        window.promileAnimation = requestAnimationFrame(animate);
    }

    // 6. Zapis do historii (Rozbudowany o informację o wielu trunkach)
    const saveEntry = (locationData = null) => {
        const now = new Date();
        
        // Zgrabne formatowanie informacji do historii
        let detailsText = window.currentDrinks.length === 1 
            ? `${window.currentDrinks[0].amount}ml ${window.currentDrinks[0].percent}%` 
            : `Różne trunki (${window.currentDrinks.length} szt.)`;

        const historyEntry = {
            date: now.toLocaleDateString() + ' ' + now.toLocaleTimeString(),
            result: finalResult,
            details: detailsText,
            gameScore: null,
            location: locationData 
        };
        
        let history = JSON.parse(localStorage.getItem('alkoHistory')) || [];
        history.push(historyEntry);
        localStorage.setItem('alkoHistory', JSON.stringify(history));
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village || data.address.county || "Nieznana lokalizacja";
                    const country = data.address.country === "Polska" ? "🇵🇱" : "";
                    saveEntry(`${city} ${country}`);
                } catch (error) {
                    saveEntry(`Szer: ${lat.toFixed(2)}, Dł: ${lon.toFixed(2)}`);
                }
            },
            (error) => saveEntry(null),
            { timeout: 5000 }
        );
    } else {
        saveEntry(null);
    }
};

// --- 5. CZAS TRZEŹWIENIA Z POWIADOMIENIEM ---
// ==========================================

window.calculateSoberTime = function() {
    const bacInput = document.getElementById('time-bac');
    if (!bacInput) return;
    
    const bac = parseFloat(bacInput.value);
    if (isNaN(bac) || bac <= 0) {
        if(window.showToast) showToast("Wprowadź prawidłowy wynik.");
        return;
    }

    const hoursNeeded = bac / 0.15;
    const now = new Date();
    const futureDate = new Date(now.getTime() + hoursNeeded * 60 * 60 * 1000);

    const h = Math.floor(hoursNeeded);
    const m = Math.round((hoursNeeded - h) * 60);

    document.getElementById('time-hours').innerText = `${h} godz. ${m} min.`;
    document.getElementById('time-clock').innerText = futureDate.getHours().toString().padStart(2, '0') + ":" + futureDate.getMinutes().toString().padStart(2, '0');
    
    const resultCard = document.getElementById('time-result-card');
    if (resultCard) resultCard.style.display = 'block';

    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.style.display = 'block';

    // Odpalamy planowanie powiadomienia
    if (typeof scheduleNotification === 'function') {
        scheduleNotification(hoursNeeded);
    }
};

// --- POWIADOMIENIA SYSTEMOWE (Web Notifications API) ---
window.scheduleNotification = function(hoursNeeded) {
    if (!("Notification" in window)) {
        console.log("Twoja przeglądarka nie obsługuje powiadomień.");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            
            const delay = hoursNeeded * 60 * 60 * 1000; 
            
            if(window.showToast) showToast("Budzik ustawiony! Otrzymasz powiadomienie, gdy czas minie.", "success");

            setTimeout(() => {
                new Notification("Wirtualny Alkomat", {
                    body: "Szacowany czas trzeźwienia minął! Pamiętaj, to tylko algorytm - w razie wątpliwości użyj prawdziwego alkomatu.",
                    vibrate: [200, 100, 200]
                });
            }, delay);
        } else {
            if(window.showToast) showToast("Brak zgody na powiadomienia.", "warning");
        }
    });
};

// --- 6. HISTORIA (SWIPE TO DELETE) ---
// Odszukaj ten fragment w app.js i podmień środek:
window.loadHistory = function() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('alkoHistory')) || [];

    if (!historyList) return;
    
    // Aktualizacja liczników statystyk na górze
    const statsCount = document.getElementById('stats-count');
    const statsLast = document.getElementById('stats-last');
    if(statsCount) statsCount.innerText = history.length;
    if(statsLast && history.length > 0) statsLast.innerText = history[history.length - 1].result + '‰';

    if (history.length === 0) {
        historyList.innerHTML = '<ion-item class="glass-item" style="--background: transparent;"><ion-label color="medium" class="ion-text-center">Brak wpisów.</ion-label></ion-item>';
        if (typeof drawHistoryChart === "function") drawHistoryChart([]);
        return;
    }

    historyList.innerHTML = '';
    
    history.slice().reverse().forEach((entry, index) => {
        const originalIndex = history.length - 1 - index;
        const hasGame = (typeof entry.gameScore !== 'undefined' && entry.gameScore !== null);
        let gameInfo = hasGame 
            ? `<p style="color: #3880ff; font-weight: bold; margin-top: 5px;"><ion-icon name="trophy-outline"></ion-icon> Refleks: ${entry.gameScore} pkt</p>` 
            : '';
        let locationInfo = entry.location 
            ? `<p style="color: #2dd36f; font-size: 0.8em; margin-top: 2px;"><ion-icon name="pin-outline" style="vertical-align: middle;"></ion-icon> ${entry.location}</p>` 
            : '';

        historyList.innerHTML += `
            <ion-item-sliding style="margin-bottom: 12px; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                <ion-item class="glass-item" lines="none" style="--background: transparent; margin: 0; --padding-start: 15px;">
                    <ion-label class="ion-text-wrap">
                        <h2 style="font-size: 1.3rem; color: var(--ion-text-color); margin-bottom: 5px;"><strong>${entry.result} ‰</strong></h2>
                        <p style="color: gray;">${entry.details}</p>
                        ${gameInfo}
                        ${locationInfo}
                        <p style="font-size: 0.75em; color: gray; margin-top: 5px;">${entry.date}</p>
                    </ion-label>
                </ion-item>
                <ion-item-options side="end">
                    <ion-item-option color="danger" onclick="deleteHistoryItem(${originalIndex})">
                        <ion-icon name="trash" slot="icon-only"></ion-icon>
                    </ion-item-option>
                </ion-item-options>
            </ion-item-sliding>
        `;
    });
    
    if (typeof drawHistoryChart === "function") drawHistoryChart(history);
};

window.deleteHistoryItem = function(index) {
    let history = JSON.parse(localStorage.getItem('alkoHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('alkoHistory', JSON.stringify(history));
    loadHistory();
    showToast("Wpis usunięty", "dark");
    unlockBadge('zacieranie_sladow');
};

window.clearHistory = function() {
    localStorage.removeItem('alkoHistory');
    loadHistory();
    showToast("Historia wyczyszczona", "dark");
};

function drawHistoryChart(history) {
    const canvas = document.getElementById('historyChart');
    if (!canvas) return;

    // 1. Zmuszamy Canvas do przyjęcia fizycznych rozmiarów swojego kontenera (z HTML)
    canvas.width = canvas.parentElement.clientWidth || window.innerWidth - 32;
    canvas.height = canvas.parentElement.clientHeight || 300; 

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (history.length === 0) return;

    const recentHistory = history.slice(-7);
    const maxP = Math.max(...recentHistory.map(h => parseFloat(h.result)), 2.0);

    // 2. Dynamiczne parametry rysowania
    const padding = 20; // Odstęp od krawędzi
    const availableWidth = canvas.width - (padding * 2);
    const stepX = availableWidth / Math.max(recentHistory.length, 1); // Odległość między słupkami
    const barWidth = Math.min(stepX * 0.6, 40); // Szerokość słupka (max 40px)

    const chartHeight = canvas.height - 50; // Dostępna wysokość na same słupki
    const baseY = canvas.height - 25; // Linia bazowa (dół wykresu)

    recentHistory.forEach((entry, i) => {
        const val = parseFloat(entry.result);
        const barH = (val / maxP) * chartHeight; // Dynamiczna wysokość słupka
        
        // Wyśrodkowanie słupka w jego przydzielonym miejscu
        const x = padding + (i * stepX) + (stepX / 2) - (barWidth / 2); 
        const y = baseY - barH;

        // Rysowanie słupka
        ctx.fillStyle = val >= 0.2 ? '#e53935' : '#43a047';
        ctx.fillRect(x, y, barWidth, barH);
        
        // Rysowanie tekstu
        ctx.fillStyle = 'gray'; // Zmienione z czarnego, żeby pasowało do Dark Mode!
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center'; // Ułatwia idealne wyśrodkowanie nad słupkiem
        ctx.fillText(val.toFixed(2), x + (barWidth / 2), y - 8);
    });

    // 3. Rysowanie czerwonej linii limitu (0.2 ‰)
    const limitY = baseY - ((0.2 / maxP) * chartHeight);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, limitY); 
    ctx.lineTo(canvas.width - padding, limitY); 
    ctx.stroke();
    ctx.setLineDash([]); // Reset przerywanej linii
}

// --- 7. POZOSTAŁE FUNKCJE ---
window.renderLimits = function(searchTerm = '') {
    const list = document.getElementById('limits-list');
    if (!list) return;

    list.innerHTML = ''; // Czyścimy listę przed nowym renderowaniem

    // 1. Filtrowanie państw na podstawie wpisanej frazy
    const filteredLimits = countryLimits.filter(item => 
        item.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Komunikat, gdy nic nie znaleziono
    if (filteredLimits.length === 0) {
        list.innerHTML = '<ion-item><ion-label color="medium" class="ion-text-center">Brak wyników</ion-label></ion-item>';
        return;
    }

    // 3. Budowanie listy z przefiltrowanych wyników
    filteredLimits.forEach(item => {
        let badgeColor = 'success'; 
        if (item.limit === 0.0) badgeColor = 'danger';
        else if (item.limit <= 0.2) badgeColor = 'warning';

        list.innerHTML += `
            <ion-item>
                <div slot="start" style="font-size: 32px; margin-right: 15px;">
                    ${item.flag}
                </div>
                <ion-label class="ion-text-wrap">
                    <h2 style="font-size: 1.1rem;"><strong>${item.country}</strong></h2>
                    <p style="color: gray; font-size: 0.85rem; margin-top: 4px;">${item.desc}</p>
                </ion-label>
                <ion-badge color="${badgeColor}" slot="end" style="font-size: 1rem; padding: 8px 12px; border-radius: 8px;">
                    ${item.limit.toFixed(1)} ‰
                </ion-badge>
            </ion-item>
        `;
    });
};

window.renderDatabase = function(cat = 'wszystkie') {
    const list = document.getElementById('db-list');
    if (!list) return;
    list.innerHTML = '';
    const filtered = cat === 'wszystkie' ? alcoholDatabase : alcoholDatabase.filter(i => i.category === cat);
    filtered.forEach(item => {
        list.innerHTML += `<ion-item><ion-icon name="${item.icon}" slot="start" color="secondary"></ion-icon><ion-label><h2><strong>${item.name}</strong> (${item.percent}%)</h2><p>${item.desc}</p></ion-label></ion-item>`;
    });
};

window.startGame = function() {
    gameScore = 0; gameTime = 10;
    document.getElementById('game-score').innerText = gameScore;
    document.getElementById('game-time').innerText = gameTime;
    const board = document.getElementById('game-board');
    document.getElementById('start-btn').disabled = true;
    board.innerHTML = '';
    
    targetElement = document.createElement('div');
    targetElement.style = 'width:50px;height:50px;background:#3880ff;border-radius:50%;position:absolute;cursor:pointer;box-shadow:0 4px 8px rgba(0,0,0,0.3);';
   targetElement.onclick = () => { 
        gameScore++; 
        document.getElementById('game-score').innerText = gameScore; 
        
        // NOWE: Odtwarzamy dźwięk piknięcia
        if (typeof playBeep === 'function') playBeep();
        
        // NOWE: Dodajemy też króciutką wibrację (50ms), jeśli telefon to obsługuje
        if ('vibrate' in navigator) navigator.vibrate(50);
        
        moveTarget(); 
    };

    board.appendChild(targetElement);
    moveTarget();
    gameInterval = setInterval(() => {
        gameTime--; document.getElementById('game-time').innerText = gameTime;
        if (gameTime <= 0) endGame();
    }, 1000);
};

window.moveTarget = function() {
    const board = document.getElementById('game-board');
    targetElement.style.left = Math.floor(Math.random() * (board.clientWidth - 50)) + 'px';
    targetElement.style.top = Math.floor(Math.random() * (board.clientHeight - 50)) + 'px';
};

window.endGame = function() {
    clearInterval(gameInterval);
    document.getElementById('game-board').innerHTML = `<h2 style="margin-top:40%;">Koniec! Wynik: ${gameScore}</h2>`;
    document.getElementById('start-btn').disabled = false;
    document.getElementById('start-btn').innerText = "Zagraj ponownie";

    let history = JSON.parse(localStorage.getItem('alkoHistory')) || [];
    if (history.length > 0) {
        history[history.length - 1].gameScore = gameScore;
        localStorage.setItem('alkoHistory', JSON.stringify(history));
    }

    if (gameScore > 15) {
        if (typeof unlockBadge === 'function') {
            unlockBadge('szybkie_raczki');
        }
    }
};

window.startScanner = function() {
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
    input.onchange = (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('scanner-loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('scanner-loading').style.display = 'none';
                document.getElementById('scanned-image').src = ev.target.result;
                document.getElementById('scanner-fact').innerText = alcoholFacts[Math.floor(Math.random() * alcoholFacts.length)];
                document.getElementById('scanner-result').style.display = 'block';
            }, 2000);
        };
        reader.readAsDataURL(file);
    };
    input.click();
};

window.takePhoto = function() {
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
    input.onchange = (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            let gallery = JSON.parse(localStorage.getItem('alkoGallery')) || [];
            gallery.push(ev.target.result);
            localStorage.setItem('alkoGallery', JSON.stringify(gallery));
            loadGallery();
        };
        reader.readAsDataURL(file);
    };
    input.click();
};

window.loadGallery = function() {
    const grid = document.getElementById('custom-gallery');
    if (!grid) return;
    const gallery = JSON.parse(localStorage.getItem('alkoGallery')) || [];
    if (gallery.length === 0) { grid.innerHTML = '<ion-col size="12"><p>Brak zdjęć.</p></ion-col>'; return; }
    grid.innerHTML = '';
    gallery.slice().reverse().forEach(img => {
        grid.innerHTML += `<ion-col size="6" size-md="4"><ion-card style="margin:0;"><img src="${img}" style="width:100%;height:150px;object-fit:cover;"/></ion-card></ion-col>`;
    });
};

function drawHomeCanvas() {
    const canvas = document.getElementById('homeCanvas'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#e0f7fa'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0288d1'; ctx.beginPath(); ctx.moveTo(50, 50); ctx.lineTo(150, 50); ctx.lineTo(110, 120); ctx.lineTo(90, 120); ctx.closePath(); ctx.fill();
    ctx.fillRect(95, 120, 10, 50); ctx.fillRect(70, 170, 60, 10);
    ctx.fillStyle = '#000'; ctx.font = 'bold 18px Arial'; ctx.fillText('Witaj!', 70, 40);
}

// --- 8. INICJALIZACJA STARTOWA ---
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.addEventListener('ionChange', (ev) => document.body.classList.toggle('dark', ev.detail.checked));
    
    // Uruchomienie aplikacji
    showPage('home');
});

// --- UDOSTĘPNIANIE WYNIKÓW (WEB SHARE API) ---
window.shareResult = async function() {
    // Pobieramy dane z ekranu
    const bac = document.getElementById('time-bac').value;
    const timeHours = document.getElementById('time-hours').innerText;
    const timeClock = document.getElementById('time-clock').innerText;

    // Przygotowujemy tekst wiadomości
    const shareData = {
        title: 'Wirtualny Alkomat',
        text: `Wydmuchałem ${bac} ‰! Będę gotowy do jazdy za ${timeHours} (około ${timeClock}).`,
    };

    // Sprawdzamy, czy telefon/przeglądarka obsługuje natywne dzielenie się
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('Udostępniono pomyślnie!');
        } catch (err) {
            console.log('Użytkownik anulował udostępnianie.');
        }
    } else {
        // Jeśli ktoś używa bardzo starej przeglądarki na komputerze
        showToast("Twoja przeglądarka nie wspiera natywnego udostępniania.", "warning");
    }
};

// --- WIRTUALNY SYNTEZATOR (DŹWIĘKI W GRZE) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

window.playBeep = function() {
    // Odblokowanie audio (przeglądarki wymagają interakcji użytkownika)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    // Tworzymy generator fal i kontroler głośności
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine'; // Czysty, gładki dźwięk (jak w starych automatach)
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // 800 Hz
    
    // Ustawiamy głośność na 10% żeby nie ogłuszyć i robimy szybkie wyciszenie (fade-out)
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    
    // Łączymy "kable"
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Gramy przez ułamek sekundy (100 milisekund)
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
};

// --- GADAJĄCY ALKOMAT (Web Speech API) ---
window.speakResult = function(promile) {
    // Sprawdzamy, czy urządzenie obsługuje mowę
    if ('speechSynthesis' in window) {
        
        // Zatrzymujemy mowę, jeśli telefon akurat czytał poprzedni wynik
        window.speechSynthesis.cancel();

        // Przygotowujemy tekst. Jeśli wynik jest >= 0.2 dodajemy ostrzeżenie
        let textToSpeak = `Twój szacowany wynik to ${promile} promila. `;
        if (promile >= 0.2) {
            textToSpeak += "Przekroczono limit. Absolutnie nie wsiadaj za kierownicę!";
        } else {
            textToSpeak += "Wynik w normie, ale zachowaj ostrożność.";
        }

        // Tworzymy obiekt mowy
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Ustawienia głosu
        utterance.lang = 'pl-PL'; // Wybieramy polski głos systemowy
        utterance.rate = 0.9;     // Zwalniamy tempo o 10%, brzmi naturalniej
        utterance.pitch = 1.0;    // Standardowa wysokość głosu
        
    } else {
        console.log("Twoje urządzenie nie obsługuje syntezatora mowy.");
    }
};

// --- POWIADOMIENIA SYSTEMOWE (Web Notifications API) ---
window.scheduleNotification = function(hoursNeeded) {
    // 1. Sprawdzamy, czy urządzenie w ogóle obsługuje powiadomienia
    if (!("Notification" in window)) {
        console.log("Twoja przeglądarka nie obsługuje powiadomień.");
        return;
    }

    // 2. Pytamy użytkownika o zgodę
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            
            // 3. Ustawiamy czas do powiadomienia (w milisekundach)
            // DO TESTÓW: 5000 ms (czyli 5 sekund)
            // W WERSJI FINALNEJ zmień to na: hoursNeeded * 60 * 60 * 1000
            const delay = hoursNeeded * 60 * 60 * 1000; 
            
            if(window.showToast) showToast("Budzik ustawiony! Powiadomienie przyjdzie gdy minie czas.", "success");

            // 4. Odliczamy czas i wysyłamy powiadomienie systemowe
            setTimeout(() => {
                new Notification("Wirtualny Alkomat", {
                    body: "Szacowany czas trzeźwienia minął! Pamiętaj, to tylko algorytm - w razie wątpliwości użyj prawdziwego alkomatu.",
                    vibrate: [200, 100, 200] // Dodatkowa wibracja dla telefonów
                });
            }, delay);
        } else {
            if(window.showToast) showToast("Brak zgody na powiadomienia.", "warning");
        }
    });
};

// ==========================================
// --- SYSTEM ODZNAK (GAMIFIKACJA) ---
// ==========================================

const badgeDefinitions = [
    { id: 'czyste_konto', name: 'Czyste konto', icon: 'water-outline', desc: 'Wpisz wynik 0.00 ‰. Wzorowy kierowca!', color: 'primary' },
    { id: 'szybkie_raczki', name: 'Szybkie rączki', icon: 'flash-outline', desc: 'Zdobądź powyżej 15 punktów w grze.', color: 'warning' },
    { id: 'zacieranie_sladow', name: 'Zacieranie śladów', icon: 'trash-outline', desc: 'Usuń dowolny wpis z historii.', color: 'medium' }
];

window.unlockBadge = function(badgeId) {
    let unlocked = JSON.parse(localStorage.getItem('alkoBadges')) || [];
    
    // Jeśli jeszcze nie ma tej odznaki, dodajemy ją!
    if (!unlocked.includes(badgeId)) {
        unlocked.push(badgeId);
        localStorage.setItem('alkoBadges', JSON.stringify(unlocked));
        
        // Szukamy danych tej odznaki, żeby pokazać jej nazwę
        const badge = badgeDefinitions.find(b => b.id === badgeId);
        
        // Wystrzał powiadomienia!
        if(window.showToast) {
            showToast(`🏆 Odblokowano: ${badge.name}!`, 'success');
        }
        
        // Jeśli jesteśmy akurat na stronie odznak, odświeżamy ją
        if (document.getElementById('badges-list')) loadBadges();
    }
};

window.loadBadges = function() {
    const list = document.getElementById('badges-list');
    if (!list) return;
    list.innerHTML = '';
    
    let unlocked = JSON.parse(localStorage.getItem('alkoBadges')) || [];

    badgeDefinitions.forEach(badge => {
        const isUnlocked = unlocked.includes(badge.id);
        const color = isUnlocked ? badge.color : 'medium';
        const opacity = isUnlocked ? '1' : '0.4'; // Wygaszamy niezdobyte
        const iconName = isUnlocked ? badge.icon : 'lock-closed-outline'; // Kłódka dla zablokowanych
        const statusText = isUnlocked ? 'Odblokowane' : 'Zablokowane';

        list.innerHTML += `
            <ion-item style="opacity: ${opacity};">
                <ion-icon name="${iconName}" slot="start" color="${color}" style="font-size: 32px;"></ion-icon>
                <ion-label class="ion-text-wrap">
                    <h2><strong>${badge.name}</strong></h2>
                    <p style="color: gray; font-size: 0.9em;">${badge.desc}</p>
                    <p style="font-size: 0.75em; color: ${color}; margin-top: 5px; text-transform: uppercase; font-weight: bold;">${statusText}</p>
                </ion-label>
            </ion-item>
        `;
    });
};

// ==========================================
// --- EKSPORT I IMPORT DANYCH (CSV) ---
// ==========================================

// 1. EKSPORT DO PLIKU
window.exportHistoryToCSV = function() {
    const history = JSON.parse(localStorage.getItem('alkoHistory')) || [];
    if (history.length === 0) return showToast("Brak danych do eksportu.", "warning");

    // Nagłówki pliku CSV
    let csvContent = "Data;Wynik (promile);Szczegóły;Refleks;Lokalizacja\n";

    // Budowanie wierszy
    history.forEach(e => {
        const row = [
            e.date,
            e.result,
            e.details,
            e.gameScore || "Brak",
            e.location || "Brak"
        ].join(";");
        csvContent += row + "\n";
    });

    // Tworzenie "pliku" w pamięci
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Tworzenie ukrytego linku do pobrania
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `historia_alkomat_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    
    link.click(); // Symulujemy kliknięcie
    document.body.removeChild(link);
    showToast("Pobieranie pliku CSV...", "success");
};

// 2. WYZWALACZ WYBORU PLIKU
window.triggerCSVImport = function() {
    document.getElementById('csv-import-input').click();
};

// 3. FAKTYCZNY IMPORT I PARSOWANIE
window.importHistoryFromCSV = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const rows = text.split("\n").slice(1); // Pomijamy nagłówek
        let importedCount = 0;
        let newHistory = JSON.parse(localStorage.getItem('alkoHistory')) || [];

        rows.forEach(row => {
            const cols = row.split(";");
            if (cols.length >= 3) {
                newHistory.push({
                    date: cols[0],
                    result: cols[1],
                    details: cols[2],
                    gameScore: cols[3] === "Brak" ? null : cols[3],
                    location: cols[4] === "Brak" ? null : cols[4]
                });
                importedCount++;
            }
        });

        localStorage.setItem('alkoHistory', JSON.stringify(newHistory));
        loadHistory(); // Odświeżamy listę
        showToast(`Pomyślnie zaimportowano ${importedCount} wpisów!`, "success");
        
        // Resetujemy input, żeby można było wgrać ten sam plik ponownie
        event.target.value = '';
    };
    reader.readAsText(file);
};

// --- GENEROWANIE LISTY LIMITÓW W KRAJACH ---
window.loadCountryLimits = function() {
    const list = document.getElementById('limits-list');
    if (!list) return; // Jeśli nie ma listy na stronie, przerywamy
    
    list.innerHTML = ''; // Czyścimy listę przed załadowaniem

    countryLimits.forEach(item => {
        // Dobieramy kolor plakietki w zależności od rygoru (0.0 = czerwony, 0.2 = pomarańczowy, reszta = zielony)
        let badgeColor = 'success'; 
        if (item.limit === 0.0) badgeColor = 'danger';
        else if (item.limit <= 0.2) badgeColor = 'warning';

        list.innerHTML += `
            <ion-item>
                <div slot="start" style="font-size: 32px; margin-right: 15px;">
                    ${item.flag}
                </div>
                <ion-label class="ion-text-wrap">
                    <h2 style="font-size: 1.1rem;"><strong>${item.country}</strong></h2>
                    <p style="color: gray; font-size: 0.85rem; margin-top: 4px;">${item.desc}</p>
                </ion-label>
                <ion-badge color="${badgeColor}" slot="end" style="font-size: 1rem; padding: 8px 12px; border-radius: 8px;">
                    ${item.limit.toFixed(1)} ‰
                </ion-badge>
            </ion-item>
        `;
    });
};