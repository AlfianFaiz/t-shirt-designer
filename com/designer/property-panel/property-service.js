(function() {

    var propertyModule = angular.module('com.t-designer.property-service', []);

    propertyModule.service('PropertyModel', function($timeout, $rootScope) {

        var self = this;
        
        //-----------------------------Panel controls----------------------
        
        var isStageClicked = true;
        
        self.showStageProperties = function() {
            $("#collapseOne").collapse('show');
            isStageClicked = true;
        };

        self.showComponentProperties = function() {
            $("#collapseOne").collapse('show');
            isStageClicked = false;
        };
        
        self.checkStageClicked = function() {
            return isStageClicked;
        }
        
        
        //----------------------------- Style settings ----------------------
        
        var fontList = [];
        self.setFonts = function(list) {
            fontList = list;
        };

        self.getFonts = function() {
            return fontList;
        };
        
        self.getSelectedFontInfo = function(fontName) {
            return _.find(fontList, function(obj) {
                return (obj.name == fontName)
            });
        };
        
        //----------------------------- Loading extranal css ----------------------
        
        self.loadFontCSS = function(href) {

          var cssLink = $("<link>");
          $("head").append(cssLink); //IE hack: append before setting href

          cssLink.attr({
            rel:  "stylesheet",
            type: "text/css",
            href: href
          });

        };
        
        //----------------------------- Filters settings ----------------------
        
        var filters = [];
        self.setFilters = function(list) {
            filters = list;
            console.log(filters)
        };

        self.getFilters = function() {
            return filters;
        };
        
    });

}());