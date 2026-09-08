# Workplace Navigator

Build a polished, production-quality web application called Caseflow.

Caseflow is a discreet workplace case-intake and review platform. Employees can use it to report workplace situations or concerns through a guided reporting experience, while authorized HR personnel can review the resulting case information in a structured workspace.

For this build, focus ONLY on creating the frontend and user experience described below.

Do not add extra product features that are not specified.

1. DESIGN PHILOSOPHY

The most important requirement is that the website must NOT look AI-generated or AI-themed.

It should look like a carefully designed professional enterprise application made by an experienced product designer.

A user should be able to look at the interface without immediately thinking:

"AI startup."

Instead, it should feel like:

"Professional HR / employee-relations software."

The visual language should be similar to high-quality enterprise products such as Linear, Notion, Ramp, or modern internal company software — but do not copy any of them.

Avoid completely:

purple/blue AI gradients

glowing elements

excessive gradients

glassmorphism

floating blobs

glowing borders

robot/AI illustrations

sparkle icons

"magic" animations

huge hero sections

excessive rounded cards

oversized text

generic SaaS landing-page design

excessive use of emojis

cartoon illustrations

unnecessary shadows

excessive badges

excessive use of accent colors

"AI-powered" everywhere

chatbot-style UI

The interface should be quiet, restrained and confident.

Think:

enterprise software first, technology second.

2. VISUAL STYLE

Use a light interface.

Primary background:
very light warm/neutral gray or off-white.

Panels:
white.

Borders:
subtle light-gray borders.

Typography:
modern, highly readable sans-serif.

Use strong typographic hierarchy instead of large colorful cards.

Use one restrained accent color for primary actions and active navigation.

Keep colors muted and professional.

Use spacing generously.

Corners should be moderately rounded but NOT excessively rounded.

Use shadows very sparingly.

Icons should be simple line icons.

The interface should feel expensive and intentional.

3. APPLICATION STRUCTURE

There are two separate user experiences:

Employee

A simple reporting experience.

HR

A professional case-management workspace.

For now, use realistic fictional/demo information throughout the interface.

4. EMPLOYEE LANDING SCREEN

Create a very simple starting page.

Top navigation:

Caseflow

Right side:

"Privacy"

Main content centered vertically.

Headline:

"Tell us what happened."

Supporting text:

"You can describe a workplace concern in your own words. We'll guide you through a few questions to make sure the relevant information is captured."

Primary button:

"Start a report"

Below the button:

"Your report will be reviewed by an authorized person."

Do not put an illustration here.

Do not put an AI graphic here.

The page should feel calm and private.

5. EMPLOYEE REPORTING INTERFACE

This is one of the most important screens.

Create a focused reporting interface.

Layout:

Top:
Caseflow logo/name

Center:
conversation/intake area

Bottom:
text input

The interface should NOT look like ChatGPT.

It should look more like a professional guided interview.

Example:

System message:

"Let's start with the situation. What happened?"

Employee response:

"I've been having problems with my manager for the last few months."

Next question:

"When did you first notice the issue?"

Next:

"Who was involved?"

Next:

"Did anyone else witness what happened?"

Next:

"Do you have any emails, messages, documents or other material related to the situation?"

Use a subtle progress indicator.

For example:

"3 of 8"

or a very understated progress bar.

Do not use an AI avatar.

Do not label every message "AI".

The system should feel like an intelligent form rather than a chatbot.

Input area should include:

Text field
Send button
Attachment button

Also include:

"Save and continue later"

and

"Exit"

6. EMPLOYEE REVIEW SCREEN

After the reporting flow, show:

Review your report

Allow the employee to review what has been captured before submitting.

Sections:

Situation

A concise summary of what they reported.

People involved

Reporting employee

Person(s) mentioned

Potential witnesses

Timeline

Chronological list of reported events.

Example:

12 June
First reported disagreement.

18 July
Second reported incident.

7 September
Most recent reported incident.

Documents and attachments

Show uploaded files.

Additional information

Any other information provided.

Every section should have a subtle "Edit" action.

Bottom:

"Submit report"

Secondary action:

"Save as draft"

Include a small privacy note.

7. HR LOGIN

Create a clean login page.

Caseflow logo.

"Sign in"

Email field

Password field

"Sign in" button

"Forgot password?"

No marketing content.

No AI imagery.

8. HR APPLICATION SHELL

After login, create the main HR application.

Use a fixed left sidebar.

Sidebar:

Caseflow

Overview
Cases
People
Reports

Then a divider.

Settings

Bottom:

HR Administrator
Organization

Main content area should have a lot of whitespace.

9. HR OVERVIEW

Page title:

"Overview"

Subtitle:

"Review and manage workplace cases."

At the top show four simple statistics:

Open cases
12

Awaiting review
4

In review
6

Closed
18

Do NOT make these huge colorful dashboard cards.

Keep them as understated information blocks with subtle separators.

Below:

Recent cases

Create a professional table.

Columns:

Case
Subject
Submitted
People
Status

Example:

HR-2026-0142
Workplace conduct
Today
4
Awaiting review

HR-2026-0141
Scheduling concern
Yesterday
3
In review

HR-2026-0139
Workplace conflict
5 Sep
2
In review

HR-2026-0138
Communication issue
4 Sep
2
Closed

Add search and simple filtering.

10. CASES PAGE

Create a full cases list.

Top:

"Cases"

Search field:

"Search cases..."

Filters:

Status
Category
Date

Table:

Case ID
Category
Submitted
People involved
Assigned to
Status

Use realistic fictional data.

Clicking a case should open its detailed case workspace.

11. CASE DETAIL PAGE

This is the most important page in the entire application.

Create a highly polished professional case workspace.

Top header:

Back to cases

HR-2026-0142

Status:
Awaiting review

Actions:

Assign
Add note
Change status

Then create the following sections.

INITIAL OVERVIEW

Display a prominent but restrained section.

Heading:

"Initial overview"

Small label:

"Prepared from submitted information"

Example text:

"Employee A reports several disagreements with their manager regarding recent scheduling changes. The employee describes three incidents between June and September, including a reported verbal confrontation on 7 September. Two colleagues are mentioned as potential witnesses."

Below the summary, display:

"Information requiring clarification"

• Exact date of the first reported incident is unclear.
• Exact wording used during the reported confrontation was not provided.
• It is unclear whether the matter was previously reported.

Include a very subtle note:

"This overview summarizes information provided during intake and does not establish factual findings."

Do NOT use the words:

"AI verdict"

"AI decision"

"AI score"

"guilt probability"

or anything similar.

12. REPORTED INFORMATION

Heading:

"Reported information"

Use a clean two-column layout.

Reporting employee

Employee A
Engineering
EMP-1042

Primary person mentioned

Manager A
Engineering Manager

Potential witnesses

Employee B
Employee C

Reported category

Workplace conduct

Reported impact

Employee reports difficulty working and increased stress related to the situation.

Make it extremely clear visually that these are reported statements, not established findings.

13. TIMELINE

Create a professional vertical timeline.

Example:

12 June 2026
First reported scheduling disagreement.

18 July 2026
Second reported incident.

24 August 2026
Additional disagreement reported.

7 September 2026
Reported verbal confrontation.

8 September 2026
Report submitted.

Each event should have a date and description.

Do not use dramatic colors.

14. PEOPLE INVOLVED

Create a section showing people associated with the case.

Cards or rows:

Employee A
Reporting employee

Manager A
Person mentioned

Employee B
Potential witness

Employee C
Potential witness

Each person can be clicked.

Do NOT show risk scores.

Do NOT show personality analysis.

Do NOT show "likelihood of misconduct".

Do NOT label people as offenders or perpetrators.

The interface must never visually imply guilt simply because a person is associated with a case.

15. EVIDENCE

Create an evidence section.

Example:

Scheduling email
EMAIL
7 Sep 2026

Teams conversation
MESSAGE
7 Sep 2026

Screenshot
IMAGE
7 Sep 2026

Employee statement
DOCUMENT
8 Sep 2026

Use clean file rows with icons.

Each item should have:

File type
Date
Related incident

16. HUMAN REVIEW

Create a clearly separated section:

"Human review"

Fields:

Assigned reviewer
Status
Internal notes
Last updated

Actions:

Assign reviewer

Add note

Change status

This should visually communicate that a qualified human is responsible for reviewing the case.

17. PEOPLE DIRECTORY

Create a People page.

Header:

"People"

Search:

"Search employees..."

Table:

Name
Employee ID
Department
Role

Example:

Anna Weber
EMP-1021
Finance
Financial Analyst

Daniel Müller
EMP-1042
Engineering
Engineering Manager

Sarah Klein
EMP-1057
Operations
Operations Specialist

Clicking a person opens their basic organizational profile.

Show:

Name
Employee ID
Department
Role
Manager

Then:

"Associated cases"

This should simply show cases the person is associated with.

Do not call these "violations".

Do not call these "complaints against this person".

Do not create employee risk profiles.

18. REPORTS PAGE

Create a simple reporting dashboard.

Show:

Cases by category

Cases by status

Cases over time

Average time to initial review

Use clean charts with restrained styling.

No predictive analytics.

No employee scoring.

No behavioral predictions.

No automated conclusions.

19. SETTINGS

Create a simple settings interface.

Sections:

Organization

Users & permissions

Notifications

Privacy

Data retention

These pages can contain realistic placeholder settings.

20. DEMO DATA

Populate the application with realistic fictional data.

Create approximately 10 fictional cases.

Use realistic categories such as:

Workplace conflict
Scheduling concern
Management conduct
Communication issue
Interpersonal conflict
Employee relations

Create realistic names, dates and timelines.

Everything must clearly be fictional/demo information.

21. MICROCOPY

The language throughout the application should be professional and human.

Prefer:

"Initial overview"

"Reported information"

"People involved"

"Potential witnesses"

"Information requiring clarification"

"Human review"

"Case history"

"Submitted information"

Avoid:

"AI-powered"

"AI magic"

"AI assistant"

"Ask our AI"

"AI employee analysis"

"Smart AI insights"

"AI risk score"

The technology should be invisible in the interface wherever possible.

22. FINAL QUALITY BAR

The finished website should feel like a real enterprise product, not a hackathon project or AI-generated landing page.

Prioritize:

excellent typography

spacing

alignment

hierarchy

consistency

subtle interaction

professional tables

excellent empty states

restrained colors

realistic content

clean navigation

Every screen should feel intentional.

Avoid adding features simply because they are common in SaaS templates.

If something is not required above, leave it out.

The final result should look like a serious workplace case-management application that could plausibly be used by a mid-sized European company.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b8bb304-fa31-49c2-acc9-fdb9e4d6144b).

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
