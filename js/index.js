// GRABCAR:  (1)8000 (18)7500 (total - 19)7000 || TG CHỜ: 2000/3P
// GRAB SUV:  (1)9000 (18)8500 (total - 19)8000 || TG CHỜ: 3000/3P
// GRAB SUV:  (1)10000 (18)9500 (total - 19)9000 || TG CHỜ: 3500/3P

//Tạo 3 hằng số lưu trữ 3 giá trị của thuộc tính value của 3 thẻ input (để sau này layout có thêm thẻ hay nội dung giá trị thay đổi -> qua file JS cập nhật lại thêm , tránh được lỗi)
const GRAB_CAR = "grabCar";
const GBAB_SUV = "grabSUV";
const GRAB_BLACK = "grabBlack";

function giaKmDauTien(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR:
      return 8000;
    case GBAB_SUV:
      return 9000;
    case GRAB_BLACK:
      return 10000;
  }
}

function giaKmTu1Den19(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR:
      return 7500;
    case GBAB_SUV:
      return 8500;
    case GRAB_BLACK:
      return 9500;
  }
}

function giaKmTu19TroLen(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR:
      return 7000;
    case GBAB_SUV:
      return 8000;
    case GRAB_BLACK:
      return 9000;
  }
}

function giaThoiGianCho(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR:
      return 2000;
    case GBAB_SUV:
      return 3000;
    case GRAB_BLACK:
      return 3500;
  }
}

document.getElementById("btnTinhTien").onclick = function () {
  console.log(`bắt đầu`);
  /* Tips: CHECK THẺ INPUT-RADIO XEM THẺ CÓ ĐANG ĐƯỢC USER TICK VÀO HAY KHÔNG? 
  => Thuộc tính .checked => tick : true | ko tick : false
  CL: let loaiXe = document.getElementById("grabX").checked;
  console.log(loaiXe); // => tick : true | ko tick : false */

  /* Tips: LỌC 01 THẺ INPUT-RADIO ĐANG ĐƯỢC USER TICK VÀO TRONG NHIỀU THẺ INPUT-RADIO 
- DOM tới các thẻ input 
- Nhưng phải giới hạn lại phạm vi thẻ input để lọc ra các thẻ input-radio với input-text/input-number còn lại 
- Và các thẻ input-radio này đều có chung 1 thuộc tính-giá trị
- Sau đó gắn thuộc tính CHECKED để lọc ra input-radio được User đang tick vào: 
CL: let tenBien1 = document.querySelector("input[thuộctính='giá trị']:checked")
=> Lọc ra thẻ input-radio ĐANG ĐƯỢC TICK VÀO 
LƯU Ý: trong TH user không checked vào bất cứ thẻ input-radio nào bên trên => KQ: NULL (ko có thẻ nào được chọn) 
Như vậy thì sẽ ko lấy được dữ liệu cần để tính toán nên phải thêm 1 Thao tác điều kiện để thông báo alert nếu user ko chọn + lệnh return để ngưng hàm ngay khi user đã nhận thông báo ấy 
CL: If (tenBien == null) { 
alert("Vui lòng chọn option"); 
return;
};
SAU ĐÓ MỚI BẮT ĐẦU LẤY GIÁ TRỊ TỪ THẺ INPUT-RADIO CHECKED VỪA MỚI LỌC RA
CL: let tenBien2 = tenbien1.value;
console.log(tenBien2);
*/
  //Lọc thẻ input-radio có name:"selector" - checked
  let loaiXe = document.querySelector("input[name='selector']:checked");
  console.log(loaiXe);
  if (loaiXe == null) {
    alert("Vui lòng chọn loại xe");
    return;
  }
  // Lấy giá trị từ thẻ input-radio có name:"selector" - checked đó
  let loaiXeGrabCar = loaiXe.value;
  console.log(loaiXeGrabCar);
  let soKm = document.getElementById("txt-km").value * 1;
  let thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  let tienKmDauTien = giaKmDauTien(loaiXeGrabCar);
  let tienKmTu1Den19 = giaKmTu1Den19(loaiXeGrabCar);
  let tienKmTu19TroLen = giaKmTu19TroLen(loaiXeGrabCar);
  let tienThoiGianCho = giaThoiGianCho(loaiXeGrabCar);
  let tongTien = 0;
  if (soKm <= 19) {
    tongTien = 1 * tienKmDauTien + (soKm - 1) * tienKmTu1Den19;
  } else {
    tongTien =
      1 * tienKmDauTien +
      (19 - 1) * tienKmTu1Den19 +
      (soKm - 19) * tienKmTu19TroLen;
  }
  let soLanPhatCho = Math.floor((thoiGianCho - 3) / 3);
  tongTien += soLanPhatCho * tienThoiGianCho;
  let tienTe = tongTien.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  console.log(tongTien);
  // OUTPUT
  document.querySelector(".dongia").style.display = "block";
  document.querySelector(".xuatTien").innerHTML = `${tienTe}`;
};

// TẠO CHỨC NĂNG CLICK CHO NÚT IN HOÁ ĐƠN
document.getElementById("btnInHoaDon").onclick = function () {
  // INPUT
  let loaiXe = document.querySelector("input[name='selector']:checked");
  if (loaiXe == null) {
    alert(`Vui lòng chọn loại xe Grab`);
    return;
  }
  let loaiXeGrabCar = loaiXe.value;
  let soKm = document.getElementById("txt-km").value * 1;
  let thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  // HANDLE
  //CỘT SỬ DỤNG
  let soKm1 = 0;
  let soKm2 = 0;
  let soKm3 = 0;
  if (soKm <= 19) {
    if (soKm <= 1) {
      soKm1 = soKm;
      soKm2 = 0;
      soKm3 = 0;
    } else {
      soKm1 = 1;
      soKm2 = soKm - 1;
      soKm3 = 0;
    }
  } else {
    soKm1 = 1;
    soKm2 = 19 - 1;
    soKm3 = soKm - 19;
  }
  let thoiGianChoSau3Phut = 0;
  if (thoiGianCho <= 3) {
    thoiGianChoSau3Phut = 0;
  } else {
    thoiGianChoSau3Phut = thoiGianCho - 3;
  }

  //CỘT ĐƠN GIÁ
  let donGiaKmDauTien = giaKmDauTien(loaiXeGrabCar);
  let donGiaKmTu1Den19 = giaKmTu1Den19(loaiXeGrabCar);
  let donGiaKmTu19TroLen = giaKmTu19TroLen(loaiXeGrabCar);
  let donGiaThoiGianCho = giaThoiGianCho(loaiXeGrabCar);
  //CỘT THÀNH TIỀN
  let thanhTien1 = soKm1 * donGiaKmDauTien;
  let thanhTien2 = soKm2 * donGiaKmTu1Den19;
  let thanhTien3 = soKm3 * donGiaKmTu19TroLen;
  let soLanPhatCho = 0;
  if (thoiGianCho <= 3) {
    soLanPhatCho = 0;
  } else {
    soLanPhatCho = Math.floor((thoiGianCho - 3) / 3);
  }
  let thanhTien4 = soLanPhatCho * donGiaThoiGianCho;
  //DÒNG TỔNG TIỀN
  let total = thanhTien1 + thanhTien2 + thanhTien3 + thanhTien4;
  let tienTetotal = total.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  // OUTPUT
  $("#exampleModal").modal("show");
  document.querySelector(".modal-body").innerHTML = `
  <table class="table"  align="center" border="1"">
  <thead>
   <tr>
            <th colspan="2">Loại xe</th>
            <th>${loaiXeGrabCar}</th>
            <th>Số km: ${soKm}km</th>
          </tr>
   
  </thead>
  <tbody>
   <tr>
      <th scope="col">CHI TIẾT</th>
      <th scope="col">SỬ DỤNG</th>
      <th scope="col">ĐƠN GIÁ (VND)</th>
      <th scope="col">THÀNH TIỀN (VND)</th>
    </tr>
    <tr>
      <th scope="row">KM ĐẦU TIÊN</th>
      <td>${soKm1}km</td>
      <td>${donGiaKmDauTien}</td>
      <td>${thanhTien1}</td>
    </tr>
    <tr>
      <th scope="row">TỪ 1 TỚI 19 KM</th>
      <td>${soKm2}km</td>
      <td>${donGiaKmTu1Den19}</td>
      <td>${thanhTien2}</td>
    </tr>
    <tr>
      <th scope="row">TỪ 19 KM TRỞ LÊN</th>
      <td>${soKm3}km</td>
      <td>${donGiaKmTu19TroLen}</td>
      <td>${thanhTien3}</td>
    </tr>
     <tr>
      <th scope="row">THỜI GIAN CHỜ TÍNH PHÍ <br> (MIỄN PHÍ 3 PHÚT ĐẦU)</th>
      <td>Chờ ${thoiGianCho} phút <br> Tính tiền ${thoiGianChoSau3Phut} phút</td>
      <td>${donGiaThoiGianCho}</td>
      <td>${thanhTien4}</td>
    </tr>
  </tbody>
    <tfoot>
    <tr>
      <th colspan="4" class="text-right" scope="col">TỔNG TIỀN: <span class="text-danger">${tienTetotal}</span></th>
    </tr>
  </tfoot>
</table>`;
};
