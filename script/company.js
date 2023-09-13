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