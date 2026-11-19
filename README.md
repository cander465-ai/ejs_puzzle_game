# EJS Puzzle Game

A multi-level puzzle game built with Node, Express, and EJS.

## Design answers

**1. Why must a slug be random?**
If slugs were `puzzle-1`, `puzzle-2`, a player could type `/play/puzzle-5` and skip ahead. Base64 of the number is no better, because it can be decoded and re-encoded by anyone. A random slug has no link to the level number, so knowing one tells you nothing about the others.

**2. Where does the gate run, and what does it hand to the route?**
The gate is middleware that runs before the `/play/:id` routes. It finds the puzzle matching the slug (404 if none), checks the player is allowed to be there, and stores the puzzle on `res.locals.puzzle`. `res.locals` lasts for one request, so the route handler just reads `res.locals.puzzle` instead of looking it up again.

**3. How does the POST handler choose where to redirect?**
It takes the verified puzzle from `res.locals.puzzle` and redirects to the puzzle with `level + 1` (or to the victory page after the last one). The target comes only from server data. The handler reads only the submitted answer from the request, so nothing a player sends can change the destination, and no puzzle can be skipped.

**4. What does the template receive?**
`introText`, `levelHeader`, `levelObjective`, `levelMain`, `level`, and `route` (the puzzle's own slug, for the form action). It never receives `correctAnswer` or another puzzle's slug.

**5. Why redirect after a correct POST?**
If the server rendered the next puzzle directly, Refresh would re-send the old form submission, and the address bar would still show the old puzzle's URL. Redirecting makes the next puzzle a normal GET, so Refresh just reloads it and the address bar shows the right URL.

**6. What happens if a player shares the puzzle 5 link?**
The friend is sent back to their own current puzzle. Progress is stored in a session, and the gate redirects anyone who hasn't solved the earlier puzzles. A friend can still be told the answers, which no server check can stop.

## Run

```bash
npm install
node app.js
npm run dev
```

Open http://localhost:5000.