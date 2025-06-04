/**
 * A helper function to handle errors in async route handlers.
 *
 * In Express, if we use async functions and they throw an error,
 * we need to catch it and pass it to `next()` so Express can handle it.
 * This function does the same job for us automatically.
 *
 * Just wrap your async route or middleware with `wrapAsync`,
 * and any errors will be caught and passed to Express's error handler.
 *
 * Example:
 *   app.get('/users', wrapAsync(async (req, res) => {
 *     const users = await getUsersFromDb();
 *     res.json(users);
 *   }));
 *
 * @param fn - Your async function (req, res, next) => {}
 * @returns A new function that catches errors and passes them to next()
 */
export const wrapAsync = (fn: any) => (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);
