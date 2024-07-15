
const myGetRequest = new Request("http://localhost:3000/films");

const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const filmInfo = document.getElementById("film-info");
const showtime = document.getElementById("showtime");
const ticketNum = document.getElementById("ticket-num");
const buyTicket = document.getElementById("buy-ticket");
const poster = document.getElementById("poster");
const films = document.getElementById("films");

let remainingTickets = 0; // Initialize remaining tickets

function updateMovieDetails(movie) {
  title.innerHTML = movie.title;
  runtime.innerHTML = movie.runtime;
  filmInfo.innerHTML = movie.description;
  showtime.innerHTML = movie.showtime;
  poster.src = movie.poster;

  remainingTickets = movie.capacity - movie.tickets_sold;
  ticketNum.innerHTML = remainingTickets;
  buyTicket.innerHTML = remainingTickets > 0 ? "Buy ticket" : "Sold out!";
}

function handleTicketPurchase() {
  if (remainingTickets > 0) {
    remainingTickets--;
    ticketNum.innerHTML = remainingTickets;
  } else {
    buyTicket.innerHTML = "Sold out!";
  }
}

window.onload = () => {
  fetch(myGetRequest)
    .then((response) => response.json())
    .then((data) => {
      const firstMovie = data[0];
      updateMovieDetails(firstMovie);

      buyTicket.addEventListener("click", handleTicketPurchase);

      films.innerHTML = "";
      data.forEach((movie) => {
        const li = document.createElement("li");
        li.innerHTML = movie.title;
        films.appendChild(li);

        li.addEventListener("click", () => {
          updateMovieDetails(movie);
        });
      });
    });
};
