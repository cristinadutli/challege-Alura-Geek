import { servicesProducts } from "../services/product-services.js";

const containerProducts = document.querySelector("[data-product]");
const formulario = document.querySelector("[data-formulario]");


function crearCard(name, price, image, id) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cards__container");

    cardContainer.innerHTML = `
        <div class="image-card">
            <img src="${image}" alt="${name}">
        </div>
        <div class="info__card">
            <p class="product__name">${name}</p>
            <div class="product__value">
                <p class="product__precio">${price}</p>
                <button class="eliminar" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `;
    containerProducts.appendChild(cardContainer);
    return cardContainer;
}

const visualizar = async () => {
    try {
        const listProducts = await servicesProducts.productsList();
        console.log(listProducts);
        listProducts.forEach(product => {
            crearCard(product.name, product.price, product.image, product.id);
        });
    } catch (error) {
        console.log(error);
    }
};

formulario.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional.
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    console.log("Producto a agregar:", { name, price, image });

    try {
        const newProduct = await servicesProducts.crearProduct(name, price, image);
        console.log("Producto agregado:", newProduct); // Mostrar el producto agregado en la consola
        crearCard(newProduct.name, newProduct.price, newProduct.image, newProduct.id);
    } catch (error) {
        console.log(error);
    }
});

containerProducts.addEventListener("click", async(event)=>{
    console.log("Click detected")
    if (event.target.closest("button") && event.target.closest("button").classList.contains("eliminar")){
        console.log("Eliminar button clicked");
        const id = event.target.closest("button").dataset.id;
        console.log("Product ID to delete:", id);
        try {
            await servicesProducts.eliminarProduct(id);
            console.log("Product deleted");
            event.target.closest(".cards__container").remove();
            console.log("Card removed from DOM");
        } catch (error) {
           console.log(error);
            
        }
    }
})


visualizar();
document.addEventListener("DOMContentLoaded", visualizar);
