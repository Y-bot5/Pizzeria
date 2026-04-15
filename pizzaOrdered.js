const URL = "https://api.counterapi.dev/v1/Ybot5/pizzeria/up";

console.log("JavaScript: \"Ordering Pizza...\"");

if (!sessionStorage.getItem("ordered") && sessionStorage.getItem("toppings")) {
    sessionStorage.setItem("ordered", true);
    (async () => {
        await fetch(URL);
    })();
}

const ordered = document.getElementById("ordered");
const crust = document.getElementById("crust");
const cheese = document.getElementById("cheese");
const garlicBread = document.getElementById("garlicBread");
const delivery = document.getElementById("delivery");
const toppings = document.getElementById("toppings");
const extra = document.getElementById("extra");

crust.innerHTML = "Pizza crust: " + (sessionStorage.getItem("crustType") || "No information found.");
cheese.innerHTML = "Cheese amount: " + (sessionStorage.getItem("cheeseAmount") ? sessionStorage.getItem("cheeseAmount") + "%" : "No information found.");
garlicBread.innerHTML = "Garlic bread: " + (sessionStorage.getItem("garlicBread") || "No information found.");
delivery.innerHTML = "Delivery option: " + (sessionStorage.getItem("delivery") || "No information found.");
extra.innerHTML = "Extra: " + (sessionStorage.getItem("extra") || "No information found.");
toppings.innerHTML = "Toppings: " + (sessionStorage.getItem("toppings") || "No information found.");