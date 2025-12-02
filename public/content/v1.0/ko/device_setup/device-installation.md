

# 장비 설치

RB-X 시스템을 설치하고 네트워크를 구성하는 방법을 설명합니다.<br>
아래 순서대로 진행하면 약 10분 내에 설치를 완료할 수 있습니다.

---


### 0단계: 시작하기 전에

**필요한 장비**
- Router (WiFi 지원)
- LAN 케이블 3개 이상
- Android 태블릿

<br>

### 1단계: 물리적 네트워크 구성

공유기(Router)에 모든 장비(Robot Control Box, Welder, Mini PC)를 LAN 케이블로 연결합니다.

<div align="left">
  <img src="/assets/images/install/install1.png" alt="네트워크 구성도" width="50%">
</div>

**LAN 케이블 연결 대상**
- 공유기 ↔ Robot Control Box
- 공유기 ↔ Welder
- 공유기 ↔ Mini PC

**무선 연결 (WiFi)**
- 공유기 ↔ Tablet


<br>

### 2단계: IP 주소 설정 (생략 가능)

각 장비에 IP대역을 동일하게 설정합니다. <br>
기본 네트워크 대역은 **192.168.0.x**입니다.

> **참고** 초기 세팅시 아래와 같이 주소를 세팅하여 고객에게 전달합니다. 

| 장비 | IP 주소 | 연결 방식 |
|:----------|:------------:|:--------------:|
| 공유기 | `192.168.0.x` | - |
| RB로봇 컨트롤박스 | `192.168.0.100` | LAN |
| 용접기 (Weco) | `192.168.0.12` | LAN |
| 용접기 (Kemppi) | `192.168.0.10` | LAN |
| 용접기 (Kolarc) | `192.168.1.11` | LAN |
| Mini PC | `192.168.0.210` | LAN |
| 태블릿 | DHCP (자동) | WiFi |

<br>

### 3단계: 태블릿 설정

1. **RB-X APK 다운로드 및 설치**
   - 아래 링크에서 최신 RB-X 설치 파일을 다운로드하세요.  
     👉 [**RB-X APK 다운로드 링크**](https://rbweld-my.sharepoint.com/:f:/g/personal/juho_park_rb-ware_com/Evhj4zga8jNAtzfYnTVzntQBnO3AnarRJ9Z9PWUuBQvQ0Q)
   - 다운로드 후, 태블릿에서 `rbx_v.최신숫자.apk` 파일을 눌러 설치합니다.  
     *(필요 시 “알 수 없는 앱 허용”을 활성화)*

2. **Wi-Fi 연결**
   - 태블릿을 **공유기**의 Wi-Fi에 연결합니다.  
     (RB-Gateway와 동일한 네트워크여야 합니다.)

3. **RB-X 앱 실행**
   - 설치된 RB-X 아이콘을 눌러 앱을 실행합니다.

4. **네트워크 설정**
   - 앱 왼쪽 메뉴에서 **Setup → System Set** 으로 이동합니다.  
   - 로봇, 용접기 정보를 선택합니다.


5. **연결 확인**
   - 메인화면 왼쪽 상단 **Connect** 버튼을 눌러 연결이 정상적으로 이루어졌는지 확인합니다.  
   - “Connected” 표시가 나타나면 설정이 완료된 것입니다.
   - 화면 오른쪽 상단에 "초록색 LED" 표시가 나타나면 연결이 성공적으로 이루어졌습니다.

<br>

### 4단계: 연결 확인

다음 항목을 확인하세요:

- 모든 장비의 전원이 켜져 있습니다
- LAN 케이블이 올바르게 연결되어 있습니다
- 태블릿이 Router WiFi에 연결되어 있습니다
- RB-X 앱에서 연결 상태가 정상입니다

<br>

### 문제 해결

### 연결되지 않을 때

1. Router 전원을 껐다가 **10초 후** 다시 켭니다
2. LAN 케이블을 **다른 포트**에 연결해 봅니다


### IP 충돌이 의심될 때

Router 관리 페이지에서 **DHCP 할당 목록**을 확인하고, 중복되는 IP 주소를 변경합니다.

### WiFi는 되지만 유선이 안 될 때

- Router의 LAN과 WiFi가 **같은 네트워크 대역**(`192.168.0.x`)을 사용하는지 확인합니다
- Guest WiFi나 VLAN 분리 기능이 **비활성화**되어 있는지 확인합니다


<br>

### 네트워크 정보 요약

빠른 참조를 위한 네트워크 설정 정보입니다.

```text
Network          : 192.168.0.0/24
Subnet Mask      : 255.255.255.0
Gateway          : 192.168.0.1

Robot Control Box: 192.168.0.100
Weco Welder      : 192.168.0.12
Kemppi Welder    : 192.168.0.10
Kolarc Welder    : 192.168.1.11
Mini PC          : 192.168.0.210 (kolarc 사용 시 192.168.1.210)
Tablet           : DHCP
```

<br>
<br>
version: v1.0<br>
updated: 2025-11-12
<br>

---
### 다음 단계

설치가 완료되면 [통신 설정](communication-setup.md)을 진행하세요.


