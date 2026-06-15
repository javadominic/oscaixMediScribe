# Install dependencies only when needed
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Note: We provide mock environment variables so the build can complete static generation
# without making real Firebase calls or failing due to missing vars.
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy_mock_api_key_for_build_only_123"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="mock.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="mock-project"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="mock-project.appspot.com"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:mockappid"

RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
