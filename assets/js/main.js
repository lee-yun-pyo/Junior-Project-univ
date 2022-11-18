/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/js/likeBtn.js":
/*!************************************!*\
  !*** ./src/frontend/js/likeBtn.js ***!
  \************************************/
/***/ (() => {

eval("const likeBtn = document.getElementById(\"likeBtn\");\nconst icon = document.getElementById(\"likeBtnIcon\");\nconst likeNumber = document.getElementById(\"likeSpan\");\nconst postContainer = document.getElementById(\"postContainer\");\nconst loginSpan = document.getElementById(\"notLogin\");\n\nconst likeClick = () => {\n  const {\n    postid,\n    userid\n  } = postContainer.dataset;\n  let num = parseInt(likeNumber.innerText);\n\n  if (icon.classList.contains(\"fa-regular\")) {\n    if (userid === undefined) {\n      loginSpan.innerText = \"로그인 후 이용하세요\";\n    } else {\n      icon.classList.remove(\"fa-regular\");\n      icon.classList.add(\"fa-solid\");\n      likeNumber.innerText = ++num;\n      fetch(`/api/posts/${postid}/like`, {\n        method: \"POST\"\n      });\n    }\n  } else {\n    icon.classList.remove(\"fa-solid\");\n    icon.classList.add(\"fa-regular\");\n    likeNumber.innerText = --num;\n    fetch(`/api/posts/${postid}/unlike`, {\n      method: \"POST\"\n    });\n  }\n};\n\nlikeBtn.addEventListener(\"click\", likeClick);\n\n//# sourceURL=webpack://junior-project-univ/./src/frontend/js/likeBtn.js?");

/***/ }),

/***/ "./src/frontend/js/main.js":
/*!*********************************!*\
  !*** ./src/frontend/js/main.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./src/frontend/scss/styles.scss\");\n/* harmony import */ var _likeBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./likeBtn */ \"./src/frontend/js/likeBtn.js\");\n/* harmony import */ var _likeBtn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_likeBtn__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack://junior-project-univ/./src/frontend/js/main.js?");

/***/ }),

/***/ "./src/frontend/scss/styles.scss":
/*!***************************************!*\
  !*** ./src/frontend/scss/styles.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://junior-project-univ/./src/frontend/scss/styles.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/frontend/js/main.js");
/******/ 	
/******/ })()
;