$(function () {


    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            //Column components
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('col-btn-delete').html('<i class="fa fa-trash" aria-hidden="true"></i>');
            var $columnAddCard = $('<button>').addClass('add-card').text('+');
            var $columnEdit = $('<button>').addClass('column-edit').html('<i class="fa fa-pencil" aria-hidden="true"></i>');

            //Column events
            $columnDelete.click(function () {
                self.removeColumn();
            });

            $columnAddCard.click(function () {
                var name = "";
                alertify.prompt("Enter card name", function (e, str) {
                    if (e) {
                        name = str;
                        if (name == "") {
                            alertify.alert("You have to enter the card name");
                            return false;
                        }
                        self.addCard(new Card(name));
                    } else {
                        return false;
                    }
                }, )
            });





            $columnEdit.click(function () {
                self.editColumn();
            });

            //Adding column elements
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList)
                .append($columnEdit);

            return $column;
        }
    }

    Column.prototype = {

        addCard: function (card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function () {
            this.$element.remove();
        },



        editColumn: function () {
            var self = this;
            var name = "";
            alertify.prompt("Enter new column name", function (e, str) {
                if (e) {
                    name = str;
                    if (name == "") {
                        alertify.alert("You have to enter the column name");
                        return false;
                    }
                    self.$element.children('.column-title').text(name);
                } else {
                    return false;
                }
            }, )
        }

    };


    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            //Card Components
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
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
        this.$element.remove();
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
                self.$element.children('.card-description').text(name);
            } else {
                return false;
            }
        }, )
    }



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
                    var column = new Column(name);
                    board.addColumn(column);
                } else {
                    return false;
                }
            }, );

        });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);



    //alertify

    function reset() {
        $("#toggleCSS").attr("href", "css/alertify.core.css");
        alertify.set({
            labels: {
                ok: "OK",
                cancel: "Cancel"
            },
            delay: 5000,
            buttonReverse: false,
            buttonFocus: "ok"
        });
    }
    
    
    


    //CLOCK
    
    

    
    
var clockDate = $('<p>').appendTo("#clock");
var clockTime = $('<p>').appendTo("#clock");
    

function getDate(){

	var date = new Date();
	
	var day = date.getDate();
	var month = date.getMonth() < 10 ? "0" + (date.getMonth() +1) : date.getMonth();
	var year = date.getFullYear();
	var hour = date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	
	var todayDate = day + "/" + month + "/" + year;
	var todayTime = hour + ":" + minute + ":" + second;	

	clockDate.text(todayDate);
	clockTime.text(todayTime); 
	
	setTimeout(function(){getDate()}, 1000);
	

}
getDate();

})
