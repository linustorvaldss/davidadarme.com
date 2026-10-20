import { Link } from "next-view-transitions";
import { getBlogPosts } from "~~/blog";
import { NewsletterForm } from "~~/app/blog/newsletter-form";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import IconSocial from "~~/components/iconSocial";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

// function UpRightArrowIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-5 w-5"
//     >
//       <path d="M7 7h10v10" />
//       <path d="M7 17 17 7" />
//     </svg>
//   );
// }

function WorkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

type ItemDetails = {
  name: string;
  link: string;
  position: string;
  date: string;
  description: string;
  toolkit: string;

};

function ExperienceSection({
  title,
  items,
}: {
  title: string;
  items: ItemDetails[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-medium">{title}</h3>
      <section className="grid grid-cols-1 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={index} className="mb-3">
            <a
              href={item.link}
              target="_blank"
              className="font-medium underline decoration-neutral-400 decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600"
            >
              {item.name}
            </a>

            <p>{item.position}</p>

            <p className="text-neutral-700 dark:text-neutral-300">
              {item.description}
            </p>

            <p className="flex text-xs text-neutral-700 dark:text-neutral-400">
              {item.date}
            </p>

            <p className="mt-3" style={{ color: "#6d6d6d" }}>
              {item.toolkit}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function HomePage() {

const StudyItems = [
    {
      name: "SENA ↗",
      link: "https://www.sena.edu.co/es-co/Paginas/default.aspx",
      position: "Software Analysis and Development Technician",
      date: "Jul. 2022 - Mar. 2025",
      description: "",
      toolkit: ""
    },

  ] satisfies ItemDetails[];

  const ExperienceItems = [
    {
      name: "Ie Group ↗",
      link: "https://www.iegrupo.co/",
      position: "Software Developer",
      date: "Apr. 2026 - Present",
      description: "",
      toolkit: ""
    },
    {
      name: "Digital Process ↗",
      link: "https://www.digitalprocess.co/",
      position: "Software Developer",
      date: "Apr. 2025 - Apr. 2026",
      description: "",
      toolkit: ""
    },
    {
      name: "ATEK GROUP ↗",
      link: "https://www.atek-group.com/",
      position: "Software Developer Intern",
      date: "Sept. 2024 - Mar. 2025",
      description: "",
      toolkit: ""
    },
  ] satisfies ItemDetails[];

  const projectItems = [
    // {
    //   name: "Ferresys Saas ↗",
    //   link: "https://www.github.com/davidadarme/ferresys",
    //   position: "DBA and Deployment",
    //   date: "Oct. 2023 - Apr. 2024 (Sena graduation project)",
    //   description: "API RESTful designed to register, manage and track products, purchases, sales and customers.",
    //   toolkit: ""
    // },
    // {
    //   name: "Serverless Auth (NoSQL/SQL) ↗",
    //   link: "https://gitlab.com/davidadarme/serverless-auth",
    //   position: "Backend, DevOps", 
    //   date: "In progress",
    //   description: "Serverless authentication with choice of SQL or NoSQL databases, with automated AWS and Terraform infrastructure.",
    //   toolkit: "AWS (Lambda, RDS/DynamoDB, API Gateway, Cognito), Python, MongoDB, PostgreSQL, Terraform, Act, Jenkins."
    // },
    {
      name: "Vaulty ↗",
      link: "",
      position: "",
      date: "In progress", 
      description:"Cloud-based secrets and environment variables SaaS management platform. It allows you to store, manage, and retrieve sensitive information securely while working locally.",
      toolkit: "Go, Redis, GraphQL, PostgreSQL, Hexagonal Architecture, Multi-tenant, REST API o gRPC "
    },
    {
      name: "all projects →",
      link: "https://github.com/linustorvaldss",
      position: "",
      date: "",
      description: "",
      toolkit: ""
    },
  ] satisfies ItemDetails[];

  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    )
    .slice(0, 4);

  return (
    <main className="text-left">
      <h1 className="mb-6 text-2xl font-medium tracking-tighter">
        David Adarme
      </h1>

      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
          <LocationIcon />
          <p>Colombia - Bucaramanga, Santander </p>
        </div>

        

        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
          <WorkIcon />
          <p className="inline-flex">Software Developer</p>
        </div>
      </div>

      {/* <h3 className="mb-6 mt-1 text-xl font-medium">Connect with me</h3> */}
      <IconSocial />
      {/* <ul className="font-sm flex flex-col space-x-0 space-y-3 text-neutral-600 md:flex-row md:space-x-6 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/linustorvaldss"
          >
            <p className="mr-2 h-7">Github</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://gitlab.com/davidadarme"
          >
            <p className="mr-2 h-7">Gitlab</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/davidadarme/"
          >
            <p className="mr-2 h-7">Linkedin</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:developer@davidadarme.com"
          >
            <p className="mr-2 h-7">email</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://drive.google.com/file/d/1ebdSF6p3sn-CePOUq4VQ3fJKsJR9ASKU/view"
          >
            <p className="mr-2 h-7">cv</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="http://davidadarme.guayahack.co/"
          >
            <p className="mr-2 h-7">guayahack.co</p>
            <UpRightArrowIcon />
          </a>
        </li>
      </ul> */}

      {/* ADD LATER */}
      {/* <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
      <div className="badge-base LI-profile-badge" data-locale="es_ES" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="davidadarme" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://co.linkedin.com/in/davidadarme?trk=profile-badge">David Adarme</a></div> */}
              
      <div className="mt-4 flex flex-col gap-6">
        <p className="prose prose-neutral prose-theme mb-10 max-w-3xl">
          Passionate about software engineering, backend development, system architecture, DevOps, SRE, Platform Engineering, and cloud infrastructure. Interested in building scalable, reliable, and maintainable systems through automation, modern architectural patterns, and engineering best practices. Currently expanding my knowledge of DevOps, Infrastructure as Code (IaC), cloud platforms such as AWS and Azure, distributed systems, microservices, caching strategies, messaging systems, and infrastructure automation.
        </p>
{/* 
        <div>
          <iframe
            src="https://open.spotify.com/embed/album/2H6i2CrWgXE1HookLu8Au0?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div> */}
      </div>

    <div className="grid grid-cols-1">
      <div className="flex flex-col">
        {/* <ExperienceSection title="Education" items={StudyItems} /> */}
        <ExperienceSection title="Experience" items={ExperienceItems} />
      </div>

      {/* <div>
        <ExperienceSection title="Projects" items={projectItems} />
      </div> */}
    </div>

      {/* <h3 className="mb-8 text-xl font-medium">Blog</h3>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="">
            <div className="flex w-full justify-between">
              <p className="font-medium underline decoration-neutral-400 decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600">
                {post.metadata.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(post.metadata.date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  // .toLowerCase()
                }
              </p>
            </div>
          </Link>
        ))} */}

        {/* <Link
          href="/blog"
          className="decoration-neutral-4000 mt-4 font-medium underline decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600"
        >
          All posts →
        </Link> */}
        <div className="space-y-6">
          <p className="text-lg font-medium">Subscribe to Newsletter</p>
          <NewsletterForm />
          <SpeedInsights />
          <Analytics />
          
        </div>
      {/* </div> */}
    </main>
  );
}
