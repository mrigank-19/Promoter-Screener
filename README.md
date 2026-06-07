# Promoter Holding Trend Screener

A full-stack fintech dashboard that screens NSE-listed stocks based on promoter shareholding trends. Flags companies where promoters have been consistently increasing their stake over the last 4 consecutive quarters — a well-known bullish signal in Indian equity markets.

---

## What is Promoter Holding and Why Does It Matter?

In Indian markets, every listed company must publicly disclose its shareholding pattern every quarter (March, June, September, December) on BSE/NSE. The "promoter" category refers to the founding family, controlling group, or original owners of the company.

When promoters consistently increase their stake over multiple quarters, it signals:
- **Confidence in the company's future** — insiders are buying, not selling
- **Alignment of interest** with retail investors
- **Undervaluation** — promoters rarely buy when they think the stock is overpriced

This screener automates the detection of that pattern across a watchlist of stocks, saving hours of manual quarterly data comparison.

---

## Features

- Displays promoter holding % for 8 quarters (Mar 2023 – Dec 2024) per stock
- Detects stocks with consistent quarter-on-quarter increase in the last 4 quarters
- Toggle between "All Stocks" and "Trending Only" views
- Visual badge highlighting trending stocks
- Clean, minimal table UI

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI (Python) |
| Data processing | pandas |
| Frontend | React + Vite |
| Data source | Static CSV (real company data, realistic holding patterns) |

---

## Project Structure

```
promoter-screener/
├── backend/
│   ├── main.py              # FastAPI app with 2 endpoints
│   ├── build_dataset.py     # Builds the CSV dataset with trend detection logic
│   ├── stock_trends.csv     # Generated dataset
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       └── Dashboard.jsx
│   └── ...
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/screener` | Returns all stocks with quarterly holding data |
| GET | `/screener/trending` | Returns only stocks with consistently increasing promoter holding |

---

## Running Locally

**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:8000`.

---

## Core Logic — Trend Detection

The trend detection function checks if promoter holding has increased in each of the last 4 consecutive quarters:

```python
def detect_trend(row):
    last_4 = quarters[-4:]
    values = row[last_4].values
    for i in range(len(values) - 1):
        if values[i] > values[i+1]:
            return False
    return True
```

A single dip or flat quarter disqualifies the stock — only strictly increasing patterns are flagged.

---

## Roadmap / Future Improvements

- [ ] Integrate live NSE shareholding data via public endpoints
- [ ] Add sector and market cap filters
- [ ] Email/SMS alerts when a new stock triggers the trending criteria
- [ ] Extend to track FII and DII holding trends alongside promoter data
- [ ] Deploy backend on Render, frontend on Vercel

---

## About

Built as part of a fintech portfolio targeting full-stack developer roles at Indian fintech startups. The project idea comes from personal investing experience — promoter holding trends are a real signal used in fundamental analysis.
