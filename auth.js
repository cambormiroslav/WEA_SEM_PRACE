module.exports = {

    /*
    * Pokud neni v session userId uživatel je přesměrován na přihlašovací formulář
    */
    requiresLogin: function (req, res, next) {
      console.log("COOKIES", req.cookies);
      if (req.cookies && req.cookies.authorized) {
        return next();
      } else {
        return res.redirect('/');
      }
    }
}