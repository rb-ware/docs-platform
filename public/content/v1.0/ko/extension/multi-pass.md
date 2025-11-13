# Multi Pass

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; margin-bottom: 32px;">
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Multi Pass</h3>
  <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.95;">
    동일한 경로를 여러 번 반복하여 용접하는 기능입니다.<br>
    여러 패스를 통해 두꺼운 재료를 효과적으로 용접할 수 있습니다.
  </p>
</div>

---

## ⚠️ 중요 안내사항

<div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>🚧 개발 중 기능</strong><br>
  <p style="margin: 8px 0 0 0; line-height: 1.6;">
    이 기능은 현재 개발 중이며 오작동이 있을 수 있습니다.<br>
    사용 시 주의가 필요하며, 문제 발생 시 즉시 중단하시기 바랍니다.
  </p>
</div>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>⚠️ 사용 제한사항</strong><br>
  <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
    <li>현재 이 기능을 사용하려면 <strong>직선 용접만 가능</strong>합니다.</li>
    <li>용접 명령과 함께 사용하지 않으면 <strong>가속/감속 오류</strong>가 발생할 수 있습니다.</li>
    <li>용접 명령을 함께 넣어서 확인하는 것을 <strong>강력히 권장</strong>합니다.</li>
    <li>다음 슬라이드에서 설명되는 방법 외에 다른 방법으로 사용하는 것을 권장하지 않습니다.</li>
  </ul>
</div>

---

## 개념 요약

Multi Pass는 동일한 용접 경로를 여러 번 반복하여 두꺼운 재료를 단계적으로 용접하는 기능입니다.

- **목적**: 두꺼운 재료의 완전 용입을 위한 다층 용접
- **동작**: 지정된 경로를 여러 패스로 반복 용접
- **적용**: 직선 용접 경로에 한정

---

## 기본 사용 방법

### 1️⃣ 용접 경로 설정

```
1  Move L, P1, ...
2  Arc-weld Start, ...    ← 용접 시작
3  Move L, P2, ...
4  Move L, P3, ...
5  Arc-weld End, ...      ← 용접 종료
6  MultiPass-1, P1, P2, P3, ...
```

**중요**: Multi Pass 명령은 반드시 **용접 명령(Arc-weld Start/End)**과 함께 사용해야 합니다.

---

### 2️⃣ 패스 설정

Multi Pass 명령에서 다음 정보를 설정합니다:

- **시작점**: P1 (용접 시작 위치)
- **중간점**: P2 (경로상의 중간 지점)
- **종료점**: P3 (용접 종료 위치)
- **패스 수**: 반복할 용접 횟수

---

## ⚠️ 주의사항

<div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 14px; border-radius: 4px; margin: 20px 0;">
  <strong>🚨 필수 확인사항</strong><br>
  <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
    <li>용접 명령 없이 사용 시 <strong>가속/감속 오류 발생</strong></li>
    <li>직선 경로가 아닌 경우 정상 작동하지 않을 수 있음</li>
    <li>사용 전 반드시 시뮬레이션 모드에서 테스트 권장</li>
  </ul>
</div>

<div style="background: #d1ecf1; border-left: 4px solid #0dcaf0; padding: 14px; border-radius: 4px; margin-top: 12px;">
  <strong>💡 실무 팁</strong><br>
  <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
    <li>각 패스마다 용접 전류/전압을 조정하여 최적의 용입 확보</li>
    <li>패스 간 간격을 일정하게 유지하여 용접 품질 향상</li>
    <li>첫 실행 시 낮은 속도로 테스트 후 점진적으로 속도 증가</li>
  </ul>
</div>

---

## ❓ FAQ

**Q. Multi Pass를 용접 명령 없이 사용할 수 있나요?**  
→ 아니요. 용접 명령과 함께 사용하지 않으면 가속/감속 오류가 발생할 수 있습니다.

**Q. 곡선 경로에도 사용할 수 있나요?**  
→ 현재는 직선 용접만 지원합니다. 곡선 경로 사용 시 오작동이 발생할 수 있습니다.

**Q. 패스 수는 몇 개까지 설정할 수 있나요?**  
→ 시스템 제한 내에서 설정 가능하나, 과도한 패스 수는 용접 품질에 영향을 줄 수 있습니다.

**Q. 오작동이 발생하면 어떻게 해야 하나요?**  
→ 즉시 프로그램을 중단하고, 비상정지 버튼을 누른 후 문제를 확인하세요.

---

<div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 13px;">
  <p>문서 버전: v1.0 | 최종 수정: 2025-01-11</p>
  <p>문의: <a href="mailto:juho.park@rbware.co.kr" style="color: #667eea;">juho.park@rbware.co.kr</a></p>
</div>
