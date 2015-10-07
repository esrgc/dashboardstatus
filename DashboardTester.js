var request = require('request'),
  async = require('async')

var DashboardTester = {}

DashboardTester.dashboards = [{
    'name': 'BayStat Causes (Socrata)',
    'url': 'http://apps.esrgc.org/dashboards/baystat/causes.html',
    'api': 'https://data.maryland.gov/resource/rsrj-4w3t.json'
  }, {
    'name': 'BayStat Solutions (Socrata)',
    'url': 'http://apps.esrgc.org/dashboards/baystat/solutions.html',
    'api': 'https://data.maryland.gov/resource/4zqs-i2t2.json'
  }, {
    'name': 'Caroline DES',
    'url': 'http://apps.esrgc.org/dashboards/carolinedes/',
    'api': 'http://apps.esrgc.org/dashboards/carolinedes/api/allcalls?filters%5B0%5D%5Btype%5D=limit&filters%5B0%5D%5Bvalue%5D=10&filters%5B0%5D%5Bactive%5D=true&filters%5B0%5D%5Bconstant%5D=true&filters%5B1%5D%5Btype%5D=offset&filters%5B1%5D%5Bvalue%5D=0&filters%5B1%5D%5Bactive%5D=true&filters%5B1%5D%5Bconstant%5D=true'
  }, {
    'name': 'DLLR Dashboard',
    'url': 'http://www.esrgc.org/dashboards/dllr',
    'api': 'http://www.esrgc.org/dashboards/dllr/api/Work/JobsByRegion?areatype=01&areacode=000000'
  }, {
    'name': 'DBED Data Explorer (Socrata)',
    'url': 'http://apps.esrgc.org/dashboards/countycomparison',
    'api': 'http://apps.esrgc.org/dashboards/countycomparison/api/stats?criteria_codes%5B%5D=13417934&compare=counties'
  }, {
    'name': 'DHCD Dashboard (Socrata)',
    'url': 'http://apps.esrgc.org/dashboards/dhcd/dashboard',
    'api': 'https://data.maryland.gov/resource/7gad-cuav.json'
  }, {
    'name': 'MEA Dashboard',
    'url': 'http://apps.esrgc.org/dashboards/smartenergy/',
    'api': 'http://apps.esrgc.org/dashboards/smartenergy/api/getPoints?tab=renewable&geotype=county'
  }, {
    'name': 'Oklahoma Dashboard',
    'url': 'http://esrgc.org/dashboards/okdashboard/home/index',
    'api': 'http://www.esrgc.org/dashboards/okdashboard/training/charts/2'
  }, {
    'name': 'Shore Transit Dashboard',
    'url': 'http://apps.esrgc.org/dashboards/shoretransit',
    'api': 'http://apps.esrgc.org/dashboards/shoretransit/api/getRoutes'
  }
]

DashboardTester.test = function(dashboard, callback) {
  var start = new Date().getTime(),
    responseTime = 0,
    responseType = null

  request(dashboard.api, function(error, response, body) {
    var end = new Date().getTime()
    responseTime = end - start
    if (!error && response.statusCode == 200) {
      responseType = 'success'
    } else {
      responseType = 'fail'
    }
    dashboard.responseType = responseType
    dashboard.responseTime = responseTime
    dashboard.statusCode = response.statusCode
    callback(null, dashboard)
  })
}

DashboardTester.run = function(next) {
  async.map(this.dashboards, this.test, function(err, results) {
    next(results)
  })
}

exports.DashboardTester = DashboardTester
