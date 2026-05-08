# SheetFlow 🌊

**The easiest way to automatically send information from your apps to Google Sheets.**

SheetFlow is a simple, open-source tool that helps you move data from your favorite apps directly into your spreadsheets. No more manual data entry, no more messy sheets—just clean, automated updates whenever you need them.

[![GitHub Star](https://img.shields.io/github/stars/bureaucrat-svg/sheetflow?style=social)](https://github.com/bureaucrat-svg/sheetflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🛡️ Clean & Accurate**: Choose exactly which information you want to save, and we'll make sure it's correct every time.
- **🚀 Instant Updates**: Information moves from your apps to your sheets the moment it happens.
- **🔓 100% Open Source**: Completely free to use, inspect, and improve.
- **🛠️ You Own Your Data**: Host it yourself and keep your information private.
- **📊 Works with Google Sheets**: Seamlessly connects to your existing spreadsheets.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/bureaucrat-svg/sheetflow.git
cd sheetflow
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
DATABASE_URL="your-postgresql-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 4. Setup Database
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🤝 Contributing

We welcome contributions! Whether it's a bug report, feature request, or a pull request, we appreciate your help in making SheetFlow better.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the community. [Star us on GitHub!](https://github.com/bureaucrat-svg/sheetflow)
