var nonppc = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
];

var ppc = [];

function makeNames(names, selector) {
    $(selector).empty();
    $.each(names, function(index, value) {
        $(selector).append("<div data-name='" + value + "' class='list-item ui-widget-content row' id='" + value + "' style='position: relative; background-color: rgb(255, 255, 255);'>" + (index + 1) + ".  " + value + "</div>");
        if (selector == "#ppc-names-list") {
            var elementItem = $("#" + value);
            clearAddedClasses(elementItem);
            updateStyling(elementItem);
            elementItem.css({'margin-left' : '15px'});
        }
    });
}

function clearAddedClasses(element) {
    element.removeClass('highlighter_focus_in');
    element.removeClass('highlighter_focus_out');
}

function updateHover(element) {
    element.addClass('highlighter_focus_in');
    element.removeClass('highlighter_focus_out');
}

function updateOffHover(element) {
    element.addClass('highlighter_focus_out');
    element.removeClass('highlighter_focus_in');
}

function updateStyling(element) {
    element.css({"background-color": "white"});
    element.attr('style', 'position : relative');
    element.css({'width' : '160px'});
}

function addElement(element, newChild) {
    var namesList = element.find(".names-list");
    namesList.append(newChild);
}

function splitTextAndAddToArray(element, array) {
    var text = element.text();
    var textElements = text.split(" ");
    array.push(textElements[2]);
    return array;
}

function splitTextAndRemoveFromArray(element, array) {
    var text = element.text();
    var textElements = text.split(" ");
    var textToFilter = textElements[2];
    console.log(textToFilter);
    array = array.filter(function(item) {
        return item !== textToFilter
    });
    return array;
}

function mouseOn(element) {
    $(element).css({"background-color": "#f8f8dc"});
    $("html,body").css("cursor","move");
}

function mouseOff(element) {
    setWhite(element);
    $("html,body").css("cursor","default");
}

function setWhite(element) {
    $(element).css("background-color", "white");
}

function setupUI() {
    $("#non-ppc").after("<div class='names-list col' id='nonppc-names-list'></div>");
    $("#ppc").after("<div class='names-list row' id='ppc-names-list'></div>");
}

function makeDraggable() {
    $(".list-item").draggable({ 
        revert: function(event , ui) {
            setWhite(this);
            clearAddedClasses(this);
            $("html,body").css("cursor","default");
            return true;
        },

        drag: function (event, ui) {
            $(this).css("background-color", "#f7f7c0 !important");
            $("html,body").css("cursor","move");
        }
    });
}

function makeDroppable(containerElement, item) {
    var parent = $(containerElement).parent();
    var element = item.helper;
    if ($(element.parent()).closest(parent).length == 1) {
        $("html,body").css("cursor","default");
        return; 
    }
    
    clearAddedClasses(element);
    updateStyling(element);
            
    if ($(containerElement).attr('id') == "ppc") {
        ppc = splitTextAndAddToArray(element, ppc);
        nonppc = splitTextAndRemoveFromArray(element, nonppc);
    } else {
        nonppc = splitTextAndAddToArray(element, nonppc);
        ppc = splitTextAndRemoveFromArray(element, ppc);
    }
    
    makeNames(nonppc, "#nonppc-names-list");
    makeNames(ppc, "#ppc-names-list");
    makeDraggable();
    $("html,body").css("cursor","default");
}
$(document).ready(function(){
    setupUI();
    makeNames(nonppc, "#nonppc-names-list");
    makeDraggable();
    
    $(".name-container").droppable({
        over: function(event, ui) {
            updateHover(ui.helper);
        },
        
        out: function(event, ui) {
            updateOffHover(ui.helper);
        },

        drop: function(event, ui) {
            makeDroppable(this, ui);
        }
    });
    
    $(document).on({ 

        mouseenter: function () {
            mouseOn(this);
        },

        mouseleave: function () {
            mouseOff(this);
        }

    }, ".list-item");
});


