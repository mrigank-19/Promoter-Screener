import pandas as pd

quarters = ["mar_2023", "jun_2023", "sep_2023", "dec_2023", "mar_2024", "jun_2024", "sep_2024", "dec_2024"]

stock_promoter = {
    "KPRMILL":    {"company_name": "K.P.R. Mill Ltd",                    "holdings": [73.00, 73.58, 74.17, 74.76, 75.36, 75.96, 76.57, 77.18]},
    "PAGEIND":    {"company_name": "Page Industries Ltd",                 "holdings": [59.00, 59.47, 59.95, 60.43, 60.91, 61.40, 61.89, 62.39]},
    "TTKPRESTIG": {"company_name": "TTK Prestige Ltd",                    "holdings": [70.00, 70.56, 71.12, 71.69, 72.26, 72.84, 73.42, 74.01]},
    "APOLLOHOSP": {"company_name": "Apollo Hospitals Enterprise Ltd",     "holdings": [29.00, 29.23, 29.46, 29.70, 29.94, 30.18, 30.42, 30.66]},
    "KALYANKJIL": {"company_name": "Kalyan Jewellers India Ltd",          "holdings": [60.00, 60.48, 60.97, 61.46, 61.96, 62.46, 62.97, 63.48]},
    "SAPPHIRE":   {"company_name": "Sapphire Foods India Ltd",            "holdings": [50.00, 50.40, 50.80, 51.21, 51.62, 52.03, 52.45, 52.87]},
    "VAIBHAVGBL": {"company_name": "Vaibhav Global Ltd",                  "holdings": [64.00, 64.51, 65.03, 65.55, 66.07, 66.60, 67.13, 67.67]},
    "LAURUSLABS": {"company_name": "Laurus Labs Ltd",                     "holdings": [27.00, 27.22, 27.44, 27.66, 27.88, 28.10, 28.33, 28.56]},
    "HAPPSTMNDS": {"company_name": "Happiest Minds Technologies Ltd",     "holdings": [53.00, 53.42, 53.85, 54.28, 54.71, 55.15, 55.59, 56.03]},
    "ROUTE":      {"company_name": "Route Mobile Ltd",                    "holdings": [56.00, 56.45, 56.90, 57.35, 57.81, 58.27, 58.74, 59.21]},
}

# 1. Rebuild the data structure to cleanly separate columns
formatted_data = [
    {
        "Symbol": symbol, 
        "Name": info["company_name"], 
        **dict(zip(quarters, info["holdings"]))
    }
    for symbol, info in stock_promoter.items()
]

# 2. Load it right into your DataFrame
df = pd.DataFrame(formatted_data)

def detect_trend(row):
    last_4 = quarters[-4:]
    values = row[last_4].values

    for i in range(len(values) - 1):
        if values[i] > values[i+1]:
            return False
    
    return True

df["is_trending"] = df.apply(detect_trend, axis=1)

df.to_csv("stock_trends.csv", index=False)

