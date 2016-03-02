LabEditController = RouteController.extend({
  template : 'labEdit',

  onBeforeAction: function(){
    if(Computers.find({'labId' : this.params._id}).count() > 0){
      /* TODO periodTime control */
      console.log("onbefore computer control OK");
      Session.set('pcSoftProcess', false);
      Session.set('havePcSoftware', true);
    }
    else{
      console.log("onbefore computer control not OK");
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
