# Jump - 프로그램 흐름 제어

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; margin-bottom: 32px;">
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">반복 작업을 간단하게</h3>
  <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.95;">
    Jump는 프로그램 실행 중 특정 라인으로 이동하는 명령입니다.<br>
    <strong>To</strong>(출발) → <strong>Here</strong>(도착) 쌍으로 사용하며, 닉네임으로 여러 개를 관리할 수 있습니다.
  </p>
</div>

---

## 개념

Jump는 **출발지점(To)**에서 **도착지점(Here)**으로 프로그램 실행을 이동시킵니다.

<div style="background: #f8f9fa; padding: 24px; border-radius: 8px; margin: 24px 0;">

```
출발 (Jump To, 123)  ──→  도착 (Jump Here, 123)
```

**닉네임(예: 123)**: 출발지와 도착지를 연결하는 이름
**복수 사용 가능**: 다른 닉네임(456, 789 등)으로 여러 쌍 생성 가능

</div>

---

## 화면 설정

### Jump Here - 도착지점 설정

<img src="../../../assets/images/extensions/Jump_Here.jpg" alt="Jump Here" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0;" />

- **역할**: "여기가 도착지야"
- **설정**: 도착할 라인에 배치하고 닉네임 입력

---
### Jump To - 출발지점 설정

<img src="../../../assets/images/extensions/Jump_To.jpg" alt="Jump To" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0;" />

- **역할**: "저기로 가!"
- **설정**: 이동할 위치에 배치하고 Here의 닉네임 입력

---

## 사용 예시

<img src="../../../assets/images/extensions/Jump_Step.jpg" alt="Jump 예시" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0;" />

### 기본 반복

```
1  Jump Here, 123       ← 도착지 (닉네임: 123)
2  Move L, ...
3  Move L, ...
4  Jump To, 123         ← 출발지 (1번으로 이동)
```

**실행 순서**: 1 → 2 → 3 → 4 → 1 → 2 → 3 → 4...

### 조건부 이동

```
1  Move L, ...
2  If error
3    Jump To, ERROR    ← 에러 발생 시 7번으로
4  End If
5  Gripper Close
6  Jump To, END        ← 정상 종료 시 9번으로

7  Jump Here, ERROR    ← 에러 처리 도착점
8  Gripper Open

9  Jump Here, END      ← 종료 도착점
```

### 반복 횟수 제한

```
Set count = 0

1  Jump Here, LOOP
2  Move L, ...
3  Set count = count + 1
4  If count < 5
5    Jump To, LOOP     ← 5회 미만이면 1번으로
6  End If
```

---

## 주의사항

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>⚠️ 무한루프 주의</strong><br>
  탈출 조건 없이 Jump To만 사용하면 프로그램이 무한 반복됩니다.
</div>

<div style="background: #d1ecf1; border-left: 4px solid #0dcaf0; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>💡 팁</strong><br>
  • 닉네임은 숫자 또는 문자 가능 (예: 123, START, LOOP)<br>
  • 같은 닉네임의 Here는 하나만, To는 여러 개 가능<br>
  • 테스트 시 시뮬레이션 모드 권장
</div>

---

## FAQ

**Q. Here와 Label의 차이는?**
기능은 같습니다. Label은 독립적으로 라인에 이름만 부여하고, Jump Here는 Jump와 함께 사용됩니다.

**Q. 무한루프를 멈추려면?**
비상정지 버튼을 누르거나, 프로그램에 If 조건과 탈출 로직을 추가하세요.

**Q. Jump가 작동하지 않아요**
Jump To의 닉네임과 일치하는 Jump Here가 있는지 확인하세요.

---

<div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 13px;">
  <p>문서 버전: v1.0 | 최종 수정: 2025-01-07</p>
  <p>문의: <a href="mailto:juho.park@rbware.co.kr" style="color: #667eea;">juho.park@rbware.co.kr</a></p>
</div>
