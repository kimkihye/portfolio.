//헤더 메뉴
//변수설정
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

//이벤트 바인딩

//btnCall을 클릭할때

btnCall.onclick = function(e){
    //링크이동금지
    e.preventDefault();

    //btnCall에 on이 있으면 제거하고, 없으면 추가
    btnCall.classList.toggle("on");
    //menuMo에 on이 있으면 제거하고, 없으면 추가
    menuMo.classList.toggle('on');
}


const panels = document.querySelector(".panels");
const panels_li = panels.querySelectorAll("li");
const btn = document.querySelectorAll(".btn li");
const png = document.querySelector(".png");
btn.forEach((el, index)=>{
    el.addEventListener("click", (e)=>{
        e.preventDefault();

        for(let el of btn) el.classList.remove("on");
        btn[index].classList.add("on");

        panels.style.marginLeft = `${-100 * index}%`;
    })
})

window.addEventListener("scroll",()=>{
    let scroll = window.scrollY || window.pageYOffset
    || document.documentElement.scrollTop;
    // console.log(scroll);
    if(scroll >= 500 && scroll < 1300){
        png.style.left = `${scroll - 700}px`;
    }else if(scroll < 0){
        png.style.left = `-10px`;
    }
})