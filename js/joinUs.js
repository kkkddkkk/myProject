document.addEventListener('DOMContentLoaded', function () {

    //회원가입 버튼 활성화를 위한 임시 변수
    let namePoint, idPoint, pwPoint, emailPoint, certPoint;

    //인풋
    let nameInput, idInput, writePwInput, chkPwInput;
    nameInput = document.querySelector('.name');//이름 입력 인풋
    idInput = document.querySelector('.joinUsId').children[0];//ID 입력 인풋
    writePwInput = document.querySelectorAll('.writePw')[0];//비밀번호 작성 인풋
    chkPwInput = document.querySelectorAll('.checkPw')[0];//비밀번호 확인 인풋
    emailInput = document.querySelector('.joinUsEmail').children[0];//이메일 인풋
    certInput = document.querySelector('.joinUsCert').children[0];//인증번호 인풋

    //에러메시지
    let nameMsg, idMsg, PwMsg1, PwMsg2, emailMsg, certMsg;
    nameMsg = document.querySelector('.nameMsg');//이름 오류 메세지
    idMsg = document.querySelector('.idMsg');//ID 에러 메시지
    pwMsg1 = document.querySelectorAll('.pwCheck')[0];//비밀번호 작성란 메시지
    pwMsg2 = document.querySelectorAll('.pwCheck')[1];//비밀번호 확인란 메시지
    emailMsg = document.querySelector('.emailMsg');//이메일 오류 메시지
    certMsg = document.querySelector('.certMsg');//인증번호 오류 메시지

    //아이콘
    let writePwIcon, chkPwIcon;
    writePwIcon = document.querySelectorAll('.writePw')[1];//비밀번호 작성 아이콘
    chkPwIcon = document.querySelectorAll('.checkPw')[1];//비밀번호 확인 아이콘

    //버튼
    let idCheck, emailCheck, certCheck;
    idCheck = document.querySelector('.joinUsId').querySelector('div');//중복 확인 버튼
    emailCheck = document.querySelector('.joinUsEmail').children[1];//인증번호 전송 버튼
    certCheck = document.querySelector('.joinUsCert').children[1];//회원가입 버튼

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

    //ID 유효성 + 중복검사
    //#region
    idInput.addEventListener('input', () => {//유효성 검증증
        chkId(idInput, idMsg, idCheck);
    })

    idCheck.addEventListener('click', () => {//ID 중복 검사

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

    //PW 검증
    //#region

    //PW 유효성 검사
    writePwInput.addEventListener('input', () => {
        chkPw(writePwInput, chkPwInput, pwMsg1, pwMsg2)
    })

    //비밀번호 확인란
    chkPwInput.addEventListener('input', () => {
        chkPw2(chkPwInput, writePwInput, pwMsg1, pwMsg2);
        sumPoint();
    })

    //PW 아이콘 visible로 변경 + input type 변경
    writePwIcon.addEventListener('click', () => {//작성란 visible 버튼
        iconChange(writePwIcon, writePwInput);
    })
    chkPwIcon.addEventListener('click', () => {//확인란 visible 버튼. 내용은 위와 같음.
        iconChange(chkPwIcon, chkPwInput);
    })
    //#endregion

    //이메일 유효성 + 인증번호 검증
    //#region

    //이메일 유효성 검사
    emailInput.addEventListener('input', () => {
        chkEmail(emailInput, emailMsg, emailCheck);
        sumPoint();
    })

    //인증번호 전송 및 검증
    emailCheck.addEventListener('click', () => {
        nameInput.readOnly = true;
        idInput.readOnly = true;
        writePwInput.readOnly = true;
        chkPwInput.readOnly = true;

        sendCert(emailCheck, emailMsg);
    })

    //인증번호 검증
    certInput.addEventListener('input', () => {
        certMsg.innerHTML = `&nbsp;`;
        certInput.classList.remove('erMsg');
        sumPoint();
    })
    //#endregion

    //회원가입 클릭 이벤트
    //#region
    certCheck.addEventListener('click', () => {
        certMsg.innerHTML = `&nbsp;`;
        if (!certCheck.classList.contains('deact')) {
            let afterCert = function () {//인증번호 input == 인증번호 일 경우우
                alert(`회원가입을 마쳤습니다.\n환영합니다, ${nameInput.value}님!`)

                //회원가입 창 fade out
                box.classList.remove('fadeIn');
                box.classList.add('fadeOut');

                //뒤로가기 버튼 fade out
                backToLogIn.classList.remove('fadeIn');
                backToLogIn.classList.add('fadeOut');

                switchPage('logIn.html');
            }

            chkCert(certMsg, certInput, afterCert);
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
        if (pwMsg2.innerHTML == "* 확인되었습니다.") {
            pwPoint = 1;
        } else {
            pwPoint = 0;
        }

        //이메일 검증
        if (emailInput.value.length != 0 && !emailInput.classList.contains('erMsg')) {
            emailPoint = 1;
        } else {
            emailPoint = 0;
        }

        //인증번호 검증
        if (certInput.value.length != 0) {
            certPoint = 1;
        } else {
            certPoint = 0;
        }

        console.log(namePoint + idPoint + pwPoint + emailPoint);

        //point의 합이 4면 비활성화 풀기
        if (namePoint + idPoint + pwPoint + emailPoint == 4) {
            emailCheck.classList.remove('deact');
        } else {
            emailCheck.classList.add('deact');
        }

        //포인트의 합이 5면 회원가입 버튼 비활성화 풀기
        if (namePoint + idPoint + pwPoint + emailPoint + certPoint == 5) {
            certCheck.classList.remove('deact');
        } else {
            certCheck.classList.add('deact');
        }
    }
    //#endregion



})