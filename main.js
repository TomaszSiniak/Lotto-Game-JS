document.addEventListener('DOMContentLoaded', () => {

    // variables
    const balls = document.querySelector('.balls');
    const drawBtn = document.querySelector('.btn-draw');
    const drawNumbers = document.querySelector('.draw-numbers');
    const myNumbers = document.querySelector('.my-numbers');
    const restartGameBtn = document.querySelector('.restart-btn');
    const checkBtn= document.querySelector('.btn-check');
    const overlay = document.querySelector('.overlay');
    let winnerNumbers = [];
    let drawNumbersArray = [];
    let chosenNumbersArray = [];



    // create  all static balls
    function createBoardBall(){
        for( i = 1; i < 50; i++){
            const ball = document.createElement('span');
            ball.classList.add('ball');
            ball.innerHTML = i;
            balls.appendChild(ball);
        }
    }

    // function to abdle / disable check winner buttton
    function ableBtnCheck(){

        drawNumbersArray.length === 6  && chosenNumbersArray.length === 6? checkBtn.disabled = false : checkBtn.disabled = true;

    }

    // CHECK Winings

    function checkWinings (){
        // variables
        const matchedNumbers = document.querySelector('.matched-numbers');
        let winnerNumbers = chosenNumbersArray.filter(item => drawNumbersArray.includes(item));
        const info = document.querySelector('.winner-box .info');

            // create ball look to hitted numbers after comparison two arrays
            for(let i = 0; i < winnerNumbers.length; i++){
                const ball = document.createElement('span');
                ball.classList.add('ball');
                ball.innerHTML = winnerNumbers[i];
                ball.classList.add('is-active');
                matchedNumbers.appendChild(ball);    
            }
        
        // add class to visible information after draw
        overlay.classList.toggle('overlay-show');

        // check array length and add proper infromation to user how many numbers he hit
        switch(winnerNumbers.length){
            case 0:
                return info.textContent = "Ivoncia nic nie trafiłaś, weż idź zrób obiad małpo :)";
                break;
            case 1:
                return info.textContent = "Ivoncia ja Cię Bitte, tylko jedna liczba... jestem głodny, zrób obiad świnko :)";
                break;
            case 2:
                return info.textContent = "uuuuuuu są już 2 trafione, kwi kwi kwi";
                break;
            case 3:
                return info.textContent = "Trzy trafine liczby!!! Gratulacje";
                break;
            case 4:
                return info.textContent = "Cztery trafine liczby!!! Gratulacje";
                break;
            case 5:
                return info.textContent = "Pięć trafionych liczb!!! Gratulacje";
                break;
            case 6:
                return info.textContent = "Sześć trafionych liczb!!! Gratulacje";
                break;
        }       
    }


    //DRAW FUNCTION

    function draw(){
        // get radom number in scopr 1-49
        const randomNumber = Math.floor(Math.random() * 48 + 1);

        // stop function when array has 6 numbers
        if( drawNumbersArray.length === 6) return;
       
        //if drawded number is the same start recall a function again
        for(let i=0; i<drawNumbersArray.length; i++){
            if(randomNumber === drawNumbersArray[i]){
                return draw();
            }
        }

        // create ball and add to parent
        const ball = document.createElement('span');
        ball.classList.add('ball');
        ball.innerHTML = randomNumber;
        ball.classList.add('is-active');
        drawNumbers.appendChild(ball);

        // push drawded number to proper array
        drawNumbersArray.push(randomNumber);

        // check condition to able/ disable check button
        ableBtnCheck();
    }



    // pick Balls

    function pickBall(e){
        // after click we get number and convert from string to int
        const number = parseInt(e.target.textContent);

        // check clicked element has proper class and array i shorter than necessary length
        if(e.target.classList.contains('ball') && chosenNumbersArray.length < 6){
            // we checked target number all itterate element in array is not equal to previous number in array. 
            // no option to push same numbers
            for(let i = 0; i < chosenNumbersArray.length; i++){
                if(number === chosenNumbersArray[i]){
                    return pickBall(e);
                }
            }


            // create elemement with propper class and add to parent
            const ball = document.createElement('span');
            ball.classList.add('ball');
            ball.classList.add('is-active');
            ball.innerHTML = number;
            myNumbers.appendChild(ball);
         
            chosenNumbersArray.push(number);
        }
        // check condition to able/ disable check button
        ableBtnCheck();
    }

    // restart game
    function restartGame(){
        //reload whole page
        location.reload();

    }
  


    // init game 
    function startGame(){
        createBoardBall();
        checkBtn.addEventListener('click', checkWinings);
        drawBtn.addEventListener('click', draw);
        balls.addEventListener('click', pickBall);
        restartGameBtn.addEventListener('click', restartGame);
    }

    startGame();

})



