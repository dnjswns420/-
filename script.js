/* ==========================
   메뉴
========================== */

function toggleMenu() {

    const menu =
        document.getElementById("menu");

    menu.classList.toggle("show");

}



/* ==========================
   페이지 이동
========================== */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const targetPage =
        document.getElementById(pageName);


    if (targetPage) {

        targetPage.classList.add("active");

    }


    const menu =
        document.getElementById("menu");

    menu.classList.remove("show");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });



    /* 지도 페이지 */

    if (pageName === "map") {

        setTimeout(function() {

            createMap();

            if (map) {

                map.invalidateSize();

            }

        }, 300);

    }



    /* 코스 페이지 */

    if (pageName === "course") {

        setTimeout(function() {

            createCourseMap();

            if (courseMap) {

                courseMap.invalidateSize();

            }

        }, 300);

    }

}



/* ==========================
   관광지 상세보기
========================== */

function openPlace(placeName) {

    alert(
        "📍 " +
        placeName +
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

        alert(
            "검색할 장소를 입력해주세요."
        );

        return;

    }


    alert(
        "🔎 '" +
        keyword +
        "'을(를) 검색했습니다."
    );

}



/* ==========================
   AI 추천
========================== */

function aiRecommend() {

    alert(
        "🤖 AI 여행 추천\n\n" +
        "현재 위치와 날씨를 분석하여\n" +
        "나에게 맞는 해양 생태 관광 코스를 추천합니다."
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
   메인 지도
========================== */

let map = null;



function createMap() {

    /* 이미 만들어졌으면 다시 만들지 않음 */

    if (map !== null) {

        return;

    }


    /* 부산 중심 */

    map =
        L.map("mapArea").setView(
            [35.10, 129.05],
            11
        );


    /* 지도 배경 */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);



    /* ==========================
       을숙도
    ========================== */

    L.marker([
        35.1034,
        128.9477
    ])
    .addTo(map)
    .bindPopup(
        "<b>🌿 을숙도</b><br>" +
        "낙동강 하구의 생태 관광지"
    );



    /* ==========================
       다대포
    ========================== */

    L.marker([
        35.0464,
        128.9658
    ])
    .addTo(map)
    .bindPopup(
        "<b>🌊 다대포해수욕장</b><br>" +
        "부산의 대표적인 해양 관광지"
    );



    /* ==========================
       태종대
    ========================== */

    L.marker([
        35.0517,
        129.0870
    ])
    .addTo(map)
    .bindPopup(
        "<b>🌲 태종대</b><br>" +
        "해안 절벽과 자연경관을 볼 수 있는 관광지"
    );



    /* ==========================
       오륙도
    ========================== */

    L.marker([
        35.1012,
        129.1235
    ])
    .addTo(map)
    .bindPopup(
        "<b>🏝️ 오륙도</b><br>" +
        "부산의 대표적인 해양 경관 명소"
    );

}



/* ==========================
   코스 지도
========================== */

let courseMap = null;



function createCourseMap() {

    /* 이미 만들어졌으면 다시 만들지 않음 */

    if (courseMap !== null) {

        return;

    }


    courseMap =
        L.map("courseMap").setView(
            [35.08, 129.02],
            11
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(courseMap);

}



/* ==========================
   코스 선택
========================== */

function showCourseRoute(courseName) {

    createCourseMap();


    /* 기존 핀과 경로 삭제 */

    courseMap.eachLayer(
        function(layer) {

            if (
                layer instanceof L.Marker ||
                layer instanceof L.Polyline
            ) {

                courseMap.removeLayer(layer);

            }

        }
    );


    let locations = [];



    /* ==========================
       생태 코스
    ========================== */

    if (courseName === "eco") {

        locations = [

            {
                name: "🌿 을숙도",

                lat: 35.1034,

                lng: 128.9477,

                description:
                    "낙동강 하구의 생태 관광지"
            },


            {
                name: "🌊 다대포해수욕장",

                lat: 35.0464,

                lng: 128.9658,

                description:
                    "부산의 대표적인 해양 관광지"
            }

        ];

    }



    /* ==========================
       해안 자연 코스
    ========================== */

    if (courseName === "coast") {

        locations = [

            {
                name: "🏝️ 오륙도",

                lat: 35.1012,

                lng: 129.1235,

                description:
                    "부산의 대표적인 해양 경관 명소"
            },


            {
                name: "🌲 태종대",

                lat: 35.0517,

                lng: 129.0870,

                description:
                    "해안 절벽과 자연경관을 볼 수 있는 관광지"
            }

        ];

    }



    /* ==========================
       관광지 핀
    ========================== */

    locations.forEach(
        function(place) {

            L.marker([
                place.lat,
                place.lng
            ])
            .addTo(courseMap)
            .bindPopup(
                "<b>" +
                place.name +
                "</b><br>" +
                place.description
            );

        }
    );



    /* ==========================
       경로선
    ========================== */

    const routePoints =
        locations.map(
            function(place) {

                return [
                    place.lat,
                    place.lng
                ];

            }
        );


    L.polyline(
        routePoints,
        {
            weight: 5
        }
    ).addTo(courseMap);



    /* ==========================
       경로가 화면에 들어오도록
    ========================== */

    courseMap.fitBounds(
        routePoints,
        {
            padding: [
                40,
                40
            ]
        }
    );



    setTimeout(
        function() {

            courseMap.invalidateSize();

        },
        300
    );

}



/* ==========================
   앱 시작
========================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

    }
);
