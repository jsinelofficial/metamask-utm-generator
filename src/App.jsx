import { useState, useEffect } from 'react';

function App() {
  // Form state
  const [user, setUser] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [businessLine, setBusinessLine] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [objective, setObjective] = useState('');
  const [tactic, setTactic] = useState('');
  const [tags, setTags] = useState('');
  const [campaignCode, setCampaignCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Dropdown options
  const businessLines = [
    'Consensys-All',
    'Developers-All',
    'MMask-Users',
    'MMExtension',
    'MMMobile',
    'MMInst',
    'MMDeveloper',
    'MMPortfolio',
    'Infura',
    'Linea'
  ];

  const objectives = [
    'none selected',
    'awareness',
    'acquisition',
    'monetization',
    'engagement',
    'leadgen',
    'registration'
  ];

  const tactics = [
    'none selected',
    'productrelease',
    'featureupdate',
    'announcement',
    'content',
    'retargeting',
    'branding',
    'eventpromotion',
    'experiment'
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

  // Validate URL format
  const isValidUrl = (url) => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      user &&
      isValidUrl(landingPageUrl) &&
      utmSource &&
      utmMedium &&
      campaignName &&
      businessLine &&
      startDate &&
      endDate &&
      objective &&
      objective !== 'none selected' &&
      tactic &&
      tactic !== 'none selected' &&
      campaignCode
    );
  };

  // Generate the final URL
  const generateUrl = () => {
    if (!isFormValid()) {
      return 'Please fill all required fields';
    }

    try {
      const url = new URL(landingPageUrl);
      const params = new URLSearchParams();

      params.append('utm_source', utmSource);
      params.append('utm_medium', utmMedium);
      params.append('utm_campaign', campaignCode);
      
      if (tags) {
        params.append('utm_content', tags);
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
    setLandingPageUrl('');
    setUtmSource('');
    setUtmMedium('');
    setCampaignName('');
    setBusinessLine('');
    setStartDate('');
    setEndDate('');
    setObjective('');
    setTactic('');
    setTags('');
    setCampaignCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            MetaMask UTM Generator
          </h1>
          <p className="text-gray-600">
            Internal deeplink generator for growth marketing campaigns
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          
          {/* User Info Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Information</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                User * <span className="text-gray-500 font-normal">(Who is generating this deeplink?)</span>
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Your name or email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Details</h2>
            
            {/* Landing Page URL */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Landing Page URL * <span className="text-gray-500 font-normal">(Must include https:// or http://)</span>
              </label>
              <input
                type="text"
                value={landingPageUrl}
                onChange={(e) => setLandingPageUrl(e.target.value)}
                placeholder="https://metamask.io/your-page"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  landingPageUrl && !isValidUrl(landingPageUrl) ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {landingPageUrl && !isValidUrl(landingPageUrl) && (
                <p className="text-xs text-red-500 mt-1">URL must start with http:// or https://</p>
              )}
            </div>

            {/* UTM Source and Medium */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  UTM Source *
                </label>
                <input
                  type="text"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  placeholder="twitter, reddit, google"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  UTM Medium *
                </label>
                <input
                  type="text"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="paid_social, display, email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Campaign Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Q1_2024_Brand_Awareness"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Business Line Dropdown */}
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

            {/* Start and End Date */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date *
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
                  End Date *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Objective and Tactic */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tactic *
                </label>
                <select
                  value={tactic}
                  onChange={(e) => setTactic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select tactic...</option>
                  {tactics.map((tac) => (
                    <option key={tac} value={tac}>
                      {tac}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags (Optional) */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="banner_v1, test_creative"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Campaign Code (Auto-generated) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campaign Code <span className="text-gray-500 font-normal">(Auto-generated)</span>
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md p-3 font-mono text-sm text-gray-700">
                {campaignCode || 'Will generate when required fields are filled'}
              </div>
            </div>
          </div>

          {/* Generated URL Section */}
          <div className="border-t pt-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Generated URL
              </label>
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
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
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
            <li>• Landing Page URL must start with http:// or https://</li>
            <li>• Campaign code is auto-generated with prefix "cpm-"</li>
            <li>• Campaign code will be used as the utm_campaign parameter</li>
            <li>• Tags are optional and will be added as utm_content if provided</li>
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
