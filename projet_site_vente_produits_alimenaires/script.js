document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartItemsElement = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.getElementById('cart-icon');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dishElement = button.closest('.dish');
            const dishId = dishElement.getAttribute('data-id');
            const dishName = dishElement.getAttribute('data-name');
            const dishPrice = parseFloat(dishElement.getAttribute('data-price'));

            addToCart(dishId, dishName, dishPrice);
            updateCartDisplay();
            updateCartCount();
        });
    });

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#cart').scrollIntoView({ behavior: 'smooth' });
    });

    function addToCart(id, name, price) {
        const existingDish = cart.find(dish => dish.id === id);

        if (existingDish) {
            existingDish.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
    }

    function updateCartDisplay() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(dish => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${dish.name} (x${dish.quantity})</span>
                <span>${(dish.price * dish.quantity).toFixed(2)} FCFA</span>
                <button class="remove-from-cart" data-id="${dish.id}">Retirer</button>
            `;
            cartItemsElement.appendChild(cartItemElement);

            total += dish.price * dish.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const dishId = button.getAttribute('data-id');
                removeFromCart(dishId);
                updateCartDisplay();
                updateCartCount();
            });
        });
    }

    function updateCartCount() {
        const itemCount = cart.reduce((sum, dish) => sum + dish.quantity, 0);
        if (itemCount > 0) {
            cartCountElement.textContent = itemCount;
            cartCountElement.style.display = 'inline';
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    function removeFromCart(id) {
        const dishIndex = cart.findIndex(dish => dish.id === id);
        if (dishIndex > -1) {
            cart[dishIndex].quantity -= 1;
            if (cart[dishIndex].quantity === 0) {
                cart.splice(dishIndex, 1);
            }
        }
    }

    // Vider le panier
    document.getElementById('checkout').addEventListener('click', () => {
        cart.length = 0;
        updateCartDisplay();
        updateCartCount();
    });
});
