# MiniPC Setup Guide

How to install Ubuntu and RB-Gateway on a new MiniPC.

---

## Requirements

- MiniPC
- USB drive (8GB or more)
- Monitor, Keyboard

---

## 1. Download Setup Files

Download setup files to use after MiniPC installation.

1. Go to [RBW Tech Docs](https://rb-ware.github.io/docs-platform/) site
2. Click **Download** on the main page

<img src="/assets/images/install/minipcSetup/download.png" alt="Main page Download" width="42%">

3. In **03. Mini PC Setup** folder, download files based on your welder

<img src="/assets/images/install/minipcSetup/onedrive.png" alt="Mini PC Setup folder" width="28%">

| Welder | Download Folder | IP Range |
|:-------|:----------------|:---------|
| Kemppi, Weco, etc. | **01. 192.168.0.1** | 192.168.**0**.x |
| Kolarc | **02. 192.168.1.1** | 192.168.**1**.x |

> Keep downloaded files on your PC. Copy to MiniPC after Ubuntu installation.

---

## 2. Create Ubuntu Boot Disk

### Download Ubuntu ISO

Download **Ubuntu 24.04 LTS** from [ubuntu.com/download](https://ubuntu.com/download/desktop).

<img src="/assets/images/install/minipcSetup/ubuntu_download.png" alt="Ubuntu Download" width="42%">

### Create USB with Rufus

Download and run Rufus from [rufus.ie](https://rufus.ie).

<img src="/assets/images/install/minipcSetup/set-Rufus.png" alt="Rufus Settings" width="28%">

| # | Item | Setting |
|:-:|:-----|:--------|
| ① | Boot selection | Click **SELECT** → Choose downloaded Ubuntu ISO file |
| ② | Partition scheme | **MBR** or **GPT** (GPT for UEFI) |
| ③ | Execute | Click **START** → Wait for completion (5-10 min) |

> All data on USB will be erased.

---

## 3. Install Ubuntu

### Set USB Boot in BIOS

1. Connect monitor, keyboard, USB to MiniPC
2. Power on and press **F2** or **Delete** repeatedly
3. **Boot** tab → Change Boot Option #1 to **USB**

<img src="/assets/images/install/minipcSetup/bios_boot.png" alt="BIOS Boot Settings" width="42%">

4. Press **F10** to save and reboot

### Ubuntu Installation

1. Select **Try or Install Ubuntu**
2. Click **Install Ubuntu**
3. Installation options:
   - Language: English
   - Keyboard: English (US)
   - Select **Erase disk and install Ubuntu**

### User Setup

| Field | Recommended |
|:------|:------------|
| Name / Username | `gateway` |
| Password | 4-digit number (Never forget. Essential for service) |
| Login | Check **Log in automatically** |

> **After installation, reboot and remove USB.**

---

## 4. Copy Setup Files

After Ubuntu installation, copy the files downloaded in Step 1 (01. IP Setup, 02. RB-Gateway) to MiniPC.

**Option 1: Two USBs (Recommended)**
- It's convenient to have setup files on a separate USB beforehand

**Option 2: Single USB**
- Reformat USB to normal format (FAT32/NTFS)
- Copy setup files and connect to MiniPC

**Option 3: Network**
- Connect MiniPC to internet and download directly from OneDrive

---

## 5. IP Configuration

Open the downloaded folder (01. 192.168.0.1 or 02. 192.168.1.1) to see this structure:

<img src="/assets/images/install/minipcSetup/directory.png" alt="Folder structure" width="25%">

Go to **01. IP Setup** folder.

<img src="/assets/images/install/minipcSetup/ip_openinterminal.png" alt="IP Setup folder" width="42%">

Right-click in empty space → **Open in Terminal**, then run:

```bash
chmod 755 *
sudo ./ipset.sh
```

<img src="/assets/images/install/minipcSetup/ipset.png" alt="IP Setup" width="42%">

Script automatically sets IP to `192.168.0.210`.

> For Kolarc welder: `192.168.1.210`

---

## 6. Install RB-Gateway

### Install

Go to **02. RB-Gateway** folder → **deploy** folder.

<img src="/assets/images/install/minipcSetup/gw_openinterminal1.png" alt="deploy folder" width="42%">

Right-click in empty space → **Open in Terminal**, then run:

```bash
sudo ./install.sh
```

<img src="/assets/images/install/minipcSetup/gw_install.png" alt="Gateway Install" width="42%">

### Verify

```bash
sudo ./health-check.sh
```

<img src="/assets/images/install/minipcSetup/gw_healthy.png" alt="Gateway Status" width="42%">

**"OK: Gateway is healthy"** means setup is complete.

---

## Troubleshooting

| Issue | Solution |
|:------|:---------|
| Ubuntu installation freezes | Disable Secure Boot in BIOS |
| No network | Check LAN cable, test with `ping 192.168.0.1` |
| Gateway error | `sudo ./stop.sh` → `sudo ./start.sh` |

---

## Network Info

**0-series (Kemppi, Weco, etc.)**
```
MiniPC IP        : 192.168.0.210
Robot Control Box: 192.168.0.100
Gateway          : 192.168.0.1
```

**1-series (Kolarc)**
```
MiniPC IP        : 192.168.1.210
Robot Control Box: 192.168.1.100
Gateway          : 192.168.1.1
```

<br>

version: v1.0 | updated: 2025-12-05

---

**Next**: Go to [Device Installation](device-installation.md) to connect the full system.
