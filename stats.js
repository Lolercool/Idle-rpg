import { items } from "./items.js";
import { playerEquipment, playerInventory } from "./playerState.js";

let baseStats = {
    health: 100,
    defense: 0,
    damage: 5,
    strength: 0,
    critical_chance: 20,
    critical_damage: 50,
    farming_fortune: 0,
    mining_fortune: 0,
    foraging_fortune: 0,
};

export let playerStats = {
    ...baseStats
};

export function calculatePlayerStats() {
    playerStats = {...baseStats};
    addEquipmentStats(playerEquipment, playerInventory);
    updateStatUI();
}

export function addEquipmentStats(playerEquipment, playerInventory) {
    let equippedItems = Object.values(playerEquipment);

    equippedItems.forEach(instanceId => {
        if (instanceId === null) {return;}
        let inventoryItem = playerInventory.find(item => item.instanceId === instanceId);
        let itemData = items.find(item => item.id === inventoryItem.itemId);
        let itemStatEntries = Object.entries(itemData.itemStats);
        itemStatEntries.forEach(([statName, statValue]) => {
            playerStats[statName] += statValue;
        });
    });
}

export function addBaseStat(stat, amount) {
    if (baseStats[stat] !== undefined ) {
        baseStats[stat] += amount;
        calculatePlayerStats();
    } 
}   

function updateStatUI() {
    for (let statName in playerStats) {
        let stat = playerStats[statName];

        document.getElementById(`${statName}-stat`).textContent = stat;
    }
}