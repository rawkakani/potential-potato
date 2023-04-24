# Introduction

I present to you the ultimate todo app.

## Approach

I took the opportunity to use Node.js 19 and experimented with a test runner. I challenged myself to use as few packages as possible and focused on the bare minimum to demonstrate how I would approach the problem.

## Requirements

- Node.js 19

## Setup

To install dependencies, run:

```
npm install
```

start production

```
npm start
```

run development

```
npm run dev
```

run tests

```
npm test
```

### Docker Setup

build docker file

```
docker build . -t todoapp
```

```
docker run -p 1234:8000 -d todoapp
```

## Example Search Terms

dolorum, vitae, magnam, laborum

## Tech Stack

I used Parcel to bundle the React front-end project because of its low overhead and simplicity to set up. I implemented the server from scratch without a framework to demonstrate the following:

- My understanding of the inner workings of Node.js, including its asynchronous and event-driven features.
- My ability to minimize callback hell.
- My understanding of separation of concerns.
- My ability to determine when to abstract and when to keep it simple.

I also implemented React as requested, focused on functionality rather than styling to demonstrate my understanding of the basics of HTML, React, and how to use them.

## Roadmap

There are several features I would have loved to add, including:

- Resetting the results to the first page of todos when the search query is empty.
- Adding a client-side logger to the server that updates a loggly or datadog-like service.
- Implementing user authentication to filter todos based on the user and enable users to create their own todos.
- Pulling new todos after deleting one.
- Allowing users to weigh the difficulty of tasks and the time it took to complete them.
- Providing analytics of the average task completion time and the number of days off based on the difficulty of tasks and the accumulation of days used to complete tasks.

The list goes on and on... 😇

## Notes

I did my best to add comments in the code where there are better practices than what I did within the past day.
