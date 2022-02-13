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
    $("#nonppc-names").empty();
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

$(document).ready(function(){

    makeNames(names);

    $(".list-item").draggable({ 
        revert: function(event , ui) {
            $(this).css("background-color", "white");
            $(this).removeClass('highlighter_focus_in');
            $(this).removeClass('highlighter_focus_out');
            return true;
        },
        drag: function (event, ui) {
            $(this).css("background-color", "#f7f7c0 !important");
        }
    });
    
    $(".name-container").droppable({
        over: function(event, ui) {
            var element = ui.helper;
            updateHover(element);
         },

         out: function(event, ui) {
            var element = ui.helper;
            updateOffHover(element);
         },

        drop: function(event, ui) {
            var parent = $(this).parent();
            var element = ui.helper;

            if ($(element.parent()).closest(parent).length == 1) {
                return; 
            }

            var namesList = parent.find(".names-list");
            namesList.append(ui.draggable);

            clearAddedClasses(element);

            element.css({"background-color": "white"});
            element.attr('style', 'position : relative');
            element.css({'width' : '160px'});

            var id = $(this).attr('id');
            if (id == "ppc") {
                element.css({'margin-left' : "15px"});
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


