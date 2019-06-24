/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

/***/ 34:
/*!**********************************************!*\
  !*** ./app/javascript/packs/job_position.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var form = document.getElementById('talent_jobs');
if (form) {
  var link = form.querySelector('.links');
  var deletedLinkTests = form.querySelectorAll('.deleted-job');
  deletedLinkTests[0].remove();
  var checkInputTest = form.querySelector('.divPositionJob').querySelector('.firstJob');
  var positionValueTest = form.querySelector('.divPositionJob').querySelector('.positionJob');

  if (deletedLinkTests[1]) {
    link.classList.add('hidden');
  }

  if (form.querySelectorAll('.deleted-job').length > 0) {
    hideBtnDelete(link, positionValueTest, checkInputTest, form);
  }
  hideBtnAdd(link, positionValueTest, checkInputTest, form);
  checkFirstPosition(form);
}

function hideBtnDelete(link, positionValueTest, checkInputTest, form) {
  var deletedLinkTests = form.querySelectorAll('.deleted-job');
  var deletedLink = deletedLinkTests[deletedLinkTests.length - 1];
  deletedLink.addEventListener('click', function () {
    link.classList.remove('hidden');
    setTimeout(function () {
      var form = document.getElementById('talent_jobs');
      hideBtnAdd(link, positionValueTest, checkInputTest, form);
      if (positionValueTest.value != 1) {
        checkInputTest.click();
      }
      checkFirstPosition(form);
    }, 200);
  });
}

function hideBtnAdd(link, positionValueTest, checkInputTest, form) {
  link.addEventListener('click', function () {
    link.classList.add('hidden');
    setTimeout(function () {
      var form = document.getElementById('talent_jobs');
      hideBtnDelete(link, positionValueTest, checkInputTest, form);
      if (checkInputTest.value != 1) {
        checkInputTest.click();
      }
      checkFirstPosition(form);
    }, 200);
  });
}

function checkFirstPosition(form) {
  console.log(form.querySelectorAll('.divPositionJob').length);
  var positionSets = form.querySelectorAll('.divPositionJob');
  if (positionSets.length > 1) {
    positionSets.forEach(function (positionSet, index) {
      if (index == 0) {
        var next_index = 1;
      } else {
        var next_index = 0;
      }
      var positionValue = positionSet.querySelector('.positionJob');
      var checkInput = positionSet.querySelector('.firstJob');

      var nextPositionValue = positionSets[next_index].querySelector('.positionJob');
      var nextCheckInput = positionSets[next_index].querySelector('.firstJob');

      switchChecked(positionValue, checkInput);

      checkInput.addEventListener('change', function () {
        if (checkInput.checked) {
          positionValue.value = 1;
          nextPositionValue.value = 2;
        } else {
          positionValue.value = 2;
          nextPositionValue.value = 1;
        }
        switchChecked(nextPositionValue, nextCheckInput);
      });
    });
  } else {
    var positionSets = form.querySelector('.divPositionJob');
    var positionValue = positionSets.querySelector('.positionJob');
    var checkInput = positionSets.querySelector('.firstJob');
    switchChecked(positionValue, checkInput);
    checkInput.addEventListener('change', function () {
      if (checkInput.checked) {
        positionValue.value = 1;
      } else {
        positionValue.value = 2;
      }
    });
  }
}

function switchChecked(inputValue, inputCheckBox) {
  if (inputValue.value == 1) {
    inputCheckBox.checked = true;
  } else {
    inputCheckBox.checked = false;
  }
}

/***/ })

/******/ });
//# sourceMappingURL=job_position-592ca672f34edf41242d.js.map