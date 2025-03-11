document.addEventListener('DOMContentLoaded', function() {
  const loadingElement = document.getElementById('loading');
  const resultsElement = document.getElementById('results');
  const errorElement = document.getElementById('error');
  const frontendList = document.getElementById('frontend-list');
  const backendList = document.getElementById('backend-list');
  const otherList = document.getElementById('other-list');
  const frontendCount = document.getElementById('frontend-count');
  const backendCount = document.getElementById('backend-count');
  const otherCount = document.getElementById('other-count');
  const themeToggle = document.getElementById('theme-toggle');

  // RapidAPI configuration - these will be replaced by environment variables
  // These default values will be used if the environment variables are not set
  const RAPID_API_KEY = chrome.runtime.getManifest().rapidApiKey || 'your_rapidapi_key_here';
  const RAPID_API_HOST = chrome.runtime.getManifest().rapidApiHost || 'technology-stack3.p.rapidapi.com';
  const RAPID_API_URL = chrome.runtime.getManifest().rapidApiUrl || 'https://technology-stack3.p.rapidapi.com/RAPItif9m11S3g5f/';

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Check for saved theme preference
  document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // Function to add tech items to the appropriate list
  function addTechItem(list, name, version = null) {
    const li = document.createElement('li');
    const techItem = document.createElement('div');
    techItem.className = 'tech-item';
    
    const techName = document.createElement('span');
    techName.className = 'tech-name';
    techName.textContent = name;
    techItem.appendChild(techName);
    
    if (version) {
      const techVersion = document.createElement('span');
      techVersion.className = 'tech-version';
      techVersion.textContent = version;
      techItem.appendChild(techVersion);
    }
    
    li.appendChild(techItem);
    list.appendChild(li);
    
    // If at least one item is added, show the results section
    resultsElement.classList.remove('hidden');
  }

  // Function to check if a list is empty and add a "None detected" message if it is
  function checkEmptyList(list, listElement, countElement) {
    if (list.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty-list';
      li.textContent = 'None detected';
      listElement.appendChild(li);
      countElement.textContent = '0';
    } else {
      countElement.textContent = list.length.toString();
    }
  }
  
  // Function to display tech stack results
  function displayTechStack(techStackData) {
    // Hide loading indicator
    loadingElement.classList.add('hidden');
    
    if (!techStackData || (!techStackData.frontend && !techStackData.backend && !techStackData.other)) {
      // Show error message if there was no valid data
      errorElement.classList.remove('hidden');
      return;
    }
    
    // Process and display the tech stack data
    const { frontend = [], backend = [], other = [] } = techStackData;
    
    // Add frontend technologies
    frontend.forEach(tech => {
      addTechItem(frontendList, tech.name, tech.version);
    });
    
    // Add backend technologies
    backend.forEach(tech => {
      addTechItem(backendList, tech.name, tech.version);
    });
    
    // Add other technologies
    other.forEach(tech => {
      addTechItem(otherList, tech.name, tech.version);
    });
    
    // Check for empty lists and add placeholder text
    checkEmptyList(frontend, frontendList, frontendCount);
    checkEmptyList(backend, backendList, backendCount);
    checkEmptyList(other, otherList, otherCount);
    
    // Add animation for smooth transition
    resultsElement.style.opacity = '0';
    resultsElement.classList.remove('hidden');
    
    setTimeout(() => {
      resultsElement.style.opacity = '1';
    }, 50);
    
    // Add animation to the sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
  }
  
  // Function to process API response
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
  
  // Function to detect tech stack using RapidAPI
  async function detectTechStackWithAPI(url) {
    try {
      // Check if API key is set
      if (RAPID_API_KEY === 'your_rapidapi_key_here') {
        console.warn('RapidAPI key not set. Skipping API detection.');
        return null;
      }
      
      const options = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
      };
      
      const response = await fetch(RAPID_API_URL, options);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      return processApiResponse(data);
    } catch (error) {
      console.error('Error calling RapidAPI:', error);
      return null;
    }
  }

  // Show loading indicator with animation
  loadingElement.classList.remove('hidden');
  loadingElement.style.opacity = '0';
  setTimeout(() => {
    loadingElement.style.opacity = '1';
  }, 50);
  resultsElement.classList.add('hidden');
  errorElement.classList.add('hidden');

  // Get the current active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs || tabs.length === 0) {
      loadingElement.classList.add('hidden');
      errorElement.classList.remove('hidden');
      console.error('No active tab found');
      return;
    }
    
    const currentTab = tabs[0];
    console.log('Current tab:', currentTab);
    
    // First check if we have results in the background script
    chrome.runtime.sendMessage({
      action: "getTechStackResults",
      tabId: currentTab.id
    }, function(response) {
      if (response && response.success) {
        console.log('Got tech stack results from background script:', response.results);
        displayTechStack(response.results);
        return;
      }
      
      // No cached results, try the API first
      console.log('No cached results, trying RapidAPI...');
      
      // Try to use RapidAPI
      detectTechStackWithAPI(currentTab.url).then(apiResults => {
        if (apiResults && (apiResults.frontend.length > 0 || apiResults.backend.length > 0 || apiResults.other.length > 0)) {
          console.log('Got results from RapidAPI:', apiResults);
          
          // Store results in background script for future use
          chrome.runtime.sendMessage({
            action: "storeDirectResults",
            tabId: currentTab.id,
            results: apiResults
          });
          
          // Display the results
          displayTechStack(apiResults);
        } else {
          // API failed or returned no results, fall back to direct detection
          console.log('RapidAPI failed or returned no results, falling back to direct detection...');
          
          // This function will be executed in the context of the web page
          function detectTechStackInPage() {
            // Tech patterns to detect
            const techPatterns = {
              frontend: [
                { name: 'React', pattern: /react|reactjs/i, global: 'React' },
                { name: 'Angular', pattern: /angular/i, global: 'angular' },
                { name: 'Vue.js', pattern: /vue/i, global: 'Vue' },
                { name: 'jQuery', pattern: /jquery/i, global: 'jQuery' },
                { name: 'Next.js', pattern: /next/i, meta: 'next-head-count' },
                { name: 'Bootstrap', pattern: /bootstrap/i },
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
                { name: 'Lodash', pattern: /lodash/i, global: '_' },
                { name: 'Moment.js', pattern: /moment/i, global: 'moment' },
                { name: 'D3.js', pattern: /d3/i, global: 'd3' },
                { name: 'Three.js', pattern: /three/i, global: 'THREE' },
                { name: 'Chart.js', pattern: /chart\.js/i, global: 'Chart' }
              ],
              backend: [
                { name: 'Node.js', pattern: /node\.js|nodejs/i },
                { name: 'Express', pattern: /express/i },
                { name: 'Django', pattern: /django/i },
                { name: 'Ruby on Rails', pattern: /rails/i },
                { name: 'Laravel', pattern: /laravel/i },
                { name: 'ASP.NET', pattern: /asp\.net/i },
                { name: 'PHP', pattern: /php/i },
                { name: 'Flask', pattern: /flask/i },
                { name: 'Spring', pattern: /spring/i },
                { name: 'GraphQL', pattern: /graphql/i }
              ],
              other: [
                { name: 'WordPress', pattern: /wordpress/i },
                { name: 'Shopify', pattern: /shopify/i, global: 'Shopify' },
                { name: 'Wix', pattern: /wix/i },
                { name: 'Squarespace', pattern: /squarespace/i },
                { name: 'Webflow', pattern: /webflow/i },
                { name: 'Drupal', pattern: /drupal/i },
                { name: 'Joomla', pattern: /joomla/i },
                { name: 'Firebase', pattern: /firebase/i, global: 'firebase' },
                { name: 'Google Analytics', pattern: /google-analytics|googletagmanager/i, global: 'ga' },
                { name: 'Google Tag Manager', pattern: /googletagmanager/i, global: 'dataLayer' },
                { name: 'Hotjar', pattern: /hotjar/i, global: 'hj' },
                { name: 'Intercom', pattern: /intercom/i, global: 'Intercom' },
                { name: 'Stripe', pattern: /stripe/i, global: 'Stripe' },
                { name: 'PayPal', pattern: /paypal/i }
              ]
            };
            
            // Results object
            const results = {
              frontend: [],
              backend: [],
              other: []
            };
            
            // Get HTML content
            const htmlContent = document.documentElement.outerHTML;
            const scriptTags = document.getElementsByTagName('script');
            const metaTags = document.getElementsByTagName('meta');
            
            // Detect technologies
            Object.keys(techPatterns).forEach(category => {
              techPatterns[category].forEach(tech => {
                let detected = false;
                let version = null;
                
                // Check in HTML content
                if (tech.pattern && htmlContent.match(tech.pattern)) {
                  detected = true;
                }
                
                // Check in script tags
                if (!detected && tech.pattern) {
                  for (let i = 0; i < scriptTags.length; i++) {
                    const src = scriptTags[i].src || '';
                    if (src.match(tech.pattern)) {
                      detected = true;
                      break;
                    }
                  }
                }
                
                // Check in meta tags
                if (!detected && tech.meta) {
                  for (let i = 0; i < metaTags.length; i++) {
                    const name = metaTags[i].getAttribute('name') || '';
                    if (name === tech.meta) {
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
              });
            });
            
            return results;
          }
          
          // Execute the detection function directly in the page context
          chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            function: detectTechStackInPage
          }, function(injectionResults) {
            if (chrome.runtime.lastError) {
              console.error('Script injection failed:', chrome.runtime.lastError);
              loadingElement.classList.add('hidden');
              errorElement.classList.remove('hidden');
              return;
            }
            
            if (!injectionResults || injectionResults.length === 0) {
              console.error('No results from script injection');
              loadingElement.classList.add('hidden');
              errorElement.classList.remove('hidden');
              return;
            }
            
            const techStackData = injectionResults[0].result;
            console.log('Direct detection results:', techStackData);
            
            // Store results in background script for future use
            chrome.runtime.sendMessage({
              action: "storeDirectResults",
              tabId: currentTab.id,
              results: techStackData
            });
            
            // Display the results
            displayTechStack(techStackData);
          });
        }
      });
    });
  });
}); 