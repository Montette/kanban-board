var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
        initSortableColumn();
    },
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
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
