
(function() {

    var module = angular.module('com.t-designer.popup-manager-service', []);

    module.service('PopupManagerService', function($modal) {

        var self = this;
        var propertyPanelData = null;
        
        self.openPopup = function() {
            
            var data = {};

            var modalInstanceMsg = $modal.open({
                    templateUrl: "com/designer/common/common-popup.tmpl.html",
                    controller: 'TableEditorDialogController',
                    resolve: {
                        response: function() {
                            return data;
                        }
                    }
                });
        };

    });
    
    module.controller('DataMapValidationDialogController', function($scope, $modalInstance) {
        
        $scope.infoObj = {};
        $scope.infoObj.massage = "";
        
        $scope.okHandler = function () {
            $modalInstance.close();
        };

        $scope.cancelHandler = function () {
             $modalInstance.close();
        };
        
    });

}());