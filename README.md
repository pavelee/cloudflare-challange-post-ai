Created as a submission to dev.to challange: https://dev.to/challenges/cloudflare

![app](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F26pf3mel47ieij0srcqt.png)

## Demo

demo here: [link to the demo](https://pokemon-guess.pages.dev)


## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Storage

By default app is using KV Cloudflare storage, but you can switch to your own!

If you would like to use your own, change exported storage object in `/app/_config/storage.ts`
