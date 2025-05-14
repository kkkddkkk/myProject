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
    console.log(blackCover.style.width);

    //회원가입 버튼 호버링/클릭 애니메이션 부여
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
        animate();
    })



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
        console.log(recoilSpeed);
        requestAnimationFrame(animateRecoil);
    }

    //화면전환 애니메이션
    function animate() {
        let speed = 5;//시작 속도
        console.log('Animating...');
        console.log('speed:', speed, 'position:', position);

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
        console.log(recoilSpeed);
        requestAnimationFrame(animateBack);
    }


})