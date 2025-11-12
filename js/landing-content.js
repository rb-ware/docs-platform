export const LANDING_HTML = `
<!-- Hero Section -->
<div class="relative overflow-hidden bg-gradient-to-br from-[#071B3C] via-[#0a2347] to-[#1a3a5c] min-h-[60vh] flex items-center">
  <!-- Animated background pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-0 -left-4 w-72 h-72 bg-[#ff2e2e] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
  </div>

  <div class="relative max-w-6xl mx-auto px-6 py-20 w-full">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Welcome to<br/>
        <span class="bg-gradient-to-r from-[#ff2e2e] to-[#ff6b6b] bg-clip-text text-transparent">
          RBWare Tech Docs
        </span>
      </h1>

      <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
        Complete documentation for collaborative robot welding & grinding solutions.<br/>
        Easy-to-use software for professional automation.
      </p>
    </div>
  </div>

  <!-- Wave separator -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
    </svg>
  </div>
</div>

<!-- Features Section -->
<div class="bg-white py-16">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">Why RB-X?</h2>
      <p class="text-gray-600">Simple yet powerful solution for welding & grinding automation</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white mb-4 shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Easy to Use</h3>
        <p class="text-gray-600">Intuitive interface designed for quick setup and operation without complex programming.</p>
      </div>

      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white mb-4 shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Fast & Efficient</h3>
        <p class="text-gray-600">Reduce setup time and increase productivity with streamlined workflows.</p>
      </div>

      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl text-white mb-4 shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Proven Reliability</h3>
        <p class="text-gray-600">Field-tested stability for industrial welding and grinding applications.</p>
      </div>
    </div>
  </div>
</div>

<!-- Related Links Section -->
<div class="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">Related Resources</h2>
      <p class="text-gray-600">Additional resources and support</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- RBWare Website -->
      <a href="https://www.rb-ware.com" target="_blank" rel="noopener noreferrer"
         class="group flex items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#ff2e2e]">
        <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-[#ff2e2e] transition-colors mb-2">
            RBWare Official Website
            <svg class="inline-block w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </h3>
          <p class="text-gray-600 text-sm">Visit our main website for product information and company news.</p>
          <p class="text-xs text-gray-500 mt-2">www.rb-ware.com</p>
        </div>
      </a>

      <!-- Rainbow Robotics Docs -->
      <a href="https://rainbowrobotics.github.io/rb_cobot_docs/ko/" target="_blank" rel="noopener noreferrer"
         class="group flex items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#ff2e2e]">
        <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-[#ff2e2e] transition-colors mb-2">
            Rainbow Robotics Technical Docs
            <svg class="inline-block w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </h3>
          <p class="text-gray-600 text-sm">Comprehensive technical documentation for RB Cobot series.</p>
          <p class="text-xs text-gray-500 mt-2">rainbowrobotics.github.io</p>
        </div>
      </a>

      <!-- Email Support -->
      <a href="mailto:juho.park@rbware.co.kr"
         class="group flex items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#ff2e2e]">
        <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-[#ff2e2e] transition-colors mb-2">
            Email Support
          </h3>
          <p class="text-gray-600 text-sm">Get help from our technical support team.</p>
          <p class="text-xs text-gray-500 mt-2">juho.park@rbware.co.kr</p>
        </div>
      </a>

      <!-- GitHub Repository -->
      <a href="#/device_setup/device-installation"
         class="group flex items-start p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#ff2e2e]">
        <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-[#ff2e2e] transition-colors mb-2">
            Getting Started Guide
          </h3>
          <p class="text-gray-600 text-sm">Step-by-step installation and setup instructions.</p>
          <p class="text-xs text-gray-500 mt-2">Begin your journey →</p>
        </div>
      </a>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="bg-[#071B3C] text-gray-300 py-12">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
      <div>
        <h4 class="text-white font-bold text-lg mb-4">RBWare</h4>
        <p class="text-sm leading-relaxed">Collaborative robot solutions for welding and grinding automation. Easy-to-use software for professional applications.</p>
      </div>
      <div>
        <h4 class="text-white font-bold text-lg mb-4">Contact</h4>
        <p class="text-sm mb-2">
          Email: <a href="mailto:sales@rb-ware.com" class="hover:text-[#ff2e2e] transition-colors">sales@rb-ware.com</a>
        </p>
        <p class="text-sm">
          Website: <a href="https://www.rb-ware.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#ff2e2e] transition-colors">www.rb-ware.com</a>
        </p>
      </div>
    </div>
    <div class="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
      © 2025 RBWare Co., Ltd. All rights reserved.
    </div>
  </div>
</footer>
`;
