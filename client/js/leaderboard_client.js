PlayersList = new Mongo.Collection('players');
Meteor.subscribe('thePlayers');


// ========================================== //
//
// Template: Leaderboard
// HELPERS
//
// ========================================== //
Template.leaderboard.helpers({
  'player': function(){
    var currentUserId = Meteor.userId();
    // could remove createdBy: below since user already has to be logged in
    // but wanted to keep for reference
    return PlayersList.find({createdBy: currentUserId}, {sort: {score:-1, name:1 }});
  },
  'selectedClass': function(){
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if (playerId == selectedPlayer){
      return "selected"
    }
  },
  'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer)
  }
});


// ========================================== //
//
// Template: Leaderboard
// EVENTS
//
// ========================================== //
Template.leaderboard.events({
  'click .player': function(){
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
  },
  'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, 5)
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -5)
  },
  'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removePlayerData', selectedPlayer);
  }
});


// ========================================== //
//
// Template: Add Player Form
// EVENTS
//
// ========================================== //
Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;    // value of input
    event.target.playerName.value = "";                   // clear out input
    //Meteor.call('sendLogMessage');
    Meteor.call('insertPlayerData', playerNameVar);
  }
});



