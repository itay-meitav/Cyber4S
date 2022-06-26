import { saveOnLocal, laptops, getItemByID, IProduct, editLocalStorage, addProduct, removeItem } from "./data";


const resetButton = document.getElementById("resetButton");
resetButton?.addEventListener("click", () => resetList());

//resets the list
function resetList() {
    localStorage.clear();
    saveOnLocal(laptops);
    location.reload();
}


//gets the product's id from window location
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



//edits an item in the list
export function editProduct() {
    let product: IProduct = getItemByID(getKeyFromWindowLocation());
    let { price, image, currency, title, brand, type, model, ram, memory, processor, resolution, os, logo } = inputs()
    price.value = String(product.price);
    title.value = product.title;
    currency.value = product.currency;
    brand.value = product.specs.brand;
    type.value = product.specs.type;
    model.value = product.specs.model;
    ram.value = product.specs.ram;
    memory.value = product.specs.memory;
    processor.value = product.specs.processor;
    resolution.value = product.specs.resolution;
    os.value = product.specs.os;
    logo.value = product.companyLogo;
    image.value = product.img;

    const formEl = document.querySelector('#form') as HTMLElement;
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
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
        window.location.href = './admin.html';
    })
}


//adds an item to the list 
export function addItem() {
    let { price, image, currency, title, brand, type, model, ram, memory, processor, resolution, os, logo } = inputs();
    const formEl = document.querySelector('#form') as HTMLElement;
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        let newProduct: IProduct = {
            price: Number(price.value),
            img: image.value,
            currency: currency.value,
            id: makeId(10),
            title: title.value,
            specs: {
                brand: brand.value,
                type: type.value,
                model: model.value,
                ram: ram.value,
                memory: memory.value,
                processor: processor.value,
                resolution: resolution.value,
                os: os.value,
            },
            companyLogo: logo.value,
        }
        addProduct(newProduct);
        window.location.href = './admin.html';
    });
}



function inputs() {
    let price = (document.getElementById('Price') as HTMLInputElement);
    let title = (document.getElementById('Title') as HTMLInputElement);
    let currency = (document.getElementById('Currency') as HTMLInputElement);
    let brand = (document.getElementById('Brand') as HTMLInputElement);
    let type = (document.getElementById('Type') as HTMLInputElement);
    let model = (document.getElementById('Model') as HTMLInputElement);
    let ram = (document.getElementById('Ram') as HTMLInputElement);
    let memory = (document.getElementById('Memory') as HTMLInputElement);
    let processor = (document.getElementById('Processor') as HTMLInputElement);
    let resolution = (document.getElementById('Resolution') as HTMLInputElement);
    let os = (document.getElementById('Os') as HTMLInputElement);
    let logo = (document.getElementById('CompanyLogo') as HTMLInputElement);
    let image = (document.getElementById('Image') as HTMLInputElement);
    return { price, image, currency, title, brand, type, model, ram, memory, processor, resolution, os, logo };
}

//renders a random id for adding an item
function makeId(length: number) {
    var id = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    while (!getItemByID(id)) {
        id = makeId(10);
    }

    return id;
}


export function removeButton() {
    const removeButtons = Array.from(document.getElementsByClassName("remove"));
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", () => {
            removeItem(removeButtons[i].id);
            removeButtons[i].parentElement?.parentElement?.parentElement?.remove();
        });
    }
}
