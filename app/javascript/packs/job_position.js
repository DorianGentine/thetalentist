let form = document.getElementById('talent_jobs')
if (form) {
  const link = form.querySelector('.links')
  var deletedLinkTests = form.querySelectorAll('.deleted-job')
  deletedLinkTests[0].remove()
  const checkInputTest = form.querySelector('.divPositionJob').querySelector('.firstJob')
  const positionValueTest = form.querySelector('.divPositionJob').querySelector('.positionJob')

  if (deletedLinkTests[1]) {
    link.classList.add('hidden')
  }

  if (form.querySelectorAll('.deleted-job').length > 0) {
    hideBtnDelete(link, positionValueTest, checkInputTest, form)
  }
  hideBtnAdd(link, positionValueTest, checkInputTest, form)
  checkFirstPosition(form)
}


function hideBtnDelete(link, positionValueTest, checkInputTest, form){
  var deletedLinkTests = form.querySelectorAll('.deleted-job')
  var deletedLink = deletedLinkTests[deletedLinkTests.length - 1]
  deletedLink.addEventListener('click', function(){
    link.classList.remove('hidden')
    setTimeout(function(){
      let form = document.getElementById('talent_jobs')
      hideBtnAdd(link, positionValueTest, checkInputTest, form)
      if (positionValueTest.value != 1) {
        checkInputTest.click()
      }
      checkFirstPosition(form)
    }, 200)
  })
}

function hideBtnAdd(link, positionValueTest, checkInputTest, form){
  link.addEventListener('click', function(){
    link.classList.add('hidden')
    setTimeout(function(){
      let form = document.getElementById('talent_jobs')
      hideBtnDelete(link, positionValueTest, checkInputTest, form)
      if (checkInputTest.value != 1) {
        checkInputTest.click()
      }
      checkFirstPosition(form)
    }, 200)
  })
}



function checkFirstPosition(form){
  console.log(form.querySelectorAll('.divPositionJob').length)
  var positionSets = form.querySelectorAll('.divPositionJob')
  if (positionSets.length > 1) {
    positionSets.forEach((positionSet, index) => {
      if (index == 0) {var next_index = 1} else {var next_index = 0}
      let positionValue = positionSet.querySelector('.positionJob')
      let checkInput = positionSet.querySelector('.firstJob')

      let nextPositionValue = positionSets[next_index].querySelector('.positionJob')
      let nextCheckInput = positionSets[next_index].querySelector('.firstJob')

      switchChecked(positionValue, checkInput)

      checkInput.addEventListener('change', function(){
        if (checkInput.checked) {
          positionValue.value = 1
          nextPositionValue.value = 2
        } else {
          positionValue.value = 2
          nextPositionValue.value = 1
        }
        switchChecked(nextPositionValue, nextCheckInput)
      })
    })
  } else {
    var positionSets = form.querySelector('.divPositionJob')
    let positionValue = positionSets.querySelector('.positionJob')
    let checkInput = positionSets.querySelector('.firstJob')
    switchChecked(positionValue, checkInput)
    checkInput.addEventListener('change', function(){
      if (checkInput.checked) {
        positionValue.value = 1
      } else {
        positionValue.value = 2
      }
    })
  }
}

function switchChecked(inputValue, inputCheckBox){
 if (inputValue.value == 1) {
    inputCheckBox.checked = true
  } else {
    inputCheckBox.checked = false
  }
}

