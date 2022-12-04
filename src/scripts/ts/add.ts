$(async () => {
	let actors_response = await fetch("http://localhost:3000/list/actor");
	let actors_data = await actors_response.json();
	let movies_response = await fetch("http://localhost:3000/list/movie");
	let movies_data = await movies_response.json();

	let actors = document.getElementById("actors");
	let movies = document.getElementById("movies");
	let movies2 = document.getElementById("movies2");

	actors_data.forEach((actor) => {
		let opt = document.createElement("option");
		opt.value = actor.name;
		opt.text = actor.name;
		actors.appendChild(opt);
	});

	movies_data.forEach((movie) => {
		let opt = document.createElement("option");
		let opt2 = document.createElement("option");
		opt2.value = opt.value = movie.title;
		opt2.text = opt.text = movie.title;
		movies.appendChild(opt);
		movies2.appendChild(opt2);
	});
});
