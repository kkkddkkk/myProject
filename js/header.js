document.addEventListener('DOMContentLoaded', () => {

    //여러 div 구분용 변수
    let temp, result, newClassName;

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

    //프로필 요소
    let name = regNav.querySelector('.name');//프로필 - 이름
    let profileImg = regNav.querySelector('.profileImg');//프로필 - 사진

    //#endregion ======================================================================> 기본 nav 변수 끝.

    //친구목록 변수
    //#region

    //친구목록 페이지
    let friends = document.querySelector('.friends');//기본 nav - 친구목록
    let addFriendDiv = friends.querySelector('.addFriendDiv');//친구신청 div
    // let addFriend = friends.querySelectorAll('.addFriend');//친구신청 목록
    let friendNDiv = friends.querySelector('.friendNDiv');//친구목록 div
    let friendN = friends.querySelectorAll('.friendN');//친구목록
    let likeFriendDiv = friends.querySelector('.likeFriendDiv')//즐겨찾기 친구 div
    let normalLikeFriendDiv = friends.querySelector('.normalLikeFriendDiv');

    //친구목록 버튼
    let SearchBtn = friends.querySelector('.search').children[1]//친구검색 버튼
    let backBtn = friends.querySelector('.backBtn2');

    //친구목록 인풋
    let searchFriendInput = friends.querySelector('.search').children[0]//친구검색 인풋

    //#endregion ============================================================================> 친구목록 변수 끝.

    //친구검색 변수
    //#region
    //친구검색 페이지
    let searchUserBG = document.querySelector('.searchUserBG');//nav 전체모달 배경
    let searchUser = document.querySelector('.searchUser');//기본 nav - 친구검색


    //친구검색 버튼
    let askFriend = searchUser.querySelector('.askFriend');//친구신청
    let yesOrNoAtSearch = searchUser.querySelector('.yesOrNo');
    let modiFriendAtSearch = searchUser.querySelector('.modiFriend2');
    //#endregion ======================================================================> 친구목록 변수 끝.

    //알람 창 변수
    //#region

    //알람 창 페이지
    let alarmDiv = document.querySelector('.alarmDiv');//기본 nav - 알람
    let requestFriend = alarmDiv.querySelectorAll('.requestFriend');//친구요청 div
    let alarmN = alarmDiv.querySelectorAll('.alarmN')//알람 div

    //알람 창 버튼
    let backBtn2 = alarmDiv.querySelector('.backBtn2');//뒤로가기 버튼튼

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
    let backBtnAtSet = setNav.querySelector('.backBtn2');//뒤로가기버튼

    //개인정보 수정 인풋
    let bigProfileImg = setNav.querySelector('.bigProfileImg');//프로필 사진
    let file = setNav.querySelector('#file');//사진 변경 인풋
    let myName = setNav.querySelector('.myName');//이름 인풋
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
    // moveToSet(setAccount);//계정설정 버튼 클릭 시 개인정보 수정 화면으로 이동
    setAccount.addEventListener('click', () => {
        regNav.style.display = 'none';
        friends.style.display = 'none';
        alarmDiv.style.display = 'none';
        setNav.style.display = 'block';
        chkPwDiv.style.display = 'block';
    })

    moveToOthers(alarm, alarmDiv);//알람버튼 클릭 시 알람 화면으로 이동

    //임시버튼
    // let myBtn = document.querySelector('header').querySelector('button');


    //친구신청 - 수락 거절버튼 클릭 이벤트
    //#region

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
        if (event.target.tagName == 'IMG') {//이미지 클릭 시 친구 상세페이지
            searchUserBG.style.display = 'block';
            searchUser.querySelector('p').innerHTML = event.target.parentNode.querySelector('p').innerHTML
            yesOrNoAtSearch.style.display = 'flex';
            modiFriendAtSearch.style.display = 'none';
            askFriend.style.display = 'none';
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
        } else if (event.target.tagName == 'IMG') {//이미지 클릭 시 친구 상세페이지
            searchUserBG.style.display = 'block';
            searchUser.querySelector('p').innerHTML = event.target.parentNode.querySelector('p').innerHTML
            yesOrNoAtSearch.style.display = 'none';
            modiFriendAtSearch.style.display = 'flex';
            askFriend.style.display = 'none';
        }
    })

    backToMenu(backBtn, friends)//뒤로가기 클릭 시 메뉴로 이동

    //#endregion

    //친구 목록(상세) 이벤트
    //#region

    //친구목록 창 화면 이동
    SearchBtn.addEventListener('click', () => {
        searchUserBG.style.display = 'block';
        if (confirm("친구인가요?")) {//db 연결 후 수정
            yesOrNoAtSearch.style.display = 'none';
            modiFriendAtSearch.style.display = 'flex';
            askFriend.style.display = 'none';
        } else if (confirm("친구 신청 상태인가요?")) {//db 연결 후 수정
            yesOrNoAtSearch.style.display = 'flex';
            modiFriendAtSearch.style.display = 'none';
            askFriend.style.display = 'none';
        } else {//db 연결 후 수정
            yesOrNoAtSearch.style.display = 'none';
            modiFriendAtSearch.style.display = 'none';
            askFriend.style.display = 'block';
        }
    })

    searchUser.addEventListener('click', (event) => {
        if (event.target.classList.contains('closeBtn')) {//X버튼 클릭 이벤트
            searchUserBG.style.display = 'none';
        }
        if (event.target.tagName == 'BUTTON' && event.target.children[0].classList.contains('fa-user-plus')) {
            console.log(event.target.children);
            event.target.innerHTML = `수락 대기 중...&nbsp;<i class="fa-solid fa-paper-plane"></i>`;
        } else if (event.target.tagName == 'BUTTON' && event.target.children[0].classList.contains('fa-paper-plane')) {
            event.target.innerHTML = `<i class="fa-solid fa-user-plus textColor"></i>&nbsp;친구신청`;
        }

        let icon, userDiv;
        if (event.target.tagName == 'I') {
            icon = event.target;
            userDiv = event.target.parentNode.parentNode.parentNode.querySelector('p').innerHTML;
        } else if (event.target.tagName == 'LI') {
            icon = event.target.querySelector('i');
            userDiv = event.target.parentNode.parentNode;
        }
        console.log(userDiv);

        if (icon.classList.contains('fa-heart') && icon.classList.contains('fa-regular')) {
            changeIconList(icon, 'fa-regular', 'fa-solid');//아이콘 변경
        } else if (icon.classList.contains('fa-heart') && icon.classList.contains('fa-solid')) {
            changeIconList(icon, 'fa-solid', 'fa-regular');//아이콘 변경
        }
    })

    //#endregion

    //알람 이벤트
    //#region

    //

    forNew(requestFriend);//친구신청 new 이벤트
    forNew(alarmN)//task 관련 new 이벤트

    alarmDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-xmark')) {//X 버튼 클릭 시 삭제
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }
    })
    backToMenu(backBtn2, alarmDiv)//뒤로가기 클릭 시 메뉴로 이동
    //#endregion =============================================================> 알람창 이벤트 끝끝

    //설정 이벤트
    //#region

    //비밀번호 확인 클릭 이벤트
    chkPw.addEventListener('click', () => {
        if (confirm("비밀번호 일치?")) {//db 추가 후 수정
            chkPwDiv.style.display = 'none';
            setNamePw.style.display = 'block';
            addImg.style.display = 'block';

            changePw.value = myPw.value;
            chkChangePw.value = myPw.value;
            myPw.value = '';//input 초기화
        } else {
            myPw.classList.add('erMsg');
            chkMsg.innerHTML = '* 비밀번호가 일치하지 않습니다.';
        }
    })
    myPw.addEventListener('input', () => {
        myPw.classList.remove('erMsg');
        chkMsg.innerHTML = `&nbsp;`;
    })

    //비밀번호 변경 이벤트
    window.regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;//pw 정규식

    changePw.addEventListener('input', () => {
        if (changePw.value.length == 0) {//작성란 공란일 시 작성란 기본스타일 / 확인란 비활성화
            changePw.classList.remove('erMsg');
            pwMsg.innerHTML = "&nbsp;";
            chkChangePw.disabled = true;
        } else if (changePw.value.length < 8 || changePw.value.length > 15) {//글자 수 조건 미충족 시 에러 스타일 + 확인란 비활성화
            changePw.classList.add('erMsg');
            pwMsg.innerHTML = "* 비밀번호는 8자~15자로 작성해주세요.";
            chkChangePw.disabled = true;
        } else {
            if (!regPw.test(changePw.value)) {//정규식 미충족 시 에러 스타일 + 확인란 비활성화
                changePw.classList.add('erMsg');
                pwMsg.innerHTML = "* 영어, 숫자, 특수문자를 모두 활용해주세요.";
                chkChangePw.disabled = true;
            } else {//조건 충족 시 작성란 기본스타일 / 확인란 활성화
                changePw.classList.remove('erMsg');
                pwMsg.innerHTML = "&nbsp;";
                chkChangePw.disabled = false;
            }
        }
        if (chkChangePw.value != changePw.value && !chkChangePw.value == '') {//확인란 작성 후 작성란 수정 시 확인란 에러스타일
            chkChangePw.classList.add('erMsg');
            chkMsg2.innerHTML = "* 비밀번호가 일치하지 않습니다.";
            pwMsg.innerHTML = "&nbsp;";
        }
        if (chkChangePw.disabled == true) {//확인란 비활성화 시 기본스타일 / 내용 삭제
            chkChangePw.classList.remove('erMsg');
            chkMsg2.innerHTML = "&nbsp;";
            chkChangePw.value = '';
        }
    })
    chkPw2.addEventListener('click', () => {
        if (chkChangePw.value.length == 0) {//확인란 공란일 시 기본스타일
            chkChangePw.classList.remove('erMsg');
            pwMsg.innerHTML = "&nbsp;";
            chkMsg2.innerHTML = "&nbsp;";
        } else if (chkChangePw.value != changePw.value) {//작성란 != 확인란일 시 에러스타일
            console.log('chkChangePw.value != changePw.value');
            chkChangePw.classList.add('erMsg');
            pwMsg.innerHTML = "&nbsp;";
            chkMsg2.innerHTML = "* 비밀번호가 일치하지 않습니다.";
        } else {//작성란 == 확인란일 시 기본스타일
            chkChangePw.classList.remove('erMsg');
            pwMsg.innerHTML = "&nbsp;";
            chkMsg2.innerHTML = "&nbsp;";
            if (confirm('저장하시겠습니까?')) {
                name.innerHTML = myName.value;//이름 변경
                profileImg.src = bigProfileImg.src//사진 변경
                setNav.style.display = 'none';
                setNamePw.style.display = 'none';
                addImg.style.display = 'none';
                regNav.style.display = 'block';
                menu.style.display = 'block';//화면전환
            }
        }
    })

    chkChangePw.addEventListener('input', () => {
        chkChangePw.classList.remove('erMsg');
        pwMsg.innerHTML = "&nbsp;";
        chkMsg2.innerHTML = "&nbsp;";
    })

    //프로필 사진 선택
    file.addEventListener('change', (event) => {
        let getFile = event.target.files[0];
        if (getFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                bigProfileImg.src = e.target.result;
            };
            reader.readAsDataURL(getFile);
        }
    })

    //뒤로가기 버튼 이벤트
    backBtnAtSet.addEventListener('click', (event) => {//뒤로가기 클릭 시 기본메뉴로 화면 이동
        if (event.target.tagName == 'P' || event.target.tagName == 'I') {
            if (chkPwDiv.style.display == 'block') {
                setNav.style.display = 'none';
                chkPwDiv.style.display = 'none';
                regNav.style.display = 'block';
                menu.style.display = 'block';
                logOutArea.style.display = 'block';
            } else if (setNamePw.style.display == 'block') {
                setNamePw.style.display = 'none';
                setNav.style.display = 'block';
                chkPwDiv.style.display = 'block';
                addImg.style.display = 'none';
            }
        }
    })

    //#endregion ================================================ 설정 이벤트 끝

    //함수

    //이름 정렬 함수(function forSort(sortDiv, classNameMinusI))
    //#region

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

    //icon 변경 함수(changeIcon(oldIcon, newIcon))
    //#region
    function changeIcon(oldIcon, newIcon) {
        event.target.classList.remove(oldIcon);
        event.target.classList.add(newIcon);//아이콘 변경
    }
    function changeIconList(event, oldIcon, newIcon) {
        event.classList.remove(oldIcon);
        event.classList.add(newIcon);//아이콘 변경

    }

    //#endregion

    //화면 이동 함수(moveToOthers(btn, movingArea))
    //#region
    function moveToOthers(btn, movingArea) {
        btn.addEventListener('click', () => {
            menu.style.display = 'none';
            logOutArea.style.display = 'none';
            movingArea.style.display = 'block';
        })
    }

    function backToMenu(btn, oldArea) {
        btn.addEventListener('click', (event) => {//뒤로가기 클릭 시 기본메뉴로 화면 이동
            if (event.target.tagName == 'P' || event.target.tagName == 'I') {
                oldArea.style.display = 'none';
                menu.style.display = 'block';
                logOutArea.style.display = 'block';
            }
        })
    }


    //#endregion =====================================================> 화면이동함수 끝.


    //alarm new 깜빡임 + 사라짐 효과 이벤트
    //#region

    function forNew(alarmOne) {
        let date = new Date();
        let fullDate = "&nbsp;" + date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
        for (let i of alarmOne) {//requestFriend 배열 순회 =====================================>여기부터 확인!(5/29)
            i.querySelector('.forNew').innerHTML = fullDate + "&nbsp;&nbsp;NEW!";
            let observe1 = new MutationObserver((list) => {
                for (let mutation of list) {//MutationRecord를 순회하며
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {//attribute의 style 을 감시
                        if (window.getComputedStyle(alarmDiv).display === 'block') {//alarmDiv가 block 상태라면

                            let observe2 = new IntersectionObserver((entries, observer) => {//요소가 뷰포인트 안에 있는지 감시
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {

                                        for (let j = 1; j <= 2; j++) {//NEW! 문자 깜빡임.(2번)
                                            setTimeout(() => {
                                                if (i.querySelector('.forDate').classList.contains('forNew')) {
                                                    i.querySelector('.forNew').innerHTML = fullDate;
                                                }
                                            }, 600 * j + 600 * (j - 1));
                                            setTimeout(() => {
                                                if (i.querySelector('.forDate').classList.contains('forNew')) {
                                                    i.querySelector('.forNew').innerHTML = fullDate + "&nbsp;&nbsp;NEW!";
                                                }

                                            }, 600 * j * 2);
                                        }
                                        observer.unobserve(entry.target);
                                    }
                                });
                            });
                            observe2.observe(i);
                        } else if (window.getComputedStyle(alarmDiv).display === 'none') {//최초 한 번만 수행함.
                            i.querySelector('.forNew').innerHTML = fullDate;
                            i.querySelector('.forDate').classList.remove('forNew');
                        }
                    }
                }
            })
            observe1.observe(alarmDiv, { attributes: true });
        }
    }

    //#endregion
})