import { ChannelInfo, YouTubeVideo, YouTubeShort } from '../types/youtube';

export const YOUTUBE_CHANNEL: ChannelInfo = {
  name: 'Young Dream Innovators',
  handle: '@YoungDreamInnovators',
  subscribers: '12.4K',
  videoCount: '84 videos',
  totalViews: '1.2M views',
  bio: 'Igniting young minds across India & the globe! 🚀 Hands-on STEM tutorials, youth science fair spotlights, robotics builds, DIY clean tech, and coding inventions.',
  bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  channelUrl: 'https://www.youtube.com/@YoungDreamInnovators',
  verified: true,
};

export const FEATURED_VIDEOS: YouTubeVideo[] = [
  {
    id: 'yt-1',
    youtubeId: 'M7lc1UVf-VE', // Sample educational YouTube ID
    title: 'Building a Smart AI Rover for Atal Tinkering Lab (ATL) 🤖',
    description: 'Join 14-year-old Kabir as he walks through designing an autonomous obstacle-avoiding rover using Raspberry Pi Pico, ultrasonic sensors, and micro-Python. Perfect for school science exhibitions!',
    category: 'ROBOTICS',
    categoryLabel: '🤖 Robotics & AI',
    duration: '14:28',
    views: '48.2K',
    likes: '3.4K',
    uploadDate: '3 days ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    badge: '🌟 Top Trending',
    difficulty: 'Intermediate',
    ageGroup: 'Ages 10-17',
    keyTakeaways: [
      'Wiring dual H-Bridge motor drivers safely with 6V battery packs',
      'Configuring HC-SR04 ultrasonic echo calculation in Python',
      'PID control logic for smooth avoidance loops without hard stops',
      'ATL safety checklist for low-voltage chassis insulation'
    ],
    materialsNeeded: [
      'Raspberry Pi Pico / Arduino Uno',
      '2x Geared DC Motors + Wheels',
      'L298N Motor Driver Module',
      'HC-SR04 Ultrasonic Distance Sensor',
      '9V / 4xAA Battery Holder & Breadboard'
    ],
    timestamps: [
      { time: '0:00', seconds: 0, label: 'Introduction & Rover Demo' },
      { time: '2:15', seconds: 135, label: 'Circuit Schematic & Pinouts' },
      { time: '5:40', seconds: 340, label: 'Writing Obstacle Logic in MicroPython' },
      { time: '9:20', seconds: 560, label: 'Field Testing & Calibration' },
      { time: '12:45', seconds: 765, label: 'Project Files & Code Download' }
    ],
    projectLink: 'https://www.youtube.com/@YoungDreamInnovators'
  },
  {
    id: 'yt-2',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'DIY Solar-Powered Drip Irrigation with IoT Soil Sensor 🌿☀️',
    description: 'Learn how to build an automated solar-powered irrigation unit for your school terrace garden using ESP32, capacitive moisture probes, and a 5V mini water pump.',
    category: 'GREEN_TECH',
    categoryLabel: '🌱 Green Tech & Clean Energy',
    duration: '11:15',
    views: '32.1K',
    likes: '2.8K',
    uploadDate: '1 week ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    badge: '🌱 Eco Innovation',
    difficulty: 'Beginner',
    ageGroup: 'Ages 8-16',
    keyTakeaways: [
      'Reading capacitive moisture voltage without sensor corrosion',
      'Solar trickle charging with 18650 Li-ion safe protection board',
      'Sending real-time plant hydration telemetry to smartphone app',
      'Conserving up to 70% water in home gardens'
    ],
    materialsNeeded: [
      'ESP32 Dev Module',
      'Capacitive Soil Moisture Sensor v1.2',
      '5V Submersible Mini Pump + 1m Silicone Tube',
      '6V 2W Solar Panel + TP4056 Solar Charge Controller'
    ],
    timestamps: [
      { time: '0:00', seconds: 0, label: 'The Problem: Water Waste in Urban Gardening' },
      { time: '1:45', seconds: 105, label: 'Assembling the Solar Energy Rig' },
      { time: '4:30', seconds: 270, label: 'Connecting ESP32 & Soil Moisture Sensor' },
      { time: '8:10', seconds: 490, label: 'Live Test on Tomato Plants' }
    ]
  },
  {
    id: 'yt-3',
    youtubeId: 'jNQXAC9IVRw',
    title: 'Bioplastics From Banana Peels: Eco-Lab Experiment 🍌🧪',
    description: 'National Science Fair winner Ananya demonstrates how to extract starch from kitchen waste and polymerize biodegradable packaging sheets.',
    category: 'SCIENCE',
    categoryLabel: '🧪 DIY Science Lab',
    duration: '09:40',
    views: '65.9K',
    likes: '5.1K',
    uploadDate: '2 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    badge: '🏆 Fair Winner',
    difficulty: 'Beginner',
    ageGroup: 'Ages 9-16',
    keyTakeaways: [
      'Safe acid-base starch hydrolysis at kitchen temperature',
      'Adding vegetable glycerin as natural plasticizer',
      'Tensile strength testing with simple hanging weights',
      'Biodegradation comparison against commercial PET plastic'
    ],
    materialsNeeded: [
      '4 Ripe Banana Peels',
      'Distilled Water & White Vinegar',
      'Corn Starch & Food-grade Glycerin',
      'Blender, Non-stick pan & Baking Parchment'
    ],
    timestamps: [
      { time: '0:00', seconds: 0, label: 'Meet Ananya & Science Fair Hypothesis' },
      { time: '2:10', seconds: 130, label: 'Extracting & Pureeing Banana Starch' },
      { time: '5:00', seconds: 300, label: 'Simmering & Polymerization Reaction' },
      { time: '7:40', seconds: 460, label: 'Drying, Peeling & Elasticity Test' }
    ]
  },
  {
    id: 'yt-4',
    youtubeId: 'fJ9rUzIMcZQ',
    title: 'Create Your First Python Game in 30 Minutes! 🎮💻',
    description: 'Beginner-friendly tutorial for kids to code an arcade space defender game using Pygame Zero with custom pixel graphics, sound effects, and score tracking.',
    category: 'CODING',
    categoryLabel: '💻 Coding & Software',
    duration: '22:05',
    views: '89.4K',
    likes: '7.9K',
    uploadDate: '3 weeks ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    badge: '🔥 Coding Masterclass',
    difficulty: 'Beginner',
    ageGroup: 'Ages 10-18',
    keyTakeaways: [
      'Understanding Game Loops and frame updates in Python',
      'Sprite movement and keyboard velocity controls',
      'Collision detection between laser projectiles and alien sprites',
      'Exporting game as a playable web / executable file'
    ],
    materialsNeeded: [
      'Computer (Windows/Mac/Linux/Chromebook)',
      'Python 3.10+ Installed',
      'Mu Editor / VS Code'
    ],
    timestamps: [
      { time: '0:00', seconds: 0, label: 'Game Demo & Quick Overview' },
      { time: '3:20', seconds: 200, label: 'Setting up Pygame Zero window' },
      { time: '8:45', seconds: 525, label: 'Player Ship Controls & Speed' },
      { time: '14:10', seconds: 850, label: 'Laser Blast Mechanics & Sounds' },
      { time: '19:00', seconds: 1140, label: 'Scoreboard & Game Over Screen' }
    ]
  },
  {
    id: 'yt-5',
    youtubeId: '9bZkp7q19f0',
    title: 'Affordable Braille Reader Built by 12-Year-Old Aravind 🎖️👁️',
    description: 'Inspirational innovator spotlight: Aravind built a 6-solenoid tactile electronic refreshable Braille screen for visually impaired students for under ₹1,500.',
    category: 'INNOVATORS',
    categoryLabel: '🌟 Young Innovator Spotlight',
    duration: '08:50',
    views: '112K',
    likes: '12.6K',
    uploadDate: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    badge: '🎖️ Social Impact',
    difficulty: 'Advanced',
    ageGroup: 'All Ages',
    keyTakeaways: [
      'How empathy-driven engineering creates accessible devices',
      '3D printing micro-pins with 0.2mm tolerances',
      'Converting ASCII text stream to 6-dot solenoid binary pulses',
      'Open-source repository and testing with blind school peers'
    ],
    materialsNeeded: [
      'Custom 3D-Printed 6-cell Enclosure',
      '6x 5V Micro Push-Pull Solenoids',
      'Arduino Nano & Bluetooth HC-05 module'
    ],
    timestamps: [
      { time: '0:00', seconds: 0, label: 'Aravind\'s Story & Vision' },
      { time: '2:15', seconds: 135, label: 'How the Tactile Solenoid Screen Works' },
      { time: '4:50', seconds: 290, label: 'Live Demonstration with Audio Book Sync' },
      { time: '7:10', seconds: 430, label: 'How to Support or Replicate the Project' }
    ]
  },
  {
    id: 'yt-6',
    youtubeId: 'kJQP7kiw5Fk',
    title: 'Smart Helmet with Alcohol Sensing & Fall Alert System 🛵⚠️',
    description: 'Step-by-step IoT safety build with MQ-3 gas sensor, MPU6050 gyroscope, and GSM alert transmitter for two-wheeler accident reduction.',
    category: 'ROBOTICS',
    categoryLabel: '🤖 Robotics & AI',
    duration: '16:30',
    views: '41.5K',
    likes: '3.1K',
    uploadDate: '1 month ago',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    badge: '🛡️ Safety Tech',
    difficulty: 'Intermediate',
    ageGroup: 'Ages 12-18',
    keyTakeaways: [
      'Calibrating MQ-3 alcohol threshold for false-positive reduction',
      'Detecting impact tilt angles exceeding 65 degrees with gyro',
      'Automated SMS emergency dispatch with GPS coordinates',
      'Ignition interlock relay circuit design'
    ],
    materialsNeeded: [
      'Arduino Pro Mini / Uno',
      'MQ-3 Gas Sensor',
      'MPU-6050 6-Axis Accelerometer',
      'SIM800L GSM/GPRS Module + GPS NEO-6M'
    ],
    timestamps: [
      { time: '0:00', seconds: 0, label: 'Introduction to Two-Wheeler Safety' },
      { time: '3:00', seconds: 180, label: 'Hardware Assembly & Wiring Diagram' },
      { time: '8:15', seconds: 495, label: 'Coding the Accelerometer Thresholds' },
      { time: '13:00', seconds: 780, label: 'Emergency Contact Dispatch Simulation' }
    ]
  }
];

export const SHORTS_LIST: YouTubeShort[] = [
  {
    id: 's-1',
    youtubeId: 'M7lc1UVf-VE',
    title: 'Super fast battery hack using salt water & copper! ⚡🧪',
    views: '142K',
    duration: '0:45',
    category: 'DIY Science',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    tags: ['#ScienceExperiments', '#Battery', '#Shorts']
  },
  {
    id: 's-2',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'How to control an LED with hand gestures! 🖐️💡',
    views: '98K',
    duration: '0:58',
    category: 'Robotics',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
    tags: ['#Arduino', '#Robotics', '#YoungMinds']
  },
  {
    id: 's-3',
    youtubeId: 'jNQXAC9IVRw',
    title: '3 Secret coding tricks every junior developer needs 🚀',
    views: '210K',
    duration: '0:52',
    category: 'Coding',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    tags: ['#Python', '#LearnToCode', '#Shorts']
  },
  {
    id: 's-4',
    youtubeId: 'fJ9rUzIMcZQ',
    title: 'Paper circuit greeting cards with light-up LEDs! 🎨✨',
    views: '76K',
    duration: '0:38',
    category: 'STEM Art',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    tags: ['#STEMArt', '#PaperCircuits', '#KidsDIY']
  }
];

export const CATEGORIES = [
  { id: 'ALL', label: '🌟 All Videos', icon: 'Sparkles' },
  { id: 'ROBOTICS', label: '🤖 Robotics & AI', icon: 'Bot' },
  { id: 'SCIENCE', label: '🧪 Science Lab', icon: 'FlaskConical' },
  { id: 'CODING', label: '💻 Coding & Tech', icon: 'Code' },
  { id: 'GREEN_TECH', label: '🌱 Green Innovation', icon: 'Leaf' },
  { id: 'INNOVATORS', label: '🎖️ Young Spotlights', icon: 'Award' },
];
