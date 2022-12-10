var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Author: Hunter Hufstutler
$(function () { return __awaiter(_this, void 0, void 0, function () {
    var movies_response, movies_data, filter_response, filter_data, actors_response, actors_data, roles_response, roles_data, ratings_response, ratings_data, actorSelect, filters, genreSelect, movies, filteredMovies, genres;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3000/list/movie")];
            case 1:
                movies_response = _a.sent();
                return [4 /*yield*/, movies_response.json()];
            case 2:
                movies_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/filter")];
            case 3:
                filter_response = _a.sent();
                return [4 /*yield*/, filter_response.json()];
            case 4:
                filter_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/actor")];
            case 5:
                actors_response = _a.sent();
                return [4 /*yield*/, actors_response.json()];
            case 6:
                actors_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/role")];
            case 7:
                roles_response = _a.sent();
                return [4 /*yield*/, roles_response.json()];
            case 8:
                roles_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/rating")];
            case 9:
                ratings_response = _a.sent();
                return [4 /*yield*/, ratings_response.json()];
            case 10:
                ratings_data = _a.sent();
                actorSelect = document.getElementById("actors");
                filters = document.getElementById("filter-table");
                genreSelect = document.getElementById("genres");
                movies = document.getElementById("filtered-movie-table");
                filteredMovies = [];
                genres = [];
                movies_data.forEach(function (movie) {
                    if (!genres.includes(movie.genre))
                        genres.push(movie.genre);
                });
                genres.forEach(function (genre) {
                    var opt = document.createElement("option");
                    opt.value = opt.text = genre;
                    genreSelect.appendChild(opt);
                });
                actors_data.forEach(function (actor) {
                    var opt = document.createElement("option");
                    opt.value = opt.text = actor.name;
                    actorSelect.appendChild(opt);
                });
                filter_data.forEach(function (filter) {
                    var tr = document.createElement("tr");
                    var id = document.createElement("td");
                    id.textContent = filter.id;
                    tr.appendChild(id);
                    var localFiltered = [];
                    var filterAction = document.createElement("td");
                    switch (filter.filterType) {
                        case "genre":
                            filterAction.textContent = "Genre is ".concat(filter.genre);
                            localFiltered = movies_data.filter(function (movie) { return movie.genre == filter.genre; });
                            break;
                        case "title":
                            filterAction.textContent = "Title contains \"".concat(filter.title, "\"");
                            localFiltered = movies_data.filter(function (movie) {
                                return movie.title.includes(filter.title);
                            });
                            break;
                        case "released":
                            var dateFrom_1 = new Date(filter.dateFrom);
                            var dateTo_1 = new Date(filter.dateTo);
                            filterAction.textContent = "Release date between ".concat(dateFrom_1.toDateString(), " and ").concat(dateTo_1.toDateString());
                            localFiltered = movies_data.filter(function (movie) {
                                return dateFrom_1 < new Date(movie.released) &&
                                    new Date(movie.released) < dateTo_1;
                            });
                            break;
                        case "actor":
                            filterAction.textContent = "Starring ".concat(filter.actor);
                            localFiltered = roles_data
                                .filter(function (role) { return role.actor.name == filter.actor; })
                                .map(function (role) { return role.movie; });
                            break;
                        case "rating":
                            filterAction.textContent = "Minimum rating of ".concat(filter.rating);
                            localFiltered = ratings_data
                                .filter(function (rating) { return rating.rating >= filter.rating; })
                                .map(function (rating) { return rating.movie; });
                            break;
                        default:
                            break;
                    }
                    tr.appendChild(filterAction);
                    localFiltered.forEach(function (filteredMovie) {
                        if (!filteredMovies.includes(filteredMovie))
                            filteredMovies.push(filteredMovie);
                    });
                    filters.appendChild(tr);
                });
                filteredMovies.forEach(function (movie) {
                    var tr = document.createElement("tr");
                    var title = document.createElement("td");
                    title.textContent = movie.title;
                    tr.appendChild(title);
                    var released = document.createElement("td");
                    var date = new Date(movie.released);
                    released.textContent = date.toDateString();
                    tr.appendChild(released);
                    var genre = document.createElement("td");
                    genre.textContent = movie.genre;
                    tr.appendChild(genre);
                    movies.appendChild(tr);
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=watchlist.js.map