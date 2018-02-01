# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Overwatch 	https://static-cdn.jtvnw.net/ttv-boxart/Overwatch-285x380.jpg	https://www.amazon.com/Overwatch-Game-Year-PlayStation-4/dp/B0733HQQQP/
# May 23@ 2016	Blizzard Entertainment	Blizzard Entertainment	PC PlayStation 4 Xbox One	General Action Shooter First-Person Tactical	T	Overwatch is a highly stylized team-based shooter set on earth in the near future. Every match is an intense multiplayer showdown pitting a diverse cast of soldiers@ mercenaries@ scientists@ adventurers@ and oddities against each other in an epic@ globe-spanning conflict.

require 'csv'

user = User.new
user.username = "patrick"
user.password = "password"
user.save

PLATFORMS = {
  'PlayStation 4' => 'PS4',
  'Xbox One' => 'XB1',
  'Switch' => 'SW',
  'Xbox 360' => 'XB360',
  'PlayStation 2' => 'PS2',
  'PlayStation' => 'PS1',
  'PC' => 'PC',
  'iOS' => 'iOS',
  'iPhone/iPad' => 'iOS',
  'Game Boy Advance' => 'GBA',
  'PlayStation Vita' => 'PSV',
  'Wii' => 'Wii',
  'Wii U' => 'WU',
  '3DS' => '3DS',
  'Gamecube' => 'GC',
  'Nintendo 64' => 'N64',
  'DS' => 'DS',
  'GameCube' => 'GC',
}

PLATFORMS.each do |platform, abreviation|
  Platform.create(name: platform, abreviation: abreviation)
end

GENRES = {
  'Role-Playing' => 'RPG',

  'MOBA' => 'MOBA',
  'First-Person' => 'FPS',

  'Adventure' => 'Adventure',
  'Open-World' => 'Open-World',
  'Massively-Multiplayer' => 'MMO',
  'Real-Time' => 'RTS',
  'Sports' => 'Sports',
  'Sim' => 'Simulation',
  'Arcade' => 'Arcade',
  'Sandbox' => 'Sandbox',
  'Card Battle' => 'Card Battle',
  'Survival' => 'Survival',
  'Fighting' => 'Fighting',
  'Platformer' => 'Platformer',
  'Shooter' => 'Shooter',
  'Third-Person' => 'Third-Person',
  'Simulation' => 'Simulation',
  'RPG' => 'RPG',
  'Fantasy' => 'Fantasy',
  'Rhythm' => 'Rhythm',
  'Dancing' => 'Dancing',
  'Action' => 'Action',
  'Space' => 'Space',
  'Visual Novel' => 'Visual Novel',
  'Racing' => 'Racing',
  'Flight' => 'Flight',
  'Music' => 'Music',
  'Puzzle' => 'Puzzle',
  'Sci-Fi' => 'Sci-Fi',
  'Turn Based' => 'Turn Based',
  'Horror' => 'Horror',
}

csv_text = File.read(Rails.root.join('lib', 'seeds', 'seeddata.csv')).scrub
csv = CSV.parse(csv_text, headers: true, encoding: 'UTF-8')

csv.each_with_index do |row, idx|
  if idx == 208
    break
  end
  game = Game.new
  row
  game.title = row['title'][0...-1]
  if row['release date'].include?('@')
    'hi'
    game.release_date = row['release date'].gsub!('@', ',')
  else
    'bye'
    game.release_date = row['release date']
  end

  if row['description'].include?('@')
    game.description = row['description'].gsub!('@', ',')
  else
    game.description = row['description']
  end
  game.image_url = row['image_url']
  game.amazon_url = row['amazon url']
  game.rating = row['rating']



  developer = Developer.find_by(name: row['developer'])
  if developer
    game.developer_id = developer.id
  else
    developer = Developer.create(name: row['developer'])
    game.developer_id = developer.id
  end
  if !game.save
    p game
    p game.errors.full_messages
  end

  PLATFORMS.each_key do |platform|
    if row['platforms'].include?(platform)
      platformObj = Platform.find_by(name: platform)
      PlatformGame.create(game_id: game.id, platform_id: platformObj.id)
    end
  end

  # GENRES.each_key do |genre|
  #   if row[' genres'].include?(genre)
  #
  #   end
  # end


end

want_to_read = Collection.create(name: "Want to Play", user_id: user.id)
have_played = Collection.create(name: "Have Played", user_id: user.id)
playing = Collection.create(name: "Playing", user_id: user.id)
my_favorites = Collection.create(name: "My Favorites", user_id: user.id)

CollectionGame.create(game_id: 1, collection_id: 1)
CollectionGame.create(game_id: 1, collection_id: 2)
CollectionGame.create(game_id: 1, collection_id: 3)
CollectionGame.create(game_id: 1, collection_id: 4)



blizzard = Developer.create(name: "Blizzard Entertainment")
