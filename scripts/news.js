'use strict'

// Chưa đăng nhập nên chưa thể đọc được tin tức
if (currentUser) {
  const newsContainer = document.getElementById('news-container');
  const btnPrev = document.getElementById('btn-prev');
  const pageNum = document.getElementById('page-num');
  const btnNext = document.getElementById('btn-next');

  // biến này để tính số News tối đa trả về từ Api
  let totaResults = 0;

  getDataNews('us', 1);

  //////////////////////////////////////////////////////
  //  Hàm lấy dữ liệu Data News từ API và hiện thị list News
  async function getDataNews(country, page) {
    try {
      // Kết nối với API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&page=${page}&apiKey=2bfd5e0ad6b1405fa11def4ab2ef3a11`
      );
      const data = await res.json();

      // gọi hàm để hiện thị list news
      displayNewList(data);

      // Bắt lỗi 
    } catch (err) {
      // thông báo lỗi
      alert('Error:' + err.message);
    }
  }


  /////////////////////////////////////////////////////////////////////////////////////
  // hàm kiểm tra điều kiện ẩn và ấn nút Previous
  function checkBtnPrev() {
    // Nếu page Number là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = 'block';
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // hàm kiểm tra điều kiện ẩn và ấn nút Next
  function checkBtnNext() {
    // Nếu page Number 
    // method math.ceil để làm tròn số
    if (pageNum.textContent == Math.ceil(totaResults / currentUser.pageSize)) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = 'block';
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  // Bắt sự kiện click vào nút Previous
  btnPrev.addEventListener('click', function () {
    // hiện thị dữ liệu và các News trước đó
    getDataNews('us', --pageNum.textContent);
  });

  //////////////////////////////////////////////////////////////////////////////////////
  // Bắt sự kiện click vào nút Next
  btnNext.addEventListener('click', function () {
    // hiện thị dữ liệu và các News trước đó
    getDataNews('us', ++pageNum.textContent);
  });

  //////////////////////////////////////////////////////////////////////////////////////
  // Hàm hiện thị List lên trang
  function displayNewList(data) {
    // Lấy giá trị cho biến totalResults
    totaResults = data.totaResults;
    // Kiểm tra xem có ẩn nút Next vs Prev chưa và ẩn đi
    checkBtnNext();
    checkBtnPrev();

    let html = '';
    // Tạo các code HTML các News để hiện thị
    // dùng ảnh tự tải để thay thế 1 số hình ảnh có giá trị đường dẫn không chính xác
    data.articles.forEach(function (article) {
      html +=`
        <div id='new-container'>
          <div class='img-banner'>
            <img src=${article.urlToImage
              ? article.urlToImage
              : 'hinh-anh-nen-con-meo-cute.jpg'
            } alt='sai' />
          </div>

          <div class='content'>
            <h4>${article.title}</h4>
            <p>${article.description}</p>
            <button><a href=${article.url} target='_blank'>View</a></button>
          </div>
        </div>
      `;
    });

    newsContainer.innerHTML = html;
  }
  // Nếu người dùng chưa đăng nhập thì thông báo
} else {
  alert('Vui lòng Đăng nhập hoặc Đăng ký để truy cập ứng dụng !');
  window.location.assign('../index.html');
}