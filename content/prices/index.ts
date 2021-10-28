/* eslint @typescript-eslint/quotes: 0 */

export interface PriceCopy {
    /**
     * @example 'TSLA-USD'
     */
    id: string
    /**
     * price ticker type
     */
    type: 'CRYPTO' | 'FOREX' | 'COMMODITY' | 'STOCKS' | 'ETF'
    /**
     * Icon with at least size of 100x100.png, must be symmetric.
     * To be placed in /src/cms/prices/images/* directory.
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
        icon: require('./images/tesla.png')
    },
    'XCU-USD': {
        id: 'XCU-USD',
        type: 'COMMODITY',
        description: `Copper is a chemical element with the symbol Cu (from Latin: cuprum) and atomic number 29. It is a soft, malleable, and ductile metal with very high thermal and electrical conductivity. A freshly exposed surface of pure copper has a pinkish-orange color. Copper is used as a conductor of heat and electricity, as a building material, and as a constituent of various metal alloys, such as sterling silver used in jewelry, cupronickel used to make marine hardware and coins, and constantan used in strain gauges and thermocouples for temperature measurement.`,
        icon: require('./images/xcu.png')
    },
    'XAU-USD': {
        id: 'XAU-USD',
        type: 'COMMODITY',
        description: 'Gold is a chemical element with the symbol Au and atomic number 79, making it one of the higher atomic number elements that occur naturally. In a pure form, it is a bright, slightly reddish yellow, dense, soft, malleable, and ductile metal. Chemically, gold is a transition metal and a group 11 element.',
        icon: require('./images/xau.png')
    },
    'XAG-USD': {
        id: 'XAG-USD',
        type: 'COMMODITY',
        description: `Silver is a chemical element with the symbol Ag (from the Latin argentum, derived from the Proto-Indo-European h₂erǵ: "shiny" or "white") and atomic number 47. A soft, white, lustrous transition metal, it exhibits the highest electrical conductivity, thermal conductivity, and reflectivity of any metal.[4][5] The metal is found in the Earth's crust in the pure, free elemental form ("native silver"), as an alloy with gold and other metals, and in minerals such as argentite and chlorargyrite.`,
        icon: require('./images/xag.png')
    },
    'SGD-USD': {
        id: 'SGD-USD',
        type: 'FOREX',
        description: 'Singapore Dollar',
        icon: require('./images/sgd.png')
    },
    'EUR-USD': {
        id: 'EUR-USD',
        type: 'FOREX',
        description: 'The Euro',
        icon: require('./images/eur.png')
    },
    'BCO-USD': {
        id: 'BCO-USD',
        type: 'COMMODITY',
        description: 'Brent Crude Oil',
        icon: require('./images/bco.png')
    },
    'UBER-USD': {
        id: 'UBER-USD',
        type: 'STOCKS',
        description: 'Uber. We believe deeply in our bold mission. Every minute of every day, consumers and Drivers on our platform can tap a button and get a ride or tap a button and get work. We revolutionized personal mobility with Ridesharing, and we are leveraging our platform to redefine the massive meal delivery and logistics industries. While we have had unparalleled growth at scale, we are just getting started: only 2% of the population in the 63 countries where we operate used our offerings in the quarter ended December 31, 2018, based on MAPCs.',
        icon: require('./images/uber.png')
    },
    'GME-USD': {
        id: 'GME-USD',
        type: 'STOCKS',
        description: 'GameStop, a Fortune 500 company headquartered in Grapevine, Texas, is a leading specialty retailer offering games and entertainment products through its E-Commerce properties and thousands of stores. Visit www.GameStop.com to explore our products and offerings. Follow @GameStop and @GameStopCorp on Twitter and find us on Facebook at www.facebook.com/GameStop.',
        icon: require('./images/gme.png')
    },
    'AMD-USD': {
        id: 'AMD-USD',
        type: 'STOCKS',
        description: `Advanced Micro Devices, Inc. (AMD) is a global semiconductor company with facilities around the world. The Company offers x86 microprocessors, as standalone devices or as incorporated as an accelerated processing unit (APU), for the commercial and consumer markets, embedded microprocessors for commercial, commercial client and consumer markets and chipsets for desktop and mobile devices, including mobile personal computers, or PCs, and tablets, professional workstations and servers and graphics, video and multimedia products for desktop and mobile devices, including mobile PCs and tablets, home media PCs and professional workstations, servers and technology for game consoles. In September 2013, Advanced Micro Devices Inc announced that its Singapore subsidiary, Advanced Micro Devices (Singapore) Pte Ltd. completed a transaction to sell and lease-back its Singapore facility located at 508 Chai Chee Lane, Singapore 469032 to HSBC Institutional Trust Services (Singapore) Limited.`,
        icon: require('./images/amd.png')
    },
    'TWTR-USD': {
        id: 'TWTR-USD',
        type: 'STOCKS',
        description: 'TWTR. Twitter is what\'s happening and what people are talking about right now.',
        icon: require('./images/twtr.png')
    },
    'NVDA-USD': {
        id: 'NVDA-USD',
        type: 'STOCKS',
        description: `NVIDIA ’s invention of the GPU in 1999 sparked the growth of the PC gaming market and has redefined modern computer graphics, high performance computing and artificial intelligence. The company’s pioneering work in accelerated computing and AI is reshaping trillion-dollar industries, such as transportation, healthcare and manufacturing, and fueling the growth of many others.`,
        icon: require('./images/nvda.png')
    },
    'MSTR-USD': {
        id: 'MSTR-USD',
        type: 'STOCKS',
        description: `MicroStrategy is the largest independent publicly-traded analytics and business intelligence company. The MicroStrategy analytics platform is consistently rated as the best in enterprise analytics and is used by many of the world’s most admired brands in the Fortune Global 500. We pursue two corporate strategies: (1) grow our enterprise analytics software business to promote our vision of Intelligence Everywhere and (2) acquire and hold bitcoin, which we view as a dependable store of value supported by a robust, public, open-source architecture untethered to sovereign monetary policy.`,
        icon: require('./images/mstr.png')
    },
    'GOOGL-USD': {
        id: 'GOOGL-USD',
        type: 'STOCKS',
        description: `Google Inc. (Google) is a global technology company. The Company's business is primarily focused around key areas, such as search, advertising, operating systems and platforms, enterprise and hardware products. The Company generates revenue primarily by delivering online advertising. The Company also generates revenues from Motorola by selling hardware products. The Company provides its products and services in more than 100 languages and in more than 50 countries, regions, and territories. Effective May 16, 2014, Google Inc acquired Quest Visual Inc. Effective May 20, 2014, Google Inc acquired Enterproid Inc, doing business as Divide. In June 2014, Google Inc acquired mDialog Corp. Effective June 25, 2014, Google Inc acquired Appurify Inc, a San Francisco-based developer of mobile bugging application software.`,
        icon: require('./images/googl.png')
    },
    'FB-USD': {
        id: 'FB-USD',
        type: 'STOCKS',
        description: `Facebook, Inc. (Facebook) is engaged in building products to create utility for users, developers, and advertisers. People use Facebook to stay connected with their friends and family, to discover what is going on in the world around them, and to share and express what matters to them to the people they care about. Developers can use the Facebook Platform to build applications and Websites that integrate with Facebook to reach its global network of users and to build personalized and social products. Advertisers can engage with more than 900 million monthly active users (MAUs) on Facebook or subsets of its users based on information they have chosen to share with the Company, such as their age, location, gender, or interests. In September 2013, Mail.Ru Group Limited sold its remaining shares in Facebook Inc. Effective September 25, 2013, Facebook Inc acquired Mobile Technologies, a developer of online applications. In October 2013, Facebook Inc acquired Onavo Inc.`,
        icon: require('./images/fb.png')
    },
    'COIN-USD': {
        id: 'COIN-USD',
        type: 'STOCKS',
        description: `Coinbase is building the cryptoeconomy – a more fair, accessible, efficient, and transparent financial system enabled by crypto. The company started in 2012 with the radical idea that anyone, anywhere, should be able to easily and securely send and receive Bitcoin. Today, Coinbase offers a trusted and easy-to-use platform for accessing the broader cryptoeconomy.`,
        icon: require('./images/coin.png')
    },
    'AMZN-USD': {
        id: 'AMZN-USD',
        type: 'STOCKS',
        description: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Amazon strives to be Earth’s Most Customer-Centric Company, Earth’s Best Employer, and Earth’s Safest Place to Work. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire TV, Amazon Echo, Alexa, Just Walk Out technology, Amazon Studios, and The Climate Pledge are some of the things pioneered by Amazon.',
        icon: require('./images/amzn.png')
    },
    'AAPL-USD': {
        id: 'AAPL-USD',
        type: 'STOCKS',
        description: `Apple Inc. (Apple) designs, manufactures and markets mobile communication and media devices, personal computers, and portable digital music players, and a variety of related software, services, peripherals, networking solutions, and third-party digital content and applications. The Company's products and services include iPhone, iPad, Mac, iPod, Apple TV, a portfolio of consumer and professional software applications, the iOS and OS X operating systems, iCloud, and a variety of accessory, service and support offerings. The Company also delivers digital content and applications through the iTunes Store, App StoreSM, iBookstoreSM, and Mac App Store. The Company distributes its products worldwide through its retail stores, online stores, and direct sales force, as well as through third-party cellular network carriers, wholesalers, retailers, and value-added resellers. In February 2012, the Company acquired app-search engine Chomp.`,
        icon: require('./images/appl.png')
    },
    'OTGLY-USD': {
        id: 'OTGLY-USD',
        type: 'STOCKS',
        description: 'CD Projekt S.A. ADR',
        icon: require('./images/otgly.png')
    },
    'BCH-USD': {
        id: 'BCH-USD',
        type: 'CRYPTO',
        icon: require('./images/bch.png'),
        description: 'As Bitcoin Cash is a result of a chain split from Bitcoin, it shares much of Bitcoin’s fundamental workings. In fact, they even share the same history.'
    },
    'BTC-USD': {
        id: 'BTC-USD',
        type: 'CRYPTO',
        icon: require('./images/btc.png'),
        description: 'Bitcoin is a cryptocurrency. It is a decentralized digital currency that is based on cryptography. As such, it can operate without the need of a central authority like a central bank or a company. It is unlike government-issued or fiat currencies such as US Dollars or Euro in which they are controlled by the country’s central bank. The decentralized nature allows it to operate on a peer-to-peer network whereby users are able to send funds to each other without going through intermediaries.'
    },
    'DFI-USD': {
        id: 'DFI-USD',
        type: 'CRYPTO',
        icon: require('./images/dfi.png'),
        description: 'DeFiChain is a decentralized blockchain platform dedicated to enable fast, intelligent, and transparent decentralized financial services.'
    },
    'DOGE-USD': {
        id: 'DOGE-USD',
        type: 'CRYPTO',
        icon: require('./images/doge.png'),
        description: 'Dogecoin is a cryptocurrency based on the popular "Doge" Internet meme and features a Shiba Inu on its logo. Dogecoin is a Litecoin fork. Introduced as a "joke currency" on 6 December 2013, Dogecoin quickly developed its own online community and reached a capitalization of US$60 million in January 2014. Compared with other cryptocurrencies, Dogecoin had a fast initial coin production schedule: 100 billion coins were in circulation by mid-2015, with an additional 5.256 billion coins every year thereafter. As of 30 June 2015, the 100 billionth Dogecoin had been mined.'
    },
    'ETH-USD': {
        id: 'ETH-USD',
        type: 'CRYPTO',
        icon: require('./images/eth.png'),
        description: 'Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible.'
    },
    'LTC-USD': {
        id: 'LTC-USD',
        type: 'CRYPTO',
        icon: require('./images/ltc.png'),
        description: 'Litecoin (LTC) is a cryptocurrency that is largely similar to Bitcoin. Fundamentally, Litecoin is also a decentralized cryptocurrency which utilizes similar protocols as Bitcoin except for a few parameter tweaks.'
    },
    'USDC-USD': {
        id: 'USDC-USD',
        type: 'CRYPTO',
        icon: require('./images/usdc.png'),
        description: 'USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between dollars and trading on cryptocurrency exchanges. The technology behind CENTRE makes it possible to exchange value between people, businesses and financial institutions just like email between mail services and texts between SMS providers. We believe by removing artificial economic borders, we can create a more inclusive global economy.'
    },
    'USDT-USD': {
        id: 'USDT-USD',
        type: 'CRYPTO',
        icon: require('./images/usdt.png'),
        description: 'Tether is a stablecoin pegged to the US Dollar. A stablecoin is a type of cryptocurrency whose value is pegged to another fiat currency like the US Dollar or to a commodity like Gold.'
    },

    'U-USD': {
        id: 'U-USD',
        type: 'STOCKS',
        icon: require('./images/unity.png'),
        description: 'Unity Software Inc. is an American video game software development company based in San Francisco. It was founded in Denmark in 2004 as Over the Edge Entertainment and changed its name in 2007.'
    },

    'TCEHY-USD': {
        id: 'TCHEY-USD',
        type: "STOCKS",
        icon: require('./images/amd.png'),
        description: 'Tencent Holdings Ltd., also known as Tencent, is a Chinese multinational technology conglomerate holding company. Founded in 1998, its subsidiaries globally market various Internet-related services and products, including in entertainment, artificial intelligence, and other technology'
    },
    'SEDG-USD': {
        id: 'SEDG-USD',
        type: 'STOCKS',
        icon: require('./images/sedg.png'),
        description: 'SolarEdge Technologies, Inc. is an Israel-headquartered provider of power optimizer, solar inverter and monitoring systems for photovoltaic arrays. These products aim to increase energy output through module-level Maximum Power Point Tracking.'
    },
    'VOO-USD': {
        id: 'VOO-USD',
        type: 'ETF',
        icon: require('./images/voo.png'),
        description: 'Vanguard 500 Index Fund'
    },
    'V-USD': {
        id: 'V-USD',
        type: 'STOCKS',
        icon: require('./images/visa.png'),
        description: 'Visa Inc. is an American multinational financial services corporation headquartered in Foster City, California, United States. It facilitates electronic funds transfers throughout the world, most commonly through Visa-branded credit cards, debit cards and prepaid cards '
    },
    'TTWO-USD': {
        id: 'TTWO-USD',
        type: 'STOCKS',
        icon: require('./images/ttwo.png'),
        description: 'Take-Two Interactive Software, Inc. is an American video game holding company based in New York City and founded by Ryan Brant in September 1993. The company owns two major publishing labels, Rockstar Games and 2K, which operate internal game development studios'

    },
    'TQQQ-USD': {
        id: 'TQQQ-USD',
        type: "ETF",
        icon: require('./images/tqqq.png'),
        description: 'The ProShares UltraPro QQQ'
    },
    'TLRY-USD': {
        id: 'TLRY-USD',
        type: 'STOCKS',
        icon: require('./images/tlry.png'),
        description: 'Tilray is a Canadian pharmaceutical and cannabis company, incorporated in the United States with primary operations headquartered in Toronto, Ontario. Tilray also has operations in Australia, New Zealand, Germany, Portugal, and Latin America.'
    },
    'SNAP-USD': {
        id: 'SNAP-USD',
        type: 'STOCKS',
        icon: require('./images/snap.png'),
        description: "Snap Inc. is an American camera and social media company, founded on September 16, 2011, by Evan Spiegel, Bobby Murphy, and Reggie Brown based in Santa Monica, California. The company developed and maintains technological products and services, namely Snapchat, Spectacles, and Bitmoji."
    },
    'SQ-USD': {
        id: 'SQ-USF',
        type: 'STOCKS',
        icon: require('./images/sq.png'),
        description: 'Square is an American financial services and digital payments company based in San Francisco, California. The company was founded in 2009 by Jack Dorsey and Jim McKelvey and launched its first platform in 2010.'
    },
    'SPY-USD': {
        id: 'SPY-USD',
        type: 'ETF',
        icon: require('./images/spy.png'),
        description: 'The SPDR S&P 500 trust is an exchange-traded fund which trades on the NYSE Arca under the symbol. SPDR is an acronym for the Standard & Poor\'s Depositary Receipts, the former name of the ETF. It is designed to track the S&P 500 stock market index. This fund is the largest ETF in the world'
    },
    'SI-USD': {
        id: 'SI-USD',
        type: 'STOCKS',
        icon: require('./images/si.png'),
        description: 'Silvergate Capital (Silvergate) is the parent company of Silvergate Bank, the leading provider of innovative financial infrastructure solutions and services to participants in the nascent and expanding digital currency industry.'
    },
    'RIOT-USD': {
        id: 'RIOT-USD',
        type: "STOCKS",
        icon: require('./images/riot.png'),
        description: 'iot Blockchain, Inc. is a Bitcoin mining company, supporting the Bitcoin blockchain through rapidly expanding large-scale mining in the United States. '
    },
    'PYPL-USD': {
        id: 'PYPL-USD',
        type: 'STOCKS',
        icon: require('./images/pypl.png'),
        description: 'PayPal Holdings, Inc. is an American multinational financial technology company operating an online payments system in the majority of countries that support online money transfers, and serves as an electronic alternative to traditional paper methods such as checks and money orders'
    },
    'PLTR-USD': {
        id: 'PLTR-USD',
        type: 'STOCKS',
        icon: require('./images/pltr.png'),
        description: 'Palantir Technologies is a public American software company that specializes in big data analytics. Headquartered in Denver, Colorado, it was founded by Peter Thiel, Nathan Gettings, Joe Lonsdale, Stephen Cohen, and Alex Karp in 2003.'
    },
    'NTDOF-USD': {
        id: 'NTDOF-USD',
        type: 'STOCKS',
        icon: require('./images/ntdof.png'),
        description: 'Nintendo Co., Ltd. is a Japanese multinational consumer electronics and video game company headquartered in Kyoto, Japan. The company was founded in 1889 as Nintendo Karuta by craftsman Fusajiro Yamauchi and originally produced handmade hanafuda playing cards'
    },
    'NSRGY-USD': {
        id: 'NSRGY-USD',
        type: "STOCKS",
        icon: require('./images/nsrgy.png'),
        description: 'Nestlé S.A. is a Swiss multinational food and drink processing conglomerate corporation headquartered in Vevey, Vaud, Switzerland. It is the largest food company in the world, measured by revenue and other metrics, since 2014.'
    },
    'SQQQ-USD': {
        id: 'SQQQ-USD',
        type: 'ETF',
        icon: require('./images/tqqq.png'),
        description: 'ProShares UltraPro Short QQQ'
    },
    'SOXX-USD': {
        id: 'SOXX-USD',
        type: 'ETF',
        icon: require('./images/soxx.png'),
        description: 'Ishares Semiconductors EFT'
    },
    'BABA-USD': {
        id: 'BABA-USD',
        type: 'STOCKS',
        icon: require('./images/baba.png'),
        description: 'Alibaba Group Holding Limited, also known as Alibaba Group and Alibaba.com, is a Chinese multinational technology company specializing in e-commerce, retail, Internet, and technology.'
    },
    'DIS-USD': {
        id: 'DIS-USD',
        type: 'STOCKS',
        icon: require('./images/dis.png'),
        description: 'The Walt Disney Company, commonly just Disney, is an American multinational entertainment and media conglomerate headquartered at the Walt Disney Studios complex in Burbank, California.'
    },
    'NFLX-USD': {
        id: 'NFLX-USD',
        type: "STOCKS",
        icon: require('./images/nflx.png'),
        description: 'Netflix, Inc. is an American pay television over-the-top media service and original programming production company. It offers subscription-based video on demand from a library of films and television series, 40% of which is Netflix original programming produced in-house'
    },
    'MA-USD': {
        id: 'MA-USD',
        type: 'STOCKS',
        icon: require('./images/ma.png'),
        description: 'Mastercard Inc. is an American multinational financial services corporation headquartered in the Mastercard International Global Headquarters in Purchase, New York. The Global Operations Headquarters is located in O\'Fallon, Missour'
    },
    'RBLX-USD': {
        id: 'RBLX-USD',
        type: "STOCKS",
        icon: require('./images/rblx.png'),
        description: 'Roblox Corporation is an American video game developer based in San Mateo, California. Founded in 2004 by David Baszucki and Erik Cassel, the company is the developer of Roblox, which was released in 2006. '
    },
    'MARA-USD': {
        id: 'MARA-USD',
        type: 'STOCKS',
        icon: require('./images/mara.png'),
        description: 'Marathon Digital Holdings is a patent holding company that is the parent of Uniloc, known as a patent troll company.'
    },
    'MCHI-USD': {
        id: 'MCHI-USD',
        type: 'ETF',
        icon: require('./images/soxx.png'),
        description: 'iShares MSCI China ETF'
    },
    'EEM-USD': {
        id: 'EEM-USD',
        type: 'ETF',
        icon: require('./images/soxx.png'),
        description: 'iShares MSCI Emerging Markets ETF'
    },
    'NLLSF-USD': {
        id: 'NLLSF-USD',
        type: 'STOCKS',
        icon: require('./images/nllsf.png'),
        description: 'Nel ASA is a Norwegian company founded in 1998 and based in Oslo. Nel is a global company providing solutions for the production, storage and distribution of hydrogen from renewable energy sources. Nel is listed in the OBX Index of the Oslo Stock Exchange.'
    },
    'GLO-USD': {
        id: 'GLO-USD',
        type: 'ETF',
        icon: require('./images/glo.png'),
        description: 'Clough Global Opportunities Fund'
    },
    'KRBN-USD': {
        id: 'KRBN-USD',
        type: 'ETF',
        icon: require('./images/krbn.png'),
        description: 'KraneShares Global Carbon ETF'
    },
    'PATH-USD': {
        id: 'PATH-USD',
        type: 'STOCKS',
        icon: require('./images/path.png'),
        description: 'UiPath is an American global software company for robotic process automation founded in Romania by Daniel Dines and Marius Tîrcă and headquartered in New York City'
    },
    'MSFT-USD': {
        id: 'MSFT-USD',
        type: 'STOCKS',
        icon: require('./images/msft.png'),
        description: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.'
    },
    'INTC-USD': {
        id: 'INTC-USD',
        type: 'STOCKS',
        icon: require('./images/intl.png'),
        description: 'Intel Corporation is an American multinational corporation and technology company headquartered in Santa Clara, California. It is the world\'s largest semiconductor chip manufacturer by revenue, and is the developer of the x86 series of microprocessors, the processors found in most personal computers.'
    },
    'SQNXF-USD': {
        id: 'SQNXF-USD',
        type: 'STOCKS',
        icon: require('./images/sqnxf.png'),
        description: 'Square Enix Holdings Co., Ltd. is a Japanese entertainment conglomerate and video game company, best known for its Final Fantasy, Dragon Quest and Kingdom Hearts role-playing video game franchises, among numerous others.'
    },
    'SOXS-USD': {
        id: 'SOXS-USD',
        type: 'ETF',
        icon: require('./images/soxl.png'),
        description: 'The Direxion Daily Semiconductor Bear'
    },
    'SOXL-USD': {
        id: 'SOXL-USD',
        type: 'ETF',
        icon: require('./images/soxl.png'),
        description: 'The Direxion Daily Semiconductor Bull'
    },
    'QQQ-USD': {
        id: 'QQQ-USD',
        type: 'ETF',
        icon: require('./images/intl.png'),
        description: 'Invesco QQQ Trust Series 1'
    },
    'LZAGY-USD': {
        id: 'LZAGY-USD',
        type: 'STOCKS',
        icon: require('./images/lzagy.png'),
        description: 'Lonza Group is a Swiss multinational chemicals and biotechnology company, headquartered in Basel, with major facilities in Europe, North America and South Asia. Lonza was established under that name in the late 19th-century in Switzerland.'
    },
    'CQQQ-USD': {
        id: 'CQQQ-USD',
        type: 'ETF',
        icon: require('./images/intl.png'),
        description: 'Invesco China Technology ETF'
    },
    'BYDDF-USD': {
        id: 'BYDDF-USD',
        type: 'STOCKS',
        icon: require('./images/byddf.png'),
        description: 'BYD Co. Ltd. is a Chinese manufacturing company headquartered in Shenzhen, Guangdong, founded by Wang Chuanfu in February 1995. It has two major subsidiaries, BYD Automobile and BYD Electronic.'
    },
    'ARKX-USD': {
        id: 'ARKX-USD',
        type: 'ETF',
        icon: require('./images/arkx.png'),
        description: 'ARK Space Exploration & Innovation ETF'
    },
    'ARKW-USD': {
        id: 'ARKW-USD',
        type: 'ETF',
        icon: require('./images/arkx.png'),
        description: 'ARK Next Generation Internet ETF'
    },
    'ARKQ-USD': {
        id: 'ARKQ-USD',
        type: 'ETF',
        icon: require('./images/arkx.png'),
        description: 'ARK Autonomous Technology & Robotics ETF'
    }
}

export function getPriceCopy(id: string): PriceCopy | undefined {
    return PRICES[id]
}
