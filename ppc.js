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
            ui.helper.addClass('highlighter_focus_in');
            ui.helper.removeClass('highlighter_focus_out');
         },
         out: function(event, ui) {
            ui.helper.addClass('highlighter_focus_out');
            ui.helper.removeClass('highlighter_focus_in');
         },
        drop: function(event, ui) {
            if ($(ui.helper.parent()).closest($(this).parent()).length == 1) {
                return; 
            }

            var id = $(this).attr('id');
            
            var parent = $(this).parent();
            var namesList = parent.find(".names-list");
            namesList.append(ui.draggable);
            ui.helper.removeClass('highlighter_focus_in');
            ui.helper.removeClass('highlighter_focus_out');
            ui.helper.css({"background-color": "white"});
            ui.helper.attr('style', 'position : relative');
            ui.helper.css({'width' : '160px'});

            if (id == "ppc") {
                ui.helper.css({'margin-left' : "15px"});
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


