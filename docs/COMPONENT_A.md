# Component A — Staff interview (Maason Kao — Equipment checkout)

Deliverable diagrams (digital, in-repo):

- [`images/system-map-maason.svg`](images/system-map-maason.svg) — synthesized workflow + circled pain cluster  
- Optional hand photo: add `images/system-map-maason-photo.jpg` if you submit a scan on Canvas.

---

## Interview goals

- Map **who** touches checkout/returns and **which systems** hold truth.
- Capture **pain points** about late returns and fragmented status.
- Extract **touchpoints** that imply devices (desk vs phone).

## Sample script (adapt as needed)

1. **Warm-up:** “Walk me through the last time a student returned gear late — what systems did you touch?”
2. **Systems:** “Where is the authoritative list of who has what today?” (spreadsheet, desk tool, email threads?)
3. **Notifications:** “How do students learn they are overdue — email, Slack, in person?”
4. **Mobile:** “When do you check status away from your desk?”
5. **Edge cases:** “What happens if kit pieces are swapped between teams?”
6. **Close:** “If you had one screen that fixed tomorrow, what would it show?”

## Synthesis notes (lab artifact)

| Topic | Finding |
|-------|---------|
| Workflow | Checkout logged at desk; reminders often informal (Slack/email); returns sometimes tracked late. |
| Pain | **Returns slip across tools** — due dates not visible in one place; chasing borrowers costs time. |
| Touchpoints | Desk form / inventory list / messaging — staff may follow up **on phone** between studios. |

## Build mandate

> Based on the interview, I will build an **equipment checkout tracker with due dates and return actions** because the interviewee described **students not returning gear on time across multiple systems**, which means **the app should show who has what, when it is due, and let staff mark returns in one place**.

## Touchpoints (annotated)

| Touchpoint | User | Action | Device |
|------------|------|--------|--------|
| Check-out form | Staff / desk | Record borrower, item, due date | Desktop at desk |
| Return confirmation | Staff | Mark item returned after physical return | Desktop or **phone** between studios |
| Borrower reminder | Student | Reads due / overdue state (future enhancement) | Phone |
