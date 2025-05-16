document.addEventListener('DOMContentLoaded', function () {


    //회원가입 버튼 활성화를 위한 임시 변수
    let namePoint, idPoint, pwPoint, emailPoint, certPoint;

    //#region
    //인풋
    let nameInput, idInput;
    nameInput = document.querySelector('.name');//이름 입력 인풋
    idInput = document.querySelector('.joinUsId').children[0];//ID 입력 인풋

    //에러메시지
    let nameMsg, idMsg, PwMsg, emailMsg, certMsg;
    nameMsg = document.querySelector('.nameMsg');//이름 오류 메세지
    idMsg = document.querySelector('.idMsg');//ID 에러 메시지
    PwMsg = document.querySelectorAll('.pwCheck');//PW 에러 메시지 [0]작성란 [1]확인란
    emailMsg = document.querySelector('.emailMsg');//이메일 오류 메시지
    certMsg = document.querySelector('.certMsg');//인증번호 오류 메시지

    //비밀번호 PW 관련. [0]=input, [1]=img
    let writePw, checkPw;
    writePw = document.querySelectorAll('.writePw');//비밀번호 작성
    checkPw = document.querySelectorAll('.checkPw');//비밀번호 확인

    //이메일 + 회원가입 관련. [0]=input, [1]=버튼
    let joinUsEmail, joinUsCert;
    joinUsEmail = document.querySelector('.joinUsEmail').children;//이메일+인증번호 전송
    joinUsCert = document.querySelector('.joinUsCert').children;//인증번호+회원가입

    //버튼
    let idCheck;
    idCheck = document.querySelector('.joinUsId').querySelector('div');//중복 확인 버튼

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
    idInput.addEventListener('input', () => {
        if (idInput.value.length == 0) {//ID란이 공란이면 기본 스타일
            idInput.classList.remove('erMsg');
            idMsg.innerHTML = "&nbsp;";
            idCheck.classList.add('deact')
        } else if (idInput.value.length < 6 || idInput.value.length > 20) {//글자 수 조건 어길 시 에러 스타일
            idInput.classList.add('erMsg');
            idMsg.innerHTML = "* ID는 6자~20자로 작성해주세요.";
            idCheck.classList.add('deact')
        } else {
            if (!regId.test(idInput.value)) {//영숫자 조건 어길 시 에러 스타일
                idInput.classList.add('erMsg');
                idMsg.innerHTML = "* ID는 영어, 숫자로만 작성해주세요.";
                idCheck.classList.add('deact')
            } else {//조건 모두 충족할 시 기본 스타일 스타일
                idInput.classList.remove('erMsg');
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
            PwMsg[0].innerHTML = "&nbsp;";
            checkPw[0].disabled = true;
        } else if (writePw[0].value.length < 8 || writePw[0].value.length > 15) {//글자 수 조건 미충족 시 에러 스타일 + 확인란 비활성화
            writePw[0].classList.add('erMsg');
            PwMsg[0].innerHTML = "* 비밀번호는 8자~15자로 작성해주세요.";
            checkPw[0].disabled = true;
        } else {
            if (!regPw.test(writePw[0].value)) {//정규식 미충족 시 에러 스타일 + 확인란 비활성화
                writePw[0].classList.add('erMsg');
                PwMsg[0].innerHTML = "* 영어, 숫자, 특수문자를 모두 활용해주세요.";
                checkPw[0].disabled = true;
            } else {//조건 충족 시 작성란 기본스타일 / 확인란 활성화
                writePw[0].classList.remove('erMsg');
                PwMsg[0].innerHTML = "&nbsp;";
                checkPw[0].disabled = false;
            }
        }

        if (checkPw[0].value != writePw[0].value && !checkPw[0].value == '') {//확인란 작성 후 작성란 수정 시 확인란 에러스타일
            checkPw[0].classList.add('erMsg');
            PwMsg[1].innerHTML = "* 비밀번호가 일치하지 않습니다.";
            PwMsg[0].innerHTML = "&nbsp;";
        }

        if (checkPw[0].disabled == true) {//확인란 비활성화 시 기본스타일 / 내용 삭제
            checkPw[0].classList.remove('erMsg');
            PwMsg[1].innerHTML = "&nbsp;";
            checkPw[0].value = '';
        }
    })//PW 유효성 검사 끝.
    //#endregion

    //비밀번호 확인란
    //#region
    checkPw[0].addEventListener('input', () => {

        if (checkPw[0].value.length == 0) {//확인란 공란일 시 기본스타일
            checkPw[0].classList.remove('erMsg');
            PwMsg[0].innerHTML = "&nbsp;";
            PwMsg[1].innerHTML = "&nbsp;";
        } else if (checkPw[0].value != writePw[0].value) {//작성란 != 확인란일 시 에러스타일
            checkPw[0].classList.add('erMsg');
            PwMsg[0].innerHTML = "&nbsp;";
            PwMsg[1].innerHTML = "* 비밀번호가 일치하지 않습니다.";
        } else {//작성란 == 확인란일 시 기본스타일
            checkPw[0].classList.remove('erMsg');
            PwMsg[0].innerHTML = "&nbsp;";
            PwMsg[1].innerHTML = "* 확인되었습니다.";
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
            idInput.readOnly = true;
            writePw[0].readOnly = true;
            checkPw[0].readOnly = true;

            certNum = parseInt(Math.random() * 1000000)// 6자리 인증번호

            console.log(certNum);
            alert('인증번호를 발송하였습니다.');
            joinUsEmail[1].innerHTML = '인증번호 재전송';

            emailMsg.innerHTML = `* 05 : 00`;
            timer5min(emailMsg);

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
                box.classList.remove('fadeIn');
                box.classList.add('fadeOut');

                //뒤로가기 버튼 fade out
                backToLogIn.classList.remove('fadeIn');
                backToLogIn.classList.add('fadeOut');

                switchPage('logIn.html');
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
        if (PwMsg[1].innerHTML == "* 확인되었습니다.") {
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

        console.log(namePoint + idPoint + pwPoint + emailPoint);

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



})