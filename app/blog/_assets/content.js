import Image from "next/image";
import georgeImg from "@/app/blog/_assets/images/authors/george.png";
import introducingSupabaseImg from "@/public/blog/introducere-magspy/header.png";
import createAccountImg from "@/public/blog/introducere-magspy/create-account.png";
import addProductImg from "@/public/blog/introducere-magspy/adaugare-produs.png";
import alertsEditExampleImg from "@/public/blog/introducere-magspy/alerts-edit-example.png";
import graphExampleImg from "@/public/blog/introducere-magspy/graph-example.png";

// ==================================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================================

// These slugs are used to generate pages in the /blog/category/[categoryI].js. It's a way to group articles by category.
const categorySlugs = {
  feature: "feature",
  tutorial: "tutorial",
};

// All the blog categories data display in the /blog/category/[categoryI].js pages.
export const categories = [
  {
    // The slug to use in the URL, from the categorySlugs object above.
    slug: categorySlugs.feature,
    // The title to display the category title (h1), the category badge, the category filter, and more. Less than 60 characters.
    title: "New Features",
    // A short version of the title above, display in small components like badges. 1 or 2 words
    titleShort: "Features",
    // The description of the category to display in the category page. Up to 160 characters.
    description:
      "Aici gasesti ultimele functionalitati adaugate in aplicatia MagSpy.",
    // A short version of the description above, only displayed in the <Header /> on mobile. Up to 60 characters.
    descriptionShort: "Ultimele imbunatatiri adaugate aplicatiei MagSpy.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "How Tos & Tutorials",
    titleShort: "Tutorials",
    description:
      "Learn how to use ShipFast with these step-by-step tutorials. I'll show you how to ship faster and save time.",
    descriptionShort:
      "Learn how to use ShipFast with these step-by-step tutorials.",
  },
];

// ==================================================================================================================================================================
// BLOG AUTHORS 📝
// ==================================================================================================================================================================

// Social icons used in the author's bio.
const socialIcons = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
      </svg>

    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  github: {
    name: "GitHub",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  instagram: {
    name: "Instagram",
    svg: (
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
      </svg>

    ),
  }
};

// These slugs are used to generate pages in the /blog/author/[authorId].js. It's a way to show all articles from an author.
const authorSlugs = {
  ceo: "owner",
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.ceo,
    // The name to display in the author's bio. Up to 60 characters.
    name: "George Popa",
    // The job to display in the author's bio. Up to 60 characters.
    job: "Dezvoltator MagSpy",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "George este dezvoltatorul principal al aplicatiei MagSpy. El se ocupa de imbunatatirea aplicatiei si de adaugarea de noi functionalitati.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: georgeImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://x.com/GeorgePopa02",
      },
      {
        name: socialIcons.instagram.name,
        icon: socialIcons.instagram.svg,
        url: "https://x.com/GeorgePopa02",
      }
    ],
  },
];

// ==================================================================================================================================================================
// BLOG ARTICLES 📚
// ==================================================================================================================================================================

// These styles are used in the content of the articles. When you update them, all articles will be updated.
const styles = {
  h2: "text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-base-content",
  h3: "text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content",
  p: "text-base-content/90 leading-relaxed",
  ul: "list-inside list-disc text-base-content/90 leading-relaxed",
  li: "list-item",
  // Altnernatively, you can use the library react-syntax-highlighter to display code snippets.
  code: "text-sm font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all",
  codeInline:
    "text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all",
};

// All the blog articles data display in the /blog/[articleId].js pages.
export const articles = [
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "ce-este-magspy",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "Ce este MagSpy?",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "MagSpy este o aplicatie care te ajuta sa monitorizezi preturile produselor tale favorite.",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.tutorial),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.ceo),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2024-09-26",
    image: {
      // The image to display in <CardArticle /> components.
      src: introducingSupabaseImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD.
      urlRelative: "/blog/introducere-magspy/header.jpg",
      alt: "Supabase and ShipFast logo combined",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={introducingSupabaseImg}
          alt="Supabase and ShipFast logo combined"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Introducere</h2>
          <p className={styles.p}>
            MagSpy este o aplicatie care te ajuta sa monitorizezi preturile
            produselor tale favorite. In acest tutorial, vei invata cum sa
            utilizezi aplicatia si cum sa monitorizezi preturile produselor
            tale favorite.
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>1. Creaza un cont MagSpy</h3>
          <p className={styles.p}>
            Pentru inceput du-te la{" "}
            <a href="https://magspy.app" className="link link-primary">
              MagSpy
            </a>{" "}
            si creaza-ti un cont. Poti sa te conectezi cu Google sau doar utilizand mail-ul tau.
            <br />
            Este gratuit si nu necesita card de credit.
            <br />
            <Image
              src={createAccountImg}
              alt="Image Showing how to create an account on MagSpy"
              width={700}
              height={500}
              priority={true}
              className="rounded-box my-5"
              placeholder="blur"
            />
            Dupa ce te-ai inregistrat, vei fi redirectionat catre tabloul de bord al aplicatiei.
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>2. Cauta produsul dorit</h3>
          <p className={styles.p}>
            Începeți prin a vizita platforma preferată de cumpărături online. Răsfoiți printre produse până când găsiți un articol pe care sunteți interesat să îl urmăriți, cum ar fi un obiect gadget, un articol de îmbrăcăminte sau un produs de uz casnic.
            <br />
            Asigurați-vă că alegeți un magazin de renume pentru cele mai bune rezultate.
            <br />
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>3. Adauga produsul in MagSpy</h3>
          <p className={styles.p}>
            Dupa ce ai gasit produsul dorit, copiaza link-ul produsului si adauga-l in aplicatia MagSpy.
            <br />
            <br />
            Poti sa urmezi urmatorii pasi:
          </p>

          <ul className={styles.ul}>
            <li className={styles.li}> Copiaza linkul produsului din bara de navigatie</li>
            <li className={styles.li}> Lipeste linkul in casuta alaturata si apasa butonul "Adauga Un Produs". MagSpy va adauga automat produsul si va incepe monitorizarea. </li>
            <Image
              src={addProductImg}
              alt="Image Showing how to add a product on MagSpy"
              width={700}
              height={500}
              priority={true}
              className="rounded-box my-5 border"
              placeholder="blur"
            />

            <li className={styles.li}> MagSpy va genera automat o alerta conditionata. Este recomandat sa creezi alerte conditionate astfel sa fii notificat atunci cand consideri ca este cel mai important. </li>
            <Image
              src={alertsEditExampleImg}
              alt="Image Showing how to add a product on MagSpy"
              width={700}
              height={500}
              priority={true}
              className="rounded-box my-5 border"
              placeholder="blur"
            />
          </ul>
          <p className={styles.p}>
            Dupa ce ai adaugat produsul in aplicatie, MagSpy va monitoriza pretul produsului si te va notifica conform alertelor conditionate create.

          </p>
        </section>

        <section>
          <h3 className={styles.h3}>4. Monitorizeaza pretul produsului</h3>
          <p className={styles.p}>
            Felicitari! <br />
            Ai adaugat primul tau produs in aplicatie. Acum poti sa te bucuri de timpul tau petrecut eficient si sa lasi MagSpy sa monitorizeze pretul produsului pentru tine.
            <br />
            Cu ajtorul graficelor vei fi la curent cu pretul produsului si vei avea o imagine de ansamblu asupra evolutiei acestuia in timp.
          </p>
          <Image
            src={graphExampleImg}
            alt="Image Showing a graph example on MagSpy"
            width={700}
            height={500}
            priority={true}
            className="rounded-box my-5"
            placeholder="blur"
          />
        </section>

        <section>
          <h3 className={styles.h3}>Concluzie</h3>
          <p className={styles.p}>
            Ai invatat cum sa utilizezi aplicatia MagSpy si cum sa monitorizezi preturile produselor tale favorite. <br />

          </p>
        </section>
      </>
    ),
  },
];
