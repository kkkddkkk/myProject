document.addEventListener('DOMContentLoaded', function () {
    //버튼
    window.findPWBtn = document.querySelector('.findPWBtn');//아이디 찾기 창 -> 비밀번호 찾기 버튼
    window.changePw = document.querySelector('.changePw');//비밀번호 찾기 창 -> 확인 버튼
    window.backToLogIn = document.querySelector('.backToLogIn');//뒤로가기 버튼(공통)

    //창
    window.box = document.querySelector('.box');



    //애니메이션 부여
    //#region

    //0.3초 후 페이지 전환 에니메이션(switchPage(page))
    //#region
    window.switchPage = function (page) {
        setTimeout(() => {
            location.href = page;
        }, 300)
    }
    //#endregion


    //뒤로가기 버튼 클릭 애니메이션 부여
    //#region
    backToLogIn.addEventListener('click', () => {
        //비밀번호 찾기 창 fade out
        box.classList.remove('fadeIn');
        box.classList.add('fadeOut');

        //뒤로가기 버튼 fade out
        backToLogIn.classList.remove('fadeIn');
        backToLogIn.classList.add('fadeOut');

        switchPage('login.html');
    })
    //#endregion

    //#endregion ---------------->애니메이션 부여 끝.

    //기타(타이머, 인증번호)
    let timerID;
    window.certNum;//인증번호
    window.stopTimer = 0;//타이머 멈춤

    //정규식
    window.regId = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;//ID 정규식
    window.regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식
    window.regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;//이메일 정규식



    //5분 타이머 함수 (timer5min())
    //#region
    window.timer5min = function (timeChk) {
        let sec = 0;
        let displaySec;
        let min = 5

        clearInterval(timerID);

        timerID = setInterval(() => {
            if (stopTimer == 1) {
                timeChk.innerHTML = `&nbsp;`;
                return;
            }

            if (sec == 0 && min == 0) {
                timeChk.innerHTML = `* 00 : 00`;
                clearInterval();
                return;
            }

            if (sec == 0 && min >= 0) {
                sec = 60;
                min--
            }
            sec--;
            displaySec = sec === 60 ? 0 : sec;

            timeChk.innerHTML = `* ${String(min).padStart(2, "0")} : ${String(displaySec).padStart(2, "0")}`;
        }, 1000)
    }
    //#endregion
})