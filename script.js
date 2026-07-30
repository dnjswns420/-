/* ==========================
   메뉴 열기 / 닫기
========================== */

function toggleMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("show");

}


/* ==========================
   페이지 이동
========================== */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });


    const targetPage = document.getElementById(pageName);

    if (targetPage) {
        targetPage.classList.add("active");
    }


    // 메뉴 닫기
    const menu = document.getElementById("menu");

    menu.classList.remove("show");


    // 페이지 맨 위로 이동
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================
   관광지 상세보기
========================== */

function openPlace(placeName) {

    alert(
        "📍 " + placeName +
        "\n\n해양 생태 관광지 정보를 준비하고 있습니다."
    );

}


/* ==========================
   검색
========================== */

function searchPlace() {

    const input =
        document.getElementById("searchInput");

    const keyword =
        input.value.trim();


    if (keyword === "") {

        alert("검색할 장소를 입력해주세요.");

        return;
    }


    alert(
        "🔎 '" +
        keyword +
        "'을(를) 검색했습니다.\n\n" +
        "검색 기능은 다음 단계에서 더 발전시킬 예정입니다."
    );

}


/* ==========================
   AI 추천
========================== */

function aiRecommend() {

    alert(
        "🤖 AI 여행 추천\n\n" +
        "현재 위치와 날씨를 분석하여\n" +
        "나에게 맞는 해양 생태 관광 코스를 추천합니다.\n\n" +
        "AI 기능은 이후 단계에서 연결합니다."
    );

}


/* ==========================
   여행 코스
========================== */

function startCourse() {

    alert(
        "🧭 해양 생태 반나절 코스\n\n" +
        "① 을숙도\n" +
        "↓\n" +
        "② 다대포해수욕장"
    );

}


/* ==========================
   나만의 코스
========================== */

function createCourse() {

    alert(
        "✏️ 나만의 코스 만들기\n\n" +
        "관광지를 선택하여\n" +
        "나만의 부산 해양 여행 코스를 만들어보세요."
    );

}


/* ==========================
   시작 시 실행
========================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

    }
);
