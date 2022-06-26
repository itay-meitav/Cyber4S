import { getFromLocal, IProduct } from "./data";
import { addClickFilterEvent, filterObj, sorts, openBubble } from "./filters";
import { editProduct, addItem, removeButton } from "./admin";

let isAdmin = window.location.pathname.includes("admin");

window.addEventListener("load", () => {
    createSortedList("general", true);
    removeButton();
    sorts();
    openBubble();
});

export class Item {
    data: IProduct;
    parent: HTMLElement;

    constructor(item: IProduct, parent: HTMLElement) {
        this.data = item;
        this.parent = parent;
        this.render();
    }

    render() {
        let laptop: HTMLDivElement = document.createElement("div");
        this.parent.appendChild(laptop);
        laptop.classList.add("laptop");
        laptop.innerHTML =
            `<img class="itemImg" src="${this.data.img}">
        <div class="textContainer">
        <div class="title">${this.data.title}</div>
        <div class="specs">${Object.entries(this.data.specs).map((element) => {
                return `<span>${element.join(": ")}</span>`;
            }).join(" | ")}</div>
            <div class="buttonsContainer">
            ${isAdmin ? `<a class="edit" href="./edit.html?id=${this.data.id}">edit</a>` : ""}
            ${isAdmin ? `<div class="remove" id="${this.data.id}">remove</div>` : ""}
            </div>
        </div>
        <div class="stylishInfo">
        <div class="serial">Serial: ${this.data.id}</div>
        <img class="logoImg" src="${this.data.companyLogo}">
        <div class="price"><b>${this.data.price}${this.data.currency}</b></div>
        </div>`;
    }
}



//render laptops divs by specific sort/filter
export function createSortedList(sortBy: string, isFirst: boolean) {
    const productList = document.getElementById("productList") as HTMLDivElement;
    let sortedLaptops = getFromLocal();
    if (window.location.pathname.includes("edit.html")) {
        editProduct();
        return;
    }
    if (window.location.pathname.includes("add.html")) {
        addItem();
        return;
    }
    if (isFirst) {
        addClickFilterEvent();
    }

    //sort by lowest to highest price
    if (sortBy === "lowPrice") sortedLaptops.sort((a, b) => a.price - b.price);
    //sort by highest to lowest price
    if (sortBy === "highPrice") sortedLaptops.sort((a, b) => b.price - a.price);
    //sort by name
    if (sortBy === "name") {
        sortedLaptops.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "general") {
        sortedLaptops = getFromLocal();
    }

    //filters part
    if (filterObj.brand.length) {
        sortedLaptops = sortedLaptops.filter((laptop) =>
            filterObj.brand.includes(laptop.specs.brand)
        );
    }
    if (filterObj.ram.length) {
        sortedLaptops = sortedLaptops.filter((laptop) =>
            filterObj.ram.includes(laptop.specs.ram)
        );
    }
    if (filterObj.memory.length) {
        sortedLaptops = sortedLaptops.filter((laptop) =>
            filterObj.memory.includes(laptop.specs.memory)
        );
    }
    if (filterObj.processor.length) {
        sortedLaptops = sortedLaptops.filter((laptop) =>
            filterObj.processor.includes(laptop.specs.processor)
        );
    }
    if (filterObj.resolution.length) {
        sortedLaptops = sortedLaptops.filter((laptop) =>
            filterObj.resolution.includes(laptop.specs.resolution)
        );
    }
    if (filterObj.os.length) {
        sortedLaptops = sortedLaptops.filter((laptop) =>
            filterObj.os.includes(laptop.specs.os)
        );
    }

    //this takes the price string, converts it to number, and saves min/max points and filters
    if (filterObj.price.length) {
        interface MinMax {
            min: number;
            max: number;
        }
        let minMaxArr: MinMax[] = [];
        for (const price of filterObj.price) {
            if (price.includes("-")) {
                let min = Number(price.split("-")[0].replace(/[^0-9]/g, ""));
                let max = Number(price.split("-")[1].replace(/[^0-9]/g, ""));
                minMaxArr.push({ min, max });
            } else {
                let min = Number(price.replace(/[^0-9]/g, ""));
                minMaxArr.push({ min, max: 1000000 });
            }
        }
        sortedLaptops = sortedLaptops.filter((a) => {
            return minMaxArr.some((minMax) => {
                return a.price >= minMax.min && a.price <= minMax.max;
            });
        });
    }

    const laptopDivs = document.querySelectorAll(".laptop");
    laptopDivs.forEach((element: any) => {
        element.remove();
    });


    sortedLaptops.forEach((element) => {
        new Item(element, productList);
    });
}