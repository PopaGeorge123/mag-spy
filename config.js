import themes from "daisyui/src/theming/themes";


const config = {
  // REQUIRED
  appName: "MagSpy",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "I know your pain of checking your favorite products every day. MagSpy will help you to track the price of your favorite products and send you an email when the price drops.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "magspy.app",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Începător",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Testați această aplicație gratuit",
        // The price you want to display, the one user will be charged on Stripe.
        price: 0,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        features: [
          { name: "Monitorizati 1 produs",},
          { name: "Notificari pe Email" },
          // { name: "1 customised alert" },
        ],
      },
      {
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1PqtBlLcXwqt5lPFnKcVXvxO"
            : "price_1PwlGMLcXwqt5lPFCBrlvQTA",
        name: "Business",
        description: "Ai nevoie de mai multă putere",
        price: 12,
        priceAnchor: 17,
        features: [
          {name: "Produse nelimitate",},
          { name: "Alerte personalizate nelimitate" },
          { name: "Notificari pe Email" },
        ],
      },
      // {
      //   // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
      //   priceId:
      //     process.env.NODE_ENV === "development"
      //       ? "price_1PqtBlLcXwqt5lPFnKcVXvxO"
      //       : "price_456",
      //   //  REQUIRED - Name of the plan, displayed on the pricing page
      //   name: "Bussiness",
      //   // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
      //   description: "Perfect for small projects",
      //   // The price you want to display, the one user will be charged on Stripe.
      //   price: 12,
      //   // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
      //   priceAnchor: 6,
      //   features: [
      //     {
      //       name: "NextJS boilerplate",
      //     },
      //     { name: "User oauth" },
      //     { name: "Database" },
      //     { name: "Emails" },
      //   ],
      // },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mail",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `MagSpy <noreply@mail.magspy.app>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `George from MagSpy <admin@mail.magspy.app>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "MagSpy | Support support@mail.magspy.app",

    fromAlertBot: `MagSpy | Alert <noreply@mail.magspy.app>`,
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "popageo02@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "dark",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
    //main : "#a991f7",
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard/products",
  },
  scrapig: {
    managerServer: process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://scrape-servers.onrender.com",
  },
};

export default config;
