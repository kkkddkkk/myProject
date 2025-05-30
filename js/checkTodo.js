
document.addEventListener('DOMContentLoaded',()=>{

    //taskArea - chartArea division명, 색 통일
    let divisionUl = document.querySelectorAll('.divisionUl');
    let taskAtChart = document.querySelectorAll('.taskAtChart');

    for(i=0;i<divisionUl.length;i++){
        let getColor = divisionUl[i].querySelector('.taskAtList').querySelector('div').style.backgroundColor;
        let setColor = taskAtChart[i].querySelector('div').style.backgroundColor;
        setColor = getColor;
    }


})