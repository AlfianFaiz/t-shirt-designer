(function () {
    
    var module = angular.module('com.t-designer.about', ['com.t-designer.menu-bar',
        'com.t-designer.menu-bar-data-service',
        'com.t-designer.grid-area',
        'com.t-designer.property-panel']);  
    
    module.controller('AboutCtrl', function HomeCtrl($scope, $stateParams, $modal, StageModel, MenuBarModal, PropertyModel, ComponentDataModel, ComponentManagerModel, DesignSeletionModel, DesignModel, AppModel) {
        
        var isRotateActive = false;
        AppModel.isDesignerSection = true;
        $scope.designModel = DesignModel;
        $scope.selectedColor = DesignSeletionModel.getSelectedColorInfoById($stateParams['productId']);
        
        $scope.getColorHex = DesignModel.getColorHex;
        
        $scope.propertyModel = PropertyModel;
        
        $scope.menuDataCollection = [];
        
        MenuBarModal.getMenuData().then(function(result) {
            $scope.menuDataCollection = result;
        });
        
        $scope.togglePrintArea = function() {
            isRotateActive = !isRotateActive;
            
            if(isRotateActive){
                DesignModel.setMaskSource("B"); 
                DesignModel.setTextureSource("B");
            }else {
                DesignModel.setMaskSource("F"); 
                DesignModel.setTextureSource("F");
            }
            
        };
        
        $scope.rotateIsActive = function() {
            return isRotateActive;
        };
        
        $scope.deleteSelectedControl = function() {
            ComponentManagerModel.openDeleteConformPopup();
        };
        
        //width: 1154.41px; height: 1087.07px; top: -338.16px; left: 98.7949px;
        
        $scope.getCSSStyle = function() {
            return {
              left : "-18px",  
              top : "-350px",
               width: 1200 + 'px', 
                height: 1130 + 'px'     
            };
        };
        
        $scope.openUserRergistorPopup = function() {
            console.log("><<<<<<<<<<<<<<<<<<<<<<<<<<,,");
            var fn = {};
            var modalInstanceMsg = $modal.open({
                    templateUrl: "com/designer/component/user-registor-popup.tmpl.html",
                    controller: 'ComponentRemoveController',
                    resolve: {
                        response: function() {
                            return fn;
                        }
                    }
                });

        };
        
        // top: 89.3997px; left: 515.665px; width: 320.67px; height: 427.559px;
        /*
        
        
  left: 17px  !important;
  top: 0px  !important;    
  width: 288px  !important;
  height: 367px  !important;
        
        */
        $scope.getWorkAreaCSSStyle = function() {
            return {
                top: 100 + 'px', 
                left: 440 + 'px', 
                width: 288 + 'px', 
                height: 367 + 'px'  
            }
        };
        
        $scope.saveComponents = function() {
            
            ComponentManagerModel.resetAllSelectedComponents();
            
            localStorage.setItem("KNB_HTML", ComponentDataModel.getComponentsHtml());
            
            localStorage.setItem("KNB_DATA", angular.toJson(ComponentDataModel.getComponentObjectList()));
            
        };
        
        $scope.getComponents = function() {
            
            console.log(localStorage.getItem("KNB_HTML"));
            console.log(angular.fromJson(localStorage.getItem("KNB_DATA")));
            
            var comps = angular.fromJson(localStorage.getItem("KNB_DATA"));
            
            ComponentDataModel.addSavedComponents(comps);
            
            ComponentManagerModel.renderRetrievedComponentsFromServer(localStorage.getItem("KNB_HTML"));
        };
           
        
    });
    
    
    module.controller('ColorPicker1Controller', [
          '$scope',
          function ($scope) {
              
            $scope.color = '#263238';
            $scope.hoverColor = null;
            $scope.size = 12;
              
              
              
          }
    ]);
    
    module.controller('ComponentRemoveController', function($scope, response, $modalInstance) {
        
        $scope.okHandler = function () {
           
            $modalInstance.close();
        };

        $scope.cancelHandler = function () {
             $modalInstance.close();
        };
    });
    
    module.service('DesignModel', function () {
        var model = this;
        var currentMaskSource = "assets/t-shirt-holder/3600_f_mask.png";
        var currentTexture = "assets/t-shirt-holder/3600_f_texture.png";
        
        model.getColorHex = function(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
             return (rgb && rgb.length === 4) ? "#" +
              ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
        };
        
        model.setMaskSource = function(type) {
            if(type === "F"){
                currentMaskSource = "assets/t-shirt-holder/3600_f_mask.png"
            }else {
                currentMaskSource = "assets/t-shirt-holder/3600_b_mask.png"
            }
        };
        
        model.getMaskSource = function() {
            return currentMaskSource;
        };
        
        model.setTextureSource = function(type) {
            if(type === "F"){
                currentTexture = "assets/t-shirt-holder/3600_f_texture.png"
            }else {
                currentTexture = "assets/t-shirt-holder/3600_b_texture.png"
            }
        };
        
        model.getTextureSource = function() {
            return currentTexture;
        };
        
    });
        
}());