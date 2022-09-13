import { createSortedList } from "./app";


//laptops specs
export type TSpecs =
    | "price"
    | "brand"
    | "ram"
    | "memory"
    | "processor"
    | "resolution"
    | "os";

export interface IFilterObj {
    price: string[];
    brand: string[];
    model: string[];
    ram: string[];
    memory: string[];
    processor: string[];
    resolution: string[];
    os: string[];
}
export let filterObj: IFilterObj = {
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
export function addClickFilterEvent() {
    let filterBtns = Array.from(document.getElementsByClassName("sortedItem"));
    let currentFiltersTitle = document.querySelector(
        ".filtersContainer"
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



//these bunch of blocks adds click events to sorts
export function sorts() {
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
}



//opens the filter's additional bubbles
export function openBubble() {
    const openBubble = document.getElementsByClassName(
        "openBubble"
    ) as HTMLCollectionOf<HTMLDivElement>;
    let bubble = Array.from(document.getElementsByClassName("bubble")) as any;
    let background = document.getElementsByClassName('filters') as any;
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
