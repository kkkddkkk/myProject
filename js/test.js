
document.addEventListener('DOMContentLoaded', () => {

    //임시 - taskArea 2번 추가
    let divisionUl = document.querySelector('.divisionUl');
    let taskArea = document.querySelector('.taskArea');
    let taskAtChart = document.querySelectorAll('.taskAtChart');
    let clone = divisionUl.cloneNode(true)

    for (i = 0; i < 2; i++) {
        clone = divisionUl.cloneNode(true)
        taskArea.appendChild(clone);
    }

    let divisionUlAll = document.querySelectorAll('.divisionUl');

    //taskArea division 변경, 랜덤색상 지정
    for (let i = 0; i < divisionUlAll.length; i++) {
        divisionUlAll[i].querySelector('.taskAtList').querySelector('div').style.backgroundColor = randomColor();
        divisionUlAll[i].querySelector('.taskAtList').querySelector('p').innerHTML = `division${(i + 1)}`

        let getColor = window.getComputedStyle(divisionUlAll[i].querySelector('.taskAtList').querySelector('div')).backgroundColor;
        taskAtChart[i].querySelector('div').style.backgroundColor = getColor;

    }//색깔 지정 함수 수정한거 checkTodo.js로 옮기기!


    //랜덤색상 함수
    function randomColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);

        return `rgb(${red}, ${green}, ${blue})`;
    }


})