# Simple Header Bidding System

## Overview

The **Header Bidding System**  project implements a simplified Header Bidding System using React.js, TailwindCSS, and Prebid.js. The system optimizes ad revenue for a publisher’s website by integrating **real-time bidding**, **supporting multiple  SSPs**, and . **implementing responsive ad units** .

## Features

1 Header Bidding Integration

- Utilizes Prebid.js for real-time bidding (RTB).
- Supports multiple Supply-Side Platforms (SSPs).

2 Dynamic Floor Pricing

- Configures floor prices based on ad size and device type.

3 Lazy-Loading Ads

- Ads load only when they are in the viewport for improved performance.

4 Fallback Ads

- Displays fallback ads when no bids are received.

5 Analytics

- Tracks bids, win rates, and latency using Google Analytics.

6 Error Handling

- Logs and manages errors for SSP timeouts, invalid responses, and failed bids.

7 Automated Deployment

- Configured GitHub Actions for CI/CD with Docker-based deployments.

## Tools and Technologies

- **React.js**: Frontend framework for building the UI.

- **TailwindCSS**: Utility-first CSS framework for styling.

- **Prebid.js**: Open-source header bidding library.

- **dotenv** for environment variables

- **Google Analytics**: Analytics framework for tracking metrics.

- **Docker**: Containerization platform for deployment.

- **GitHub Actions**: CI/CD pipeline for automated deployments.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or above)
- [Docker](https://docs.docker.com/desktop/setup/install/windows-install/) (16 or above)

## Setup Process

### 1. Clone the Repository

To download the project to your laptop, run:

```bash
git clone https://github.com/meshach567/header-bidding.git
cd  header-bidding 

```

### 2. Install Dependencies

```bash
npm install 

```

### 3. Run the Development Server

```bash
npm start

```

### 4. Build for Production

```bash
npm run build

```

### 5. Deploy Using Docker

```bash
docker build -t header-bidding .

```

```bash
docker run -p 3000:3000 header-bidding

```

## Logic and Approach

### 1. Prebid.js Integration

- Configured Prebid.js with two SSPs and defined ad units for banner ads.
- Used OpenRTB protocol to handle demand-side communication.

### 2 Dynamic Floor Pricing

- Implemented a mechanism to set floor prices based on device type and ad size.

### 3 Lazy Loading

- Utilized the Intersection Observer API to load ads only when they are in view.

#### 4 Analytics and Error Handling

- Added bid tracking metrics (win rates, latency) and error logging mechanisms for failed bids.

### 5 Fallback Ads

- Displayed static fallback ads when no bids are received.

### 6 Responsive Design

- Ensured ad units adapt to both desktop and mobile devices using TailwindCSS.

## Challenges and Solutions

### 1. Bid Timeout Issues

- Challenge: Bids sometimes failed due to SSP timeouts.

- Solution: Adjusted Prebid.js timeout configurations and implemented fallback ads.

#### 2. Handling Invalid Responses

- Challenge: SSPs occasionally returned invalid or incomplete bids.

- Solution: Validated incoming bids against the OpenRTB protocol before rendering.

#### 3. Performance Optimization

- Challenge: Initial load times were high due to ad scripts.

- Solution: Implemented lazy-loading to defer ad loading until necessary.

#### 4. Deployment Automation

- Challenge: Manual deployments were error-prone.

- Solution: Set up GitHub Actions for automated CI/CD processes.

## Key Design Decisions

### 1 Use of Prebid.js

- Selected for its robust support for multiple SSPs and OpenRTB protocol compliance.

#### 2 Dynamic Pricing

- Enabled adaptive floor pricing to optimize revenue.

#### 3 Intersection Observer API

- Chosen for its lightweight and efficient ad lazy-loading mechanism.

#### 4 Docker for Deployment

- Ensured consistency across environments with containerized builds.

#### 5 GitHub Actions CI/CD

- Simplified deployment pipeline to ensure fast and reliable updates.

## Folder Struture

```
src/
├── components/
|   |-- AdSlot.jsx
|   |-- Footer.jsx
|   |-- Navbar.jsx
|-- hooks/
|   |-- usePrebid.js
|-- pages/
|   |-- Home.jsx
|   |-- About.jsx
|   |-- Services.jsx
|   |-- Contact.jsx 
|-- path/
|   |-- to/
|      |-- prebid.js
|-- services
|   |-- analyticsServices.js
|   |-- prebidService.js
│          
├── services/
│   ├── prebidService.js # Prebid.js configuration and logic
|-- |index.css           # TailwindCSS styles
├── App.js               # Main application entry point
├── index.js             # React entry point
|-- .env
|-- dockerfile
|-- package.json
|-- tailwind.config.js
|-- webpack.config.js
```
