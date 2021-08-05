/* eslint @typescript-eslint/quotes: 0 */

export interface PriceCopy {
  /**
   * @example 'TSLA-USD'
   */
  id: string
  /**
   * price ticker type
   */
  type: 'CRYPTO' | 'FOREX' | 'COMMODITY' | 'STOCKS'
  /**
   * Icon with at least size of 100x100.png, must be symmetric.
   * To be placed in cms/prices/images/* directory.
   * @example you can use https://icons8.com/icons/set/tesla are free because they are copyrighted images
   */
  icon: string
  /**
   * Long company name with a lot of incorporated text, affiliations, groups of companies.
   */
  description: string
}

export const PRICES: Record<string, PriceCopy> = {
  'TSLA-USD': {
    id: 'TSLA-USD',
    type: 'STOCKS',
    description: 'Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla\'s current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services.',
    icon: 'cms/prices/images/tesla.png'
  },
  'XCU-USD': {
    id: 'XCU-USD',
    type: 'COMMODITY',
    description: `Copper is a chemical element with the symbol Cu (from Latin: cuprum) and atomic number 29. It is a soft, malleable, and ductile metal with very high thermal and electrical conductivity. A freshly exposed surface of pure copper has a pinkish-orange color. Copper is used as a conductor of heat and electricity, as a building material, and as a constituent of various metal alloys, such as sterling silver used in jewelry, cupronickel used to make marine hardware and coins, and constantan used in strain gauges and thermocouples for temperature measurement.`,
    icon: 'cms/prices/images/xcu.png'
  },
  'XAU-USD': {
    id: 'XAU-USD',
    type: 'COMMODITY',
    description: 'Gold is a chemical element with the symbol Au and atomic number 79, making it one of the higher atomic number elements that occur naturally. In a pure form, it is a bright, slightly reddish yellow, dense, soft, malleable, and ductile metal. Chemically, gold is a transition metal and a group 11 element.',
    icon: 'cms/prices/images/xau.png'
  },
  'XAG-USD': {
    id: 'XAG-USD',
    type: 'COMMODITY',
    description: `Silver is a chemical element with the symbol Ag (from the Latin argentum, derived from the Proto-Indo-European h₂erǵ: "shiny" or "white") and atomic number 47. A soft, white, lustrous transition metal, it exhibits the highest electrical conductivity, thermal conductivity, and reflectivity of any metal.[4][5] The metal is found in the Earth's crust in the pure, free elemental form ("native silver"), as an alloy with gold and other metals, and in minerals such as argentite and chlorargyrite.`,
    icon: 'cms/prices/images/xag.png'
  },
  'SGD-USD': {
    id: 'SGD-USD',
    type: 'FOREX',
    description: 'Singapore Dollar',
    icon: 'cms/prices/images/sgd.png'
  },
  'EUR-USD': {
    id: 'EUR-USD',
    type: 'FOREX',
    description: 'The Euro',
    icon: 'cms/prices/images/eur.png'
  },
  'BCO-USD': {
    id: 'BCO-USD',
    type: 'COMMODITY',
    description: 'Brent Crude Oil',
    icon: 'cms/prices/images/bco.png'
  },
  'UBER-USD': {
    id: 'UBER-USD',
    type: 'STOCKS',
    description: 'Uber. We believe deeply in our bold mission. Every minute of every day, consumers and Drivers on our platform can tap a button and get a ride or tap a button and get work. We revolutionized personal mobility with Ridesharing, and we are leveraging our platform to redefine the massive meal delivery and logistics industries. While we have had unparalleled growth at scale, we are just getting started: only 2% of the population in the 63 countries where we operate used our offerings in the quarter ended December 31, 2018, based on MAPCs.',
    icon: 'cms/prices/images/uber.png'
  },
  'GME-USD': {
    id: 'GME-USD',
    type: 'STOCKS',
    description: 'GameStop, a Fortune 500 company headquartered in Grapevine, Texas, is a leading specialty retailer offering games and entertainment products through its E-Commerce properties and thousands of stores. Visit www.GameStop.com to explore our products and offerings. Follow @GameStop and @GameStopCorp on Twitter and find us on Facebook at www.facebook.com/GameStop.',
    icon: 'cms/prices/images/gme.png'
  },
  'AMD-USD': {
    id: 'AMD-USD',
    type: 'STOCKS',
    description: `Advanced Micro Devices, Inc. (AMD) is a global semiconductor company with facilities around the world. The Company offers x86 microprocessors, as standalone devices or as incorporated as an accelerated processing unit (APU), for the commercial and consumer markets, embedded microprocessors for commercial, commercial client and consumer markets and chipsets for desktop and mobile devices, including mobile personal computers, or PCs, and tablets, professional workstations and servers and graphics, video and multimedia products for desktop and mobile devices, including mobile PCs and tablets, home media PCs and professional workstations, servers and technology for game consoles. In September 2013, Advanced Micro Devices Inc announced that its Singapore subsidiary, Advanced Micro Devices (Singapore) Pte Ltd. completed a transaction to sell and lease-back its Singapore facility located at 508 Chai Chee Lane, Singapore 469032 to HSBC Institutional Trust Services (Singapore) Limited.`,
    icon: 'cms/prices/images/amd.png'
  },
  'TWTR-USD': {
    id: 'TWTR-USD',
    type: 'STOCKS',
    description: 'TWTR. Twitter is what\'s happening and what people are talking about right now.',
    icon: 'cms/prices/images/twtr.png'
  },
  'NVDA-USD': {
    id: 'NVDA-USD',
    type: 'STOCKS',
    description: `NVIDIA ’s invention of the GPU in 1999 sparked the growth of the PC gaming market and has redefined modern computer graphics, high performance computing and artificial intelligence. The company’s pioneering work in accelerated computing and AI is reshaping trillion-dollar industries, such as transportation, healthcare and manufacturing, and fueling the growth of many others.`,
    icon: 'cms/prices/images/nvda.png'
  },
  'MSTR-USD': {
    id: 'MSTR-USD',
    type: 'STOCKS',
    description: `MicroStrategy is the largest independent publicly-traded analytics and business intelligence company. The MicroStrategy analytics platform is consistently rated as the best in enterprise analytics and is used by many of the world’s most admired brands in the Fortune Global 500. We pursue two corporate strategies: (1) grow our enterprise analytics software business to promote our vision of Intelligence Everywhere and (2) acquire and hold bitcoin, which we view as a dependable store of value supported by a robust, public, open-source architecture untethered to sovereign monetary policy.`,
    icon: 'cms/prices/images/mstr.png'
  },
  'GOOGL-USD': {
    id: 'GOOGL-USD',
    type: 'STOCKS',
    description: `Google Inc. (Google) is a global technology company. The Company's business is primarily focused around key areas, such as search, advertising, operating systems and platforms, enterprise and hardware products. The Company generates revenue primarily by delivering online advertising. The Company also generates revenues from Motorola by selling hardware products. The Company provides its products and services in more than 100 languages and in more than 50 countries, regions, and territories. Effective May 16, 2014, Google Inc acquired Quest Visual Inc. Effective May 20, 2014, Google Inc acquired Enterproid Inc, doing business as Divide. In June 2014, Google Inc acquired mDialog Corp. Effective June 25, 2014, Google Inc acquired Appurify Inc, a San Francisco-based developer of mobile bugging application software.`,
    icon: 'cms/prices/images/googl.png'
  },
  'FB-USD': {
    id: 'FB-USD',
    type: 'STOCKS',
    description: `Facebook, Inc. (Facebook) is engaged in building products to create utility for users, developers, and advertisers. People use Facebook to stay connected with their friends and family, to discover what is going on in the world around them, and to share and express what matters to them to the people they care about. Developers can use the Facebook Platform to build applications and Websites that integrate with Facebook to reach its global network of users and to build personalized and social products. Advertisers can engage with more than 900 million monthly active users (MAUs) on Facebook or subsets of its users based on information they have chosen to share with the Company, such as their age, location, gender, or interests. In September 2013, Mail.Ru Group Limited sold its remaining shares in Facebook Inc. Effective September 25, 2013, Facebook Inc acquired Mobile Technologies, a developer of online applications. In October 2013, Facebook Inc acquired Onavo Inc.`,
    icon: 'cms/prices/images/fb.png'
  },
  'COIN-USD': {
    id: 'COIN-USD',
    type: 'STOCKS',
    description: `Coinbase is building the cryptoeconomy – a more fair, accessible, efficient, and transparent financial system enabled by crypto. The company started in 2012 with the radical idea that anyone, anywhere, should be able to easily and securely send and receive Bitcoin. Today, Coinbase offers a trusted and easy-to-use platform for accessing the broader cryptoeconomy.`,
    icon: 'cms/prices/images/coin.png'
  },
  'AMZN-USD': {
    id: 'AMZN-USD',
    type: 'STOCKS',
    description: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Amazon strives to be Earth’s Most Customer-Centric Company, Earth’s Best Employer, and Earth’s Safest Place to Work. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire TV, Amazon Echo, Alexa, Just Walk Out technology, Amazon Studios, and The Climate Pledge are some of the things pioneered by Amazon.',
    icon: 'cms/prices/images/amzn.png'
  },
  'AAPL-USD': {
    id: 'AAPL-USD',
    type: 'STOCKS',
    description: `Apple Inc. (Apple) designs, manufactures and markets mobile communication and media devices, personal computers, and portable digital music players, and a variety of related software, services, peripherals, networking solutions, and third-party digital content and applications. The Company's products and services include iPhone, iPad, Mac, iPod, Apple TV, a portfolio of consumer and professional software applications, the iOS and OS X operating systems, iCloud, and a variety of accessory, service and support offerings. The Company also delivers digital content and applications through the iTunes Store, App StoreSM, iBookstoreSM, and Mac App Store. The Company distributes its products worldwide through its retail stores, online stores, and direct sales force, as well as through third-party cellular network carriers, wholesalers, retailers, and value-added resellers. In February 2012, the Company acquired app-search engine Chomp.`,
    icon: 'cms/prices/images/aapl.png'
  },
  'OTGLY-USD': {
    id: 'OTGLY-USD',
    type: 'STOCKS',
    description: 'CD Projekt S.A. ADR',
    icon: 'cms/prices/images/otgly.png'
  }
}

export function getPriceCopy (id: string): PriceCopy | undefined {
  return PRICES[id]
}
