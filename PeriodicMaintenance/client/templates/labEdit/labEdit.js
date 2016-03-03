if(Meteor.isClient){

    Template.labEdit.rendered = function(){
      Session.set('computerCounter', 1);
      Session.set('cinevisionCounter', 1);
      lab = Router.current();
      labId = lab.params._id;
      computerCounter = 2;
      cinevisionCounter = 2;

      $( ".dateJ" ).datepicker();

    };

    Template.labEdit.helpers({
      havePcSoftware : function(){
        return Session.get('havePcSoftware');
      },

      computerCounter : function(){
        return Session.get('computerCounter');
      },

      cinevisionCounter : function(){
        return Session.get('cinevisionCounter');
      },

      pcSoftProcess : function(){
        return Session.get('pcSoftProcess');
      },

      software : function(){
        return Softwares.find({computerId : Session.get('computerId')});
      },

      pcName : function(){
        return Computers.findOne({_id : Session.get('computerId')});
      },

      softwareCount : function(){
        return Softwares.find({computerId : Session.get('computerId')}).count();
      }

    })

    Template.labEdit.events({
      // 'click #send' : function(e){
      //   e.preventDefault();
      //   Meteor.call('sendEmail',
      //         'azmimengu@gmail.com',
      //         'kekolasma@gmail.com',
      //         'SA KANK',
      //         'Bu maili kendi uygulamam uzerinden atiyorum eger maili aldiysan DUMAN YAK KANK AHAHHA ESPRILER FALAN SIKILDIM');
      // },

      'click #modalSoftwareUpdate' : function(e){
          e.preventDefault();
          var target = e.target;
          var softwareForm = document.getElementById('formSoftwares');
          var modalSoftwareName = document.getElementById('formSoftwares').elements['software'];
          var softCount = document.getElementById('formSoftwares').elements['software'].length;

          softCount = (softCount == undefined ? 1 : softCount);//if form have 1 element so doesnt have length attribute

          if(softCount == 1){
            if(!isEmpty(modalSoftwareName.value)){
                var softwareId = modalSoftwareName.getAttribute('data-softwareId');
                Softwares.update({
                  '_id' : softwareId,
                }, {
                  $set : {
                    softwareName : modalSoftwareName.value
                  }
                })
                softwareForm.reset();
                Materialize.toast('Software Updated!', 2000);
            }
          }
          else{
            for(let i = 0; i < softCount; i++){
              if(!isEmpty(modalSoftwareName[i].value)){
                var softwareId = modalSoftwareName[i].getAttribute('data-softwareId');
                Softwares.update({
                  '_id' : softwareId,
                }, {
                  $set : {
                    softwareName : modalSoftwareName[i].value
                  }})

              }
            }
            softwareForm.reset();
            Materialize.toast('Software Updated!', 2000);
          }

      },

      'click .computerSoftwares' : function(e, tmpl){
          e.preventDefault();
          var target = e.target;
          Session.set('computerId',target.getAttribute('data-computerId'));
          $('#modalForSoftwares').openModal();

      },

      'click #cinevisionAdd' : function(e){
        e.preventDefault();
        lab = Router.current();
        labId = lab.params._id;
        var labchargehandName = Labs.findOne({_id : labId}).chargehandName;
        var labchargeAddress = Labs.findOne({_id : labId}).chargehandAddress;
        var cinevisionForm = document.getElementById('cinevisionForm');
        var cinevision = document.getElementById('cinevisionForm').elements['cinevisionName'];
        var cinevisionPeriod = document.getElementById('cinevisionForm').elements['cinevisionPeriod'];
        if((!isEmpty(cinevision.value) && !isEmpty(cinevisionPeriod.value))){

          Cinevisions.insert({
            labId : labId,
            cinevisionName : cinevision.value,
            periodTime : cinevisionPeriod.value,
            chargehandName : labchargehandName,
            chargehandAddress : labchargeAddress
          })
          Session.set('cinevisionCounter', Session.get('cinevisionCounter') + 1);
          cinevisionForm.reset();

        }
        else{
          alert("Please Fill All Cinevision Boxes");
        }



      },

      'click #computerAdd' : function(e, tmpl){
        e.preventDefault();

        lab = Router.current();
        labId = lab.params._id;
        var newComputerId;
        var newSoftware1Id;
        var newSoftware2Id;
        var labchargehandName = Labs.findOne({_id : labId}).chargehandName;
        var labchargeAddress = Labs.findOne({_id : labId}).chargehandAddress;
        var formComputer = document.getElementById('materialsForm').elements['computerName'];
        var form = document.getElementById('materialsForm');
        var formComputerPeriod = document.getElementById('materialsForm').elements['computersMaintenance'];
        var formSoftware1 = document.getElementById('materialsForm').elements['software1'];
        var formSoftware2 = document.getElementById('materialsForm').elements['software2'];
        var formSoftware1Period = document.getElementById('materialsForm').elements['software1Period'];
        var formSoftware2Period = document.getElementById('materialsForm').elements['software2Period'];

        if(((!isEmpty(formComputer.value) && !isEmpty(formComputerPeriod.value)))){
            newComputerId = Computers.insert({
              labId : labId,
              computerName : formComputer.value,
              periodTime : formComputerPeriod.value,
              chargehandName : labchargehandName,
              chargehandAddress : labchargeAddress
            })

            if((!isEmpty(formSoftware1.value) && !isEmpty(formSoftware1Period.value))){
              newSoftware1Id = Softwares.insert({
                computerId : newComputerId,
                softwareName : formSoftware1.value,
                periodTime : formSoftware1Period.value,
                chargehandName : labchargehandName,
                chargehandAddress : labchargeAddress
              })
              console.log(formSoftware1Period.value);
            }

            if((!isEmpty(formSoftware2.value) && !isEmpty(formSoftware2Period.value))){
              newSoftware2Id = Softwares.insert({
                computerId : newComputerId,
                softwareName : formSoftware2.value,
                periodTime : formSoftware2Period.value,
                chargehandName : labchargehandName,
                chargehandAddress : labchargeAddress
              })
              console.log(formSoftware2Period.value);
            }
          Session.set('computerCounter', Session.get('computerCounter') + 1);
          form.reset();
        }
        else{
            alert("Please fill all boxes for Computer " + Session.get('computerCounter'));
        }
      },

      'click #finishAddMaterial' : function(e) {
        e.preventDefault();
        lab = Router.current();
        labId = lab.params._id;
        if(confirm("You are finishing material adding process. Are you sure ? ") == true){
          Labs.update({
            '_id' : labId
          }, {
            $set : {
              materialAdded : true
            }
          })
        }
        else{
          return;
        }
      }
    })


    Template.registerHelper('equal', function(a, b){
      return a === b;
    });

    Template.registerHelper('higher', function(a,b){
      return a > b
    });


}
