$(async () => {
  let menu = document.getElementById("menu");
  let ul = document.createElement("ul");


  let links = [
    {
      "to": "/",
      "text": "Home"
    },
    {
      "to": "add",
      "text": "Add"
    },
    {
      "to": "list",
      "text": "List"
    },
    {
      "to": "watchlist",
      "text": "Watchlist"
    }
  ]

  links.forEach((link) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = link.to;
    a.textContent = link.text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  menu.appendChild(ul);
});
