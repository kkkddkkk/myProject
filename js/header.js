document.addEventListener('DOMContentLoaded', () => {


    //여러 div 구분용 함수 (function nameI(nav, className, variable))
    function nameI(nav, className, variable) {
        let temp = nav.querySelectorAll(`.${className}`);
        for (i = 0; i < temp.length; i++) {
            temp[i].classList += ` ${variable}${i}`;
            nav.querySelector(`.${variable}${i}`);
        }
    }

    //기본 nav 변수
    //#region

    //기본 nav 페이지
    let regNav = document.querySelector('.regNav');//기본 nav
    let menu = document.querySelector('.menu');//기본 nav - 메뉴
    let logOutArea = document.querySelector('.btnArea');//기본 nav - 로그아웃 버튼 구역

    //기본 nav 버튼
    let friendsNum = document.querySelector('.friendsNum');//친구 수 명시
    let setAccount = document.querySelector('.setAccount');//계정 설정 버튼
    let myTask = document.querySelector('.navMenu').children[0];//menu - 나의 업무관리
    let detailTask = document.querySelector('.navMenu').children[1];//menu - 세부 업무 확인
    let setTheme = document.querySelector('.navMenu').children[2];//menu - 테마 설정
    let alarm = document.querySelector('.navMenu').children[3];//menu - 알람
    let logOut = document.querySelector('.logOutbtn');//로그아웃 버튼
    let SearchBtn = document.querySelector('.search').children[1];//친구검색 버튼

    //#endregion ============================================================================> 친구목록 변수 끝.

    //친구목록 변수
    //#region

    //친구목록 페이지
    let friends = document.querySelector('.friends');//기본 nav - 친구목록
    nameI(friends, 'addFriend', 'addFriend');//친구신청 div - addFriend + n
    nameI(friends, 'friendN', 'friendN');//친구목록 div - friendN + n

    //친구목록 버튼
    let closeBtn = document.querySelector('.closeBtn');//닫기버튼
    let acceptFriend = friends.querySelector('.yesOrNo').children[0]//친구 수락 버튼
    let denyFriend = friends.querySelector('.yesOrNo').children[1]//친구 거절 버튼
    let addLikeFriend = friends.querySelector('.modiFriend').children[0]//즐겨찾기 친구 추가
    let modiNickName = friends.querySelector('.modiFriend').children[1]//친구 별명 변경
    let delFriend = friends.querySelector('.modiFriend').children[2]//친구삭제
    let searchFriendBtn = friends.querySelector('.search').children[1]//친구검색 버튼

    //친구목록 인풋
    let searchFriendInput = friends.querySelector('.search').children[0]//친구검색 인풋

    //#endregion ============================================================================> 친구목록 변수 끝.

    //친구검색 변수
    //#region
    //친구검색 페이지
    let searchUser = document.querySelector('.searchUser');//기본 nav - 친구검색

    //친구검색 버튼
    let closeBtnAtSearch = searchUser.querySelector('.closeBtn');//X 버튼
    let askFriend = document.querySelector('.askFriend');//친구신청
    let acceptFriendAtSearch = searchUser.querySelector('.yesOrNo').children[0]//친구 수락 버튼
    let denyFriendAtSearch = searchUser.querySelector('.yesOrNo').children[1]//친구 거절 버튼
    let addLikeFriendAtSearch = searchUser.querySelector('.modiFriend').children[0]//즐겨찾기 친구 추가
    let modiNickNameAtSearch = searchUser.querySelector('.modiFriend').children[1]//친구 별명 변경
    let delFriendAtSearch = searchUser.querySelector('.modiFriend').children[2]//친구삭제

    //#endregion ============================================================================> 친구목록 변수 끝.

    //알람 창 변수
    //#region

    //알람 창 페이지
    let alarmNav = document.querySelector('.alarmDiv');//기본 nav - 알람
    let requestFriend = alarmNav.querySelector('.requestFriend');//친구요청 div
    let alarmN = alarmNav.querySelector('.alarmN');//알람 div

    //알람 창 버튼
    let acceptFriendAtAlarm = alarmNav.querySelector('.yesOrNo').children[0];//친구수락버튼
    let denyFriendAtAlarm = alarmNav.querySelector('.yesOrNo').children[1];//친구거절버튼


    //#endregion ============================================================================> 알람창 변수 끝.

    //개인정보 수정 페이지
    let setNav = document.querySelector('.setNav');//개인정보 수정 페이지


    console.log(SearchBtn);


    //정규식
    window.regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식


    //PW 검증(function chkPw(writePwInput, chkPwInput, pwMsg1, pwMsg2))
    //#region
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







})