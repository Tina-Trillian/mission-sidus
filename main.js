$( document ).ready(function() {
    console.log( "Hello, world" );





    var audio = new Audio('./assets/Chad Crouch - Algorithms.mp3');
    audio.loop = true;
    audio.volume = 0.15;
    var clickSound = new Audio('./assets/mixkit-select-click-1109.wav');
    clickSound.volume = 0.5;


    var questions = [
      {
        question: 'Log entry 20210411 Landing on Georgium Sidus was successful. However, you have lost your space suit glove. Go find it. ($counter)',
        ids: [
          {id: 'glove1', colorClass: 'blue'},
        ]
      },
      {
        question: 'You are fully equipped. Study the extraterrestrial flora. Gather all the tulip-shaped flowers. ($counter)',
        ids: [
          {id: 'flower1', colorClass: 'red'},
          {id: 'flower2', colorClass: 'red'},
          {id: 'flower3', colorClass: 'red'},
          {id: 'flower4', colorClass: 'red'},
          {id: 'flower5', colorClass: 'red'}
        ]
      },
      {

        question: 'Life always finds a way. Do you see any coleopterans? Space bugs, go pick up space bugs! ($counter)',
        ids: [
          {id: 'bug1', colorClass: 'green'},
          {id: 'bug2', colorClass: 'green'},
          {id: 'bug3', colorClass: 'green'},
          {id: 'bug4', colorClass: 'green'},
          {id: 'bug5', colorClass: 'green'},
          {id: 'bug6', colorClass: 'green'},
          {id: 'bug7', colorClass: 'green'},
          {id: 'bug8', colorClass: 'green'},
          {id: 'bug9', colorClass: 'green'}
        ]
      },
      
     
      {
        question: "It seems that humans have set foot on this planet before... strange. Which items are proof of mankind's first attempts of space travel? ($counter)",
        ids: [
          {id: 'voyager', colorClass: 'yellow'},
          {id: 'man-on-the-moon', colorClass: 'clicked'}
        ]
      },
      {
        question: 'Intruder alert - security protocol activated. Report and examine alien trespasser. Quickly! ($counter)',
        ids: [
          {id: 'tentakel', colorClass: 'clicked'},
        ]
      }
    ]

    var selectedIndex = 0;
    var counter = 0;

    // var stopClickListener = function() {
    //   console.lo
    //   $('body').off("click")
    // }



    // var startClickListener = function() {
    //   $('body').click(function() {
    //     console.log("Clicked")
    //     audio.play();
    //   })
    //   // stopClickListener();
    // }

    var startQuestions = function() {
      var missionText = getMissionText()
      $('#question').text(missionText)
      $('#mission-count').text('(' + (selectedIndex + 1) + '/' + questions.length + ')')
      setClickEventOnElements(questions[selectedIndex].ids);
    }

    var startListenerOnOffButton = function() {
      $('#sound-off-btn').click(function() {
        $(this).addClass('display-none');
        $('#sound-on-btn').removeClass('display-none')
        audio.play()
      })
    }

    var startListenerOnOnButton = function() {
      $('#sound-on-btn').click(function() {
        $(this).addClass('display-none');
        $('#sound-off-btn').removeClass('display-none')
        audio.pause();
      })
    }

    var startSoundListener =  function() {
      startListenerOnOffButton();
      startListenerOnOnButton();
    }



    var setCurrentQuestion = function() {
      counter = 0;
      updateQuestionAndCounter();
      setClickEventOnElements(questions[selectedIndex].ids);
    }

    var updateQuestionAndCounter = function() {
      var missionText = getMissionText();
      $('#question').fadeOut(500, function() {
        $(this).text(missionText).fadeIn(500);
    });
    }

    var updateMissionCounter = function() {
      $('#mission-count').fadeOut(500, function() {
        $(this).text('(' + (selectedIndex + 1) + '/' + questions.length + ')').fadeIn(500);
    });
    }

    var getMissionText = function() {
      var clickCounter = questions[selectedIndex].ids.length - counter
      return questions[selectedIndex].question.replace('$counter', clickCounter)
    }

    var moveToNextQuestion = function() {
      selectedIndex += 1;
      setCurrentQuestion();
      updateMissionCounter();
    }

    var setClickEventOnElements = function(idArray) {
      for (let index = 0; index < idArray.length; index++) {
        setChangeColor(idArray[index])
      }
    }

    var setChangeColor = function(idElement) {
      $('#' + idElement.id).click(function() {
        console.log("Clicked")
        $(this).addClass(idElement.colorClass);
        clickSound.play();
        $(this).off('click')
        counter += 1
        updateQuestionAndCounter()
        checkIfAllElementsWereClicked();
      })
    }

    var checkIfAllElementsWereClicked = function() {
      if (questions[selectedIndex].ids.length === counter) {
        console.log("Finshed Question");
        setTimeout(function() {
          if (selectedIndex === questions.length - 1) {
            finishGame()
          } else {
            moveToNextQuestion();
          }
        }, 1000)
       
      }
    }

    var generateRandomNumber = function(number) {
      return Math.floor(Math.random() * number) + 1;
    }


   var finishGame = function() {
    console.log("Finished Game")
    $('#question').fadeOut(500, function() {
      $(this).text('Mission accomplished. Congratulations, you are a true space pioneer. TSgt. T. Reuther & Spc4 B. Voss').fadeIn(500);
      $('path#screen-path').addClass('default-fill')
      $('#screen_aussen, #tentakel, #Wimmelbild').addClass('game-won')
      
    // $('#screen_aussen path').each(function() {
    //   var index = generateRandomNumber(3)
    //   console.log(index)
    //   $(this).addClass('default-' + index)
    // })

  
  });
  
   }


    // Runtime
    startQuestions();
    startSoundListener();
    // startClickListener();



});