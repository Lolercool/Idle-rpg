import { playerSkills, player } from "./playerState.js";

let coinDisplay = document.getElementById("coin-text");
let levelDisplay = document.getElementById("level-text");
let xpDisplay = document.getElementById("xp-text");

//#region Main View Navigation
let viewNames = [
    "profile", "inventory", "skills", "collections", "map",
    "farming", "mining", "foraging", "combat", "fishing"
];

let allViews = [];
let allMainButtons = [];

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
let initialMainBtn = document.getElementById("profile-btn");
if (initialMainBtn) initialMainBtn.classList.add("active");
//#endregion

//#region Profile Sub-Tab Navigation
let profileTabNames = ["profiletab", "stats", "quests"];
let allProfileTabs = [];
let allProfileTabButtons = [];

profileTabNames.forEach(name => {
    let tab = document.getElementById(`tab-${name}`);
    let btn = document.getElementById(`${name}-btn`);

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
let initialProfileTabBtn = document.getElementById("profiletab-btn");
if (initialProfileTabBtn) initialProfileTabBtn.classList.add("active");
//#endregion

//#region Inventory Sub-Tab Navigation
let inventoryTabNames = ["equipped", "wardrobe", "accessories", "items", "storage", "pets"];
let allInventoryTabs = [];
let allInventoryTabButtons = [];

inventoryTabNames.forEach(name => {
    let tab = document.getElementById(`tab-${name}`);
    let btn = document.getElementById(`${name}-btn`);

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
let initialInventoryTabBtn = document.getElementById("equipped-btn");
if (initialInventoryTabBtn) initialInventoryTabBtn.classList.add("active");
//#endregion

//#region Collections Sub-Tab Navigation
let collectionsTabNames = ["farmingcollection", "miningcollection", "foragingcollection", "combatcollection", "fishingcollection"];
let allCollectionsTabs = [];
let allCollectionsTabButtons = [];

collectionsTabNames.forEach(name => {
    let tab = document.getElementById(`tab-${name}`);
    let btn = document.getElementById(`${name}-btn`);

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
let initialCollectionsTabBtn = document.getElementById("farmingcollection-btn");
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

function addXp(amount) {
    player.xp += amount;
    while (player.xp>=100) {
        player.level += 1;
        player.xp -= 100;
    }
    updatePlayerUI();
}

function addCoins(amount) {
    player.coins += amount;
    updatePlayerUI();
}
function removeCoins(amount) {
    if (player.coins >= amount) {
        player.coins -= amount;
    }
    updatePlayerUI();
}

function updatePlayerUI() {
    coinDisplay.textContent = player.coins;
    levelDisplay.textContent = player.level;
    xpDisplay.textContent = player.xp;
}

updatePlayerUI();
updateSkillsUI();
//#endregion