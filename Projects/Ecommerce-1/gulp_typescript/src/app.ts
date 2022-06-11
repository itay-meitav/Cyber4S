import { laptops } from "./data";

const main = document.getElementById('main') as HTMLBodyElement;
function createDiv (sortBy: string) {
    let sortedLaptops = [...laptops];

    if (sortBy === 'lowPrice') sortedLaptops.sort((a, b) => (a.price) - (b.price));
    // if (sortBy === 'dellBrand') sortedLaptops = sortedLaptops.filter(laptop => laptop.specs.brand === 'Dell');
    if (sortBy === 'highPrice') sortedLaptops.sort((a, b) => (b.price) - (a.price));
    if (sortBy === 'name') sortedLaptops.sort((a, b) => a.title.localeCompare(b.title));

   const laptopDivs = document.querySelectorAll('.laptop');
   laptopDivs.forEach((element: any) => {
        element.remove();
    });

    for (let i = 0; i < sortedLaptops.length; i++) {
       let laptop:HTMLDivElement = document.createElement('div');
       main.appendChild(laptop);
       laptop.classList.add('laptop');
       laptop.innerHTML =`
       <img class="itemImg" src="${sortedLaptops[i].img}">
       <img class="logoImg" src="${sortedLaptops[i].companyLogo}">
       <div class="price"><b>${sortedLaptops[i].price}${sortedLaptops[i].currency}</b></div>
       <div class="title">${sortedLaptops[i].title}</div>
       <div class="serial">Serial: ${sortedLaptops[i].id}</div>
       <div class="specs">${Object.entries(sortedLaptops[i].specs).map((element) => {
       return `<span>${element.join(': ')}</span>`
       }).join(' | ')}</div>`; 

    }
}

createDiv ('general');

const sortByPriceLow = document.getElementById('sortbypricelow') as HTMLDivElement;
sortByPriceLow.addEventListener('click', () => {
    createDiv('lowPrice');
})

const sortByPriceHigh = document.getElementById('sortbypricehigh') as HTMLDivElement;
sortByPriceHigh.addEventListener('click', () => {
    createDiv('highPrice');
})

const sortByName = document.getElementById('sortbyname') as HTMLDivElement;
sortByName.addEventListener('click', () => {
    createDiv('name');
})

const sortByGeneral = document.getElementById('sortbygeneral') as HTMLDivElement;
sortByGeneral.addEventListener('click', () => {
    createDiv('general');
})

