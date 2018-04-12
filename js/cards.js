function Card(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'No name given';
    this.$element = createCard();

    function createCard() {
        //Card Components
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('card-btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
        var $cardEdit = $('<button>').addClass('card-btn-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');

        //Card events
        $cardDelete.click(function () {
            self.removeCard();
        });

        $cardEdit.click(function () {
            self.editCard();
        });
        //Adding card elements

        $card.append($cardDescription)
            .append($cardDelete)
            .append($cardEdit);

        return $card;
    }
}

Card.prototype.removeCard = function () {
    var self = this;
    $.ajax({
        url: baseUrl + '/card/' + self.id,
        method: 'DELETE',
        success: function () {
            self.$element.remove();
        }
    });
};


Card.prototype.editCard = function () {
    var self = this;
    var name = "";
    alertify.prompt("Enter new card name", function (e, str) {
        if (e) {
            name = str;
            if (name == "") {
                alertify.alert("You have to enter the card name");
                return false;
            }
            
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: name,
                },
                success: function (response) {
                    self.$element.children('.card-description').text(name);
                    self.name = name;
                }
            });
        } else {
            return false;
        }
    }, )
}
