const User = require('./user')
const Channel = require('./channel')
const Tag = require('./tag')
const UserData = require('./userData')
const SongHistory = require('./songHistory')
const Song = require('./song')
const Address = require('./address')
const HistoricalPlayList = require('./historicalPlayList')
const Message = require('./message')

//Owns a Channel
Channel.belongsTo(User, {as: 'owner'})
User.hasMany(Channel, {
  foreignKey: 'ownerId',
  sourceKey: 'id',
  as: 'ownedChannels'
})

//Favorites
Channel.belongsToMany(User, {as: 'enthusiast', through: 'favorites'})
User.belongsToMany(Channel, {as: 'favoriteChannel', through: 'favorites'})
//Associate Tags
Channel.belongsToMany(Tag, {through: 'ChannelTag'})
Tag.belongsToMany(Channel, {through: 'ChannelTag'})
//Collect User Data
UserData.belongsTo(User)

// create association between user and address
User.belongsTo(Address)
Address.hasMany(User)

Channel.hasMany(Song, {as: 'trackQueue'})

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
})

User.hasMany(Message)

Message.belongsTo(Channel)
Message.belongsTo(User)

SongHistory.belongsTo(User)
SongHistory.belongsTo(Song)
SongHistory.belongsTo(Channel)

module.exports = {
  User,
  Channel,
  Tag,
  UserData,
  SongHistory,
  Song,
  HistoricalPlayList,
  Message
}
