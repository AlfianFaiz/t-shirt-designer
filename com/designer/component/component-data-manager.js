(function() {

    var componentModule = angular.module('com.t-designer.component-service', ['com.t-designer.menu-bar-data-service']);

    componentModule.service('ComponentDataModel', function(MenuBarModal, $timeout) {

        var self = this;
            
            self.UPDATE_DATA_SOURCE_MAP = "UPDATE_DATA_SOURCE_MAP";
            self.UPDATE_COMBOBOX_OPTIONS = "UPDATE_COMBOBOX_OPTIONS";
        
            
        
        var propertyCollection = [];
        var componentObjectList = [];
        var selectedComponentObject = {};
        this.isFromStage = true

        function createComponentObject(comp) {
            
            console.log(comp);
            
            var newComp = _.find(propertyCollection, function(obj) {
                return (obj.cp_display.toString() === comp.type.toString())
            });

            newComp = angular.copy(newComp);

            if (!_.has(newComp, 'id')) {
                newComp.id = comp.id;
                newComp.name_for_server = newComp.name_for_server+'_'+newComp.id.replace('id', '');
            }
            
            //console.log("newComp  >>>  " + angular.toJson(newComp, true));
            
            return newComp;
            
        };

        MenuBarModal.getMenuData().then(function(result) {
            propertyCollection = result;
        });

        self.addNewComponent = function(obj) {
            componentObjectList.push(createComponentObject(obj));
        };

        self.removeComponentDataFromList = function(id) {
            
            var comp = _.remove(componentObjectList, function(obj) {
                return (obj.id == id)
            })
            
            removeComponentDataByParentIdFromList(id);
            
            console.log("removeComponentDataFromList    " + angular.toJson(componentObjectList));
        };
        
         function removeComponentDataByParentIdFromList(parentId) {
             //console.log("removeComponentDataByParentIdFromList    " + parentId);
             var comp = _.remove(componentObjectList, function(obj) {
                 return ((obj.parentId == parentId) && (obj.parentId.search('id') > -1 ));
            })
        };

        self.addSavedComponents = function(list) {
            
            if (list && list.length > 0) {
                componentObjectList = [];
                componentObjectList = list;
            }
        };


        self.getComponentObjectList = function() {
            return componentObjectList;
        };

        
        self.clearComponentObjectList = function() {
            componentObjectList = [];
        };
        
        self.getComponentById = function(id) {
            var comp = _.find(componentObjectList, function(obj) {
                return (obj.id == id)
            });
            return comp;
        };
        
        self.updateParentId = function(id, pId) {
            var comp = _.find(componentObjectList, function(obj) {
                return (obj.id == id)
            });
            
            comp.parentId = pId;
            console.log("updateParentId    " + angular.toJson(comp));
        };

        self.setSelectedComponentObject = function(comp) {
            //debugger;
            selectedComponentObject = _.find(componentObjectList, function(obj) {
                return (obj.id == comp.id)
            });
        };

        self.getSelectedComponentObject = function() {
            return selectedComponentObject;
        };

        self.updateSelectedComponentObjectPosition = function(top, left) {
            selectedComponentObject.top = top;
            selectedComponentObject.left = left;
        };

        self.updateSelectedComponentObjectDimension = function(width, height) {
            selectedComponentObject.width = width;
            selectedComponentObject.height = height;
        };
        
        self.updateSelectedComponentObjectValue = function(innerTextValue) {
            selectedComponentObject.text = innerTextValue;
        };
        
 		self.getComponentsHtml = function() {
            
            var htmlData = $('#container').clone(true);
            
            htmlData.find(".ui-resizable-handle").remove();
            
        var finalHtml = htmlData.html().replace(/<!--(.*?)-->/gm, "").replace(/[^\x20-\x7E]/gmi, "").trim();
            
            console.log("htmlData.html()      "+ finalHtml);    
            
            return finalHtml;
        }

    });

}());