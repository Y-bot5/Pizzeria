console.log("JavaScript: \"Pizzeria loaded!\"");

const image_pizzaBase = document.getElementById("pizzaImage-base");
const image_pizzaCheese = document.getElementById("pizzaImage-cheese");
const image_pizzaHam = document.getElementById("pizzaImage-ham");
const image_pizzaOnion = document.getElementById("pizzaImage-onion");
const image_pizzaPepperoni = document.getElementById("pizzaImage-pepperoni");
const image_pizzaPineapple = document.getElementById("pizzaImage-pineapple");
const inputCheese = document.getElementById("cheeseInput");
const inputHam = document.getElementById("hamInput");
const inputOnion = document.getElementById("onionInput");
const inputPepperoni = document.getElementById("pepperoniInput");
const inputPineapple = document.getElementById("pineappleInput");
const inputMushroom = document.getElementById("mushroomInput");
const inputOlive = document.getElementById("oliveInput");
const buttonYes = document.getElementById("garlicBreadPanel-options-yes");
const buttonNo = document.getElementById("garlicBreadPanel-options-no");
const pizzaForm = document.getElementById("pizzaForm");
const crustSelection = document.getElementById("crustSelection");
const garlicBread = document.getElementById("garlicBreadPanel");
const textarea = document.getElementById("extra");
const delivery = document.querySelector(".deliveryChoices");
const pizzaCount = document.getElementById("pizzaCount");
const URL = "https://api.counterapi.dev/v1/Ybot5/pizzeria";

let garlicBreadOrdered = false;

image_pizzaBase.style.backgroundImage = "url('icons/base1.png')";
assignCheeseAmount();
pepperoniChange();
onionChange();
inputCheese.addEventListener("input", assignCheeseAmount);
inputHam.addEventListener("change", () => {
    image_pizzaHam.style.backgroundImage = inputHam.checked ? "url('icons/ham.png')" : "none";
});
inputOnion.addEventListener("change", onionChange);
inputPepperoni.addEventListener("change", pepperoniChange);
inputPineapple.addEventListener("change", () => {
    image_pizzaPineapple.style.backgroundImage = inputPineapple.checked ? "url('icons/pineapple.png')" : "none";
});

document.getElementById("buttonOrder").addEventListener("click", function(event) {
    event.preventDefault();
    garlicBread.style.display = "block";
})

buttonYes.addEventListener("click", () => {
    setGarlicBread(true);
    pizzaForm.submit();
});

buttonNo.addEventListener("click", () => {
    setGarlicBread(false);
    pizzaForm.submit();
});

function assignCheeseAmount() {
    var newImage = "";
    if (inputCheese.value >= 100) {
        newImage = "url('icons/cheese5.png')";
    } else if (inputCheese.value >= 80) {
        newImage = "url('icons/cheese4.png')";
    } else if (inputCheese.value >= 60) {
        newImage = "url('icons/cheese3.png')";
    } else if (inputCheese.value >= 40) {
        newImage = "url('icons/cheese2.png')";
    } else if (inputCheese.value >= 20) {
        newImage = "url('icons/cheese1.png')";
    } else {
        newImage = "none";
    }

    image_pizzaCheese.style.backgroundImage = newImage;
}

function pepperoniChange() {
    image_pizzaPepperoni.style.backgroundImage = inputPepperoni.checked ? "url('icons/pepperoni.png')" : "none";
}
function onionChange() {
    image_pizzaOnion.style.backgroundImage = inputOnion.checked ? "url('icons/onion.png')" : "none";
}

function triggerGarlicpanel() {
    document.querySelector(".garlicBreadPanel").style.display = "block";
}

function setGarlicBread(state) {
    garlicBreadOrdered = state;
    console.log(garlicBreadOrdered);
    submitPizzaToMemory();
}

function submitPizzaToMemory() {
    sessionStorage.setItem("crustType", crustSelection.value);
    sessionStorage.setItem("cheeseAmount", inputCheese.value);
    sessionStorage.setItem("garlicBread", garlicBreadOrdered ? "Yes" : "No");
    sessionStorage.setItem("delivery", delivery.querySelector("input[name='delivery']:checked").value);
    sessionStorage.setItem("extra", "\"" + textarea.value + "\"");
    sessionStorage.setItem("toppings", [
        "<br>    ○ Ham: " + (inputHam.checked ? "Yes" : "No"),
        "<br>    ○ Onion: " + (inputOnion.checked ? "Yes" : "No"),
        "<br>    ○ Pepperoni: " + (inputPepperoni.checked ? "Yes" : "No"),
        "<br>    ○ Pineapple: " + (inputPineapple.checked ? "Yes" : "No"),
        "<br>    ○ Mushroom: " + (inputMushroom.checked ? "Yes" : "No"),
        "<br>    ○ Olive: " + (inputOlive.checked ? "Yes" : "No")
    ]);
}

async function updatePizzaCount() {
  try {
    const res = await fetch(URL, { mode: 'cors' });
    console.log('Response status:', res.status); // Check if request reached server
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    console.log('Parsed data:', data); // Verify data structure
    
    if (pizzaCount) {
      pizzaCount.textContent = data.count || 0;
    } else {
      console.warn('DOM element "pizzaCount" not found');
    }
  } catch (error) {
    console.error('Detailed Fetch error:', error.message);
  }
}

updatePizzaCount();