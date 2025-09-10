const API_KEY = "8cc793823d2607c7258468c568cef857";

function loadBooks(query, containerId) {
  fetch(`https://dapi.kakao.com/v3/search/book?target=title&size=10&query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `KakaoAK ${API_KEY}` }
  })
    .then(res => res.json())
    .then(data => {
      const wrapper = document.querySelector(`#${containerId} .swiper-wrapper`);
      wrapper.innerHTML = "";

      data.documents.forEach(book => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="book-card">
            <img src="${book.thumbnail || 'https://dummyimage.com/200x300/ddd/aaa&text=No+Image'}" alt="${book.title}">
            <div class="meta">
              <div class="book-title">${book.title}</div>
              <div class="book-authors">${book.authors.join(", ") || "저자 미상"}</div>
            </div>
          </div>
        `;
        wrapper.appendChild(slide);
      });

      new Swiper(`#${containerId}`, {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
          nextEl: `#${containerId} .swiper-button-next`,
          prevEl: `#${containerId} .swiper-button-prev`,
        },
        pagination: {
          el: `#${containerId} .swiper-pagination`,
          clickable: true,
        },
      });
    })
    .catch(err => console.error("API 호출 에러", err));
}


loadBooks("오늘의 책", "book-list-1");
loadBooks("새로운 책", "book-list-2");
loadBooks("인기", "book-list-3");
loadBooks("추천 도서", "book-list-4");
loadBooks("급상승 도서", "book-list-5");
loadBooks("인기 도서", "book-list-6");
loadBooks("문구", "book-list-7");
loadBooks("정가 인하", "book-list-8");
loadBooks("베스트셀러", "book-list-best");