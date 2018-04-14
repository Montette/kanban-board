


  
//
//    // CREATING COLUMNS
//    var todoColumn = new Column('To do');
//    var doingColumn = new Column('Doing');
//    var doneColumn = new Column('Done');
//
//    // ADDING COLUMNS TO THE BOARD
//    board.addColumn(todoColumn);
//    board.addColumn(doingColumn);
//    board.addColumn(doneColumn);
//
//    // CREATING CARDS
//    var card1 = new Card('New task');
//    var card2 = new Card('Create kanban boards');
//
//    // ADDING CARDS TO COLUMNS
//    todoColumn.addCard(card1);
//    doingColumn.addCard(card2);

 
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3053',
  'X-Auth-Token': '53265a363554aa1ad6d9d3f54ac1e40e'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.addCard(card);
  	})
}
