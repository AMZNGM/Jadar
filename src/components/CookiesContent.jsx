const sections = [
  {
    title: "Cookie Policy",
    content: [
      "Last Updated: 0th April, 2025",
      "This Cookie Policy explains how JADAR ('we', 'us', or 'our') uses cookies and similar technologies to collect information when you visit JADAR.com. It also describes the options available to manage your cookie preferences in line with applicable data protection laws.",
      "If you have questions about this policy or how JADAR handles personal data in relation to cookies, you can contact our Data Protection Office at data.privacy@jadar.com.",
    ],
  },
  {
    title: "What Are Cookies?",
    content: [
      "Cookies are small files stored on your device when you visit a website. They usually contain an identifier, the domain name, and the duration they remain stored. Some cookies are deleted after closing your browser (session cookies), while others remain for longer periods (persistent cookies).",
    ],
  },
  {
    title: "Types of Cookies We Use",
    content: [
      "Strictly Necessary Cookies: Required for website navigation and access to secure features. These cannot be disabled, as they ensure core functionality.",
      "Performance Cookies: Collect information about how visitors interact with the website, including pages visited, time spent, and errors encountered. This helps us improve website performance and user experience.",
      "Functional Cookies: Remember your preferences, such as language or region, to provide a more personalized experience.",
      "Targeting Cookies: Track browsing behavior to deliver content and advertising tailored to your interests and interactions.",
    ],
  },
  {
    title: "Third-Party Cookies",
    content: [
      "Currently, JADAR does not use cookies set by third-party domains. However, other organizations, such as advertising networks, may place cookies to track activity across multiple websites. We do not control these cookies.",
      "You can opt out of interest-based advertising from certain networks. More information can be found at:",
      "Digital Advertising Alliance (DAA)",
      "Network Advertising Initiative (NAI)",
    ],
  },
  {
    title: "How We Use Cookies",
    content: [
      "Cookies are used to:",
      "• Ensure essential website functions work properly",
      "• Improve site performance and user experience",
      "• Personalize content and advertisements according to your interests",
      "• Analyze visitor behavior and traffic",
      "• Provide social media integration features",
    ],
  },

  {
    title: "Your Rights Regarding Cookies",
    content: [
      "Under data protection laws, including the Kuwait’s PDPL and the EU GDPR, you have the right to:",
      "• Access cookie-collected data",
      "• Withdraw consent to optional cookies at any time",
      "• Request correction or deletion of cookie-related information",
      "• Object to or restrict processing",
    ],
  },
  {
    title: "Managing Your Cookie Preferences",
    content: [
      "You can manage cookie preferences through the website consent banner or via your browser settings.",
      "JADAR uses OneTrust to provide users with control over cookie usage. Through OneTrust:",
      "• You can accept or reject non-essential cookies by category",
      "• Preferences are securely stored for compliance purposes",
      "• Preferences can be updated anytime via the 'Cookie Settings' link in the website footer",
      "You can also manage cookies directly in your browser (Chrome, Firefox, Edge, Safari). Please note that disabling necessary cookies may affect website functionality.",
    ],
  },
  {
    title: "Changes to This Cookie Policy",
    content: [
      "We may update this policy to reflect changes in laws, cookie usage, or operational needs. Updates will be reflected in the 'Last Updated' date, and you are encouraged to review this page regularly.",
    ],
  },
];

const CookiePolicy = () => {
  return (
    <section
      dir="ltr"
      className="relative w-screen min-h-screen overflow-hidden bg-text/90 text-bg py-24 px-4 flex flex-col justify-center items-center">
      <div className="max-w-4xl bg-text p-24 max-md:px-4 max-md:py-12 shadow-xl font-light">
        {sections.map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className={`text-2xl mb-6 ${i === 0 ? "text-4xl uppercase" : ""}`}>{section.title}</h2>
            {section.content.map((para, j) => (
              <p key={j} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CookiePolicy;
