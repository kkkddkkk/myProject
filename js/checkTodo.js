
document.addEventListener('DOMContentLoaded', () => {

    //chartArea
    let pieChartCanvas = document.querySelector('.pieChart').getContext('2d');//piechart 생성용
    let taskAtChartDiv = document.querySelector('.taskAtChartDiv');
    let taskAtChart = document.querySelectorAll('.taskAtChart');//chartArea

    //taskArea
    let taskArea = document.querySelector('.taskArea');
    let divisionLi = document.querySelectorAll('.divisionLi');
    let checkBoxDiv = document.querySelector('.checkBoxDiv');

    //chartArea - taskArea 기본세팅
    //#region

    //chart 생성용 배열
    let divisionArr = new Array();
    let dataArr1 = new Array();
    let colorArr = new Array();
    let dataArr2 = new Array();
    let sum = 0;

    for (let i = 0; i < divisionLi.length; i++) {
        //taskArea 갯수에 따른 chartArea - division 추가
        if (i % 2 == 0 && i < divisionLi.length - 2) {
            clone = document.querySelector('.taskEven').cloneNode(true);
            taskAtChartDiv.appendChild(clone);
        } else if ((i % 2 != 0 && i < divisionLi.length - 2)) {
            clone = document.querySelector('.taskOdd').cloneNode(true);
            taskAtChartDiv.appendChild(clone);
        }
        taskAtChart = document.querySelectorAll('.taskAtChart');

        //chartArea의 listImg 색 통일
        let getColor = window.getComputedStyle(divisionLi[i].querySelector('.listImg')).backgroundColor;

        //chart 생성용 배열 작성
        divisionArr[i] = divisionLi[i].querySelector('.taskAtList').querySelector('p').innerHTML;
        dataArr1[i] = parseInt(taskAtChart[i].querySelector('input').value);
        taskAtChart[i].querySelector('div').style.backgroundColor = getColor;
        colorArr[i] = getColor;
        taskAtChart[i].querySelector('div').classList.add(`task${i}`)
    }

    //piechart 생성
    for (let i = 0; i < dataArr1.length; i++) {
        sum += dataArr1[i];
    }
    for (let i = 0; i < dataArr1.length; i++) {
        dataArr2[i] = Math.round(dataArr1[i] / sum * 100);
    }
    let pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        labels: divisionArr,
        data: {
            datasets: [{
                data: dataArr2,
                backgroundColor: colorArr,
                borderColor: colorArr,
                borderWidth: 0.5,
                hoverOffset: 50
            }]
        },
        options: {
            layout: {
                padding: {
                    top: 30,
                    bottom: 30,
                    left: 30,
                    right: 30
                }
            }
        }
    })

    //#endregion =========================================> chartArea - taskArea 기본세팅 끝.

    //taskArea 변수
    let subDivisionUl = document.querySelectorAll('.subDivisionUl');
    let taskLi = document.querySelectorAll('.taskLi');//업무목록
    let subDivisionLi = document.querySelectorAll('.subDivisionLi');//subdivision list

    //modalArea
    let modalBGAtCheckTodo = document.querySelector('.modalBGAtCheckTodo');//모달 배경
    let checkAtModal = document.querySelector('.checkAtModal');//모달 - 확인 버튼
    let divisionAtModal = document.querySelector('.divisionAtModal');//division명
    let subdivisionAtModal = document.querySelector('.subdivisionAtModal');//subdivision명
    let subdivisionUlAtModal = document.querySelector('.subdivisionUlAtModal')//subdivisionUl
    let subdivisionliAtModal = document.querySelector('.subdivisionliAtModal');//subdivisionList

    //중요도에 변경에 따른 pieChart update 이벤트
    //#region

    //중요도 input 점수 제한
    taskAtChartDiv.addEventListener('input', (event) => {
        if (event.target.value > 100) {//input 값이 100이 넘으면 100으로 고정
            event.target.value = 100;
        } else if (event.target.value < 1) {//input 값이 1보다 작으면 1로 고정
            event.target.value = 1;
        }
    })

    //pieChart 중요도 변경 이벤트
    taskAtChartDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-pen-to-square')) {
            event.target.classList.remove('fa-pen-to-square');
            event.target.classList.add('fa-check');//아이콘 변경

            event.target.parentNode.querySelector('input').disabled = false;
        } else if (event.target.classList.contains('fa-check')) {

            event.target.classList.remove('fa-check');
            event.target.classList.add('fa-pen-to-square');//아이콘 변경

            event.target.parentNode.querySelector('input').disabled = true;

            //piechart update
            sum = 0;

            for (let i = 0; i < dataArr1.length; i++) {
                dataArr1[i] = parseInt(taskAtChart[i].querySelector('input').value);
                sum += dataArr1[i];
            }
            for (let i = 0; i < dataArr1.length; i++) {
                dataArr2[i] = Math.round(dataArr1[i] / sum * 100);
            }
            pieChart.data.datasets[0].data = dataArr2;
            pieChart.update();//chart.js는 이 구문이 있어야 업데이트됨.
        }
    })

    //#endregion ========================================================> 중요도에 변경에 따른 pieChart update 이벤트 끝.

    //taskArea 접기 - 펴기 버튼 이벤트, 모달 open 이벤트
    //#region
    taskArea.addEventListener('click', (event) => {
        if (event.target.tagName == 'I') {
            let subDivisionUl = event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.subDivisionUl');
            let taskUl = event.target.parentNode.parentNode.parentNode.querySelector('.taskUl');
            let upperDivision = event.target.parentNode.parentNode.parentNode.parentNode;

            foldUpDown(event, subDivisionUl);
            foldUpDown(event, taskUl, upperDivision);
        }
        if (event.target.classList.contains('forOpenModal')) {
            let divisionDiv = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            let divisionName = divisionDiv.querySelector('.taskAtList').querySelector('p');
            let subDivisionName = divisionDiv.querySelectorAll('.subDivisionLi');
            let clone = subdivisionliAtModal.cloneNode(true);
            clone.style.display = 'block'

            modalBGAtCheckTodo.style.display = 'block';

            //모달 내용 update
            divisionAtModal.innerHTML = divisionName.innerHTML;//division명 복사
            for (let i = 0; i < subDivisionName.length; i++) {
                let taskName = subDivisionName[i].querySelectorAll('.taskName');

                //cloneNode 생성+붙여넣기
                clone = subdivisionliAtModal.cloneNode(true);
                clone.style.display = 'block'
                subdivisionUlAtModal.appendChild(clone);

                //모달 초기화용 CLASS 삭제
                clone.classList.add('forDel');

                //subDivision명 복사
                clone.querySelector('.subdivisionAtModal').innerHTML = subDivisionName[i].querySelector('.subDiviList').children[1].innerHTML
            }
        }
    })
    //#endregion =======================================> taskArea 접기 - 펴기 버튼 이벤트 끝.

    //내 업무만 확인 토글 시 myTask 제외 display none
    //#region

    checkBoxDiv.addEventListener('click', (event) => {
        if (event.target.tagName == 'INPUT') {//inputDiv 구역 클릭 시 input value 바뀜.
        } else {
            if (!checkBoxDiv.querySelector('input').checked) {
                checkBoxDiv.querySelector('input').checked = true;
            } else {
                checkBoxDiv.querySelector('input').checked = false;
            }
        }

        if (checkBoxDiv.querySelector('input').checked) {//내 업무만 보기 checked일 경우 myTask만 화면에 남기기
            for (let i = 0; i < taskLi.length; i++) {
                if (!taskLi[i].classList.contains('myTask')) {
                    taskLi[i].style.display = 'none';
                }
            }
            let noneScore = 0;
            for (let i = 0; i < subDivisionLi.length; i++) {
                for (let j = 0; j < subDivisionLi[i].querySelectorAll('.taskLi').length; j++) {
                    if (subDivisionLi[i].querySelectorAll('.taskLi')[j].style.display == 'none') {
                        noneScore++;
                    }
                    if (noneScore == subDivisionLi[i].querySelectorAll('.taskLi').length) {
                        subDivisionLi[i].style.display = 'none';
                    }
                }
                noneScore = 0;
            }
        } else {//내 업무만 보기 checked 해제할 경우 원상복귀
            console.log('checked');
            for (let i = 0; i < subDivisionLi.length; i++) {
                subDivisionLi[i].style.display = 'block';
                for (let j = 0; j < subDivisionLi[i].querySelectorAll('.taskLi').length; j++) {
                    subDivisionLi[i].querySelectorAll('.taskLi')[j].style.display = 'block';
                }
            }
        }
    })

    //#endregion =====================================================> 내 업무만 확인 토글 시 myTask 제외 display none

    //모달 내부 이벤트
    //#region



    //모달 close
    checkAtModal.addEventListener('click', () => {//확인버튼 클릭 시
        let forDel = document.querySelectorAll('.forDel');
        for (let i = 0; i < forDel.length; i++) {
            if (forDel[i].classList.contains('forDel')) {
                subdivisionUlAtModal.removeChild(forDel[i]);
            }
        }
        modalBGAtCheckTodo.style.display = 'none';

    })
    modalBGAtCheckTodo.addEventListener('click', (event) => {//모달 외 구역 클릭 시
        if (event.target == modalBGAtCheckTodo) {
            let forDel = document.querySelectorAll('.forDel');
            for (let i = 0; i < forDel.length; i++) {
                if (forDel[i].classList.contains('forDel')) {
                    subdivisionUlAtModal.removeChild(forDel[i]);
                }
            }

            modalBGAtCheckTodo.style.display = 'none';
        }
    })


    //#endregion =================================> 모달open/close 이벤트 끝.


    //함수

    //taskArea - 구역 접기/열기 함수(foldUpDown(event, displayDiv, [displaySubDiv]))
    //#region
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
    //#endregion =============================================> taskArea - 구역 접기/열기 함수 끝.

})