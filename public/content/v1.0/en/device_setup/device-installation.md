

# Device Installation

This guide explains how to install the RB-X system and configure the network.<br>
Following the steps below, you can complete the installation in about 10 minutes.

---


### Step 0: Before You Begin

**Required Equipment**
- Router (WiFi enabled)
- 3 or more LAN cables
- Android tablet

<br>

### Step 1: Physical Network Setup

Connect all devices (Robot Control Box, Welder, Mini PC) to the router using LAN cables.

<div align="left">
  <img src="/assets/images/install/install1.png" alt="Network Diagram" width="50%">
</div>

**LAN Cable Connections**
- Router ↔ Robot Control Box
- Router ↔ Welder
- Router ↔ Mini PC

**Wireless Connection (WiFi)**
- Router ↔ Tablet


<br>

### Step 2: IP Address Configuration (Optional)

Set the same IP range for all devices. <br>
The default network range is **192.168.0.x**.

> **Note** During initial setup, configure addresses as shown below before delivery to the customer.

| Device | IP Address | Connection Type |
|:----------|:------------:|:--------------:|
| Router | `192.168.0.x` | - |
| RB Robot Control Box | `192.168.0.100` | LAN |
| Welder (Weco) | `192.168.0.12` | LAN |
| Welder (Kemppi) | `192.168.0.10` | LAN |
| Welder (Kolarc) | `192.168.1.11` | LAN |
| Mini PC | `192.168.0.210` | LAN |
| Tablet | DHCP (Auto) | WiFi |

<br>

### Step 3: Tablet Setup

1. **Download and Install RB-X APK**
   - Download the latest RB-X installation file from the link below.
     👉 [**RB-X APK Download Link**](https://rbweld-my.sharepoint.com/:f:/g/personal/juho_park_rb-ware_com/Evhj4zga8jNAtzfYnTVzntQBnO3AnarRJ9Z9PWUuBQvQ0Q)
   - After downloading, tap the `rbx_v.latest_number.apk` file on the tablet to install.
     *(Enable "Install unknown apps" if necessary)*

2. **WiFi Connection**
   - Connect the tablet to the **router's** WiFi.
     (Must be on the same network as RB-Gateway.)

3. **Launch RB-X App**
   - Tap the installed RB-X icon to launch the app.

4. **Network Configuration**
   - In the app's left menu, navigate to **Setup → System Set**.
   - Select the robot and welder information.


5. **Verify Connection**
   - Tap the **Connect** button at the top left of the main screen to verify the connection.
   - If "Connected" appears, the setup is complete.
   - If a "green LED" appears at the top right of the screen, the connection was successful.

<br>

### Step 4: Connection Verification

Check the following items:

- All devices are powered on
- LAN cables are properly connected
- Tablet is connected to Router WiFi
- Connection status is normal in the RB-X app

<br>

### Troubleshooting

### When Connection Fails

1. Turn off the Router power and turn it back on after **10 seconds**
2. Try connecting the LAN cable to a **different port**


### When IP Conflict is Suspected

Check the **DHCP assignment list** in the Router management page and change any duplicate IP addresses.

### When WiFi Works but Wired Connection Doesn't

- Verify that the Router's LAN and WiFi use the **same network range** (`192.168.0.x`)
- Check that Guest WiFi or VLAN separation features are **disabled**


<br>

### Network Information Summary

Network configuration information for quick reference.

```text
Network          : 192.168.0.0/24
Subnet Mask      : 255.255.255.0
Gateway          : 192.168.0.1

Robot Control Box: 192.168.0.100
Weco Welder      : 192.168.0.12
Kemppi Welder    : 192.168.0.10
Kolarc Welder    : 192.168.1.11
Mini PC          : 192.168.0.210 (kolarc use: 192.168.1.210)
Tablet           : DHCP
```

<br>
<br>
version: v1.0<br>
updated: 2025-11-12
<br>

---
### Next Steps

Once installation is complete, proceed to [Communication Setup](communication-setup.md).


