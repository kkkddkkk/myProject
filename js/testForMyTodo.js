document.addEventListener('DOMContentLoaded', () => {
    let ranNum = parseInt(Math.random() * 5);
    let dropDown = document.querySelector('.dropDown');
    let dropMenu = document.querySelector('.dropMenu');
    let addNewTask = document.querySelector('.addNewTask');
    let innerWrap = document.querySelector('.innerWrap');

    let subDivisionUl = document.querySelector('.subDivisionUl');
    let subDivisionLi = document.querySelector('.subDivisionLi');
    let clone, cloneDiv, ranNum2;

    //division 랜덤생성
    for (let i = 0; i < ranNum; i++) {
        clone = dropMenu.cloneNode(true);
        clone.innerHTML = `division${i + 1}`;
        clone.value = `division${i + 1}`;
        clone.style.display = 'block';

        //addNewTask 위에 clone 붙이기
        dropDown.insertBefore(clone, addNewTask);

        ranNum2 = parseInt(Math.random() * 5 + 1);
        cloneDiv = subDivisionUl.cloneNode(true);
        cloneDiv.classList.add(clone.value);
        cloneDiv.style.display = 'block';
        innerWrap.appendChild(cloneDiv);
        console.log(innerWrap.innerHTML);

    }
    dropMenu = document.querySelectorAll('.dropMenu');
    if (ranNum != 0) {
        addNewTask.selected = false;
        dropMenu[1].selected = true;

    }

    //subDivision 랜덤 생성
    

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

    //팀원 랜덤생성
    let friendsListDiv = document.querySelector('.friendsListDiv');
    let friendsList = document.querySelector('.friendsList');
    ranNum = parseInt(Math.random() * 20 + 1);
    for (let i = 0; i < ranNum; i++) {
        clone = friendsList.cloneNode(true);
        clone.style.display = 'flex';
        clone.classList.add(`friend${i + 1}`);
        clone.querySelector('p').innerHTML = `friend${i + 1}`;
        friendsListDiv.appendChild(clone);
    }

    let searchListDiv = document.querySelector('.searchListDiv');
    let searchList = document.querySelector('.searchList');
    for (let i = 0; i < ranNum; i++) {
        clone = searchList.cloneNode(true);
        clone.style.display = 'flex';
        clone.classList.add(`name${i + 1}`);
        clone.querySelector('p').innerHTML = `name${i + 1}`;
        searchListDiv.appendChild(clone);
    }



})