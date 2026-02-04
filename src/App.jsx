import { useState, useEffect } from 'react';

function App() {
  // Form state
  const [user, setUser] = useState('');
  const [urlType, setUrlType] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [jiraTicket, setJiraTicket] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [businessLine, setBusinessLine] = useState('');
  const [objective, setObjective] = useState('');
  const [tactic, setTactic] = useState('');
  const [tags, setTags] = useState('');
  const [campaignCode, setCampaignCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Dropdown options
  const urlTypes = [
    { value: 'https://metamask.io', label: 'Web - metamask.io' },
    { value: 'https://portfolio.metamask.io', label: 'Web - Portfolio' },
    { value: 'metamask://predict', label: 'Mobile Deeplink - Predict' },
    { value: 'metamask://swap', label: 'Mobile Deeplink - Swap' },
    { value: 'metamask://buy', label: 'Mobile Deeplink - Buy' },
    { value: 'metamask://browser', label: 'Mobile Deeplink - Browser' },
    { value: 'custom', label: 'Custom URL' }
  ];

  const sources = [
    'Twitter / X',
    'Discord',
    'Telegram',
    'Reddit',
    'YouTube',
    'TikTok',
    'Instagram',
    'LinkedIn',
    'Email - Newsletter',
    'Email - Transactional',
    'Google Ads',
    'Meta Ads',
    'Partner - Polymarket',
    'Partner - Other',
    'Influencer',
    'Press / PR',
    'Blog',
    'Documentation',
    'Direct',
    'QR Code'
  ];

  const mediums = [
    'Social (organic posts)',
    'Paid (ads)',
    'Owned (our channels)',
    'Email',
    'Partner',
    'Influencer',
    'Display',
    'Referral',
    'Push Notification',
    'In-App',
    'Affiliate',
    'Press / PR'
  ];

  const businessLines = [
    'Trade (Swaps, Perps, Predict)',
    'Growth',
    'Ramps (Buy/Sell)',
    'Staking',
    'Portfolio',
    'Security',
    'Brand',
    'Developer Relations'
  ];

  const objectives = [
    'Acquisition (new users)',
    'Activation (first action)',
    'Engagement (return usage)',
    'Retention',
    'Revenue',
    'Awareness'
  ];

  const tactics = [
    '',
    'Homepage Carousel',
    'Banner Ad',
    'Social Post',
    'Thread / Long-form',
    'Video',
    'Newsletter',
    'Announcement',
    'Contest / Giveaway',
    'AMA',
    'Partnership Feature',
    'Press Release',
    'Blog Post'
  ];

  // Generate campaign code automatically
  const generateCampaignCode = () => {
    // Generate 8 random digits
    const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
    return `cpm-${randomNumbers}-afbf08`;
  };

  // Auto-generate campaign code when key fields change
  useEffect(() => {
    if (campaignName && businessLine && utmSource) {
      setCampaignCode(generateCampaignCode());
    }
  }, [campaignName, businessLine, utmSource]);

  // Get the actual URL based on type selection
  const getDestinationUrl = () => {
    if (urlType === 'custom') {
      return customUrl;
    }
    return urlType;
  };

  // Validate URL format
  const isValidUrl = (url) => {
    if (!url) return false;
    // Allow metamask:// deeplinks or http/https URLs
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('metamask://');
  };

  // Normalize value to lowercase and replace spaces with underscores
  const normalizeValue = (value) => {
    return value.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const destinationUrl = getDestinationUrl();
    return (
      user &&
      isValidUrl(destinationUrl) &&
      jiraTicket &&
      campaignName &&
      startDate &&
      endDate &&
      utmSource &&
      utmMedium &&
      businessLine &&
      objective &&
      campaignCode
    );
  };

  // Generate the final URL
  const generateUrl = () => {
    if (!isFormValid()) {
      return 'Fill all required fields to generate URL';
    }

    try {
      const destinationUrl = getDestinationUrl();
      const url = new URL(destinationUrl);
      const params = new URLSearchParams();

      // Normalize and add parameters
      params.append('utm_source', normalizeValue(utmSource));
      params.append('utm_medium', normalizeValue(utmMedium));
      params.append('utm_campaign', campaignCode);
      
      if (tags) {
        params.append('utm_content', normalizeValue(tags));
      }

      const paramString = params.toString();
      return `${url.toString()}${url.search ? '&' : '?'}${paramString}`;
    } catch (e) {
      return 'Invalid URL format';
    }
  };

  const generatedUrl = generateUrl();

  const copyToClipboard = () => {
    if (isFormValid()) {
      navigator.clipboard.writeText(generatedUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const clearAll = () => {
    setUser('');
    setUrlType('');
    setCustomUrl('');
    setJiraTicket('');
    setCampaignName('');
    setStartDate('');
    setEndDate('');
    setUtmSource('');
    setUtmMedium('');
    setBusinessLine('');
    setObjective('');
    setTactic('');
    setTags('');
    setCampaignCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Campaign Link Builder
          </h1>
          <p className="text-gray-600">
            Generate UTM-tagged URLs with consistent taxonomy
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          
          {/* User Information Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Information</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name / Email *
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="For audit trail — who created this link?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Destination URL Section */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Destination URL</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Type *
              </label>
              <select
                value={urlType}
                onChange={(e) => setUrlType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select destination...</option>
                {urlTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {urlType === 'custom' && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Custom URL *
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://your-custom-url.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Campaign Details Section */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Details</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jira Ticket ID *
              </label>
              <input
                type="text"
                value={jiraTicket}
                onChange={(e) => setJiraTicket(e.target.value)}
                placeholder="Links campaign to Jira for traceability"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Short name (use snake_case)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* UTM Parameters Section */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">UTM Parameters</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                UTM Source *
              </label>
              <select
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select source...</option>
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Where is the traffic coming from?</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                UTM Medium *
              </label>
              <select
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select medium...</option>
                {mediums.map((medium) => (
                  <option key={medium} value={medium}>
                    {medium}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">What type of channel?</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Line *
              </label>
              <select
                value={businessLine}
                onChange={(e) => setBusinessLine(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select business line...</option>
                {businessLines.map((line) => (
                  <option key={line} value={line}>
                    {line}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Objective *
              </label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select objective...</option>
                {objectives.map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tactic
              </label>
              <select
                value={tactic}
                onChange={(e) => setTactic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select tactic (optional)...</option>
                {tactics.filter(t => t).map((tac) => (
                  <option key={tac} value={tac}>
                    {tac}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags / Variant
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Used as utm_content — identify creative variants"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Generated URL Section */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Generated URL</h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="bg-white border border-gray-300 rounded-md p-3 break-all text-sm font-mono text-gray-800 min-h-[60px]">
                {generatedUrl}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                disabled={!isFormValid()}
                className={`flex-1 py-3 rounded-md font-semibold transition-colors ${
                  copied
                    ? 'bg-green-500 text-white'
                    : isFormValid()
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {copied ? '✓ Copied to Clipboard!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Required Fields</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All fields marked with * are required</li>
            <li>• Campaign code is auto-generated: <code className="bg-white px-2 py-0.5 rounded">cpm-[8 digits]-afbf08</code></li>
            <li>• Tags are optional and become <code className="bg-white px-2 py-0.5 rounded">utm_content</code></li>
            <li>• All values are normalized to lowercase</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Built for MetaMask Growth Marketing Team
        </div>
      </div>
    </div>
  );
}

export default App;
