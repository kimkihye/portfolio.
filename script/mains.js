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


const panel = document.querySelector(".panel");
const nexts = document.querySelector(".nexts");
const prevs =  document.querySelector(".prevs");
const natus = document.querySelector(".natus");
//마지막 li를 때어서 맨 앞으로 붙여서 1부터 슬라이드가 시작되도록
//방법2개
panel.prepend(panel.lastElementChild);
// panel.prepend(panel.children[panel.children.length -1]);

nexts.addEventListener("click",(e)=>{
    e.preventDefault();

    panel.style.transition ="margin-left 0.5s";
    panel.style.marginLeft = "-50%";

    //슬라이더 순환이 되기 위한 코드
    panel.addEventListener("transitionend",()=>{
        panel.appendChild(panel.children[0]);
        panel.style.transition = "none";
        panel.style.marginLeft = "-25%"
    }, {once : true});
    //once : true는 이 이벤트 리스너가 오직 한번만 실행 된 후 그 후 자동적으로
    //제거 되도록 한다
})

prevs.addEventListener("click",(e)=>{
    e.preventDefault();

    panel.style.transition ="margin-left 0.5s";
    panel.style.marginLeft = "0%";

    //슬라이더 순환이 되기 위한 코드
    panel.addEventListener("transitionend",()=>{
        panel.prepend(panel.children[panel.children.length -1]);
        panel.style.transition = "none";
        panel.style.marginLeft = "-25%";
    }, {once : true});
    //once : true는 이 이벤트 리스너가 오직 한번만 실행 된 후 그 후 자동적으로
    //제거 되도록 한다
})

window.addEventListener("scroll",()=>{
    let scroll = window.scrollY || window.pageYOffset
    || document.documentElement.scrollTop;
    // console.log(scroll);
    if(scroll >= 1200 && scroll < 2000){
        natus.style.left = `${scroll -1200}px`;
    }else if(scroll <= 1200){
        natus.style.left = `-10px`;
    }
})











//서클슬라이더
const slider_ul = document.querySelector("#slider ul");
const sliders = slider_ul.children;
const lis = slider_ul.querySelectorAll("li");


const btns = document.querySelector(".btns");
const [prev, next] = btns.children;
const pop = document.querySelector(".pop");
const close = pop.querySelector(".close");
const opens = slider_ul.querySelectorAll("a");

// let enableClick = true;

for (let i = 0; i < 3; i++) { slider_ul.prepend(slider_ul.lastElementChild); }

prev.addEventListener("click", () => {
    slider_ul.prepend(slider_ul.lastElementChild);

    for (let el of sliders) el.classList.remove("on");
    sliders[3].classList.add("on");

    // if(enableClick){
    //     for(let el of sliders) el.classList.remove("on");
    //     sliders[3].classList.add("on");
    // }

})

next.addEventListener("click", () => {
    slider_ul.append(slider_ul.firstElementChild);
    for (let el of sliders) el.classList.remove("on");
    sliders[3].classList.add("on");
})

//opens
console.log(opens);
opens.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        let txt = e.currentTarget.closest("li").querySelector("h2").innerText;
        console.log(txt);
        pop.querySelector("h2").innerText = txt;


        pop.classList.add("on");
        e.currentTarget.classList.add("off");
        btns.classList.add("off");




    })
})

close.addEventListener("click", () => {
    pop.classList.remove("on");
    btns.classList.remove("off");
    slider_ul.querySelector("li.on a").classList.remove("off");

})




//자동슬라이드
const frame = document.querySelector("#banner");
const panels = frame.querySelectorAll(".panel li");
const btnss = frame.querySelectorAll(".btns li");
const btnPlay = frame.querySelector(".fa-play");
const btnStop = frame.querySelector(".fa-stop");
const bar = frame.querySelector(".bar");

const len = panels.length - 1;//index의 값과 일치하도록 -1을함
let num = 0;
let timer = null;
const interval = 5000; //롤링 반복 시간


startRolling();


//적용하는 대상으로는 동작 3가지
//1.btns를 클릭하면 해당 인덱스로 이동하는 동작
btnss.forEach((el, index) => {
    el.addEventListener("click", () => {
        active(index);
        stopRolling();
    });
})

//2.play btn을 클릭하면 자동롤링이 시작
// btnPlay.addEventListener("click", (e) => {
//     if (e.target.classList.contains("on")) {
//         return;
//     } else {
//         startRolling();
//     }
// });

//3.stop btn을 클릭하면 자동롤링이 멈춤
// btnStop.addEventListener("click", stopRolling);


//적용하는 기능을 담은 함수를 생성

//1 롤링 시작기능
function startRolling() {
    bar.style.display = "block"; //1
    setTimeout(progress, 0);  //2

    active(num);
    //언제나 1이 먼저 실행되고 2가 이후에 실행됩니다
    // setInterval(()=>{},시간)
    //setInterval 콜백함수를 시간마다 계속 실행하도록 요청합니다
    //단점 : 리소스 찌꺼기가 남아요
    timer = setInterval(rolling, interval);

    // btnPlay.classList.add("on");
    // btnStop.classList.remove("on");
}

//2롤링을 멈추는 기능
function stopRolling() {
    bar.style.display = "none";
    clearInterval(timer);
    // setInterval이 만든 리소스 찌꺼기를 깔끔하게 청소해줍니다
    btnStop.classList.add("on");
    btnPlay.classList.remove("on");
}

//3. on클래스로 활성화 기능
function active(index) {
    //클릭을 하는 순간
    //모든 panels와 btns들에 on을 일시적으로 지우고
    //클릭한 인덱스에 해당하는 panels인덱스와 btns인덱스에만 on을 붙입니다
    for (let el of panels) el.classList.remove("on");
    for (let el of btnss) el.classList.remove("on");
    panels[index].classList.add("on");
    btnss[index].classList.add("on");
    num = index;
    //전역변수num을 active함수에서 함수가 실행되면서 변경된 index로
    //전역변수num을 갱신하도록 합니다
    bar.style.width = "0%";
}

//3-1 싱크를 맞추는 롤링함수
function rolling() {
    //여기에서 전역변수num의 값과 len의 값을 비교해서
    //순환을 시켜줍니다
    if (num < len) {
        num++;
    } else {
        num = 0;
    }
    active(num);
    progress();

}

//4. bar를 움직이는 기능
function progress() {

    const init = parseInt(bar.style.width) || 0;
    // const targetValue = 100;
    const unit = "%";
    const startTime = performance.now();
    function animate(time) {
        const realTime = time - startTime;
        const prog = realTime / interval;
        //prog의 값은 0~1사이의 값이 됩니다
        const currentValue = init + 100 * prog;
        //시작은 0 끝은 100
        bar.style.width = `${currentValue}${unit}`;

        if (prog < 1) {
            requestAnimationFrame(animate);
        } else if (prog >= 1) {
            bar.style.width = "0%";
            // if (typeof callback === "function") callback();
        }

    }
    requestAnimationFrame(animate);
    //requestAnimationFrame메소드안에 함수를 호출해서 실행해야하므로 
    // requestAnimationFrame(animate);이 렇게 작성해야합니다
    // requestAnimationFrame(animate());
    //이 내용은 함수의 값을 requestAnimationFrame에 매개변수로 넣는다는 의미
}

//메인
const btnOpen = document.querySelector(".btnOpen");
const aside = document.querySelector(".boxes");
const btnClose = document.querySelector(".btnClose");

let _top = aside.querySelector(".top");
let _right = aside.querySelector(".right");
let _bottom = aside.querySelector(".bottom");
let _left = aside.querySelector(".left");
let inner = aside.querySelector(".inner");

let section = document.querySelector("section");


btnOpen.addEventListener("click",(e)=>{
    e.preventDefault();

    // 1단계 main의 그림들을 사라지게 함
    section.classList.add("on");

    aside.style.display = "block";
    // 선을 그려줌 - 콜백을 이용해서 순차적으로 그려줌
    new Anim(_top,{
        prop : "width",
        value: "100%",
        duration: 500,
        callback: ()=>{
            new Anim(_right,{
                prop : "height",
                value: "100%",
                duration: 500,
                callback: ()=>{
                    new Anim(_bottom,{
                        prop : "width",
                        value: "100%",
                        duration: 500,
                        callback: ()=>{
                            new Anim(_left,{
                                prop : "height",
                                value: "100%",
                                duration: 500,
                                callback: ()=>{
                                    new Anim(inner,{
                                        prop : "opacity",
                                        value: "1",
                                        duration: 500
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

})

btnClose.addEventListener("click",(e)=>{
    e.preventDefault();

    new Anim(inner,{
        prop : "opacity",
        value: "0",
        duration: 500,
        callback: ()=>{
            // 사라질 때는 선이 한 번에 사라지도록 대신에 이너가 사라진 다음에..
            new Anim(_top,{
                prop : "width",
                value: "0%",
                duration: 500
            });
            new Anim(_right,{
                prop : "height",
                value: "0%",
                duration: 500
            });
            new Anim(_bottom,{
                prop : "width",
                value: "0%",
                duration: 500
            });
            new Anim(_left,{
                prop : "height",
                value: "0%",
                duration: 500,
                callback: ()=>{
                    aside.style.display = "none";
                    section.classList.remove("on");

                }
            });
        }
    })
})
