(function() {

    var componentModule = angular.module('com.t-designer.component-manager-service', ['com.t-designer.component-service']);

    componentModule.service('ComponentManagerModel', function($rootScope, $timeout, $compile, $modal, ComponentDataModel, StageModel, PropertyModel) {

        var self = this;

        //------------------- Component Events --------------------------

        self.COMPONENT_CREATED = "COMPONENT_CREATED";
        self.COMPONENT_SELECTION_CHANGED = "COMPONENT_SELECTION_CHANGED";
        
        var componentCounter = 0;
        var selectedComponent = null;
        var componentType = "";
        var stageScope = {};
        var componentDataSource = 'none';
        
        self.setSelectedComponent = function (component, k) {
            
            if(component){
                selectedComponent = $(component);
            }else {
                selectedComponent = component;
            }
            
        };
        
        function setSelectedComponentType(comId) {
            
            if(comId == undefined) return;
            componentType = ComponentDataModel.getComponentById(comId).cp_display;
        };

        self.setStageScope = function(scope) {
            stageScope = scope;

        };

        self.getSelectedComponentType = function() {
            return componentType;
        };
        
        self.getSelectedComponent = function() {
            return selectedComponent;
        };
        
        //------------------- Component UI management Code --------------------------

        self.initComponent = function(component) {
            
            component.css("z-index", 100);
            component.children().first().remove();
            component.children().first().removeClass('hidethis');
            var id = (component.attr('id') || 'id') + getUniqueId();
            component.attr('id', id);
            
            component.removeClass("draggable div ui-draggable ui-draggable-handle ui-draggable-dragging ui-resizable");
               
               //.addClass("ui-wrapper ui-draggable ui-draggable-handle");
            
            $(component).find(".ui-resizable-handle").hide();
            
            $(component).removeAttr("ng-if");
            
            $(component).contents().each(function() {
                    if(this.nodeType === Node.COMMENT_NODE) {
                        $(this).remove();
                    }
            });
            
            StageModel.getStageCanvas().append(component);

            var componentId = component.attr('id');
            
            var identifier = component.children().attr('identifier');
            
            ComponentDataModel.addNewComponent({
                type: identifier,
                id: componentId
            });
            
            ComponentDataModel.setSelectedComponentObject({
                id: componentId
            });
            
            self.setSelectedComponent($(component), 1);
            setSelectedComponentType(componentId);
            
            $rootScope.$broadcast(self.COMPONENT_CREATED);
            
            setComponentDefaultDimension(component);
            setResizeEvent(component);
            setDragEvent(component);
            
            $timeout(function() {
               
                component.click(componentClickHandler);
                
                setComponentSelectedStage();
                
                ComponentDataModel.updateSelectedComponentObjectPosition(
                            component.css('top').replace('px', ''),
                            component.css('left').replace('px', ''));
                
            }, 100);
            
        };
        
        function setComponentDefaultDimension(component) {
            
            
                var selectedComponentObject = ComponentDataModel.getSelectedComponentObject();
            
                console.log(selectedComponentObject.H);
            
                component.css({
                        width: selectedComponentObject.W+'px',
                        height: selectedComponentObject.H+'px',
                        border: '1px solid #dddddd'
                });
            
        };
        
        function setResizeEvent(component) {
            var timeoutId = 0;
            
            component.resizable({ containment: "#container", handles: "n, e, s, w, nw, ne, sw, se"}).bind({
                resize: function(event, ui) {
                    
                    var resizedWidth = ui.size.width;
                    var resizedHeight = ui.size.height;
                    
                    stageScope.$apply(function() {
                        
                        $timeout.cancel(timeoutId);
                        
                        timeoutId = $timeout(function(){
                            
                            if($(ui.helper).attr('id') == undefined) return;
                                self.setSelectedComponent($(ui.helper), 2);
                                setSelectedComponentType($(ui.helper).attr('id'));
                                $rootScope.$broadcast(self.COMPONENT_SELECTION_CHANGED, componentType);
                                updateSelectedComponentDimension(resizedWidth, resizedHeight)
                            
                        }, 100);
                        
                        ComponentDataModel.updateSelectedComponentObjectDimension(resizedWidth, resizedHeight);
                        
                        ComponentDataModel.updateSelectedComponentObjectPosition(
                            getComponentPosition(ui).top,
                            getComponentPosition(ui).left);
                        
                    });

                }
            });
            
        };

        function setDragEvent(component) {
            var timeoutId = 0;
            
            component.bind( "mousedown", function( event ) {
                componentClickHandler(event);
            });
            
            component.draggable({
                containment: "#container",
                cancel: "",
                drag: function(event, ui) {
                    
                    stageScope.$apply(function() {
                        
                        $timeout.cancel(timeoutId);
                        
                        timeoutId = $timeout(function(){
                                
                                if($(ui.helper).attr('id') == undefined) return;
                                    
                                self.setSelectedComponent($(ui.helper), 3);
                                setSelectedComponentType($(ui.helper).attr('id'));
                                $rootScope.$broadcast(self.COMPONENT_SELECTION_CHANGED);
                            
                        }, 100);
                        
                        ComponentDataModel.updateSelectedComponentObjectPosition(
                            getComponentPosition(ui).top,
                            getComponentPosition(ui).left);
                    });

                }
            });
        };

        function getComponentPosition(component) {

            return {
                'left': (component.position.left - parseInt(StageModel.getStageCanvas().css('borderLeftWidth')) - StageModel.getStageCanvas().offset().left),
                'top': (component.position.top - parseInt(StageModel.getStageCanvas().css('borderTopWidth')) - StageModel.getStageCanvas().offset().top)
            };
        };
       
        function getUniqueId(component) {
            return Date.now();
        }
        
        function componentClickHandler(event) {
            
            event.stopPropagation();
            
            if ((event.currentTarget.id === "")
                || (typeof event.currentTarget.id === "undefined") 
                || (event.currentTarget.id.search('id') == -1)) {
                return;
            }
            
            StageModel.isStageSelected = false;
            
            var comId = event.currentTarget.id;
            
            stageScope.$apply(function() {
                
                ComponentDataModel.setSelectedComponentObject({
                    id: comId
                });
                
                self.setSelectedComponent(event.currentTarget, 4);
                setSelectedComponentType(comId);
                $rootScope.$broadcast(self.COMPONENT_SELECTION_CHANGED);
                
                               
            });
            
            setComponentSelectedStage();
            
        };
        
        function setComponentSelectedStage(){
            if(previousSelectedComponent){
                previousSelectedComponent.css({border: '1px solid #dddddd'});
                $(previousSelectedComponent).find(".ui-resizable-handle").hide();
            }
            $(selectedComponent).css({border: '1px solid #f57c23'});
            $(selectedComponent).find(".ui-resizable-handle").show();
            previousSelectedComponent = $(selectedComponent);
            PropertyModel.showComponentProperties();
        };
        
        var previousSelectedComponent = null;
        
        self.resetAllSelectedComponents = function () {
            
            if(previousSelectedComponent){
                previousSelectedComponent.css({border: '1px solid #dddddd'});
            }
            
            $(previousSelectedComponent).find(".ui-resizable-handle").hide();
            previousSelectedComponent = null;
        };
        
        function removeComponentFromStageWindow(comId) {
            //var compDelId = comId.slice(2, 100);
            $('#' + comId).remove();
        }

        function deleteComponent(event) {
            var comId = selectedComponent.attr('id');
            console.log("deleteComponent    " + comId);
            removeComponentFromStageWindow(comId);
            ComponentDataModel.removeComponentDataFromList(comId);
            self.setSelectedComponent(null);
        };

        self.renderRetrievedComponentsFromServer = function(html) {

            var component = $(html);

            $('#container').append(component);

            StageModel.setStageCanvas($('#container'));

            $timeout(function() {
                
                var compList = $(component).find("div[identifier]").parent();
                
                $(component).find(".ui-resizable-handle").remove();
                
                $.each(compList, function(index, elem){
                    
                    $(elem).click(componentClickHandler);
                    setResizeEvent($(elem));
                    setDragEvent($(elem));
                    
                });
                
                //$(component).find('.custButton').click(deleteComponent);

            }, 500);
        };

        //----------------- Updating component properties ---------------------------
        
        
        self.applyFilers = function(name, value) {
            var compType = self.getSelectedComponentType();
            $(selectedComponent).find(getElementIdByType(compType)).css("filter", value); 
            $(selectedComponent).find(getElementIdByType(compType)).css("-webkit-filter", value);
        }

        self.updateComponentProperty = function(propValue, propName) {
            
            var compType = self.getSelectedComponentType();

            //console.log("propName  "+propName + "   propValue  "+ propValue + "   compType  "+compType);
            
            switch (propName) {

                case "text":
                    
                    $(selectedComponent).find(getElementIdByType(compType)).text(propValue);
                    
                break;
                
                case "color":
                       $(selectedComponent).find(getElementIdByType(compType)).css("color", propValue);
                break; 
                    
                case "font-size":
                       $(selectedComponent).find(getElementIdByType(compType)).css("font-size", propValue);
                break;
                
                case "letter-spacing":
                       $(selectedComponent).find(getElementIdByType(compType)).css("letter-spacing", propValue);
                break;
                
                case "font-family":
                       $(selectedComponent).find(getElementIdByType(compType)).css("font-family", propValue);
                       console.log("propValue   "+propValue);
                break;     
                    
                case "img_mc":
                    
                    ComponentDataModel.getSelectedComponentObject().src = propValue;
                    $(selectedComponent).find(getElementIdByType(compType)).attr("src", propValue);
                    
                break;
                    
                case "width":
                    $(selectedComponent).css("width", propValue);
                    updateSelectedComponentDimension(propValue, null);
                break;
                    
                case "height":
                    $(selectedComponent).css("height", propValue);
                    updateSelectedComponentDimension(null, propValue);
                break;
                    
                case "left":
                    
                    $(selectedComponent).css("left", getComponentPosition2(propValue, propValue).x);
                    
                break;
                    
                case "top":
                    
                    $(selectedComponent).css("top", getComponentPosition2(propValue, propValue).y);
                    
                break;
            }

        };
        
        function getElementIdByType(compType) {
            
            var componetIdMap = {
                        'label': '#label_txt',
                        'img': '#img_mc',
                    };
            
             return componetIdMap[compType];
            
        };
        
        function getComponentPosition2(x, y) {
            
            return {
                'x': (StageModel.getStageCanvas().offset().left + parseInt(x)),
                'y': (StageModel.getStageCanvas().offset().top + parseInt(y))
            };
        };
       
        function updateSelectedComponentDimension(width, height) {
            var compType = self.getSelectedComponentType();
            
            if (width) {
                $(selectedComponent).find(getElementIdByType(compType)).css("width", width);
            }

            if (height) {
                $(selectedComponent).find(getElementIdByType(compType)).css("height", height);
            }

        };
        
    });
    
}());