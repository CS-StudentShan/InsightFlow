from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_client(
    "https://hgpkyrrdvjwtrzwclfpw.supabase.co",
    os.getenv("SUPABASE_SERVICE_KEY")
)

@app.get("/")
def root():
    return {"status": "ok", "message": "E-commerce Analytics API"}

@app.get("/kpis")
def get_kpis():
    orders = supabase.table("orders").select("total_amount").execute()
    customers = supabase.table("customers").select("customer_id").execute()
    
    total_revenue = sum(o["total_amount"] for o in orders.data)
    total_orders = len(orders.data)
    total_customers = len(customers.data)
    avg_order_value = total_revenue / total_orders if total_orders > 0 else 0

    return {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "total_customers": total_customers,
        "avg_order_value": round(avg_order_value, 2)
    }

@app.get("/revenue-over-time")
def get_revenue_over_time():
    orders = supabase.table("orders").select("order_date, total_amount").execute()
    
    from collections import defaultdict
    monthly = defaultdict(float)
    for order in orders.data:
        month = order["order_date"][:7]
        monthly[month] += order["total_amount"]
    
    result = [{"month": k, "revenue": round(v, 2)} for k, v in sorted(monthly.items())]
    return result

@app.get("/top-products")
def get_top_products():
    items = supabase.table("order_items").select("description, quantity, total_price").execute()
    
    from collections import defaultdict
    products = defaultdict(lambda: {"units_sold": 0, "revenue": 0})
    for item in items.data:
        desc = item["description"]
        products[desc]["units_sold"] += item["quantity"]
        products[desc]["revenue"] += item["total_price"]
    
    result = [
        {"description": k, "units_sold": v["units_sold"], "revenue": round(v["revenue"], 2)}
        for k, v in products.items()
    ]
    result.sort(key=lambda x: x["revenue"], reverse=True)
    return result[:10]

@app.get("/categories")
def get_categories():
    items = supabase.table("order_items").select("description, total_price").execute()
    
    from collections import defaultdict
    categories = defaultdict(float)
    for item in items.data:
        words = item["description"].split()
        category = words[0] if words else "OTHER"
        categories[category] += item["total_price"]
    
    result = [{"category": k, "revenue": round(v, 2)} for k, v in categories.items()]
    result.sort(key=lambda x: x["revenue"], reverse=True)
    return result[:8]