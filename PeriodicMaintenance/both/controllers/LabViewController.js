LabViewController = RouteController.extend({
  template :'labView',

  data : function(){
    return {
      lab : Labs.findOne({_id : this.params._id}),
      computerCount : Computers.find({labId : this.params._id}).count(),
      cinevisionCount : Cinevisions.find({labId : this.params._id}).count()

    }
  }
})
