class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}
var products = [
    new Product(1, "Lamborghini", 1000000000, 'lamborghini.jpg'),
    new Product(2, "MayBach", 3000000000, 'maybach.jpg'),
    new Product(3, "Mercedes", 1000000000, 'mercedes.jpg'),
    new Product(4, "Rolls-Royce", 1000000000, 'rollroyce.jpg'),
    new Product(5, "Rolls-232323", 12312312, 'rollroyce.jpg'),
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
                <p> ${product.price} </p>
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
    let pdt = getIdProducts();
    console.log(pdt.position)
    let str = `
    <div>
    <label for="">Nhập tên sản phẩm muốn sửa</label>
    <input type="text" id="editName" value="${pdt.name}"> 
    <label for="editPrice">Nhập giá sản phẩm muốn sửa</label>
    <input type="number" id="editPrice">
    <label for="editImage">Nhập hình ảnh sản phẩm muốn sửa</label>
    <input type="url" id="editImage">
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
function btnUpdateAdd(){
    let product = sortGetId() + 1;
    let editName = document.querySelector('#addName').value;
    let editPrice = document.querySelector('#addPrice').value;
    let editImage = document.querySelector('#addImage').value;
    products.name = editName;
    products.price = editPrice;
    products.image = editImage;
    let pdt = new Product(product,editName,editPrice,editImage);
    products.push(pdt);
    renderProducts();
}
function btnUpdateEdit(){

}
function getIdProducts(pdtId){
    let product = products.find(function(pdt1){
        return pdt1.id == pdtId
    })
    return product;
    // console.log(product)
    // console.log(pdtId)
    // return products.find(function(product){
    //     return product == pdtId;
    // })
}
function sortGetId(){
    let arr = [...products]
    let getId = arr.sort(function(pdtId1,pdtId2){
        return pdtId2.id - pdtId1.id
    })[0].id
    console.log(getId)
    return getId;
        
}
renderProducts();