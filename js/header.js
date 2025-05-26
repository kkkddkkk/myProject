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
    let addFriendDiv = friends.querySelector('.addFriendDiv');//친구신청 div
    let addFriend = friends.querySelectorAll('.addFriend');//친구신청 목록
    let friendNDiv = friends.querySelector('.friendNDiv');//친구목록 div
    let friendN = friends.querySelectorAll('.friendN');//친구목록
    let likeFriendDiv = friends.querySelector('.likeFriendDiv')//즐겨찾기 친구 div
    let normalLikeFriendDiv = friends.querySelector('.normalLikeFriendDiv');

    //친구목록 버튼
    let SearchBtn = friends.querySelector('.search').children[1]//친구검색 버튼

    //친구목록 인풋
    let searchFriendInput = friends.querySelector('.search').children[0]//친구검색 인풋
    let modiNickName = friends.querySelectorAll('.modiNickName');

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


    //기본 nav 화면이동
    moveToOthers(friendsNum, friends);
    moveToOthers(friendsNumIcon, friends);//user icon + 친구 수 클릭 시 친구목록 창 이동
    moveToSet(setAccount);//계정설정 버튼 클릭 시 개인정보 수정 화면으로 이동
    moveToOthers(alarm, alarmNav);//알람버튼 클릭 시 알람 화면으로 이동

    //임시버튼
    let myBtn = document.querySelector('header').querySelector('button');


    //친구신청 - 수락 거절버튼 클릭 이벤트
    //#region

    // friends.addEventListener('click',(event)=>{
    //     let clickedFriend = event.target.parentNode.parentNode.parentNode;//클릭된 친구
    //     let clickedBtn = event.target.parentNode;//클릭된 버튼

    //     if(clickedBtn.classList.contains('accept')){

    //     }

    // })

    addFriendDiv.addEventListener('click', (event) => {
        let clickedAddFriend = event.target.parentNode.parentNode.parentNode;//addFriend

        if (event.target.parentNode.classList.contains('accept')) {
            //친구신청 - 수락 버튼 클릭 시 친구 목록으로 위치 변환 + 이름 정렬
            let newFriend = friendN[0].cloneNode(true);//기본 친구목록 복사
            newFriend.querySelector('.fa-heart').classList.remove('fa-solid');
            newFriend.querySelector('.fa-heart').classList.add('fa-regular');//아이콘 변경

            newFriend.querySelector('.friendName').innerHTML = clickedAddFriend.querySelector('p').innerHTML;//친구 이름 복사

            friendNDiv.appendChild(newFriend);//붙여넣기
            newFriend.style.display = 'block';

            forSort(friendNDiv, 'friendName');//이름에 따른 정렬

            addFriendDiv.removeChild(clickedAddFriend);//추가된 친구를 친구신청목록에서 제거
        } else if (event.target.parentNode.classList.contains('deny')) {
            //친구신청 - 거절 버튼 클릭 시 node 삭제
            addFriendDiv.removeChild(clickedAddFriend);//노드 삭제
        }
    })

    //#endregion


    //친구 목록 이벤트(즐겨찾기, 닉네임 수정, 친구삭제)
    //#region


    normalLikeFriendDiv.addEventListener('click', (event) => {
        let clickedFriend = event.target.parentNode.parentNode.parentNode;//Friend

        if (event.target.parentNode.classList.contains('heart')) {
            //하트 버튼 클릭 시 친구목록 최상단으로 이동
            if (event.target.classList.contains('fa-regular')) {//즐겨찾기 등록
                changeIcon('fa-regular', 'fa-solid');//아이콘 변경

                let copiedFriend = clickedFriend.cloneNode(true);

                likeFriendDiv.appendChild(copiedFriend);
                friendNDiv.removeChild(clickedFriend);
                forSort(likeFriendDiv, 'friendName');//즐겨찾기 친구 정렬
            } else {//즐겨찾기 해제
                changeIcon('fa-solid', 'fa-regular');//아이콘 변경

                let copiedFriend = clickedFriend.cloneNode(true);

                likeFriendDiv.removeChild(clickedFriend);
                friendNDiv.appendChild(copiedFriend);

                forSort(friendNDiv, 'friendName');//즐겨찾기 친구 정렬
            }
        } else if (event.target.parentNode.classList.contains('modify')) {//수정 버튼 클릭 시 닉네임 수정
            if (event.target.classList.contains('fa-pen-to-square')) {//닉네임 수정
                clickedFriend.querySelector('p').style.display = 'none';
                clickedFriend.querySelector('input').style.display = 'inline-block';
                clickedFriend.querySelector('input').placeholder = clickedFriend.querySelector('p').innerHTML;//닉네임 변경 input 생성

                changeIcon('fa-pen-to-square', 'fa-check');//아이콘 변경

            } else {//닉네임 수정 완료
                clickedFriend.querySelector('input').style.display = 'none';
                clickedFriend.querySelector('p').style.display = 'inline-block';

                changeIcon('fa-check', 'fa-pen-to-square');//아이콘 변경

                if (clickedFriend.querySelector('input').value != '') {//input에 아무것도 쓰지 않을 경우
                    clickedFriend.querySelector('p').innerHTML = clickedFriend.querySelector('input').value;
                    clickedFriend.querySelector('input').value = '';
                    forSort(friendNDiv, 'friendName');
                }
            }
        } else if (event.target.parentNode.classList.contains('xMark')) {//X 버튼 클릭 시 이벤트(친구삭제)
            if (clickedFriend.parentNode.classList.contains("friendNDiv")) {
                if (confirm("친구를 삭제하시겠습니까?")) {
                    friendNDiv.removeChild(clickedFriend);
                }
            } else if (clickedFriend.parentNode.classList.contains("likeFriendDiv")) {
                if (confirm("친구를 삭제하시겠습니까?")) {
                    likeFriendDiv.removeChild(clickedFriend);
                }
            }
        }

        //icon 변경 이벤트
        function changeIcon(oldIcon, newIcon) {
            event.target.classList.remove(oldIcon);
            event.target.classList.add(newIcon);//아이콘 변경
        }
    })

    //#endregion

    //친구 목록(상세) 이벤트
    //#region

    //친구목록 창 화면 이동
    SearchBtn.addEventListener('click',()=>{
        searchUser.style.display = 'block';
    })
    // navMoves(SearchBtn, friends, searchUser);//검색버튼 클릭 시 친구검색 화면으로 이동

    searchUser.addEventListener('click',(event)=>{
        console.log(event.target);
        if(event.target.classList.contains('closeBtn')){//X버튼 클릭 이벤트
            searchUser.style.display = 'none';
            friends.style.display = 'block';
        }
        if(event.target.classList.contains('askFriend')){
            event.target.innerHTML = `수락 대기 중...&nbsp;<i class="fa-solid fa-paper-plane"></i>`;
        }
    })



    //#endregion



    //함수

    //이름 정렬 함수(function forSort(sortDiv, classNameMinusI))
    //여러 div 구분용 함수 (function nameI(0, 1, 2)nav, className, variable))
    //클래스명+n 전체삭제 함수(function delClass(className, classNameMinusI))
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

    function forSort(sortDiv, classNameMinusI) {
        let nameSort = [];//이름 정렬
        let obSort = [];
        let obSort2 = [];//이름에 따른 div 순서 정렬

        for (let j = 0; j < sortDiv.children.length; j++) {
            let findDiv = sortDiv.children[j].querySelector(`.${classNameMinusI}`)
            nameSort.push(findDiv.innerHTML);
            obSort.push(findDiv.parentNode);
            nameSort.sort();
        }
        for (let j = 0; j < nameSort.length; j++) {
            for (let k = 0; k < nameSort.length; k++)
                if (nameSort[j] == obSort[k].querySelector(`.${classNameMinusI}`).innerHTML) {
                    obSort2.push(obSort[k]);
                }
        }
        while (sortDiv.firstChild) {
            sortDiv.removeChild(sortDiv.firstChild);
        }
        for (j = 0; j < obSort.length; j++) {
            sortDiv.appendChild(obSort2[j]);
        }

        nameSort = [];//이름 정렬
        obSort = [];
        obSort2 = [];
    }

    //#endregion ================================================================> 변수명 지정 함수 끝.


    //============(세팅 nav로 변환, 기본 nav -> 타 구역으로 이동, profile 유지하며 타 구역으로 이동)
    //화면 이동 함수(moveToSet(btn), moveToOthers(btn, movingArea), mavMoves(btn,oldArea, newArea))
    //#region

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

    //#endregion =====================================================> 화면이동함수 끝.


})