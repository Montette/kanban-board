  function Column(id, name) {
      var self = this;
      this.id = id;
      this.name = name || 'No name given';
      this.$element = createColumn();

      function createColumn() {
          //Column components
          var $column = $('<div>').attr('id', self.id).addClass('column');
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
                      };
                      event.preventDefault();
                      $.ajax({
                          url: baseUrl + '/card',
                          method: 'POST',
                          data: {
                              name: name,
                              bootcamp_kanban_column_id: self.id
                          },
                          success: function (response) {
                              var card = new Card(response.id, name);
                              self.addCard(card);
                          }
                      });
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
          var self = this;
          $.ajax({
              url: baseUrl + '/column/' + self.id,
              method: 'DELETE',
              success: function (response) {
                  self.$element.remove();
              }
          });
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
                  $.ajax({
                      url: baseUrl + '/column/' + self.id,
                      method: 'PUT',
                      data: {
                          name: name
                      },
                      success: function (response) {
                          self.$element.children('.column-title').text(name);
                          self.name = name;
                      }
                  });
                  
              } else {
                  return false;
              }
          }, )
      }

  };
