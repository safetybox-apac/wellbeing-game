# Wellbeing Game

Match wellbeing scenarios with the right chapter. A five-minute individual game for desktop and phone, using a magenta theme (#a51890).

## Publish on GitHub Pages

Create a separate repository, for example wellbeing-game, so this game has its own address. Extract the ZIP and upload its contents directly to the repository root. Include index.html, app.js, audio.js, phone.js, config.js, styles.css, phone.css, wellbeing.css, cards.csv and .nojekyll. Commit to main.

In Settings → Pages, select Deploy from a branch → main → / (root) → Save. After deployment, open the Pages link, normally https://YOUR-USERNAME.github.io/wellbeing-game/. Use that address rather than a GitHub file-preview link. Future updates use the same upload/commit process.

No Apps Script, API keys, build process or server is required. For a local preview, run a web server in this folder, such as python -m http.server 8000, and open http://localhost:8000. Directly opening index.html may block CSV loading.

## Play

Choose Play on Desktop or Play on Phone → read the instructions → I'm ready → 3–2–1 → play for five minutes → review your score and reveal answers.

Desktop: drag Post-its onto chapter boards, or select a note and then select its destination. Posted notes remain editable. Expand the trash to retrieve a note, or return a selected note to the pile. Keyboard users can select notes and destinations with Tab and Enter.

Phone: one card at a time. Choose chapter opens a searchable list with a concept preview before confirmation. Placement automatically advances to the next unanswered card. Trash, Skip, Undo and Review remain available. Undo reverses the most recent placement. Review includes an unanswered-only filter and allows revisions until the deadline.

The timer keeps running while reviewing, changing sound settings or switching tabs. Same-tab refresh resumes the game when session storage is available. Finish game asks for confirmation. Timeout finishes automatically. Phone results are reviewed one card at a time; desktop results use boards. Correct placements are green, incorrect red and unplaced gray. Reveal answers shows the intended destinations.

## Database inspection

The supplied CSV has the required five headers, 14 unique Card # values, four consistent chapter boards and four distractors. The 10 regular cards give a maximum score of 10. The supplied wording, chapter assignments, card numbers and distractor metadata are preserved unchanged.

Chapters: Defining Wellbeing; Self Seeking Help; Supporting a Peer; Manager Response. Distractors retain Chapter Name/Concept values in the CSV, but Chapter Ref = Distractor determines their trash destination.

The file is training content, not a verification of current company EAP availability or emergency procedures. Its supplied service details and crisis-response wording have not been independently checked; confirm those details with your internal content owner before facilitating.

To edit the game, update cards.csv with the same headers:

Chapter Ref, Chapter Name, Concept, Card #, Post-it Card Scenario

Use unique card IDs and identical chapter details for repeated chapter references. Export from your sheet as CSV to preserve comma/quote handling. Existing saved games retain their data snapshot; new games use the current CSV.

## Scoring and sound

Correct chapter +1. Wrong chapter, regular card in trash or unplaced 0. Distractor in trash 0. Distractor on a chapter board −2. Scores can be negative. Unhelpful or unsafe responses belong in the trash. Correctness is hidden until the end.

Settings is sound-only, with no password or timer editor. Every new game lasts five minutes. Music and effects are on by default and can be switched off separately. Audio starts after the first interaction and music pauses while the tab is hidden. The soundtrack is synthesized locally with melody, bass, chords and light percussion; no external audio downloads are needed.

Saved games and sound choices use wellbeing-specific storage keys. They do not share preferences or progress with another game. There are no player names, accounts, rooms, leaderboards or server score collection.

## Checks

Verify the new site on your actual desktop and phone after deployment. Long scenarios or enlarged text can scroll within the reading area; the phone controls stay outside that area. GitHub hosting has not been performed by generating this package.

Local Chromium checks passed for the 14-card database, five-minute duration, desktop/phone mode selection, search and concept preview, auto-advance, Undo, trash, Skip, review filters, refresh recovery, timeout, scoring and answer reveal. Phone layouts fit the tested 390x844 and 320x568 viewports. No browser JavaScript errors were recorded.

