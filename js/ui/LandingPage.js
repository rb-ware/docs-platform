/**
 * Generate landing page HTML with i18n support
 * Clean, sophisticated design focused on 3 core actions
 * @param {Object} content - Language-specific content object
 * @returns {string} HTML string
 */
export function generateLandingHTML(content) {
  return `
<!-- Landing Page -->
<div class="min-h-[100vh] flex flex-col bg-[#0a0f1a]">
  <!-- Background -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.15)_0%,_transparent_50%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(127,29,29,0.1)_0%,_transparent_50%)]"></div>
  </div>

  <!-- Main Content -->
  <div class="relative flex-1 flex flex-col justify-center max-w-3xl mx-auto px-6 py-20 w-full">

    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span class="text-xs text-gray-400 font-medium tracking-wide">Documentation</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
        ${content.hero.title}
      </h1>
      <p class="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
        ${content.hero.subtitle}
      </p>
    </div>

    <!-- Cards -->
    <div class="space-y-3">

      <!-- Manual - Primary -->
      <a href="#/device_setup/device-installation"
         class="group block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h2 class="text-lg font-medium text-white">${content.actions.manual.title}</h2>
              <span class="px-2 py-0.5 text-[10px] font-medium text-blue-400 bg-blue-400/10 rounded">START HERE</span>
            </div>
            <p class="text-sm text-gray-500">${content.actions.manual.description}</p>
          </div>
          <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </a>

      <!-- Download -->
      <a href="https://rbweld-my.sharepoint.com/:f:/g/personal/juho_park_rb-ware_com/Evhj4zga8jNAtzfYnTVzntQBnO3AnarRJ9Z9PWUuBQvQ0Q"
         target="_blank"
         rel="noopener noreferrer"
         class="group block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-medium text-white mb-1">${content.actions.download.title}</h2>
            <p class="text-sm text-gray-500">${content.actions.download.description}</p>
          </div>
          <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </div>
      </a>

      <!-- Support -->
      <a href="mailto:juho.park@rbware.co.kr"
         class="group block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200">
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-medium text-white mb-1">${content.actions.email.title}</h2>
            <p class="text-sm text-gray-500">${content.actions.email.description}</p>
          </div>
          <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </a>

    </div>
  </div>

  <!-- Footer -->
  <footer class="relative border-t border-white/[0.06] py-6">
    <div class="max-w-3xl mx-auto px-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <span class="text-gray-600">${content.footer.copyright}</span>
        <div class="flex items-center gap-5">
          <a href="https://www.rb-ware.com" target="_blank" rel="noopener noreferrer"
             class="text-gray-500 hover:text-gray-300 transition-colors">
            ${content.footer.website}
          </a>
          <div class="flex items-center gap-3">
            <a href="https://www.linkedin.com/company/rbwinternational/" target="_blank" rel="noopener noreferrer"
               class="text-gray-600 hover:text-gray-400 transition-colors" aria-label="LinkedIn">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@RBWInc" target="_blank" rel="noopener noreferrer"
               class="text-gray-600 hover:text-gray-400 transition-colors" aria-label="YouTube">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
`;
}
