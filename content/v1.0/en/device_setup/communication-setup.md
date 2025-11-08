# Communication Setup

## Overview
This document explains how to configure communication network between RBWare system devices.

## Communication Method
- Ethernet-based TCP/IP communication
- Recommended speed: 1Gbps

## Connection Procedure

### 1. Network Configuration
Configure the network topology.
- Prepare switch
- Connect cables (CAT6 or higher recommended)

### 2. IP Address Configuration
Set IP addresses for each device.
```
Default IP range: 192.168.1.x
Subnet mask: 255.255.255.0
Gateway: 192.168.1.1
```

### 3. Communication Test
Verify connection status with ping test.
```bash
ping 192.168.1.100
```

## Troubleshooting
- Check cable connection if connection fails
- Verify firewall settings
- Check for IP conflicts
