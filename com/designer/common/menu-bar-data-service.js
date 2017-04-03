(function() {

    var module = angular.module('com.t-designer.menu-bar-data-service', []);

    module.service('MenuBarModal', function($q, $http) {

        var self = this;
        var menuDataCollection = null;

        self.getMenuData = function() {

            var deferral = $q.defer();

            if (menuDataCollection === null) {
                loadMenuData()
                    .then(function(response) {
                        menuDataCollection = response.data.elements;
                        deferral.resolve(menuDataCollection);

                    }, function myError(response) {
                        console.log(response.statusText);
                    });
            } else {
                deferral.resolve(menuDataCollection);
            }
            return deferral.promise;
        };

        function loadMenuData() {
            return $http.get('data/menu-data.json');
        };
    });

}());