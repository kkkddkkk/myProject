document.addEventListener('DOMContentLoaded', function () {
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


    //배경
    let bgBlock, blackCover
    bgBlock = document.querySelector('.bgBlock');//배경 도형
    blackCover = document.querySelector('.blackCover');//검은 배경(애니메이션 용)

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
        switchPage('joinUs.html');
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
        switchPage('findId.html');
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
        switchPage('findPw.html');
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

    //배경 이동 애니메이션(animate(), rewind())
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

})