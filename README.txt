4CoreSteel Engineering Services website
=======================================

A client-side site: plain HTML, CSS and JavaScript only. No server code,
no database. Host it anywhere that serves static files.

The two forms (contact and job application) are sent from the browser to
Formspree, the same service the RentMate waitlist uses.


1. Connect the forms (Formspree)
--------------------------------
1. Sign in at formspree.io (the account used for RentMate works).
2. Create two forms: "4CoreSteel enquiries" and "4CoreSteel applications".
   Each one gets an ID like maewdwvo.
3. Find and replace across the folder:
     YOUR_CONTACT_FORM_ID  -> the enquiries form ID
     YOUR_CAREERS_FORM_ID  -> the applications form ID
4. In each Formspree form's settings, add your domain under allowed domains.

Until the IDs are set, the forms tell visitors the form is not connected yet.

Résumés: applicants paste a link (Google Drive, Dropbox or LinkedIn), because
Formspree's free plan does not accept file attachments.


2. Publish (same setup as RentMate)
-----------------------------------
RentMate runs as: domain at GoDaddy -> DNS at Cloudflare -> site on Vercel,
deployed from a GitHub repo. To do the same:

1. Create a GitHub repo (e.g. 4coresteel-website) and push this folder to it.
2. In Vercel: Add New > Project > import the repo. Framework preset "Other",
   no build command, output directory left as is. Deploy.
3. In the Vercel project: Settings > Domains > add the domain. Vercel shows
   the DNS records to create.
4. Add those records where the domain's DNS lives (Cloudflare if you move it
   there like gorentmate.com, otherwise GoDaddy's DNS page). With Cloudflare,
   set the records to "DNS only" (grey cloud) so Vercel can issue the HTTPS
   certificate.

Vercel serves 404.html automatically for missing pages.

Every later change: edit the files, commit and push; Vercel redeploys.

The same folder also works on Netlify, Cloudflare Pages or any static host.


3. Changing things later
------------------------
* The header and footer are repeated in every .html file, so menu changes
  need find-and-replace across the folder.
* projects.html lists the project pages (project-*.html). These are sample
  sheets drawn for the site; replace them with real project images when you
  have them (put images in assets/ and use <img src="assets/name.jpg" alt="...">).
* careers.html lists the job pages (job-*.html). When a position closes,
  delete its file and its entry on careers.html.


4. Files
--------
index.html, about.html, services.html, projects.html, careers.html, contact.html
<service>.html          Six service pages
project-*.html          Five sample drawing pages
job-*.html              Two job openings
404.html                Page-not-found page
assets/css/style.css    All styles
assets/js/main.js       Mobile menu and form sending
assets/fonts/           Big Shoulders Display and IBM Plex Sans (SIL Open Font License)
