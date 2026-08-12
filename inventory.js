import { items } from "./items.js";

let playerInventory = [
    {
        itemId: "wheat",
        quantity: 347,
    },
    {
        itemId: "carrot",
        quantity: 12,
    },
    {
        itemId: "iron_ore",
        quantity: 86,
    },
    {
        itemId: "gold_ore",
        quantity: 3,
    },
    {
        itemId: "oak_log",
        quantity: 152,
    },
    {
        itemId: "goblin_ear",
        quantity: 7,
    },
    {
        itemId: "iron_sword",
        instanceId: "iron_sword_1",
    },
    {
        itemId: "iron_sword",
        instanceId: "iron_sword_2",
    },
    {
        itemId: "steel_sword",
        instanceId: "steel_sword_1",
    },
    {
        itemId: "iron_helmet",
        instanceId: "iron_helmet_1",
    },
    {
        itemId: "explorer_boots",
        instanceId: "explorer_boots_1",
    },
    {
        itemId: "iron_pickaxe",
        instanceId: "iron_pickaxe_1",
    },
    {
        itemId: "iron_pickaxe",
        instanceId: "iron_pickaxe_2",
    },
    {
        itemId: "steel_axe",
        instanceId: "steel_axe_1",
    },
    {
        itemId: "steel_axe",
        instanceId: "steel_axe_2",
    },
]

let stackableItemsList = document.getElementById("stackable-items-list");
let storageList = document.getElementById("storage-list");

let itemsTotalCount = document.getElementById("items-total-count");
let storageTotalCount = document.getElementById("storage-total-count");

let stackableCount = 0;
let storageCount = 0;

playerInventory.forEach(inventoryItem => {
    let itemData = items.find(item => item.id === inventoryItem.itemId);

    if (itemData.stackable === true) {
        stackableCount++;

        let slot = document.createElement("div");
        slot.classList.add("item-slot", "stackable-slot");
        slot.classList.add("rarity-" + itemData.rarity);

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.textContent = itemData.name;

        let itemQuantity = document.createElement("span");
        itemQuantity.classList.add("item-qty");
        itemQuantity.textContent = inventoryItem.quantity;

        slot.appendChild(itemName);
        slot.appendChild(itemQuantity);

        stackableItemsList.appendChild(slot);
    }

    if (itemData.stackable === false) {
        storageCount++;

        let slot = document.createElement("div");
        slot.classList.add("item-slot");
        slot.classList.add("rarity-" + itemData.rarity);

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.textContent = itemData.name;

        slot.appendChild(itemName);

        storageList.appendChild(slot);
    }
});

itemsTotalCount.textContent = stackableCount + " Unique Items";
storageTotalCount.textContent = storageCount + " Items";