const url = "https://backend-weld-pi.vercel.app/films"

const title = document.querySelector("#title")
const runtime = document.querySelector('#runtime')
const filmInfo = document.querySelector('#filmInfo')
const showtime = document.querySelector('#showtime')
const ticketNum = document.querySelector('#ticketNum')
const buyTicket = document.querySelector('#buyTicket')
const poster = document.querySelector('#poster')
const films = document.querySelector('#films')
const subtitle = document.querySelector('#subtitle')
const showing = document.querySelector('#showing')
const body = document.querySelector('#body')[0]

fetch(url)
.then((response) => response.json())
.then((data) => {
    const movieOne = data[0];
    let remTickets = movieOne.capacity - movieOne.tickets_sold;

    title.innerHTML = `${movieOne.title}`;
    filmInfo.innerHTML = `${movieOne.runtime}`
    showtime.innerHTML = `${movieOne.showtime}`
    ticketNum.innerHTML = `${movieOne.ticketNum}`
    buyTicket.innerHTML = "Buy tickets";
    poster.src = `${movieOne.poster}`

    buyTicket.addEventListener("click", () => {
        if (remTickets > 0) {
            remTickets--;
            ticketNum.innerHTML = `${remTickets}`;

        }else if (remTickets === 0) {
            ticketNum.innerHTML = `${remTickets}`;
            buyTicket.innerHTML = `sold out`;
        }
    });
    
    films.innerHTML = "";

    data.forEach((movie, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${movie.title}`;
        films.appendChild(li);
        const deleteButton = document.createElement("button");
        deleteButton.style.marginLeft = "5px";
        li.appendChild(deleteButton);
        li.addEventListener("mouseout", () => {
            li.style.color = "black";
        });
        deleteButton.addEventListener("click", () => {
            data.splice(index, 1);

            films.removeChild(li);
        });

        li.addEventListener("click", () => {
            remainingTickets = movie.capacity - movie.tickets_sold;
            title.innerHTML = `${movie.title}`;
            runtime.innerHTML = `${movie.runtime}`;
            filmInfo.innerHTML = `${movie.filmInfo}`;
            showtime.innerHTML = `${movie.showtime}`;
            ticketNum.innerHTML = "Buy ticket";
            buyTicket.innerHTML = `${movie.poster}`;
        })

    });
        
    
});