import random
import time
from datetime import datetime
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = "https://hgpkyrrdvjwtrzwclfpw.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

PRODUCTS = [
    {"stock_code": "85123A", "description": "WHITE HANGING HEART T-LIGHT HOLDER", "unit_price": 2.55},
    {"stock_code": "71053", "description": "WHITE METAL LANTERN", "unit_price": 3.39},
    {"stock_code": "84029G", "description": "KNITTED UNION FLAG HOT WATER BOTTLE", "unit_price": 3.39},
    {"stock_code": "21232", "description": "STRAWBERRY CERAMIC TRINKET BOX", "unit_price": 1.25},
    {"stock_code": "22423", "description": "REGENCY CAKESTAND 3 TIER", "unit_price": 12.75},
]

CUSTOMER_IDS = ["17850", "13047", "12583", "14688", "15311"]
COUNTRIES = ["United Kingdom", "Germany", "France", "Canada"]

def create_fake_order():
    order_id = str(random.randint(900000, 999999))
    customer_id = random.choice(CUSTOMER_IDS)
    country = random.choice(COUNTRIES)
    now = datetime.utcnow().isoformat()

    num_items = random.randint(1, 3)
    items = random.sample(PRODUCTS, num_items)

    total_amount = 0
    order_items_data = []
    for product in items:
        quantity = random.randint(1, 10)
        total_price = quantity * product["unit_price"]
        total_amount += total_price
        order_items_data.append({
            "order_id": order_id,
            "stock_code": product["stock_code"],
            "description": product["description"],
            "quantity": quantity,
            "unit_price": product["unit_price"],
            "total_price": total_price
        })

    supabase.table("orders").upsert({
        "order_id": order_id,
        "customer_id": customer_id,
        "order_date": now,
        "country": country,
        "total_amount": round(total_amount, 2)
    }).execute()

    supabase.table("order_items").insert(order_items_data).execute()

    print(f"Created order {order_id} — £{round(total_amount, 2)}")

if __name__ == "__main__":
    print("Starting order simulator...")
    while True:
        try:
            create_fake_order()
        except Exception as e:
            print("Error:", e)
        time.sleep(60)