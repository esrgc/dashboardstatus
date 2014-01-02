
var DashboardTester = require('../DashboardTester.js').DashboardTester

exports.index = function(req, res){
  DashboardTester.run(function(dashboards){
    res.render('index', {
      dashboards: dashboards
    })
  })
};