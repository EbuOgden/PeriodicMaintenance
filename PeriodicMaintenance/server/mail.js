Meteor.startup(function(){
  process.env.MAIL_URL = 'smtp://labcontrolmaltepe@gmail.com:123asd321@smtp.gmail.com:465';
  /* TODO materials period time check for send e-mail
     Lab sorumlusu tum islemlerden sorumlu olacak software icin pcId uzerinden laba ulasip gerekli kisiye mail atilacak */

  // setInterval(function(){
  //   var date = new Date();
  //   var _time = moment(date).format('l');
  //   console.log(_time);
  // }, 500);
})
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
