import { tree, ITree } from "./tree";
import "../css/index.scss";

export function createElement(str: string) {
	const temp = document.createElement("template");
	temp.innerHTML = str;
	return temp.content.firstElementChild as HTMLElement;
}

function createHtml(tree: ITree) {
	// Creates new li element.
	const liElem = createElement(`<li class="item">${tree.name}</li>`);

	let sizeAndChildNum = getChildrenAndSize(tree);

	let details = createElement(
		`<span class="details">${sizeAndChildNum.children} sub folders,  size ${sizeAndChildNum.size} </span>`
	);
	liElem.appendChild(details);
	if (tree.sub.length) {
		let ulElem = createElement(`<ul class="list"></ul>`);
		tree.sub.forEach((child) => {
			ulElem.appendChild(createHtml(child));
		});
		liElem.appendChild(ulElem);
	} else {
		liElem.classList.add("empty");
	}

	liElem.addEventListener("click", (e) => {
		let target = e.target as HTMLElement;
		if (e.target == e.currentTarget) {
			target.classList.toggle("visible");

			Array.from(document.getElementsByClassName("show-d ")).forEach((el) =>
				el.classList.remove("show-d")
			);
			target.classList.add("show-d");
		}
	});
	return liElem;
}

function getChildrenAndSize(tree: ITree) {
	let size = tree.size;
	let children = tree.sub.length;
	tree.sub.forEach((child) => {
		let res = getChildrenAndSize(child);
		size += res.size;
		children += res.children;
	});
	return { size, children };
}

let mainUl = createElement(`<ul class="list"></ul>`);
mainUl.appendChild(createHtml(tree));

document.getElementById("container")!.appendChild(mainUl);
