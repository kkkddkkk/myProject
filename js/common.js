
// loadHeaderReal("header.html", "header");


// window.loadHeader = (headerData)=>{
//     const headerContainer = document.querySelector('#header');
//     const headerContents = document.createElement('div');

//     headerContents.innerHTML = headerData;

//     headerContainer.appendChild(headerContents);
// }

// window.loadHeaderReal = (path, targetId)=>{
//     fetch(path).then(result=>{
//         result.text()
//     }).then(data=>{
//         document.querySelector(`#${targetId}`).innerHTML = data;
//     }).catch((error)=>{
//         console.log(error);
//     })
// }

// $(function () {
//     $("#header").load("header.html");
// })
document.addEventListener('DOMContentLoaded', function () {
    $("#header").load("header.html", function () {
        $.getScript("header.js");
    });
})
