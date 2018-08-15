
const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
const myHeaders = {
  'X-Client-Id': '3053',
  'X-Auth-Token': '53265a363554aa1ad6d9d3f54ac1e40e'
};



const setupCards = (col, cards) => {
	cards.forEach( (card) => {
        let newCard = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.addCard(newCard);
  	})
}

const setupColumns = (columns) => {
    columns.forEach( (column) => {
        let col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}


$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success:(response)=> {
      setupColumns(response.columns);
    }
});

