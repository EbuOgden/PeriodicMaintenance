LabEditController = RouteController.extend({
  template : 'labEdit',

  onBeforeAction: function(){
    var lab = Meteor.wrapAsync(); /* sync */

    if(Labs.findOne({'_id' : this.params._id}).materialAdded){
      Session.set('pcSoftProcess', false);
      Session.set('havePcSoftware', true);
    }
    else{
      Session.set('havePcSoftware', false);
      Session.set('pcSoftProcess', true);
    }

    /* .find is cursor so we use map for access each element like forEach */
    // computerList = Computers.find({labId : this.params._id}).map(function(element){
    //   return element._id;
    // });

    this.next();
  },


   data : function(){
     return {
       lab : Labs.findOne({_id : this.params._id}),
       computer : Computers.find({labId : this.params._id}),
       cinevisionCount : Cinevisions.find({labId : this.params._id}).count(),
       cinevision : Cinevisions.find({labId : this.params._id})
     }


   },

   action : function(){
     this.render();
   }
})
