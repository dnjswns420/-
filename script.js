/* ==========================
   메뉴
========================== */

function toggleMenu() {

    const menu =
        document.getElementById("menu");

    menu.classList.toggle("show");

}


/* ==========================
   지도 변수
========================== */

let map = null;

let courseMap = null;

let userMarker = null;


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


    if (pageName === "map") {

        setTimeout(function() {

            createMap();

            if (map) {

                map.invalidateSize();

            }

        }, 300);

    }


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
        "나에게 맞는 부산 해양 생태 관광 코스를 추천합니다."
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

function createMap() {

    if (map !== null) {

        return;

    }


    map =
        L.map("mapArea").setView(
            [35.10, 129.05],
            11
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }
    ).addTo(map);


    /* 을숙도 */

    L.marker([
        35.1034,
        128.9477
    ])
    .addTo(map)
    .bindPopup(
        "<b>🌿 을숙도</b><br>" +
        "낙동강 하구의 생태 관광지"
    );


    /* 다대포 */

    L.marker([
        35.0464,
        128.9658
    ])
    .addTo(map)
    .bindPopup(
        "<b>🌊 다대포해수욕장</b><br>" +
        "부산의 대표적인 해양 관광지"
    );


    /* 태종대 */

    L.marker([
        35.0517,
        129.0870
    ])
    .addTo(map)
    .bindPopup(
        "<b>🌲 태종대</b><br>" +
        "해안 절벽과 자연경관을 볼 수 있는 관광지"
    );


    /* 오륙도 */

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
   현재 위치 찾기
========================== */

function findMyLocation() {

    const info =
        document.getElementById("locationInfo");


    /* 브라우저가 위치 기능을 지원하는지 확인 */

    if (!navigator.geolocation) {

        info.innerHTML =
            "❌ 이 기기에서는 현재 위치 기능을 사용할 수 없습니다.";

        return;

    }


    info.innerHTML =
        "📍 현재 위치를 확인하는 중입니다...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            /* 기존 내 위치 핀이 있다면 삭제 */

            if (userMarker !== null) {

                map.removeLayer(userMarker);

            }


            /* 내 위치 표시 */

            userMarker =
                L.marker([
                    latitude,
                    longitude
                ])
                .addTo(map)
                .bindPopup(
                    "<b>📍 현재 위치</b><br>" +
                    "현재 내가 있는 위치입니다."
                );


            /* 지도 중심을 현재 위치로 이동 */

            map.setView(
                [
                    latitude,
                    longitude
                ],
                14
            );


            /* 위치 정보 표시 */

            info.innerHTML =
                "<b>📍 현재 위치 확인 완료</b><br>" +
                "위도: " +
                latitude.toFixed(5) +
                "<br>" +
                "경도: " +
                longitude.toFixed(5);


            userMarker.openPopup();

        },


        function(error) {

            if (error.code === 1) {

                info.innerHTML =
                    "⚠️ 위치 권한이 거부되었습니다.<br>" +
                    "브라우저에서 위치 권한을 허용해주세요.";

            }

            else {

                info.innerHTML =
                    "⚠️ 현재 위치를 확인하지 못했습니다.";

            }

        },

        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );

}


/* ==========================
   코스 지도
========================== */

function createCourseMap() {

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


    /* 생태 코스 */

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


    /* 해안 자연 코스 */

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


    /* 핀 표시 */

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


    /* 경로 표시 */

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
