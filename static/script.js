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
            new_key.id = keypad_values[key];
            if ("/+=*-".includes(keypad_values[key])) new_key.classList.add("o-button");
            keypad.appendChild(new_key);
        }
        
}
function eval(a,b,operator){
    if(b===null) return a; //when user does smt like 8+=
    switch(operator){
        case "/" : if (b!=0) return a / b; else return "Error"
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a*b;
        default : return "";
    }
}
function is_f(number){
    return number.includes(".");
}

let result = null;
let value = null;
let operator = null;
let op_s = false; // stores if current operation is successful

document.addEventListener("DOMContentLoaded",()=>{
    draw_buttons();

    let display = document.querySelector(".display");
    let dot = document.querySelector("#\\.");

    document.querySelector(".clear-buttons").addEventListener("click",(e)=>{
        if (e.target.id === "ac"){
            display.textContent = "";
            result = value = operator= null;
        }
        else display.textContent = display.textContent.slice(0,-1);
    })
    document.querySelector(".keypad").addEventListener("click",(e)=>{
        if(result =="Error"){
            display.textContent = ""; //if error occured then clear display
            result = null;
        } 
        //lets work with dealing with integers for now
        let key = e.target.textContent;
        //if symbol key entered
        if("/*+-=".includes(key)){
            if(key ==="=" && !op_s){
                if (is_f(display.textContent)) value = parseFloat(display.textContent);
                else value = parseInt(display.textContent);
                result = eval(result,value,operator);
                display.textContent = result.toFixed(11);
                op_s = true;
                value = null;
            }
            else{
                if(!operator){ //first operation
                    operator = key;
                    if (is_f(display.textContent)) result = parseFloat(display.textContent);
                    else result = parseInt(display.textContent);
                    display.textContent = "";
                }
                else{
                    if(display.textContent &&!op_s){ //deal with 8+-/ case & 8+2+-, assumes value on screen is entered value
                        if (is_f(display.textContent)) value = parseFloat(display.textContent);
                        else value = parseInt(display.textContent);
                        result = eval(result,value,operator);
                        display.textContent = `${result.toFixed(11)}`;
                        op_s = true;
                        value = null;
                    }
                    operator = key; //to choose latest entered operator
                }
            }
        }
        //if numeric key was entered
        else{
            if(key === "."){
                if (!display.textContent.includes(".")) display.textContent+=key;
            }
            else{
                if(op_s && value==null){
                    if (is_f(display.textContent)) value = parseFloat(display.textContent);
                    else value = parseInt(display.textContent);
                    display.textContent = "";
                    op_s = false;
                }

                if (display.textContent.length<13) display.textContent+=key;
            }
        }
    })
})