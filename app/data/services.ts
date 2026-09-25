import type { Capability, Guarantee, ProcessStep, ServicePillar } from './types'

/**
 * Transcribed verbatim from the "Guaranteed" panel on the live Services page.
 */
export const guarantees: Guarantee[] = [
  { title: 'Rapid Development', detail: 'Auto-generated database applications' },
  { title: 'Reliable & Flexible', detail: 'Automated development processes' },
  { title: 'Scalable & Robust', detail: 'Easily manages changes in your business requirements' },
  { title: 'Efficiently Evolve', detail: 'Designed and built for change' },
  { title: 'Optimised For Growth', detail: 'New features added regularly' },
  { title: 'No Unforeseen Costs', detail: 'Fixed price confidence' },
]

/**
 * The "Our Services" panel on the live About page, verbatim.
 */
export const capabilities: Capability[] = [
  { title: 'Back office applications', detail: 'Replace legacy business spreadsheets and local databases' },
  { title: 'E-commerce', detail: 'Get your business selling online and through call centres' },
  { title: 'Content Management Systems', detail: 'Manage content on intranets and public web sites' },
  { title: 'Data centralisation', detail: 'Solutions to centralise business data and improve disaster recovery' },
  { title: 'Flexible solutions', detail: 'Deployed on your servers or provided as hosted solutions' },
  { title: 'No unforeseen costs', detail: 'Fixed price confidence, guaranteed' },
]

/**
 * The four service pages linked from the live Services menu, verbatim.
 */
export const servicePillars: ServicePillar[] = [
  {
    id: 'online-databases',
    title: 'Online Databases',
    body: [
      'Online databases can provide many benefits to your business compared to the ongoing use of spreadsheets and local database applications.',
    ],
    pointsIntro: 'Some of these benefits include:',
    points: [
      'Easy to access using standard internet browsers on any operating system',
      'No extra software is required: users simply navigate to the web-site and begin using the system',
      'Scalability: browser based solutions are multi-user and can be easily aligned to mirror changing business requirements',
      'Accessibility: you define who has access to different parts of the system',
      'Security: if required, access to the web-site can be locked down to specific offices or home workers',
      'Flexible Location: the hosting of the application can be located in any office or data centre, or outsourced to us',
      'Data centralisation: improves access to your data and disaster recovery processes',
    ],
    closing: 'Get in touch with Arepo to find out how on-line access to your data could help your business.',
  },
  {
    id: 'bespoke-software',
    title: 'Bespoke Software Solutions',
    body: [
      'Bespoke software and database solutions have often been seen as costly and time consuming to develop. As a result, clients sometimes compromise their requirements with an off-the-shelf software package.',
      'Arepo’s rapid application development platform bridges the gap between bespoke development and off-the-shelf software products, providing supportable and affordable solutions for your business.',
    ],
    pointsIntro: 'Some of the major benefits of these solutions are:',
    points: [
      'It is often possible to provide a completed browser-based solution in days or weeks rather than months',
      'The user interface is much more stable having already been tried and tested',
      'Greater emphasis can be placed on database design providing a solid foundation for your system',
      'The interface is more powerful, benefiting from all the existing features of the Arepo Platform',
      'It is easier to modify the system to keep pace with changes in your business requirements',
    ],
    closing:
      'For an informal discussion about using the Arepo Platform to address your bespoke development needs please get in touch or call 020 7280 4390.',
  },
  {
    id: 'legacy-systems',
    title: 'Legacy Systems',
    body: [
      'Our suite of Rapid Application Development tools and processes allow us to efficiently create web-based user interfaces to improve existing operational or legacy database applications. The resulting integrated system performs as a completely new application at a fraction of the cost of a replacement system whilst retaining, and often improving, business processes.',
    ],
    pointsIntro: 'The type of technical problems people are likely to experience with legacy data and applications are:',
    points: [
      'Data quality challenges',
      'Database design problems',
      'Data architecture changes',
      'Process-related issues',
      'Inability to evolve in line with business needs',
    ],
    closing:
      'Arepo’s expertise can help you to develop a replacement solution incorporating all data from your existing system, whilst minimising operational downtime as our development is completed alongside the current application. Working with you, we can often suggest and deliver improvements and changes that have probably been long overdue in your existing legacy system.',
  },
  {
    id: 'cms-integration',
    title: 'Integrated Content Management',
    body: [
      'Whilst many of our client’s database applications focus on back office database functionality required by the core business, some of our client’s databases incorporate a separate public website, or public web pages which are delivered by their existing database application. Whichever solution is required, we can build a Content Management module into your application to enable you to create/customise your public website.',
    ],
    pointsIntro: 'In addition, we have often had occasion to include other related CMS functions, such as:',
    points: [
      'Providing the ability to publish live content updates (e.g. recent news items)',
      'Automated e-mailing and postal mail shots',
    ],
    closing:
      'These types of CMS functions can be provided either as a separate module, or fully integrated into the existing application, depending upon who is responsible for the content and/or marketing.',
  },
]

/**
 * The three sections of the live "Our Unique Approach" page, verbatim.
 */
export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: 'Database Reliability & Speed',
    body: 'In order to achieve reliability and speed of development, we place great emphasis on using tools to automate the development process. These tools, which we refer to as the Arepo Platform, allow us to remove duplication, and to enforce rules on all of the online databases we deploy. We believe that duplicating code within IT applications is a major cause of reliability issues.',
  },
  {
    n: 2,
    title: 'Scalable & Future-Proofed',
    body: 'Most software development companies use tools of one kind or another to copy functionality, however, Arepo take this one stage further and generate all of our access control, data retrieval, navigation and data entry screens directly from the database and meta-data. This allows us two advantages. Firstly, we can adjust the database design to cope with changing business requirements and then regenerate our interface quickly. Secondly, we can optimise, modify and add features to our interface separately from any individual application giving all of our customers access to improved functionality.',
  },
  {
    n: 3,
    title: 'Confidence & Satisfaction',
    body: 'Once a web solution is delivered, our customers do not have to worry about the kind of surprises that can occur with conventional web tools including unforeseen costs and shortened life expectancy. The costs of changing a conventional system can increase over time and compromises (hacks) made within the design of the application’s database often result in the need to rewrite the entire solution. Arepo’s web development solutions are designed to evolve with your business providing you with an excellent return on investment (ROI) over the life of the application.',
  },
]
