# Bus-Ticket-Booking-System
A full-stack MERN (MongoDB, Express.js, React, Node.js) project for booking bus tickets online, with features like seat selection, online payments, and QR-based check-in.

✨ Features

🌐 User Registration & Authentication (JWT)

🚍 Bus Listings & Search (Filter by route, date, price, etc.)

🔄 Interactive Seat Selection

💳 Payment Integration (Stripe)

📅 Booking Confirmation & Ticket Generation

⬇️ QR Code Check-in System (Scan ticket for verification)

📈 Admin Dashboard (Manage buses, routes, and bookings)

⚙️ Tech Stack

Frontend (React)

Next.js (React Framework)

Tailwind CSS (Styling)

React-Query (Data Fetching)

React QR Code Generator (for ticketing)

Backend (Node.js & Express)

Express.js (API development)

MongoDB & Mongoose (Database)

JWT Authentication

Stripe API (for payments)

Deployment

Frontend: Vercel

Backend: Railway/Render

Database: MongoDB Atlas

🛠️ Installation & Setup

1. Clone the Repository

git clone https://github.com/Kalebb12/Bus-Ticket-Booking-System.git
cd Bus-Ticket-Booking-System

2. Install Dependencies

Frontend:

cd client
npm install
npm run dev

Backend:

cd server
npm install
npm start

3. Environment Variables

Create a .env file in the server directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key

🔧 API Endpoints

Endpoint

Method

Description

/api/auth/register

POST

User registration

/api/auth/login

POST

User login

/api/buses

GET

Get available buses

/api/bookings

POST

Create a new booking

/api/bookings/:id/check-in

POST

Check-in with QR Code

🌟 Future Enhancements

⭐ Live bus tracking (Google Maps API)

⭐ Referral program & discounts

⭐ Multilingual support

🎨 UI Screenshots

(To be added once development progresses)

🏆 Contributing

Fork the repo

Create a new branch (feature-x)

Commit your changes

Push & open a pull request

💌 Contact

For questions, reach out at your-email@example.com or open an issue.

🛠️ Happy coding! Let’s build an awesome ride-booking system. 🚀
