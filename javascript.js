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
            const itemImg = button.closest('.merch-item').querySelector('img').src; // Assuming the image is within the merch-item
            addToCart(itemName, itemPrice, itemImg);
        });
    });
   

   
});


