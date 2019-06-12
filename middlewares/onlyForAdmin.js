const onlyForAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next({
      status: 403,
      message: "Forbidden"
    });
  }

  next();
};

module.exports = onlyForAdmin;
