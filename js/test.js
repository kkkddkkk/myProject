
document.addEventListener('DOMContentLoaded', () => {

    //임시 - taskArea 2번 추가
    let divisionUl = document.querySelector('.divisionUl');
    let divisionLi = document.querySelector('.divisionLi');
    let subDivisionUl = document.querySelector('.subDivisionUl');
    let subDivisionLi = document.querySelector('.subDivisionLi');
    let taskArea = document.querySelector('.taskArea');
    let taskAtChartDiv = document.querySelector('.taskAtChartDiv');
    let taskAtChart = document.querySelectorAll('.taskAtChart');

    let cloneDivision = divisionLi.cloneNode(true);
    let cloneSubDivision = subDivisionLi.cloneNode(true);

    //division 랜덤생성(1~5)
    let ranNum = (Math.random() * 4) + 1;
    for (let i = 0; i < ranNum; i++) {
        cloneDivision = divisionLi.cloneNode(true);
        divisionUl.appendChild(cloneDivision);
    }

    divisionLi = document.querySelectorAll('.divisionLi');

    //taskArea division 변경, 랜덤색상 지정
    for (let i = 0; i < divisionLi.length; i++) {
        divisionLi[i].querySelector('.taskAtList').querySelector('div').style.backgroundColor = randomColor();
        divisionLi[i].querySelector('.taskAtList').querySelector('p').innerHTML = `division${(i + 1)}`;

        //subDivision 랜덤생성(1~4)
        ranNum = (Math.random() * 3) + 1;
        for (let j = 0; j < ranNum; j++) {
            cloneSubDivision = subDivisionLi.cloneNode(true);
            divisionLi[i].querySelector('.subDivisionUl').appendChild(cloneSubDivision);
        }
    }

    for (let i = 0; i < divisionLi.length; i++) {
        subDivisionLi = divisionLi[i].querySelectorAll('.subDivisionLi');

        //subdivision명 부여
        for (let j = 0; j < subDivisionLi.length; j++) {
            subDivisionLi[j].querySelector('.subDiviList').querySelector('p').innerHTML = `subDivision${(j + 1)}`;
        }

        
    }





    //내 업무 랜덤으로 추가
    let taskLi = document.querySelectorAll('.taskLi');
    let randomTask = Math.floor(Math.random() * 2);

    for (let i = 0; i < taskLi.length; i++) {
        randomTask = Math.floor(Math.random() * 2);
        if (randomTask == 1) {
            taskLi[i].classList.add('myTask');
        }
    }




    //랜덤색상 함수
    function randomColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);

        return `rgb(${red}, ${green}, ${blue})`;
    }




})