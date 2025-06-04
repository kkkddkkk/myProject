
document.addEventListener('DOMContentLoaded', () => {

    let dropDown = document.querySelector('.dropDown');//드롭다운메뉴
    let divisionName = document.querySelector('.divisionName').children[1];//division명

    let subDivisionUl = document.querySelector('.subDivisionUl');//subdivision구역
    let subDivisionBtns = document.querySelector('.subDivisionBtns');//subdivision 버튼 구역

    let taskUl = document.querySelectorAll('.taskUl');

    //division이 1개 이상 있을 시, 첫번째 division을 메인으로
    if (dropDown.value != '새 업무 추가') {
        divisionName.innerHTML = dropDown.value;
        subDivisionUl.classList.add(dropDown.value);
    }

    dropDown.addEventListener('change', () => {
        if (dropDown.value != '새 업무 추가') {//SELECT 값 선택 시 해당 DIVISION으로 내용 변경
            divisionName.innerHTML = dropDown.value;
            subDivisionUl.classList.add(dropDown.value);
        }

    })

    //subDivisionBtns 클릭 이벤트
    subDivisionUl.addEventListener('click', (event) => {
        let thisTaskUl = event.target.parentNode.parentNode.parentNode.querySelector('.taskUl');

        if (event.target.classList.contains('fa-pen-to-square')) {

        }
        if (event.target.classList.contains('fa-xmark')) {

        }
        if (event.target.classList.contains('fa-plus')) {

        }
        if (event.target.classList.contains('fa-angle-down')) {
            console.log('clicked');
            event.target.classList.remove('fa-angle-down');
            event.target.classList.add('fa-angle-up');//아이콘 변경

            console.log(event.target.parentNode.parentNode.parentNode.querySelector('.taskUl'));
            thisTaskUl.style.maxHeight = thisTaskUl.scrollHeight + 'px';
        } else if (event.target.classList.contains('fa-angle-up')) {
            event.target.classList.remove('fa-angle-up');
            event.target.classList.add('fa-angle-down');//아이콘 변경

            thisTaskUl.style.maxHeight = null;
        }
    })


    function foldUpDown(event, displayDiv, displaySubDiv) {
        if (event.target.classList.contains('fa-chevron-down') && displayDiv != null) {
            event.target.classList.remove('fa-chevron-down');
            event.target.classList.add('fa-chevron-up');//아이콘 변경

            if (displaySubDiv != undefined) {
                displaySubDiv.style.maxHeight = (displaySubDiv.scrollHeight + displayDiv.scrollHeight) + 'px';
                displayDiv.style.maxHeight = displayDiv.scrollHeight + 'px';
            } else {
                displayDiv.style.maxHeight = displayDiv.scrollHeight + 'px';
            }

        } else if (event.target.classList.contains('fa-chevron-up') && displayDiv != null) {
            event.target.classList.remove('fa-chevron-up');
            event.target.classList.add('fa-chevron-down');

            displayDiv.style.maxHeight = null;
        }
    }


})