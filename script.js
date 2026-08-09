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