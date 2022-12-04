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
$(function () { return __awaiter(_this, void 0, void 0, function () {
    var actors_response, actors_data, movies_response, movies_data, roles_response, roles_data, ratings_response, ratings_data, actors, movies, ratings, roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3000/list/actor")];
            case 1:
                actors_response = _a.sent();
                return [4 /*yield*/, actors_response.json()];
            case 2:
                actors_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/movie")];
            case 3:
                movies_response = _a.sent();
                return [4 /*yield*/, movies_response.json()];
            case 4:
                movies_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/role")];
            case 5:
                roles_response = _a.sent();
                return [4 /*yield*/, roles_response.json()];
            case 6:
                roles_data = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:3000/list/rating")];
            case 7:
                ratings_response = _a.sent();
                return [4 /*yield*/, ratings_response.json()];
            case 8:
                ratings_data = _a.sent();
                actors = document.getElementById("actor-table");
                movies = document.getElementById("movie-table");
                ratings = document.getElementById("rating-table");
                roles = document.getElementById("role-table");
                actors_data.forEach(function (actor) {
                    var tr = document.createElement("tr");
                    var name = document.createElement("td");
                    name.textContent = actor.name;
                    tr.appendChild(name);
                    actors.appendChild(tr);
                });
                movies_data.forEach(function (movie) {
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
                roles_data.forEach(function (role) {
                    var tr = document.createElement("tr");
                    var movie = document.createElement("td");
                    movie.textContent = role.movie.title;
                    tr.appendChild(movie);
                    var actor = document.createElement("td");
                    actor.textContent = role.actor.name;
                    tr.appendChild(actor);
                    roles.appendChild(tr);
                });
                ratings_data.forEach(function (rating) {
                    var tr = document.createElement("tr");
                    var movie = document.createElement("td");
                    movie.textContent = rating.movie.title;
                    tr.appendChild(movie);
                    var rating_td = document.createElement("td");
                    rating_td.textContent = rating.rating;
                    tr.appendChild(rating_td);
                    ratings.appendChild(tr);
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=list.js.map