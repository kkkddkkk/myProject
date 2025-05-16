document.addEventListener('DOMContentLoaded', function () {

    //애니메이션 부여
    //#region

    //아이디 찾기 창 -> 비밀번호 찾기 버튼 클릭 애니메이션 부여
    //#region
    findPWBtn.addEventListener('click', () => {
        findIdWindow.classList.remove('fadeIn');
        findPwWindow.classList.remove('fadeOut');
        findIdWindow.classList.add('fadeOut');
        findPwWindow.classList.add('fadeIn');
    })
    //#endregion

    //#endregion ---------------->애니메이션 부여 끝.

    //아이디 찾기 창
    //#region

    //이메일 + 회원가입 관련. [0]=input, [1]=버튼
    let findIdEmail, findIdCert;
    findIdEmail = findIdWindow.querySelector('.joinUsEmail').children;//이메일+인증번호 전송
    findIdCert = findIdWindow.querySelector('.joinUsCert').children;//인증번호+회원가입

    //오류메시지
    let emailMsg, certMsg;
    emailMsg = findIdWindow.querySelector('.emailMsg');//이메일 오류 메시지 - findId가 앞에 붙어있었음.
    certMsg = findIdWindow.querySelector('.certMsg');//인증번호 메시지

    //이메일 유효성 검사
    //#region
    findIdEmail[0].addEventListener('input', () => {
        if (findIdEmail[0].value.length == 0) {//이메일이 공란이면 기본 스타일 
            findIdEmail[0].classList.remove('erMsg');
            emailMsg.innerHTML = "&nbsp;";
            findIdEmail[1].classList.add('deact');
        } else {
            if (!regEmail.test(findIdEmail[0].value)) {//정규식과 맞지 않으면 에러 스타일
                findIdEmail[0].classList.add('erMsg');
                emailMsg.innerHTML = "* E-MAIL 형식이 올바르지 않습니다.";
                findIdEmail[1].classList.add('deact');
            } else {//정규식에 부합하면 기본스타일
                findIdEmail[0].classList.remove('erMsg');
                emailMsg.innerHTML = "&nbsp;";
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

            emailMsg.innerHTML = `* 05 : 00`;
            timer5min(emailMsg);

            if (emailMsg.innerHTML == `* 00 : 00`) {
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

})