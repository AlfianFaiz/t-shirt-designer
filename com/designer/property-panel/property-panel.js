(function() {

    var module = angular.module('com.t-designer.property-panel', ['com.t-designer.property-service',
        'com.t-designer.component-manager-service',
        'com.t-designer.component-service',
        'com.t-designer.property-panel-data-service'
    ]);

    module.directive('propertyPanel', function() {
        return {
            restrict: 'AE',
            replace: true,
            
            templateUrl: "com/designer/property-panel/property-panel.tmpl.html",
            
            controller: function($scope, $rootScope, $timeout, PropertyModel, StageModel, ComponentManagerModel, PropertyPanelDataService, ComponentDataModel, DesignModel) {
                
                $scope.$on(ComponentManagerModel.COMPONENT_CREATED, function(event, paramObj) {
                   
                    $timeout(function() {
                        
                        $scope.updateComponentProperty($scope.componentObj().fontSize, 'font-size');
                        $scope.updateComponentProperty($scope.componentObj().letterSpacing, 'letter-spacing');
                        
                    }, 10);
                    
                });
                
                $scope.selectedFont = "";
                
                $scope.checkStageClicked = PropertyModel.checkStageClicked;
                
                PropertyPanelDataService.loadPropertyPanelData()
                    .then(function(result) {
                        
                        console.log("result.filters  "+result);
                        
                        PropertyModel.setFonts(result.fonts);
                        PropertyModel.setFilters(result.filters);
                        
                        console.log("result.filters  "+result.filters);
                        
                        $scope.selectedFont = result.fonts[0].name;
                });

                $scope.componentObj = ComponentDataModel.getSelectedComponentObject;
                $scope.getStageWindowObject = StageModel.getStageWindowObject;
                $scope.getDefaultStageDimension = StageModel.getDefaultStageDimension;
                $scope.getFonts = PropertyModel.getFonts;
                
                //-----------------------------------------------------------//
                
                var $timeoutID = 0;
                $scope.updateComponentProperty = function(propValue, propName) {
                    $timeout.cancel($timeout);
                    $timeout(function() {
                        
                        ComponentManagerModel.updateComponentProperty(propValue, propName);
                        
                    }, 100);
                };

                $scope.updateStageProperty = function(propValue, propName) {

                    $timeout.cancel($timeout);
                    $timeout(function() {
                        StageModel.updateStageProperty(propValue, propName);
                    }, 100);
                };
                
                $scope.isItImageComponent = function() {
                    return (['img'].indexOf(ComponentManagerModel.getSelectedComponentType()) > -1)
                            && !$scope.checkStageClicked();
                };
                
                $scope.isItTextComponent = function() {
                    return (['label'].indexOf(ComponentManagerModel.getSelectedComponentType()) > -1)
                            && !$scope.checkStageClicked();
                };
                
                $scope.fontSize = function(type) {
                    (type == "+") ? $scope.componentObj().fontSize++ : $scope.componentObj().fontSize--;
                    $scope.updateComponentProperty($scope.componentObj().fontSize, 'font-size');
                };
                
                $scope.letterSpacing = function(type) {
                    (type == "+") ? $scope.componentObj().letterSpacing++ : $scope.componentObj().letterSpacing--;
                    $scope.updateComponentProperty($scope.componentObj().letterSpacing, 'letter-spacing');
                };
                
                $scope.changeFont = function(fontName) {
                    console.log("fontName   "+fontName);
                     var selectedFont = PropertyModel.getSelectedFontInfo(fontName);
                     $scope.componentObj().fontFamily = selectedFont.name;
                     
                    if(selectedFont.css_path != "-1") {
                        PropertyModel.loadFontCSS(selectedFont.css_path);     
                     }
                     
                     $scope.updateComponentProperty($scope.componentObj().fontFamily, 'font-family');
                };
                
            }
        }
    });
    
    module.directive('positionAndSizeManager', function() {
        return {
            restrict: 'AE',
            replace: true,
            
            templateUrl: "com/designer/property-panel/dimension-tmpl.html",
            
            controller: function($scope) {
                
            }
        }
    });

    module.directive('textComponentManager', function() {
        return {
            restrict: 'AE',
            replace: true,
            
            templateUrl: "com/designer/property-panel/text-component.tmpl.html",
            
            controller: function($scope) {
                $scope.color = '#263238';
                $scope.hoverColor = null;
                $scope.size = 12;
            }
        }
    });
    
    module.directive('imageComponentManager', function(ComponentManagerModel, PropertyModel) {
        return {
            restrict: 'AE',
            replace: true,
            
            templateUrl: "com/designer/property-panel/image-component.tmpl.html",
            
            controller: function($scope, $timeout) {
                
                $scope.getFilters = PropertyModel.getFilters;
                
                $scope.applyFilers = function(name, value, isApply) {
                    
                    var filters = "";
                    angular.forEach($scope.getFilters(), function(filter) {
                        if(filter.select) {
                            filters += " "+filter.name+"("+ (filter.defaultValue/filter.divide)+filter.unit + ")";
                        }
                    });                    
                    ComponentManagerModel.applyFilers(name, filters); 
                };
                
                $scope.onSliderHandleUp = function(filter) {
                    console.log("onSliderHandleUp");
                    $timeout(function(){
                        filter.sliderVisible = false;
                    }, 1000);
                };

            }
        }
    });
    
    module.directive('stageDimensionManager', function() {
        return {
            restrict: 'AE',
            replace: true,
            
            templateUrl: "com/designer/property-panel/stage-dimension.tmpl.html",
            
            controller: function($scope) {
                
            }
        }
    });    
    
    
    
}());
