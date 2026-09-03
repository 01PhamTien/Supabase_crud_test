import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jhffqvjvqfylvkwponko.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZmZxdmp2cWZ5bHZrd3BvbmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MDQ3NTksImV4cCI6MjEwMzk4MDc1OX0.zNWlfwJco1BnaLZqcjqET36Iq4eqoQF7AuJrUDl7Ao4";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// ==========================
// READ
// ==========================

async function getProducts() {

    console.log("Đang lấy dữ liệu...");

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", {
            ascending: false
        });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        console.error("Lỗi Supabase:", error);
        return;
    }

    const list = document.getElementById("productList");

    console.log("productList:", list);

    if (!list) {
        console.error("KHÔNG TÌM THẤY id='productList' trong HTML");
        return;
    }

    list.innerHTML = "";

    data.forEach(product => {

        list.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>

                <td>
                    <button onclick="editProduct(
                        ${product.id},
                        '${product.name}',
                        ${product.price}
                    )">
                        Sửa
                    </button>

                    <button onclick="deleteProduct(${product.id})">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });
}


// ==========================
// CREATE
// ==========================

async function addProduct() {

    const name =
        document.getElementById("name").value;

    const price =
        document.getElementById("price").value;

    if (!name || !price) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    const { error } = await supabase
        .from("products")
        .insert([
            {
                name: name,
                price: price
            }
        ]);

    if (error) {
        console.error(error);
        alert("Thêm thất bại!");
        return;
    }

    alert("Thêm thành công!");

    clearForm();

    getProducts();
}


// ==========================
// UPDATE
// ==========================

async function updateProduct() {

    const id =
        document.getElementById("productId").value;

    const name =
        document.getElementById("name").value;

    const price =
        document.getElementById("price").value;

    if (!id) {
        return;
    }

    const { error } = await supabase
        .from("products")
        .update({
            name: name,
            price: price
        })
        .eq("id", id);

    if (error) {
        console.error(error);
        return;
    }

    alert("Cập nhật thành công!");

    clearForm();

    getProducts();
}


// ==========================
// DELETE
// ==========================

async function deleteProduct(id) {

    const confirmDelete =
        confirm("Bạn có chắc muốn xóa?");

    if (!confirmDelete) {
        return;
    }

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        return;
    }

    alert("Xóa thành công!");

    getProducts();
}


// ==========================
// EDIT
// ==========================

function editProduct(id, name, price) {

    document.getElementById("productId").value = id;

    document.getElementById("name").value = name;

    document.getElementById("price").value = price;
}


// ==========================
// SAVE
// ==========================

document
    .getElementById("productForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("productId").value;

        if (id) {
            await updateProduct();
        } else {
            await addProduct();
        }

    });


// ==========================
// CLEAR
// ==========================

function clearForm() {

    document.getElementById("productId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("price").value = "";
}


// Cho HTML sử dụng
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

console.log("APP.JS ĐANG CHẠY");


// Load dữ liệu
getProducts();