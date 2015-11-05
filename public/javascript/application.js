$(function () {

  $.ajax({
    url: '/contacts',
    method: 'get',
    dataType: 'json'
  }).done(populateContactList);

  function populateContactList(contacts) {
    contacts.forEach(appendContact);
  }

  function appendContact(contact) {
  //   appends Contact attributes and button
    $('<li>')
     .data('id', contact.id)
     // .text(contact.firstname)
     .append($('<span>').text(contact.firstname))
     .append($('<button>')
       .html('delete')
       .addClass('delete'))
     .append($('<button>')
       .html('show')
       .addClass('show'))
     .appendTo('#contacts')
     .append($('<button>')
       .html('edit')
       .addClass('edit'))
     .appendTo('#contacts');
  }

  $('#button').on('click', function() {
    $.ajax({
      url: $('#create-contact-form').attr('action'),
      method: $('#create-contact-form').attr('method'),
      data: $('#create-contact-form').serialize()
    }).done(appendContact);
    return false;
  });

  $('#contacts').on('click', 'button.edit', function() {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    contactListItem.append(addForm);
    var editButton = $(this);
    $('#edit').on('click', 'button#test', function() {
      $.ajax({
        url: '/contacts/' + id,
        method: $('#edit').attr('method'),
        data: $('#edit').serialize(),
        dataType: 'json',
        success: function(contact) {
          editButton.siblings('span').replaceWith(contact.firstname);
          $('#edit').remove();
        }
      });
      return false;
    });
  });

 function addForm() {
    return '<form id="edit" method="put"><input type="text" id="firstname" name="firstname" /><button id="test">Edit</button></form>';
  }

  $('#contacts').on('click', 'button.show', function() {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    $.ajax({
      url: '/contacts/' + id,
      method: 'get',
      dataType: 'json'
    }).done(showContact.bind(this));
  });

  $('#contacts').on('click', 'button.delete', function() {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    $.ajax({
      url: '/contacts/' + id + '/delete',
      method: 'delete'
      // success: function(){
      //   console.log("data");
      // }
    }).done(deleteContact.bind(this));
  });


  function showContact(contact) {
    $('<li>').text(contact.firstname).addClass('content').appendTo($(this).closest('li'));
  }

  function deleteContact() {
    $(this).parent().remove();
    console.log(this);
  }

});
