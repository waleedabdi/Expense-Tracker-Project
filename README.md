# Weekend Project - Currency Expense Tracker

This is a simple single-page web app we built over the weekend for our pair programming assignment. It lets you log daily expenses in different currencies (like USD, EUR, GBP, or KES) and automatically converts them into whatever you choose as your main home currency using a live currency API.

## How We Split the Work

Since we were working from two different laptops, we broke down the files like this:
*   *Waleed (HTML/CSS & UI Layout):* Built the basic layout, styled the forms, selectors, and transaction lists, and handled the button clicks.
*   *Sage (JavaScript Logic & API Engine):* Set up the package files, wrote the async fetch function to get the live currency data, created the math utility functions to handle the conversions, and wrote the automated unit tests.

## Tech Used
*   HTML5 & CSS
*   JavaScript (ES Modules)
*   Jest (for the math unit tests)
*   ESLint (for syntax checking)
*   Live Currency Rat