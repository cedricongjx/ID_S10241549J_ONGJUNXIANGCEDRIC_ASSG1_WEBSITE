document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Slider functionality
    const albumsContainer = document.getElementById('albumsContainer');
    const slideLeft = document.getElementById('slideLeft');
    const slideRight = document.getElementById('slideRight');

    if (slideLeft && slideRight && albumsContainer) {
        slideLeft.addEventListener('click', () => {
            albumsContainer.scrollLeft -= albumsContainer.offsetWidth;
        });

        slideRight.addEventListener('click', () => {
            albumsContainer.scrollLeft += albumsContainer.offsetWidth;
        });
    }

    // Count down timer
    var countDownDate = new Date("Nov 30, 2024 23:59:59").getTime();
    var countdownTimer = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        var daysElement = document.getElementById("days");
        var hoursElement = document.getElementById("hours");
        var minutesElement = document.getElementById("minutes");
        var secondsElement = document.getElementById("seconds");

        if (daysElement) daysElement.innerHTML = days;
        if (hoursElement) hoursElement.innerHTML = hours;
        if (minutesElement) minutesElement.innerHTML = minutes;
        if (secondsElement) secondsElement.innerHTML = seconds;
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (daysElement) daysElement.innerHTML = "EXPIRED";
            if (hoursElement) hoursElement.innerHTML = "";
            if (minutesElement) minutesElement.innerHTML = "";
            if (secondsElement) secondsElement.innerHTML = "";
        }
    }, 1000);

    // Enhanced Add to Cart functionality
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total');
    let total = 0;

    function addToCart(itemName, itemPrice, itemImg) {
        let existingItem = cartItemsContainer.querySelector(`.cart-item[data-name="${itemName}"]`);
        if (existingItem) {
            let quantity = existingItem.querySelector('.quantity');
            quantity.textContent = parseInt(quantity.textContent) + 1;
        } else {
            const newItem = document.createElement('div');
            newItem.classList.add('cart-item');
            newItem.setAttribute('data-name', itemName);
            newItem.innerHTML = `
                <img src="${itemImg}" alt="${itemName}" class="cart-item-img">
                <span class="item-name">${itemName}</span>
                <span class="item-price">${itemPrice}</span>
                <span class="quantity">1</span>
                <button class="remove-item">Remove</button>
            `;
            cartItemsContainer.appendChild(newItem);

            newItem.querySelector('.remove-item').addEventListener('click', function() {
                removeItem(newItem, itemPrice);
            });
        }

        updateTotal(itemPrice, 1); // 1 for addition
    }

    function updateTotal(itemPrice, quantity) {
        const priceValue = parseFloat(itemPrice.replace('$', ''));
        total += priceValue * quantity;
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeItem(itemElement, itemPrice) {
        updateTotal(itemPrice, -1); // -1 for subtraction
        let quantityElem = itemElement.querySelector('.quantity');
        let quantity = parseInt(quantityElem.textContent);
        if (quantity > 1) {
            quantityElem.textContent = quantity - 1;
        } else {
            cartItemsContainer.removeChild(itemElement);
        }
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = button.getAttribute('data-price');
            const itemImg = button.closest('.merch-item').querySelector('img').src;
            addToCart(itemName, itemPrice, itemImg);
        });
    });

    var videos = document.querySelectorAll('.video-wrapper video');
    var currentVideoIndex = 0;
    var leftArrow = document.querySelector('.left-arrow');
    var rightArrow = document.querySelector('.right-arrow');

    function updateVideoDisplay() {
        videos.forEach(function(video, index) {
            video.style.display = index === currentVideoIndex ? 'block' : 'none';
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            if (currentVideoIndex > 0) {
                currentVideoIndex--;
                updateVideoDisplay();
            }
        });
    } else {
        console.error("Left arrow element not found");
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            if (currentVideoIndex < videos.length - 1) {
                currentVideoIndex++;
                updateVideoDisplay();
            }
        });
    } else {
        console.error("Right arrow element not found");
    }
});
