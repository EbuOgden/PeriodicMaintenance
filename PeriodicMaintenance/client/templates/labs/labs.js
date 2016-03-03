if(Meteor.isClient){
    Template.labs.rendered = function(){
      $('.modal-trigger').leanModal();
      $("input[name='periodTime']").addClass('dateJ');
      $( ".dateJ" ).datepicker();

    };

    Template.labs.events({
      'click #labsAdd' : function(e){
        e.preventDefault();
      }

    })

    Template.labs.helpers({
      labs : function (){
        return Labs.find();
      }
    })

    AutoForm.hooks({
    insertLabForm :{
      onSuccess : function(){
        var doc = this.insertDoc;
        var docId = this.docId;
        $('#labsAdd').closeModal();
        Materialize.toast(doc.labName + " Added, Routing...", 1000);
        setTimeout(function(){
            Router.go('/labEdit/' + docId);
        }, 500);


    }

      }
    })
}
