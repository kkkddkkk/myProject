document.addEventListener('DOMContentLoaded', function () {


    //로그인 창
    //#region

    //ID 입력란, PW 입력란, 로그인 버튼
    let idInput, pwInput, logInBtn
    idInput = document.querySelectorAll('.IDPW')[0];//ID 입력란
    pwInput = document.querySelectorAll('.IDPW')[1];//PW 입력란
    logInBtn = document.querySelector('.logInBtn');//로그인 버튼

    //회원가입, 아이디 찾기, 비밀번호 찾기(li)
    let newId, findId, findPw;
    newId = document.querySelector('.newId');//회원가입
    findId = document.querySelector('.findId');//아이디 찾기
    findPw = document.querySelector('.findPw');//비밀번호 찾기

    //ID, PW 공란일 시 비활성화

    //#endregion ------------->로그인 창 끝.

    //배경
    let bgBlock, blackCover
    bgBlock = document.querySelector('.bgBlock');//배경 도형
    blackCover = document.querySelector('.blackCover');//검은 배경(애니메이션 용)

    //창
    let joinUs, findIdWindow, findPwWindow
    joinUs = document.querySelector('.joinUs');//회원가입 창
    findIdWindow = document.querySelector('.findIdWindow');//아이디 찾기 창
    findPwWindow = document.querySelector('.findPwWindow');//비밀번호 찾기 창

    //버튼
    let findPWBtn, changePw, backToLogIn;
    findPWBtn = document.querySelector('.findPWBtn');//아이디 찾기 창 -> 비밀번호 찾기 버튼
    changePw = document.querySelector('.changePw');//비밀번호 찾기 창 -> 확인 버튼
    backToLogIn = document.querySelector('.backToLogIn');//뒤로가기 버튼(공통)

    //애니메이션 부여
    //#region

    //로그인 버튼 호버링/클릭 애니메이션 부여
    //#region
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
    })
    //#endregion

    //회원가입 버튼 호버링/클릭 애니메이션 부여
    //#region
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
    //#endregion

    //아이디 찾기 버튼 호버링/클릭 애니메이션 부여
    //#region
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
    })
    //#endregion

    //비밀번호 찾기 버튼 호버링/클릭 애니메이션 부여
    //#region
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
    })
    //#endregion

    //아이디 찾기 창 -> 비밀번호 찾기 버튼 클릭 애니메이션 부여
    //#region
    findPWBtn.addEventListener('click', () => {
        findIdWindow.classList.remove('fadeIn');
        findPwWindow.classList.remove('fadeOut');
        findIdWindow.classList.add('fadeOut');
        findPwWindow.classList.add('fadeIn');
    })
    //#endregion

    //비밀번호 찾기 창 -> 확인 버튼 클릭 애니메이션 부여
    //#region
    changePw.addEventListener('click', () => {
        findPwWindow.classList.remove('fadeIn');
        findPwWindow.classList.add('fadeOut');

        rewind();
        bgBlock.style.zIndex = '0';
    })
    //#endregion

    //뒤로가기 버튼 클릭 애니메이션 부여
    //#region
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

        initWindow();
    })
    //#endregion

    //#endregion ---------------->애니메이션 부여 끝.


    //애니메이션 function
    //#region

    let position = 0;//bgBlock 위치
    let width = 20;//blackCover 넓이
    let recoilSpeed = 0;//반동 속도
    let acceleration = 0.22;//감속도
    let speed;//이동속도

    //반동 애니메이션(animateRecoil(), animateBack())
    //#region
    function animateRecoil() {
        recoilSpeed += 0.03;
        bgBlock.style.transform = `translateX(-${recoilSpeed}%)`;
        if (recoilSpeed >= 0.5) {
            return;
        }
        requestAnimationFrame(animateRecoil);
    }
    function animateBack() {
        recoilSpeed += 0.03;
        bgBlock.style.transform = `translateX(${recoilSpeed}%)`;
        if (recoilSpeed >= 0.5) {
            return;
        }
        requestAnimationFrame(animateBack);
    }
    //#endregion

    //화면전환 애니메이션(animate(), rewind())
    //#region
    function animate() {
        speed = 5;//시작 속도

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

    function rewind() {//되돌리기
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
    //#endregion


    //#endregion ----------------------> 애니메이션 function 끝.


    //회원가입 버튼 활성화를 위한 임시 변수
    let namePoint, idPoint, pwPoint, emailPoint, certPoint;

    //기타(타이머, 인증번호)
    let timerID, certNum, stopTimer;
    stopTimer = 0;

    //정규식
    let regId, regPw, regEmail;
    regId = /^[a-zA-Z]+[a-zA-Z0-9]{5,19}$/;//ID 정규식
    regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식
    regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;//이메일 정규식F


    //회원가입 창
    //#region

    //입력 인풋
    let nameInput, joinUsId;
    nameInput = joinUs.querySelector('.name');//이름 입력 인풋
    joinUsId = joinUs.querySelector('.joinUsId').querySelector('input');//ID 입력 인풋

    //비밀번호 PW 관련. [0]=input, [1]=img
    let writePw, checkPw;
    writePw = document.querySelectorAll('.writePw');//비밀번호 작성
    checkPw = document.querySelectorAll('.checkPw');//비밀번호 확인

    //이메일 + 회원가입 관련. [0]=input, [1]=버튼
    let joinUsEmail, joinUsCert;
    joinUsEmail = joinUs.querySelector('.joinUsEmail').children;//이메일+인증번호 전송
    joinUsCert = joinUs.querySelector('.joinUsCert').children;//인증번호+회원가입

    //에러메시지 ---> 비활성화 class = deact, 에러 class = erMsg
    let nameMsg, idMsg, joinUsPwChk, emailMsg, certMsg;
    nameMsg = joinUs.querySelector('.nameMsg');//이름 오류 메세지
    idMsg = joinUs.querySelector('.idMsg');//ID 에러 메시지
    joinUsPwChk = joinUs.querySelectorAll('.pwCheck');//PW 에러 메시지
    emailMsg = joinUs.querySelector('.emailMsg');//이메일 오류 메시지
    certMsg = joinUs.querySelector('.certMsg');//인증번호 오류 메시지

    //버튼
    let idCheck;
    idCheck = joinUs.querySelector('.joinUsId').querySelector('div');//중복 확인 버튼

    // 이름 10자 초과 시 안내
    //#region
    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 10) {//10자 초과면 기본스타일
            nameInput.classList.add('erMsg');
            nameMsg.innerHTML = "최대 10자까지 입력하실 수 있습니다.";

        } else {//10자 이하면 기본 스타일
            nameInput.classList.remove('erMsg');
            nameMsg.innerHTML = "&nbsp;";
        }

        //인증번호 전송 버튼 검증
        sumPoint();
    })
    //#endregion

    //ID 유효성 검사
    //#region
    joinUsId.addEventListener('input', () => {
        if (joinUsId.value.length == 0) {//ID란이 공란이면 기본 스타일
            joinUsId.classList.remove('erMsg');
            idMsg.innerHTML = "&nbsp;";
            idCheck.classList.add('deact')
        } else if (joinUsId.value.length < 6 || joinUsId.value.length > 20) {//글자 수 조건 어길 시 에러 스타일
            joinUsId.classList.add('erMsg');
            idMsg.innerHTML = "* ID는 6자~20자로 작성해주세요.";
            idCheck.classList.add('deact')
        } else {
            if (!regId.test(joinUsId.value)) {//영숫자 조건 어길 시 에러 스타일
                joinUsId.classList.add('erMsg');
                idMsg.innerHTML = "* ID는 영어, 숫자로만 작성해주세요.";
                idCheck.classList.add('deact')
            } else {//조건 모두 충족할 시 기본 스타일 스타일
                joinUsId.classList.remove('erMsg');
                idMsg.innerHTML = "&nbsp;";
                idCheck.classList.remove('deact')
            }
        }
    })
    //#endregion

    //ID 중복 검사
    //#region
    idCheck.addEventListener('click', () => {

        if (!idCheck.classList.contains('deact')) {
            if (confirm('사용가능?')) {
                idMsg.innerHTML = "* 사용 가능한 ID입니다.";
            } else {
                idMsg.innerHTML = "* 이미 사용 중인 ID입니다.";
            }
        }

        sumPoint();
    })
    //#endregion

    //PW 유효성 검사
    //#region
    writePw[0].addEventListener('input', () => {
        if (writePw[0].value.length == 0) {//작성란 공란일 시 작성란 기본스타일 / 확인란 비활성화
            writePw[0].classList.remove('erMsg');
            joinUsPwChk[0].innerHTML = "&nbsp;";
            checkPw[0].disabled = true;
        } else if (writePw[0].value.length < 8 || writePw[0].value.length > 15) {//글자 수 조건 미충족 시 에러 스타일 + 확인란 비활성화
            writePw[0].classList.add('erMsg');
            joinUsPwChk[0].innerHTML = "* 비밀번호는 8자~15자로 작성해주세요.";
            checkPw[0].disabled = true;
        } else {
            if (!regPw.test(writePw[0].value)) {//정규식 미충족 시 에러 스타일 + 확인란 비활성화
                writePw[0].classList.add('erMsg');
                joinUsPwChk[0].innerHTML = "* 영어, 숫자, 특수문자를 모두 활용해주세요.";
                checkPw[0].disabled = true;
            } else {//조건 충족 시 작성란 기본스타일 / 확인란 활성화
                writePw[0].classList.remove('erMsg');
                joinUsPwChk[0].innerHTML = "&nbsp;";
                checkPw[0].disabled = false;
            }
        }

        if (checkPw[0].value != writePw[0].value && !checkPw[0].value == '') {//확인란 작성 후 작성란 수정 시 확인란 에러스타일
            checkPw[0].classList.add('erMsg');
            joinUsPwChk[1].innerHTML = "* 비밀번호가 일치하지 않습니다.";
            joinUsPwChk[0].innerHTML = "&nbsp;";
        }

        if (checkPw[0].disabled == true) {//확인란 비활성화 시 기본스타일 / 내용 삭제
            checkPw[0].classList.remove('erMsg');
            joinUsPwChk[1].innerHTML = "&nbsp;";
            checkPw[0].value = '';
        }
    })//PW 유효성 검사 끝.
    //#endregion

    //비밀번호 확인란
    //#region
    checkPw[0].addEventListener('input', () => {

        if (checkPw[0].value.length == 0) {//확인란 공란일 시 기본스타일
            checkPw[0].classList.remove('erMsg');
            joinUsPwChk[0].innerHTML = "&nbsp;";
            joinUsPwChk[1].innerHTML = "&nbsp;";
        } else if (checkPw[0].value != writePw[0].value) {//작성란 != 확인란일 시 에러스타일
            checkPw[0].classList.add('erMsg');
            joinUsPwChk[0].innerHTML = "&nbsp;";
            joinUsPwChk[1].innerHTML = "* 비밀번호가 일치하지 않습니다.";
        } else {//작성란 == 확인란일 시 에러스타일
            checkPw[0].classList.remove('erMsg');
            joinUsPwChk[0].innerHTML = "&nbsp;";
            joinUsPwChk[1].innerHTML = "* 확인되었습니다.";
        }

        sumPoint();
    })
    //#endregion

    //PW 아이콘 visible로 변경 + input type 변경
    //#region
    writePw[1].addEventListener('click', () => {//작성란 visible 버튼
        writePw[1].src = 'img/visible.png';
        if (writePw[1].classList.contains('visible')) {//visible 클릭 시 이벤트
            writePw[1].classList.remove('visible');
            writePw[1].src = 'img/invisible.png';
            writePw[0].type = 'password'
        } else {//invisible 클릭 시 이벤트
            writePw[1].classList.add('visible');
            writePw[0].type = 'text'
        }
    })
    checkPw[1].addEventListener('click', () => {//확인란 visible 버튼. 내용은 위와 같음.
        checkPw[1].src = 'img/visible.png';
        if (checkPw[1].classList.contains('visible')) {
            checkPw[1].classList.remove('visible');
            checkPw[1].src = 'img/invisible.png';
            checkPw[0].type = 'password'
        } else {
            checkPw[1].classList.add('visible');
            checkPw[0].type = 'text'
        }
    })
    //#endregion

    //이메일 유효성 검사
    //#region
    joinUsEmail[0].addEventListener('input', () => {
        if (joinUsEmail[0].value.length == 0) {//이메일이 공란이면 기본 스타일 
            joinUsEmail[0].classList.remove('erMsg');
            emailMsg.innerHTML = "&nbsp;";
            joinUsEmail[1].classList.add('deact');
        } else {
            if (!regEmail.test(joinUsEmail[0].value)) {//정규식과 맞지 않으면 에러 스타일
                joinUsEmail[0].classList.add('erMsg');
                emailMsg.innerHTML = "* E-MAIL 형식이 올바르지 않습니다.";
                joinUsEmail[1].classList.add('deact');
            } else {//정규식에 부합하면 기본스타일
                joinUsEmail[0].classList.remove('erMsg');
                emailMsg.innerHTML = "&nbsp;";
            }
        }

        sumPoint();

    })
    //#endregion

    //인증번호 전송 및 검증
    //#region
    joinUsEmail[1].addEventListener('click', () => {
        if (!joinUsEmail[1].classList.contains('deact')) {

            nameInput.readOnly = true;
            joinUsId.readOnly = true;
            writePw[0].readOnly = true;
            checkPw[0].readOnly = true;

            certNum = parseInt(Math.random() * 1000000)// 6자리 인증번호

            console.log(certNum);
            alert('인증번호를 발송하였습니다.');
            joinUsEmail[1].innerHTML = '인증번호 재전송';

            emailMsg.innerHTML = `* 05 : 00`;
            timer5min();

            if (emailMsg.innerHTML == `* 00 : 00`) {
                alert(`인증번호 유효기간이 지났습니다.\n'인증번호 재전송' 버튼을 눌러주세요.`);
                certNum = 1234567;
            }

        }
    })

    //인증번호 검증
    joinUsCert[0].addEventListener('input', () => {
        certMsg.innerHTML = `&nbsp;`;
        joinUsCert[0].classList.remove('erMsg');
        sumPoint();
    })

    //#endregion

    //회원가입 클릭 이벤트
    //#region
    joinUsCert[1].addEventListener('click', () => {
        certMsg.innerHTML = `&nbsp;`;
        if (!joinUsCert[1].classList.contains('deact')) {
            if (joinUsCert[0].value == certNum) {
                alert(`회원가입을 마쳤습니다.\n환영합니다, ${nameInput.value}님!`)

                //회원가입 창 fade out
                joinUs.classList.remove('fadeIn');
                joinUs.classList.add('fadeOut');

                //뒤로가기 버튼 fade out
                backToLogIn.classList.remove('fadeIn');
                backToLogIn.classList.add('fadeOut');
                bgBlock.style.zIndex = '1';
                rewind();
                bgBlock.style.zIndex = '0';

                // 화면 초기화
                initWindow();

            } else {
                certMsg.innerHTML = '* 인증번호가 일치하지 않습니다.';
                joinUsCert[0].classList.add('erMsg');
            }
        }
    })
    //#endregion

    //인증번호 전송/회원가입 버튼 활성화 함수(sumPoint())
    //#region
    function sumPoint() {
        //이름 검증
        if (nameInput.value.length != 0 && !nameInput.classList.contains('erMsg')) {
            namePoint = 1;
        } else {
            namePoint = 0;
        }

        //ID 검증
        if (idMsg.innerHTML == "* 사용 가능한 ID입니다.") {
            idPoint = 1;
        } else {
            idPoint = 0;
        }

        //비밀번호 검증
        if (joinUsPwChk[1].innerHTML == "* 확인되었습니다.") {
            pwPoint = 1;
        } else {
            pwPoint = 0;
        }

        //이메일 검증
        if (joinUsEmail[0].value.length != 0 && !joinUsEmail[0].classList.contains('erMsg')) {
            emailPoint = 1;
        } else {
            emailPoint = 0;
        }

        //인증번호 검증
        if (joinUsCert[0].value.length != 0) {
            certPoint = 1;
        } else {
            certPoint = 0;
        }

        //point의 합이 4면 비활성화 풀기
        if (namePoint + idPoint + pwPoint + emailPoint == 4) {
            joinUsEmail[1].classList.remove('deact');
        } else {
            joinUsEmail[1].classList.add('deact');
        }

        //포인트의 합이 5면 회원가입 버튼 비활성화 풀기
        if (namePoint + idPoint + pwPoint + emailPoint + certPoint == 5) {
            joinUsCert[1].classList.remove('deact');
        } else {
            joinUsCert[1].classList.add('deact');
        }
    }
    //#endregion

    //#endregion --------------------------->회원가입 창 끝.

    //아이디 찾기 창
    //#region

    //이메일 + 회원가입 관련. [0]=input, [1]=버튼
    let findIdEmail, findIdCert;
    findIdEmail = findIdWindow.querySelector('.joinUsEmail').children;//이메일+인증번호 전송
    findIdCert = findIdWindow.querySelector('.joinUsCert').children;//인증번호+회원가입

    //오류메시지
    let findIdEmailMsg, findIdCertMsg;
    findIdEmailMsg = findIdWindow.querySelector('.emailMsg');//이메일 오류 메시지
    findIdCertMsg = findIdWindow.querySelector('.certMsg');//인증번호 메시지

    //이메일 유효성 검사
    //#region
    findIdEmail[0].addEventListener('input', () => {
        if (findIdEmail[0].value.length == 0) {//이메일이 공란이면 기본 스타일 
            findIdEmail[0].classList.remove('erMsg');
            findIdEmailMsg.innerHTML = "&nbsp;";
            findIdEmail[1].classList.add('deact');
        } else {
            if (!regEmail.test(findIdEmail[0].value)) {//정규식과 맞지 않으면 에러 스타일
                findIdEmail[0].classList.add('erMsg');
                findIdEmailMsg.innerHTML = "* E-MAIL 형식이 올바르지 않습니다.";
                findIdEmail[1].classList.add('deact');
            } else {//정규식에 부합하면 기본스타일
                findIdEmail[0].classList.remove('erMsg');
                findIdEmailMsg.innerHTML = "&nbsp;";
                findIdEmail[1].classList.remove('deact');
            }
        }
    })
    //#endregion

    //인증번호 전송 및 검증
    //#region
    findIdEmail[1].addEventListener('click', () => {
        if (!findIdEmail[1].classList.contains('deact')) {
            certNum = parseInt(Math.random() * 1000000)// 6자리 인증번호

            console.log(certNum);
            alert('인증번호를 발송하였습니다.');
            findIdEmail[1].innerHTML = '인증번호 재전송';

            findIdEmailMsg.innerHTML = `* 05 : 00`;
            timer5min();

            if (findIdEmailMsg.innerHTML == `* 00 : 00`) {
                alert(`인증번호 유효기간이 지났습니다.\n'인증번호 재전송' 버튼을 눌러주세요.`);
                certNum = 1234567;
            }

        }
    })

    //인증번호 검증
    findIdCert[0].addEventListener('input', () => {
        certMsg.innerHTML = `&nbsp;`;
        joinUsCert[0].classList.remove('erMsg');
    })
    //#endregion

    //인증번호 확인
    //#region
    joinUsCert[1].addEventListener('click', () => {
        certMsg.innerHTML = `&nbsp;`;
        if (!joinUsCert[1].classList.contains('deact')) {
            if (joinUsCert[0].value == certNum) {
                alert(`회원가입을 마쳤습니다.\n환영합니다, ${nameInput.value}님!`)

                //회원가입 창 fade out
                joinUs.classList.remove('fadeIn');
                joinUs.classList.add('fadeOut');

                //뒤로가기 버튼 fade out
                backToLogIn.classList.remove('fadeIn');
                backToLogIn.classList.add('fadeOut');
                bgBlock.style.zIndex = '1';
                rewind();
                bgBlock.style.zIndex = '0';

                // 화면 초기화
                initWindow();

            } else {
                certMsg.innerHTML = '* 인증번호가 일치하지 않습니다.';
                joinUsCert[0].classList.add('erMsg');
            }
        }
    })
    //#endregion


    //#endregion ---------------------------> 아이디 찾기 창 끝.


//비밀번호 찾기
    //#region
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



    //5분 타이머 함수 (timer5min())
    //#region
    function timer5min() {
        let sec = 0;
        let displaySec;
        let min = 5

        clearInterval(timerID);

        timerID = setInterval(() => {
            if (stopTimer == 1) {
                emailMsg.innerHTML = `&nbsp;`;
                findIdEmailMsg.innerHTML = `&nbsp;`;
                return;
            }

            if (sec == 0 && min == 0) {
                emailMsg.innerHTML = `* 00 : 00`;
                findIdEmailMsg.innerHTML = `* 00 : 00`;
                clearInterval();
                return;
            }

            if (sec == 0 && min >= 0) {
                sec = 60;
                min--
            }
            sec--;
            displaySec = sec === 60 ? 0 : sec;

            emailMsg.innerHTML = `* ${String(min).padStart(2, "0")} : ${String(displaySec).padStart(2, "0")}`;
            findIdEmailMsg.innerHTML = `* ${String(min).padStart(2, "0")} : ${String(displaySec).padStart(2, "0")}`;
        }, 1000)
    }
    //#endregion

    //화면 초기화 함수(initWindow())
    //#region
    function initWindow() {

        //회원가입 창
        //수정 가능한 input으로 변환
        nameInput.readOnly = false;
        joinUsId.readOnly = false;
        writePw[0].readOnly = false;
        checkPw[0].readOnly = false;

        //타이머 종료
        stopTimer = 1;

        //input 값 삭제
        nameInput.value = '';
        joinUsId.value = '';
        writePw[0].value = '';
        checkPw[0].value = '';
        joinUsEmail[0].value = '';
        joinUsCert[0].value = '';

        //안내 메시지 삭제
        nameMsg.innerHTML = '&nbsp;'
        idMsg.innerHTML = '&nbsp;'
        joinUsPwChk[0].innerHTML = '&nbsp;'
        joinUsPwChk[1].innerHTML = '&nbsp;'
        emailMsg.innerHTML = '&nbsp;'

        //버튼 비활성화
        idCheck.classList.add('deact');
        joinUsEmail[1].classList.add('deact');
        joinUsCert[1].classList.add('deact');



    }

    //#endregion



})