// cart.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart if it doesn't exist
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  // Update cart count in header
  updateCartCount();

  // Add event listeners to all "Add to Cart" buttons
  document
    .querySelectorAll(".featured-Products.animated-btn")
    .forEach((button) => {
      if (button.textContent.trim() === "Cart") {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          const productCard = this.closest(
            ".add-to-card-1, .add-to-card-2, .add-to-card-3, .add-to-card-4, .add-to-card-5, .add-to-card-6, .add-to-card-7, .add-to-card-8, .add-to-card-9, .add-to-card-10"
          );
          addToCart(productCard);
        });
      }
    });
});

function addToCart(productCard) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const product = {
    id: productCard.classList[0], // e.g., "add-to-card-1"
    name: productCard.querySelector("h3").textContent,
    price: productCard.querySelector(".new span").textContent,
    oldPrice: productCard.querySelector(".old span").textContent,
    image: productCard.querySelector("img").src,
  };

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Show confirmation
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Update cart count in all headers
  document.querySelectorAll(".fa-cart-shopping").forEach((icon) => {
    const cartText = icon.nextSibling.textContent.trim();
    icon.nextSibling.textContent = ` Cart(${totalItems})`;
  });
}

// search.js
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('.input input[type="search"]');
  const searchButton = document.querySelector(".magnifying.animated-btn");

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      performSearch(searchInput.value);
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(searchInput.value);
      }
    });
  }
});

function performSearch(query) {
  if (query.trim() === "") {
    alert("Please enter a search term");
    return;
  }

  // In a real application, this would make an API call or filter products
  alert(`Searching for: ${query}`);
  // For now, just redirect to shop page with search parameter
  window.location.href = `Shop.html?search=${encodeURIComponent(query)}`;
}

// contact.js
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // In a real app, you would send this to a server
      console.log("Form submitted:", formData);
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
});

// wishlist.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize wishlist if it doesn't exist
  if (!localStorage.getItem("wishlist")) {
    localStorage.setItem("wishlist", JSON.stringify([]));
  }

  // Add event listeners to all wishlist buttons/icons
  document.querySelectorAll(".fa-heart").forEach((heart) => {
    heart.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(
        ".add-to-card-1, .add-to-card-2, .add-to-card-3, .add-to-card-4, .add-to-card-5, .add-to-card-6, .add-to-card-7, .add-to-card-8, .add-to-card-9, .add-to-card-10"
      );

      if (productCard) {
        addToWishlist(productCard);
      } else {
        // For the header wishlist icon
        window.location.href = "wishlist.html";
      }
    });
  });
});

function addToWishlist(productCard) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist"));

  const product = {
    id: productCard.classList[0],
    name: productCard.querySelector("h3").textContent,
    price: productCard.querySelector(".new span").textContent,
    image: productCard.querySelector("img").src,
  };

  // Check if product already in wishlist
  const existingItem = wishlist.find((item) => item.id === product.id);
  if (!existingItem) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.name} added to wishlist!`);
  } else {
    alert(`${product.name} is already in your wishlist!`);
  }
}

// newsletter.js
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".input-sub");

  if (newsletterForm) {
    const subscribeButton = newsletterForm.querySelector(".Subscribe-btn");
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    subscribeButton.addEventListener("click", function (e) {
      e.preventDefault();

      if (emailInput.value.trim() === "") {
        alert("Please enter your email address");
        return;
      }

      if (!validateEmail(emailInput.value)) {
        alert("Please enter a valid email address");
        return;
      }

      // In a real app, you would send this to a server
      console.log("Subscribed email:", emailInput.value);
      alert("Thank you for subscribing to our newsletter!");
      emailInput.value = "";
    });
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// categories.js
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".Categories-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const category =
        this.closest(".content-conteiner").querySelector("h3").textContent;
      window.location.href = `Shop.html?category=${encodeURIComponent(
        category
      )}`;
    });
  });
});
