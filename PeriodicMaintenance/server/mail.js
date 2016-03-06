Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://labcontrolmaltepe@gmail.com:123asd321@smtp.gmail.com:465';
  /* TODO materials period time check for send e-mail */

  Meteor.setInterval(function(){
    var date = new Date();
    var currentCalendar = moment(date).format('l');
    var currentdayServer = currentCalendar.split('/');
    // console.log("Month : " + currentdayServer[0]);
    // console.log("Day : " + currentdayServer[1]);
    // console.log("Year : " + currentdayServer[2]);
    if(Labs.find({}).count() > 0){
      Labs.find({}).map(function(labItem){
        var labId = labItem._id;
        var labPeriod = labItem.periodTime;
        var labMailCheck = labItem.mailSended;
        var labSplitted = labPeriod.split('/');
        if(((labSplitted[0] - currentdayServer[0]) == 0) && ((labSplitted[1] - currentdayServer[1]) == 7)){
          if(!labMailCheck) {
            var labName = labItem.labName;
            var labchargehandName = labItem.chargehandName;
            var labchargehandAddress = labItem.chargehandAddress;
            var mail = labchargehandName + " " + labName + "' in Periodik bakimina 1 hafta kalmistir";
            Meteor.call('sendEmail', labchargehandAddress, 'labcontrolmaltepe@gmail.com', "Lab Control", mail, function(err, result){
              if(!result){
                console.log("Mail can not send at this time");
              }
              else{
                Labs.update({
                  _id : labId
                }, {
                  $set : {
                    mailSended : true,
                    mailSendTime : currentCalendar
                  }
                })
                console.log("Mail sended");

              }
            });

          }
          else{
            console.log("labMailCheck false so Mail Already sended");
          }
        }
        else{
          console.log("have 7+ more days");
        }
      })

    }

    if(Cinevisions.find({}).count() > 0){
      Cinevisions.find({}).map(function(cinevisionItem){
        var cinevisionPeriod = cinevisionItem.periodTime;
        var cinevisionMailCheck = cinevisionItem.mailSended;
        var cinevisionSplitted = cinevisionPeriod.split('/');
        if(((cinevisionSplitted[0] - currentdayServer[0]) == 0) && ((cinevisionSplitted[1] - currentdayServer[1]) == 7)){
          if(!cinevisionMailCheck) {
            var cinevisionId = cinevisionItem._id;
            var cinevisionLabId = cinevisionItem.labId;
            var cinevisionLab = Labs.findOne({_id : cinevisionLabId});
            var cinevisionLabName = cinevisionLab.labName;
            var cinevisionLabchargeHandName = cinevisionLab.chargehandName;
            var cinevisionLabchargeHandAddress = cinevisionLab.chargehandAddress;
            var cinevisionName = cinevisionItem.cinevisionName;

            var mail = cinevisionLabchargeHandName + " " + cinevisionLabName + " 'deki " + cinevisionName + " sinevizyonunun Periodik bakimina 1 hafta kalmistir";
            Meteor.call('sendEmail', cinevisionLabchargeHandAddress, 'labcontrolmaltepe@gmail.com', "Cinevision Control", mail, function(err, result){
              if(!result){
                console.log("Mail can not send at this time");
              }
              else{
                Cinevisions.update({
                  _id : cinevisionId
                }, {
                  $set : {
                    mailSended : true,
                    mailSendTime : currentCalendar
                  }
                })
                console.log("Mail sended");

              }
            });

          }
          else{
            console.log("cinevisionMailCheck false so Mail Already sended");
          }
        }
        else{
          console.log("have 7+ more days");
        }
      })
    }

    if(Computers.find({}).count() > 0){
      Computers.find({}).map(function(computerItem){
        var computersPeriod = computerItem.periodTime;
        var computerMailCheck = computerItem.mailSended;
        var computerSplitted = computersPeriod.split('/');
        if(((computerSplitted[0] - currentdayServer[0]) == 0) && ((computerSplitted[1] - currentdayServer[1]) == 7)){
          if(!computerMailCheck) {
            var computerId = computerItem._id;
            var computerLabId = computerItem.labId;
            var computerLab = Labs.findOne({_id : computerLabId});
            var computerLabName = computerLab.labName;
            var computerLabchargeHandName = computerLab.chargehandName;
            var computerLabchargeHandAddress = computerLab.chargehandAddress;
            var computerName = computerItem.computerName;

            var mail = "Ilgili " + computerLabchargeHandName + " " + computerLabName + " 'deki " + computerName + " bilgisayarinin Periodik bakimina 1 hafta kalmistir";
            Meteor.call('sendEmail', computerLabchargeHandAddress, 'labcontrolmaltepe@gmail.com', "Computer Control", mail, function(err, result){
              if(!result){
                console.log("Mail can not send at this time");
              }
              else{
                Computers.update({
                  _id : computerId
                }, {
                  $set : {
                    mailSended : true,
                    mailSendTime : currentCalendar
                  }
                })
                console.log("Mail sended");

              }
            });

          }
          else{
            console.log("computerMailCheck false so Mail Already sended");
          }
        }
        else{
          console.log("have 7+ more days");
        }
      })
    }


    if(Softwares.find({}).count() > 0){
      Softwares.find({}).map(function(softwareItem){
        var softwaresPeriod = softwareItem.periodTime;
        var softwareMailCheck = softwareItem.mailSended;
        var softwareSplitted = softwaresPeriod.split('/');
        if(((softwareSplitted[0] - currentdayServer[0]) == 0) && ((softwareSplitted[1] - currentdayServer[1]) == 7)){
          if(!softwareMailCheck) {
            var softwareId = softwareItem._id;
            var softwareComputerId = softwareItem.computerId;
            var softwareComputer = Computers.findOne({_id : softwareComputerId});
            var softwareComputerName = softwareComputer.computerName;
            var softwareLab = Labs.findOne({_id : softwareComputer.labId});
            var softwareLabName = softwareLab.labName;
            var softwareLabchargeHandName = softwareLab.chargehandName;
            var softwareLabchargeHandAddress = softwareLab.chargehandAddress;
            var softwareName = softwareItem.softwareName;

            var mail = "Ilgili " + softwareLabchargeHandName + " " + softwareLabName + " 'deki " + softwareComputerName + " bilgisayarinin " + softwareName + " inin Periodik bakimina 1 hafta kalmistir";
            Meteor.call('sendEmail', softwareLabchargeHandAddress, 'labcontrolmaltepe@gmail.com', "Software Control", mail, function(err, result){
              if(!result){
                console.log("Mail can not send at this time");
              }
              else{
                Softwares.update({
                  _id : softwareId
                }, {
                  $set : {
                    mailSended : true,
                    mailSendTime : currentCalendar
                  }
                })
                console.log("Mail sended");

              }
            });

          }
          else{
            console.log("softwareMailCheck false so Mail Already sended");
          }
        }
        else{
          console.log("have 7+ more days");
        }
      })
    }


  }, 15000); /* Can change server periodic control in ms */
})

Meteor.methods({
  sendEmail : function(to, from, subject, text){
    check([to, from, subject, text], [String]);

    this.unblock();
    /* we use try catch for if mail successfully send or return false */
    try{
      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
      return true;
    }
    catch(err){
      return false;
    }
  }
})
