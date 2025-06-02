
document.addEventListener('DOMContentLoaded', () => {

    //임시 - taskArea 2번 추가
    let divisionUl = document.querySelector('.divisionUl');
    let taskArea = document.querySelector('.taskArea');
    let taskAtChartDiv = document.querySelector('.taskAtChartDiv');
    let taskAtChart = document.querySelectorAll('.taskAtChart');
    let clone = divisionUl.cloneNode(true)

    //taskList 랜덤생성(0~5)
    let ranNum = (Math.random() * 4) + 1;
    for (i = 0; i < ranNum; i++) {
        clone = divisionUl.cloneNode(true)
        taskArea.appendChild(clone);
    }

    divisionUl = document.querySelectorAll('.divisionUl');

    //taskArea division 변경, 랜덤색상 지정
    for (let i = 0; i < divisionUl.length; i++) {
        divisionUl[i].querySelector('.taskAtList').querySelector('div').style.backgroundColor = randomColor();
        divisionUl[i].querySelector('.taskAtList').querySelector('p').innerHTML = `division${(i + 1)}`;
    }

    //내 업무 랜덤으로 추가
    let taskLi = document.querySelectorAll('.taskLi');
    let randomTask = Math.floor(Math.random()*2);

    for(let i=0;i<taskLi.length;i++){
        randomTask = Math.floor(Math.random()*2);
        if(randomTask == 1){
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