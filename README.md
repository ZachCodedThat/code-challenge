# Blue Rabit Coding Challenge

## To get this thing fired up:

- `npm install`

- `npm run start`

---

## What's under the hood

I used React and Typescript to build this out. React in this instance I wanted useState and access to JSX which makes setting data and getting it to screen when I want it that much less of a hassle and felt like the perfect fit for this exercise. TS gives me that sweet sweet intelisense and pushes me to better data flow patterns when I am not using it.

To super charge the situation I am using [Zod](https://github.com/colinhacks/zod) and a package called [react-Zorm](https://github.com/esamattis/react-zorm) (shout out to them this package is AWESOME) to help me with the always fun task of form validation and lets me do cool stuff like:

-being able to throw custom errors and easily validate inputs locking down the form from sending anything other than the specified input.

<img  alt="Cool Zorm feature 1"  src="https://res.cloudinary.com/dey85zjmf/image/upload/v1661570337/ReadmeAsset2_t4io1y.png" />

-on the dev side these errors can be as simple or complicated as we want and point us right at the issues if things aren't working properly.

<img  alt="Cool Zorm feature 2"  src="https://res.cloudinary.com/dey85zjmf/image/upload/v1661570337/ReadmeAsset3_p05zhn.png" />

## Thoughts and process

To keep it within the spirit of the challenge time frame I didn't set up any node related shenanigan's or any outside DB stuff. In a production world where the API is more complicated I would get something like TRPC involved to ensure type safety on those endpoints and again sweet sweet intelisense. I would also add more robust validation around image URLs. ~~Right now I am bluffing with the current error message as any URL will pass the validation~~ I used Zod's regex tool to validate the incoming image URL, not ideal but better than bluffing. My personal DB prefernece is [Supabase](https://supabase.com/) but with TRPC we could go to any provider with minimal fuss.

If the project was growing I would want to move into something like Next.js because of their [excellent "handler" for their API routes](https://nextjs.org/docs/api-routes/introduction) which handles... all the work at securing them. I am obligated to say React will leak your API keys like a sieve. All the serverless stuff you can get into is not bad either and is useful when dealing with tons of data and pages at scale.

---
 `npx zpinfo` to check out all my links in one neat package which uses a bit of node magic. 
