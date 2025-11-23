import Link from 'next/link'

const termsData = [
  {
    title: 'Overview',
    content: (
      <>
        Welcome to JADAR!
        <br />
        These Terms of Use govern your access to and use of{' '}
        <Link href={'/'} className="text-main">
          JADAR's
        </Link>{' '}
        website.
        <br />
        The following additional documents, which form part of these Terms of Use, also apply to your use of our website:
        <br />
        <br />
        a. Our{' '}
        <Link href={'/privacyPolicy'} target="_blank" className="text-main">
          Privacy Policy
        </Link>
        , which explains how we collect, handle and protect your personal information.
        <br />
        b. Our{' '}
        <Link href={'/cookiePolicy'} target="_blank" className="text-main">
          Cookie Policy
        </Link>
        , which provides details about the cookies we use on our website.
        <br />
        <br />
        By using our website, you confirm that you accept these Terms of Use, together with our Privacy Policy and Cookie Policy, and that
        you have the legal right and authority to agree to them.
        <br />
        <br />
        If you do not agree to all of these terms, please discontinue use of the website immediately.
      </>
    ),
  },
  {
    title: 'Definitions',
    content: `For the purposes of these Terms of Use:

Website: refers to this website and all of its content and pages.  
JADAR: refers to JADAR Company and references to "we", "our", or "us" mean the same.  
User: means any person accessing the website. References to "you" or "your" shall include the same.  
Terms of Use: refers to these conditions, together with the referenced policies and any updates.  
Intellectual Property Rights: covers copyrights, patents, trademarks, trade names, trade secrets, know-how, designs, domain names, and all other related rights, whether registered or unregistered.  
Content: refers to all material on the website, including text, images, documents, software, databases, and downloadable resources.`,
  },
  {
    title: 'Changes to These Terms',
    content: `JADAR reserves the right to amend or update these Terms of Use at any time without prior notice. Any modifications will become effective once posted on this website. 

You are responsible for reviewing the current version each time you use the website. Continued use of the website after changes are posted will mean that you accept those changes.`,
  },
  {
    title: 'Access and Use',
    content: `JADAR grants you a limited right to access and use this website for personal and non-commercial purposes. By accessing the website, you agree to:

i. Comply with all applicable laws and regulations.  
ii. Cover any internet or communication costs related to your use.  
iii. Respect restrictions on use; however, journalists and media professionals may use content for legitimate reporting on JADAR, provided usage is fair, accurate, and properly attributed.  

You may download certain materials for editorial purposes, provided you do not alter or remove copyright notices. Redistribution, modification, or commercial use is not permitted without written permission.  

JADAR reserves the right to suspend, limit, or block access to the website at any time and for any reason. We also reserve the right to discontinue or modify parts of the website without prior notice.  

We do not guarantee uninterrupted access, error-free operation, or continuous availability of the website or its content.`,
  },
  {
    title: 'Third-Party Links',
    content: `This website may contain links to external websites. Such links are provided for your convenience only. JADAR does not endorse, monitor, or assume responsibility for the content or practices of third-party websites. 

If you find a link on our website that you believe is inappropriate or offensive, you may contact us, but we are not obligated to remove it.`,
  },
  {
    title: 'Information Disclaimer',
    content: `The content provided on this website is for general informational purposes only and does not constitute professional advice. You should obtain independent advice before making decisions based on the content here.  

Opinions, statements, or advice expressed on this website may be those of third-party contributors, and JADAR does not guarantee their accuracy or reliability.  

While we strive to keep information current, the website and its content are provided "as is," without warranties of any kind, express or implied. To the maximum extent permitted by law, JADAR disclaims all representations and guarantees regarding the accuracy, completeness, or availability of content.`,
  },
  {
    title: 'Intellectual Property',
    content: `All content on this website, including text, graphics, images, code, trademarks, and design elements, are the property of JADAR or its licensors and are protected by applicable laws.  

Except as explicitly permitted, no part of the website or its content may be copied, distributed, republished, modified, or transmitted without prior written approval from JADAR.  

All rights are reserved.`,
  },
  {
    title: 'Disclaimer and Liability',
    content: `Your use of this website is at your own risk. JADAR shall not be held liable for any damages, losses, or expenses arising from your use of the website or reliance on its content.  

Nothing on the website shall be interpreted as granting rights to use JADAR trademarks, logos, or intellectual property without explicit written consent.  

JADAR is not responsible for third-party content or external websites that may be linked or referenced here.`,
  },
  {
    title: 'General Provisions',
    content: `a. Nothing in these Terms of Use shall be interpreted as a waiver of JADAR’s rights.  
b. Any delay in exercising a right does not constitute a waiver of that right.  
c. If any provision of these Terms is found to be invalid or unenforceable, the remainder shall remain valid and enforceable.  
d. Accessing and using this website does not create a partnership, employment, or agency relationship between you and JADAR.  
e. You agree not to commercially exploit the website’s content without prior consent.  
f. You must comply with all applicable laws while using this website.  
g. JADAR may update or modify the website at its sole discretion and without limitation.`,
  },
  {
    title: 'Governing Law',
    content:
      'These Terms of Use and any disputes arising from them are governed by the laws of the Kingdom of Saudi Arabia. By using this website, you submit to the exclusive jurisdiction of the competent courts in Saudi Arabia.',
  },
]

export default function TermsOfUse() {
  return (
    <section
      dir="ltr"
      className="relative w-screen min-h-screen overflow-hidden bg-text/90 text-bg py-24 px-4 flex flex-col justify-center items-center"
    >
      <div className="max-w-4xl bg-text p-24 max-md:px-4 max-md:py-12 shadow-xl font-light">
        <h1 className="text-4xl mb-12">Terms of Use</h1>
        <div className="space-y-10">
          {termsData.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl mb-4">{section.title}</h2>
              <p className="leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
