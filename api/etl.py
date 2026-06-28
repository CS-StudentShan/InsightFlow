import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = "https://hgpkyrrdvjwtrzwclfpw.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load CSV - only first 10000 rows
print("Loading dataset...")
df = pd.read_csv("../data/data.csv", encoding="latin1", nrows=10000)
print(f"Loaded {len(df)} rows")

# Clean data
print("Cleaning data...")
df.columns = ["invoice_no", "stock_code", "description", "quantity",
              "invoice_date", "unit_price", "customer_id", "country"]

df = df.dropna(subset=["customer_id"])
df = df[df["quantity"] > 0]
df = df[df["unit_price"] > 0]
df["customer_id"] = df["customer_id"].astype(int).astype(str)
df["invoice_date"] = pd.to_datetime(df["invoice_date"])
df["total_price"] = df["quantity"] * df["unit_price"]

print(f"Cleaned: {len(df)} rows remaining")

# Insert products
print("Inserting products...")
products = df[["stock_code", "description", "unit_price"]].drop_duplicates("stock_code")
products_data = [
    {"stock_code": str(r.stock_code), "description": r.description, "unit_price": float(r.unit_price)}
    for r in products.itertuples()
]
try:
    supabase.table("products").upsert(products_data).execute()
    print(f"  Done — {len(products_data)} products")
except Exception as e:
    print("Products error:", e)

# Insert customers
print("Inserting customers...")
customers = df.groupby("customer_id").agg(
    country=("country", "first"),
    first_purchase_date=("invoice_date", "min"),
    total_orders=("invoice_no", "nunique"),
    total_spent=("total_price", "sum")
).reset_index()

customers_data = [
    {
        "customer_id": r.customer_id,
        "country": r.country,
        "first_purchase_date": r.first_purchase_date.date().isoformat(),
        "total_orders": int(r.total_orders),
        "total_spent": float(r.total_spent)
    }
    for r in customers.itertuples()
]
try:
    supabase.table("customers").upsert(customers_data).execute()
    print(f"  Done — {len(customers_data)} customers")
except Exception as e:
    print("Customers error:", e)

# Insert orders
print("Inserting orders...")
orders = df.groupby("invoice_no").agg(
    customer_id=("customer_id", "first"),
    order_date=("invoice_date", "first"),
    country=("country", "first"),
    total_amount=("total_price", "sum")
).reset_index()

orders_data = [
    {
        "order_id": str(r.invoice_no),
        "customer_id": r.customer_id,
        "order_date": r.order_date.isoformat(),
        "country": r.country,
        "total_amount": float(r.total_amount)
    }
    for r in orders.itertuples()
]
try:
    supabase.table("orders").upsert(orders_data).execute()
    print(f"  Done — {len(orders_data)} orders")
except Exception as e:
    print("Orders error:", e)

# Insert order items
print("Inserting order items...")
items_data = [
    {
        "order_id": str(r.invoice_no),
        "stock_code": str(r.stock_code),
        "description": r.description,
        "quantity": int(r.quantity),
        "unit_price": float(r.unit_price),
        "total_price": float(r.total_price)
    }
    for r in df.itertuples()
]
try:
    supabase.table("order_items").upsert(items_data).execute()
    print(f"  Done — {len(items_data)} order items")
except Exception as e:
    print("Order items error:", e)

print("\nDatabase seeded successfully!")