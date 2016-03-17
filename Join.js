// initiate the droppable and draggable

$('.dropbbalecontent').droppable({
        accept: '.clause',
        drop: Drop
    })
    .draggable({
        revert: 'invalid',
        start: function() {
            // functionality that works after draggable starts
        },
        cancel: // child classes that shouldn't make the content draggable go here
    });

function Drop(event, ui) {

    // drag/drop ui objects
    var $drag = ui.draggable;
    var $drop = $(this);
    Drop_action($drag, $drop);

}

var ctr = 0;

function Drop_action(drag, drop) {

    var stack = {};

    var $drag = drag;
    var $drop = drop;

    // following if else maintains the order of drag and drop
    // e.g. there are three classes named 'a', 'b', and 'c', and to achieve a merger that always is in the order 'abc', the following if else helps achieve that
    if (parseInt($drag.attr('id')) > parseInt($drop.attr('id'))) {
        var dragContent = $drag.children('.draggablecontent').html();
        var dropContent = $drop.children('.draggablecontent').html();
    } else {
        var dropContent = $drag.children('.draggablecontent').html();
        var dragContent = $drop.children('.draggablecontent').html();
    }

    var dragClauseId = $drag.attr('id');
    var dropClauseId = $drop.attr('id');
    //   clear the text of drag
    $drag.children('.draggablecontent').text("");
    //   add the modified text to drop
    $drop.children('.draggablecontent').html(dropContent + " " + dragContent);
    //   hide drag so that if the user wants to undo the join, we can bring back the div by removing 'close'
    $drag.addClass('close');
    //   add the data to an array
    var stack = {
        'dragContent': dragContent,
        'dragClauseId': dragClauseId,
        'dropContent': dropContent,
        'dropClauseId': dropClauseId
    }

    stackAr.push(stack);

    var target = $drop.children('.draggablecontent');
    var delete_id = $drag.attr('id');
    var update_id = $drop.attr('id');
    var content = target.html();

    data = {
        'tID': docnum,
        'action': "join",
        'delete_id': delete_id,
        'update_id': update_id,
        'content': content
    }

    $('.unjoin').text('Undo (' + stackAr.length + ')').addClass('show')

}
