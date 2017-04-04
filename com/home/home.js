(function () {
    
    var module = angular.module('com.t-designer.home', []);  
    
    module.controller('HomeCtrl', function HomeCtrl($scope, HomeModel, AppModel) {
            AppModel.isDesignerSection = false;
        
        var homeCtrl = this;
            homeCtrl.getColorList = HomeModel.getColorList;
            homeCtrl.getStyleInfo = HomeModel.getStyleInfo;
            homeCtrl.setSelectedColorInfo = HomeModel.setSelectedColorInfo;
            homeCtrl.getSelectedColorInfo = HomeModel.getSelectedColorInfo;
        
           // homeCtrl.getColorList()
        console.log('>>>>>>>>>>>>>>');
        
    });
    
    module.service('HomeModel', function () {
        var model = this;
        
        
        var colors = [
                    {name : "WHITE", color : "rgb(255, 255, 255)", image: "assets/t-shirt-white.jpg"},
                    {name : "BLACK", color : "rgb(0, 0, 0)", image: "assets/t-shirt-black.jpg"},
                    {name : "SAPPHIRE", color : "rgb(4, 115, 174)", image: "assets/t-shirt-sapphire.jpg"},
                    {name : "SAND", color : "rgb(202, 191, 173)", image: "assets/t-shirt-sand.jpg"},
                    {name : "ROYAL", color : "rgb(34, 77, 143)", image: "assets/t-shirt-royal.jpg"},
                    {name : "RED", color : "rgb(204, 9, 9)", image: "assets/t-shirt-red.jpg"}];
        
        var selectedColorInfo = colors[0];
        
        model.setSelectedColorInfo = function(obj) {
            selectedColorInfo = obj;
        }
        
        model.getSelectedColorInfo = function() {
            return selectedColorInfo;
        }
        
        model.getColorList = function() {
            return colors;
        };
        
        model.getStyleInfo = function(obj) {
            return {
                'width' : '27px',
                'height' : '27px',
                 'margin-top' : '0px', 
                 'margin-left' : '0px',
                 'background-color' : obj.color  
            }  
        };
        
    });
        
}());