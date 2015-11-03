// add scripts

$(document).on('ready', function() {
  renderItems();
  $('#message').hide();
});

//POST - add new item to to do list
$('form').on('submit', function(e){
  e.preventDefault();

  var $toDoTitle = $('#todo-title').val();
  var $completed = $('#compelted').val();

  var payload = {
    title: $toDoTitle,
    completed: $completed,
  };

  $.post('/api/todos', payload, function(data){
    $('#message').html(data.Message);
    $(':input', 'form').val('');
    $('#all-todos').html("");
    $('#message').show();
    renderItems();
  });
});

// *** HELPER FUNCTIONS ***//
//GET - render all to do items
function renderItems(){
  $.get('/api/todos', function(data){
    for (var i = 0; i < data.length; i++) {
      $('#all-todos').append(
        '<tr>'+
          '<td>'+data[i].title+'</td>'+
          '<td><input type="checkbox" value="'+data[i].completed+'" id="completed-'+data[i]._id+'">'+data[i].completed+'</td>'+
          '<td><a class="btn btn-primary btn-xs edit-button" data-toggle="modal" data-target="#edit-modal" id="'+data[i]._id+'" role="button">Edit</a>'+
          '&nbsp;<a class="btn btn-danger btn-xs delete-button" data-toggle="modal" data-target="#delete-modal" id="'+data[i]._id+'" role="button">Delete</a></td'+
        '</tr>'
      );
    }
  });
}
//need to figure out how to correlate the boolean value to checkbox in table

//sets value of checkbox
 $('#completed').change(function(){
     cb = $(this);
     cb.val(cb.prop('checked'));
     console.log($(this).val());
 });
