
# RBWare Docs Platform (Skeleton)

This is the initial skeleton for the RBWare docs platform.

## Structure

- `public/assets/images/`
  - Global image storage (shared by all languages & versions)
  - Pre-created subfolders:
    - `system/`
    - `extension/`
    - `tools/`
    - `setup/`
    - `etc/`

- `content/v1.0/ko/`
  - `setup/WeldingSet.md`
  - `extension/WeldAdjust.md`
  - `tools/IoTester.md`
  - `system/` (empty for now)
  - `etc/` (empty for now)

- `content/v1.0/en/`
  - `setup/WeldingSet.md`
  - `extension/WeldAdjust.md`
  - `tools/IoTester.md`
  - `system/` (empty for now)
  - `etc/` (empty for now)

- `manifest.json`
  - Defines the tree structure for the sidebar:
    - Setup
    - Extension
    - Tools
    - System
    - Etc
  - Each item is mapped via a `slug` like `setup/WeldingSet`.
