# Responsive design check (lab manual table)

Tested with Chrome DevTools → **iPhone 14 Pro** preset (or Safari responsive mode).

| Element | Works at phone width? | What breaks? | Fix applied |
|---------|------------------------|--------------|-------------|
| Page title | Yes | — | — |
| Navigation | Yes | Links wrap to two lines | Kept `flex-wrap` + adequate tap targets |
| Forms | Yes | — | Inputs `min-h-[44px]` |
| Tables | Yes | Wide columns overflow | **`overflow-x-auto`** wrapper + `min-w-[640px]` table |
| Charts | N/A | — | Weather strip uses flex-wrap cards |
| Buttons | Yes | — | Minimum height 44px |
| Text | Yes | — | Body text `text-sm` where needed |

**Most critical fix:** equipment table horizontal scroll on narrow viewports (see `components/EquipmentClient.tsx`).

**Screenshot (optional for Canvas):** add `screenshots/responsive-equipment.png` after capture.
