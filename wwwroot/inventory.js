document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});
// document.getElementById("outofstock").addEventListener("change", (e) => {
//     document.getElementById('product_rows').dataset['id'] = e.target.value;
//     fetchProducts();
// });
// document.getElementById("reorderproduct").addEventListener("change", (e) => {
//     document.getElementById('product_rows').dataset['id'] = e.target.value;
//     fetchProducts();
// });
// document.getElementById("instock").addEventListener("change", (e) => {
//     document.getElementById('product_rows').dataset['id'] = e.target.value;
//     fetchProducts();
// });

async function fetchProducts() {
    const { data: fetchedProducts } = await axios.get(`../api/inventory`);
    console.log(fetchedProducts);
    let product_rows = "";
    fetchedProducts.map(product => {
        const css = product.unitsInStock == 0 ? " table-danger" : 
            product.unitsInStock < product.reorderLevel ? product.unitsInStock + product.UnitsOnOrder ? " table-secondary" : " table-warning" : "";
        product_rows +=
        `<tr class="product${css}" data-id="${product.productId}" data-name="${product.productName}" data-price="${product.unitPrice}">
        <td>${product.productId}</td>
        <td>${product.productName}</td>
        <td></td>
        <td class="text-end">${product.unitPrice.toFixed(2)}</td>
        <td class="text-end">${product.reorderLevel}</td>
        <td class="text-end">${product.unitsOnOrder}!!!!</td>
        <td class="text-end">${product.unitsInStock}</td>
      </tr>`;
    });
    document.getElementById('product_rows').innerHTML = product_rows;
}