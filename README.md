# ByteURL (Front-End)

An open-source URL shortener application built using Next.js 13, NextAuth, TypeScript, Tailwind CSS, Shadcn, React Query, as well as Recharts specifically for the graphical interface of the analytics page and MapBox to track users locations on the map.

> **Warning**
> This app is a work in progress. It hasn't been deployed yet as I'm currently addressing bugs, developing the mobile responsiveness, adding new features and creating content.
> See the roadmap below.

**[The back-end of the application](https://github.com/elidotexe/byteurl_backend)**

## About this project

This project is an experimental app I built using Next.js 13 for the frontend and Golang for the backend.

It is a free application that allows users to register an account, create shortened links and track the performance of each link. This includes monitoring click count, device type, browser type, IP addresses and the location of the audience that clicked on the links generated by the application.

### Links

<img width="1511" alt="image" src="https://github.com/elidotexe/byteurl_frontend/blob/master/assets/img/links_1.png">

<img width="1511" alt="image" src="https://github.com/elidotexe/byteurl_frontend/blob/master/assets/img/links_2.png">

The Links user interface enables you to perform CRUD operations and track the click count for each generated link.

### Analytics

<img width="1511" alt="image" src="https://github.com/elidotexe/byteurl_frontend/blob/master/assets/img/analytics_1.png">

<img width="1511" alt="image" src="https://github.com/elidotexe/byteurl_frontend/blob/master/assets/img/analytics_2.png">

The analytics page allows you to learn about the people who clicked on your link by displaying the monthly performance of your click count, device type, and browser type.

### Geolocation

<img width="1511" alt="image" src="https://github.com/elidotexe/byteurl_frontend/blob/master/assets/img/geolocation_1.png">

The geolocation page allows you to get insights into where your audience is located on the map.

## Roadmap

- [x] ~Build Analytics and Geolocation pages~
- [x] Mobile responsiveness
- [x] Add content for the landing page
- [x] Add date picker for Analytics and Geolocation pages
- [x] Write documentation
- [x] Password Protection
- [x] QR Code Generation
- [x] Builk Shortener
- [x] Authorization with social media accounts

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm run dev
```
