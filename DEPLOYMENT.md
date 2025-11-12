# 🚀 배포 가이드 (GitHub Pages)

이 문서는 RBWare Docs Platform을 GitHub Pages에 배포하는 전체 과정을 설명합니다.

## 📋 목차
1. [사전 준비](#사전-준비)
2. [GitHub Pages 설정](#github-pages-설정)
3. [자동 배포 활성화](#자동-배포-활성화)
4. [배포 프로세스](#배포-프로세스)
5. [배포 확인](#배포-확인)
6. [문제 해결](#문제-해결)

---

## 사전 준비

### 1. GitHub 저장소 확인
```bash
# 현재 원격 저장소 확인
git remote -v

# 예상 출력:
# origin  https://github.com/your-username/docs-platform.git (fetch)
# origin  https://github.com/your-username/docs-platform.git (push)
```

### 2. 로컬 테스트
```bash
# 의존성 설치
npm install

# 테스트 실행
npm test -- --run

# 프로덕션 빌드 테스트
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 3. 배포 전 체크리스트
```bash
# 자동 체크 실행
npm run pre-deploy

# ✅ 모든 체크 통과하면 배포 진행
```

---

## GitHub Pages 설정

### Step 1: GitHub 저장소 설정 페이지 이동
1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭

### Step 2: Source 설정
```
Build and deployment
├── Source: GitHub Actions  ⭐ (이것 선택!)
└── (Deploy from a branch 아님!)
```

**중요**: "GitHub Actions"를 선택해야 합니다!
- ❌ "Deploy from a branch" (구 방식)
- ✅ "GitHub Actions" (신 방식, 권장)

### Step 3: 권한 설정
**Settings → Actions → General**로 이동:

1. **Workflow permissions** 섹션에서:
   ```
   ✅ Read and write permissions
   ✅ Allow GitHub Actions to create and approve pull requests
   ```

2. **저장** 버튼 클릭

---

## 자동 배포 활성화

### 워크플로우 파일 확인
다음 파일들이 있어야 합니다:
```
.github/workflows/
├── test.yml        # PR 시 자동 테스트
├── deploy.yml      # main 브랜치 배포
└── lighthouse.yml  # 성능 체크
```

이미 생성되어 있습니다! ✅

### 배포 워크플로우 작동 방식
```
코드 변경
  ↓
git commit
  ↓
git push origin main
  ↓
GitHub Actions 자동 실행
  ├─ 1. 테스트 실행 (56 tests)
  ├─ 2. 프로덕션 빌드
  ├─ 3. dist/ 폴더 생성
  └─ 4. GitHub Pages 배포
  ↓
🎉 배포 완료!
```

---

## 배포 프로세스

### 방법 1: 자동 배포 (권장) ⭐

```bash
# 1. 변경사항 커밋
git add .
git commit -m "feat: add new documentation"

# 2. main 브랜치에 푸시
git push origin main

# 3. 끝! GitHub Actions가 자동으로 배포
```

**진행 상황 확인**:
1. GitHub 저장소 페이지 이동
2. **Actions** 탭 클릭
3. 실행 중인 워크플로우 확인

### 방법 2: Pull Request를 통한 배포

```bash
# 1. Feature 브랜치 생성
git checkout -b feature/new-docs

# 2. 변경사항 커밋
git add .
git commit -m "feat: add new documentation"

# 3. 푸시
git push origin feature/new-docs

# 4. GitHub에서 PR 생성
# 5. 자동 테스트 실행 (test.yml)
# 6. 테스트 통과 후 main에 머지
# 7. 자동 배포 (deploy.yml)
```

### 방법 3: 수동 배포

GitHub 저장소에서:
1. **Actions** 탭 이동
2. **Deploy to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. 브랜치 선택 (main)
5. **Run workflow** 실행

---

## 배포 확인

### 1. Actions 탭에서 확인
```
✅ Build - 성공
✅ Deploy to GitHub Pages - 성공
✅ Verify Deployment - 성공
```

### 2. 배포 URL 확인
```
https://your-username.github.io/docs-platform/
```

**URL 형식**:
- 개인 계정: `https://username.github.io/docs-platform/`
- 조직 계정: `https://orgname.github.io/docs-platform/`

### 3. 사이트 접속 테스트
```bash
# 터미널에서 테스트
curl -I https://your-username.github.io/docs-platform/

# 예상 출력:
# HTTP/2 200
# content-type: text/html
```

### 4. 주요 페이지 체크
- ✅ 랜딩 페이지: `/`
- ✅ 한국어 문서: `/ko`
- ✅ 영어 문서: `/en`
- ✅ 특정 문서: `/ko/setup/installation`

---

## 배포 후 체크리스트

### 즉시 확인 사항
- [ ] 메인 페이지 로딩 확인
- [ ] 사이드바 메뉴 작동 확인
- [ ] 검색 기능 작동 확인
- [ ] 언어 전환 기능 확인
- [ ] 이미지 로딩 확인
- [ ] 모바일 반응형 확인

### 성능 확인
```bash
# Lighthouse 점수 확인
npm run lighthouse

# 예상 점수:
# Performance: 90+
# Accessibility: 85+
# Best Practices: 90+
# SEO: 90+
```

---

## 문제 해결

### ❌ 배포 실패: "Process completed with exit code 1"

**원인**: 테스트 실패 또는 빌드 에러

**해결**:
```bash
# 로컬에서 테스트
npm test -- --run

# 로컬에서 빌드
npm run build

# 에러 수정 후 다시 푸시
```

### ❌ 404 Error: "File not found"

**원인**: GitHub Pages source 설정 오류

**해결**:
1. Settings → Pages
2. Source를 "GitHub Actions"로 변경
3. 다시 배포

### ❌ 스타일이 깨짐

**원인**: Base path 설정 오류

**확인**:
```javascript
// vite.config.js
base: process.env.NODE_ENV === 'production' ? '/docs-platform/' : '/',
```

저장소 이름이 `docs-platform`과 일치해야 합니다!

### ❌ "Permission denied" 에러

**원인**: GitHub Actions 권한 부족

**해결**:
1. Settings → Actions → General
2. Workflow permissions
3. "Read and write permissions" 선택
4. 저장

### ❌ 이미지가 안 보임

**원인**: 이미지 경로 오류

**확인**:
```javascript
// 올바른 경로 사용
./assets/logo.png   ✅
/assets/logo.png    ❌ (절대 경로는 안됨)
```

---

## CI/CD 파이프라인 구조

### Test Workflow (test.yml)
```
PR 생성/업데이트
  ↓
├─ Node 18, 20 매트릭스 테스트
├─ npm ci (의존성 설치)
├─ npm test (56 tests)
├─ 커버리지 생성
├─ 번들 사이즈 체크 (30KB 제한)
└─ 보안 감사 (npm audit)
  ↓
✅ 모두 통과해야 머지 가능
```

### Deploy Workflow (deploy.yml)
```
main 브랜치 푸시
  ↓
1. Build Job
   ├─ 테스트 실행 (필수)
   ├─ npm run build
   ├─ 빌드 검증
   └─ Artifact 업로드
  ↓
2. Deploy Job
   ├─ GitHub Pages 배포
   └─ 배포 URL 출력
  ↓
3. Verify Job
   ├─ 30초 대기 (전파 시간)
   ├─ HTTP 상태 체크
   └─ 주요 페이지 Smoke test
  ↓
✅ 배포 완료!
```

### Lighthouse Workflow (lighthouse.yml)
```
PR 또는 main 푸시
  ↓
├─ Lighthouse CI 실행
│  ├─ 성능 점수 (90+)
│  ├─ 접근성 (85+)
│  ├─ 베스트 프랙티스 (90+)
│  └─ SEO (90+)
├─ 번들 사이즈 분석
└─ PR에 결과 코멘트
```

---

## 배포 빈도 권장사항

### 실무 표준
- **Hotfix**: 즉시 배포 (치명적 버그)
- **Feature**: 1-2주마다 배포
- **Documentation**: 수시 배포 가능

### 배포 전 체크
```bash
# 항상 이것부터!
npm run pre-deploy

# 통과하면 배포
git push origin main
```

---

## 모니터링

### GitHub Actions 대시보드
- **URL**: `https://github.com/your-username/docs-platform/actions`
- **확인 항목**:
  - ✅ 최근 워크플로우 성공률
  - ⏱️ 빌드 시간 (보통 2-3분)
  - 📊 테스트 결과

### 배포 히스토리
- **Settings → Environments → github-pages**
- 배포 이력 및 URL 확인

---

## 롤백 (Rollback)

### 이전 버전으로 되돌리기

```bash
# 1. 이전 커밋 해시 찾기
git log --oneline

# 2. 해당 커밋으로 리버트
git revert <commit-hash>

# 3. 푸시 (자동 배포)
git push origin main
```

**또는 GitHub에서**:
1. Actions 탭
2. 성공한 이전 배포 선택
3. "Re-run all jobs"

---

## 비용

### GitHub Actions 무료 한도
- **Public 저장소**: 무제한 ✅
- **Private 저장소**: 2,000분/월

### GitHub Pages 무료 한도
- **용량**: 1GB
- **대역폭**: 100GB/월
- **빌드**: 10회/시간

**현재 프로젝트**:
- 빌드 시간: ~2분
- 번들 크기: ~21KB
- ✅ 무료 한도 내에서 충분

---

## 다음 단계

배포 완료 후 권장사항:
1. ✅ 에러 트래킹 추가 (Sentry)
2. ✅ 분석 도구 추가 (Plausible/GA)
3. ✅ 모니터링 추가 (UptimeRobot)
4. ✅ 커스텀 도메인 설정 (선택)

---

## 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/pages)
- [GitHub Actions 문서](https://docs.github.com/actions)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

---

## 문의

문제가 발생하면:
1. Issues 탭에서 검색
2. 새 Issue 생성
3. 배포 로그 첨부

**Happy Deploying! 🚀**
