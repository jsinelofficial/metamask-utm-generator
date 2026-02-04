# MetaMask UTM Generator

An internal tool for the MetaMask Growth Marketing team to generate standardized UTM-tagged deeplinks with comprehensive campaign tracking metadata.

## Features

- **Auto-Generated Campaign Codes**: Automatic generation of unique `cpm-` prefixed campaign codes
- **Comprehensive Tracking**: Captures user, business line, dates, objectives, and tactics
- **Full UTM Support**: UTM source, medium, campaign (auto-generated code), and optional content tags
- **URL Validation**: Ensures landing page URLs include proper http:// or https:// protocol
- **Copy to Clipboard**: Instant copy functionality
- **Clean Interface**: Simple, intuitive design with clear required field indicators
- **Business Line Segmentation**: Track campaigns across all MetaMask products

## Required Fields

The tool requires the following information for each deeplink:

### User Information
- **User**: Name or email of the person generating the deeplink (for internal tracking)

### Campaign Details
- **Landing Page URL**: Must include http:// or https://
- **UTM Source**: Traffic source (twitter, reddit, google, etc.)
- **UTM Medium**: Marketing medium (paid_social, display, email, etc.)
- **Campaign Name**: Descriptive campaign name
- **Business Line**: Product/division (dropdown selection)
- **Start Date**: Campaign start date
- **End Date**: Campaign end date
- **Objective**: Campaign objective (dropdown selection)
- **Tactic**: Marketing tactic (dropdown selection)

### Optional Fields
- **Tags**: Additional content tags for creative variations (becomes utm_content)

### Auto-Generated
- **Campaign Code**: Automatically generated unique identifier with `cpm-` prefix (becomes utm_campaign)

## Dropdown Options

### Business Lines
- Consensys-All
- Developers-All
- MMask-Users
- MMExtension
- MMMobile
- MMInst
- MMDeveloper
- MMPortfolio
- Infura
- Linea

### Objectives
- none selected
- awareness
- acquisition
- monetization
- engagement
- leadgen
- registration

### Tactics
- none selected
- productrelease
- featureupdate
- announcement
- content
- retargeting
- branding
- eventpromotion
- experiment

## Deployment Instructions

### Prerequisites

- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- Vercel account (free tier works great)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to test the app.

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Recommended)

```bash
# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod
```

The CLI will guide you through the setup:
- Link to existing project or create new one
- Select your scope/team
- Confirm deployment

#### Option B: Deploy via Vercel Dashboard

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"

### Step 4: Share with Team

After deployment, Vercel provides a URL like: `https://metamask-utm-generator.vercel.app`

You can:
- Share this URL with the team
- Add a custom domain in Vercel settings
- Set up password protection if needed (Vercel Pro feature)

## Usage Guide

### Basic Workflow

1. **Enter User Information** - Your name or email (for tracking who created the deeplink)
2. **Enter Landing Page URL** - Must start with http:// or https://
3. **Fill Campaign Details**:
   - **UTM Source**: Traffic source (twitter, reddit, google)
   - **UTM Medium**: Marketing medium (paid_social, display, email)
   - **Campaign Name**: Descriptive name for the campaign
   - **Business Line**: Select from dropdown
   - **Start/End Dates**: Campaign duration
   - **Objective**: Select campaign goal from dropdown
   - **Tactic**: Select marketing tactic from dropdown
   - **Tags** (optional): Creative variations or additional metadata
4. **Campaign Code Auto-Generates** - Unique `cpm-` prefixed code is created automatically
5. **Copy URL** - Click "Copy to Clipboard" when all required fields are filled
6. **Use in Campaign** - Paste into your ad platform or link

### Generated URL Structure

The final URL will include:
- `utm_source` - Your entered source
- `utm_medium` - Your entered medium
- `utm_campaign` - Auto-generated campaign code (cpm-xxxxx)
- `utm_content` - Your tags (if provided)

### Examples

**Twitter Paid Campaign for MMExtension:**
```
User: jane@metamask.io
Landing Page: https://metamask.io/extension
UTM Source: twitter
UTM Medium: paid_social
Campaign Name: Q1_2025_Extension_Growth
Business Line: MMExtension
Start Date: 2025-03-01
End Date: 2025-03-31
Objective: acquisition
Tactic: productrelease
Tags: new_features_banner

Generated Code: cpm-xyz123abc
Final URL: https://metamask.io/extension?utm_source=twitter&utm_medium=paid_social&utm_campaign=cpm-xyz123abc&utm_content=new_features_banner
```

**Hypelab Display for Linea:**
```
User: marketing_team@consensys.net
Landing Page: https://linea.build
UTM Source: hypelab
UTM Medium: display
Campaign Name: Linea_Awareness_Feb2025
Business Line: Linea
Start Date: 2025-02-15
End Date: 2025-02-28
Objective: awareness
Tactic: branding
Tags: square_banner_728x90

Generated Code: cpm-def456ghi
Final URL: https://linea.build?utm_source=hypelab&utm_medium=display&utm_campaign=cpm-def456ghi&utm_content=square_banner_728x90
```

## Tracking in Analytics

These UTM parameters will appear in:
- **Google Analytics**: Acquisition > Campaigns
- **Mixpanel**: Custom event properties
- **Internal Dashboards**: Your React tracking dashboard

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Vercel** - Hosting

## Data Collection

The tool captures the following metadata for each generated deeplink:
- User who created it
- Landing page destination
- Traffic source and medium
- Campaign name and auto-generated code
- Business line attribution
- Campaign duration (start/end dates)
- Marketing objective and tactic
- Optional content tags

This comprehensive tracking enables better campaign analysis and ROI measurement across all MetaMask products.

## Support

For issues or feature requests, contact the Growth Marketing team or submit feedback through internal channels.

## License

Internal MetaMask tool - not for public distribution.
