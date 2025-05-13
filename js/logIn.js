document.addEventListener('DOMContentLoaded', function () {


    //ID, PW 공란일 시 비활성화
    let idInput, pwInput, logInBtn;
    idInput = document.querySelectorAll('.IDPW')[0];//ID 입력란
    pwInput = document.querySelectorAll('.IDPW')[1];//PW 입력란
    logInBtn = document.querySelector('.logInBtn');//로그인 버튼
    console.log(idInput);

    //ID, PW 공란일 시 비활성화 끝.

    let bgBlock = document.querySelector('.bgBlock');//배경 도형
    let blackCover = document.querySelector('.blackCover');//검은 배경(애니메이션 용)
    console.log(blackCover.style.width);

    logInBtn.addEventListener('click', () => {
        // bgBlock.style.transform = 'translateX(100vw)';
        bgBlock.style.zIndex = '1';

        let position = 0;
        let width = 0;
        let recoilSpeed = 0;
        let speed = 0.5;//시작 속도
        let acceleration = 0.02;//가속도

        function animateRecoil() {
            if (recoilSpeed < -5) {
                return;
            }

            recoilSpeed -= 0.5;
            bgBlock.style.transform = `translateX(${recoilSpeed}%)`;
            console.log(recoilSpeed);
            requestAnimationFrame(animateRecoil);
        }

        function animate() {
            if (position >= 100) {
                return;
            }

            position += speed;
            width += speed;
            speed += acceleration;

            bgBlock.style.transform = `translateX(${position}%)`;
            blackCover.style.width = `${width}%`;
            requestAnimationFrame(animate);
        }

        animateRecoil();
        animate();

        // setInterval(() => {
        //     position += 1;
        //     width += 2;

        //     bgBlock.style.transform = `translateX(${position}%)`;
        //     blackCover.style.width = `${width}%`;
        // }, timeSet);



        console.log('clicked');
    })
})