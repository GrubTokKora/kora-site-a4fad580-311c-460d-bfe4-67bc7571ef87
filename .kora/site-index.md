# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: JioMed Family Care | Family Doctor in Leawood, KS
purpose: The landing page — the practice, its eight service lines, its two physicians, patient reviews and the FAQ.
sections:
- `#main` "Family doctor in Leawood, KS — Where life and health unite" — the page body, holding the hero and every section below it
- `#about` "Care from physicians who know your name" — the practice's approach, with its four points: One on One Care, Non-Emergent Visits, Quick Clinical Support, Insurance Accepted
- `#services` "Complete family medicine, under one roof" — the eight service lines, each linking to its own page: Acute Care Appointments, Wellness Exams, Chronic Disease Management, In-Office Procedures, Diagnostic & Testing, Weight Management, Concierge Medicine, Aesthetic Medicine
- `#physicians` "Two board-certified family physicians" — the doctors: Ekta S. Patel, MD, Megha Teeka, MD, DABOM
- `#why-choose-us` "Why families choose JioMed Family Medicine Clinic" — the differentiators: Physician-Directed Care, Quick Access, Trustworthy Care, Comprehensive Services
- `#testimonials` "What our patients say" — six named patient reviews: Leann Long, Megan Cordell, Vicki Reynolds, Peggy McEwen, Tracy Mauk, Joe Abarca
- `#appointment` "Your Health Journey Starts Here" — the ways to reach the clinic, naming the patient portal AdvancedMD
- `#faq` "Frequently asked questions" — a six-question accordion
- `#faq-trigger-0` through `#faq-trigger-5` — the six question buttons
- `#faq-panel-0` through `#faq-panel-5` — the six answer panels
also: The six patient reviews are written out here and again on about.html; three of them appear on all nine service pages. A review change is up to eleven edits.
also: FAQ questions and answers are paired only by the number in their ids. Adding a question in the middle means renumbering every id after it, on this and every service page.

## about.html → /about
title: About Us | JioMed Family Care | Leawood, KS
purpose: The about page — the practice's story and a full profile for each physician.
sections:
- `#main` "About JioMed Family Care" — the page body
- `#physicians` "Your doctors" — the two physician profiles
- `#dr-megha-teeka` "Dr. Megha Teeka, MD, DABOM" — her profile
- `#dr-ekta-patel` "Ekta S. Patel, MD" — her profile
- `#testimonials` "What our patients say" — the same six named patient reviews
also: Dr. Teeka is written as "Dr. Megha Teeka, MD, DABOM" here and as "Megha Teeka, MD, DABOM" on index.html. Her post-nominals are part of the heading text and of her article's id, so a credential change touches both.

## services.html → /services
title: Services | Family Medicine in Leawood, KS | JioMed
purpose: The services index — the eight service lines and how a visit works.
sections:
- `#main` "Services" — the page body
- `#main` "Everything your family needs, in one clinic" — the eight service lines: Acute Care Appointments, Wellness Exams, Chronic Disease Management, In-Office Procedures, Diagnostic & Testing, Weight Management, Concierge Medicine, Aesthetic Medicine
- `#main` "Getting care at JioMed" — the four steps of a visit: Book, Be seen, Test on site, Follow up
- `#testimonials` "What our patients say" — three named patient reviews
also: This page and `#services` on index.html list the same eight services in the same order, as two separate copies. Adding a service is two edits before its own page even exists.

## acute-care-appointments.html → /acute-care-appointments
title: Acute Care Appointments in Leawood, KS | JioMed Family Care
purpose: The acute-care service page — what is treated same-day, the self-pay price, and an FAQ.
sections:
- `#main` "Acute Care Appointments" — the page body and its "Seen today, by your own physician" block
- `#main` "Our array of acute care services" — what is treated: Upper respiratory infections, Ear, nose and throat, Respiratory, Gastrointestinal, Skin conditions, Musculoskeletal, Urinary tract infections, Eye infections, Fever, Allergies
- `#faq` "Acute care questions" — a four-question accordion, with `#faq-trigger-0` to `#faq-trigger-3` and `#faq-panel-0` to `#faq-panel-3`
- `#testimonials` "What our patients say" — three named patient reviews
also: The self-pay price for an acute visit is stated on this page and again on packages.html. Changing one leaves the other quoting the old fee.

## wellness-exams.html → /wellness-exams
title: Annual Wellness Exams in Leawood, KS | JioMed Family Care
purpose: The wellness-exam service page — what preventive care is offered and an FAQ.
sections:
- `#main` "Wellness Exams" — the page body and its "Prevention is better than cure" block
- `#main` "Our range of preventive care services" — what is offered: Annual physical examination, Preventive services
- `#faq` "Wellness exam questions" — a four-question accordion covering frequency, insurance cover, what to bring, and sports and well-child exams
- `#testimonials` "What our patients say" — three named patient reviews

## procedures.html → /procedures
title: In-Office Procedures in Leawood, KS | JioMed Family Care
purpose: The procedures service page — what is done in the clinic rather than referred out, with pricing and an FAQ.
sections:
- `#main` "In-Office Procedures" — the page body and its "Handled here, not referred elsewhere" block
- `#main` "JioMed's specialized procedures" — the procedure groups: Dermatology procedures, Skin biopsy, Gynaecologic procedures, Other procedures
- `#main` "Transparent procedure pricing" — the self-pay pricing block
- `#faq` "Procedure questions" — a four-question accordion
- `#testimonials` "What our patients say" — three named patient reviews

## diagnostic-testing-services.html → /diagnostic-testing-services
title: Diagnostic & Testing Services in Leawood, KS | JioMed
purpose: The diagnostics service page — what can be tested on site and an FAQ.
sections:
- `#main` "Diagnostic & Testing Services" — the page body and its "Answers during your visit, not days later" block
- `#main` "Our diagnostic test services" — the tests offered
- `#faq` "Testing questions" — a four-question accordion covering turnaround, appointments, outside labs and insurance
- `#testimonials` "What our patients say" — three named patient reviews

## weight-management.html → /weight-management
title: Medical Weight Management in Leawood, KS | JioMed & Enara
purpose: The weight-management service page — the programme run with Enara Health, what it includes, and an FAQ.
sections:
- `#main` "Weight Management with Enara Health" — the page body
- `#main` "Our comprehensive services" — what the programme includes: VO2 testing, Body composition analysis, Fitness expert guidance, Nutrition counselling, Remote monitoring, Frequent touchpoints, Insurance-covered obesity care
- `#main` a physician's personal note about her own experience
- `#faq` "Weight management questions" — a four-question accordion
- `#testimonials` "What our patients say" — three named patient reviews
also: This service is delivered with an outside partner, Enara Health, named in the page title and throughout the body. A change of partner is not just a rename.

## concierge-medicine.html → /concierge-medicine
title: Concierge Medicine in Leawood, KS — $40/mo | JioMed
purpose: The concierge-membership page — the benefits, the hybrid model, the membership tiers and an FAQ.
sections:
- `#main` "Concierge Medicine" — the page body and its founding-principles block
- `#main` "Benefits of our concierge medicine membership" — the benefits: Improved access, Direct communication, Rapid responses, Effortless medication management, Comprehensive annual physical, Longer appointment time
- `#main` "Our unique hybrid model" and "Insurance benefits" — how membership sits alongside insurance
- `#main` "Cost of our membership plan" — the tiers: Individual Membership, Additional Adult, Children
- `#faq` "Concierge medicine questions" — a six-question accordion
- `#testimonials` "What our patients say" — three named patient reviews
also: The membership price is in this page's title tag as well as its body, and again on packages.html and index.html. A price change has to reach all four.

## aesthetic-medicine.html → /aesthetic-medicine
title: Aesthetic Medicine in Leawood, KS | Botox, Filler | JioMed
purpose: The aesthetics page — each treatment offered, with its own section and an FAQ.
sections:
- `#main` "Aesthetic Medicine" — the page body
- `#morpheus8` "MORPHEUS8" — the treatment and what it does
- `#diolaze-xl` "Diolaze XL Laser Hair Removal" — the treatment and what it does
- `#neurotoxin` "Neurotoxin Treatments (Botox / Dysport / Xeomin)" — the treatment and the brands offered
- `#filler` "Filler" — the treatment and what it does
- `#chemical-peel` "Chemical Peeling" — the treatment and what it does
- `#microneedling` "Microneedling" — the treatment and what it does
- `#prp` "PRP (Platelet-Rich Plasma)" — the treatment and what it does
- `#faq` "Aesthetic medicine questions" — a four-question accordion
also: This is the only service page whose treatments each have their own id and section. Every other service page keeps its offerings inside `#main` with no id, so a change addressed by anchor works here and nowhere else.
also: MORPHEUS8 is written in capitals while every other treatment heading is in title case.

## packages.html → /packages
title: Self-Pay Packages & Pricing | JioMed Family Care, Leawood KS
purpose: The self-pay pricing page — single visits, bundles, procedure pricing and the concierge fee.
sections:
- `#main` "Self-Pay Packages" — the page body
- `#main` "Single visits" — the per-visit options: Acute Visit, Annual Physical
- `#main` "Chronic disease management bundles" — the bundles: 6-Month Bundle, 1-Year Bundle
- `#main` "In-office procedure pricing" — the procedure pricing block
- `#main` the concierge membership price and what it covers
- `#faq` "Self-pay questions" — a four-question accordion
also: This page is entirely prices. Every number on it is repeated on the service page it belongs to, so any price change is at least two edits and the two pages never reference each other.

## chronic-disease-management.html → /chronic-disease-management
title: Chronic Disease Management in Leawood, KS | JioMed
purpose: The chronic-care service page — which long-term conditions are managed, what ongoing care looks like, and an FAQ.
sections:
- `#main` "Chronic Disease Management" — the page body and its "Managing a condition well changes everything" block
- `#main` "JioMed's support for chronic health conditions" — the conditions managed
- `#main` "What ongoing care with us looks like" — how ongoing care is run
- `#faq` "Chronic care questions" — a four-question accordion covering which conditions are managed, visit frequency, coordination with specialists, and the self-pay option
- `#testimonials` "What our patients say" — three named patient reviews
also: The 6-Month and 1-Year bundles priced on packages.html are for this service, but neither page links to the other.

## contact.html → /contact
title: Contact Us | JioMed Family Care | Leawood, KS 66211
purpose: The contact page — the phone, fax, email, portal, opening hours and an appointment request form.
sections:
- `#main` "Contact Us" — the page body, carrying the phone and fax numbers, the email address, the AdvancedMD portal link and the opening hours by day
- `#contact-form` — the appointment request form
- `#contact-form-name`, `#contact-form-email`, `#contact-form-phone` — the patient's details
- `#contact-form-insurance` — the insurance field
- `#contact-form-physician` — the select for choosing a physician
- `#contact-form-message` — the message field
- `#faq` "Visiting JioMed" — a short accordion about visiting
also: `#contact-form-physician` lists the physicians by name, so a doctor joining or leaving is an edit to this form as well as to index.html and about.html.

## gallery.html → /gallery
title: Gallery | JioMed Family Care Clinic in Leawood, KS
purpose: The gallery page — photographs of the clinic.
sections:
- `#main` "Gallery" — the page body and its "Capturing moments of success" block
- `#testimonials` "What our patients say" — three named patient reviews

## privacy-policy.html → /privacy-policy
title: Privacy Policy | JioMed Family Care, Leawood KS
purpose: The privacy policy — what patient and website data is collected and why.
sections:
- `#main` "Privacy Policy" — the policy text, including what information is used for

## terms.html → /terms
title: Terms and Conditions | JioMed Family Care, Leawood KS
purpose: The terms and conditions page.
sections:
- `#main` "Terms and Conditions" — the terms text

## 404.html → /404
title: Page Not Found | JioMed Family Care, Leawood KS
purpose: The not-found page shown when a URL does not exist.
sections:
- `#main` "We couldn't find that page" — the message and the links back into the site
also: This page is served for URLs that do not exist, so its links are the only way back. A navigation change that removes a page has to leave this page's links pointing somewhere real.

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — a plain-text summary of the business for AI crawlers — derived from the site by the deploy, not written by hand
- `robots.txt` — crawler rules and the sitemap link — derived from the site by the deploy, not written by hand
- `sitemap.xml` — the list of page URLs — derived from the site by the deploy, not written by hand
- `assets/site.css` — the site's styling, brand colours and type scale
- `js/includes.js` — THE PRACTICE'S OWN DETAILS used across every page — the phone, fax, email, address, map link and patient portal link  [content]
- `js/main.js` — page behaviour and the FAQ accordions

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
