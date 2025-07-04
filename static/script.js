function draw_buttons(){
        let keypad = document.querySelector(".keypad"); //this line is needed, cant make it global

        const keypad_values = [
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            ".","0","=","+"
        ];
        //to create keypad
        for(let key in keypad_values){
            let new_key = document.createElement("div");
            new_key.className = "button";
            new_key.textContent = keypad_values[key];
            if ("/+=*-".includes(keypad_values[key])) new_key.classList.add("o-button");
            keypad.appendChild(new_key);
        }
        
}
function eval(a,b,operator){
    if(!b) return a; //when user does smt like 8+=
    switch(operator){
        case "/" : return a / b;
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a*b;
        default : return "";
    }
}
let result = null;
let value = null;
let operator = null;
let op_s = false;
document.addEventListener("DOMContentLoaded",()=>{
    draw_buttons();

    let display = document.querySelector(".display");

    document.querySelector(".clear-buttons").addEventListener("click",(e)=>{
        if (e.target.id === "ac"){
            display.textContent = "";
            result = value = operator= null;
        }
        else display.textContent = display.textContent.slice(0,-1);
    })
    document.querySelector(".keypad").addEventListener("click",(e)=>{
        //lets work with dealing with integers for now
        let key = e.target.textContent;
        //if symbol
        if("/*+-=".includes(key)){
            if(key ==="=" && !op_s){
                //if very first operation assume valid input
                value = parseInt(display.textContent);
                result = eval(result,value,operator);
                display.textContent = result;
                op_s = true;
                value = null;

            }
            else{
                if(!operator){ //first operation
                    operator = key;
                    result = parseInt(display.textContent);
                    display.textContent = "";
                }
                else{
                    if(display.textContent &&!op_s){ //deal with 8+-/ case & 8+2+-, assumes value on screen is entered value
                        value = parseInt(display.textContent);
                        result = eval(result,value,operator);
                        display.textContent = `${result}`;
                        op_s = true;
                        value = null;
                    }
                    operator = key;
                }
            }
        }
        //if numeric
        else{
            if(op_s && value==null){
                value = parseInt(display.textContent);
                display.textContent = "";
                op_s = false;
            } 
            display.textContent+=key;
        }

    })
})