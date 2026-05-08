# SheetFlow 🌊

**The most reliable, open-source way to push validated JSON data to Google Sheets via webhooks.**

SheetFlow is a transparent, secure, and community-driven automation tool designed to bridge the gap between your applications and spreadsheets. Unlike black-box automation platforms, SheetFlow ensures every piece of data is validated against your schema before it ever touches your sheet.

[![GitHub Star](https://img.shields.io/github/stars/bureaucrat-svg/sheetflow?style=social)](https://github.com/bureaucrat-svg/sheetflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🛡️ Strict Schema Validation**: Define your data structure (string, number, boolean) and enforce it. No more messy spreadsheets.
- **🚀 Real-time Webhooks**: Instant data transfer from any application that supports webhooks.
- **🔓 100% Open Source**: Full transparency and community-driven improvements.
- **🛠️ Self-Hostable**: Own your data pipeline entirely by hosting it on your own infrastructure.
- **📊 Google Sheets Integration**: Seamlessly syncs with Google Sheets via App Script.

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
