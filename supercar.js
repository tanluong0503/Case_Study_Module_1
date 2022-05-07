class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}
var products = [
    new Product(1, "Lamborghini", 3573000, 'lamborghini.jpg'),
    new Product(2, "MayBach", 2943000, 'maybach.jpg'),
    new Product(3, "Mercedes", 2384000, 'mercedes.jpg'),
    new Product(4, "Rolls-Royce", 2746000, 'rollroyce.jpg'),
    new Product(5, "Ferrari",3148000, 'ferrari.jpg'),
    new Product(6, "Mc Laren", 1924000,'mclaren.jpg'),
    new Product(7, "Porsche",2478000,'porsche.jpg'),
]
// Hàm tạo trang sản phẩm:
function renderProducts() {

    let htmls = products.map(function (product, index) {
        return `
        <div class="content_product">
            <div class="content_product-img">
                <img src="images/${product.image}" alt="">
            </div>
            <div class="content_product-name">
                <p id="input_${product.id}"> ${product.name} </p>
                <p> ${currencyFormat(product.price)} </p>
            </div>
            <div class="action">
            <button type="button" onclick="btnAdd(${product.id})">Thêm</button>
            <button type="button" onclick="btnEdit(${product.id})">Chỉnh sửa</button>
            <button type="button" onclick="removeProduct(${product.id})">Xóa</button>
            </div>
        </div>
        `
    })
    document.querySelector(".content").innerHTML = htmls.join("");
}
var position = 0;
// Hàm xóa sản phẩm:
function removeProduct(id) {
    let index;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            index = i;
        }
    }
    let confirmed = window.confirm(`Bạn có chắc chắn muốn xóa ${products[index].name} không?`);
    if (confirmed) {
        products.splice(index, 1);
        renderProducts();
    }
}

function btnAdd(id) {
    document.querySelector(".form-add").classList.remove("add-none");
    position = id;
}

function btnEdit(pdtId) {
    document.querySelector(".form-edit").classList.remove("edit-none");
    position = pdtId;
    let pdt = getIdProducts(pdtId);
    console.log(pdtId)
    let str = `
    <div>
    <label for="">Nhập tên sản phẩm muốn sửa</label>
    <input type="text" id="editName" value="${pdt.name}"> 
    <label for="editPrice">Nhập giá sản phẩm muốn sửa</label>
    <input type="number" id="editPrice" value="${pdt.price}">
    <label for="editImage">Nhập hình ảnh sản phẩm muốn sửa</label>
    <input type="url" id="editImage" value="${pdt.image}">
    <div>
    <button type="button" onclick="btnUpdateEdit(${pdt.id})">Update</button>
    <button type="button" onclick="clearFormEdit(${pdt.id})">Cancel</button>
</div>
</div>
    `
    document.querySelector('.form-edit').innerHTML = str;
    // renderProducts();
}

function clearFormAdd() {
    document.querySelector(".form-add").classList.add("add-none");
}
function clearFormEdit() {
    document.querySelector(".form-edit").classList.add("edit-none");
}
function btnUpdateAdd(pdtId) {
    let product = sortGetId() + 1;
    let addName = document.querySelector('#addName').value;
    let addPrice = document.querySelector('#addPrice').value;
    let addImage = document.querySelector('#addImage').value;
    products.name = addName;
    products.price = addPrice;
    products.image = addImage;
    let pdt = new Product(product, addName, addPrice, addImage);
    products.push(pdt);
    clearFormAdd();
    alertProductName(addName);
    renderProducts();
    resetProducts();
}
function btnUpdateEdit(pdtId) {
    let pdt = getIdProducts(pdtId);
    let editName = document.querySelector('#editName').value;
    let editPrice = document.querySelector('#editPrice').value;
    let editImage = document.querySelector('#editImage').value;
    pdt.name = editName;
    pdt.price = editPrice;
    pdt.image = editImage;
    // document.querySelector('.form-edit').classList.add('edit-none');
    clearFormEdit();
    renderProducts();
}
function alertProductName() {
    let reset = document.querySelector('#addName').value;
    if (reset.trim() == '') {
        return alert('xin nhap ten')
    }
}
function resetProducts() {
    let pdtId = document.querySelector('#addName').value = '';
    let addPrice = document.querySelector('#addPrice').value = '';
    let addImage = document.querySelector('#addImage').value = '';
}
function getIdProducts(pdtId) {
    let product = products.find(function (pdt1) {
        return pdt1.id == pdtId
    })
    return product;

}
function sortGetId() {
    let arr = [...products]
    let getId = arr.sort(function (pdtId1, pdtId2) {
        return pdtId2.id - pdtId1.id
    })[0].id
    console.log(getId)
    return getId;

}
function currencyFormat(number) {

    return number.toLocaleString("en-US", {

        style: "currency",
        currency: "USD",

    })

}
renderProducts();