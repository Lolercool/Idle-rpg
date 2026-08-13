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
    
renderItems();
renderStorage();

itemsSearchInput.addEventListener("input", renderItems);
storageSearchInput.addEventListener("input", renderStorage);

itemsCategoryFilter.addEventListener("change", renderItems);
storageCategoryFilter.addEventListener("change", renderStorage);

itemsSortSelect.addEventListener("change", renderItems);
storageSortSelect.addEventListener("change", renderStorage);