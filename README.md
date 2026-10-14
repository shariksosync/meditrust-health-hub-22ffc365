# Meditrust Health Hub

https://github.com/shariksosync/meditrust-health-hub

copy this repo and finish

The MEDITRUST demo’s sample catalog, local shopping state, healthcare image, and initial storefront pieces are in place; the full page flows, admin panel, and testing remain unfinished because credits ran out.

initial prompt was:
PROJECT: MEDITRUST LIFE SCIENCE PVT LTD — DIGITAL HEALTHCARE & E-PHARMACY PLATFORM

1. Project Overview

Build a complete, responsive, dynamic healthcare e-commerce and digital health portfolio website for MEDITRUST LIFE SCIENCE PVT LTD, inspired by the functionality, navigation structure, and customer experience of https://www.1mg.com/.

The website must feel like a professional Indian healthcare platform offering online pharmacy shopping, OTC healthcare products, wellness products, diagnostic laboratory booking, online doctor consultation interfaces, health information, and customer account features.

This is not a simple static company portfolio. Build a multi-page digital healthcare platform with customer-facing pages, shopping interactions, reusable components, mock product data, and a comprehensive admin dashboard.

Use the reference website for functional inspiration. Create an original MEDITRUST visual identity and original layouts.

2. STRICT TECHNOLOGY REQUIREMENTS

Use ONLY:

- React
- Vite
- Tailwind CSS
- Native JavaScript
- React hooks and built-in browser functionality

Do not use any additional libraries or frameworks.

Strictly prohibited:

- Next.js
- TypeScript
- Bootstrap
- Material UI
- shadcn/ui
- Redux or other state management libraries
- React Router or any additional routing library
- Axios
- External icon libraries
- External animation libraries
- Backend frameworks
- Firebase
- Supabase
- SQL or NoSQL databases
- Any database or server-side storage
- External authentication services
- Payment gateway integrations

Implement navigation with a lightweight custom React routing solution using the browser History API, or a simple pathname-based routing system.

Use inline SVG icons created manually where needed.

Use React Context and hooks for shared client-side state.

Use Tailwind CSS for all styling.

Use mock JavaScript objects and arrays as the complete data source.

Use localStorage only for optional client-side demo persistence, such as cart items, wishlist items, and mock admin settings. Do not use it as a database or represent it as a secure backend.

The complete project must run with the standard Vite development command.

3. COMPANY INFORMATION

Business Name: MEDITRUST LIFE SCIENCE PVT LTD

Registered Directors:
- Ajay Kumar Pathri
- Omkar Sanjay Telangi

Business Address:
Morya Colony, Matoshree Nagar, Sector No. 32, Chinchwad, Pimpri-Chinchwad, Maharashtra 411033, India

Phone: +91 7276048377

Email: office@meditrusts.life

Website: https://www.1mg.com/ (reference website only)

Business Description:

MEDITRUST LIFE SCIENCE PVT LTD is an integrated digital healthcare platform and e-pharmacy ecosystem focused on accessible, authentic, and affordable healthcare solutions. The platform is designed to connect customers with genuine prescription medicines, OTC wellness products, personal care essentials, pathology laboratory services, virtual doctor consultations, and digital health records through a convenient and transparent online experience.

Important: Do not claim that the company has licenses, accredited laboratory partnerships, verified doctors, delivery coverage, certifications, or regulatory approvals unless they are specifically provided and verified. Use clearly marked demonstration data where actual operational information is unavailable.

4. BRAND IDENTITY AND COLOR PALETTE

Create a trustworthy, modern Indian healthcare brand.

Primary colors:

- Primary healthcare teal: #087F8C
- Deep teal: #075B63
- Fresh mint: #E8F7F5
- White: #FFFFFF
- Light background: #F7FAFC
- Dark navy text: #172B3A
- Muted text: #64748B
- Border gray: #E2E8F0
- Success green: #16865C
- Warning amber: #F59E0B
- Error red: #DC2626

Design direction:

- Clean healthcare interface.
- White backgrounds and generous spacing.
- Teal buttons and primary actions.
- Rounded product cards with subtle borders.
- Clear typography and accessible contrast.
- Professional medical icons using inline SVG.
- Subtle shadows and restrained transitions.
- Mobile-first responsive layouts.
- Sticky navigation where appropriate.
- Consistent visual hierarchy.
- Original MEDITRUST branding.

Create a simple MEDITRUST wordmark using text and a custom medical cross or shield symbol built with inline SVG. Do not use the Tata 1mg logo or copy its branding.

5. GLOBAL WEBSITE LAYOUT

Build a reusable site-wide header, navigation, footer, announcement area, content containers, product cards, modal system, and toast notification system.

Announcement bar

Display an editable announcement such as:

"Your Health, Our Priority — Explore Convenient Healthcare Services"

Allow the admin to change the text and visibility.

Header — Desktop

Create a clean, responsive, multi-row header inspired by modern healthcare e-commerce platforms.

Top row:
- MEDITRUST logo.
- Location selector with a demonstration location.
- Large search field.
- Search button.
- Login / Account.
- Wishlist icon.
- Cart icon with live item count.

Second navigation row:
- Medicines
- Healthcare Products
- Lab Tests
- Doctor Consultation
- Health Articles
- Offers
- About Us

Provide hover menus or clickable dropdowns for major categories.

Header — Mobile

- Compact logo.
- Search icon or expandable search field.
- Account icon.
- Cart icon.
- Mobile navigation menu.
- Collapsible category navigation.
- Easy-to-tap controls.

Footer

Create a multi-column footer with:

Company:
- About MEDITRUST
- Our Services
- Contact Us
- Careers (demo page)

Healthcare Services:
- Order Medicines
- Healthcare Products
- Book Lab Tests
- Consult a Doctor
- Health Articles

Customer Support:
- FAQs
- Shipping Policy
- Returns and Refunds
- Privacy Policy
- Terms and Conditions

Contact:
- +91 7276048377
- office@meditrusts.life
- Morya Colony, Matoshree Nagar, Sector No. 32, Chinchwad, Pimpri-Chinchwad, Maharashtra 411033

Add copyright information and a healthcare disclaimer.

Admin redirect requirement: Include a clearly accessible but visually understated "Admin Login" link in the footer that navigates to `/admin/login`.

All footer links must work. Build a consistent footer across customer-facing pages.

6. HOMEPAGE

Build a complete, polished homepage with the following sections.

Hero section

Use a large healthcare banner image featuring a bright, modern healthcare environment, medicine packaging, a pharmacist, or a doctor consulting a patient.

Use a royalty-free image URL or a locally supplied image if available. Do not create a blank hero section.

Hero content:

Headline:
"Healthcare Made Simple, Safe & Accessible"

Supporting text:
"Medicines, diagnostics, wellness essentials and healthcare services — designed around your needs."

Primary CTA:
"Explore Medicines"

Secondary CTA:
"Book Lab Tests"

Include a prominent search field for medicines, healthcare products, and services.

Create a responsive split layout with text on one side and a healthcare banner image on the other. On mobile, stack the content neatly.

Hero image, headline, description, button labels, and CTA destinations must be editable from the admin dashboard.

Service shortcuts

Create visually distinct cards for:
1. Order Medicines
2. Healthcare Products
3. Book Lab Tests
4. Consult a Doctor
5. Personal Care
6. Health Records

Each card must have an original inline SVG icon and a working navigation destination.

Shop by category

Create category cards for:
- Prescription Medicines
- OTC Medicines
- Vitamins & Supplements
- Diabetes Care
- Women's Health
- Baby Care
- Personal Care
- Medical Devices
- Nutrition & Wellness
- First Aid

Each category should have an image, title, short description, and navigation link.

Featured products

Show product cards with:
- Product image.
- Product name.
- Brand.
- Pack size.
- Price.
- MRP and discount when appropriate.
- Product category.
- Prescription-required badge where applicable.
- Add to Cart button.
- Wishlist button.
- Product details link.

Create filters and sorting controls on the relevant listing pages.

Promotional banners

Add multiple editable promotional sections, such as:
- Everyday Healthcare Essentials
- Wellness and Nutrition
- Convenient Diagnostic Services

Use original copy. Promotions, coupon codes, validity, and visibility must be controlled by the admin.

Diagnostic services

Display mock diagnostic packages such as:
- Complete Blood Count
- Thyroid Profile
- Diabetes Screening
- Vitamin Profile
- General Wellness Checkup

Show demonstration prices, sample collection information, and a "View Details" or "Book Test" button.

Do not imply that these services are currently available from a real accredited partner unless verified.

Doctor consultation section

Show specialty cards:
- General Physician
- Dermatology
- Pediatrics
- Gynecology
- Orthopedics
- Mental Wellness

Display mock doctor profiles only as examples. Label demo profiles appropriately and do not present fabricated qualifications as real.

Trust and service information

Create editable information cards for:
- Authenticity-focused sourcing
- Convenient ordering
- Customer assistance
- Transparent pricing

Do not display fabricated certifications, customer counts, ratings, medical success statistics, or unsupported claims.

Health articles

Display article cards for general health education with categories, reading time, thumbnails, and article details pages.

Use general educational content and include a disclaimer that content is not a substitute for professional medical advice.

Newsletter and footer

Add an optional newsletter UI with validation and a success message. Since no backend exists, do not send or store subscriptions externally.

7. REQUIRED CUSTOMER-FACING PAGES

Build all pages with a consistent layout and fully working navigation.

A. Medicines and Pharmacy

Routes:
- `/medicines`
- `/medicines/:category`
- `/search`
- `/product/:id`
- `/prescription-upload`
- `/cart`
- `/checkout`
- `/order-confirmation`
- `/orders`
- `/orders/:id`

Features:
- Search medicines and healthcare products.
- Category and brand filters.
- Price range filtering.
- Sort by popularity, price, name, and discount.
- Product detail pages.
- Product image gallery where data permits.
- Pack size selection.
- Quantity controls.
- Cart updates.
- Wishlist functionality.
- Related products.
- Recently viewed products.
- Order summary.
- Mock checkout flow.
- Order confirmation screen.
- Mock order history and order detail pages.
- Reorder UI.
- Delivery address form.
- Coupon code entry using mock coupons.

Prescription handling:
- Support a demo prescription-upload interface with a file input and preview where supported.
- Clearly label uploads as demonstration-only.
- Do not transmit or persist actual prescriptions.
- Require a prescription workflow for products marked prescription-required.
- Do not claim that prescriptions have been verified by a pharmacist.
- Do not enable actual medicine fulfillment or medical approval.

B. Healthcare Products

Routes:
- `/healthcare`
- `/healthcare/:category`

Include:
- Medical devices.
- Personal care.
- Nutrition.
- Wellness products.
- Baby care.
- Diabetes care.
- First aid.
- Product filters, sorting, and shopping interactions.

C. Lab Tests

Routes:
- `/lab-tests`
- `/lab-tests/:id`
- `/lab-tests/booking`
- `/lab-tests/booking-confirmation`

Features:
- Search tests.
- Filter by category.
- Test description.
- Sample type and preparation information where available.
- Mock prices.
- Add tests to a booking cart.
- Select a demo appointment date and time.
- Patient information form.
- Address form.
- Booking summary.
- Mock confirmation page.
- Demo booking history.

Clearly indicate that real bookings, diagnostic results, and laboratory integrations are not connected.

D. Doctor Consultation

Routes:
- `/consult-doctor`
- `/doctors/:specialty`
- `/doctor/:id`
- `/consultation/booking`
- `/consultation/confirmation`

Features:
- Specialty categories.
- Demonstration doctor cards.
- Doctor profile details.
- Mock availability slots.
- Appointment form.
- Consultation type selection.
- Booking summary.
- Mock appointment confirmation.

Clearly label demo doctors and appointment slots. No actual consultation, video calling, or medical advice service should be represented as connected.

E. Health Articles

Routes:
- `/health-articles`
- `/health-articles/:slug`

Features:
- Article categories.
- Search and filters.
- Featured articles.
- Article images.
- Author field using non-fabricated or clearly demo-labeled information.
- Reading time.
- Related articles.
- Social sharing using native browser functionality where supported.

F. Customer Account

Routes:
- `/login`
- `/register`
- `/forgot-password`
- `/profile`
- `/addresses`
- `/wishlist`
- `/orders`

Features:
- Demo login and registration.
- Client-side form validation.
- Profile management.
- Address management.
- Wishlist.
- Mock order history.
- Logout.

Clearly explain that customer authentication is simulated and not secure production authentication.

G. Informational Pages

Build:
- `/about`
- `/contact`
- `/faq`
- `/offers`
- `/privacy-policy`
- `/terms`
- `/shipping-policy`
- `/returns-policy`
- `/careers`
- `/healthcare-disclaimer`

Contact page must display the provided company details and include a validated contact form with a mock submission confirmation. No actual email sending is required.

8. SEARCH, CART, WISHLIST, AND STATE MANAGEMENT

Use React Context and built-in React hooks for shared application state.

Implement:
- Global product search.
- Search suggestions based on mock data.
- Search results page.
- Category filters.
- Price sorting.
- Cart item count in the header.
- Add and remove from cart.
- Increase and decrease quantity.
- Wishlist management.
- Coupon validation from mock coupon data.
- Recently viewed products.
- Mock order creation.
- Demo appointment bookings.
- Loading, empty, success, and error states.

Use localStorage only for non-sensitive demo preferences and shopping state where useful.

Never store real passwords, medical information, prescriptions, or sensitive patient data in localStorage.

9. MOCK DATA

Create centralized mock data files.

Suggested structure:

`src/data/products.js`
`src/data/categories.js`
`src/data/labTests.js`
`src/data/doctors.js`
`src/data/articles.js`
`src/data/banners.js`
`src/data/offers.js`
`src/data/faqs.js`
`src/data/orders.js`
`src/data/navigation.js`
`src/data/siteSettings.js`

Populate realistic demonstration data:

- At least 30 healthcare product records.
- At least 10 categories.
- At least 8 lab test records.
- At least 6 doctor demo profiles.
- At least 10 health articles.
- At least 5 promotional offers.
- At least 5 FAQs.
- Several sample orders and bookings.

Use generic sample products and appropriately labeled mock prices. Mark medical products requiring prescriptions. Do not make therapeutic claims or recommend medicines for specific conditions.

Each product should have a stable mock ID, name, category, brand, pack size, price, MRP, image, description, and prescription requirement.

Use working image URLs from reliable image sources or locally supplied assets. Add fallbacks for broken images. Do not let missing images break the layout.

10. ADMIN PANEL — CRITICAL REQUIREMENT

Create a dedicated admin interface separate from the customer-facing website.

Routes:
- `/admin/login`
- `/admin`
- `/admin/dashboard`
- `/admin/products`
- `/admin/categories`
- `/admin/orders`
- `/admin/lab-tests`
- `/admin/doctors`
- `/admin/appointments`
- `/admin/articles`
- `/admin/banners`
- `/admin/offers`
- `/admin/customers`
- `/admin/faqs`
- `/admin/pages`
- `/admin/navigation`
- `/admin/contact-settings`
- `/admin/site-settings`

Admin login

Create a dedicated login screen with:
- MEDITRUST logo.
- Email field.
- Password field.
- Show/hide password.
- Validation.
- Login and logout controls.
- Demo credentials displayed clearly on the login screen.

Demo credentials:
Email: admin@meditrusts.life
Password: Admin@123

This is a frontend demonstration only. Do not represent it as secure authentication. Protect admin routes with a client-side session flag, but explicitly document that frontend-only authentication can be bypassed and is unsuitable for production.

Admin dashboard

Create a professional dashboard featuring:
- Total mock products.
- Mock order count.
- Mock revenue indicator.
- Lab booking count.
- Appointment count.
- Published article count.
- Recent demonstration orders.
- Product category chart represented using simple CSS bars or SVG.
- Quick action buttons.
- Recent admin activity log.

Clearly identify all figures as demonstration data.

Product management

Implement:
- Product list.
- Search.
- Category filters.
- Add product.
- Edit product.
- Delete product with confirmation.
- Enable/disable product visibility.
- Product image URL.
- Product pricing.
- Discount fields.
- Stock indicator for demonstration purposes.
- Prescription-required toggle.
- Featured product toggle.

Category management

Implement:
- Create categories.
- Edit category names.
- Descriptions.
- Image URLs.
- Visibility toggle.
- Display order.

Banner and homepage management

Admin must be able to:
- Edit hero heading.
- Edit hero subtitle.
- Change hero image URL.
- Edit hero button text and destinations.
- Add, edit, and delete promotional banners.
- Enable or disable homepage sections.
- Change featured product selection.
- Manage service shortcut visibility.
- Change announcement bar text.
- Preview homepage changes.

Lab test management

Admin must be able to:
- Add, edit, and delete mock tests.
- Change price.
- Edit descriptions and preparation notes.
- Enable/disable listing visibility.
- Manage mock booking records and their demo status.

Doctor management

Admin must be able to:
- Add and edit demo profiles.
- Change specialty.
- Change display image.
- Edit description.
- Configure mock appointment availability.
- Publish or hide profiles.

Do not represent demo profiles as verified medical professionals.

Articles and FAQ management

Admin must be able to:
- Create articles.
- Edit titles, slugs, excerpts, body content, category, image, and publication status.
- Create and manage FAQs.
- Preview published content.

Offer management

Admin must be able to:
- Create coupons.
- Configure percentage or fixed demo discounts.
- Configure minimum cart value.
- Configure validity dates.
- Activate or deactivate offers.

Orders and appointments

Admin must be able to:
- View mock orders.
- View mock booking records.
- Open order details.
- Update demonstration order status.
- Update demonstration booking status.
- Filter by date and status.

Do not expose real patient records or real medical data.

Customer management

Show mock customer records only. Provide search and demo status filters. Do not imply connection to a real customer database.

Site settings

Provide controls for:
- Company name.
- Logo text.
- Contact phone.
- Contact email.
- Business address.
- Footer content.
- Announcement bar.
- Navigation labels.
- Theme colors.
- Social links.
- Legal disclaimer text.

Persistence

All admin CRUD changes should update the React state immediately and persist in localStorage for the current browser demo where appropriate.

Add a "Reset Demo Data" action with a confirmation dialog.

Make it clear that data is local to the browser and will not synchronize across users or devices.

11. ADMIN DESIGN

Create a separate dashboard shell.

Desktop:
- Fixed left sidebar.
- Main content area.
- Top bar with page title.
- Admin account dropdown.
- Search where relevant.
- Breadcrumbs.
- Summary cards.
- Responsive tables.
- Modal forms.
- Confirmation dialogs.
- Toast notifications.

Mobile:
- Collapsible sidebar.
- Horizontally scrollable or responsive tables.
- Stacked forms.
- Touch-friendly controls.

Use the same healthcare color palette while giving the admin interface a more operational, dashboard-focused appearance.

12. COMPONENT ARCHITECTURE

Organize the project cleanly.

Suggested structure:

`src/main.jsx`
`src/App.jsx`
`src/index.css`

`src/components/layout/Header.jsx`
`src/components/layout/Footer.jsx`
`src/components/layout/MobileMenu.jsx`
`src/components/layout/AdminLayout.jsx`

`src/components/common/Button.jsx`
`src/components/common/Input.jsx`
`src/components/common/Modal.jsx`
`src/components/common/Toast.jsx`
`src/components/common/Badge.jsx`
`src/components/common/EmptyState.jsx`
`src/components/common/LoadingState.jsx`

`src/components/products/ProductCard.jsx`
`src/components/products/ProductGrid.jsx`
`src/components/products/ProductFilters.jsx`
`src/components/products/SearchBar.jsx`

`src/context/AppContext.jsx`
`src/context/CartContext.jsx`
`src/context/AdminContext.jsx`

`src/data/`

`src/pages/`

`src/pages/admin/`

`src/utils/`

Use reusable components rather than duplicating markup across pages.

13. NAVIGATION AND FUNCTIONALITY RULES

Every visible navigation link and CTA must work.

Requirements:
- No dead links.
- No buttons that do nothing.
- No empty pages.
- No placeholder dashboard screens.
- No nonfunctional Add to Cart buttons.
- No fake successful payment claims.
- No actual payment processing.
- No broken product detail routes.
- No missing route fallbacks.
- No horizontal overflow on mobile.
- No browser console errors.

Implement custom routing and route parameters without an external routing library.

Ensure browser back and forward navigation works.

Use a custom not-found page with a link to return home.

All forms must include appropriate validation, error messages, and success feedback.

14. VISUAL QUALITY AND RESPONSIVENESS

Design a premium, polished healthcare experience.

Desktop:
- Spacious content sections.
- Balanced product grids.
- Large search area.
- Clear hierarchy.
- Consistent spacing.
- Subtle hover states.

Tablet:
- Responsive navigation.
- Two- or three-column product grids depending on width.
- Adapted forms and content layouts.

Mobile:
- Single-column forms.
- Two-column product grid where practical.
- Readable typography.
- Responsive images.
- Collapsible navigation.
- Sticky cart or purchase actions only where useful.
- No clipped text or controls.

Use semantic HTML, proper labels, visible keyboard focus, descriptive image alt text, and accessible contrast.

15. IMPORTANT MEDICAL, PRIVACY, AND COMPLIANCE BOUNDARIES

This project is a frontend prototype using demonstration data, not a functioning healthcare provider or pharmacy.

- Do not dispense medicines.
- Do not claim prescription verification.
- Do not make medical diagnoses.
- Do not promise treatment outcomes.
- Do not claim laboratory accreditation without evidence.
- Do not fabricate regulatory licenses or certifications.
- Do not collect or persist real medical records.
- Do not send real prescription uploads.
- Do not claim that real orders, payments, consultations, or diagnostic bookings have been completed.
- Clearly label all simulated workflows.
- Include a healthcare disclaimer.
- Include placeholder privacy and legal policies that must be reviewed before launch.

The company directors and business details provided in this brief may be displayed as company information.

16. FINAL ACCEPTANCE CRITERIA

Before completing the project, verify that:

1. The website runs using React, Vite, and Tailwind CSS only.
2. No external component, routing, icon, or state-management libraries are installed.
3. All customer-facing pages have working navigation.
4. The homepage includes a healthcare banner image.
5. Product search, filters, cart, and wishlist work with mock data.
6. Mock checkout and order confirmation work without actual payments.
7. Lab test and consultation demo booking flows work.
8. Customer account pages work as frontend demonstrations.
9. The admin login route works using the stated demo credentials.
10. Admin routes show the admin dashboard shell.
11. Admin CRUD operations update visible website content.
12. Hero banners, products, categories, articles, FAQs, offers, and contact details can be managed through the admin panel.
13. Admin changes persist in the current browser demo when appropriate.
14. The footer includes an Admin Login redirect to `/admin/login`.
15. Company contact details are correct.
16. All forms have validation and feedback.
17. Desktop, tablet, and mobile layouts work.
18. No database, backend, or external service integration is present.
19. There are no dead links, empty routes, or broken interactions.
20. The website uses original MEDITRUST branding rather than copied 1mg branding.

Build the complete working frontend, populate it with realistic demonstration data, and prioritize a functional end-to-end customer experience and comprehensive admin content management over static mockup screens.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/58517b17-6da2-4b27-ac71-336180897659).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
