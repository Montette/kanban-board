// function Card(id, name) {
//     var self = this;
//     this.id = id;
//     this.name = name || 'No name given';
//     this.$element = createCard();

//     function createCard() {
//         //Card Components
//         var $card = $('<li>').attr('id', self.id).addClass('card');
//         var $cardDescription = $('<p>').addClass('card-description').text(self.name);
//         var $cardDelete = $('<button>').addClass('card-btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
//         var $cardEdit = $('<button>').addClass('card-btn-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');

//         //Card events
//     $cardDelete.click(function () {
//             self.removeCard();
//             console.log($(self.$element).parent().parent().attr('id'));
//         });

//         $cardEdit.click(function () {
//             self.editCard();
//         });
//         //Adding card elements

//         $card.append($cardDescription)
//             .append($cardDelete)
//             .append($cardEdit);

//         return $card;
//     }
// }

// Card.prototype.removeCard = function () {
//     var self = this;
//     $.ajax({
//         url: baseUrl + '/card/' + self.id,
//         method: 'DELETE',
//         success: function () {
//             self.$element.remove();
//         }
//     });
// };


// Card.prototype.editCard = function () {
//     var self = this;
//     var name = "";
//     alertify.prompt("Enter new card name", function (e, str) {
//         if (e) {
//             name = str;
//             if (name == "") {
//                 alertify.alert("You have to enter the card name");
//                 return false;
//             }
//             $.ajax({
//                 url: baseUrl + '/card/' + self.id,
//                 method: 'PUT',
//                 data: {
//                     name: name,
//                     bootcamp_kanban_column_id: $(self.$element).parent().parent().attr('id')
//                 },
//                 success: function (response) {
//                     self.$element.children('.card-description').text(name);
//                     self.name = name;
//                 }
//             });
//         } else {
//             return false;
//         }
//     }, )



// }

// rememberPosition = function(itemId, itemText, targetId) {
//     var self = this;
//     $.ajax({
//         url: baseUrl + '/card/' + self.itemId,
//         type: 'PUT',
//         data: {
//             name: itemText,
//             bootcamp_kanban_column_id: self.targetId
//         }
//     });
// }




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