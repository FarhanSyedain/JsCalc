var non_prefixing_oprators = ["*", "/", "+"];
var oprators = ["*", "/", "-", "+"];
var combos_legal = ['*-',"+-","/-","--"];

var answer = document.getElementById('answer')
var last_digit;
var last_two_digits;
var input_requested;


function clicked (input) {
    input_requested = input.innerText;
    if (last_digit == undefined) {
        if (non_prefixing_oprators.includes(input_requested)) {
            return;
        } else {
            answer.value = input_requested;
            updateVars()
        }
    } else if (input_requested == '.') {
        //Index str from end to start
        for (let i = answer.value.length - 1; i > -1 ; i--) {
            let char = answer.value.charAt(i)
            if (oprators.includes(char)) {
                let substr = answer.value.substring(i,answer.value.length) 
                if (!substr.includes(".")) {
                    answer.value = answer.value + input_requested;
                    updateVars();
                }
            }
        }
        if (!answer.value.includes('.')) {
            answer.value = answer.value + input_requested;
            updateVars();
        }
        return;

    } else if (oprators.includes(last_digit) || last_digit == '.') {
        if (!isNaN(Number(input_requested))){
            answer.value = answer.value + input_requested;
            updateVars();
        } else if (isLegal(last_digit,input_requested) && arentBothOprators(last_two_digits)) {
            answer.value = answer.value + input_requested;
            updateVars();
        } else {
            return;
        }
    } else {
        answer.value = answer.value + input_requested;
        updateVars();
    }
}

function updateVars () {
    let answer = document.getElementById('answer').value
    last_digit = last_two_digits = undefined;
    if (answer.length < 1) {
        return
    }
    last_digit = answer.charAt(answer.length - 1)
    if (answer.length < 2) {
        return
    }
    last_two_digits = answer.substring(answer.length - 2, answer.length -1)
}

function arentBothOprators (str) {
    if (str == undefined) {
        return false
    }
    let str1 = str.charAt(0)
    let str2 = str.charAt(1) 
    
    return !oprators.includes(str1) == !oprators.includes(str2) 
}

function isLegal (str1, str2) {
    let str = str1 + str2;
    return combos_legal.includes(str) 
}

function clearinput () {
    answer.value = '';
    updateVars();
}

function backinput () {
    if (answer.value.length > 0) {
        let tempanswer = answer.value.substring(0,answer.value.length - 1)
        answer.value = tempanswer;
        updateVars();
    }
}

function Equal () {
    let answer_string = answer.value.replace(/--/g,"+") // Since - * - is + 
    if (answer_string.length == 0) {
        return
    }
    answer.value = eval(answer_string);
    updateVars();
}