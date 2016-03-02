Router.configure({
  loadingTemplate : 'loading'
});

Router.route('/', {
  layoutTemplate : 'homeLayout',
  template : 'home',
  name : 'home'
});

Router.route('/labs', {
  layoutTemplate : 'labsLayout',
  template : 'labs',
  name : 'labs'
});

Router.route('/labEdit/:_id', {
  layoutTemplate : 'labEditLayout',
  template : 'labEdit',
  name : 'lab.Edit',
});

Router.route('labView/:_id', {
  layoutTemplate : 'labViewLayout',
  template : 'labView',
  name : 'lab.View'
})
