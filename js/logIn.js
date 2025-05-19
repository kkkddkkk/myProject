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

    //배경
    let bgBlock, blackCover
    bgBlock = document.querySelector('.bgBlock');//배경 도형
    blackCover = document.querySelector('.blackCover');//검은 배경(애니메이션 용)


    window.addEventListener('load', () => {
        bgBlock.children[0].classList.add('reverseAni');
        bgBlock.children[1].classList.add('reverseAni');
        blackCover.classList.add('reverseAniForBC');
    })

    //로그인 버튼 호버링/클릭 애니메이션 부여
    animated(logInBtn, 'joinUs.html');

    //회원가입 버튼 호버링/클릭 애니메이션 부여
    animated(newId, 'joinUs.html');

    //아이디 찾기 버튼 호버링/클릭 애니메이션 부여
    animated(findId, 'findId.html');

    //비밀번호 찾기 버튼 호버링/클릭 애니메이션 부여
    animated(findPw, 'findPw.html');

    //버튼 호버링, 클릭 애니메이션 (function animated(btn, newPage))
    //#region
    function animated(btn, newPage) {
        btn.addEventListener('mouseenter', () => {
            bgBlock.children[0].classList.remove('reverseAni');
            bgBlock.children[1].classList.remove('reverseAni');
            bgBlock.children[0].classList.remove('reverseRecoil');
            bgBlock.children[1].classList.remove('reverseRecoil');
            bgBlock.children[0].classList.add('recoil');
            bgBlock.children[1].classList.add('recoil');
        })
        btn.addEventListener('mouseleave', () => {
            bgBlock.children[0].classList.remove('recoil');
            bgBlock.children[1].classList.remove('recoil');
            bgBlock.children[0].classList.add('reverseRecoil');
            bgBlock.children[1].classList.add('reverseRecoil');
        })
        btn.addEventListener('click', () => {
            bgBlock.children[0].classList.remove('recoil');
            bgBlock.children[1].classList.remove('recoil');
            bgBlock.children[0].classList.add('animate');
            bgBlock.children[1].classList.add('animate');
            blackCover.style.transition = 'transform 1.0s ease';
            blackCover.classList.add('animateBC');
            blackCover.addEventListener('transitionend', () => {
                location.href = newPage;
            })
        })
        //#endregion
    }

})