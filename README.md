> # NOTICE
> StatsView is likely to be replaced soon. The functionality of this app is quite limited due to the need to manually program functionality into the StatMaster library (and the possiblity for errors that I fail to catch in developing said functionality). While that library does something valuable - enable statistical testing in the browser - keeping StatsView up-to-date with the latest trends in statistics would take a lot of work. It has also become apparent that the decision to have different types of blocks - tests, charts, and confidence intervals, for instance, all have some separate code - was a mistake due to the wide variety of techniques used in statistics. This project is really only useful for basic studies and academic use in entry-level statistics classes, which wasn't the original target audience. With this in mind, it is likely that a new, more general, more extensible project will be developed in its place the near future. This is by no means a certainty, but it remains the most likely outcome for StatsView at the moment. There are no plans to deprecate the StatMaster library at the moment and there is potential for new features to be added even in StatsView's absence, though that is not guaranteed. Stay tuned for updates!

# StatsView
This is a web app for visualizing and analyzing data, and creating statistical reports. It supports charts, descriptive statistics, hypothesis tests, and confidence intervals, and can export to Word. It is built with Svelte and Vite.

## Disclaimer
StatsView is in early development and may contain bugs. Don't use it for anything critical without checking its results!

## Getting Started

1. Clone the repository: `git clone https://github.com/cdrice26/statsview.git`
2. Install dependencies: `npm install`
3. This depends on a custom library, [StatMaster](https://github.com/cdrice26/statmaster.git), which is not yet available on npm. To install it, follow the instructions in that repository.
4. Run the development server: `npm run dev`
5. Open the app in a browser: [http://localhost:5173/](http://localhost:5173/)
