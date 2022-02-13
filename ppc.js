var names = [
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

var nonppc = [];

function makeNames(names) {
    $("#nonppc-names-list").empty();
    $.each(names, function(index, value) {
        $("#nonppc-names-list").append("<div data-name='" + value + "' class='list-item ui-widget-content row' id='" + value + "'>" + (index + 1) + ".  " + value + "</div>");
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

$(document).ready(function(){

    makeNames(names);

    $(".list-item").draggable({ 
        revert: function(event , ui) {
            $(this).css("background-color", "white");
            clearAddedClasses(this);
            return true;
        },

        drag: function (event, ui) {
            $(this).css("background-color", "#f7f7c0 !important");
        }
    });
    
    $(".name-container").droppable({
        over: function(event, ui) {
            updateHover(ui.helper);
         },

         out: function(event, ui) {
            updateOffHover(ui.helper);
         },

        drop: function(event, ui) {
            var parent = $(this).parent();
            var element = ui.helper;

            if ($(element.parent()).closest(parent).length == 1) {
                return; 
            }

            addElement(parent, ui.draggable)
            clearAddedClasses(element);
            updateStyling(element);
            
            if ($(this).attr('id') == "ppc") {
                element.css({'margin-left' : "15px"});
                ppc = splitTextAndAddToArray(element, ppc);
                console.log(ppc);
            } else {
                nonppc = splitTextAndAddToArray(element, nonppc);
                console.log(nonppc);
            }
        }
    });
    
    $(document).on({ 
        mouseenter: function () {
            $(this).css({"background-color": "#f8f8dc"});
            $("html,body").css("cursor","move");
        },
        mouseleave: function () {
            $(this).css({"background-color": "white"});
            $("html,body").css("cursor","pointer");
        }
    }, ".list-item");
});


