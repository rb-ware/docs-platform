# RB-X Welding Machine Feature Support List

<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
  <div class="legend-box">
    <div class="legend-item">
      <span class="legend-color" style="background:#dcfce7;color:#166534">App</span>
      <span>Direct App Execution</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background:#fef3c7;color:#92400e">PC</span>
      <span>PC Only</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background:#f1f5f9;color:#94a3b8">-</span>
      <span>In Development</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background:#fecaca;color:#991b1b">X</span>
      <span>Not Supported</span>
    </div>
  </div>
  <div class="update-date" style="font-size:14px;font-weight:600;">As of: 2025.12.02</div>
</div>

<div class="table-container">
<table class="feature-table">
  <thead>
    <tr>
      <th rowspan="2">Menu</th>
      <th rowspan="2">Feature</th>
      <th colspan="4" class="header-mig">MIG</th>
      <th colspan="2" class="header-laser">Laser</th>
    </tr>
    <tr>
      <th class="header-mig">Analog</th>
      <th class="header-mig">Kemppi</th>
      <th class="header-mig">Weco</th>
      <th class="header-mig">Kolarc</th>
      <th class="header-laser">IMT</th>
      <th class="header-laser">Maven</th>
    </tr>
  </thead>
  <tbody>
    <!-- Welder Interface -->
    <tr>
      <td class="menu-col" rowspan="4">Welder Interface</td>
      <td class="feature-col">Weld Start/End</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
    </tr>
    <tr>
      <td class="feature-col">Memory Mode</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="unsupported" title="This feature is not supported on this welders.">X</td>
      <td class="unsupported" title="This feature is not supported on this welders.">X</td>
    </tr>
    <tr>
      <td class="feature-col">Manual Mode</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="unsupported" title="This feature is not supported on Kolarc welders.">X</td>
      <td class="unsupported" title="This feature is not supported on this welders.">X</td>
      <td class="unsupported" title="This feature is not supported on this welders.">X</td>
    </tr>
    <tr>
      <td class="feature-col">Additional Option</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="unsupported" title="This feature is not supported on this welders.">X</td>
      <td class="unsupported" title="This feature is not supported on this welders.">X</td>
    </tr>
    <!-- Setup -->
    <tr>
      <td class="menu-col" rowspan="4">Setup</td>
      <td class="feature-col">System Set</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Utilities</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">TCP Set</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Welding Set</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <!-- Extension -->
    <tr>
      <td class="menu-col" rowspan="10">Extension</td>
      <td class="feature-col">Weaving</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Program Call</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Shift</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Jump</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">D/A Output</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Batch Weld Mod</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Weld Adjust</td>
      <td class="none" title="This feature is in development for Analog welders.">-</td>
      <td class="pc">PC</td>
      <td class="none" title="This feature is in development for Weco welders.">-</td>
      <td class="pc">PC</td>
      <td class="none" title="This feature is in development for IMT welders.">-</td>
      <td class="none" title="This feature is in development for Maven welders.">-</td>
    </tr>
    <tr>
      <td class="feature-col">Repeat</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Multi Pass</td>
      <td class="app">App</td>
      <td class="none" title="This feature is not supported on Kemppi welders.">-</td>
      <td class="none" title="This feature is not supported on Weco welders.">-</td>
      <td class="none" title="This feature is not supported on Kolarc welders.">-</td>
      <td class="none" title="This feature is not supported on IMT welders.">-</td>
      <td class="none" title="This feature is not supported on Maven welders.">-</td>
    </tr>
    <tr>
      <td class="feature-col">Ext. Axis</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="none" title="This feature is in development for IMT welders.">-</td>
      <td class="pc">PC</td>
    </tr>
    <!-- Tool -->
    <tr>
      <td class="menu-col" rowspan="3">Tool</td>
      <td class="feature-col">Download RB_Log</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">I/O Tester</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Program Scheduler</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="none" title="This feature is in development for IMT welders.">-</td>
      <td class="none" title="This feature is in development for Maven welders.">-</td>
    </tr>
    <!-- Welder Feature -->
    <tr>
      <td class="menu-col" rowspan="4">Welder Feature</td>
      <td class="feature-col">Gas Check</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
    </tr>
    <tr>
      <td class="feature-col">Inching, Back Inching</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
    </tr>
    <tr>
      <td class="feature-col">No Arc</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">Custom Start</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <!-- InterLock -->
    <tr>
      <td class="menu-col" rowspan="3">InterLock</td>
      <td class="feature-col">Pause / Resume</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
      <td class="pc">PC</td>
    </tr>
    <tr>
      <td class="feature-col">Stop / Emergency Stop</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
    <tr>
      <td class="feature-col">IN/External Collision</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="app">App</td>
      <td class="app">App</td>
    </tr>
  </tbody>
</table>
</div>
