'use strict'

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

displayHome();

//////////////////////////////////////////////////////////////////////////

/**
 * Hàm hiện thị nội dung lên trang Home
 */
function displayHome() {
  // nếu có người dùng đăng nhập thì ẩn 'loginModal' và hiện 'mainContent'
  
  if (currentUser) {
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';
    // Thêm thông báo welcomeMessage
    welcomeMessage.textContent = `Welcome ${currentUser.firstname}`;

    // nếu có người dùng đăng nhập thì ẩn 'mainContent' và hiện 'loginModal' 
  } else {
    loginModal.style.display = 'block';
    mainContent.style.display = 'none'
  }
}

///////////////////////////////////////////////////////////////////
// bắt sự kiện ấn vào nút Logout
btnLogout.addEventListener('click',function(){
  const isLogout = confirm('Bạn chắc chắn muốn Logout chứ ?');
  if(isLogout){
    // khi không ai đăng nhập
    currentUser= null;

    // Lưu xuống localStorage
    saveToStorage('currentUser',currentUser)

    // hiện thị trang home ở dạng chưa có user đăng nhập
    displayHome();
  }
})