
document.addEventListener('DOMContentLoaded', () => {

    let dropDown = document.querySelector('.dropDown');//드롭다운메뉴
    let dropMenu = document.querySelectorAll('.dropMenu');
    let addNewTask = document.querySelector('.addNewTask');

    let divisionName = document.querySelector('.divisionName').children[1].innerHTML;//division명

    let showDivision = document.querySelector('.showDivision');//division 구역
    let divisionBtns = document.querySelector('.divisionBtns');//division 버튼 구역

    let subDivisionUl = document.querySelector('.subDivisionUl');//subdivision구역
    let subDivisionBtns = document.querySelector('.subDivisionBtns');//subdivision 버튼 구역

    let taskUl = document.querySelectorAll('.taskUl');//전체 task

    //모달 변수
    let modalBGAtPage = document.querySelector('.modalBGAtPage');//모달 배경
    let withFriends = document.querySelector('.withFriends');//친구 추가 div
    let friendsListDiv = document.querySelector('.friendsListDiv');//친구 list 전체
    let searchFriendDiv = document.querySelector('.searchFriendDiv');//검색 결과 list 전체

    let diviNameInput = document.querySelector('.diviNameInput');//division 명 수정 input

    let addFriendsBtn = document.querySelector('.friendsListTitle').querySelector('button');//친구 추가 버튼

    //dropdown 메뉴 이벤트
    dropDownMenu();

    //divisionBtns 클릭 이벤트
    //#region
    divisionBtns.addEventListener('click', (event) => {

        clickAddModiIcon('fa-pen-to-square', event, document.querySelector('.divisionName').children[1].innerHTML);//수정 Icon 클릭 이벤트
        clickAddModiIcon('fa-plus', event, '');//addIcon 클릭 이벤트

        if (event.target.classList.contains('fa-xmark')) {//xIcon 클릭 이벤트
            if (confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) {
                for (let i = 0; i < dropMenu.length; i++) {
                    //드롭메뉴 삭제
                    if (divisionName == dropMenu[i].innerHTML) {
                        dropDown.removeChild(dropMenu[i]);
                        if (dropMenu[i + 1] == null) {
                            addNewTask.selected = true;
                        } else {
                            dropMenu[i + 1].selected = true;
                        }
                    }

                    dropDownMenu();//드롭메뉴 재정리
                }
            }
        }
    })

    //#endregion =================================> ddivisionBtns 클릭 이벤트 끝.

    //subDivisionBtns 클릭 이벤트
    //#region

    subDivisionUl.addEventListener('click', (event) => {
        let thisTaskUl = event.target.parentNode.parentNode.parentNode.querySelector('.taskUl');
        let thisSubDiviName = event.target.parentNode.parentNode.querySelector('.subDivisionName').querySelector('p').innerHTML;

        clickAddModiIcon('fa-pen-to-square', event, thisSubDiviName);//subDivision 수정

        if (event.target.classList.contains('fa-xmark')) {//subDivision 삭제
            console.log(event.target.parentNode.parentNode.parentNode);
            if (confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) {
                subDivisionUl.removeChild(event.target.parentNode.parentNode.parentNode);
            }
        }
        if (event.target.classList.contains('fa-plus')) {

        }

        //task 펼치기, 접기
        if (event.target.classList.contains('fa-angle-down')) {
            event.target.classList.remove('fa-angle-down');
            event.target.classList.add('fa-angle-up');//아이콘 변경

            thisTaskUl.style.maxHeight = thisTaskUl.scrollHeight + 'px';
        } else if (event.target.classList.contains('fa-angle-up')) {
            event.target.classList.remove('fa-angle-up');
            event.target.classList.add('fa-angle-down');//아이콘 변경

            thisTaskUl.style.maxHeight = null;
        }
    })

    //#endregion =================================> subDivisionBtns 클릭 이벤트 끝.

    //모달 이벤트


    //function
    //#region[function]

    //dropDownMenu()
    function dropDownMenu() {
        //division이 1개 이상 있을 시, 첫번째 division을 메인으로
        if (dropDown.value != '새 업무 추가') {
            divisionName = dropDown.value;
            subDivisionUl.classList.add(dropDown.value);
        } else {
            showDivision.style.display = 'none';
            subDivisionUl.style.display = 'none';
        }

        dropDown.addEventListener('change', () => {
            if (dropDown.value != '새 업무 추가') {//SELECT 값 선택 시 해당 DIVISION으로 내용 변경
                document.querySelector('.divisionName').children[1].innerHTML = dropDown.value;
                subDivisionUl.classList.add(dropDown.value);

                showDivision.style.display = 'flex';
                subDivisionUl.style.display = 'block';
            } else {
                showDivision.style.display = 'none';
                subDivisionUl.style.display = 'none';
            }
        })
    }

    //clickAddModiIcon(icon, event, name)
    function clickAddModiIcon(icon, event, name) {
        if (event.target.classList.contains(icon)) {
            //모달 setting
            modalBGAtPage.style.display = 'block';
            withFriends.style.display = 'flex';
            friendsListDiv.style.display = 'block';
            searchFriendDiv.style.display = 'none';

            diviNameInput.value = name;

        }
    }

    //#endregion

})