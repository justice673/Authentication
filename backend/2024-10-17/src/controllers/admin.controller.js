const welcome = (req, res) => {
    res.json({ message: 'Welcome to the Admin Panel' });
};

module.exports = { welcome };
