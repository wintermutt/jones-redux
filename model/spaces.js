// https://jonesinthefastlane.fandom.com/wiki/Economy#Item_Prices

export default [
  {name: 'Luxury Condo', background: '#917859', internalBackground: '#ccc'},
  {
    name: 'Rent Office',
    background: '#708ae2',
    internalBackground: '#a1e2a1'
    // Rent Low-Cost Apartment: 568
    // Rent Security Apartment: 830
  },
  {name: 'Low-Cost Housing', background: '#8282c9', internalBackground: '#ccc'},
  {name: 'Pawn Shop', background: '#279b77', internalBackground: '#51a281'},
  {
    name: 'Discount Store',
    background: '#689148',
    internalBackground: '#82d2b8',
    products: [
      {name: 'Stereo', price: 787},
      {name: 'VCR', price: 437},
      {name: 'Baseball Tickets', price: 78},
      {name: 'Theatre Tickets', price: 52},
      {name: 'Encyclopedia', price: 830},
      {name: 'Dog Food', price: 30}
    ]
  },
  {
    name: "Mr. Ronald's",
    background: '#fa6a49',
    internalBackground: '#f8dd91',
    portrait: 'mr-ronalds.jpg',
    welcome: "Welcome to Mr. Ronald's. Not affiliated with McDowell's: they have the Big Mick, we have the Big Max!",
    products: [
      {name: 'Hamburger', price: 137},
      {name: 'Cheeseburger', price: 155},
      {name: 'Big Max', price: 216},
      {name: 'Mr. Fries', price: 113},
      {name: 'Mr. Shake', price: 178},
      {name: 'Cola', price: 120}
    ]
  },
  {
    name: 'Clothing Store',
    background: '#d19159',
    internalBackground: '#99bbe1',
    products: [
      {name: 'Business Suit', price: 515},
      {name: 'Dress Clothes', price: 218},
      {name: 'Casual Clothes', price: 127}
    ]
  },
  {name: '', background: '#1f7860'},
  {
    name: 'Appliance Store',
    background: '#5991e2',
    internalBackground: '#bad3fa',
    products: [
      {name: 'Refrigerator', price: 1532},
      {name: 'Freezer', price: 897},
      {name: 'Stove', price: 997},
      {name: 'Color TV', price: 918},
      {name: 'VCR', price: 582},
      {name: 'Stereo', price: 720},
      {name: 'Microwave', price: 577},
      {name: 'Hot Tub', price: 2195},
      {name: 'Computer', price: 2797}
    ]
  },
  {
    name: 'University',
    background: '#e28141',
    internalBackground: '#cbe2fa'
    // Enrollment: 87
  },
  {name: '', background: '#499859'},
  {
    name: 'Employment Office',
    background: '#3881a8',
    internalBackground: '#8ad19a',
    welcome: "Welcome to ACNE Employment. We'll find you a job, no matter what it costs you!"
  },
  {
    name: 'Vandelay Industries',
    portrait: 'vandelay-industries.jpg',
    background: '#8282c9',
    internalBackground: '#1f7860',
    welcome: 'Welcome to Vandelay Industries. We manufacture latex and latex-related goods.'
  },
  {
    name: 'Bank',
    background: '#49a849',
    internalBackground: '#9aaab0'
    // Stocks (https://jonesinthefastlane.fandom.com/wiki/Stock_Market):
    // Gold: 206-1032
    // Silver: 7-35
    // Pork Bellies: 10-50
    // Blue Chip Stocks: 24-122
    // Penny Stocks: 3-17
  },
  {
    name: 'Grocery Store',
    background: '#e27182',
    internalBackground: '#dacbe1',
    products: [
      {name: 'Food for 1 Week', price: 95},
      {name: 'Food for 2 Weeks', price: 175},
      {name: 'Food for 4 Weeks', price: 332},
      {name: '10 Lottery Tickets', price: 10},
      {name: 'Newspaper', price: 1}
    ]
  },
  {name: '', background: '#499969'}
]