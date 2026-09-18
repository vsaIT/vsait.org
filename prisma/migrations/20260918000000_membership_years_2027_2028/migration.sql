-- Adds the 2027/2028 and 2028/2029 membership years. A year is shown as
-- `${year}/${year + 1}`, so 2027 is 2027/2028 and 2028 is 2028/2029.
-- Years that already exist are left untouched.
INSERT INTO "Membership" ("year") VALUES (2027), (2028)
ON CONFLICT ("year") DO NOTHING;
