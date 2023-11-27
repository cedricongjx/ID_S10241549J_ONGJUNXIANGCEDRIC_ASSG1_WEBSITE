document.addEventListener("DOMContentLoaded", function() {
    // Slider functionality
    const albumsContainer = document.getElementById('albumsContainer');
    const slideLeft = document.getElementById('slideLeft');
    const slideRight = document.getElementById('slideRight');

    slideLeft.addEventListener('click', () => {
        albumsContainer.scrollLeft -= albumsContainer.offsetWidth;
    });

    slideRight.addEventListener('click', () => {
        albumsContainer.scrollLeft += albumsContainer.offsetWidth;
    });

    // count down timer
    var countDownDate = new Date("Nov 30, 2023 23:59:59").getTime();

    var countdownTimer = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("days").innerHTML = "EXPIRED";
            document.getElementById("hours").innerHTML = "";
            document.getElementById("minutes").innerHTML = "";
            document.getElementById("seconds").innerHTML = "";
        }
    }, 1000);
    /*ticket drop down*/
    const buyTicketButton = document.getElementById("buyTicketButton");
    const ticketDropdown = document.getElementById("ticketDropdown");

    buyTicketButton.addEventListener('click', () => {
        ticketDropdown.classList.toggle("show");
    });

    // Click outside the dropdown to close
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.buy-ticket-button')) {
            if (ticketDropdown.classList.contains('show')) {
                ticketDropdown.classList.remove('show');
            }
        }
    });

   
});


