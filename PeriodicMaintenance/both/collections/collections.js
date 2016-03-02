Schema = {};

Labs = new Mongo.Collection('Labs');

Schema.Lab = new SimpleSchema({
  labName : {
    type : String,
    label : "Laboratory Name"
  },

  periodTime : {
    type : String,
    label : "Lab Maintenance Time"
  },

  periodTimeRoutine : {
    type : Boolean,
    optional : true
  },

  chargehandName : {
    type : String,
    label : "Chargehand Name"
  },

  chargehandAddress : {
    type : String,
    label : "Chargehand e-mail address",
    regEx : SimpleSchema.RegEx.Email
  },

  createdAt : {
    type : Date,
    autoValue : function(){
      if(this.isInsert){
        return new Date();
      }
    }
  }
});

Labs.attachSchema(Schema.Lab, {replace : true});

Cinevisions = new Mongo.Collection('Cinevisions');

Schema.Cinevision = new SimpleSchema({
  /* from Labs table */
  labId : {
    type : String
  },

  cinevisionName : {
    type : String
  },

  periodTime : {
    type : Date,
    label : "Cinevision Maintenance Period",
    optional : true
  },

  chargehandName : {
    type : String,
    label : "Chargehand Name",
    optional : true
  },

  chargehandAddress : {
    type : String,
    label : "Chargehand e-mail address",
    regEx : SimpleSchema.RegEx.Email,
    optional : true
  }
})

Cinevisions.attachSchema(Schema.Cinevision, {replace : true});

Computers = new Mongo.Collection('Computers');

Schema.Computer = new SimpleSchema({
    /* from Labs table */
    labId : {
      type : String,
      optional : true
    },

    computerName : {
      type : String,
      optional : true
    },

    periodTime : {
      type : Date,
      label : "Computer Maintenance Period",
      optional : true
    },

    chargehandName : {
      type : String,
      label : "Chargehand Name",
      optional : true
    },

    chargehandAddress : {
      type : String,
      label : "Chargehand e-mail address",
      regEx : SimpleSchema.RegEx.Email,
      optional : true
    }

});

Computers.attachSchema(Schema.Computer, {replace : true});

Softwares = new Mongo.Collection('Softwares');

Schema.Software = new SimpleSchema({
  /* From Computers Table */
  computerId : {
    type : String,
    optional : true
  },

  softwareName : {
    type : String,
    optional : true
  },

  periodTime : {
    type : Date,
    label : "Software Maintenance Period",
    optional : true
  },

  chargehandName : {
    type : String,
    label : "Chargehand Name",
    optional : true
  },

  chargehandAddress : {
    type : String,
    label : "Chargehand e-mail address",
    regEx : SimpleSchema.RegEx.Email,
    optional : true
  }
})

Softwares.attachSchema(Schema.Software, {replace : true});
