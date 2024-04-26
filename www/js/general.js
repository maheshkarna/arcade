app.log = function (msg) {
  console.log(msg);
};

app.executeFunction = function (func, a, b, c, d, e) {
  if (typeof func == "function") {
    func(a, b, c, d, e);
  }
};

String.format = String.prototype.format = function () {
  var i = 0,
    l = 0;
  var string = typeof this == "function" && !i++ ? arguments[0] : this;
  while (i < arguments.length) {
    string = string.replaceAll("{" + l + "}", arguments[i]);
    i++;
    l++;
  }
  return string;
};
