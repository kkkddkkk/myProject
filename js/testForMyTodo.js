document.addEventListener('DOMContentLoaded', () => {
    let ranNum = parseInt(Math.random() * 5);
    let dropDown = document.querySelector('.dropDown');
    let dropMenu = document.querySelector('.dropMenu');
    let addNewTask = document.querySelector('.addNewTask');
    let innerWrap = document.querySelector('.innerWrap');

    let subDivisionUl = document.querySelector('.subDivisionUl');
    let subDivisionLi = document.querySelector('.subDivisionLi');
    let taskLi = document.querySelector('.taskLi');
    let clone, cloneDiv, cloneSub, cloneTask, ranNum2, ranNum3;

    //division 랜덤생성
    for (let i = 0; i < ranNum; i++) {
        clone = dropMenu.cloneNode(true);
        clone.innerHTML = `division${i + 1}`;
        clone.value = `division${i + 1}`;
        clone.style.display = 'block';

        //addNewTask 위에 clone 붙이기
        dropDown.insertBefore(clone, addNewTask);

        //division마다 subDivision 생성
        cloneDiv = subDivisionUl.cloneNode(true);
        cloneDiv.classList.add(clone.value);

        innerWrap.appendChild(cloneDiv);

        // subDivision 랜덤 생성
        ranNum2 = parseInt(Math.random() * 4 + 1);
        for (let j = 0; j < ranNum2; j++) {
            cloneSub = subDivisionLi.cloneNode(true);
            cloneSub.style.display = 'flex';
            cloneSub.classList.add(`subDivision${j + 1}`);

            cloneSub.querySelector('.subDivisionName').querySelector('p').innerHTML = `subDivision${j + 1}`;
            cloneDiv.appendChild(cloneSub);

            //task 랜덤 생성
            ranNum3 = parseInt(Math.random() * 3 + 1);
            for (let k = 0; k < ranNum3; k++) {
                cloneTask = taskLi.cloneNode(true);
                cloneTask.style.display = 'flex';
                cloneTask.classList.add(`task${k + 1}`);

                cloneTask.querySelector('.taskName').querySelector('p').innerHTML = `task${k + 1}`;
                cloneSub.querySelector('.taskUl').appendChild(cloneTask);
            }
        }
    }

    dropMenu = document.querySelectorAll('.dropMenu');
    subDivisionUl = document.querySelectorAll('.subDivisionUl');
    subDivisionLi = document.querySelectorAll('.subDivisionLi');
    if (ranNum != 0) {
        addNewTask.selected = false;
        dropMenu[1].selected = true;
        subDivisionUl[1].style.display = 'block';
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