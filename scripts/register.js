'use strict'

const inputFirstname = document.getElementById('input-firstname');
const inputLastname = document.getElementById('input-lastname');
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputPasswordConfirm = document.getElementById('input-password-confirm');
const btnSubmit = document.getElementById('btn-submit');

/////////////////////////////////////////////////////////
// Bắt sự kiện ấn vào nút register
btnSubmit.addEventListener('click', function () {
  // Lấy dữ liệu nhập vào từ người dùng
  // từ khóa new tạo ra 1 đối tượng trống mới
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value,
  );

  // Check validate
  const isValidate = validate(user);

  if (isValidate) {
    // thêm user vào mảng userArr
    userArr.push(user);

    // lưu dữ liệu lại xuống localStorage
    saveToStorage('userArr', userArr);

    alert('Đăng kí thành công !');

    // Điều hướng sang trang Login
    window.location.assign('../pages/login.html')
    // cách 2
    //  window.location.href = ('../pages/login.html')
  }
});

//////////////////////////////////////////////////////////////////////////////
// hàm validate thông  tin đăng kí của người dùng nhập vào form
function validate(user) {
  let isValidate = true;

  // 1.Không có trường hợp nào bị bỏ trống
  if (user.firstname.trim().length === 0) {
    alert('Vui lòng nhập First Name !');
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert('Vui lòng nhập Last Name !');
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert('Vui lòng nhập User Name !');
    isValidate = false;
  }

  // Không sử  dụng method .trim().length === 0 vì yêu cầu passwork có nhiều hơn 8 kí tự nên dấu khoảng trắng cx đc tính thỏa mãn yêu cầu đề bài
  if (user.password === "") {
    alert('Vui lòng nhập PassWord !');
    isValidate = false;
  }
  if (inputPasswordConfirm.value === "") {
    alert('Vui lòng nhập Confirm Password !');
    isValidate = false;
  }

  // 2. không đc trùng với username trước
  // Phương thức array every sẽ trả về true nếu thỏa mãn hàm kiểm tra đã cho
  if (
    !userArr.every((item) => (item.username !== user.username ? true : false))
  ) {
    alert('User Name đã tồn tại !!');
    isValidate = false;
  }
  // nếu dùng for thì duyệt qua mảng userarr và kiểm tra trên từng phần tử
  // for (let i = 0; i < userArr.length; i++) {
  //   if (userArr[i].username === user.username) {
  //     alert('User Name đã tồn tại !!');
  //     isValidate = false;
  // break;
  //   }
  // }



  //3. bắt buộc mật khẩu và confim phải giống nhau
  if (user.password !== inputPasswordConfirm.value) {
    alert('Password và Confirm Password phải giống nhau !');
    isValidate = false;
  }

  // 4.Password phải có nhiều hơn 8 kí tự
  if (user.password.length <= 8) {
    alert('Password phải có nhiều hơn 8 kí tự !');
    isValidate = false;
  }
  return isValidate;
}
