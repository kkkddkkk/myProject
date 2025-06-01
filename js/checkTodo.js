
document.addEventListener('DOMContentLoaded', () => {

    //chartArea
    let pieChartCanvas = document.querySelector('.pieChart').getContext('2d');
    let taskAtChartDiv = document.querySelector('.taskAtChartDiv');
    let taskAtChart = document.querySelectorAll('.taskAtChart');//chartArea

    let divisionArr = new Array();
    let dataArr1 = new Array();
    let colorArr = new Array();

    let divisionUl = document.querySelectorAll('.divisionUl');//taskListArea



    //taskArea 갯수에 따른 chartArea - division 추가
    for (let i = 0; i < divisionUl.length; i++) {
        if (i % 2 == 0 && i < divisionUl.length - 2) {
            clone = document.querySelector('.taskEven').cloneNode(true);
            taskAtChartDiv.appendChild(clone);
        } else if ((i % 2 != 0 && i < divisionUl.length - 2)) {
            clone = document.querySelector('.taskOdd').cloneNode(true);
            taskAtChartDiv.appendChild(clone);
        }

        //chartArea의 division 명 통일
        taskAtChart = document.querySelectorAll('.taskAtChart');
        taskAtChart[i].querySelector('.taskTxt').innerHTML = divisionUl[i].querySelector('.taskAtList').querySelector('p').innerHTML;
        divisionArr[i] = taskAtChart[i].querySelector('.taskTxt').innerHTML;
        dataArr1[i] = 100;

        //chartArea의 listImg 색 통일
        let getColor = window.getComputedStyle(divisionUl[i].querySelector('.listImg')).backgroundColor;
        taskAtChart[i].querySelector('div').style.backgroundColor = getColor;
        colorArr[i] = getColor;

        taskAtChart[i].querySelector('div').classList.add(`task${i}`)
    }

    let sum = 0;
    let dataArr2 = new Array();
    let dataArr = new Array();
    for (let i = 0; i < dataArr1.length; i++) {
        sum += dataArr1[i];
    }
    for (let i = 0; i < dataArr1.length; i++) {
        dataArr2[i] =  Math.round(dataArr1[i]/sum*100);
    }


    //piechart 생성
    let pieChart = new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
            datasets: [{
                // label: divisionArr,
                data: dataArr2,
                backgroundColor: colorArr,
                borderColor: colorArr,
                borderWidth: 1
            }]
        }
    })


})