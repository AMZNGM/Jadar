import Link from 'next/link'

const sections = [
  {
    title: 'Website Privacy Notice',
    content: [
      <>
        At JADAR, we believe it’s essential that you fully understand the type of information we gather, along with how it is utilized and
        shared. That’s why we encourage you to carefully read this Privacy Notice, which is designed to help you use JADAR’s services and
        products in a way that feels comfortable for you. <br /> <br /> This Privacy Notice outlines in detail how we gather, handle, share,
        store, and safeguard your information. It also explains your rights and the choices available to you. Each section is written in
        clear, direct language with practical examples so our practices are easy to follow. We’ve broken it down into sections for clarity
        and will continue enhancing it with references and useful resources. <br /> <br /> We are committed to protecting the personal
        details of every individual who visits the{' '}
        <Link href={'/'} className="text-main">
          JADAR
        </Link>{' '}
        website.
      </>,
    ],
  },
  {
    title: 'Who We Are',
    content: [
      <>
        We are JADAR, and this is the official{' '}
        <Link href={'/'} className="text-main">
          JADAR
        </Link>{' '}
        portal.
      </>,
      'JADAR is an entity established in the Kingdom of Saudi Arabia, registered under commercial registration number 1234567890, with its head office located at:',
      <address className="not-italic">
        JADAR Community, Building 5678 <br />
        Unit 2, 9876, City <br />
        City, 123456 <br />
        Kuwait
      </address>,
      'As an organization based in Kuwait, we adhere to the regulations of the Kingdom as well as applicable international standards and laws.',
      <>
        If you have inquiries or concerns about how we manage your personal data, please contact our Personal Data Protection Office:
        <br />
        <span className="font-semibold">Email:</span>{' '}
        <a href="mailto:data.privacy@jadar.com" className="text-main">
          data.privacy@jadar.com
        </a>
      </>,
    ],
  },
  {
    title: 'Additional Information',
    content: [
      <>
        This Notice should be read in conjunction with:
        <br />
        <br />
        a) JADAR’s{' '}
        <Link href={'/cookiePolicy'} target="_blank" className="text-main">
          Cookie Policy
        </Link>
        , which describes when and how JADAR collects cookies while you browse our platforms.
        <br />
        <br />
        b) JADAR’s{' '}
        <Link href={'/termsOfUse'} target="_blank" className="text-main">
          Terms Of Use
        </Link>
        , which regulates the access to and use of JADAR’s domains and websites.
      </>,
    ],
  },
  {
    title: 'What Personal Data Do We Collect',
    content: [
      'Personal data refers to any information, no matter its origin or format, that can identify you as a visitor to the JADAR.com website — or could potentially make such identification possible.',
      'The JADAR.com website must handle the following types of personal information:',
      '• Essential Browser Information and Cookies: including your IP address and other mandatory tracking details through “essential cookies”.',
      'The JADAR.com website may also collect:',
      '• Personal identifiers: such as your name, location, language choice, and other preferences you provide online.',
      '• Contact details: such as your phone number and email address submitted through forms.',
      '• Optional Browser Information and Cookies: including your IP address, browser/device details, operating system, referral links, visit duration, page views, navigation patterns, frequency of visits, and other analytics data via “optional cookies”.',
    ],
  },
  {
    title: 'Source of Personal Data',
    content: [
      'Your personal information is collected by JADAR in two ways:',
      '• Directly from you when you submit data — for example, filling out contact forms, online registrations, or using interactive services on JADAR.com.',
      '• Indirectly through the server, which sends identifying information to your browser in the form of cookies.',
    ],
  },
  {
    title: 'The Purposes for Processing your Personal Data and Legal Basis',
    content: [
      'We only process personal information for the purposes for which it was obtained.',
      'We rely on your consent for activities such as:',
      '• Communication: replying to messages, addressing questions, or handling your submissions.',
      '• Marketing and Promotion: presenting JADAR’s offerings and regions to you in line with your interests and behavior.',
      '• Quality Review: analyzing how people use our services (visit times, features/pages viewed, browser type, crashes, and system activity) to enhance performance.',
      'We also rely on legitimate interest when ensuring security — for example, monitoring traffic to verify that the website is being used properly.',
    ],
  },
  {
    title: 'Providing Personal Data to JADAR',
    content: [
      'If an activity depends on your consent, you are free to withdraw it at any time. In some cases, another legal basis may still require us to process your data.',
      'If you refuse to provide certain personal details, we might not be able to deliver specific services, such as sharing further information about JADAR or replying to your requests.',
    ],
  },
  {
    title: 'Storage and Destruction',
    content: [
      'Your personal data is kept securely either by JADAR or through a cloud service provider based in the Kingdom of Saudi Arabia.',
      'We only retain personal data for as long as necessary to fulfill its original purpose, following retention periods set by regulatory, legal, and professional standards.',
      'We review retention periods on a regular basis to ensure we are not keeping data longer than required.',
      'Any data scheduled for deletion is securely removed in line with JADAR’s Data Management Policy and Guidelines.',
    ],
  },
  {
    title: 'How do we Disclose your Personal Data?',
    content: ['We do not share your personal data with any third party for direct marketing purposes.'],
  },
  {
    title: 'Your Data Privacy Rights',
    content: [
      'Under certain conditions, you can exercise your rights as defined by the City’s data privacy regulations. These rights are subject to limitations:',
      '• Right to be Informed: to receive details on how we process your personal data and what rights you have.',
      '• Right of Access: to review your personal information.',
      '• Right of Request: to obtain a copy of your data in a clear and usable format.',
      '• Right to Rectification: to request corrections to your personal information.',
      '• Right to Erasure: to request deletion of your personal information.',
      'Unless otherwise specified by law, you will not be charged fees to exercise these rights. We will respond within 30 days of receiving your request.',
      'To exercise your rights or raise a complaint, you can reach us at: data.privacy@jadar.com',
    ],
  },
  {
    title: 'Complaint and Appeal',
    content: [
      <>
        If you have any concerns or believe that we have not fulfilled our obligations, you may file a complaint with JADAR’s Personal Data
        Protection Office at:{' '}
        <a href="mailto:data.privacy@jadar.com" className="text-main">
          data.privacy@jadar.com
        </a>
        <br /> <br />
        If you are dissatisfied with our response, or if we do not reply within 30 days, you may escalate the matter to the Competent
        Authority:
        <br /> <br />
        City, City, 123456, Kuwait,
        <br />
        Website: jadar.gov.ku
        <br />
        Call: 123456789
      </>,
    ],
  },
  {
    title: 'Version',
    content: ['This is version 1 of the JADAR Website Privacy Notice, published 0 April 2025.'],
  },
]

export default function PrivacyNotice() {
  return (
    <section
      dir={`ltr`}
      className="relative w-screen min-h-screen overflow-hidden bg-text/90 text-bg py-24 px-4 flex flex-col justify-center items-center"
    >
      <div className="max-w-4xl bg-text p-24 max-md:px-4 max-md:py-12 shadow-xl font-light">
        {sections.map((section, i) => (
          <div key={i} className="mb-12">
            <h2 className={`text-2xl mb-6 ${i === 0 ? 'text-4xl max-md:text-3xl uppercase' : ''}`}>{section.title}</h2>
            {section.content.map((para, j) =>
              typeof para === 'string' ? (
                <p key={j} className="mb-4">
                  {para}
                </p>
              ) : (
                <div key={j} className="mb-4">
                  {para}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
