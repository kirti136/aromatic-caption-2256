let cont2Products = document.getElementById("cont2-products");
let totalProducts = document.getElementById("totalProducts");
let sortByPrice = document.getElementById("sortByPrice");
let color = document.getElementById("color");

fetch("./Scripts/womens.json")
  .then((res) => {
    return res.json();
  })
  .then((actualData) => {
    // console.log(actualData);
    showData(actualData);
    totalProducts.innerText = actualData.length;
    JSON.stringify(localStorage.setItem("womenData", actualData));

    // Pagination
    let itemsPerPage = 10;
    let currentPage = 1;
    const paginationLinks = document.querySelectorAll(".pagination a");
    paginationLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = parseInt(event.target.textContent);
        updatePagination();
        showData(getCurrentPageData());
      });
    });

    function updatePagination() {
      paginationLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document
        .querySelector(`.pagination a:nth-child(${currentPage})`)
        .classList.add("active");
    }

    function getCurrentPageData() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return actualData.slice(startIndex, endIndex);
    }

    // SORT BY PRICE
    sortByPrice.addEventListener("change", (event) => {
      const selectedSort = event.target.value;
      if (selectedSort === "highToLow") {
        let sortedData = actualData.sort(
          (a, b) => b.discountPrice - a.discountPrice
        );
        showData(sortedData);
      } else if (selectedSort === "lowToHigh") {
        let sortedData = actualData.sort(
          (a, b) => a.discountPrice - b.discountPrice
        );
        showData(sortedData);
      }
    });

    // SORT BY COLOR
    color.addEventListener("change", (event) => {
      const selectedColor = event.target.value;
      if (selectedColor === "black") {
        let sortedColorData = actualData.filter((element, index) => {
          return element.color === selectedColor;
        });
        showData(sortedColorData);
      } else if (selectedColor === "white") {
        let sortedColorData = actualData.filter((element, index) => {
          return element.color === selectedColor;
        });
        showData(sortedColorData);
      } else if (selectedColor === "blue") {
        let sortedColorData = actualData.filter((element, index) => {
          return element.color === selectedColor;
        });
        showData(sortedColorData);
      } else if (selectedColor === "green") {
        let sortedColorData = actualData.filter((element, index) => {
          return element.color === selectedColor;
        });
        showData(sortedColorData);
      } else if (selectedColor === "yellow") {
        let sortedColorData = actualData.filter((element, index) => {
          return element.color === selectedColor;
        });
        showData(sortedColorData);
      } else if (selectedColor === "pink") {
        let sortedColorData = actualData.filter((element, index) => {
          return element.color === selectedColor;
        });
        showData(sortedColorData);
      } else {
        showData(actualData);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

function showData(data) {
  cont2Products.innerHTML = "";
  data.forEach((element, index) => {
    let card = document.createElement("div");

    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");

    let image = document.createElement("img");
    image.setAttribute("src", element.image);

    let name = document.createElement("p");
    name.innerText = element.name;

    let discountPrice = document.createElement("p");
    discountPrice.innerText = "$" + element.discountPrice;

    let originalPrice = document.createElement("s");
    originalPrice.innerText = "$" + element.originalPrice;

    let button = document.createElement("button");
    button.innerText = "Add to Cart";

    button.addEventListener("click", () => {
      let cartData = JSON.parse(localStorage.getItem("cart-data"));
      if (cartData === null) {
        cartData = [];
      }

      let isAlreadyInCart = false;

      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].id === element.id) {
          isAlreadyInCart = true;
          break;
        }
      }
      if (isAlreadyInCart === true) {
        alert("Product is already in Cart.");
      } else {
        cartData.push(element);
        localStorage.setItem("cart-data", JSON.stringify(cartData));
        alert("Product successfully added to Cart.");
      }
    });
    imgdiv.append(image);
    card.append(imgdiv, name, discountPrice, originalPrice, button);
    cont2Products.append(card);
  });
}
