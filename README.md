## Currency Expense Tracker

This is a simple single-page web app we built over the weekend for our pair programming assignment. It lets you log daily expenses in different currencies (like USD, EUR, GBP, or KES) and automatically converts them into whatever you choose as your main home currency using a live currency API.

## How We Split the Work

Since we were working from two different laptops, we broke down the files like this:
*   Waleed (HTML/CSS & UI Layout): Built the basic layout, styled the forms, selectors, and transaction lists, and handled the button clicks.
*   Sage (JavaScript Logic & API Engine): Set up the package files, wrote the async fetch function to get the live currency data, created the math utility functions to handle the conversions, and wrote the automated unit tests.

## Tech Used
*   HTML5 & CSS
*   JavaScript (ES Modules)
*   Jest (for the math unit tests)
*   ESLint (for syntax checking)
*   Live Currency Rat

# Expense Tracker with Live Currency Conversion

A modern, single-page web application designed to help users log daily expenses in various global currencies while calculating aggregated totals in real-time using live currency exchange REST APIs.

## Team Contributions & Roles

- Waleed : Engineered the core data framework. Built the live REST API fetching engine, implemented immutable state management structures, and authored the Jest unit testing suites.
- Sage : Designed the semantic HTML5 layout structure, styled the user interface with responsive CSS grid flexboxes, and built the interactive DOM rendering modules.

## Key Features
- Dynamic Expense Entry: Record descriptions, exact amounts, transaction categories, and individual currencies (USD, EUR, GBP, KES).
- Live Rest API Synchronization: Processes real-time exchange rates securely using the required Open Exchange Rates API endpoint.
- Immutable Operations: Enforces clean data management

