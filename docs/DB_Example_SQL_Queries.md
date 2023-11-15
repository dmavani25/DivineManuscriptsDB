
# SQL Query Examples for Religion Library Database

## Overview
This document provides examples of propsed SQL queries that can be used to interact with the database for a religion library system. These queries demonstrate how to perform various operations such as searching for books, managing checkouts, and administrative tasks.

### 1. Search for Books by Keywords
```sql
SELECT * FROM Book
WHERE bookName LIKE '%keyword%'
OR authorName LIKE '%keyword%'
OR religion LIKE '%keyword%';
```

### 2. Add a New Book (Admin Access)
```sql
INSERT INTO book (bookname, authorname, religion, shelf, wing, numcopies, checkedOutCopies)
VALUES ('Example Book', 'Author Name', 'Religion', 'Shelf Location', 'Wing Location', 5, 0);
```

### 3. Delete a Book (Admin Access)
```sql
DELETE FROM Book
WHERE bookName = 'Example Book' AND authorName = 'Author Name';
```

### 4. Check Out a Book
```sql
INSERT INTO Checkings (checkedOutSince, userEmail, bookName, authorName)
VALUES (CURRENT_DATE, 'user@example.com', 'Example Book', 'Author Name');

UPDATE Book
SET checkedOutCopies = checkedOutCopies + 1
WHERE bookName = 'Example Book' AND authorName = 'Author Name';
```

### 5. Return a Book
```sql
DELETE FROM Checkings
WHERE userEmail = 'user@example.com' AND bookName = 'Example Book' AND authorName = 'Author Name';

UPDATE Book
SET checkedOutCopies = checkedOutCopies - 1
WHERE bookName = 'Example Book' AND authorName = 'Author Name';
```

### 6. List of Books Checked Out by a User
```sql
SELECT b.bookName, b.authorName, c.checkedOutSince
FROM Book b
JOIN Checkings c ON b.bookName = c.bookName AND b.authorName = c.authorName
WHERE c.userEmail = 'user@example.com';
```

### 7. Check for Duplicate Checkouts
```sql
SELECT COUNT(*)
FROM Checkings
WHERE userEmail = 'user@example.com' AND bookName = 'Example Book' AND authorName = 'Author Name';
```
