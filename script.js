document.addEventListener('DOMContentLoaded', () => {
  const movieDetails = document.getElementById('movie-details');
  const filmsList = document.getElementById('films');
  const buyTicketButton = document.getElementById('buy-ticket');
  let currentMovie;

  // Fetch and display first movie's details
  fetch('http://localhost:3000/films/1')
    .then(response => response.json())
    .then(data => {
      currentMovie = data;
      displayMovieDetails(data);
    })
    .catch(error => console.error('Error fetching movie details:', error));

  // Fetch and display list of all movies
  fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => {
      data.forEach(film => {
        const listItem = document.createElement('li');
        listItem.className = 'film item';
        listItem.textContent = film.title;
        listItem.addEventListener('click', () => {
          currentMovie = film;
          displayMovieDetails(film);
        });
        filmsList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching films:', error));

  // Display movie details
  function displayMovieDetails(movie) {
    document.getElementById('poster').src = movie.poster;
    document.getElementById('title').textContent = movie.title;
    document.getElementById('runtime').textContent = `Runtime: ${movie.runtime} minutes`;
    document.getElementById('showtime').textContent = `Showtime: ${movie.showtime}`;
    document.getElementById('available-tickets').textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
  }

  // Ticket purchase
  buyTicketButton.addEventListener('click', () => {
    const availableTicketsElement = document.getElementById('available-tickets');
    let availableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);

    if (availableTickets > 0) {
      availableTickets -= 1;
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    } else {
      alert('Sold out!');
    }
  });
});
