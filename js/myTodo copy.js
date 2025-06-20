
document.addEventListener('DOMContentLoaded', () => {

    let dropDown = document.querySelector('.dropDown');//드롭다운메뉴
    let dropMenu = document.querySelectorAll('.dropMenu');
    let addNewTask = document.querySelector('.addNewTask');
    let innerWrap = document.querySelector('.innerWrap');

    let divisionName = document.querySelector('.divisionName').querySelector('p');//division명

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
    let modiTask = document.querySelector('.modiTask');//task 추가/수정 div
    let calendar = document.querySelector('#calendar');
    let untilWhen = document.querySelector('.untilWhen');

    let diviNameInput = document.querySelector('.diviNameInput');//division 명 수정 input

    let addFriendsBtn = document.querySelector('.friendsListTitle').querySelector('button');//친구 추가 버튼
    let checkAtModal = document.querySelector('.checkAtModal');//확인버튼

    let clickedName, clickedIcon, clickedClosest;
    let clone;
    let hasRun = false;

    //dropdown 메뉴 이벤트
    dropDownMenu();

    //divisionBtns 클릭 이벤트
    //#region
    divisionBtns.addEventListener('click', (event) => {
        clickedVal(event, 'fa-pen-to-square');
        clickedVal(event, 'fa-xmark');
        clickedVal(event, 'fa-plus');

        if (clickedIcon == 'fa-pen-to-square') clickAddModiIcon('fa-pen-to-square', event, clickedName.innerHTML);
        if (clickedIcon == 'fa-xmark') {
            if (!confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) return;
            subDivisionUl.forEach((sdu) => {//subDivision 삭제
                if (divisionName.innerHTML == dropDown.value)
                    if (sdu.style.display == 'block') innerWrap.removeChild(sdu);
            })

            for (let i = 0; i < dropMenu.length; i++) {//드롭메뉴 삭제
                if (divisionName.innerHTML == dropMenu[i].innerHTML) {
                    dropDown.removeChild(dropMenu[i]);
                    if (dropMenu.length == 2) addNewTask.selected = true;
                    else if (i + 1 == dropMenu.length) dropMenu[i - 1].selected = true;
                    else dropMenu[i + 1].selected = true;
                }
                dropDownMenu();//드롭메뉴 재정리
            }

            //division명 변경
            divisionName.innerHTML = dropDown.value;

            //해당 subdivision 목록을 block으로
            subDivisionUl.forEach((sdu) => {
                if (sdu.classList.contains(dropDown.value)) sdu.style.display = 'block';
            })
        }
        if (clickedIcon == 'fa-plus') clickAddModiIcon('fa-plus', event, '');
    })

    //#endregion

    //subDivisionBtns, taskBtns 클릭 이벤트
    //#region
    innerWrap.addEventListener('click', (event) => {
        //subDivisionBtns 클릭 이벤트
        //#region
        if (event.target.closest('.subDivisionBtns')) {
            clickedVal(event, 'fa-pen-to-square');
            clickedVal(event, 'fa-xmark');
            clickedVal(event, 'fa-plus');
            clickedVal(event, 'fa-angle-down');

            if (clickedIcon == 'fa-pen-to-square') clickAddModiIcon('fa-pen-to-square', event, clickedName.innerHTML);
            if (clickedIcon == 'fa-xmark') {
                if (!confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) return;
                let thisSubDiviUl = clickedClosest.parentNode.parentNode.parentNode;
                let thisSubDiviLi = clickedClosest.parentNode.parentNode;
                thisSubDiviUl.removeChild(thisSubDiviLi);
            }
            if (clickedIcon == 'fa-plus') {
                taskaddModi('fa-plus', event, '');

                if (hasRun == false) {
                    calendarScript();
                    hasRun = true;
                }
            }

            let thisTaskUl = clickedClosest.parentNode.parentNode.querySelector('.taskUl');
            if (event.target.classList.contains('fa-angle-down')) {
                classChange(event.target, 'fa-angle-down', 'fa-angle-up');
                thisTaskUl.style.maxHeight = thisTaskUl.scrollHeight + 'px';
            } else if (event.target.classList.contains('fa-angle-up')) {
                classChange(event.target, 'fa-angle-up', 'fa-angle-down');
                thisTaskUl.style.maxHeight = 0;
            }
        }

        //#endregion

        //taskBtns 클릭 이벤트
        //#region
        if (event.target.closest('.taskBtns')) {
            clickedVal(event, 'fa-pen-to-square');
            clickedVal(event, 'fa-xmark');

            if (clickedIcon == 'fa-pen-to-square') clickAddModiIcon('fa-pen-to-square', event, clickedName.innerHTML);
            if (clickedIcon == 'fa-xmark') {
                if (!confirm('정말 삭제하시겠습니까?\n삭제 후 해당 스케줄을 되돌릴 수 없습니다.')) return;
                let taskUl = clickedClosest.parentNode.parentNode;
                let taskLi = clickedClosest.parentNode;
                taskUl.removeChild(taskLi);
            }
        }
        
        //#endregion
    })

    //#endregion

    //function
    //#region[function]

    //dropDownMenu()
    //#region
    function dropDownMenu() {
        //division이 1개 이상 있을 시, 첫번째 division을 메인으로
        dropMenu = document.querySelectorAll('.dropMenu');
        if (dropDown.value != '새 업무 추가') divisionName.innerHTML = dropDown.options[dropDown.selectedIndex].text;
        else showDivision.style.display = 'none';

        dropDown.addEventListener('change', () => {
            if (dropDown.value != '새 업무 추가') {//SELECT 값 선택 시 해당 DIVISION으로 내용 변경
                document.querySelector('.divisionName').children[1].innerHTML = dropDown.options[dropDown.selectedIndex].text;

                showDivision.style.display = 'flex';
                subDivisionUl.forEach((sdu) => {
                    if (sdu.classList.contains(dropDown.value)) sdu.style.display = 'block';
                    else sdu.style.display = 'none';
                })
            } else {
                showDivision.style.display = 'none';
                subDivisionUl.forEach((sdu) => { sdu.style.display = 'none'; })
            }
        })
    }

    //#endregion

    //clickedVal(event, icon)
    function clickedVal(event, icon) {
        if (event.target.classList.contains(icon)) {
            clickedName = event.target.parentNode.parentNode.querySelector('p');
            clickedIcon = icon;
            clickedClosest = event.target.parentNode;
        }
    }

    //classChange(target, oldClass, newClass)
    function classChange(target, oldClass, newClass) {
        target.classList.remove(oldClass);
        target.classList.add(newClass);//아이콘 변경
    }

    //clickAddModiIcon(icon, event, name)
    function clickAddModiIcon(icon, event, name) {
        if (event.target.classList.contains(icon)) {
            //모달 setting
            modalBGAtPage.style.display = 'block';
            withFriends.style.display = 'flex';
            friendsListDiv.style.display = 'block';
            searchFriendDiv.style.display = 'none';
            modiTask.style.display = 'none';

            diviNameInput.value = name;
        }
    }

    function taskaddModi(icon, event, name) {
        if (event.target.classList.contains(icon)) {
            //모달 setting
            modalBGAtPage.style.display = 'block';
            withFriends.style.display = 'none';
            friendsListDiv.style.display = 'none';
            searchFriendDiv.style.display = 'none';
            modiTask.style.display = 'block';

            diviNameInput.value = name;
        }
    }

    //function hoverIcon(eventDiv, closest)
    function hoverIcon(eventDiv, closest) {
        eventDiv.addEventListener('mouseover', (event) => {
            if (event.target.closest(`.${closest}`))
                event.target.closest(`.${closest}`).querySelector('i').style.display = 'block';
        })
        eventDiv.addEventListener('mouseout', (event) => {
            if (event.target.closest(`.${closest}`))
                event.target.closest(`.${closest}`).querySelector('i').style.display = 'none';
        })
    }

    //#endregion

})