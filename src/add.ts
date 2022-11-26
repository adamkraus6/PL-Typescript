$(async () => {
	let actors_response = await fetch("http://localhost:3000/list/actor");
	let actors_data = await actors_response.json()
	let actors = document.getElementById("actors")
	actors_data.forEach(actor => {
		let opt = document.createElement("option")
		opt.value = actor.name
		opt.text = actor.name
		actors.appendChild(opt)
	});

	let movies_response = await fetch("http://localhost:3000/list/movie");
	let movies_data = await movies_response.json()
	let movies = document.getElementById("movies")
	movies_data.forEach(movie => {
		let opt = document.createElement("option")
		opt.value = movie.title
		opt.text = movie.title
		movies.appendChild(opt)
	});
})