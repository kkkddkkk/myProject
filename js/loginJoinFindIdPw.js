document.addEventListener('DOMContentLoaded', function () {
    //버튼
    window.changePw = document.querySelector('.changePw');//비밀번호 찾기 창 -> 확인 버튼
    window.backToLogIn = document.querySelector('.backToLogIn');//뒤로가기 버튼(공통)

    //창
    window.box = document.querySelector('.box');
    window.wrap = document.querySelector('.wrap');

    //기타(타이머, 인증번호)
    let timerID;//
    window.certNum;//인증번호
    window.stopTimer = 0;//타이머 멈춤

    //정규식
    window.regId = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;//ID 정규식
    window.regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식
    window.regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;//이메일 정규식


    //페이지 전환 애니메이션 
    //#region
    window.switchPage = function (page) {
        wrap.classList.remove('fadeIn');
        wrap.classList.add('fadeOut');

        wrap.addEventListener('animationend', () => {
            wrap.style.display = 'none';
            location.href = page;
        })
    }
    //#endregion

    backToLogIn.addEventListener('click', () => {
        switchPage('logIn.html');
    })

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


    //ID 검증(function chkId(idInput, idMsg, idCheck))
    //#region
    window.chkId = function (idInput, idMsg, idCheck) {

        if (idInput.value.length == 0) {//ID란이 공란이면 기본 스타일
            idInput.classList.remove('erMsg');
            idMsg.innerHTML = "&nbsp;";
            idCheck.classList.add('deact')
        } else if (idInput.value.length < 6 || idInput.value.length > 20) {//글자 수 조건 어길 시 에러 스타일
            idInput.classList.add('erMsg');
            idMsg.innerHTML = "* ID는 6자~20자로 작성해주세요.";
            idCheck.classList.add('deact')
        } else {
            if (!regId.test(idInput.value)) {//영숫자 조건 어길 시 에러 스타일
                idInput.classList.add('erMsg');
                idMsg.innerHTML = "* ID는 영어, 숫자로만 작성해주세요.";
                idCheck.classList.add('deact')
            } else {//조건 모두 충족할 시 기본 스타일 스타일
                idInput.classList.remove('erMsg');
                idMsg.innerHTML = "&nbsp;";
                idCheck.classList.remove('deact')
            }
        }
    }
    //#endregion

    //PW 검증(function chkPw(writePwInput, chkPwInput, pwMsg1, pwMsg2))
    //#region
    window.chkPw = function (writePwInput, chkPwInput, pwMsg1, pwMsg2) {
        if (writePwInput.value.length == 0) {//작성란 공란일 시 작성란 기본스타일 / 확인란 비활성화
            writePwInput.classList.remove('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            chkPwInput.disabled = true;
        } else if (writePwInput.value.length < 8 || writePwInput.value.length > 15) {//글자 수 조건 미충족 시 에러 스타일 + 확인란 비활성화
            writePwInput.classList.add('erMsg');
            pwMsg1.innerHTML = "* 비밀번호는 8자~15자로 작성해주세요.";
            chkPwInput.disabled = true;
        } else {
            if (!regPw.test(writePwInput.value)) {//정규식 미충족 시 에러 스타일 + 확인란 비활성화
                writePwInput.classList.add('erMsg');
                pwMsg1.innerHTML = "* 영어, 숫자, 특수문자를 모두 활용해주세요.";
                chkPwInput.disabled = true;
            } else {//조건 충족 시 작성란 기본스타일 / 확인란 활성화
                writePwInput.classList.remove('erMsg');
                pwMsg1.innerHTML = "&nbsp;";
                chkPwInput.disabled = false;
            }
        }

        if (chkPwInput.value != writePwInput.value && !chkPwInput.value == '') {//확인란 작성 후 작성란 수정 시 확인란 에러스타일
            chkPwInput.classList.add('erMsg');
            pwMsg2.innerHTML = "* 비밀번호가 일치하지 않습니다.";
            pwMsg1.innerHTML = "&nbsp;";
        }

        if (chkPwInput.disabled == true) {//확인란 비활성화 시 기본스타일 / 내용 삭제
            chkPwInput.classList.remove('erMsg');
            pwMsg2.innerHTML = "&nbsp;";
            chkPwInput.value = '';
        }
    }
    //#endregion

    //PW 작성란 == 확인란 검증(function chkPw2(chkPwInput, writePwInput, pwMsg1, pwMsg2))
    //#region
    window.chkPw2 = function (chkPwInput, writePwInput, pwMsg1, pwMsg2) {
        if (chkPwInput.value.length == 0) {//확인란 공란일 시 기본스타일
            chkPwInput.classList.remove('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            pwMsg2.innerHTML = "&nbsp;";
        } else if (chkPwInput.value != writePwInput.value) {//작성란 != 확인란일 시 에러스타일
            chkPwInput.classList.add('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            pwMsg2.innerHTML = "* 비밀번호가 일치하지 않습니다.";
        } else {//작성란 == 확인란일 시 기본스타일
            chkPwInput.classList.remove('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            pwMsg2.innerHTML = "* 확인되었습니다.";
        }
    }
    //#endregion

    //PW 아이콘 visible/invisible 토글 + input type 변경(function iconChange(icon, pwInput))
    //#region
    window.iconChange = function (icon, pwInput) {
        icon.src = 'img/visible.png';
        if (icon.classList.contains('visible')) {//visible 클릭 시 이벤트
            icon.classList.remove('visible');
            icon.src = 'img/invisible.png';
            pwInput.type = 'password'
        } else {//invisible 클릭 시 이벤트
            icon.classList.add('visible');
            pwInput.type = 'text'
        }
    }
    //#endregion

    //이메일 검증(function chkEmail(emailInput, emailMsg, emailCheck))
    //#region
    window.chkEmail = function (emailInput, emailMsg, emailCheck) {
        if (emailInput.value.length == 0) {//이메일이 공란이면 기본 스타일 
            emailInput.classList.remove('erMsg');
            emailMsg.innerHTML = "&nbsp;";
            emailCheck.classList.add('deact');
        } else {
            if (!regEmail.test(emailInput.value)) {//정규식과 맞지 않으면 에러 스타일
                emailInput.classList.add('erMsg');
                emailMsg.innerHTML = "* E-MAIL 형식이 올바르지 않습니다.";
                emailCheck.classList.add('deact');
            } else {//정규식에 부합하면 기본스타일
                emailInput.classList.remove('erMsg');
                emailMsg.innerHTML = "&nbsp;";
            }
        }
    }
    //#endregion

    //인증번호 전송(function sendCert(emailCheck, emailMsg))
    //#region
    window.sendCert = function (emailCheck, emailMsg) {
        if (!emailCheck.classList.contains('deact')) {
            certNum = parseInt(Math.random() * 1000000)// 6자리 인증번호

            console.log(certNum);
            alert('인증번호를 발송하였습니다.');
            emailCheck.innerHTML = '인증번호 재전송';

            emailMsg.innerHTML = `* 05 : 00`;
            timer5min(emailMsg);

            if (emailMsg.innerHTML == `* 00 : 00`) {
                alert(`인증번호 유효기간이 지났습니다.\n'인증번호 재전송' 버튼을 눌러주세요.`);
                certNum = 1234567;
            }

        }
    }
    //#endregion

    //인증번호 검증(function chkCert(certMsg, certInput, afterCert) / afterCert는 함수)
    //#region
    window.chkCert = function (certMsg, certInput, afterCert) {
        certMsg.innerHTML = `&nbsp;`;
        if (certInput.value == certNum) {
            afterCert();
        } else {
            certMsg.innerHTML = '* 인증번호가 일치하지 않습니다.';
            certInput.classList.add('erMsg');
        }
    }
    //#endregion


})