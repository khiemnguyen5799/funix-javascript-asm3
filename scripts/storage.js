'use strict'
///////////////////////////////////////////////////
// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu userArr từ LocalStorege
const users = getFromStorage('userArr') ? getFromStorage('userArr') : [];
// console.log(users);

// chuyển đổi về dạng class instance
const userArr = users.map((user) => parseUser(user));
// nó sẽ trả về 1 mảng chứa các instance của class User
//  instance : phiên bản
// console.log(userArr);

// Lấy dữ liệu user đang đăng nhập
let currentUser  = getFromStorage('currentUser ')
  ? parseUser(getFromStorage('currentUser '))
  : null;
console.log(currentUser );
// lấy dữ liệu todoArr từ localStorage
const todos = getFromStorage('todoArr') ? getFromStorage('todoArr') : [];

// Chuyển đổi về dạng Class Instance
const todoArr = todos.map((todo) => parseTask(todo));

////////////////////////////////////////////////////////

// hàm chuyển từ Obj sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    // thêm 2 tính năng này để làm tính năng số 9
    userData.pageSize,
    userData.category,
  );
  return user;
}

//////////////////////////////////////////////////////////////////
//  hàm chuyển đổi từ Js sang Class Instance của task Class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}