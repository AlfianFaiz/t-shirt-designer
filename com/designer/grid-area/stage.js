(function() {

    var module = angular.module('com.t-designer.grid-area', ['com.t-designer.property-service',
        'com.t-designer.stage-service',
        'com.t-designer.component-manager-service'
    ]);

    module.directive('stage', function() {
        
        return {

            restrict: 'EA',
            replace: true,
            templateUrl: "com/designer/grid-area/stage.tmpl.html",
            link: function(scope, element, attrs) {

            },

            controller: function($scope, $rootScope, $timeout, PropertyModel, StageModel, ComponentManagerModel,ComponentDataModel) {
                
                
                
                
                ComponentManagerModel.setStageScope($scope);
                
                $("#container").droppable({
                    tolerance: 'pointer',
                    accept: '.product,.draggable',
                    drop: function(event, ui) {

                        StageModel.setStageCanvas($(this));

                        var newComponent = $(ui.helper).clone();

                        $(this).removeClass('target');

                        ComponentManagerModel.initComponent($(newComponent), $scope);
                    }
                                        
                });
                
                $scope.stageClickHandler = function(event) {
                    event.stopPropagation();
                    
                    ComponentManagerModel.resetAllSelectedComponents();
                    
                    PropertyModel.showStageProperties();
                    ComponentManagerModel.setSelectedComponent(null);
                   
                    StageModel.isStageSelected = true;
                                        
                    if(StageModel.getStageDataSource() == 'none'){
                        
                        $rootScope.$broadcast(ComponentDataModel.UPDATE_DATA_SOURCE_MAP, 'stage', true);
                        
                    }else{
                        
                        $rootScope.$broadcast(ComponentDataModel.UPDATE_DATA_SOURCE_MAP, StageModel.getStageDataSource(), true);
                    }
                    
                    
                };

            }
        }
    });

}());