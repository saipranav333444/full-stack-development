# Full-Stack Development

Archive of the web development projects I built while learning full-stack development
(2023 – 2025): React front ends, Node.js/Express APIs and two end-to-end apps. They used to live in
40+ separate repositories; they are consolidated here with their commit history intact.

> [!NOTE]
> This repository is archived and kept for reference only. These projects are not maintained.
> My current work lives in [**ai-engineering**](https://github.com/saipranav333444/ai-engineering).

## Contents

- [Full-stack apps](#full-stack-apps): 2 apps
- [Frontend](#frontend): 33 apps
- [Backend](#backend): 6 REST APIs
- [Running a project](#running-a-project)
- [About this archive](#about-this-archive)

```text
fullstack/   end-to-end apps (UI + API + database)
frontend/    React single-page apps, plus one vanilla JavaScript app
backend/     Node.js + Express REST APIs backed by SQLite
```

Every project is self-contained, with its own `package.json`, lockfile and README.

## Full-stack apps

| Project | What it does | Stack | Demo |
| --- | --- | --- | --- |
| [Clothing E-commerce](fullstack/clothing-ecommerce) | Online clothing store with register/login (JWT + bcrypt), a product catalog and a persistent cart | React 19 · Express · MongoDB · React Router · Axios | [Live](https://clothing-ecommerce-flax.vercel.app) (frontend only, API offline) |
| [Smart Attendance System](fullstack/smart-attendance-system) | Marks classroom attendance from uploaded photos using face recognition and exports Excel reports | Python · Flask · OpenCV · face_recognition · MySQL | — |

## Frontend

| Project | What it does | Stack | Demo |
| --- | --- | --- | --- |
| [Jobby App](frontend/jobby-app) | Job-search app with JWT login, protected routes, filters, search and job details | React 19 · React Router · js-cookie | [Live](https://jobby-app-six-ruddy.vercel.app) |
| [COVID-19 Dashboard](frontend/covid19-dashboard) | India COVID-19 dashboard with national and state-wise stats, charts and responsive routing | React 17 · React Router · Recharts · js-cookie | [Live](https://covidDash19.ccbp.tech) |
| [IPL Dashboard](frontend/ipl-dashboard) | IPL teams and their match history fetched from an API | React 17 · React Router | [Live](https://iplboardpjt.ccbp.tech) |
| [CoWIN Dashboard](frontend/cowin-dashboard) | Vaccination statistics visualised with bar and pie charts | React 17 · styled-components · Recharts | — |
| [Prime Video](frontend/prime-video) | Movie carousels with a video pop-up player | React 17 · styled-components · React Slick · reactjs-popup · React Player | [Live](https://primevideopjt.ccbp.tech) |
| [Product Listing Page](frontend/product-listing-page) | Multi-page site with sign-up / sign-in gating | React 18 · React Router | [Live](https://product-listing-page-virid.vercel.app/signin) |
| [ACCA Landing Page](frontend/acca-landing-page) | Marketing landing page for an ACCA course with a call-back request form | React 18 · React Bootstrap | — |
| [Blogs List](frontend/blogs-list-profile) | Fetches blogs from an API and routes to blog detail pages | React 17 · React Router | [Live](https://blogsListprofi.ccbp.tech) |
| [Blog List](frontend/blog-list) | Blog list with user profile on the home route | React 17 · React Router | — |
| [Routing Practice](frontend/routing-practice) | Home, About, Contact and Not Found routes | React 17 · React Router | — |
| [Layout Builder](frontend/layout-builder) | Toggle page layout sections using React Context | React 17 | [Live](https://LayoutBuilderpj.ccbp.tech) |
| [Password Manager](frontend/password-manager) | Save, search, mask and delete passwords | React 17 | — |
| [Appointments App](frontend/appointments-app) | Add appointments, star them and filter starred ones | React 17 · date-fns | — |
| [Comments App](frontend/comments-app) | Add, like and delete comments with relative timestamps | React 17 · date-fns | — |
| [My Tasks](frontend/my-tasks) | Task list with tags and tag filtering | React 17 · styled-components | [Live](https://mytaskspjt.ccbp.tech) |
| [Notes App](frontend/notes-app) | Add notes with an empty state | React 17 · React Router · styled-components | [Live](https://NotesAppPjt.ccbp.tech) |
| [Registration Form](frontend/registration-form) | Form with on-blur validation and a success view | React 17 | [Live](https://RegistFormpjt.ccbp.tech) |
| [Music Playlist](frontend/music-playlist) | Searchable playlist with delete and empty states | React 17 · styled-components | [Live](https://MusicPlaylistPJ.ccbp.tech) |
| [Emoji Game](frontend/emoji-game) | Memory game that tracks score and top score | React 17 | — |
| [Digital Timer](frontend/digital-timer) | Start / pause / reset countdown with adjustable limit | React 17 | — |
| [Stopwatch](frontend/stopwatch) | Start / stop / reset stopwatch | React 17 | — |
| [Planets App](frontend/planets-app) | Planet carousel | React 17 · styled-components · React Slick | — |
| [Gallery App](frontend/gallery-app) | Image gallery with clickable thumbnails | React 17 | — |
| [Capitals App](frontend/capitals-app) | Pick a capital to see its country | React 17 | — |
| [Coin Toss Game](frontend/coin-toss-game) | Toss a coin and track heads / tails counts | React 17 | — |
| [Credit Card](frontend/credit-card) | Live card preview that mirrors form inputs | React 17 · React Router · styled-components | [Live](https://CreditCardPjt.ccbp.tech) |
| [Editable Text Input](frontend/editable-text-input) | Toggle between saving and editing text | React 17 · styled-components | [Live](https://EditableInputpj.ccbp.tech) |
| [Multilingual Greetings](frontend/multilingual-greetings) | Language tabs that switch greetings | React 17 · styled-components | [Live](https://Multilingualpj.ccbp.tech) |
| [Password Validator](frontend/password-validator) | Validates password length as you type | React 17 · React Router · styled-components | [Live](https://PasswordValidPj.ccbp.tech) |
| [Read More / Less](frontend/read-more-less) | Expand and collapse long text | React 17 · React Router · styled-components | [Live](https://ReadMoreLessPjt.ccbp.tech) |
| [Unlock / Lock](frontend/unlock-lock-app) | Lock state toggle | React 17 · React Router · styled-components | [Live](https://UnlockAppPjt.ccbp.tech) |
| [Alert Notifications](frontend/alert-notifications) | Reusable notification component via children | React 17 | [Live](https://AlertNotifipjt.ccbp.tech) |
| [Quiz App](frontend/quiz-app) | Multiple-choice quiz with scoring (front-end assignment) | HTML · CSS · JavaScript | — |

## Backend

| Project | What it does | Stack | Demo |
| --- | --- | --- | --- |
| [Twitter Clone API](backend/twitter-clone-api) | Auth, follows, feed, tweets, likes and replies | Node.js · Express · SQLite · bcrypt · JWT | — |
| [COVID-19 India Portal API](backend/covid19-india-portal-api) | State and district statistics behind JWT authentication | Node.js · Express · SQLite · bcrypt · JWT | — |
| [COVID-19 India API](backend/covid19-india-api) | CRUD for states and districts with aggregated statistics | Node.js · Express · SQLite | — |
| [Todo API](backend/todo-api) | Todos filtered by status, priority, category and due date, with validation | Node.js · Express · SQLite · date-fns · bcrypt | — |
| [Authentication API](backend/authentication-api) | Register, login and change password with hashed passwords | Node.js · Express · SQLite · bcrypt | — |
| [Movies API](backend/movies-api) | CRUD for movies and directors | Node.js · Express · SQLite | — |

## Running a project

Each project runs on its own:

```bash
cd frontend/jobby-app
npm install
npm start          # http://localhost:3000
```

- **React 17 projects** use `react-scripts` 4, which needs **Node 16**. On newer Node versions,
  start them with `NODE_OPTIONS=--openssl-legacy-provider npm start`.
- **Backend APIs** start with `node app.js` on <http://localhost:3000>. Each one ships with its SQLite
  database file, and most include an `app.http` file of sample requests.
- **Clothing E-commerce** needs a MongoDB connection string. Copy `backend/.env.example` to
  `backend/.env` and fill it in.
- **Smart Attendance System**: see [its README](fullstack/smart-attendance-system/README.md).

## About this archive

- **History preserved.** Each project was imported from its original repository with every commit
  intact; run `git log -- <project-folder>` to see it.
- **Cleaned during migration.** Committed `node_modules`, `.env` files and credentials were removed
  from the history, along with personal data (student photos, face encodings and attendance sheets)
  from the attendance system.
- **Credits.** Most React and Node.js projects were built from NxtWave CCBP course specifications and
  starter templates. Their design assets and specifications belong to their respective owners.

## License

My own code is available under the [MIT License](LICENSE).
