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
document.addEventListener("DOMContentLoaded",()=>{
    draw_buttons();
})