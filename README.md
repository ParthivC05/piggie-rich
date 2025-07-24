Piggie Rich/
├── public/                  # Static assets (images, icons, etc.)
│   ├── buffalo.webp
│   ├── cash-eruption.jpg
│   ├── casino-bg.png
│   ├── favIcon.jpg
│   ├── ... (other images)
│   ├── react.svg
│   ├── vite.svg
│   └── ... 
├── src/                     # Main source code
│   ├── admin/               # Admin dashboard components & pages
│   │   ├── components/
│   │   └── pages/
│   ├── cashier/             # Cashier dashboard components & pages
│   ├── components/          # Reusable UI components (Navbar, Footer, etc.)
│   ├── assets/              # Frontend-specific images, SVGs, etc.
│   ├── pages/               # Main app pages (Login, Register, Home, etc.)
│   ├── App.css              # App-wide CSS
│   ├── App.jsx              # Root React component
│   ├── index.css            # Global styles
│   ├── main.jsx             # React entry point
│   └── ... (other files)
├── index.html               # Main HTML file
├── package.json             # Frontend dependencies and scripts
├── package-lock.json
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── README.md                # Project documentation
└── ... (other config files)


backend/
├── controllers/             # Business logic for each route
│   ├── adminController.js
│   ├── authController.js
│   ├── depositController.js
│   └── userController.js
├── middleware/              # Authentication & authorization middleware
│   ├── adminAuth.js
│   └── auth.js
├── models/                  # Mongoose models (MongoDB schemas)
│   ├── CMS.js
│   ├── Deposit.js
│   ├── Transaction.js
│   └── User.js
├── routes/                  # API endpoint definitions
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── CashierRoutes.js
│   ├── depositRoutes.js
│   ├── PublicRoutes.js
│   └── userRoutes.js
├── server.js                # Express app and server entry point
├── package.json             # Backend dependencies and scripts
├── package-lock.json
├── vercel.json              # Vercel deployment config