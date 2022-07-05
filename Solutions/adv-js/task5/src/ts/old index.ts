import "../css/index.scss";
import { ITree, tree } from "./tree";

export function createElement(str: string) {
	const temp = document.createElement("template");
	temp.innerHTML = str;
	return temp.content.firstElementChild as HTMLElement;
}

export function createHtml(tree: ITree) {
	// let html = `<li class="item" tabindex="2" onclick="if(event.target == this)this.classList.toggle('visible')">${tree.name}`;
	let element = createElement(`<li class="item" >${tree.name}</li>`);

	let details = createElement(
		`<span class="details">${tree.sub.length} children,  size ${tree.size} </span>`
	);

	element.appendChild(details);

	if (tree.sub.length) {
		let insideEl: HTMLElement = createElement('<ul class="list"></ul>');
		tree.sub.forEach((sub) => {
			insideEl.appendChild(createHtml(sub));
		});
		element.appendChild(insideEl);
	}

	element.addEventListener("click", (e: Event) => {
		if (e.currentTarget == e.target) {
			let target = e.target as HTMLElement;
			console.log(e.target);
			Array.from(document.getElementsByClassName("show-d")).forEach((el) => {
				el.classList.remove("show-d");
			});
			target.classList.toggle("show-d");
			if (tree.sub.length) {
				target.classList.toggle("visible");
			}
		}
	});

	return element;
}

let mainEl: HTMLElement = createElement('<ul class="list"></ul>');
mainEl.appendChild(createHtml(tree));
document.getElementById("container")!.appendChild(mainEl);
