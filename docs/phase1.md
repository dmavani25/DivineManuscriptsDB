## What you learned from the customer
## The preliminary ER-diagram,
```mermaid
classDiagram
    class User
    User : Integer userId
    User : String email
    User : String designation

    class Book
    Book : Integer bookId
    Book : String author
    Book : String Location 
    Book : String name


    class CheckOut
    CheckOut : Integer id
    CheckOut : Integer bookId
    CheckOut : Integer userId 

    Book -- CheckOut
    User -- CheckOut
```

## The Data
### What is it
### In what format
### How much data
### Do we have access
### Does it Need cleaning
## What don't we know
## Next steps.