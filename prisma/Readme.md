# Prisma Schema & Migrate: A Simple Guide

This guide provides a straightforward workflow for updating your Prisma schema and applying those changes to your database using Prisma Migrate.

## 1\. Update Your Prisma Schema

First, open your `prisma/schema.prisma` file and make the changes you want. This could involve adding a new model, adding or removing a field, or changing a field's type.

**Example:** Adding a `bio` field to the `User` model.

```
// prisma/schema.prisma

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  bio   String? // <-- New field
}
```

## 2\. Generate and Apply the Migration

Once your `schema.prisma` file is updated, you'll use the Prisma CLI to generate a new migration file and apply the changes to your database.

Open your terminal and run the following command. Remember to replace `<migration_name>` with a clear, descriptive name for your changes.

```bash
npx prisma migrate dev --name <migration_name>
```

**Example:**

```bash
npx prisma migrate dev --name add-bio-to-user-model
```

**If you want to customize the migration SQL** before applying it, you can use the `--create-only` flag. This will generate the migration file without applying it to the database, allowing you to make manual adjustments.

```bash
npx prisma migrate dev --name <migration_name> --create-only
```

After customizing the migration, you can apply it by running:

```bash
npx prisma migrate dev
```

### What this command does:

- **Compares Schemas:** It compares your updated `schema.prisma` file with the current state of your development database.
- **Generates SQL:** It automatically creates a new migration file in the `prisma/migrations` folder containing the SQL needed to sync your database.
- **Applies Changes:** It immediately applies this new migration to your development database.

## 3\. Commit Your Changes to Git

After the command runs successfully, you **must** commit the changes to your version control system (like Git). This is crucial for collaboration and deployment.

Make sure you commit:

- The updated **`prisma/schema.prisma`** file.
- The newly created migration file located in **`prisma/migrations/<timestamp>_<migration_name>/migration.sql`**.

---

### Important Notes

- **Production:** For production environments, **do not** use `prisma migrate dev`. Instead, run `prisma migrate deploy` to apply pending migrations that are already committed to your repository.
- **Destructive Changes:** If you delete a model or field, Prisma will prompt you for confirmation to prevent accidental data loss. Always be careful when making destructive changes.
- **Renaming:** If you need to rename a field or model, use the `@map()` attribute to avoid losing data. This tells Prisma to map the new name to the old database column name.

<!-- end list -->

```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique @map("user_email") // Maps the 'email' field to the 'user_email' column
}
```
