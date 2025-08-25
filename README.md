# This Day in Space - NASA Timeline App

A modern web application that showcases historical NASA images tied to specific dates. Users can explore a scrollable, visually rich timeline populated with NASA's image archive, similar to Instagram stories or a vertical feed.

## Features

- **Interactive Timeline**: Scrollable, card-style timeline displaying NASA images
- **Date Picker**: Select any date to view images from that day in space history
- **Random Day**: Discover random moments in space history
- **Rich Metadata**: View mission details, photographer info, dates, and descriptions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Beautiful dark theme optimized for space imagery
- **NASA API Integration**: Real-time data from NASA's image library
- **Performance Optimized**: Lazy loading and efficient image handling

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: TailwindCSS with custom animations
- **State Management**: React Query for API caching
- **TypeScript**: Full type safety
- **API**: NASA Images API integration
- **Deployment**: Ready for Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nasa-timeline-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
nasa-timeline-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and TailwindCSS
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── TimelineApp.tsx    # Main app orchestrator
│   ├── Header.tsx         # Navigation header
│   ├── DatePicker.tsx     # Date selection component
│   ├── Timeline.tsx       # Timeline container
│   ├── TimelineCard.tsx   # Individual image cards
│   └── LoadingSpinner.tsx # Loading states
├── types/                  # TypeScript type definitions
│   └── nasa.ts            # NASA API types
├── utils/                  # Utility functions
│   └── nasaApi.ts         # NASA API integration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## API Integration

The app integrates with NASA's Images API to fetch historical space images:

- **Base URL**: `https://images-api.nasa.gov`
- **Search Endpoint**: `/search`
- **Parameters**: Date, keywords, media type
- **Response**: JSON with image metadata and URLs

## Key Components

### TimelineApp
Main orchestrator component that manages state and coordinates between components.

### Timeline
Displays NASA images in a vertical, scrollable timeline with smooth animations.

### TimelineCard
Individual image cards with expandable details, metadata, and external links.

### DatePicker
Interactive date selection with validation and quick access to today's date.

## Styling

The app uses TailwindCSS with custom:
- Space-themed color palette
- Smooth animations and transitions
- Responsive design patterns
- Dark mode optimization

## Performance Features

- **Image Lazy Loading**: Images load as they come into view
- **API Caching**: React Query caches responses for 5 minutes
- **Optimized Images**: Next.js Image component with proper sizing
- **Smooth Animations**: CSS animations with staggered delays

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- NASA for providing the Images API
- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- React Query for efficient data fetching

## Future Enhancements

- Wikipedia API integration for mission context
- User authentication and favorites
- Shareable links for specific dates
- Mobile app with React Native
- AI-powered image descriptions
- Quiz mode for space history