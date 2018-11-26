let admin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.send("You are not allow");
    };

    next();
}

module.exports = {
    admin
}