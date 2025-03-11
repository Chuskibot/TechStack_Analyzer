// Tech stack detection patterns
const techPatterns = {
  frontend: [
    { name: 'React', pattern: /react|reactjs/i, versionPattern: /react@([0-9.]+)/i, global: 'React' },
    { name: 'Angular', pattern: /angular/i, versionPattern: /angular[\/\s]([0-9.]+)/i, global: 'angular' },
    { name: 'Vue.js', pattern: /vue/i, versionPattern: /vue@([0-9.]+)/i, global: 'Vue' },
    { name: 'jQuery', pattern: /jquery/i, versionPattern: /jquery[\/\s]([0-9.]+)/i, global: 'jQuery' },
    { name: 'Next.js', pattern: /next/i, versionPattern: /next[\/\s]([0-9.]+)/i, meta: 'next-head-count' },
    { name: 'Bootstrap', pattern: /bootstrap/i, versionPattern: /bootstrap[\/\s]([0-9.]+)/i },
    { name: 'Tailwind CSS', pattern: /tailwind/i },
    { name: 'TypeScript', pattern: /typescript/i },
    { name: 'Axios', pattern: /axios/i, global: 'axios' },
    { name: 'Redux', pattern: /redux/i, global: 'Redux' },
    { name: 'Svelte', pattern: /svelte/i },
    { name: 'Ember.js', pattern: /ember/i, global: 'Ember' },
    { name: 'Backbone.js', pattern: /backbone/i, global: 'Backbone' },
    { name: 'Alpine.js', pattern: /alpine/i, global: 'Alpine' },
    { name: 'Preact', pattern: /preact/i, global: 'preact' },
    { name: 'Material-UI', pattern: /material-ui|mui/i },
    { name: 'Ant Design', pattern: /antd|ant-design/i },
    { name: 'Chakra UI', pattern: /chakra/i },
    { name: 'Styled Components', pattern: /styled-components/i },
    { name: 'Emotion', pattern: /emotion/i },
    { name: 'Webpack', pattern: /webpack/i },
    { name: 'Babel', pattern: /babel/i },
    { name: 'ESLint', pattern: /eslint/i },
    { name: 'Prettier', pattern: /prettier/i },
    { name: 'Lodash', pattern: /lodash/i, global: '_' },
    { name: 'Moment.js', pattern: /moment/i, global: 'moment' },
    { name: 'D3.js', pattern: /d3/i, global: 'd3' },
    { name: 'Three.js', pattern: /three/i, global: 'THREE' },
    { name: 'Chart.js', pattern: /chart\.js/i, global: 'Chart' },
    { name: 'Gatsby', pattern: /gatsby/i }
  ],
  backend: [
    { name: 'Node.js', pattern: /node\.js|nodejs/i, header: 'X-Powered-By', headerPattern: /Node\.js/ },
    { name: 'Express', pattern: /express/i, header: 'X-Powered-By', headerPattern: /Express/ },
    { name: 'Django', pattern: /django/i, cookie: 'csrftoken' },
    { name: 'Ruby on Rails', pattern: /rails/i, meta: 'csrf-param' },
    { name: 'Laravel', pattern: /laravel/i, meta: 'csrf-token' },
    { name: 'ASP.NET', pattern: /asp\.net/i, header: 'X-AspNet-Version' },
    { name: 'PHP', pattern: /php/i, header: 'X-Powered-By', headerPattern: /PHP/ },
    { name: 'Flask', pattern: /flask/i },
    { name: 'Spring', pattern: /spring/i },
    { name: 'FastAPI', pattern: /fastapi/i },
    { name: 'Nest.js', pattern: /nestjs/i },
    { name: 'Koa', pattern: /koa/i },
    { name: 'Hapi', pattern: /hapi/i },
    { name: 'Symfony', pattern: /symfony/i },
    { name: 'CodeIgniter', pattern: /codeigniter/i },
    { name: 'CakePHP', pattern: /cakephp/i },
    { name: 'Yii', pattern: /yii/i },
    { name: 'Zend', pattern: /zend/i },
    { name: 'Strapi', pattern: /strapi/i },
    { name: 'GraphQL', pattern: /graphql/i }
  ],
  other: [
    { name: 'WordPress', pattern: /wordpress/i, meta: 'generator', metaPattern: /WordPress/ },
    { name: 'Shopify', pattern: /shopify/i, global: 'Shopify' },
    { name: 'Wix', pattern: /wix/i, meta: 'generator', metaPattern: /Wix/ },
    { name: 'Squarespace', pattern: /squarespace/i, meta: 'generator', metaPattern: /Squarespace/ },
    { name: 'Webflow', pattern: /webflow/i },
    { name: 'Drupal', pattern: /drupal/i, meta: 'generator', metaPattern: /Drupal/ },
    { name: 'Joomla', pattern: /joomla/i, meta: 'generator', metaPattern: /Joomla/ },
    { name: 'Magento', pattern: /magento/i, cookie: 'PHPSESSID' },
    { name: 'PrestaShop', pattern: /prestashop/i },
    { name: 'OpenCart', pattern: /opencart/i },
    { name: 'BigCommerce', pattern: /bigcommerce/i },
    { name: 'WooCommerce', pattern: /woocommerce/i },
    { name: 'Contentful', pattern: /contentful/i },
    { name: 'Sanity', pattern: /sanity/i },
    { name: 'Prismic', pattern: /prismic/i },
    { name: 'Netlify', pattern: /netlify/i, header: 'Server', headerPattern: /Netlify/ },
    { name: 'Vercel', pattern: /vercel/i, header: 'x-vercel-id' },
    { name: 'Heroku', pattern: /heroku/i, header: 'Via', headerPattern: /vegur/ },
    { name: 'AWS', pattern: /aws|amazon/i, header: 'Server', headerPattern: /AmazonS3|CloudFront/ },
    { name: 'Firebase', pattern: /firebase/i, global: 'firebase' },
    { name: 'MongoDB', pattern: /mongodb/i },
    { name: 'MySQL', pattern: /mysql/i },
    { name: 'PostgreSQL', pattern: /postgresql/i },
    { name: 'Redis', pattern: /redis/i },
    { name: 'Elasticsearch', pattern: /elasticsearch/i },
    { name: 'Cloudflare', pattern: /cloudflare/i, header: 'cf-ray' },
    { name: 'Akamai', pattern: /akamai/i, header: 'X-Akamai-Transformed' },
    { name: 'Fastly', pattern: /fastly/i, header: 'Fastly-Debug-Digest' },
    { name: 'Sentry', pattern: /sentry/i, global: 'Sentry' },
    { name: 'Google Analytics', pattern: /google-analytics|googletagmanager/i, global: 'ga' },
    { name: 'Google Tag Manager', pattern: /googletagmanager/i, global: 'dataLayer' },
    { name: 'Hotjar', pattern: /hotjar/i, global: 'hj' },
    { name: 'Intercom', pattern: /intercom/i, global: 'Intercom' },
    { name: 'Segment', pattern: /segment/i, global: 'analytics' },
    { name: 'Mixpanel', pattern: /mixpanel/i, global: 'mixpanel' },
    { name: 'Amplitude', pattern: /amplitude/i, global: 'amplitude' },
    { name: 'Stripe', pattern: /stripe/i, global: 'Stripe' },
    { name: 'PayPal', pattern: /paypal/i }
  ]
};

// Initialization flag to ensure the script is ready
let isInitialized = false;

// Initialize the content script
function initialize() {
  if (isInitialized) return;
  
  console.log('Tech Stack Analyzer content script initialized');
  
  // Set up a listener for direct messages from the popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Content script received message:', request);
    
    if (request.action === "getTechStack") {
      // Immediately send an acknowledgment to keep the message channel open
      sendResponse({status: "analyzing"});
      
      // Then detect the tech stack and send the real response
      detectTechStack(function(results) {
        try {
          // Send the results back to the popup via background script
          chrome.runtime.sendMessage({
            action: "techStackResults",
            results: results
          });
        } catch (error) {
          console.error('Error sending results back to popup:', error);
        }
      });
      
      return true; // Keep the message channel open for async response
    }
  });
  
  // Let the background script know we're ready
  chrome.runtime.sendMessage({
    action: "contentScriptReady",
    url: window.location.href
  });
  
  isInitialized = true;
}

// RapidAPI configuration
const RAPID_API_KEY = '3fbbdff93dmsh352127692b0863cp113fffjsnc4e15b12bd46';
const RAPID_API_HOST = 'technology-stack3.p.rapidapi.com';
const RAPID_API_URL = 'https://technology-stack3.p.rapidapi.com/RAPItif9m11S3g5f/';

// Function to detect tech stack using RapidAPI
function detectTechStackWithAPI(callback) {
  const currentUrl = window.location.href;
  
  // First check if we have a cached result for this URL
  chrome.runtime.sendMessage({
    action: "checkApiCache",
    url: currentUrl
  }, function(response) {
    if (response && response.cached) {
      console.log('Using cached API response');
      callback(response.data);
      return;
    }
    
    // No cache, make the API call
    try {
      const data = JSON.stringify({
        url: currentUrl
      });

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      // Set a timeout for the API request
      xhr.timeout = 10000; // 10 seconds timeout
      
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            try {
              const apiResponse = JSON.parse(this.responseText);
              const processedResults = processApiResponse(apiResponse);
              
              // Store the results in the cache
              chrome.runtime.sendMessage({
                action: "storeApiCache",
                url: currentUrl,
                data: processedResults
              });
              
              callback(processedResults);
            } catch (error) {
              console.error('Error parsing API response:', error);
              // Fallback to local detection if API fails
              const localResults = detectTechStackLocally();
              callback(localResults);
            }
          } else {
            console.error('API request failed with status:', this.status);
            // Fallback to local detection if API fails
            const localResults = detectTechStackLocally();
            callback(localResults);
          }
        }
      });
      
      xhr.addEventListener('timeout', function() {
        console.error('API request timed out');
        // Fallback to local detection if API times out
        const localResults = detectTechStackLocally();
        callback(localResults);
      });
      
      xhr.addEventListener('error', function() {
        console.error('API request failed');
        // Fallback to local detection if API fails
        const localResults = detectTechStackLocally();
        callback(localResults);
      });

      xhr.open('POST', RAPID_API_URL);
      xhr.setRequestHeader('x-rapidapi-key', RAPID_API_KEY);
      xhr.setRequestHeader('x-rapidapi-host', RAPID_API_HOST);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(data);
    } catch (error) {
      console.error('Error making API request:', error);
      // Fallback to local detection if API call fails
      const localResults = detectTechStackLocally();
      callback(localResults);
    }
  });
}

// Process the API response into our format
function processApiResponse(apiResponse) {
  const results = {
    frontend: [],
    backend: [],
    other: []
  };
  
  try {
    // This function needs to be customized based on the actual API response structure
    if (apiResponse && apiResponse.technologies) {
      apiResponse.technologies.forEach(tech => {
        const techInfo = {
          name: tech.name,
          version: tech.version || null
        };
        
        // Categorize the technology based on its type
        if (tech.type === 'frontend' || tech.categories?.includes('javascript') || tech.categories?.includes('ui')) {
          results.frontend.push(techInfo);
        } else if (tech.type === 'backend' || tech.categories?.includes('programming-language') || tech.categories?.includes('web-server')) {
          results.backend.push(techInfo);
        } else {
          results.other.push(techInfo);
        }
      });
    } else if (apiResponse && Array.isArray(apiResponse)) {
      // Alternative API response format (array of technologies)
      apiResponse.forEach(tech => {
        const techInfo = {
          name: tech.name || tech.technology || 'Unknown Technology',
          version: tech.version || null
        };
        
        // Simple categorization based on common patterns
        const techName = techInfo.name.toLowerCase();
        if (techName.includes('js') || techName.includes('css') || techName.includes('html') || 
            techName.includes('react') || techName.includes('vue') || techName.includes('angular')) {
          results.frontend.push(techInfo);
        } else if (techName.includes('php') || techName.includes('ruby') || techName.includes('python') || 
                  techName.includes('java') || techName.includes('node') || techName.includes('server')) {
          results.backend.push(techInfo);
        } else {
          results.other.push(techInfo);
        }
      });
    }
  } catch (error) {
    console.error('Error processing API response:', error);
  }
  
  return results;
}

// Function to detect tech stack locally (fallback method)
function detectTechStackLocally() {
  const htmlContent = document.documentElement.outerHTML;
  const scriptTags = document.getElementsByTagName('script');
  const metaTags = document.getElementsByTagName('meta');
  const linkTags = document.getElementsByTagName('link');
  
  // Results object
  const results = {
    frontend: [],
    backend: [],
    other: []
  };
  
  // Helper function to check if a technology is detected
  function checkTechnology(tech, category) {
    let detected = false;
    let version = null;
    
    // Check in HTML content
    if (tech.pattern && htmlContent.match(tech.pattern)) {
      detected = true;
      
      // Try to extract version from HTML
      if (tech.versionPattern) {
        const versionMatch = htmlContent.match(tech.versionPattern);
        if (versionMatch && versionMatch[1]) {
          version = versionMatch[1];
        }
      }
    }
    
    // Check in script tags
    if (!detected && tech.pattern) {
      for (let i = 0; i < scriptTags.length; i++) {
        const src = scriptTags[i].src || '';
        if (src.match(tech.pattern)) {
          detected = true;
          
          // Try to extract version from script src
          if (tech.versionPattern) {
            const versionMatch = src.match(tech.versionPattern);
            if (versionMatch && versionMatch[1]) {
              version = versionMatch[1];
            }
          }
          break;
        }
      }
    }
    
    // Check in meta tags
    if (!detected && tech.meta) {
      for (let i = 0; i < metaTags.length; i++) {
        const name = metaTags[i].getAttribute('name') || '';
        const content = metaTags[i].getAttribute('content') || '';
        
        if (name === tech.meta || (tech.metaPattern && content.match(tech.metaPattern))) {
          detected = true;
          break;
        }
      }
    }
    
    // Check in global variables
    if (!detected && tech.global && window[tech.global]) {
      detected = true;
      
      // Try to extract version from global variable
      if (typeof window[tech.global].version === 'string') {
        version = window[tech.global].version;
      }
    }
    
    // If detected, add to results
    if (detected) {
      results[category].push({
        name: tech.name,
        version: version
      });
    }
  }
  
  // Check for frontend technologies
  techPatterns.frontend.forEach(tech => {
    checkTechnology(tech, 'frontend');
  });
  
  // Check for backend technologies
  techPatterns.backend.forEach(tech => {
    checkTechnology(tech, 'backend');
  });
  
  // Check for other technologies
  techPatterns.other.forEach(tech => {
    checkTechnology(tech, 'other');
  });
  
  // Ensure we always return a valid result object
  return {
    frontend: results.frontend || [],
    backend: results.backend || [],
    other: results.other || []
  };
}

// Main function to detect tech stack (tries API first, falls back to local)
function detectTechStack(callback) {
  try {
    // Try to use the RapidAPI service first
    detectTechStackWithAPI(function(apiResults) {
      try {
        // Merge API results with local results for better coverage
        const localResults = detectTechStackLocally();
        
        // Combine results, avoiding duplicates
        const mergedResults = {
          frontend: [...(apiResults.frontend || [])],
          backend: [...(apiResults.backend || [])],
          other: [...(apiResults.other || [])]
        };
        
        // Helper function to check if a technology is already in the results
        function isTechInResults(tech, category) {
          return mergedResults[category].some(t => t.name.toLowerCase() === tech.name.toLowerCase());
        }
        
        // Add local results that aren't already in the API results
        ['frontend', 'backend', 'other'].forEach(category => {
          localResults[category].forEach(tech => {
            if (!isTechInResults(tech, category)) {
              mergedResults[category].push(tech);
            }
          });
        });
        
        callback(mergedResults);
      } catch (error) {
        console.error('Error merging results:', error);
        // If merging fails, just return the API results
        callback(apiResults);
      }
    });
  } catch (error) {
    console.error('Error in detectTechStack:', error);
    // If everything fails, return empty results
    callback({
      frontend: [],
      backend: [],
      other: []
    });
  }
}

// Initialize the content script when the page is fully loaded
if (document.readyState === 'complete') {
  initialize();
} else {
  window.addEventListener('load', initialize);
}

// Also try to initialize immediately in case the page is already loaded
initialize(); 