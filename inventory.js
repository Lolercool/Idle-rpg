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
];

let playerEquipment = {
    helmet: null,
    chestplate: null,
    leggings: null,
    boots: null,
    sword: null,
    bow: null,
    pickaxe: null,
    axe: null,
    hoe: null,
    shovel: null,
    rod: null,
    pet: null,
};

let rarityOrder = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
    mythic: 6,
};

let stackableItemsList = document.getElementById("stackable-items-list");
let storageList = document.getElementById("storage-list");

let itemsSearchInput = document.getElementById("items-search-input");
let storageSearchInput = document.getElementById("storage-search-input");

let itemsCategoryFilter = document.getElementById("items-category-filter");
let storageCategoryFilter = document.getElementById("storage-category-filter");

let itemsSortSelect = document.getElementById("items-sort-select");
let storageSortSelect = document.getElementById("storage-sort-select");

let itemsTotalCount = document.getElementById("items-total-count");
let storageTotalCount = document.getElementById("storage-total-count");



let equipmentModal = document.getElementById("equipment-modal");
let equipmentModalClose = document.getElementById("equipment-modal-close");
let equipmentModalSearch = document.getElementById("equipment-modal-search");
let equipmentModalCurrentItem = document.getElementById("equipment-modal-current-item");
let equipmentModalItems = document.getElementById("equipment-modal-items");

let selectedEquipmentSlot = null;
let equipmentSlots = document.querySelectorAll("#tab-equipped .item-slot");


function renderItems() {
    stackableItemsList.innerHTML = "";
    let searchText = itemsSearchInput.value.toLowerCase();
    let selectedCategory = itemsCategoryFilter.value;
    let selectedSort = itemsSortSelect.value;
    let visibleItems = [];

    playerInventory.forEach(inventoryItem => {
        let itemData = items.find(item => item.id === inventoryItem.itemId);
        if (itemData === undefined) {
            return;
        }
        let itemNameLower = itemData.name.toLowerCase();
        let matchesSearch = itemNameLower.includes(searchText);
        let matchesCategory = selectedCategory === "all" || itemData.category === selectedCategory;

        if (itemData.stackable === true && matchesSearch && matchesCategory) {
            visibleItems.push(inventoryItem);
        }
    });
  
    if (selectedSort === "quantity-desc") {
        visibleItems.sort( (a, b) => b.quantity - a.quantity);
    }
    if (selectedSort === "quantity-asc") {
        visibleItems.sort( (a, b) => a.quantity - b.quantity);
    }
    if (selectedSort === "name-asc") {
        visibleItems.sort( (a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);
            return itemA.name.localeCompare(itemB.name);
        });
    }
    if (selectedSort === "name-desc") {
        visibleItems.sort( (a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);
            return itemB.name.localeCompare(itemA.name);
        });
    }
    if (selectedSort === "rarity-desc") {
        visibleItems.sort( (a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);

            let rarityA = rarityOrder[itemA.rarity];
            let rarityB = rarityOrder[itemB.rarity];

            return rarityB - rarityA;
        });
    }
    if (selectedSort === "rarity-asc") {
        visibleItems.sort( (a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);

            let rarityA = rarityOrder[itemA.rarity]
            let rarityB = rarityOrder[itemB.rarity]

            return rarityA - rarityB;
        });
    }
    visibleItems.forEach(inventoryItem => {
        let itemData = items.find(item => item.id === inventoryItem.itemId);
            
        let slot = document.createElement("div");
        slot.classList.add("item-slot");
        slot.classList.add("stackable-slot");
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
    });
    itemsTotalCount.textContent = visibleItems.length + " Unique Items";
}

function renderStorage() {
    storageList.innerHTML = "";

    let searchText = storageSearchInput.value.toLowerCase();
    let selectedCategory = storageCategoryFilter.value.toLowerCase();
    let selectedSort = storageSortSelect.value;
    let visibleStorage = [];

    playerInventory.forEach(inventoryItem => {
        let itemData = items.find(item => item.id === inventoryItem.itemId);
        if (itemData === undefined) {
            return;
        }

        let itemNameLower = itemData.name.toLowerCase();
        let matchesSearch = itemNameLower.includes(searchText);
        let matchesCategory =
            selectedCategory === "all" ||
            itemData.category === selectedCategory;

        if (itemData.stackable === false && matchesSearch && matchesCategory) {
            visibleStorage.push(inventoryItem);
        }
    });

    if (selectedSort === "name-asc") {
        visibleStorage.sort((a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);

            return itemA.name.localeCompare(itemB.name);
        });
    }

    if (selectedSort === "name-desc") {
        visibleStorage.sort((a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);

            return itemB.name.localeCompare(itemA.name);
        });
    }

    if (selectedSort === "rarity-desc") {
        visibleStorage.sort((a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);

            let rarityA = rarityOrder[itemA.rarity];
            let rarityB = rarityOrder[itemB.rarity];

            return rarityB - rarityA;
        });
    }

    if (selectedSort === "rarity-asc") {
        visibleStorage.sort((a, b) => {
            let itemA = items.find(item => item.id === a.itemId);
            let itemB = items.find(item => item.id === b.itemId);

            let rarityA = rarityOrder[itemA.rarity];
            let rarityB = rarityOrder[itemB.rarity];

            return rarityA - rarityB;
        });
    }

    visibleStorage.forEach(inventoryItem => {
        let itemData = items.find(item => item.id === inventoryItem.itemId);

        let slot = document.createElement("div");
        slot.classList.add("item-slot");
        slot.classList.add("rarity-" + itemData.rarity);

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.textContent = itemData.name;

        slot.appendChild(itemName);

        storageList.appendChild(slot);
    });

    storageTotalCount.textContent = visibleStorage.length + " Items";
}

equipmentSlots.forEach(slot => {
    slot.addEventListener("click", () => {
        let slotId = slot.id;
        selectedEquipmentSlot = slotId.replace("slot-", "");
        renderEquipmentModal();

        equipmentModal.classList.remove("hidden");
    });
});

equipmentModalClose.addEventListener("click", () => {
    equipmentModal.classList.add("hidden");
});

equipmentModal.addEventListener("click", (event) => {
    if (event.target === equipmentModal) {
        equipmentModal.classList.add("hidden");
    }
});

let equipmentModalEquipped = document.querySelector(".equipment-modal-equipped");

function renderEquipmentModal() {
    equipmentModalItems.innerHTML = "";
    equipmentModalCurrentItem.innerHTML = "";

    let equippedInstanceId = playerEquipment[selectedEquipmentSlot];
    let compatibleItems = [];

    if (equippedInstanceId === null) {
        equipmentModalEquipped.classList.add("hidden");
    } else {
        equipmentModalEquipped.classList.remove("hidden");

        let equippedInventoryItem = playerInventory.find(
            inventoryItem => inventoryItem.instanceId === equippedInstanceId
        );

        let equippedItemData = items.find(
            item => item.id === equippedInventoryItem.itemId
        );

        let slot = document.createElement("div");
        slot.classList.add("item-slot");
        slot.classList.add("rarity-" + equippedItemData.rarity);

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.textContent = equippedItemData.name;

        let itemRarity = document.createElement("span");
        itemRarity.classList.add("item-rarity");
        itemRarity.textContent = equippedItemData.rarity.toUpperCase();

        slot.appendChild(itemName);
        slot.appendChild(itemRarity);

        equipmentModalCurrentItem.appendChild(slot);

        slot.addEventListener("dblclick", unequipItem);
    }

    playerInventory.forEach(inventoryItem => {
        let itemData = items.find(
            item => item.id === inventoryItem.itemId
        );

        if (itemData === undefined) {
            return;
        }

        if (
            itemData.type === selectedEquipmentSlot &&
            inventoryItem.instanceId !== equippedInstanceId
        ) {
            compatibleItems.push(inventoryItem);
        }
    });

    compatibleItems.forEach(inventoryItem => {
        let itemData = items.find(
            item => item.id === inventoryItem.itemId
        );

        let slot = document.createElement("div");
        slot.classList.add("item-slot");
        slot.classList.add("rarity-" + itemData.rarity);

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.textContent = itemData.name;

        let itemRarity = document.createElement("span");
        itemRarity.classList.add("item-rarity");
        itemRarity.textContent = itemData.rarity.toUpperCase();

        slot.appendChild(itemName);
        slot.appendChild(itemRarity);

        equipmentModalItems.appendChild(slot);

        slot.addEventListener("dblclick", () => {
            equipItem(inventoryItem.instanceId);
        });
    });
}

function renderEquipment() {
    equipmentSlots.forEach(slot => {
        let slotId = slot.id;
        let equipmentType = slotId.replace("slot-", "");
        let equippedInstanceId = playerEquipment[equipmentType];

        if (equippedInstanceId === null) {
            let defaultName = equipmentType.charAt(0).toUpperCase() + equipmentType.slice(1);
            slot.textContent = defaultName;
        } else {
            let equippedInventoryItem = playerInventory.find(inventoryItem => inventoryItem.instanceId === equippedInstanceId);
            let equippedItemData = items.find(item => item.id === equippedInventoryItem.itemId);

            slot.textContent = equippedItemData.name;
            slot.classList.add("rarity-" + equippedItemData.rarity);
        }
    });
}

function equipItem(instanceId) {
    playerEquipment[selectedEquipmentSlot] = instanceId;
    renderEquipmentModal();
    renderEquipment()
}

function unequipItem() {
    playerEquipment[selectedEquipmentSlot] = null;
    renderEquipmentModal();
    renderEquipment()
}

renderItems();
renderStorage();

itemsSearchInput.addEventListener("input", renderItems);
storageSearchInput.addEventListener("input", renderStorage);

itemsCategoryFilter.addEventListener("change", renderItems);
storageCategoryFilter.addEventListener("change", renderStorage);

itemsSortSelect.addEventListener("change", renderItems);
storageSortSelect.addEventListener("change", renderStorage);