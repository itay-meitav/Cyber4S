# SQL

## What is SQL
SQL (**S**tructured **Q**uery **L**anguage) is a standard language for accessing and manipulating relational databases. SQL statements are used to perform tasks such as update data on a database, or retrieve data from a database.

Although most database systems use SQL, most of them also have their own additional proprietary extensions that are usually only used on their system. However, the standard SQL commands such as “Select”, “Insert”, “Update”, “Delete”, “Create”, and “Drop” can be used to accomplish almost everything that one needs to do with a database.

## The difference from NoSQL

SQL	| NoSQL
----|------
Relational Database Management System (RDBMS) |	Non-relational or distributed database system
Structured query language and predefined schema | Dynamic schema for unstructured data
Vertically Scalable |	Horizontally scalable
Table based | Document, key-value, graph...
Not suited for hierarchical data storage | Best suited for hierarchical data storage
Better for complex queries - multi-row transactions	| Excellent performance with simple queries
___Popular DBs:___ MySQL, PostgreSQL, Oracle, Microsoft SQL Server, SQLite, etc | ___Popular DBs:___ MongoDB, Firestore, GraphQL, HBase, Neo4j, Cassandra, etc

## SQL vs NoSQL: Which one is better to use?

NoSQL is a recent technology compared to SQL.

SQL databases are better for multi-row transactions, while NoSQL is better for unstructured data like documents or JSONs. SQL databases are also commonly used for legacy systems that were built around a relational structure.

As a database grows in size or the number of users multiplies, many RDBMS-based sites suffer serious performance issues.

In general, one should consider an RDBMS if one has multi-row transactions and complex joins. In a NoSQL database like MongoDB, for example, a document (aka complex object) can be the equivalent of rows joined across multiple tables, and consistency is guaranteed within that object.

### For conclusion
The choice between SQL and NoSQL depends entirely on individual circumstances as both of them have advantages and disadvantages. SQL databases are long-established with fixed schema design and a set structure. They are ideal for applications that require multi-row transactions such as an accounting system or for legacy systems that were built for a relational structure.

On the other hand, NoSQL databases are easily scalable, flexible and simple to use as they have no rigid schema. They are ideal for fast growing applications and for applications with no specific schema definitions such as content management systems, big data applications, real-time analytics, etc.

## SQLite

Now, let's start writing our own SQL statements. We will use the SQLite database. It uses very similar SQL statements to other SQL database engines (such as MySQL, PostgreSQL, etc.), although it is not directly comparable.

SQLite is a simple and easy to use DB that will be useful for our initial practices. It is usually used to provide local data storage for individual applications and devices.

SQLite understands most of the standard SQL language. But it does omit some features while at the same time adding a few features of its own.
- [SQLite statements](https://www.sqlite.org/lang.html)

## Syntax, rules, queries, etc

A relational database system contains one or more objects called tables. The data or information for the database is stored in these tables.

Tables are uniquely identified by their names and are comprised of columns and rows. Columns contain the column name, data type, and any other attributes for the column. Rows contain the records or data for the columns.

Here is a sample table called **weather**:

| city | area | high | low | prediction_date
|:-----|-------|------|----|-----
| Jerusalem  | Center | 30 | 19 | 2022-07-18
| Tel Aviv   | Center | 30 | 25 | 2022-07-18
| Haifa      | North  | 28 | 22 | 2022-07-18
| Beer Sheva | South  | 33 | 22 | 2022-07-18
| Eilat      | South  | 38 | 24 | 2022-07-18
| Rehovot    | Center | 31 | 24 | 2022-07-18

Most of the actions you need to perform on a database table are done with SQL statements.

Some of the most common SQL statements are described below:

## CREATE

The `CREATE` table statement is used to create a new table. Here is the format of a simple create table statement:
```sql
CREATE TABLE "table-name"
("column1" "data type",
 "column2" "data type",
 "column3" "data type");
```

To create the table in the example use  (in database systems such as MySQL and PostgreSQL):
```sql
CREATE TABLE weather
  (city varchar(20), area varchar(20), high number(2), low number(2), prediction_date date);
```
- `varchar(size)` - Variable-length character string. The maximum size is specified in parenthesis.
- `number(size)` - Number value with a max number of column digits specified in parenthesis.

### In SQLite
There is a slight difference between the syntax of database systems such as MySQL and PostgreSQL to SQLite. In the following lesson we are going to practice SQLite for usage simplicity. In future lesson we will practice PostgreSQL.

SQLite CREATE syntax:
```sql
CREATE TABLE weather
  (id INTEGER PRIMARY KEY,
   city TEXT NOT NULL,
   area TEXT NOT NULL,
   high INTEGER DEFAULT 0,
   low INTEGER DEFAULT 0
   prediction_date TEXT);
```

### PRIMARY KEY
A primary key is a column or group of columns used to identify the uniqueness of rows in a table. Each table has one and only one primary key.

SQLite allows you to define primary key in two ways:
1) If the primary key has only one column, you use the PRIMARY KEY column constraint to define the primary key as follows: 
   ```sql
   CREATE TABLE "table-name" (
     "column-name" INTEGER NOT NULL PRIMARY KEY
     ...
   );
   ```
3) In case primary key consists of two or more columns, you use the PRIMARY KEY table constraint to define the primary as shown in the following statement.
   ```sql
   CREATE TABLE "table-name" (
     "column1" INTEGER NOT NULL,
     "column2" INTEGER NOT NULL,
     ...
     PRIMARY KEY("column1", "column2", ...)
   );
   ```

### SQLite data types
If you come from other database systems (such as MySQL and PostgreSQL), you notice that they use static typing - a column with a specific data type can store only data of the declared type.

Unlike other database systems, SQLite uses dynamic type system. A value stored in a column determines its data type, not the column’s data type.

You also don’t have to declare a specific data type for a column when you create the table. Even if you declare a column with a specific data type, you can store there any kind of data such as text, BLOB, or integer, SQLite will not complain

SQLite provides five primitive data types:
- **NULL** - missing information or unknown.
- **INTEGER** - whole numbers (either positive or negative). An integer can have variable sizes such as 1, 2,3, 4, or 8 bytes.
- **REAL** - numbers with decimal values that use 8-byte floats.
- **TEXT** - character data, the maximum length of TEXT is unlimited. SQLite supports various character encodings.
- **BLOB** - **b**inary **l**arge **ob**ject, can store any kind of data. The maximum size of BLOB is unlimited.

**Note**  
SQLite does not support built-in date and time storage classes. TEXT, INTEGER, or REAL can be used to store date and time values.

## INSERT

The `INSERT` statement is used to insert or add a row of data into the table. Here is the format of a simple insert statement:
```sql
INSERT INTO "table-name"
 (first_column,...last_column)
  VALUES (first_value,...last_value);
```

In the example below, the column name first will match up with the value 'Luke', and the column name state will match up with the value 'Georgia'.
```sql
INSERT INTO weather
  (city, area, high, low, prediction_date)
  VALUES ('Jerusalem', 'Center', 30, 19, DATE '2022-07-18');
```
- **Note:** All strings should be enclosed between single quotes: `'string'`

### In SQLite
```sql
INSERT INTO weather (city, area, high, low, prediction_date)
VALUES
	('Jerusalem', 'Center', 30, 19, '2022-07-18'),
	('Tel Aviv', 'Center', 30, 25, '2022-07-18');
```

## SELECT

In order to query the database and retrieve selected data that match the criteria that specified we use the `SELECT` statement:
```sql
SELECT "requested-column" [,"column2", etc]
FROM "table-name"
[WHERE "condition"];
```
- **Note:** `[]` indicates optional parameters. 

For the table we have, we can get all the data with (`*` indicates all columns):
```sql
SELECT * FROM weather;
```

To get conditional data, use the `WHERE` clause to specify the search condition for rows returned by the query.

To get ___city___ and ___area___ columns with ___high___ above 30 use `WHERE`:
```sql
SELECT city, area FROM weather WHERE high > 30;
```
To get all cities that start with "H" (`%` represents a wild card to match any possible character):
```sql
SELECT city FROM weather WHERE city LIKE 'H%';
```
This statement will  select rows where the area equals 'South'.
```sql
SELECT * FROM weather WHERE area = 'South';
```

### Resources
- For more [SQLite logical and comparison operators](https://www.sqlitetutorial.net/sqlite-where/).

## UPDATE

The `UPDATE` statement is used to update or change records that match a specified criteria. This is accomplished with the `WHERE` clause:
```sql
UPDATE "table-name"
SET "column1" = 
    "new-value-1"
 [,"column2" = 
   "new-value-2"...]
WHERE "column1" 
  OPERATOR "value" 
 [AND|OR "column" 
  OPERATOR "value"];
```

For example, to update the high temperature and date in Eilat:
```sql
UPDATE weather
  SET high = 40, prediction_date = '2022-07-19'
  WHERE city = 'Eilat';
```
To update one row in the weather table, you use `LIMIT 1` clause. To make sure that you update the first row sorted by the low temperature add the `ORDER BY low` clause:
```sql
UPDATE weather
  SET area = 'Unknown'
  ORDER BY low
  LIMIT 1;
```
To update all rows in the weather table, just skip the `WHERE` clause. The following `UPDATE` statement changes the dates of all cities:
```sql
UPDATE weather SET prediction_date = '2022-07-22';
```
## DELETE

The `DELETE` statement is used to delete records or rows from the table:
```sql
DELETE FROM "table-name"
  WHERE "column1" OPERATOR "value"
 [AND|OR "column2" OPERATOR "value"];
```

In the following example, we delete Haifa:
```sql
DELETE FROM weather 
  WHERE city = 'Haifa';
```
- **Note:** if you leave off the where clause, all the records will be deleted!

## DROP

The `DROP TABLE` command is used to delete a table and all rows in the table:
```sql
DROP TABLE weather;
```

## FOREIGN KEY
Sometimes we need to enforce a relationship between rows in two different tables. It can be achieved via the `FOREIGN KEY`.

- In order to support foreign keys in SQLite, `foreign_keys` flag needs to be set: `PRAGMA foreign_keys = ON;`.

Let's start with two tables: `employees` and `positions`.
```sql
CREATE TABLE employees (
 employee_id INTEGER PRIMARY KEY,
 first_name TEXT NOT NULL,
 last_name TEXT NOT NULL,
 position_id INTEGER NOT NULL
);

CREATE TABLE positions (
 position_id INTEGER PRIMARY KEY,
 title TEXT NOT NULL
);
```

We want to prevent removing a position from the positions table, without proper adjustments to the employee table. Otherwise, the employee table would contain orphaned rows.

To achieve that we can define the `employees` table using `FOREIGN KEY`:
```sql
CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position_id INTEGER NOT NULL,
FOREIGN KEY (position_id)
REFERENCES positions (position_id) 
);
```

Now the `positions` table is called a **parent table**, which is the table that a foreign key references. While the `employees` table is the **child table**, which is the table to which the foreign key constraint applies.

The `FOREIGN KEY` is referenced from the child table to the parent. Typically, the `FOREIGN KEY` is the primary key of the parent table.

To specify how the `FOREIGN KEY` constraint behaves when the parent key is deleted or updated, we use the `ON DELETE` or `ON UPDATE` actions:
```sql
FOREIGN KEY (foreign_key_columns)
   REFERENCES parent_table (parent_key_columns)
      ON UPDATE action 
      ON DELETE action;
```

SQLite supports the following actions:
- SET NULL - When the parent key changes, delete or update, the corresponding child keys of all rows in the child table set to NULL
- SET DEFAULT - Sets the value of the foreign key to the default value specified in the column definition
- RESTRICT - Does not allow you to change or delete values in the parent key of the parent table
- NO ACTION - Similar effect as RESTRICT
- CASCADE - Propagates the changes from the parent table to the child table

Example, If a position from the positions table is removed, set the default to the employee table:
```sql
CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  position_id INTEGER NOT NULL DEFAULT 0,
FOREIGN KEY (position_id)
REFERENCES positions (position_id) 
  ON UPDATE CASCADE 
  ON DELETE SET DEFAULT;
```

## SQLite Setup

[Instructions](https://www.npmjs.com/package/sqlite3) for SQLite npm package

1) Install: `npm install sqlite3`
2) Create a Javascript file `app.js`, and add the following code to connect to the DB:  
   ```js
   const { OPEN_READWRITE } = require('sqlite3');

   const sqlite3 = require('sqlite3').verbose();

   // Connect to DB
   const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
     if (err) {
       console.log('Could not connect to database', err.message);
     } else {
       console.log('Connected to database');
     }
   });
   ```
3) Add data to DB:
   ```js
   db.serialize(async () => {
     // Create table
     let sql = `CREATE TABLE weather (id INTEGER PRIMARY KEY, city, area, high, low, prediction_date)`;
     db.run(sql);
     // Insert to table
     sql = `INSERT INTO weather (city, area, high, low, prediction_date) VALUES (?,?,?,?,?)`;
     db.run(
       sql,
       ['Jerusalem', 'Center', 30, 19, '2022-07-18'],
       (err) => {
         if (err) return console.log(err.message);
       });
     // Query table
     sql = `SELECT * from weather`;
     db.all(sql, [], (err, rows) => {
       if (err) return console.log(err.message);
       rows.forEach(row => {
         console.log(row);
       })
     });
     // Drop table
     sql = `DROP TABLE weather`;
     db.run(sql);
   });
   db.close();
   ```
4) We will practice more SQLite in the tasks.

### Resources
- YouTube (2 min): [SQL Explained in 100 Seconds](https://www.youtube.com/watch?v=zsjvFFKOm3c)
- YouTube (9 min): [Which Is Better? SQL vs NoSQL](https://www.youtube.com/watch?v=t0GlGbtMTio)
- YouTube (first 5 minutes): [SQL - The Basics](https://www.youtube.com/watch?v=Cz3WcZLRaWc)
- YouTube (10 min): [Node JS SQLite Crash Course (2022)](https://www.youtube.com/watch?v=ZRYn6tgnEgM)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)
- [SQLite documentation](https://www.sqlite.org/index.html)
- [https://www.npmjs.com/package/sqlite3](https://www.npmjs.com/package/sqlite3)

## SQL Joins

We have previously discussed that SQL DBs are built to avoid data duplication. This structure sometimes requires to get data from several tables.

One image is worth a thousand words:  
![](https://i.pinimg.com/564x/0e/ae/a1/0eaea116051e07f243141ea9d3817dbf.jpg)  
Please keep this image in mind while learning the different joins.

For example, let's look at the example of employees and positions.

**employees table:**

| employee_id | last_name | first_name | position_id
|----|----|----|----
| 10000 |	Smith | John | 23
| 10001 | Anderson | Dave | 20
| 10002 | Doe | John | 21
| 10003 | Hunt | Dylen

**positions table:**

| position_id | title | city
|----|----|----
| 20 | Product Manager | Tel Aviv
| 21 | Backend Developer | Tel Aviv
| 22 | Frontend Developer | Tel Aviv
| 23 | Data Analyst | Haifa

Each position can have zero or many employees while an employee can have only one position assigned.

To query data from both tables, we will use the SQL JOIN commands.

The following examples will show the different types of JOIN:

### SQLite INNER JOIN
Returns only the table rows that intersect:  
![](https://i.ibb.co/h9schbW/inner-join.png)

In the following example, we have an output of the employees names and their positions:
```sql
SELECT 
    first_name,
    last_name,
    title
FROM 
    employees
INNER JOIN positions ON
    positions.position_id = employees.position_id;
```

Since the positions assigned to the employees are in a separate table, we had to use the `JOIN` statement.

The `INNER JOIN` clause matches each row from the left `employees` table with every row from the right `positions` table based on the join condition specified after the ON keyword.

We can use aliases to simplify the query (l for employees table and r for positions table):
```sql
SELECT
  l.first_name,
  l.last_name,
  r.title
FROM employees l
INNER JOIN positions r ON r.position_id = l.position_id;
```

When the columns of the joined tables have the same name, we can use the `USING` syntax to shorten even more:
```sql
SELECT
  first_name,
  last_name,
  title
FROM employees
INNER JOIN positions USING(position_id);
```

**If the join condition evaluates to true, the columns of rows from both left and right tables are included in the result.**

### SQLite LEFT JOIN
Returns all the from the left table specified in the ON condition and only those rows from the right table where the joined fields are equal:  
![join](https://i.ibb.co/Gpw1WmR/left-join.png)

```sql
SELECT
    title
    first_name,
    last_name
FROM
    positions
LEFT JOIN employees ON
    positions.position_id = positions.position_id
ORDER BY title;
```

The `LEFT JOIN` clause selects data starting from the left table `positions` and matching rows in the right table `employees` based on the join condition.

**The `LEFT JOIN` returns all rows from the left table and the matching rows from the right table.
If a row from the left table doesn’t have a matching row in the right table, SQLite includes the columns of the left table and NULL for the columns of the right table.**

### SQLite CROSS JOIN
Returns a combined result  with every row from the left table matched with every row from the right table:  
![](https://i.ibb.co/wWbwQss/cross-join.png)

Unlike the `INNER JOIN` and `LEFT JOIN` clauses, a `CROSS JOIN` doesn't have a join condition:

```sql
SELECT
    position_id
FROM employees
CROSS JOIN positions;
```

The `CROSS JOIN` combines every row from the first table with every row from the second table to form the result set.

If the first table has N rows, the second table has M rows, the final result will have NxM rows.

### Note
SQLite doesn't support `RIGHT JOIN` and `FULL JOIN` that are available for other SQL database engines (such as MySQL, PostgreSQL, etc.).

### Resources
- YouTube - Learn SQL (using MySQL), [JOIN explanation](https://www.youtube.com/watch?v=p3qvj9hO_Bo&t=2460s)
- [SQLite Joins](https://www.sqlitetutorial.net/sqlite-join/)

