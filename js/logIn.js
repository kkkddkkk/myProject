document.addEventListener('DOMContentLoaded', function () {



    //ID, PW 공란일 시 비활성화
    let idInput, pwInput, logInBtn, newId, findId, findPw;
    idInput = document.querySelectorAll('.IDPW')[0];//ID 입력란
    pwInput = document.querySelectorAll('.IDPW')[1];//PW 입력란
    logInBtn = document.querySelector('.logInBtn');//로그인 버튼
    newId = document.querySelector('.newId');//회원가입
    findId = document.querySelector('.findId');//아이디 찾기
    findPw = document.querySelector('.findPw');//비밀번호 찾기
    //ID, PW 공란일 시 비활성화 끝.


    //애니메이션 관련 javascript
    let bgBlock = document.querySelector('.bgBlock');//배경 도형
    let blackCover = document.querySelector('.blackCover');//검은 배경(애니메이션 용)
    let joinUs, findIdWindow, findPwWindow, findPWBtn, changePw, backToLogIn;

    //#region [애니메이션 부여]
    //로그인 버튼 호버링/클릭 애니메이션 부여
    logInBtn.addEventListener('mouseenter', () => {
        recoilSpeed = 0;
        animateRecoil();
    })
    logInBtn.addEventListener('mouseleave', () => {
        recoilSpeed = 0;
        animateBack();
    })

    logInBtn.addEventListener('click', () => {
        bgBlock.style.zIndex = '1';
        position = 0;
        width = 20;
        acceleration = 0.22;

        animate();
    })//로그인 버튼 애니메이션 끝끝

    //회원가입 버튼 호버링/클릭 애니메이션 부여
    joinUs = document.querySelector('.joinUs');//회원가입 창

    newId.addEventListener('mouseenter', () => {
        recoilSpeed = 0;
        animateRecoil();
    })
    newId.addEventListener('mouseleave', () => {
        recoilSpeed = 0;
        animateBack();
    })

    newId.addEventListener('click', () => {
        bgBlock.style.zIndex = '1';
        position = 0;
        width = 20;
        acceleration = 0.22;
        animate();

        //회원가입 창 fade in
        joinUs.classList.remove('fadeOut');
        backToLogIn.classList.remove('fadeOut');
        joinUs.classList.add('fadeIn');
        backToLogIn.classList.add('fadeIn');
    })//회원가입 버튼 애니메이션 끝.

    //아이디 찾기 버튼 호버링/클릭 애니메이션 부여
    findIdWindow = document.querySelector('.findIdWindow');//아이디 찾기 창

    findId.addEventListener('mouseenter', () => {
        recoilSpeed = 0;
        animateRecoil();
    })
    findId.addEventListener('mouseleave', () => {
        recoilSpeed = 0;
        animateBack();
    })
    findId.addEventListener('click', () => {
        bgBlock.style.zIndex = '1';
        position = 0;
        width = 20;
        acceleration = 0.22;
        animate();

        //아이디 찾기 창 fade in
        findIdWindow.classList.remove('fadeOut');
        backToLogIn.classList.remove('fadeOut');
        findIdWindow.classList.add('fadeIn');
        backToLogIn.classList.add('fadeIn');
    })//아이디 찾기 버튼 애니메이션 끝.


    //비밀번호 찾기 버튼 호버링/클릭 애니메이션 부여
    findPwWindow = document.querySelector('.findPwWindow');//비밀번호 찾기 창

    findPw.addEventListener('mouseenter', () => {
        recoilSpeed = 0;
        animateRecoil();
    })
    findPw.addEventListener('mouseleave', () => {
        recoilSpeed = 0;
        animateBack();
    })
    findPw.addEventListener('click', () => {
        bgBlock.style.zIndex = '1';
        position = 0;
        width = 20;
        acceleration = 0.22;
        animate();

        //비밀번호 찾기 창 fade in
        findPwWindow.classList.remove('fadeOut');
        backToLogIn.classList.remove('fadeOut');
        findPwWindow.classList.add('fadeIn');
        backToLogIn.classList.add('fadeIn');
    })//비밀번호 찾기 버튼 애니메이션 끝.


    //아이디 찾기 창 - 비밀번호 찾기 버튼 클릭 애니메이션 부여
    findPWBtn = document.querySelector('.findPWBtn');//비밀번호 찾기 버튼

    findPWBtn.addEventListener('click', () => {
        findIdWindow.classList.remove('fadeIn');
        findPwWindow.classList.remove('fadeOut');
        findIdWindow.classList.add('fadeOut');
        findPwWindow.classList.add('fadeIn');
    })//아이디 찾기 창 - 비밀번호 찾기 버튼 클릭 애니메이션 부여 끝

    //비밀번호 찾기 창 - 확인 버튼 클릭 애니메이션 부여
    changePw = document.querySelector('.changePw');//확인 버튼

    changePw.addEventListener('click', () => {
        findPwWindow.classList.remove('fadeIn');
        findPwWindow.classList.add('fadeOut');

        rewind();
        bgBlock.style.zIndex = '0';
    })//비밀번호 찾기 창 - 확인 버튼 클릭 애니메이션 부여 끝


    //뒤로가기 버튼 클릭 애니메이션 부여
    backToLogIn = document.querySelector('.backToLogIn');//뒤로가기 버튼

    backToLogIn.addEventListener('click', () => {
        //회원가입 창 fade out
        joinUs.classList.remove('fadeIn');
        joinUs.classList.add('fadeOut');

        // //아이디 찾기 창 fade out
        findIdWindow.classList.remove('fadeIn');
        findIdWindow.classList.add('fadeOut');

        //비밀번호 찾기 창 fade out
        findPwWindow.classList.remove('fadeIn');
        findPwWindow.classList.add('fadeOut');

        //뒤로가기 버튼 fade out
        backToLogIn.classList.remove('fadeIn');
        backToLogIn.classList.add('fadeOut');

        rewind();
        bgBlock.style.zIndex = '0';
    })//뒤로가기 버튼 애니메이션 끝.
    //#endregion


    //#region [애니메이션 function]

    let position = 0;
    let width = 20;
    let recoilSpeed = 0;
    let acceleration = 0.22;//감속도

    //반동 애니메이션1
    function animateRecoil() {
        recoilSpeed += 0.03;
        bgBlock.style.transform = `translateX(-${recoilSpeed}%)`;
        if (recoilSpeed >= 0.5) {
            return;
        }
        requestAnimationFrame(animateRecoil);
    }

    //화면전환 애니메이션
    function animate() {
        let speed = 5;//시작 속도

        speed -= acceleration;
        width += speed;
        position += speed;

        bgBlock.querySelector('.logInBG').style.transform = `translateX(${position}%)`;
        bgBlock.querySelector('.logInBG2').style.transform = `translateX(${position}%)`;
        blackCover.style.width = `${width}%`;

        if (position >= 80) {
            return;
        }
        requestAnimationFrame(animate);
    }

    //반동 애니메이션2
    function animateBack() {
        recoilSpeed += 0.03;
        bgBlock.style.transform = `translateX(${recoilSpeed}%)`;
        if (recoilSpeed >= 0.5) {
            return;
        }
        requestAnimationFrame(animateBack);
    }

    //화면 되돌리기 애니메이션
    function rewind() {
        let speed = 1;//시작 속도
        let localPosition = position;
        let localWidth = width;

        function reverseAni() {
            speed += acceleration;
            localWidth -= speed;
            localPosition -= speed;

            if (localPosition <= 0) {
                blackCover.style.width = `20%`;
                return;
            }

            bgBlock.querySelector('.logInBG').style.transform = `translateX(${localPosition}%)`;
            bgBlock.querySelector('.logInBG2').style.transform = `translateX(${localPosition}%)`;
            blackCover.style.width = `${Math.max(localWidth, 0)}%`;
            requestAnimationFrame(reverseAni);
        }
        requestAnimationFrame(reverseAni);
    }
    //애니메이션 function 끝.
    //애니메이션 관련 javascript 끝.
    //#endregion

    //#region [회원가입]
    //회원가입 창 관련 event
    let writePw, checkPw, nameInput, nameMsg, joinUsId, idCheck, joinUsPw, joinUsPwChk;
    let joinUsEmail, emailMsg;

    // 이름 10자 초과 시 안내문
    nameInput = joinUs.querySelector('.name');//이름 입력 인풋
    nameMsg = joinUs.querySelector('.nameMsg');//이름 오류 메세지

    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 10) {
            nameInput.classList.add('erMsg');
            nameMsg.innerHTML = "최대 10자까지 입력하실 수 있습니다.";

        } else {
            nameInput.classList.remove('erMsg');
            nameMsg.innerHTML = "&nbsp;";
        }
    })// 이름 10자 초과 시 안내문 끝.

    //ID 유효성 검사, 중복 확인
    joinUsId = joinUs.querySelector('.joinUsId').querySelector('input');//ID 입력 인풋
    idMsg = joinUs.querySelector('.idMsg');//ID 에러 메시지
    idCheck = joinUs.querySelector('.joinUsId').querySelector('div');//중복 확인 버튼

    //ID 유효성 검사
    joinUsId.addEventListener('input', () => {
        var regId = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;//ID 정규식

        if (joinUsId.value.length == 0) {
            joinUsId.classList.remove('erMsg');
            idMsg.innerHTML = "&nbsp;";
            idCheck.classList.add('deact')
        } else if (joinUsId.value.length < 6 || joinUsId.value.length > 20) {
            joinUsId.classList.add('erMsg');
            idMsg.innerHTML = "* ID는 6자~20자로 작성해주세요.";
            idCheck.classList.add('deact')
        } else {
            if (!regId.test(joinUsId.value)) {
                joinUsId.classList.add('erMsg');
                idMsg.innerHTML = "* ID는 영어, 숫자로만 작성해주세요.";
                idCheck.classList.add('deact')
            } else {
                joinUsId.classList.remove('erMsg');
                idMsg.innerHTML = "&nbsp;";
                idCheck.classList.remove('deact')
            }
        }
    })//ID 유효성 검사 끝.

    //ID 중복 검사
    idCheck.addEventListener('click', () => {

        if (!idCheck.classList.contains('deact')) {
            if (confirm('사용가능?')) {
                idMsg.innerHTML = "* 사용 가능한 ID입니다.";
            } else {
                idMsg.innerHTML = "* 이미 사용 중인 ID입니다.";
            }
        }
    })//ID 중복 검사 끝.

    //PW 유효성 검사
    writePw = document.querySelectorAll('.writePw');//[0]=input, [1]=img
    checkPw = document.querySelectorAll('.checkPw');//[0]=input, [1]=img
    joinUsPwChk = joinUs.querySelectorAll('.pwCheck');//PW 에러 메시지

    writePw[0].addEventListener('input', () => {
        var regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식

        if (writePw[0].value.length == 0) {
            writePw[0].classList.remove('erMsg');
            joinUsPwChk[0].innerHTML = "&nbsp;";
        } else if (writePw[0].value.length < 8 || writePw[0].value.length > 15) {
            writePw[0].classList.add('erMsg');
            joinUsPwChk[0].innerHTML = "* 비밀번호는 8자~15자로 작성해주세요.";
        } else {
            if (!regPw.test(writePw[0].value)) {
                writePw[0].classList.add('erMsg');
                joinUsPwChk[0].innerHTML = "* 영어, 숫자, 특수문자를 모두 활용해주세요.";
            } else {
                writePw[0].classList.remove('erMsg');
                joinUsPwChk[0].innerHTML = "&nbsp;";
                checkPw[0].disabled = false;
            }
        }
    })//PW 유효성 검사 끝.

    //비밀번호 확인
    checkPw[0].addEventListener('input', () => {
        if (checkPw[0].length == 0) {
            joinUsPwChk[0].innerHTML = "&nbsp;";
        } else if (checkPw[0].value != writePw[0].value) {
            joinUsPwChk[1].innerHTML = "* 비밀번호가 일치하지 않습니다.";
            joinUsPwChk[0].innerHTML = "&nbsp;";
        } else {
            joinUsPwChk[0].innerHTML = "&nbsp;";
            joinUsPwChk[1].innerHTML = "* 확인되었습니다.";
        }
    })//비밀번호 확인 끝

    //PW 아이콘 visible로 변경 + input type을 password->text로 변경
    writePw[1].addEventListener('click', () => {
        writePw[1].src = 'img/visible.png';
        if (writePw[1].classList.contains('visible')) {
            writePw[1].classList.remove('visible');
            writePw[1].src = 'img/invisible.png';

            writePw[0].type = 'password'
        } else {
            writePw[1].classList.add('visible');
            writePw[0].type = 'text'
        }
    })
    checkPw[1].addEventListener('click', () => {
        checkPw[1].src = 'img/visible.png';
        if (checkPw[1].classList.contains('visible')) {
            checkPw[1].classList.remove('visible');
            checkPw[1].src = 'img/invisible.png';

            checkPw[0].type = 'password'
        } else {
            checkPw[1].classList.add('visible');
            checkPw[0].type = 'text'
        }
    })//PW 아이콘 visible로 변경 + input type을 password->text로 변경 끝.


    //이메일 유효성 검사
    joinUsEmail = joinUs.querySelector('.joinUsEmail').children;//이메일 작성 관련[0]인풋, [1]버튼
    emailMsg = joinUs.querySelector('.emailMsg');//이메일 오류 메시지

    joinUsEmail[0].addEventListener('input', () => {
        var regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;//이메일 정규식

        if (joinUsEmail[0].value.length == 0) {
            joinUsEmail[0].classList.remove('erMsg');
            emailMsg.innerHTML = "&nbsp;";
            joinUsEmail[1].classList.add('deact');
        } else {
            if (!regEmail.test(joinUsEmail[0].value)) {
                joinUsEmail[0].classList.add('erMsg');
                emailMsg.innerHTML = "* E-MAIL 형식이 올바르지 않습니다.";
                joinUsEmail[1].classList.add('deact');
            } else {
                joinUsEmail[0].classList.remove('erMsg');
                emailMsg.innerHTML = "&nbsp;";
            }
        }
    })//이메일 유효성 검사 끝.

    //인증번호 전송 버튼 활성화(아직 해결 안됨)
    // if ((nameInput.value.length != 0 && nameMsg.innerHTML == "&nbsp;") && idMsg.innerHTML == "* 사용 가능한 ID입니다." && joinUsPwChk[1].innerHTML == "* 확인되었습니다.") {
    //     console.log('true');
    //     joinUsEmail[1].classList.remove('deact');
    // }



    //회원가입 창 관련 event 끝.
    //#endregion

    //#region [비밀번호 찾기 창]
    // 비밀번호 찾기 창 관령 event
    let writePwInFindPw = document.querySelectorAll('.writePwInFindPw');
    let checkPwInFindPw = document.querySelectorAll('.checkPwInFindPw');


    writePwInFindPw[1].addEventListener('click', () => {
        writePwInFindPw[1].src = 'img/visible.png';
        if (writePwInFindPw[1].classList.contains('visible')) {
            writePwInFindPw[1].classList.remove('visible');
            writePwInFindPw[1].src = 'img/invisible.png';

            writePwInFindPw[0].type = 'password'
        } else {
            writePwInFindPw[1].classList.add('visible');
            writePwInFindPw[0].type = 'text'
        }
    })

    checkPwInFindPw[1].addEventListener('click', () => {
        checkPwInFindPw[1].src = 'img/visible.png';
        if (checkPwInFindPw[1].classList.contains('visible')) {
            checkPwInFindPw[1].classList.remove('visible');
            checkPwInFindPw[1].src = 'img/invisible.png';

            checkPwInFindPw[0].type = 'password'
        } else {
            checkPwInFindPw[1].classList.add('visible');
            checkPwInFindPw[0].type = 'text'
        }
    })
    // 비밀번호 찾기 창 관련 event 끝
    //#endregion
})