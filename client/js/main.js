// add scripts

$(document).on('ready', function() {
  renderItems();
  $('#message').hide();
});


//helper function to render todo items
function renderItems(){
  $.get('/api/todos', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all-todos').append(
        '<tr>'+
          '<td>'+data[i].title+'</td>'+
          '<td>'+data[i].completed+'</td>'+
          '<td><a class="btn btn-primary btn-xs edit-button" data-toggle="modal" data-target="#edit-modal" id="'+data[i]._id+'" role="button">Edit</a>'+
          '&nbsp;<a class="btn btn-danger btn-xs delete-button" data-toggle="modal" data-target="#delete-modal" id="'+data[i]._id+'" role="button">Delete</a></td'+
        '</tr>'
      );
    }
  });
}
