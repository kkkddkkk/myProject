document.addEventListener('DOMContentLoaded', () => {
    //dropdown menu 랜덤 생성
    let ranNum = parseInt(Math.random() * 5);
    let dropDown = document.querySelector('.dropDown');
    let dropMenu = document.querySelector('.dropMenu');
    let addNewTask = document.querySelector('.addNewTask');
    let clone;

    for (let i = 0; i < ranNum; i++) {
        clone = dropMenu.cloneNode(true);
        clone.innerHTML = `division${i + 1}`;
        clone.value = `division${i + 1}`;
        clone.style.display = 'block';

        //addNewTask 위에 clone 붙이기
        dropDown.insertBefore(clone, addNewTask);
    }

    dropMenu = document.querySelectorAll('.dropMenu');
    if(ranNum!=0){
        addNewTask.selected = false;
        dropMenu[1].selected = true;
    }

    //subDivision 랜덤 생성
    ranNum = parseInt(Math.random() * 5 + 1);
    let subDivisionUl = document.querySelector('.subDivisionUl');
    let subDivisionLi = document.querySelector('.subDivisionLi');

    for (let i = 0; i < ranNum; i++) {
        clone = subDivisionLi.cloneNode(true);
        clone.style.display = 'flex';
        clone.classList.add(`subDivision${i + 1}`);

        clone.querySelector('.subDivisionName').querySelector('p').innerHTML = `subDivision${i + 1}`;
        subDivisionUl.appendChild(clone);
    }

    //task 랜덤생성
    subDivisionLi = document.querySelectorAll('.subDivisionLi');

    let taskLi = document.querySelector('.taskLi');

    for (let i = 0; i < subDivisionLi.length; i++) {
        ranNum = parseInt(Math.random() * 3 + 1);
        for (let j = 0; j < ranNum; j++) {
            clone = taskLi.cloneNode(true);
            clone.style.display = 'flex';
            clone.classList.add(`task${j + 1}`);

            clone.querySelector('.taskName').querySelector('p').innerHTML = `task${j + 1}`;
            subDivisionLi[i].querySelector('.taskUl').appendChild(clone);
        }
    }


})