const URL = "https://api.counterapi.dev/v2/projects/Ybot5/counters/pizzeria";

console.log("JavaScript: \"Ordering Pizza...\"");

(async () => {
    await fetch(`${URL}/up`);
})();

const ordered = document.getElementById("ordered");
const crust = document.getElementById("crust");
const cheese = document.getElementById("cheese");
const garlicBread = document.getElementById("garlicBread");
const delivery = document.getElementById("delivery");
const toppings = document.getElementById("toppings");

crust.innerHTML = "Pizza crust: " + sessionStorage.getItem("crustType");
cheese.innerHTML = "Cheese amount: " + sessionStorage.getItem("cheeseAmount") + "%";
garlicBread.innerHTML = "Garlic bread: " + sessionStorage.getItem("garlicBread");
delivery.innerHTML = "Delivery option: " + sessionStorage.getItem("delivery");
toppings.innerHTML = "Toppings: " + sessionStorage.getItem("toppings");