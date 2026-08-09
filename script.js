let player = {
    level: 0,
    xp: 0,
    coins: 0,
}

let coinDisplay = document.getElementById("coin-text");
coinDisplay.textContent = player.coins;
let levelDisplay = document.getElementById("level-text");
levelDisplay.textContent = player.level;
let xpDisplay = document.getElementById("xp-text");
xpDisplay.textContent = player.xp;

let profileView = document.getElementById("profile-main-view");
let inventoryView = document.getElementById("inventory-main-view");
let skillsView = document.getElementById("skills-main-view");
let collectionsView = document.getElementById("collections-main-view");
let mapView = document.getElementById("map-main-view");
let farmingView = document.getElementById("farming-main-view");
let miningView = document.getElementById("mining-main-view");
let foragingView = document.getElementById("foraging-main-view");
let combatView = document.getElementById("combat-main-view");
let fishingView = document.getElementById("fishing-main-view");

let allViews = [
    profileView,
    inventoryView,
    skillsView,
    collectionsView,
    mapView,
    farmingView,
    miningView,
    foragingView,
    combatView,
    fishingView,
];

let profileBtn = document.getElementById("profile-btn");
profileBtn.addEventListener("click", function() { 
    hideAllViews();
    profileView.classList.remove("hidden"); })

let inventoryBtn = document.getElementById("inventory-btn");
inventoryBtn.addEventListener("click", function() { 
    hideAllViews();
    inventoryView.classList.remove("hidden");
})

let skillsBtn = document.getElementById("skills-btn");
skillsBtn.addEventListener("click", function() { 
    hideAllViews();
    skillsView.classList.remove("hidden");
})

let collectionsBtn = document.getElementById("collections-btn");
collectionsBtn.addEventListener("click", function() { 
    hideAllViews();
    collectionsView.classList.remove("hidden");
})

let mapBtn = document.getElementById("map-btn");
mapBtn.addEventListener("click", function() { 
    hideAllViews();
    mapView.classList.remove("hidden");
})

let farmingBtn = document.getElementById("farming-btn");
farmingBtn.addEventListener("click", function() { 
    hideAllViews();
    farmingView.classList.remove("hidden");
})

let miningBtn = document.getElementById("mining-btn");
miningBtn.addEventListener("click", function() { 
    hideAllViews();
    miningView.classList.remove("hidden");
})

let foragingBtn = document.getElementById("foraging-btn");
foragingBtn.addEventListener("click", function() { 
    hideAllViews();
    foragingView.classList.remove("hidden");
})

let combatBtn = document.getElementById("combat-btn");
combatBtn.addEventListener("click", function() { 
    hideAllViews();
    combatView.classList.remove("hidden");
})

let fishingBtn = document.getElementById("fishing-btn");
fishingBtn.addEventListener("click", function() { 
    hideAllViews();
    fishingView.classList.remove("hidden");
})

function hideAllViews() {
    allViews.forEach(function(singleView) {
        singleView.classList.add("hidden");
    });
}

let player_skills = {
    farming: { level: 1, xp: 0 },
    mining: { level: 1, xp: 0 },
    foraging: { level: 1, xp: 0 },
    combat: { level: 1, xp: 0 },
    fishing: { level: 1, xp: 0 },
}

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
}


function updateSkillsUI() {
    for (let skillName in player_skills) {
        let skill = player_skills[skillName];
        let targetXp = skill_levels[skill.level];
        let percentage = (skill.xp / targetXp) * 100;

        document.getElementById(`${skillName}-level`).textContent = skill.level;
        document.getElementById(`${skillName}-xp`).textContent = skill.xp;
        document.getElementById(`${skillName}-next-xp`).textContent = targetXp;
        document.getElementById(`${skillName}-bar`).style.width = percentage + "%";
    }
}

updateSkillsUI();