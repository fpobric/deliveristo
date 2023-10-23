This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Clone the project
- Run Bash or some other terminal in the newly created folder
- Run command yarn install or npm i

After running commands above, run the server:

```bash
npm run start
# or
yarn start
```

To run tests

```bash
npm run cypress:open
# or
yarn cypress:open
```

For test automation Cypress has been integrated into project. Test cases and complexity are reduced cause of the lack of time

## -------------Important---------------

### To run e2e test you have to run the app with

```bash
npm start or yarn start
# then in antoher terminal/console
npm run cypress:open or yarn cypress:open
```

## Libraries and versions

- At the moment of project creation all the latest libraries has been used.
- Next.js with app router
- Styling has been combined with Flexgrid and Bootstrap and custom style
- React select
- Used context and benefits of using useReducer hook for managing the state

Project has been clean and no unused libraries are getting installed.

### Libraries and versions and code

Please bear in mind that I am very limited with my free time at the moment. Maybe some parts of the project could have been written in better way. Keeping in mind that if you find some sections could have been written more cleanly or with better approach, please mark them and we could discuss them and I can give you other approach to the problem.

## Hoping you will find this code good enough to book a call with me to discuss my background and knowledge.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
