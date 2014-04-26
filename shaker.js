// Generated by CoffeeScript 1.7.1
(function() {
  var Shaker;

  Shaker = (function() {
    function Shaker(opts) {
      this.amount = opts.amount, this.steps = opts.steps, this.className = opts.className, this.animationName = opts.animationName, this.direction = opts.direction, this.concave = opts.concave, this.multiplier = opts.multiplier, this.flat = opts.flat;
      this.multiplier || (this.multiplier = function(i, t) {
        return (t - i) / t;
      });
      this.makeRules();
      this.makeSheet();
    }

    Shaker.prototype.makeRules = function() {
      var d, i, o, rotate, str, translate, _i, _ref;
      if (this.direction === "horizontal") {
        this.translate = "translateX";
        this.rotate = "rotateY";
      } else if (this.direction === "vertical") {
        this.translate = "translateY";
        this.rotate = "rotateX";
      }
      str = "@keyframes " + this.animationName + " {\n";
      str += "0, 100% { " + this.translate + "(0), " + this.rotate + "(0) }\n";
      for (i = _i = 1, _ref = this.steps; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        str += "" + (i * 100 / this.steps) + "% {\n";
        if (i % 2 === 1) {
          o = -1;
        } else {
          o = 1;
        }
        if (this.direction === "vertical") {
          d = -1;
        } else {
          d = 1;
        }
        if (this.concave) {
          d = -1 * d;
        }
        rotate = this.flat ? 0 : this.multiplier(i, this.steps) * d * o * 90 * this.amount / 100 + "deg";
        translate = this.multiplier(i, this.steps) * o * this.amount + "%";
        str += "transform: " + this.translate + "(" + translate + ") " + this.rotate + "(" + rotate + ");\n}\n";
      }
      str += "}\n";
      this.keyframesRule = str;
      return this.classRule = "." + this.className + " { animation-name: " + this.animationName + " }";
    };

    Shaker.prototype.makeSheet = function() {
      this.stylesheet = document.createElement("style");
      this.stylesheet.innerHTML = "" + this.keyframesRule + "\n" + this.classRule;
      document.getElementsByTagName("head")[0].appendChild(this.stylesheet);
      return StyleFix.styleElement(this.stylesheet);
    };

    Shaker.prototype.destroySheet = function() {
      return document.getElementsByTagName("head")[0].removeChild(this.stylesheet);
    };

    Shaker.prototype.shake = (function() {
      var animEnd, animStart;
      animStart = "webkitAnimationStart oanimationstart msAnimationStart animationstart";
      animEnd = "webkitAnimationEnd oanimationend msAnimationEnd animationend";
      return function(el, opts, cb) {
        if (opts) {
          el.css(opts);
        }
        el.addClass(this.className);
        return el.one(animEnd, (function(_this) {
          return function() {
            var prop;
            el.removeClass(_this.className);
            if (opts) {
              for (prop in opts) {
                el.css(prop, "");
              }
            }
            if (cb) {
              return cb.bind(_this)(el);
            }
          };
        })(this));
      };
    })();

    return Shaker;

  })();

  $.fn.shakeWith = function(shaker, opts, cb) {
    var args;
    args = [].slice.call(arguments);
    args.shift();
    args.unshift($(this));
    return shaker.shake.apply(shaker, args);
  };

  this.Shaker = Shaker;

}).call(this);