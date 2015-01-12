PlayersList = new Mongo.Collection('players');

if (Meteor.isServer) {

  Meteor.methods({
    'sendLogMessage': function(){
      console.log('Hello from the server!');
    },
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer){
      PlayersList.remove(selectedPlayer);
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue){
      PlayersList.update(selectedPlayer, {$inc: {score: scoreValue}});
    }
  });

  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}


