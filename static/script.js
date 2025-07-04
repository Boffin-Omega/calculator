const keypad_values = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    ".","0","=","+"
];
function draw_buttons(){
        let keypad = document.querySelector(".keypad"); //this line is needed, cant make it global
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
//checks if given number string is float
function is_f(number){
    return number.includes(".");
}
//rounds off number to decimalPlaces decimalPlaces
function round(num, decimalPlaces) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}
let result = null;
let value = null;
let operator = null;
let op_s = false; // stores if current operation is successful

document.addEventListener("DOMContentLoaded",()=>{
    draw_buttons();

    //essentially, core logic of calc is same, whether input is from clicking buttons or from keyboard
    //declared it here cuz of scope reasons. if i declared it globally, wouldnt be able to access display
    function calc_core(key){
        if(key === "Enter"){
            document.querySelector("#\\=").click();
            return;
        } 
        else if (key=== "Backspace"){
            document.querySelector("#del").click();
            return;
        }
        if(result =="Error"){
            display.textContent = ""; //if error occured then clear display
            result = null;
        } 
        //if symbol key entered
        if("/*+-=".includes(key)){
            if(key ==="=" && !op_s){
                if (is_f(display.textContent)) value = parseFloat(display.textContent);
                else value = parseInt(display.textContent);
                result = eval(result,value,operator);
                display.textContent = round(result,11);
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
                        display.textContent = `${round(result,11)}`;
                        op_s = true;
                        value = null;
                    }
                    operator = key; //to choose latest entered operator
                }
            }
        }
        //if numeric key or . was entered
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
    }

    let display = document.querySelector(".display");
    //for ac and del buttons
    document.querySelector(".clear-buttons").addEventListener("click",(e)=>{
        if (e.target.id === "ac"){
            display.textContent = "";
            result = value = operator= null;
        }
        else display.textContent = display.textContent.slice(0,-1);
    })
    //for rest of the keypad buttons
    document.querySelector(".keypad").addEventListener("click",(e)=>{
        let key = e.target.textContent;
        calc_core(key);

    })
    //for keyboard input
    document.addEventListener("keydown",(e)=>{
        let key = e.key;
        console.log(key)
        if (keypad_values.includes(key) || key==="Enter" || key ==="Backspace"){
            calc_core(key);
        }
    })
})