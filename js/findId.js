document.addEventListener('DOMContentLoaded', function () {

    //인풋
    let emailInput, certInput;
    emailInput = document.querySelector('.joinUsEmail').children[0];//이메일 인풋
    certInput = document.querySelector('.joinUsCert').children[0];//인증번호 인풋

    //오류메시지
    let emailMsg, certMsg;
    emailMsg = document.querySelector('.emailMsg');//이메일 오류 메시지
    certMsg = document.querySelector('.certMsg');//인증번호 오류 메시지

    //버튼
    let emailCheck, certCheck, findPWBtn;
    emailCheck = document.querySelector('.joinUsEmail').children[1];//인증번호 전송 버튼
    certCheck = document.querySelector('.joinUsCert').children[1];//인증번호 확인 버튼
    findPWBtn = document.querySelector('.findPWBtn');//비밀번호 찾기 버튼

    //ID 알림박스
    let helloBox = document.querySelector('.helloBox');


    //비밀번호 찾기 버튼 클릭 애니메이션 부여
    //#region
    findPWBtn.addEventListener('click', () => {
        switchPage('findPw.html')
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



})