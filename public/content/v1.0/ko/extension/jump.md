<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; margin-bottom: 32px;">
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Jump</h3>
  <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.95;">
    Jump는 프로그램 실행 중 원하는 라인으로 <strong>즉시 이동</strong>하는 명령입니다.<br>
    <strong>Jump To</strong>(출발) → <strong>Jump Here</strong>(도착) 쌍으로 사용하며,<br>
    각 쌍은 닉네임으로 연결됩니다.
  </p>
</div>

---

## 개념 요약

Jump To (출발) ───▶ Jump Here (도착)

- **닉네임**: To와 Here를 연결하는 이름 (예: 123, LOOP, ERROR)
- **여러 쌍 가능**: 닉네임만 다르면 복수로 사용 가능

---

## 설정 방법

### 1️⃣ Jump Here – 도착지점 지정
<img src="../../../assets/images/extensions/Jump_Here.jpg" alt="Jump Here" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
- 이동 **목표 지점**에 배치  
- **닉네임 입력** (예: LOOP)

---

### 2️⃣ Jump To – 출발지점 지정
<img src="../../../assets/images/extensions/Jump_To.jpg" alt="Jump To" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
- 실행을 **이동시킬 위치**에 배치  
- **이동할 Here의 닉네임 입력**

---

## 예시

### 기본 반복

```
1  Jump Here, 123       ← 도착지 (닉네임: 123)
2  Move L, ...
3  Move L, ...
4  Jump To, 123         ← 출발지 (1번으로 이동)
```

**실행 순서**: 1 → 2 → 3 → 4 → 1 → 2 → 3 → 4...
→ 1→2→3→4→1 반복 실행

---

### ⚙️ 조건부 이동
1 Move L, ...
2 If error
3 Jump To, ERROR
4 End If
5 Jump To, END

6 Jump Here, ERROR
7 Alarm On

8 Jump Here, END

---

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

→ 5회까지만 반복

---

## ⚠️ 주의사항

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 14px; border-radius: 4px;">
<strong>무한루프 주의!</strong><br>
Jump To만 있고 종료 조건이 없으면 프로그램이 끝나지 않습니다.
</div>

<div style="background: #d1ecf1; border-left: 4px solid #0dcaf0; padding: 14px; border-radius: 4px; margin-top: 12px;">
<strong>Tip</strong><br>
• 닉네임은 숫자/문자 모두 가능 (예: 001, LOOP, END)<br>
• 같은 닉네임의 <strong>Here는 1개</strong>, <strong>To는 여러 개</strong> 가능<br>
• 테스트는 시뮬레이션 모드에서 권장
</div>

---

## ❓FAQ

**Q. Label과 Jump Here의 차이점은?**  
→ Label은 단순 이름표, Jump Here는 Jump 명령과 연결되어 실제 실행 이동에 사용됩니다.

**Q. Jump가 작동하지 않아요.**  
→ To의 닉네임이 Here와 일치하는지 확인하세요.

**Q. 무한루프를 멈추려면?**  
→ 비상정지 버튼 또는 조건문으로 탈출 로직 추가.

---

<div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 13px;">
  <p>문서 버전: v1.1 | 최종 수정: 2025-11-12</p>
</div>
