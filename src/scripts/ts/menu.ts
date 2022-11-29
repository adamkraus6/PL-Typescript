$(async () => {
	let menu = document.getElementById("menu");
	let ul = document.createElement("ul");

	let links = [
		{
			to: "add",
			text: "Add",
		},
		{
			to: "list",
			text: "List",
		},
		{
			to: "watchlist",
			text: "Watchlist",
		},
		{
			to: "/",
			text: "Home",
			style: "float:right;",
		},
	];

	links.forEach((link) => {
		let li = document.createElement("li");
		let a = document.createElement("a");
		a.href = link.to;
		a.textContent = link.text;
		if (link.style) li.setAttribute("style", link.style);
		li.appendChild(a);
		ul.appendChild(li);
	});

	menu.appendChild(ul);
});
