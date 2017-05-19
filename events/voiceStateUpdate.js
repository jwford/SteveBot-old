const voiceChannels = require('../config.json').musicChannels;
const voiceRole = require('../config.json').musicRole;

module.exports = (oldMember, newMember) => {
  var role = newMember.guild.roles.find('name', voiceRole);
  if (!role) return console.log(`${newMember.guild.name} has no ${voiceRole} role.`);

  if (oldMember.voiceChannelID !== newMember.voiceChannelID) {
    for (var i = 0; i < voiceChannels.length; i++) {
      if (newMember.voiceChannelID === voiceChannels[i]) return newMember.addRole(role);
    }
    newMember.removeRole(role);
  }
};
