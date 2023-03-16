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


/* 배지 & ScrollTo */
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () { // _.throttle(함수, 실행시간): lodash library를 통해 사용할 수 있는 기능으로, scroll 이벤트를 쓸 때 많이 사용.
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기!
    //gsap.to(요소, 지속시간, 옵션(객체형식));
    gsap.to(badgeEl, .6, {
      opacity: 0, //opacity: 0은 화면에서는 보이지 않아도 그 자리에 그대로 있기 때문에 클릭이 가능함.
      display: 'none' //그래서, display: 'none' 추가.
    });
    // ScrollTo 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0 
    });
  } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // ScrollTo 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100 //x축으로 100px
    });
  }
}, 300));

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  })
});


/* 비주얼 이미지 */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  //gsap.to(요소, 지속시간, 옵션(객체형식));
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //이미지가 순차적으로 보여지게 하기 위해 0.7, 1.4, 2.1, 2.7초 이렇게 순차적으로 동작.
    opacity: 1
  });
});


/* Swiper */ 
//Swiper library 사용: new Swiper(선택자, 옵션(객체형식));
new Swiper('.notice-line .swiper-container', { 
  direction: 'vertical', //방향: 수직
  autoplay: true, //자동 재생
  loop: true //반복 여부 
}); 

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어 가능 여부 
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'  
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'  
  }
});


/* 슬라이드 영역 토글 */ 
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

//.toggle-promotion 요소를 클릭하면 .promotion 요소가 숨김/보여지게(CSS로 제어) 처리.
promotionToggleBtn.addEventListener('click', function () { 
  isHidePromotion = !isHidePromotion //기존값인 false의 반대값인 true로 바뀌어서 다시 isHidePromotion 할당.
  if (isHidePromotion) {
    //숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    //보임 처리!
    promotionEl.classList.remove('hide');
  }
});


/* 플로팅 애니메이션 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  gsap.to(
    selector,  //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      y: size, // y축
      repeat: -1, // -1: 무한 반복.
      yoyo: true, //위 아래로 움직임.
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 5, 15);
floatingObject('.floating3', 1.5, 20);


/* ScrollMagic */
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정.
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


/* footer 부분 년도 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //현재 년도(2023)를 thisYear에 할당.