function addDnDHandlers() {
  var coffeeImages = document.getElementsByClassName("product-article-wide");
  var shoppingCartDropZone = document.getElementById("shopping-cart");
  var shoppingCart = document.querySelectorAll("#shopping-cart ul")[0];

  var Cart = (function() {
    this.coffees = new Array();
  });
  var Coffee = (function(id, price) {
    this.coffeeId = id;
    this.price = price;
  });
  var currentCart = null;
  currentCart = JSON.parse(localStorage.getItem('cart'));
  
  if (!currentCart) {
    createEmptyCart();
  }
  UpdateShoppingCart();
  currentCart.addCoffee = function(coffee) {
    currentCart.coffees.push(coffee);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  }

  for (var i=0; i<coffeeImages.length; i++) {
    coffeeImages[i].addEventListener("dragstart", function(ev) {
      ev.dataTransfer.effectAllowed = 'copy';
      ev.dataTransfer.setData("Text", this.getAttribute("id"));
    }, false);
  }

  shoppingCartDropZone.addEventListener("dragover", function(ev){
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    ev.dataTransfer.dropEffect = "copy";
    return false;
  }, false);

  shoppingCartDropZone.addEventListener("drop", function(ev) {
    if (ev.stopPropagation) {
      ev.stopPropagation();
    }
    var coffeeId = ev.dataTransfer.getData("Text");
    var element = document.getElementById(coffeeId);

    addCoffeeToShoppingCart(element, coffeeId);
    ev.stopPropagation();

    return false;
  }, false);

  function addCoffeeToShoppingCart(item, id) {
    var price = item.getAttribute("data-price");
    var coffee = new Coffee(id, price);
    currentCart.addCoffee(coffee);

    UpdateShoppingCart();
  }

  function createEmptyCart() {
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify(new Cart()));
    currentCart = JSON.parse(localStorage.getItem("cart"));
  }

  function UpdateShoppingCart() {
    shoppingCart.innerHTML = "";
    for (var i=0; i<currentCart.coffees.length; i++) {
      var liElement = document.createElement('li');
      liElement.innerHTML = currentCart.coffees[i].coffeeId + " " + currentCart.coffees[i].price;
      shoppingCart.appendChild(liElement);
    }
  }
}