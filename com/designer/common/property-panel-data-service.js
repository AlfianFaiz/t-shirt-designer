(function() {

    var module = angular.module('com.t-designer.property-panel-data-service', []);

    module.service('PropertyPanelDataService', function($q, $http) {

        var self = this;
        var propertyPanelData = null;

        self.loadPropertyPanelData = function() {

            var deferral = $q.defer();

            $http.get('data/property-panel.json')
                .then(function(response) {
                    propertyPanelData = response.data;
                    deferral.resolve(propertyPanelData);
                }, function myError(response) {
                    console.log(response);
                });

            return deferral.promise;
        };

    });

}());