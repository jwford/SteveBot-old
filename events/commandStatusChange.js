module.exports = (guild, command, enabled) => {
  if (enabled === false) {
    console.log(`${command} disabled in ${guild.name}.`);
  } else console.log(`${command} enabled in ${guild.name}`);
};
