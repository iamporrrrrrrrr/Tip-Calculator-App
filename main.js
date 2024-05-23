const billInput = document.getElementById('input-bill');
const peopleInput = document.getElementById('input-people');
const customInput = document.getElementById('custom-field');
const tipInputs = document.querySelectorAll('.tip');
const reset = document.querySelector('.reset');
let correctBill = true;
let correctTip = true;
let correctPeople = false;
let tipPercent = 5;
let prevTip= null;

const handleReset = () => {
    billInput.classList.remove('error');
    billInput.classList.remove('success');
    billInput.value='';
    handleBill();
    peopleInput.classList.remove('error');
    peopleInput.classList.remove('success');
    peopleInput.value='';
    handlePeople();
    tipInputs.forEach((e) => resetTips(e));
    customInput.value='';
    handleCustom();
}

const handleBill = () => {
    const value = +billInput.value;
    const billField = document.getElementById('field-bill');
    if(billInput.value==''){
        document.getElementById('bill-error').textContent="";
        billField.classList.remove('error');
        billField.classList.remove('success');
        correctBill = true;
    }
    else if(value>=0){
        document.getElementById('bill-error').textContent="";
        billField.classList.remove('error');
        billField.classList.add('success');
        correctBill = true;
    }
    else{
        document.getElementById('bill-error').textContent="Invalid bill";
        billField.classList.add('error');
        billField.classList.remove('success');
        correctBill = false;
    }
}

const handlePeople = () => {
    const value = +peopleInput.value;
    const peopleField = document.getElementById('field-people');
    if(peopleInput.value==''){
        document.getElementById('people-error').textContent="";
        peopleField.classList.remove('error');
        peopleField.classList.remove('success');
        correctPeople = false;
    }
    else if(!(value>0)||value% 1!==0){
        peopleField.classList.add('error');
        peopleField.classList.remove('success');
        document.getElementById('people-error').textContent="Invalid number";
        correctPeople = false;
    }
    else {
        document.getElementById('people-error').textContent="";
        peopleField.classList.remove('error');
        peopleField.classList.add('success');
        correctPeople = true;
    }
}

const handleTips = (e) => {
    console.log(prevTip);
    correctTip = 1;
    if(prevTip!=null){
        prevTip.style.backgroundColor = "var(--Very-dark-cyan)";
        prevTip.style.color = "var(--White)";
    }
    if(e===prevTip) resetTips(e);
    else{
        e.style.backgroundColor = "var(--hover)";
        e.style.color = "var(--Very-dark-cyan)";
        tipPercent= parseInt(e.textContent);
        prevTip = e;
    }
    
}

const resetTips = (e) => {
    correctTip = 1;
    tipPercent = 0;
    prevTip = null;
    e.style.backgroundColor = "var(--Very-dark-cyan)";
    e.style.color = "var(--White)";
}

const handleCustom = () => {
    const value = +customInput.value;
    const customField = document.getElementById('custom');
    if(customInput.value==''){
        correctTip = 1;
        tipPercent = 0;
        customField.classList.remove("error");
        customField.classList.remove("success"); 
    }
    else if(value>=0){
        correctTip = 1;
        tipPercent = value;
        customField.classList.remove("error");
        customField.classList.add("success");
    }
    else{
        correctTip = 0;
        tipPercent = 0;
        customField.classList.remove("success");
        customField.classList.add("error");
    }
}

const calculate = () => {
    const tipAmount = document.querySelector('#calculated-top .right');
    const total = document.querySelector('#calculated-bottom .right');
    if(correctBill&&correctPeople&&correctTip){
        console.log(billInput.value);
        tipAmount.textContent = `$${(billInput.value*tipPercent*0.01/peopleInput.value).toFixed(2)}`;
        total.textContent = `$${((+billInput.value+billInput.value*tipPercent*0.01)/peopleInput.value).toFixed(2)}`;
    }
    else{
        tipAmount.textContent = "$0.00";
        total.textContent = "$0.00";
    }
}

handleReset();

reset.addEventListener('click', () => {
    handleReset();
    calculate();
});

billInput.addEventListener('input', () => {
    handleBill();
    calculate();
});
peopleInput.addEventListener('input', () => {
    handlePeople();
    calculate();
});

tipInputs.forEach((e) => {
    e.addEventListener('click', () =>{
        customInput.value='';
        handleCustom();
        handleTips(e);
        calculate();
    });
});

customInput.addEventListener('input', () => {
    if(prevTip!=null) resetTips(prevTip);
    handleCustom();
    calculate();
});

