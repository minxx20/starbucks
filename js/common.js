/* search 창 */ 
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input'); // .search를 담아둔 searchEl 안에 있는 input 태그를 찾음.

searchEl.addEventListener('click', function () { // .search를 클릭하면 
  searchInputEl.focus(); // .search 안에 있는 input 요소를 자동으로 포커스.
});

searchInputEl.addEventListener('focus', function () { // .search 안에 있는 input 요소가 포커스 되면,
  searchEl.classList.add('focused'); // .search에 focused 라는 클래스를 추가.
  searchInputEl.setAttribute('placeholder', '통합검색'); // input 요소에 placeholder="통합검색" 속성 지정.
});

searchInputEl.addEventListener('blur', function () { // .search 안에 있는 input 요소에 포커스가 해제되면,
  searchEl.classList.remove('focused'); // .search에 focused 라는 클래스를 제거.  
  searchInputEl.setAttribute('placeholder', ''); // input 요소에 placeholder="통합검색"을 빈  값으로 지정.
});

/* footer 부분 년도 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //현재 년도(2023)를 thisYear에 할당.