/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/js/gutenberg/blocks/cbsp_block/edit.js":
/*!***********************************************************!*\
  !*** ./assets/src/js/gutenberg/blocks/cbsp_block/edit.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _product_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product-layout */ "./assets/src/js/gutenberg/blocks/cbsp_block/product-layout.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var Edit = function Edit(props) {
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var columns = attributes.columns,
    rows = attributes.rows,
    showImage = attributes.showImage,
    showTitle = attributes.showTitle,
    showPrice = attributes.showPrice,
    showViewButton = attributes.showViewButton,
    products = attributes.products,
    isAutomatic = attributes.isAutomatic;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedProducts = _useState2[0],
    setSelectedProducts = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    availableProducts = _useState4[0],
    setAvailableProducts = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    searchTerm = _useState6[0],
    setSearchTerm = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showConfirmationModal = _useState8[0],
    setShowConfirmationModal = _useState8[1];

  // Fetch products based on the mode (TSLW or manual)
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fetchProducts = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var mode, response, productData, parsedProducts;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              mode = isAutomatic ? 'tslw' : 'manual'; // Conditional mode
              _context.next = 3;
              return fetch(cbspProductData.apiUrl + "products/?mode=".concat(mode), {
                method: 'GET',
                headers: {
                  'X-WP-Nonce': cbspProductData.nonce
                }
              });
            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();
            case 6:
              productData = _context.sent;
              parsedProducts = productData.map(function (product) {
                return {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  regular_price: product.regular_price,
                  sale_price: product.sale_price,
                  product_type: product.product_type,
                  image: product.image,
                  product_url: product.product_url
                };
              });
              setAvailableProducts(parsedProducts);
              if (isAutomatic) {
                setAttributes({
                  products: parsedProducts
                }); // Automatically set products if TSLW
              }
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function fetchProducts() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchProducts();
  }, [isAutomatic]);

  // Handle product selection through checkboxes (only when manual mode is active)
  var handleProductSelect = function handleProductSelect(product) {
    var isSelected = selectedProducts.some(function (selected) {
      return selected.id === product.id;
    });
    var updatedSelection = isSelected ? selectedProducts.filter(function (selected) {
      return selected.id !== product.id;
    }) : [].concat(_toConsumableArray(selectedProducts), [product]);
    setSelectedProducts(updatedSelection);
    setAttributes({
      products: updatedSelection.length > 0 ? updatedSelection : []
    }); // Set empty array if no products selected
  };

  // Validation based on rows and columns
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var totalSlots = columns * rows;
    if (selectedProducts.length > totalSlots) {
      setSelectedProducts(selectedProducts.slice(0, totalSlots));
    }
  }, [columns, rows, selectedProducts]);

  // Filter products based on search term
  var filteredProducts = availableProducts.filter(function (product) {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Toggle the automatic/manual mode with confirmation dialog (only if manual products are selected)
  var handleModeSwitch = function handleModeSwitch(value) {
    if (!isAutomatic && value && selectedProducts.length > 0) {
      // Show modal only if manual products are selected
      setShowConfirmationModal(true);
    } else {
      // Directly switch to automatic mode without showing the modal
      setAttributes({
        isAutomatic: value
      });
    }
  };
  var handleModalConfirm = function handleModalConfirm() {
    setAttributes({
      isAutomatic: true,
      products: []
    }); // Switch to automatic and clear selected products
    setSelectedProducts([]); // Clear selected products
    setShowConfirmationModal(false); // Close the modal
  };
  var handleModalCancel = function handleModalCancel() {
    setShowConfirmationModal(false); // Simply close the modal
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout', 'cbsp')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Columns', 'cbsp'),
    value: columns,
    onChange: function onChange(value) {
      return setAttributes({
        columns: value
      });
    },
    min: 1,
    max: 6
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Rows', 'cbsp'),
    value: rows,
    onChange: function onChange(value) {
      return setAttributes({
        rows: value
      });
    },
    min: 1,
    max: 6
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content Settings', 'cbsp')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Product Image', 'cbsp'),
    checked: showImage,
    onChange: function onChange(value) {
      return setAttributes({
        showImage: value
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Product Title', 'cbsp'),
    checked: showTitle,
    onChange: function onChange(value) {
      return setAttributes({
        showTitle: value
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Product Price', 'cbsp'),
    checked: showPrice,
    onChange: function onChange(value) {
      return setAttributes({
        showPrice: value
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show View Product Button', 'cbsp'),
    checked: showViewButton,
    onChange: function onChange(value) {
      return setAttributes({
        showViewButton: value
      });
    }
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Product Filters', 'cbsp')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Top Selling Products (Last Week)', 'cbsp'),
    checked: isAutomatic,
    onChange: handleModeSwitch // Call the mode switch function
  }), !isAutomatic && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    value: searchTerm,
    onChange: function onChange(value) {
      return setSearchTerm(value);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search by product name...', 'cbsp')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '200px',
      minWidth: '230px',
      overflowY: 'scroll',
      border: '1px solid #ccc',
      padding: '10px'
    }
  }, filteredProducts.map(function (product) {
    return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CheckboxControl, {
      key: product.id,
      label: product.name,
      checked: selectedProducts.some(function (selected) {
        return selected.id === product.id;
      }),
      onChange: function onChange() {
        return handleProductSelect(product);
      }
    });
  }))))), /*#__PURE__*/React.createElement(_product_layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    products: !isAutomatic && selectedProducts.length === 0 ? null : selectedProducts.length > 0 ? selectedProducts : products // Conditional rendering
    ,
    columns: columns,
    rows: rows,
    showImage: showImage,
    showTitle: showTitle,
    showPrice: showPrice,
    showViewButton: showViewButton,
    isManualMode: !isAutomatic // Pass manual mode flag to layout
  }), showConfirmationModal && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Confirm Mode Switch', 'cbsp'),
    onRequestClose: handleModalCancel
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('If you switch to automatic product fetch, your selected products will be cleared.', 'cbsp')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: handleModalConfirm
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('OK', 'cbsp')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    onClick: handleModalCancel
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Cancel', 'cbsp'))));
};
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "./assets/src/js/gutenberg/blocks/cbsp_block/index.js":
/*!************************************************************!*\
  !*** ./assets/src/js/gutenberg/blocks/cbsp_block/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./assets/src/js/gutenberg/blocks/cbsp_block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./assets/src/js/gutenberg/blocks/cbsp_block/save.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('cbsp-blocks/cbsp-grid-layout', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('CBSP', 'cbsp'),
  icon: 'products',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Choose Your Best Selling Products', 'cbsp'),
  category: 'wc-cbsp',
  attributes: {
    columns: {
      type: 'number',
      default: 3
    },
    rows: {
      type: 'number',
      default: 2
    },
    showImage: {
      type: 'boolean',
      default: true
    },
    showTitle: {
      type: 'boolean',
      default: true
    },
    showPrice: {
      type: 'boolean',
      default: true
    },
    showViewButton: {
      type: 'boolean',
      default: true
    },
    products: {
      type: 'array',
      default: []
    },
    isAutomatic: {
      type: 'boolean',
      default: true
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./assets/src/js/gutenberg/blocks/cbsp_block/product-layout.js":
/*!*********************************************************************!*\
  !*** ./assets/src/js/gutenberg/blocks/cbsp_block/product-layout.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

var ProductLayout = function ProductLayout(_ref) {
  var products = _ref.products,
    columns = _ref.columns,
    rows = _ref.rows,
    showImage = _ref.showImage,
    showTitle = _ref.showTitle,
    showPrice = _ref.showPrice,
    showViewButton = _ref.showViewButton,
    isManualMode = _ref.isManualMode;
  var isLoading = !products && !isManualMode; // No products and not manual mode
  var displayMessage = '';
  if (isLoading) {
    displayMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading Products...', 'cbsp');
  } else if (!products && isManualMode) {
    // Manual mode and no products selected
    displayMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select your top selling products.', 'cbsp');
  } else if (products && products.length === 0 && !isManualMode) {
    displayMessage = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No top selling products available from last week. Add your products manually.', 'cbsp');
  }
  var productsToDisplay = products ? products.slice(0, Math.min(products.length, columns * rows)) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "container cbsp-container"
  }, displayMessage ? /*#__PURE__*/React.createElement("p", null, displayMessage) : Array.from({
    length: rows
  }).map(function (_, rowIndex) {
    return /*#__PURE__*/React.createElement("div", {
      className: "row cbsp-grid-layout-row",
      key: rowIndex
    }, productsToDisplay.slice(rowIndex * columns, rowIndex * columns + columns).map(function (product, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "col-".concat(Math.floor(12 / columns))
      }, /*#__PURE__*/React.createElement("div", {
        className: "cbsp-product-column"
      }, showImage && /*#__PURE__*/React.createElement("img", {
        className: "cbsp-product-img",
        src: product.image,
        alt: product.name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Product Image', 'cbsp')
      }), showTitle && /*#__PURE__*/React.createElement("p", {
        className: "cbsp-product-title"
      }, product.name), showPrice && /*#__PURE__*/React.createElement("p", {
        className: "cbsp-price"
      }, product.product_type === 'on_sale' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "cbsp-regular-price"
      }, /*#__PURE__*/React.createElement("del", null, product.regular_price)), ' ', /*#__PURE__*/React.createElement("span", {
        className: "cbsp-sale-price"
      }, /*#__PURE__*/React.createElement("ins", null, product.sale_price))) : product.product_type === 'variable' ? /*#__PURE__*/React.createElement("span", {
        className: "cbsp-variable-price"
      }, product.price) : /*#__PURE__*/React.createElement("span", {
        className: "cbsp-simple-price"
      }, product.price)), showViewButton && /*#__PURE__*/React.createElement("a", {
        href: product.product_url
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-primary cbsp-btn"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('View Product', 'cbsp')))));
    }));
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (ProductLayout);

/***/ }),

/***/ "./assets/src/js/gutenberg/blocks/cbsp_block/save.js":
/*!***********************************************************!*\
  !*** ./assets/src/js/gutenberg/blocks/cbsp_block/save.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _product_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-layout */ "./assets/src/js/gutenberg/blocks/cbsp_block/product-layout.js");


var Save = function Save(props) {
  var attributes = props.attributes;
  var products = attributes.products,
    columns = attributes.columns,
    rows = attributes.rows,
    showImage = attributes.showImage,
    showTitle = attributes.showTitle,
    showPrice = attributes.showPrice,
    showViewButton = attributes.showViewButton,
    isAutomatic = attributes.isAutomatic;

  // Determine the message based on the mode and whether there are products
  var message = '';
  if (isAutomatic && products.length === 0) {
    message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No weekly products available. Would recommend you to include products manually.', 'cbsp');
  } else if (!isAutomatic && products.length === 0) {
    message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please select your products manually.', 'cbsp');
  }
  return /*#__PURE__*/React.createElement(_product_layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    products: products,
    columns: columns,
    rows: rows,
    showImage: showImage,
    showTitle: showTitle,
    showPrice: showPrice,
    showViewButton: showViewButton,
    message: message
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Save);

/***/ }),

/***/ "./assets/src/img/cbsp-products.png":
/*!******************************************!*\
  !*** ./assets/src/img/cbsp-products.png ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("../../img/cbsp-products.png");

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./assets/src/js/blocks.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gutenberg_blocks_cbsp_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gutenberg/blocks/cbsp_block */ "./assets/src/js/gutenberg/blocks/cbsp_block/index.js");
/* harmony import */ var _img_cbsp_products_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/cbsp-products.png */ "./assets/src/img/cbsp-products.png");


//Images.

/******/ })()
;
//# sourceMappingURL=blocks.js.map