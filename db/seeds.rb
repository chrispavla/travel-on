puts 'Creating users...'

user1 = User.create!(first_name: 'Kristina', last_name: 'Hodges', username: 'chrispavla', password: '12345', profile_image: 'https://avatars.githubusercontent.com/u/105557320?v=4')
user2 = User.create!(first_name: 'Brooke', last_name: 'Jones', username: 'brookejones', password: '12345', profile_image: 'https://ca.slack-edge.com/T02MD9XTF-UK933ECJJ-6c26a3d655a5-512')
user3 = User.create!(first_name: 'Wendy', last_name: 'You', username: 'wendyou', password: '12345', profile_image: 'https://ca.slack-edge.com/T02MD9XTF-U03MPL33L94-4f84fbf9feec-512')
user4 = User.create!(first_name: 'Quinn', last_name: 'Sissler', username: 'qsissler', password: '12345', profile_image: 'https://ca.slack-edge.com/T02MD9XTF-U03N398356G-72cb4ffe06a1-512')
user5 = User.create!(first_name: 'Sheena', last_name: 'Sang', username: 'sheenasang', password: '12345', profile_image: 'https://ca.slack-edge.com/T02MD9XTF-U03KAJXPFLG-2453f5049f44-512')

puts 'Creating locations...'

location1 = Location.create!(city: 'Paris', country: 'France', latitude: '48.8566', longitude: '2.3522')
location2 = Location.create!(city: 'Berlin', country: 'Germany', latitude: '52.5200', longitude: '13.4050')
puts 'Creating point of interests...'

poi1 = PointOfInterest.create!(name: 'Comice', image: 'https://cdn.vox-cdn.com/thumbor/XqpSEwFSB7Z2GAh5zBk3KpbU-Fs=/0x0:1080x747/1670x1253/filters:focal(454x288:626x460):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62565863/35145200_1016301748535631_6415537283058892800_o.0.0.jpg', note: 'This restaurant is an absolute MUST, especially if it is your first time in Paris.', user_id: user1.id, location_id: location1.id, category: 'Food')
poi2 = PointOfInterest.create!(name: 'l’Huîtrerie Régis', image: 'https://cdn.vox-cdn.com/thumbor/Dz8N7vbRinoHIRu1PRDs7h9-y4s=/0x0:960x960/1820x1365/filters:focal(404x404:556x556):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62565859/13529244_1124765120917398_4396483372878838270_n.0.0.jpg', note: 'Raw bar in the heart of Saint-Germain-des-Prés is a pearl, and it serves the best bivalves in Paris..', user_id: user1.id, location_id: location1.id, category: 'Food')
poi3 = PointOfInterest.create!(name: 'Paris Marriott Champs Elysees Hotel', image: 'https://images.trvl-media.com/hotels/1000000/70000/63400/63330/w3989h2667x5y0-abf0e6ae.jpg?impolicy=resizecrop&rw=1200&ra=fit', note: 'Very classy hotel right in the heart of the Champs Elysees. Walk out the from door to shopping, dining, and the hustle and bustle of Paris.', user_id: user1.id, location_id: location1.id, category: 'Hotel')
poi4 = PointOfInterest.create!(name: 'Hôtel Barrière Fouquet Paris', image: 'https://images.trvl-media.com/hotels/1000000/20000/19500/19460/25bd4f9c.jpg?impolicy=resizecrop&rw=1200&ra=fit', note: 'Barrirer Le Fourqets is one of the best hotels i have stayed at in my life. Hotel service is beyond 5 stars and the location in the heart of the city at Champs Elyses.', user_id: user2.id, location_id: location1.id, category: 'Hotel')
poi5 = PointOfInterest.create!(name: 'Arc de Triomphe', image: 'https://www.historyhit.com/app/uploads/2020/11/Arc-de-Triomphe.jpg', note: 'Every evening, the flame is lit on the tomb of the Unknown Soldier from the Great War. The terrace provides superb views both by day and night across the city and its great sweeping avenues.', user_id: user2.id, location_id: location1.id, category: 'Cultural attraction')
poi6 = PointOfInterest.create!(name: 'Eiffel Tower', image: 'https://i.insider.com/58d958617d1fb227008b4c7e?width=1067&format=jpeg', note: 'My family and I went to Paris in June/July and we loved the Eiffel Tower. We booked a 10:00 time slot ahead of time to see the city during the night and, if you’re able, I highly recommend walking up if you can because it has amazing views.', user_id: user3.id, location_id: location1.id, category: 'Cultural attraction')
poi7 = PointOfInterest.create!(name: 'The Basilica of the Sacred Heart of Paris', image: 'https://myprivateparis.com/wp-content/uploads/2019/11/pexels-constanze-marie-6664684-scaled-1.jpg', note: 'We were in awe of the beautiful architecture of Basilique du Sacre-Coeur during our recent trip to Paris, France. Pictures do not do justice to this building. Across was a wonderful view of the city below.', user_id: user4.id, location_id: location1.id, category: 'Cultural attraction')
poi8= PointOfInterest.create!(name: 'Restaurant Tim Raue', image: 'https://res.cloudinary.com/tf-lab/image/upload/restaurant/67fcb59d-018d-4e26-aa2a-e9fa7d93d477/4d6b10b8-6b56-4e10-b801-e68a3eb085d3.jpg', note: 'Charming decor and location, great service, extensive wine list', user_id: user1.id, location_id: location2.id, category: 'Food')
poi9 = PointOfInterest.create!(name: 'Park Inn by Radisson Berlin Alexanderplatz', image: 'https://ak-d.tripcdn.com/images/fd/hotelintl/g5/M09/B2/A7/CggYsVcuVuyAAMLQAAGG7z06GwQ789_R_1100_824_R5_Q70_D.jpg', note: 'Really nice hotel for staying in central Berlin.', user_id: user3.id, location_id: location2.id, category: 'Hotel')
poi10= PointOfInterest.create!(name: 'Wen Cheng Handpulled Noodles', image: 'https://cdn.vox-cdn.com/thumbor/OG0wPdGJvR131TDJQNddqVPUZF0=/0x0:3024x4032/1420x1065/filters:focal(1327x1327:1809x1809):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/70754025/PXL_20210606_134216257.PORTRAIT_01.0.jpeg', note: 'A little piece of China! Great! Long Queues after 5pm but they have another shop now @ Schönhauser Allee 10!', user_id: user5.id, location_id: location2.id, category: 'Food')
poi11 = PointOfInterest.create!(name: 'Berlin Wall', image: 'https://news.virginia.edu/sites/default/files/article_image/berlin_wall_da_header_3-2.jpg', note: 'The memorial is a stark reminder of German history and is highly informative.
I’d recommend a visit if you are interested in the history of Berlin and the wall.', user_id: user5.id, location_id: location2.id, category: 'Cultural attraction')
poi12= PointOfInterest.create!(name: 'Restaurant Facil', image: 'https://www.top10berlin.de/sites/top10berlin.de/files/location/mainimages/2018/09/12/top10berlin_gourmet-restaurants_facil_steve-herud001_0.jpg', note: 'FACIL is my favorite restaurant in the world right now. All the dishes were phenomenal and full of flavors. Very speechless with all the food and not to mention the good service and ambiance.', user_id: user2.id, location_id: location2.id, category: 'Food')
poi13 = PointOfInterest.create!(name: 'Hotel Adlon Kempinski Berlin', image: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/55/68/5568_v9.jpeg', note: 'The service is unparalleled from the minute you step off the taxi, they make sure you are well taken cared of. Walking into the hotel feels like walking through a time machine.', user_id: user4.id, location_id: location2.id, category: 'Hotel')

puts 'Seeding comments...'

comment1 = Comment.create!(comment: 'Amazing hotel. Thanks for the recommendation!', rating: 5, user_id: user1.id, point_of_interest_id: poi4.id)
comment2 = Comment.create!(comment: 'How busy are they on a weekend?', rating: 5, user_id: user2.id, point_of_interest_id: poi1.id)
commen3 = Comment.create!(comment: 'Will definitely stay there one day!', rating: 5, user_id: user3.id, point_of_interest_id: poi3.id)
comment4 = Comment.create!(comment: 'Love seafood!', rating: 5, user_id: user4.id, point_of_interest_id: poi2.id)

puts 'Done seeding!'

