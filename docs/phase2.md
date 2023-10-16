## What we learned from the customer
- The customer requires a database such that we will have all the information related to the religion library and the available books in an organized and easily accessible manner.
- We are planning to implement the following features:
    - Can filter by related words (by typing in a textbox for fields).
    - Add/delete a row/book through some interface through admin access to DB as a department coordinator.
    - Have UI to store if the book is lended, and returned (and by whom). 
- Most people who will borrow/return will be profs (so need to make sure that it is visible to them).
- For now, we don't want students to access it because in the past they found the books, took them and never returned, so this needs to be serving ADC (our customer) as admin

## The Revised ER-diagram,
TO BE UPDATED SOON :)
```mermaid
erDiagram
    User ||--|{ Checkings : "checks out"
    Checkings }|--|| Book : "is checked out"
    Book ||--|| Location : "has"
    
    User {
        email email
        role VARCHAR
        name VARCHAR
    }

    Book {
        bookName VARCHAR
        authorName VARCHAR
        religion VARCHAR
        numCopies INTEGER
        checkedOutCopies INTEGER
    }

    Checkings {
        checkedOutSince VARCHAR
        userEmail VARCHAR
        bookName VARCHAR
        authorName VARCHAR
    }

    Location {
        locationId INTEGER
        wing VARCHAR
        shelf VARCHAR
        bookName VARCHAR
        authorName VARCHAR
    }

```
## The Data
We received the data in the form of Excel sheets. It contained various sheets with different subsets of information from all the attributes. The data will definitely need cleaning. The data is about the religious books stored by the religion department. Each book already has a name, author, topic, Bookcase, and shelf number where it is stored. We have around 600 books.

### Data restrictions:
- User can't check out multiple copies of the same book simulteanously

## Generating ER Schema:
Based on our ER-diagram, the draft of database schema can be roughly outlined as: (Please note that "--" is a comment in SQL, which is not executed)

```sql
-- User Table
CREATE TABLE User (
    email VARCHAR(255) PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL
);

-- Book Table with composite primary key
CREATE TABLE Book (
    bookName VARCHAR(255) NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    religion VARCHAR(50) NOT NULL,
    numCopies INTEGER NOT NULL,
    checkedOutCopies INTEGER NOT NULL,
    PRIMARY KEY (bookName, authorName)
);

-- Checkings Table
CREATE TABLE Checkings (
    checkedOutSince VARCHAR(255),
    userEmail VARCHAR(255) NOT NULL,
    bookName VARCHAR(255) NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    FOREIGN KEY (userEmail) REFERENCES User(email),
    FOREIGN KEY (bookName, authorName) REFERENCES Book(bookName, authorName)
);

-- Location Table
CREATE TABLE Location (
    locationId INTEGER PRIMARY KEY,
    wing VARCHAR(100) NOT NULL,
    shelf VARCHAR(25) NOT NULL,
    bookName VARCHAR(255) NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    FOREIGN KEY (bookName, authorName) REFERENCES Book(bookName, authorName),
    UNIQUE (bookName, authorName)  -- Enforce the one-to-one relationship
);

```






## Finalizing Tech Stack:

#### Backend:
- **Database**: PostgreSQL (as mentioned, and installed).
- **Server**:  Linux server.
- **Backend Framework**: NextJS, Flask or Django (Python) would be suitable for this. Flask is lightweight and easier to set up, while Django is more robust and comes with an admin interface out of the box.

#### Frontend:
- **Framework/Library**: React.js or Vue.js. React.js is widely used and has a large community, while Vue.js is easier to pick up for beginners.
- **UI Library**: MantineUI, TailwindCSS, Material-UI (for React) or Vuetify (for Vue) to speed up the development process with pre-built UI components.

#### API for Publisher:
- Google Books API / Open Library API. These APIs can provide book details based on ISBN or title.

## Data Cleaning:
- Load the Excel sheets into a tool like Pandas in Python.
- Examine data for missing values, duplicates, or inconsistent formats.
- Handle any outliers or errors in the data.
- Normalize the data (e.g., ensuring consistent casing, date formats, etc.).

## Development:

#### Backend:
- [DONE] Set up the database and schema.
- Create API endpoints for CRUD operations on books, users, and checkout logs.
- Implement filtering functionality.
- Add authentication and authorization to ensure only admins can add/delete and everyone else has read-only access.
  
#### Frontend:
- Create a dashboard UI for viewing books, users, and checkout logs.
- Implement filtering functionality on the UI.
- Add interfaces for adding/deleting books and users.
- Create UI components to handle book lending and returning.
  
## Extended Goals:
- Integrate with the chosen publisher API to fetch book details.
- Add Single Sign-On (SSO) functionality using Amherst emails.
- Allow the ADC to input a list of emails to grant access.

## Testing:
- Test CRUD operations.
- Implement unit tests
- Test filtering functionality.
- Test user roles (admin vs regular user).
- Test the extended goals' features.

## Deployment:
- Deploy the backend on the Linux server.
- Deploy the frontend on a suitable hosting provider or the same server.

## Documentation & Handover:
- Document the system, including API endpoints, database schema, and any other relevant details.
- Provide training or a walkthrough to ADC or any other relevant stakeholders.
  
## Next Steps:
1. Start the data cleaning process.
2. Initiate the development process, beginning with the backend and frontend simultaneously.
3. Regularly test and iterate based on feedback.
4. Once stable, deploy and document the system.
