const API_KEY = "8cc793823d2607c7258468c568cef857";

// 섹션별 책을 불러오는 함수
function loadBooks(query, containerId) {
    fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${query}`, {
        headers: { Authorization: API_KEY }
    })
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector(`#${containerId} .swiper-wrapper`);
            container.innerHTML = ""; // 초기화

            data.documents.slice(0, 12).forEach(book => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `
                    <img src="${book.thumbnail}" alt="${book.title}">
                    <div class="book-title">${book.title}</div>
                    <div class="book-authors">${book.authors.join(", ")}</div>
                `;
                container.appendChild(slide);
            });
            new Swiper(`#${containerId}`, {
                slidesPerView: 6,
                spaceBetween: 10,
                pagination: {
                    el: `#${containerId} .swiper-pagination`,
                    clickable: true,
                },
            });
        })
        .catch(err => console.error("API 호출 에러", err));
}

// 섹션별 도서 로딩
loadBooks("추천", "book-list-1");
loadBooks("베스트셀러", "book-list-2");
loadBooks("신간", "book-list-3");
loadBooks("인기 검색어", "book-list-4");
loadBooks("MD 추천 도서", "book-list-5");
loadBooks("급상승 도서", "book-list-6");
loadBooks("hot book", "book-list-7");
loadBooks("독자들의 선택", "book-list-8");
loadBooks("문구 GIFT 시즌 상품", "book-list-9");
loadBooks("정가 인하 도서", "book-list-10");
