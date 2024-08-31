# FormGen

**FormGen** is an AI-powered form generator designed for developers. It simplifies the process of generating forms by allowing users to choose their preferred technologies such as **shadcn**, **zod**, and **react hook form**, and generate forms in either **TSX** or **JSX**. Users can specify the type of inputs they need along with the required validations, and FormGen generates the form code for them.

![Next.js](https://img.shields.io/badge/Next.js-14.0-000000?logo=nextdotjs&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green)

## 📑 Table of Contents

- [FormGen](#formgen)
- [✨ Features](#-features)
- [🛠 Technologies Used](#-technologies-used)
- [🔧️ Prerequisites](#️-prerequisites)
- [⚙️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [🔐 Environment Variables](#-environment-variables)
- [🗃️ Database Setup](#️-database-setup)
- [📸 Screenshots](#-screenshots)
- [🌐 Live Demo](#-live-demo)
- [📄 License](#-license)

## ✨ Features

- **AI-Driven Form Generation**: Generate forms by simply specifying input types and validations.
- **Live Code Preview**: View the TSX/JSX code and a live preview of the form.
- **Form History**: Access all previously generated forms in your account.

## 🛠 Technologies Used

FormGen was built using the following technologies:

### 🧩 Framework

- **[Next.js](https://nextjs.org/)**: For the React-based framework optimized for production.

### 🎨 Frontend - Styling and UI

- **[TailwindCSS](https://tailwindcss.com/)**: For the styling of the user interface.
- **[shadcn/ui](https://shadcn.dev/)**: For custom UI components.
- **[Lucide](https://lucide.dev/)**: For iconography.
- **[Framer Motion](https://www.framer.com/motion/)**: For animations and transitions.
- **[DnD Kit](https://dndkit.com/)**: For drag-and-drop functionality within the form generator.

### 🔗 Backend - Database and APIs

- **[Supabase](https://supabase.com/)**: As the backend database solution.
- **[Prisma](https://www.prisma.io/)**: For database ORM and schema management.

### 🧠 State Management and Logic

- **[React Hook Form](https://react-hook-form.com/)**: For form validation and handling.
- **[Zod](https://zod.dev/)**: For schema validation and type safety.
- **[React-live](https://github.com/FormidableLabs/react-live)**: For in-browser code rendering and preview.

### 🔒 Authentication

- **[Auth.js](https://authjs.dev/)**: For managing authentication.

## 🔧️ Prerequisites

- Node.js >= 14.x
- npm or yarn

## ⚙️ Installation

To run FormGen locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/jeremnds/formgen.git
cd formgen
```

2. Install the required dependencies:

```bash
npm install
```

3. Set up your environment variables (use the `.env.example` file for reference):

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## 🚀 Usage

To start using FormGen:

1. **Admin Access**: Admins have no limitations on form generation. Ensure that the user's role is set to "admin" in Supabase to grant unlimited access.

2. **User Account**: Create an account to start generating forms. As a user, you can:
   - **Generate Forms**: Use the form generator to create custom forms based on your specifications. Note that there is a limit on the number of forms you can generate.
   - **View Forms**: Once generated, you can view the TSX/JSX code and see a live preview of your form.
   - **Manage Your Forms**: Access all your previously generated forms through your account dashboard.

### Example Commands

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 🔐 Environment Variables

The project uses environment variables to manage sensitive data like database URLs, Stripe keys, and authentication secrets. Ensure that you set these variables in your `.env` file:

```plaintext
# OpenAI API Key
OPENAI_API_KEY="your-openai-api-key"

# Authentication Secret
AUTH_SECRET="your-auth-secret"

# Database URLs
DATABASE_URL="your-database-url" #Transaction connection
DIRECT_URL="your-direct-url"  #Session connection

# Google Authentication
AUTH_GOOGLE_ID="your-google-auth-id"
AUTH_GOOGLE_SECRET="your-google-auth-secret"

# Maximum Generation
MAX_GENERATION="5"
```

Refer to the `.env.example` file for more information on required environment variables.

## 🗃️ Database Setup

FormGen uses **Supabase** as its backend database, managed through **Prisma**. To get started with the application, you'll need to migrate the Prisma schema to your Supabase instance. Here's how you can do it:

1. **Configure Your Environment Variables**: Ensure that your `.env` file contains the correct `DATABASE_URL` and `DIRECT_URL` for your Supabase instance.

2. **Run the Prisma Migrations**:

   - First, generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - Then, migrate the database schema to Supabase:
     ```bash
     npx prisma migrate deploy
     ```

3. **Verify the Database Setup**: After the migration, check your Supabase dashboard to ensure that the tables and models (such as `User` and `Form`) are correctly set up.

4. **Learn More**: For a detailed guide on integrating Prisma with Supabase, visit the [Supabase and Prisma Integration](https://supabase.com/partners/integrations/prisma) page.

Once the database schema is migrated, the application will be ready to use, with full functionality for both admin and user roles.

## 📸 Screenshots

Here are some screenshots of FormGen:

### 1. Home Page

![Home Page](https://i.imgur.com/0hj8ipR.png)

### 2. AI Form Generator

The interface where users can specify the types of inputs and validations to generate a form using AI.

![AI Form Generator](https://i.imgur.com/2bObRxp.png)

### 3. Generated Form Preview

A preview of the generated form, showing the code and live rendering.

![Generated Form](https://i.imgur.com/ypxo8q6.png)

### 4. Account Dashboard

The user account dashboard where all previously generated forms can be accessed.

![Account Dashboard](https://i.imgur.com/p6EdF7F.png)

## 🌐 Live Demo

Check out the live version of FormGen:  
[Click here](https://formgen-two.vercel.app/)

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
