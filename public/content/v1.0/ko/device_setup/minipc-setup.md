# MiniPC 세팅 가이드

새 MiniPC에 Ubuntu와 RB-Gateway를 설치하는 방법입니다.

---

## 준비물

- MiniPC
- USB 메모리 (8GB 이상)
- 모니터, 키보드

---

## 1. 설치 파일 다운로드

MiniPC 설치 후 사용할 파일들을 미리 다운로드합니다.

1. [RBW Tech Docs](https://rb-ware.github.io/docs-platform/) 사이트 접속
2. 메인화면에서 **다운로드** 클릭

<img src="/assets/images/install/minipcSetup/download.png" alt="메인화면 다운로드" width="42%">

3. **03. Mini PC Setup** 폴더에서 용접기에 맞는 파일 다운로드

<img src="/assets/images/install/minipcSetup/onedrive.png" alt="Mini PC Setup 폴더" width="28%">

| 용접기 | 다운로드 폴더 | IP 대역 |
|:-------|:-------------|:--------|
| Kemppi, Weco 등 | **01. 192.168.0.1** | 192.168.**0**.x |
| Kolarc | **02. 192.168.1.1** | 192.168.**1**.x |

> 다운로드한 파일은 PC에 보관해두세요. Ubuntu 설치 후 MiniPC로 복사합니다.

---

## 2. Ubuntu 부팅 디스크 만들기

### Ubuntu ISO 다운로드

[ubuntu.com/download](https://ubuntu.com/download/desktop)에서 **Ubuntu 24.04 LTS**를 다운로드합니다.

<img src="/assets/images/install/minipcSetup/ubuntu_download.png" alt="Ubuntu 다운로드" width="42%">

### Rufus로 USB 굽기

[rufus.ie](https://rufus.ie)에서 Rufus를 다운로드하고 실행합니다.

<img src="/assets/images/install/minipcSetup/set-Rufus.png" alt="Rufus 설정" width="28%">

| 번호 | 항목 | 설정 |
|:----:|:-----|:-----|
| ① | Boot selection | **SELECT** 클릭 → 다운로드한 Ubuntu ISO 파일 선택 |
| ② | Partition scheme | **MBR** 또는 **GPT** (UEFI 사용 시 GPT) |
| ③ | 실행 | **START** 클릭 → 완료까지 대기 (5~10분) |

> USB의 모든 데이터가 삭제됩니다.

---

## 3. Ubuntu 설치

### BIOS에서 USB 부팅 설정

1. MiniPC에 모니터, 키보드, USB 연결
2. 전원 켜면서 **F2** 또는 **Delete** 연타
3. **Boot** 탭 → Boot Option #1을 **USB**로 변경

<img src="/assets/images/install/minipcSetup/bios_boot.png" alt="BIOS 부팅 설정" width="42%">

4. **F10** 눌러 저장 후 재부팅

### Ubuntu 설치 진행

1. **Try or Install Ubuntu** 선택
2. **Install Ubuntu** 클릭
3. 설치 옵션:
   - 언어: English
   - 키보드: English (US)
   - **Erase disk and install Ubuntu** 선택

### 사용자 설정

| 항목 | 권장값 |
|:-----|:-------|
| Name / Username | `gateway` |
| Password | 숫자 4자리 권장 (절대 잊지 말 것. 서비스에 필수) |
| 로그인 | **Log in automatically** 체크 |

> **설치 완료 후 재부팅하고, USB를 제거합니다.**

---

## 4. 설치 파일 복사

Ubuntu 설치가 완료되면, 1단계에서 다운로드한 파일(01. IP Setup, 02. RB-Gateway)을 MiniPC로 복사합니다.

**방법 1: USB 2개 사용 (권장)**
- 다른 USB에 미리 설치 파일을 담아두면 편리합니다

**방법 2: USB 1개 사용**
- USB를 일반 포맷(FAT32/NTFS)으로 다시 포맷
- 설치 파일 복사 후 MiniPC에 연결

**방법 3: 네트워크**
- MiniPC를 인터넷에 연결 후 OneDrive에서 직접 다운로드

---

## 5. IP 설정

다운로드한 폴더(01. 192.168.0.1 또는 02. 192.168.1.1)를 열면 아래와 같은 구조입니다.

<img src="/assets/images/install/minipcSetup/directory.png" alt="폴더 구조" width="25%">

**01. IP Setup** 폴더로 이동합니다.

<img src="/assets/images/install/minipcSetup/ip_openinterminal.png" alt="IP Setup 폴더" width="42%">

폴더 빈 공간에서 우클릭 → **Open in Terminal** 후 아래 명령어 실행:

```bash
chmod 755 *
sudo ./ipset.sh
```

<img src="/assets/images/install/minipcSetup/ipset.png" alt="IP 설정" width="42%">

스크립트가 자동으로 IP를 `192.168.0.210`으로 설정합니다.

> Kolarc 용접기 사용 시: `192.168.1.210`

---

## 6. RB-Gateway 설치

### 설치

**02. RB-Gateway** 폴더 안의 **deploy** 폴더로 이동합니다.

<img src="/assets/images/install/minipcSetup/gw_openinterminal1.png" alt="deploy 폴더" width="42%">

폴더 빈 공간에서 우클릭 → **Open in Terminal** 후 아래 명령어 실행:

```bash
sudo ./install.sh
```

<img src="/assets/images/install/minipcSetup/gw_install.png" alt="Gateway 설치" width="42%">

### 확인

```bash
sudo ./health-check.sh
```

<img src="/assets/images/install/minipcSetup/gw_healthy.png" alt="Gateway 상태" width="42%">

**"OK: Gateway is healthy"** 가 나오면 완료입니다.

---

## 문제 해결

| 증상 | 해결 방법 |
|:-----|:----------|
| Ubuntu 설치 중 멈춤 | BIOS에서 Secure Boot 끄기 |
| 네트워크 안됨 | LAN 케이블 확인, `ping 192.168.0.1` 테스트 |
| Gateway 오류 | `sudo ./stop.sh` → `sudo ./start.sh` |

---

## 네트워크 정보

**0번대 (Kemppi, Weco 등)**
```
MiniPC IP        : 192.168.0.210
Robot Control Box: 192.168.0.100
Gateway          : 192.168.0.1
```

**1번대 (Kolarc)**
```
MiniPC IP        : 192.168.1.210
Robot Control Box: 192.168.1.100
Gateway          : 192.168.1.1
```

<br>

version: v1.0 | updated: 2025-12-05

---

**다음**: [장비 설치](device-installation.md)로 이동하여 전체 시스템을 연결하세요.
