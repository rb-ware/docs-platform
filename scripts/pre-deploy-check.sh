#!/bin/bash

###############################################################################
# 배포 전 체크리스트 스크립트
# 실무에서 배포 전 필수 검증 항목을 자동화
###############################################################################

set -e  # 에러 발생 시 즉시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 체크 결과 저장
PASSED=0
FAILED=0
WARNINGS=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  RBWare Docs - Pre-Deployment Check${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

###############################################################################
# 1. Git 상태 확인
###############################################################################
echo -e "${YELLOW}[1/10]${NC} Checking Git status..."

# Uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}  ✗ Uncommitted changes detected${NC}"
  echo -e "${YELLOW}  → Please commit or stash changes before deployment${NC}"
  ((WARNINGS++))
else
  echo -e "${GREEN}  ✓ Working directory clean${NC}"
  ((PASSED++))
fi

# Current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "  Current branch: ${BLUE}$BRANCH${NC}"

###############################################################################
# 2. 의존성 체크
###############################################################################
echo -e "\n${YELLOW}[2/10]${NC} Checking dependencies..."

if [ ! -d "node_modules" ]; then
  echo -e "${RED}  ✗ node_modules not found${NC}"
  echo -e "${YELLOW}  → Run 'npm install' first${NC}"
  ((FAILED++))
else
  echo -e "${GREEN}  ✓ Dependencies installed${NC}"
  ((PASSED++))
fi

###############################################################################
# 3. 테스트 실행
###############################################################################
echo -e "\n${YELLOW}[3/10]${NC} Running tests..."

if npm test -- --run > /dev/null 2>&1; then
  echo -e "${GREEN}  ✓ All tests passed${NC}"
  ((PASSED++))
else
  echo -e "${RED}  ✗ Tests failed${NC}"
  echo -e "${YELLOW}  → Fix failing tests before deployment${NC}"
  ((FAILED++))
fi

###############################################################################
# 4. 빌드 테스트
###############################################################################
echo -e "\n${YELLOW}[4/10]${NC} Testing production build..."

if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}  ✓ Build successful${NC}"
  ((PASSED++))
else
  echo -e "${RED}  ✗ Build failed${NC}"
  ((FAILED++))
fi

###############################################################################
# 5. 빌드 아티팩트 검증
###############################################################################
echo -e "\n${YELLOW}[5/10]${NC} Verifying build artifacts..."

REQUIRED_FILES=("dist/index.html" "dist/assets")

for file in "${REQUIRED_FILES[@]}"; do
  if [ -e "dist/$file" ] || [ -e "$file" ]; then
    echo -e "${GREEN}  ✓ $file exists${NC}"
    ((PASSED++))
  else
    echo -e "${RED}  ✗ $file missing${NC}"
    ((FAILED++))
  fi
done

###############################################################################
# 6. 번들 사이즈 체크
###############################################################################
echo -e "\n${YELLOW}[6/10]${NC} Checking bundle size..."

if [ -d "dist/assets" ]; then
  TOTAL_SIZE=0

  for file in dist/assets/*.js; do
    if [ -f "$file" ]; then
      SIZE=$(gzip -c "$file" | wc -c | tr -d ' ')
      TOTAL_SIZE=$((TOTAL_SIZE + SIZE))
      SIZE_KB=$((SIZE / 1024))

      echo -e "  $(basename "$file"): ${SIZE_KB} KB (gzipped)"

      # 30KB 제한 체크
      if [ $SIZE -gt 30720 ]; then
        echo -e "${YELLOW}  ⚠  Warning: Exceeds 30KB limit${NC}"
        ((WARNINGS++))
      fi
    fi
  done

  TOTAL_KB=$((TOTAL_SIZE / 1024))
  echo -e "${GREEN}  ✓ Total JS size: ${TOTAL_KB} KB (gzipped)${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}  ⚠  Build directory not found${NC}"
  ((WARNINGS++))
fi

###############################################################################
# 7. 필수 파일 존재 확인
###############################################################################
echo -e "\n${YELLOW}[7/10]${NC} Checking required files..."

REQUIRED_CONFIG_FILES=(
  "package.json"
  "vite.config.js"
  "manifest.json"
  "404.html"
)

for file in "${REQUIRED_CONFIG_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}  ✓ $file${NC}"
    ((PASSED++))
  else
    echo -e "${RED}  ✗ $file missing${NC}"
    ((FAILED++))
  fi
done

###############################################################################
# 8. manifest.json 검증
###############################################################################
echo -e "\n${YELLOW}[8/10]${NC} Validating manifest.json..."

if command -v jq > /dev/null 2>&1; then
  if jq empty manifest.json > /dev/null 2>&1; then
    echo -e "${GREEN}  ✓ Valid JSON format${NC}"

    # 카테고리 개수 확인
    CATEGORIES=$(jq '.categories | length' manifest.json)
    echo -e "  Categories: ${BLUE}$CATEGORIES${NC}"

    ((PASSED++))
  else
    echo -e "${RED}  ✗ Invalid JSON${NC}"
    ((FAILED++))
  fi
else
  echo -e "${YELLOW}  ⚠  jq not installed, skipping JSON validation${NC}"
  ((WARNINGS++))
fi

###############################################################################
# 9. 보안 체크
###############################################################################
echo -e "\n${YELLOW}[9/10]${NC} Running security audit..."

if npm audit --audit-level=moderate > /dev/null 2>&1; then
  echo -e "${GREEN}  ✓ No moderate+ vulnerabilities${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}  ⚠  Vulnerabilities detected (run 'npm audit' for details)${NC}"
  ((WARNINGS++))
fi

###############################################################################
# 10. 환경 변수 체크
###############################################################################
echo -e "\n${YELLOW}[10/10]${NC} Checking environment configuration..."

# NODE_ENV 체크
if [ "$NODE_ENV" = "production" ]; then
  echo -e "${GREEN}  ✓ NODE_ENV=production${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}  ⚠  NODE_ENV not set to production${NC}"
  echo -e "  Current: ${NODE_ENV:-not set}"
  ((WARNINGS++))
fi

###############################################################################
# 결과 요약
###############################################################################
echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}           Check Results${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}  Passed:   $PASSED${NC}"
echo -e "${RED}  Failed:   $FAILED${NC}"
echo -e "${YELLOW}  Warnings: $WARNINGS${NC}"
echo -e "${BLUE}========================================${NC}"

# 최종 판정
if [ $FAILED -gt 0 ]; then
  echo -e "\n${RED}❌ Deployment blocked: Fix failed checks before deploying${NC}"
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "\n${YELLOW}⚠️  Deployment allowed with warnings${NC}"
  echo -e "${YELLOW}   Consider addressing warnings for production quality${NC}"
  exit 0
else
  echo -e "\n${GREEN}✅ All checks passed! Ready for deployment${NC}"
  exit 0
fi
