# Club Management System - Frontend

This project is the frontend for a member management system designed for student clubs and similar organizations. It provides a modern, user-friendly interface for managing member records. The application is built with Angular and utilizes the PrimeNG component library for a rich user experience.

## ✨ Key Features

- **Member Dashboard:** View all members in a paginated, sortable, and filterable table.
  - **Dynamic Filtering:** Easily filter members by name, school ID, role, or membership status.
  - **Sorting:** Sort the member list by various columns.
- **Member Management:**
  - Add new members through a detailed form.
  - Edit existing member details and their roles/positions within the club.
  - Remove members from the system.
- **CSV Import:** Bulk import new members into the system from a `.csv` file.
- **Authentication:** A secure, token-based login system for authorized users.
- **Modern & Responsive UI:** Built with PrimeNG and PrimeFlex for a clean, responsive design that works across different devices.

## 🗺️ Roadmap / Planned Features

This project is actively under development. Here are the features planned for upcoming releases:

- **Role-Based Access Control:** An exclusive "Admin Dashboard" for users with the `EXECUTIVE` role to perform privileged actions.
- **Member Detail Page:** A dedicated, read-only page to view all details of a single member.
- **Advanced Reporting & Analytics:** Functionality to visualize data and export member reports.

## 🛠️ Tech Stack

- **Angular:** A powerful framework for building modern web applications.
- **TypeScript:** A typed superset of JavaScript that enhances code quality.
- **PrimeNG:** A comprehensive suite of UI components for Angular.
- **PrimeFlex:** A responsive CSS utility library.
- **PrimeIcons:** The icon set used throughout the project.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version is recommended)
- [Angular CLI](https://angular.dev/tools/cli)

### Installation and Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/club-management-ui.git
    cd club-management-ui
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Backend Service Requirement:**
    This is a frontend application and requires the corresponding backend service to be running. You can find the backend repository and setup instructions here:
    **[enesoglu/club-management-api](https://github.com/enesoglu/club-management-api)**

4.  **Run the Development Server:**
    Once the backend is running, execute the following command to start the frontend application:

    ```bash
    ng serve
    ```

    Navigate to `http://localhost:4200/` in your browser.

> **Note:** This is a frontend application and requires a corresponding backend service to be running. Ensure the backend is operational and accessible at `http://localhost:8080/api/`. You can configure the API endpoint in the service files located under `src/app/core/services/`.
