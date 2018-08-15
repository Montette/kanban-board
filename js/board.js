var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
        initSortableColumn();
    },
    $element: $('#board .column-container')
};


// const rememberPosition = (itemId, itemText, targetId) => {
//     $.ajax({
//         url: baseUrl + '/card/' + this.itemId,
//         type: 'PUT',
//         data: {
//             name: itemText,
//             bootcamp_kanban_column_id: this.targetId
//         }
//     });
// }

function initSortable() {
    $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder',
            receive: function(event, ui){
            itemId = ui.item.get(0).id;
            itemText = ui.item.get(0).innerText;
            targetId = ui.item.get(0).parentNode.parentNode.id;
            rememberPosition(itemId, itemText, targetId);
        }
        })
        .disableSelection();
}

function initSortableColumn() {
    $('.column-container').sortable({
            connectWith: '.column-container',
            placeholder: 'column-placeholder'
        })
        .disableSelection();
}


$('.create-column')
    .click(function () {
        var name = "";
        alertify.prompt("Enter column name", function (e, str) {
            name = str;
            if (e) {
                if (name == "") {
                    alertify.alert("You have to enter the column name");
                    return false;
                }
                $.ajax({
                    url: baseUrl + '/column',
                    method: 'POST',
                    data: {
                        name: name
                    },
                    success: function (response) {
                        var column = new Column(response.id, name);
                        board.addColumn(column);
                    }
                });
            } else {
                return false;
            }
        }, );

    });
