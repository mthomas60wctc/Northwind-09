document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

const outOfStockCheckEleement = document.getElementById("outofstock");
const restockProductCheckEleement = document.getElementById("restock");
const inStockCheckEleement = document.getElementById("instock");

outOfStockCheckEleement.addEventListener("change", (e) => {
    updateHidden();
});
restockProductCheckEleement.addEventListener("change", (e) => {
    updateHidden();
});
inStockCheckEleement.addEventListener("change", (e) => {
    updateHidden();
});

function updateHidden() {
    const hiddenClass = 'd-none';

    const outOfStockRows = document.querySelectorAll(".table-danger");
    const restockRows = document.querySelectorAll(".table-warning");
    const inStockRows = document.querySelectorAll(".in-stock");

    outOfStockCheckEleement.checked ? outOfStockRows.forEach(e => e.classList.remove(hiddenClass)) : outOfStockRows.forEach(e => e.classList.add(hiddenClass));
    restockProductCheckEleement.checked ? restockRows.forEach(e => e.classList.remove(hiddenClass)) : restockRows.forEach(e => e.classList.add(hiddenClass));
    inStockCheckEleement.checked ? inStockRows.forEach(e => e.classList.remove(hiddenClass)) : inStockRows.forEach(e => e.classList.add(hiddenClass));
}

async function fetchProducts() {
    const { data: fetchedProducts } = await axios.get(`../api/inventory`);
    let product_rows = "";
    fetchedProducts.map(product => {
        const css = product.unitsInStock == 0 ? " table-danger" :
            product.unitsInStock < product.reorderLevel ? product.unitsInStock + product.UnitsOnOrder ? " table-success in-stock" : " table-warning" : " in-stock";
        product_rows +=
            `<tr class="product${css}" data-id="${product.productId}" data-name="${product.productName}" data-price="${product.unitPrice}"
            data-reorder="${product.reorderLevel}" data-stock="${product.unitsInStock}" data-onorder="${product.unitsOnOrder}">
        <td>${product.productId}</td>
        <td>${product.productName}</td>
        <td></td>
        <td class="text-end">${product.unitPrice.toFixed(2)}</td>
        <td class="text-end">${product.reorderLevel}</td>
        <td class="text-end">${product.unitsOnOrder}</td>
        <td class="text-end">${product.unitsInStock}</td>
      </tr>`;
    });
    document.getElementById('product_rows').innerHTML = product_rows;
}

document.getElementById('product_rows').addEventListener("click", (e) => {
    p = e.target.parentElement;
    if (p.classList.contains('product')) {
        console.log(p.dataset['name'])
        e.preventDefault()
        console.log(p.dataset['id']);
        document.getElementById('ProductId').innerHTML = p.dataset['id'];
        document.getElementById('ProductName').value = p.dataset['name'];
        document.getElementById('UnitPrice').value = Number(p.dataset['price']).toFixed(2);
        document.getElementById('ReorderLevel').value = Number(p.dataset['reorder']);
        document.getElementById('OnOrder').value = Number(p.dataset['onorder']);
        document.getElementById('InStock').value = Number(p.dataset['stock']);
        const cart = new bootstrap.Modal('#cartModal', {}).show();
    }
});