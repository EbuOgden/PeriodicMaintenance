if(Meteor.isClient){

    Template.labEdit.rendered = function(){
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

      counter : function(){
        return 1;
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

      'click #computerAdd' : function(e){
        e.preventDefault();
        if(computerCounter > 25){
            alert("Cannot add computer above 25");
        }
        else{
            $('#materialsForm').append('<div class="row"><div class="col"><i class="material-icons medium computerIcon">computer</i></div><div class="col valign-wrapper"><h5 class="valign">Computer ' + computerCounter + '</h5></div></div><div class="row"><div class="input-field col s6 m6 l6"><input placeholder="Name" type="text" name="computers" class="validate"></div><div class="input-field col s6 m6 l6"><input placeholder="Maintenance Time" type="text" name="computersMaintenance" class="text dateJ"></div></div><div class="row"><div class="input-field col s6 m6 l6"><input placeholder="Software 1 Name" type="text" name="software1" class="validate"><input placeholder="Software 1 Maintenance Time" type="text" name="software1Period" class="validate dateJ"></div><div class="input-field col s6 m6 l6 right"><input placeholder="Software 2 Name" type="text" name="software2" class="validate"><input placeholder="Software 2 Maintenance Time" type="text" name="software2Period" class="validate dateJ"></div></div>');
            $( ".dateJ" ).datepicker();
            computerCounter++;
        }


      },

      'click #cinevisionAdd' : function(e){
          e.preventDefault();
          if(cinevisionCounter > 5){
            alert("Cannot add cinevision above 5");
          }
          else{
            $('#cinevisionForm').append('<div class="row"><div class="col"><i class="material-icons medium computerIcon">videocam</i></div><div class="col valign-wrapper"><h5 class="valign">Cinevision ' + cinevisionCounter + '</h5></div></div><div class="input-field col s6 m6 l6"><input name="cinevisionName" type="text" class="validate" placeholder="Name"></div><div class="input-field col s6 m6 l6"><input name="cinevisionPeriod" type="text" class="validate dateJ" placeholder="Maintenance Time"></div>');
            $( ".dateJ" ).datepicker();
            cinevisionCounter++;

          }

      },

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

      'click #submit' : function(e, tmpl){
        e.preventDefault();

        lab = Router.current();
        labId = lab.params._id;
        var labchargehandName = Labs.findOne({_id : labId}).chargehandName;
        var labchargeAddress = Labs.findOne({_id : labId}).chargehandAddress;
        var newComputerId = [];
        var newSoftware1Id = [];
        var newSoftware2Id = [];
        var cinevisionForm = document.getElementById('cinevisionForm');
        var cinevision = document.getElementById('cinevisionForm').elements['cinevisionName'];
        var cinevisionCount = document.getElementById('cinevisionForm').elements['cinevisionName'].length;
        var cinevisionPeriod = document.getElementById('cinevisionForm').elements['cinevisionPeriod'];
        var formComputer = document.getElementById('materialsForm').elements['computerName'];
        var formComputerCount = document.getElementById('materialsForm').elements['computerName'].length;
        var formComputerPeriod = document.getElementById('materialsForm').elements['computersMaintenance'];
        var formComputerPeriodCounter = document.getElementById('materialsForm').elements['computersMaintenance'].length;
        var formSoftware1 = document.getElementById('materialsForm').elements['software1'];
        var formSoftware2 = document.getElementById('materialsForm').elements['software2'];
        var formSoftware1Period = document.getElementById('materialsForm').elements['software1Period'];
        var formSoftware2Period = document.getElementById('materialsForm').elements['software2Period'];

        cinevisionCount = (cinevisionCount == undefined ? 1 : cinevisionCount);//if form have 1 element so doesnt have length attribute

        formComputerCount = (formComputerCount == undefined ? 1 : formComputerCount);//if form have 1 element so doesnt have length attribute

        formComputerPeriodCounter = (formComputerPeriodCounter == undefined ? 1 : formComputerPeriodCounter);//if form have 1 element so doesnt have length attribute

        if(cinevisionCount == 1){
          Cinevisions.insert({
            labId : labId,
            cinevisionName : cinevision.value,
            cinevisionPeriod : cinevisionPeriod.value,
            chargehandName : labchargehandName,
            chargehandAddress : labchargeAddress
          })
        }

        else{
            for(var i = 0; i < cinevisionCount; i++){
                if((!isEmpty(cinevision[i].value) && !isEmpty(cinevisionPeriod[i].value))){
                    continue;
                }

                else{
                  break;
                }
              }
        }

        if(i == cinevisionCount){
          for(var i = 0; i < cinevisionCount; i++){
            Cinevisions.insert({
              labId : labId,
              cinevisionName : cinevision[i].value,
              cinevisionPeriod : cinevisionPeriod[i].value,
              chargehandName : labchargehandName,
              chargehandAddress : labchargeAddress
            })
          }
          cinevisionForm.reset();
          }
          else{
            alert("Please fill all boxes for " + (i + 1) + ". cinevision ");
          }

        return;

        if(formComputerCount == 1){
          if(!isEmpty(formComputer.value)){
            newComputerId = Computers.insert({
              labId : labId,
              computerName : formComputer.value,
              periodTime : formComputer
            })

            console.log(formComputer.value);

            if(!isEmpty(formSoftware1.value)){
              newSoftware1Id = Softwares.insert({
                computerId : newComputerId,
                softwareName : formSoftware1.value

              })
              console.log(formSoftware1.value);
            }

            if(!isEmpty(formSoftware2.value)){
              newSoftware2Id = Softwares.insert({
                computerId : newComputerId,
                softwareName : formSoftware2.value
              })
              console.log(formSoftware2.value);
            }

          }
        }

        else{
          for(let i = 0; i < formComputerCount; i++){
            if(!isEmpty(formComputer[i].value)){
              newComputerId = Computers.insert({
                labId : labId,
                computerName : formComputer[i].value
              })
              if(!isEmpty(formSoftware1[i].value)){
                newSoftware1Id = Softwares.insert({
                  computerId : newComputerId,
                  softwareName : formSoftware1[i].value

                })
                console.log(formSoftware1[i].value);
              }

              if(!isEmpty(formSoftware2[i].value)){
                newSoftware2Id = Softwares.insert({
                  computerId : newComputerId,
                  softwareName : formSoftware2[i].value
                })
                console.log(formSoftware2[i].value);
              }

            }


          }
        }


        // Session.set('havePcSoftware', false);
        // Session.set('pcSoftProcess', false);
        // Session.set('periodProcess', true);
        //
        // for(let i = 0; i < newComputerId.length; i++){
        //
        // }

      }
    })


    Template.registerHelper('equal', function(a, b){
      return a === b;
    });

    Template.registerHelper('higher', function(a,b){
      return a > b
    });


}
