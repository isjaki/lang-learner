exports.getMain = function(_, res) {
    res.render('main');
}

exports.getPageNotFound = function(_, res) {
    res.render('404');
}
