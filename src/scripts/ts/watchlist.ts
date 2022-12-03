$(async () => {
	let movies_response = await fetch("http://localhost:3000/list/movie");
	let movies_data = await movies_response.json();
	let movies = document.getElementById("filtered-movie-table");

	let genres = [];

	movies_data.forEach((movie) => {
		if (!genres.includes(movie.genre)) genres.push(movie.genre);
	});

	let genreSelect = document.getElementById("genres");
	genres.forEach((genre) => {
		let opt = document.createElement("option");
		opt.value = opt.text = genre;
		genreSelect.appendChild(opt);
	});

	let filter_response = await fetch("http://localhost:3000/list/filter");
	let filter_data = await filter_response.json();
	let filters = document.getElementById("filter-table");

	let filteredMovies = [];

	filter_data.forEach((filter) => {
		let tr = document.createElement("tr");

		let id = document.createElement("td");
		id.textContent = filter.id;
		tr.appendChild(id);

		let localFiltered = [];

		let filterAction = document.createElement("td");
		switch (filter.filterType) {
			case "genre":
				filterAction.textContent = `Genre is ${filter.genre}`;
				localFiltered = movies_data.filter(
					(movie) => movie.genre == filter.genre
				);
				break;
			case "title":
				filterAction.textContent = `Title contains "${filter.title}"`;
				localFiltered = movies_data.filter((movie) =>
					movie.title.includes(filter.title)
				);
				break;
			case "released":
				let dateFrom = new Date(filter.dateFrom);
				let dateTo = new Date(filter.dateTo);
				filterAction.textContent = `Release date between ${dateFrom.toDateString()} and ${dateTo.toDateString()}`;
				localFiltered = movies_data.filter(
					(movie) =>
						dateFrom < new Date(movie.released) &&
						new Date(movie.released) < dateTo
				);
				break;
			default:
				break;
		}
		tr.appendChild(filterAction);

		localFiltered.forEach((filteredMovie) => {
			if (!filteredMovies.includes(filteredMovie))
				filteredMovies.push(filteredMovie);
		});

		filters.appendChild(tr);
	});

	filteredMovies.forEach((movie) => {
		let tr = document.createElement("tr");

		let title = document.createElement("td");
		title.textContent = movie.title;
		tr.appendChild(title);

		let released = document.createElement("td");
		let date = new Date(movie.released);
		released.textContent = date.toDateString();
		tr.appendChild(released);

		let genre = document.createElement("td");
		genre.textContent = movie.genre;
		tr.appendChild(genre);

		movies.appendChild(tr);
	});
});
