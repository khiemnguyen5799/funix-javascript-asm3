'use strict'

const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const btnSubmit = document.getElementById('btn-submit');

////////////////////////////////////////////////////////////////
// Bắt sự kiện click vô nút Login
btnSubmit.addEventListener('click', function () {
  // kiểm tra xem người dùng đã nhập đủ username và passworld hay chưa.
  const isValidate = validate();
  if (isValidate) {
    // tìm kiếm trong userArr thông tin user người dùng đăng nhập
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );

    if (user) {
      alert('Đăng nhập thành công !');

      // Lưu xuống localStorage
      saveToStorage('currentUser ', user);

      // chuyển hướng về trang chủ
      window.location.assign('../index.html');
    } else {
      alert('Thông tin đăng nhập không đúng , xin vui lòng kiểm tra lại coi !');
    }
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hàm validate dữ liệu nhập vào của người dùng
function validate() {
  let isValidate = true;
  if (inputUsername.value === '') {
    alert('Vui lòng nhập Username !');
    isValidate = false;
  }

  if (inputPassword.value === '') {
    alert('Vui lòng nhập Password !');
    isValidate = false;
  }
  return isValidate;
}