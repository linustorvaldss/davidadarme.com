[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/linustorvaldss/davidadarme.com)
![Uptime Robot status](https://img.shields.io/uptimerobot/status/m797677959-98e7ed32bc65a4f10972c702)

## Newsletter bot verification

The newsletter on `/` and `/blog` uses Turnstile action `newsletter`. The existing
server action verifies the token with Cloudflare before sending the Plunk event.

Configure these variables locally in the ignored `.env` and in the deployment's
environment settings:

- `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=0x4AAAAAABhw85PSphlwjTry`
- `CF_TURNSTILE_SECRET_KEY`: the matching widget secret, stored only server-side.
- `TURNSTILE_HOSTNAMES=localhost,127.0.0.1` for local development;
  `TURNSTILE_HOSTNAMES=davidadarme.com` for production. Add other frontend hostnames
  only if deliberately supported. Never allow localhost in production.

The widget's Cloudflare domain list must allow the frontend hostnames being used.
Rebuild after changing the public site key. Before rollout, submit a fresh real
token through the newsletter and confirm that replaying it is rejected. Test
keys do not validate the production widget configuration.

## Learn More

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials
