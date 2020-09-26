import {
  addProductService,
  deleteProductService,
  getDetailService,
  getListProductService,
  updateService,
  callAPI,
} from "./utils/callApi.js";
import Product from "../src/model/product.js";

const renderHTML = () => {
  const contentHTML = `
  <div class="card text-white bg-dark">
  <div class="card-body">
    <h4 class="card-title">Danh sách sản phẩm</h4>
    <div class='container'>
      <div class="row">
        <div class="col-md-3">
          <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
        </div>
        <div class="col-md-3">
          <input id="tenSP" class="form-control" placeholder="Tên SP" />
        </div>
        <div class="col-md-3">
          <input id="gia" class="form-control" placeholder="Giá" />
        </div>
        <div class="col-md-3">
          <input id="hinhAnh" class="form-control" placeholder="Link hình" />
        </div>
      </div>
      <br />
      <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
      <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
      <button id="reset" class="btn btn-info" onclick="resetValue()">Reset</button>

      </div>
    </div>
  </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên SP</th>
            <th>Giá </th>
            <th>Hình ảnh</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tblDanhSachSanPham">

        </tbody>
      </table>
  </div>
  `;
  document.getElementById("root").innerHTML = contentHTML;
};
renderHTML();

const renderListProduct = () => {
  getListProductService()
    .then((res) => {
      console.log(res.data);
      const contentHTML = taobang(res.data);
      document.getElementById("tblDanhSachSanPham").innerHTML = contentHTML;
    })
    .catch((err) => {
      console.log(err);
    });
};
renderListProduct();

const taobang = (arr) => {
  document.getElementById("maSP").value = "";
  document.getElementById("tenSP").value = "";
  document.getElementById("gia").value = "";
  document.getElementById("hinhAnh").value = "";
  if (arr && arr.length > 0) {
    let contentHTML = "";
    arr.map((product) => {
      contentHTML += ` <tr>
          <td> ${product.id} </td>
          <td> ${product.tenSP} </td>
          <td> ${product.gia} </td>
          <td> <img src="${product.hinhAnh}" width='50' /> </td>
          <td>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})"> Delete </button>
            <button id=btnEdit class="btn btn-success" onclick="editSP(${product.id})"> Edit </button>
          </td>
        </tr>
      `;
    });
    return contentHTML;
  }
};
// function deleteProduct(id){  gây lỗi do window lúc khai báo vẫn chưa có hàm này do import
//   console.log(id)
// }
window.deleteProduct = deleteProduct;
function deleteProduct(id) {
  // confirm("want to delete?");
  deleteProductService(id)
    .then((res) => {
      console.log(res);
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}
const themSP = () => {
  const tenSP = document.getElementById("tenSP").value;
  const gia = document.getElementById("gia").value;
  const hinhAnh = document.getElementById("hinhAnh").value;
  const product = new Product({ tenSP, gia, hinhAnh });
  addProductService(product)
    .then((res) => {
      console.log(res);
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
};
document.getElementById("btnThem").addEventListener("click", themSP);

const editSP = (id) => {
  return getDetailService(id).then((res) => {
    console.log(res); //maSP
    const maSP = document.getElementById("maSP");
    maSP.value = res.data.id;
    const tenSP = document.getElementById("tenSP");
    tenSP.value = res.data.tenSP;
    const gia = document.getElementById("gia");
    gia.value = res.data.gia;
    const hinhAnh = document.getElementById("hinhAnh");
    hinhAnh.value = res.data.hinhAnh;
  });
};
window.editSP = editSP;

const updateSP = () => {
  const maSP = document.getElementById("maSP").value;
  const tenSP = document.getElementById("tenSP").value;
  const gia = document.getElementById("gia").value;
  const hinhAnh = document.getElementById("hinhAnh").value;
  const product = new Product({ tenSP, gia, hinhAnh });
  updateService(maSP, product)
    .then((res) => {
      console.log(res);
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
};
document.getElementById("btnCapNhat").addEventListener("click", updateSP);

const resetValue = () => {
  const maSP = document.getElementById("maSP");
  maSP.value = "";
  const tenSP = document.getElementById("tenSP");
  tenSP.value = "";
  const gia = document.getElementById("gia");
  gia.value = "";
  const hinhAnh = document.getElementById("hinhAnh");
  hinhAnh.value = "";
};
window.resetValue = resetValue;
