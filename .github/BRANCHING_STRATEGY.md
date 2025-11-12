# 🌿 브랜치 전략 (2인 개발팀)

## 브랜치 구조

```
main (프로덕션)
  ↑
dev (개발 통합)
  ↑
feature/* (기능 개발)
hotfix/* (긴급 수정)
```

---

## 📋 브랜치 설명

### 1. `main` (Protected)
- **역할**: 프로덕션 배포 브랜치
- **배포**: GitHub Pages 자동 배포
- **보호**: Direct push 금지
- **병합**: `dev` 브랜치에서 PR로만 병합

### 2. `dev` (Default)
- **역할**: 개발 통합 브랜치
- **테스트**: CI 자동 실행
- **병합**: feature 브랜치에서 PR로 병합
- **배포**: 별도 dev 환경 (선택사항)

### 3. `feature/*`
- **역할**: 새 기능 개발
- **명명**: `feature/번들-최적화`, `feature/이미지-lazy-loading`
- **생명주기**: 개발 완료 후 dev에 병합 → 삭제

### 4. `hotfix/*`
- **역할**: 프로덕션 긴급 수정
- **명명**: `hotfix/보안-패치`, `hotfix/빌드-에러`
- **병합**: main + dev 동시 병합

---

## 🔄 워크플로우

### 일반 기능 개발

```bash
# 1. dev 브랜치에서 feature 브랜치 생성
git checkout dev
git pull origin dev
git checkout -b feature/새로운-기능

# 2. 개발 & 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# 3. 원격 푸시
git push origin feature/새로운-기능

# 4. GitHub에서 dev로 PR 생성
#    → CI 테스트 자동 실행
#    → 코드 리뷰
#    → 승인 후 병합

# 5. dev에서 충분히 테스트 후 main으로 PR
#    → 프로덕션 배포
```

### 긴급 수정 (Hotfix)

```bash
# 1. main에서 hotfix 브랜치 생성
git checkout main
git pull origin main
git checkout -b hotfix/긴급-버그-수정

# 2. 수정 & 커밋
git add .
git commit -m "fix: 긴급 버그 수정"

# 3. main으로 PR (우선)
git push origin hotfix/긴급-버그-수정
#    → main 병합 후 즉시 배포

# 4. dev에도 병합
git checkout dev
git merge hotfix/긴급-버그-수정
git push origin dev
```

---

## 🛡️ main 브랜치 보호 설정

GitHub Settings → Branches → Branch protection rules:

```yaml
Branch name pattern: main

✅ Require a pull request before merging
  ✅ Require approvals: 1
  ✅ Dismiss stale pull request approvals when new commits are pushed

✅ Require status checks to pass before merging
  ✅ Require branches to be up to date before merging
  Status checks:
    - Test (Node.js 18.x)
    - Test (Node.js 20.x)

✅ Require conversation resolution before merging

✅ Do not allow bypassing the above settings
```

---

## 💻 2인 팀 실무 규칙

### PR 리뷰 규칙
1. **Self-merge 금지**: 본인이 작성한 PR은 본인이 머지 불가
2. **리뷰 필수**: 상대방의 Approve 후에만 병합
3. **긴급 상황**: Hotfix만 예외적으로 self-merge 허용

### 커밋 메시지
```
feat: 새 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
test: 테스트 추가/수정
chore: 빌드/설정 변경
perf: 성능 개선
style: 코드 스타일 변경 (포맷)
```

### PR 템플릿
```markdown
## 변경 사항
- 추가된 기능/수정 내용

## 테스트
- [ ] 로컬 테스트 완료
- [ ] 빌드 성공 확인

## 스크린샷 (선택)
(UI 변경 시 첨부)

## 체크리스트
- [ ] 테스트 작성/업데이트
- [ ] 문서 업데이트 (필요 시)
```

---

## 📝 실전 예시

### 예시 1: 이미지 최적화 기능 추가

```bash
# 개발자 A
git checkout dev
git checkout -b feature/image-optimization

# ... 개발 ...

git push origin feature/image-optimization

# GitHub에서 dev로 PR 생성
# 개발자 B가 리뷰 & Approve
# 병합 → feature 브랜치 삭제

# 충분히 테스트 후
# 개발자 A가 dev → main PR 생성
# 개발자 B가 최종 확인 & Approve
# 병합 → 자동 배포
```

### 예시 2: 프로덕션 버그 발견

```bash
# 개발자 B
git checkout main
git checkout -b hotfix/broken-search

# ... 수정 ...

git push origin hotfix/broken-search

# main으로 PR (긴급)
# 개발자 A 빠른 리뷰
# 병합 → 즉시 배포

# dev에도 적용
git checkout dev
git merge hotfix/broken-search
git push origin dev
```

---

## 🚨 실무 팁

### DO ✅
- feature 브랜치는 작게 유지 (1-3일 작업량)
- PR은 하루 안에 리뷰
- 병합 후 즉시 feature 브랜치 삭제
- 정기적으로 dev를 main에 병합 (주 1회)

### DON'T ❌
- main에 직접 push 금지
- feature 브랜치 장기간 보유 금지
- 대용량 PR (500+ lines) 지양
- 리뷰 없이 병합 금지

---

## 📊 현재 상태 확인

```bash
# 모든 브랜치 확인
git branch -a

# 브랜치 간 차이 확인
git log dev..main --oneline

# 현재 브랜치 상태
git status
```

---

## 🔧 초기 설정 (지금 당장 실행)

```bash
# 1. dev 브랜치 생성
git checkout -b dev
git push -u origin dev

# 2. GitHub에서 기본 브랜치를 dev로 변경
#    Settings → Branches → Default branch → dev

# 3. main 브랜치 보호 설정
#    Settings → Branches → Add rule → main

# 4. 앞으로는 feature 브랜치에서 작업
git checkout dev
git checkout -b feature/your-feature
```

---

**이제 실무 표준 브랜치 전략이 완성되었습니다!** 🎉
