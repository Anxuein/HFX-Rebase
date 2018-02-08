class Logger {
  error (...opts) {
    console.error(opts.join());
  }
};

module.exports = new Logger();
