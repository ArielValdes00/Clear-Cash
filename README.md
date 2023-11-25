# Clear-Cash

This is a user-authenticated expense management application. Users can create expense reports, which are displayed in a table and further detailed in a donut chart. Expenses can be categorized into various types such as food, travel, education, etc. The application also supports both dark and light modes for user preference.
## Installation and Usage

### Frontend
1. Clone the repository and navigate to the frontend directory:
    ```bash
    git clone https://github.com/ArielValdes00/Clear-Cash.git
    cd client
    ```
2. Install the dependencies and start the development server:
    ```bash
    npm install
    npm run dev
    ```

### Backend
1. Navigate to the backend directory:
    ```bash
    cd server
    ```
2. Install the dependencies and start the development server:
    ```bash
    composer install
    php artisan serve
    ```

### Environment Variables
You need to create a `.env` file in both the frontend and backend directories and fill in the following variables:

## Frontend
```bash
NEXT_PUBLIC_SERVER_URL=your_value
```
## Backend
```bash
APP_NAME=your_value
APP_ENV=your_value
APP_KEY=your_value
APP_URL=your_value
FRONTEND_URL=your_value
DB_CONNECTION=your_value
DB_HOST=your_value
DB_PORT=your_value
DB_DATABASE=your_value
DB_USERNAME=your_value
DB_PASSWORD=your_value
MAIL_MAILER=your_value
MAIL_HOST=your_value
MAIL_PORT=your_value
MAIL_USERNAME=your_value
MAIL_PASSWORD=your_value
MAIL_ENCRYPTION=your_value
MAIL_FROM_ADDRESS=your_value
MAIL_FROM_NAME=your_value
```
### Project Link
[![portfolio](https://img.shields.io/badge/ClearCash-000?style=for-the-badge)](https://clear-cash.vercel.app/)


