// https://jonesinthefastlane.fandom.com/wiki/Economy#Item_Prices

export default [
  {name: 'Luxury Condo', background: '#917859', internalBackground: '#ccc'},
  {
    name: 'Rent Office',
    background: '#708ae2',
    internalBackground: '#a1e2a1'
    // Rent Low-Cost Apartment: 325
    // Rent Security Apartment: 475
  },
  {name: 'Low-Cost Housing', background: '#8282c9', internalBackground: '#ccc'},
  {name: 'Pawn Shop', background: '#279b77', internalBackground: '#51a281'},
  {
    name: 'Discount Store',
    background: '#689148',
    internalBackground: '#82d2b8',
    products: [
      {name: 'Refrigerator', price: 650},
      {name: 'Stove', price: 490},
      {name: 'Stereo', price: 450},
      {name: 'Color TV', price: 349},
      {name: 'Black & White TV', price: 110},
      {name: 'VCR', price: 250},
      {name: 'Encyclopedia', price: 475},
      {name: 'Dictionary', price: 70},
      {name: 'Atlas', price: 55},
      {name: 'Casual Clothes', price: 35},
      {name: 'Dress Clothes', price: 90},
      {name: 'Baseball Tickets', price: 45},
      {name: 'Theatre Tickets', price: 30},
      {name: 'Concert Tickets', price: 40},
      {name: 'Dog Food', price: 18},
      {name: '8-Track Player', price: 75},
      {name: 'Works of Capote', price: 100}
    ]
  },
  {
    name: "Mr. Ronald's",
    background: '#fa6a49',
    internalBackground: '#f8dd91',
    portrait: 'mr-ronalds.jpg',
    welcome: "Welcome to Mr. Ronald's. Not affiliated with McDowell's: they have the Big Mick, we have the Big Max!",
    products: [
      {name: 'Hamburger', price: 79},
      {name: 'Cheeseburger', price: 89},
      {name: 'Big Max', price: 124},
      {name: 'Mr. Fries', price: 65},
      {name: 'Mr. Shake', price: 102},
      {name: 'Cola', price: 69}
    ]
  },
  {
    name: 'Clothing Store',
    background: '#d19159',
    internalBackground: '#99bbe1',
    products: [
      {name: 'Business Suit', price: 295},
      {name: 'Dress Clothes', price: 125},
      {name: 'Casual Clothes', price: 73}
    ]
  },
  {name: '', background: '#1f7860'},
  {
    name: 'Appliance Store',
    background: '#5991e2',
    internalBackground: '#bad3fa',
    products: [
      {name: 'Refrigerator', price: 876},
      {name: 'Freezer', price: 513},
      {name: 'Stove', price: 570},
      {name: 'Color TV', price: 525},
      {name: 'VCR', price: 333},
      {name: 'Stereo', price: 412},
      {name: 'Microwave', price: 330},
      {name: 'Hot Tub', price: 1255},
      {name: 'Computer', price: 1599}
    ]
  },
  {
    name: 'University',
    background: '#e28141',
    internalBackground: '#cbe2fa',
    enrollment: 50
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
    welcome: "Welcome to Vandelay Industries, the world's largest manufacturer of latex and latex-related goods."
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
      {name: 'Food for 1 Week', price: 55},
      {name: 'Food for 2 Weeks', price: 100},
      {name: 'Food for 4 Weeks', price: 190},
      {name: '10 Lottery Tickets', price: 10},
      {name: 'Newspaper', price: 1}
    ]
  },
  {name: '', background: '#499969'}
]