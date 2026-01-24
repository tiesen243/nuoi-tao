CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY,
  gateway TEXT NOT NULL,
  transaction_date TEXT NOT NULL,
  account_number TEXT NOT NULL,
  code TEXT,
  content TEXT NOT NULL,
  transfer_type TEXT NOT NULL CHECK(transfer_type IN ('in', 'out')),
  transfer_amount REAL NOT NULL,
  accumulated REAL NOT NULL,
  sub_account TEXT,
  reference_code TEXT NOT NULL,
  description TEXT NOT NULL
);
