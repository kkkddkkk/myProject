document.addEventListener('DOMContentLoaded', function () {



    //ID, PW 공란일 시 비활성화
    let idInput, pwInput, logInBtn, newId, findId, findPw;
    idInput = document.querySelectorAll('.IDPW')[0];//ID 입력란
    pwInput = document.querySelectorAll('.IDPW')[1];//PW 입력란
    logInBtn = document.querySelector('.logInBtn');//로그인 버튼
    newId = document.querySelector('.newId');//회원가입
    findId = document.querySelector('.findId');//아이디 찾기
    findPw = document.querySelector('.findPw');//비밀번호 찾기
    console.log(idInput);
    //ID, PW 공란일 시 비활성화 끝.

    let bgBlock = document.querySelector('.bgBlock');//배경 도형
    let blackCover = document.querySelector('.blackCover');//검은 배경(애니메이션 용)

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
    let joinUs = document.querySelector('.joinUs');//회원가입 창

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
    let findIdWindow = document.querySelector('.findIdWindow');//아이디 찾기 창

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
    let findPwWindow = document.querySelector('.findPwWindow');//비밀번호 찾기 창

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
    let findPWBtn = document.querySelector('.findPWBtn');//뒤로가기 버튼

    findPWBtn.addEventListener('click', () => {
        findIdWindow.classList.remove('fadeIn');
        findPwWindow.classList.remove('fadeOut');
        findIdWindow.classList.add('fadeOut');
        findPwWindow.classList.add('fadeIn');
    })



    //뒤로가기 버튼 클릭 애니메이션 부여
    let backToLogIn = document.querySelector('.backToLogIn');//뒤로가기 버튼

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

        backToLogIn.classList.remove('fadeIn');
        backToLogIn.classList.add('fadeOut');
        rewind();
        bgBlock.style.zIndex = '0';
    })//뒤로가기 버튼 애니메이션 끝.



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



})