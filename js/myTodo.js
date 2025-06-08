
document.addEventListener('DOMContentLoaded', () => {

    let dropDown = document.querySelector('.dropDown');//드롭다운메뉴
    let dropMenu = document.querySelectorAll('.dropMenu');
    let addNewTask = document.querySelector('.addNewTask');
    let innerWrap = document.querySelector('.innerWrap');

    let divisionName = document.querySelector('.divisionName').children[1].innerHTML;//division명

    let showDivision = document.querySelector('.showDivision');//division 구역
    let divisionBtns = document.querySelector('.divisionBtns');//division 버튼 구역

    let subDivisionUl = document.querySelectorAll('.subDivisionUl');//subdivision구역
    let subDivisionBtns = document.querySelector('.subDivisionBtns');//subdivision 버튼 구역

    let taskUl = document.querySelectorAll('.taskUl');//전체 task
    let taskBtns = document.querySelector('.taskBtns');//task 버튼 구역

    //모달 변수
    let modalBGAtPage = document.querySelector('.modalBGAtPage');//모달 배경
    let modalAtPage = document.querySelector('.modalAtPage');//모달
    let withFriends = document.querySelector('.withFriends');//친구 추가 div
    let friendsListDiv = document.querySelector('.friendsListDiv');//친구 list 전체
    let searchFriendDiv = document.querySelector('.searchFriendDiv');//검색 결과 list 전체

    let diviNameInput = document.querySelector('.diviNameInput');//division 명 수정 input

    let addFriendsBtn = document.querySelector('.friendsListTitle').querySelector('button');//친구 추가 버튼
    let checkAtModal = document.querySelector('.checkAtModal');//확인버튼

    let clone;

    //dropdown 메뉴 이벤트
    dropDownMenu();

    //divisionBtns 클릭 이벤트
    //#region

    let clicked, clickedIcon;
    divisionBtns.addEventListener('click', (event) => {

        clickAddModiIcon('fa-pen-to-square', event, document.querySelector('.divisionName').children[1].innerHTML);//수정 Icon 클릭 이벤트
        clickAddModiIcon('fa-plus', event, '');//addIcon 클릭 이벤트

        if (event.target.classList.contains('fa-xmark')) {//xIcon 클릭 이벤트
            if (confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) {
                //subDivision 삭제
                for (let i = 0; i < subDivisionUl.length; i++) {
                    if (subDivisionUl[i].classList.contains(dropDown.value)) {
                        innerWrap.removeChild(subDivisionUl[i]);
                    }
                }

                for (let i = 0; i < dropMenu.length; i++) {
                    //드롭메뉴 삭제
                    if (document.querySelector('.divisionName').children[1].innerHTML == dropMenu[i].innerHTML) {
                        dropDown.removeChild(dropMenu[i]);
                        if (dropMenu[i + 1] == null) {
                            addNewTask.selected = true;
                        } else {
                            dropMenu[i + 1].selected = true;
                        }
                    }
                    dropDownMenu();//드롭메뉴 재정리
                }

                //division명 변경
                document.querySelector('.divisionName').children[1].innerHTML = dropDown.value;

                //해당 subdivision 목록을 block으로
                for (let i = 0; i < subDivisionUl.length; i++) {
                    if (subDivisionUl[i].classList.contains(dropDown.value)) {
                        subDivisionUl[i].style.display = 'block';
                    }
                }
            }
        }
    })

    //#endregion =================================> divisionBtns 클릭 이벤트 끝.

    //subDivisionBtns 클릭 이벤트
    //#region

    innerWrap.addEventListener('click', (event) => {

        if (event.target.parentNode.parentNode.parentNode.tagName == 'LI') {//subDivision 수정
            let thisSubDiviName = event.target.parentNode.parentNode.querySelector('.subDivisionName').querySelector('p').innerHTML;
            clickAddModiIcon('fa-pen-to-square', event, thisSubDiviName);
        }

        //subDivision 삭제
        if (event.target.classList.contains('fa-xmark') && event.target.parentNode.parentNode.parentNode.tagName == 'LI') {
            if (confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) {
                for (let i = 0; i < subDivisionUl.length; i++) {
                    if (subDivisionUl[i].style.display == 'block') {
                        subDivisionUl[i].removeChild(event.target.parentNode.parentNode.parentNode);
                    }
                }
            }
        }

        //task 추가
        if (event.target.classList.contains('fa-plus')) {

        }

        //task 펼치기, 접기
        if (event.target.classList.contains('fa-angle-down')) {
            let thisTaskUl = event.target.parentNode.parentNode.parentNode.querySelector('.taskUl');

            event.target.classList.remove('fa-angle-down');
            event.target.classList.add('fa-angle-up');//아이콘 변경

            thisTaskUl.style.maxHeight = thisTaskUl.scrollHeight + 'px';
        } else if (event.target.classList.contains('fa-angle-up')) {
            let thisTaskUl = event.target.parentNode.parentNode.parentNode.querySelector('.taskUl');

            event.target.classList.remove('fa-angle-up');
            event.target.classList.add('fa-angle-down');//아이콘 변경

            thisTaskUl.style.maxHeight = null;
        }
    })

    //#endregion =================================> subDivisionBtns 클릭 이벤트 끝.

    //taskBtns 클릭 이벤트
    //#region
    taskBtns.addEventListener('click', (event) => {

    })


    //#endregion =================================> taskBtns 클릭 이벤트 끝.

    //모달 이벤트
    //#region

    //친구목록 hover 시 친구삭제 버튼을 block으로
    hoverIcon(friendsListDiv, 'friendsList');

    //친구삭제 버튼 클릭 시 친구삭제
    friendsListDiv.addEventListener('click', (event) => {
        if (event.target.closest('.friendsList')) {
            friendsListDiv.removeChild(event.target.closest('.friendsList'));
        }
    })

    //친구추가 버튼 클릭 시 친구검색 화면으로 이동
    addFriendsBtn.addEventListener('click', () => {
        if (addFriendsBtn.innerHTML == '추가') {
            friendsListDiv.style.display = 'none';
            searchFriendDiv.style.display = 'block';
            addFriendsBtn.innerHTML = '닫기';
        } else {
            searchFriendDiv.style.display = 'none';
            friendsListDiv.style.display = 'block';
            addFriendsBtn.innerHTML = '추가';
        }
    })

    //검색목록 hover 시 친구추가 버튼을 block으로
    hoverIcon(searchFriendDiv, 'searchList');

    //친구추가 버튼 클릭 시 친구추가
    searchFriendDiv.addEventListener('click', (event) => {
        if (event.target.parentNode.classList.contains('added')) return;

        clone = friendsListDiv.children[0].cloneNode(true);
        clone.querySelector('p').innerHTML = event.target.closest('.searchList').querySelector('p').innerHTML;
        clone.querySelector('img').src = event.target.closest('.searchList').querySelector('img').src;
        clone.style.display = 'flex';
        friendsListDiv.appendChild(clone);

        //중복추가 방지
        event.target.parentNode.classList.add('added');
    })

    modalAtPage.addEventListener('click', (event) => {
        //닫기 버튼
        if (event.target.closest('.xBtn')) {
            modalBGAtPage.style.display = 'none';
        }

        //division/subDivision/task 구역 설정

        //확인 버튼
        if (event.target.classList.contains('checkAtModal')) {
            //수정 시 이벤트
            if (confirm('저장하시겠습니까?')) {
                if (clickedIcon == 'fa-pen-to-square') {
                    //division 명 수정 시 dropmenu도 변경
                    if (clicked.parentNode.classList.contains('divisionName')) {
                        for (let i = 0; i < dropMenu.length; i++) {
                            if (clicked.innerHTML == dropMenu[i].innerHTML) {
                                dropMenu[i].innerHTML = diviNameInput.value;
                            }
                        }
                    }
                    clicked.innerHTML = diviNameInput.value;//변경된 division명 저장
                    dropDownMenu();
                } else {//division- 추가버튼 클릭 시 subDivision 추가
                    clone = document.querySelectorAll('.subDivisionLi')[0].cloneNode(true);
                    let thisDiviUl;
                    for (let i = 0; i < subDivisionUl.length; i++) {
                        if (subDivisionUl[i].style.display == 'block') {
                            thisDiviUl = subDivisionUl[i];
                        }
                    }
                    clone.style.display = 'block';
                    clone.querySelector('.subDivisionName').querySelector('p').innerHTML = diviNameInput.value;
                    thisDiviUl.appendChild(clone);
                }
                modalBGAtPage.style.display = 'none';
            }
        }


    })
    //#endregion =================================> 모달 이벤트 끝.






    //function
    //#region[function]

    //dropDownMenu()
    function dropDownMenu() {
        //division이 1개 이상 있을 시, 첫번째 division을 메인으로
        if (dropDown.value != '새 업무 추가') {
            divisionName = dropDown.options[dropDown.selectedIndex].text;
        } else {
            showDivision.style.display = 'none';
            for (let i = 0; i < subDivisionUl.length; i++) {
                subDivisionUl[i].style.display = 'none';
            }

        }

        dropDown.addEventListener('change', () => {
            if (dropDown.value != '새 업무 추가') {//SELECT 값 선택 시 해당 DIVISION으로 내용 변경
                document.querySelector('.divisionName').children[1].innerHTML = dropDown.options[dropDown.selectedIndex].text;

                showDivision.style.display = 'flex';
                for (let i = 0; i < subDivisionUl.length; i++) {
                    if (subDivisionUl[i].classList.contains(dropDown.value)) {
                        subDivisionUl[i].style.display = 'block';
                    } else {
                        subDivisionUl[i].style.display = 'none';
                    }
                }
            } else {
                showDivision.style.display = 'none';
                for (let i = 0; i < subDivisionUl.length; i++) {
                    subDivisionUl[i].style.display = 'none';
                }
            }
        })
    }

    //clickAddModiIcon(icon, event, name)
    function clickAddModiIcon(icon, event, name) {
        if (event.target.classList.contains(icon)) {
            clicked = event.target.parentNode.parentNode.querySelector('p');
            clickedIcon = icon;

            //모달 setting
            modalBGAtPage.style.display = 'block';
            withFriends.style.display = 'flex';
            friendsListDiv.style.display = 'block';
            searchFriendDiv.style.display = 'none';

            diviNameInput.value = name;

        }
    }

    //function hoverIcon(eventDiv, closest)
    function hoverIcon(eventDiv, closest) {
        eventDiv.addEventListener('mouseover', (event) => {
            if (event.target.closest(`.${closest}`)) {
                event.target.closest(`.${closest}`).querySelector('i').style.display = 'block';
            }
        })
        eventDiv.addEventListener('mouseout', (event) => {
            if (event.target.closest(`.${closest}`)) {
                event.target.closest(`.${closest}`).querySelector('i').style.display = 'none';
            }
        })

    }

    //#endregion

})