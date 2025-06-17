
document.addEventListener('DOMContentLoaded', () => {

    window.calendarScript = function () {

        const date = new Date();//현재날짜
        let thisYear = date.getFullYear(); //임시 년도 변수
        let thisMonth = date.getMonth(); //임시 월별 변수

        window.checkedDate = new Array();//선택 날짜 배열
        window.autoCheckedDate = new Array();//자동선택 날짜 배열
        window.dayArrayForMonth = new Array();//매달 반복 시 데이터 배열

        let tBody = document.querySelector('tbody');
        let week = document.querySelectorAll('.week');

        let before = document.querySelector('.before');//작년/지난달 버튼
        let after = document.querySelector('.after');//내년/다음달 버튼
        window.period = document.querySelectorAll('input[name="period"]');//매일/매주/매달 버튼

        let radioForMonth = document.querySelector('.radioForMonth');
        window.forMonth = document.querySelectorAll('.forMonth');//매달 라디오 메뉴 라벨
        window.initBtn = document.querySelector('.initBtn');//초기화버튼


        calendar();
        week = document.querySelectorAll('.week');
        let cells = document.querySelectorAll('td');

        let clickedData, addedArray;
        //날짜 클릭 이벤트
        //#region
        tBody.addEventListener('click', (event) => {
            if (event.target.closest('td').style.cursor == '' || event.target.closest('td').style.cursor == 'auto') return;

            //날짜 클릭시 border 추가
            clickedData = event.target.getAttribute('data-date');
            if (!period[0].checked && !period[1].checked && !period[2].checked) {
                modiArray(checkedDate, clickedData);
                checkOnCalendar();
            }

            //재 클릭을 대비한 추가 배열(autoCHeckedDate + checkedDate)
            addedArray = autoCheckedDate.concat(checkedDate);
            addedArray.sort();

            if (period[0].checked) {//매일 반복 추가/제거 이벤트
                if (!addedArray.includes(clickedData)) {//배열에 포함되지 않은 날짜는 추가하여 다시 정리
                    autoCheckedDate = [];
                    checkedDate.push(clickedData);
                    checkedDate.sort();
                    loopEveryDay();
                    checkOnCalendar();
                    return;
                }
                removeItAtPeriod(0);
            }
            if (period[1].checked) {//매주 반복 추가/제거 이벤트
                if (!addedArray.includes(clickedData)) {//배열에 포함되지 않은 날짜는 추가하여 다시 정리
                    autoCheckedDate = [];
                    checkedDate.push(clickedData);
                    checkedDate.sort();
                    loopEveryWeek();
                    checkOnCalendar();
                    return;
                }
                removeItAtPeriod(1);
            }
            if (period[2].checked) {//매달 반복 추가/제거 이벤트
                if (!checkedDate.includes(clickedData)) {
                    checkedDate.push(clickedData);
                    checkedDate.sort();
                    forMonth[0].querySelector('span').innerHTML = '매달 ';
                    forMonth[1].querySelector('span').innerHTML = '매달 ';
                    loopEveryMonth();
                    checkOnCalendar();
                    return;
                }
                removeItAtPeriod(2);
            }
            checkedDate = [];
            autoCheckedDate = [];
            dayArrayForMonth = [];

            while (addedArray.length)
                modiArray(checkedDate, addedArray.pop());
        })

        //#endregion

        //매일/매주/매달 버튼 클릭 이벤트
        //#region
        period.forEach((p) => {
            p.addEventListener('change', (event) => {
                period.forEach((innerP) => {//토글 기능
                    if (innerP != event.target) {
                        innerP.checked = false;
                        innerP.parentNode.classList.remove('pointColorForBG');
                    }
                })

                if (p.id == 'everyDay') {
                    if (p.checked) loopEveryDay();
                    else autoCheckedDate = [];
                } else if (p.id == 'everyWeek') {
                    if (p.checked) loopEveryWeek();
                    else autoCheckedDate = [];
                } else if (p.id == 'everyMonth') {
                    if (p.checked) loopEveryMonth();
                    else autoCheckedDate = [];
                }

                if (!period[2].checked) {
                    radioForMonth.style.display = 'none';
                    forMonth[0].querySelector('span').innerHTML = '매달 ';
                    forMonth[1].querySelector('span').innerHTML = '매달 ';
                }
                checkOnCalendar();

                //선택 시 배경 설정
                if (p.checked) {
                    p.parentNode.classList.remove('BGColor');
                    p.parentNode.classList.add('pointColorForBG');
                } else {
                    p.parentNode.classList.remove('pointColorForBG');
                    p.parentNode.classList.add('BGColor');
                }
            })
        })


        //#endregion

        //초기화 버튼 클릭 이벤트
        //#region
        initBtn.addEventListener('click', () => {
            period.forEach((p) => {//전체 버튼 선택 해제
                p.checked = false;
                p.parentNode.classList.remove('pointColorForBG');
            })
            radioForMonth.style.display = 'none';
            checkedDate = [];//배열 초기화
            autoCheckedDate = [];
            dayArrayForWeek = [];
            dayArrayForMonth = [];
            checkOnCalendar();
        })

        //#endregion

        //이동버튼 클릭 이벤트
        //#region
        before.addEventListener('click', (event) => {
            if (event.target.classList.contains('beforeYear')) {
                thisYear--;
            }
            else if (event.target.classList.contains('beforeMonth')) {
                thisMonth--;
                if (thisMonth == -1) {
                    thisYear--;
                    thisMonth = 11;
                }
            }
            newCalendar();
            period0WhenMove();
            period1WhenMove();
            period2WhenMove();

            checkOnCalendar();
        })

        after.addEventListener('click', (event) => {
            if (event.target.classList.contains('afterYear')) thisYear++;
            else if (event.target.classList.contains('afterMonth')) {
                thisMonth++;
                if (thisMonth == 12) {
                    thisYear++;
                    thisMonth = 0;
                }
            }
            newCalendar();
            period0WhenMove();
            period1WhenMove();
            period2WhenMove();

            checkOnCalendar();
        })

        //#endregion


        //#region[함수구역]

        //배열 함수 modiArray(data); checkOnCalendar();
        //#region
        //배열 수정
        function modiArray(array, data) {
            if (!array.includes(data)) array.push(data);
            else array.splice(array.indexOf(data), 1);
            array.sort();
        }

        //배열 데이터에 border 표기
        function checkOnCalendar() {
            cells.forEach((c) => {
                c.classList.remove('pointColorForBorder');
            })
            checkedDate.forEach((cd) => {
                if (document.querySelector(`[data-date="${cd}"]`))
                    document.querySelector(`[data-date="${cd}"]`).classList.add('pointColorForBorder');
            })
            autoCheckedDate.forEach((acd) => {
                if (document.querySelector(`[data-date="${acd}"]`)) {
                    document.querySelector(`[data-date="${acd}"]`).classList.add('pointColorForBorder');
                }

            })
        }

        //#endregion

        //calendar 제작 함수 calendar(); newCalendar();
        //#region

        function calendar() {
            let num = 0;
            document.querySelector('.year').innerHTML = thisYear;
            document.querySelector('.month').innerHTML = thisMonth + 1;
            let checkedYear = parseInt(document.querySelector('.year').innerHTML);
            let checkedMonth = parseInt(document.querySelector('.month').innerHTML) - 1;

            for (let i = 1; i <= 31; i++) {
                let testDate = new Date(checkedYear, checkedMonth, i);
                if (testDate.getMonth() != checkedMonth) {
                    testDate = null;
                    break;
                }
                let cell = week[num].children[testDate.getDay()];
                cell.innerHTML = i;
                cell.setAttribute('data-date', `${checkedYear}-${(checkedMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);

                //이전 날짜는 흐리게 처리
                let targetDate = new Date(thisYear, thisMonth, i, 23, 59, 59);
                if (date >= targetDate) {
                    if (cell == week[num].children[0]) cell.classList.remove('sunColor');
                    else if (cell == week[num].children[6]) cell.classList.remove('satColor');
                    cell.classList.add('blurTextColor');
                } else {
                    cell.style.cursor = 'pointer';
                    if (cell == week[num].children[0]) cell.classList.add('sunColor');
                    else if (cell == week[num].children[6]) cell.classList.add('satColor');
                }

                //토요일까지 다 채우면 새 line 생성
                if (testDate.getDay() == 6) {
                    let clone = week[0].cloneNode(true);
                    Array.from(clone.children).forEach((c) => {
                        c.innerHTML = '';
                        c.setAttribute('data-date', '');
                        c.classList.remove('blurTextColor');
                        c.style.cursor = 'auto';
                    })
                    week[num].parentNode.appendChild(clone);
                    week = document.querySelectorAll('.week');
                    num++;
                }
            }
        }

        function newCalendar() {
            document.querySelector('.year').innerHTML = thisYear;
            document.querySelector('.month').innerHTML = thisMonth + 1;
            let clone = week[0].cloneNode(true);
            Array.from(clone.children).forEach((c) => {
                c.innerHTML = '';
                c.setAttribute('data-date', '');
                c.classList.remove('blurTextColor');
                c.style.cursor = 'auto';
            })

            week.forEach((w) => {
                w.parentNode.removeChild(w);
            })

            tBody.appendChild(clone);
            week = document.querySelectorAll('.week');

            calendar();
            week = document.querySelectorAll('.week');
            cells = document.querySelectorAll('td');
        }

        //#endregion

        //매일 반복 함수 loopEveryDay();
        //#region
        function loopEveryDay() {
            cells = document.querySelectorAll('td');
            cells.forEach((cell) => {
                if (checkedDate[0]) {
                    if (checkedDate[0] < cell.getAttribute('data-date')) {//자동체크배열에 추가
                        modiArray(autoCheckedDate, cell.getAttribute('data-date'));
                        checkedDate.forEach((cd) => {
                            if (autoCheckedDate.includes(cd))
                                autoCheckedDate.splice(autoCheckedDate.indexOf(cd), 1);
                        })
                    }
                } else {
                    if (cell.style.cursor != '' && cell.style.cursor != 'auto')//전체날짜 추가
                        modiArray(autoCheckedDate, cell.getAttribute('data-date'));
                }
            })
        }

        //#endregion

        //매주 반복 함수 loopEveryWeek();
        //#region
        function loopEveryWeek() {
            cells = document.querySelectorAll('td');
            if (!checkedDate[0]) {
                alert('반복할 날짜를 먼저 선택해주세요.');
                period[1].checked = false;
                period[1].classList.remove('pointColorForBG');
                return;
            } else {
                checkedDate.forEach((cd) => {
                    let cdDate = new Date(cd);
                    let cdDay = cdDate.getDay();

                    cells.forEach((cell) => {
                        let cdNode = cell.parentNode.children[cdDay];
                        if (cd < cell.getAttribute('data-date') && cell === cdNode)
                            modiArray(autoCheckedDate, cdNode.getAttribute('data-date'));
                    })
                })
            }
        }

        //#endregion

        //매달 반복 함수 loopEveryMonth();
        //#region
        function loopEveryMonth() {
            cells = document.querySelectorAll('td');
            if (!checkedDate[0]) {
                alert('반복할 날짜를 먼저 선택해주세요.');
                period[2].checked = false;
                return;
            } else {
                let everyNDate = forMonth[0].querySelector('span');
                let everyNDay = forMonth[1].querySelector('span')
                radioForMonth.style.display = 'block';

                for (let i = 0; i < checkedDate.length; i++) {
                    let cdNode = document.querySelector(`[data-date="${checkedDate[i]}"]`);
                    if (!cdNode) continue;

                    let data = `${checkedDate[i]}+${cdNode.parentNode.rowIndex}+${cdNode.cellIndex}`;
                    if (!dayArrayForMonth.includes(data)) dayArrayForMonth.push(data);
                }
                for (let i = 0; i < dayArrayForMonth.length; i++) {
                    everyNDate.innerHTML += dayArrayForMonth[i].split('+')[0].split('-')[2] + ', ';
                    everyNDay.innerHTML += dayArrayForMonth[i].split('+')[1] + '주 ';

                    switch (parseInt(dayArrayForMonth[i].split('+')[2])) {
                        case 0: everyNDay.innerHTML += '일요일, '; break;
                        case 1: everyNDay.innerHTML += '월요일, '; break;
                        case 2: everyNDay.innerHTML += '화요일, '; break;
                        case 3: everyNDay.innerHTML += '수요일, '; break;
                        case 4: everyNDay.innerHTML += '목요일, '; break;
                        case 5: everyNDay.innerHTML += '금요일, '; break;
                        case 6: everyNDay.innerHTML += '토요일, '; break;
                    }

                }

                everyNDate.innerHTML = everyNDate.innerHTML.slice(0, -2);
                everyNDate.innerHTML += ' 일';
                everyNDay.innerHTML = everyNDay.innerHTML.slice(0, -2);
            }
        }

        //#endregion

        // 달력 클릭 + 매일/매주/매달 반복 연계함수 removeItAtPeriod(i);
        //#region
        function removeItAtPeriod(i) {
            if (checkedDate.includes(clickedData)) {
                checkedDate.splice(checkedDate.indexOf(clickedData), 1);
            } else if (autoCheckedDate.includes(clickedData)) {
                autoCheckedDate.splice(autoCheckedDate.indexOf(clickedData), 1);
            }
            addedArray.splice(addedArray.indexOf(clickedData), 1);
            checkOnCalendar();

            period[i].checked = false;
            period[i].parentNode.classList.remove('pointColorForBG');
            period[i].parentNode.classList.add('BGColor');
            radioForMonth.style.display = 'none';
            forMonth[0].querySelector('span').innerHTML = '매달 ';
            forMonth[1].querySelector('span').innerHTML = '매달 ';
        }

        //#endregion

        //이전+다음 버튼 클릭 + 매일/매주/매달 반복 연계함수 period0/1/2WhenMove();
        //#region
        function period0WhenMove() {//매일 반복 버튼 클릭되어있을 시
            if (period[0].checked) {
                autoCheckedDate = [];
                loopEveryDay();
                checkOnCalendar();
            }
        }
        function period1WhenMove() {//매주 반복 버튼 클릭되어있을 시
            if (period[1].checked) {
                autoCheckedDate = [];
                loopEveryWeek();
                checkOnCalendar();
            }
        }
        function period2WhenMove() {//매달 반복 버튼 클릭되어있을 시
            if (period[2].checked) {
                if (forMonth[0].querySelector('input').checked) {
                    dayArrayForMonth.forEach((dafm) => {
                        cells.forEach((cell) => {
                            if (cell.classList.contains('blurTextColor')) return;
                            if (cell.getAttribute('data-date').split('-')[2] == dafm.split('+')[0].split('-')[2])
                                autoCheckedDate.push(cell.getAttribute('data-date'));
                        })
                    })
                } else if (forMonth[1].querySelector('input').checked) {
                    dayArrayForMonth.forEach((dafm) => {
                        let haveToCheckDate = week[dafm.split('+')[1] - 1].children[dafm.split('+')[2]];
                        if (haveToCheckDate.classList.contains('blurTextColor')) return;
                        autoCheckedDate.push(haveToCheckDate.getAttribute('data-date'));
                    })
                }
            }
        }

        //#endregion

        //#endregion
    }
})