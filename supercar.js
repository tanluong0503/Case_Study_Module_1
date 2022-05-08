class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}
const keyName = "SuperCar_Management_DB";
// hàm lấy dữ liệu
function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}
// hàm đặt dữ liệu
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
var products = []
// hàm kiểm tra và in ra danh sách sản phẩm
function init() {
    if (getData(keyName) == null) {
        products = [
            new Product(1, "Lamborghini", 3573000, 'images/lamborghini.jpg'),
            new Product(2, "MayBach", 2943000, 'images/maybach.jpg'),
            new Product(3, "Mercedes", 2384000, 'images/mercedes.jpg'),
            new Product(4, "Rolls-Royce", 2746000, 'images/rollroyce.jpg'),
            new Product(5, "Ferrari", 3148000, 'images/ferrari.jpg'),
            new Product(6, "Mc Laren", 1924000, 'images/mclaren.jpg'),
            new Product(7, "Porsche", 2478000, 'images/porsche.jpg'),
            new Product(8, "BMW", 3439000, 'images/bmw.jpg'),
        ]
        setData(keyName, products);
    }
    else {
        products = getData(keyName);
    }
}
// Hàm tạo trang sản phẩm:
function renderProducts(data) {

    let htmls = data.map(function (product, index) {
        return `
        <div class="content_product">
            <div class="content_product-img">
                <img src="${product.image}" alt="">
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
        setData(keyName, products);
        renderProducts(products);
    }
}
// hàm thêm sản phẩm
function btnAdd(id) {
    document.querySelector(".form-add").classList.remove("add-none");
    position = id;
}
// hàm chỉnh sửa sản phẩm
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

}
// hàm đặt lại định dạng sau khi thêm sản phẩm
function clearFormAdd() {
    document.querySelector(".form-add").classList.add("add-none");
}
// hàm đặt lại định dạng sau khi chỉnh sửa sản phẩm
function clearFormEdit() {
    document.querySelector(".form-edit").classList.add("edit-none");
}
// hàm cập nhật sau khi thêm sản phẩm
function btnUpdateAdd(pdtId) {
    let product = sortGetId() + 1;
    let addName = document.querySelector('#addName').value;
    let addPrice = Number(document.querySelector('#addPrice').value);
    let addImage = document.querySelector('#addImage').value;
    products.name = addName;
    products.price = addPrice;
    products.image = addImage;
    let pdt = new Product(product, addName, currencyFormat(addPrice), addImage);
    products.push(pdt);
    clearFormAdd();
    alertProductName(addName);
    setData(keyName, products);
    renderProducts(products);
    resetProducts();
}
// hàm cập nhật sau khi chỉnh sửa sản phẩm 
function btnUpdateEdit(pdtId) {
    let pdt = getIdProducts(pdtId);
    let editName = document.querySelector('#editName').value;
    let editPrice = document.querySelector('#editPrice').value;
    let editImage = document.querySelector('#editImage').value;
    pdt.name = editName;
    pdt.price = Number(editPrice);
    pdt.image = editImage;
    // document.querySelector('.form-edit').classList.add('edit-none');
    setData(keyName, products);
    clearFormEdit();
    renderProducts(products);
}
// hàm báo tên sản phẩm
function alertProductName() {
    let reset = document.querySelector('#addName').value;
    if (reset.trim() == '') {
        return alert('xin nhap ten')
    }
}
// hàm cài lại sản phẩm
function resetProducts() {
    let pdtId = document.querySelector('#addName').value = '';
    let addPrice = document.querySelector('#addPrice').value = '';
    let addImage = document.querySelector('#addImage').value = '';
}
// hàm lấy id của sản phẩm
function getIdProducts(pdtId) {
    let product = products.find(function (pdt1) {
        return pdt1.id == pdtId
    })
    return product;

}
// hàm sắp xếp 
function sortGetId() {
    let arr = [...products]
    let getId = arr.sort(function (pdtId1, pdtId2) {
        return pdtId2.id - pdtId1.id
    })[0].id
    console.log(getId)
    return getId;

}
// hàm định dạng tiền tệ 
function currencyFormat(number) {

    return number.toLocaleString("en-US", {

        style: "currency",
        currency: "USD",

    })

}
// hàm để tìm kiếm sản phẩm 
function productSearch() {
    let keywork = document.querySelector('.search').value;
    let result = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    renderProducts(result);
}


init()
renderProducts(products);