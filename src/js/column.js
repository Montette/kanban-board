
class Column {
    constructor(id, name) {
        this.name = name || 'No name given';
        this.id = id;
        this.$element = this.createColumn();
    }

    createColumn() {
        const $column = $('<div>').attr('id', this.id).addClass('column');
        const $columnTitle = $('<h2>').addClass('column-title').text(this.name);
        const $columnCardList = $('<ul>').addClass('column-card-list');
        const $columnDelete = $('<button>').addClass('col-btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
        const $columnAddCard = $('<button>').addClass('add-card').text('+');
        const $columnEdit = $('<button>').addClass('column-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');
        //Column events
        $columnDelete.on('click', this.removeColumn.bind(this))
        $columnAddCard.on('click', this.createCard.bind(this))
        $columnEdit.on('click', this.editColumn.bind(this))

        //Adding column elements
        $column.append($columnTitle)
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList)
            .append($columnEdit);
        return $column;
    }

    addCard(card) {
        this.$element.children('ul').append(card.$element);
    }

    removeColumn() {
        $.ajax({
            url: baseUrl + '/column/' + this.id,
            method: 'DELETE',
            success: (response) => {
                this.$element.remove();
            }
        })
    }

    createCard() {
        let name = "";
        console.log(this);
        alertify.prompt("Enter card name", (e, str) => {
            if (e) {
                name = str;
                if (name == "") {
                    alertify.alert("You have to enter the card name");
                    return false;
                };
                event.preventDefault();
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: name,
                        bootcamp_kanban_column_id: this.id
                    },
                    success: (response) => {
                        let card = new Card(response.id, name);
                        console.log(this);
                        this.addCard(card);
                    }
                });
            } else {
                return false;
            }
        }, )
    }

    editColumn() {
        let name = "";
        alertify.prompt("Enter new column name", (e, str) => {
            if (e) {
                name = str;
                if (name == "") {
                    alertify.alert("You have to enter the column name");
                    return false;
                }
                $.ajax({
                    url: baseUrl + '/column/' + this.id,
                    method: 'PUT',
                    data: {
                        name: name
                    },
                    success: (response) => {
                        this.$element.children('.column-title').text(name);
                        this.name = name;
                    }
                });
            } else {
                return false;
            }
        }, )
    }
}