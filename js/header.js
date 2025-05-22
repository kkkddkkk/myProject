document.addEventListener('DOMContentLoaded', () => {

    //여러 div 구분용 변수
    let temp, result, newClassName;

    //PW 검증(function chkPw(writePwInput, chkPwInput, pwMsg1, pwMsg2))
    //#region

    //정규식
    window.regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식

    window.chkPw = function (writePwInput, chkPwInput, pwMsg1, pwMsg2) {
        if (writePwInput.value.length == 0) {//작성란 공란일 시 작성란 기본스타일 / 확인란 비활성화
            writePwInput.classList.remove('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            chkPwInput.disabled = true;
        } else if (writePwInput.value.length < 8 || writePwInput.value.length > 15) {//글자 수 조건 미충족 시 에러 스타일 + 확인란 비활성화
            writePwInput.classList.add('erMsg');
            pwMsg1.innerHTML = "* 비밀번호는 8자~15자로 작성해주세요.";
            chkPwInput.disabled = true;
        } else {
            if (!regPw.test(writePwInput.value)) {//정규식 미충족 시 에러 스타일 + 확인란 비활성화
                writePwInput.classList.add('erMsg');
                pwMsg1.innerHTML = "* 영어, 숫자, 특수문자를 모두 활용해주세요.";
                chkPwInput.disabled = true;
            } else {//조건 충족 시 작성란 기본스타일 / 확인란 활성화
                writePwInput.classList.remove('erMsg');
                pwMsg1.innerHTML = "&nbsp;";
                chkPwInput.disabled = false;
            }
        }

        if (chkPwInput.value != writePwInput.value && !chkPwInput.value == '') {//확인란 작성 후 작성란 수정 시 확인란 에러스타일
            chkPwInput.classList.add('erMsg');
            pwMsg2.innerHTML = "* 비밀번호가 일치하지 않습니다.";
            pwMsg1.innerHTML = "&nbsp;";
        }

        if (chkPwInput.disabled == true) {//확인란 비활성화 시 기본스타일 / 내용 삭제
            chkPwInput.classList.remove('erMsg');
            pwMsg2.innerHTML = "&nbsp;";
            chkPwInput.value = '';
        }
    }
    //#endregion

    //PW 작성란 == 확인란 검증(function chkPw2(chkPwInput, writePwInput, pwMsg1, pwMsg2))
    //#region
    window.chkPw2 = function (chkPwInput, writePwInput, pwMsg1, pwMsg2) {
        if (chkPwInput.value.length == 0) {//확인란 공란일 시 기본스타일
            chkPwInput.classList.remove('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            pwMsg2.innerHTML = "&nbsp;";
        } else if (chkPwInput.value != writePwInput.value) {//작성란 != 확인란일 시 에러스타일
            chkPwInput.classList.add('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            pwMsg2.innerHTML = "* 비밀번호가 일치하지 않습니다.";
        } else {//작성란 == 확인란일 시 기본스타일
            chkPwInput.classList.remove('erMsg');
            pwMsg1.innerHTML = "&nbsp;";
            pwMsg2.innerHTML = "* 확인되었습니다.";
        }
    }
    //#endregion



    //기본 nav 변수
    //#region

    //기본 nav 페이지
    let regNav = document.querySelector('.regNav');//기본 nav
    let menu = document.querySelector('.menu');//기본 nav - 메뉴
    let logOutArea = document.querySelector('.btnArea');//기본 nav - 로그아웃 버튼 구역

    //기본 nav 버튼
    let friendsNumIcon = regNav.querySelector('.friendsNum').children[0];//userIcon
    let friendsNum = regNav.querySelector('.friendsNum').children[1];//친구 수
    let setAccount = regNav.querySelector('.setAccount');//계정 설정 버튼
    let myTask = menu.querySelector('.navMenu').children[0];//menu - 나의 업무관리
    let detailTask = menu.querySelector('.navMenu').children[1];//menu - 세부 업무 확인
    let setTheme = menu.querySelector('.navMenu').children[2];//menu - 테마 설정
    let alarm = menu.querySelector('.navMenu').children[3];//menu - 알람
    let logOut = logOutArea.querySelector('.logOutbtn');//로그아웃 버튼

    //#endregion ======================================================================> 기본 nav 변수 끝.

    //친구목록 변수
    //#region

    //친구목록 페이지
    let friends = document.querySelector('.friends');//기본 nav - 친구목록
    let addFriendI = nameI(friends, 'addFriend', 'addFriend');//친구신청 div 배열
    let friendNI = nameI(friends, 'friendN', 'friendN');//친구목록 div 배열

    //친구목록 버튼
    let acceptFriendI = nameI0(friends, 'yesOrNo', 'acceptFriend');//친구 수락 버튼
    let denyFriendI = nameI1(friends, 'yesOrNo', 'denyFriend');//친구 거절 버튼
    let addLikeFriendI = nameI0(friends, 'modiFriend', 'addLikeFriend');//즐겨찾기 친구 추가
    let modiNickNameI = nameI1(friends, 'modiFriend', 'modiNickName');//친구 별명 변경
    let delFriendI = nameI2(friends, 'modiFriend', 'delFriend');//친구삭제
    let SearchBtn = friends.querySelector('.search').children[1]//친구검색 버튼

    //친구목록 인풋
    let searchFriendInput = friends.querySelector('.search').children[0]//친구검색 인풋

    //#endregion ============================================================================> 친구목록 변수 끝.

    //친구검색 변수
    //#region
    //친구검색 페이지
    let searchUser = document.querySelector('.searchUser');//기본 nav - 친구검색

    //친구검색 버튼
    let closeBtnAtSearch = searchUser.querySelector('.closeBtn');//X 버튼
    let askFriend = searchUser.querySelector('.askFriend');//친구신청
    let acceptFriendAtSearch = searchUser.querySelector('.yesOrNo').children[0]//친구 수락 버튼
    let denyFriendAtSearch = searchUser.querySelector('.yesOrNo').children[1]//친구 거절 버튼
    let addLikeFriendAtSearch = searchUser.querySelector('.modiFriend').children[0]//즐겨찾기 친구 추가
    let modiNickNameAtSearch = searchUser.querySelector('.modiFriend').children[1]//친구 별명 변경
    let delFriendAtSearch = searchUser.querySelector('.modiFriend').children[2]//친구삭제

    //#endregion ======================================================================> 친구목록 변수 끝.

    //알람 창 변수
    //#region

    //알람 창 페이지
    let alarmNav = document.querySelector('.alarmDiv');//기본 nav - 알람
    let requestFriendI = nameI(alarmNav, 'requestFriend', 'requestFriend');//친구요청 div
    let alarmI = nameI(alarmNav, 'alarmN', 'alarmN');//알람 div

    //알람 창 버튼
    let acceptFriendAtAlarmI = nameI0(alarmNav, 'yesOrNo', 'acceptFriendAtAlarm');//친구 수락 버튼
    let denyFriendAtAlarmI = nameI1(alarmNav, 'yesOrNo', 'denyFriendAtAlarm');//친구 거절 버튼
    let alarmGoBtnI = nameI(alarmNav, 'alarmGoBtn', 'alarmGoBtn');//상세업무 화면 이동 버튼

    //#endregion ============================================================================> 알람창 변수 끝.

    //개인정보 수정 변수
    //#region

    //개인정보 수정 페이지
    let setNav = document.querySelector('.setNav');//개인정보 수정 - 이미지 창
    let chkPwDiv = setNav.querySelector('.chkPwDiv');//비밀번호 확인 페이지
    let setNamePw = setNav.querySelector('.setNamePw');//개인정보 수정 페이지(진)

    //개인정보 수정 버튼
    let addImg = setNav.querySelector('.addImg');//이미지 변경 버튼
    let chkPw = setNav.querySelector('.chkPw');//비밀번호 검증 버튼
    let chkPw2 = setNav.querySelector('.chkPw2');//개인정보 수정 버튼

    //개인정보 수정 인풋
    let myPw = setNav.querySelector('.myPw');//비밀번호 검증 인풋
    let changePw = setNav.querySelectorAll('.myPw2')[0]//비밀번호 변경 인풋
    let chkChangePw = setNav.querySelectorAll('.myPw2')[1]//비밀번호 검증 인풋(변경)

    //개인정보 수정 에러메시지
    let chkMsg = chkPwDiv.querySelector('.chkMsg');//비밀번호 일치 여부 메시지
    let pwMsg = setNamePw.querySelector('.pwMsg');//비밀번호 유효성 검사 메시지
    let chkMsg2 = setNamePw.querySelector('.chkMsg');//비밀번호 일치 여부 메시지(변경)

    //#endregion ============================================> 개인정보 수정 끝.


    function moveToSet(btn) {
        btn.addEventListener('click', () => {
            regNav.style.display = 'none';
            setNav.style.display = 'block';
        })
    }
    function moveToOthers(btn, movingArea) {
        btn.addEventListener('click', () => {
            menu.style.display = 'none';
            logOutArea.style.display = 'none';
            movingArea.style.display = 'block';
        })
    }
    function navMoves(btn, oldArea, newArea) {
        btn.addEventListener('click', () => {
            oldArea.style.display = 'none';
            newArea.style.display = 'block';
        })
    }

    //기본 nav
    moveToOthers(friendsNum, friends);
    moveToOthers(friendsNumIcon, friends);//user icon + 친구 수 클릭 시 친구목록 창 이동
    moveToSet(setAccount);//계정설정 버튼 클릭 시 개인정보 수정 화면으로 이동
    moveToOthers(alarm, alarmNav);//알람버튼 클릭 시 알람 화면으로 이동

    //친구목록 창
    navMoves(SearchBtn, friends, searchUser);//검색버튼 클릭 시 친구검색 화면으로 이동

    for (let i = 0; i < acceptFriendI.length; i++) {
        acceptFriendI[i].addEventListener('click', () => {
            addFriendI[i].classList.remove('addFriend');
            addFriendI[i].classList.remove(`addFriend${i}`);
            addFriendI[i].classList.add('friendN');
        })
    }




    //여러 div 구분용 함수 (function nameI(0, 1, 2)nav, className, variable))
    //#region

    function nameI(nav, className, variable) {
        temp = nav.querySelectorAll(`.${className}`);
        result = [];
        for (let i = 0; i < temp.length; i++) {
            newClassName = `${variable}${i}`;
            temp[i].classList.add(newClassName);
            result[i] = nav.querySelector(`.${variable}${i}`);
        }
        return result;
    }

    function nameI0(nav, className, variable) {
        temp = nav.querySelectorAll(`.${className}`);
        result = [];
        for (let i = 0; i < temp.length; i++) {
            newClassName = `${variable}${i}`;
            temp[i].classList.add(newClassName);
            result[i] = nav.querySelector(`.${variable}${i}`).querySelectorAll('li')[0];
        }
        return result;
    }

    function nameI1(nav, className, variable) {
        temp = nav.querySelectorAll(`.${className}`);
        result = [];
        for (let i = 0; i < temp.length; i++) {
            newClassName = `${variable}${i}`;
            temp[i].classList.add(newClassName);
            result[i] = nav.querySelector(`.${variable}${i}`).children[1];
        }
        return result;
    }

    function nameI2(nav, className, variable) {
        temp = nav.querySelectorAll(`.${className}`);
        result = [];
        for (let i = 0; i < temp.length; i++) {
            newClassName = `${variable}${i}`;
            temp[i].classList.add(newClassName);
            result[i] = nav.querySelector(`.${variable}${i}`).children[2];
        }
        return result;
    }

    //#endregion ================================================================> 변수명 지정 함수 끝.



})