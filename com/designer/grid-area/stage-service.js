(function() {

    var stageModule = angular.module('com.t-designer.stage-service', []);

    stageModule.service('StageModel', function($timeout) {

        var self = this;
        
        // ------------- Stage initialization ---------------        

        var stageCanvas;
        var stageDataSource = "none";
        
        self.isStageSelected = false;
        self.setStageCanvas = function(canvas) {
            stageCanvas = canvas;
        };

        self.getStageCanvas = function() {
            return stageCanvas;
        };
        
        self.setStageDataSource = function(s) {
            stageDataSource = s;
            console.log("setStageDataSource "+stageDataSource);
        };

        self.getStageDataSource = function() {
            return stageDataSource;
        };
        
        
        //------------------- Stage settings ---------------

        var stageWindowObject = {
            width: 288,
            height: 367
        };
        
        var defaultStageDimension = angular.copy(stageWindowObject);
        
        self.getDefaultStageDimension = function() {
            return defaultStageDimension;
        };
        
        self.getStageWindowObject = function() {
            return stageWindowObject;
        };

        self.updateStageProperty = function(propValue, propName) {
           
            $("#container").css(propName, propValue);
           
        };
        
        $timeout(function(){
            self.updateStageProperty(stageWindowObject.width, 'width');
            self.updateStageProperty(stageWindowObject.height, 'height');
            
        }, 500);
        
        self.checkMinWidth = function(propValue) {
            return (propValue < defaultStageDimension.width);
        };
        
        self.checkMinHeight = function(propValue) {
            return (propValue < defaultStageDimension.height);
        }; 
            
    });

}());