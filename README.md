# TradesDash: Group 3, Student 5 (Frontend, Week 1)

Screens: **Features** (`/features`) and **For Trades** (`/for-trades`) from the Marketing Website module.

Stack: React 18, React Router, Tailwind CSS v4, lucide-react. Palette is in `src/index.css` (handout section 7.3).

## Run
```
npm install
npm run dev
```
Open http://localhost:5173/#/features

## Routes
| Route | Screen | Owner |
|---|---|---|
| `/features` | Features | G3-S5 |
| `/for-trades` | For Trades | G3-S5 |

Homepage and Pricing belong to G3-S4. The Start Free Trial buttons have no link yet; connect them after merge.

## Quick view (no dev server)
```
npm run build
```
Then double-click `dist/index.html`. It is one standalone file and opens directly in the browser.
Do not open the root `index.html`: that is the source file and needs `npm run dev`.