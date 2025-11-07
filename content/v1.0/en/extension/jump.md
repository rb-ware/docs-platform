# Jump - Program Flow Control

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; margin-bottom: 32px;">
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Simplify Repetitive Tasks</h3>
  <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.95;">
    Jump moves program execution to a specific line.<br>
    Use <strong>To</strong> (departure) → <strong>Here</strong> (destination) pairs, managed with nicknames for multiple jumps.
  </p>
</div>

---

## Concept

Jump moves program execution from **departure point (To)** to **destination point (Here)**.

<div style="background: #f8f9fa; padding: 24px; border-radius: 8px; margin: 24px 0;">

```
Departure (Jump To, 123)  ──→  Destination (Jump Here, 123)
```

**Nickname (e.g., 123)**: Name linking departure and destination
**Multiple Pairs**: Create multiple pairs with different nicknames (456, 789, etc.)

</div>

---

## Interface Setup

### Jump Here - Set Destination

<img src="../../../assets/images/extensions/Jump_Here.jpg" alt="Jump Here" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0;" />

- **Purpose**: "This is the destination"
- **Setup**: Place at destination line and enter nickname

### Jump To - Set Departure

<img src="../../../assets/images/extensions/Jump_To.jpg" alt="Jump To" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0;" />

- **Purpose**: "Go there!"
- **Setup**: Place at departure point and enter Here's nickname

---

## Usage Examples

<img src="../../../assets/images/extensions/Jump_Step.jpg" alt="Jump Example" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0;" />

### Basic Loop

```
1  Jump Here, 123       ← Destination (nickname: 123)
2  Move L, ...
3  Move L, ...
4  Jump To, 123         ← Departure (go to line 1)
```

**Execution Order**: 1 → 2 → 3 → 4 → 1 → 2 → 3 → 4...

### Conditional Jump

```
1  Move L, ...
2  If error
3    Jump To, ERROR    ← Jump to line 7 on error
4  End If
5  Gripper Close
6  Jump To, END        ← Jump to line 9 on success

7  Jump Here, ERROR    ← Error handling destination
8  Gripper Open

9  Jump Here, END      ← End destination
```

### Limited Iterations

```
Set count = 0

1  Jump Here, LOOP
2  Move L, ...
3  Set count = count + 1
4  If count < 5
5    Jump To, LOOP     ← Return to line 1 if less than 5
6  End If
```

---

## Important Notes

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>⚠️ Infinite Loop Warning</strong><br>
  Using Jump To without exit conditions causes infinite loops.
</div>

<div style="background: #d1ecf1; border-left: 4px solid #0dcaf0; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>💡 Tips</strong><br>
  • Nicknames can be numbers or text (e.g., 123, START, LOOP)<br>
  • One Here per nickname, multiple To's allowed<br>
  • Test in simulation mode first
</div>

---

## FAQ

**Q. Difference between Here and Label?**
Same function. Label only names a line independently, while Jump Here works with Jump.

**Q. How to stop infinite loops?**
Press emergency stop or add If conditions and exit logic to the program.

**Q. Jump not working**
Verify that Jump To's nickname matches an existing Jump Here.

---

<div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 13px;">
  <p>Document Version: v1.0 | Last Updated: 2025-01-07</p>
  <p>Contact: <a href="mailto:juho.park@rbware.co.kr" style="color: #667eea;">juho.park@rbware.co.kr</a></p>
</div>
