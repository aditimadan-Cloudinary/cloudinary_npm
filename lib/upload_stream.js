(function() {
  var UploadStream, stream, util;

  stream = require("stream");

  util = require("util");

  UploadStream = function(options) {
    this.boundary = options.boundary;
    stream.Transform.call(this, options);
  };

  util.inherits(UploadStream, stream.Transform);

  UploadStream.prototype._transform = function(data, encoding, next) {
    var buffer;
    buffer = ((Buffer.isBuffer(data)) ? data : new Buffer(data, encoding));
    this.push(buffer);
    next();
  };

  UploadStream.prototype._flush = function(next) {
    this.push(new Buffer("\r\n", 'ascii'));
    this.push(new Buffer("--" + this.boundary + "--", 'ascii'));
    return next();
  };

  module.exports = UploadStream;

}).call(this);

//# sourceMappingURL=upload_stream.js.map
