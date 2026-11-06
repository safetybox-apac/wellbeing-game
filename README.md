# SH&W Chapter Matching Game

## Updated game
There are 19 cards, one for each chapter. The first scenario in each chapter's original CSV order is retained, with its original card ID and wording. Decimal chapter references remain separate. There are no distractor cards or trash controls. Each correct match earns 1 point; incorrect or unplaced cards earn 0.

The timer remains fixed at 7 minutes. Choose Desktop or Phone, read the instructions, then select I'm ready for the countdown. Desktop supports drag-and-drop and click placement. Phone supports chapter selection, search, undo and review. Results show placements and reveal correct answers.

Background music has been removed. Sound effects remain optional in Settings. The new session key prevents older, longer card sets from being restored.

## Deploy
Extract this ZIP. Upload all its contents directly to the root of the existing SH&W GitHub repository, replacing the previous files. Commit the update. Keep Pages configured to deploy from main and /(root). Wait for deployment, then reload the website; hard refresh if necessary. Do not upload just the ZIP.

## Database
Edit cards.csv while preserving the five headers. Chapter references are strings, so 7.1 and 7.2 remain distinct. The app uses the first scenario for each chapter and ignores distractor rows or additional rows for that chapter. To change a selected scenario, edit its retained CSV row.
