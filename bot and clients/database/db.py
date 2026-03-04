import sqlite3
from pathlib import Path
from typing import Optional, List, Tuple

# шлях до бази (щоб не було "../app/clients.db" і не ламалось)
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR.parent / "app" / "clients.db"


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # зручно: доступ row["name"]
    return conn


def init_db() -> None:
    with get_conn() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                date TEXT NOT NULL
            )
        """)


def add_client(name: str, phone: str, date: str) -> int:
    with get_conn() as conn:
        cur = conn.execute(
            "INSERT INTO clients (name, phone, date) VALUES (?, ?, ?)",
            (name, phone, date)
        )
        return cur.lastrowid


def delete_client(client_id: int) -> None:
    with get_conn() as conn:
        conn.execute("DELETE FROM clients WHERE id = ?", (client_id,))


def get_clients(from_date: Optional[str] = None, to_date: Optional[str] = None) -> List[sqlite3.Row]:
    with get_conn() as conn:
        if from_date and to_date:
            cur = conn.execute(
                "SELECT * FROM clients WHERE date BETWEEN ? AND ? ORDER BY id DESC",
                (from_date, to_date)
            )
        else:
            cur = conn.execute("SELECT * FROM clients ORDER BY id DESC")

        return cur.fetchall()
