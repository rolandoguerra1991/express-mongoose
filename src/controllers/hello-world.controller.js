const helloWorld = (req, res) => {
  res.json({
    message: 'Hello World',
  });
};

module.exports = {
  helloWorld,
};
