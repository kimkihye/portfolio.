const form = document.querySelector("#member");
const btnSubmit = document.querySelector("input[type=submit]");


btnSubmit.addEventListener("click",(e)=>{
    if (!isTxt("name", 3)) e.preventDefault();
    if (!isTxt("tel", 11)) e.preventDefault();
    if (!isTxt("comments", 20)) e.preventDefault();

    if (!isEmail("email")) e.preventDefault();

    if (!isCheck("design")) e.preventDefault();
    
})
// console.log(form.querySelectorAll("p"));
console.log(form.querySelectorAll("p"));
function isTxt(el, len) {
    //지역변수로 - userid영역을 변수지정

    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;
    console.log(txt);
    //서txt에다 input에 사용자가 작성한 값을 담아
    //txt의 길이를 측정해서 개발자가 원하는 글자수가 맞는지를 
    //판단하는코드를 작성합니다

    // if(글자수가 맞는지?){
    //     맞으면 return true;
    // }else{
    //     틀리면 
    //     경고문구도 출력해서 만들고
    //     return false;
    // }

    if (txt.length >= len) {
        //중첩되어있는 p요소가 있는지 판별하고
        const isErrMsg = input.closest("td").querySelectorAll("p");
        //isErrMsg.length > 0이 적용되려면 배열의 형태에서 길이를
        //물어보는 조건식이어야합니다
        //있으면 제거하고
        console.log(isErrMsg);
        if (isErrMsg.length > 0) {
            input.closest("td").querySelector("p").remove();
            // input.closest("td").querySelectorAll("p").remove();
            //querySelectorAll은 유사배열로 반환되며 배열에는
            //remove()매소드가 적용될수 없기 때문에
            // querySelector로 찾아서 지워야합니다
        }
        //ture를 반환
        return true;
    } else {
        /*
        완전 처음, 글자수가 5자 미만이면 
        1구간의 코드는 p태그가 현재 없으므로 무시됩니다
        그리고 2구간으로 넘어가서 p태그를 생성하고 에러메세지를 작성

        이후 에러메세지가 있는 상태에서 버튼을 다시 눌렀을경우
        p태그가 있는 상태이므로 1구간이 무시되지 않고
        1구간이 작동됩니다 이때 return을 만나 
        return false;로 false가 반환되면 이때 return으로 인하여
        이하의 2구간은 무시됩니다
        이로인해 p태그 중첩이 해결됩니다
        */


        //1구간
        //중첩되어있는 p요소가,에러메세지가 있는지 판별하고
        const isErrMsg = input.closest("td").querySelectorAll("p");
        //있으면 제거하고 -> 제거할 필요없이 그대로 두고
        //false만 반환한다
        if (isErrMsg.length > 0) return false;


        //2구간
        //경고문구를 출력해야합니다
        const errMsg = document.createElement("p");
        //p태그를 문서에서 생성합니다
        errMsg.append(`입력항목을 입력하세요`);
        //p태그안에 글자내용이 넣어져있습니다
        input.closest("td").append(errMsg);
        //위에서 만든 p태그를 해당지역변수 input아래에 넣어야하므로
        //td를 찾아서 td맨뒤에 appent로 넣어줍니다

        return false;
    }
}

function isEmail(el){
    let input = form.querySelector(`[name=${el}]`);
    let txt = input.value;
    
    if (/@/.test(txt)) {
        const isErrMsg = input.closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) {
            input.closest("td").querySelector("p").remove();
        }
        return true;
    } else {
        const isErrMsg = input.closest("td").querySelectorAll("p");

        if (isErrMsg.length > 0) return false;

        const errMsg = document.createElement("p");
        errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
        input.closest("td").append(errMsg);

        return false;
    }
}

function isCheck(el) {

    let inputs = form.querySelectorAll(`[name=${el}]`);
    let isChecked = false;


    for (let el of inputs) {
        if (el.checked) isChecked = true;
    }       

    if (isChecked) {
        const isErrMsg = inputs[0].closest("td").querySelectorAll("p");

        if (isErrMsg.length > 0) inputs[0].closest("td").querySelector("p").remove();

        return true;
    }
    else{

        
        const isErrMsg = inputs[0].closest("td").querySelectorAll("p");
        if (isErrMsg.length > 0) return;
        const errMsg = document.createElement("p");
        errMsg.append("필수 입력항목을 체크해주세요");
        inputs[0].closest("td").append(errMsg);

        return false;
    }

    

        
    }




