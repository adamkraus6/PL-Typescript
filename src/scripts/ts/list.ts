$(async () => {
	let actors_response = await fetch("http://localhost:3000/list/actor");
	let actors_data = await actors_response.json();
	let actors = document.getElementById("actor_table");
	actors_data.forEach((actor) => {
		let tr = document.createElement("tr");

		let name = document.createElement("td");
		name.textContent = actor.name;
		tr.appendChild(name);

		actors.appendChild(tr);
	});

	let movies_response = await fetch("http://localhost:3000/list/movie");
	let movies_data = await movies_response.json();
	let movies = document.getElementById("movie_table");
	movies_data.forEach((movie) => {
		let tr = document.createElement("tr");

		let title = document.createElement("td");
		title.textContent = movie.title;
		tr.appendChild(title);

		let released = document.createElement("td");
		let date = new Date(movie.released);
		released.textContent = date.toDateString();
		tr.appendChild(released);

		let genre = document.createElement("td");
		genre.textContent = capitalize(movie.genre);
		tr.appendChild(genre);

		movies.appendChild(tr);
	});

	let roles_response = await fetch("http://localhost:3000/list/role");
	let roles_data = await roles_response.json();
	let roles = document.getElementById("role_table");
	roles_data.forEach((role) => {
		let tr = document.createElement("tr");

		let movie = document.createElement("td");
		movie.textContent = role.movie.title;
		tr.appendChild(movie);

		let actor = document.createElement("td");
		actor.textContent = role.actor.name;
		tr.appendChild(actor);

		roles.appendChild(tr);
	});

	let ratings_response = await fetch("http://localhost:3000/list/rating");
	let ratings_data = await ratings_response.json();
	let ratings = document.getElementById("rating_table");
	ratings_data.forEach((rating) => {
		let tr = document.createElement("tr");

		let movie = document.createElement("td");
		movie.textContent = rating.movie.title;
		tr.appendChild(movie);

		let rating_td = document.createElement("td");
		rating_td.textContent = rating.rating;
		tr.appendChild(rating_td);

		ratings.appendChild(tr);
	});
});

let capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
