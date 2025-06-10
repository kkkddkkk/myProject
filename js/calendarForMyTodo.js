// function calenderScript() {

const date = new Date();//현재날짜
let thisYear = date.getFullYear(); //임시 년도 변수
let thisMonth = date.getMonth(); //임시 월별 변수
let day;//임시 요일 변수
let checkedDate = new Array();
let num = 0;

let calendarTable = document.querySelector('table');
let tBody = document.querySelector('tbody');
let week = document.querySelectorAll('.week');

let before = document.querySelector('.before');//저번달 버튼
let after = document.querySelector('.after');//다음달 버튼
let deadLineCheckBox = document.querySelector('.deadLineCheckBox');
let period = document.querySelectorAll('.period');
let radioForMonth = document.querySelector('.radioForMonth');
let initBtn = document.querySelector('.initBtn');//초기화버튼

document.querySelector('.year').innerHTML = thisYear;
document.querySelector('.month').innerHTML = thisMonth + 1;

calander();
let cells = document.querySelectorAll('td');

// 요일 체크 이벤트
calendarTable.addEventListener('click', (event) => {
    if (event.target.tagName == 'TD' && event.target.innerHTML != '') {
        let getDateAt = event.target.getAttribute('data-date');

        if (!event.target.classList.contains('blurTextColor')) {
            if (event.target.classList.contains('pointColorForBorder')) {
                event.target.classList.remove('pointColorForBorder')

                if (checkedDate.indexOf(getDateAt) > -1) {
                    checkedDate.splice(checkedDate.indexOf(getDateAt), 1);
                }
            } else {
                if (!checkedDate.includes(getDateAt)) {
                    checkedDate.push(getDateAt);
                }
            }
        }
        setCheckOnCalendar();

        console.log(checkedDate);
    }
})

//이동버튼 이벤트
//#region

//지난달로 이동 버튼
before.addEventListener('click', () => {
    thisMonth--;
    document.querySelector('.month').innerHTML = thisMonth + 1;
    if (thisMonth == -1) {
        thisYear--;
        thisMonth = 11;
        document.querySelector('.month').innerHTML = thisMonth + 1;
        document.querySelector('.year').innerHTML = thisYear;
    }

    initCalendar();
    calander();
    if (period[0].checked) loopEveryDay();
    if (period[1].checked) loopEveryWeek();

    checkingCalendar();
})

//다음달로 이동 버튼
after.addEventListener('click', () => {
    thisMonth++;
    document.querySelector('.month').innerHTML = thisMonth + 1;
    if (thisMonth == 12) {
        thisYear++;
        thisMonth = 0;
        document.querySelector('.month').innerHTML = thisMonth + 1;
        document.querySelector('.year').innerHTML = thisYear;
    }

    initCalendar();
    calander();
    if (period[0].checked) loopEveryDay();
    if (period[1].checked) loopEveryWeek();
    checkingCalendar();
})

//#endregion

//매일/매주/매달 반복 이벤트
deadLineCheckBox.addEventListener('click', (event) => {
    if (event.target.closest('.periodLabel')) {
        //매달 체크 시 이벤트
        if (period[2].checked) {
            radioForMonth.style.display = 'flex';
        } else {
            radioForMonth.style.display = 'none';
        }

    }
})

//매일 체크 시 이벤트
radioEvent(0, loopEveryDay);

//매주 체크 시 이벤트
radioEvent(1, loopEveryWeek);



//초기화버튼 클릭 이벤트
initBtn.addEventListener('click', () => {
    while (checkedDate.length) {
        checkedDate.pop();
    }
    cells.forEach((cell) => {
        cell.classList.remove('pointColorForBorder');
    })
})



//calendaer 제작 함수 calendar();
//#region

function calander() {
    for (let i = 1; i <= 31; i++) {
        let testDate = new Date(thisYear, thisMonth, i);
        if (testDate.getMonth() != thisMonth) {
            testDate = null;
        }
        if (testDate == null) break;

        switch (testDate.getDay()) {
            case 0: day = 'sun';
                break;
            case 1: day = 'mon';
                break;
            case 2: day = 'tue';
                break;
            case 3: day = 'wed';
                break;
            case 4: day = 'thu';
                break;
            case 5: day = 'fri';
                break;
            case 6: day = 'sat';
                break;
        }

        for (let j = 0; j < week[num].children.length; j++) {
            if (week[num].children[j].classList.contains(day)) {
                week[num].children[j].innerHTML = i;
                week[num].children[j].setAttribute('data-date', `${thisYear}-${thisMonth}-${i}`)

                //선택 불가능한 날짜는 흐리게 + cursor를 auto로
                let targetDate = new Date(thisYear, thisMonth, i, 23, 59, 59);
                if (date >= targetDate) {
                    week[num].children[j].classList.add('blurTextColor');
                    week[num].children[j].style.cursor = 'auto';
                }
                if (week[num].children[j].classList.contains('blurTextColor') && week[num].children[j].classList.contains('sunColor')) {
                    week[num].querySelector('.sun').classList.remove('sunColor');
                } else if (week[num].children[j].classList.contains('blurTextColor') && week[num].children[j].classList.contains('satColor')) {
                    week[num].querySelector('.sat').classList.remove('satColor');
                }

                //토요일까지 다 채우면 새 line 생성
                if (day === 'sat') {
                    let clone = week[0].cloneNode(true);
                    for (let k = 0; k < 7; k++) {
                        clone.children[k].innerHTML = '';
                        clone.children[k].setAttribute('data-date', '');
                        clone.children[k].classList.remove('blurTextColor');

                        clone.querySelector('.sun').classList.add('sunColor');
                        clone.querySelector('.sat').classList.add('satColor');

                        clone.children[k].style.cursor = 'pointer';
                    }

                    week[num].parentNode.appendChild(clone);
                    week = document.querySelectorAll('.week');
                    num++;
                }
                break;
            }
        }



    }
}

//#endregion

//달력 초기화 initCalendar();
//#region

function initCalendar() {
    for (let i = 0; i < week.length - 1; i++) {
        tBody.removeChild(week[i]);
    }

    week = document.querySelectorAll('.week');
    for (let i = 0; i < week[0].children.length; i++) {
        week[0].children[i].innerHTML = '';
        week[0].children[i].classList.remove('pointColorForBorder');
    }
    num = 0;
}

//#endregion

//setCheckOnCalendar();
function setCheckOnCalendar() {
    cells.forEach((cell) => {
        cell.classList.remove('pointColorForBorder');
    })
    checkedDate.forEach((date) => {
        if (document.querySelector(`[data-date="${date}"]`)) {
            document.querySelector(`[data-date="${date}"]`).classList.add('pointColorForBorder');
        }
    })
}


//일정 표시 checkingCalendar();
//#region

function checkingCalendar() {
    for (let i = 0; i < checkedDate.length; i++) {
        for (let j = 0; j < document.querySelectorAll('td').length; j++) {
            if (document.querySelectorAll('td') == null) {
                break;
            }
            if (document.querySelectorAll('td')[j].getAttribute('data-date') == checkedDate[i]) {
                document.querySelectorAll('td')[j].classList.add('pointColorForBorder');
            }
        }
    }
}

//#endregion

//radioEvent(i,func)
//#region

function radioEvent(i, func) {

    function removeRadio(j) {
        period[j].checked = false;

        period[j].parentNode.classList.remove('pointColorForBG');
        period[j].parentNode.classList.add('BGColor');

    }
    function addRadio(j) {
        if (!period[j].checked) {
            period[j].checked = true;

            period[j].parentNode.classList.remove('BGColor');
            period[j].parentNode.classList.add('pointColorForBG');
        }
    }


    period[i].parentNode.addEventListener('click', () => {

        if (period[i].checked) {
            removeRadio(i);

            setCheckOnCalendar();
            return;
        }

        //토글 기능
        switch (i) {
            case 0:
                addRadio(0)
                removeRadio(1);
                removeRadio(2);
                func();
                break;
            case 1:
                removeRadio(0);
                addRadio(1)
                removeRadio(2);
                func();
                break;
            default:
                removeRadio(0);
                removeRadio(1);
                addRadio(2);
                func();
                break;
        }
    })
}

//#endregion


//매일 반복 체크 loopEveryDay();
//#region

function loopEveryDay() {
    cells = document.querySelectorAll('td');
    cells.forEach((cell) => {
        if (!cell.classList.contains('blurTextColor') && cell.innerHTML != '') {
            cell.classList.add('pointColorForBorder');
        }
    })

}

//#endregion

//매주 반복 체크 loopEveryWeek();
//#region

function loopEveryWeek() {
    if (checkedDate[0]) {
        checkedDate.forEach((date) => {
            let targetDate = new Date(date);
            targetDate.setMonth(targetDate.getMonth() + 1);

            cells.forEach((cell) => {
                let cellDate = new Date(cell.getAttribute('data-date'));
                cellDate.setMonth(cellDate.getMonth() + 1);

                if (targetDate.getDay() == cellDate.getDay()) {
                    if (targetDate < cellDate) {
                        cell.classList.add('pointColorForBorder');
                    }
                }
            })
        })

    }

}


//#endregion

// }