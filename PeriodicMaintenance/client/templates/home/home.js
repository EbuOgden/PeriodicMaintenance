if(Meteor.isClient){
  Meteor.startup(function(){
    AutoForm.setDefaultTemplate('materialize');
  })
}
