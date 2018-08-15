

class Card {
    constructor(id, name) {
        this.id = id;
        this.name = name || 'No name given';
        this.$element = this.createCard();
    }

    createCard() {
        //Card Components
        const $card = $('<li>').attr('id', this.id).addClass('card');
        const $cardDescription = $('<p>').addClass('card-description').text(this.name);
        const $cardDelete = $('<button>').addClass('card-btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
        const $cardEdit = $('<button>').addClass('card-btn-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');
        //card events
        $cardDelete.on('click', this.removeCard.bind(this))
        $cardEdit.on('click', this.editCard.bind(this))

        //Adding card elements
        $card.append($cardDescription)
            .append($cardDelete)
            .append($cardEdit);
        return $card;
    }

    removeCard() {
        $.ajax({
            url: baseUrl + '/card/' + this.id,
            method: 'DELETE',
            success: () => {
                this.$element.remove();
            }
        })
    }

    editCard() {
        let name = "";
        alertify.prompt("Enter new card name", (e, str)=> {
            if (e) {
                name = str;
                if (name == "") {
                    alertify.alert("You have to enter the card name");
                    return false;
                }
                $.ajax({
                    url: baseUrl + '/card/' + this.id,
                    method: 'PUT',
                    data: {
                        name: name,
                        bootcamp_kanban_column_id: $(this.$element).parent().parent().attr('id')
                    },
                    success: (response) => {
                        this.$element.children('.card-description').text(name);
                        this.name = name;
                    }
                });
            } else {
                return false;
            }
        }, )
    }

}