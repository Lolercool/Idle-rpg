import { playerSkills } from "./playerState.js";

//#region Player State & Stats Display
let player = {
    level: 0,
    xp: 0,
    coins: 0,
};

let coinDisplay = document.getElementById("coin-text");
coinDisplay.textContent = player.coins;

let levelDisplay = document.getElementById("level-text");
levelDisplay.textContent = player.level;

let xpDisplay = document.getElementById("xp-text");
xpDisplay.textContent = player.xp;
//#endregion

//#region Main View Navigation
const viewNames = [
    "profile", "inventory", "skills", "collections", "map",
    "farming", "mining", "foraging", "combat", "fishing"
];

const allViews = [];
const allMainButtons = [];

viewNames.forEach(name => {
    const view = document.getElementById(`${name}-main-view`);
    const btn = document.getElementById(`${name}-btn`);
    
    if (view) allViews.push(view);
    if (btn) allMainButtons.push(btn);

    if (btn && view) {
        btn.addEventListener("click", function() {
            hideAllViews();
            clearMainButtonActive();
            
            view.classList.remove("hidden");
            btn.classList.add("active");
        });
    }
});

function hideAllViews() {
    allViews.forEach(view => view.classList.add("hidden"));
}

function clearMainButtonActive() {
    allMainButtons.forEach(btn => btn.classList.remove("active"));
}

// Set initial active state for Profile view button
const initialMainBtn = document.getElementById("profile-btn");
if (initialMainBtn) initialMainBtn.classList.add("active");
//#endregion

//#region Profile Sub-Tab Navigation
const profileTabNames = ["profiletab", "stats", "quests"];
const allProfileTabs = [];
const allProfileTabButtons = [];

profileTabNames.forEach(name => {
    const tab = document.getElementById(`tab-${name}`);
    const btn = document.getElementById(`${name}-btn`);

    if (tab) allProfileTabs.push(tab);
    if (btn) allProfileTabButtons.push(btn);

    if (btn && tab) {
        btn.addEventListener("click", function() {
            hideAllProfileTabs();
            clearProfileTabButtonActive();

            tab.classList.remove("hidden");
            btn.classList.add("active");
        });
    }
});

function hideAllProfileTabs() {
    allProfileTabs.forEach(tab => tab.classList.add("hidden"));
}

function clearProfileTabButtonActive() {
    allProfileTabButtons.forEach(btn => btn.classList.remove("active"));
}

// Set initial active state for Profile sub-tab button
const initialProfileTabBtn = document.getElementById("profiletab-btn");
if (initialProfileTabBtn) initialProfileTabBtn.classList.add("active");
//#endregion

//#region Inventory Sub-Tab Navigation
const inventoryTabNames = ["equipped", "wardrobe", "accessories", "items", "storage", "pets"];
const allInventoryTabs = [];
const allInventoryTabButtons = [];

inventoryTabNames.forEach(name => {
    const tab = document.getElementById(`tab-${name}`);
    const btn = document.getElementById(`${name}-btn`);

    if (tab) allInventoryTabs.push(tab);
    if (btn) allInventoryTabButtons.push(btn);

    if (btn && tab) {
        btn.addEventListener("click", function() {
            hideAllInventoryTabs();
            clearInventoryTabButtonActive();

            tab.classList.remove("hidden");
            btn.classList.add("active");
        });
    }
});

function hideAllInventoryTabs() {
    allInventoryTabs.forEach(tab => tab.classList.add("hidden"));
}

function clearInventoryTabButtonActive() {
    allInventoryTabButtons.forEach(btn => btn.classList.remove("active"));
}

// Set initial active state for Equipped sub-tab button
const initialInventoryTabBtn = document.getElementById("equipped-btn");
if (initialInventoryTabBtn) initialInventoryTabBtn.classList.add("active");
//#endregion

//#region Collections Sub-Tab Navigation
const collectionsTabNames = ["farmingcollection", "miningcollection", "foragingcollection", "combatcollection", "fishingcollection"];
const allCollectionsTabs = [];
const allCollectionsTabButtons = [];

collectionsTabNames.forEach(name => {
    const tab = document.getElementById(`tab-${name}`);
    const btn = document.getElementById(`${name}-btn`);

    if (tab) allCollectionsTabs.push(tab);
    if (btn) allCollectionsTabButtons.push(btn);

    if (btn && tab) {
        btn.addEventListener("click", function() {
            hideAllCollectionsTabs();
            clearCollectionsTabButtonActive();

            tab.classList.remove("hidden");
            btn.classList.add("active");
        });
    }
});

function hideAllCollectionsTabs() {
    allCollectionsTabs.forEach(tab => tab.classList.add("hidden"));
}

function clearCollectionsTabButtonActive() {
    allCollectionsTabButtons.forEach(btn => btn.classList.remove("active"));
}

// Set initial active state for Equipped sub-tab button
const initialCollectionsTabBtn = document.getElementById("farmingcollection-btn");
if (initialCollectionsTabBtn) initialCollectionsTabBtn.classList.add("active");
//#endregion

let skill_levels = {
    1: 50,
    2: 100,
    3: 250,
    4: 500,
    5: 750,
    6: 1000,
    7: 2000,
    8: 3500,
    9: 5000,
    10: 7500,
    11: 10000,
    12: 12500,
    13: 15000,
    14: 17500,
    15: 20000,
    16: 22500,
    17: 25000,
    18: 30000,
    19: 35000,
    20: 40000,
};

//#region UI Update Functions & Initialization
function updateSkillsUI() {
    for (let skillName in playerSkills) {
        let skill = playerSkills[skillName];
        let targetXp = skill_levels[skill.level] || skill_levels[20];
        let percentage = Math.min((skill.xp / targetXp) * 100, 100);

        document.getElementById(`${skillName}-level`).textContent = skill.level;
        document.getElementById(`${skillName}-xp`).textContent = skill.xp;
        document.getElementById(`${skillName}-next-xp`).textContent = targetXp;
        document.getElementById(`${skillName}-bar`).style.width = percentage + "%";
    }
}

updateSkillsUI();
//#endregion