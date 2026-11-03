# Changelog

## 1.0.1
- Unique element name: the card is now `custom:shc-samsung-tv-remote-card` (editor `shc-samsung-tv-remote-card-editor`). This fixes the conflict with other Samsung remote cards that also register `samsung-tv-remote-card` (one of them hid the other and it could not be selected).
- The old name `custom:samsung-tv-remote-card` is still registered as an alias, but only if no other card has already defined it, so existing dashboards keep working.

## 1.0.0
- New JS card `samsung-tv-remote-card`: Samsung-style remote for Tizen TVs (`samsungtv_smart` or core `samsungtv`), installable with HACS.
- Phone: vertical remote. Tablet/desktop: remote plus side panel (now playing, sources, apps, volume, picture/sound mode, Art Mode, Ambient).
- Visual editor, IT/EN texts following the Home Assistant language.
- The original YAML card (based on `tv-card`) moved to `legacy/` (unchanged).
