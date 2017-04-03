(function() {
    
    var app = angular.module('powerScreenApp', [
        'ui.bootstrap', 
        'ui.router',
        'ui.bootstrap.materialPicker',
        'ui-rangeSlider',
        'com.t-designer.home',          
        'com.t-designer.about'                     
    ]);
    
    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            
            .state('/', {
                url: '/',                
                templateUrl: 'com/home/home.html'
            })
            
            .state('design', {
                url: '/design',
                templateUrl: 'com/design/design.html',
                controller: 'HomeCtrl as homeCtrl'
            })
            
            .state('about', {
                url: '/about/:productId',
                templateUrl: 'com/about/partial-about.html',
                controller: 'AboutCtrl as aboutCtrl'
            });

    })
    
}());