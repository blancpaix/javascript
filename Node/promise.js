import { resolve } from "path/posix";

function getData(cbFunc) {
  $.get('url주소...', (response) => {
    cbFunc(response);
  })
};

getData(function (tableData) {
  console.log(tableData);
});

// 프로미스를 적용해서 변환을 하면

function getDataPromise(cb) {
  return new Promise((resolve, reject) => {
    $.get('urlAddress..', response => {
      resolve(response);
    })
  })
};

getDataPromise().then(tableData => {
  console.log(tableData);
});


new Promise(); // 호출 시 언제나 값을 받을 대기 상태가 되는거임