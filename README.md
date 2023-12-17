# DivineManuscriptsDB

![Screenshot 2023-12-16 at 10 20 10 PM](https://github.com/dmavani25/DivineManuscriptsDB/assets/89651168/9953281a-7cb3-4722-a844-bbc05fe8456b)

## Overview
The Divine Manuscripts DB project, spearheaded by a team of computer science students at Amherst College, aims to revolutionize the way the Religion Department manages its extensive library of religious texts. This project replaces outdated Excel sheets with a sophisticated database management system, facilitating efficient data handling and enhancing the overall library experience for faculty and staff. Below, we will go over the main components of the project very briefly. For details, please refer to the respective code, documentation, and data folders intuitively organized on this repository.

## Team Members
- **Dhyey Mavani '25:** Specializing in Computer Science, Mathematics, and Statistics.
- **Ahmed Aly '24:** A blend of expertise in Computer Science and Political Science.
- **Brandon Ngacho '24:** Focused on Computer Science and Mathematics.
- **Muhammad Ahsan Tahir '24:** Combining skills in Computer Science and Mathematics.

## Acknowledgement
A special gratitude to Professor Matteo Riondato for giving us the opportunity to pursue this project during COSC-257: Databases course, and for helping us throughout the development process of the same through continuous feedback and debugging support.

## Project Requirements
### Client Needs
- A database offering organized, accessible information on religious texts.
- Features including:
  - Text-based filtering.
  - Administrative capabilities to add/delete records.
  - UI for tracking book lending and returns, focused on faculty usage.

### User Restrictions
- Users cannot check out multiple copies of the same book simultaneously.

## Technical Specifications
### ER-Diagram
The system's structure is defined by an ER-diagram illustrating the relationships between users, books, and their checkouts.

### Database Schema
The schema, developed in SQL, consists of three main tables: User, Book, and Checkings.

### Tech Stack
- **Backend**: PostgreSQL database, NextJS framework on a Linux server.
- **Frontend**: React.js with Nx.dev, utilizing TailwindCSS and Material-UI for UI design.
- **API Integration**: Google Books API / Open Library API for book details.

## Development Phases
### Data Cleaning
- Conversion of Excel sheets to a cleaned, normalized dataset.

### Backend Development
- Database setup, API creation for CRUD operations, and user authentication.

### Frontend Development
- Development of a user-friendly dashboard, integrating UI components with backend services.

## Extended Goals
- Publisher API integration for book details.
- Single Sign-On (SSO) with Amherst emails.
- Restricted access based on user email lists.

## Testing and Deployment
- Comprehensive testing including CRUD operations, role-based access, and extended features.
- Deployment on a Linux server for backend and a suitable platform for frontend.

## Documentation and Training
- Detailed documentation of the system and training for Amherst College Religion Department staff.

## Project Highlights
### Unique Features
- Tailored Authentication: SSO with role-based access for students, professors, and admins.
- Dynamic Book Management: Admins can manage book records and oversee checkouts.
- Intelligent Search and Retrieval: Advanced search with an ag-Grid display for easy access to book information.
- Enhanced Professor and Admin Interface: Specialized checkout functionalities.

### Future Enhancements
- Further integration with academic databases and tools.
- Expansion of user roles and permissions for a broader range of stakeholders.

---

For more information or to contribute to this project, contact [Dhyey Mavani](mailto:dmavani25@amherst.edu), [Brandon Ngacho](mailto:bngacho24@amherst.edu), [Ahmed Aly](mailto:aaly24@amherst.edu), [Ahsan Randhawa](mailto:mtahir24@amherst.edu), or [Professor Matteo Riondato](mailto:mriondato@amherst.edu)!
