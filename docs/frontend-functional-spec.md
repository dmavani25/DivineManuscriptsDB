## Divine Manuscripts DB frontend Functional Script

Author : [Dhyey Mavani](mailto:dmavani25@amherst.edu), [Brandon Ngacho](mailto:bngacho24@amherst.edu)

### Overview.

The Divine Manuscripts Project Functional Specification outlines the core functionality, features, and technical requirements for the development of a digital religion library system. The primary objective of this project is to create a centralized applicaton that efficiently manages and provides access to a wide range of resources, including books and journals. The system aims to streamline the process of cataloging, searching, and retrieving books, enhancing the overall user experience for students, professors, and library staff.

### Main Features
1. Authentication and Authorization. 
2. Book management.
3. Search and Retrieval.
4. Security and Compliance. 

#### Authentication and Authorization.
The Library Database Project will implement Single Sign-On protocols to ensure secure and encrypted communication between users and the system. 

User roles will be assigned based on their email addresses. The system will automatically categorize users into different roles following specific criteria:

    Students: Users whose email addresses contain numbers (e.g., johndoe123@amherst.edu) will be automatically assigned the "Student" role. Students will only be allowed to view what books exist in their database and where they can find them in the library.

    Professors: Users whose email addresses do not contain numbers (e.g., janedoe@amherst.edu) will be categorized as "Professors." Professors will have additional privileges, including self-checkout and returning the resources.

    Admin: Users with the email address religion@amherst.edu will be designated as system administrators ("Admin"). Admin users will have full control over the system, including 
    - Managing user accounts (CRUD)
    - Managing Books (CRUD)
    - Managing book checkout (CRUD)

#### Book Management.
In the context of the Library Database Project, book management refers to the systematic organization, cataloging, and tracking of physical books within the library's collection. This process involves the following key functionalities, each tailored to meet the specific needs of different user roles:

1. Viewing Books:

    Students: Students, identified by email addresses containing numbers (e.g., johndoe123@amherst.edu), can view a catalog of books available in their database. They can access information about book titles, authors, genres, and availability status within the library.

2. Self-Checkout and Return:

    Professors: Professors, identified by email addresses without numbers (e.g., janedoe@amherst.edu), possess additional privileges. They can perform self-checkout for books they wish to borrow and initiate the return process for previously borrowed resources. This self-service functionality enhances the efficiency of resource management.

3. Admin Control (CRUD Operations):

    Admin: Users with the specific email address religion@amherst.edu are designated as system administrators ("Admin"). Admin users have comprehensive control over the entire book management process, including:
        Creating Books: Admins can add new book entries to the database, providing details such as title, author, ISBN, genre, and location wihin the library.

        Updating Books: Admins can modify existing book records, enabling them to edit book information, update availability status, or revise location details.

        Deleting Books: Admins have the authority to remove book entries from the database, ensuring that outdated or irrelevant resources are removed from circulation.

        Managing Book Checkout: Admins can oversee and manage the process of book checkout, including approving requests.

#### Search and Retrieval.
In the Library Database Project, the Search and Retrieval functionality is designed to provide users with a seamless and efficient experience in discovering and accessing library resources. The system will feature a user-friendly interface consisting of the following components:

1. Search Interface:

    Search Button: Users will be presented with a dedicated search button, allowing them to initiate searches based on book titles, authors, genres, or keywords. The search functionality will employ robust algorithms to deliver accurate and relevant results.

    Filter Button: A filter button will enable users to refine search results based on specific criteria such as genre, publication date, or availability status. This feature enhances the precision of search outcomes.

2. Ag-Grid Display:

    The search results will be displayed using an ag-Grid, a powerful and interactive data grid component. The ag-Grid will present search results in a tabular format, ensuring clear and organized visibility of book information.
    For each book entry, users will have access to details such as title, author, ISBN, location within the library, and availability status.

3. Enhanced Functionality for Professors and Admin:

    Checkout Button (Professors and Admin): For professors and administrators, the ag-Grid will include a dedicated "Checkout" button next to each book entry. 

#### Security and Compliance.



