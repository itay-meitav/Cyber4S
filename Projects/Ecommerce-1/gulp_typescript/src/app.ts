import { laptops, saveOnLocal, getFromLocal, IProduct, removeItem, editLocalStorage, getItemByID } from "./data";

const productList = document.getElementById("productList") as HTMLDivElement;
let isAdmin = window.location.pathname.includes("admin");

//laptops specs
type TSpecs =
    | "price"
    | "brand"
    | "ram"
    | "memory"
    | "processor"
    | "resolution"
    | "os";

interface IFilterObj {
    price: string[];
    brand: string[];
    model: string[];
    ram: string[];
    memory: string[];
    processor: string[];
    resolution: string[];
    os: string[];
}
let filterObj: IFilterObj = {
    price: [],
    brand: [],
    model: [],
    ram: [],
    memory: [],
    processor: [],
    resolution: [],
    os: [],
};

//adds functionality to what happens if filter button is clicked
function addClickFilterEvent() {
    let filterBtns = Array.from(document.getElementsByClassName("sortedItem"));
    let currentFiltersTitle = document.getElementById(
        "filterList"
    ) as HTMLDivElement;

    for (let i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener("click", () => {
            let filter: string = filterBtns[i].innerHTML;
            let currentFilterButtons = document.getElementsByClassName("filterItem");

            if (currentFilterButtons.length > 0) {
                for (let i = 0; i < currentFilterButtons.length; i++) {
                    if (currentFilterButtons[i].innerHTML === filter) {
                        return null;
                    }
                }
            }
            let currentFilter = document.createElement("div");
            currentFiltersTitle.appendChild(currentFilter);
            currentFilter.classList.add("filterItem");
            currentFilter.innerHTML = filter;

            //spec category identification by attribute "spec"
            let filterSpec: TSpecs = filterBtns[i].getAttribute("spec") as TSpecs;
            currentFilter.setAttribute("spec", `${filterSpec}`);

            if (!filterObj[filterSpec].includes(filter)) {
                filterObj[filterSpec].push(filter);
            } else {
                return null;
            }
            createSortedList(filterSpec, false);

            //adds cancelation functionality to filter buttons
            currentFilter.addEventListener("click", (e) => {
                let currentElement = e.target as HTMLDivElement;
                let currentFilterButtonSpec = currentElement.getAttribute(
                    "spec"
                ) as TSpecs;
                if (
                    filterObj[currentFilterButtonSpec].includes(currentElement.innerHTML)
                ) {
                    filterObj[currentFilterButtonSpec] = filterObj[
                        currentFilterButtonSpec
                    ].filter((f) => f !== currentElement.innerHTML);
                    currentElement.remove();
                    createSortedList(currentFilterButtonSpec, false);
                }
            });
        });
    }
}


//render laptops divs by specific sort/filter
function createSortedList(sortBy: string, isFirst: boolean) {
    let sortedLaptops = getFromLocal();
    if (window.location.pathname.includes("edit.html")) {
        editProduct();
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

    //actually render all the divs
    for (let i = 0; i < sortedLaptops.length; i++) {
        let laptop: HTMLDivElement = document.createElement("div");
        productList.appendChild(laptop);
        laptop.classList.add("laptop");
        laptop.innerHTML = `
       <img class="itemImg" src="${sortedLaptops[i].img}">
       <img class="logoImg" src="${sortedLaptops[i].companyLogo}">
       <div class="price"><b>${sortedLaptops[i].price}${sortedLaptops[i].currency
            }</b></div>
       ${isAdmin
                ? `<div class="edit"><a href="./edit.html?id=${sortedLaptops[i].id}">edit</a>
       </div>`
                : ""
            }
       ${isAdmin
                ? `<div class="remove" id="${sortedLaptops[i].id}">remove</div>`
                : ""
            }
       <div class="title">${sortedLaptops[i].title}</div>
       <div class="serial">Serial: ${sortedLaptops[i].id}</div>
       <div class="specs">${Object.entries(sortedLaptops[i].specs)
                .map((element) => {
                    return `<span>${element.join(": ")}</span>`;
                })
                .join(" | ")}</div>`;
    }
}

window.addEventListener("load", () => {
    createSortedList("general", true);
    addEventListeneners();
});

function addEventListeneners() {
    // Add event listener for delete button
    const removeButtons = Array.from(document.getElementsByClassName("remove"));
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", () => {
            removeItem(removeButtons[i].id);
            removeButtons[i].parentElement?.remove();
        });
    }


    //these bunch of blocks adds click events to sorts
    const sortByPriceLow = document.getElementById(
        "sortbypricelow"
    ) as HTMLDivElement;
    if (sortByPriceLow)
        sortByPriceLow.addEventListener("click", () => {
            createSortedList("lowPrice", false);
        });

    const sortByPriceHigh = document.getElementById(
        "sortbypricehigh"
    ) as HTMLDivElement;
    if (sortByPriceHigh)
        sortByPriceHigh.addEventListener("click", () => {
            createSortedList("highPrice", false);
        });

    const sortByName = document.getElementById("sortbyname") as HTMLDivElement;
    if (sortByName)
        sortByName.addEventListener("click", () => {
            createSortedList("name", false);
        });

    //sort by general
    const sortByGeneral = document.getElementById(
        "sortbygeneral"
    ) as HTMLDivElement;
    if (sortByGeneral)
        sortByGeneral.addEventListener("click", () => {
            createSortedList("general", false);
        });

    //opens the filter's additional bubbles
    const openBubble = document.getElementsByClassName(
        "openBubble"
    ) as HTMLCollectionOf<HTMLDivElement>;
    let bubble = Array.from(document.getElementsByClassName("bubble")) as any;
    for (let i = 0; i < openBubble.length; i++) {
        openBubble[i].addEventListener("click", () => {
            if (bubble[i].getAttribute("style") === "display:block;") {
                bubble[i].setAttribute("style", "display:none;");
            } else {
                bubble.forEach((e: any) => {
                    e.setAttribute("style", "display:none;");
                });
                bubble[i].setAttribute("style", "display:block;");
            }
        });
    }
}


//reset list (for admin only)
const resetButton = document.getElementById("resetButton");
resetButton?.addEventListener("click", () => resetList());


function resetList() {
    localStorage.clear();
    saveOnLocal(laptops);
    location.reload();
}

function getKeyFromWindowLocation(): string {
    let id = "";
    window.location.search
        .replace("?", "")
        .split("&")
        .forEach((query) => {
            let key = query.split("=")[0];
            if (key == "id") id = query.split("=")[1];
        });
    return id as string;
}

function editProduct() {
    let product: IProduct = getItemByID(getKeyFromWindowLocation());
    if (!product)
        return
    const price = <HTMLInputElement>document.getElementById("Price");
    price.value = String(product.price);
    const title = <HTMLInputElement>document.getElementById("Title");
    title.value = product.title;
    const currency = <HTMLInputElement>document.getElementById("Currency");
    currency.value =
        product.currency;
    const brand = <HTMLInputElement>document.getElementById("Brand");
    brand.value =
        product.specs.brand;
    const type = <HTMLInputElement>document.getElementById("Type");
    type.value =
        product.specs.type;
    const model = <HTMLInputElement>document.getElementById("Model");
    model.value =
        product.specs.model;
    const ram = <HTMLInputElement>document.getElementById("Ram");
    ram.value = product.specs.ram;
    const memory = <HTMLInputElement>document.getElementById("Memory");
    memory.value =
        product.specs.memory;
    const processor = <HTMLInputElement>document.getElementById("Processor");
    processor.value =
        product.specs.processor;
    const resolution = <HTMLInputElement>document.getElementById("Resolution");
    resolution.value =
        product.specs.resolution;
    const os = <HTMLInputElement>document.getElementById("Os");
    os.value = product.specs.os;
    const logo = <HTMLInputElement>document.getElementById("CompanyLogo");
    logo.value =
        product.companyLogo;
    const image = <HTMLInputElement>document.getElementById("Image");
    image.value = product.img;

    const sumbit = document.getElementById('sumbit');
    sumbit?.addEventListener('click', () => {
        console.log(price);
        product.price = Number(price.value);
        product.title = title.value;
        product.currency = currency.value;
        product.specs.brand = brand.value;
        product.specs.type = type.value;
        product.specs.model = model.value;
        product.specs.ram = ram.value;
        product.specs.memory = memory.value;
        product.specs.processor = processor.value;
        product.specs.resolution = resolution.value;
        product.specs.os = os.value;
        product.companyLogo = logo.value;
        product.img = image.value;
        editLocalStorage(product);
    })
}
