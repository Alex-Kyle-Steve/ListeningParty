const User = require('./user')
const Channel = require('./channel')
const Tag = require('./tag')
const UserData = require('./userData')
const SongHistory = require('./songHistory')
const Song = require('./song')
const Address = require('./address')
const HistoricalPlayList = require('./historicalPlayList')

//Owns a Channel
Channel.belongsTo(User, {as: 'owner'})
//Favorites
Channel.belongsToMany(User, {through: 'favorites'})
User.belongsToMany(Channel, {through: 'favorites'})
//Associate Tags
Channel.belongsToMany(Tag, {through: 'ChannelTag'})
Tag.belongsToMany(Channel, {through: 'ChannelTag'})
//Collect User Data
UserData.belongsTo(User)

// create association between user and address
User.belongsTo(Address)
Address.hasMany(User)

SongHistory.belongsTo(User)
SongHistory.belongsTo(Song)
SongHistory.belongsTo(Channel)

HistoricalPlayList.belongsTo(Song)
HistoricalPlayList.belongsTo(Channel)

module.exports = {
  User,
  Channel,
  Tag,
  UserData,
  SongHistory,
  Song,
  HistoricalPlayList
}
