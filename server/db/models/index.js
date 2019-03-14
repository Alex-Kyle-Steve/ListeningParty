const User = require('./user')
const Channel = require('./channel')
const Tag = require('./tag')
const UserData = require('./userData')
const SongHistory = require('./songHistory')
const Song = require('./song')
const HistoricalPlayList = require('./historicalPlayList')

Channel.belongsTo(User)

Channel.belongsToMany(Tag, {through: 'ChannelTag'})
Tag.belongsToMany(Channel, {through: 'ChannelTag'})

UserData.belongsTo(User)

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
