document.addEventListener('DOMContentLoaded', function () {

    //인풋
    let idInput, emailInput, certInput, writePwInput, chkPwInput;
    idInput = document.querySelector('.joinUsId');//ID 입력 인풋
    emailInput = document.querySelector('.joinUsEmail').children[0];//이메일 인풋
    certInput = document.querySelector('.joinUsCert').children[0];//인증번호 인풋
    writePwInput = document.querySelectorAll('.writePw')[0];//비밀번호 작성 인풋
    chkPwInput = document.querySelectorAll('.checkPw')[0];//비밀번호 확인 인풋 

    //에러메시지
    let idMsg, emailMsg, certMsg, pwMsg1, pwMsg2;
    idMsg = document.querySelector('.idMsg');//ID 에러 메시지
    emailMsg = document.querySelector('.emailMsg');//이메일 오류 메시지
    certMsg = document.querySelector('.certMsg');//인증번호 오류 메시지
    pwMsg1 = document.querySelectorAll('.pwCheck')[0];//비밀번호 작성란 메시지
    pwMsg2 = document.querySelectorAll('.pwCheck')[1];//비밀번호 확인란 메시지

    //아이콘
    let writePwIcon, chkPwIcon;
    writePwIcon = document.querySelectorAll('.writePw')[1];//비밀번호 작성 아이콘
    chkPwIcon = document.querySelectorAll('.checkPw')[1];//비밀번호 확인 아이콘

    //버튼
    let emailCheck, certCheck, changePw;
    emailCheck = document.querySelector('.joinUsEmail').children[1];//인증번호 전송 버튼
    certCheck = document.querySelector('.joinUsCert').children[1];//인증번호 확인 버튼
    changePw = document.querySelector('.changePw');//확인(비밀번호 변경경) 버튼


    //비밀번호 찾기 창 -> 확인 버튼 클릭 애니메이션 부여
    //#region
    changePw.addEventListener('click', () => {
        box.classList.remove('fadeIn');
        box.classList.add('fadeOut');
        box.addEventListener('animationend', () => {
            box.style.display = 'none';
            switchPage('login.html');
        }, {once: true});

    })
    //#endregion


    //이메일 유효성 검사
    //#region
    emailInput.addEventListener('input', () => {
        chkEmail(emailInput, emailMsg, emailCheck);

        if (emailInput.value.length != 0 && emailMsg.innerHTML == "&nbsp;") {
            emailCheck.classList.remove('deact');
        }
    })
    //#endregion

    //인증번호 전송 및 검증
    //#region
    //인증번호 전송
    emailCheck.addEventListener('click', () => {
        sendCert(emailCheck, emailMsg);
    })

    //인증번호 검증
    certInput.addEventListener('input', () => {
        if (certInput.value.length != 0) {
            certCheck.classList.remove('deact');
        } else {
            certCheck.classList.add('deact');
        }
        certMsg.innerHTML = `&nbsp;`;
        certInput.classList.remove('erMsg');
    })
    //#endregion

    //인증번호 확인
    //#region
    certCheck.addEventListener('click', () => {
        certMsg.innerHTML = `&nbsp;`;
        let afterCert = function () {
            //ID 데이터 불러오기
            let id = prompt('ID?');
            helloBox.innerHTML = `'${id}'님, 안녕하세요!`;
            helloBox.style.fontStyle = 'italic';
        }

        chkCert(certMsg, certInput, afterCert);
    })
    //#endregion


    // 비밀번호 찾기 창 관련 event 끝
    //#endregion


})