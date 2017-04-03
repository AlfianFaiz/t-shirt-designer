(function() {
    var module = angular.module('com.t-designer.menu-bar', ['com.t-designer.component-service']);

    module.directive('menuBar', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                menuList: "="
            },
            templateUrl: 'com/designer/menu-bar/menu-bar.tmpl.html',
            
            controller: function($scope, $http, $timeout, ComponentDataModel, ComponentManagerModel) {
                
                $scope.updateRadioChoices = function(field, choice) {
                    
                    angular.forEach(field.choices, function(i, val) {
                        if (val.id != choice.id) val.selected = false;
                    });

                };
                
                $scope.getComponentSelectedStatus = function () {
                 return (ComponentManagerModel.getSelectedComponent() == null);   
                };
                
                $scope.deleteSelectedControl = function() {
                    ComponentManagerModel.openDeleteConformPopup();
                };
                
                $timeout(function() {
                    
                    $(".draggable").draggable({
                        helper: 'clone',
                        cursor: 'hand',
                        cancel: null,
                        zIndex: 100,
                        appendTo: "#container"
                    });

                    $(".product").draggable({
                        helper: 'clone',
                        cursor: 'hand',
                        zIndex: 100
                    });
                    
                    /*
                    
                    $(document).ready(function(){
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                    
                    $('[data-toggle="tooltip"]').tooltip();
                    
                    */
                    
                }, 1000);

            }
        }
    });

}());